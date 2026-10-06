// Star Wars — Millennium Falcon cockpit: bank of bat-handle toggles with lamps, and the hyperdrive levers (first punch fails, like Empire).
export default {
  id: 'sf-falcon-cockpit',
  credit: 'Star Wars — Millennium Falcon cockpit: bat-handle toggle bank with status lamps and the three hyperdrive levers; the first jump fails, punch it again',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 310px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 12px; background: linear-gradient(#cfc8b6, #a9a291); box-shadow: inset 0 1px 0 #ece6d6; }
    .view { position: relative; height: 44px; border-radius: 22px 22px 4px 4px; overflow: hidden; background: radial-gradient(ellipse at 50% 120%, #0d1a2e, #000 70%); box-shadow: inset 0 0 0 3px #4a4639, inset 0 0 0 5px #24221c; margin-bottom: 10px; }
    .view i { position: absolute; width: 2px; height: 2px; border-radius: 1px; background: #fff; transform-origin: var(--ox) 50%; transition: transform .5s cubic-bezier(.7,0,.3,1), opacity .5s; }
    .jump .view i { transform: scaleX(40); opacity: .8; }
    .fail .view { animation: shake .25s 3; }
    @keyframes shake { 50% { transform: translateX(2px); } }
    .row { display: flex; gap: 10px; }
    .bank { flex: 1; display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px 4px; padding: 8px; background: #8b8577; border-radius: 4px; box-shadow: inset 0 2px 3px #5e594e, inset 0 -1px 0 #d6cfbd; }
    .tg { display: grid; justify-items: center; align-items: center; grid-template-rows: 6px 34px; gap: 2px; border: 0; padding: 2px 0 0; background: none; cursor: pointer; border-radius: 3px; }
    .lamp { width: 12px; height: 6px; border-radius: 1px; background: #4a0d0a; box-shadow: inset 0 0 0 1px #2a2620; }
    .tg[aria-pressed="true"] .lamp { background: #38f26a; box-shadow: 0 0 6px #38f26a; }
    .nut { position: relative; width: 16px; height: 16px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #f4f4f4, #8a8d90 60%, #4d5053); box-shadow: 0 1px 1px #000; }
    .bat { position: absolute; left: 5px; bottom: 8px; width: 6px; height: 15px; border-radius: 3px 3px 2px 2px; background: linear-gradient(90deg, #8c9094, #f2f4f5 45%, #9da1a5); transform-origin: 50% 100%; transform: rotate(180deg); transition: transform .14s cubic-bezier(.3,1.6,.5,1); }
    .tg[aria-pressed="true"] .bat { transform: rotate(0deg); }
    .tg[aria-pressed="false"] .nut { z-index: 1; }
    .tg:hover .nut { filter: brightness(1.15); }
    .tg:focus-visible, .hy:focus-visible { outline: 2px solid #2b6cff; outline-offset: 2px; }
    .hy { position: relative; width: 74px; border: 0; padding: 0; cursor: pointer; border-radius: 4px; background: #3a3730; box-shadow: inset 0 2px 4px #000; display: flex; justify-content: center; gap: 6px; padding-top: 6px; }
    .hy b { position: relative; width: 6px; height: 58px; border-radius: 3px; background: #0d0c0a; }
    .hy b::after { content: ''; position: absolute; left: -6px; width: 18px; height: 12px; top: 44px; border-radius: 3px; background: linear-gradient(#e9e9e9, #8f9296); box-shadow: 0 2px 2px #000;
      transition: top .35s cubic-bezier(.6,0,.2,1); transition-delay: calc(var(--d) * 40ms); }
    .hy:hover b::after { top: 40px; }
    .push .hy b::after { top: 0; }
    .hy u { position: absolute; left: 8px; right: 8px; bottom: 5px; height: 4px; border-radius: 2px; background: #4a0d0a; text-decoration: none; }
    .fail .hy u { background: #ff3b1f; box-shadow: 0 0 6px #ff3b1f; animation: bl .18s steps(1) 6; }
    .jump .hy u { background: #4ac8ff; box-shadow: 0 0 8px #4ac8ff; }
    @keyframes bl { 50% { background: #4a0d0a; box-shadow: none; } }
  `,
  html: `<div class="stage"><div class="view">${Array.from({ length: 34 }, (_, i) => {
    const r = (k) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
    const x = Math.round(r(1) * 284), y = Math.round(r(2) * 38);
    return `<i style="left:${x}px;top:${y + 2}px;--ox:${143 - x}px;opacity:${(0.35 + r(3) * 0.65).toFixed(2)}"></i>`;
  }).join('')}</div>
    <div class="row"><div class="bank">${Array.from({ length: 10 }, (_, i) => `<button class="tg" type="button" aria-label="Breaker ${i + 1}" aria-pressed="${[0, 2, 3, 7].includes(i)}"><span class="lamp"></span><span class="nut"><span class="bat"></span></span></button>`).join('')}</div>
    <button class="hy" type="button" aria-label="Hyperdrive" aria-pressed="false"><b style="--d:0"></b><b style="--d:1"></b><b style="--d:2"></b><u></u></button></div>
  </div>`,
  init(root) {
    const st = root.querySelector('.stage'), hy = root.querySelector('.hy');
    let tries = 0, timers = [];
    root.querySelectorAll('.tg').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
    hy.addEventListener('click', () => {
      timers.forEach(clearTimeout); timers = [];
      if (st.classList.contains('jump')) { st.classList.remove('jump', 'push'); hy.setAttribute('aria-pressed', 'false'); return; }
      st.classList.add('push'); st.classList.remove('fail');
      if (tries++ % 2 === 0) timers.push(setTimeout(() => st.classList.add('fail'), 380), setTimeout(() => st.classList.remove('push'), 900), setTimeout(() => st.classList.remove('fail'), 1500));
      else { timers.push(setTimeout(() => st.classList.add('jump'), 300)); hy.setAttribute('aria-pressed', 'true'); }
    });
    return () => timers.forEach(clearTimeout);
  },
};
