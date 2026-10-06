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
// CRT: barrel-distorted tube; content is SMPTE colour bars + an OSD channel tag, drawn as 64 scanlines
// with a Gaussian beam whose width grows with brightness, through a staggered RGB slot mask (3 css px
// triads). Power-on/off squashes the raster to a bright line and then a dot, like a real tube.
const SW = 176, SH = 130;
const FS = `precision highp float;
uniform float u_time,u_hover,u_value;uniform vec2 u_res;uniform sampler2D u_tex;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec3 smpte(vec2 q){
 float b=floor(q.x*7.);
 if(q.y>.33){
  if(b<1.)return vec3(.75);if(b<2.)return vec3(.75,.75,0.);if(b<3.)return vec3(0.,.75,.75);if(b<4.)return vec3(0.,.75,0.);
  if(b<5.)return vec3(.75,0.,.75);if(b<6.)return vec3(.75,0.,0.);return vec3(0.,0.,.75);}
 if(q.y>.25){
  if(b<1.)return vec3(0.,0.,.75);if(b<2.)return vec3(.075);if(b<3.)return vec3(.75,0.,.75);if(b<4.)return vec3(.075);
  if(b<5.)return vec3(0.,.75,.75);if(b<6.)return vec3(.075);return vec3(.75);}
 float w=q.x*7./1.25;
 if(w<1.)return vec3(0.,.13,.3);if(w<2.)return vec3(1.);if(w<3.)return vec3(.2,0.,.42);if(q.x<5./7.)return vec3(.075);
 if(q.x<6./7.){float k=floor((q.x-5./7.)*21.);return vec3(k<1.?.03:k<2.?.075:.115);}
 return vec3(.075);}
void main(){
 float dpr=u_res.x/${SW}.;
 vec2 uv=gl_FragCoord.xy/u_res; vec2 c=uv*2.-1.; float ar=${SW}./${SH}.;
 float r2=dot(c*vec2(1.,1./ar),c*vec2(1.,1./ar));
 vec2 bc=c*(1.+.075*dot(c,c)); float px=2.5/u_res.y;
 float a=u_value;
 float hs=mix(.012,1.,smoothstep(0.,.32,a)), vs=mix(.006,1.,smoothstep(.3,1.,a));
 vec2 sc=bc/vec2(hs,vs); vec2 q=sc*.5+.5;
 float tube=smoothstep(1.+px,1.-px,max(abs(bc.x),abs(bc.y)));
 float ras=smoothstep(1.+px/vs,1.-px/vs,abs(sc.y))*smoothstep(1.+px/hs,1.-px/hs,abs(sc.x));
 // scanlines: sample content at the line centre, Gaussian beam profile
 float N=64.; float ln=q.y*N; float yc=(floor(ln)+.5)/N;
 vec2 cq=vec2(q.x+.0025*u_hover*sin(yc*40.+u_time*7.)*step(.82,fract(u_time*.37)),yc);
 vec3 img=smpte(cq);
 float osd=texture2D(u_tex,vec2(cq.x,yc)).a; img=mix(img,vec3(.25,1.,.4),osd);
 img+=(hash(vec2(floor(q.x*240.),floor(ln))+fract(u_time*3.1))-.5)*.05;
 img*=1.-.07*u_hover*smoothstep(.0,.2,sin(q.y*2.6-u_time*1.3)); // hum bar
 float L=dot(img,vec3(.3,.59,.11)); float f=fract(ln)-.5; float s=mix(.2,.36,L);
 vec3 beam=img*exp(-f*f/(2.*s*s))*1.55;
 // staggered slot mask, 3 css px per RGB triad
 vec2 fp=gl_FragCoord.xy/dpr; float row=floor(fp.y/3.); float fx=fp.x+mod(row,2.)*1.5;
 float k=mod(floor(fx),3.); vec3 m=vec3(k<.5?1.:.42,(k>.5&&k<1.5)?1.:.42,k>1.5?1.:.42);
 m*=step(.7,fract(fp.y/3.))>.5?.78:1.;
 vec3 col=beam*m*1.6;
 col*=1.+ (1./max(vs,.08)-1.)*.35; // the collapsing line runs hot
 col*=ras*smoothstep(0.,.02,a);
 col*=1.-.42*r2;
 // the glass: grey-green tube face, faint mask, window reflection
 vec3 glass=vec3(.055,.068,.062)*(1.-.5*r2)+m*.012;
 float refl=exp(-dot(bc-vec2(-.55,.55),bc-vec2(-.55,.55))*2.2)*.11+smoothstep(.55,.2,abs(bc.x+bc.y*.7+.35))*smoothstep(-.2,.9,bc.y)*.035;
 refl*=1.+.6*u_hover;
 col=(glass+col+refl*vec3(.9,.95,1.))*tube;
 gl_FragColor=vec4(col,1.);}`;

