export default {
  id: 'mb-clerk-avatar',
  credit: 'Clerk <UserButton showName /> — the avatar trigger opens the UserButton popover card: user preview, "Manage account", "Sign out" and the "Secured by Clerk" footer',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; max-width: 100%; height: 60px; padding: 0 12px; border-radius: 12px; background: #fff; border: 1px solid #e5e7eb;
      display: flex; align-items: center; justify-content: space-between; font: 500 13px/1.3 Inter, -apple-system, system-ui, sans-serif; color: #212126; }
    .brand { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; letter-spacing: -.01em; }
    .brand i { width: 22px; height: 22px; border-radius: 6px; background: #131316; }
    .wrap { position: relative; }
    .av { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 4px 0 10px; border-radius: 8px; border: 0; background: transparent; cursor: pointer; font: inherit; color: inherit;
      -webkit-tap-highlight-color: transparent; transition: background .15s; }
    .av:hover, .av[aria-expanded="true"] { background: rgba(0,0,0,.04); }
    .av:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(108,71,255,.25); }
    .face { width: 28px; height: 28px; border-radius: 50%; flex: none; display: grid; place-items: center; color: #fff; font: 600 11px/1 Inter, system-ui, sans-serif;
      background: linear-gradient(135deg, #6c47ff 0%, #a782ff 60%, #ffb4d1 100%); }
    .pop { position: absolute; right: 0; top: calc(100% + 8px); width: 268px; border-radius: 12px; background: #fff; overflow: hidden; z-index: 2;
      box-shadow: 0 0 0 1px rgba(0,0,0,.07), 0 2px 3px -1px rgba(0,0,0,.08), 0 16px 36px -6px rgba(0,0,0,.18);
      transform-origin: top right; transform: scale(.96) translateY(-4px); opacity: 0; visibility: hidden; transition: transform .16s cubic-bezier(.2,.8,.2,1), opacity .14s, visibility 0s .16s; }
    .pop.on { transform: none; opacity: 1; visibility: visible; transition: transform .2s cubic-bezier(.2,.8,.2,1), opacity .16s, visibility 0s; }
    .hd { display: flex; align-items: center; gap: 12px; padding: 16px 16px 12px; }
    .hd .face { width: 40px; height: 40px; font-size: 14px; }
    .hd b { display: block; font-weight: 600; font-size: 13px; color: #212126; }
    .hd span span { color: #747686; font-size: 13px; font-weight: 400; }
    .mi { display: flex; align-items: center; gap: 16px; width: 100%; height: 44px; padding: 0 20px 0 26px; border: 0; border-top: 1px solid #eeeef0; background: transparent; color: #5e5f6e;
      font: inherit; cursor: pointer; text-align: left; transition: background .12s, color .12s; }
    .mi:hover { background: #f7f7f8; color: #212126; }
    .mi:focus-visible { outline: none; background: #f2f2f4; color: #212126; }
    .mi svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .ft { display: flex; align-items: center; justify-content: center; gap: 5px; height: 40px; background: #f7f7f8; border-top: 1px solid #eeeef0; color: #747686; font-size: 12px; }
    .ft svg { width: 13px; height: 13px; fill: #747686; }
    .ft b { color: #747686; font-weight: 700; letter-spacing: -.02em; }
  `,
  html: `
    <div class="stage">
      <span class="brand"><i></i>Acme</span>
      <div class="wrap">
        <button class="av" type="button" aria-expanded="false" aria-haspopup="menu" aria-label="Open user button">Alan Tai<span class="face">AT</span></button>
        <div class="pop" role="menu" aria-label="Account">
          <div class="hd"><span class="face">AT</span><span><b>Alan Tai</b><span>alan@acme.dev</span></span></div>
          <button class="mi" type="button" role="menuitem"><svg viewBox="0 0 24 24"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>Manage account</button>
          <button class="mi" type="button" role="menuitem"><svg viewBox="0 0 24 24"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>Sign out</button>
          <div class="ft">Secured by <svg viewBox="0 0 24 24"><path d="m21.47 20.829-2.881-2.881a.572.572 0 0 0-.7-.084 6.854 6.854 0 0 1-7.081 0 .576.576 0 0 0-.7.084l-2.881 2.881a.576.576 0 0 0-.103.69.57.57 0 0 0 .166.186 12 12 0 0 0 14.113 0 .58.58 0 0 0 .239-.423.576.576 0 0 0-.172-.453Zm.002-17.668-2.88 2.88a.569.569 0 0 1-.701.084A6.857 6.857 0 0 0 8.724 8.08a6.862 6.862 0 0 0-1.222 3.692 6.86 6.86 0 0 0 .978 3.764.573.573 0 0 1-.083.699l-2.881 2.88a.567.567 0 0 1-.864-.063A11.993 11.993 0 0 1 6.771 2.7a11.99 11.99 0 0 1 14.637-.405.566.566 0 0 1 .232.418.57.57 0 0 1-.168.448Zm-7.118 12.261a3.427 3.427 0 1 0 0-6.854 3.427 3.427 0 0 0 0 6.854Z"/></svg><b>clerk</b></div>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const av = root.querySelector('.av'), pop = root.querySelector('.pop');
    const set = (on) => { av.setAttribute('aria-expanded', String(on)); pop.classList.toggle('on', on); host.toggleAttribute('data-open', on); };
    av.addEventListener('click', () => set(av.getAttribute('aria-expanded') !== 'true'));
    root.querySelectorAll('.mi').forEach((m) => m.addEventListener('click', () => { set(false); av.focus(); }));
    const outside = (e) => { if (av.getAttribute('aria-expanded') === 'true' && !e.composedPath().includes(host)) set(false); };
    const esc = (e) => { if (e.key === 'Escape' && av.getAttribute('aria-expanded') === 'true') { set(false); av.focus(); } };
    document.addEventListener('pointerdown', outside);
    root.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', outside); host.removeAttribute('data-open'); };
  },
};
