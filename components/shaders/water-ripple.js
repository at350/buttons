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
// Pool water: square tiles with anti-aliased grout seen through the surface, an iterative caustic web
// (the well-known tileable water-caustic iteration) dancing on the floor, and click ripples as a damped
// travelling wave whose gradient refracts the floor and catches a soft specular — no raw ±height rings.
const FS = `precision highp float;
uniform float u_time,u_hover;uniform vec2 u_res;uniform vec3 u_r[3];
float AR;
float ring(vec2 uv,vec3 r){ if(r.z<=0.)return 0.;
 float d=length((uv-r.xy)*vec2(AR,1.)); float w=d-r.z*.55;
 return sin(w*42.)*exp(-w*w*90.)*exp(-r.z*1.4)*smoothstep(0.,.06,r.z)*.6;}
float hgt(vec2 uv){float h=0.;for(int i=0;i<3;i++)h+=ring(uv,u_r[i]);return h;}
float caustic(vec2 uv,float t){
 vec2 p=mod(uv*6.2832,6.2832)-250.; vec2 i=p; float c=1.; float inten=.005;
 for(int n=0;n<4;n++){float tt=t*(1.-(3.5/float(n+1)));
  i=p+vec2(cos(tt-i.x)+sin(tt+i.y),sin(tt-i.y)+cos(tt+i.x));
  c+=1./length(vec2(p.x/(sin(i.x+tt)/inten),p.y/(cos(i.y+tt)/inten)));}
 c/=4.; c=1.17-pow(c,1.4); return pow(abs(c),7.);}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; AR=u_res.x/u_res.y; float px=1./u_res.y;
 float t=u_time*.5;
 vec2 e=vec2(.003,0.);
 vec2 g=vec2(hgt(uv+e)-hgt(uv-e),hgt(uv+e.yx)-hgt(uv-e.yx))/(2.*e.x);
 vec2 sw=vec2(sin(uv.x*9.+t*1.3+uv.y*4.),cos(uv.y*11.-t*1.1+uv.x*3.))*.0035*(1.+u_hover);
 vec2 q=uv+g*.012+sw;
 vec2 tp=q*vec2(AR,1.)*3.4; vec2 gf=abs(fract(tp)-.5); float gw=.035;
 float grout=1.-smoothstep(.5-gw-px*3.4*1.2,.5-gw,max(gf.x,gf.y));
 vec3 tile=mix(vec3(.16,.62,.82),vec3(.3,.78,.92),q.y);
 vec3 col=mix(vec3(.82,.93,.97),tile,grout);
 float c=caustic(q*vec2(AR,1.)*.55,t*1.6);
 col+=c*vec3(.75,.95,1.)*.55;
 col*=.92+.08*sin(q.x*3.+t);
 vec3 n=normalize(vec3(-g*.05-sw*20.,1.));
 col+=pow(max(dot(reflect(vec3(0.,0.,-1.),n),normalize(vec3(-.35,.5,.8))),0.),60.)*.6;
 col+=dot(n.xy,vec2(-.4,.6))*.25;
 col*=.94+.08*u_hover;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-water-ripple',
  credit: 'Swimming-pool button in GLSL — anti-aliased tiles under a dancing caustic web; each click drops a damped ripple from the press point (up to three) that refracts the floor and catches the light',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 260px; height: 84px; max-width: 100%; padding: 0; border: 0; border-radius: 16px; overflow: hidden; background: #1e8fbf; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(255,255,255,.45), inset 0 2px 8px rgba(0,40,70,.25), 0 1px 2px rgba(0,0,0,.2); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: repeating-linear-gradient(90deg, #2aa4d6 0 28px, #e6f7ff 28px 30px), #2aa4d6; }
    .l { position: relative; z-index: 1; color: #fff; font: 700 20px/1 'Fraunces', Georgia, serif; font-variation-settings: 'SOFT' 100; letter-spacing: .02em; text-shadow: 0 2px 10px rgba(0,60,100,.6); pointer-events: none; }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">Dive in</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const rip = [], buf = new Float32Array(9);
    let loc = null;
    const s = shade(cv, btn, 260, 84, FS, {
      idle: true,
      after(gl, prog) { loc = gl.getUniformLocation(prog, 'u_r'); },
      uniforms(gl) { buf.fill(0); rip.forEach((r, i) => { buf[i * 3] = r.x; buf[i * 3 + 1] = r.y; buf[i * 3 + 2] = r.age; }); gl.uniform3fv(loc, buf); },
      step(st, dt) { for (const r of rip) r.age += dt; while (rip.length && rip[0].age > 3) rip.shift(); },
      busy: () => rip.length > 0,
    });
    btn.addEventListener('pointerdown', () => { if (rip.length >= 3) rip.shift(); rip.push({ x: s.px, y: s.py, age: 0 }); s.kick(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { if (rip.length >= 3) rip.shift(); rip.push({ x: .5, y: .5, age: 0 }); s.kick(); } });
    return () => s.destroy();
  },
};
