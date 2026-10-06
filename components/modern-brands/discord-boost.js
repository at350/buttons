export default {
  id: 'mb-discord-boost',
  credit: 'Discord Nitro — pink "Boost this server" with the gradient glow; each boost pops the gem and fills the level progress bar',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 250px; max-width: 100%; padding: 18px; border-radius: 12px; background: #1e1f22; font: 600 14px/1 "gg sans", Inter, -apple-system, system-ui, sans-serif; color: #f2f3f5; }
    .lvl { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 12px; color: #b5bac1; text-transform: uppercase; letter-spacing: .02em; }
    .lvl b { color: #f2f3f5; font-weight: 700; }
    .bar { height: 8px; border-radius: 4px; background: #2b2d31; overflow: hidden; margin-bottom: 14px; }
    .bar i { display: block; height: 100%; width: 28%; border-radius: 4px; background: linear-gradient(90deg, #ff73fa, #b845ff); transition: width .6s cubic-bezier(.2,.8,.2,1); }
    .bst { position: relative; width: 100%; height: 40px; border-radius: 8px; border: 0; cursor: pointer; color: #fff; isolation: isolate; overflow: hidden; -webkit-tap-highlight-color: transparent;
      background: linear-gradient(90deg, #ff73fa, #b845ff 60%, #8b5cf6); font: 600 14px/1 Inter, system-ui, sans-serif; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      box-shadow: 0 0 0 0 rgba(255,115,250,0); transition: box-shadow .35s, transform .15s cubic-bezier(.2,.8,.2,1), filter .2s; }
    .bst:hover { box-shadow: 0 0 24px -2px rgba(255,115,250,.6), 0 0 0 1px rgba(255,255,255,.1) inset; filter: brightness(1.08); }
    .bst:active { transform: scale(.97); }
    .bst:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .bst::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(110deg, transparent 40%, rgba(255,255,255,.3) 50%, transparent 60%); background-size: 250% 100%; background-position: 130% 0; transition: background-position .7s cubic-bezier(.2,.8,.2,1); }
    .bst:hover::after { background-position: -130% 0; }
    .bst svg { width: 18px; height: 18px; fill: #fff; filter: drop-shadow(0 0 4px rgba(255,255,255,.5)); transition: transform .4s linear(0, 0.4 10%, 1.3 35%, 0.9 55%, 1.05 75%, 1); }
    .bst:hover svg { transform: translateY(-1px) rotate(-8deg); }
    .bst.pop svg { animation: pop .5s linear(0, 0.3 15%, 1.4 40%, 0.9 65%, 1.1 80%, 1); }
    @keyframes pop { 40% { filter: drop-shadow(0 0 10px #fff); } }
    .bst.max { background: #2b2d31; color: #b5bac1; box-shadow: none; cursor: pointer; }
    .bst.max svg { fill: #ff73fa; }
  `,
  html: `
    <div class="stage">
      <div class="lvl"><span>Level <b class="lv">1</b></span><span><b class="n">2</b>/7 boosts</span></div>
      <div class="bar"><i></i></div>
      <button class="bst" type="button" aria-live="polite">
        <svg viewBox="0 0 24 24"><path d="M12 2 4 9l8 13 8-13-7-7zm0 3.3L16.7 9 12 17.4 7.3 9 12 5.3z"/></svg>
        <span class="lbl">Boost this server</span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.bst'), fill = root.querySelector('.bar i'), n = root.querySelector('.n'), lv = root.querySelector('.lv'), lbl = b.querySelector('.lbl');
    let boosts = 2;
    const paint = () => { fill.style.width = (boosts / 7 * 100) + '%'; n.textContent = boosts; lv.textContent = boosts >= 7 ? '2' : '1'; b.classList.toggle('max', boosts >= 7); lbl.textContent = boosts >= 7 ? 'Level 2 unlocked' : 'Boost this server'; };
    b.addEventListener('click', () => {
      if (boosts >= 7) { boosts = 2; paint(); return; }
      boosts++; paint(); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    });
  },
};
