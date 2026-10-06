const BURST = (() => { const p = []; for (let i = 0; i < 24; i++) { const r = i % 2 ? 15 : 22, a = (i / 24) * Math.PI * 2; p.push(`${(24 + Math.cos(a) * r * 1.25).toFixed(1)},${(22 + Math.sin(a) * r).toFixed(1)}`); } return p.join(' '); })();
export default {
  id: 'rt-geocities-new',
  credit: 'GeoCities, c. 1997 — marching hazard-stripe "Under Construction" sign and the blinking red starburst NEW!',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #000080; padding: 14px 18px; border-radius: 12px; display: inline-flex; gap: 14px; align-items: center;
      background-image: radial-gradient(#ffffff 1px, transparent 1.5px), radial-gradient(#ffff99 1px, transparent 1.5px); background-size: 37px 29px, 23px 41px; background-position: 3px 5px, 14px 9px; }
    .uc { position: relative; padding: 5px; border: none; cursor: pointer; outline: none;
      background: repeating-linear-gradient(-45deg, #ffcc00 0 8px, #000 8px 16px); background-size: 22.6px 22.6px; }
    .uc[aria-pressed="true"] { animation: march .6s linear infinite; }
    .uc span { display: block; background: #ffcc00; color: #000; padding: 5px 9px 4px; border: 2px solid #000; text-align: center;
      font: 900 13px/13px Impact, "Arial Black", Arial, sans-serif; letter-spacing: .5px; text-transform: uppercase; }
    .uc small { display: block; font: bold 9px/11px "Times New Roman", Times, serif; letter-spacing: 0; text-transform: none; }
    .uc:hover span { background: #ffe14d; }
    .uc:active span { transform: translate(1px, 1px); }
    .uc:focus-visible { outline: 2px dashed #fff; outline-offset: 2px; }
    .new { width: 60px; height: 46px; border: none; padding: 0; background: none; cursor: pointer; outline: none; position: relative; }
    .new svg { display: block; overflow: visible; }
    .new[aria-pressed="true"] svg { animation: blink 1s steps(1) infinite; }
    .new:active svg { transform: scale(.94); }
    .new:focus-visible { outline: 2px dashed #fff; outline-offset: 2px; }
    @keyframes march { to { background-position: 22.6px 0; } }
    @keyframes blink { 50% { visibility: hidden; } }
  `,
  html: `
    <div class="stage">
      <button class="uc" type="button" aria-pressed="false" aria-label="Under construction"><span>Under Construction<small>pardon our dust!</small></span></button>
      <button class="new" type="button" aria-pressed="true" aria-label="New">
        <svg width="60" height="46" viewBox="-6 0 60 46" aria-hidden="true"><polygon points="${BURST}" fill="#ff0000" stroke="#ffff00" stroke-width="1.5"/>
          <text x="24" y="27.5" text-anchor="middle" font-family="Impact, 'Arial Black', Arial, sans-serif" font-size="14" font-style="italic" fill="#ffff00" stroke="#800000" stroke-width=".6">NEW!</text></svg>
      </button>
    </div>`,
  init(root) {
    root.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
  },
};