export default {
  id: 'sh-crt-toggle',
  credit: 'CRT power toggle in GLSL — SMPTE colour bars on a barrel-distorted tube, Gaussian-beam scanlines through an RGB slot mask; power-off collapses the raster to a line and a dot (Lucide power icon)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .tv { position: relative; display: grid; grid-template-columns: ${SW}px 1fr; gap: 10px; align-items: center; width: 240px; height: 150px; max-width: 100%; padding: 10px 10px 10px 10px; border-radius: 16px; background: linear-gradient(180deg, #3a3a3d, #232325 60%, #1b1b1d); box-shadow: inset 0 1px 0 rgba(255,255,255,.14), inset 0 -2px 0 rgba(0,0,0,.4), 0 1px 2px rgba(0,0,0,.25), 0 10px 22px -12px rgba(0,0,0,.6); isolation: isolate; }
    .scr { position: relative; width: ${SW}px; height: ${SH}px; border-radius: 16px / 20px; overflow: hidden; background: #0e1110; box-shadow: 0 0 0 2px #0a0a0b, 0 0 0 3px rgba(255,255,255,.07); }
    .scr::after { content: ''; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 12px 3px rgba(0,0,0,.75); pointer-events: none; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .cv.nogl { background: repeating-linear-gradient(0deg, #0c0e0d 0 2px, #141816 2px 4px); }
    .side { display: grid; justify-items: center; align-content: space-between; height: 100%; padding: 4px 0 2px; }
    .grille { width: 30px; height: 62px; border-radius: 4px; background: repeating-linear-gradient(180deg, #0d0d0e 0 3px, #2f2f32 3px 6px); box-shadow: inset 0 1px 2px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.06); }
    .led { width: 5px; height: 5px; border-radius: 50%; background: #4a1512; box-shadow: inset 0 0 1px rgba(0,0,0,.6); transition: background .2s, box-shadow .2s; }
    .pw { width: 32px; height: 32px; border-radius: 50%; border: 0; padding: 0; display: grid; place-items: center; cursor: pointer; color: #9a9aa0; background: radial-gradient(circle at 50% 30%, #4b4b50, #1e1e21 70%); box-shadow: 0 2px 0 #0b0b0c, 0 3px 6px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.18); transition: transform .08s, box-shadow .08s, color .2s; }
    .pw svg { width: 15px; height: 15px; }
    .pw:hover { color: #d4d4d8; }
    .pw:active { transform: translateY(2px); box-shadow: 0 0 0 #0b0b0c, 0 1px 3px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.1); }
    .pw[aria-pressed="true"] { color: #e8e8ec; }
    .tv.on .led { background: #ff3b2f; box-shadow: 0 0 6px 1px rgba(255,59,47,.7); }
    .pw:focus-visible { outline: 2px solid #ff3b2f; outline-offset: 2px; }
  `,
  html: `<div class="tv"><div class="scr"><canvas class="cv"></canvas></div><div class="side"><span class="grille"></span><span class="led"></span><button class="pw" type="button" aria-pressed="false" aria-label="Power"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg></button></div></div>`,
  init(root) {
    const tv = root.querySelector('.tv'), cv = root.querySelector('.cv'), pw = root.querySelector('.pw');
    const s = shade(cv, tv, SW, SH, FS, {
      idle: true, idleWhen: (st) => st.valueT > 0, valueRate: 3.2,
      after(gl, prog) {
        const t = document.createElement('canvas'); t.width = SW * 2; t.height = SH * 2;
        const c = t.getContext('2d'); c.fillStyle = '#fff'; c.textBaseline = 'top';
        c.font = '700 26px "JetBrains Mono", ui-monospace, monospace'; c.fillText('CH 03', SW * 2 - 150, 30);
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
      pw.setAttribute('aria-pressed', String(on)); tv.classList.toggle('on', on); s.valueT = on ? 1 : 0; s.kick();
    });
    return () => s.destroy();
  },
};
