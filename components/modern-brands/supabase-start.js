export default {
  id: 'mb-supabase-start',
  credit: 'Supabase.com (dark) — brand-green "Start your project" and the raised "Request a demo"; 200ms cubic-bezier(0.22,1,0.36,1), press scale .97; starting shows the spinner then "Project ready"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 24px; border-radius: 12px; background: #121212; display: flex; gap: 10px; align-items: center;
      font: 500 14px/1 Inter, "Circular", -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .logo { width: 22px; height: 22px; margin-right: 6px; flex: none; }
    .sb { height: 38px; padding: 0 16px; border-radius: 7px; border: 0; cursor: pointer; font: inherit; white-space: nowrap; display: grid; place-items: center;
      transition: background-color .2s cubic-bezier(.22,1,.36,1), color .2s cubic-bezier(.22,1,.36,1), scale .2s cubic-bezier(.22,1,.36,1); -webkit-tap-highlight-color: transparent; }
    .sb:active { scale: .97; }
    .sb:focus-visible { outline: none; box-shadow: 0 0 0 2px #121212, 0 0 0 4px #3ecf8e; }
    .pri { background: #006239 linear-gradient(to bottom, rgba(255,255,255,.015), rgba(0,0,0,.01)); color: #f2fbf6;
      box-shadow: 0 1px 3px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.06), inset 0 0 0 1px rgba(62,207,142,.35); }
    .pri:hover { background-color: #0a7446; }
    .pri > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 8px; transition: opacity .15s; }
    .pri .b, .pri .c { opacity: 0; }
    .pri.busy .a, .pri.done .a { opacity: 0; } .pri.busy .b, .pri.done .c { opacity: 1; }
    .pri svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .pri .sp { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .sec { background: #242424 linear-gradient(to bottom, rgba(255,255,255,.015), rgba(0,0,0,.01)); color: #ededed;
      box-shadow: 0 1px 3px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.04), inset 0 0 0 1px #363636; }
    .sec:hover { background-color: #2e2e2e; }
  `,
  html: `
    <div class="stage">
      <svg class="logo" viewBox="0 0 24 24" role="img" aria-label="Supabase"><defs><linearGradient id="sbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3ecf8e"/><stop offset="1" stop-color="#249361"/></linearGradient></defs><path fill="url(#sbg)" d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"/></svg>
      <button class="sb pri" type="button" aria-live="polite"><span class="a">Start your project</span><span class="b"><svg class="sp" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Creating…</span><span class="c"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Project ready</span></button>
      <button class="sb sec" type="button">Request a demo</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.pri');
    let t;
    b.addEventListener('click', () => {
      if (b.classList.contains('busy')) return;
      if (b.classList.contains('done')) { b.classList.remove('done'); return; }
      b.classList.add('busy'); t = setTimeout(() => { b.classList.remove('busy'); b.classList.add('done'); }, 1400);
    });
    return () => clearTimeout(t);
  },
};
