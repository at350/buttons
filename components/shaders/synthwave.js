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
    gl.getExtension('OES_standard_derivatives'); // fwidth() for pixel-exact anti-aliasing
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
// Outrun sun: gradient disc (#ffd319 -> #ff2975) whose lower half is cut by horizontal gaps that get
// thicker toward the bottom and scroll down; a ridge line in front; a perspective grid floor. Every
// edge is anti-aliased with fwidth().
const FS = `#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float ridge(float x){return .03+.024*sin(x*6.1+1.3)+.016*sin(x*13.7+2.)+.008*sin(x*29.+.5)+.05*smoothstep(.55,1.2,abs(x));}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; float ar=u_res.x/u_res.y;
 vec2 p=vec2((uv.x-.5)*ar,uv.y-.47); float px=1./u_res.y;
 float t=u_time*(.35+.9*u_hover+2.2*u_press);
 vec3 col=mix(vec3(.55,.09,.5),vec3(.09,.02,.22),smoothstep(0.,.42,p.y));
 col=mix(col,vec3(.03,.0,.1),smoothstep(.4,.62,p.y));
 vec2 sg=floor(gl_FragCoord.xy/2.); float st=hash(sg); col+=step(.996,st)*smoothstep(.12,.4,p.y)*.8;
 // sun
 vec2 sc=p-vec2(0.,.2-.06*u_press); float R=.22; float d=length(sc)-R;
 float yb=clamp((sc.y+R)/(2.*R),0.,1.);
 float k=yb*9.+t*.35; float fk=fract(k); float w=fwidth(k);
 float gap=mix(.6,0.,smoothstep(.05,.62,yb));
 float band=gap<=.001?1.:smoothstep(gap-w,gap+w,fk)*smoothstep(1.,1.-w,fk);
 float sun=smoothstep(px,-px,d)*band;
 vec3 sunc=mix(vec3(1.,.16,.46),vec3(1.,.83,.1),smoothstep(.05,.95,yb));
 col+=exp(-max(d,0.)*10.)*vec3(1.,.25,.55)*.45*step(0.,p.y);
 col=mix(col,sunc,sun*step(0.,p.y));
 // ridge in front of the sun
 float m=ridge(p.x); float mm=smoothstep(px,-px,p.y-m)*step(0.,p.y);
 vec3 mc=mix(vec3(.07,.0,.16),vec3(.2,.03,.33),clamp(p.y/m,0.,1.));
 col=mix(col,mc,mm); col+=smoothstep(1.5*px,0.,abs(p.y-m))*vec3(1.,.3,.85)*.55*step(0.,p.y);
 // grid floor
 if(p.y<0.){
  float z=.13/(-p.y+.004); vec2 g=vec2(p.x*z,z+t*1.6); vec2 fw=fwidth(g);
  vec2 dl=abs(fract(g)-.5); vec2 lp=(.5-dl)/max(fw,1e-4);
  float line=max(1.-smoothstep(.4,1.4,lp.x),1.-smoothstep(.4,1.4,lp.y));
  line*=1.-smoothstep(.15,.6,max(fw.x,fw.y));
  vec3 fl=mix(vec3(.05,.0,.12),vec3(.16,.01,.26),smoothstep(-.4,0.,p.y));
  col=fl+line*vec3(1.,.17,.78)*(.45+.55*smoothstep(0.,-.35,p.y));
  col+=exp(p.y*22.)*vec3(.9,.2,.6)*.35;
 }
 col+=exp(-abs(p.y)*70.)*vec3(1.,.5,.85)*.55;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-synthwave',
  credit: 'Synthwave / outrun button — the striped retro sun (gaps widen toward the bottom and scroll), a neon ridge and a perspective grid in GLSL with fwidth anti-aliasing; hover speeds the grid, press floors it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 260px; height: 100px; max-width: 100%; padding: 0; border: 0; border-radius: 12px; overflow: hidden; background: #160430; cursor: pointer; isolation: isolate; box-shadow: 0 0 0 1.5px #ff2bd6, 0 0 18px -4px rgba(255,43,214,.75); transition: box-shadow .25s; }
    .btn:hover { box-shadow: 0 0 0 1.5px #ff6be3, 0 0 26px -2px rgba(255,43,214,.9); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(180deg, #160430 0 30%, #8c1a7f 58%, #ff2975 62%, #160430 63%); }
    .l { position: relative; z-index: 1; margin-top: 46px; font: italic 800 28px/1 'Syne', system-ui, sans-serif; letter-spacing: .1em; margin-right: -.1em; text-transform: uppercase; color: transparent; background: linear-gradient(180deg, #e8f7ff 0%, #9fdcff 46%, #1b0b3a 50%, #ff9ce6 54%, #fff 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-stroke: .6px rgba(255,255,255,.55); filter: drop-shadow(0 2px 0 #2a0058) drop-shadow(0 0 8px rgba(255,43,214,.6)); pointer-events: none; transition: transform .2s cubic-bezier(.2,.8,.2,1); }
    .btn:active .l { transform: scale(.96) skewX(-4deg); }
    .btn:focus-visible { outline: 2px solid #6ae0ff; outline-offset: 4px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">Drive</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 260, 100, FS, { pressDecay: 1.2 });
    return () => s.destroy();
  },
};
