// 7-segment LCD cell (a b c d e f g + decimal point), drawn the way Casio LCD glass etches them
const SEG = ['M2.6 1h7.8l-1.6 1.6H4.2z', 'M10.8 1.4l.0 0L11 9l-1.5 1-1-.8.4-6.6z', 'M9.4 11l1.5.9-.4 7.6-1.6-1.5.3-6z', 'M1.6 20.5l1.6-1.6h5.6l1.6 1.6z',
  'M1.1 11.9l1.5-.9.9.9-.3 6-1.6 1.6z', 'M1.6 1.5l1.6 1.6-.3 6.3-.9.8-1.5-.9z', 'M2.7 10.7l.9-.9h5.6l.9.9-.9.9H3.6z'];
const MAP = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g', E: 'adefg', ' ': '' };
const cell = `<svg class="dg" viewBox="0 0 14 22" width="14" height="22" aria-hidden="true">${SEG.map((d, i) => `<path class="s${'abcdefg'[i]}" d="${d}"/>`).join('')}<rect class="dp" x="11.6" y="19.4" width="1.6" height="1.6"/></svg>`;
export default {
  id: 'rt-casio-calc',
  credit: 'Casio solar pocket calculator — reflective 8-digit 7-segment LCD with ghost segments, black keys and red-orange AC',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #e4e2dc; padding: 12px; border-radius: 12px; display: inline-block; }
    .calc { width: 176px; padding: 10px 12px 14px; border-radius: 10px 10px 14px 14px; background: linear-gradient(#45474d, #2f3035); box-shadow: inset 0 1px 0 #6a6c72, 0 3px 6px rgba(0,0,0,.35); }
    .top { display: flex; align-items: center; justify-content: space-between; height: 18px; margin-bottom: 7px; }
    .brand { font: 800 13px/1 "Helvetica Neue", Arial, sans-serif; letter-spacing: 2.5px; color: #e8e8ec; }
    .solar { width: 52px; height: 14px; border-radius: 2px; background: repeating-linear-gradient(90deg, #3b2b2e 0 12px, #8a7f86 12px 13px); box-shadow: inset 0 0 0 1px #1a1416, inset 0 1px 2px rgba(255,255,255,.15); }
    .lcd { height: 40px; border-radius: 3px; padding: 6px 6px 0; display: flex; justify-content: flex-end; gap: 1px; margin-bottom: 12px;
      background: linear-gradient(#a9b19a, #c3cab3 30%, #bcc4ac); box-shadow: inset 0 0 0 2px #1c1d20, inset 0 3px 5px rgba(0,0,0,.35); transform: skewX(0deg); }
    .dg { transform: skewX(-6deg); }
    .dg path, .dg rect { fill: rgba(30,34,26,.07); }
    .dg .on { fill: #1d2119; }
    .keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px 8px; }
    .k { height: 24px; border: none; border-radius: 5px; cursor: pointer; padding: 0; outline: none; color: #f2f2f2;
      font: 600 13px/24px "Helvetica Neue", Arial, sans-serif;
      background: linear-gradient(#3c3d42, #1f2024); box-shadow: 0 2px 0 #0d0d0f, 0 3px 3px rgba(0,0,0,.4), inset 0 1px 0 #5b5c62; transition: transform .04s, box-shadow .04s; }
    .k.op { color: #fff; font-size: 15px; }
    .k.ac { background: linear-gradient(#ea5b3a, #c63d1e); box-shadow: 0 2px 0 #7d2410, 0 3px 3px rgba(0,0,0,.4), inset 0 1px 0 #ff8e70; font-size: 11px; }
    .k:active { transform: translateY(2px); box-shadow: 0 0 0 #000, inset 0 1px 2px rgba(0,0,0,.5); }
    .k:focus-visible { outline: 2px solid #f2b13e; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="calc">
      <div class="top"><span class="brand">CASIO</span><span class="solar"></span></div>
      <div class="lcd" role="status" aria-live="polite">${cell.repeat(8)}</div>
      <div class="keys">
        <button class="k" type="button">7</button><button class="k" type="button">8</button><button class="k" type="button">9</button><button class="k op" type="button" aria-label="divide">÷</button>
        <button class="k" type="button">4</button><button class="k" type="button">5</button><button class="k" type="button">6</button><button class="k op" type="button" aria-label="multiply">×</button>
        <button class="k" type="button">1</button><button class="k" type="button">2</button><button class="k" type="button">3</button><button class="k op" type="button" aria-label="minus">−</button>
        <button class="k ac" type="button">AC</button><button class="k" type="button">0</button><button class="k op eq" type="button" aria-label="equals">=</button><button class="k op" type="button" aria-label="plus">+</button>
      </div>
    </div></div>`,
  init(root) {
    const lcd = root.querySelector('.lcd');
    const cells = [...lcd.querySelectorAll('.dg')];
    const show = (str) => {
      // split into glyphs with decimal points attached
      const g = [];
      for (const ch of String(str)) { if (ch === '.' && g.length) g[g.length - 1].dp = true; else g.push({ c: ch, dp: false }); }
      if (!g.some((x) => x.dp)) g[g.length - 1].dp = true; // Casio always shows the trailing point
      const pad = Array(Math.max(0, 8 - g.length)).fill({ c: ' ', dp: false }).concat(g.slice(-8));
      cells.forEach((svg, i) => {
        const { c, dp } = pad[i]; const on = MAP[c] || '';
        svg.querySelectorAll('path').forEach((p) => p.classList.toggle('on', on.includes(p.getAttribute('class').replace(' on', '').slice(1))));
        svg.querySelector('.dp').classList.toggle('on', dp);
      });
      lcd.setAttribute('aria-label', String(str));
    };
    let cur = '0', acc = null, op = null, fresh = true;
    const fmt = (r) => { if (!isFinite(r) || Math.abs(r) >= 1e8) return 'E'; let s = String(Number(r.toPrecision(8))); if (s.replace(/[-.]/g, '').length > 8) s = String(Number(r.toFixed(Math.max(0, 7 - String(Math.trunc(Math.abs(r))).length)))); return s; };
    const apply = () => { if (op === null || acc === null) return; const b = Number(cur), a = acc;
      const r = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b; cur = fmt(r); show(cur); acc = null; op = null; };
    root.querySelectorAll('.k').forEach((k) => k.addEventListener('click', () => {
      const t = k.textContent;
      if (k.classList.contains('ac')) { cur = '0'; acc = null; op = null; fresh = true; return show(cur); }
      if (cur === 'E') return;
      if (k.classList.contains('eq')) { apply(); fresh = true; return; }
      if (k.classList.contains('op')) { if (acc !== null && !fresh) apply(); acc = Number(cur); op = t; fresh = true; return; }
      if (fresh || cur === '0') cur = t; else if (cur.replace('-', '').length < 8) cur += t;
      fresh = false; show(cur);
    }));
    show('0');
  },
};
