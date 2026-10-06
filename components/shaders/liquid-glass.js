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
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_mouse;
float sdRR(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
vec3 bgc(vec2 p){
 vec3 c=mix(vec3(.95,.93,.99),vec3(.82,.9,1.),p.y);
 vec2 g=fract(p*vec2(16.,6.5))-.5; c-=smoothstep(.13,.09,length(g))*.4;
 c=mix(c,vec3(1.,.45,.3),smoothstep(.015,0.,abs(p.y-.5+.14*sin(p.x*7.+u_time*.6))-.035));
 c=mix(c,vec3(.3,.5,1.),smoothstep(.015,0.,abs(p.y-.3+.1*cos(p.x*5.-u_time*.4))-.02));
 return c;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; vec2 ar=vec2(u_res.x/u_res.y,1.); vec2 p=uv*ar;
 vec2 c=mix(vec2(ar.x*.5,.5),u_mouse*ar,u_hover);
 vec2 b=vec2(.6,.3)*vec2(1.+.12*u_press,1.-.14*u_press); float R=.29;
 float d=sdRR(p-c,b,R);
 float inL=smoothstep(.004,-.004,d);
 vec2 e=vec2(.004,0.);
 vec2 grad=normalize(vec2(sdRR(p-c+e,b,R)-sdRR(p-c-e,b,R),sdRR(p-c+e.yx,b,R)-sdRR(p-c-e.yx,b,R))+1e-5);
 float edgeF=smoothstep(-.2,0.,d);
 float bend=pow(edgeF,3.)*.14;
 vec2 q=p-grad*bend-(p-c)*.07*(1.-edgeF);
 vec3 bg=bgc(p/ar), ref=bgc(q/ar)*1.04+.03;
 vec3 col=mix(bg,ref,inL);
 float rim=smoothstep(.0,-.025,d)*(1.-smoothstep(-.025,-.06,d));
 float ld=dot(grad,normalize(vec2(-.6,.85)));
 col+=rim*(max(ld,0.)*.95+max(-ld,0.)*.45)*inL;
 col-=smoothstep(.16,0.,d)*(1.-inL)*.14;
 col+=inL*(1.-edgeF)*.03;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-liquid-glass',
  credit: 'Liquid Glass (Apple WWDC25 look) done in GLSL — a rounded-rect SDF lens refracts the pattern behind it with edge-bending, specular rim and drop shadow; it follows the pointer',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 280px; height: 110px; max-width: 100%; padding: 0; border: 0; border-radius: 18px; overflow: hidden; background: #e9eefb; cursor: pointer; isolation: isolate; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(circle at 50% 50%, rgba(255,255,255,.7) 0 30%, transparent 32%), #dfe6fa; }
    .l { position: relative; z-index: 1; color: #1b1f33; font: 600 17px/1 'Inter', system-ui, sans-serif; letter-spacing: -.01em; pointer-events: none; text-shadow: 0 1px 0 rgba(255,255,255,.7); }
    .btn:focus-visible { outline: 2px solid #3a6cff; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">Continue</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 280, 110, FS, { pressDecay: 3 });
    return () => s.destroy();
  },
};
