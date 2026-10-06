export default {
  id: 'ks-atm-softkeys',
  credit: 'Bank ATM (NCR / Diebold) — CRT screen flanked by eight function-display keys; press one and its menu line lights up',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .stage { display: inline-block; padding: 16px 14px; border-radius: 12px; background: linear-gradient(#c9c6bd, #a9a59b); box-shadow: inset 0 1px 0 rgba(255,255,255,.6), inset 0 -2px 0 rgba(0,0,0,.15); }
    .grid { display: grid; grid-template-columns: 34px 248px 34px; grid-template-rows: 44px repeat(4, 32px) 18px; column-gap: 8px; }
    .bezel { grid-column: 2; grid-row: 1 / 7; border-radius: 10px; padding: 7px; background: linear-gradient(#2c2c2e, #111); box-shadow: inset 0 2px 3px rgba(0,0,0,.8), 0 1px 0 rgba(255,255,255,.5); }
    .crt { position: relative; height: 100%; border-radius: 14px / 18px; overflow: hidden; background: radial-gradient(ellipse at 50% 40%, #1d4fb8, #0a2a78 70%, #061a4f);
      display: grid; grid-template-rows: 37px repeat(4, 32px) 1fr; font: 600 11px/1 'IBM Plex Mono', ui-monospace, monospace; color: #fff; letter-spacing: .02em; }
    .crt::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 1px, transparent 1px 3px); pointer-events: none; z-index: 2; }
    .crt::after { content: ''; position: absolute; left: -20%; top: -40%; width: 90%; height: 80%; background: radial-gradient(ellipse, rgba(255,255,255,.16), transparent 60%); pointer-events: none; z-index: 3; }
    .title { align-self: center; text-align: center; color: #ffe14d; font-size: 11.5px; }
    .row { display: flex; justify-content: space-between; align-items: center; padding: 0 6px; }
    .ln { padding: 4px 5px; white-space: nowrap; transition: background .08s, color .08s; }
    .ln.l::before { content: '< '; color: #8fb3ff; } .ln.r::after { content: ' >'; color: #8fb3ff; }
    .ln.on { background: #fff; color: #0a2a78; }
    .ln.on::before, .ln.on::after { color: #0a2a78; }
    .foot { align-self: end; padding: 0 0 5px; text-align: center; color: #9fc0ff; font-size: 9.5px; }
    .k { width: 34px; height: 26px; align-self: center; border: 0; padding: 0; border-radius: 4px; cursor: pointer;
      background: linear-gradient(#e9e7e1, #b9b6ae); box-shadow: 0 3px 0 #77746c, 0 4px 4px rgba(0,0,0,.35), inset 0 1px 0 #fff;
      transition: transform .05s, box-shadow .05s; -webkit-tap-highlight-color: transparent; }
    .k::after { content: ''; display: block; margin: 0 auto; width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
    .k.L::after { border-left: 7px solid #555; } .k.R::after { border-right: 7px solid #555; }
    .k:hover { background: linear-gradient(#f4f2ec, #c6c3bb); }
    .k:active { transform: translateY(3px); box-shadow: 0 0 0 #77746c, 0 1px 2px rgba(0,0,0,.35), inset 0 1px 0 #fff; }
    .k:focus-visible { outline: 2px solid #1d4fb8; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="grid">
        <div class="bezel"><div class="crt">
          <div class="title">PLEASE SELECT TRANSACTION</div>
          <div class="row"><span class="ln l" data-i="0">FAST CASH $60</span><span class="ln r" data-i="4">WITHDRAWAL</span></div>
          <div class="row"><span class="ln l" data-i="1">DEPOSIT</span><span class="ln r" data-i="5">TRANSFER</span></div>
          <div class="row"><span class="ln l" data-i="2">BALANCE INQUIRY</span><span class="ln r" data-i="6">CHANGE PIN</span></div>
          <div class="row"><span class="ln l" data-i="3">MORE OPTIONS</span><span class="ln r" data-i="7">CANCEL</span></div>
          <div class="foot">PRESS THE KEY NEXT TO YOUR CHOICE</div>
        </div></div>
      </div>
    </div>`,
  init(root) {
    const grid = root.querySelector('.grid');
    const lines = [...root.querySelectorAll('.ln')];
    const keys = [];
    for (let i = 0; i < 8; i++) {
      const b = document.createElement('button');
      const left = i < 4;
      b.type = 'button'; b.className = 'k ' + (left ? 'L' : 'R');
      b.style.gridColumn = left ? '1' : '3'; b.style.gridRow = String((i % 4) + 2);
      b.setAttribute('aria-label', lines.find((l) => l.dataset.i == i).textContent);
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => {
        lines.forEach((l) => l.classList.toggle('on', l.dataset.i == i));
        keys.forEach((k, j) => k.setAttribute('aria-pressed', String(j === i)));
      });
      keys.push(b); grid.appendChild(b);
    }
  },
};
