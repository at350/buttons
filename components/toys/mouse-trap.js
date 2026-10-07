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
    .cagebtn { position: absolute; left: 236px; top: 18px; width: 44px; height: 56px; border: 0; padding: 0; background: none; cursor: pointer; border-radius: 6px; transition: transform .35s cubic-bezier(.5,0,.8,1.4); }
    .caught .cagebtn { transform: translateY(100px); }
    .cagebtn:focus-visible { outline: 2px solid #1a5fb4; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <svg viewBox="0 0 290 196" aria-hidden="true">
        <rect x="0" y="176" width="290" height="20" fill="#3cb44a"/><rect x="0" y="172" width="290" height="6" fill="#2f8f3d"/>
        <rect x="108" y="30" width="6" height="146" fill="#1a5fb4"/><rect x="128" y="74" width="40" height="6" rx="2" fill="#1a5fb4"/>
        <!-- the crooked stairway on its stilts -->
        <path d="M156 68V176M188 92V176M220 116V176" stroke="#1a5fb4" stroke-width="3"/>
        <rect x="149" y="64" width="18" height="4" rx="1" fill="#e3262d"/><rect x="164" y="64" width="4" height="12" fill="#c01c22"/><rect x="167" y="76" width="16" height="4" rx="1" fill="#e3262d"/><rect x="180" y="76" width="4" height="12" fill="#c01c22"/><rect x="183" y="88" width="16" height="4" rx="1" fill="#e3262d"/><rect x="196" y="88" width="4" height="12" fill="#c01c22"/><rect x="199" y="100" width="16" height="4" rx="1" fill="#e3262d"/><rect x="212" y="100" width="4" height="12" fill="#c01c22"/><rect x="215" y="112" width="22" height="4" rx="1" fill="#e3262d"/><rect x="234" y="112" width="4" height="12" fill="#c01c22"/>
        <!-- cage post and its foot -->
        <rect x="256" y="14" width="5" height="162" fill="#1a5fb4"/>
        <g class="boot"><rect x="110" y="34" width="4" height="22" fill="#8a8a8a"/>
          <path d="M103 52h13v10c0 2 2 3 4 3h8c4 0 6 2 6 5v2h-31v-4l1-6z" fill="#7a3d12"/><path d="M103 72h31v3h-31z" fill="#3b1c06"/>
          <path d="M106 56h8M106 59.5h8M117 65l3-3M121 65l3-3" stroke="#e8c48a" stroke-width="1"/><path d="M104 54h12" stroke="#a65a22" stroke-width="2"/></g>
        <g class="bucket"><path d="M138 52c2-8 14-8 16 0" fill="none" stroke="#6b707a" stroke-width="1.4"/><path d="M136 52h20l-3 18h-14z" fill="#f7c600" stroke="#b98f00" stroke-width="1.5"/><path d="M137 56h18M138 64h16" stroke="#d9a900" stroke-width="1.2"/></g>
        <g transform="translate(252 158)"><ellipse cx="2" cy="16" rx="16" ry="3.5" fill="rgba(0,0,0,.2)"/>
          <path d="M-12 14c-6 0-12-2-14-8" fill="none" stroke="#e7a3a8" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M-13 15c0-10 6-15 14-15c6 0 10 3 12 8l5 3c1 1 1 3-1 4z" fill="#9aa0aa"/>
          <circle cx="6" cy="1" r="5" fill="#9aa0aa"/><circle cx="6" cy="1" r="3" fill="#e7a3a8"/>
          <circle cx="12" cy="7" r="1.3" fill="#111"/><circle cx="18" cy="11" r="1.4" fill="#e7a3a8"/>
          <path d="M16 11l6-2M16 12l6 1" stroke="#555" stroke-width=".5"/></g>
        <g class="cage">
          ${[-16, -10, -4, 2, 8, 14].map((d) => `<path d="M${258.5 + d * 0.35} 26C${258.5 + d * 0.8} 36 ${258.5 + d} 50 ${258.5 + d * 1.1} 70" fill="none" stroke="#2b2b33" stroke-width="1.6"/>`).join('')}
          <path d="M239 70h39" stroke="#2b2b33" stroke-width="2.6" stroke-linecap="round"/><path d="M241 50h35" stroke="#2b2b33" stroke-width="1.2"/>
          <path d="M246 28c2-8 23-8 25 0z" fill="#e3262d"/><rect x="244" y="26" width="29" height="4" rx="2" fill="#f7c600"/>
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
