// Shared shader-surface pattern, inlined per file (components may not import anything).
// shade(canvas, pointerTarget, cssW, cssH, fragmentSrc, opts) -> state object `s`
// uniforms: u_time, u_res, u_mouse (0..1, y up), u_pt (last press point), u_hover (eased), u_press (1 -> 0), u_value (eased)
const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const UNI = ['u_time', 'u_res', 'u_mouse', 'u_pt', 'u_hover', 'u_press', 'u_value'];
function shade(cv, el, w, h, fs, o = {}) {
  const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  const s = { t: 0, hover: 0, hoverT: 0, press: 0, value: 0, valueT: 0, mx: .5, my: .5, px: .5, py: .5, down: false };
  let gl = null, prog = null, U = null, raf = 0, lastT = 0, vis = false, dead = false, io = null, lose = null, parked = null, parkT = 0;
  const name = () => ((cv.getRootNode().host || {}).dataset || {}).id || '';
  const setup = () => {
    gl = cv.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) return false;
    lose = gl.getExtension('WEBGL_lose_context'); // grabbed now: a lost context hands out no extensions
    const sh = (type, src) => {
      const x = gl.createShader(type); gl.shaderSource(x, src); gl.compileShader(x);
      if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) { console.error('[shader]', name(), gl.getShaderInfoLog(x)); return null; }
      return x;
    };
    const v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return false;
    prog = gl.createProgram(); gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error('[shader link]', name(), gl.getProgramInfoLog(prog)); return false; }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    U = {}; for (const n of UNI) U[n] = gl.getUniformLocation(prog, n);
    gl.viewport(0, 0, cv.width, cv.height);
    o.after && o.after(gl, prog);
    return true;
  };
  const draw = () => {
    if (!gl || gl.isContextLost()) return;
    gl.uniform1f(U.u_time, s.t); gl.uniform2f(U.u_res, cv.width, cv.height);
    gl.uniform2f(U.u_mouse, s.mx, s.my); gl.uniform2f(U.u_pt, s.px, s.py);
    gl.uniform1f(U.u_hover, s.hover); gl.uniform1f(U.u_press, s.press); gl.uniform1f(U.u_value, s.value);
    o.uniforms && o.uniforms(gl, prog, s);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const ease = (a, b, k) => (Math.abs(b - a) < .002 ? b : a + (b - a) * k);
  const busy = () => s.hoverT > 0 || s.hover !== s.hoverT || s.press > 0 || s.value !== s.valueT || s.down
    || (o.idle && vis && (!o.idleWhen || o.idleWhen(s))) || (o.busy ? o.busy(s) : false);
  const tick = (now) => {
    raf = 0;
    const dt = Math.min(.1, (now - lastT) / 1000);
    if (o.idle && !s.hoverT && !s.down && dt < 1 / 30) { raf = requestAnimationFrame(tick); return; } // idle shaders: <= 30fps
    lastT = now; s.t += dt;
    s.hover = ease(s.hover, s.hoverT, Math.min(1, dt * 9));
    s.value = ease(s.value, s.valueT, Math.min(1, dt * (o.valueRate || 7)));
    s.press = Math.max(0, s.press - dt * (o.pressDecay || 1));
    o.step && o.step(s, dt);
    draw();
    if (busy()) raf = requestAnimationFrame(tick);
  };
  const kick = () => { if (!raf && gl && !parked && !dead) { lastT = performance.now(); raf = requestAnimationFrame(tick); } };
  // The context is created on first approach to the viewport and parked (lost on purpose) while far away, so a
  // page with hundreds of live elements stays under the browser's active-context limit (16 in Chrome) and
  // mounting into the hidden measuring area costs no GPU work at all. A context the browser evicts anyway waits
  // in a shared list for the next slot a park() frees (Chrome restores evicted contexts only when another one
  // is destroyed, not when one is lost on purpose).
  const WAIT = (globalThis.__shadeWait ||= new Set());
  let restoring = false;
  const me = () => { WAIT.delete(me); if (vis && !dead && !parked && gl && gl.isContextLost()) { ensure(); return true; } return false; };
  const free = () => { for (const f of WAIT) if (f()) break; }; // a slot was freed: give it to one evicted canvas still in view
  const unpark = () => { cv.style.visibility = ''; const p = cv.parentNode; if (p && p.style) { p.style.backgroundImage = ''; p.style.backgroundSize = ''; } };
  const ensure = () => {
    if (dead) return;
    clearTimeout(parkT); parkT = 0; WAIT.delete(me);
    if (parked) { const x = parked; parked = null; restoring = true; x.restoreContext(); } // -> webglcontextrestored re-runs setup()
    else if (!gl) { if (setup()) { cv.classList.remove('nogl'); draw(); } }
    else if (gl.isContextLost() && lose) { restoring = true; lose.restoreContext(); } // evicted by the browser: ask for it back
  };
  const park = () => {
    parkT = 0;
    if (dead || !gl || parked || !lose || gl.isContextLost()) return;
    if (s.hoverT || s.down) { parkT = setTimeout(park, 1500); return; } // still in use: try again later
    // keep the last frame on the parent while the canvas is lost (a lost canvas repaints as a broken-image box)
    draw();
    try { const p = cv.parentNode; p.style.backgroundImage = `url(${cv.toDataURL()})`; p.style.backgroundSize = '100% 100%'; } catch {}
    cv.style.visibility = 'hidden';
    parked = lose; cancelAnimationFrame(raf); raf = 0; lose.loseContext();
    free();
  };
  const near = () => { // draw before the first paint of a freshly placed row (the observer would fire a frame later)
    if (gl || dead) return;
    const r = cv.getBoundingClientRect();
    if (r.width && r.bottom > -200 && r.top < innerHeight + 200) ensure();
  };
  const pos = (e) => { const r = cv.getBoundingClientRect(); if (r.width) { s.mx = (e.clientX - r.left) / r.width; s.my = 1 - (e.clientY - r.top) / r.height; } };
  el.addEventListener('pointerenter', (e) => { pos(e); s.hoverT = 1; ensure(); kick(); });
  el.addEventListener('pointerleave', () => { s.hoverT = 0; s.down = false; kick(); });
  el.addEventListener('pointermove', (e) => { pos(e); kick(); });
  el.addEventListener('pointerdown', (e) => { pos(e); s.down = true; s.press = 1; s.px = s.mx; s.py = s.my; ensure(); kick(); });
  el.addEventListener('pointerup', () => { s.down = false; kick(); });
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { s.px = .5; s.py = .5; s.press = 1; ensure(); kick(); } });
  el.addEventListener('focus', () => { if (el.matches(':focus-visible')) { s.hoverT = 1; ensure(); kick(); } });
  el.addEventListener('blur', () => { if (!el.matches(':hover')) { s.hoverT = 0; kick(); } });
  cv.addEventListener('webglcontextlost', (e) => {
    e.preventDefault(); cancelAnimationFrame(raf); raf = 0;
    if (dead) return;
    if (restoring) { restoring = false; setTimeout(() => { if (!dead && lose && gl && gl.isContextLost()) lose.restoreContext(); }, 0); } // asked before this event: ask again now that it is allowed
    else if (!parked) { cv.style.visibility = 'hidden'; if (vis) WAIT.add(me); } // evicted by the browser (a class change now would repaint it as a broken-image box)
  });
  cv.addEventListener('webglcontextrestored', () => { restoring = false; if (!dead && setup()) { cv.classList.remove('nogl'); draw(); unpark(); kick(); } });
  cv.classList.add('nogl'); // CSS poster until the first frame is drawn
  const host = cv.getRootNode().host;
  host && host.addEventListener('placed', near);
  if (typeof IntersectionObserver === 'function') {
    // near the viewport: hold a context (and animate, for idle shaders); far away for a while: park it
    io = new IntersectionObserver((en) => {
      vis = en.some((x) => x.isIntersecting);
      clearTimeout(parkT); parkT = 0;
      if (vis) { ensure(); kick(); } else parkT = setTimeout(park, 1500);
    }, { rootMargin: '200px' });
    io.observe(cv);
  } else ensure();
  s.kick = kick; s.draw = draw;
  s.destroy = () => {
    dead = true; cancelAnimationFrame(raf); raf = 0; clearTimeout(parkT); io && io.disconnect(); WAIT.delete(me);
    host && host.removeEventListener('placed', near);
    if (gl && !parked && lose && !gl.isContextLost()) { lose.loseContext(); free(); }
    gl = null; lose = null; parked = null;
  };
  return s;
}
// Holographic foil: real thin-film interference. For film thickness d and refraction angle θ the phase
// difference is δ = 4π·n·d·cosθ / λ; reflectance ≈ ½(1 − cos δ) per wavelength, summed over 10 visible
// wavelengths weighted by approximate colour-matching lobes. Thickness varies with a slow noise field,
// a diffraction mosaic (each cell a different grating offset) and the card tilt from the pointer.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_mouse,u_pt;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
vec3 film(float d,float ct){vec3 acc=vec3(0.),nrm=vec3(0.);
 for(int i=0;i<10;i++){float l=400.+float(i)*33.3;
  vec3 cm=vec3(exp(-pow((l-605.)/48.,2.))+.3*exp(-pow((l-440.)/22.,2.)),exp(-pow((l-545.)/42.,2.)),exp(-pow((l-455.)/32.,2.)));
  acc+=(.5-.5*cos(12.566*1.45*d*ct/l))*cm; nrm+=cm;}
 return acc/nrm;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; float ar=u_res.x/u_res.y; float px=1./u_res.y;
 vec2 tilt=mix(vec2(-.28,.22),(u_mouse-.5)*1.2,u_hover);
 vec2 p=vec2((uv.x-.5)*ar,uv.y-.5);
 // diffraction mosaic: rotated square cells, each with its own grating phase
 vec2 r=mat2(.7071,-.7071,.7071,.7071)*p*24.; vec2 id=floor(r), f=fract(r)-.5;
 float cell=hash(id); float edge=smoothstep(.5-px*30.,.5-px*8.,max(abs(f.x),abs(f.y)));
 float d=300.+90.*noise(p*1.8+3.)+380.*(p.x*.5+p.y*.5)+260.*dot(tilt,p)+170.*dot(tilt,vec2(1.,.6));
 d+=34.*(cell-.5)+25.*edge;
 float ct=sqrt(max(0.,1.-.42*dot(tilt+p*.5,tilt+p*.5)));
 vec3 h=film(d,ct); float g=dot(h,vec3(.333)); h=clamp(mix(vec3(g),h,1.9),0.,1.);
 float brush=noise(vec2(p.x*3.,p.y*260.))*.06+noise(vec2(p.x*8.,p.y*90.))*.04;
 vec3 silver=vec3(.78,.79,.82)+brush-.08*length(p);
 float k=.5+.3*u_hover;
 vec3 col=silver*mix(vec3(1.),.3+1.1*h,k);
 col*=1.-.05*edge;
 vec2 gp=mix(vec2(-.35*ar,.35),(u_mouse-.5)*vec2(ar,1.),u_hover);
 float glare=exp(-dot(p-gp,p-gp)*3.5);
 col+=vec3(1.)*glare*(.22+.25*u_hover);
 float sweep=pow(max(0.,1.-abs((p.x+p.y*.8)-(tilt.x*1.4+tilt.y))*3.2),3.);
 col+=sweep*.18*(.5+u_hover);
 col+=u_press*exp(-dot(p-(u_pt-.5)*vec2(ar,1.),p-(u_pt-.5)*vec2(ar,1.))*6.)*.5*(1.-u_press*.4);
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-holo-foil',
  credit: 'Holographic foil card — true thin-film interference (δ = 4πnd·cosθ/λ summed over the visible spectrum) on brushed silver with a diffraction mosaic in GLSL; the card tilts toward the pointer and the colours sweep like a trading-card holo',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { width: 200px; height: 120px; max-width: 100%; perspective: 700px; }
    .btn { position: relative; display: grid; place-items: center; width: 100%; height: 100%; padding: 0; border: 0; border-radius: 12px; overflow: hidden; background: #c9cbd2; cursor: pointer; isolation: isolate; transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .3s; box-shadow: inset 0 0 0 1px rgba(255,255,255,.55), 0 1px 2px rgba(0,0,0,.18), 0 6px 14px -8px rgba(0,0,0,.35); }
    .btn.on { transition: transform .12s linear, box-shadow .3s; }
    .btn:active { transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(.98); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(125deg, #c9cbd2 10%, #e8b9d6 30%, #a9d8e8 48%, #d9e6a8 62%, #e8c6a0 78%, #c9cbd2); }
    .l { position: relative; z-index: 1; color: #15151d; font: 800 26px/1 'Syne', system-ui, sans-serif; letter-spacing: .16em; margin-right: -.16em; text-transform: uppercase; pointer-events: none; text-shadow: 0 1px 0 rgba(255,255,255,.55); mix-blend-mode: multiply; }
    .btn:focus-visible { outline: 2px solid #6b5cff; outline-offset: 3px; }
  `,
  html: `<div class="wrap"><button class="btn" type="button"><canvas class="cv"></canvas><span class="l">holo</span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 200, 120, FS, { pressDecay: 1.6 });
    const move = (e) => { const r = btn.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; btn.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg'); btn.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg'); };
    btn.addEventListener('pointerenter', (e) => { btn.classList.add('on'); move(e); });
    btn.addEventListener('pointermove', move);
    btn.addEventListener('pointerleave', () => { btn.classList.remove('on'); btn.style.setProperty('--rx', '0deg'); btn.style.setProperty('--ry', '0deg'); });
    return () => s.destroy();
  },
};
