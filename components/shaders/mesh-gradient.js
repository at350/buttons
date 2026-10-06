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
// Stripe's homepage gradient (their minigl "Gradient"): a base colour with three simplex-noise layers
// blended on top, each layer's mask = pow(smoothstep(floor, ceil, snoise(...)), 4); the plane is also
// displaced by low-frequency noise, emulated here as a slow domain warp. Hero palette from stripe.com.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_mouse,u_pt;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 perm(vec4 x){return mod289(((x*34.)+1.)*x);}vec4 tis(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
 vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
 vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
 i=mod289(i);vec4 p=perm(perm(perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
 float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
 vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
 vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
 vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
 vec4 nm=tis(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=nm.x;p1*=nm.y;p2*=nm.z;p3*=nm.w;
 vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
 return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
vec3 lin(vec3 c){return c*c;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; float ar=u_res.x/u_res.y;
 // Stripe skews the canvas ~-12deg; noise coords are the plane coords
 vec2 nc=vec2(uv.x*ar,uv.y)*.16; nc.y+=nc.x*.21;
 vec2 m=vec2(u_mouse.x*ar,u_mouse.y)*.16; m.y+=m.x*.21; vec2 dm=nc-m; nc-=dm*exp(-dot(dm,dm)*160.)*.25*u_hover;
 float t=u_time*(.05+.03*u_hover)+3.;
 nc+=.025*vec2(snoise(vec3(nc*2.,t*.7)),snoise(vec3(nc*2.+7.,t*.7)));
 vec3 c1=lin(vec3(.663,.376,.933)), c2=lin(vec3(1.,.2,.239)), c3=lin(vec3(.565,.878,1.)), c4=lin(vec3(1.,.796,.341));
 vec3 col=c1; vec3 L[3]; L[0]=c2; L[1]=c3; L[2]=c4;
 for(int i=0;i<3;i++){float fi=float(i);
  float n=snoise(vec3(nc.x*(2.+fi/3.)+t*(6.5+.3*fi)*.1,nc.y*(3.+fi/3.),t*(1.1+.03*fi)+5.+10.*fi))*.5+.5;
  n=smoothstep(.1,.63+.07*fi,n); col=mix(col,L[i],pow(n,4.)*.92+.0);}
 float r=length((uv-u_pt)*vec2(ar,1.))-(1.-u_press)*ar*1.1;
 col+=smoothstep(.18,0.,abs(r))*u_press*.35;
 gl_FragColor=vec4(sqrt(col),1.);}`;

export default {
  id: 'sh-mesh-gradient',
  credit: 'Stripe homepage mesh gradient (minigl) — base #a960ee with #ff333d / #90e0ff / #ffcb57 simplex-noise layers drifting in GLSL, Stripe\'s HoverArrow on the label; the pointer pulls the gradient',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 260px; height: 80px; max-width: 100%; padding: 0; border: 0; border-radius: 16px; overflow: hidden; background: #a960ee; cursor: pointer; isolation: isolate; box-shadow: 0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3); transition: box-shadow .15s cubic-bezier(.215,.61,.355,1), transform .15s cubic-bezier(.215,.61,.355,1); }
    .btn:hover { box-shadow: 0 30px 60px -12px rgba(50,50,93,.25), 0 18px 36px -18px rgba(0,0,0,.3); }
    .btn:active { transform: scale(.985); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(105deg, #a960ee, #ff333d 40%, #ffcb57 65%, #90e0ff); }
    .l { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 2px; white-space: nowrap; padding: 9px 14px 10px 18px; border-radius: 16.5px; background: #0a2540; color: #fff; font: 600 15px/1 'Inter', system-ui, sans-serif; letter-spacing: .01em; pointer-events: none; transition: background .15s cubic-bezier(.215,.61,.355,1); }
    .btn:hover .l { background: #425466; }
    .ha { margin-left: 6px; stroke: currentColor; fill: none; stroke-width: 2; overflow: visible; }
    .ha .ln { opacity: 0; transition: opacity .15s cubic-bezier(.215,.61,.355,1); }
    .ha .tp { transition: transform .15s cubic-bezier(.215,.61,.355,1); }
    .btn:hover .ha .ln { opacity: 1; }
    .btn:hover .ha .tp { transform: translateX(3px); }
    .btn:focus-visible { outline: 2px solid #635bff; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">Start now<svg class="ha" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><g fill-rule="evenodd"><path class="ln" d="M0 5h7"/><path class="tp" d="M1 1l4 4-4 4"/></g></svg></span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 260, 80, FS, { pressDecay: 1.6, idle: true });
    return () => s.destroy();
  },
};
