export default {
  id: 'ks-pharmacy-pickup',
  credit: 'Pharmacy prescription pickup locker kiosk — enter your 6-digit pickup code on the touch keypad and your locker door pops open',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 10px; padding: 12px; border-radius: 12px; background: linear-gradient(#e6e8ea, #b9bec4); font-family: Inter, system-ui, sans-serif; }
    .scr { width: 186px; padding: 10px; border-radius: 6px; background: #fff; box-shadow: 0 0 0 6px #2b2f33; color: #222; }
    .hd { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #cc0000; }
    .hd svg { width: 16px; height: 16px; }
    .p { margin: 6px 0 6px; font-size: 11px; color: #555; white-space: nowrap; height: 14px; }
    .dots { display: flex; justify-content: center; gap: 7px; margin-bottom: 8px; }
    .dots i { width: 12px; height: 12px; border-radius: 50%; box-shadow: inset 0 0 0 2px #b8bec5; transition: background .1s, box-shadow .1s; }
    .dots i.on { background: #cc0000; box-shadow: none; }
    .dots.bad { animation: sh .35s; } @keyframes sh { 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    .pad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
    .k { height: 30px; border: 0; border-radius: 5px; background: #f1f3f5; cursor: pointer; font: 600 14px/1 Inter, sans-serif; color: #222; box-shadow: inset 0 0 0 1px #dfe3e7; transition: background .08s, transform .05s; }
    .k:hover { background: #e7eaee; } .k:active { transform: scale(.95); background: #ffe1e1; }
    .k:focus-visible { outline: 2px solid #cc0000; outline-offset: 1px; }
    .k.ok { background: #cc0000; color: #fff; box-shadow: none; font-size: 12px; }
    .k svg { width: 16px; height: 16px; vertical-align: middle; }
    .lk { display: grid; grid-template-columns: repeat(2, 54px); grid-template-rows: 2fr 2fr 3fr 3.4fr; gap: 4px; padding: 5px; border-radius: 6px; background: linear-gradient(#6d737a, #555b62); box-shadow: inset 0 1px 0 rgba(255,255,255,.3), 0 1px 2px rgba(0,0,0,.25); perspective: 320px; }
    .d { position: relative; border-radius: 2px; background: radial-gradient(ellipse at 50% 0%, #4a5058, #15171a 75%); box-shadow: inset 0 2px 4px #000; }
    .d .door { position: absolute; inset: 0; border-radius: 2px; transform-origin: 0 50%; transition: transform .55s cubic-bezier(.3,1.25,.5,1); z-index: 1;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px), linear-gradient(90deg, #c9ced3, #eef0f2 32%, #d3d7db 68%, #bfc4c9); box-shadow: inset 0 0 0 1px #8e959c, inset 1px 1px 0 rgba(255,255,255,.7); }
    .d .no { position: absolute; left: 4px; top: 4px; padding: 2px 4px; border-radius: 2px; background: #2b2f34; color: #fff; font: 700 8px/1 Inter, sans-serif; }
    .d .latch { position: absolute; right: 5px; top: 50%; width: 4px; height: 16px; margin-top: -8px; border-radius: 2px; background: linear-gradient(90deg, #3b4046, #8a9097); box-shadow: inset 0 1px 1px rgba(0,0,0,.5); }
    .d .led { position: absolute; right: 4px; top: 5px; width: 5px; height: 5px; border-radius: 50%; background: #5d2a2a; box-shadow: inset 0 0 0 1px rgba(0,0,0,.4); }
    .d .hinge { position: absolute; left: 0; width: 2px; height: 7px; background: #7d848b; }
    .d .hinge.t { top: 5px; } .d .hinge.b { bottom: 5px; }
    .d.open .door { transform: rotateY(-72deg); background: linear-gradient(90deg, #8f959b, #c3c8cd); }
    .d.open .door > * { visibility: hidden; }
        .d.open { box-shadow: inset 0 2px 4px #000, 0 0 0 2px #2bd94b, 0 0 10px rgba(43,217,75,.55); }
    .d svg { position: absolute; right: 3px; bottom: 3px; width: 34px; height: 38px; }
  `,
  html: `
    <div class="stage">
      <div class="scr">
        <div class="hd"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>Prescription pickup</div>
        <div class="p" aria-live="polite">Enter your pickup code</div>
        <div class="dots"><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="pad"></div>
      </div>
      <div class="lk" aria-hidden="true"></div>
    </div>`,
  init(root) {
    const pad = root.querySelector('.pad'), p = root.querySelector('.p'), dots = root.querySelector('.dots'), di = [...dots.children], lk = root.querySelector('.lk');
    const bag = '<svg viewBox="0 0 36 40" aria-hidden="true"><path d="M5 11h26l-1.6 28H6.6z" fill="#fbfaf6"/><path d="M5 11h5l-1 28H6.6z" fill="#000" opacity=".07"/><path d="M4 6h28v6.5H4z" fill="#cc0000"/><path d="M4 12.5h28" stroke="#9e0000" stroke-width=".8"/><rect x="16.5" y="8.4" width="4" height="1.1" fill="#d9d9d9"/><rect x="9" y="17" width="18" height="13" rx="1" fill="#fff" stroke="#d6d6d6" stroke-width=".6"/><text x="11" y="21.6" font-family="Inter, sans-serif" font-size="4.2" font-weight="800" fill="#cc0000">Rx</text><path d="M18 20.3h7M11 24h14M11 27h9" stroke="#9aa3ab" stroke-width="1"/></svg>';
    const doors = [11, 12, 13, 14, 15, 16, 17, 18].map((n) => { const d = document.createElement('div'); d.className = 'd'; d.dataset.n = n; d.innerHTML = `${bag}<span class="door"><i class="hinge t"></i><i class="hinge b"></i><b class="no">${n}</b><i class="led"></i><i class="latch"></i></span>`; lk.appendChild(d); return d; });
    let v = '', opened = null, tries = 0;
    const draw = () => di.forEach((d, i) => d.classList.toggle('on', i < v.length));
    const press = (k) => {
      if (opened) { opened.classList.remove('open'); opened = null; p.textContent = 'Enter your pickup code'; }
      if (k === 'del') v = v.slice(0, -1);
      else if (k === 'ok') {
        if (v.length < 6) { dots.classList.remove('bad'); void dots.offsetWidth; dots.classList.add('bad'); p.textContent = 'Code is 6 digits'; return; }
        tries++; opened = doors[(+v[5] + tries) % doors.length]; opened.classList.add('open');
        p.textContent = 'Locker ' + opened.dataset.n + ' is open'; v = '';
      } else if (v.length < 6) v += k;
      draw();
    };
    const del = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg>';
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'].forEach((k) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'k' + (k === 'ok' ? ' ok' : '');
      b.innerHTML = k === 'del' ? del : k === 'ok' ? 'OK' : k; if (k === 'del') b.setAttribute('aria-label', 'Delete');
      b.addEventListener('click', () => press(k)); pad.appendChild(b);
    });
  },
};
