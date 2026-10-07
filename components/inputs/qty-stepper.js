// Amazon cart quantity stepper (2023+ desktop cart): a pill with a 3px Amazon-yellow #ffd814 border, bold count
// between two round icon buttons; at a quantity of 1 the minus morphs into a trash can (Amazon's tested
// "delete" affordance). Ink #0f1111, hover #f7fafa / pressed #e3e6e6, Amazon Ember → Arial.
export default {
  id: 'in-qty-stepper',
  credit: 'Amazon cart quantity stepper — yellow #ffd814 pill, minus morphs into a trash can at 1',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .q {
      display: inline-flex; align-items: center; height: 36px; padding: 0 2px; border: 3px solid #ffd814; border-radius: 9999px; background: #fff;
      font: 700 15px/1 "Amazon Ember", Arial, sans-serif; color: #0f1111; transition: opacity .2s;
    }
    .q.gone { opacity: .5; }
    .b {
      position: relative; width: 28px; height: 28px; border: 0; border-radius: 50%; background: none; cursor: pointer; display: grid; place-items: center; color: #0f1111;
      transition: background-color .1s; -webkit-tap-highlight-color: transparent;
    }
    .b:hover { background: #f7fafa; }
    .b:active { background: #e3e6e6; }
    .b:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #007185; }
    .b:disabled { color: #b7bbbb; cursor: default; background: none; }
    .b svg { position: absolute; width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transition: opacity .15s, transform .2s cubic-bezier(.2,0,0,1); }
    .dec .trash { opacity: 0; transform: scale(.6) rotate(-20deg); }
    .dec.del .trash { opacity: 1; transform: none; }
    .dec.del .minus { opacity: 0; transform: scale(.6); }
    .n { width: 34px; text-align: center; font-variant-numeric: tabular-nums; }
    .n span { display: inline-block; }
    .n.bump span { animation: bump .2s ease-out; }
    @keyframes bump { 50% { transform: translateY(-2px) scale(1.15); } }
  `,
  html: `<div class="q" role="group" aria-label="Quantity">
    <button class="b dec" type="button" aria-label="Decrease quantity">
      <svg class="minus" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
      <svg class="trash" viewBox="0 0 24 24"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    </button>
    <output class="n" aria-live="polite"><span>2</span></output>
    <button class="b inc" type="button" aria-label="Increase quantity"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
  </div>`,
  init(root) {
    const q = root.querySelector('.q'), dec = root.querySelector('.dec'), inc = root.querySelector('.inc'), n = root.querySelector('.n'), s = n.firstElementChild;
    let v = 2;
    const set = (x) => {
      v = Math.max(0, Math.min(10, x)); s.textContent = v;
      dec.classList.toggle('del', v <= 1); dec.setAttribute('aria-label', v <= 1 ? 'Delete' : 'Decrease quantity');
      dec.disabled = v === 0; inc.disabled = v === 10; q.classList.toggle('gone', v === 0);
      n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump');
    };
    dec.addEventListener('click', () => set(v - 1)); inc.addEventListener('click', () => set(v + 1));
  },
};
