export default {
  id: 'ty2-nerf-blaster',
  credit: 'Nerf N-Strike Elite blaster (Hasbro) — drag the orange priming slide all the way back, then pull the trigger to fire a foam dart',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 300px; height: 150px; border-radius: 12px; overflow: hidden;
      background: repeating-linear-gradient(135deg, #f3f6fa 0 14px, #e8edf4 14px 28px); }
    svg.gun { position: absolute; left: 10px; top: 14px; width: 240px; height: 126px; }
    .slide { position: absolute; left: 136px; top: 30px; width: 58px; height: 16px; border-radius: 6px; cursor: grab; touch-action: none;
      background: repeating-linear-gradient(90deg, transparent 0 6px, rgba(0,0,0,.18) 6px 8px) 8px 4px / 40px 8px no-repeat, linear-gradient(#ffa24d, #f26a1b 55%, #c44d07);
      box-shadow: 0 2px 0 #8a3500, 0 3px 4px rgba(0,0,0,.25); transition: transform .22s cubic-bezier(.3,1.6,.5,1); }
    .slide.drag { transition: none; cursor: grabbing; }
    .slide:focus-visible, .trig:focus-visible { outline: 3px solid #0072ce; outline-offset: 2px; }
    .trig { position: absolute; left: 134px; top: 78px; width: 12px; height: 24px; border: 0; padding: 0; cursor: pointer; border-radius: 3px 8px 10px 8px;
      background: linear-gradient(90deg, #c44d07, #f26a1b 50%, #ff9447); transform-origin: 50% 0; transition: transform .07s; }
    .trig:active { transform: rotate(18deg); }
    .flag { position: absolute; left: 200px; top: 54px; width: 10px; height: 10px; border-radius: 50%; background: #5b6a7a; box-shadow: inset 0 1px 2px rgba(0,0,0,.5); transition: background .15s, box-shadow .15s; }
    .primed .flag { background: #ff7a1a; box-shadow: 0 0 6px 2px rgba(255,122,26,.7); }
    .dart { position: absolute; left: 222px; top: 55px; width: 40px; height: 9px; border-radius: 2px 5px 5px 2px; opacity: 0; pointer-events: none;
      background: linear-gradient(90deg, #1f6fd1 0 74%, #ff7a1a 74%); box-shadow: inset 0 2px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0,0,0,.15); }
    .stage.dry .gun { animation: dry .18s; }
    @keyframes dry { 50% { transform: translateX(-2px); } }
  `,
  html: `
    <div class="stage">
      <svg class="gun" viewBox="0 0 240 126" aria-hidden="true">
        <defs>
          <linearGradient id="nb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4aa3f0"/><stop offset=".35" stop-color="#0a72d4"/><stop offset="1" stop-color="#064f99"/></linearGradient>
          <linearGradient id="ng" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a636e"/><stop offset="1" stop-color="#2b3138"/></linearGradient>
        </defs>
        <!-- detachable stock with the shoulder-pad and loop -->
        <path fill-rule="evenodd" d="M6 40L44 34L46 72L14 82Q6 82 5 75ZM16 50L36 47L37 64L18 69Z" fill="url(#nb)"/>
        <path d="M4 42L10 41L13 80L7 81Q4 80 4 76Z" fill="#f26a1b"/>
        <rect x="40" y="40" width="10" height="26" rx="2" fill="#2b3138"/>
        <!-- receiver -->
        <path d="M46 30H194L206 36V56L196 60H150L140 66H112L100 62H46Z" fill="url(#nb)"/>
        <path d="M46 30H194L206 36V39H46Z" fill="#7cc0ff" opacity=".5"/>
        <!-- top rail -->
        <rect x="58" y="25" width="56" height="5" rx="1" fill="#2b3138"/><path d="M60 25v5M65 25v5M70 25v5M75 25v5M80 25v5M85 25v5M90 25v5M95 25v5M100 25v5M105 25v5M110 25v5" stroke="#4a525c" stroke-width="1.6"/>
        <!-- white Elite striping and jam door -->
        <path d="M50 44H130L136 49H50Z" fill="#fff"/><path d="M146 44H190L186 49H146Z" fill="#fff"/>
        <rect x="72" y="50" width="40" height="8" rx="2" fill="none" stroke="#063f7a" stroke-width="1.2"/>
        <circle cx="58" cy="54" r="1.8" fill="#c7d3df"/><circle cx="124" cy="54" r="1.8" fill="#c7d3df"/><circle cx="182" cy="54" r="1.8" fill="#c7d3df"/>
        <!-- barrel tip -->
        <rect x="204" y="38" width="12" height="16" rx="2" fill="#f26a1b"/><rect x="214" y="40" width="4" height="12" rx="1" fill="#c44d07"/><circle cx="216" cy="46" r="3" fill="#1b1e22"/>
        <!-- magazine -->
        <path d="M150 60H170L176 112H156Z" fill="url(#ng)"/><path d="M153 70h18M154 78h18M155 86h18M156 94h18M157 102h18" stroke="#20252b" stroke-width="1.2"/>
        <rect x="155" y="108" width="22" height="6" rx="2" fill="#f26a1b"/>
        <!-- grip and trigger guard -->
        <path d="M100 62L126 62L116 112Q114 117 108 117L94 117Q88 116 90 110Z" fill="url(#nb)"/>
        <path d="M96 76l18 2M95 84l17 2M94 92l17 2M93 100l16 2" stroke="#063f7a" stroke-width="1.4"/>
        <path d="M124 64C142 70 146 98 118 102" fill="none" stroke="#2b3138" stroke-width="4" stroke-linecap="round"/>
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
