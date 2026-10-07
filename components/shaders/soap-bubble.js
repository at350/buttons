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
  // mounting into the hidden measuring area costs no GPU work at all. A context the browser evicts anyway waits
  // in a shared list for the next slot a park() frees (Chrome restores evicted contexts only when another one
  // is destroyed, not when one is lost on purpose).
  const WAIT = (globalThis.__shadeWait ||= new Set());
  let restoring = false;
  const me = () => { WAIT.delete(me); if (vis && !dead && !parked && gl && gl.isContextLost()) { ensure(); return true; } return false; };
  const free = () => { for (const f of WAIT) if (f()) break; }; // a slot was freed: give it to one evicted canvas still in view
  const unpark = () => { cv.style.visibility = ''; const p = cv.parentNode; if (p && p.style) { p.style.backgroundImage = ''; p.style.backgroundSize = ''; } };
  const ensure = () => {
    if (dead) return;
    clearTimeout(parkT); parkT = 0; WAIT.delete(me);
    if (parked) { const x = parked; parked = null; restoring = true; x.restoreContext(); } // -> webglcontextrestored re-runs setup()
    else if (!gl) { if (setup()) { cv.classList.remove('nogl'); draw(); } }
    else if (gl.isContextLost() && lose) { restoring = true; lose.restoreContext(); } // evicted by the browser: ask for it back
  };
  const park = () => {
    parkT = 0;
    if (dead || !gl || parked || !lose || gl.isContextLost()) return;
    if (s.hoverT || s.down) { parkT = setTimeout(park, 1500); return; } // still in use: try again later
    // keep the last frame on the parent while the canvas is lost (a lost canvas repaints as a broken-image box)
    draw();
    try { const p = cv.parentNode; p.style.backgroundImage = `url(${cv.toDataURL()})`; p.style.backgroundSize = '100% 100%'; } catch {}
    cv.style.visibility = 'hidden';
    parked = lose; cancelAnimationFrame(raf); raf = 0; lose.loseContext();
    free();
  };
  const near = () => { // draw before the first paint of a freshly placed row (the observer would fire a frame later)
    if (gl || dead) return;
    const r = cv.getBoundingClientRect();
    if (r.width && r.bottom > -200 && r.top < innerHeight + 200) ensure();
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
  cv.addEventListener('webglcontextlost', (e) => {
    e.preventDefault(); cancelAnimationFrame(raf); raf = 0;
    if (dead) return;
    if (restoring) { restoring = false; setTimeout(() => { if (!dead && lose && gl && gl.isContextLost()) lose.restoreContext(); }, 0); } // asked before this event: ask again now that it is allowed
    else if (!parked) { cv.style.visibility = 'hidden'; if (vis) WAIT.add(me); } // evicted by the browser (a class change now would repaint it as a broken-image box)
  });
  cv.addEventListener('webglcontextrestored', () => { restoring = false; if (!dead && setup()) { cv.classList.remove('nogl'); draw(); unpark(); kick(); } });
  cv.classList.add('nogl'); // CSS poster until the first frame is drawn
  const host = cv.getRootNode().host;
  host && host.addEventListener('placed', near);
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
  s.destroy = () => {
    dead = true; cancelAnimationFrame(raf); raf = 0; clearTimeout(parkT); io && io.disconnect(); WAIT.delete(me);
    host && host.removeEventListener('placed', near);
    if (gl && !parked && lose && !gl.isContextLost()) { lose.loseContext(); free(); }
    gl = null; lose = null; parked = null;
  };
  return s;
}
// Soap bubble: thin-film interference on a sphere. Film thickness drains with gravity (thin, gold/
// black at the top; thick, banded at the bottom) and swirls with noise; per-pixel colour is the
// spectral sum of ½(1 − cos 4πn·d·cosθt/λ). It is Fresnel-weighted — clear in the middle, vivid at the
// rim — with two window reflections. Press pops it into droplets; it re-forms in about a second.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press;uniform vec2 u_res,u_mouse;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
vec3 film(float d,float ct){vec3 acc=vec3(0.),nrm=vec3(0.);
 for(int i=0;i<9;i++){float l=400.+float(i)*37.5;
  vec3 cm=vec3(exp(-pow((l-605.)/48.,2.))+.3*exp(-pow((l-440.)/22.,2.)),exp(-pow((l-545.)/42.,2.)),exp(-pow((l-455.)/32.,2.)));
  acc+=(.5-.5*cos(12.566*1.33*d*ct/l))*cm; nrm+=cm;}
 return acc/nrm;}
