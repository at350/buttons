// Material 3 common buttons (filled, filled tonal, outlined), baseline purple scheme. Ripple follows Material Web:
// the press layer grows from the pointer over 450ms on the emphasized curve, then fades out over 375ms on release.
export default {
  id: 'bt-material-buttons',
  credit: 'Google Material 3 — filled, filled tonal and outlined buttons with state layers and ripple',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 8px; align-items: center; white-space: nowrap; }
    .m3 {
      position: relative; overflow: hidden; isolation: isolate;
      height: 40px; padding: 0 24px; border: 0; border-radius: 20px;
      font: 500 14px/20px "Roboto Flex", Roboto, sans-serif; letter-spacing: .1px;
      display: inline-flex; align-items: center; gap: 8px;
      cursor: pointer; -webkit-tap-highlight-color: transparent; outline: none;
      transition: box-shadow 280ms cubic-bezier(.2,0,0,1);
    }
    .m3.ic { padding-left: 16px; }
    .m3 svg { width: 18px; height: 18px; fill: currentColor; flex: none; }
    .m3::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: currentColor; opacity: 0; transition: opacity 15ms linear; z-index: -1; }
    .m3:hover::before { opacity: .08; }
    .m3:focus-visible::before { opacity: .1; }
    .m3:focus-visible { box-shadow: 0 0 0 2px #fef7ff, 0 0 0 5px #625b71; }
    .filled { background: #6750a4; color: #fff; }
    .filled:hover { box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15); }
    .tonal { background: #e8def8; color: #1d192b; }
    .tonal:hover { box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15); }
    .outlined { background: transparent; color: #6750a4; box-shadow: inset 0 0 0 1px #79747e; }
    .outlined:focus-visible { box-shadow: inset 0 0 0 1px #6750a4, 0 0 0 2px #fef7ff, 0 0 0 5px #625b71; }
    .rp { position: absolute; border-radius: 50%; background: currentColor; opacity: .1; pointer-events: none; z-index: -1; transform: scale(.2);
      transition: transform 450ms cubic-bezier(.2,0,0,1); }
    .rp.grow { transform: scale(1); }
    .rp.out { opacity: 0; transition: transform 450ms cubic-bezier(.2,0,0,1), opacity 375ms linear; }
  `,
  html: `
    <div class="row">
      <button class="m3 filled ic" type="button"><svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>Send</button>
      <button class="m3 tonal" type="button">Save draft</button>
      <button class="m3 outlined" type="button">Discard</button>
    </div>`,
  init(root) {
    const off = [];
    root.querySelectorAll('.m3').forEach((b) => {
      let cur = null;
      const release = () => {
        const r = cur; cur = null; if (!r) return;
        r.classList.add('out');
        setTimeout(() => r.remove(), 450);
      };
      const down = (e) => {
        release();
        const rect = b.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const d = 2 * Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
        const r = document.createElement('span');
        r.className = 'rp';
        r.style.cssText = `width:${d}px;height:${d}px;left:${x - d / 2}px;top:${y - d / 2}px`;
        b.appendChild(r); cur = r;
        requestAnimationFrame(() => r.classList.add('grow'));
      };
      b.addEventListener('pointerdown', down);
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((t) => b.addEventListener(t, release));
      off.push(release);
    });
    return () => off.forEach((f) => f());
  },
};
