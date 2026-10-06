// NEMA 4X sealed operator keypad: Lexan polyester overlay framing moulded silicone-rubber keys
// (carbon-pill contacts, so they squash rather than click) and a transflective STN LCD.
// Type a setpoint, CLR clears, ENT stores it (the display blinks to confirm), F1–F3 recall presets.
const KEYS = ['7', '8', '9', 'F1', '4', '5', '6', 'F2', '1', '2', '3', 'F3', 'CLR', '0', '.', 'ENT'];
export default {
  id: 'nd-membrane-keypad',
  credit: 'NEMA 4X silicone-rubber operator keypad on a Lexan overlay (Storm / Grayhill style) with a yellow-green STN LCD — CLR, ENT and F1–F3 presets',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; gap: 10px; padding: 14px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #464b50, #2f3337);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.14), inset 0 0 0 1px rgba(0,0,0,.3); }
    .lcd { height: 40px; border-radius: 3px; padding: 0 10px; display: flex; align-items: center; justify-content: space-between;
      background: linear-gradient(#c7d488, #aebd6a); box-shadow: inset 0 2px 5px rgba(0,0,0,.45), 0 0 0 2px #1d2023, 0 1px 0 3px rgba(255,255,255,.06);
      font: 500 22px/1 "IBM Plex Mono", ui-monospace, monospace; color: #1d2410; white-space: nowrap; }
    .lcd small { font: 600 9px/1 "IBM Plex Mono", ui-monospace, monospace; letter-spacing: 1px; color: rgba(29,36,16,.85); }
    .lcd .v { min-width: 112px; text-align: right; text-shadow: 1px 1px 0 rgba(29,36,16,.12); }
    .lcd.ok .v { animation: ok .22s steps(2, jump-none) 3; }
    @keyframes ok { 50% { opacity: 0; } }
    .pad { display: grid; grid-template-columns: repeat(4, 42px); gap: 8px; }
    .k { height: 34px; border: 0; border-radius: 7px; padding: 0; cursor: pointer; color: #f3f3f0; -webkit-tap-highlight-color: transparent;
      font: 600 13px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .5px;
      background: radial-gradient(120% 90% at 50% 20%, var(--k2, #6c7176), var(--k1, #4b5054) 70%, var(--k0, #3a3e42));
      box-shadow: 0 3px 0 var(--k0, #26292c), 0 4px 4px rgba(0,0,0,.45), inset 0 1px 1px rgba(255,255,255,.25);
      transform: translateY(-2px); transition: transform .05s, box-shadow .05s; }
    .k.f { font-size: 11px; --k2: #4f7fc2; --k1: #2f5f9e; --k0: #1f416e; }
    .k.c { font-size: 10px; --k2: #f0b33e; --k1: #d4901a; --k0: #8a5a07; color: #1b1406; }
    .k.e { font-size: 10px; --k2: #4ab36a; --k1: #24884a; --k0: #145a2f; }
    .k:hover { filter: brightness(1.08); }
    .k:active, .k.down { transform: translateY(1px) scale(.97, .95); box-shadow: 0 0 0 var(--k0, #26292c), 0 1px 1px rgba(0,0,0,.5), inset 0 1px 3px rgba(0,0,0,.35); }
    .k:focus-visible { outline: 2px solid #8cc4ff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="lcd" aria-live="polite"><small>SP</small><span class="v">0</span></div>
      <div class="pad">${KEYS.map((k) => `<button class="k${k[0] === 'F' ? ' f' : k === 'CLR' ? ' c' : k === 'ENT' ? ' e' : ''}" type="button" data-k="${k}">${k}</button>`).join('')}</div>
    </div>`,
  init(root) {
    const lcd = root.querySelector('.lcd'), out = root.querySelector('.v');
    const PRESET = { F1: '25.0', F2: '50.0', F3: '75.0' };
    let buf = '', stored = '0';
    const show = () => { out.textContent = buf || stored; };
    const hit = (k) => {
      lcd.classList.remove('ok');
      if (/^\d$/.test(k)) { if (buf.replace('.', '').length < 6) buf = buf === '0' ? k : buf + k; }
      else if (k === '.') { if (!buf.includes('.')) buf = (buf || '0') + '.'; }
      else if (k === 'CLR') buf = '';
      else if (k === 'ENT') { if (buf) { stored = String(parseFloat(buf) || 0); buf = ''; } void lcd.offsetWidth; lcd.classList.add('ok'); }
      else if (PRESET[k]) { stored = PRESET[k]; buf = ''; void lcd.offsetWidth; lcd.classList.add('ok'); }
      show();
    };
    const keys = {}; for (const b of root.querySelectorAll('.k')) { keys[b.dataset.k] = b; b.addEventListener('click', () => hit(b.dataset.k)); }
    // Enter / Space activate the focused key natively; digits, '.', Esc and Backspace type directly.
    const map = (e) => (e.key === 'Escape' || e.key === 'Backspace' || e.key === 'Delete' ? 'CLR' : /^[\d.]$/.test(e.key) ? e.key : null);
    root.querySelector('.pad').addEventListener('keydown', (e) => {
      const k = map(e); if (!k) return;
      e.preventDefault(); keys[k].classList.add('down'); hit(k);
    });
    root.querySelector('.pad').addEventListener('keyup', () => { for (const b of Object.values(keys)) b.classList.remove('down'); });
  },
};
