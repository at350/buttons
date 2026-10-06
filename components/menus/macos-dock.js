export default {
  id: 'mn-macos-dock',
  credit: 'macOS Dock with cursor-proximity magnification and bounce on launch',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { position: relative; height: 170px; border-radius: 12px; overflow: hidden; background: linear-gradient(160deg, #ff9a6a 0%, #d94c8a 35%, #4a2e8a 70%, #1a2a6c 100%); display: flex; align-items: flex-end; justify-content: center; padding-bottom: 10px; }
    .dock { display: flex; align-items: flex-end; gap: 6px; height: 64px; padding: 0 8px; border-radius: 18px; background: rgba(255,255,255,.22); backdrop-filter: blur(20px) saturate(1.6); -webkit-backdrop-filter: blur(20px) saturate(1.6); border: 1px solid rgba(255,255,255,.3); box-shadow: 0 8px 30px rgba(0,0,0,.25); }
    .app { position: relative; width: 48px; height: 48px; margin-bottom: 8px; border: 0; padding: 0; background: none; cursor: pointer; transform-origin: bottom center; transition: transform .08s linear, width .08s linear, height .08s linear; flex: none; }
    .app::after { content: ""; position: absolute; left: 50%; bottom: -7px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: rgba(0,0,0,.5); opacity: 0; }
    .app.run::after { opacity: 1; }
    .app.bounce { animation: bounce .55s cubic-bezier(.3,.6,.4,1) 2; }
    @keyframes bounce { 0%, 100% { translate: 0 0; } 45% { translate: 0 -26px; } }
    .ic { width: 100%; height: 100%; border-radius: 22%; display: block; box-shadow: 0 2px 5px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.4); }
    .app:focus-visible { outline: 2px solid #fff; outline-offset: 2px; border-radius: 22%; }
    .sep { width: 1px; height: 46px; margin: 0 4px 9px; background: rgba(0,0,0,.25); flex: none; }
    .dock:not(:hover) .app { transform: none !important; width: 48px !important; height: 48px !important; }
  `,
  html: `
    <div class="stage"><div class="dock" role="toolbar" aria-label="Dock">
      <button class="app run" type="button" aria-label="Finder"><span class="ic" style="background:linear-gradient(180deg,#5ac8fa,#1f8ef1)"></span></button>
      <button class="app" type="button" aria-label="Launchpad"><span class="ic" style="background:linear-gradient(180deg,#f5f5f7,#c9c9ce)"></span></button>
      <button class="app run" type="button" aria-label="Safari"><span class="ic" style="background:radial-gradient(circle at 50% 50%,#fff 0 22%,#1e90ff 23% 100%)"></span></button>
      <button class="app" type="button" aria-label="Messages"><span class="ic" style="background:linear-gradient(180deg,#5cf777,#2bc44a)"></span></button>
      <button class="app" type="button" aria-label="Mail"><span class="ic" style="background:linear-gradient(180deg,#5fb3ff,#1a6dff)"></span></button>
      <button class="app" type="button" aria-label="Photos"><span class="ic" style="background:conic-gradient(#ff5e57,#ffb142,#fff200,#32ff7e,#18dcff,#7d5fff,#ff5e57)"></span></button>
      <button class="app run" type="button" aria-label="Music"><span class="ic" style="background:linear-gradient(180deg,#ff6b81,#fc2d55)"></span></button>
      <button class="app" type="button" aria-label="Settings"><span class="ic" style="background:linear-gradient(180deg,#9a9aa0,#5e5e63)"></span></button>
      <span class="sep"></span>
      <button class="app" type="button" aria-label="Trash"><span class="ic" style="background:linear-gradient(180deg,#dfe4ea,#a4b0be);border-radius:16%"></span></button>
    </div></div>`,
  init(root) {
    const dock = root.querySelector('.dock');
    const apps = [...root.querySelectorAll('.app')];
    let raf = 0, mx = null;
    const paint = () => {
      raf = 0;
      if (mx === null) return;
      for (const a of apps) {
        const r = a.getBoundingClientRect();
        const d = Math.abs(mx - (r.left + r.width / 2));
        const s = 1 + 0.75 * Math.max(0, 1 - d / 110) ** 2;
        a.style.width = a.style.height = 48 * s + 'px';
      }
    };
    dock.addEventListener('pointermove', (e) => { mx = e.clientX; if (!raf) raf = requestAnimationFrame(paint); });
    dock.addEventListener('pointerleave', () => { mx = null; if (raf) cancelAnimationFrame(raf); raf = 0; apps.forEach((a) => { a.style.width = a.style.height = ''; }); });
    apps.forEach((a) => a.addEventListener('click', () => {
      if (a.classList.contains('run')) { a.classList.remove('run'); return; }
      a.classList.remove('bounce'); void a.offsetWidth; a.classList.add('bounce');
      a.addEventListener('animationend', () => { a.classList.remove('bounce'); a.classList.add('run'); }, { once: true });
    }));
    return () => { if (raf) cancelAnimationFrame(raf); };
  },
};
