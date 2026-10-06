export default {
  id: 'dp-credit-card-flip',
  credit: 'Payment card flip — ISO 85.6×54 card with EMV contact chip, contactless mark and hologram; click lifts and turns it over to the stripe, signature panel and CVV',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 30px 40px; perspective: 1000px; background: linear-gradient(160deg, #eef2f7, #dde3ec); border-radius: 12px; }
    .tilt { display: block; width: 214px; height: 135px; transform-style: preserve-3d; transition: transform .5s cubic-bezier(.2, .9, .25, 1); }
    .btn:hover .tilt { transform: rotateX(6deg) rotateY(-7deg); }
    .btn { display: block; border: 0; padding: 0; background: none; cursor: pointer; border-radius: 11px; transform-style: preserve-3d; -webkit-tap-highlight-color: transparent; }
    .card { display: block; position: relative; width: 214px; height: 135px; transform-style: preserve-3d; transform: rotateY(0deg); }
    .card.to-back { animation: toBack .9s cubic-bezier(.45, .05, .25, 1) forwards; }
    .card.to-front { animation: toFront .9s cubic-bezier(.45, .05, .25, 1) forwards; }
    @keyframes toBack { 0% { transform: translateZ(0) rotateY(0deg); } 50% { transform: translateZ(34px) rotateY(-95deg) rotateZ(-3deg); } 100% { transform: translateZ(0) rotateY(-180deg); } }
    @keyframes toFront { 0% { transform: translateZ(0) rotateY(-180deg); } 50% { transform: translateZ(34px) rotateY(-85deg) rotateZ(3deg); } 100% { transform: translateZ(0) rotateY(-360deg); } }
    .side {
      position: absolute; inset: 0; border-radius: 11px; overflow: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden;
      box-shadow: 0 1px 2px rgba(15, 23, 42, .25), 0 10px 22px -6px rgba(15, 23, 42, .45);
    }
    .front {
      color: #f1f5f9;
      background:
        radial-gradient(140px 120px at 100% 0%, rgba(125, 211, 252, .22), transparent 70%),
        radial-gradient(160px 120px at 0% 100%, rgba(99, 102, 241, .35), transparent 70%),
        linear-gradient(135deg, #0b1324, #172554 55%, #1e1b4b);
    }
    .front::after, .back::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
      background: linear-gradient(115deg, rgba(255, 255, 255, .16), transparent 38%); box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .18);
    }
    .bank { position: absolute; left: 18px; top: 15px; font: 600 12px/1 'Space Grotesk', system-ui, sans-serif; letter-spacing: .02em; }
    .tier { position: absolute; right: 18px; top: 16px; font: 600 8px/1 'Inter', system-ui, sans-serif; letter-spacing: .18em; opacity: .7; }
    .chip { position: absolute; left: 22px; top: 44px; width: 31px; height: 24px; }
    .cl { position: absolute; left: 60px; top: 47px; width: 18px; height: 18px; color: rgba(241, 245, 249, .85); }
    .num { position: absolute; left: 22px; top: 80px; display: flex; gap: 9px; white-space: nowrap; font: 500 13px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .06em; text-shadow: 0 1px 0 rgba(0, 0, 0, .4); }
    .name { position: absolute; left: 22px; bottom: 13px; font: 600 8.5px/1 'Inter', system-ui, sans-serif; letter-spacing: .16em; text-transform: uppercase; white-space: nowrap; opacity: .85; }
    .exp { position: absolute; left: 96px; top: 98px; font: 500 8.5px/1 'JetBrains Mono', ui-monospace, monospace; opacity: .85; white-space: nowrap; }
    .exp small { font: 600 5px/1.1 'Inter', system-ui, sans-serif; letter-spacing: .08em; display: inline-block; vertical-align: middle; margin-right: 3px; opacity: .8; }
    .holo {
      position: absolute; right: 16px; bottom: 12px; width: 30px; height: 20px; border-radius: 3px;
      background: conic-gradient(from 210deg at 40% 60%, #c7d2fe, #a5f3fc, #fbcfe8, #fde68a, #bbf7d0, #c7d2fe);
      box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .6); opacity: .9;
    }
    .holo::after { content: ''; position: absolute; inset: 4px 6px; border-radius: 50%; border: 1px solid rgba(30, 27, 75, .25); }
    .back { transform: rotateY(180deg); background: linear-gradient(135deg, #172554, #0b1324); color: #0f172a; }
    .stripe { position: absolute; left: 0; right: 0; top: 13px; height: 30px; background: linear-gradient(180deg, #1a1a1a, #050505 60%, #161616); }
    .sig {
      position: absolute; left: 14px; right: 62px; top: 54px; height: 24px; border-radius: 2px;
      background: repeating-linear-gradient(-55deg, #f8fafc 0 4px, #e2e8f0 4px 5px);
    }
    .cvv {
      position: absolute; right: 18px; top: 54px; width: 40px; height: 24px; border-radius: 2px; background: #fff; display: grid; place-items: center;
      font: italic 600 12px/1 'Inter', system-ui, sans-serif; letter-spacing: .08em; color: #111827; box-shadow: inset 0 0 0 1px #cbd5e1;
    }
    .fine { position: absolute; left: 14px; right: 60px; top: 88px; display: grid; gap: 4px; }
    .fine i { height: 2px; border-radius: 1px; background: rgba(226, 232, 240, .28); }
    .fine i:nth-child(2) { width: 80%; } .fine i:nth-child(3) { width: 60%; }
    .back .holo { bottom: 14px; }
    .btn:focus-visible { outline: 2px solid #2563eb; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <button class="btn" type="button" aria-pressed="false" aria-label="Show card back">
        <span class="tilt">
          <span class="card">
            <span class="side front">
              <span class="bank">Meridian</span><span class="tier">DEBIT</span>
              <svg class="chip" viewBox="0 0 31 24" aria-hidden="true">
                <defs><linearGradient id="dpccchip" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e3a1"/><stop offset=".45" stop-color="#d4af5a"/><stop offset="1" stop-color="#a77b2b"/></linearGradient></defs>
                <rect x=".5" y=".5" width="30" height="23" rx="4" fill="url(#dpccchip)" stroke="#8a6420" stroke-width=".6"/>
                <g fill="none" stroke="#7a5719" stroke-width=".7" opacity=".85">
                  <path d="M.5 8h9.5M.5 16h9.5M21 8h9.5M21 16h9.5"/>
                  <path d="M10 .5v7.5M10 16v7.5M21 .5v7.5M21 16v7.5"/>
                  <rect x="10" y="8" width="11" height="8" rx="2.2"/>
                  <path d="M15.5 .5v7.5M15.5 16v7.5"/>
                </g>
              </svg>
              <svg class="cl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"/><path d="M16.37 2a20.16 20.16 0 0 1 0 20"/></svg>
              <span class="num"><span>••••</span><span>••••</span><span>••••</span><span>4242</span></span>
              <span class="name">A. Cardholder</span>
              <span class="exp"><small>VALID<br>THRU</small>09/29</span>
              <span class="holo"></span>
            </span>
            <span class="side back">
              <span class="stripe"></span><span class="sig"></span><span class="cvv">317</span>
              <span class="fine"><i></i><i></i><i></i></span>
              <span class="holo"></span>
            </span>
          </span>
        </span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn'), c = root.querySelector('.card');
    b.addEventListener('click', () => {
      const back = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(back));
      b.setAttribute('aria-label', back ? 'Show card front' : 'Show card back');
      c.classList.toggle('to-back', back); c.classList.toggle('to-front', !back);
    });
  },
};
