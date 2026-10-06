export default {
  id: 'mb-discord-boost',
  credit: 'Discord — Server Boost goal card: level progress bar in Nitro pink and the "Boost This Server" button; each boost pops the gem and fills toward Level 2',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 260px; max-width: 100%; padding: 16px; border-radius: 12px; background: #313338; color: #f2f3f5;
      font: 500 14px/1.2 "gg sans", "Noto Sans", Inter, "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .hd { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
    .hd .ic { width: 32px; height: 32px; border-radius: 50%; background: #5865f2; display: grid; place-items: center; flex: none; }
    .hd .ic svg { width: 19px; height: 19px; fill: #fff; }
    .hd b { display: block; font-weight: 600; font-size: 15px; }
    .hd small { color: #b5bac1; font-size: 12px; }
    .lvl { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #b5bac1; }
    .lvl b { color: #f2f3f5; }
    .bar { height: 8px; border-radius: 4px; background: #1e1f22; overflow: hidden; margin-bottom: 14px; }
    .bar i { display: block; height: 100%; width: 28.57%; border-radius: 4px; background: linear-gradient(90deg, #ff73fa, #b473f5); transition: width .5s cubic-bezier(.2,.8,.2,1); }
    .bst { position: relative; width: 100%; height: 40px; border-radius: 8px; border: 0; cursor: pointer; color: #fff; overflow: hidden; isolation: isolate; -webkit-tap-highlight-color: transparent;
      background: linear-gradient(90deg, #ff73fa 0%, #b473f5 100%); font: 600 14px/1 "gg sans", "Noto Sans", Inter, sans-serif; display: grid; place-items: center;
      transition: filter .17s ease, transform .17s ease; }
    .bst > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: opacity .15s; }
    .bst .m { opacity: 0; }
    .bst:hover { filter: brightness(1.08); }
    .bst:active { transform: translateY(1px); }
    .bst:focus-visible { outline: 2px solid #00a8fc; outline-offset: 2px; }
    .bst svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .bst.pop .a svg { animation: pop .5s cubic-bezier(.2,1.6,.4,1); }
    @keyframes pop { 0% { transform: scale(.4) rotate(-20deg); } 100% { transform: none; } }
    .bst::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(110deg, transparent 35%, rgba(255,255,255,.35) 50%, transparent 65%); transform: translateX(-100%); }
    .bst.pop::after { animation: sweep .6s ease-out; }
    @keyframes sweep { to { transform: translateX(100%); } }
    .bst.max { background: #4e5058; }
    .bst.max .a { opacity: 0; } .bst.max .m { opacity: 1; }
    .bst.max svg { stroke: #ff73fa; }
  `,
  html: `
    <div class="stage">
      <div class="hd"><span class="ic"><svg viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg></span><span><b>Server Boost</b><small>Unlock perks for everyone</small></span></div>
      <div class="lvl"><span>LVL <b class="lv">1</b></span><span><b class="n">2</b> / 7 Boosts</span></div>
      <div class="bar"><i></i></div>
      <button class="bst" type="button" aria-live="polite"><span class="a"><svg viewBox="0 0 24 24"><path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/></svg>Boost This Server</span><span class="m"><svg viewBox="0 0 24 24"><path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/></svg>Level 2 Unlocked</span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.bst'), fill = root.querySelector('.bar i'), n = root.querySelector('.n'), lv = root.querySelector('.lv');
    let boosts = 2;
    const paint = () => { fill.style.width = (boosts / 7 * 100) + '%'; n.textContent = boosts; lv.textContent = boosts >= 7 ? '2' : '1'; b.classList.toggle('max', boosts >= 7); };
    b.addEventListener('click', () => {
      if (boosts >= 7) { boosts = 2; paint(); return; }
      boosts++; paint(); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    });
  },
};
