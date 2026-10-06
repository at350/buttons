export default {
  id: 'rt-geocities-new',
  credit: 'GeoCities circa 1997 — blinking NEW! badge and hazard-striped "under construction" button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #000; padding: 14px 18px; border-radius: 12px; display: inline-flex; gap: 14px; align-items: center;
      background-image: radial-gradient(#2a2a2a 1px, transparent 1px); background-size: 8px 8px; }
    .uc { position: relative; padding: 4px; border: none; cursor: pointer;
      background: repeating-linear-gradient(45deg, #ffcc00 0 10px, #000 10px 20px); }
    .uc span { display: block; background: #ffcc00; color: #000; padding: 6px 12px; font: bold 13px Impact, "Arial Black", Arial, sans-serif; letter-spacing: 1px; border: 2px solid #000; text-transform: uppercase; }
    .uc:hover span { background: #ffe34d; }
    .uc:active span { transform: translate(1px, 1px); background: #e6b800; }
    .uc.done span { background: #33cc33; }
    .uc:focus-visible { outline: 2px dashed #fff; outline-offset: 2px; }
    .new { position: relative; border: none; background: #ff0000; color: #ffff00; font: bold italic 14px Impact, "Arial Black", Arial, sans-serif; padding: 3px 8px;
      transform: rotate(-12deg); cursor: pointer; animation: blink 1s steps(1) infinite; box-shadow: 2px 2px 0 #880000; }
    .new.off { animation: none; opacity: .35; filter: grayscale(1); }
    .new:focus-visible { outline: 2px dashed #fff; outline-offset: 2px; }
    @keyframes blink { 50% { visibility: hidden; } }
  `,
  html: `
    <div class="stage">
      <button class="uc" type="button" aria-pressed="false"><span>Under Construction</span></button>
      <button class="new" type="button" aria-pressed="true">NEW!</button>
    </div>`,
  init(root) {
    const uc = root.querySelector('.uc');
    const nw = root.querySelector('.new');
    uc.addEventListener('click', () => { const on = uc.classList.toggle('done'); uc.setAttribute('aria-pressed', String(on)); uc.querySelector('span').textContent = on ? 'Done!' : 'Under Construction'; });
    nw.addEventListener('click', () => { const off = nw.classList.toggle('off'); nw.setAttribute('aria-pressed', String(!off)); });
  },
};
