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
  // mounting into the hidden measuring area costs no GPU work at all.
  const ensure = () => {
    if (dead) return;
    clearTimeout(parkT); parkT = 0;
    if (parked) { const x = parked; parked = null; x.restoreContext(); } // -> webglcontextrestored re-runs setup()
    else if (!gl) { if (setup()) { cv.classList.remove('nogl'); draw(); } }
    else if (gl.isContextLost() && lose) lose.restoreContext(); // evicted by the browser: ask for it back
  };
  const park = () => {
    parkT = 0;
    if (dead || !gl || parked || !lose || s.hoverT || s.down || gl.isContextLost()) return;
    parked = lose; cancelAnimationFrame(raf); raf = 0; lose.loseContext();
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
  cv.addEventListener('webglcontextlost', (e) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; if (!dead) cv.classList.add('nogl'); });
  cv.addEventListener('webglcontextrestored', () => { if (!dead && setup()) { cv.classList.remove('nogl'); draw(); kick(); } });
  cv.classList.add('nogl'); // CSS poster until the first frame is drawn
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
  s.destroy = () => { dead = true; cancelAnimationFrame(raf); raf = 0; clearTimeout(parkT); io && io.disconnect(); if (gl && !parked && lose) lose.loseContext(); gl = null; lose = null; parked = null; };
  return s;
}
const FS = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res;
vec3 hue(float h){return .5+.5*cos(6.2832*(h+vec3(0.,.33,.67)));}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*u_res)/u_res.y;
 float z=u_value*u_value*(3.-2.*u_value);
 float scale=1.5*pow(.0025,z);
 vec2 c=vec2(-.74529,.11307)+uv*scale*vec2(1.,1.)-vec2(.3,0.)*(1.-z)*scale;
 vec2 w=vec2(0.); float it=0.;
 for(int i=0;i<90;i++){w=vec2(w.x*w.x-w.y*w.y,2.*w.x*w.y)+c; if(dot(w,w)>16.){break;} it+=1.;}
 float sm=it-log2(max(log2(dot(w,w)),1.))+1.;
 vec3 col=it>=90.?vec3(.0):hue(sm*.025+u_time*.02+u_hover*.1)*(.6+.4*sin(sm*.35));
 col=mix(col,vec3(1.),u_press*.4*(1.-min(1.,length(uv)*2.)));
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-mandelbrot-hold',
  credit: 'Mandelbrot hold-to-zoom — press and hold to dive 400× into Seahorse Valley rendered live in GLSL (90 iterations, smooth colouring); release and it zooms back out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: end start; width: 220px; height: 140px; max-width: 100%; padding: 10px; border: 0; border-radius: 12px; overflow: hidden; background: #000; cursor: zoom-in; isolation: isolate; touch-action: none; }
    .btn:active { cursor: zoom-out; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(circle at 60% 50%, #000 0 30%, #ff9800 35%, #2a0a5e 60%); }
    .l { position: relative; z-index: 1; color: #fff; font: 500 11px/1 'IBM Plex Mono', ui-monospace, monospace; letter-spacing: .08em; background: rgba(0,0,0,.5); padding: 4px 7px; border-radius: 4px; pointer-events: none; min-width: 6ch; text-align: center; white-space: nowrap; font-variant-numeric: tabular-nums; }
    .btn:focus-visible { outline: 2px solid #ffb74d; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-label="Hold to zoom"><canvas class="cv"></canvas><span class="l">1×</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv'), lab = root.querySelector('.l');
    const s = shade(cv, btn, 220, 140, FS, {
      valueRate: 1e-9, pressDecay: 2,
      step(st, dt) {
        st.valueT = st.down || st.key ? 1 : 0;
        st.value = Math.max(0, Math.min(1, st.value + (st.valueT ? .28 : -.5) * dt));
        if (Math.abs(st.value - st.valueT) < .002) st.value = st.valueT;
        lab.textContent = (1 / Math.pow(.0025, st.value * st.value * (3 - 2 * st.value))).toFixed(0) + '×';
      },
    });
    btn.addEventListener('pointerdown', (e) => btn.setPointerCapture(e.pointerId));
    btn.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); s.key = true; s.kick(); } });
    btn.addEventListener('keyup', () => { s.key = false; s.kick(); });
    return () => s.destroy();
  },
};
