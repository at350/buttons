export default {
  id: 'in-circle-bounce-check',
  credit: 'Circle checkbox — fills with an overshoot bounce and a popping check (Things 3 / Todoist style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cb { position: relative; width: 36px; height: 36px; border: 0; background: none; padding: 0; cursor: pointer; display: grid; place-items: center; -webkit-tap-highlight-color: transparent; border-radius: 50%; }
    .cb:focus-visible { outline: 3px solid #0ea5e9; outline-offset: 2px; }
    .ring {
      width: 26px; height: 26px; border-radius: 50%; border: 2px solid #cbd5e1; background: #fff; display: grid; place-items: center;
      transition: border-color .15s, background .15s;
    }
    .cb:hover .ring { border-color: #0ea5e9; }
    .cb[aria-checked="true"] .ring { border-color: #0ea5e9; background: #0ea5e9; animation: pop .45s cubic-bezier(.34,1.56,.64,1); }
    @keyframes pop { 0% { transform: scale(.6); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
    svg { width: 14px; height: 14px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; transform: scale(0); transition: transform .2s cubic-bezier(.34,1.56,.64,1); }
    .cb[aria-checked="true"] svg { transform: scale(1); transition-delay: .1s; }
  `,
  html: `<button class="cb" type="button" role="checkbox" aria-checked="false" aria-label="Circle checkbox">
    <span class="ring"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
  </button>`,
  init(root) {
    const b = root.querySelector('.cb');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
