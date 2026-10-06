export default {
  id: 'in-qty-stepper',
  credit: 'Quantity stepper − 1 + — pill with hairline dividers, minus disables at zero (Shopify / Amazon cart)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .q { display: inline-flex; align-items: stretch; height: 40px; border: 1px solid #c9cccf; border-radius: 10px; background: #fff; overflow: hidden; font: 600 15px system-ui, sans-serif; color: #202223; box-shadow: 0 1px 0 rgba(0,0,0,.05); }
    .q:focus-within { border-color: #202223; box-shadow: 0 0 0 1px #202223; }
    .b { width: 40px; border: 0; background: none; cursor: pointer; display: grid; place-items: center; color: #5c5f62; transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; }
    .b:hover { background: #f6f6f7; color: #202223; }
    .b:active { background: #ebebeb; }
    .b:focus-visible { outline: 0; background: #f1f2f3; }
    .b:disabled { color: #c9cccf; cursor: default; background: none; }
    .b svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; }
    .n { min-width: 40px; display: grid; place-items: center; border-left: 1px solid #e1e3e5; border-right: 1px solid #e1e3e5; font-variant-numeric: tabular-nums; }
    .n span { display: inline-block; }
    .n.bump span { animation: bump .18s ease-out; }
    @keyframes bump { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }
  `,
  html: `<div class="q" role="group" aria-label="Quantity">
    <button class="b dec" type="button" aria-label="Decrease"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button>
    <output class="n" aria-live="polite"><span>1</span></output>
    <button class="b inc" type="button" aria-label="Increase"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
  </div>`,
  init(root) {
    const dec = root.querySelector('.dec'), inc = root.querySelector('.inc'), n = root.querySelector('.n'), s = n.firstElementChild;
    let v = 1;
    const set = (x) => {
      v = Math.max(0, Math.min(99, x)); s.textContent = v; dec.disabled = v === 0; inc.disabled = v === 99;
      n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump');
    };
    dec.addEventListener('click', () => set(v - 1)); inc.addEventListener('click', () => set(v + 1));
    set(1);
  },
};
