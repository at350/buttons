export default {
  id: 'in-check-cross-toggle',
  credit: 'Red / green toggle — the knob spins a full turn and swaps a cross for a check (Dribbble pattern)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .t {
      position: relative; width: 64px; height: 34px; border-radius: 17px; border: 0; padding: 0; cursor: pointer;
      background: #ef4444; transition: background .35s; -webkit-tap-highlight-color: transparent;
    }
    .t:focus-visible { outline: 3px solid #111; outline-offset: 3px; }
    .t[aria-checked="true"] { background: #22c55e; }
    .knob {
      position: absolute; top: 4px; left: 4px; width: 26px; height: 26px; border-radius: 50%; background: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,.25); display: grid; place-items: center;
      transition: transform .4s cubic-bezier(.4,0,.2,1);
    }
    .t[aria-checked="true"] .knob { transform: translateX(30px) rotate(360deg); }
    .knob svg { position: absolute; width: 14px; height: 14px; fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; transition: opacity .2s, transform .35s; }
    .x { stroke: #ef4444; }
    .ck { stroke: #22c55e; opacity: 0; transform: scale(.4) rotate(-45deg); }
    .t[aria-checked="true"] .x { opacity: 0; transform: scale(.4) rotate(45deg); }
    .t[aria-checked="true"] .ck { opacity: 1; transform: none; }
  `,
  html: `<button class="t" type="button" role="switch" aria-checked="false" aria-label="Check cross toggle">
    <span class="knob">
      <svg class="x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      <svg class="ck" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>
    </span>
  </button>`,
  init(root) {
    const b = root.querySelector('.t');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
