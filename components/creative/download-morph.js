export default {
  id: 'cr-download-morph',
  credit: 'Download button morphs into a progress bar, then a check — the Dribbble micro-interaction classic (Aaron Iker / Colin Garven lineage)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { width: 232px; height: 72px; max-width: 100%; display: grid; place-items: center; }
    .btn {
      position: relative; width: 168px; height: 48px; border: 0; border-radius: 24px; background: #111; color: #fff; cursor: pointer; padding: 0;
      font: 600 15px/1 Inter, system-ui, sans-serif; letter-spacing: -.01em; overflow: hidden;
      transition: width .5s cubic-bezier(.65, 0, .35, 1), height .5s cubic-bezier(.65, 0, .35, 1), border-radius .5s cubic-bezier(.65, 0, .35, 1), background-color .3s ease, transform .15s ease;
    }
    .btn:hover { background: #262626; }
    .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .lbl { display: inline-flex; align-items: center; gap: 8px; transition: opacity .2s ease; }
    .lbl svg { width: 18px; height: 18px; transition: transform .3s cubic-bezier(.34, 1.56, .64, 1); }
    .btn:hover .lbl svg { transform: translateY(2px); }
    .fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: #2563eb; border-radius: inherit; }
    .chk { position: absolute; inset: 0; margin: auto; width: 24px; height: 24px; opacity: 0; fill: none; stroke: #fff; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .chk path { stroke-dasharray: 24; stroke-dashoffset: 24; }
    .btn.loading { width: 220px; height: 8px; border-radius: 4px; background: #e5e7eb; cursor: progress; }
    .btn.loading .lbl, .btn.done .lbl { opacity: 0; }
    .btn.loading .fill { width: 100%; transition: width 1.6s .45s cubic-bezier(.45, .05, .25, 1); }
    .btn.done { width: 48px; height: 48px; border-radius: 24px; background: #16a34a; }
    .btn.done .fill { width: 0; transition: none; }
    .btn.done .chk { opacity: 1; }
    .btn.done .chk path { stroke-dashoffset: 0; transition: stroke-dashoffset .4s .4s cubic-bezier(.65, 0, .35, 1); }
  `,
  html: `
    <div class="wrap">
      <button class="btn" type="button" aria-label="Download">
        <span class="fill"></span>
        <span class="lbl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>Download</span>
        <svg class="chk" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    b.addEventListener('click', () => {
      if (b.classList.contains('loading') || b.classList.contains('done')) return;
      b.classList.add('loading'); b.setAttribute('aria-label', 'Downloading');
      later(() => { b.classList.remove('loading'); b.classList.add('done'); b.setAttribute('aria-label', 'Downloaded'); }, 2200);
      later(() => { b.classList.remove('done'); b.setAttribute('aria-label', 'Download'); }, 4400);
    });
    return () => timers.forEach(clearTimeout);
  },
};
