// Shared shader-surface pattern, inlined per file (components may not import anything).
// shade(canvas, pointerTarget, cssW, cssH, fragmentSrc, opts) -> state object `s`
// uniforms: u_time, u_res, u_mouse (0..1, y up), u_pt (last press point), u_hover (eased), u_press (1 -> 0), u_value (eased)
const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const UNI = ['u_time', 'u_res', 'u_mouse', 'u_pt', 'u_hover', 'u_press', 'u_value'];
function shade(cv, el, w, h, fs, o = {}) {
  const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  const s = { t: 0, hover: 0, hoverT: 0, press: 0, value: 0, valueT: 0, mx: .5, my: .5, px: .5, py: .5, down: false };
  let gl = null, prog = null, U = null, raf = 0, lastT = 0, vis = false, dead = false, io = null;
  const name = () => ((cv.getRootNode().host || {}).dataset || {}).id || '';
  const setup = () => {
    gl = cv.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) return false;
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
  const kick = () => { if (!raf && gl && !dead) { lastT = performance.now(); raf = requestAnimationFrame(tick); } };
  const pos = (e) => { const r = cv.getBoundingClientRect(); if (r.width) { s.mx = (e.clientX - r.left) / r.width; s.my = 1 - (e.clientY - r.top) / r.height; } };
  el.addEventListener('pointerenter', (e) => { pos(e); s.hoverT = 1; kick(); });
  el.addEventListener('pointerleave', () => { s.hoverT = 0; s.down = false; kick(); });
  el.addEventListener('pointermove', (e) => { pos(e); kick(); });
  el.addEventListener('pointerdown', (e) => { pos(e); s.down = true; s.press = 1; s.px = s.mx; s.py = s.my; kick(); });
  el.addEventListener('pointerup', () => { s.down = false; kick(); });
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { s.px = .5; s.py = .5; s.press = 1; kick(); } });
  el.addEventListener('focus', () => { if (el.matches(':focus-visible')) { s.hoverT = 1; kick(); } });
  el.addEventListener('blur', () => { if (!el.matches(':hover')) { s.hoverT = 0; kick(); } });
  cv.addEventListener('webglcontextlost', (e) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; if (!dead) cv.classList.add('nogl'); });
  cv.addEventListener('webglcontextrestored', () => { if (!dead && setup()) { cv.classList.remove('nogl'); draw(); kick(); } });
  if (setup()) draw(); else cv.classList.add('nogl');
  if (o.idle && typeof IntersectionObserver === 'function') {
    io = new IntersectionObserver((en) => { vis = en.some((x) => x.isIntersecting); if (vis) kick(); });
    io.observe(cv);
  }
  s.kick = kick; s.draw = draw;
  s.destroy = () => { dead = true; cancelAnimationFrame(raf); raf = 0; io && io.disconnect(); if (gl) { const x = gl.getExtension('WEBGL_lose_context'); x && x.loseContext(); } gl = null; };
  return s;
}
const FS = `precision mediump float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_mouse,u_pt;
void main(){
 float W=u_res.x/u_res.y; vec2 p=gl_FragCoord.xy/u_res*vec2(W,1.);
 float t=u_time*.35;
 vec2 c1=vec2(W*.3+.5*sin(t*1.1),.5+.35*cos(t*.9));
 vec2 c2=vec2(W*.7+.5*cos(t*.8+2.),.5+.4*sin(t*1.3+1.));
 vec2 c3=mix(vec2(W*.5+.6*sin(t*.6+4.),.5+.3*cos(t*1.7)),u_mouse*vec2(W,1.),u_hover*.8);
 float w1=exp(-dot(p-c1,p-c1)*2.2),w2=exp(-dot(p-c2,p-c2)*2.2),w3=exp(-dot(p-c3,p-c3)*3.);
 vec3 col=vec3(.07,.06,.12)+w1*vec3(1.,.3,.5)+w2*vec3(.2,.5,1.)+w3*vec3(1.,.8,.2)*(1.+.5*u_hover);
 float r=length((gl_FragCoord.xy/u_res-u_pt)*vec2(W,1.))-(1.-u_press)*W;
 col+=smoothstep(.1,0.,abs(r))*u_press*.8;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-frosted-glass',
  credit: 'Frosted glass over a live shader — a WebGL colour-blob field runs behind a backdrop-filter pill; hover thins the frost, toggling it clears the glass',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; display: grid; place-items: center; width: 260px; height: 120px; max-width: 100%; border-radius: 16px; overflow: hidden; background: #110f1f; isolation: isolate; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(circle at 30% 40%, #ff4d80, transparent 50%), radial-gradient(circle at 70% 60%, #3380ff, transparent 50%), #110f1f; }
    .glass { position: relative; z-index: 1; padding: 14px 30px; border-radius: 999px; border: 1px solid rgba(255,255,255,.45); background: rgba(255,255,255,.18); color: #fff; font: 600 16px/1 'Inter', system-ui, sans-serif; letter-spacing: .02em; cursor: pointer; -webkit-backdrop-filter: blur(14px) saturate(1.4); backdrop-filter: blur(14px) saturate(1.4); box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 10px 30px -12px rgba(0,0,0,.6); transition: backdrop-filter .4s, -webkit-backdrop-filter .4s, background .3s, transform .15s; }
    .glass:hover { -webkit-backdrop-filter: blur(6px) saturate(1.4); backdrop-filter: blur(6px) saturate(1.4); }
    .glass:active { transform: scale(.97); }
    .glass[aria-pressed="true"] { -webkit-backdrop-filter: blur(0px) saturate(1.2); backdrop-filter: blur(0px) saturate(1.2); background: rgba(255,255,255,.06); }
    .glass:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
  `,
  html: `<div class="stage"><canvas class="cv"></canvas><button class="glass" type="button" aria-pressed="false">Defrost</button></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), cv = root.querySelector('.cv'), btn = root.querySelector('.glass');
    const s = shade(cv, stage, 260, 120, FS, { idle: true, pressDecay: 1.4 });
    btn.addEventListener('click', () => { btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true')); s.kick(); });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { s.hoverT = 1; s.kick(); } });
    btn.addEventListener('blur', () => { if (!stage.matches(':hover')) { s.hoverT = 0; s.kick(); } });
    return () => s.destroy();
  },
};
