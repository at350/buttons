export default {
  id: 'mb-cashapp-pay',
  credit: 'Cash App — the green Money tab: big amount readout, keypad with the chevron backspace, and the "Request" / "Pay" pills; Pay bounces into a check',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 240px; max-width: 100%; padding: 14px 16px 16px; border-radius: 12px; background: #00d632; color: #fff; text-align: center;
      font: 600 15px/1 Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .top { display: flex; align-items: center; justify-content: space-between; height: 24px; margin-bottom: 14px; }
    .top svg { width: 22px; height: 22px; fill: #fff; }
    .cur { height: 24px; padding: 0 10px; border-radius: 999px; background: rgba(0,0,0,.12); display: inline-flex; align-items: center; font-size: 12px; font-weight: 600; }
    .amt { height: 52px; display: grid; place-items: center; margin-bottom: 14px; font-weight: 700; font-size: 52px; letter-spacing: -.045em; font-variant-numeric: tabular-nums; white-space: nowrap; transition: font-size .2s cubic-bezier(.2,.8,.2,1); }
    .amt.s1 { font-size: 44px; } .amt.s2 { font-size: 38px; }
    .amt.bump { animation: bump .22s cubic-bezier(.2,.8,.2,1); }
    .amt.shake { animation: shake .35s cubic-bezier(.36,.07,.19,.97); }
    @keyframes bump { 50% { transform: scale(1.05); } }
    @keyframes shake { 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }
    .keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-bottom: 14px; }
    .k { height: 38px; border: 0; border-radius: 999px; background: transparent; color: #fff; font: 600 20px/1 Inter, system-ui, sans-serif; cursor: pointer; display: grid; place-items: center;
      transition: background .12s, transform .12s; -webkit-tap-highlight-color: transparent; }
    .k:hover { background: rgba(255,255,255,.12); }
    .k:active { transform: scale(.88); background: rgba(255,255,255,.24); }
    .k svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .k:focus-visible, .p:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .row { display: flex; gap: 10px; }
    .p { flex: 1; height: 48px; border: 0; border-radius: 999px; background: rgba(0,0,0,.13); color: #fff; font: 600 16px/1 Inter, system-ui, sans-serif; cursor: pointer; display: grid; place-items: center;
      transition: background .2s, transform .4s cubic-bezier(.34,1.56,.64,1), color .2s; -webkit-tap-highlight-color: transparent; }
    .p > * { grid-area: 1 / 1; }
    .p:hover { background: rgba(0,0,0,.2); }
    .p:active { transform: scale(.94); }
    .p[aria-pressed="true"] { background: #fff; color: #00d632; }
    .p svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
    .p[aria-pressed="true"] svg { opacity: 1; animation: in .45s cubic-bezier(.34,1.56,.64,1); }
    .p[aria-pressed="true"] .t { opacity: 0; }
    @keyframes in { from { transform: scale(0) rotate(-25deg); } }
  `,
  html: `
    <div class="stage">
      <div class="top"><svg viewBox="0 0 24 24" role="img" aria-label="Cash App"><path d="M23.59 3.475a5.1 5.1 0 00-3.05-3.05c-1.31-.42-2.5-.42-4.92-.42H8.36c-2.4 0-3.61 0-4.9.4a5.1 5.1 0 00-3.05 3.06C0 4.765 0 5.965 0 8.365v7.27c0 2.41 0 3.6.4 4.9a5.1 5.1 0 003.05 3.05c1.3.41 2.5.41 4.9.41h7.28c2.41 0 3.61 0 4.9-.4a5.1 5.1 0 003.06-3.06c.41-1.3.41-2.5.41-4.9v-7.25c0-2.41 0-3.61-.41-4.91zm-6.17 4.63l-.93.93a.5.5 0 01-.67.01 5 5 0 00-3.22-1.18c-.97 0-1.94.32-1.94 1.21 0 .9 1.04 1.2 2.24 1.65 2.1.7 3.84 1.58 3.84 3.64 0 2.24-1.74 3.78-4.58 3.95l-.26 1.2a.49.49 0 01-.48.39H9.63l-.09-.01a.5.5 0 01-.38-.59l.28-1.27a6.54 6.54 0 01-2.88-1.57v-.01a.48.48 0 010-.68l1-.97a.49.49 0 01.67 0c.91.86 2.13 1.34 3.39 1.32 1.3 0 2.17-.55 2.17-1.42 0-.87-.88-1.1-2.54-1.72-1.76-.63-3.43-1.52-3.43-3.6 0-2.42 2.01-3.6 4.39-3.71l.25-1.23a.48.48 0 01.48-.38h1.78l.1.01c.26.06.43.31.37.57l-.27 1.37c.9.3 1.75.77 2.48 1.39l.02.02c.19.2.19.5 0 .68z"/></svg><span class="cur">USD</span></div>
      <div class="amt" aria-live="polite">$0</div>
      <div class="keys" aria-label="Keypad">
        <button class="k" type="button">1</button><button class="k" type="button">2</button><button class="k" type="button">3</button>
        <button class="k" type="button">4</button><button class="k" type="button">5</button><button class="k" type="button">6</button>
        <button class="k" type="button">7</button><button class="k" type="button">8</button><button class="k" type="button">9</button>
        <button class="k" type="button">.</button><button class="k" type="button">0</button><button class="k" type="button" aria-label="Delete" data-del><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
      </div>
      <div class="row">
        <button class="p" type="button" aria-pressed="false"><span class="t">Request</span><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
        <button class="p" type="button" aria-pressed="false"><span class="t">Pay</span><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const amt = root.querySelector('.amt');
    const pills = root.querySelectorAll('.p');
    let v = '0';
    const anim = (c) => { amt.classList.remove('bump', 'shake'); void amt.offsetWidth; amt.classList.add(c); };
    const paint = () => { amt.textContent = '$' + v; amt.classList.toggle('s1', v.length >= 5); amt.classList.toggle('s2', v.length >= 7); anim('bump'); pills.forEach((p) => p.setAttribute('aria-pressed', 'false')); };
    root.querySelectorAll('.k').forEach((k) => k.addEventListener('click', () => {
      if (k.hasAttribute('data-del')) { v = v.length > 1 ? v.slice(0, -1) : '0'; paint(); return; }
      const c = k.textContent;
      const dec = v.split('.')[1];
      if (c === '.' ? v.includes('.') : (dec !== undefined ? dec.length >= 2 : v.length >= 5)) { anim('shake'); return; }
      v = v === '0' && c !== '.' ? c : v + c;
      paint();
    }));
    pills.forEach((p) => p.addEventListener('click', () => {
      if (v === '0') { anim('shake'); return; }
      const on = p.getAttribute('aria-pressed') !== 'true';
      pills.forEach((x) => x.setAttribute('aria-pressed', 'false'));
      p.setAttribute('aria-pressed', String(on));
    }));
  },
};
