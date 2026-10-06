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
// Metaball switch: the thumb is two metaballs on springs — a fast lead and a slow trail. At rest they
// overlap into one round knob; when toggled the lead shoots across and the trail lags behind, so the
// knob stretches a goo neck across the track, snaps off and settles with overshoot (iOS-green when on).
const FS = `#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res;uniform vec2 u_x;
void main(){
 float W=u_res.x/u_res.y; vec2 p=gl_FragCoord.xy/u_res*vec2(W,1.);
 float x0=.5, x1=W-.5;
 vec2 a=vec2(mix(x0,x1,u_x.x),.5), b=vec2(mix(x0,x1,u_x.y),.5);
 float r=.265*(1.+.04*u_hover-.06*u_press);
 float f=r*r/dot(p-a,p-a)+r*r/dot(p-b,p-b);
 float s=1.-1./max(f,1e-3); // ~signed: 0 at the iso-line f=1
 float w=fwidth(s); float m=clamp(.5+s/max(w,1e-4),0.,1.);
 float hh=sqrt(clamp(1.-1./max(f,1e-4),0.,1.)); vec2 g=vec2(dFdx(hh),dFdy(hh))*r*u_res.y; vec3 n=normalize(vec3(-clamp(g,-4.,4.),1.));
 float lit=.8+.2*dot(n,normalize(vec3(-.3,.6,.75)));
 vec3 c=vec3(1.)*lit;
 
 c=mix(c*.94,c,smoothstep(.0,.25,p.y-.35));
 // soft drop shadow under the knob
 float fs=r*r/dot(p-a-vec2(0.,-.06),p-a-vec2(0.,-.06))+r*r/dot(p-b-vec2(0.,-.06),p-b-vec2(0.,-.06));
 float sh=smoothstep(.6,1.1,fs)*.28*(1.-m);
 gl_FragColor=vec4(c*m,m+sh*(1.-m));}`;

export default {
  id: 'sh-metaballs-toggle',
  credit: 'Metaball switch in GLSL — the knob is two spring-driven metaballs (a fast lead and a lagging trail) that stretch a goo neck across the track when toggled and fuse back into one round thumb; iOS green when on',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .tg { position: relative; display: block; width: 180px; height: 72px; max-width: 100%; padding: 0; border: 0; border-radius: 36px; overflow: hidden; background: #e3e3e8; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(0,0,0,.06), inset 0 2px 5px rgba(0,0,0,.12); transition: background .35s cubic-bezier(.32,.72,0,1); -webkit-tap-highlight-color: transparent; }
    .tg[aria-checked="true"] { background: #34c759; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: radial-gradient(circle at 36px 50%, #fff 0 26px, transparent 27px); }
    .tg[aria-checked="true"] .cv.nogl { background: radial-gradient(circle at 144px 50%, #fff 0 26px, transparent 27px); }
    .tg:focus-visible { outline: 2px solid #34c759; outline-offset: 3px; }
  `,
  html: `<button class="tg" type="button" role="switch" aria-checked="false" aria-label="Merge"><canvas class="cv"></canvas></button>`,
  init(root) {
    const btn = root.querySelector('.tg'), cv = root.querySelector('.cv');
    let loc = null, lead = 0, trail = 0, vl = 0, vt = 0, target = 0;
    const s = shade(cv, btn, 180, 72, FS, {
      pressDecay: 3,
      after(gl, prog) { loc = gl.getUniformLocation(prog, 'u_x'); },
      uniforms(gl) { gl.uniform2f(loc, lead, trail); },
      step(st, dt) {
        const n = Math.max(1, Math.ceil(dt / .008)), h = dt / n;
        for (let i = 0; i < n; i++) {
          vl += ((target - lead) * 150 - vl * 17) * h; lead += vl * h;
          vt += ((lead - trail) * 95 - vt * 13) * h; trail += vt * h;
        }
      },
      busy: () => Math.abs(vl) + Math.abs(vt) > .002 || Math.abs(target - lead) + Math.abs(target - trail) > .002,
    });
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-checked') !== 'true';
      btn.setAttribute('aria-checked', String(on)); target = on ? 1 : 0; s.valueT = target; s.kick();
    });
    return () => s.destroy();
  },
};
