export default {
  id: 'mb-tiktok-plus',
  credit: 'TikTok — the bottom-bar create "+" with its cyan and red offset slabs that shear on press, and the avatar follow "+" that bounces into a check',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 28px; border-radius: 12px; background: #000; display: flex; align-items: center; gap: 36px; }
    .cr { position: relative; width: 48px; height: 32px; border: 0; padding: 0; background: transparent; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .cr:focus-visible { outline: 2px solid #fff; outline-offset: 4px; border-radius: 8px; }
    .cr i { position: absolute; top: 0; bottom: 0; width: 40px; border-radius: 8px; transition: transform .35s linear(0, 0.4 10%, 1.15 35%, 0.95 60%, 1.02 80%, 1); }
    .cr .c { left: 0; background: #25f4ee; } .cr .r { right: 0; background: #fe2c55; } .cr .w { left: 4px; background: #fff; display: grid; place-items: center; }
    .cr .w svg { width: 20px; height: 20px; fill: none; stroke: #000; stroke-width: 2.6; stroke-linecap: round; transition: transform .35s cubic-bezier(.2,.8,.2,1); }
    .cr:hover .c { transform: translateX(-3px); } .cr:hover .r { transform: translateX(3px); }
    .cr:active .w { transform: scale(.92); } .cr:active .c { transform: translateX(-6px) scaleY(.92); } .cr:active .r { transform: translateX(6px) scaleY(.92); }
    .cr[aria-pressed="true"] .w svg { transform: rotate(45deg); }
    .cr[aria-pressed="true"] .c { transform: translateX(-5px) rotate(-6deg); } .cr[aria-pressed="true"] .r { transform: translateX(5px) rotate(6deg); }
    .av { position: relative; width: 48px; height: 48px; border: 0; padding: 0; background: transparent; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .av:focus-visible { outline: 2px solid #fff; outline-offset: 4px; border-radius: 50%; }
    .face { display: block; width: 48px; height: 48px; border-radius: 50%; background: #2f2f2f url(assets/portraits/women-37.jpg) center / cover no-repeat; box-shadow: 0 0 0 2px #fff; }
    .pl { position: absolute; left: 50%; bottom: -10px; width: 22px; height: 22px; margin-left: -11px; border-radius: 50%; background: #fe2c55; display: grid; place-items: center;
      transition: transform .4s linear(0, 0.4 10%, 1.25 35%, 0.9 55%, 1.05 75%, 1), background .25s, opacity .3s .5s; }
    .pl svg { width: 12px; height: 12px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .pl .chk { display: none; }
    .av:hover .pl { transform: scale(1.12); }
    .av[aria-pressed="true"] .pl { background: #fff; transform: scale(1.15); }
    .av[aria-pressed="true"] .pl .plus { display: none; } .av[aria-pressed="true"] .pl .chk { display: block; stroke: #fe2c55; animation: pop .4s linear(0, 0.5 15%, 1.3 40%, 0.95 65%, 1); }
    @keyframes pop { from { transform: scale(0); } }
  `,
  html: `
    <div class="stage">
      <button class="av" type="button" aria-pressed="false" aria-label="Follow"><span class="face"></span><span class="pl"><svg class="plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><svg class="chk" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span></button>
      <button class="cr" type="button" aria-pressed="false" aria-label="Create"><i class="c"></i><i class="r"></i><i class="w"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></i></button>
    </div>`,
  init(root) {
    root.querySelectorAll('[aria-pressed]').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
  },
};
