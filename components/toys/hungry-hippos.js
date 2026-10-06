const SPOTS = [[0, -30], [-26, -10], [24, -14], [-8, 12], [30, 18], [-34, 24], [6, -50], [-50, -28]];

export default {
  id: 'ty2-hungry-hippos',
  credit: 'Hasbro Hungry Hungry Hippos (1978) — slam the tail lever and Lizzie Hippo lunges, jaws open, to gobble the white marbles',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 230px; height: 244px; border-radius: 12px; overflow: hidden; background: linear-gradient(#ffe8a3, #f7c600); }
    .arena { position: absolute; left: 25px; top: 10px; width: 180px; height: 180px; border-radius: 50%;
      background: radial-gradient(circle, #ffe25a 0 30%, #f7c600 60%, #d99c00 100%); box-shadow: inset 0 0 0 8px #e3262d, inset 0 6px 12px rgba(0,0,0,.25); }
    .m { position: absolute; left: 50%; top: 50%; width: 14px; height: 14px; margin: -7px; border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #fff, #e8e8e8 50%, #9a9a9a); box-shadow: 0 2px 2px rgba(0,0,0,.35); transition: transform .35s cubic-bezier(.3,1.4,.5,1), opacity .2s; }
    .m.gone { opacity: 0; transform: translate(0, 60px) scale(.4) !important; }
    .hippo { position: absolute; left: 75px; top: 118px; width: 80px; height: 98px; pointer-events: none; }
    .neck { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .12s cubic-bezier(.2,1.4,.4,1); }
    .lunge .neck { transform: translateY(-34px); }
    .jaw { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .1s; }
    .lunge .jaw { transform: translateY(-8px); }
    .mouth { transform-box: fill-box; transform-origin: 50% 0; transform: scaleY(0); transition: transform .1s; }
    .lunge .mouth { transform: scaleY(1.3); }
    .lever { position: absolute; left: 92px; top: 218px; width: 46px; height: 20px; border: 0; padding: 0; border-radius: 6px 6px 10px 10px; cursor: pointer;
      background: linear-gradient(#c084fc, #8e44c8 60%, #5c2589); box-shadow: 0 5px 0 #3b155c, 0 6px 6px rgba(0,0,0,.3); transform: translateY(-4px); transition: transform .05s, box-shadow .05s; }
    .lever:active, .lever.down { transform: translateY(1px); box-shadow: 0 0 0 #3b155c; }
    .lever:focus-visible { outline: 3px solid #1a5fb4; outline-offset: 2px; }
    .score { position: absolute; right: 12px; bottom: 10px; display: flex; gap: 2px; flex-wrap: wrap; width: 46px; justify-content: flex-end; }
    .score i { width: 8px; height: 8px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff, #bbb); }
  `,
  html: `
    <div class="stage">
      <div class="arena">${SPOTS.map(() => '<span class="m"></span>').join('')}</div>
      <svg class="hippo" viewBox="0 0 80 98" aria-hidden="true">
        <ellipse cx="40" cy="86" rx="38" ry="18" fill="#7b3fb0"/>
        <rect x="27" y="34" width="26" height="56" rx="8" fill="#7b3fb0"/>
        <g class="neck">
          <rect x="22" y="40" width="36" height="50" rx="10" fill="#8e44c8"/>
          <g class="jaw"><path d="M18 22 Q40 4 62 22 L60 32 Q40 24 20 32 Z" fill="#a565dd"/><path d="M24 26 Q40 16 56 26" fill="none" stroke="#5c2589" stroke-width="2"/></g>
          <path d="M16 30 Q40 22 64 30 L60 50 Q40 58 20 50 Z" fill="#9b55d4"/>
          <path class="mouth" d="M22 34 Q40 28 58 34 L56 44 Q40 48 24 44 Z" fill="#e85a8a"/>
          <ellipse cx="33" cy="16" rx="3" ry="2" fill="#5c2589"/><ellipse cx="47" cy="16" rx="3" ry="2" fill="#5c2589"/>
          <circle cx="24" cy="52" r="6" fill="#fff"/><circle cx="56" cy="52" r="6" fill="#fff"/><circle cx="24" cy="53" r="3" fill="#1b1b1b"/><circle cx="56" cy="53" r="3" fill="#1b1b1b"/>
          <path d="M28 64 Q24 54 16 56 M52 64 Q56 54 64 56" fill="none" stroke="#f9a8d4" stroke-width="3" stroke-linecap="round"/>
        </g>
      </svg>
      <button class="lever" type="button" aria-label="hippo lever"></button>
      <div class="score" aria-live="polite"></div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), ms = [...root.querySelectorAll('.m')], score = root.querySelector('.score'), lever = root.querySelector('.lever');
    const jitter = () => ms.forEach((m) => {
      if (m.classList.contains('gone')) return;
      const [x, y] = SPOTS[Math.floor(Math.random() * SPOTS.length)];
      m.style.transform = `translate(${x + (Math.random() * 16 - 8)}px, ${y + (Math.random() * 16 - 8)}px)`;
    });
    ms.forEach((m, i) => { m.style.transform = `translate(${SPOTS[i][0]}px, ${SPOTS[i][1]}px)`; });
    let t = 0, t2 = 0, eaten = 0;
    lever.addEventListener('click', () => {
      st.classList.add('lunge'); lever.classList.add('down');
      clearTimeout(t); t = setTimeout(() => { st.classList.remove('lunge'); lever.classList.remove('down'); }, 220);
      // gobble any marble close to the mouth (bottom-centre of the arena)
      const live = ms.filter((m) => !m.classList.contains('gone'));
      const near = live.filter((m) => { const r = m.getBoundingClientRect(), a = root.querySelector('.arena').getBoundingClientRect(); return r.top - a.top > 88 && Math.abs(r.left + 7 - a.left - 90) < 32; });
      if (near.length) { near[0].classList.add('gone'); eaten++; if (eaten <= 15) score.appendChild(document.createElement('i')); }
      clearTimeout(t2);
      t2 = setTimeout(() => {
        if (live.length <= 1) { ms.forEach((m) => m.classList.remove('gone')); }
        jitter();
      }, 240);
    });
    return () => { clearTimeout(t); clearTimeout(t2); };
  },
};
