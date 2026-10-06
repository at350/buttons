export default {
  id: 'cr-pow-starburst',
  credit: 'Comic-book POW starburst — clip-path 12-point star with halftone dots and hard offset shadow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px 20px; }
    .btn {
      --star: polygon(50% 0, 59.3% 15.2%, 75% 6.7%, 75.5% 24.5%, 93.3% 25%, 84.8% 40.7%, 100% 50%, 84.8% 59.3%, 93.3% 75%, 75.5% 75.5%, 75% 93.3%, 59.3% 84.8%, 50% 100%, 40.7% 84.8%, 25% 93.3%, 24.5% 75.5%, 6.7% 75%, 15.2% 59.3%, 0 50%, 15.2% 40.7%, 6.7% 25%, 24.5% 24.5%, 25% 6.7%, 40.7% 15.2%);
      position: relative; width: 190px; height: 130px; max-width: 100%; border: 0; padding: 0; cursor: pointer; background: transparent;
      transition: transform .2s cubic-bezier(.34, 1.56, .64, 1);
    }
    .btn:hover { transform: rotate(-6deg) scale(1.06); }
    .btn:active { transform: rotate(4deg) scale(.95); }
    .btn.bang { animation: bang .5s cubic-bezier(.34, 1.56, .64, 1); }
    .btn:focus-visible { outline: 3px solid #111; outline-offset: 4px; border-radius: 50%; }
    .sh, .out, .in { position: absolute; inset: 0; clip-path: var(--star); }
    .sh { background: #111; transform: translate(7px, 7px); }
    .out { background: #111; }
    .in {
      inset: 7px; background:
        radial-gradient(circle, rgba(220, 38, 38, .55) 1.6px, transparent 1.9px) 0 0 / 8px 8px,
        #ffd500;
      display: grid; place-items: center;
      font: 900 38px/1 Impact, 'Arial Black', 'Helvetica Neue', sans-serif; letter-spacing: .02em; color: #dc2626;
      text-shadow: 3px 3px 0 #111, -1px -1px 0 #111, 1px -1px 0 #111, -1px 1px 0 #111;
      transform: rotate(-8deg); transition: background .2s;
    }
    .btn[aria-pressed="true"] .in { background: radial-gradient(circle, rgba(17, 17, 17, .5) 1.6px, transparent 1.9px) 0 0 / 8px 8px, #38bdf8; color: #fff; }
    @keyframes bang { 0% { transform: scale(.7) rotate(-14deg); } 60% { transform: scale(1.18) rotate(5deg); } 100% { transform: scale(1) rotate(0); } }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><span class="sh"></span><span class="out"></span><span class="in">POW!</span></button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
      b.classList.remove('bang'); void b.offsetWidth; b.classList.add('bang');
    });
    b.addEventListener('animationend', () => b.classList.remove('bang'));
  },
};
