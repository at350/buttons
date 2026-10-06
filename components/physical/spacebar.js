// 6.25u Cherry-profile PBT spacebar (118 mm ≈ 353 px at 3 px/mm) on a plate-mount stabilised switch.
// The stabiliser wire keeps it level: the whole bar goes down 4 mm as one piece wherever you press.
export default {
  id: 'ph-spacebar',
  credit: 'Mechanical keyboard spacebar — 6.25u Cherry-profile PBT bar on stabilisers, presses level as one piece',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 20px 18px; border-radius: 12px;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px), linear-gradient(#3b3e44, #26282d); }
    .plate { max-width: 359px; margin: 0 auto; padding: 3px; border-radius: 4px; background: #0e0f11; box-shadow: inset 0 2px 4px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.08); }
    .slot { position: relative; height: 60px; }
    .slot::before { content: ''; position: absolute; left: 50%; width: 28px; margin-left: -14px; top: 14px; height: 30px; border-radius: 2px; background: #1b1c1f; box-shadow: -140px 0 0 -6px #1b1c1f, 140px 0 0 -6px #1b1c1f; }
    .key {
      position: absolute; left: 0; right: 0; top: 0; height: 54px; border: 0; padding: 0; border-radius: 5px; cursor: pointer;
      background:
        linear-gradient(180deg, transparent 72%, rgba(255,255,255,.18) 80%, rgba(0,0,0,.06) 100%),
        linear-gradient(90deg, #9c978b 0%, #c4beb1 3%, #cfc9bc 50%, #c1bbae 97%, #938e82 100%);
      box-shadow: 0 1px 0 rgba(0,0,0,.5), 0 4px 0 -1px rgba(0,0,0,.55), 0 7px 7px rgba(0,0,0,.45);
      transition: transform .16s cubic-bezier(.3,1.6,.5,1), box-shadow .16s cubic-bezier(.3,1.6,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .key::after { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: .5; background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.08) 0 .5px, transparent .8px) 0 0 / 2px 2px; }
    .top {
      position: absolute; left: 7px; right: 7px; top: 3px; bottom: 12px; border-radius: 5px 5px 4px 4px;
      background:
        linear-gradient(90deg, rgba(0,0,0,.05), transparent 4%, transparent 96%, rgba(0,0,0,.05)),
        linear-gradient(180deg, #f0ebdf 0%, #e7e2d6 30%, #dfd9cc 60%, #e8e3d7 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.65), inset 0 -1px 1px rgba(0,0,0,.06), 0 0 0 .5px rgba(0,0,0,.1);
    }
    .key:hover .top { filter: brightness(1.03); }
    .key:active, .key.down { transform: translateY(5px); box-shadow: 0 1px 0 rgba(0,0,0,.5), 0 0 0 -1px rgba(0,0,0,.55), 0 2px 2px rgba(0,0,0,.45); transition-duration: .04s; transition-timing-function: ease-in; }
    .key:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="plate"><div class="slot"><button class="key" type="button" aria-label="Space"><span class="top"></span></button></div></div>
    </div>`,
  init(root) {
    const k = root.querySelector('.key');
    k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
    k.addEventListener('keyup', () => k.classList.remove('down'));
    k.addEventListener('blur', () => k.classList.remove('down'));
  },
};
