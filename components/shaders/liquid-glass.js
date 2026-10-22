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
// Apple Liquid Glass (iOS 26 / WWDC25): a capsule lens over live content. Inside a rounded bevel the
// surface tilts, so rays refract OUTWARD — content from beyond the edge is pulled into the rim and the
// centre is gently magnified; the three channels refract by slightly different amounts (dispersion);
// a thin two-sided specular rim catches the light; a soft contact shadow sits underneath. The wallpaper is a
// photo from the asset pack, uploaded once as a texture and cover-fitted to the canvas (u_crop).
const FS = `precision highp float;
uniform float u_hover,u_press;uniform vec2 u_res,u_mouse;
float sdRR(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float PX;
uniform sampler2D u_tex;uniform vec2 u_crop;
vec3 wall(vec2 p){
 vec2 t=.5+(vec2(p.x*u_res.y/u_res.x,p.y)-.5)*u_crop;
 return texture2D(u_tex,clamp(t,vec2(.001),vec2(.999))).rgb;}
void main(){
 PX=1./u_res.y;
 vec2 uv=gl_FragCoord.xy/u_res; float ar=u_res.x/u_res.y; vec2 p=vec2(uv.x*ar,uv.y);
 vec2 ctr=vec2(ar*.5,.5); vec2 mp=u_mouse*vec2(ar,1.);
 vec2 c=ctr+(mp-ctr)*vec2(.05,.08)*u_hover;
 float sc=1.+.07*u_press;
 vec2 b=vec2(.62,.27)*sc; float R=b.y;
 float d=sdRR(p-c,b,R);
 vec2 e=vec2(PX,0.);
 vec2 n=normalize(vec2(sdRR(p-c+e,b,R)-sdRR(p-c-e,b,R),sdRR(p-c+e.yx,b,R)-sdRR(p-c-e.yx,b,R))+1e-6);
 float W=.15; float k=clamp(1.+d/W,0.,1.);
 float amt=pow(k,2.6)*.16;
 vec2 q=c+(p-c)*.93;
 vec3 g;
 g.r=wall(q+n*amt*1.18).r; g.g=wall(q+n*amt).g; g.b=wall(q+n*amt*.84).b;
 g=mix(g,vec3(1.),.10+.06*u_hover+.1*u_press);
 vec2 L=normalize(mix(vec2(-.62,.78),normalize(mp-c+vec2(1e-4)),.55*u_hover));
 float ld=dot(n,L);
 float rim=smoothstep(-.03,-.004,d);
 g+=rim*(pow(max(ld,0.),2.)*.85+pow(max(-ld,0.),2.)*.45);
 g+=pow(k,5.)*max(ld,0.)*.18;
 g+=(1.-k)*.03*(.5+.5*(p.y-c.y)/b.y);
 float ds=sdRR(p-c-vec2(0.,-.035),b,R);
 vec3 bg=wall(p)*(1.-.28*(1.-smoothstep(-.02,.13,ds)));
 float inside=smoothstep(PX,-PX,d);
 gl_FragColor=vec4(mix(bg,g,inside),1.);}`;

export default {
  id: 'sh-liquid-glass',
  credit: 'Apple Liquid Glass (WWDC25 / iOS 26) in GLSL — a capsule lens refracts the wallpaper outward at its bevel with RGB dispersion, a two-sided specular rim and contact shadow; it leans toward the pointer and swells on press',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 280px; height: 110px; max-width: 100%; padding: 0; border: 0; border-radius: 20px; overflow: hidden; background: #13202c; cursor: pointer; isolation: isolate; -webkit-tap-highlight-color: transparent; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: url(assets/real/wall-macos-tahoe-dark.jpg) center / cover; }
    .l { position: relative; z-index: 1; color: #fff; font: 600 17px/1 system-ui, -apple-system, 'Inter', sans-serif; letter-spacing: -.022em; pointer-events: none; text-shadow: 0 1px 2px rgba(0,0,0,.18), 0 0 12px rgba(0,0,0,.12); transition: transform .35s cubic-bezier(.32,.72,0,1); }
    .btn:active .l { transform: scale(1.06); }
    .btn:focus-visible { outline: 2px solid #0a84ff; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">Continue</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const photo = new Image();
    let gl0 = null, tex = null, uCrop = null, crop = [1, 1];
    const upload = () => {
      if (!gl0 || gl0.isContextLost() || !tex || !photo.naturalWidth) return;
      gl0.bindTexture(gl0.TEXTURE_2D, tex);
      gl0.pixelStorei(gl0.UNPACK_FLIP_Y_WEBGL, true);
      gl0.texImage2D(gl0.TEXTURE_2D, 0, gl0.RGBA, gl0.RGBA, gl0.UNSIGNED_BYTE, photo);
      const ia = photo.naturalWidth / photo.naturalHeight, ca = cv.width / cv.height; // cover-fit
      crop = ia > ca ? [ca / ia, 1] : [1, ia / ca];
    };
    const s = shade(cv, btn, 280, 110, FS, {
      pressDecay: 1.4,
      step: (st) => { if (st.down) st.press = Math.max(st.press, 1); },
      after: (gl, prog) => {
        gl0 = gl; tex = gl.createTexture(); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([214, 196, 206, 255]));
        for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
        gl.uniform1i(gl.getUniformLocation(prog, 'u_tex'), 0);
        uCrop = gl.getUniformLocation(prog, 'u_crop');
        upload();
      },
      uniforms: (gl) => gl.uniform2f(uCrop, crop[0], crop[1]),
    });
    photo.onload = () => { upload(); s.draw(); };
    photo.src = 'assets/real/wall-macos-tahoe-dark.jpg';
    return () => { photo.onload = null; s.destroy(); };
  },
};
