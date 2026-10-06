export default {
  id: 'ty-display-compress',
  credit: 'Unbounded "PLAY" — ultra-wide display word that squashes horizontally while pressed and springs back (Spotify Wrapped / Unbounded specimen energy)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
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
      padding: 6px 34px 6px 4px;
      display: inline-grid;
      font: 900 56px/1 Unbounded, Syne, system-ui, sans-serif; letter-spacing: .02em;
    }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .v {
      display: inline-block;
      transform-origin: center;
      transition: transform .45s cubic-bezier(.34, 1.56, .64, 1), font-variation-settings .45s;
    }
    .btn:hover .v { transform: scaleX(1.04); }
    .btn:active .v { transform: scaleX(.6) scaleY(1.15); transition-duration: .12s; }
    .btn.on .v { transform: scaleX(.72) scaleY(1.1); }
    .btn.on:hover .v { transform: scaleX(.78) scaleY(1.08); }
    .btn:focus-visible {
      outline: 3px solid #0a0a0a;
      outline-offset: 4px;
      border-radius: 4px;
    }
    .tri {
      grid-area: 1 / 1;
      justify-self: end;
      align-self: center;
      width: 0;
      height: 0;
      border-left: 18px solid #0a0a0a;
      border-top: 11px solid transparent;
      border-bottom: 11px solid transparent;
      margin-right: -30px;
      opacity: 0;
      transform: translateX(-10px);
      transition: opacity .3s, transform .3s;
    }
    .btn:hover .tri, .btn.on .tri { opacity: 1; transform: translateX(0); }
    .btn.on .tri {
      border-left-width: 0;
      border-top: 0;
      border-bottom: 0;
      width: 14px;
      height: 22px;
      border-left: 5px solid #0a0a0a;
      border-right: 5px solid #0a0a0a;
    }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><span class="v">PLAY</span><i class="tri" aria-hidden="true"></i></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
