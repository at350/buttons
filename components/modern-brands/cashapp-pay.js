export default {
  id: 'mb-cashapp-pay',
  credit: 'Cash App — the green home screen: amount keypad readout with "Request" and "Pay" pills; Pay bounces, then flips to a paid check',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 240px; max-width: 100%; padding: 22px 18px 18px; border-radius: 12px; background: #00d632; color: #fff; text-align: center; font: 600 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .amt { font: 700 48px/1 Inter, system-ui, sans-serif; letter-spacing: -.04em; font-variant-numeric: tabular-nums; margin-bottom: 18px; }
    .amt.bump { animation: bump .25s cubic-bezier(.2,.8,.2,1); }
    @keyframes bump { 50% { transform: scale(1.06); } }
    .keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-bottom: 14px; }
    .k { height: 36px; border: 0; border-radius: 8px; background: transparent; color: #fff; font: 500 18px/1 Inter, system-ui, sans-serif; cursor: pointer; transition: background .12s, transform .1s; -webkit-tap-highlight-color: transparent; }
    .k:hover { background: rgba(255,255,255,.14); }
    .k:active { transform: scale(.9); background: rgba(255,255,255,.28); }
    .k:focus-visible, .p:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .row { display: flex; gap: 8px; }
    .p { flex: 1; height: 46px; border: 0; border-radius: 999px; background: rgba(0,0,0,.2); color: #fff; font: 600 15px/1 Inter, system-ui, sans-serif; cursor: pointer; display: grid; place-items: center;
      transition: background .2s, transform .35s linear(0, 0.4 10%, 1.15 35%, 0.95 60%, 1.02 80%, 1), color .2s; -webkit-tap-highlight-color: transparent; }
    .p:hover { background: rgba(0,0,0,.28); }
    .p:active { transform: scale(.94); }
    .p[aria-pressed="true"] { background: #fff; color: #00d632; transform: scale(1.04); }
    .p svg { display: none; width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .p[aria-pressed="true"] svg { display: block; animation: draw .4s cubic-bezier(.2,.8,.2,1); }
    .p[aria-pressed="true"] .t { display: none; }
    @keyframes draw { from { transform: scale(0) rotate(-20deg); } }
  `,
  html: `
    <div class="stage">
      <div class="amt">$0</div>
      <div class="keys" aria-label="Keypad">
        <button class="k" type="button">1</button><button class="k" type="button">2</button><button class="k" type="button">3</button>
        <button class="k" type="button">4</button><button class="k" type="button">5</button><button class="k" type="button">6</button>
        <button class="k" type="button">7</button><button class="k" type="button">8</button><button class="k" type="button">9</button>
        <button class="k" type="button">.</button><button class="k" type="button">0</button><button class="k" type="button" aria-label="Delete">⌫</button>
      </div>
      <div class="row">
        <button class="p" type="button" aria-pressed="false"><span class="t">Request</span><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></button>
        <button class="p pay" type="button" aria-pressed="false"><span class="t">Pay</span><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const amt = root.querySelector('.amt');
    const pills = root.querySelectorAll('.p');
    let v = '0';
    const paint = () => { amt.textContent = '$' + v; amt.classList.remove('bump'); void amt.offsetWidth; amt.classList.add('bump'); pills.forEach((p) => p.setAttribute('aria-pressed', 'false')); };
    root.querySelectorAll('.k').forEach((k) => k.addEventListener('click', () => {
      const c = k.textContent;
      if (c === '⌫') v = v.length > 1 ? v.slice(0, -1) : '0';
      else if (c === '.') { if (!v.includes('.')) v += '.'; }
      else if (v.replace('.', '').length < 6) v = v === '0' ? c : v + c;
      paint();
    }));
    pills.forEach((p) => p.addEventListener('click', () => {
      const on = p.getAttribute('aria-pressed') !== 'true';
      pills.forEach((x) => x.setAttribute('aria-pressed', 'false'));
      p.setAttribute('aria-pressed', String(on));
    }));
  },
};
