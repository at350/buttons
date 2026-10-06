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
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res;
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; float W=u_res.x/u_res.y; vec2 p=uv*vec2(W,1.);
 float t=u_time*.3; float f=0.;
 for(int i=0;i<5;i++){float fi=float(i); float ph=fi*1.7;
  float yr=.45+.42*sin(t*(.6+fi*.11)+ph);
  vec2 c=vec2(W*.5+W*.28*sin(t*.8+ph*2.1),mix(.1,yr,u_value));
  float r=.12+.04*sin(t*2.+ph)*u_value;
  f+=r*r/dot(p-c,p-c);}
 vec2 pool=vec2(W*.5,-.05); f+=.085/dot(p-pool,p-pool);
 float m=smoothstep(.9,1.08,f);
 vec3 wax=mix(vec3(.45,.14,.14),vec3(1.,.38,.12),u_value)+u_hover*.08;
 vec3 liquid=mix(vec3(.06,.04,.1),vec3(.42,.1,.34),u_value*(.6+.5*(1.-uv.y)));
 vec3 col=mix(liquid,wax,m);
 col+=smoothstep(1.08,1.7,f)*vec3(.3,.15,.05)*u_value;
 col*=1.-.45*pow(abs(uv.x-.5)*2.,3.);
 col+=pow(max(0.,1.-abs(uv.x-.3)*6.),4.)*.12;
 col+=u_press*.15;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-lava-lamp',
  credit: 'Lava lamp toggle — GLSL metaball wax blobs that sit cold in the base until switched on, then warm to orange and drift up the lamp',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { display: inline-flex; flex-direction: column; align-items: center; gap: 6px; }
    .lamp { position: relative; width: 96px; height: 150px; border-radius: 48px 48px 14px 14px / 70px 70px 14px 14px; overflow: hidden; background: #140a16; isolation: isolate; box-shadow: inset 0 0 0 2px rgba(255,255,255,.08); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(0deg, #ff6020 0 25%, #2a0f2a 25%); }
    .base { width: 96px; height: 14px; border-radius: 0 0 10px 10px; background: linear-gradient(180deg, #9a9ba3, #4a4b52); display: grid; place-items: center; cursor: pointer; border: 0; padding: 0; margin-top: -2px; }
    .base i { display: block; width: 8px; height: 8px; border-radius: 50%; background: #333; box-shadow: inset 0 1px 2px #000; transition: background .3s, box-shadow .3s; }
    .base[aria-pressed="true"] i { background: #ff7a2a; box-shadow: 0 0 8px #ff7a2a; }
    .base:focus-visible { outline: 2px solid #ff7a2a; outline-offset: 2px; }
  `,
  html: `<div class="wrap"><div class="lamp"><canvas class="cv"></canvas></div><button class="base" type="button" aria-pressed="false" aria-label="Lamp power"><i></i></button></div>`,
  init(root) {
    const wrap = root.querySelector('.wrap'), cv = root.querySelector('.cv'), sw = root.querySelector('.base');
    const s = shade(cv, wrap, 96, 150, FS, { idle: true, idleWhen: (st) => st.valueT > 0, valueRate: .9, pressDecay: 2 });
    sw.addEventListener('click', () => {
      const on = sw.getAttribute('aria-pressed') !== 'true';
      sw.setAttribute('aria-pressed', String(on)); s.valueT = on ? 1 : 0; s.kick();
    });
    return () => s.destroy();
  },
};
