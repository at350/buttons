// One 1u Cherry-profile PBT keycap on an MX switch, seen slightly from the front:
// 18 mm skirt (54 px at 3 px/mm), sculpted side walls, cylindrical dish, dye-sub legend.
// Press travels 4 mm (bottom-out), the spring returns it with a little overshoot.
export default {
  id: 'ph-keycap',
  credit: 'Cherry-profile PBT keycap on an MX switch — 18 mm cap, cylindrical dish, 4 mm travel with spring return',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 20px 24px; border-radius: 12px;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px), linear-gradient(#3b3e44, #26282d); }
    .plate { padding: 3px; border-radius: 4px; background: #0e0f11; box-shadow: inset 0 2px 4px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.08); }
    .slot { position: relative; width: 54px; height: 60px; }
    .slot::before { content: ''; position: absolute; left: 13px; right: 13px; top: 14px; height: 30px; border-radius: 2px; background: #1b1c1f; } /* switch housing peeking */
    .key {
      position: absolute; left: 0; top: 0; width: 54px; height: 54px; border: 0; padding: 0; border-radius: 5px; cursor: pointer;
      background:
        linear-gradient(180deg, transparent 72%, rgba(255,255,255,.18) 80%, rgba(0,0,0,.06) 100%),
        linear-gradient(90deg, #9c978b 0%, #c4beb1 13%, #cfc9bc 50%, #c1bbae 87%, #938e82 100%);
      box-shadow: 0 1px 0 rgba(0,0,0,.5), 0 4px 0 -1px rgba(0,0,0,.55), 0 7px 7px rgba(0,0,0,.45);
      transition: transform .14s cubic-bezier(.3,1.7,.5,1), box-shadow .14s cubic-bezier(.3,1.7,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .key::after { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: .5;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.08) 0 .5px, transparent .8px) 0 0 / 2px 2px; } /* PBT grain */
    .top {
      position: absolute; left: 7px; right: 7px; top: 3px; bottom: 12px; border-radius: 5px 5px 4px 4px;
      background:
        linear-gradient(180deg, rgba(255,255,255,.35), rgba(255,255,255,0) 30%, rgba(0,0,0,0) 75%, rgba(0,0,0,.06)),
        linear-gradient(90deg, #d9d3c6 0%, #e6e1d5 22%, #ece7db 50%, #e5e0d4 78%, #d6d0c3 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.65), inset 0 -1px 1px rgba(0,0,0,.06), 0 0 0 .5px rgba(0,0,0,.1);
      font: 500 15px/1 Inter, "Helvetica Neue", Arial, sans-serif; color: #3a3833;
      display: flex; align-items: flex-start; justify-content: flex-start; padding: 6px 0 0 7px;
    }
    .key:hover .top { background: linear-gradient(180deg, rgba(255,255,255,.42), rgba(255,255,255,0) 30%, rgba(0,0,0,0) 75%, rgba(0,0,0,.05)), linear-gradient(90deg, #ddd7ca 0%, #e9e4d8 22%, #efeade 50%, #e8e3d7 78%, #dad4c7 100%); }
    .key:active, .key.down { transform: translateY(5px); box-shadow: 0 1px 0 rgba(0,0,0,.5), 0 0 0 -1px rgba(0,0,0,.55), 0 2px 2px rgba(0,0,0,.45); transition-duration: .035s; transition-timing-function: ease-in; }
    .key:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="plate"><div class="slot"><button class="key" type="button" aria-label="A"><span class="top">A</span></button></div></div>
    </div>`,
  init(root) {
    const k = root.querySelector('.key');
    k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
    k.addEventListener('keyup', () => k.classList.remove('down'));
    k.addEventListener('blur', () => k.classList.remove('down'));
  },
};
