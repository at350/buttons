export default {
  id: 'ks-gas-grade',
  credit: 'US gas pump (Gilbarco / Wayne) — sale and gallons readout, yellow 87 / 89 / 93 octane grade buttons with their 9/10¢ prices; hold the nozzle lever to pump',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; background: linear-gradient(#2b2e33, #17191c); font-family: Inter, system-ui, sans-serif; }
    .lcd { display: grid; grid-template-columns: auto 1fr; gap: 2px 10px; align-items: baseline; padding: 8px 12px; border-radius: 4px; background: linear-gradient(#cfd8c6, #b7c4ab); box-shadow: inset 0 2px 5px rgba(0,0,0,.4), 0 0 0 3px #0b0c0d; }
    .lcd span { font: 700 9px/1 Inter, sans-serif; letter-spacing: .08em; color: #3b4433; }
    .lcd b { font: 700 24px/1 'JetBrains Mono', ui-monospace, monospace; color: #1b2216; text-align: right; font-variant-numeric: tabular-nums; }
    .lcd b.sm { font-size: 17px; }
    .grades { display: grid; grid-template-columns: repeat(3, 76px); gap: 8px; margin-top: 12px; }
    .g { position: relative; height: 92px; border: 0; padding: 6px 4px; border-radius: 6px; cursor: pointer; background: linear-gradient(#3a3e44, #24272b); color: #fff; box-shadow: 0 3px 0 #0a0b0c, inset 0 1px 0 rgba(255,255,255,.12);
      display: flex; flex-direction: column; align-items: center; gap: 4px; transition: transform .06s, box-shadow .06s; -webkit-tap-highlight-color: transparent; }
    .g:active { transform: translateY(2px); box-shadow: 0 1px 0 #0a0b0c; }
    .g:focus-visible { outline: 2px solid #ffd500; outline-offset: 2px; }
    .oct { width: 46px; padding: 3px 0 2px; border-radius: 3px; background: #ffd500; color: #111; font: 800 20px/1 Inter, sans-serif; text-align: center; box-shadow: inset 0 0 0 1.5px #111; }
    .oct small { display: block; font-size: 5.5px; font-weight: 700; letter-spacing: .02em; }
    .nm { font-size: 9px; font-weight: 700; letter-spacing: .1em; }
    .pr { font: 600 11px/1 'JetBrains Mono', monospace; color: #ffd27a; }
    .pr sup { font-size: 7px; }
    .led { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; border-radius: 50%; background: #1f3322; }
    .g[aria-checked="true"] .led { background: #3cff6a; box-shadow: 0 0 6px #3cff6a; }
    .g[aria-checked="true"] { background: linear-gradient(#4a4f56, #2c3035); }
    .lever { width: 100%; height: 34px; margin-top: 10px; border: 0; border-radius: 17px; background: linear-gradient(#c8102e, #8f0b20); color: #fff; font: 700 11px/1 Inter, sans-serif; letter-spacing: .12em; cursor: pointer; touch-action: none; box-shadow: 0 3px 0 #4a0510; transition: transform .06s, box-shadow .06s, opacity .15s; }
    .lever:active, .lever.on { transform: translateY(2px); box-shadow: 0 1px 0 #4a0510; }
    .lever:disabled { opacity: .4; cursor: default; }
    .lever:focus-visible { outline: 2px solid #ffd500; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="lcd"><span>SALE $</span><b class="sale">0.00</b><span>GALLONS</span><b class="gal sm">0.000</b></div>
      <div class="grades" role="radiogroup" aria-label="Grade">
        <button class="g" type="button" role="radio" aria-checked="false" data-p="3.499"><span class="led"></span><span class="oct">87<small>(R+M)/2 METHOD</small></span><span class="nm">REGULAR</span><span class="pr">$3.49<sup>9</sup></span></button>
        <button class="g" type="button" role="radio" aria-checked="false" data-p="3.899"><span class="led"></span><span class="oct">89<small>(R+M)/2 METHOD</small></span><span class="nm">PLUS</span><span class="pr">$3.89<sup>9</sup></span></button>
        <button class="g" type="button" role="radio" aria-checked="false" data-p="4.299"><span class="led"></span><span class="oct">93<small>(R+M)/2 METHOD</small></span><span class="nm">PREMIUM</span><span class="pr">$4.29<sup>9</sup></span></button>
      </div>
      <button class="lever" type="button" disabled>HOLD TO PUMP</button>
    </div>`,
  init(root) {
    const gs = [...root.querySelectorAll('.g')], lever = root.querySelector('.lever'), sale = root.querySelector('.sale'), gal = root.querySelector('.gal');
    let price = 0, g = 0, raf = 0, last = 0;
    const draw = () => { gal.textContent = g.toFixed(3); sale.textContent = (g * price).toFixed(2); };
    gs.forEach((b) => b.addEventListener('click', () => { gs.forEach((x) => x.setAttribute('aria-checked', String(x === b))); price = +b.dataset.p; g = 0; draw(); lever.disabled = false; }));
    const tick = (ts) => { if (last) g = Math.min(99.999, g + (ts - last) / 1000 * 0.18); last = ts; draw(); raf = requestAnimationFrame(tick); };
    const start = (e) => { if (lever.disabled) return; if (e.pointerId !== undefined) lever.setPointerCapture(e.pointerId); lever.classList.add('on'); cancelAnimationFrame(raf); last = 0; raf = requestAnimationFrame(tick); };
    const stop = () => { lever.classList.remove('on'); cancelAnimationFrame(raf); raf = 0; };
    lever.addEventListener('pointerdown', start);
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => lever.addEventListener(ev, stop));
    lever.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !raf) { e.preventDefault(); start(e); } });
    lever.addEventListener('keyup', stop); lever.addEventListener('blur', stop);
    return stop;
  },
};
