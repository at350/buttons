export default {
  id: 'cr-magnetic',
  credit: 'Magnetic button — Cuberto: body and label follow the cursor at different strengths, fill rises from below, elastic spring back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 270px; height: 150px; max-width: 100%; border-radius: 12px; background: #fff; display: grid; place-items: center; overflow: hidden; }
    .btn {
      position: relative; overflow: hidden; isolation: isolate; width: 156px; height: 60px; border: 1px solid rgba(0, 0, 0, .18); border-radius: 999px;
      background: transparent; cursor: pointer; padding: 0; will-change: transform; color: #000;
      font: 500 16px/1 Inter, system-ui, sans-serif; letter-spacing: -.01em;
    }
    .fill {
      position: absolute; left: -10%; top: 0; width: 120%; height: 200%; z-index: -1; border-radius: 50%; background: #000;
      transform: translateY(76%) scaleY(.6); transition: transform .5s cubic-bezier(.4, 0, 0, 1), border-radius .5s cubic-bezier(.4, 0, 0, 1);
    }
    .btn:hover .fill, .btn:focus-visible .fill { transform: translateY(-25%) scaleY(1); border-radius: 0; }
    .txt { display: inline-block; transition: color .3s cubic-bezier(.4, 0, 0, 1); will-change: transform; white-space: nowrap; }
    .btn:hover .txt, .btn:focus-visible .txt { color: #fff; }
    .btn:active .fill { background: #262626; }
    .btn:focus-visible { outline: 2px solid #000; outline-offset: 4px; }
  `,
  html: `<div class="stage"><button class="btn" type="button"><span class="fill" aria-hidden="true"></span><span class="txt">Get in touch</span></button></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), btn = root.querySelector('.btn'), txt = root.querySelector('.txt');
    let tx = 0, ty = 0, x = 0, y = 0, vx = 0, vy = 0, raf = 0, over = false;
    const step = () => {
      // damped spring: snappy follow while hovered, elastic overshoot on release
      const k = over ? .16 : .09, d = over ? .62 : .78;
      vx = vx * d + (tx - x) * k; vy = vy * d + (ty - y) * k;
      x += vx; y += vy;
      btn.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      txt.style.transform = `translate3d(${(x * .5).toFixed(2)}px, ${(y * .5).toFixed(2)}px, 0)`;
      if (over || Math.abs(vx) + Math.abs(vy) + Math.abs(tx - x) + Math.abs(ty - y) > .05) raf = requestAnimationFrame(step);
      else { raf = 0; btn.style.transform = txt.style.transform = ''; }
    };
    const run = () => { if (!raf) raf = requestAnimationFrame(step); };
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      over = true; tx = dx * .32; ty = dy * .32; run();
    });
    stage.addEventListener('pointerleave', () => { over = false; tx = 0; ty = 0; run(); });
    return () => cancelAnimationFrame(raf);
  },
};
