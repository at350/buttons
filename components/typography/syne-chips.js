export default {
  id: 'ty-syne-chips',
  credit: 'Syne ultra-bold tag chips — uppercase extended-weight labels in outline pills that fill solid when selected (Syne specimen / Awwwards tag filters)',
  size: 'wide',
  css: `
    :host { display: block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage {
      background: #111;
      border-radius: 12px;
      padding: 16px 18px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      cursor: pointer;
      background: transparent;
      color: #f5f5f4;
      border: 1.5px solid #f5f5f4;
      border-radius: 999px;
      padding: 10px 16px;
      font: 800 13px/1 Syne, 'Space Grotesk', system-ui, sans-serif;
      text-transform: uppercase;
      letter-spacing: .12em;
      display: inline-grid;
      align-items: center;
      transition: background .25s, color .25s, border-color .25s, transform .2s cubic-bezier(.34, 1.56, .64, 1);
    }
    .chip > span { grid-area: 1 / 1; white-space: nowrap; }
    .chip .g { visibility: hidden; font-variation-settings: 'wght' 800; }
    .chip .v { font-variation-settings: 'wght' 500; transition: font-variation-settings .3s; }
    .chip:hover { transform: translateY(-2px) rotate(-1deg); }
    .chip:hover .v, .chip[aria-pressed=true] .v { font-variation-settings: 'wght' 800; }
    .chip:active { transform: scale(.95); }
    .chip:focus-visible { outline: 2px solid #fde047; outline-offset: 3px; }
    .chip[aria-pressed=true] {
      background: var(--c, #f5f5f4);
      border-color: var(--c, #f5f5f4);
      color: #111;
    }
    .chip:nth-child(1) { --c: #fde047; } .chip:nth-child(2) { --c: #f472b6; } .chip:nth-child(3) { --c: #a3e635; }
    .chip:nth-child(4) { --c: #60a5fa; } .chip:nth-child(5) { --c: #fb923c; } .chip:nth-child(6) { --c: #c084fc; }
  `,
  html: `<div class="stage" role="group">
    <button class="chip" type="button" aria-pressed="true"><span class="g" aria-hidden="true">Design</span><span class="v">Design</span></button>
    <button class="chip" type="button" aria-pressed="false"><span class="g" aria-hidden="true">Motion</span><span class="v">Motion</span></button>
    <button class="chip" type="button" aria-pressed="false"><span class="g" aria-hidden="true">Type</span><span class="v">Type</span></button>
    <button class="chip" type="button" aria-pressed="false"><span class="g" aria-hidden="true">3D</span><span class="v">3D</span></button>
    <button class="chip" type="button" aria-pressed="false"><span class="g" aria-hidden="true">Sound</span><span class="v">Sound</span></button>
    <button class="chip" type="button" aria-pressed="false"><span class="g" aria-hidden="true">Code</span><span class="v">Code</span></button>
  </div>`,
  init(root) {
    for (const c of root.querySelectorAll('.chip')) {
      c.addEventListener('click', () => c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true'));
    }
  },
};
