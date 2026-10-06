export default {
  id: 'ks-gas-keypad',
  credit: 'Gas pump payment keypad (Gilbarco Encore) — "Enter billing ZIP code", steel keys with CANCEL / CLEAR / ENTER and the YES / NO receipt keys',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; background: linear-gradient(#d9dbde, #a9adb3); box-shadow: inset 0 1px 0 #fff; }
    .scr { height: 62px; margin-bottom: 12px; padding: 8px 10px; border-radius: 4px; background: #002f6c; box-shadow: 0 0 0 4px #15171a, inset 0 2px 6px rgba(0,0,0,.5);
      font: 600 11px/1.35 'IBM Plex Mono', ui-monospace, monospace; color: #fff; text-align: center; white-space: nowrap; overflow: hidden; }
    .l2 { font-size: 16px; letter-spacing: .25em; color: #ffd400; height: 22px; }
    .pad { display: grid; grid-template-columns: repeat(3, 42px) 60px; gap: 6px; padding: 8px; border-radius: 6px; background: #3b3f45; box-shadow: inset 0 2px 4px rgba(0,0,0,.6); }
    .k { height: 34px; border: 0; padding: 0; border-radius: 5px; cursor: pointer; font: 700 15px/1 Inter, system-ui, sans-serif; color: #1a1a1a;
      background: linear-gradient(#f3f4f6, #b9bdc3); box-shadow: 0 3px 0 #1e2023, inset 0 1px 0 #fff; transition: transform .05s, box-shadow .05s; -webkit-tap-highlight-color: transparent; }
    .k:hover { filter: brightness(1.05); }
    .k:active { transform: translateY(3px); box-shadow: 0 0 0 #1e2023, inset 0 1px 0 #fff; }
    .k:focus-visible { outline: 2px solid #ffd400; outline-offset: 2px; }
    .k.f { font-size: 9px; letter-spacing: .05em; }
    .can { background: linear-gradient(#e8322d, #a5130f); color: #fff; }
    .clr { background: linear-gradient(#ffd400, #d9a400); }
    .ent { background: linear-gradient(#25a046, #12692a); color: #fff; }
    .hlp { background: linear-gradient(#3a7bd5, #1d4f9a); color: #fff; }
    .yes { background: linear-gradient(#e9f7ec, #b9d9c0); color: #12692a; }
    .no { background: linear-gradient(#fbeaea, #dfbcbc); color: #a5130f; }
  `,
  html: `
    <div class="stage">
      <div class="scr" aria-live="polite"><div class="l1">ENTER BILLING ZIP CODE</div><div class="l2">_____</div><div class="l3">THEN PRESS ENTER</div></div>
      <div class="pad">
        <button class="k" type="button">1</button><button class="k" type="button">2</button><button class="k" type="button">3</button><button class="k f can" type="button" data-f="can">CANCEL</button>
        <button class="k" type="button">4</button><button class="k" type="button">5</button><button class="k" type="button">6</button><button class="k f clr" type="button" data-f="clr">CLEAR</button>
        <button class="k" type="button">7</button><button class="k" type="button">8</button><button class="k" type="button">9</button><button class="k f hlp" type="button" data-f="hlp">HELP</button>
        <button class="k f yes" type="button" data-f="yes">YES</button><button class="k" type="button">0</button><button class="k f no" type="button" data-f="no">NO</button><button class="k f ent" type="button" data-f="ent">ENTER</button>
      </div>
    </div>`,
  init(root) {
    const [l1, l2, l3] = ['.l1', '.l2', '.l3'].map((s) => root.querySelector(s));
    let zip = '', mode = 'zip', t;
    const show = (a, b, c) => { l1.textContent = a; l2.textContent = b; l3.textContent = c; };
    const reset = () => { zip = ''; mode = 'zip'; show('ENTER BILLING ZIP CODE', '_____', 'THEN PRESS ENTER'); };
    root.querySelectorAll('.k').forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.f;
      if (f === 'can') { clearTimeout(t); return reset(); }
      if (f === 'hlp') return show('HELP IS ON THE WAY', '', 'PLEASE WAIT');
      if (mode === 'done') { if (!f) reset(); else return; }
      if (mode === 'zip') {
        if (!f && zip.length < 5) zip += b.textContent;
        else if (f === 'clr') zip = zip.slice(0, -1);
        else if (f === 'ent' && zip.length === 5) {
          mode = 'wait'; show('AUTHORIZING', '...', 'PLEASE WAIT'); clearTimeout(t);
          t = setTimeout(() => { mode = 'rcpt'; show('DO YOU WANT A RECEIPT?', 'YES / NO', ''); }, 900); return;
        }
        if (mode === 'zip') show('ENTER BILLING ZIP CODE', (zip + '_____').slice(0, 5), 'THEN PRESS ENTER');
      } else if (mode === 'rcpt' && (f === 'yes' || f === 'no')) {
        mode = 'done'; show(f === 'yes' ? 'RECEIPT WILL PRINT' : 'NO RECEIPT', 'LIFT NOZZLE', 'SELECT GRADE');
      }
    }));
    return () => clearTimeout(t);
  },
};
