export default {
  id: 'ty2-bop-it',
  credit: 'Hasbro Bop It (1996) — purple BOP IT button, yellow TWIST IT crank and cyan PULL IT handle; the grille lights the next command',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 18px 14px 18px 36px; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #20d4d4, #7b2fbf); }
    .toy { position: relative; width: 236px; height: 92px; }
    .body { position: absolute; left: 8px; top: 14px; width: 186px; height: 64px; border-radius: 32px 18px 18px 32px;
      background: linear-gradient(#4a4a55, #24242b 55%, #121216); box-shadow: 0 6px 10px rgba(0,0,0,.45), inset 0 2px 0 rgba(255,255,255,.18); }
    .swoosh { position: absolute; left: 30px; top: 50px; width: 150px; height: 8px; border-radius: 4px; background: linear-gradient(90deg, #c6f000, #7ad100); transform: skewX(-20deg); }
    .grille { position: absolute; left: 32px; top: 24px; width: 30px; height: 30px; border-radius: 50%;
      background: radial-gradient(circle, #0004 1.5px, transparent 2px) 0 0 / 6px 6px, var(--lc, #3a3a44);
      box-shadow: inset 0 2px 4px rgba(0,0,0,.6), 0 0 var(--glow, 0) var(--lc, transparent); transition: background-color .15s, box-shadow .15s; }
    .bop { position: absolute; left: 92px; top: 20px; width: 52px; height: 52px; border: 0; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 38% 30%, #d7a6ff, #8e3fd6 45%, #5a1a99); box-shadow: 0 6px 0 #3d0f6b, 0 8px 8px rgba(0,0,0,.4);
      transform: translateY(-5px); transition: transform .06s, box-shadow .06s; }
    .bop:active, .bop.down { transform: translateY(0); box-shadow: 0 1px 0 #3d0f6b, 0 2px 3px rgba(0,0,0,.4); }
    .pull { position: absolute; left: -30px; top: 28px; width: 46px; height: 36px; cursor: grab; touch-action: none; transition: transform .3s cubic-bezier(.3,1.7,.5,1); }
    .pull::before { content: ''; position: absolute; left: 14px; top: 13px; width: 32px; height: 10px; background: linear-gradient(#ddd, #888); }
    .pull::after { content: ''; position: absolute; left: 0; top: 0; width: 18px; height: 36px; border-radius: 9px;
      background: linear-gradient(90deg, #0a9fb5, #2fe3f5 45%, #11b8cc); box-shadow: 0 3px 5px rgba(0,0,0,.4); }
    .twist { position: absolute; right: 0; top: 12px; width: 68px; height: 68px; border-radius: 50%; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 38% 30%, #fff38a, #f7c600 50%, #c79600); box-shadow: 0 5px 8px rgba(0,0,0,.4), inset 0 -3px 4px rgba(0,0,0,.2);
      transition: transform .4s cubic-bezier(.3,1.6,.5,1); }
    .twist::before { content: ''; position: absolute; left: 6px; right: 6px; top: 28px; height: 12px; border-radius: 6px; background: linear-gradient(#ffe75a, #d9a900); box-shadow: 0 2px 2px rgba(0,0,0,.3); }
    .drag { transition: none !important; cursor: grabbing; }
    .bop:focus-visible, .pull:focus-visible, .twist:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="toy">
      <div class="body"><span class="swoosh"></span><span class="grille"></span></div>
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
