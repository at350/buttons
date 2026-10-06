export default {
  id: 'ob-do-not-click',
  credit: '"Do not click" — the button that counts your disobedience and gets angrier with every press (text, colour and shake escalate; the eighth click gives up)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { width: 260px; max-width: 100%; height: 110px; display: grid; place-items: center; border-radius: 12px; background: #fff7f7; transition: background .3s; }
    .btn { position: relative; padding: 14px 26px; border: 2px solid #c33; border-radius: 8px; background: #fff; color: #c33; cursor: pointer; font: 700 15px/1 Inter, system-ui, sans-serif; letter-spacing: .3px; transition: background .2s, color .2s, transform .15s, border-color .2s, font-size .2s; white-space: nowrap; min-width: 196px; }
    .btn:hover { background: #fff0f0; }
    .btn:focus-visible { outline: 2px solid #c33; outline-offset: 3px; }
    .btn.l1 { background: #fde2e2; }
    .btn.l2 { background: #f9b4b4; transform: scale(1.04); }
    .btn.l3 { background: #e74c4c; color: #fff; transform: scale(1.08); animation: wob .4s ease-in-out infinite alternate; }
    .btn.l4 { background: #c0392b; color: #fff; border-color: #7a1a10; transform: scale(1.12); animation: wob .25s ease-in-out infinite alternate; }
    .btn.l5 { background: #7a1a10; color: #fff; border-color: #000; transform: scale(1.16); animation: rage .12s linear infinite; text-transform: uppercase; }
    .btn.l6 { background: #000; color: #f33; border-color: #f33; transform: scale(1.2); animation: rage .08s linear infinite; text-transform: uppercase; }
    .btn.l7 { background: #eee; color: #888; border-color: #ccc; transform: scale(1); animation: none; }
    .wrap.l5, .wrap.l6 { background: #2a0a0a; }
    .wrap.l7 { background: #f3f3f3; }
    @keyframes wob { from { rotate: -2deg; }
    to { rotate: 2deg; } }
    @keyframes rage { 0% { translate: -2px 0; } 25% { translate: 2px -1px; } 50% { translate: -1px 2px; } 75% { translate: 2px 1px; } 100% { translate: 0 0; } }
    .cnt { position: absolute; right: -8px; top: -10px; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 10px; background: #c33; color: #fff; font: 700 11px/20px Inter, system-ui, sans-serif; opacity: 0; transition: opacity .2s; }
    .btn.l1 .cnt, .btn.l2 .cnt, .btn.l3 .cnt, .btn.l4 .cnt, .btn.l5 .cnt, .btn.l6 .cnt, .btn.l7 .cnt { opacity: 1; }
  `,
  html: `<div class="wrap"><button class="btn" type="button"><span class="t">Do not click</span><span class="cnt" aria-hidden="true">0</span></button></div>`,
  init(root) {
    const wrap = root.querySelector('.wrap'), btn = root.querySelector('.btn'), t = root.querySelector('.t'), cnt = root.querySelector('.cnt');
    const says = ['Do not click', 'I said don\'t', 'Seriously?', 'Stop it.', 'STOP CLICKING', 'I\'M WARNING YOU', 'WHY', '…fine.'];
    let n = 0;
    btn.addEventListener('click', () => {
      n = n >= 7 ? 0 : n + 1;
      t.textContent = says[n]; cnt.textContent = String(n);
      btn.className = 'btn' + (n ? ' l' + n : ''); wrap.className = 'wrap' + (n ? ' l' + n : '');
    });
    // Escape calms it down again
    btn.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || !n) return;
      n = 0; t.textContent = says[0]; cnt.textContent = '0'; btn.className = 'btn'; wrap.className = 'wrap';
    });
  },
};
