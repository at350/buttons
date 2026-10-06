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
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec2 h2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float stars(vec2 p,float sc,float tw){vec2 g=p*sc; vec2 id=floor(g),f=fract(g)-.5; vec2 o=h2(id)-.5; float d=length(f-o*.8); float b=hash(id+.3);
 return smoothstep(.1,0.,d)*step(.62,b)*(.6+.4*sin(u_time*tw+b*30.));}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*u_res)/u_res.y*2.; float r=length(uv);
 vec2 p=rot(u_value)*uv;
 vec3 col=vec3(.01,.01,.03)+fbm(p*1.4+3.)*vec3(.14,.06,.28)*(1.+.8*u_hover);
 col+=fbm(p*2.5-1.)*vec3(.02,.1,.2);
 col+=stars(p,6.,3.)*vec3(1.)+stars(p*1.3+1.,10.,4.)*.7+stars(rot(.3)*p,22.,2.)*.35*(1.+u_hover);
 float face=smoothstep(.86,.84,r); float bez=smoothstep(.99,.97,r)-face;
 float sheen=smoothstep(-.6,.6,dot(uv/max(r,1e-3),vec2(-.6,.8)));
 col=mix(vec3(0.),col,face)+bez*mix(vec3(.22,.22,.26),vec3(.75,.76,.8),sheen);
 for(int i=0;i<12;i++){float a=float(i)*.5236-u_value; vec2 tp=vec2(sin(a),cos(a))*.92; col+=smoothstep(.03,.01,length(uv-tp))*bez*.6;}
 vec2 nd=rot(-u_value)*vec2(0.,.74); col+=smoothstep(.07,.03,length(uv-nd))*face*vec3(1.,.55,.2)*(1.+u_press);
 col+=smoothstep(.09,.07,length(uv-nd))*face*vec3(1.,.55,.2)*.3;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-starfield-dial',
  credit: 'Rotary dial whose face is a GLSL star field with nebula fbm — drag around the bezel and the whole sky turns with the orange index mark',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .dial { position: relative; width: 150px; height: 150px; border-radius: 50%; overflow: hidden; background: #0a0a12; cursor: grab; touch-action: none; user-select: none; isolation: isolate; box-shadow: 0 12px 30px -10px rgba(0,0,0,.7); }
    .dial:active { cursor: grabbing; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(circle, #1a1030 0 60%, #666 61%, #333 70%); }
    .dial:focus-visible { outline: 2px solid #ffb070; outline-offset: 3px; }
  `,
  html: `<div class="dial" role="slider" tabindex="0" aria-label="Rotate sky" aria-valuemin="0" aria-valuemax="360" aria-valuenow="0"><canvas class="cv"></canvas></div>`,
  init(root) {
    const el = root.querySelector('.dial'), cv = root.querySelector('.cv');
    const s = shade(cv, el, 150, 150, FS, { pressDecay: 2 });
    let a0 = 0, v0 = 0;
    const ang = () => Math.atan2(s.my - .5, s.mx - .5);
    const set = (v) => { s.value = s.valueT = v; el.setAttribute('aria-valuenow', Math.round(((v * 180 / Math.PI) % 360 + 360) % 360)); s.kick(); };
    el.addEventListener('pointerdown', (e) => { el.setPointerCapture(e.pointerId); a0 = ang(); v0 = s.valueT; });
    el.addEventListener('pointermove', () => {
      if (!s.down) return;
      let d = ang() - a0; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI;
      set(v0 - d);
    });
    el.addEventListener('keydown', (e) => {
      const k = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? .2 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -.2 : 0;
      if (k) { e.preventDefault(); set(s.valueT + k); }
    });
    return () => s.destroy();
  },
};
