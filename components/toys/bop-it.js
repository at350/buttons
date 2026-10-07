export default {
  id: 'ty2-bop-it',
  credit: 'Hasbro Bop It (1996) — purple BOP IT button, yellow TWIST IT crank and cyan PULL IT handle; the grille lights the next command',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 18px 14px 18px 36px; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #20d4d4, #7b2fbf); }
    .toy { position: relative; width: 236px; height: 92px; }
    .body { position: absolute; left: 0; top: 0; width: 236px; height: 92px; overflow: visible; filter: drop-shadow(0 6px 6px rgba(0,0,0,.4)); }
    .grille { position: absolute; left: 38px; top: 30px; width: 30px; height: 30px; border-radius: 50%; z-index: 1;
      background: radial-gradient(circle, #0004 1.5px, transparent 2px) 0 0 / 6px 6px, var(--lc, #3a3a44);
      box-shadow: inset 0 2px 4px rgba(0,0,0,.6), 0 0 var(--glow, 0) var(--lc, transparent); transition: background-color .15s, box-shadow .15s; }
    .bop { position: absolute; left: 100px; top: 20px; width: 52px; height: 52px; z-index: 1; border: 0; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 38% 30%, #e6c6ff, #a54ff0 40%, #6a1fb3 80%); box-shadow: 0 0 0 4px #1a0e2c, 0 0 0 6px #6fd100, 0 6px 0 4px #1a0e2c, 0 8px 8px 4px rgba(0,0,0,.4);
      transform: translateY(-5px); transition: transform .06s, box-shadow .06s; }
    .bop:active, .bop.down { transform: translateY(0); box-shadow: 0 0 0 4px #1a0e2c, 0 0 0 6px #6fd100, 0 1px 0 4px #1a0e2c, 0 2px 3px 4px rgba(0,0,0,.4); }
    .pull { position: absolute; left: -30px; top: 26px; width: 48px; height: 40px; cursor: grab; touch-action: none; transition: transform .3s cubic-bezier(.3,1.7,.5,1); }
    .pull::before { content: ''; position: absolute; left: 14px; top: 15px; width: 34px; height: 10px; border-radius: 2px; background: linear-gradient(#f4f6f8, #a3a9b0 50%, #6d737a); }
    .pull::after { content: ''; position: absolute; left: 0; top: 0; width: 20px; height: 40px; border-radius: 10px;
      background: repeating-linear-gradient(180deg, transparent 0 5px, rgba(0,60,80,.25) 5px 6px), linear-gradient(90deg, #0a9fb5, #5cf0ff 40%, #1cc3d8 70%, #0a8ea3); box-shadow: 0 3px 5px rgba(0,0,0,.4), inset 0 0 0 1px rgba(0,80,100,.4); }
    .twist { position: absolute; right: 0; top: 12px; width: 68px; height: 68px; border-radius: 50%; cursor: grab; touch-action: none;
      background: radial-gradient(circle, transparent 0 56%, rgba(0,0,0,.18) 57% 60%, transparent 61%),
        repeating-conic-gradient(from 0deg, rgba(0,0,0,.0) 0 7deg, rgba(120,80,0,.22) 7deg 10deg),
        radial-gradient(circle at 38% 30%, #fff38a, #f7c600 50%, #c79600);
      box-shadow: 0 5px 8px rgba(0,0,0,.4), inset 0 -3px 4px rgba(0,0,0,.2), 0 0 0 3px #2a1640;
      transition: transform .4s cubic-bezier(.3,1.6,.5,1); }
    .twist::before { content: ''; position: absolute; left: 22px; top: 22px; width: 24px; height: 24px; border-radius: 50%;
      background: radial-gradient(circle at 40% 35%, #fff7b0, #f2c200 60%, #b98a00); box-shadow: 0 0 0 2px #c79600, 0 2px 3px rgba(0,0,0,.35); }
    .twist::after { content: ''; position: absolute; left: 47px; top: 8px; width: 15px; height: 15px; border-radius: 50%;
      background: radial-gradient(circle at 38% 32%, #fffbd0, #ffd400 50%, #c79600); box-shadow: 0 3px 3px rgba(0,0,0,.45), inset 0 -2px 2px rgba(0,0,0,.2); }
    .drag { transition: none !important; cursor: grabbing; }
    .bop:focus-visible, .pull:focus-visible, .twist:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="toy">
      <svg class="body" viewBox="0 0 236 92" aria-hidden="true">
        <defs>
          <linearGradient id="bpb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3f86"/><stop offset=".4" stop-color="#2c1a48"/><stop offset="1" stop-color="#140a24"/></linearGradient>
          <linearGradient id="bpg" x1="0" x2="1"><stop offset="0" stop-color="#d4ff1a"/><stop offset="1" stop-color="#6fd100"/></linearGradient>
        </defs>
        <!-- bent, bone-shaped body flaring at both ends -->
        <path d="M14 26C14 14 26 10 40 14C70 24 110 28 150 18C168 13 184 16 192 28C200 40 200 54 192 64C184 76 168 80 150 74C110 64 70 68 40 78C26 82 14 78 14 66C10 54 10 38 14 26Z" fill="url(#bpb)"/>
        <path d="M22 22C40 16 72 28 110 28C130 28 146 22 160 20" fill="none" stroke="#8a6cc0" stroke-width="2" stroke-linecap="round" opacity=".7"/>
        <!-- lime swooshes -->
        <path d="M30 70C60 60 96 58 130 64C150 68 168 70 186 62C170 76 148 80 128 74C96 66 64 68 30 70Z" fill="url(#bpg)"/>
        <path d="M70 22C90 30 118 32 146 24C132 34 104 38 70 22Z" fill="url(#bpg)" opacity=".85"/>
        <!-- grille bezel -->
        <circle cx="53" cy="45" r="19" fill="#120820" stroke="#6fd100" stroke-width="2"/>
        <!-- end collars for the pull handle and twister -->
        <path d="M14 30C8 34 6 40 6 46C6 52 8 58 14 62L18 60C14 52 14 40 18 32Z" fill="#0a9fb5"/>
        <circle cx="203" cy="46" r="34" fill="#2a1640"/>
      </svg><span class="grille"></span>
      <button class="bop" type="button" aria-label="bop it"></button>
      <div class="pull" role="button" tabindex="0" aria-label="pull it"></div>
      <div class="twist" role="button" tabindex="0" aria-label="twist it"></div>
    </div></div>`,
  init(root) {
    const g = root.querySelector('.grille'), pull = root.querySelector('.pull'), twist = root.querySelector('.twist'), bop = root.querySelector('.bop');
    const C = { bop: '#b46cff', twist: '#ffd400', pull: '#2fe3f5' };
    let want = 'bop', t = 0;
    const cue = () => { want = ['bop', 'twist', 'pull'][Math.floor(Math.random() * 3)]; g.style.setProperty('--lc', C[want]); g.style.setProperty('--glow', '12px'); };
    const hit = (what) => {
      g.style.setProperty('--lc', what === want ? '#3cff6a' : '#ff3030'); g.style.setProperty('--glow', '14px');
      clearTimeout(t); t = setTimeout(cue, 380);
    };
    bop.addEventListener('click', () => hit('bop'));
    const dragger = (el, axis, limit, act, map) => {
      let s = 0, v = 0, on = false;
      el.addEventListener('pointerdown', (e) => { on = true; s = e.clientX; el.setPointerCapture(e.pointerId); el.classList.add('drag'); });
      el.addEventListener('pointermove', (e) => { if (!on) return; v = Math.max(-limit, Math.min(limit, e.clientX - s)); el.style.transform = map(v); });
      const up = () => { if (!on) return; on = false; el.classList.remove('drag'); if ((axis ? v * axis : Math.abs(v)) > limit * 0.6) hit(act); v = 0; el.style.transform = map(0); };
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('lostpointercapture', up);
      el.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return; e.preventDefault();
        el.style.transform = map((axis || 1) * limit); setTimeout(() => { el.style.transform = map(0); hit(act); }, 180);
      });
    };
    dragger(pull, -1, 26, 'pull', (v) => `translateX(${Math.min(0, v)}px)`);
    dragger(twist, 0, 60, 'twist', (v) => `rotate(${v * 2}deg)`);
    cue();
    return () => clearTimeout(t);
  },
};
