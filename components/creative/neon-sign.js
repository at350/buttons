export default {
  id: 'cr-neon-sign',
  credit: 'Neon "Open" sign — tube text-shadow glow that stutters on like a real transformer kicking in, then holds steady',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0a0a12; padding: 30px 38px; border-radius: 12px; }
    .btn {
      --c: #ff2bd6; cursor: pointer; background: transparent;
      font: italic 700 30px/1 'Playfair Display', Georgia, serif; letter-spacing: .03em;
      color: #5a2350; border: 3px solid #4a1d44; border-radius: 14px; padding: 10px 28px 12px;
      transition: color .2s ease, border-color .2s ease, box-shadow .2s ease, text-shadow .2s ease;
    }
    .btn.lit {
      color: #fff5fd; border-color: #ffd1f6;
      text-shadow: 0 0 4px #fff, 0 0 10px var(--c), 0 0 22px var(--c), 0 0 42px var(--c);
      box-shadow: 0 0 4px #fff, 0 0 10px var(--c), 0 0 26px var(--c), inset 0 0 10px var(--c);
    }
    .btn.ignite { animation: ignite .9s steps(1, end) both; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #ffd1f6; outline-offset: 5px; }
    @keyframes ignite {
      0% { opacity: 1; } 8% { opacity: .25; } 12% { opacity: 1; } 22% { opacity: .35; } 26% { opacity: 1; }
      44% { opacity: .5; } 48% { opacity: 1; } 100% { opacity: 1; }
    }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false">Open</button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    let on = false, hover = false;
    const sync = (flicker) => {
      const lit = on || hover;
      if (lit && !b.classList.contains('lit') && flicker) { b.classList.remove('ignite'); void b.offsetWidth; b.classList.add('ignite'); }
      b.classList.toggle('lit', lit);
    };
    b.addEventListener('pointerenter', () => { hover = true; sync(true); });
    b.addEventListener('pointerleave', () => { hover = false; sync(false); });
    b.addEventListener('focus', () => { if (b.matches(':focus-visible')) { hover = true; sync(true); } });
    b.addEventListener('blur', () => { hover = false; sync(false); });
    b.addEventListener('animationend', () => b.classList.remove('ignite'));
    b.addEventListener('click', () => { on = !on; b.setAttribute('aria-pressed', String(on)); sync(true); });
  },
};
