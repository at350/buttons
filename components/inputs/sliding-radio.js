export default {
  id: 'in-sliding-radio',
  credit: 'Icon radio group with a sliding highlight pill behind the selected option (view switcher pattern)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .g { position: relative; display: inline-flex; padding: 4px; gap: 0; border-radius: 10px; background: #e4e4e7; }
    .pill { position: absolute; top: 4px; left: 4px; width: 40px; height: 36px; border-radius: 7px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.15); transition: transform .28s cubic-bezier(.4,0,.2,1); }
    .o {
      position: relative; z-index: 1; width: 40px; height: 36px; border: 0; background: none; padding: 0; cursor: pointer; border-radius: 7px;
      display: grid; place-items: center; color: #71717a; transition: color .2s; -webkit-tap-highlight-color: transparent;
    }
    .o:hover { color: #3f3f46; }
    .o:focus-visible { outline: 2px solid #2563eb; outline-offset: -2px; }
    .o[aria-checked="true"] { color: #18181b; }
    .o svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `<div class="g" role="radiogroup" aria-label="View">
    <span class="pill"></span>
    <button class="o" type="button" role="radio" aria-checked="true" aria-label="Grid"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></button>
    <button class="o" type="button" role="radio" aria-checked="false" aria-label="List"><svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></button>
    <button class="o" type="button" role="radio" aria-checked="false" aria-label="Columns"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="5" height="18" rx="1.5"/><rect x="9.5" y="3" width="5" height="18" rx="1.5"/><rect x="16" y="3" width="5" height="18" rx="1.5"/></svg></button>
  </div>`,
  init(root) {
    const g = root.querySelector('.g'), pill = root.querySelector('.pill');
    const opts = [...root.querySelectorAll('.o')];
    let idx = 0;
    const set = (i, focus) => {
      idx = (i + opts.length) % opts.length;
      opts.forEach((o, j) => o.setAttribute('aria-checked', j === idx));
      pill.style.transform = 'translateX(' + idx * 40 + 'px)';
      if (focus) opts[idx].focus({ preventScroll: true });
    };
    opts.forEach((o, i) => o.addEventListener('click', () => set(i)));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); set(idx + 1, true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); set(idx - 1, true); }
    });
  },
};
