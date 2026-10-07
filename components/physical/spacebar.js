// Bottom row of a full-size mechanical keyboard (ANSI 6.25u layout: Ctrl Win Alt | Space | Alt Win Menu Ctrl)
// in the classic two-tone Cherry-profile PBT set: grey modifiers with their legends, an ivory 6.25u spacebar
// on a plate-mount stabilised switch. The stabiliser wire keeps the bar level: it goes down 4 mm as one
// piece wherever you press. Modifier caps press too, but only the spacebar is a control.
const U = 1.25;
const mods = (list) => list.map((l) => `<span class="cell" style="flex-grow:${U}"><span class="cap mod" aria-hidden="true"><span class="top">${l}</span></span></span>`).join('');
const WIN = '<svg viewBox="0 0 16 16" width="9" height="9"><path fill="currentColor" d="M0 2.2 6.5 1.3v6.2H0zm7.3-1L16 0v7.5H7.3zM0 8.3h6.5v6.3L0 13.7zm7.3 0H16V16l-8.7-1.2z"/></svg>';
const MENU = '<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="1.5" width="12" height="13" rx="1"/><path d="M5 5.5h6M5 8h6M5 10.5h6"/></svg>';

export default {
  id: 'ph-spacebar',
  credit: 'Mechanical keyboard bottom row — two-tone Cherry-profile PBT caps, 6.25u spacebar on stabilisers that presses level as one piece',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 18px 16px; border-radius: 12px;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px), linear-gradient(#3b3e44, #26282d); }
    .plate { display: flex; max-width: 640px; margin: 0 auto; padding: 4px 3px; border-radius: 4px; background: #0e0f11; box-shadow: inset 0 2px 4px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.08); }
    .cell { position: relative; flex: 1 1 0; min-width: 0; height: 58px; padding: 0 2px; }
    .space { flex-grow: 6.25; }
    .cell::before { content: ''; position: absolute; left: 50%; width: 22px; margin-left: -11px; top: 14px; height: 28px; border-radius: 2px; background: #1b1c1f; }
    .key, .cap {
      position: absolute; left: 2px; right: 2px; top: 0; height: 52px; border: 0; padding: 0; border-radius: 5px; display: block;
      box-shadow: 0 1px 0 rgba(0,0,0,.5), 0 4px 0 -1px rgba(0,0,0,.55), 0 7px 7px rgba(0,0,0,.45);
      transition: transform .16s cubic-bezier(.3,1.6,.5,1), box-shadow .16s cubic-bezier(.3,1.6,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .key { cursor: pointer; background: linear-gradient(180deg, transparent 72%, rgba(255,255,255,.18) 80%, rgba(0,0,0,.06) 100%), linear-gradient(90deg, #9c978b 0%, #c4beb1 3%, #cfc9bc 50%, #c1bbae 97%, #938e82 100%); }
    .mod { background: linear-gradient(180deg, transparent 72%, rgba(255,255,255,.12) 80%, rgba(0,0,0,.08) 100%), linear-gradient(90deg, #5d5f63 0%, #7b7d81 8%, #85878b 50%, #77797d 92%, #55575b 100%); }
    .key::after, .cap::after { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: .5; background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.08) 0 .5px, transparent .8px) 0 0 / 2px 2px; }
    .top {
      position: absolute; left: 6px; right: 6px; top: 3px; bottom: 12px; border-radius: 5px 5px 4px 4px; padding: 5px 0 0 6px;
      font: 500 9px/1 "Inter", system-ui, sans-serif; letter-spacing: .2px; color: #eceae5; text-align: left; white-space: nowrap; overflow: hidden;
    }
    .key .top {
      background: linear-gradient(90deg, rgba(0,0,0,.05), transparent 4%, transparent 96%, rgba(0,0,0,.05)), linear-gradient(180deg, #f0ebdf 0%, #e7e2d6 30%, #dfd9cc 60%, #e8e3d7 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.65), inset 0 -1px 1px rgba(0,0,0,.06), 0 0 0 .5px rgba(0,0,0,.1);
    }
    .mod .top {
      background: linear-gradient(90deg, rgba(0,0,0,.06), transparent 8%, transparent 92%, rgba(0,0,0,.06)), linear-gradient(180deg, #9a9ca0 0%, #929498 30%, #8b8d91 60%, #95979b 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.35), inset 0 -1px 1px rgba(0,0,0,.08), 0 0 0 .5px rgba(0,0,0,.15);
    }
    .mod .top svg { display: block; }
    .key:hover .top { filter: brightness(1.03); }
    .key:active, .key.down, .cell:active .cap { transform: translateY(5px); box-shadow: 0 1px 0 rgba(0,0,0,.5), 0 0 0 -1px rgba(0,0,0,.55), 0 2px 2px rgba(0,0,0,.45); transition-duration: .04s; transition-timing-function: ease-in; }
    .key:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        ${mods(['Ctrl', WIN, 'Alt'])}
        <span class="cell space"><button class="key" type="button" aria-label="Space"><span class="top"></span></button></span>
        ${mods(['Alt', WIN, MENU, 'Ctrl'])}
      </div>
    </div>`,
  init(root) {
    const k = root.querySelector('.key');
    k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
    k.addEventListener('keyup', () => k.classList.remove('down'));
    k.addEventListener('blur', () => k.classList.remove('down'));
  },
};
