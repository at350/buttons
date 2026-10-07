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
    .hippo { position: absolute; left: 55px; top: 108px; width: 120px; height: 112px; pointer-events: none; overflow: visible; }
    .neck { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .12s cubic-bezier(.2,1.4,.4,1); }
    .lunge .neck { transform: translateY(-30px); }
    .jaw { transform-box: fill-box; transform-origin: 50% 100%; transition: transform .1s; }
    .lunge .jaw { transform: translateY(-13px) scaleY(.82); }
    .mouth { transform-box: fill-box; transform-origin: 50% 100%; transform: scaleY(.4); transition: transform .1s; }
    .lunge .mouth { transform: scaleY(1.15); }
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
      <svg class="hippo" viewBox="0 0 120 112" aria-hidden="true">
        <defs>
          <radialGradient id="hb" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="#b57ae8"/><stop offset=".55" stop-color="#8640c4"/><stop offset="1" stop-color="#4f1d80"/></radialGradient>
          <radialGradient id="hs" cx=".5" cy=".25" r=".85"><stop offset="0" stop-color="#c590f0"/><stop offset=".6" stop-color="#9450d0"/><stop offset="1" stop-color="#5a2490"/></radialGradient>
          <radialGradient id="hm" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#7a1838"/><stop offset=".7" stop-color="#d9416f"/><stop offset="1" stop-color="#f27ca0"/></radialGradient>
        </defs>
        <!-- body and shoulders behind the head -->
        <ellipse cx="60" cy="96" rx="54" ry="20" fill="url(#hb)"/>
        <path d="M14 92c6 10 22 16 46 16s40-6 46-16" fill="none" stroke="#3d1466" stroke-width="2" opacity=".5"/>
        <g class="neck">
          <!-- lower jaw with the open mouth and tusks -->
          <path d="M24 40c0-14 16-22 36-22s36 8 36 22c0 9-14 16-36 16S24 49 24 40z" fill="#6a2ea4"/>
          <path class="mouth" d="M30 38c0-9 13-14 30-14s30 5 30 14c0 6-12 10-30 10s-30-4-30-10z" fill="url(#hm)"/>
          <path d="M38 44l3 6 3-5M76 45l3 5 3-6" fill="#fff" stroke="#e6dccf" stroke-width=".6"/>
          <!-- head and brow -->
          <ellipse cx="60" cy="66" rx="40" ry="26" fill="url(#hb)"/>
          <!-- ears -->
          <ellipse cx="25" cy="72" rx="8" ry="6" fill="#7b3fb0" transform="rotate(-25 25 72)"/><ellipse cx="25" cy="72" rx="4.5" ry="3" fill="#f49ac1" transform="rotate(-25 25 72)"/>
          <ellipse cx="95" cy="72" rx="8" ry="6" fill="#7b3fb0" transform="rotate(25 95 72)"/><ellipse cx="95" cy="72" rx="4.5" ry="3" fill="#f49ac1" transform="rotate(25 95 72)"/>
          <!-- upper jaw / snout that lifts -->
          <g class="jaw">
            <path d="M22 44c0-18 17-28 38-28s38 10 38 28c0 10-17 16-38 16S22 54 22 44z" fill="url(#hs)"/>
            <ellipse cx="47" cy="28" rx="5" ry="3.2" fill="#3d1466"/><ellipse cx="73" cy="28" rx="5" ry="3.2" fill="#3d1466"/>
            <ellipse cx="50" cy="22" rx="14" ry="3.5" fill="#fff" opacity=".22"/>
          </g>
          <!-- bulging eyes on top of the head -->
          <g><ellipse cx="44" cy="58" rx="10" ry="9" fill="#8a46c6"/><ellipse cx="44" cy="57" rx="7.5" ry="7" fill="#fff"/><circle cx="45" cy="54.5" r="3.6" fill="#1b1b1b"/><circle cx="46.2" cy="53.3" r="1.2" fill="#fff"/>
            <path d="M34 55c3-6 17-6 20 0" fill="#7b3fb0"/></g>
          <g><ellipse cx="76" cy="58" rx="10" ry="9" fill="#8a46c6"/><ellipse cx="76" cy="57" rx="7.5" ry="7" fill="#fff"/><circle cx="75" cy="54.5" r="3.6" fill="#1b1b1b"/><circle cx="76.2" cy="53.3" r="1.2" fill="#fff"/>
            <path d="M66 55c3-6 17-6 20 0" fill="#7b3fb0"/></g>
          <path d="M44 80c5 4 27 4 32 0" fill="none" stroke="#3d1466" stroke-width="1.6" opacity=".45" stroke-linecap="round"/>
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
