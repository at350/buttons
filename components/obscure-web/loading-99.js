export default {
  id: 'ob-loading-99',
  credit: 'The progress bar that gets stuck at 99% — races to 99, then stalls forever; only a click on the bar finishes it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { width: 300px; max-width: 100%; padding: 16px; background: #fff; border: 1px solid #ccc; border-radius: 12px; font: 13px/1.3 Tahoma, Verdana, system-ui, sans-serif; color: #222; display: grid; gap: 10px; box-shadow: 0 2px 10px rgba(0,0,0,.08); }
    .hd { display: flex; justify-content: space-between; align-items: baseline; }
    .pct { font: 700 13px/1 ui-monospace, "JetBrains Mono", monospace; font-variant-numeric: tabular-nums; }
    .bar { position: relative; height: 18px; border: 1px solid #8e8f8f; border-radius: 3px; background: #e6e6e6; overflow: hidden; cursor: pointer; padding: 0; width: 100%; display: block; }
    .bar:focus-visible { outline: 2px solid #06b025; outline-offset: 2px; }
    .fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: linear-gradient(#b4f1c0, #06b025 50%, #04901e); transition: width .18s ease-out; }
    .fill::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent); transform: translateX(-100%); }
    .box.stuck .fill::after { animation: sheen 1.4s ease-in-out infinite; }
    @keyframes sheen { to { transform: translateX(100%); } }
    .box.done .fill { background: linear-gradient(#cfe8ff, #2a7bff 50%, #1f5fd0); }
    .msg { color: #555; min-height: 16px; font-size: 12px; }
    .box.stuck .msg::after { content: "…"; animation: dots 1s steps(3) infinite; display: inline-block; width: 1em; overflow: hidden; vertical-align: bottom; }
    @keyframes dots { to { width: 0; } }
    .foot { display: flex; justify-content: flex-end; }
    .cancel { font: 12px Tahoma, Verdana, system-ui, sans-serif; padding: 3px 14px; border: 1px solid #707070; border-radius: 3px; background: linear-gradient(#f2f2f2, #dcdcdc); cursor: pointer; color: #222; }
    .cancel:hover { background: linear-gradient(#eaf6fd, #bee6fd); border-color: #3c7fb1; }
    .cancel:focus-visible { outline: 1px dotted #000; outline-offset: -3px; }
  `,
  html: `
    <div class="box">
      <div class="hd"><span class="ttl">Loading</span><span class="pct">0%</span></div>
      <button class="bar" type="button" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Progress"><span class="fill"></span></button>
      <div class="msg">Click to start</div>
      <div class="foot"><button class="cancel" type="button">Cancel</button></div>
    </div>`,
  init(root) {
    const box = root.querySelector('.box'), bar = root.querySelector('.bar'), fill = root.querySelector('.fill'), pct = root.querySelector('.pct'), msg = root.querySelector('.msg'), cancel = root.querySelector('.cancel'), ttl = root.querySelector('.ttl');
    let p = 0, iv = 0, state = 'idle';
    const stop = () => { clearInterval(iv); iv = 0; };
    const paint = () => { fill.style.width = p + '%'; pct.textContent = p + '%'; bar.setAttribute('aria-valuenow', String(p)); };
    const reset = () => { stop(); state = 'idle'; p = 0; box.className = 'box'; ttl.textContent = 'Loading'; msg.textContent = 'Click to start'; paint(); };
    bar.addEventListener('click', () => {
      if (state === 'idle') {
        state = 'run'; msg.textContent = 'Please wait';
        iv = setInterval(() => {
          p = Math.min(99, p + (p < 80 ? 3 + Math.floor(Math.random() * 6) : 1)); paint();
          if (p >= 99) { stop(); state = 'stuck'; box.classList.add('stuck'); msg.textContent = 'Almost there'; }
        }, 90);
      } else if (state === 'stuck') { state = 'done'; p = 100; box.classList.remove('stuck'); box.classList.add('done'); ttl.textContent = 'Complete'; msg.textContent = 'Done.'; paint(); }
      else if (state === 'done') reset();
    });
    cancel.addEventListener('click', reset);
    paint();
    return stop;
  },
};
