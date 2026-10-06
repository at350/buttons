export default {
  id: 'lb-radix-variants',
  credit: 'Radix Themes — Button variants solid / soft / surface / outline / ghost in one accent scale; click any to cycle the accent (indigo → crimson → grass → amber)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 10px; flex-wrap: wrap; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: 0;
      --a3: #e1e9ff; --a4: #d2deff; --a5: #c1d0ff; --a7: #abbdf9; --a8: #8da4ef; --a9: #3e63dd; --a10: #3358d4; --a11: #3a5bc7; --a12: #1f2d5c; --c: #fff; --ga2: rgba(0,0,0,.024); --ga3: rgba(0,0,0,.06); }
    .row[data-a="crimson"] { --a3: #ffe9f0; --a4: #fedce7; --a5: #facedd; --a7: #efbfd5; --a8: #e58fb1; --a9: #e93d82; --a10: #df3478; --a11: #cb1d63; --a12: #621639; }
    .row[data-a="grass"] { --a3: #e9f6e9; --a4: #daf1db; --a5: #c9e8ca; --a7: #97cf9c; --a8: #65ba74; --a9: #46a758; --a10: #3e9b4f; --a11: #2a7e3b; --a12: #203c25; }
    .row[data-a="amber"] { --a3: #fff7c2; --a4: #ffee9c; --a5: #fbe577; --a7: #e9c162; --a8: #e2a336; --a9: #ffc53d; --a10: #ffba18; --a11: #ab6400; --a12: #4f3422; --c: #21201c; }
    .rt { height: 32px; padding: 0 12px; border-radius: 6px; border: 0; cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: background .12s, color .12s, box-shadow .12s; -webkit-tap-highlight-color: transparent; }
    .rt:focus-visible { outline: 2px solid var(--a8); outline-offset: -1px; }
    .rt svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .solid { background: var(--a9); color: var(--c); }
    .solid:hover { background: var(--a10); }
    .solid:active { background: var(--a10); filter: brightness(.95); }
    .soft { background: var(--a3); color: var(--a11); }
    .soft:hover { background: var(--a4); }
    .soft:active { background: var(--a5); }
    .surface { background: rgba(255,255,255,.9); color: var(--a11); box-shadow: inset 0 0 0 1px var(--a7); }
    .surface:hover { box-shadow: inset 0 0 0 1px var(--a8); }
    .surface:active { background: var(--a3); }
    .outline { background: transparent; color: var(--a11); box-shadow: inset 0 0 0 1px var(--a8); }
    .outline:hover { background: var(--ga2); }
    .outline:active { background: var(--ga3); }
    .ghost { background: transparent; color: var(--a11); }
    .ghost:hover { background: var(--a3); }
    .ghost:active { background: var(--a4); }
    .rt[aria-pressed="true"] { box-shadow: inset 0 0 0 1px var(--a8), 0 0 0 2px var(--a5); }
    .rt.solid[aria-pressed="true"] { box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--a8); }
  `,
  html: `
    <div class="row" data-a="indigo">
      <button class="rt solid" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M12 3v12M6 10l6 6 6-6M4 21h16"/></svg>Solid</button>
      <button class="rt soft" type="button" aria-pressed="false">Soft</button>
      <button class="rt surface" type="button" aria-pressed="false">Surface</button>
      <button class="rt outline" type="button" aria-pressed="false">Outline</button>
      <button class="rt ghost" type="button" aria-pressed="false">Ghost</button>
    </div>`,
  init(root) {
    const row = root.querySelector('.row'), accents = ['indigo', 'crimson', 'grass', 'amber'];
    const all = [...root.querySelectorAll('.rt')];
    all.forEach((b) => b.addEventListener('click', () => {
      const was = b.getAttribute('aria-pressed') === 'true';
      all.forEach((x) => x.setAttribute('aria-pressed', x === b && !was));
      row.dataset.a = accents[(accents.indexOf(row.dataset.a) + 1) % accents.length];
    }));
  },
};
