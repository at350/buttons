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
// Chladni plate: sand collects on the nodal lines of a square plate's standing wave,
// u = sin(nπx)sin(mπy) + sin(mπx)sin(nπy); the slider is the drive frequency, which picks (n, m), and
// hovering makes the sand dance. Grains are a per-pixel random threshold so the lines look granular.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res,u_pt;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; vec2 p=uv*vec2(u_res.x/u_res.y,1.);
 float n=1.+u_value*5., m=2.+u_value*3.5;
 float u=sin(n*3.1416*p.x)*sin(m*3.1416*p.y)+sin(m*3.1416*p.x)*sin(n*3.1416*p.y);
 float jit=(noise(gl_FragCoord.xy*.6+floor(u_time*24.)*7.)-.5)*.22*u_hover;
 float sand=smoothstep(.26,.02,abs(u)+jit);
 float grain=hash(floor(gl_FragCoord.xy/1.5)+floor(u_time*4.)*u_hover);
 sand*=step(.25,grain)*(.75+.25*grain);
 vec3 plate=vec3(.13,.13,.14)+.02*grain+vec3(.03,.03,.035)*(1.-uv.y);
 vec3 col=mix(plate,vec3(.93,.87,.72),sand);
 col+=u_press*.25*smoothstep(1.,0.,length((uv-u_pt)*vec2(u_res.x/u_res.y,1.)));
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-chladni-slider',
  credit: 'Chladni plate slider in GLSL — sand gathers on the nodal lines of sin(nπx)sin(mπy)+sin(mπx)sin(nπy); drag the drive frequency and the figure reshapes, hover makes the sand dance',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sl { position: relative; width: 300px; height: 90px; max-width: 100%; border-radius: 8px; overflow: hidden; background: #1c1c1e; cursor: pointer; touch-action: none; user-select: none; -webkit-user-select: none; isolation: isolate; box-shadow: 0 0 0 3px #2a2a2e, 0 0 0 4px #0c0c0e; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: repeating-radial-gradient(circle at 50% 50%, #1c1c1e 0 10px, #d8c9a0 10px 12px); }
    .rail { position: absolute; left: 8px; right: 8px; bottom: 8px; height: 22px; z-index: 1; border-radius: 11px; background: rgba(12,12,14,.72); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); pointer-events: none; }
    .track { position: absolute; left: 13px; right: 13px; top: 9px; height: 4px; border-radius: 2px; background: rgba(255,255,255,.22); }
    .fill { position: absolute; left: 0; top: 0; bottom: 0; width: calc(var(--v, .5) * 100%); border-radius: 2px; background: #ff9a3c; }
    .thumb { position: absolute; top: 2px; left: calc(var(--v, .5) * 100%); width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 .5px rgba(0,0,0,.25), 0 1px 3px rgba(0,0,0,.45); transition: transform .15s cubic-bezier(.2,.8,.2,1); }
    .sl:hover .thumb { transform: scale(1.15); }
    .sl.drag .thumb { transform: scale(1.25); }
    .chip { position: absolute; top: 8px; right: 8px; z-index: 1; padding: 4px 7px; border-radius: 6px; background: rgba(0,0,0,.5); color: #ffb46a; font: 600 11px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .02em; white-space: nowrap; pointer-events: none; -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); }
    .sl:focus-visible { outline: 2px solid #ff9a3c; outline-offset: 3px; }
  `,
  html: `<div class="sl" role="slider" tabindex="0" aria-label="Frequency" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" style="--v:0.5"><canvas class="cv"></canvas><span class="chip"></span><span class="rail"><span class="track"><span class="fill"></span><span class="thumb"></span></span></span></div>`,
  init(root) {
    const el = root.querySelector('.sl'), cv = root.querySelector('.cv');
    const fmt = (v) => Math.round(110 + v * 660) + ' Hz';
    const s = shade(cv, el, 300, 90, FS, { pressDecay: 2.5, valueRate: 9 });
    const track = root.querySelector('.track'), chip = root.querySelector('.chip');
    const set = (v) => {
      v = Math.max(0, Math.min(1, v)); s.valueT = v;
      el.style.setProperty('--v', v.toFixed(4)); el.setAttribute('aria-valuenow', String(Math.round(v * 100)));
      const txt = fmt(v); chip.textContent = txt; el.setAttribute('aria-valuetext', txt); s.kick();
    };
    const fromX = (x) => { const r = track.getBoundingClientRect(); return r.width ? (x - r.left) / r.width : s.valueT; };
    let drag = false;
    el.addEventListener('pointerdown', (e) => { drag = true; el.classList.add('drag'); try { el.setPointerCapture(e.pointerId); } catch (err) {} set(fromX(e.clientX)); });
    el.addEventListener('pointermove', (e) => { if (drag) set(fromX(e.clientX)); });
    const end = () => { drag = false; el.classList.remove('drag'); };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
    el.addEventListener('keydown', (e) => {
      const k = { ArrowRight: 0.04, ArrowUp: 0.04, ArrowLeft: -0.04, ArrowDown: -0.04, PageUp: .1, PageDown: -.1 }[e.key];
      if (k) { e.preventDefault(); set(s.valueT + k); } else if (e.key === 'Home') { e.preventDefault(); set(0); } else if (e.key === 'End') { e.preventDefault(); set(1); }
    });
    set(0.5); s.value = s.valueT;
    return () => s.destroy();
  },
};
