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
// Terrain heightmap: 5-octave fbm land, hillshaded by a light that follows the pointer, coloured by
// elevation (beach, grass, rock, snow); the slider raises the sea level and the water is tinted by depth
// with soft foam only on the shoreline.
const FS = `precision highp float;
uniform float u_time,u_hover,u_press,u_value;uniform vec2 u_res,u_mouse;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; vec2 ar=vec2(u_res.x/u_res.y,1.); vec2 p=uv*ar*1.7+vec2(4.2,1.3);
 float h=fbm(p);
 vec2 e=vec2(.01,0.); vec3 n=normalize(vec3(fbm(p-e)-fbm(p+e),fbm(p-e.yx)-fbm(p+e.yx),.05));
 vec3 l=normalize(vec3(mix(vec2(-.6,.6),(u_mouse-.5)*2.,u_hover*.7),.75));
 float sh=max(dot(n,l),0.)*.7+.3;
 float wl=mix(.3,.7,u_value);
 vec3 land=mix(vec3(.3,.52,.24),vec3(.2,.4,.18),smoothstep(wl+.04,wl+.16,h));
 land=mix(land,vec3(.5,.43,.34),smoothstep(wl+.16,wl+.3,h));
 land=mix(land,vec3(.95,.96,.98),smoothstep(.72,.78,h));
 land=mix(vec3(.88,.8,.6),land,smoothstep(wl+.004,wl+.035,h));
 float depth=clamp((wl-h)*4.5,0.,1.);
 vec3 water=mix(vec3(.32,.74,.82),vec3(.03,.2,.42),pow(depth,.7));
 water+=.04*(noise(p*9.+u_time*.4)-.5);
 float foam=smoothstep(.012,.0,wl-h)*(.55+.45*sin(u_time*2.+p.x*30.+p.y*14.));
 float px=2./u_res.y; float land_m=smoothstep(wl-.002,wl+.002,h);
 vec3 col=mix(water+foam*.45,land*sh,land_m);
 col+=u_press*.06;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-terrain-slider',
  credit: 'Terrain heightmap slider in GLSL — fbm land hillshaded by a pointer-following sun and coloured by elevation (beach, grass, rock, snow); drag the sea level and depth-tinted water floods the valleys with soft shoreline foam',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sl { position: relative; width: 300px; height: 100px; max-width: 100%; border-radius: 14px; overflow: hidden; background: #2a4a2a; cursor: pointer; touch-action: none; user-select: none; -webkit-user-select: none; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.25); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: linear-gradient(90deg, #2a4a2a 0 50%, #1c5a9a 50%); }
    .rail { position: absolute; left: 8px; right: 8px; bottom: 8px; height: 22px; z-index: 1; border-radius: 11px; background: rgba(6,24,40,.5); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); pointer-events: none; }
    .track { position: absolute; left: 13px; right: 13px; top: 9px; height: 4px; border-radius: 2px; background: rgba(255,255,255,.22); }
    .fill { position: absolute; left: 0; top: 0; bottom: 0; width: calc(var(--v, .5) * 100%); border-radius: 2px; background: #7fd0ff; }
    .thumb { position: absolute; top: 2px; left: calc(var(--v, .5) * 100%); width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 .5px rgba(0,0,0,.25), 0 1px 3px rgba(0,0,0,.45); transition: transform .15s cubic-bezier(.2,.8,.2,1); }
    .sl:hover .thumb { transform: scale(1.15); }
    .sl.drag .thumb { transform: scale(1.25); }
    .chip { position: absolute; top: 8px; left: 8px; z-index: 1; padding: 4px 7px; border-radius: 6px; background: rgba(0,0,0,.5); color: #fff; font: 600 11px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .02em; white-space: nowrap; pointer-events: none; -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); box-shadow: inset 0 0 0 1px rgba(255,255,255,.1); }
    .sl:focus-visible { outline: 2px solid #7fd0ff; outline-offset: 3px; }
  `,
  html: `<div class="sl" role="slider" tabindex="0" aria-label="Sea level" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45" style="--v:0.45"><canvas class="cv"></canvas><span class="chip"></span><span class="rail"><span class="track"><span class="fill"></span><span class="thumb"></span></span></span></div>`,
  init(root) {
    const el = root.querySelector('.sl'), cv = root.querySelector('.cv');
    const fmt = (v) => { const m = Math.round((v - .5) * 200); return 'Sea ' + (m > 0 ? '+' : m < 0 ? '−' : '') + Math.abs(m) + ' m'; };
    const s = shade(cv, el, 300, 100, FS, { pressDecay: 3, valueRate: 9 });
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
      const k = { ArrowRight: 0.05, ArrowUp: 0.05, ArrowLeft: -0.05, ArrowDown: -0.05, PageUp: .1, PageDown: -.1 }[e.key];
      if (k) { e.preventDefault(); set(s.valueT + k); } else if (e.key === 'Home') { e.preventDefault(); set(0); } else if (e.key === 'End') { e.preventDefault(); set(1); }
    });
    set(0.45); s.value = s.valueT;
    return () => s.destroy();
  },
};
