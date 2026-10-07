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
// Liquid chrome: the pill is a chrome tube (cylindrical normal across its height) with a slow fbm
// height field on top. Each pixel reflects a studio environment — cool sky, a bright horizon line,
// warm dark ground and a softbox — so the face reads as polished metal; the pointer tilts the
// environment and hover whips the liquid up, press sends a ring through it.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_mouse,u_pt;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){return noise(p)*.6+noise(p*2.03+7.)*.3+noise(p*4.1+3.)*.1;}
vec2 tilt;
vec3 env(vec3 r){
 float y=r.y+tilt.y, x=r.x+tilt.x;
 vec3 sky=mix(vec3(.66,.74,.86),vec3(.97,.98,1.),smoothstep(-.1,.75,y));
 vec3 gnd=mix(vec3(.26,.22,.2),vec3(.05,.05,.06),smoothstep(-.6,-1.,y));
 vec3 c=mix(gnd,sky,smoothstep(-.6,-.5,y));
 c+=vec3(1.,.98,.95)*exp(-pow((y+.55)/.035,2.))*.55;
 c+=vec3(1.)*smoothstep(.2,.1,abs(x+.45))*smoothstep(.25,.12,abs(y-.55))*.5;
 c+=vec3(1.)*smoothstep(.1,.04,abs(x-.55))*smoothstep(.3,.18,abs(y-.4))*.35;
 return c;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; float ar=u_res.x/u_res.y; vec2 p=vec2(uv.x*ar,uv.y);
 float t=u_time*.45;
 tilt=(u_mouse-.5)*vec2(.6,.5)*u_hover;
 float amp=.14+.26*u_hover;
 vec2 pp=p*1.25+vec2(t*.6,-t*.25);
 float rr=length((uv-u_pt)*vec2(ar,1.)); float ring=u_press*sin(rr*28.-(1.-u_press)*18.)*exp(-rr*2.)*.6;
 float e=.01;
 float h0=fbm(pp)+ring;
 float hx=(fbm(pp+vec2(e,0.))-fbm(pp-vec2(e,0.)))/(2.*e);
 float hy=(fbm(pp+vec2(0.,e))-fbm(pp-vec2(0.,e)))/(2.*e);
 float rx=u_press*cos(rr*28.-(1.-u_press)*18.)*exp(-rr*2.)*5.*(uv.x-u_pt.x)*ar/max(rr,1e-3);
 float ry=u_press*cos(rr*28.-(1.-u_press)*18.)*exp(-rr*2.)*5.*(uv.y-u_pt.y)/max(rr,1e-3);
 float cy=clamp((uv.y-.5)*2.,-.999,.999);
 vec3 n=normalize(vec3(-(hx+rx)*amp,-(hy+ry)*amp+cy*1.05,sqrt(1.-cy*cy)*1.2+.05));
 vec3 r=reflect(vec3(0.,0.,-1.),n);
 vec3 col=env(r);
 float fr=pow(1.-n.z,3.);
 col=mix(col,col*vec3(.92,.95,1.05),.4)*(1.+fr*.25);
 col*=.96+.06*h0;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-liquid-chrome',
  credit: 'Liquid chrome pill (Y2K chrome) in GLSL — a chrome tube with a flowing fbm surface reflecting a studio environment (sky, horizon line, ground, softboxes); the pointer tilts the environment, hover churns the metal, press sends a ripple',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 260px; height: 72px; max-width: 100%; padding: 0; border: 0; border-radius: 999px; overflow: hidden; background: #b9c0ca; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(255,255,255,.55), inset 0 -1px 0 1px rgba(0,0,0,.18), 0 1px 2px rgba(0,0,0,.25), 0 10px 22px -12px rgba(0,0,0,.55); transition: transform .15s; }
    .btn:active { transform: scale(.98); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(180deg, #f6f8fb 0%, #c3cad5 38%, #fffdf7 62%, #3a3633 70%, #121214 100%); }
    .l { position: relative; z-index: 1; color: #181b22; font: 800 19px/1 'Unbounded', 'Syne', system-ui, sans-serif; letter-spacing: .06em; margin-right: -.06em; text-transform: uppercase; pointer-events: none; text-shadow: 0 1px 0 rgba(255,255,255,.75), 0 -1px 0 rgba(0,0,0,.25); }
    .btn:focus-visible { outline: 2px solid #181b22; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">chrome</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 260, 72, FS, { pressDecay: 1.1 });
    return () => s.destroy();
  },
};
