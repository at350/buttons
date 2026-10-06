export default {
  id: 'ty-unstack',
  credit: 'Unstacking word — a tightly stacked vertical word fans its letters out into a row on hover (Syne poster-type menus)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer; background: #fde047; color: #111; border: 0; border-radius: 12px; padding: 14px 18px;
      font: 800 30px/.85 Syne, 'Space Grotesk', system-ui, sans-serif; text-transform: uppercase;
      display: grid; grid-template-columns: repeat(var(--n), 1fr); width: calc(var(--n) * .78em + 36px); height: calc(var(--n) * .85em + 28px);
      place-items: start; position: relative; transition: background .3s, border-radius .3s;
    }
    .btn:hover, .btn.on { background: #111; color: #fde047; border-radius: 4px; }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .ch {
      grid-column: 1; grid-row: 1; width: .78em; text-align: center;
      transform: translate(calc((var(--n) - 1) * .39em), calc(var(--i) * .85em));
      transition: transform .55s cubic-bezier(.34, 1.2, .64, 1); transition-delay: calc((var(--n) - var(--i)) * 30ms);
    }
    .btn:hover .ch, .btn:focus-visible .ch, .btn.on .ch {
      transform: translate(calc(var(--i) * .78em), calc((var(--n) - 1) * .425em)); transition-delay: calc(var(--i) * 30ms);
    }
    .btn:active .ch { transform: translate(calc(var(--i) * .78em), calc((var(--n) - 1) * .425em)) scale(.9); }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Menu"><span class="w" data-label="MENU" aria-hidden="true" style="display:contents"></span></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    const w = root.querySelector('.w');
    const label = w.dataset.label;
    btn.style.setProperty('--n', String(label.length));
    let i = 0;
    for (const c of label) {
      const ch = document.createElement('span');
      ch.className = 'ch';
      ch.style.setProperty('--i', String(i++));
      ch.textContent = c;
      w.appendChild(ch);
    }
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
