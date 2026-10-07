export default {
  id: 'mo-clip-theme',
  credit: 'View Transitions theme toggle (the circular reveal popularised by Paco Coursey / Rauno Freiberg) — the new theme grows as a clip-path circle from the exact click point; Lucide sun/moon swap',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 170px; max-width: 100%; border-radius: 12px; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
    .layer { position: absolute; inset: 0; padding: 18px; display: flex; flex-direction: column; gap: 10px; }
    .light { background: #fafaf8; color: #111; z-index: 0; }
    .dark { z-index: 1; background: #0f0f10; color: #f5f5f5; clip-path: circle(0px at var(--cx, 90%) var(--cy, 15%)); transition: clip-path .6s cubic-bezier(.65, 0, .35, 1); }
    .stage.dark-on .dark { clip-path: circle(150% at var(--cx, 90%) var(--cy, 15%)); }
    .layer b { font-size: 16px; font-weight: 600; letter-spacing: -.02em; }
    .ev { display: flex; align-items: center; gap: 8px; font-size: 13px; line-height: 16px; white-space: nowrap; }
    .ev::before { content: ""; width: 3px; height: 16px; border-radius: 2px; background: var(--c); flex: none; }
    .ev small { margin-left: auto; padding-right: 50px; font-size: 12px; opacity: .55; font-variant-numeric: tabular-nums; }
    .layer b + .ev { margin-top: 2px; }
    .layer .chip { margin-top: auto; align-self: flex-start; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: currentColor; }
    .light .chip { color: #fff; background: #111; } .dark .chip { color: #111; background: #f5f5f5; }
    .tog { position: absolute; top: 14px; right: 14px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(127,127,127,.3); background: transparent; color: inherit; cursor: pointer; display: grid; place-items: center; z-index: 2; transition: transform .3s cubic-bezier(.23, 1, .32, 1), background .2s; }
    .tog:hover { background: rgba(127,127,127,.14); } .tog:active { transform: scale(.92); }
    .tog:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
    .tog svg { position: absolute; width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .5s cubic-bezier(.23, 1, .32, 1), opacity .3s; }
    .tog .moon { opacity: 0; transform: rotate(-90deg) scale(.5); }
    .stage.dark-on .tog .sun { opacity: 0; transform: rotate(90deg) scale(.5); }
    .stage.dark-on .tog .moon { opacity: 1; transform: none; }
    .light .tog { color: #111; } .dark .tog { color: #f5f5f5; }
  `,
  html: `
    <div class="stage">
      <div class="layer light"><b>Good morning</b><span class="ev" style="--c:#3b82f6">Standup<small>9:30 AM</small></span><span class="ev" style="--c:#f59e0b">Design review<small>2:00 PM</small></span><span class="chip">Light</span><button class="tog" type="button" aria-pressed="false" aria-label="Toggle theme"><svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg><svg class="moon" viewBox="0 0 24 24"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg></button></div>
      <div class="layer dark" aria-hidden="true"><b>Good evening</b><span class="ev" style="--c:#a78bfa">Dinner with Sam<small>7:30 PM</small></span><span class="ev" style="--c:#34d399">Wind down<small>10:00 PM</small></span><span class="chip">Dark</span><button class="tog" type="button" tabindex="-1" aria-hidden="true"><svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg><svg class="moon" viewBox="0 0 24 24"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg></button></div>
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
