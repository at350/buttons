// Tailwind UI "Radio groups → Cards": rounded-lg cards, border-gray-300, shadow-sm, p-4, Inter text-sm;
// the checked card drops its border for a 2px indigo-600 ring and shows the Heroicons 20/solid check-circle
// in its top-right corner (inside the card). Colors: gray-900 #111827, gray-500 #6b7280, indigo-600 #4f46e5.
export default {
  id: 'in-card-radio',
  credit: 'Tailwind UI radio cards — mailing-list picker, checked card gets a 2px indigo-600 ring and a Heroicons check-circle',
  size: 'wide',
  css: `
    :host { display: block; }
    .g { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; width: 440px; max-width: 100%; margin: 0 auto; font-family: Inter, system-ui, sans-serif; }
    .c {
      position: relative; display: flex; flex-direction: column; align-items: flex-start; min-width: 0; padding: 16px; border-radius: 8px; border: 1px solid #d1d5db; background: #fff;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05); cursor: pointer; text-align: left; transition: border-color .15s, box-shadow .15s; -webkit-tap-highlight-color: transparent; outline: 0;
    }
    .c:hover { border-color: #9ca3af; }
    .c[aria-checked="true"] { border-color: transparent; box-shadow: 0 0 0 2px #4f46e5, 0 1px 2px 0 rgba(0,0,0,.05); }
    .c:focus-visible { border-color: #4f46e5; box-shadow: 0 0 0 2px #4f46e5; }
    .t { display: block; padding-right: 22px; font: 500 14px/20px Inter, system-ui, sans-serif; color: #111827; }
    .d { display: block; margin-top: 4px; font: 400 14px/20px Inter, system-ui, sans-serif; color: #6b7280; }
    .n { display: block; margin-top: 24px; font: 500 14px/20px Inter, system-ui, sans-serif; color: #111827; }
    .ck { position: absolute; top: 14px; right: 14px; width: 20px; height: 20px; fill: #4f46e5; opacity: 0; transform: scale(.5); transition: opacity .15s, transform .2s cubic-bezier(.34,1.56,.64,1); }
    .c[aria-checked="true"] .ck { opacity: 1; transform: none; }
  `,
  html: `<div class="g" role="radiogroup" aria-label="Mailing list">
    ${[['Newsletter', 'Weekly', '621 users'], ['Customers', 'Monthly', '1,200 users'], ['Trial users', 'Daily', '2,740 users']].map(([t, d, n], i) => `<button class="c" type="button" role="radio" aria-checked="${i === 0}">
      <span class="t">${t}</span><span class="d">${d}</span><span class="n">${n}</span>
      <svg class="ck" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"/></svg>
    </button>`).join('')}
  </div>`,
  init(root) {
    const g = root.querySelector('.g'), cs = [...root.querySelectorAll('.c')];
    let idx = 0;
    const set = (i, focus) => {
      idx = (i + cs.length) % cs.length;
      cs.forEach((c, j) => c.setAttribute('aria-checked', j === idx));
      if (focus) cs[idx].focus({ preventScroll: true });
    };
    cs.forEach((c, i) => c.addEventListener('click', () => set(i)));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); set(idx + 1, true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); set(idx - 1, true); }
    });
  },
};
