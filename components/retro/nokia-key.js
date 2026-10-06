const KEYS = [['1', 'o_o'], ['2', 'abc'], ['3', 'def'], ['4', 'ghi'], ['5', 'jkl'], ['6', 'mno'], ['7', 'pqrs'], ['8', 'tuv'], ['9', 'wxyz'], ['*', '+'], ['0', '⎵'], ['#', '⇧']];
export default {
  id: 'rt-nokia-key',
  credit: 'Nokia 3310 (2000) — 84×48 monochrome LCD with green backlight, Navi key, C key, scroll rocker and the rubber keypad',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #d9dde2; padding: 12px; border-radius: 12px; display: inline-block; }
    .ph { width: 168px; padding: 12px 12px 14px; border-radius: 40px 40px 34px 34px / 30px 30px 40px 40px; background: linear-gradient(90deg, #142446, #22396a 50%, #142446); box-shadow: inset 0 2px 0 rgba(255,255,255,.18), 0 3px 6px rgba(0,0,0,.35); }
    .brand { text-align: center; font: 900 11px/1 "Roboto Flex", "Arial Black", Arial, sans-serif; font-variation-settings: "wdth" 151; letter-spacing: 1.5px; color: #c9cfd8; margin: 2px 0 7px; }
    .lcdwin { padding: 6px; border-radius: 10px 10px 18px 18px; background: #0b1020; box-shadow: inset 0 1px 3px rgba(0,0,0,.8), 0 1px 0 rgba(255,255,255,.15); }
    canvas { display: block; width: 126px; height: 72px; margin: 0 auto; image-rendering: pixelated; border-radius: 2px; }
    .nav { display: grid; grid-template-columns: 30px 1fr 30px; align-items: center; gap: 6px; margin: 10px 0 10px; }
    .navi { height: 20px; border-radius: 10px; border: none; padding: 0; cursor: pointer; outline: none;
      background: linear-gradient(#5d7fb8, #2f4f86 60%, #233d6b); box-shadow: inset 0 1px 0 #8ba7d6, 0 2px 0 #0a1428; }
    .c { height: 18px; border-radius: 9px; border: none; padding: 0; cursor: pointer; outline: none; font: 700 10px/18px Arial, sans-serif; color: #24324f;
      background: linear-gradient(#e2e5e9, #b9bec5); box-shadow: inset 0 1px 0 #fff, 0 2px 0 #0a1428; }
    .rock { height: 22px; border-radius: 11px; display: grid; grid-template-rows: 1fr 1fr; overflow: hidden; box-shadow: 0 2px 0 #0a1428; }
    .rock button { border: none; padding: 0; margin: 0; cursor: pointer; outline: none; background: linear-gradient(#e2e5e9, #c3c8ce); display: grid; place-items: center; }
    .rock button + button { background: linear-gradient(#c3c8ce, #b2b7be); border-top: 1px solid #8f959d; }
    .rock svg { width: 7px; height: 4px; fill: #24324f; }
    .pad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px 7px; }
    .k { height: 21px; border: none; border-radius: 11px 11px 9px 9px / 9px 9px 12px 12px; cursor: pointer; padding: 0 7px; outline: none; display: flex; align-items: center; justify-content: space-between;
      background: linear-gradient(#eef0f2, #c7ccd2); box-shadow: inset 0 1px 0 #fff, 0 2px 0 #0a1428; color: #1b2640; }
    .k:nth-child(3n+1) { transform: translateY(2px); } .k:nth-child(3n) { transform: translateY(2px); }
    .k b { font: 700 12px/1 "Helvetica Neue", Arial, sans-serif; }
    .k small { font: 600 7px/1 "Helvetica Neue", Arial, sans-serif; letter-spacing: .3px; color: #4a5672; }
    .k:active, .c:active, .navi:active, .rock button:active { filter: brightness(.85); box-shadow: inset 0 1px 2px rgba(0,0,0,.3); }
    .k:focus-visible, .c:focus-visible, .navi:focus-visible, .rock button:focus-visible { outline: 2px solid #b5d26a; outline-offset: 1px; }
  `,
  html: `
    <div class="stage"><div class="ph">
      <div class="brand">NOKIA</div>
      <div class="lcdwin"><canvas width="84" height="48" role="img" aria-label="Phone display"></canvas></div>
      <div class="nav">
        <button class="c" type="button" aria-label="Clear">C</button>
        <button class="navi" type="button" aria-label="Navi key"></button>
        <div class="rock"><button class="up" type="button" aria-label="Scroll up"><svg viewBox="0 0 7 4"><path d="M3.5 0L7 4H0z"/></svg></button><button class="dn" type="button" aria-label="Scroll down"><svg viewBox="0 0 7 4"><path d="M0 0h7L3.5 4z"/></svg></button></div>
      </div>
      <div class="pad">${KEYS.map(([n, l]) => `<button class="k" type="button" data-k="${n}"><b>${n}</b><small>${l}</small></button>`).join('')}</div>
    </div></div>`,
  init(root) {
    const cv = root.querySelector('canvas'), x = cv.getContext('2d', { willReadFrequently: true });
    const OFF = '#879b6b', LIT = '#a8c96a', INK = [26, 36, 22];
    let lit = false, num = '', menu = 0, t = 0;
    // draw anti-aliased text, then threshold to crisp monochrome pixels like the real 84x48 matrix
    const crisp = () => {
      const im = x.getImageData(0, 0, 84, 48), d = im.data, bg = lit ? [168, 201, 106] : [135, 155, 107];
      for (let i = 0; i < d.length; i += 4) { const on = d[i + 3] > 110; d[i] = on ? INK[0] : bg[0]; d[i + 1] = on ? INK[1] : bg[1]; d[i + 2] = on ? INK[2] : bg[2]; d[i + 3] = 255; }
      x.putImageData(im, 0, 0);
    };
    const MENUS = ['Phone book', 'Messages', 'Call register', 'Tones', 'Settings', 'Games'];
    const draw = () => {
      x.clearRect(0, 0, 84, 48); x.fillStyle = '#000'; x.textBaseline = 'alphabetic';
      if (menu) {
        x.font = 'bold 8px Arial, sans-serif'; x.textAlign = 'left'; x.fillText('Menu', 0, 7); x.textAlign = 'right'; x.fillText(String(menu), 84, 7);
        x.fillRect(0, 9, 84, 1);
        x.font = 'bold 10px Arial, sans-serif'; x.textAlign = 'center'; x.fillText(MENUS[menu - 1], 42, 28);
        x.font = 'bold 8px Arial, sans-serif'; x.fillText('Select', 42, 46);
      } else if (num) {
        x.font = 'bold 14px Arial, sans-serif'; x.textAlign = 'right'; x.fillText(num.slice(-10), 83, 30);
        x.font = 'bold 8px Arial, sans-serif'; x.textAlign = 'center'; x.fillText('Options', 42, 46);
      } else {
        for (let i = 0; i < 4; i++) x.fillRect(0, 22 - i * 5, 2 + i, 3);
        x.fillRect(5, 1, 1, 24);
        for (let i = 0; i < 4; i++) x.fillRect(80 - i, 22 - i * 5, 4 - (3 - i), 3);
        x.fillRect(78, 1, 1, 24);
        x.font = 'bold 9px Arial, sans-serif'; x.textAlign = 'center'; x.fillText('NOKIA', 42, 14);
        x.font = 'bold 8px Arial, sans-serif'; x.fillText('Menu', 42, 46);
      }
      crisp();
    };
    const wake = () => { lit = true; clearTimeout(t); t = setTimeout(() => { lit = false; draw(); }, 2500); };
    const act = (fn) => () => { wake(); fn(); draw(); };
    root.querySelectorAll('.k').forEach((k) => k.addEventListener('click', act(() => { menu = 0; if (num.length < 16) num += k.dataset.k; })));
    root.querySelector('.c').addEventListener('click', act(() => { if (menu) menu = 0; else num = num.slice(0, -1); }));
    root.querySelector('.navi').addEventListener('click', act(() => { if (!num && !menu) menu = 1; else if (menu) menu = 0; }));
    root.querySelector('.up').addEventListener('click', act(() => { if (menu) menu = menu === 1 ? MENUS.length : menu - 1; }));
    root.querySelector('.dn').addEventListener('click', act(() => { if (menu) menu = menu === MENUS.length ? 1 : menu + 1; }));
    draw();
    return () => clearTimeout(t);
  },
};