float rbox(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*u_res)/u_res.y*2.; float px=2./u_res.y;
 vec3 bg=mix(vec3(.05,.12,.2),vec3(.13,.27,.36),smoothstep(-1.,1.,uv.y+uv.x*.3));
 bg+=vec3(.9,.7,.45)*smoothstep(.22,.0,length(uv-vec2(-.55,-.62)))*.18+vec3(.5,.8,1.)*smoothstep(.16,.0,length(uv-vec2(.62,.5)))*.12;
 float ang=atan(uv.y,uv.x);
 float wob=1.+(.03*sin(u_time*3.1+ang*3.)+.02*sin(u_time*4.7-ang*2.))*u_hover;
 float R=.76*smoothstep(.66,.08,u_press);
 float r=length(uv)*wob;
 vec3 col=bg;
 if(R>.01){
  float z=sqrt(max(0.,R*R-r*r)); vec3 n=normalize(vec3(uv*wob,z+1e-4));
  float ct=n.z; float ctt=sqrt(1.-(1.-ct*ct)/1.77);
  vec2 sw=n.xy*1.6; float a=u_time*.25; sw=mat2(cos(a),-sin(a),sin(a),cos(a))*sw;
  float wy=n.y+.22*(noise(sw*1.6+vec2(u_time*.15,-u_time*.25))-.5)+.08*(noise(sw*4.-u_time*.3)-.5);
  float d=120.+820.*smoothstep(1.,-1.,wy);
  vec3 f=film(d,ctt); float g=dot(f,vec3(.333)); f=clamp(mix(vec3(g),f,1.6),0.,1.);
  float fr=.07+.93*pow(1.-ct,2.4);
  float inside=smoothstep(R+px,R-px,r);
  col=mix(bg,bg*(1.-.25*fr)+f*fr*1.25,inside);
  // window reflections
  vec2 w=(n.xy-vec2(-.42,.42))*vec2(1.,1.15); float wd=rbox(w,vec2(.16,.13),.05);
  float win=smoothstep(.02,-.02,wd)*(1.-smoothstep(.006,.0,min(abs(w.x),abs(w.y)))*.85);
  col+=win*inside*.55*(.6+.4*u_hover);
  col+=smoothstep(.12,.0,length(n.xy-vec2(.45,-.48)))*inside*.18;
  col+=smoothstep(px*1.5,0.,abs(r-R))*.25;
 }
 // droplets after the pop
 float po=smoothstep(.4,.9,u_press);
 if(po>0.){float rr=.72+(1.-u_press)*.55; float N=22.; float sa=floor((ang+3.1416)/6.2832*N);
  float ca=(sa+.5)/N*6.2832-3.1416; float h=hash(vec2(sa,3.));
  vec2 dp=vec2(cos(ca),sin(ca))*(rr*(.85+.3*h));
  col+=smoothstep(.05*(.6+h*.5),.0,length(uv-dp))*po*vec3(.85,.95,1.)*step(.3,h);}
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-soap-bubble',
  credit: 'Iridescent soap bubble in GLSL — spectral thin-film interference with gravity drainage and swirling thickness, Fresnel-weighted (clear centre, vivid rim) with window reflections; it wobbles under the pointer, pops into droplets on press and re-forms',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: block; width: 140px; height: 140px; padding: 0; border: 0; border-radius: 50%; overflow: hidden; background: #0d2130; cursor: pointer; isolation: isolate; box-shadow: 0 0 0 1px rgba(255,255,255,.1), 0 1px 2px rgba(0,0,0,.25), 0 10px 24px -14px rgba(0,30,60,.7); transition: transform .2s cubic-bezier(.2,.8,.2,1); }
    .btn:active { transform: scale(.97); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(circle at 38% 32%, rgba(255,255,255,.55), rgba(140,210,255,.2) 30%, rgba(255,140,220,.3) 52%, rgba(255,210,120,.25) 54%, #0d2130 56%); }
    .btn:focus-visible { outline: 2px solid #b8e4ff; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-label="Pop bubble"><canvas class="cv"></canvas></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 140, 140, FS, { pressDecay: .75 });
    return () => s.destroy();
  },
};
