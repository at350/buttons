export default {
  id: 'ks-verifone-pinpad',
  credit: 'Verifone / Ingenico countertop PIN pad — monochrome LCD, dished rubber keys with the raised dot on 5, red X / yellow < / green O',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px 20px 20px; border-radius: 12px; background: #d9d6cf; }
    .dev { width: 176px; padding: 12px 14px 16px; border-radius: 14px 14px 22px 22px; background: linear-gradient(160deg, #3b3d42, #1e1f22 60%, #151517); box-shadow: 0 8px 14px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.15); }
    .brand { font: 700 8px/1 Inter, system-ui, sans-serif; letter-spacing: .25em; color: #8a8d93; text-align: center; margin-bottom: 8px; }
    .lcd { height: 52px; border-radius: 3px; padding: 5px 8px; background: linear-gradient(#b9c5a7, #a3b18f); box-shadow: inset 0 2px 4px rgba(0,0,0,.45), 0 0 0 3px #0c0c0d;
      font: 600 11px/1.3 'IBM Plex Mono', ui-monospace, monospace; color: #1d2416; white-space: nowrap; overflow: hidden; }
    .lcd .r { display: flex; justify-content: space-between; }
    .lcd .pin { letter-spacing: .3em; text-align: center; height: 15px; }
    .keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px 10px; margin-top: 14px; }
    .k { position: relative; height: 30px; border: 0; padding: 0; border-radius: 9px; cursor: pointer; font: 700 15px/1 Inter, system-ui, sans-serif; color: #f2f2f2;
      background: radial-gradient(ellipse at 50% 70%, #2a2b2e 0 40%, #3d3f44 75%, #4b4d52); box-shadow: 0 2px 0 #0b0b0c, 0 3px 4px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.18), inset 0 -3px 5px rgba(255,255,255,.06);
      transition: transform .05s, box-shadow .05s; -webkit-tap-highlight-color: transparent; }
    .k:hover { filter: brightness(1.15); }
    .k:active { transform: translateY(2px); box-shadow: 0 0 0 #0b0b0c, 0 1px 1px rgba(0,0,0,.6), inset 0 2px 4px rgba(0,0,0,.5); }
    .k:focus-visible { outline: 2px solid #f6c800; outline-offset: 2px; }
    .k.dot::after { content: ''; position: absolute; left: 50%; top: 4px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: #9a9da3; }
    .k.x { background: radial-gradient(ellipse at 50% 70%, #b8140f 0 40%, #d9231c 75%, #e54640); }
    .k.c { background: radial-gradient(ellipse at 50% 70%, #c99a00 0 40%, #f0bd00 75%, #ffd23d); color: #1a1a1a; }
    .k.o { background: radial-gradient(ellipse at 50% 70%, #10702c 0 40%, #1c9a3f 75%, #36b658); }
    .k svg { width: 16px; height: 16px; vertical-align: middle; }
  `,
  html: `
    <div class="stage"><div class="dev">
      <div class="brand">VERIFONE</div>
      <div class="lcd"><div class="r"><span>SALE</span><span>$42.17</span></div><div class="msg">ENTER PIN</div><div class="pin"></div></div>
      <div class="keys">
        <button class="k" type="button">1</button><button class="k" type="button">2</button><button class="k" type="button">3</button>
        <button class="k" type="button">4</button><button class="k dot" type="button">5</button><button class="k" type="button">6</button>
        <button class="k" type="button">7</button><button class="k" type="button">8</button><button class="k" type="button">9</button>
        <button class="k" type="button" aria-label="Star">*</button><button class="k" type="button">0</button><button class="k" type="button" aria-label="Hash">#</button>
        <button class="k x" type="button" data-f="x" aria-label="Cancel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
        <button class="k c" type="button" data-f="c" aria-label="Clear"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
        <button class="k o" type="button" data-f="o" aria-label="Enter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="6"/></svg></button>
      </div>
    </div></div>`,
  init(root) {
    const msg = root.querySelector('.msg'), pin = root.querySelector('.pin');
    let v = '', t, done = false;
    const set = (m) => { msg.textContent = m; pin.textContent = '*'.repeat(v.length); };
    root.querySelectorAll('.k').forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.f;
      if (done) { done = false; v = ''; set('ENTER PIN'); if (f) return; }
      if (!f) { if (/\d/.test(b.textContent) && v.length < 6) v += b.textContent; set('ENTER PIN'); }
      else if (f === 'c') { v = v.slice(0, -1); set('ENTER PIN'); }
      else if (f === 'x') { v = ''; set('CANCELLED'); done = true; }
      else if (v.length >= 4) { v = ''; set('PROCESSING...'); clearTimeout(t); t = setTimeout(() => { set('APPROVED'); done = true; }, 1000); }
    }));
    return () => clearTimeout(t);
  },
};
