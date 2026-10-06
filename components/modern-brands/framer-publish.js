export default {
  id: 'mb-framer-publish',
  credit: 'Framer editor toolbar — Framer mark, Preview play button and the blue "Publish" button: it spins while publishing, then settles to a grey "Published" check',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 12px; border-radius: 12px; background: #111; display: flex; align-items: center; gap: 6px; font: 600 12px/1 Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .logo { width: 30px; height: 30px; display: grid; place-items: center; margin-right: 46px; }
    .logo svg { width: 14px; height: 14px; fill: #fff; }
    .ghost { width: 30px; height: 30px; border: 0; border-radius: 8px; background: transparent; color: #999; cursor: pointer; display: grid; place-items: center;
      transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; }
    .ghost:hover { background: #222; color: #fff; }
    .ghost[aria-pressed="true"] { background: #2b2b2b; color: #fff; }
    .ghost svg { width: 13px; height: 13px; fill: currentColor; stroke: currentColor; stroke-width: 1.5; stroke-linejoin: round; }
    .ghost:focus-visible, .pub:focus-visible { outline: 2px solid #0099ff; outline-offset: 2px; }
    .pub { width: 104px; height: 30px; padding: 0 12px; border: 0; border-radius: 8px; background: #0099ff; color: #fff; cursor: pointer; font: inherit;
      display: grid; place-items: center; transition: background .15s, transform .2s cubic-bezier(.2,.8,.2,1); -webkit-tap-highlight-color: transparent; }
    .pub > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; transition: opacity .15s; }
    .pub .b, .pub .c { opacity: 0; }
    .pub:hover { background: #0088e6; }
    .pub:active { transform: scale(.97); }
    .pub.busy .a, .pub.done .a { opacity: 0; } .pub.busy .b { opacity: 1; } .pub.done .c { opacity: 1; }
    .spin { width: 12px; height: 12px; border-radius: 50%; border: 1.6px solid rgba(255,255,255,.35); border-top-color: #fff; animation: rot .7s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .c svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .pub.done .c svg { animation: pop .4s cubic-bezier(.2,1.6,.4,1); }
    @keyframes pop { from { transform: scale(0); } }
    .pub.done { background: #2b2b2b; color: #fff; }
    .pub.done:hover { background: #333; }
  `,
  html: `
    <div class="stage">
      <span class="logo" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg></span>
      <button class="ghost" type="button" aria-pressed="false" aria-label="Preview"><svg viewBox="0 0 24 24"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg></button>
      <button class="pub" type="button" aria-live="polite"><span class="a">Publish</span><span class="b"><i class="spin"></i>Publishing</span><span class="c"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Published</span></button>
    </div>`,
  init(root) {
    const pub = root.querySelector('.pub'), prev = root.querySelector('.ghost');
    let t;
    pub.addEventListener('click', () => {
      if (pub.classList.contains('busy')) return;
      if (pub.classList.contains('done')) { pub.classList.remove('done'); return; }
      pub.classList.add('busy');
      t = setTimeout(() => { pub.classList.remove('busy'); pub.classList.add('done'); }, 1300);
    });
    prev.addEventListener('click', () => prev.setAttribute('aria-pressed', String(prev.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
