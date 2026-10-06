export default {
  id: 'ph-mac-esc',
  credit: 'MacBook scissor-switch "esc" key — low profile, backlit legend, 1px travel',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 20px 24px; border-radius: 12px; background: linear-gradient(145deg, #9a9ca1, #7d7f85); }
    .deck { position: relative; padding: 5px; border-radius: 7px; background: #0b0b0d; box-shadow: inset 0 1px 2px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.08); }
    .key {
      position: relative; display: block; width: 64px; height: 42px; border: 0; padding: 0; border-radius: 5px; cursor: pointer;
      background: linear-gradient(#2a2a2e, #1b1b1e); color: #d9d9dd;
      font: 400 12px/1 -apple-system, system-ui, "Helvetica Neue", sans-serif; letter-spacing: .2px;
      box-shadow: 0 1px 0 rgba(255,255,255,.1) inset, 0 1.5px 0 #000, 0 2px 3px rgba(0,0,0,.8);
      text-shadow: 0 0 6px rgba(255,255,255,.55), 0 0 1px rgba(255,255,255,.9);
      transition: transform .04s, box-shadow .04s, background .1s; -webkit-tap-highlight-color: transparent;
    }
    .key span { position: absolute; left: 7px; bottom: 6px; }
    .key:hover { background: linear-gradient(#30303a, #1e1e24); }
    .key:active, .key.down { transform: translateY(1px); box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 .5px 0 #000, 0 1px 1px rgba(0,0,0,.8); background: linear-gradient(#1f1f23, #151518); }
    .key:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="deck"><button class="key" type="button" aria-label="escape"><span>esc</span></button></div>
    </div>`,
  init(root) {
    const k = root.querySelector('.key');
    k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
    k.addEventListener('keyup', () => k.classList.remove('down'));
    k.addEventListener('blur', () => k.classList.remove('down'));
  },
};
