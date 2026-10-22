// Shared shader-surface pattern, inlined per file (components may not import anything).
// shade(canvas, pointerTarget, cssW, cssH, fragmentSrc, opts) -> state object `s`
// uniforms: u_time, u_res, u_mouse (0..1, y up), u_pt (last press point), u_hover (eased), u_press (1 -> 0), u_value (eased)
const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const UNI = ['u_time', 'u_res', 'u_mouse', 'u_pt', 'u_hover', 'u_press', 'u_value'];
function shade(cv, el, w, h, fs, o = {}) {
  const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  const s = { t: 0, hover: 0, hoverT: 0, press: 0, value: 0, valueT: 0, mx: .5, my: .5, px: .5, py: .5, down: false };
  let gl = null, prog = null, U = null, raf = 0, lastT = 0, vis = false, dead = false, io = null, nearIo = null, lose = null, near = false, noGl = false, used = false, snap = false;
  const box = cv.parentElement || el; // observed instead of the canvas, which gets swapped for fresh ones
  const name = () => ((el.getRootNode().host || {}).dataset || {}).id || '';
  const setup = (c) => {
    gl = c.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) return false;
    lose = gl.getExtension('WEBGL_lose_context');
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
  const using = () => s.hoverT > 0 || s.hover !== s.hoverT || s.press > 0 || s.value !== s.valueT || s.down || (o.busy ? o.busy(s) : false);
  const loops = () => !!(o.idle && (!o.idleWhen || o.idleWhen(s))); // an idle loop, running while in view
  const idling = () => vis && loops();
  const busy = () => using() || idling();
  const tick = (now) => {
    raf = 0;
    const dt = Math.max(0, Math.min(.1, (now - lastT) / 1000)); // >= 0: a frame's timestamp can predate a kick() late in the last one
    if (o.idle && !s.hoverT && !s.down && dt < 1 / 30) { raf = requestAnimationFrame(tick); return; } // idle shaders: <= 30fps
    lastT = now; s.t += dt;
    s.hover = ease(s.hover, s.hoverT, Math.min(1, dt * 9));
    s.value = ease(s.value, s.valueT, Math.min(1, dt * (o.valueRate || 7)));
    s.press = Math.max(0, s.press - dt * (o.pressDecay || 1));
    o.step && o.step(s, dt);
    draw();
    if (busy()) raf = requestAnimationFrame(tick);
    else if (R.wait.size) pump(); // gone quiet: a waiting shader may take its slot
  };
  const kick = () => {
    if (dead) return;
    me.seen = performance.now();
    if (!gl && near && busy()) acquire(); // parked while wanted (hover, a toggle, an idle loop in view): take a slot back
    if (!raf && gl) { lastT = performance.now(); raf = requestAnimationFrame(tick); }
  };
  const pos = (e) => { const r = cv.getBoundingClientRect(); if (r.width) { s.mx = (e.clientX - r.left) / r.width; s.my = 1 - (e.clientY - r.top) / r.height; } };
  el.addEventListener('pointerenter', (e) => { pos(e); s.hoverT = 1; kick(); });
  el.addEventListener('pointerleave', () => { s.hoverT = 0; s.down = false; kick(); });
  el.addEventListener('pointermove', (e) => { pos(e); kick(); });
  el.addEventListener('pointerdown', (e) => { pos(e); s.down = true; s.press = 1; s.px = s.mx; s.py = s.my; kick(); });
  el.addEventListener('pointerup', () => { s.down = false; kick(); });
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { s.px = .5; s.py = .5; s.press = 1; kick(); } });
  el.addEventListener('focus', () => { if (el.matches(':focus-visible')) { s.hoverT = 1; kick(); } });
  el.addEventListener('blur', () => { if (!el.matches(':hover')) { s.hoverT = 0; kick(); } });
  // A WebGL context costs tens of ms to create and browsers keep only ~16 alive per page: past that Chrome
  // evicts the oldest, and a lost canvas paints a broken-image box. So every shade() copy on the page shares
  // one budget, and a canvas holds a context only within half a screen of the viewport. When the budget is full, the
  // holder least worth keeping is parked: its last frame goes to a 2D canvas that takes its place and its
  // context is lost on purpose, which frees the slot at once. A lost context is never restored: the next
  // acquire draws into a fresh <canvas>. A shader that finds every holder in use, or an idle loop in view that
  // was parked, waits in R.wait for the next slot that frees or holder that goes quiet. An eviction lowers the
  // budget; once 10 s pass without one, it grows back by one a second as shaders ask for slots.
  const R = (globalThis.__shadeCtx_v1 ||= { cap: 12, live: new Set(), wait: new Set(), calm: 0 });
  const me = { seen: 0, using, rank: () => me.seen + (vis ? (loops() ? 3e12 : 2e12) : loops() ? 1e12 : 0), // parked first: out of view, then in view; idle loops last in each
    park: () => { park(true); if (idling()) R.wait.add(me); }, // an idle loop in view wants its slot back
    gone: () => !!gl && gl.isContextLost(), drop: () => drop(), back: () => { if (near) acquire(); },
    want: () => (dead || gl || noGl || !near ? 0 : !snap ? 2 : busy() ? 1 : 0), take: () => acquire(snap) }; // 2: CSS fallback, 1: frozen snapshot
  const swap = (c) => { if (c !== cv) { if (cv.parentNode) cv.replaceWith(c); cv = c; } };
  const blank = () => { const c = cv.cloneNode(false); c.classList.add('nogl'); swap(c); used = snap = false; }; // no context: the CSS fallback shows
  const park = (keep) => {
    cancelAnimationFrame(raf); raf = 0; R.live.delete(me);
    if (!gl) return;
    let c = null;
    if (keep && !gl.isContextLost()) { draw(); c = cv.cloneNode(false); const x = c.getContext('2d'); if (x) x.drawImage(cv, 0, 0); else c = null; }
    if (lose && !gl.isContextLost()) lose.loseContext();
    gl = null;
    if (c) { swap(c); snap = true; c.addEventListener('contextlost', () => { if (c === cv && !dead) blank(); }); } else blank(); // a GPU reset wipes the snapshot too
  };
  const drop = () => { cancelAnimationFrame(raf); raf = 0; R.live.delete(me); gl = null; blank(); };
  const lost = (e) => { // the browser took it anyway (other WebGL in the process, a lower limit, a GPU reset)
    if (dead || e.currentTarget !== cv || !gl) return; // a canvas we parked ourselves
    const hit = [me, ...[...R.live].filter((x) => x !== me && x.gone())];
    const reset = hit.length > 1 && hit.length >= R.live.size; // a GPU reset takes every context at once, an eviction only the oldest
    for (const x of hit) x.drop();
    if (!reset) { R.cap = Math.max(2, Math.min(R.cap, R.live.size)); R.calm = performance.now() + 1e4; } // less room than the budget assumed, for now
    for (const x of hit) x.back(); // only once all are out, so none is picked as a victim while already lost
  };
  const acquire = (soft) => { // soft: it shows a snapshot, so it does not take the slot of an idle loop in view
    if (dead || gl || noGl) return;
    if (R.live.size >= R.cap && R.cap < 12 && performance.now() > R.calm) { R.cap++; R.calm = performance.now() + 1e3; } // no eviction for 10 s: one more, a second apart
    if (R.live.size >= R.cap) { // full: park the least recently seen holder not in use, idle loops last
      let v = null;
      for (const x of R.live) if (!x.using() && (!v || x.rank() < v.rank())) v = x;
      if (!v || (soft && v.rank() >= 3e12)) { R.wait.add(me); return; } // none to spare: wait for pump()
      v.park();
    }
    const c = used ? cv.cloneNode(false) : cv; // a canvas that had a context (or holds a snapshot) cannot take a new one
    if (!setup(c)) { if (gl && lose && !gl.isContextLost()) lose.loseContext(); gl = null; noGl = true; blank(); return; }
    c.classList.remove('nogl'); c.addEventListener('webglcontextlost', lost);
    draw(); swap(c); used = true; snap = false;
    R.wait.delete(me); R.live.add(me); kick();
  };
  const release = () => { if (gl) { park(false); pump(); } else if (snap) blank(); }; // out of range: drop the context or the snapshot
  const pump = () => { // a slot came free or a holder went quiet: offer it to the waiter that wants it most
    let w = null;
    for (const x of R.wait) if (!x.want()) R.wait.delete(x); else if (!w || x.want() > w.want()) w = x;
    if (w) w.take();
  };
  cv.classList.add('nogl'); // CSS fallback until the first frame
  if (typeof IntersectionObserver === 'function') {
    nearIo = new IntersectionObserver((en) => { // half a screen ahead, so a page jump finds most first frames drawn
      const e = en[en.length - 1], r = e.boundingClientRect; near = e.isIntersecting;
      if (!near) release();
      else if (r.bottom > 0 && r.top < innerHeight) acquire(); // in view: draw now
      else { R.wait.add(me); requestAnimationFrame(pump); } // just near: next frame, after the ones in view
    }, { rootMargin: '50% 0px' });
    nearIo.observe(box);
    io = new IntersectionObserver((en) => { vis = en[en.length - 1].isIntersecting; if (vis) kick(); }); // runs an idle loop, ranks a holder
    io.observe(box);
  } else { near = true; acquire(); }
  s.kick = kick; s.draw = draw;
  s.destroy = () => {
    dead = true; cancelAnimationFrame(raf); raf = 0; io && io.disconnect(); nearIo && nearIo.disconnect(); R.live.delete(me); R.wait.delete(me);
    if (gl) { if (lose && !gl.isContextLost()) lose.loseContext(); gl = null; pump(); }
  };
  return s;
}
// Lava lamp (Mathmos Astro silhouette): a brushed-metal base cone, a tapered glass vessel and a cap,
// all drawn in GLSL with fwidth-anti-aliased edges. Inside, wax is a metaball field: a pool at the bottom
// plus five blobs on slow rise-and-sink cycles that neck off the pool when warm. Off, the wax sits cold
// in the pool and the liquid is dim; switched on, the bulb lights the liquid from below and the wax warms.
const LW = 96, LH = 168;
const FS = `#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res;
float aa(float d){float w=fwidth(d);return clamp(.5-d/max(w,1e-4),0.,1.);}
float trap(vec2 p,float y0,float y1,float w0,float w1){ // signed distance-ish to a vertical trapezoid
 float k=clamp((p.y-y0)/(y1-y0),0.,1.); float hw=mix(w0,w1,k);
 return max(abs(p.x)-hw,max(y0-p.y,p.y-y1));}
vec3 metal(vec2 p,float hw,float lit){
 float u=clamp(p.x/hw,-1.,1.); float n=sqrt(1.-u*u);
 vec3 c=vec3(.42,.43,.46)*(.35+.75*n)+pow(max(0.,1.-abs(u+.42)*3.),3.)*.55+pow(max(0.,1.-abs(u-.55)*6.),3.)*.18;
 return c+vec3(1.,.45,.15)*lit;}
void main(){
 vec2 p=vec2(gl_FragCoord.x/u_res.x*${LW}.-${LW}.*.5, gl_FragCoord.y/u_res.y*${LH}.);
 float on=u_value; float t=u_time*.32;
 // parts
 float dBase=trap(p,1.,46.,40.,21.); dBase=max(dBase,-trap(p,-10.,1.5,60.,60.));
 float dGlass=trap(p,44.,140.,26.,12.5);
 float dCap=trap(p,138.,166.,12.5,6.5);
 vec3 col=vec3(0.); float a=0.;
 // glass interior
 float gk=clamp((p.y-44.)/96.,0.,1.); float ghw=mix(26.,12.5,gk);
 vec2 q=vec2(p.x/ghw, gk); // normalised: x -1..1, y 0..1
 float f=0.;
 vec2 pd=vec2(p.x,p.y-43.)/20.; f+=.81/(pd.x*pd.x*.32+pd.y*pd.y*1.5+.001);
 for(int i=0;i<5;i++){float fi=float(i); float ph=fi*2.39; float sp=.55+fi*.09;
  float cyc=.5-.5*cos(t*sp+ph);
  float y=mix(.02,mix(.1,.9,cyc),on);
  float x=.38*sin(t*.7*sp+ph*1.7)*(.3+.7*on)*(1.-y*.4);
  float r=mix(.42,.5+.12*sin(t*1.3+ph),on)*(1.-.3*y);
  vec2 d=vec2((q.x-x)*ghw,(q.y-y)*96.)/20.;
  f+=r*r/(dot(d,d)+1e-4);}
 f=min(f,40.);
 float wax=aa(1.-f);
 vec3 liq=mix(vec3(.17,.08,.18),vec3(.62,.12,.42),on*(.55+.45*(1.-gk)));
 liq+=vec3(.9,.35,.2)*on*pow(1.-gk,3.)*.35;
 vec3 waxc=mix(vec3(.55,.16,.07),mix(vec3(1.,.42,.1),vec3(1.,.72,.25),clamp((f-1.)*.6,0.,1.)),on);
 waxc*=.75+.35*smoothstep(1.,2.2,f);
 vec3 gcol=mix(liq,waxc,wax);
 float gu=q.x; gcol*=1.-.45*pow(abs(gu),3.);
 gcol+=smoothstep(.16,0.,abs(gu+.55))*.16+smoothstep(.07,0.,abs(gu-.62))*.06;
 gcol*=1.+.12*u_hover;
 // assemble with AA
 float ag=aa(dGlass), ab=aa(dBase), ac=aa(dCap);
 col=gcol; a=ag;
 vec3 bc=metal(p,mix(40.,21.,clamp((p.y-1.)/45.,0.,1.)),0.)*(1.-.25*smoothstep(46.,1.,p.y));
 bc+=vec3(1.,.5,.2)*on*.25*smoothstep(30.,46.,p.y)*(1.-abs(p.x)/30.);
 col=mix(col,bc,ab*(1.-ag*step(44.,p.y))); a=max(a,ab);
 vec3 cc=metal(p,mix(12.5,6.5,clamp((p.y-138.)/28.,0.,1.)),0.);
 col=mix(col,cc,ac*step(139.5,p.y)); a=max(a,ac);
 col+=u_press*.1*a;
 gl_FragColor=vec4(col*a,a);}`;

