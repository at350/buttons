export default {
  id: 'gm-hearthstone-play',
  credit: 'Blizzard Hearthstone — carved wooden "Play" plank with brass rivets and the golden glow on hover; the mode toggle flips Standard / Wild',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(ellipse at 50% 30%, #3a2416, #1a0e08 70%);
      padding: 22px 28px 18px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px; }
    .hs { position: relative; width: 200px; height: 58px; border: none; cursor: pointer; padding: 0; border-radius: 10px; color: #ffe9a8; font: 700 24px 'Fraunces', 'Playfair Display', Georgia, serif; letter-spacing: 1px; text-shadow: 0 2px 0 #3a1c05, 0 0 8px rgba(0,0,0,.6);
      background: linear-gradient(180deg, #a8683a, #7a4420 50%, #5a2e12); background-image: repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 3px, transparent 3px 11px), linear-gradient(180deg, #a8683a, #7a4420 50%, #5a2e12);
      box-shadow: 0 0 0 3px #3a1c05, 0 0 0 5px #c9983f, 0 0 0 7px #3a1c05, 0 6px 14px rgba(0,0,0,.6), inset 0 2px 0 rgba(255,220,150,.3), inset 0 -3px 0 rgba(0,0,0,.4); transition: box-shadow .2s, transform .08s, filter .2s; }
    .hs::before, .hs::after { content: "";
      position: absolute;
      top: 50%;
      width: 10px;
      height: 10px;
      margin-top: -5px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #ffe08a, #b07d1e 60%, #6a4710);
      box-shadow: 0 1px 1px rgba(0,0,0,.6); }
    .hs::before { left: 10px; }
    .hs::after { right: 10px; }
    .hs:hover { filter: brightness(1.1);
      box-shadow: 0 0 0 3px #3a1c05, 0 0 0 5px #ffd96a, 0 0 0 7px #3a1c05, 0 0 24px 6px rgba(255,200,80,.45), 0 6px 14px rgba(0,0,0,.6), inset 0 2px 0 rgba(255,220,150,.3), inset 0 -3px 0 rgba(0,0,0,.4); }
    .hs:active { transform: translateY(2px); }
    .hs:focus-visible { outline: 2px solid #ffd96a; outline-offset: 10px; }
    .hs.q { color: #fff; animation: pulse 1.2s ease-in-out infinite alternate; }
    @keyframes pulse { to { box-shadow: 0 0 0 3px #3a1c05, 0 0 0 5px #ffd96a, 0 0 0 7px #3a1c05, 0 0 34px 10px rgba(255,200,80,.6), 0 6px 14px rgba(0,0,0,.6), inset 0 2px 0 rgba(255,220,150,.3), inset 0 -3px 0 rgba(0,0,0,.4); } }
    .mode { display: inline-flex;
      background: #2a160a;
      border-radius: 16px;
      padding: 3px;
      box-shadow: inset 0 2px 4px rgba(0,0,0,.6), 0 0 0 1px #c9983f; }
    .mode button { border: none;
      cursor: pointer;
      background: none;
      color: #a88d5a;
      font: 700 11px 'Fraunces', Georgia, serif;
      padding: 5px 12px;
      border-radius: 13px; }
    .mode button.on { background: linear-gradient(180deg, #e2b85a, #a8761e); color: #2a160a; text-shadow: 0 1px 0 rgba(255,255,255,.3); }
    .mode button:focus-visible { outline: 2px solid #ffd96a; }
  `,
  html: `
    <div class="stage">
      <button class="hs" type="button" aria-pressed="false">Play</button>
      <div class="mode" role="radiogroup"><button type="button" class="on" role="radio" aria-checked="true">Standard</button><button type="button" role="radio" aria-checked="false">Wild</button></div>
    </div>`,
  init(root) {
    const hs = root.querySelector('.hs');
    hs.addEventListener('click', () => { const on = hs.classList.toggle('q'); hs.setAttribute('aria-pressed', String(on)); hs.textContent = on ? 'Finding…' : 'Play'; });
    const m = [...root.querySelectorAll('.mode button')];
    m.forEach((b) => b.addEventListener('click', () => m.forEach((o) => { o.classList.toggle('on', o === b); o.setAttribute('aria-checked', String(o === b)); })));
  },
};
