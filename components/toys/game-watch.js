const MAN = (x, i) => `<g class="man" data-i="${i}" transform="translate(${x} 0)"><circle cx="0" cy="22" r="5"/><path d="M-5 29 H5 L7 44 H3 L2 52 H-2 L-3 44 H-7 Z"/><path d="M-6 31 L-13 38 M6 31 L13 38" stroke-width="3" stroke-linecap="round"/></g>`;

export default {
  id: 'ty2-game-watch',
  credit: 'Nintendo Game & Watch Gold series (1981) — brushed gold panel: GAME A / GAME B / TIME keys, ghosting LCD segments, LEFT / RIGHT action buttons',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 10px; border-radius: 12px; background: #2a2a2a; }
    .gw { position: relative; width: 296px; height: 150px; border-radius: 10px; overflow: hidden;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px), linear-gradient(170deg, #f1d987, #c9a23c 45%, #9c7a22 75%, #d8b85a);
      box-shadow: inset 0 0 0 3px #7a5d18, inset 0 2px 0 rgba(255,255,255,.4); }
    .bezel { position: absolute; left: 66px; top: 14px; width: 164px; height: 118px; border-radius: 6px; background: #1d1a14; box-shadow: inset 0 0 0 2px #5b4612; }
    .title { position: absolute; left: 0; right: 0; top: 4px; text-align: center; font: 800 7px/1 'Unbounded', system-ui, sans-serif; letter-spacing: .14em; color: #d9c07a; }
    .lcd { position: absolute; left: 8px; top: 16px; width: 148px; height: 94px; border-radius: 3px;
      background: radial-gradient(ellipse at 50% 30%, #c9cfae, #a9b08a); box-shadow: inset 0 2px 4px rgba(0,0,0,.4); }
    .lcd svg { width: 100%; height: 100%; }
    .man, .seg { fill: #24261c; stroke: #24261c; opacity: .07; transition: opacity .05s; }
    .man.on, .seg.on { opacity: .92; }
    .num { font: 700 15px/1 'JetBrains Mono', ui-monospace, monospace; fill: #24261c; font-style: italic; }
    .ind { font: 700 6px/1 'DM Sans', system-ui, sans-serif; fill: #24261c; letter-spacing: .05em; }
    .ground { stroke: #24261c; stroke-width: 2; opacity: .6; }
    .keys { position: absolute; right: 10px; top: 16px; display: grid; gap: 9px; }
    .k { display: grid; justify-items: center; gap: 2px; }
    .k button { width: 34px; height: 9px; border: 0; padding: 0; border-radius: 5px; cursor: pointer;
      background: linear-gradient(#5a4a30, #2a1d10); box-shadow: 0 2px 0 #1a1208, inset 0 1px 0 rgba(255,255,255,.2); transition: transform .05s, box-shadow .05s; }
    .k button:active { transform: translateY(2px); box-shadow: 0 0 0 #1a1208; }
    .k span { font: 700 5.5px/1 'DM Sans', system-ui, sans-serif; letter-spacing: .08em; color: #4a3810; }
    .act { position: absolute; bottom: 18px; width: 36px; height: 36px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 40% 30%, #ff9a6a, #e3502a 50%, #a8320f); box-shadow: 0 4px 0 #6e1f08, 0 0 0 4px #7a5d18, 0 5px 6px rgba(0,0,0,.35);
      transition: transform .05s, box-shadow .05s; }
    .act:active { transform: translateY(3px); box-shadow: 0 1px 0 #6e1f08, 0 0 0 4px #7a5d18; }
    .l { left: 14px; } .r { right: 18px; }
    button:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="gw">
      <div class="bezel"><span class="title">GAME &amp; WATCH</span><div class="lcd">
        <svg viewBox="0 0 148 94" aria-hidden="true">
          <text class="ind seg ia" x="6" y="10">GAME A</text><text class="ind seg ib" x="6" y="18">GAME B</text>
          <text class="num" x="142" y="16" text-anchor="end">12:00</text>
          <g transform="translate(0 30)">${[26, 74, 122].map(MAN).join('')}</g>
          <line class="ground" x1="6" y1="86" x2="142" y2="86"/>
        </svg>
      </div></div>
      <div class="keys">
        <div class="k"><button type="button" data-m="a" aria-label="GAME A"></button><span>GAME A</span></div>
        <div class="k"><button type="button" data-m="b" aria-label="GAME B"></button><span>GAME B</span></div>
        <div class="k"><button type="button" data-m="t" aria-label="TIME"></button><span>TIME</span></div>
      </div>
      <button class="act l" type="button" aria-label="left"></button>
      <button class="act r" type="button" aria-label="right"></button>
    </div></div>`,
  init(root) {
    const men = [...root.querySelectorAll('.man')], num = root.querySelector('.num'), ia = root.querySelector('.ia'), ib = root.querySelector('.ib');
    let pos = 1, mode = 't', score = 0;
    const clock = () => { const d = new Date(); return `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')}`; };
    const draw = () => {
      men.forEach((m, i) => m.classList.toggle('on', i === pos));
      ia.classList.toggle('on', mode === 'a'); ib.classList.toggle('on', mode === 'b');
      num.textContent = mode === 't' ? clock() : String(score);
    };
    root.querySelectorAll('.k button').forEach((b) => b.addEventListener('click', () => { mode = b.dataset.m; score = 0; pos = 1; draw(); }));
    const step = (d) => { const np = Math.max(0, Math.min(2, pos + d)); if (np !== pos && mode !== 't') score += mode === 'a' ? 1 : 2; pos = np; draw(); };
    root.querySelector('.l').addEventListener('click', () => step(-1));
    root.querySelector('.r').addEventListener('click', () => step(1));
    draw();
  },
};
