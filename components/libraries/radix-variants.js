export default {
  id: 'lb-radix-variants',
  credit: 'Radix Themes — Button size 2 (32px, 4px radius, 500 14px system font) in classic / solid / soft / surface / outline / ghost with the Radix BookmarkIcon; click any to cycle the accent (indigo → crimson → grass → amber)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; font: 500 14px/20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Open Sans", system-ui, sans-serif; letter-spacing: 0;
      --a2: #0040ff08; --a3: #0047f112; --a4: #0044ff1e; --a5: #0044ff2d; --a7: #0037ed54; --a8: #0034dc72; --a11: #002bb7c5; --s9: #3e63dd; --s10: #3358d4; --s8: #8da4ef; --surface: #f5f8ffcc; --contrast: #fff; }
    .row[data-a="crimson"] { --a2: #e0004008; --a3: #ff005216; --a4: #f8005123; --a5: #e5004f31; --a7: #bf004753; --a8: #b6004a6c; --a11: #c4004fe2; --s9: #e93d82; --s10: #df3478; --s8: #e093b2; --surface: #fef5f8cc; --contrast: #fff; }
    .row[data-a="grass"] { --a2: #0099000a; --a3: #00970016; --a4: #009f0725; --a5: #00930536; --a7: #018b0f6b; --a8: #008d199a; --a11: #006514d5; --s9: #46a758; --s10: #3e9b4f; --s8: #65ba74; --surface: #f3faf3cc; --contrast: #fff; }
    .row[data-a="amber"] { --a2: #f4d10016; --a3: #ffde003d; --a4: #ffd40063; --a5: #f8cf0088; --a7: #dc9b009d; --a8: #da8a00c9; --a11: #ab6400; --s9: #ffc53d; --s10: #ffba18; --s8: #e2a336; --surface: #fefae4cc; --contrast: #21201c; }
    .rt { position: relative; z-index: 0; height: 32px; padding: 0 12px; border-radius: 4px; border: 0; cursor: default; font: inherit; letter-spacing: inherit; display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; user-select: none; background: transparent; color: var(--a11); -webkit-tap-highlight-color: transparent; }
    .rt svg { width: 15px; height: 15px; fill: currentColor; opacity: .9; flex: none; }
    .rt:focus-visible { outline: 2px solid var(--s8); outline-offset: -1px; }
    .classic { background-color: var(--s9); color: var(--contrast); background-image: linear-gradient(to bottom, transparent 50%, #0000330f), linear-gradient(to bottom, transparent 50%, var(--s9) 80%);
      box-shadow: inset 0 0 0 1px #00002d17, inset 0 -2px 1px #0000330f, inset 0 0 0 1px var(--s9), inset 0 4px 2px -2px rgba(255,255,255,.9), inset 0 2px 1px -1px rgba(255,255,255,.9); }
    .classic::after { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; pointer-events: none; border: 2px solid transparent; background-clip: content-box; background-color: inherit; background-image: linear-gradient(rgba(0,0,0,.05), transparent, rgba(255,255,255,.1)); box-shadow: inset 0 2px 3px -1px rgba(255,255,255,.2); }
    .classic:hover::after { background-color: var(--s10); background-image: linear-gradient(rgba(0,0,0,.1) -15%, transparent, rgba(255,255,255,.15)); }
    .classic:active { padding-top: 2px; background-image: linear-gradient(rgba(0,0,0,.05), transparent); box-shadow: inset 0 4px 2px -2px #00002d17, inset 0 1px 1px #00062e32, inset 0 0 0 1px #0009321f, inset 0 0 0 1px var(--s9), inset 0 3px 2px #0000330f, inset 0 0 0 1px rgba(255,255,255,.7), inset 0 -2px 1px rgba(255,255,255,.5); }
    .classic:focus-visible, .solid:focus-visible { outline-offset: 2px; }
    .solid { background: var(--s9); color: var(--contrast); }
    .solid:hover { background: var(--s10); }
    .solid:active { background: var(--s10); filter: brightness(.92) saturate(1.1); }
    .soft { background: var(--a3); }
    .soft:hover { background: var(--a4); }
    .soft:active { background: var(--a5); }
    .surface { background: var(--surface); box-shadow: inset 0 0 0 1px var(--a7); }
    .surface:hover { box-shadow: inset 0 0 0 1px var(--a8); }
    .surface:active { background: var(--a3); box-shadow: inset 0 0 0 1px var(--a8); }
    .outline { box-shadow: inset 0 0 0 1px var(--a8); }
    .outline:hover { background: var(--a2); }
    .outline:active { background: var(--a3); }
    .ghost { height: auto; padding: 4px 8px; gap: 4px; }
    .ghost:hover { background: var(--a3); }
    .ghost:active { background: var(--a4); }
  `,
  html: `
    <div class="row" data-a="indigo">
      <button class="rt classic" type="button"><svg viewBox="0 0 15 15"><path d="M11.6006 2.00977C11.8286 2.05629 12 2.25829 12 2.5V13.5C12 13.6818 11.9012 13.8494 11.7422 13.9375C11.5833 14.0254 11.3894 14.02 11.2354 13.9238L7.5 11.5898L3.76465 13.9238C3.61062 14.02 3.41669 14.0254 3.25781 13.9375C3.09884 13.8494 3 13.6818 3 13.5V2.5L3.00977 2.39941C3.05629 2.17145 3.25829 2 3.5 2H11.5L11.6006 2.00977ZM4 12.5977L6.96973 10.7412C7.294 10.5385 7.706 10.5385 8.03027 10.7412L11 12.5977V3H4V12.5977Z"/></svg>Bookmark</button>
      <button class="rt solid" type="button">Solid</button>
      <button class="rt soft" type="button">Soft</button>
      <button class="rt surface" type="button">Surface</button>
      <button class="rt outline" type="button">Outline</button>
      <button class="rt ghost" type="button">Ghost</button>
    </div>`,
  init(root) {
    const row = root.querySelector('.row'), accents = ['indigo', 'crimson', 'grass', 'amber'];
    root.querySelectorAll('.rt').forEach((b) => b.addEventListener('click', () => {
      row.dataset.a = accents[(accents.indexOf(row.dataset.a) + 1) % accents.length];
    }));
  },
};
