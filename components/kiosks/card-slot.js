export default {
  id: 'ks-card-slot',
  credit: 'ATM motorised card reader — flared bezel with the blinking green lead-through light; the card is drawn in, and ejects on the next press',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 26px 18px; border-radius: 12px; background: linear-gradient(#c9c6bd, #a29e94); box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
    .pict { display: flex; align-items: center; gap: 6px; color: #2d2d2d; font: 700 10px/1 Inter, system-ui, sans-serif; letter-spacing: .08em; }
    .pict svg { width: 22px; height: 22px; }
    .well { position: relative; width: 150px; height: 74px; overflow: hidden; }
    .card { position: absolute; left: 22px; bottom: -18px; width: 106px; height: 82px; border-radius: 6px 6px 0 0; padding: 10px 10px 0;
      background: linear-gradient(135deg, #1f3a93, #2f6fd6 55%, #1a2f7a); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2);
      transition: transform .9s cubic-bezier(.45,.05,.3,1); }
    .chip { width: 20px; height: 15px; border-radius: 3px; background: linear-gradient(135deg, #f3d98b, #b8913b); box-shadow: inset 0 0 0 1px rgba(0,0,0,.25); }
    .stripe { margin-top: 10px; height: 4px; width: 60px; border-radius: 2px; background: rgba(255,255,255,.35); }
    .logo { position: absolute; right: 9px; top: 9px; width: 30px; height: 13px; fill: #fff; }
    .slot { position: relative; display: block; width: 190px; height: 46px; border: 0; padding: 0; cursor: pointer; border-radius: 8px;
      background: linear-gradient(#5b5d61, #2a2b2e 60%, #1a1b1d); box-shadow: 0 4px 0 #6f6c64, 0 6px 10px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.25); -webkit-tap-highlight-color: transparent; }
    .slot:focus-visible { outline: 2px solid #2f6fd6; outline-offset: 3px; }
    .mouth { position: absolute; left: 20px; right: 20px; top: 12px; height: 9px; border-radius: 5px; background: #050505; box-shadow: inset 0 3px 3px #000, 0 1px 0 rgba(255,255,255,.25); }
    .led { position: absolute; left: 14px; right: 14px; top: 29px; height: 6px; border-radius: 3px; background: #1c4a22; transition: background .2s, box-shadow .2s; }
    .stage:not(.in) .led { animation: blink 1s steps(1) infinite; }
    @keyframes blink { 0%, 49% { background: #3cff6a; box-shadow: 0 0 10px 2px rgba(60,255,106,.7); } 50%, 100% { background: #1c4a22; box-shadow: none; } }
    .stage.in .card { transform: translateY(110px); }
    .stage.busy .led { animation: none; background: #ffb020; box-shadow: 0 0 8px 1px rgba(255,176,32,.6); }
    .slot:hover .mouth { box-shadow: inset 0 3px 3px #000, 0 1px 0 rgba(255,255,255,.45); }
    .slot:active { transform: translateY(1px); }
    .stage.busy .slot { cursor: progress; }
    .stage.in .pict { opacity: .55; }
  `,
  html: `
    <div class="stage">
      <div class="pict"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/><path d="M6 14h2"/></svg>INSERT CARD</div>
      <div class="well"><div class="card"><div class="chip"></div><div class="stripe"></div>
        <svg class="logo" viewBox="0 0 24 10" aria-hidden="true"><path transform="translate(0 -7)" d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.660 3.660 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.020-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"/></svg>
      </div></div>
      <button class="slot" type="button" aria-label="Insert card" aria-pressed="false"><span class="mouth"></span><span class="led"></span></button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), b = root.querySelector('.slot');
    let t;
    b.addEventListener('click', () => {
      if (st.classList.contains('busy')) return;
      const inn = !st.classList.contains('in');
      st.classList.toggle('in', inn); b.setAttribute('aria-pressed', String(inn));
      b.setAttribute('aria-label', inn ? 'Eject card' : 'Insert card');
      st.classList.add('busy'); clearTimeout(t); t = setTimeout(() => st.classList.remove('busy'), 900);
    });
    return () => clearTimeout(t);
  },
};
