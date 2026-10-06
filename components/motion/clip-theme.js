export default {
  id: 'mo-clip-theme',
  credit: 'View-transition-style theme toggle — the dark theme is a layered copy revealed by a clip-path circle growing from the click point',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 170px; max-width: 100%; border-radius: 12px; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
    .layer { position: absolute; inset: 0; padding: 18px; display: flex; flex-direction: column; gap: 10px; }
    .light { background: #fafaf8; color: #111; }
    .dark { background: #0f0f10; color: #f5f5f5; clip-path: circle(0px at var(--cx, 90%) var(--cy, 15%)); transition: clip-path .7s cubic-bezier(.4, 0, .2, 1); }
    .stage.dark-on .dark { clip-path: circle(150% at var(--cx, 90%) var(--cy, 15%)); }
    .layer b { font-size: 16px; font-weight: 600; letter-spacing: -.02em; }
    .layer i { display: block; height: 8px; width: 70%; border-radius: 4px; background: currentColor; opacity: .12; }
    .layer i + i { width: 50%; }
    .layer .chip { margin-top: auto; align-self: flex-start; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: currentColor; }
    .light .chip { color: #fff; background: #111; } .dark .chip { color: #111; background: #f5f5f5; }
    .tog { position: absolute; top: 14px; right: 14px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(127,127,127,.3); background: transparent; color: inherit; cursor: pointer; display: grid; place-items: center; z-index: 2; transition: transform .4s cubic-bezier(.34, 1.56, .64, 1), background .2s; }
    .tog:hover { transform: scale(1.1); background: rgba(127,127,127,.12); } .tog:active { transform: scale(.9); }
    .tog:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
    .tog svg { position: absolute; width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .6s cubic-bezier(.34, 1.56, .64, 1), opacity .3s; }
    .tog .moon { opacity: 0; transform: rotate(-90deg) scale(.5); }
    .stage.dark-on .tog .sun { opacity: 0; transform: rotate(90deg) scale(.5); }
    .stage.dark-on .tog .moon { opacity: 1; transform: none; }
    .light .tog { color: #111; } .dark .tog { color: #f5f5f5; }
  `,
  html: `
    <div class="stage">
      <div class="layer light"><b>Good morning</b><i></i><i></i><span class="chip">Light</span><button class="tog" type="button" aria-pressed="false" aria-label="Toggle theme"><svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button></div>
      <div class="layer dark" aria-hidden="true"><b>Good evening</b><i></i><i></i><span class="chip">Dark</span><button class="tog" type="button" tabindex="-1" aria-hidden="true"><svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), dark = root.querySelector('.dark');
    const toggle = (e) => {
      const r = stage.getBoundingClientRect();
      if (e && e.clientX) { dark.style.setProperty('--cx', (e.clientX - r.left) + 'px'); dark.style.setProperty('--cy', (e.clientY - r.top) + 'px'); }
      const on = !stage.classList.contains('dark-on');
      stage.classList.toggle('dark-on', on);
      root.querySelectorAll('.tog').forEach((b) => b.setAttribute('aria-pressed', String(on)));
    };
    root.querySelectorAll('.tog').forEach((b) => b.addEventListener('click', toggle));
  },
};
