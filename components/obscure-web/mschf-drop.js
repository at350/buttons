export default {
  id: 'ob-mschf-drop',
  credit: 'MSCHF drop button — monospace black-on-red countdown that ticks to zero, then "SOLD OUT" gets struck through',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 280px; max-width: 100%; padding: 22px; background: #ff0000; border-radius: 12px; display: grid; gap: 10px; font: 700 12px/1 "JetBrains Mono", ui-monospace, monospace; color: #000; }
    .hd { display: flex; justify-content: space-between; letter-spacing: 1px; }
    .btn { position: relative; height: 56px; border: 3px solid #000; background: #000; color: #fff; cursor: pointer; font: 700 16px/1 "JetBrains Mono", ui-monospace, monospace; letter-spacing: 2px; text-transform: uppercase; transition: background .1s, color .1s; font-variant-numeric: tabular-nums; }
    .btn:hover { background: #fff; color: #000; }
    .btn:active { transform: translate(2px, 2px); }
    .btn:focus-visible { outline: 3px solid #000; outline-offset: 3px; }
    .btn.live { background: #fff; color: #000; animation: blink .5s steps(1) infinite; }
    @keyframes blink { 50% { background: #000; color: #fff; } }
    .btn.out { background: #ff0000; color: #000; cursor: default; }
    .btn.out .t { text-decoration: line-through; text-decoration-thickness: 3px; }
    .btn.out:hover { background: #ff0000; color: #000; }
    .bar { height: 6px; background: rgba(0,0,0,.2); position: relative; overflow: hidden; }
    .bar i { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: #000; transition: width .5s linear; }
  `,
  html: `
    <div class="stage">
      <div class="hd"><span>DROP #93</span><span class="n">1,000 UNITS</span></div>
      <button class="btn" type="button"><span class="t">NOTIFY ME</span></button>
      <div class="bar" aria-hidden="true"><i></i></div>
    </div>`,
  init(root) {
    const btn = root.querySelector('.btn'), t = root.querySelector('.t'), bar = root.querySelector('.bar i'), units = root.querySelector('.n');
    const TOTAL = 1000;
    let iv = 0, left = 10, state = 'idle';
    const stop = () => { clearInterval(iv); iv = 0; };
    const fmt = (s) => `00:00:${String(s).padStart(2, '0')}`;
    btn.addEventListener('click', () => {
      stop();
      if (state === 'idle') {
        state = 'live'; left = 10; btn.classList.add('live'); t.textContent = fmt(left);
        iv = setInterval(() => {
          left--; t.textContent = fmt(left);
          const sold = Math.round(TOTAL * (10 - left) / 10);
          bar.style.width = (sold / TOTAL * 100) + '%';
          units.textContent = `${(TOTAL - sold).toLocaleString('en-US')} UNITS`;
          if (left <= 0) { stop(); state = 'out'; btn.classList.remove('live'); btn.classList.add('out'); t.textContent = 'SOLD OUT'; }
        }, 1000);
      } else {
        state = 'idle'; btn.classList.remove('live', 'out'); t.textContent = 'NOTIFY ME'; bar.style.width = '0'; units.textContent = '1,000 UNITS';
      }
    });
    return stop;
  },
};