export default {
  id: 'sh-lava-lamp',
  credit: 'Lava lamp toggle (Mathmos Astro silhouette) in GLSL — metaball wax pooled cold in the base until switched on, then the bulb lights the liquid and warm blobs neck off the pool, rise and sink',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .lamp { position: relative; display: block; width: ${LW}px; height: ${LH}px; padding: 0; border: 0; background: transparent; cursor: pointer; isolation: isolate; filter: drop-shadow(0 6px 8px rgba(0,0,0,.22)); transition: filter .6s; -webkit-tap-highlight-color: transparent; }
    .lamp[aria-checked="true"] { filter: drop-shadow(0 6px 8px rgba(0,0,0,.22)) drop-shadow(0 0 14px rgba(255,110,60,.45)); }
    .lamp:active { transform: translateY(1px); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(0deg, #77777c 0 27%, #b33a1a 27% 40%, #2a0f2a 40% 83%, #77777c 83%); clip-path: polygon(8% 100%, 92% 100%, 72% 73%, 63% 17%, 56% 1%, 44% 1%, 37% 17%, 28% 73%); }
    .lamp:focus-visible { outline: 2px solid #ff7a2a; outline-offset: 4px; border-radius: 8px; }
  `,
  html: `<button class="lamp" type="button" role="switch" aria-checked="false" aria-label="Lava lamp"><canvas class="cv"></canvas></button>`,
  init(root) {
    const lamp = root.querySelector('.lamp'), cv = root.querySelector('.cv');
    const s = shade(cv, lamp, LW, LH, FS, { idle: true, idleWhen: (st) => st.valueT > 0, valueRate: .8, pressDecay: 2 });
    lamp.addEventListener('click', () => {
      const on = lamp.getAttribute('aria-checked') !== 'true';
      lamp.setAttribute('aria-checked', String(on)); s.valueT = on ? 1 : 0; s.kick();
    });
    return () => s.destroy();
  },
};
