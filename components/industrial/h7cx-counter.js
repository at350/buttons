// Omron H7CX-A4 DIN 48×48 preset counter on a RAL 7035 door: red count (PV) over green preset (SV),
// one ▲ key per preset digit plus RST, and a separate INPUT pushbutton wired to CP1. OUT lights when
// the count reaches the preset; RST zeroes the count.
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g', ' ': '' };
const hs = (y) => `1,${y} 2.2,${y - 1.2} 9.8,${y - 1.2} 11,${y} 9.8,${y + 1.2} 2.2,${y + 1.2}`;
const vs = (x, a, b) => `${x},${a + 1} ${x + 1.2},${a + 2.2} ${x + 1.2},${b - 2.2} ${x},${b - 1} ${x - 1.2},${b - 2.2} ${x - 1.2},${a + 2.2}`;
const POLY = [hs(1.2), vs(10.8, 0, 11), vs(10.8, 11, 22), hs(20.8), vs(1.2, 11, 22), vs(1.2, 0, 11), hs(11)];
const digits = (n) => Array.from({ length: n }, (_, i) => `<g class="dg" transform="translate(${i * 15 + 2} 0) skewX(-6)">${POLY.map((p) => `<polygon points="${p}"/>`).join('')}<circle cx="13.2" cy="21" r="1.2"/></g>`).join('');
const paint = (svg, s) => {
  const cs = []; for (const c of s) { if (c === '.' && cs.length) cs[cs.length - 1].dp = 1; else cs.push({ c, dp: 0 }); }
  const gs = svg.querySelectorAll('.dg'); while (cs.length < gs.length) cs.unshift({ c: ' ', dp: 0 });
  gs.forEach((g, i) => { const on = SEG[cs[i].c] || ''; [...g.children].forEach((p, k) => p.classList.toggle('on', k < 7 ? on.includes('abcdefg'[k]) : !!cs[i].dp)); });
};
const UP = '<svg viewBox="0 0 10 8" aria-hidden="true"><path d="M5 1 9 7H1Z"/></svg>';
export default {
  id: 'nd-h7cx-counter',
  credit: 'Omron H7CX-A4 preset counter — red PV / green SV, per-digit ▲ keys, RST, and a CP1 input pushbutton; OUT lights at preset',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; align-items: center; gap: 16px; padding: 14px 18px 14px 14px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.05) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #d8dcd8, #c3c8c4);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7); }
    .unit { width: 158px; padding: 8px; border-radius: 6px; background: linear-gradient(#2c2e31, #17181a); box-shadow: 0 2px 4px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12); }
    .win { position: relative; padding: 7px 8px 6px; border-radius: 3px; background: #0a0a0b; box-shadow: inset 0 1px 3px rgba(0,0,0,.9), 0 0 0 1px #3a3c3f; }
    .row { display: flex; align-items: flex-end; justify-content: space-between; }
    .ind { display: flex; flex-direction: column; gap: 3px; font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .4px; }
    .ind b { padding: 1px 2px; border-radius: 1px; color: #3a1210; background: #1c0d0c; transition: color .08s, background .08s; }
    .ind b.on { color: #1a0402; background: #ff5a3c; box-shadow: 0 0 6px rgba(255,80,50,.7); }
    .pv { width: 100px; height: 35px; filter: drop-shadow(0 0 3px rgba(255,60,40,.55)); }
    .pv .dg > * { fill: #2a0b09; } .pv .dg > .on { fill: #ff3b26; }
    .sv { width: 66px; height: 23px; margin-top: 5px; filter: drop-shadow(0 0 2px rgba(70,255,110,.5)); }
    .sv .dg > * { fill: #0b2210; } .sv .dg > .on { fill: #45ef6f; }
    .lbl { font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; color: #8d9297; letter-spacing: .6px; }
    .keys { display: flex; gap: 5px; margin-top: 8px; }
    .k { flex: 1; height: 20px; border: 0; padding: 0; border-radius: 3px; cursor: pointer; display: grid; place-items: center; color: #e8e9ea;
      background: linear-gradient(#5a5e62, #3c3f43); box-shadow: 0 2px 0 #1b1c1e, inset 0 1px 0 rgba(255,255,255,.2); font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .5px; }
    .k svg { width: 8px; height: 7px; fill: currentColor; }
    .k.rst { flex: 1.6; background: linear-gradient(#e6e7e3, #b9bbb6); color: #1b1c1e; box-shadow: 0 2px 0 #77797a, inset 0 1px 0 #fff; }
    .k:hover { filter: brightness(1.12); }
    .k:active, .k.down { transform: translateY(2px); box-shadow: 0 0 0 #1b1c1e, inset 0 1px 2px rgba(0,0,0,.4); }
    .k:focus-visible, .in:focus-visible { outline: 2px solid #5aa9ff; outline-offset: 2px; }
    .foot { display: flex; justify-content: space-between; margin-top: 6px; font: 800 7px/1 Inter, Arial, sans-serif; letter-spacing: 1.2px; color: #c9ccce; }
    .foot i { font-style: normal; font-weight: 600; color: #8d9297; letter-spacing: .6px; }
    .ext { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .plate { width: 50px; height: 14px; border-radius: 2px; background: linear-gradient(#2b2d2f, #161718); color: #f3f3f0; font: 700 7px/14px "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1px; text-align: center; }
    .in { width: 40px; height: 40px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; position: relative;
      background: conic-gradient(from 30deg, #8d9296, #f4f6f7 12%, #a5aaae 26%, #e7eaec 42%, #7d8287 58%, #f0f2f3 72%, #9a9fa3 86%, #8d9296); box-shadow: 0 2px 2px rgba(0,0,0,.35); }
    .in::after { content: ''; position: absolute; inset: 6px; border-radius: 50%; background: radial-gradient(circle at 50% 35%, #4a4c4f, #1a1b1d 65%, #0b0b0c); transition: transform .05s; }
    .in:active::after, .in.down::after { transform: scale(.92); }
  `,
  html: `
    <div class="stage">
      <div class="unit">
        <div class="win">
          <div class="row"><div class="ind"><b class="o">OUT</b><b class="r">RST</b></div><svg class="pv" viewBox="0 0 62 22" aria-label="Count">${digits(4)}</svg></div>
          <div class="row"><span class="lbl">SV</span><svg class="sv" viewBox="0 0 62 22" aria-label="Preset">${digits(4)}</svg></div>
        </div>
        <div class="keys"><button class="k rst" type="button">RST</button>${[0, 1, 2, 3].map((i) => `<button class="k up" type="button" data-d="${i}" aria-label="Preset digit ${i + 1} up">${UP}</button>`).join('')}</div>
        <div class="foot">OMRON<i>H7CX</i></div>
      </div>
      <div class="ext"><span class="plate">INPUT</span><button class="in" type="button" aria-label="Count input CP1"></button></div>
    </div>`,
  init(root) {
    const pv = root.querySelector('.pv'), sv = root.querySelector('.sv'), out = root.querySelector('.ind .o'), rI = root.querySelector('.ind .r');
    let count = 0; const preset = [0, 0, 1, 0];
    const draw = () => {
      paint(pv, String(count)); paint(sv, preset.join(''));
      out.classList.toggle('on', count >= +preset.join('') && +preset.join('') > 0);
    };
    root.querySelector('.in').addEventListener('click', () => { count = (count + 1) % 10000; draw(); });
    const rst = root.querySelector('.rst');
    rst.addEventListener('click', () => { count = 0; draw(); });
    rst.addEventListener('pointerdown', () => rI.classList.add('on'));
    for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) rst.addEventListener(ev, () => rI.classList.remove('on'));
    for (const b of root.querySelectorAll('.up')) b.addEventListener('click', () => { const d = +b.dataset.d; preset[d] = (preset[d] + 1) % 10; draw(); });
    draw();
  },
};
