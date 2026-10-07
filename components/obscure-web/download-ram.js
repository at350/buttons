export default {
  id: 'ob-download-ram',
  credit: '"DOWNLOAD MORE RAM" — the 2000s banner-ad scam button: glossy red, blinking FREE! star, a progress bar that installs 512 MB into your browser',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .ad { position: relative; width: 300px; max-width: 100%; padding: 14px 16px 12px; border: 3px solid #ffde00; border-radius: 12px; background: linear-gradient(#1b2a8a, #0b1448); display: grid; gap: 8px; font: 700 12px Arial, Helvetica, sans-serif; color: #fff; overflow: hidden; }
    .ram { display: flex; justify-content: center; gap: 3px; }
    .ram i { width: 10px; height: 18px; background: #0d3d0d; border: 1px solid #2a7a2a; border-radius: 1px; transition: background .2s, box-shadow .2s; }
    .ram i.on { background: #39ff14; box-shadow: 0 0 6px #39ff14; }
    .btn { position: relative; height: 46px; border: 2px solid #7a0000; border-radius: 8px; cursor: pointer; color: #fff; font: 900 15px/1 "Arial Black", Impact, Arial, sans-serif; letter-spacing: .5px; white-space: nowrap; text-shadow: 1px 1px 0 #600;
      background: linear-gradient(#ff5a5a 0, #e00 48%, #b00 52%, #d00); box-shadow: inset 0 1px 0 rgba(255,255,255,.6), 0 4px 0 #700, 0 6px 10px rgba(0,0,0,.5); transition: transform .06s, box-shadow .06s; }
    .btn:hover { background: linear-gradient(#ff7a7a 0, #f00 48%, #c00 52%, #e00); }
    .btn:active { transform: translateY(3px); box-shadow: inset 0 1px 0 rgba(255,255,255,.6), 0 1px 0 #700; }
    .btn:focus-visible { outline: 3px dotted #ffde00; outline-offset: 3px; }
    .btn.busy { cursor: progress; background: linear-gradient(#999, #666); border-color: #333; text-shadow: none; box-shadow: 0 4px 0 #333; }
    .btn.done { background: linear-gradient(#5aff5a, #0a0); border-color: #060; box-shadow: 0 4px 0 #040; }
    .free { position: absolute; right: -10px; top: -14px; width: 50px; height: 50px; z-index: 1; display: grid; place-items: center; color: #000; font: 900 11px "Arial Black", Arial, sans-serif; transform: rotate(14deg); pointer-events: none; animation: blink .5s steps(1) infinite; }
    .free svg { position: absolute; inset: 0; fill: #ffde00; }
    .free span { position: relative; }
    @keyframes blink { 50% { opacity: 0; } }
    .bar { height: 14px; border: 1px solid #fff; background: #000; position: relative; overflow: hidden; }
    .bar i { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: repeating-linear-gradient(90deg, #39ff14 0 8px, #000 8px 10px); transition: width .25s linear; }
    .bar b { position: absolute; inset: 0; display: grid; place-items: center; font: 700 10px Verdana, sans-serif; color: #fff; text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000; }
  `,
  html: `
    <div class="ad">
      <div class="ram" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <button class="btn" type="button">DOWNLOAD MORE RAM</button>
      <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="512" aria-valuenow="0"><i></i><b>0 MB / 512 MB</b></div>
      <span class="free" aria-hidden="true"><svg viewBox="0 0 54 54"><path d="M27 2l6 9 10-3-1 10 10 4-8 7 5 9-11 1-3 10-8-7-8 7-3-10-11-1 5-9-8-7 10-4-1-10 10 3z"/></svg><span>FREE!</span></span>
    </div>`,
  init(root) {
    const btn = root.querySelector('.btn'), bar = root.querySelector('.bar'), fill = root.querySelector('.bar i'), txt = root.querySelector('.bar b'), chips = [...root.querySelectorAll('.ram i')];
    let iv = 0, mb = 0, state = 'idle';
    const stop = () => { clearInterval(iv); iv = 0; };
    const paint = () => {
      fill.style.width = (mb / 512 * 100) + '%'; txt.textContent = `${mb} MB / 512 MB`; bar.setAttribute('aria-valuenow', String(mb));
      chips.forEach((c, i) => c.classList.toggle('on', mb >= (i + 1) * 64));
    };
    btn.addEventListener('click', () => {
      stop();
      if (state !== 'idle') { state = 'idle'; mb = 0; btn.className = 'btn'; btn.textContent = 'DOWNLOAD MORE RAM'; paint(); return; }
      state = 'busy'; btn.classList.add('busy'); btn.textContent = 'DOWNLOADING...';
      iv = setInterval(() => {
        mb = Math.min(512, mb + 8 + Math.floor(Math.random() * 24)); paint();
        if (mb >= 512) { stop(); state = 'done'; btn.classList.remove('busy'); btn.classList.add('done'); btn.textContent = 'RAM INSTALLED!'; }
      }, 120);
    });
    paint();
    return stop;
  },
};
