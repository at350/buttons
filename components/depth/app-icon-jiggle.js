export default {
  id: 'dp-app-icon-jiggle',
  credit: 'iOS home-screen app icon — lifts toward you on hover, long-press enters jiggle mode with the remove badge',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 30px 44px 28px; perspective: 600px; border-radius: 12px; background: linear-gradient(160deg, #1e3a8a, #0f172a); }
    .wrap { position: relative; width: 64px; }
    .icon {
      position: relative; width: 64px; height: 64px; border: 0; padding: 0; cursor: pointer; border-radius: 15px;
      background: linear-gradient(160deg, #34d399, #059669); color: #fff; display: grid; place-items: center;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4), 0 8px 18px rgba(0, 0, 0, .4);
      transform: translateZ(0) scale(1); transition: transform .3s cubic-bezier(.3, 1.4, .4, 1), box-shadow .3s;
      -webkit-user-select: none; user-select: none; -webkit-touch-callout: none;
    }
    .icon:hover { transform: translateZ(26px) scale(1.06); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4), 0 22px 34px rgba(0, 0, 0, .55); }
    .icon:active { transform: translateZ(4px) scale(.94); transition-duration: .1s; }
    .icon svg { width: 34px; height: 34px; }
    .wrap.jiggle .icon { animation: jiggle .28s ease-in-out infinite alternate; transform: translateZ(14px) scale(1.04); }
    @keyframes jiggle { from { rotate: -3deg; } to { rotate: 3deg; } }
    .rm {
      position: absolute; left: -8px; top: -8px; width: 24px; height: 24px; border-radius: 50%; border: 0; cursor: pointer; padding: 0;
      background: #e5e5ea; color: #1c1c1e; display: grid; place-items: center; box-shadow: 0 2px 6px rgba(0, 0, 0, .4);
      transform: scale(0); transition: transform .25s cubic-bezier(.3, 1.6, .4, 1); z-index: 1;
    }
    .wrap.jiggle .rm { transform: scale(1); }
    .rm svg { width: 12px; height: 12px; }
    .rm:hover { background: #fff; }
    .icon:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .rm:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .lbl { display: block; margin-top: 8px; text-align: center; color: #fff; font: 500 11px/1 'Inter', system-ui, sans-serif; text-shadow: 0 1px 2px rgba(0, 0, 0, .5); }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <button class="icon" type="button" aria-label="Messages">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.5 3.4 6L4.5 21l4.3-2.2c1 .2 2.1.3 3.2.3 5.5 0 10-3.6 10-8S17.5 3 12 3z"/></svg>
        </button>
        <button class="rm" type="button" aria-label="Remove" tabindex="-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M5 12h14"/></svg></button>
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
    icon.addEventListener('click', () => { if (held) { held = false; return; } if (wrap.classList.contains('jiggle')) exit(); });
    icon.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); wrap.classList.contains('jiggle') ? exit() : enter(); } });
    icon.addEventListener('contextmenu', (e) => e.preventDefault());
    rm.addEventListener('click', exit);
    return () => clearTimeout(t);
  },
};
