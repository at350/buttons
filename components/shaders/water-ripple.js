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
uniform float u_time,u_hover;uniform vec2 u_res;uniform vec3 u_r[3];
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float ring(vec2 uv,vec3 r){ if(r.z<=0.)return 0.;
 float d=length((uv-r.xy)*vec2(u_res.x/u_res.y,1.)); float w=d-r.z*1.1;
 return sin(w*38.)*exp(-w*w*70.)*exp(-r.z*1.6)*smoothstep(0.,.04,r.z);}
float hgt(vec2 uv){float h=0.;for(int i=0;i<3;i++)h+=ring(uv,u_r[i]);return h;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; vec2 e=vec2(.004,0.);
 vec2 n=vec2(hgt(uv+e)-hgt(uv-e),hgt(uv+e.yx)-hgt(uv-e.yx))*4.;
 n+=vec2(noise(uv*7.+u_time*.5)-.5,noise(uv*7.-u_time*.4+3.)-.5)*.05*(.4+u_hover);
 vec2 q=uv+n*.18;
 vec2 g=abs(fract(q*vec2(9.,3.))-.5); float line=smoothstep(.44,.49,max(g.x,g.y));
 vec3 col=mix(vec3(.1,.55,.78),vec3(.25,.75,.9),q.y); col=mix(col,vec3(.92,.98,1.),line*.75);
 float caust=pow(noise(q*12.+u_time*.8),3.)*1.5; col+=caust*vec3(.5,.7,.8);
 col+=pow(max(0.,1.-length(n*7.-vec2(.35,-.6))),6.)*.9;
 col+=hgt(uv)*2.5; col*=.9+.15*u_hover;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-water-ripple',
  credit: 'Water ripple button — each click drops a ring from the press point; up to three ripples propagate as a GLSL height field refracting the pool tiles beneath',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 260px; height: 84px; max-width: 100%; padding: 0; border: 0; border-radius: 16px; overflow: hidden; background: #1e8fbf; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 2px rgba(255,255,255,.35); }
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
