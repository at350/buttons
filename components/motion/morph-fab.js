const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-morph-fab',
  credit: 'Morphing FAB — the "+" circle stretches into a horizontal pill and three actions pop in with a staggered spring (Dribbble "morphing fab")',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { position: relative; width: 220px; height: 56px; }
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
      <button class="fab" type="button" aria-expanded="false" aria-label="Create"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
      <button class="act" type="button" style="--i:1" aria-label="Note"><svg viewBox="0 0 24 24"><path d="M4 4h16v16H4zM8 9h8M8 13h6"/></svg></button>
      <button class="act" type="button" style="--i:2" aria-label="Photo"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.5"/></svg></button>
      <button class="act" type="button" style="--i:3" aria-label="Link"><svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg></button>
    </div>`,
  init(root) {
    const box = root.querySelector('.box'), fab = root.querySelector('.fab');
    const set = (o) => { box.classList.toggle('open', o); fab.setAttribute('aria-expanded', String(o)); };
    fab.addEventListener('click', () => set(!box.classList.contains('open')));
    root.querySelectorAll('.act').forEach((a) => a.addEventListener('click', () => set(false)));
    box.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); fab.focus(); } });
  },
};
