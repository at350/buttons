export default {
  id: 'rt-win95-combobox',
  credit: 'Windows 95 — Display Properties drop-down combo box: sunken field, bevelled arrow button, navy selection',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 14px; border-radius: 12px; }
    .combo { position: relative; width: 170px; font: 11px/13px "MS Sans Serif", "Microsoft Sans Serif", Tahoma, Arial, sans-serif; -webkit-font-smoothing: none; color: #000; }
    .field { display: flex; height: 21px; padding: 2px; background: #fff; cursor: default; outline: none;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px #000, inset -2px -2px #dfdfdf; }
    .val { flex: 1; margin: 1px 1px 1px 1px; padding: 1px 2px; white-space: nowrap; overflow: hidden; }
    .field:focus-visible .val, .combo.open .val { background: #000080; color: #fff; outline: 1px dotted #fff; outline-offset: -1px; }
    .arrow { width: 16px; height: 17px; flex: none; background: #c0c0c0; display: grid; place-items: center;
      box-shadow: inset -1px -1px #000, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff; }
    .arrow svg { display: block; }
    .field:active .arrow, .combo.open .arrow { box-shadow: inset 0 0 0 1px #808080; }
    .field:active .arrow svg, .combo.open .arrow svg { transform: translate(1px, 1px); }
    .list { position: absolute; left: 0; right: 0; top: 100%; background: #fff; border: 1px solid #000; display: none; z-index: 5; padding: 0; }
    .combo.open .list { display: block; }
    .list div { padding: 0 2px; height: 13px; line-height: 13px; cursor: default; white-space: nowrap; outline: none; }
    .list div.hot { background: #000080; color: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="combo">
        <div class="field" tabindex="0" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-label="Screen area">
          <div class="val">800 by 600 pixels</div>
          <div class="arrow"><svg width="7" height="4" viewBox="0 0 7 4" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h7v1h-7zM1 1h5v1h-5zM2 2h3v1h-3zM3 3h1v1h-1z" fill="#000"/></svg></div>
        </div>
        <div class="list" role="listbox">
          <div role="option" aria-selected="false">640 by 480 pixels</div>
          <div role="option" aria-selected="true">800 by 600 pixels</div>
          <div role="option" aria-selected="false">1024 by 768 pixels</div>
          <div role="option" aria-selected="false">1280 by 1024 pixels</div>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const combo = root.querySelector('.combo');
    const field = root.querySelector('.field');
    const val = root.querySelector('.val');
    const opts = [...root.querySelectorAll('[role=option]')];
    let sel = 1, hot = 1;
    const isOpen = () => combo.classList.contains('open');
    const paintHot = () => opts.forEach((o, i) => o.classList.toggle('hot', i === hot));
    const open = (o) => {
      combo.classList.toggle('open', o);
      field.setAttribute('aria-expanded', String(o));
      host && host.toggleAttribute('data-open', o);
      if (o) { hot = sel; paintHot(); }
    };
    const choose = (i) => {
      sel = i;
      opts.forEach((o, k) => o.setAttribute('aria-selected', String(k === i)));
      val.textContent = opts[i].textContent;
      open(false);
      field.focus({ preventScroll: true });
    };
    field.addEventListener('click', (e) => { if (!e.target.closest('.list')) open(!isOpen()); });
    field.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const d = e.key === 'ArrowDown' ? 1 : -1;
        if (isOpen()) { hot = Math.max(0, Math.min(opts.length - 1, hot + d)); paintHot(); }
        else if (e.altKey) open(true);
        else { const i = Math.max(0, Math.min(opts.length - 1, sel + d)); choose(i); }
      } else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (isOpen()) choose(hot); else open(true); }
      else if (e.key === 'F4') { e.preventDefault(); open(!isOpen()); }
      else if (e.key === 'Escape' && isOpen()) { e.preventDefault(); open(false); }
    });
    opts.forEach((o, i) => {
      o.addEventListener('pointerenter', () => { hot = i; paintHot(); });
      o.addEventListener('click', (e) => { e.stopPropagation(); choose(i); });
    });
    root.querySelector('.list').addEventListener('mousedown', (e) => e.preventDefault());
    const outside = (e) => { if (isOpen() && !e.composedPath().includes(combo)) open(false); };
    document.addEventListener('pointerdown', outside, true);
    root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) open(false); });
    return () => { document.removeEventListener('pointerdown', outside, true); host && host.removeAttribute('data-open'); };
  },
};
