export default {
  id: 'rt-win95-combobox',
  credit: 'Windows 95 — drop-down combo box with sunken field and bevelled arrow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 14px; border-radius: 12px; }
    .combo { position: relative; width: 170px; font: 11px "MS Sans Serif", Tahoma, Arial, sans-serif; color: #000; }
    .field { display: flex; height: 21px; background: #fff; cursor: default;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px #0a0a0a, inset -2px -2px #dfdfdf; }
    .val { flex: 1; padding: 3px 3px 0 4px; margin: 2px 0 2px 2px; white-space: nowrap; overflow: hidden; }
    .field:focus-visible { outline: none; }
    .field:focus-visible .val { background: #000080; color: #fff; outline: 1px dotted #ff0; outline-offset: -1px; }
    .arrow { width: 16px; margin: 2px 2px 2px 0; background: #c0c0c0; display: grid; place-items: center;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .combo.open .arrow, .arrow:active { box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf; }
    .list { position: absolute; left: 0; right: 0; top: 100%; background: #fff; border: 1px solid #000; display: none; z-index: 5; }
    .combo.open .list { display: block; }
    .list div { padding: 1px 3px; height: 13px; line-height: 11px; cursor: default; }
    .list div:focus { outline: none; }
    .list div:hover, .list div.sel { background: #000080; color: #fff; }
    .list div:focus-visible { background: #000080; color: #fff; outline: 1px dotted #ff0; outline-offset: -1px; }
  `,
  html: `
    <div class="stage">
      <div class="combo">
        <div class="field" tabindex="0" role="combobox" aria-expanded="false" aria-haspopup="listbox">
          <div class="val">800 by 600 pixels</div>
          <div class="arrow"><svg width="7" height="4" viewBox="0 0 7 4"><path d="M0 0h7L3.5 4z" fill="#000"/></svg></div>
        </div>
        <div class="list" role="listbox">
          <div role="option" tabindex="-1" aria-selected="false">640 by 480 pixels</div>
          <div role="option" tabindex="0" aria-selected="true" class="sel">800 by 600 pixels</div>
          <div role="option" tabindex="-1" aria-selected="false">1024 by 768 pixels</div>
          <div role="option" tabindex="-1" aria-selected="false">1280 by 1024 pixels</div>
        </div>
      </div>
    </div>`,
  init(root) {
    const combo = root.querySelector('.combo');
    const field = root.querySelector('.field');
    const val = root.querySelector('.val');
    const opts = [...root.querySelectorAll('[role=option]')];
    const isOpen = () => combo.classList.contains('open');
    const open = (o) => { combo.classList.toggle('open', o); field.setAttribute('aria-expanded', String(o)); };
    const selectedIdx = () => Math.max(0, opts.findIndex((x) => x.classList.contains('sel')));
    // Roving tabindex: exactly one option is tabbable; arrow keys move focus between them.
    const focusOpt = (i) => {
      const n = (i + opts.length) % opts.length;
      opts.forEach((x, k) => { x.tabIndex = k === n ? 0 : -1; });
      opts[n].focus({ preventScroll: true });
    };
    const select = (o) => {
      opts.forEach((x) => { x.classList.toggle('sel', x === o); x.setAttribute('aria-selected', String(x === o)); x.tabIndex = x === o ? 0 : -1; });
      val.textContent = o.textContent;
      open(false);
      field.focus({ preventScroll: true });
    };
    field.addEventListener('click', () => open(!isOpen()));
    field.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        open(!isOpen());
        if (isOpen()) focusOpt(selectedIdx());
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        open(true);
        focusOpt(selectedIdx());
      } else if (e.key === 'Escape') {
        open(false);
      }
    });
    opts.forEach((o, i) => {
      o.addEventListener('click', () => select(o));
      o.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); focusOpt(i + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); focusOpt(i - 1); }
        else if (e.key === 'Home') { e.preventDefault(); focusOpt(0); }
        else if (e.key === 'End') { e.preventDefault(); focusOpt(opts.length - 1); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(o); }
        else if (e.key === 'Escape') { e.preventDefault(); open(false); field.focus({ preventScroll: true }); }
      });
    });
    root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) open(false); });
  },
};
