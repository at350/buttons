export default {
  id: 'mb-clerk-avatar',
  credit: 'Clerk <UserButton /> — avatar trigger with a spinning gradient ring on hover that opens the account popover card',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 250px; max-width: 100%; height: 190px; border-radius: 12px; background: #fff; border: 1px solid #e5e7eb; overflow: hidden;
      font: 500 13px/1 Inter, -apple-system, system-ui, sans-serif; }
    .av { position: absolute; right: 14px; top: 12px; width: 32px; height: 32px; border-radius: 50%; border: 0; padding: 0; background: transparent; cursor: pointer; isolation: isolate; -webkit-tap-highlight-color: transparent;
      transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .av:hover { transform: scale(1.06); }
    .av:active { transform: scale(.95); }
    .av:focus-visible { outline: 2px solid #6c47ff; outline-offset: 2px; }
    .ring { position: absolute; inset: -2px; border-radius: 50%; background: conic-gradient(#6c47ff, #ff6b9d, #ffb347, #6c47ff); opacity: 0; transition: opacity .25s; animation: spin 1.6s linear infinite paused; z-index: -1; }
    .av:hover .ring, .av[aria-expanded="true"] .ring { opacity: 1; animation-play-state: running; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .face { display: block; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #6c47ff, #c084fc); box-shadow: inset 0 0 0 2px #fff; color: #fff; font: 600 12px/32px Inter, system-ui, sans-serif; text-align: center; }
    .pop { position: absolute; right: 14px; top: 52px; width: 220px; border-radius: 12px; background: #fff; border: 1px solid #e5e7eb; box-shadow: 0 12px 40px rgba(0,0,0,.12), 0 2px 6px rgba(0,0,0,.06);
      transform-origin: top right; transform: scale(.92) translateY(-6px); opacity: 0; pointer-events: none; transition: transform .25s cubic-bezier(.2,.8,.2,1), opacity .2s; }
    .pop.on { transform: none; opacity: 1; pointer-events: auto; }
    .hd { display: flex; align-items: center; gap: 10px; padding: 14px; border-bottom: 1px solid #f3f4f6; }
    .hd .face { width: 36px; height: 36px; line-height: 36px; }
    .hd b { display: block; color: #111827; font-weight: 600; margin-bottom: 3px; }
    .hd span { color: #6b7280; font-size: 12px; font-weight: 400; }
    .mi { display: flex; align-items: center; gap: 12px; width: 100%; height: 40px; padding: 0 14px; border: 0; background: transparent; color: #374151; font: inherit; cursor: pointer; text-align: left; transition: background .12s; }
    .mi:hover { background: #f9fafb; color: #111827; }
    .mi:focus-visible { outline: none; background: #f3f4f6; }
    .mi svg { width: 16px; height: 16px; stroke: #9ca3af; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .ft { padding: 8px 14px 10px; border-top: 1px solid #f3f4f6; color: #9ca3af; font-size: 11px; display: flex; align-items: center; gap: 5px; }
    .ft i { display: inline-block; width: 12px; height: 12px; border-radius: 3px; background: #6c47ff; }
  `,
  html: `
    <div class="stage">
      <button class="av" type="button" aria-expanded="false" aria-haspopup="true" aria-label="Open user menu"><span class="ring"></span><span class="face">AT</span></button>
      <div class="pop" role="menu">
        <div class="hd"><span class="face">AT</span><div><b>Alan T.</b><span>alan@acme.dev</span></div></div>
        <button class="mi" type="button" role="menuitem"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>Manage account</button>
        <button class="mi" type="button" role="menuitem"><svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>Sign out</button>
        <div class="ft"><i></i>Secured by Clerk</div>
      </div>
    </div>`,
  init(root) {
    const av = root.querySelector('.av'), pop = root.querySelector('.pop');
    const set = (on) => { av.setAttribute('aria-expanded', String(on)); pop.classList.toggle('on', on); };
    av.addEventListener('click', () => set(av.getAttribute('aria-expanded') !== 'true'));
    root.querySelectorAll('.mi').forEach((m) => m.addEventListener('click', () => set(false)));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); av.focus(); } });
  },
};
