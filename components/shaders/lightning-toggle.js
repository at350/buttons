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
const FS = `precision highp float;
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res,u_mouse;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
float AR,X0,X1;
float arc(vec2 uv,float seed,float t){
 float qx=(uv.x-X0)/(X1-X0); float cx=clamp(qx,0.,1.); float env=sin(cx*3.1416);
 float y=(fbm(vec2(cx*5.+seed*7.,t))-.5)*.62*env+(fbm(vec2(cx*18.+seed,t*1.3))-.5)*.14*env;
 y+=(u_mouse.y-.5)*u_hover*env*.8;
 vec2 dd=vec2((qx-cx)*(X1-X0)*AR,uv.y-.5-y);
 return length(dd);}
vec3 ball(vec2 uv,vec2 c,float R,inout float m){
 vec2 d=(uv-c)*vec2(AR,1.); float r=length(d); float px=1.5/u_res.y;
 m=smoothstep(R+px,R-px,r);
 vec3 n=vec3(d/R,sqrt(max(0.,1.-dot(d,d)/(R*R))));
 vec3 env=mix(vec3(.12,.13,.18),vec3(.75,.78,.86),smoothstep(-.3,.6,n.y))*(.35+.65*n.z);
 env+=pow(max(dot(n,normalize(vec3(-.4,.6,.7))),0.),26.)*.9;
 env+=vec3(.55,.65,1.)*pow(1.-n.z,2.)*u_value*.6;
 return env;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; AR=u_res.x/u_res.y; X0=.15; X1=.85;
 float t=floor(u_time*18.)*.41;
 vec3 col=mix(vec3(.025,.025,.06),vec3(.06,.06,.13),uv.y)*(1.-.35*pow(abs(uv.x-.5)*2.,2.));
 // rods from the walls to the terminals
 float rod=smoothstep(.035,.02,abs(uv.y-.5))*(step(uv.x,X0)+step(X1,uv.x));
 col=mix(col,vec3(.22,.23,.28)+vec3(.25)*smoothstep(.03,0.,abs(uv.y-.512)),rod);
 float on=u_value*(.7+.3*hash(vec2(t,1.)));
 float d1=arc(uv,1.,t), d2=arc(uv,2.,t+5.);
 float core=exp(-d1*150.)+exp(-d2*190.)*.6; float glow=exp(-d1*10.)*.4+exp(-d2*12.)*.22;
 col+=(core*vec3(.94,.96,1.)+glow*vec3(.42,.52,1.))*on*(1.+u_press*2.2);
 // idle corona while hovered off: the terminals are charging
 float ea=length((uv-vec2(X0,.5))*vec2(AR,1.)), eb=length((uv-vec2(X1,.5))*vec2(AR,1.));
 float ch=u_hover*(1.-u_value)*(.6+.4*sin(u_time*14.));
 col+=(exp(-max(ea-.12,0.)*30.)+exp(-max(eb-.12,0.)*30.))*vec3(.35,.45,1.)*.35*ch;
 col+=(exp(-max(ea-.11,0.)*14.)+exp(-max(eb-.11,0.)*14.))*vec3(.35,.45,1.)*.45*u_value;
 // standby: a faint static charge halo so the off state reads as live hardware
 col+=(exp(-max(ea-.11,0.)*22.)+exp(-max(eb-.11,0.)*22.))*vec3(.3,.4,1.)*.16*(1.-u_value);
 float ma,mb; vec3 ba=ball(uv,vec2(X0,.5),.115,ma), bb=ball(uv,vec2(X1,.5),.115,mb);
 col=mix(col,ba,ma); col=mix(col,bb,mb);
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-lightning-toggle',
  credit: 'Electric arc toggle — two fbm-jittered lightning bolts leap between electrodes in GLSL while on; the pointer bends the arcs, a press overloads them',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .tg { position: relative; display: block; width: 240px; height: 90px; max-width: 100%; padding: 0; border: 0; border-radius: 12px; overflow: hidden; background: #08081a; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(circle at 13% 50%, #889 0 8px, transparent 9px), radial-gradient(circle at 87% 50%, #889 0 8px, transparent 9px), #08081a; }
    .tg[aria-pressed="true"] .cv.nogl { background: linear-gradient(180deg, transparent 48%, #9ab 49%, #9ab 51%, transparent 52%), radial-gradient(circle at 13% 50%, #bcf 0 8px, transparent 9px), radial-gradient(circle at 87% 50%, #bcf 0 8px, transparent 9px), #08081a; }
    .tg:focus-visible { outline: 2px solid #8fa8ff; outline-offset: 3px; }
  `,
  html: `<button class="tg" type="button" role="switch" aria-checked="false" aria-pressed="false" aria-label="Power arc"><canvas class="cv"></canvas></button>`,
  init(root) {
    const btn = root.querySelector('.tg'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 240, 90, FS, { idle: true, idleWhen: (st) => st.valueT > 0, valueRate: 10, pressDecay: 2.5 });
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on)); btn.setAttribute('aria-checked', String(on));
      s.valueT = on ? 1 : 0; s.kick();
    });
    return () => s.destroy();
  },
};
