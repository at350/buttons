export default {
  id: 'rt-xp-close',
  credit: 'Windows XP (Luna) — title bar minimize / maximize / red close caption buttons',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 12px; border-radius: 12px; display: inline-block; transition: opacity .3s, transform .15s;
      background: linear-gradient(#0a246a 0%, #0058ee 4%, #3a93ff 8%, #288eff 14%, #127dda 22%, #036ffc 40%, #0262ee 90%, #0149c3 100%); }
    .bar { display: flex; gap: 2px; align-items: center; height: 30px; padding: 0 2px; }
    .cap { width: 21px; height: 21px; border: 1px solid #fff; border-radius: 3px; padding: 0; display: grid; place-items: center; cursor: default;
      background: radial-gradient(circle at 50% 120%, #7ab3ff 0%, #3c80f0 40%, #2a62d2 100%);
      box-shadow: inset 0 1px 2px rgba(255,255,255,.6), inset 0 -2px 3px rgba(0,0,0,.25); }
    .cap:hover { filter: brightness(1.18); }
    .cap:active { filter: brightness(.85); box-shadow: inset 0 2px 3px rgba(0,0,0,.4); }
    .cap:focus-visible { outline: 2px solid #ffe36b; outline-offset: 1px; }
    .cap.close { background: radial-gradient(circle at 50% 120%, #f0a088 0%, #e0633b 40%, #c73a1f 100%); margin-left: 1px; }
    .cap.close.hidden { visibility: hidden; }
    .cap svg { filter: drop-shadow(0 1px 0 rgba(0,0,0,.4)); }
    .stage.dim { opacity: .35; } .stage.big { transform: scale(1.08); }
  `,
  html: `
    <div class="stage">
      <div class="bar">
        <button class="cap mini" type="button" aria-label="Minimize"><svg width="11" height="11" viewBox="0 0 11 11"><rect x="2" y="7" width="6" height="3" fill="#fff"/></svg></button>
        <button class="cap maxi" type="button" aria-label="Maximize" aria-pressed="false"><svg width="11" height="11" viewBox="0 0 11 11"><path d="M1 1h9v9H1zM2 4v5h7V4z" fill="#fff" fill-rule="evenodd"/></svg></button>
        <button class="cap close" type="button" aria-label="Close"><svg width="11" height="11" viewBox="0 0 11 11"><path d="M1.5 1.5l8 8M9.5 1.5l-8 8" stroke="#fff" stroke-width="2.2"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage');
    const close = root.querySelector('.close');
    const maxi = root.querySelector('.maxi');
    root.querySelector('.mini').addEventListener('click', () => { stage.classList.add('dim'); setTimeout(() => stage.classList.remove('dim'), 500); });
    maxi.addEventListener('click', () => { const on = stage.classList.toggle('big'); maxi.setAttribute('aria-pressed', String(on)); });
    close.addEventListener('click', () => { close.classList.add('hidden'); setTimeout(() => close.classList.remove('hidden'), 800); });
  },
};
