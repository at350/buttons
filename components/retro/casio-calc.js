export default {
  id: 'rt-casio-calc',
  credit: 'Casio pocket calculator — LCD readout with ghosted 8s, rubber number keys, orange AC and blue operators',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #2f2f33; padding: 12px; border-radius: 12px; display: inline-block; border: 1px solid #0f0f10; box-shadow: inset 0 1px 0 #4a4a50; }
    .lcd { position: relative; height: 40px; background: #b9c4ad; border: 2px solid #1a1a1a; border-radius: 3px; margin-bottom: 10px; overflow: hidden;
      font: 28px/36px "Courier New", Courier, monospace; text-align: right; padding: 0 6px; color: #101510; box-shadow: inset 0 2px 4px rgba(0,0,0,.35); }
    .lcd .g { position: absolute; right: 6px; top: 0; color: rgba(0,0,0,.07); }
    .lcd .v { position: relative; }
    .keys { display: grid; grid-template-columns: repeat(4, 34px); gap: 6px; }
    .k { height: 26px; border: none; border-radius: 4px; cursor: pointer; padding: 0; font: bold 13px Helvetica, Arial, sans-serif;
      background: linear-gradient(#e9e9e4, #c9c9c2); color: #111; box-shadow: 0 3px 0 #8a8a84, 0 4px 2px rgba(0,0,0,.4); transition: transform .05s, box-shadow .05s; }
    .k.op { background: linear-gradient(#5a6b80, #3d4c5e); color: #fff; box-shadow: 0 3px 0 #22303d, 0 4px 2px rgba(0,0,0,.4); }
    .k.ac { background: linear-gradient(#f29a3e, #d8711a); color: #fff; box-shadow: 0 3px 0 #8a4410, 0 4px 2px rgba(0,0,0,.4); }
    .k.eq { background: linear-gradient(#3f82d9, #2a5fa8); color: #fff; box-shadow: 0 3px 0 #173a6b, 0 4px 2px rgba(0,0,0,.4); }
    .k:active { transform: translateY(3px); box-shadow: 0 0 0 #000, inset 0 1px 2px rgba(0,0,0,.3); }
    .k:focus-visible { outline: 2px solid #f29a3e; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="lcd"><span class="g">88888888</span><span class="v">0</span></div>
      <div class="keys">
        <button class="k" type="button">7</button><button class="k" type="button">8</button><button class="k" type="button">9</button><button class="k op" type="button">÷</button>
        <button class="k" type="button">4</button><button class="k" type="button">5</button><button class="k" type="button">6</button><button class="k op" type="button">×</button>
        <button class="k" type="button">1</button><button class="k" type="button">2</button><button class="k" type="button">3</button><button class="k op" type="button">−</button>
        <button class="k ac" type="button">AC</button><button class="k" type="button">0</button><button class="k eq" type="button">=</button><button class="k op" type="button">+</button>
      </div>
    </div>`,
  init(root) {
    const v = root.querySelector('.v');
    let cur = '0', acc = null, op = null, fresh = true;
    const show = (s) => { v.textContent = String(s).slice(0, 8); };
    const apply = () => { if (op === null || acc === null) return; const b = Number(cur); const a = acc;
      const r = op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : b === 0 ? 0 : a / b; cur = String(Number(r.toFixed(6))); show(cur); acc = null; op = null; };
    root.querySelectorAll('.k').forEach((k) => k.addEventListener('click', () => {
      const t = k.textContent;
      if (k.classList.contains('ac')) { cur = '0'; acc = null; op = null; fresh = true; return show(cur); }
      if (k.classList.contains('eq')) { apply(); fresh = true; return; }
      if (k.classList.contains('op')) { if (acc !== null) apply(); acc = Number(cur); op = t; fresh = true; return; }
      if (fresh || cur === '0') cur = t; else if (cur.length < 8) cur += t;
      fresh = false; show(cur);
    }));
  },
};
