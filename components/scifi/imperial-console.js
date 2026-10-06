// Star Wars (1977) — Death Star tractor-beam terminal: chunky back-lit keys with Aurebesh glyphs, a power column and the lever Obi-Wan throws.
const G = [
  'M3 3h10M8 3v10M4 13h8', 'M3 3l10 10M3 13h10', 'M3 8h10M3 3v10M13 3v4', 'M8 2v12M3 6l5-4 5 4',
  'M3 3h10v10H3zM3 8h6', 'M3 13L8 3l5 10M5 9h6',
];
export default {
  id: 'sf-imperial-console',
  credit: 'Star Wars: A New Hope — Death Star tractor-beam power terminal: gloss-black Imperial panel, back-lit keys with Aurebesh glyphs, power column and the lever Obi-Wan pulls',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 14px; background: linear-gradient(180deg, #2a2d30, #16181a);
      box-shadow: inset 0 0 0 1px #3c4044; display: grid; grid-template-columns: 1fr 34px 56px; gap: 12px; align-items: stretch; }
    .keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; padding: 8px; background: #050505; border-radius: 3px; box-shadow: inset 0 2px 6px #000, 0 0 0 1px #45494d; }
    .strip { grid-column: 1 / 4; display: flex; gap: 3px; margin-bottom: 4px; }
    .strip i { flex: 1; height: 5px; background: #3a0b08; }
    .strip i:nth-child(odd) { background: #4b0d08; animation: bl 2.4s steps(1) infinite; animation-delay: calc(var(--d) * -1s); }
    @keyframes bl { 0%, 55% { background: #ff2a14; box-shadow: 0 0 5px #ff2a14; } }
    .k { height: 38px; border: 0; padding: 0; cursor: pointer; border-radius: 2px; display: grid; place-items: center;
      background: linear-gradient(#6d7175, #4a4e52 50%, #3b3e41); box-shadow: inset 0 1px 0 #9aa0a5, inset 0 -2px 0 #222, 0 2px 0 #000; color: #15171a; transition: background .1s, box-shadow .15s; }
    .k svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: square; }
    .k:hover { background: linear-gradient(#80858a, #5a5f63 50%, #484c50); }
    .k[aria-pressed="true"] { color: #10324a; background: linear-gradient(#f4fbff, #bfe5ff 60%, #8fcaf0); box-shadow: 0 0 10px #8fd4ff, inset 0 -2px 0 #6aa9d1, 0 2px 0 #000; }
    .k:active { transform: translateY(1px); }
    .k:focus-visible, .lv:focus-visible { outline: 2px solid #ff2a14; outline-offset: 2px; }
    .col { display: flex; flex-direction: column-reverse; gap: 3px; padding: 5px; background: #050505; border-radius: 3px; box-shadow: 0 0 0 1px #45494d; }
    .col i { flex: 1; border-radius: 1px; background: #0b2410; transition: background .1s, box-shadow .1s; transition-delay: calc(var(--n) * 70ms); }
    .on .col i { background: #39ff6a; box-shadow: 0 0 6px #39ff6a; }
    .on .col i:nth-last-child(-n+3) { background: #f5fff7; box-shadow: 0 0 6px #b9ffcb; }
    .off .col i { transition-delay: calc((10 - var(--n)) * 70ms); }
    .lv { position: relative; border: 0; padding: 0; cursor: pointer; border-radius: 4px; background: linear-gradient(90deg, #0a0a0a, #1f2224 50%, #0a0a0a); box-shadow: inset 0 0 0 1px #45494d; }
    .lv::before { content: ''; position: absolute; left: 50%; top: 14px; bottom: 14px; width: 6px; margin-left: -3px; border-radius: 3px; background: #000; box-shadow: inset 0 0 3px #555; }
    .arm { position: absolute; left: 50%; bottom: 14px; width: 36px; height: 20px; margin-left: -18px; border-radius: 3px; background: linear-gradient(#c9ced2, #7d8388 55%, #50555a);
      box-shadow: 0 3px 4px #000, inset 0 1px 0 #fff; transform: translateY(var(--y, -86px)); transition: transform .35s cubic-bezier(.5,-0.4,.3,1.4); }
    .arm::after { content: ''; position: absolute; inset: 7px 4px; background: repeating-linear-gradient(90deg, #333 0 2px, transparent 2px 4px); }
    .off .arm { --y: 0px; }
    .lv:hover .arm { filter: brightness(1.12); }
  `,
  html: `<div class="stage on">
    <div class="keys"><div class="strip">${Array.from({ length: 9 }, (_, i) => `<i style="--d:${(i * 0.37) % 2.4}"></i>`).join('')}</div>
      ${G.map((d, i) => `<button class="k" type="button" aria-pressed="${i === 1 || i === 3}" aria-label="Key ${i + 1}"><svg viewBox="0 0 16 16"><path d="${d}"/></svg></button>`).join('')}</div>
    <div class="col">${Array.from({ length: 10 }, (_, i) => `<i style="--n:${i}"></i>`).join('')}</div>
    <button class="lv" type="button" role="switch" aria-checked="true" aria-label="Tractor beam"><span class="arm"></span></button>
  </div>`,
  init(root) {
    const st = root.querySelector('.stage'), lv = root.querySelector('.lv');
    root.querySelectorAll('.k').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
    lv.addEventListener('click', () => {
      const on = lv.getAttribute('aria-checked') !== 'true';
      lv.setAttribute('aria-checked', String(on)); st.classList.toggle('on', on); st.classList.toggle('off', !on);
    });
  },
};
