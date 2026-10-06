export default {
  id: 'ks-atm-keypad',
  credit: 'ATM encrypting PIN pad (Diebold EPP / NCR) — brushed steel keys, braille dot on 5, red CANCEL, yellow CLEAR, green ENTER',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; background: linear-gradient(#bdbab3, #96938b); box-shadow: inset 0 1px 0 rgba(255,255,255,.5); }
    .scr { height: 46px; margin-bottom: 12px; border-radius: 6px; padding: 6px 10px; background: #0a2a78; box-shadow: inset 0 0 0 3px #161616, inset 0 3px 8px rgba(0,0,0,.6);
      font: 600 10.5px/1.25 'IBM Plex Mono', ui-monospace, monospace; color: #fff; text-align: center; }
    .msg { color: #ffe14d; white-space: nowrap; }
    .pin { font-size: 16px; letter-spacing: .35em; height: 20px; white-space: nowrap; }
    .pad { display: grid; grid-template-columns: repeat(3, 44px) 62px; gap: 7px; padding: 10px; border-radius: 6px; background: linear-gradient(#5d5f63, #3c3e42); box-shadow: inset 0 2px 4px rgba(0,0,0,.6); }
    .k { position: relative; height: 38px; border: 0; padding: 0; border-radius: 4px; cursor: pointer; font: 700 17px/1 Inter, system-ui, sans-serif; color: #1b1b1b;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0 1px, transparent 1px 2px), linear-gradient(#eef0f2, #b7bbc0);
      box-shadow: 0 3px 0 #2a2b2e, 0 4px 5px rgba(0,0,0,.5), inset 0 1px 0 #fff; transition: transform .05s, box-shadow .05s; -webkit-tap-highlight-color: transparent; }
    .k:hover { filter: brightness(1.05); }
    .k:active { transform: translateY(3px); box-shadow: 0 0 0 #2a2b2e, 0 1px 2px rgba(0,0,0,.5), inset 0 1px 0 #fff; }
    .k:focus-visible { outline: 2px solid #ffe14d; outline-offset: 2px; }
    .k.dot::after { content: ''; position: absolute; left: 50%; bottom: 5px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: #555; box-shadow: 0 1px 0 #fff; }
    .k.f { font-size: 9.5px; letter-spacing: .06em; }
    .k.can { background: linear-gradient(#e8322d, #a5130f); color: #fff; }
    .k.clr { background: linear-gradient(#ffd400, #d9a400); }
    .k.ent { background: linear-gradient(#25a046, #12692a); color: #fff; }
    .k.blank { display: block; background: repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0 1px, transparent 1px 2px), linear-gradient(#d4d7db, #a7abb0); cursor: default; }
  `,
  html: `
    <div class="stage">
      <div class="scr"><div class="msg">ENTER YOUR PIN</div><div class="pin"></div></div>
      <div class="pad">
        <button class="k" type="button">1</button><button class="k" type="button">2</button><button class="k" type="button">3</button><button class="k f can" type="button" data-f="can">CANCEL</button>
        <button class="k" type="button">4</button><button class="k dot" type="button">5</button><button class="k" type="button">6</button><button class="k f clr" type="button" data-f="clr">CLEAR</button>
        <button class="k" type="button">7</button><button class="k" type="button">8</button><button class="k" type="button">9</button><button class="k f ent" type="button" data-f="ent">ENTER</button>
        <span class="k blank"></span><button class="k" type="button">0</button><span class="k blank"></span><span class="k blank"></span>
      </div>
    </div>`,
  init(root) {
    const msg = root.querySelector('.msg'), pin = root.querySelector('.pin');
    let v = '', t, done = false;
    const show = (m) => { msg.textContent = m; pin.textContent = '*'.repeat(v.length); };
    root.querySelectorAll('button.k').forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.f;
      if (done) { done = false; v = ''; }
      if (!f) { if (v.length < 6) v += b.textContent; show('ENTER YOUR PIN'); }
      else if (f === 'clr') { v = v.slice(0, -1); show('ENTER YOUR PIN'); }
      else if (f === 'can') { v = ''; show('TRANSACTION CANCELLED'); done = true; }
      else if (f === 'ent') {
        if (v.length < 4) return show('PIN TOO SHORT');
        show('PLEASE WAIT...'); clearTimeout(t);
        t = setTimeout(() => { v = ''; show('PIN ACCEPTED'); done = true; }, 900);
      }
    }));
    return () => clearTimeout(t);
  },
};
