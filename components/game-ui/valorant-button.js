export default {
  id: 'gm-valorant-button',
  credit: 'Riot Games VALORANT — angular red "PLAY" with notched corners, hairline offset frame and corner ticks; hover slides the fill, active fires a flash',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0f1923;
      background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
      background-size: 20px 20px;
      padding: 26px 30px;
      border-radius: 12px;
      display: flex;
      gap: 14px;
      align-items: center; }
    .v { position: relative;
      width: 170px;
      height: 54px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      color: #fff;
      font: 700 15px 'Inter', 'DM Sans', system-ui, sans-serif;
      letter-spacing: 3px;
      text-transform: uppercase; }
    .v .fill { position: absolute;
      inset: 0;
      background: #ff4655;
      clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
      transition: transform .15s; }
    .v .fill::after { content: "";
      position: absolute;
      inset: 0;
      background: #fff;
      transform: translateX(-100%);
      transition: transform .18s cubic-bezier(.3,.8,.3,1); }
    .v:hover .fill::after, .v.on .fill::after { transform: translateX(0); }
    .v .lbl { position: relative; z-index: 1; transition: color .18s; }
    .v:hover .lbl, .v.on .lbl { color: #0f1923; }
    .v::before { content: "";
      position: absolute;
      inset: -5px;
      border: 1px solid rgba(255,255,255,.3);
      clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
      transition: border-color .15s, inset .15s;
      pointer-events: none; }
    .v:hover::before { border-color: rgba(255,255,255,.7); inset: -3px; }
    .v .tk { position: absolute; width: 6px; height: 6px; border: 1px solid #ff4655; pointer-events: none; }
    .v .tk.a { left: -12px; top: -12px; border-right: 0; border-bottom: 0; }
    .v .tk.b { right: -12px; bottom: -12px; border-left: 0; border-top: 0; }
    .v:active .fill { transform: scale(.97); }
    .v.flash .fill { animation: fl .25s steps(2); }
    @keyframes fl { to { filter: brightness(2); } }
    .v:focus-visible { outline: 2px solid #ff4655; outline-offset: 8px; }
    .ghost .fill { background: transparent; box-shadow: inset 0 0 0 1px rgba(255,255,255,.45); }
    .ghost .fill::after { background: #ff4655; }
    .ghost:hover .lbl { color: #fff; }
    .ghost .tk { border-color: rgba(255,255,255,.4); }
    .ghost { width: 120px; }
  `,
  html: `
    <div class="stage">
      <button class="v" type="button" aria-pressed="false"><span class="fill"></span><span class="tk a"></span><span class="tk b"></span><span class="lbl">Play</span></button>
      <button class="v ghost" type="button"><span class="fill"></span><span class="tk a"></span><span class="tk b"></span><span class="lbl">Store</span></button>
    </div>`,
  init(root) {
    const v = root.querySelector('.v:not(.ghost)'), lbl = v.querySelector('.lbl'); let t;
    v.addEventListener('click', () => { const on = v.classList.toggle('on'); v.setAttribute('aria-pressed', String(on)); lbl.textContent = on ? 'In Queue' : 'Play'; v.classList.remove('flash'); void v.offsetWidth; v.classList.add('flash'); clearTimeout(t); t = setTimeout(() => v.classList.remove('flash'), 300); });
    return () => clearTimeout(t);
  },
};
