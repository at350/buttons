// iPhone Dynamic Island — the black capsule (126×37pt, scaled) morphs between idle, an incoming-call card and the
// compact in-call pill. Apple drives it with a bouncy spring; here response .5s / damping .7 → linear().
// Accept/decline glyphs are the filled phone (Phosphor "phone-fill"), decline rotated 135° like iOS.
const BOUNCY = 'linear(0, 0.044, 0.144, 0.278, 0.422, 0.555, 0.68, 0.785, 0.867, 0.932, 0.98, 1.012, 1.031, 1.041, 1.045, 1.043, 1.039, 1.033, 1.027, 1.021, 1.015, 1.01, 1.007, 1.003, 1.001, 1, 0.999, 0.998, 0.998, 0.998, 0.998, 0.998, 1)';
const PHONE = '<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,117.39,96c-.18.27-.37.52-.57.77L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,231.88,175.08Z"/></svg>';

export default {
  id: 'mo-dynamic-island',
  credit: 'Apple Dynamic Island (iPhone 14 Pro) — tap the capsule for an incoming call: it springs open into the call card, Accept shrinks it into the green in-call pill, tap again to hang up',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; height: 124px; max-width: 100%; border-radius: 12px; overflow: hidden; font-family: system-ui, -apple-system, 'SF Pro Text', Inter, sans-serif; background: #dcdcdc url(assets/tall/07.webp) center 44% / 100% auto no-repeat; }
    .sb { position: absolute; top: 15px; left: 26px; right: 22px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 600; color: #000; letter-spacing: -.01em; }
    .sb svg { height: 11px; fill: #000; }
    .isl {
      position: absolute; top: 9px; left: 50%; width: var(--w); height: var(--h); translate: -50% 0; border-radius: calc(var(--h) / 2); background: #000; color: #fff; overflow: hidden;
      transition: width .78s ${BOUNCY}, height .78s ${BOUNCY}, border-radius .78s ${BOUNCY}; --w: 120px; --h: 34px;
    }
    .isl[data-s="ring"] { --w: 284px; --h: 80px; }
    .isl[data-s="call"] { --w: 168px; }
    .isl[data-s="idle"]:hover { --w: 126px; --h: 36px; }
    .tap { position: absolute; inset: 0; border: 0; padding: 0; background: transparent; border-radius: inherit; cursor: pointer; z-index: 3; }
    .tap:focus-visible { outline: 2px solid #0a84ff; outline-offset: 2px; }
    .isl[data-s="ring"] .tap { display: none; }
    .lay { position: absolute; inset: 0; display: flex; align-items: center; opacity: 0; filter: blur(6px); transform: scale(.86); transition: opacity .18s, filter .18s, transform .35s ${BOUNCY}; pointer-events: none; }
    .isl[data-s="ring"] .ringing, .isl[data-s="call"] .incall { opacity: 1; filter: none; transform: none; transition: opacity .3s .14s, filter .3s .14s, transform .6s .1s ${BOUNCY}; pointer-events: auto; }
    .ringing { padding: 0 18px 0 18px; gap: 12px; }
    .av { display: block; width: 46px; height: 46px; border-radius: 50%; flex: none; object-fit: cover; background: #2c2c2e; }
    .who { display: flex; flex-direction: column; flex: 1; min-width: 0; text-align: left; }
    .who small { font-size: 12px; color: #98989f; } .who b { font-size: 16px; font-weight: 600; letter-spacing: -.01em; white-space: nowrap; }
    .ringing button { width: 44px; height: 44px; border-radius: 50%; border: 0; display: grid; place-items: center; cursor: pointer; flex: none; transition: transform .25s ${BOUNCY}, filter .2s; }
    .ringing button:hover { filter: brightness(1.12); } .ringing button:active { transform: scale(.88); }
    .ringing button:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .ringing button svg { width: 20px; height: 20px; fill: #fff; }
    .dec { background: #ff3b30; } .dec svg { transform: rotate(135deg); } .acc { background: #34c759; }
    .incall { justify-content: space-between; padding: 0 14px; }
    .incall svg { width: 15px; height: 15px; fill: #34c759; }
    .t { font-size: 13px; font-weight: 600; color: #34c759; font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="stage">
      <div class="sb"><span>9:41</span><svg viewBox="0 0 64 22" aria-hidden="true"><rect x="0" y="12" width="4" height="8" rx="1"/><rect x="6" y="9" width="4" height="11" rx="1"/><rect x="12" y="5" width="4" height="15" rx="1"/><rect x="18" y="1" width="4" height="19" rx="1"/><rect x="33" y="2" width="26" height="17" rx="5" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="1.6"/><rect x="35.5" y="4.5" width="18" height="12" rx="3"/><rect x="60.5" y="7.5" width="2" height="6" rx="1" fill-opacity=".45"/></svg></div>
      <div class="isl" data-s="idle">
        <button class="tap" type="button" aria-label="Simulate incoming call"></button>
        <div class="lay ringing" role="group" aria-label="Incoming call">
          <img class="av" src="assets/portraits/women-04.jpg" alt="" width="46" height="46"><span class="who"><small>mobile</small><b>Mia Jones</b></span>
          <button class="dec" type="button" aria-label="Decline" tabindex="-1">${PHONE}</button><button class="acc" type="button" aria-label="Accept" tabindex="-1">${PHONE}</button>
        </div>
        <div class="lay incall" aria-hidden="true">${PHONE}<span class="t">0:00</span></div>
      </div>
    </div>`,
  init(root) {
    const isl = root.querySelector('.isl'), tap = root.querySelector('.tap'), t = root.querySelector('.t');
    const dec = root.querySelector('.dec'), acc = root.querySelector('.acc');
    let iv = 0, s = 0;
    const set = (st) => {
      isl.dataset.s = st;
      dec.tabIndex = acc.tabIndex = st === 'ring' ? 0 : -1;
      tap.setAttribute('aria-label', st === 'call' ? 'End call' : 'Simulate incoming call');
      clearInterval(iv); iv = 0;
      if (st === 'call') { s = 0; t.textContent = '0:00'; iv = setInterval(() => { s++; t.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }, 1000); }
      if (st === 'ring') setTimeout(() => acc.focus({ preventScroll: true }), 50);
      else if (root.activeElement && root.activeElement !== tap) tap.focus({ preventScroll: true });
    };
    tap.addEventListener('click', () => set(isl.dataset.s === 'idle' ? 'ring' : 'idle'));
    dec.addEventListener('click', () => set('idle'));
    acc.addEventListener('click', () => set('call'));
    isl.addEventListener('keydown', (e) => { if (e.key === 'Escape') set('idle'); });
    return () => clearInterval(iv);
  },
};
