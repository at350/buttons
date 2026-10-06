export default {
  id: 'dp-app-icon-jiggle',
  credit: 'iOS home screen — Messages icon lifts under the pointer; long-press (or Enter) enters jiggle mode with the ±2° wobble and the grey “−” remove badge; tap the wallpaper to finish',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 26px 40px 22px; border-radius: 12px; perspective: 600px;
      background: radial-gradient(90% 70% at 20% 10%, #3b6fd8, transparent 70%), radial-gradient(80% 80% at 90% 100%, #7b3fb8, transparent 70%), #1b2350;
    }
    .wrap { position: relative; width: 64px; display: flex; flex-direction: column; align-items: center; }
    .jig { position: relative; width: 64px; height: 64px; transform-origin: 50% 55%; }
    .wrap.jiggle .jig { animation: jiggle .25s ease-in-out infinite; }
    @keyframes jiggle {
      0% { transform: rotate(-2deg) translateY(0); }
      25% { transform: rotate(0deg) translateY(-.5px); }
      50% { transform: rotate(2deg) translateY(0); }
      75% { transform: rotate(0deg) translateY(.5px); }
      100% { transform: rotate(-2deg) translateY(0); }
    }
    .icon {
      position: relative; display: grid; place-items: center; width: 64px; height: 64px; border: 0; padding: 0; cursor: pointer;
      border-radius: 14.3px; background: linear-gradient(180deg, #5bf675, #0cbd2a); color: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, .18), 0 4px 10px rgba(0, 0, 0, .18);
      transform: translateZ(0) scale(1); transition: transform .35s cubic-bezier(.32, .72, 0, 1), box-shadow .35s;
      -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; -webkit-tap-highlight-color: transparent;
    }
    .icon::after { content: ''; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 0 .5px rgba(0, 0, 0, .12); pointer-events: none; }
    .icon:hover { transform: translateZ(18px) scale(1.05); box-shadow: 0 2px 4px rgba(0, 0, 0, .2), 0 14px 24px rgba(0, 0, 0, .35); }
    .icon:active { transform: translateZ(0) scale(.9); filter: brightness(.82); transition-duration: .12s; }
    .wrap.jiggle .icon:hover { transform: translateZ(0) scale(1); box-shadow: 0 1px 2px rgba(0, 0, 0, .18), 0 4px 10px rgba(0, 0, 0, .18); }
    .icon svg { width: 40px; height: 40px; transform: scale(1.1, 1); }
    .rm {
      position: absolute; left: -7px; top: -7px; width: 22px; height: 22px; border-radius: 50%; border: 0; cursor: pointer; padding: 0; z-index: 1;
      background: rgba(228, 228, 232, .92); color: #000; display: grid; place-items: center;
      -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
      transform: scale(0); opacity: 0; pointer-events: none; transition: transform .3s cubic-bezier(.32, .72, 0, 1), opacity .2s;
    }
    .wrap.jiggle .rm { transform: scale(1); opacity: 1; pointer-events: auto; }
    .rm svg { width: 11px; height: 11px; }
    .rm:active { background: rgba(200, 200, 205, .95); }
    .icon:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .rm:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .lbl { display: block; margin-top: 6px; text-align: center; color: #fff; font: 500 12px/1.2 system-ui, -apple-system, sans-serif; letter-spacing: -.01em; white-space: nowrap; text-shadow: 0 1px 2px rgba(0, 0, 0, .35); }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <div class="jig">
          <button class="icon" type="button" aria-label="Messages"><svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"/></svg></button>
          <button class="rm" type="button" aria-label="Remove Messages" tabindex="-1"><svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"/></svg></button>
        </div>
        <span class="lbl">Messages</span>
      </div>
    </div>`,
  init(root) {
    const wrap = root.querySelector('.wrap'), icon = root.querySelector('.icon'), rm = root.querySelector('.rm');
    let t = 0, held = false;
    const enter = () => { wrap.classList.add('jiggle'); rm.tabIndex = 0; };
    const exit = () => { wrap.classList.remove('jiggle'); rm.tabIndex = -1; };
    icon.addEventListener('pointerdown', () => { held = false; clearTimeout(t); t = setTimeout(() => { held = true; enter(); }, 500); });
    const cancel = () => clearTimeout(t);
    icon.addEventListener('pointerup', cancel); icon.addEventListener('pointerleave', cancel); icon.addEventListener('pointercancel', cancel);
    icon.addEventListener('click', (e) => {
      if (held) { held = false; return; }
    });
    // like iOS: tapping the wallpaper (anywhere but the icon) ends jiggle mode
    const stage = root.querySelector('.stage');
    stage.addEventListener('click', (e) => { if (!e.target.closest('.icon, .rm')) exit(); });
    icon.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); wrap.classList.contains('jiggle') ? exit() : enter(); } });
    icon.addEventListener('contextmenu', (e) => e.preventDefault());
    rm.addEventListener('click', () => { exit(); icon.focus(); });
    const onKey = (e) => { if (e.key === 'Escape') exit(); };
    wrap.addEventListener('keydown', onKey);
    return () => clearTimeout(t);
  },
};
