export default {
  id: 'ty-display-compress',
  credit: 'Unbounded "PLAY" — ultra-wide display word that squashes horizontally while pressed and springs back; the Lucide play glyph morphs to pause when toggled (Spotify Wrapped / Unbounded specimen energy)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage {
      background: #a3e635;
      border-radius: 12px;
      padding: 14px 20px;
    }
    .btn {
      cursor: pointer;
      background: transparent;
      color: #0a0a0a;
      border: 0;
      padding: 6px 40px 6px 4px;
      display: inline-grid;
      font: 900 56px/1 Unbounded, Syne, system-ui, sans-serif; letter-spacing: .02em;
    }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .v {
      display: inline-block;
      transform-origin: right center;
      transition: transform .45s cubic-bezier(.34, 1.56, .64, 1), font-variation-settings .45s;
    }
    .btn:hover .v { transform: scaleX(1.04); }
    .btn:active .v { transform: scaleX(.6) scaleY(1.15); transition-duration: .12s; }
        .btn:focus-visible {
      outline: 3px solid #0a0a0a;
      outline-offset: 4px;
      border-radius: 4px;
    }
    .ico {
      grid-area: 1 / 1;
      justify-self: end;
      align-self: center;
      width: 30px;
      height: 30px;
      margin-right: -34px;
      display: grid;
      opacity: 0;
      transform: translateX(-10px);
      transition: opacity .3s, transform .45s cubic-bezier(.34, 1.56, .64, 1);
    }
    .ico svg { grid-area: 1 / 1; width: 100%; height: 100%; fill: #0a0a0a; transition: opacity .2s, transform .3s cubic-bezier(.34, 1.56, .64, 1); }
    .ico .pa { opacity: 0; transform: scale(.6); }
    .btn:hover .ico, .btn:focus-visible .ico, .btn.on .ico { opacity: 1; transform: translateX(0); }
    .btn.on .ico .pl { opacity: 0; transform: scale(.6); }
    .btn.on .ico .pa { opacity: 1; transform: scale(1); }
    @media (prefers-reduced-motion: reduce) { .v, .ico { transition-duration: .01s; } }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false" aria-label="Play"><span class="v" aria-hidden="true">PLAY</span><span class="ico" aria-hidden="true"><svg class="pl" viewBox="0 0 24 24"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg><svg class="pa" viewBox="0 0 24 24"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg></span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
