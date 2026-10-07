export default {
  id: 'ks-tip-prompt',
  credit: 'Square Terminal tip screen — "Add a tip" with 15% / 20% / 25% / Custom tiles and No Tip; picks turn Square blue and the total updates',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px; border-radius: 12px; background: linear-gradient(#f7f7f5, #dcdcd8); box-shadow: inset 0 1px 0 #fff, 0 1px 2px rgba(0,0,0,.15); }
    .glass { position: relative; width: 286px; padding: 16px 16px 14px; border-radius: 8px; background: #fff; box-shadow: 0 0 0 6px #111, 0 0 0 7px #3a3a3a; font-family: Inter, system-ui, sans-serif; color: #1a1a1a; overflow: hidden; }
    .glass::after { content: ''; position: absolute; inset: 0; background: linear-gradient(125deg, rgba(255,255,255,.0) 55%, rgba(255,255,255,.12) 60%, rgba(255,255,255,0) 72%); pointer-events: none; }
    .amt { font-size: 13px; color: #6b6b6b; text-align: center; }
    h2 { margin: 2px 0 12px; font-size: 22px; font-weight: 700; text-align: center; letter-spacing: -.01em; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .t { height: 58px; border: 1px solid rgba(0,0,0,.12); border-radius: 6px; background: #f2f2f2; cursor: pointer; font: 600 18px/1.1 Inter, system-ui, sans-serif; color: #1a1a1a;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; transition: background .12s, color .12s, border-color .12s, transform .08s; -webkit-tap-highlight-color: transparent; }
    .t small { font-size: 12px; font-weight: 500; color: #6b6b6b; }
    .t:hover { background: #e8e8e8; }
    .t:active { transform: scale(.97); }
    .t:focus-visible { outline: 2px solid #006aff; outline-offset: 2px; }
    .t[aria-checked="true"] { background: #006aff; border-color: #006aff; color: #fff; }
    .t[aria-checked="true"] small { color: rgba(255,255,255,.85); }
    .no { grid-column: 1 / 3; height: 44px; font-size: 15px; }
    .step { display: none; align-items: center; justify-content: space-between; height: 44px; padding: 0 6px; border-radius: 6px; background: #eef4ff; box-shadow: inset 0 0 0 1px #b9d3ff; }
    .step.on { display: flex; }
    .grid:has(.step.on) .no { grid-column: auto; }
    .step button { width: 30px; height: 30px; padding: 0; border-radius: 50%; border: 1px solid rgba(0,0,0,.15); background: #fff; cursor: pointer; font: 600 18px/1 Inter, sans-serif; color: #006aff; }
    .step button:focus-visible { outline: 2px solid #006aff; outline-offset: 2px; }
    .step span { min-width: 52px; text-align: center; font-weight: 600; font-size: 16px; }
    .tot { margin-top: 12px; display: flex; justify-content: space-between; font-size: 13px; color: #6b6b6b; border-top: 1px solid #eee; padding-top: 8px; }
    .tot b { color: #1a1a1a; font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="stage"><div class="glass">
      <div class="amt">$24.50</div>
      <h2>Add a tip</h2>
      <div class="grid" role="radiogroup" aria-label="Tip">
        <button class="t" type="button" role="radio" aria-checked="false" data-v="3.68">15%<small>$3.68</small></button>
        <button class="t" type="button" role="radio" aria-checked="false" data-v="4.90">20%<small>$4.90</small></button>
        <button class="t" type="button" role="radio" aria-checked="false" data-v="6.13">25%<small>$6.13</small></button>
        <button class="t" type="button" role="radio" aria-checked="false" data-v="c">Custom<small>Amount</small></button>
        <button class="t no" type="button" role="radio" aria-checked="false" data-v="0">No Tip</button>
        <div class="step"><button type="button" aria-label="Less" data-d="-1">−</button><span>$5.00</span><button type="button" aria-label="More" data-d="1">+</button></div>
      </div>
      <div class="tot"><span>Total</span><b>$24.50</b></div>
    </div></div>`,
  init(root) {
    const tiles = [...root.querySelectorAll('.t')], step = root.querySelector('.step'), cv = step.querySelector('span'), tot = root.querySelector('.tot b');
    let custom = 5, sel = null;
    const f = (n) => '$' + n.toFixed(2);
    const render = () => {
      const tip = sel === null ? 0 : sel.dataset.v === 'c' ? custom : +sel.dataset.v;
      tot.textContent = f(24.5 + tip); cv.textContent = f(custom);
      step.classList.toggle('on', !!sel && sel.dataset.v === 'c');
      tiles[3].querySelector('small').textContent = sel === tiles[3] ? f(custom) : 'Amount';
    };
    tiles.forEach((t) => t.addEventListener('click', () => { sel = t; tiles.forEach((x) => x.setAttribute('aria-checked', String(x === t))); render(); }));
    step.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { custom = Math.max(0, Math.min(99, custom + +b.dataset.d)); render(); }));
  },
};
