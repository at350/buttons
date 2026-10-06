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
uniform float u_time,u_hover,u_value;uniform vec2 u_res;uniform sampler2D u_tex;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 uv=gl_FragCoord.xy/u_res; vec2 c=uv*2.-1.;
 float r2=dot(c,c); vec2 bc=c*(1.+.13*r2);
 float pw=u_value;
 vec2 sc=vec2(bc.x,bc.y/max(pw,.002)); vec2 q=sc*.5+.5;
 float inside=step(abs(sc.x),1.)*step(abs(sc.y),1.);
 float band=floor(q.x*7.);
 vec3 bars=vec3(1.)-vec3(mod(band,2.),mod(floor(band*.5),2.),mod(floor(band*.25),2.));
 vec3 content=mix(bars*.75,vec3(.06,.06,.08),step(q.y,.42));
 content=mix(content,vec3(.9,.9,.9),step(q.y,.42)*step(.5,fract(q.x*30.))*step(q.y,.1));
 float txt=texture2D(u_tex,q+vec2(.004*sin(u_time*9.+q.y*25.)*u_hover,0.)).a;
 content=mix(content,vec3(1.,.95,.9),txt);
 content=mix(vec3(hash(q*u_res+fract(u_time)*77.))*.9,content,smoothstep(.0,.9,pw));
 float sl=.78+.22*sin(q.y*u_res.y*1.2);
 vec3 mask=.85+.25*vec3(sin(gl_FragCoord.x*2.1),sin(gl_FragCoord.x*2.1+2.1),sin(gl_FragCoord.x*2.1+4.2));
 vec3 col=content*sl*mask*inside*(1.15+.2*u_hover)*(.96+.04*sin(u_time*55.));
 col*=1.-r2*.35;
 col+=exp(-abs(bc.y)*50.)*(1.-pw)*pw*6.*vec3(.9,1.,1.);
 col=col*smoothstep(0.,.03,pw)+vec3(.015,.02,.03)*(1.-r2*.6)*(1.-pw);
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-crt-toggle',
  credit: 'CRT power toggle in GLSL — barrel distortion, scanlines, RGB phosphor mask and vignette over colour bars; switching off collapses the picture to a bright line',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .tv { position: relative; width: 240px; height: 150px; max-width: 100%; border-radius: 14px; overflow: hidden; background: #050505; box-shadow: inset 0 0 0 6px #2a2a2e, inset 0 0 0 7px #111, 0 10px 30px -10px rgba(0,0,0,.8); isolation: isolate; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: repeating-linear-gradient(0deg, #000 0 2px, #223 2px 4px); }
    .pw { position: absolute; right: 12px; bottom: 10px; z-index: 2; width: 30px; height: 30px; border-radius: 50%; border: 2px solid #555; background: radial-gradient(circle at 50% 35%, #4a4a50, #1a1a1e); color: #777; cursor: pointer; display: grid; place-items: center; padding: 0; transition: box-shadow .3s, color .3s; }
    .pw svg { width: 14px; height: 14px; }
    .pw[aria-pressed="true"] { color: #5cf29a; box-shadow: 0 0 10px #5cf29a88; }
    .pw:active { transform: scale(.94); }
    .pw:focus-visible { outline: 2px solid #5cf29a; outline-offset: 2px; }
  `,
  html: `<div class="tv"><canvas class="cv"></canvas><button class="pw" type="button" aria-pressed="false" aria-label="Power"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 3v9"/><path d="M6.3 6.3a8 8 0 1 0 11.4 0"/></svg></button></div>`,
  init(root) {
    const tv = root.querySelector('.tv'), cv = root.querySelector('.cv'), pw = root.querySelector('.pw');
    const s = shade(cv, tv, 240, 150, FS, {
      idle: true, idleWhen: (st) => st.valueT > 0, valueRate: 4,
      after(gl, prog) {
        const t = document.createElement('canvas'); t.width = 480; t.height = 300;
        const c = t.getContext('2d'); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.font = '700 54px "JetBrains Mono", ui-monospace, monospace'; c.fillText('ON AIR', 240, 108);
        const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t);
        gl.uniform1i(gl.getUniformLocation(prog, 'u_tex'), 0);
      },
    });
    pw.addEventListener('click', () => {
      const on = pw.getAttribute('aria-pressed') !== 'true';
      pw.setAttribute('aria-pressed', String(on)); s.valueT = on ? 1 : 0; s.kick();
    });
    return () => s.destroy();
  },
};
