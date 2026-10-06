// Morphing FAB: the 56px circle stretches into a pill on a spring (stiffness 300, damping 24 → linear()), the plus turns
// 135° into a close icon and three actions pop in 55ms apart. Lucide icons.
const SPRING = 'linear(0, 0.032, 0.103, 0.206, 0.315, 0.435, 0.543, 0.649, 0.743, 0.818, 0.885, 0.934, 0.975, 1.004, 1.025, 1.038, 1.045, 1.047, 1.046, 1.043, 1.039, 1.034, 1.028, 1.023, 1.018, 1.013, 1.009, 1.006, 1.004, 1.002, 1, 0.999, 0.998, 0.998, 0.998, 0.998, 0.998, 0.998, 0.998, 0.999, 1)';

export default {
  id: 'mo-morph-fab',
  credit: 'Morphing FAB — the "+" circle stretches into a horizontal pill and three actions pop in with a staggered spring (Dribbble "morphing fab")',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { position: relative; width: 232px; height: 56px; }
    .pill {
      position: absolute; left: 0; top: 0; height: 56px; width: var(--w, 56px); border-radius: 28px; background: #111; box-shadow: 0 8px 24px -8px rgba(0,0,0,.45);
      transition: width .6s ${SPRING}, background .3s;
    }
    .box.open .pill { --w: 220px; background: #1a1a1a; }
    .fab { position: absolute; left: 0; top: 0; width: 56px; height: 56px; border: 0; border-radius: 50%; background: transparent; color: #fff; cursor: pointer; display: grid; place-items: center; z-index: 2; }
    .fab:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .fab svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; transition: transform .6s ${SPRING}; }
    .fab:hover svg { transform: scale(1.12); }
    .box.open .fab svg { transform: rotate(135deg); }
    .act {
      position: absolute; top: 8px; left: calc(56px + (var(--i) - 1) * 52px); width: 40px; height: 40px; border-radius: 50%; border: 0; background: rgba(255,255,255,.1); color: #fff; cursor: pointer;
      display: grid; place-items: center; opacity: 0; transform: scale(.3) translateX(-20px); pointer-events: none;
      transition: transform .55s ${SPRING}, opacity .25s, background .2s; transition-delay: 0s;
    }
    .act:hover { background: rgba(255,255,255,.22); } .act:active { transform: scale(.9); transition-duration: .1s; }
    .act:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .box.open .act { opacity: 1; transform: none; pointer-events: auto; transition-delay: calc(var(--i) * 55ms + 80ms); }
    .act svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="box">
      <span class="pill"></span>
      <button class="fab" type="button" aria-expanded="false" aria-label="Create"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
      <button class="act" type="button" style="--i:1" aria-label="Note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></button>
      <button class="act" type="button" style="--i:2" aria-label="Photo"><svg viewBox="0 0 24 24" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button>
      <button class="act" type="button" style="--i:3" aria-label="Link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button>
    </div>`,
  init(root) {
    const box = root.querySelector('.box'), fab = root.querySelector('.fab');
    const set = (o) => { box.classList.toggle('open', o); fab.setAttribute('aria-expanded', String(o)); };
    fab.addEventListener('click', () => set(!box.classList.contains('open')));
    root.querySelectorAll('.act').forEach((a) => a.addEventListener('click', () => set(false)));
    box.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); fab.focus(); } });
  },
};
