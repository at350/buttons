export default {
  id: 'cr-download-morph',
  credit: 'Download button morphs into a progress bar, then a check — Dribbble micro-interaction classic',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { width: 240px; height: 72px; max-width: 100%; display: grid; place-items: center; }
    .btn {
      position: relative; width: 170px; height: 48px; border: 0; border-radius: 24px; background: #111; color: #fff; cursor: pointer;
      font: 600 15px/1 system-ui, sans-serif; overflow: hidden;
      transition: width .45s cubic-bezier(.4, 0, .2, 1), height .45s cubic-bezier(.4, 0, .2, 1), border-radius .45s, background .3s;
    }
    .btn:hover { background: #262626; }
    .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .lbl { display: inline-flex; align-items: center; gap: 8px; transition: opacity .2s; }
    .lbl svg { width: 16px; height: 16px; }
    .fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: #2563eb; border-radius: inherit; }
    .chk { position: absolute; inset: 0; margin: auto; width: 24px; height: 24px; opacity: 0; }
    .chk path { fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 26; stroke-dashoffset: 26; }
    .btn.loading { width: 220px; height: 10px; border-radius: 5px; background: #e5e7eb; }
    .btn.loading .lbl { opacity: 0; }
    .btn.loading .fill { width: 100%; transition: width 1.7s .3s cubic-bezier(.3, .1, .3, 1); }
    .btn.done { width: 48px; height: 48px; border-radius: 50%; background: #16a34a; }
    .btn.done .lbl { opacity: 0; }
    .btn.done .fill { width: 0; transition: none; }
    .btn.done .chk { opacity: 1; }
    .btn.done .chk path { stroke-dashoffset: 0; transition: stroke-dashoffset .45s .35s ease-out; }
  `,
  html: `
    <div class="wrap">
      <button class="btn" type="button">
        <span class="fill"></span>
        <span class="lbl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M4 20h16"/></svg>Download</span>
        <svg class="chk" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    let timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    b.addEventListener('click', () => {
      if (b.classList.contains('loading') || b.classList.contains('done')) return;
      b.classList.add('loading');
      later(() => { b.classList.remove('loading'); b.classList.add('done'); }, 2300);
      later(() => { b.classList.remove('done'); }, 4200);
    });
    return () => timers.forEach(clearTimeout);
  },
};
