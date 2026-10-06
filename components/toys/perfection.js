const SH = [
  '<circle cx="12" cy="12" r="9"/>', '<rect x="3.5" y="3.5" width="17" height="17" rx="1"/>', '<path d="M12 2.5 L21.5 20 H2.5 Z"/>',
  '<path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z"/>', '<path d="M7 3 H17 L22 12 L17 21 H7 L2 12 Z"/>',
  '<path d="M9 3 H15 V9 H21 V15 H15 V21 H9 V15 H3 V9 H9 Z"/>', '<path d="M12 2 L21 12 L12 22 L3 12 Z"/>',
  '<path d="M12 21 C5 15 2 11 2 7.5 A4.5 4.5 0 0 1 12 6 A4.5 4.5 0 0 1 22 7.5 C22 11 19 15 12 21 Z"/>', '<path d="M12 2 L22 9.5 L18 21 H6 L2 9.5 Z"/>',
];
const svg = (i) => `<svg viewBox="0 0 24 24" aria-hidden="true">${SH[i]}</svg>`;
const ORDER = [4, 0, 7, 2, 8, 5, 1, 6, 3];

export default {
  id: 'ty2-perfection',
  credit: 'Lakeside / Hasbro Perfection (1973) — push the red plunger to wind the timer, fit every shape before it runs out or the board pops up',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 252px; height: 236px; border-radius: 12px; overflow: hidden; background: linear-gradient(#d8e9ff, #a9c8f0); }
    .base { position: absolute; left: 12px; top: 12px; width: 160px; height: 160px; border-radius: 16px; background: linear-gradient(#1a5fb4, #0f3f7f); box-shadow: 0 6px 0 #0b2e5c, 0 8px 12px rgba(0,0,0,.3); }
    .board { position: absolute; inset: 6px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; padding: 10px; border-radius: 12px;
      background: linear-gradient(150deg, #ffe45c, #f7c600 50%, #d9a900); box-shadow: inset 0 2px 0 rgba(255,255,255,.6), inset 0 -3px 0 rgba(0,0,0,.12); transform-origin: 50% 100%; }
    .board.pop { animation: pop .6s cubic-bezier(.2,1.6,.4,1); }
    @keyframes pop { 30% { transform: perspective(300px) rotateX(28deg) translateY(-14px); } }
    .hole { position: relative; display: grid; place-items: center; }
    .hole > svg { width: 36px; height: 36px; fill: #3a2a00; filter: drop-shadow(0 1px 0 rgba(255,255,255,.5)); }
    .hole .pc { position: absolute; left: 50%; top: 50%; margin: -18px; }
    .pc { width: 36px; height: 36px; border: 0; padding: 0; background: none; cursor: pointer; transition: transform .15s; }
    .pc svg { width: 100%; height: 100%; fill: #ff7a1a; filter: drop-shadow(0 2px 0 #a84600) drop-shadow(0 3px 2px rgba(0,0,0,.3)); }
    .pc:hover { transform: translateY(-2px) rotate(-6deg); }
    .pc:focus-visible { outline: 2px solid #1a5fb4; outline-offset: 1px; border-radius: 6px; }
    .hole .pc { cursor: default; } .hole .pc:hover { transform: none; }
    .tray { position: absolute; left: 12px; right: 12px; top: 186px; display: flex; justify-content: space-between; height: 36px; }
    .tray .pc { width: 24px; height: 24px; margin-top: 6px; }
    .timer { position: absolute; left: 184px; top: 16px; width: 58px; height: 58px; border-radius: 50%;
      background: radial-gradient(circle, #fff 0 18%, transparent 19%), conic-gradient(#e3262d calc(var(--t, 0) * 1turn), #f4f4ef 0); box-shadow: 0 0 0 5px #1a5fb4, 0 3px 6px rgba(0,0,0,.3); }
    .timer::after { content: ''; position: absolute; left: 28px; top: 6px; width: 2px; height: 23px; background: #222; transform-origin: 1px 23px; transform: rotate(calc(var(--t, 0) * 360deg)); }
    .plunger { position: absolute; left: 194px; top: 96px; width: 38px; height: 70px; border: 0; padding: 0; background: none; cursor: pointer; }
    .plunger::before { content: ''; position: absolute; left: 15px; top: 20px; width: 8px; height: 50px; background: linear-gradient(90deg, #888, #eee, #888); }
    .plunger::after { content: ''; position: absolute; left: 0; top: 8px; width: 38px; height: 20px; border-radius: 50% 50% 8px 8px;
      background: radial-gradient(circle at 40% 30%, #ff8a80, #e3262d 50%, #9b1015); box-shadow: 0 4px 0 #5c070a; transition: transform .15s cubic-bezier(.3,1.6,.5,1); }
    .plunger:active::after, .plunger.down::after { transform: translateY(18px); }
    .plunger:focus-visible { outline: 2px solid #fff; outline-offset: 2px; border-radius: 8px; }
  `,
  html: `
    <div class="stage">
      <div class="base"><div class="board">${ORDER.map((i) => `<div class="hole" data-s="${i}">${svg(i)}</div>`).join('')}</div></div>
      <span class="timer"></span>
      <button class="plunger" type="button" aria-label="start timer"></button>
      <div class="tray">${SH.map((_, i) => `<button class="pc" type="button" data-s="${i}" aria-label="shape ${i + 1}">${svg(i)}</button>`).join('')}</div>
    </div>`,
  init(root) {
    const timer = root.querySelector('.timer'), board = root.querySelector('.board'), tray = root.querySelector('.tray'), plunger = root.querySelector('.plunger');
    const pcs = [...root.querySelectorAll('.tray .pc')];
    const DUR = 30; let left = 0, iv = 0, t = 0;
    const flip = (el, into) => { const a = el.getBoundingClientRect(); into.appendChild(el); const b = el.getBoundingClientRect();
      el.animate([{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width})` }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.3,1.3,.5,1)' }); };
    const stop = () => { clearInterval(iv); iv = 0; };
    const reset = () => pcs.forEach((p) => { if (p.parentElement !== tray) flip(p, tray); else tray.appendChild(p); });
    const popUp = () => {
      stop(); board.classList.remove('pop'); void board.offsetWidth; board.classList.add('pop');
      clearTimeout(t); t = setTimeout(reset, 180);
    };
    pcs.forEach((p) => p.addEventListener('click', () => {
      if (p.parentElement !== tray) return;
      flip(p, root.querySelector(`.hole[data-s="${p.dataset.s}"]`));
      if (pcs.every((q) => q.parentElement !== tray)) stop();
    }));
    plunger.addEventListener('click', () => {
      reset(); stop(); left = DUR; timer.style.setProperty('--t', 1); plunger.classList.add('down'); setTimeout(() => plunger.classList.remove('down'), 180);
      iv = setInterval(() => { left -= 0.5; timer.style.setProperty('--t', left / DUR); if (left <= 0) popUp(); }, 500);
    });
    return () => { stop(); clearTimeout(t); };
  },
};
