export default {
  id: 'ph-keycap-row',
  credit: 'Row of four mechanical arrow keys — grey PBT caps with a blue accent, each presses independently',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 6px; padding: 18px 20px; border-radius: 12px; background: linear-gradient(#2a2d33, #191b1f); }
    .housing { position: relative; width: 52px; height: 54px; }
    .housing::before { content: ''; position: absolute; left: 5px; right: 5px; top: 6px; bottom: 2px; border-radius: 4px; background: #08090a; box-shadow: inset 0 3px 5px rgba(0,0,0,.9); }
    .key {
      position: absolute; left: 0; top: 0; width: 52px; height: 50px; border: 0; padding: 0; border-radius: 6px; cursor: pointer;
      background: linear-gradient(#5b6a7f, #46546a 50%, #313c4d 100%);
      box-shadow: 0 1px 0 rgba(255,255,255,.25) inset, 0 6px 0 -2px rgba(0,0,0,.65), 0 7px 8px rgba(0,0,0,.5);
      transition: transform .05s ease-out, box-shadow .05s ease-out; -webkit-tap-highlight-color: transparent;
    }
    .key:nth-child(1) { background: linear-gradient(#a4a69f, #8a8c86 50%, #6f716c); }
    .key:nth-child(1) .top { background: radial-gradient(ellipse at 50% 45%, #b9bbb4, #cfd1ca); color: #2b2d2a; }
    .top {
      position: absolute; left: 5px; right: 5px; top: 3px; bottom: 10px; border-radius: 4px;
      background: radial-gradient(ellipse at 50% 45%, #6a7a91, #7d8ea7 60%, #8798b1); color: #eef2f8;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.35); display: flex; align-items: center; justify-content: center;
    }
    .top svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .key:active, .key.down { transform: translateY(2px); box-shadow: 0 1px 0 rgba(255,255,255,.25) inset, 0 3px 0 -2px rgba(0,0,0,.65), 0 3px 4px rgba(0,0,0,.5); }
    .key:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="housing"><button class="key" type="button" aria-label="left"><span class="top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></span></button></div>
      <div class="housing"><button class="key" type="button" aria-label="down"><span class="top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg></span></button></div>
      <div class="housing"><button class="key" type="button" aria-label="up"><span class="top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg></span></button></div>
      <div class="housing"><button class="key" type="button" aria-label="right"><span class="top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></span></button></div>
    </div>`,
  init(root) {
    root.querySelectorAll('.key').forEach((k) => {
      k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
      k.addEventListener('keyup', () => k.classList.remove('down'));
      k.addEventListener('blur', () => k.classList.remove('down'));
    });
  },
};
