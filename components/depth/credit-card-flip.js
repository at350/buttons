export default {
  id: 'dp-credit-card-flip',
  credit: 'Credit card flip — click to rotateY to the magnetic-stripe side and reveal the CVV, with a lift and tilt mid-flip',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 28px 44px;
      perspective: 1000px;
      background: #f1f5f9;
      border-radius: 12px;
    }
    .card {
      position: relative;
      width: 210px;
      height: 132px;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: rotateY(0deg);
      transition: transform .9s cubic-bezier(.4, .9, .3, 1);
    }
    .card[aria-pressed="true"] { transform: rotateY(180deg); }
    .card:hover { transform: rotateY(-8deg) rotateX(4deg) translateZ(10px); }
    .card[aria-pressed="true"]:hover { transform: rotateY(188deg) rotateX(4deg) translateZ(10px); }
    .side {
      position: absolute;
      inset: 0;
      border-radius: 12px;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      box-shadow: 0 18px 36px rgba(15, 23, 42, .3);
      overflow: hidden;
    }
    .front { background: linear-gradient(135deg, #0f172a, #1e3a8a 60%, #312e81); color: #fff; }
    .front::before {
      content: '';
      position: absolute;
      right: -40px;
      top: -60px;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: rgba(255, 255, 255, .06);
    }
    .chip {
      position: absolute;
      left: 18px;
      top: 36px;
      width: 34px;
      height: 26px;
      border-radius: 5px;
      background: linear-gradient(135deg, #fcd34d, #b45309);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .3);
    }
    .chip::after {
      content: '';
      position: absolute;
      inset: 6px 4px;
      border-top: 1px solid rgba(0, 0, 0, .35);
      border-bottom: 1px solid rgba(0, 0, 0, .35);
    }
    .num {
      position: absolute;
      left: 18px;
      top: 74px;
      font: 500 15px/1 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: .12em;
    }
    .name {
      position: absolute;
      left: 18px;
      bottom: 14px;
      font: 600 10px/1 'Inter', system-ui, sans-serif;
      letter-spacing: .14em;
      text-transform: uppercase;
      opacity: .85;
    }
    .logo {
      position: absolute;
      right: 16px;
      bottom: 12px;
      display: flex;
    }
    .logo i {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #eb001b;
    }
    .logo i + i {
      background: #f79e1b;
      margin-left: -8px;
      mix-blend-mode: screen;
    }
    .back { background: linear-gradient(135deg, #1e293b, #0f172a); transform: rotateY(180deg); }
    .stripe {
      position: absolute;
      left: 0;
      right: 0;
      top: 20px;
      height: 32px;
      background: #111;
    }
    .sig {
      position: absolute;
      left: 14px;
      right: 70px;
      top: 66px;
      height: 26px;
      background: repeating-linear-gradient(180deg, #fff 0 5px, #e2e8f0 5px 6px);
      border-radius: 3px;
    }
    .cvv {
      position: absolute;
      right: 16px;
      top: 66px;
      width: 46px;
      height: 26px;
      border-radius: 3px;
      background: #fff;
      color: #0f172a;
      display: grid;
      place-items: center;
      font: 700 13px/1 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: .1em;
    }
    .card:focus-visible { outline: 0; }
    .card:focus-visible .side { box-shadow: 0 18px 36px rgba(15, 23, 42, .3), 0 0 0 3px #2563eb; }
  `,
  html: `
    <div class="stage">
      <button class="card" type="button" aria-pressed="false" aria-label="Flip card">
        <span class="side front">
          <span class="chip"></span><span class="num">•••• •••• •••• 4242</span><span class="name">A. Cardholder</span>
          <span class="logo"><i></i><i></i></span>
        </span>
        <span class="side back"><span class="stripe"></span><span class="sig"></span><span class="cvv">317</span></span>
      </button>
    </div>`,
  init(root) {
    const c = root.querySelector('.card');
    c.addEventListener('click', () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')));
  },
};
