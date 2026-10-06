export default {
  id: 'ty2-nerf-blaster',
  credit: 'Nerf N-Strike Elite blaster (Hasbro) — drag the orange priming slide all the way back, then pull the trigger to fire a foam dart',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 300px; height: 150px; border-radius: 12px; overflow: hidden;
      background: repeating-linear-gradient(135deg, #f3f6fa 0 14px, #e8edf4 14px 28px); }
    svg.gun { position: absolute; left: 10px; top: 14px; width: 240px; height: 126px; }
    .slide { position: absolute; left: 120px; top: 30px; width: 58px; height: 16px; border-radius: 6px; cursor: grab; touch-action: none;
      background: repeating-linear-gradient(90deg, transparent 0 6px, rgba(0,0,0,.18) 6px 8px) 8px 4px / 40px 8px no-repeat, linear-gradient(#ffa24d, #f26a1b 55%, #c44d07);
      box-shadow: 0 2px 0 #8a3500, 0 3px 4px rgba(0,0,0,.25); transition: transform .22s cubic-bezier(.3,1.6,.5,1); }
    .slide.drag { transition: none; cursor: grabbing; }
    .slide:focus-visible, .trig:focus-visible { outline: 3px solid #0072ce; outline-offset: 2px; }
    .trig { position: absolute; left: 127px; top: 80px; width: 13px; height: 24px; border: 0; padding: 0; cursor: pointer; border-radius: 3px 8px 10px 8px;
      background: linear-gradient(90deg, #c44d07, #f26a1b 50%, #ff9447); transform-origin: 50% 0; transition: transform .07s; }
    .trig:active { transform: rotate(18deg); }
    .flag { position: absolute; left: 198px; top: 40px; width: 10px; height: 10px; border-radius: 50%; background: #5b6a7a; box-shadow: inset 0 1px 2px rgba(0,0,0,.5); transition: background .15s, box-shadow .15s; }
    .primed .flag { background: #ff7a1a; box-shadow: 0 0 6px 2px rgba(255,122,26,.7); }
    .dart { position: absolute; left: 214px; top: 56px; width: 40px; height: 9px; border-radius: 2px 5px 5px 2px; opacity: 0; pointer-events: none;
      background: linear-gradient(90deg, #1f6fd1 0 74%, #ff7a1a 74%); box-shadow: inset 0 2px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0,0,0,.15); }
    .stage.dry .gun { animation: dry .18s; }
    @keyframes dry { 50% { transform: translateX(-2px); } }
  `,
  html: `
    <div class="stage">
      <svg class="gun" viewBox="0 0 240 126" aria-hidden="true">
        <path d="M20 30 L200 30 L214 36 L214 52 L200 56 L150 56 L136 66 L118 66 L104 110 L74 112 L80 68 L46 64 L10 70 L4 46 Z" fill="#0072ce"/>
        <path d="M20 30 L200 30 L214 36 L214 40 L20 40 Z" fill="#3a95e8"/>
        <path d="M140 46 L196 46 L196 52 L140 52 Z M30 48 L60 48 L60 54 L30 54 Z" fill="#fff"/>
        <path d="M76 66 L112 66 L100 108 L78 110 Z" fill="#11488a"/>
        <path d="M118 66 L136 66 C150 84 140 102 112 102 L114 96 C132 96 136 84 126 72 Z" fill="#2a2f36"/>
        <rect x="212" y="38" width="10" height="16" rx="2" fill="#f26a1b"/>
        <circle cx="62" cy="40" r="3" fill="#c7d3df"/><circle cx="170" cy="40" r="3" fill="#c7d3df"/>
        <path d="M6 48 L20 46 L22 66 L10 68 Z" fill="#f26a1b"/>
      </svg>
      <div class="slide" role="slider" tabindex="0" aria-label="priming slide" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>
      <span class="flag"></span>
      <span class="dart"></span>
      <button class="trig" type="button" aria-label="trigger"></button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), slide = root.querySelector('.slide'), trig = root.querySelector('.trig'), dart = root.querySelector('.dart');
    const MAX = 44;
    let x = 0, sx = 0, drag = false, primed = false, t = 0;
    const set = () => { slide.style.transform = `translateX(${-x}px)`; slide.setAttribute('aria-valuenow', Math.round(x / MAX * 100)); };
    const prime = () => { primed = true; st.classList.add('primed'); };
    slide.addEventListener('pointerdown', (e) => { drag = true; sx = e.clientX + x; slide.setPointerCapture(e.pointerId); slide.classList.add('drag'); });
    slide.addEventListener('pointermove', (e) => { if (!drag) return; x = Math.max(0, Math.min(MAX, sx - e.clientX)); if (x >= MAX - 2) prime(); set(); });
    const up = () => { if (!drag) return; drag = false; slide.classList.remove('drag'); x = 0; set(); };
    slide.addEventListener('pointerup', up); slide.addEventListener('pointercancel', up); slide.addEventListener('lostpointercapture', up);
    slide.addEventListener('keydown', (e) => {
      if (!['Enter', ' ', 'ArrowLeft'].includes(e.key)) return; e.preventDefault();
      x = MAX; set(); prime(); clearTimeout(t); t = setTimeout(() => { x = 0; set(); }, 220);
    });
    trig.addEventListener('click', () => {
      if (!primed) { st.classList.remove('dry'); void st.offsetWidth; st.classList.add('dry'); return; }
      primed = false; st.classList.remove('primed');
      dart.animate([{ opacity: 1, transform: 'translateX(-30px)' }, { opacity: 1, transform: 'translateX(20px)', offset: .4 }, { opacity: 0, transform: 'translateX(70px) translateY(4px) rotate(4deg)' }],
        { duration: 420, easing: 'cubic-bezier(.1,.7,.3,1)' });
      root.querySelector('.gun').animate([{ transform: 'none' }, { transform: 'translateX(-3px) rotate(-1deg)' }, { transform: 'none' }], { duration: 140 });
    });
    return () => clearTimeout(t);
  },
};
