export default {
  id: 'ph-bubble-wrap',
  credit: 'Sheet of bubble wrap — each bubble pops once and stays flat; pop them all to get a fresh sheet',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .stage { display: inline-block; padding: 12px; border-radius: 12px; background: linear-gradient(#cfd8df, #b7c2cb); }
    .sheet { display: grid; grid-template-columns: repeat(6, 30px); gap: 4px; padding: 6px; border-radius: 6px; background: rgba(255,255,255,.35); box-shadow: inset 0 0 0 1px rgba(255,255,255,.6), 0 2px 4px rgba(0,0,0,.15); }
    .b {
      width: 30px; height: 30px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.95), rgba(240,246,250,.7) 30%, rgba(190,205,216,.75) 70%, rgba(150,170,185,.9) 100%);
      box-shadow: 0 2px 3px rgba(0,0,0,.25), inset 0 -2px 3px rgba(255,255,255,.7), inset 0 1px 1px rgba(255,255,255,.9);
      transition: transform .05s, box-shadow .05s; -webkit-tap-highlight-color: transparent;
    }
    .b:hover { transform: scale(1.06); }
    .b:active { transform: scale(.94); }
    .b:focus-visible { outline: 2px solid #1a73e8; outline-offset: 1px; }
    .b.pop {
      background: radial-gradient(circle at 50% 50%, rgba(200,210,218,.6), rgba(170,185,195,.5) 60%, rgba(150,170,185,.6)); 
      box-shadow: inset 0 1px 2px rgba(0,0,0,.3), inset 2px -1px 1px rgba(255,255,255,.5); transform: scale(.92) rotate(8deg); border-radius: 46% 54% 50% 50% / 50% 48% 52% 50%;
      animation: pop .14s ease-out;
    }
    @keyframes pop { 0% { transform: scale(1.18); } 100% { transform: scale(.92) rotate(8deg); } }
  `,
  html: `
    <div class="stage">
      <div class="sheet">${'<button class="b" type="button" aria-label="bubble" aria-pressed="false"></button>'.repeat(30)}</div>
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
