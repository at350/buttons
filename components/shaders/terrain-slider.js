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
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res,u_mouse;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; vec2 ar=vec2(u_res.x/u_res.y,1.); vec2 p=uv*ar*1.8+vec2(4.2,1.3);
 float h=fbm(p);
 vec2 e=vec2(.012,0.); vec3 n=normalize(vec3(fbm(p-e)-fbm(p+e),fbm(p-e.yx)-fbm(p+e.yx),.06));
 vec3 l=normalize(vec3(mix(vec2(-.5,.5),(u_mouse-.5)*2.,u_hover),.7));
 float sh=max(dot(n,l),0.)*.75+.25;
 float wl=mix(.28,.72,u_value);
 vec3 land=mix(vec3(.22,.48,.22),vec3(.52,.42,.3),smoothstep(wl+.06,wl+.3,h));
 land=mix(land,vec3(.96),smoothstep(.7,.8,h));
 land=mix(vec3(.86,.78,.55),land,smoothstep(wl,wl+.045,h));
 float depth=clamp((wl-h)*5.,0.,1.);
 vec3 water=mix(vec3(.35,.72,.86),vec3(.04,.18,.48),depth);
 float foam=smoothstep(.014,0.,abs(h-wl+.004*sin(u_time*3.+p.x*25.+p.y*10.)));
 float spark=pow(noise(p*14.+u_time*.7),8.)*2.*(1.-depth);
 vec3 col=mix(land*sh,water*(.85+.15*sh)+foam*.6+spark,step(h,wl));
 float dx=abs(uv.x-u_value)*u_res.x; col+=smoothstep(2.,0.,dx)*.5*(1.-step(h,wl)*.5);
 col+=u_press*.12;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-terrain-slider',
  credit: 'Terrain heightmap slider — fbm land with hillshading in GLSL; drag to raise the water level and drown the valleys, beaches and foam follow the shoreline',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sl { position: relative; width: 300px; height: 100px; max-width: 100%; border-radius: 14px; overflow: hidden; background: #2a4a2a; cursor: ew-resize; touch-action: none; user-select: none; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(0,0,0,.3); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(90deg, #2a4a2a 0 50%, #1c5a9a 50%); }
    .v { position: absolute; left: 10px; top: 8px; z-index: 1; color: #fff; font: 600 11px/1 'JetBrains Mono', ui-monospace, monospace; background: rgba(0,0,0,.35); padding: 3px 6px; border-radius: 4px; pointer-events: none; }
    .sl:focus-visible { outline: 2px solid #7fd0ff; outline-offset: 3px; }
  `,
  html: `<div class="sl" role="slider" tabindex="0" aria-label="Sea level" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45"><canvas class="cv"></canvas><span class="v">45 m</span></div>`,
  init(root) {
    const el = root.querySelector('.sl'), cv = root.querySelector('.cv'), out = root.querySelector('.v');
    const s = shade(cv, el, 300, 100, FS, { pressDecay: 3 });
    const set = (v) => {
      v = Math.max(0, Math.min(1, v)); s.value = s.valueT = v;
      const n = Math.round(v * 100); el.setAttribute('aria-valuenow', n); out.textContent = n + ' m'; s.kick();
    };
    set(.45);
    el.addEventListener('pointerdown', (e) => { el.setPointerCapture(e.pointerId); set(s.mx); });
    el.addEventListener('pointermove', () => { if (s.down) set(s.mx); });
    el.addEventListener('keydown', (e) => {
      const k = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? .05 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -.05 : 0;
      if (k) { e.preventDefault(); set(s.valueT + k); }
    });
    return () => s.destroy();
  },
};
