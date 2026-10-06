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
    .lk { display: grid; grid-template-columns: repeat(2, 40px); grid-auto-rows: 44px; gap: 4px; padding: 6px; border-radius: 6px; background: #8d939a; box-shadow: inset 0 2px 4px rgba(0,0,0,.3); perspective: 300px; align-content: start; }
    .d { position: relative; border-radius: 3px; background: #22252a; }
    .d span { position: absolute; inset: 0; border-radius: 3px; background: linear-gradient(135deg, #f5f6f7, #c9ced4); box-shadow: inset 0 0 0 1px #9aa1a8; transform-origin: 0 50%; transition: transform .5s cubic-bezier(.3,1.3,.5,1); display: flex; align-items: flex-start; justify-content: center; padding-top: 4px; font: 700 9px/1 Inter, sans-serif; color: #555; }
    .d span::after { content: ''; position: absolute; right: 5px; top: 50%; width: 3px; height: 10px; margin-top: -5px; border-radius: 2px; background: #555; }
    .d.open span { transform: rotateY(-70deg); }
    .d.open { box-shadow: inset 0 0 0 2px #2bd94b, 0 0 8px rgba(43,217,75,.6); }
    .d i { position: absolute; left: 7px; right: 7px; bottom: 6px; height: 16px; border-radius: 2px; background: #fff; border-top: 4px solid #cc0000; }
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
    const doors = [11, 12, 13, 14, 15, 16].map((n) => { const d = document.createElement('div'); d.className = 'd'; d.innerHTML = `<i></i><span>${n}</span>`; lk.appendChild(d); return d; });
    let v = '', opened = null, tries = 0;
    const draw = () => di.forEach((d, i) => d.classList.toggle('on', i < v.length));
    const press = (k) => {
      if (opened) { opened.classList.remove('open'); opened = null; p.textContent = 'Enter your pickup code'; }
      if (k === 'del') v = v.slice(0, -1);
      else if (k === 'ok') {
        if (v.length < 6) { dots.classList.remove('bad'); void dots.offsetWidth; dots.classList.add('bad'); p.textContent = 'Code is 6 digits'; return; }
        tries++; opened = doors[(+v[5] + tries) % 6]; opened.classList.add('open');
        p.textContent = 'Locker ' + opened.textContent + ' is open'; v = '';
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
