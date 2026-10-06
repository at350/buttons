export default {
  id: 'ob-lings-cars',
  credit: 'LINGsCARS.com — maximalist chaos: flashing rainbow "CLICK HERE!!!" with spinning stars, dashed borders and seizure-grade colour cycling',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; max-width: 100%; height: 150px; border-radius: 12px; overflow: hidden; display: grid; place-items: center;
      background: repeating-linear-gradient(45deg, #ff00ff 0 12px, #ffff00 12px 24px, #00ffff 24px 36px, #00ff00 36px 48px); }
    .stage.go { animation: bgmove .4s linear infinite; }
    @keyframes bgmove { to { background-position: 68px 0; } }
    .btn { position: relative; border: 4px dashed #000; background: #ff0000; color: #ffff00; padding: 12px 20px; cursor: pointer;
      font: 900 22px/1 Impact, "Arial Black", Arial, sans-serif; letter-spacing: 1px; text-shadow: 2px 2px 0 #0000ff, -2px -2px 0 #00ff00; transform: rotate(-4deg);
      box-shadow: 6px 6px 0 #000; transition: transform .1s; }
    .btn:hover { transform: rotate(4deg) scale(1.08); }
    .btn:active { transform: rotate(-2deg) scale(.96); }
    .btn:focus-visible { outline: 4px dotted #fff; outline-offset: 3px; }
    .go .btn { animation: flash .18s steps(1) infinite, wob .5s ease-in-out infinite alternate; }
    @keyframes flash { 0% { background: #ff0000; color: #ffff00; } 25% { background: #0000ff; color: #fff; } 50% { background: #00ff00; color: #ff00ff; } 75% { background: #ffff00; color: #ff0000; } }
    @keyframes wob { from { transform: rotate(-8deg) scale(1); } to { transform: rotate(8deg) scale(1.12); } }
    .star { position: absolute; width: 36px; height: 36px; pointer-events: none; }
    .star svg { width: 100%; height: 100%; fill: #ffff00; stroke: #ff0000; stroke-width: 2; }
    .s1 { left: 10px; top: 10px; } .s2 { right: 14px; top: 20px; } .s3 { left: 30px; bottom: 10px; } .s4 { right: 30px; bottom: 6px; }
    .go .star { animation: spin 1s linear infinite; } .go .s2, .go .s3 { animation-direction: reverse; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .ling { position: absolute; left: 50%; top: 6px; transform: translateX(-50%); font: 900 11px "Arial Black", Arial, sans-serif; color: #fff; background: #ff00ff; padding: 2px 6px; border: 2px solid #000; }
    .go .ling { animation: flash .3s steps(1) infinite reverse; }
    .tick { position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); font: 700 11px Verdana, sans-serif; color: #000; background: #fff; padding: 1px 6px; border: 1px solid #000; white-space: nowrap; }
  `,
  html: `
    <div class="stage">
      <span class="star s1" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 1l3 7 7 .6-5.3 4.8L18.5 21 12 17.3 5.5 21l1.8-7.6L2 8.6 9 8z"/></svg></span>
      <span class="star s2" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 1l3 7 7 .6-5.3 4.8L18.5 21 12 17.3 5.5 21l1.8-7.6L2 8.6 9 8z"/></svg></span>
      <span class="star s3" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 1l3 7 7 .6-5.3 4.8L18.5 21 12 17.3 5.5 21l1.8-7.6L2 8.6 9 8z"/></svg></span>
      <span class="star s4" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 1l3 7 7 .6-5.3 4.8L18.5 21 12 17.3 5.5 21l1.8-7.6L2 8.6 9 8z"/></svg></span>
      <span class="ling" aria-hidden="true">LING SAYS:</span>
      <button class="btn" type="button" aria-pressed="false">CLICK HERE!!!</button>
      <span class="tick">0 CLICKS</span>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), btn = root.querySelector('.btn'), tick = root.querySelector('.tick');
    let n = 0, on = false;
    stage.addEventListener('mouseenter', () => stage.classList.add('go'));
    stage.addEventListener('mouseleave', () => { if (!on) stage.classList.remove('go'); });
    btn.addEventListener('click', () => {
      n++; on = !on;
      btn.textContent = on ? 'NO!! CLICK AGAIN!!!' : 'CLICK HERE!!!';
      btn.setAttribute('aria-pressed', String(on));
      stage.classList.toggle('go', on || stage.matches(':hover'));
      tick.textContent = `${n} CLICK${n === 1 ? '' : 'S'}`;
    });
  },
};
