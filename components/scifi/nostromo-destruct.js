// Alien (1979) — the Nostromo emergency destruct system: pull and twist the four detonator cylinders, the beacon spins, T-minus counts.
const ICONS = [
  'M6 2h12l-6 9h5l-9 11 2-8H5z', 'M12 2l3 6 6-2-3 6 5 3-6 2 1 6-6-3-6 3 1-6-6-2 5-3-3-6 6 2z',
  'M3 3h18v18H3zM8 12h9M13 8l4 4-4 4', 'M12 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M12 9.5L8 2.5h8zM9.8 13.3L2 13.4l4 7zM14.2 13.3l7.8.1-4 7z',
];
export default {
  id: 'sf-nostromo-destruct',
  credit: 'Alien (1979) — Nostromo emergency destruct panel: pull and twist the four detonator cylinders (Ron Cobb Semiotic Standard pictograms), amber beacon and T-minus readout; push one back in to abort',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 12px; background: #2b2d2c; font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .haz { height: 10px; border-radius: 2px; background: repeating-linear-gradient(-45deg, #f2c200 0 8px, #111 8px 16px); margin-bottom: 10px; }
    .top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .bcn { width: 26px; height: 26px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #6b4a10, #2a1c05); box-shadow: inset 0 0 0 2px #111; }
    .armed .bcn { background: conic-gradient(#ffd04a 0 25%, #a35d00 40% 85%, #ffd04a); box-shadow: 0 0 14px #ffb000, inset 0 0 0 2px #111; animation: spin .7s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .rd { flex: 1; height: 26px; border-radius: 3px; background: #0a0d0a; box-shadow: inset 0 1px 3px #000; display: flex; align-items: center; justify-content: space-between; padding: 0 8px;
      color: #3b4a3c; font-size: 13px; font-weight: 700; letter-spacing: .08em; }
    .armed .rd { color: #ffb000; text-shadow: 0 0 6px #ff9000; }
    .boom .rd { animation: bl .3s steps(1) infinite; }
    @keyframes bl { 50% { opacity: .2; } }
    .bay { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 10px 8px 8px; border-radius: 4px; background: linear-gradient(#8c9190, #6a6f6e); box-shadow: inset 0 1px 0 #b5bab9, inset 0 -2px 0 #4a4e4d; }
    .cy { display: grid; justify-items: center; gap: 6px; border: 0; padding: 0; background: none; cursor: pointer; color: #111; }
    .sock { position: relative; width: 34px; height: 34px; border-radius: 50%; background: radial-gradient(circle, #050505 55%, #3d4140 58%, #9ea3a2 70%, #50555a); }
    .pin { position: absolute; inset: 6px; border-radius: 50%; background: radial-gradient(circle at 38% 32%, #fff, #b9bec2 35%, #5c6166 80%); box-shadow: 0 0 0 1px #222;
      transition: transform .3s cubic-bezier(.3,1.5,.5,1), box-shadow .3s; }
    .pin::after { content: ''; position: absolute; left: 50%; top: 3px; bottom: 3px; width: 3px; margin-left: -1.5px; background: #333; border-radius: 2px; }
    .cy[aria-pressed="true"] .pin { transform: scale(1.22) rotate(90deg); box-shadow: 0 4px 6px rgba(0,0,0,.7), 0 0 0 1px #222; }
    .cy:hover .pin { filter: brightness(1.1); }
    .lmp { width: 18px; height: 5px; border-radius: 1px; background: #16391b; }
    .cy[aria-pressed="true"] .lmp { background: #ff3b1f; box-shadow: 0 0 6px #ff3b1f; }
    .sig { width: 30px; height: 30px; background: #f2c200; border: 2px solid #111; display: grid; place-items: center; }
    .sig svg { width: 22px; height: 22px; fill: #111; stroke: #111; stroke-width: 0; }
    .sig svg path[data-s] { fill: none; stroke-width: 2; }
    .cy:focus-visible { outline: 2px solid #ffb000; outline-offset: 3px; border-radius: 4px; }
  `,
  html: `<div class="stage"><div class="haz"></div>
    <div class="top"><span class="bcn"></span><div class="rd"><span>T-MINUS</span><span class="t">--:--</span></div></div>
    <div class="bay">${ICONS.map((d, i) => `<button class="cy" type="button" aria-pressed="false" aria-label="Detonator ${i + 1}"><span class="lmp"></span><span class="sock"><span class="pin"></span></span><span class="sig"><svg viewBox="0 0 24 24"><path ${i === 2 ? 'data-s' : ''} d="${d}"/></svg></span></button>`).join('')}</div>
  </div>`,
  init(root) {
    const st = root.querySelector('.stage'), t = root.querySelector('.t'), cys = [...root.querySelectorAll('.cy')];
    let tm = 0, left = 0;
    const fmt = (n) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
    const stop = () => { clearInterval(tm); tm = 0; };
    const sync = () => {
      const armed = cys.every((c) => c.getAttribute('aria-pressed') === 'true');
      stop(); st.classList.remove('boom');
      st.classList.toggle('armed', armed);
      if (!armed) { t.textContent = cys.some((c) => c.getAttribute('aria-pressed') === 'true') ? 'ARMING' : '--:--'; return; }
      left = 300; t.textContent = fmt(left);
      tm = setInterval(() => { left -= 1; t.textContent = fmt(left); if (left <= 0) { stop(); st.classList.add('boom'); } }, 1000);
    };
    cys.forEach((c) => c.addEventListener('click', () => { c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')); sync(); }));
    return stop;
  },
};
