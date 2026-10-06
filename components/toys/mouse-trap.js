const gear = (r, n, c) => `<circle r="${r}" fill="${c}"/>${Array.from({ length: n }, (_, i) => `<rect x="-3" y="${-r - 5}" width="6" height="7" rx="1" fill="${c}" transform="rotate(${i * 360 / n})"/>`).join('')}<circle r="${r * 0.35}" fill="#fff" opacity=".5"/>`;
const STAIRS = 'M150 64 L164 64 L168 76 L180 76 L184 88 L196 88 L200 100 L212 100 L216 112 L234 112';

export default {
  id: 'ty2-mouse-trap',
  credit: 'Ideal Mouse Trap (1963) — crank the gears a full turn: the boot kicks the bucket, the ball rolls down the crooked stairs and the cage drops on the mouse',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 290px; height: 196px; border-radius: 12px; overflow: hidden; background: linear-gradient(#ffeec4, #f5d78a); }
    svg { position: absolute; inset: 0; width: 290px; height: 196px; }
    .ga { cursor: grab; touch-action: none; outline: none; }
    .ga.drag { cursor: grabbing; }
    .ga:focus-visible .ring { stroke: #1a5fb4; stroke-width: 3; }
    .boot { transform-box: view-box; transform-origin: 112px 34px; transition: transform .25s cubic-bezier(.3,1.6,.5,1); }
    .run .boot { transform: rotate(-40deg); }
    .bucket { transform-box: view-box; transform-origin: 150px 70px; transition: transform .3s ease-in .15s; }
    .run .bucket { transform: rotate(50deg); }
    .ball { position: absolute; left: 0; top: 0; width: 12px; height: 12px; margin-top: -6px; border-radius: 50%; pointer-events: none; offset-path: path('${STAIRS}'); offset-distance: 0%; offset-rotate: 0deg;
      background: radial-gradient(circle at 35% 30%, #fff, #c9ced6 45%, #6b707a); box-shadow: 0 2px 2px rgba(0,0,0,.3); }
    .cage { transform: translateY(0); transition: transform .35s cubic-bezier(.5,0,.8,1.4); }
    .caught .cage { transform: translateY(100px); }
    .cagebtn { position: absolute; left: 236px; top: 22px; width: 40px; height: 50px; border: 0; padding: 0; background: none; cursor: pointer; border-radius: 6px; transition: transform .35s cubic-bezier(.5,0,.8,1.4); }
    .caught .cagebtn { transform: translateY(100px); }
    .cagebtn:focus-visible { outline: 2px solid #1a5fb4; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <svg viewBox="0 0 290 196" aria-hidden="true">
        <rect x="0" y="176" width="290" height="20" fill="#3cb44a"/><rect x="0" y="172" width="290" height="6" fill="#2f8f3d"/>
        <rect x="108" y="30" width="6" height="146" fill="#1a5fb4"/><rect x="128" y="74" width="40" height="6" rx="2" fill="#1a5fb4"/>
        <path d="${STAIRS} V176 H150 Z" fill="#e3262d"/><path d="${STAIRS}" fill="none" stroke="#a5141a" stroke-width="2"/>
        <rect x="270" y="20" width="6" height="156" fill="#1a5fb4"/>
        <g class="boot"><rect x="110" y="34" width="4" height="26" fill="#8a8a8a"/><path d="M104 58 h12 v8 h14 a4 4 0 0 1 0 8 h-26 Z" fill="#7a3d12"/></g>
        <g class="bucket"><path d="M136 50 h20 l-3 20 h-14 Z" fill="#f7c600" stroke="#b98f00" stroke-width="1.5"/></g>
        <g transform="translate(260 156)"><ellipse cx="0" cy="12" rx="14" ry="5" fill="rgba(0,0,0,.2)"/><path d="M-12 10 q2 -14 14 -12 q8 2 10 10 Z" fill="#8a8f99"/><circle cx="9" cy="2" r="4" fill="#8a8f99"/><circle cx="11" cy="1" r="1.2" fill="#000"/><path d="M-12 9 q-8 -2 -10 -8" fill="none" stroke="#8a8f99" stroke-width="1.5"/></g>
        <g class="cage">
          <path d="M240 22 h36 v4 h-36 Z" fill="#f7c600"/>
          ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${241 + i * 6.6}" y="26" width="2.4" height="44" fill="#2b2b33"/>`).join('')}
          <rect x="240" y="68" width="36" height="3" fill="#2b2b33"/>
        </g>
        <g transform="translate(96 132)"><g class="gb">${gear(16, 9, '#1a5fb4')}</g></g>
        <g class="ga" tabindex="0" role="slider" aria-label="crank" aria-valuemin="0" aria-valuemax="360" aria-valuenow="0" transform="translate(52 140)">
          <circle class="ring" r="34" fill="transparent" stroke="none"/>
          <g class="gai">${gear(24, 12, '#ff7a1a')}<rect x="-2.5" y="-30" width="5" height="30" rx="2" fill="#7a7f8a"/><circle cy="-30" r="6" fill="#e3262d"/></g>
        </g>
      </svg>
      <span class="ball"></span>
      <button class="cagebtn" type="button" aria-label="lift the cage"></button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), ga = root.querySelector('.ga'), gai = root.querySelector('.gai'), gb = root.querySelector('.gb'), ball = root.querySelector('.ball');
    let acc = 0, prev = 0, drag = false, fired = false; const timers = new Set(); let anim = null;
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
    const angle = (e) => { const r = ga.getBoundingClientRect(); return Math.atan2(e.clientX - r.left - r.width / 2, -(e.clientY - r.top - r.height / 2)) * 180 / Math.PI; };
    const spin = (d) => {
      acc = Math.max(0, acc + d); gai.setAttribute('transform', `rotate(${acc})`); gb.setAttribute('transform', `rotate(${-acc * 1.5})`);
      ga.setAttribute('aria-valuenow', Math.min(360, Math.round(acc)));
      if (acc >= 360 && !fired) fire();
    };
    const fire = () => {
      fired = true; st.classList.add('run');
      later(() => { anim = ball.animate([{ offsetDistance: '0%' }, { offsetDistance: '100%' }], { duration: 900, easing: 'cubic-bezier(.4,0,.8,1)', fill: 'forwards' }); }, 380);
      later(() => st.classList.add('caught'), 1300);
    };
    ga.addEventListener('pointerdown', (e) => { drag = true; prev = angle(e); ga.setPointerCapture(e.pointerId); ga.classList.add('drag'); });
    ga.addEventListener('pointermove', (e) => { if (!drag) return; const a = angle(e); let d = a - prev; if (d > 180) d -= 360; if (d < -180) d += 360; prev = a; spin(d); });
    const up = () => { drag = false; ga.classList.remove('drag'); };
    ga.addEventListener('pointerup', up); ga.addEventListener('pointercancel', up); ga.addEventListener('lostpointercapture', up);
    ga.addEventListener('keydown', (e) => { if (['ArrowRight', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); spin(45); } });
    root.querySelector('.cagebtn').addEventListener('click', () => {
      if (!fired) return; timers.forEach(clearTimeout); timers.clear();
      st.classList.remove('caught', 'run'); if (anim) { anim.cancel(); anim = null; } fired = false; acc = 0; spin(0);
    });
    return () => { timers.forEach(clearTimeout); if (anim) anim.cancel(); };
  },
};
