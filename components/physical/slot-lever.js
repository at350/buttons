// One-armed bandit: a three-reel cabinet (chrome-trimmed red body, glass reel window with a pay line,
// coin slot, credit meter and payout tray) with the chrome lever and red ball on its right flank. Pull the
// lever (drag down, click, Space/Enter/ArrowDown): it swings toward you past the pivot, the reels spin up
// and stop left-to-right on random symbols, and the spring throws the lever back past upright.
// Seen from the front, the swing toward the viewer reads as the rod foreshortening (scaleY 1 → −0.85)
// around the pivot boss, so the whole travel stays inside the stage.
const SYM = {
  cherry: `<path d="M22 12c-2 6-7 10-12 14M22 12c1 6 4 10 8 13" stroke="#2f7d1f" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M22 12c4-5 10-5 13-2-4 3-9 4-13 2z" fill="#3da52a"/><circle cx="11" cy="30" r="7" fill="url(#chr)"/><circle cx="30" cy="29" r="7" fill="url(#chr)"/><circle cx="9" cy="27.5" r="1.8" fill="#fff" opacity=".7"/><circle cx="28" cy="26.5" r="1.8" fill="#fff" opacity=".7"/>`,
  bar: `<rect x="4" y="13" width="36" height="18" rx="2" fill="#141414"/><rect x="6" y="15" width="32" height="14" rx="1" fill="none" stroke="#f4f4f4" stroke-width="1"/><text x="22" y="26.5" text-anchor="middle" font-family="Unbounded, Arial Black, sans-serif" font-weight="900" font-size="10.5" fill="#f4f4f4" letter-spacing=".5">BAR</text>`,
  seven: `<text x="22" y="37" text-anchor="middle" font-family="Unbounded, Arial Black, sans-serif" font-weight="900" font-size="34" fill="url(#sev)" stroke="#5b0303" stroke-width="1.2" paint-order="stroke">7</text>`,
  bell: `<path d="M22 7c-1.4 0-2.2 1-2.2 2.2C13.5 10.6 12 16 12 22c0 4-1.6 6.4-4 8.4h28c-2.4-2-4-4.4-4-8.4 0-6-1.5-11.4-7.8-12.8C24.2 8 23.4 7 22 7z" fill="url(#bel)" stroke="#8a5a00" stroke-width="1"/><circle cx="22" cy="33.5" r="3.2" fill="#c98a00" stroke="#8a5a00" stroke-width=".8"/><path d="M16 14c-1.6 2.4-2 5.4-2 8" stroke="#fff6c4" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>`,
  lemon: `<ellipse cx="22" cy="22" rx="14" ry="10" fill="url(#lem)" stroke="#b08c00" stroke-width="1"/><path d="M8 22l-3-1.5M36 22l3 1.5" stroke="#b08c00" stroke-width="2" stroke-linecap="round"/><ellipse cx="18" cy="18" rx="5" ry="2" fill="#fffbd0" opacity=".7"/>`,
};
const STRIP = ['seven', 'cherry', 'bar', 'bell', 'lemon', 'cherry', 'bar', 'bell'];
const CELL = 44; // px per symbol
const strip = () => [...STRIP, ...STRIP, ...STRIP].map((s) => `<svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">${SYM[s]}</svg>`).join('');

