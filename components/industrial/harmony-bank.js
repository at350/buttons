// Schneider Electric Harmony XB4 22 mm illuminated pushbuttons (chrome metal bezel, LED behind the
// lens) on a RAL 7035 enclosure door, each under a black ZBY legend plate. START latches RUN (green
// lit). STOP drops it and latches a stop: red stays lit and blue RESET flashes "reset required"
// (EN ISO 13849 practice) — START is refused until RESET is pressed.
const I = '<rect x="10.6" y="5" width="2.8" height="14" rx=".6"/>';
const O = '<circle cx="12" cy="12" r="6.3" fill="none" stroke-width="2.6"/>';
const R = '<path d="M5 12a7 7 0 1 0 2.1-5L5 9" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.6 4.4v4.9h4.9" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>';
const btn = (k, lbl, sym) => `<div class="col"><span class="plate">${lbl}</span>
  <button class="pb ${k}" type="button" aria-label="${lbl}"><span class="cap"><svg viewBox="0 0 24 24" aria-hidden="true">${sym}</svg></span></button></div>`;
export default {
  id: 'nd-harmony-bank',
  credit: 'Schneider Electric Harmony XB4 — 22 mm illuminated START / STOP / RESET pushbuttons with LED lenses on a RAL 7035 door; STOP latches until blue RESET',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 14px; padding: 16px 20px 18px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.05) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #d8dcd8, #c3c8c4);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7), inset 0 -2px 0 rgba(0,0,0,.08); }
    .col { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .plate { width: 58px; height: 15px; border-radius: 2px; background: linear-gradient(#2b2d2f, #161718); color: #f3f3f0;
      font: 700 8px/15px "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1.2px; text-align: center;
      box-shadow: 0 1px 0 rgba(255,255,255,.6), inset 0 1px 0 rgba(255,255,255,.12); }
    .pb { position: relative; width: 46px; height: 46px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
      background: conic-gradient(from 30deg, #8d9296, #f4f6f7 12%, #a5aaae 26%, #e7eaec 42%, #7d8287 58%, #f0f2f3 72%, #9a9fa3 86%, #8d9296);
      box-shadow: 0 2px 2px rgba(0,0,0,.35), 0 0 0 1px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.5); -webkit-tap-highlight-color: transparent; }
    .pb::before { content: ''; position: absolute; inset: 5px; border-radius: 50%; background: #2a2c2e; box-shadow: inset 0 1px 2px rgba(0,0,0,.8); }
    .pb:focus-visible { outline: 2px solid #0b63ce; outline-offset: 3px; }
    .cap { position: absolute; inset: 7px; border-radius: 50%; display: grid; place-items: center;
      background: radial-gradient(circle at 50% 38%, var(--c2), var(--c1) 62%, var(--c0));
      box-shadow: inset 0 2px 2px rgba(255,255,255,.35), inset 0 -3px 4px rgba(0,0,0,.35);
      transition: transform .06s ease-out, box-shadow .12s, background .12s; }
    .cap svg { width: 16px; height: 16px; fill: rgba(255,255,255,.88); stroke: rgba(255,255,255,.88); }
    .pb:hover .cap { filter: brightness(1.07); }
    .pb:active .cap, .pb.down .cap { transform: scale(.93); box-shadow: inset 0 1px 1px rgba(255,255,255,.25), inset 0 -1px 3px rgba(0,0,0,.4); }
    .pb.lit .cap { background: radial-gradient(circle at 50% 46%, #fff 0 8%, var(--l1) 38%, var(--l0) 92%);
      box-shadow: 0 0 0 2px var(--l1), 0 0 12px 3px var(--glow), inset 0 0 6px rgba(255,255,255,.6); }
    .pb.blink .cap { animation: blink .9s steps(2, jump-none) infinite; }
    @keyframes blink { 50% { background: radial-gradient(circle at 50% 38%, var(--c2), var(--c1) 62%, var(--c0)); box-shadow: inset 0 2px 2px rgba(255,255,255,.35), inset 0 -3px 4px rgba(0,0,0,.35); } }
    .g { --c0: #0a4320; --c1: #177b3a; --c2: #36ad5f; --l0: #10b143; --l1: #6dff96; --glow: rgba(70,255,120,.65); }
    .r { --c0: #560b0b; --c1: #b0171a; --c2: #db4646; --l0: #f2271d; --l1: #ff8a7f; --glow: rgba(255,60,40,.6); }
    .b { --c0: #0c2860; --c1: #1d54b3; --c2: #4b84e4; --l0: #2a73ff; --l1: #9cc4ff; --glow: rgba(60,130,255,.65); }
    .b .cap svg { fill: none; }
  `,
  html: `<div class="stage">${btn('g', 'START', I)}${btn('r', 'STOP', O)}${btn('b', 'RESET', R)}</div>`,
  init(root) {
    const [g, r, b] = root.querySelectorAll('.pb');
    let state = 'idle';
    const sync = () => {
      g.classList.toggle('lit', state === 'run'); g.setAttribute('aria-pressed', state === 'run');
      r.classList.toggle('lit', state === 'trip');
      b.classList.toggle('lit', state === 'trip'); b.classList.toggle('blink', state === 'trip');
    };
    g.addEventListener('click', () => { if (state === 'idle') state = 'run'; sync(); });
    r.addEventListener('click', () => { state = 'trip'; sync(); });
    b.addEventListener('click', () => { if (state === 'trip') state = 'idle'; sync(); });
    for (const el of [g, r, b]) {
      el.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') el.classList.add('down'); });
      el.addEventListener('keyup', () => el.classList.remove('down'));
      el.addEventListener('blur', () => el.classList.remove('down'));
    }
    sync();
  },
};
