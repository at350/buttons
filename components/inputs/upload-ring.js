export default {
  id: 'in-upload-ring',
  credit: 'Upload micro-interaction — the Lucide upload glyph lifts away, a progress ring sweeps the rim, then a check draws in and the button turns green',
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
    .stop { opacity: 0; transform: scale(.5); width: 16px !important; height: 16px !important; fill: currentColor !important; stroke: none !important; }
    .u.busy .stop { opacity: 1; transform: none; transition-delay: .1s; }
    .ck { opacity: 0; transform: scale(.4); }
    .ck path { stroke-dasharray: 23; stroke-dashoffset: 23; }
    .u.done .ck { opacity: 1; transform: scale(1); }
    .u.done .ck path { animation: draw .35s .1s ease-out forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  `,
  html: `<button class="u" type="button" aria-label="Upload">
    <svg class="ring track" viewBox="0 0 60 60"><circle cx="30" cy="30" r="26"/></svg>
    <svg class="ring" viewBox="0 0 60 60"><circle cx="30" cy="30" r="26"/></svg>
    <svg class="arrow" viewBox="0 0 24 24"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
    <svg class="stop" viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="12" rx="2.5"/></svg>
    <svg class="ck" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
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
