// Emil Kowalski, animations.dev "multi-state button": fixed-width button, AnimatePresence mode="popLayout",
// each label enters from y: -25 and exits to y: 25 with { type: "spring", duration: 0.3, bounce: 0 },
// loading is the 12-bar spinner he ships in Sonner. Spring (ζ = 1) → linear().
const SPRING = 'linear(0, 0.043, 0.13, 0.242, 0.349, 0.458, 0.549, 0.634, 0.701, 0.761, 0.808, 0.848, 0.879, 0.905, 0.925, 0.941, 0.954, 0.964, 0.972, 0.978, 0.983, 0.987, 0.99, 0.992, 0.994, 0.995, 0.996, 0.997, 0.998, 0.998, 0.999, 0.999, 1)';

export default {
  id: 'mo-status-morph',
  credit: 'Emil Kowalski (animations.dev) multi-state button — idle → spinner → "Login link sent!", each state slides in from −25px and out to +25px on a bounce-0 spring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { padding: 4px; }
    .btn {
      position: relative; display: block; width: 184px; height: 36px; padding: 0; border: 0; border-radius: 8px; overflow: hidden; cursor: pointer; color: #fff;
      font: 500 13.5px Inter, system-ui, sans-serif; background: linear-gradient(180deg, #1994ff 0%, #157cff 100%);
      box-shadow: inset 0 0 1px 1px rgba(255,255,255,.08), 0 1px 1.5px rgba(0,0,0,.32), 0 0 0 .5px #1a94ff;
      transition: transform .16s ease-out, filter .2s;
    }
    .btn:hover { filter: brightness(1.06); } .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #157cff; outline-offset: 3px; }
    .s { position: absolute; inset: 0; display: grid; place-items: center; white-space: nowrap; opacity: 0; transform: translateY(-25px); transition: transform .38s ${SPRING}, opacity .38s ${SPRING}; }
    .s.on { opacity: 1; transform: none; }
    .s.out { opacity: 0; transform: translateY(25px); }
    .sp { position: relative; width: 16px; height: 16px; }
    .sp i { position: absolute; left: -10%; top: -3.9%; width: 24%; height: 8%; border-radius: 6px; background: #fff; animation: f 1.2s linear infinite; transform: rotate(calc(var(--k) * 30deg)) translate(146%); animation-delay: calc(var(--k) * .1s - 1.2s); }
    .sp { translate: 50% 50%; }
    @keyframes f { 0% { opacity: 1; } 100% { opacity: .15; } }
  `,
  html: `
    <div class="wrap">
      <button class="btn" type="button" aria-live="polite">
        <span class="s on" data-s="idle">Send me a login link</span>
        <span class="s" data-s="loading" aria-label="Sending"><span class="sp">${Array.from({ length: 12 }, (_, k) => `<i style="--k:${k}"></i>`).join('')}</span></span>
        <span class="s" data-s="success">Login link sent!</span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn'), states = [...root.querySelectorAll('.s')];
    let cur = 'idle', timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const show = (s) => {
      states.forEach((el) => {
        const on = el.dataset.s === s, was = el.dataset.s === cur;
        el.classList.remove('out');
        if (was && !on) { el.classList.remove('on'); el.classList.add('out'); later(() => { el.style.transition = 'none'; el.classList.remove('out'); el.offsetWidth; el.style.transition = ''; }, 400); }
        if (on) el.classList.add('on');
      });
      cur = s;
    };
    b.addEventListener('click', () => {
      if (cur !== 'idle') return;
      show('loading');
      later(() => show('success'), 1750);
      later(() => show('idle'), 3500);
    });
    return () => timers.forEach(clearTimeout);
  },
};
