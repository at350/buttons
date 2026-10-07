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
// Frosted glass over a live shader: a slow, tone-mapped colour field (magenta / indigo / amber blobs on
// deep violet) runs behind a backdrop-filter pill. Hover thins the frost and the amber blob drifts to
// the pointer; the toggle clears the glass (aria-pressed).
const FS = `precision highp float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_mouse,u_pt;
void main(){
 float W=u_res.x/u_res.y; vec2 p=gl_FragCoord.xy/u_res*vec2(W,1.);
 float t=u_time*.3;
 vec2 c1=vec2(W*.28+.45*sin(t*1.1),.5+.3*cos(t*.9));
 vec2 c2=vec2(W*.72+.45*cos(t*.8+2.),.5+.35*sin(t*1.3+1.));
 vec2 c3=mix(vec2(W*.5+.55*sin(t*.6+4.),.45+.25*cos(t*1.7)),u_mouse*vec2(W,1.),u_hover*.7);
 float w1=exp(-dot(p-c1,p-c1)*2.6),w2=exp(-dot(p-c2,p-c2)*2.4),w3=exp(-dot(p-c3,p-c3)*4.);
 vec3 col=vec3(.10,.05,.24)+w1*vec3(1.4,.18,.62)+w2*vec3(.22,.36,1.5)+w3*vec3(1.4,.72,.12)*.9;
 col=1.-exp(-col*1.25);
 float r=length((gl_FragCoord.xy/u_res-u_pt)*vec2(W,1.))-(1.-u_press)*W;
 col+=smoothstep(.1,0.,abs(r))*u_press*.35;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-frosted-glass',
  credit: 'Frosted glass over a live shader — a tone-mapped WebGL colour field drifts behind a backdrop-filter pill (blur + saturate, hairline rim, inner highlight); hover thins the frost, toggling clears the glass',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; display: grid; place-items: center; width: 260px; height: 120px; max-width: 100%; border-radius: 16px; overflow: hidden; background: #1a0d3d; isolation: isolate; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(circle at 28% 45%, #e0307f, transparent 55%), radial-gradient(circle at 72% 55%, #3d5cff, transparent 55%), #1a0d3d; }
    .glass { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; border-radius: 999px; border: 1px solid rgba(255,255,255,.32); background: linear-gradient(180deg, rgba(255,255,255,.2), rgba(255,255,255,.08)); color: #fff; font: 600 15px/1 'Inter', system-ui, sans-serif; letter-spacing: .01em; white-space: nowrap; cursor: pointer; text-shadow: 0 1px 2px rgba(20,8,50,.35); -webkit-backdrop-filter: blur(16px) saturate(1.6); backdrop-filter: blur(16px) saturate(1.6); box-shadow: inset 0 1px 0 rgba(255,255,255,.45), inset 0 -1px 0 rgba(255,255,255,.08), 0 8px 24px -10px rgba(10,0,40,.7); transition: backdrop-filter .45s cubic-bezier(.2,.8,.2,1), -webkit-backdrop-filter .45s cubic-bezier(.2,.8,.2,1), background .3s, border-color .3s, transform .15s; }
    .glass svg { width: 16px; height: 16px; flex: none; }
    .glass:hover { -webkit-backdrop-filter: blur(8px) saturate(1.6); backdrop-filter: blur(8px) saturate(1.6); border-color: rgba(255,255,255,.45); }
    .glass:active { transform: scale(.97); }
    .glass[aria-pressed="true"] { -webkit-backdrop-filter: blur(0px) saturate(1.1); backdrop-filter: blur(0px) saturate(1.1); background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.55); }
    .glass:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
  `,
  html: `<div class="stage"><canvas class="cv"></canvas><button class="glass" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/></svg>Defrost</button></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), cv = root.querySelector('.cv'), btn = root.querySelector('.glass');
    const s = shade(cv, stage, 260, 120, FS, { idle: true, pressDecay: 1.4 });
    btn.addEventListener('click', () => { btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true')); s.kick(); });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { s.hoverT = 1; s.kick(); } });
    btn.addEventListener('blur', () => { if (!stage.matches(':hover')) { s.hoverT = 0; s.kick(); } });
    return () => s.destroy();
  },
};
