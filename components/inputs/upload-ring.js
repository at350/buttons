export default {
  id: 'in-upload-ring',
  credit: 'Upload button — click, the arrow collapses into a ring that fills, then a check draws in (Dribbble micro-interaction)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .u { position: relative; width: 60px; height: 60px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: #2563eb; color: #fff; display: grid; place-items: center; box-shadow: 0 4px 12px rgba(37,99,235,.35); transition: background .3s, transform .15s, box-shadow .3s; -webkit-tap-highlight-color: transparent; }
    .u:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37,99,235,.4); }
    .u:active { transform: scale(.96); }
    .u:focus-visible { outline: 3px solid #2563eb; outline-offset: 3px; }
    .u.done { background: #16a34a; box-shadow: 0 4px 12px rgba(22,163,74,.35); }
    .u svg { position: absolute; width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; transition: opacity .2s, transform .3s; }
    .ring { width: 60px !important; height: 60px !important; transform: rotate(-90deg); stroke-width: 4; opacity: 0; }
    .ring circle { stroke-dasharray: 163.4; stroke-dashoffset: 163.4; }
    .u.busy .arrow, .u.done .arrow { opacity: 0; transform: translateY(-14px) scale(.6); }
    .u.busy .ring { opacity: 1; }
    .u.busy .ring circle { animation: fill 1.6s cubic-bezier(.4,.1,.3,1) forwards; }
    @keyframes fill { to { stroke-dashoffset: 0; } }
    .u.busy .track { opacity: .3; }
    .ck { opacity: 0; transform: scale(.4); }
    .ck path { stroke-dasharray: 24; stroke-dashoffset: 24; }
    .u.done .ck { opacity: 1; transform: scale(1); }
    .u.done .ck path { animation: draw .35s .1s ease-out forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  `,
  html: `<button class="u" type="button" aria-label="Upload">
    <svg class="ring track" viewBox="0 0 60 60"><circle cx="30" cy="30" r="26"/></svg>
    <svg class="ring" viewBox="0 0 60 60"><circle cx="30" cy="30" r="26"/></svg>
    <svg class="arrow" viewBox="0 0 24 24"><path d="M12 17V5M6 11l6-6 6 6M4 20h16"/></svg>
    <svg class="ck" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
  </button>`,
  init(root) {
    const b = root.querySelector('.u'), ring = root.querySelector('.ring:not(.track) circle');
    b.addEventListener('click', () => {
      if (b.classList.contains('busy')) return;
      if (b.classList.contains('done')) { b.classList.remove('done'); return; }
      b.classList.add('busy');
    });
    ring.addEventListener('animationend', () => { b.classList.remove('busy'); b.classList.add('done'); });
  },
};
