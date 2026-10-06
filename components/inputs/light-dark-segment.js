// Vercel / Geist theme switcher (vercel.com footer): a 1px gray-alpha-400 pill holding three 32px round
// icon buttons — System, Light, Dark. The active one gets the background-100 fill + 1px ring.
// Geist tokens: light bg #fff, gray-alpha-400 rgba(0,0,0,.08), gray-900 #666, gray-1000 #171717;
// dark bg #0a0a0a, gray-alpha-400 rgba(255,255,255,.14), gray-900 #a1a1a1, gray-1000 #ededed. 150ms ease.
// Choosing Dark (or System on a dark OS) re-themes the control itself.
export default {
  id: 'in-light-dark-segment',
  credit: 'Vercel (Geist) theme switcher — System / Light / Dark icon pill from the vercel.com footer; the control re-themes itself',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .seg {
      --bg: #fff; --ring: rgba(0,0,0,.08); --fg: #666; --fg-hi: #171717; --act: #fff; --hov: rgba(0,0,0,.05);
      display: inline-flex; gap: 0; padding: 0; border-radius: 9999px; background: var(--bg); box-shadow: 0 0 0 1px var(--ring);
      transition: background-color .15s ease, box-shadow .15s ease;
    }
    .seg.dark { --bg: #0a0a0a; --ring: rgba(255,255,255,.14); --fg: #a1a1a1; --fg-hi: #ededed; --act: #1a1a1a; --hov: rgba(255,255,255,.06); }
    .o {
      width: 32px; height: 32px; border: 0; padding: 0; border-radius: 9999px; background: transparent; color: var(--fg); cursor: pointer;
      display: grid; place-items: center; transition: color .15s ease, background-color .15s ease, box-shadow .15s ease; -webkit-tap-highlight-color: transparent;
    }
    .o:hover { color: var(--fg-hi); }
    .o:focus-visible { outline: 0; box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px #0070f3; }
    .o[aria-checked="true"] { color: var(--fg-hi); background: var(--act); box-shadow: 0 0 0 1px var(--ring); }
    .o svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `<div class="seg" role="radiogroup" aria-label="Theme">
    <button class="o" type="button" role="radio" aria-checked="false" aria-label="System" data-v="system"><svg viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg></button>
    <button class="o" type="button" role="radio" aria-checked="true" aria-label="Light" data-v="light"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></button>
    <button class="o" type="button" role="radio" aria-checked="false" aria-label="Dark" data-v="dark"><svg viewBox="0 0 24 24"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg></button>
  </div>`,
  init(root) {
    const seg = root.querySelector('.seg'), opts = [...root.querySelectorAll('.o')];
    const mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    let v = 'light';
    const paint = () => {
      seg.classList.toggle('dark', v === 'dark' || (v === 'system' && !!(mq && mq.matches)));
      opts.forEach((o) => o.setAttribute('aria-checked', o.dataset.v === v));
    };
    opts.forEach((o) => o.addEventListener('click', () => { v = o.dataset.v; paint(); }));
    seg.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      const i = (opts.findIndex((o) => o.dataset.v === v) + d + opts.length) % opts.length;
      v = opts[i].dataset.v; paint(); opts[i].focus({ preventScroll: true });
    });
    const onMq = () => paint();
    if (mq && mq.addEventListener) mq.addEventListener('change', onMq);
    paint();
    return () => { if (mq && mq.removeEventListener) mq.removeEventListener('change', onMq); };
  },
};
