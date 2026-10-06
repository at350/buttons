// Shared shader-surface pattern, inlined per file (components may not import anything).
// shade(canvas, pointerTarget, cssW, cssH, fragmentSrc, opts) -> state object `s`
// uniforms: u_time, u_res, u_mouse (0..1, y up), u_pt (last press point), u_hover (eased), u_press (1 -> 0), u_value (eased)
const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const UNI = ['u_time', 'u_res', 'u_mouse', 'u_pt', 'u_hover', 'u_press', 'u_value'];
function shade(cv, el, w, h, fs, o = {}) {
  const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  const s = { t: 0, hover: 0, hoverT: 0, press: 0, value: 0, valueT: 0, mx: .5, my: .5, px: .5, py: .5, down: false };
  let gl = null, prog = null, U = null, raf = 0, lastT = 0, vis = false, dead = false, io = null, lose = null, parked = null, parkT = 0;
  const name = () => ((cv.getRootNode().host || {}).dataset || {}).id || '';
  const setup = () => {
    gl = cv.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) return false;
    lose = gl.getExtension('WEBGL_lose_context'); // grabbed now: a lost context hands out no extensions
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
  const kick = () => { if (!raf && gl && !parked && !dead) { lastT = performance.now(); raf = requestAnimationFrame(tick); } };
  // The context is created on first approach to the viewport and parked (lost on purpose) while far away, so a
  // page with hundreds of live elements stays under the browser's active-context limit (16 in Chrome) and
  // mounting into the hidden measuring area costs no GPU work at all.
  const ensure = () => {
    if (dead) return;
    clearTimeout(parkT); parkT = 0;
    if (parked) { const x = parked; parked = null; x.restoreContext(); } // -> webglcontextrestored re-runs setup()
    else if (!gl) { if (setup()) { cv.classList.remove('nogl'); draw(); } }
    else if (gl.isContextLost() && lose) lose.restoreContext(); // evicted by the browser: ask for it back
  };
  const park = () => {
    parkT = 0;
    if (dead || !gl || parked || !lose || s.hoverT || s.down || gl.isContextLost()) return;
    parked = lose; cancelAnimationFrame(raf); raf = 0; lose.loseContext();
  };
  const pos = (e) => { const r = cv.getBoundingClientRect(); if (r.width) { s.mx = (e.clientX - r.left) / r.width; s.my = 1 - (e.clientY - r.top) / r.height; } };
  el.addEventListener('pointerenter', (e) => { pos(e); s.hoverT = 1; ensure(); kick(); });
  el.addEventListener('pointerleave', () => { s.hoverT = 0; s.down = false; kick(); });
  el.addEventListener('pointermove', (e) => { pos(e); kick(); });
  el.addEventListener('pointerdown', (e) => { pos(e); s.down = true; s.press = 1; s.px = s.mx; s.py = s.my; ensure(); kick(); });
  el.addEventListener('pointerup', () => { s.down = false; kick(); });
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { s.px = .5; s.py = .5; s.press = 1; ensure(); kick(); } });
  el.addEventListener('focus', () => { if (el.matches(':focus-visible')) { s.hoverT = 1; ensure(); kick(); } });
  el.addEventListener('blur', () => { if (!el.matches(':hover')) { s.hoverT = 0; kick(); } });
  cv.addEventListener('webglcontextlost', (e) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; if (!dead) cv.classList.add('nogl'); });
  cv.addEventListener('webglcontextrestored', () => { if (!dead && setup()) { cv.classList.remove('nogl'); draw(); kick(); } });
  cv.classList.add('nogl'); // CSS poster until the first frame is drawn
  if (typeof IntersectionObserver === 'function') {
    // near the viewport: hold a context (and animate, for idle shaders); far away for a while: park it
    io = new IntersectionObserver((en) => {
      vis = en.some((x) => x.isIntersecting);
      clearTimeout(parkT); parkT = 0;
      if (vis) { ensure(); kick(); } else parkT = setTimeout(park, 1500);
    }, { rootMargin: '200px' });
    io.observe(cv);
  } else ensure();
  s.kick = kick; s.draw = draw;
  s.destroy = () => { dead = true; cancelAnimationFrame(raf); raf = 0; clearTimeout(parkT); io && io.disconnect(); if (gl && !parked && lose) lose.loseContext(); gl = null; lose = null; parked = null; };
  return s;
}
const FS = `precision mediump float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_mouse,u_pt;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec2 h2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}
vec3 hue(float h){return .5+.5*cos(6.2832*(h+vec3(0.,.33,.67)));}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; vec2 ar=vec2(u_res.x/u_res.y,1.); float S=4.5; vec2 p=uv*ar*S;
 vec2 ip=floor(p),fp=fract(p); float md=8.,md2=8.; vec2 mc=vec2(0.);
 for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){vec2 g=vec2(float(i),float(j)); vec2 o=h2(ip+g); o=.5+.4*sin(u_time*.7+6.28*o);
  float d=length(g+o-fp); if(d<md){md2=md;md=d;mc=ip+g+o;}else if(d<md2)md2=d;}
 float edge=smoothstep(.0,.09,md2-md);
 vec2 cm=mc/(S*ar);
 vec2 dm=(cm-u_mouse)*ar; float near=exp(-dot(dm,dm)*9.)*u_hover;
 vec2 dp=(cm-u_pt)*ar; float flash=u_press*exp(-length(dp)*3.5)*2.2;
 float id=hash(mc);
 vec3 base=vec3(.06,.07,.11)+.035*id;
 vec3 glow=hue(id*.25+.52+u_time*.04);
 vec3 c=base+glow*(near+flash)*.95;
 c=mix(vec3(.55,.7,1.)*(.35+near+flash*.5),c,edge);
 gl_FragColor=vec4(c,1.);}`;

export default {
  id: 'sh-voronoi',
  credit: 'Voronoi cell button — drifting Worley cells in GLSL; cells light up in their own hue as the pointer nears, and a press flashes outward from the clicked cell',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 260px; height: 90px; max-width: 100%; padding: 0; border: 0; border-radius: 16px; overflow: hidden; background: #0f1119; cursor: pointer; isolation: isolate; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(circle at 20% 30%, #233 0 20%, transparent 21%), radial-gradient(circle at 70% 60%, #233 0 24%, transparent 25%), #0f1119; }
    .l { position: relative; z-index: 1; color: #e8ecff; font: 500 18px/1 'Inter', system-ui, sans-serif; letter-spacing: .02em; padding: 8px 18px; border-radius: 999px; background: rgba(10,12,20,.55); backdrop-filter: blur(4px); pointer-events: none; transition: background .3s; }
    .btn:hover .l { background: rgba(10,12,20,.3); }
    .btn:focus-visible { outline: 2px solid #9fb6ff; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">Explore cells</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 260, 90, FS, { pressDecay: 1.5 });
    return () => s.destroy();
  },
};
