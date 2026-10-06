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
// Kaleidoscope: an object chamber of jewel-glass chips (Voronoi cells with dark lead lines and bright
// glints, backlit) seen through a two-mirror system — the angle is folded into one wedge and mirrored, so
// there are no seams. 60° mirrors give 6-fold symmetry; the toggle swaps to 45° (8-fold) with a crossfade.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res,u_mouse;
vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return fract(sin(p)*43758.5453);}
float PX;
vec3 jewel(float h){
 if(h<.16)return vec3(.85,.06,.22); if(h<.30)return vec3(.05,.3,.88); if(h<.44)return vec3(0.,.62,.4);
 if(h<.58)return vec3(1.,.64,.04); if(h<.72)return vec3(.52,.16,.86); if(h<.86)return vec3(.08,.78,.9); if(h<.93)return vec3(1.,.36,.08);
 return vec3(.98,.95,.86);}
vec3 chamber(vec2 q){
 vec2 g=q*5.6; vec2 i=floor(g), f=fract(g); float d1=9.,d2=9.; vec2 id=vec2(0.);
 for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 o=vec2(float(x),float(y)); vec2 h=h2(i+o);
  vec2 pt=o+.5+.38*sin(u_time*.35+6.2832*h)-f; float d=dot(pt,pt);
  if(d<d1){d2=d1;d1=d;id=i+o;}else if(d<d2)d2=d;}
 d1=sqrt(d1); d2=sqrt(d2); float b=d2-d1; float w=PX*5.6;
 float hc=h2(id+11.).x; vec3 c=jewel(hc);
 c*=.62+.5*smoothstep(.75,.0,d1); c+=pow(max(0.,1.-d1*1.7),6.)*.35;
 float lead=smoothstep(.028-w,.028+w,b);
 return mix(vec3(.04,.03,.05),c,lead);}
vec3 view(vec2 uv,float N,float rot){
 float r=length(uv); float a=atan(uv.y,uv.x); float seg=6.28318/N; a=mod(a,seg); a=abs(a-seg*.5);
 vec2 p=vec2(cos(a),sin(a))*r*(1.-.18*u_press);
 float c=cos(rot),s=sin(rot); p=mat2(c,-s,s,c)*p+vec2(.3,.1);
 return chamber(p);}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*u_res)/u_res.y*2.; float r=length(uv); PX=2./u_res.y;
 float rot=u_time*.12+(u_mouse.x-.5)*2.2*u_hover;
 vec3 a=view(uv,6.,rot), b=view(uv,8.,rot);
 vec3 col=mix(a,b,smoothstep(.15,.85,u_value));
 col*=(.82+.28*u_hover)*(1.-.35*smoothstep(.55,1.,r));
 float mask=smoothstep(.985+PX,.985-PX,r);
 col=mix(vec3(.02),col,mask);
 gl_FragColor=vec4(pow(col,vec3(.95)),1.);}`;

export default {
  id: 'sh-kaleidoscope',
  credit: 'Kaleidoscope eyepiece in GLSL — backlit jewel-glass chips with lead lines tumble in the object chamber behind seamless two-mirror folding; the pointer turns the tube, clicking swaps 60° (6-fold) and 45° (8-fold) mirrors',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: block; width: 150px; height: 150px; padding: 0; border: 0; border-radius: 50%; overflow: hidden; background: #111; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 3px #0c0c0e, inset 0 0 14px 4px rgba(0,0,0,.75), 0 0 0 5px #6b4d22, 0 0 0 6px #c9a35a, 0 0 0 7px #4a3416, 0 6px 16px -6px rgba(0,0,0,.6); transition: transform .2s; }
    .btn:active { transform: scale(.98); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: conic-gradient(#d4103a, #0d4de0, #00a06a, #ffa40a, #8a2be0, #d4103a); }
    .btn::after { content: ''; position: absolute; inset: 0; border-radius: 50%; box-shadow: inset 0 0 0 3px #0c0c0e, inset 0 0 16px 5px rgba(0,0,0,.7); pointer-events: none; }
    .btn:focus-visible { outline: 2px solid #c9a35a; outline-offset: 10px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Kaleidoscope: eight mirrors"><canvas class="cv"></canvas></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const s = shade(cv, btn, 150, 150, FS, { valueRate: 3, pressDecay: 2.2 });
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on)); s.valueT = on ? 1 : 0; s.kick();
    });
    return () => s.destroy();
  },
};
