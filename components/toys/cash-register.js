export default {
  id: 'ty2-cash-register',
  credit: 'Fisher-Price toy cash register (1974) — drop a coin in the slot and the drawer pops open with a ding; push it shut',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 250px; height: 214px; border-radius: 12px; overflow: hidden; background: linear-gradient(#e9f6ff, #c8e4f5); }
    .reg { position: absolute; left: 40px; top: 30px; width: 170px; height: 120px; border-radius: 22px 22px 8px 8px;
      background: radial-gradient(ellipse at 30% 10%, #ff7b73, #e3262d 40%, #a5141a); box-shadow: 0 6px 0 #7d0d12, inset 0 2px 0 rgba(255,255,255,.4); }
    .slot { position: absolute; left: 66px; top: 10px; width: 38px; height: 8px; border-radius: 4px; background: #3a0508; box-shadow: inset 0 2px 3px #000, 0 1px 0 rgba(255,255,255,.3); }
    .win { position: absolute; left: 20px; top: 26px; width: 130px; height: 28px; border-radius: 8px; background: linear-gradient(#ffe25a, #f7c600); box-shadow: inset 0 2px 4px rgba(0,0,0,.3);
      display: flex; align-items: center; justify-content: center; font: 800 16px/1 'Unbounded', system-ui, sans-serif; color: #1a5fb4; letter-spacing: .04em; }
    .keys { position: absolute; left: 20px; top: 62px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; width: 130px; }
    .key { height: 20px; border: 0; padding: 0; border-radius: 6px; cursor: pointer; font: 800 10px/1 'DM Sans', system-ui, sans-serif; color: #fff;
      background: linear-gradient(#5b93e6, #1a5fb4); box-shadow: 0 3px 0 #0b2e5c; transform: translateY(-2px); transition: transform .05s, box-shadow .05s; }
    .key:nth-child(even) { background: linear-gradient(#ffe25a, #f7c600); color: #7a5d00; box-shadow: 0 3px 0 #a58300; }
    .key:active { transform: translateY(1px); box-shadow: none; }
    .crank { position: absolute; right: -18px; top: 44px; width: 18px; height: 40px; border-radius: 0 8px 8px 0; background: linear-gradient(90deg, #1a5fb4, #3b82e0); }
    .drawer { position: absolute; left: 34px; top: 146px; width: 182px; height: 30px; border-radius: 6px 6px 10px 10px; border: 0; padding: 0; cursor: pointer;
      background: linear-gradient(#ffe25a, #f7c600 55%, #c79c00); box-shadow: 0 4px 0 #8a6a00, 0 6px 8px rgba(0,0,0,.3);
      transition: transform .35s cubic-bezier(.3,1.6,.5,1); }
    .drawer::before { content: ''; position: absolute; left: 50%; top: 11px; width: 40px; height: 8px; margin-left: -20px; border-radius: 4px; background: #a58300; box-shadow: inset 0 2px 2px rgba(0,0,0,.3); }
    .tray { position: absolute; left: 44px; top: 148px; width: 162px; height: 30px; border-radius: 4px; background: #5a4200; box-shadow: inset 0 3px 6px rgba(0,0,0,.6); display: flex; align-items: center; gap: 3px; padding: 0 8px; }
    .tray i { width: 14px; height: 14px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #fff1b0, #f5c518 60%, #b38600); }
    .open .drawer { transform: translateY(30px); }
    .coins { position: absolute; left: 10px; top: 32px; display: grid; gap: 6px; }
    .coin { width: 26px; height: 26px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; font: 800 9px/1 'DM Sans', system-ui, sans-serif; color: #7a5d00;
      background: radial-gradient(circle at 40% 35%, #fff1b0, #f5c518 55%, #b38600); box-shadow: 0 3px 0 #8a6a00, inset 0 0 0 2px #e0b000; transition: transform .15s; }
    .coin:hover { transform: translateY(-2px) rotate(-8deg); }
    .coin:disabled { visibility: hidden; }
    button:focus-visible { outline: 2px solid #1a5fb4; outline-offset: 2px; }
    .fly { position: absolute; left: 0; top: 0; width: 26px; height: 26px; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle at 40% 35%, #fff1b0, #f5c518 55%, #b38600); box-shadow: inset 0 0 0 2px #e0b000; }
  `,
  html: `
    <div class="stage">
      <div class="tray"></div>
      <div class="reg"><span class="slot"></span><span class="win">$0</span>
        <div class="keys"><button class="key" type="button">1</button><button class="key" type="button">2</button><button class="key" type="button">5</button><button class="key" type="button">10</button></div>
        <span class="crank"></span>
      </div>
      <button class="drawer" type="button" aria-expanded="false" aria-label="cash drawer"></button>
      <div class="coins"><button class="coin" type="button" aria-label="coin">1¢</button><button class="coin" type="button" aria-label="coin">5¢</button><button class="coin" type="button" aria-label="coin">10¢</button></div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), drawer = root.querySelector('.drawer'), win = root.querySelector('.win'), tray = root.querySelector('.tray');
    const coins = [...root.querySelectorAll('.coin')];
    let total = 0, banked = 0; const timers = new Set();
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
    const open = (o) => { st.classList.toggle('open', o); drawer.setAttribute('aria-expanded', String(o)); };
    const fmt = () => { total = Math.min(total, 99999); win.textContent = total < 100 ? total + '¢' : '$' + (total / 100).toFixed(2); };
    const ring = () => { win.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'cubic-bezier(.3,1.6,.5,1)' }); };
    coins.forEach((c) => c.addEventListener('click', () => {
      const sr = st.getBoundingClientRect(), cr = c.getBoundingClientRect();
      const f = document.createElement('span'); f.className = 'fly'; st.appendChild(f); c.disabled = true;
      const x0 = cr.left - sr.left, y0 = cr.top - sr.top;
      f.animate([{ transform: `translate(${x0}px,${y0}px)` }, { transform: `translate(${x0 + 50}px,${y0 - 34}px) rotate(90deg)`, offset: .5 },
        { transform: 'translate(112px,22px) rotate(90deg) scaleX(.3)' }, { transform: 'translate(112px,40px) rotate(90deg) scaleX(.3)', opacity: 0 }],
      { duration: 520, easing: 'ease-in', fill: 'forwards' });
      later(() => {
        f.remove(); total += parseInt(c.textContent, 10); fmt(); ring(); open(true);
        if (banked < 9) { tray.appendChild(document.createElement('i')); banked++; }
      }, 520);
      later(() => { c.disabled = false; }, 1400);
    }));
    root.querySelectorAll('.key').forEach((k) => k.addEventListener('click', () => { total += +k.textContent * 100; fmt(); ring(); }));
    drawer.addEventListener('click', () => open(!st.classList.contains('open')));
    return () => timers.forEach(clearTimeout);
  },
};
