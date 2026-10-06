export default {
  id: 'ty-vertical-tabs',
  credit: 'Vertical writing-mode tabs — sideways DM Sans labels (writing-mode: vertical-rl) in a spine; the active one turns black and a dot slides to it (book-spine / museum side nav)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .bar { display: inline-flex; gap: 6px; padding: 10px; background: #fff; border: 1px solid #111; border-radius: 12px; position: relative; }
    .tab {
      cursor: pointer; background: #f4f4f0; border: 0; border-radius: 6px; padding: 16px 10px; height: 176px; width: 44px; color: #555;
      writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg);
      font: 500 15px/1 'DM Sans', Inter, system-ui, sans-serif; letter-spacing: .14em; text-transform: uppercase;
      display: grid; align-items: start; justify-items: center; transition: background .25s, color .25s, transform .25s;
    }
    .tab > span { grid-area: 1 / 1; }
    .tab .g { visibility: hidden; font-weight: 800; }
    .tab .v { font-variation-settings: 'wght' 500; transition: font-variation-settings .3s; }
    .tab:hover { background: #e9e9e3; color: #111; transform: rotate(180deg) translateY(2px); }
    .tab:hover .v { font-variation-settings: 'wght' 700; }
    .tab[aria-selected=true] { background: #111; color: #fff; }
    .tab[aria-selected=true] .v { font-variation-settings: 'wght' 800; }
    .tab:active { transform: rotate(180deg) scale(.97); }
    .tab:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .tab::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; justify-self: center; align-self: end; grid-area: 1 / 1; opacity: 0; transform: scale(0); transition: transform .3s cubic-bezier(.34, 1.56, .64, 1), opacity .2s; }
    .tab[aria-selected=true]::after { opacity: 1; transform: scale(1); }
  `,
  html: `<div class="bar" role="tablist" aria-orientation="vertical">
    <button class="tab" type="button" role="tab" aria-selected="true"><span class="g" aria-hidden="true">Chapters</span><span class="v">Chapters</span></button>
    <button class="tab" type="button" role="tab" aria-selected="false"><span class="g" aria-hidden="true">Notes</span><span class="v">Notes</span></button>
    <button class="tab" type="button" role="tab" aria-selected="false"><span class="g" aria-hidden="true">Index</span><span class="v">Index</span></button>
    <button class="tab" type="button" role="tab" aria-selected="false"><span class="g" aria-hidden="true">Colophon</span><span class="v">Colophon</span></button>
  </div>`,
  init(root) {
    const tabs = [...root.querySelectorAll('.tab')];
    const select = (t) => { for (const o of tabs) o.setAttribute('aria-selected', String(o === t)); t.focus(); };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select(tabs[(i + 1) % tabs.length]); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select(tabs[(i - 1 + tabs.length) % tabs.length]); }
      });
    });
  },
};
