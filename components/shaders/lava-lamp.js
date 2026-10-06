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
// Lava lamp (Mathmos Astro silhouette): a brushed-metal base cone, a tapered glass vessel and a cap,
// all drawn in GLSL with fwidth-anti-aliased edges. Inside, wax is a metaball field: a pool at the bottom
// plus five blobs on slow rise-and-sink cycles that neck off the pool when warm. Off, the wax sits cold
// in the pool and the liquid is dim; switched on, the bulb lights the liquid from below and the wax warms.
const LW = 96, LH = 168;
const FS = `#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res;
float aa(float d){float w=fwidth(d);return clamp(.5-d/max(w,1e-4),0.,1.);}
float trap(vec2 p,float y0,float y1,float w0,float w1){ // signed distance-ish to a vertical trapezoid
 float k=clamp((p.y-y0)/(y1-y0),0.,1.); float hw=mix(w0,w1,k);
 return max(abs(p.x)-hw,max(y0-p.y,p.y-y1));}
vec3 metal(vec2 p,float hw,float lit){
 float u=clamp(p.x/hw,-1.,1.); float n=sqrt(1.-u*u);
 vec3 c=vec3(.42,.43,.46)*(.35+.75*n)+pow(max(0.,1.-abs(u+.42)*3.),3.)*.55+pow(max(0.,1.-abs(u-.55)*6.),3.)*.18;
 return c+vec3(1.,.45,.15)*lit;}
void main(){
 vec2 p=vec2(gl_FragCoord.x/u_res.x*${LW}.-${LW}.*.5, gl_FragCoord.y/u_res.y*${LH}.);
 float on=u_value; float t=u_time*.32;
 // parts
 float dBase=trap(p,1.,46.,40.,21.); dBase=max(dBase,-trap(p,-10.,1.5,60.,60.));
 float dGlass=trap(p,44.,140.,26.,12.5);
 float dCap=trap(p,138.,166.,12.5,6.5);
 vec3 col=vec3(0.); float a=0.;
 // glass interior
 float gk=clamp((p.y-44.)/96.,0.,1.); float ghw=mix(26.,12.5,gk);
 vec2 q=vec2(p.x/ghw, gk); // normalised: x -1..1, y 0..1
 float f=0.;
 vec2 pd=vec2(p.x,p.y-43.)/20.; f+=.81/(pd.x*pd.x*.32+pd.y*pd.y*1.5+.001);
 for(int i=0;i<5;i++){float fi=float(i); float ph=fi*2.39; float sp=.55+fi*.09;
  float cyc=.5-.5*cos(t*sp+ph);
  float y=mix(.02,mix(.1,.9,cyc),on);
  float x=.38*sin(t*.7*sp+ph*1.7)*(.3+.7*on)*(1.-y*.4);
  float r=mix(.42,.5+.12*sin(t*1.3+ph),on)*(1.-.3*y);
  vec2 d=vec2((q.x-x)*ghw,(q.y-y)*96.)/20.;
  f+=r*r/(dot(d,d)+1e-4);}
 f=min(f,40.);
 float wax=aa(1.-f);
 vec3 liq=mix(vec3(.17,.08,.18),vec3(.62,.12,.42),on*(.55+.45*(1.-gk)));
 liq+=vec3(.9,.35,.2)*on*pow(1.-gk,3.)*.35;
 vec3 waxc=mix(vec3(.55,.16,.07),mix(vec3(1.,.42,.1),vec3(1.,.72,.25),clamp((f-1.)*.6,0.,1.)),on);
 waxc*=.75+.35*smoothstep(1.,2.2,f);
 vec3 gcol=mix(liq,waxc,wax);
 float gu=q.x; gcol*=1.-.45*pow(abs(gu),3.);
 gcol+=smoothstep(.16,0.,abs(gu+.55))*.16+smoothstep(.07,0.,abs(gu-.62))*.06;
 gcol*=1.+.12*u_hover;
 // assemble with AA
 float ag=aa(dGlass), ab=aa(dBase), ac=aa(dCap);
 col=gcol; a=ag;
 vec3 bc=metal(p,mix(40.,21.,clamp((p.y-1.)/45.,0.,1.)),0.)*(1.-.25*smoothstep(46.,1.,p.y));
 bc+=vec3(1.,.5,.2)*on*.25*smoothstep(30.,46.,p.y)*(1.-abs(p.x)/30.);
 col=mix(col,bc,ab*(1.-ag*step(44.,p.y))); a=max(a,ab);
 vec3 cc=metal(p,mix(12.5,6.5,clamp((p.y-138.)/28.,0.,1.)),0.);
 col=mix(col,cc,ac*step(139.5,p.y)); a=max(a,ac);
 col+=u_press*.1*a;
 gl_FragColor=vec4(col*a,a);}`;

export default {
  id: 'sh-lava-lamp',
  credit: 'Lava lamp toggle (Mathmos Astro silhouette) in GLSL — metaball wax pooled cold in the base until switched on, then the bulb lights the liquid and warm blobs neck off the pool, rise and sink',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .lamp { position: relative; display: block; width: ${LW}px; height: ${LH}px; padding: 0; border: 0; background: transparent; cursor: pointer; isolation: isolate; filter: drop-shadow(0 6px 8px rgba(0,0,0,.22)); transition: filter .6s; -webkit-tap-highlight-color: transparent; }
    .lamp[aria-checked="true"] { filter: drop-shadow(0 6px 8px rgba(0,0,0,.22)) drop-shadow(0 0 14px rgba(255,110,60,.45)); }
    .lamp:active { transform: translateY(1px); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(0deg, #77777c 0 27%, #b33a1a 27% 40%, #2a0f2a 40% 83%, #77777c 83%); clip-path: polygon(8% 100%, 92% 100%, 72% 73%, 63% 17%, 56% 1%, 44% 1%, 37% 17%, 28% 73%); }
    .lamp:focus-visible { outline: 2px solid #ff7a2a; outline-offset: 4px; border-radius: 8px; }
  `,
  html: `<button class="lamp" type="button" role="switch" aria-checked="false" aria-label="Lava lamp"><canvas class="cv"></canvas></button>`,
  init(root) {
    const lamp = root.querySelector('.lamp'), cv = root.querySelector('.cv');
    const s = shade(cv, lamp, LW, LH, FS, { idle: true, idleWhen: (st) => st.valueT > 0, valueRate: .8, pressDecay: 2 });
    lamp.addEventListener('click', () => {
      const on = lamp.getAttribute('aria-checked') !== 'true';
      lamp.setAttribute('aria-checked', String(on)); s.valueT = on ? 1 : 0; s.kick();
    });
    return () => s.destroy();
  },
};
