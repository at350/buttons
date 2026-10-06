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
    gl.getExtension('OES_standard_derivatives'); // fwidth() for pixel-exact anti-aliasing
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
// Gooey button: a pill SDF joined to three orbiting satellite drops with a polynomial smooth-min, so they
// bud off and melt back in. Hover pulls one drop to the pointer on a spring (a neck of goo follows it);
// press squashes the pill and throws the drops outward. Shaded as glossy candy with a fwidth-AA edge.
const FS = `#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_b;
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float sdRR(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float W;
float scene(vec2 p){
 vec2 c=vec2(W*.5,.5);
 float sq=u_press;
 float d=sdRR(p-c,vec2(.62+.06*sq,.19-.035*sq),.19-.035*sq);
 float t=u_time*.55;
 for(int i=0;i<3;i++){float fi=float(i); float ang=t*(1.+fi*.23)+fi*2.094;
  vec2 o=vec2(cos(ang)*(.86+.12*sin(t*1.7+fi)),sin(ang)*.36)*(1.+.35*sq);
  d=smin(d,length(p-c-o)-(.07+.015*fi),.16);}
 vec2 b=u_b*vec2(W,1.);
 d=smin(d,length(p-b)-.085*u_hover,.2*u_hover+.001);
 return d;}
void main(){
 W=u_res.x/u_res.y; vec2 p=gl_FragCoord.xy/u_res*vec2(W,1.);
 float d=scene(p); float w=fwidth(d); float m=clamp(.5-d/max(w,1e-4),0.,1.);
 float e=.004; vec2 g=vec2(scene(p+vec2(e,0.))-scene(p-vec2(e,0.)),scene(p+vec2(0.,e))-scene(p-vec2(0.,e)))/(2.*e);
 float hgt=sqrt(clamp(-d/.11,0.,1.));
 vec3 n=normalize(vec3(g*(1.-hgt)*1.6,hgt+.12));
 vec3 base=mix(vec3(.48,.24,1.),vec3(1.,.24,.6),clamp((p.x/W)*1.1-.05+(p.y-.5)*.3,0.,1.));
 float dif=.72+.28*dot(n,normalize(vec3(-.4,.55,.75)));
 vec3 col=base*dif;
 col+=pow(max(dot(reflect(vec3(0.,0.,-1.),n),normalize(vec3(-.35,.55,.75))),0.),40.)*.55;
 col+=smoothstep(.0,-.02,d)*(1.-hgt)*.08;
 vec3 bg=mix(vec3(.965,.955,1.),vec3(.93,.92,.99),gl_FragCoord.y/u_res.y);
 float sh=smoothstep(.12,-.02,scene(p+vec2(0.,.035)))*.1;
 gl_FragColor=vec4(mix(bg*(1.-sh),col,m),1.);}`;

export default {
  id: 'sh-gooey-blob',
  credit: 'Gooey candy button in GLSL — a pill SDF smooth-min-joined to orbiting drops that bud off and melt back in; hover pulls a drop to the pointer on a spring, press squashes the pill and flings the drops',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 260px; height: 120px; max-width: 100%; padding: 0; border: 0; border-radius: 18px; overflow: hidden; background: #f3f1ff; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(90,60,200,.12); -webkit-tap-highlight-color: transparent; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(60px 24px at 50% 50%, #9b3dff 98%, transparent), #f3f1ff; }
    .l { position: relative; z-index: 1; color: #fff; font: 700 17px/1 'DM Sans', system-ui, sans-serif; letter-spacing: .01em; pointer-events: none; text-shadow: 0 1px 1px rgba(80,0,90,.3); transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
    .btn:active .l { transform: scale(1.06, .92); }
    .btn:focus-visible { outline: 2px solid #7b3dff; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">Subscribe</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    let loc = null, bx = .5, by = .5, vx = 0, vy = 0;
    const s = shade(cv, btn, 260, 120, FS, {
      idle: true, pressDecay: 2.2,
      after(gl, prog) { loc = gl.getUniformLocation(prog, 'u_b'); },
      uniforms(gl) { gl.uniform2f(loc, bx, by); },
      step(st, dt) {
        const tx = st.hoverT ? st.mx : .5, ty = st.hoverT ? st.my : .5;
        vx += ((tx - bx) * 70 - vx * 9) * dt; vy += ((ty - by) * 70 - vy * 9) * dt;
        bx += vx * dt; by += vy * dt;
      },
    });
    return () => s.destroy();
  },
};
