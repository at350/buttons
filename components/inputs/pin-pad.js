export default {
  id: 'in-pin-pad',
  credit: 'Lock-screen PIN pad — four dots fill as you tap, flash green at four digits and reset (iOS passcode)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pad { display: inline-flex; flex-direction: column; align-items: center; gap: 16px; padding: 18px 16px; border-radius: 22px; background: #0f1016; }
    .dots { display: flex; gap: 14px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid #fff; background: transparent; transition: background .15s, transform .15s, border-color .2s; }
    .dot.on { background: #fff; transform: scale(1.15); }
    .pad.ok .dot { background: #30d158; border-color: #30d158; }
    .pad.shake .dots { animation: shake .4s; }
    @keyframes shake { 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }
    .grid { display: grid; grid-template-columns: repeat(3, 56px); gap: 12px; }
    .k {
      width: 56px; height: 56px; border-radius: 50%; border: 0; padding: 0; background: rgba(255,255,255,.14); color: #fff; font: 400 24px system-ui, sans-serif; cursor: pointer;
      display: grid; place-items: center; transition: background .12s; -webkit-tap-highlight-color: transparent;
    }
    .k:hover { background: rgba(255,255,255,.22); }
    .k:active { background: rgba(255,255,255,.55); transition: none; }
    .k:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .k.ghost { background: none; cursor: default; }
    .k.del svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `<div class="pad" role="group" aria-label="Passcode">
    <div class="dots" aria-live="polite"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
    <div class="grid">
      <button class="k" type="button">1</button><button class="k" type="button">2</button><button class="k" type="button">3</button>
      <button class="k" type="button">4</button><button class="k" type="button">5</button><button class="k" type="button">6</button>
      <button class="k" type="button">7</button><button class="k" type="button">8</button><button class="k" type="button">9</button>
      <span class="k ghost" aria-hidden="true"></span><button class="k" type="button">0</button>
      <button class="k del" type="button" aria-label="Delete"><svg viewBox="0 0 24 24"><path d="M9 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7zM12 10l5 5M17 10l-5 5"/></svg></button>
    </div>
  </div>`,
  init(root) {
    const pad = root.querySelector('.pad'), dots = [...root.querySelectorAll('.dot')];
    let pin = '', timer = 0;
    const paint = () => dots.forEach((d, i) => d.classList.toggle('on', i < pin.length));
    root.querySelectorAll('.k:not(.del):not(.ghost)').forEach((k) => k.addEventListener('click', () => {
      if (pin.length >= 4) return;
      pin += k.textContent; paint();
      if (pin.length === 4) {
        pad.classList.add('ok');
        timer = setTimeout(() => { pin = ''; paint(); pad.classList.remove('ok'); }, 700);
      }
    }));
    root.querySelector('.del').addEventListener('click', () => {
      if (pad.classList.contains('ok')) return;
      if (!pin) { pad.classList.remove('shake'); void pad.offsetWidth; pad.classList.add('shake'); return; }
      pin = pin.slice(0, -1); paint();
    });
    return () => clearTimeout(timer);
  },
};
