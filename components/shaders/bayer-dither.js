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
// Ordered (Bayer) dithering, 1-bit: an 8×8 threshold matrix built recursively from [[0,2],[3,1]]
// (M2n = 4·Mn + M2 offsets) applied to a smooth light field on a 2-css-px grid — the classic
// System 6 desktop look. The label sits on a Macintosh default button (1px frame + 3px outer ring);
// a pointer spotlight walks through the threshold levels, press inverts the button like the real one.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_mouse;
float b2(vec2 p){p=floor(mod(p,2.));return 2.*p.x+3.*p.y-4.*p.x*p.y;}
float bayer8(vec2 p){return (16.*b2(p)+4.*b2(floor(p*.5))+b2(floor(p*.25))+.5)/64.;}
void main(){
 float dpr=u_res.y/72.; vec2 pp=floor(gl_FragCoord.xy/(2.*dpr));
 vec2 cuv=(pp+.5)*2.*dpr/u_res; float ar=u_res.x/u_res.y; vec2 q=vec2(cuv.x*ar,cuv.y);
 float l=.12+.62*smoothstep(-.1,1.15,cuv.x+.25*cuv.y)+.09*sin(q.x*2.3+u_time*.6)*sin(q.y*3.1-u_time*.4);
 vec2 dm=(cuv-u_mouse)*vec2(ar,1.); l+=u_hover*.55*exp(-dot(dm,dm)*2.6)-u_hover*.12;
 float on=step(bayer8(pp),clamp(l,0.,1.));
 vec3 ink=vec3(.098,.098,.09), paper=vec3(.95,.94,.9);
 gl_FragColor=vec4(mix(ink,paper,on),1.);}`;

export default {
  id: 'sh-bayer-dither',
  credit: '1-bit Bayer dither in GLSL — an 8×8 ordered-dither matrix over a moving light field (System 6 desktop look) behind a Macintosh default button; the spotlight follows the pointer, press inverts the button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 240px; height: 72px; max-width: 100%; padding: 0; border: 0; border-radius: 4px; overflow: hidden; background: #f2f0e6; cursor: pointer; isolation: isolate; box-shadow: 0 0 0 2px #191917; -webkit-tap-highlight-color: transparent; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; image-rendering: pixelated; }
    .cv.nogl { background: repeating-conic-gradient(#191917 0 25%, #f2f0e6 0 50%) 0 0 / 4px 4px; }
    .ring { position: relative; z-index: 1; padding: 3px; border: 3px solid #191917; border-radius: 13px; background: #f2f0e6; pointer-events: none; }
    .l { display: block; padding: 7px 20px 8px; border: 1px solid #191917; border-radius: 8px; background: #f2f0e6; color: #191917; font: 600 15px/1 'IBM Plex Mono', ui-monospace, monospace; letter-spacing: .02em; white-space: nowrap; }
    .btn:active .l { background: #191917; color: #f2f0e6; }
    .btn:focus-visible { outline: 2px solid #191917; outline-offset: 4px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="ring"><span class="l">Print</span></span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 240, 72, FS, { pressDecay: 2.5 });
    return () => s.destroy();
  },
};
