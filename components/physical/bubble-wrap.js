// Clear polyethylene bubble wrap (10 mm bubbles, staggered rows) lying on a kraft box.
// Each bubble pops once — squash, burst, crinkled flat film. Pop them all for a fresh sheet.
const ROW = '<button class="b" type="button" aria-label="Bubble" aria-pressed="false"></button>'.repeat(6);

export default {
  id: 'ph-bubble-wrap',
  credit: 'Sheet of clear bubble wrap on a kraft box — each bubble pops once and stays flat; pop them all to get a fresh sheet',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .stage {
      display: inline-block; padding: 14px; border-radius: 12px;
      background:
        repeating-linear-gradient(90deg, rgba(90,55,20,.05) 0 1px, transparent 1px 5px),
        linear-gradient(160deg, #c9a273, #b88d5c);
    }
    .sheet {
      position: relative; display: grid; gap: 3px; padding: 8px 8px 8px 7px; border-radius: 3px;
      background: linear-gradient(135deg, rgba(255,255,255,.28), rgba(255,255,255,.12) 50%, rgba(255,255,255,.22));
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.35), 0 1px 0 rgba(255,255,255,.25), 0 3px 6px rgba(70,40,10,.25);
    }
    .row { display: flex; gap: 4px; }
    .row:nth-child(even) { padding-left: 17px; }
    .row:nth-child(odd) { padding-right: 17px; }
    .b {
      position: relative; width: 30px; height: 30px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; flex: none;
      background:
        radial-gradient(circle at 34% 28%, rgba(255,255,255,.95) 0 3px, rgba(255,255,255,0) 6px),
        radial-gradient(circle at 66% 74%, rgba(255,255,255,.55) 0 1.5px, rgba(255,255,255,0) 4px),
        radial-gradient(circle at 50% 50%, rgba(255,255,255,.04) 0 55%, rgba(255,255,255,.35) 78%, rgba(120,90,60,.35) 92%, rgba(255,255,255,.6) 100%);
      box-shadow: 1px 3px 3px rgba(80,45,10,.35), inset -2px -3px 4px rgba(255,255,255,.25), inset 2px 2px 3px rgba(90,60,30,.12);
      transition: transform .12s cubic-bezier(.3,1.6,.5,1), box-shadow .12s; -webkit-tap-highlight-color: transparent;
    }
    .b:hover { transform: scale(1.04); }
    .b:active { transform: scale(1.1, .88); transition-duration: .05s; }
    .b:focus-visible { outline: 2px solid #1d4ed8; outline-offset: 1px; }
    .b.pop {
      cursor: default;
      background:
        linear-gradient(28deg, transparent 44%, rgba(255,255,255,.32) 46%, transparent 49%),
        linear-gradient(-52deg, transparent 52%, rgba(255,255,255,.28) 54%, transparent 57%),
        linear-gradient(98deg, transparent 30%, rgba(90,60,30,.18) 32%, transparent 35%),
        radial-gradient(circle, rgba(255,255,255,.18) 0 60%, rgba(255,255,255,.3) 80%, transparent 100%);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.35), 0 0 1px rgba(80,45,10,.3);
      transform: scale(.9) rotate(9deg); border-radius: 47% 53% 44% 56% / 52% 46% 54% 48%;
      animation: pop .22s ease-out;
    }
    @keyframes pop {
      0% { transform: scale(1.12, .84); }
      35% { transform: scale(1.16); opacity: .6; }
      100% { transform: scale(.9) rotate(9deg); opacity: 1; }
    }
  `,
  html: `
    <div class="stage">
      <div class="sheet">${('<div class="row">' + ROW + '</div>').repeat(5)}</div>
    </div>`,
  init(root) {
    const all = [...root.querySelectorAll('.b')];
    all.forEach((b) => b.addEventListener('click', () => {
      if (b.classList.contains('pop')) {
        if (all.every((x) => x.classList.contains('pop'))) all.forEach((x) => { x.classList.remove('pop'); x.setAttribute('aria-pressed', 'false'); });
        return;
      }
      b.classList.add('pop'); b.setAttribute('aria-pressed', 'true');
    }));
  },
};