export default {
  id: 'ph-slot-lever',
  credit: 'One-armed bandit — three-reel slot cabinet with a chrome lever and red ball grip; pull it and the reels spin',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px 12px 10px; border-radius: 12px; -webkit-user-select: none; user-select: none;
      background: radial-gradient(circle at 30% 0%, #3a1d0e, #160805 75%); }
    .wrap { position: relative; width: 236px; height: 176px; }
    .cab { position: absolute; left: 0; top: 0; width: 184px; height: 176px; border-radius: 14px 14px 6px 6px;
      background: linear-gradient(90deg, #6d070b, #c3141c 18%, #e02a2f 50%, #b5121a 82%, #5f0609);
      box-shadow: inset 0 0 0 3px #d9dde1, inset 0 0 0 4px #6b7178, 0 6px 12px rgba(0,0,0,.6); }
    .crown { position: absolute; left: 14px; right: 14px; top: 10px; height: 22px; border-radius: 6px;
      background: linear-gradient(#ffe27a, #f3b800 55%, #b07c00); box-shadow: inset 0 1px 0 #fff6c8, 0 2px 3px rgba(0,0,0,.5);
      display: flex; align-items: center; justify-content: center; gap: 6px; }
    .crown i { width: 7px; height: 7px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #fff, #ffd34d 45%, #b06a00); box-shadow: 0 0 4px #ffcf40; animation: chase 1.2s steps(1) infinite; }
    .crown i:nth-child(2n) { animation-delay: .6s; }
    @keyframes chase { 50% { background: radial-gradient(circle at 40% 35%, #c7a24a, #7b5300); box-shadow: none; } }
    .glass { position: absolute; left: 12px; right: 12px; top: 40px; height: 74px; padding: 6px; border-radius: 6px;
      background: linear-gradient(#e9ecef, #8d949b 50%, #d5d9dd); box-shadow: 0 2px 3px rgba(0,0,0,.5); }
    .reels { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; height: 62px; padding: 0 3px; border-radius: 3px; background: #1a1a1a; overflow: hidden; }
    .reel { position: relative; overflow: hidden; margin: 3px 0; border-radius: 2px;
      background: linear-gradient(#bdb6a6, #fffdf6 28%, #fffdf6 72%, #bdb6a6); }
    .strip { position: absolute; left: 50%; top: 0; width: 44px; margin-left: -22px; display: flex; flex-direction: column; will-change: transform; }
    .strip svg { display: block; flex: none; }
    .reel.spin .strip { filter: blur(1.2px); }
    .reels::before { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 2px; margin-top: -1px; background: rgba(214,20,28,.85); z-index: 2; box-shadow: 0 0 3px rgba(255,40,40,.7); }
    .reels::after { content: ''; position: absolute; inset: 0; z-index: 3; pointer-events: none;
      background: linear-gradient(170deg, rgba(255,255,255,0) 30%, rgba(255,255,255,.22) 31%, rgba(255,255,255,0) 50%), linear-gradient(rgba(0,0,0,.5), transparent 24%, transparent 76%, rgba(0,0,0,.5)); }
    .deck { position: absolute; left: 12px; right: 12px; top: 120px; height: 18px; display: flex; align-items: center; justify-content: space-between; padding: 0 6px 0 9px; border-radius: 3px;
      background: linear-gradient(#2a2a2e, #101012); box-shadow: inset 0 1px 2px rgba(0,0,0,.8), 0 1px 0 rgba(255,255,255,.2); }
    .coin { width: 4px; height: 11px; border-radius: 2px; background: #000; box-shadow: 0 0 0 2px #b9bec3, 0 0 0 3px #5f646a; }
    .cred { font: 700 9px/1 "JetBrains Mono", ui-monospace, monospace; color: #ff4b2e; text-shadow: 0 0 4px rgba(255,70,40,.8); background: #1c0504; padding: 2px 4px; border-radius: 2px; min-width: 32px; text-align: right; }
    .tray { position: absolute; left: 22px; right: 22px; bottom: 8px; height: 24px; border-radius: 4px 4px 10px 10px;
      background: linear-gradient(#f2f4f6, #9aa0a6 40%, #5b6066); box-shadow: inset 0 7px 6px rgba(0,0,0,.6), 0 2px 3px rgba(0,0,0,.6); }
    /* lever on the right flank */
    .boss { position: absolute; left: 180px; top: 86px; width: 26px; height: 30px; border-radius: 3px 12px 12px 3px;
      background: linear-gradient(#f4f6f7, #9aa0a6 45%, #dfe2e5 60%, #6c7177); box-shadow: 2px 3px 5px rgba(0,0,0,.6); }
    .arm { position: absolute; left: 203px; top: 8px; width: 30px; height: 93px; cursor: grab; touch-action: none; outline: none;
      transform-origin: 15px 93px; transform: scaleY(1); transition: transform .7s cubic-bezier(.3,1.35,.5,1); }
    .arm.drag { transition: none; cursor: grabbing; }
    .arm.pull { transition: transform .22s cubic-bezier(.5,0,.8,.6); }
    .rod { position: absolute; left: 11px; top: 18px; bottom: 0; width: 8px; border-radius: 4px;
      background: linear-gradient(90deg, #5a5f65, #f4f6f7 35%, #c3c7cb 55%, #4c5056); box-shadow: 2px 1px 3px rgba(0,0,0,.45); }
    .ball { position: absolute; left: 0; top: 0; width: 30px; height: 30px; border-radius: 50%;
      background: radial-gradient(circle at 36% 30%, #ffd0cc 0, #ff6a5e 14%, #e01d16 42%, #9d0b07 78%, #5c0503 100%);
      box-shadow: 2px 4px 6px rgba(0,0,0,.55), inset -2px -3px 5px rgba(60,0,0,.4); }
    .arm:focus-visible .ball { box-shadow: 0 0 0 3px #ffd27a, 2px 4px 6px rgba(0,0,0,.55); }
    .hub { position: absolute; left: 207px; top: 90px; width: 22px; height: 22px; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle at 38% 32%, #ffffff, #b4b9be 50%, #565b61); box-shadow: 0 2px 3px rgba(0,0,0,.7); }
    .deck.win .cred { animation: blink .25s steps(1) 6; }
    @keyframes blink { 50% { opacity: .2; } }
    @media (prefers-reduced-motion: reduce) { .crown i { animation: none; } }
  `,
  html: `
    <div class="stage">
      <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
        <radialGradient id="chr" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ff8a80"/><stop offset=".45" stop-color="#d50f16"/><stop offset="1" stop-color="#6d0406"/></radialGradient>
        <linearGradient id="sev" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a4a"/><stop offset=".55" stop-color="#d4090f"/><stop offset="1" stop-color="#8e0206"/></linearGradient>
        <linearGradient id="bel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b47a00"/><stop offset=".35" stop-color="#ffe066"/><stop offset=".7" stop-color="#f2b700"/><stop offset="1" stop-color="#9a6500"/></linearGradient>
        <radialGradient id="lem" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fff7a0"/><stop offset=".6" stop-color="#f7d81c"/><stop offset="1" stop-color="#c9a400"/></radialGradient>
      </defs></svg>
      <div class="wrap">
        <div class="cab">
          <div class="crown" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="glass"><div class="reels">
            <div class="reel"><div class="strip">${strip()}</div></div>
            <div class="reel"><div class="strip">${strip()}</div></div>
            <div class="reel"><div class="strip">${strip()}</div></div>
          </div></div>
          <div class="deck"><span class="coin" aria-hidden="true"></span><span class="cred" aria-live="polite">0</span></div>
          <div class="tray" aria-hidden="true"></div>
        </div>
        <div class="boss" aria-hidden="true"></div>
        <div class="arm" role="slider" tabindex="0" aria-label="Slot machine lever" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="rod"></span><span class="ball"></span></div>
        <div class="hub" aria-hidden="true"></div>
      </div>
    </div>`,
  init(root) {
    const arm = root.querySelector('.arm'), reels = [...root.querySelectorAll('.reel')], cred = root.querySelector('.cred'), deck = root.querySelector('.deck');
    const N = STRIP.length;
    const off = (i) => -(i * CELL) + (56 - CELL) / 2; // reel window is 56px tall; centre a cell on the pay line
    const pos = [0, 2, 3]; // 7 / BAR / bell at rest
    const timers = new Set();
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
    const place = (r, i, ms) => {
      const s = r.querySelector('.strip');
      s.style.transition = ms ? `transform ${ms}ms cubic-bezier(.15,.6,.25,1.04)` : 'none';
      s.style.transform = `translateY(${off(i)}px)`;
    };
    reels.forEach((r, k) => place(r, N + pos[k], 0));
    let credits = 0, spinning = false;
    const settle = () => {
      spinning = false;
      const s = pos.map((i) => STRIP[i]);
      const pay = s[0] === s[1] && s[1] === s[2] ? (s[0] === 'seven' ? 100 : 20) : s.filter((x) => x === 'cherry').length * 2;
      if (pay) { credits += pay; cred.textContent = credits; deck.classList.remove('win'); void deck.offsetWidth; deck.classList.add('win'); }
    };
    const spin = () => {
      if (spinning) return; spinning = true;
      reels.forEach((r, k) => {
        const target = Math.floor(Math.random() * N), ms = 900 + k * 380;
        r.classList.add('spin');
        place(r, pos[k], 0); void r.offsetWidth; // same symbol in the first copy, then run down two copies
        place(r, 2 * N + target, ms);
        later(() => { r.classList.remove('spin'); pos[k] = target; place(r, N + target, 0); if (k === 2) settle(); }, ms + 40);
      });
    };
    const MAX = 1.85; // scaleY 1 → −0.85
    let p = 0, startY = 0, startP = 0, dragging = false, moved = 0, raf = 0, t = 0;
    const render = () => { arm.style.transform = `scaleY(${1 - p * MAX})`; arm.setAttribute('aria-valuenow', Math.round(p * 100)); };
    const springBack = () => { arm.classList.remove('drag', 'pull'); if (raf) cancelAnimationFrame(raf); raf = 0; p = 0; render(); };
    const fullPull = () => { clearTimeout(t); arm.classList.remove('drag'); arm.classList.add('pull'); p = 1; render(); spin(); t = setTimeout(springBack, 260); };
    arm.addEventListener('pointerdown', (e) => { clearTimeout(t); dragging = true; moved = 0; startY = e.clientY; startP = p; arm.setPointerCapture(e.pointerId); arm.classList.add('drag'); });
    arm.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      moved = Math.max(moved, Math.abs(e.clientY - startY));
      p = Math.max(0, Math.min(1, startP + (e.clientY - startY) / 150));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const release = (e) => { if (!dragging) return; dragging = false; if (e.type === 'pointerup' && (moved < 4 || p > 0.7)) fullPull(); else springBack(); };
    arm.addEventListener('pointerup', release); arm.addEventListener('pointercancel', release);
    arm.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); if (!e.repeat) fullPull(); } });
    return () => { clearTimeout(t); timers.forEach(clearTimeout); if (raf) cancelAnimationFrame(raf); };
  },
};
