export default {
  id: 'in-dot-radio',
  credit: 'Classic dot radio group — the inner dot pops in with overshoot (Bootstrap / Material 2 flavour)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .g { display: inline-flex; gap: 14px; padding: 6px; }
    .r {
      position: relative; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #8e8e93; background: #fff; padding: 0; cursor: pointer;
      transition: border-color .2s, box-shadow .2s; -webkit-tap-highlight-color: transparent;
    }
    .r:hover { border-color: #2563eb; box-shadow: 0 0 0 6px rgba(37,99,235,.12); }
    .r:focus-visible { outline: 0; box-shadow: 0 0 0 4px rgba(37,99,235,.35); }
    .r::after { content: ''; position: absolute; inset: 4px; border-radius: 50%; background: #2563eb; transform: scale(0); transition: transform .18s ease-in; }
    .r[aria-checked="true"] { border-color: #2563eb; }
    .r[aria-checked="true"]::after { animation: pop .4s cubic-bezier(.34,1.56,.64,1) forwards; }
    @keyframes pop { from { transform: scale(0); } to { transform: scale(1); } }
  `,
  html: `<div class="g" role="radiogroup" aria-label="Choice">
    <button class="r" type="button" role="radio" aria-checked="true" aria-label="Option 1"></button>
    <button class="r" type="button" role="radio" aria-checked="false" aria-label="Option 2"></button>
    <button class="r" type="button" role="radio" aria-checked="false" aria-label="Option 3"></button>
    <button class="r" type="button" role="radio" aria-checked="false" aria-label="Option 4"></button>
  </div>`,
  init(root) {
    const g = root.querySelector('.g'), rs = [...root.querySelectorAll('.r')];
    let idx = 0;
    const set = (i, focus) => {
      idx = (i + rs.length) % rs.length;
      rs.forEach((r, j) => r.setAttribute('aria-checked', j === idx));
      if (focus) rs[idx].focus({ preventScroll: true });
    };
    rs.forEach((r, i) => r.addEventListener('click', () => set(i)));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); set(idx + 1, true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); set(idx - 1, true); }
    });
  },
};
