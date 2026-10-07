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
// Heat haze: the label is rasterised to a texture and refracted in GLSL by rising, stretched noise —
// the shimmer you see above asphalt or a flame: strongest near the heat at the bottom, no colour
// fringing. Round embers drift up on hover; press is a burst of heat.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res;uniform sampler2D u_tex;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; float ar=u_res.x/u_res.y; float t=u_time;
 float heat=.25+.75*u_hover+u_press;
 float amp=(.002+.011*heat)*(.45+1.1*(1.-uv.y));
 vec2 nq=uv*vec2(5.,3.)+vec2(0.,-t*1.7);
 vec2 d=vec2(noise(nq*vec2(1.,2.2))-.5,noise(nq*vec2(1.3,2.6)+vec2(7.,3.))-.5);
 d+=.5*vec2(noise(nq*vec2(2.5,5.)+3.)-.5,noise(nq*vec2(2.7,5.3)+9.)-.5);
 vec2 q=uv+d*amp*vec2(1.,1.6);
 float a=texture2D(u_tex,q).a;
 vec3 bg=vec3(.055,.025,.02)+vec3(.85,.22,.03)*pow(1.-uv.y,2.4)*(.35+.65*heat);
 bg+=vec3(.5,.12,.02)*pow(1.-uv.y,6.)*(noise(vec2(uv.x*6.-t*.3,t*.8))*.6+.2)*heat;
 vec3 hot=mix(vec3(1.,.95,.86),vec3(1.,.78,.5),smoothstep(.75,.2,uv.y));
 vec3 col=mix(bg,hot,a);
 // embers: one per cell of a rising grid, round, flickering, fading as they climb
 vec2 g=vec2(uv.x*ar*7.,uv.y*4.-t*.55); vec2 id=floor(g); vec2 f=fract(g)-.5;
 float hr=hash(id); vec2 o=vec2(hash(id+3.)-.5,hash(id+7.)-.5)*.6+vec2(.12*sin(t*2.+hr*6.),0.);
 float e=smoothstep(.07,.0,length((f-o)*vec2(1.,ar*7./4.)))*step(.62,hr);
 col+=e*vec3(1.,.55,.16)*(.5+.5*sin(t*9.+hr*40.))*smoothstep(.95,.2,uv.y)*u_hover;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-heat-haze',
  credit: 'Heat-haze refraction — the label is rasterised to a texture and bent in GLSL by rising stretched noise (asphalt / flame shimmer, strongest near the heat), with embers that drift up on hover',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: block; width: 240px; height: 80px; max-width: 100%; padding: 0; border: 0; border-radius: 12px; overflow: hidden; background: #0e0605; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(255,140,60,.14), 0 1px 2px rgba(0,0,0,.3); transition: box-shadow .3s, transform .15s; }
    .btn:hover { box-shadow: inset 0 0 0 1px rgba(255,140,60,.3), 0 10px 26px -12px rgba(255,90,20,.7); }
    .btn:active { transform: scale(.98); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(0deg, #a62d05, #0e0605 70%); }
    .fb { position: absolute; inset: 0; display: grid; place-items: center; color: #fff3e3; font: 800 34px/1 'Bricolage Grotesque', 'Inter', system-ui, sans-serif; letter-spacing: .12em; opacity: 0; pointer-events: none; }
    .cv.nogl + .fb { opacity: 1; }
    .btn:focus-visible { outline: 2px solid #ff7a2a; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-label="Heat"><canvas class="cv"></canvas><span class="fb" aria-hidden="true">HEAT</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    let tex = null, glr = null;
    const paint = () => {
      if (!glr || !tex) return;
      const t = document.createElement('canvas'); t.width = 480; t.height = 160;
      const c = t.getContext('2d'); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = '800 70px "Bricolage Grotesque", Inter, system-ui, sans-serif'; try { c.letterSpacing = '14px'; } catch (e) {}
      c.fillText('HEAT', 247, 86);
      glr.bindTexture(glr.TEXTURE_2D, tex); glr.pixelStorei(glr.UNPACK_FLIP_Y_WEBGL, 1);
      glr.texImage2D(glr.TEXTURE_2D, 0, glr.RGBA, glr.RGBA, glr.UNSIGNED_BYTE, t);
    };
    const s = shade(cv, btn, 240, 80, FS, {
      pressDecay: 1.2,
      after(gl, prog) {
        glr = gl; tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        paint(); gl.uniform1i(gl.getUniformLocation(prog, 'u_tex'), 0);
      },
    });
    let dead = false;
    if (globalThis.document && document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!dead) { paint(); s.draw(); } });
    return () => { dead = true; s.destroy(); };
  },
};
