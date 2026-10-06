export default {
  id: 'ty-weight-wave',
  credit: 'Variable-weight wave — Inter wght 300→900 ripples letter by letter on hover (Codrops "variable font hover" pattern)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer; background: #fff; color: #0a0a0a; border: 1.5px solid #0a0a0a; border-radius: 999px;
      padding: 14px 30px; font: 300 26px/1 Inter, system-ui, sans-serif; letter-spacing: -.01em;
      display: inline-flex; transition: background .25s, color .25s;
    }
    .btn:hover, .btn.on { background: #0a0a0a; color: #fff; }
    .btn:focus-visible { outline: 2px solid #0a0a0a; outline-offset: 3px; }
    .ch { display: inline-grid; }
    .ch > span { grid-area: 1 / 1; }
    .ch .g { visibility: hidden; font-weight: 900; }
    .ch .v {
      font-variation-settings: 'wght' 300; justify-self: center;
      transition: font-variation-settings .45s cubic-bezier(.22, 1, .36, 1);
      transition-delay: calc(var(--i) * 40ms);
    }
    .btn:hover .ch .v, .btn:focus-visible .ch .v { font-variation-settings: 'wght' 900; transition-delay: calc(var(--i) * 40ms); }
    .btn.on .ch .v { font-variation-settings: 'wght' 900; }
    .btn:active .ch .v { font-variation-settings: 'wght' 100; transition-duration: .15s; transition-delay: 0s; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Heavier"><span class="w" data-label="Heavier" aria-hidden="true"></span></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    const w = root.querySelector('.w');
    let i = 0;
    for (const c of w.dataset.label) {
      const ch = document.createElement('span');
      ch.className = 'ch';
      ch.style.setProperty('--i', String(i++));
      const g = document.createElement('span'); g.className = 'g'; g.textContent = c;
      const v = document.createElement('span'); v.className = 'v'; v.textContent = c;
      ch.append(g, v);
      w.appendChild(ch);
    }
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
