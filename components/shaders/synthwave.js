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
