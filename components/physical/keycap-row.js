// Inverted-T arrow cluster: four 1u Cherry-profile PBT modifier caps on a 19.05 mm grid (54 px caps,
// 57 px pitch), Lucide arrow legends, each key on its own switch with 4 mm travel.
const ICON = {
  up: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  left: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  down: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
};
const KEY = (k, x, y) => `<div class="slot" style="left:${x}px;top:${y}px"><button class="key" type="button" aria-label="${k} arrow"><span class="top"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg></span></button></div>`;

export default {
  id: 'ph-keycap-row',
  credit: 'Inverted-T arrow cluster — Cherry-profile grey PBT modifiers on a 19.05 mm grid, each key presses independently',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px 20px; border-radius: 12px;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px), linear-gradient(#3b3e44, #26282d); }
    .plate { position: relative; width: 174px; height: 120px; border-radius: 4px; background: #0e0f11; box-shadow: inset 0 2px 4px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.08); }
    .slot { position: absolute; width: 54px; height: 60px; }
    .slot::before { content: ''; position: absolute; left: 13px; right: 13px; top: 14px; height: 30px; border-radius: 2px; background: #1b1c1f; }
    .key {
      position: absolute; left: 0; top: 0; width: 54px; height: 54px; border: 0; padding: 0; border-radius: 5px; cursor: pointer;
      background:
        linear-gradient(180deg, transparent 72%, rgba(255,255,255,.14) 80%, rgba(0,0,0,.08) 100%),
        linear-gradient(90deg, #6c6961 0%, #8b877d 13%, #949086 50%, #88847a 87%, #66635b 100%);
      box-shadow: 0 1px 0 rgba(0,0,0,.5), 0 4px 0 -1px rgba(0,0,0,.55), 0 7px 7px rgba(0,0,0,.45);
      transition: transform .14s cubic-bezier(.3,1.7,.5,1), box-shadow .14s cubic-bezier(.3,1.7,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .key::after { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: .5; background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.1) 0 .5px, transparent .8px) 0 0 / 2px 2px; }
    .top {
      position: absolute; left: 7px; right: 7px; top: 3px; bottom: 12px; border-radius: 5px 5px 4px 4px;
      display: flex; align-items: center; justify-content: center; color: #ece8de;
      background:
        linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,0) 30%, rgba(0,0,0,0) 75%, rgba(0,0,0,.08)),
        linear-gradient(90deg, #9c988e 0%, #aaa69b 22%, #b0aca1 50%, #a9a59a 78%, #99958b 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 1px rgba(0,0,0,.08), 0 0 0 .5px rgba(0,0,0,.15);
    }
    .top svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .key:hover .top { filter: brightness(1.05); }
    .key:active, .key.down { transform: translateY(5px); box-shadow: 0 1px 0 rgba(0,0,0,.5), 0 0 0 -1px rgba(0,0,0,.55), 0 2px 2px rgba(0,0,0,.45); transition-duration: .035s; transition-timing-function: ease-in; }
    .key:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="plate">${KEY('up', 60, 3)}${KEY('left', 3, 60)}${KEY('down', 60, 60)}${KEY('right', 117, 60)}</div>
    </div>`,
  init(root) {
    const keys = [...root.querySelectorAll('.key')];
    const map = { ArrowUp: 0, ArrowLeft: 1, ArrowDown: 2, ArrowRight: 3 };
    keys.forEach((k) => {
      k.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') k.classList.add('down');
        else if (e.key in map) { e.preventDefault(); const t = keys[map[e.key]]; t.focus(); t.classList.add('down'); }
      });
      k.addEventListener('keyup', () => keys.forEach((x) => x.classList.remove('down')));
      k.addEventListener('blur', () => k.classList.remove('down'));
    });
  },
};
