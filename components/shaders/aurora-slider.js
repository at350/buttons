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
// Aurora borealis: two folded ribbons with a sharp lower edge, vertical ray structure (field-aligned
// rays) and an exponential fade upward; oxygen green (557.7 nm) at the base shading to the red / violet
// upper fringe, over stars and a spruce treeline. The slider is the Kp index: higher Kp brightens the
// curtains, drops them lower and brings out the red fringe.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; float ar=u_res.x/u_res.y; float px=1./u_res.y; float x=uv.x*ar;
 float t=u_time*(.1+.06*u_hover); float kp=u_value;
 vec3 col=mix(vec3(.02,.05,.1),vec3(.005,.01,.04),uv.y);
 col+=step(.995,hash(floor(gl_FragCoord.xy/1.5)))*smoothstep(.25,.9,uv.y)*(.5+.5*hash(floor(gl_FragCoord.xy/1.5)+3.));
 vec3 C=vec3(0.);
 for(int k=0;k<2;k++){float fk=float(k);
  float base=.56+.08*fk-.12*kp+.09*sin(x*1.4+t*2.3+fk*2.1)+.07*(noise(vec2(x*.8+t+fk*5.,t*.6))-.5);
  float fold=sin(x*3.1+t*3.+fk)*.6;
  float h=uv.y-base;
  float rays=.3+.7*pow(noise(vec2(x*24.+fold*3.+fk*13.,t*1.6)),1.6)*(.6+.4*noise(vec2(x*7.-t,fk)));
  float low=smoothstep(-.01,.025,h);
  float tall=mix(.2,.42,kp);
  float I=low*exp(-max(h,0.)/tall*2.3)*rays*(.55+.9*kp)*(1.-.45*fk);
  I*=.75+.25*sin(x*1.7-t*4.+fk*3.);
  vec3 c=mix(vec3(.2,1.,.5),mix(vec3(.5,.35,1.),vec3(1.,.22,.42),kp),smoothstep(.05,tall*1.2,h)*(.35+.65*kp));
  C+=c*I;}
 col+=C*(1.1+.25*u_hover);
 col+=vec3(.1,.35,.2)*exp(-(uv.y-.36)*6.)*(.3+.6*kp)*.3;
 // spruce treeline + snow
 float cx=x*16.; float id=floor(cx); float f=fract(cx)-.5; float th=.08+.1*hash(vec2(id,1.)); float tb=.37;
 float ty=tb+th*(1.-abs(f+(hash(vec2(id,2.))-.5)*.3)*2.4)+.012*sin(uv.y*400.)*step(uv.y,tb+th);
 float tree=smoothstep(px,-px,uv.y-max(ty,tb));
 col=mix(col,vec3(.01,.015,.025),tree);
 col=mix(col,vec3(.05,.08,.12)+C*.06,smoothstep(px,-px,uv.y-.37+.008*sin(x*3.)));
 col+=u_press*.06;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-aurora-slider',
  credit: 'Aurora borealis slider in GLSL — folded curtains with a sharp lower edge, field-aligned rays and an oxygen-green base fading to a red/violet fringe over a spruce treeline; the slider is the Kp index (brighter, lower, redder as it rises)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sl { position: relative; width: 300px; height: 90px; max-width: 100%; border-radius: 16px; overflow: hidden; background: #020610; cursor: pointer; touch-action: none; user-select: none; -webkit-user-select: none; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(255,255,255,.06), 0 1px 2px rgba(0,0,0,.3); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(0deg, #020610 0%, #0b6b4a 40%, #4bd3a0 60%, #020610 100%); }
    .rail { position: absolute; left: 8px; right: 8px; bottom: 8px; height: 22px; z-index: 1; border-radius: 11px; background: rgba(2,6,16,.55); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); pointer-events: none; }
    .track { position: absolute; left: 13px; right: 13px; top: 9px; height: 4px; border-radius: 2px; background: rgba(255,255,255,.22); }
    .fill { position: absolute; left: 0; top: 0; bottom: 0; width: calc(var(--v, .5) * 100%); border-radius: 2px; background: #5cf2a0; }
    .thumb { position: absolute; top: 2px; left: calc(var(--v, .5) * 100%); width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 .5px rgba(0,0,0,.25), 0 1px 3px rgba(0,0,0,.45); transition: transform .15s cubic-bezier(.2,.8,.2,1); }
    .sl:hover .thumb { transform: scale(1.15); }
    .sl.drag .thumb { transform: scale(1.25); }
    .chip { position: absolute; top: 8px; right: 8px; z-index: 1; padding: 4px 7px; border-radius: 6px; background: rgba(0,0,0,.5); color: #c9ffe2; font: 600 11px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .02em; white-space: nowrap; pointer-events: none; -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); }
    .sl:focus-visible { outline: 2px solid #5cf2a0; outline-offset: 3px; }
  `,
  html: `<div class="sl" role="slider" tabindex="0" aria-label="Kp index" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45" style="--v:0.45"><canvas class="cv"></canvas><span class="chip"></span><span class="rail"><span class="track"><span class="fill"></span><span class="thumb"></span></span></span></div>`,
  init(root) {
    const el = root.querySelector('.sl'), cv = root.querySelector('.cv');
    const fmt = (v) => 'Kp ' + (v * 9).toFixed(0);
    const s = shade(cv, el, 300, 90, FS, { idle: true, pressDecay: 2, valueRate: 5 });
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
      const k = { ArrowRight: 0.0556, ArrowUp: 0.0556, ArrowLeft: -0.0556, ArrowDown: -0.0556, PageUp: .1, PageDown: -.1 }[e.key];
      if (k) { e.preventDefault(); set(s.valueT + k); } else if (e.key === 'Home') { e.preventDefault(); set(0); } else if (e.key === 'End') { e.preventDefault(); set(1); }
    });
    set(0.45); s.value = s.valueT;
    return () => s.destroy();
  },
};
