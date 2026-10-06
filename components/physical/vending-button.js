// Dixie-Narco-style drink selection: a backlit product window showing the can, and below it the
// chrome-bezel selection button with its SOLD OUT lamp. Each press vends (the backlight dips while the
// motor runs); after four the column is empty and SOLD OUT lights. A fifth press restocks it.
export default {
  id: 'ph-vending-button',
  credit: 'Vending machine drink selection (Dixie-Narco style) — backlit can window, SOLD OUT lamp after four vends, a fifth restocks',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 18px; border-radius: 12px;
      background: linear-gradient(90deg, rgba(255,255,255,.06), rgba(255,255,255,0) 30%), linear-gradient(#262a31, #121418); box-shadow: inset 0 1px 0 rgba(255,255,255,.1); }
    .col { display: grid; gap: 8px; width: 84px; }
    .win { position: relative; height: 104px; border-radius: 4px; overflow: hidden;
      background: radial-gradient(ellipse 80% 70% at 50% 45%, #ffffff, #e8f1ff 50%, #b9cbe6 100%);
      box-shadow: inset 0 0 0 2px #c7ccd2, inset 0 0 0 3px #6c737b, 0 0 14px rgba(200,220,255,.25); transition: filter .2s; }
    .win::after { content: ''; position: absolute; inset: 0; background: linear-gradient(115deg, rgba(255,255,255,.55) 0 18%, rgba(255,255,255,0) 19% 60%, rgba(255,255,255,.18) 61% 66%, rgba(255,255,255,0) 67%); pointer-events: none; }
    .can { position: absolute; left: 50%; top: 14px; width: 38px; height: 76px; margin-left: -19px; border-radius: 4px 4px 6px 6px / 3px 3px 5px 5px;
      background:
        linear-gradient(90deg, rgba(0,0,0,.35), rgba(255,255,255,.0) 18%, rgba(255,255,255,.55) 30%, rgba(255,255,255,0) 42%, rgba(0,0,0,0) 70%, rgba(0,0,0,.4)),
        linear-gradient(180deg, #c9ced3 0 7%, #f2780c 7% 93%, #b8bdc2 93%);
      box-shadow: 0 4px 6px rgba(20,40,80,.35); transition: transform .35s, opacity .35s; }
    .can::before { content: ''; position: absolute; left: 3px; right: 3px; top: -3px; height: 6px; border-radius: 50%; background: radial-gradient(ellipse, #eef1f3 30%, #a9afb5 70%); box-shadow: inset 0 0 0 1px #8b9197; }
    .can::after { content: 'ORANGE'; position: absolute; left: 0; right: 0; top: 46%; text-align: center; font: 800 6.5px/1 "Unbounded", Arial, sans-serif; letter-spacing: .4px; color: #fff; transform: rotate(-90deg); }
    .bezel { position: relative; height: 34px; padding: 3px; border-radius: 4px; background: linear-gradient(#f4f5f6, #9aa0a6 50%, #dfe2e5); box-shadow: 0 2px 3px rgba(0,0,0,.6); }
    .btn {
      position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border: 0; padding: 0; border-radius: 2px; cursor: pointer;
      background: linear-gradient(#2b2e33, #16181b); box-shadow: 0 3px 0 #050506, inset 0 1px 0 rgba(255,255,255,.14);
      transform: translateY(-3px); transition: transform .13s cubic-bezier(.3,1.9,.5,1), box-shadow .13s cubic-bezier(.3,1.9,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: linear-gradient(#32363c, #1a1c20); }
    .btn:active { transform: translateY(0); box-shadow: 0 0 0 #050506, inset 0 1px 0 rgba(255,255,255,.08); transition-duration: .04s; }
    .btn:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 4px; }
    .lamp { padding: 3px 5px; border-radius: 2px; background: #2a0a08; box-shadow: inset 0 1px 1px rgba(0,0,0,.8);
      font: 800 7px/1 "Roboto Flex", Inter, Arial, sans-serif; font-variation-settings: "wdth" 80; letter-spacing: .8px; color: #4d1611; white-space: nowrap; }
    .col.out .lamp { background: #3a0c08; color: #ff3b26; text-shadow: 0 0 4px rgba(255,60,30,.9); }
    .col.out .can { opacity: 0; transform: translateY(16px); }
    .col.out .win { filter: brightness(.82); }
    .col.vend .win { animation: vend .5s; }
    @keyframes vend { 30% { filter: brightness(.7); } }
  `,
  html: `
    <div class="stage">
      <div class="col">
        <div class="win"><span class="can"></span></div>
        <div class="bezel"><button class="btn" type="button" aria-label="Select orange soda" aria-pressed="false"><span class="lamp">SOLD OUT</span></button></div>
      </div>
    </div>`,
  init(root) {
    const col = root.querySelector('.col'), btn = root.querySelector('.btn'), win = root.querySelector('.win');
    let n = 0;
    btn.addEventListener('click', () => {
      if (col.classList.contains('out')) { col.classList.remove('out'); n = 0; btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-label', 'Select orange soda'); return; }
      col.classList.remove('vend'); void col.offsetWidth; col.classList.add('vend');
      if (++n >= 4) { col.classList.add('out'); btn.setAttribute('aria-pressed', 'true'); btn.setAttribute('aria-label', 'Orange soda sold out — press to restock'); }
    });
    win.addEventListener('animationend', () => col.classList.remove('vend'));
  },
};
