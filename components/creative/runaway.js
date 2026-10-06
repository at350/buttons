export default {
  id: 'cr-runaway',
  credit: 'Button that runs away from the cursor — the "uncatchable No button" meme',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 150px; max-width: 100%; border-radius: 12px; background: #ecfeff; overflow: hidden; }
    .btn {
      position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); cursor: pointer;
      font: 700 15px/1 system-ui, sans-serif; color: #fff; background: #0891b2; border: 0; border-radius: 999px;
      padding: 14px 26px; box-shadow: 0 6px 16px rgba(8, 145, 178, .35);
      transition: left .22s cubic-bezier(.2, .8, .2, 1), top .22s cubic-bezier(.2, .8, .2, 1), background .3s, transform .2s;
    }
    .btn:hover { background: #0e7490; }
    .btn.caught { background: #16a34a; box-shadow: 0 6px 16px rgba(22, 163, 74, .35); }
    .btn.caught:hover { transform: translate(-50%, -50%) scale(1.06); }
    .btn:focus-visible { outline: 2px solid #0891b2; outline-offset: 3px; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false">Catch me</button></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), btn = root.querySelector('.btn');
    let caught = false, last = 0;
    stage.addEventListener('mousemove', (e) => {
      if (caught) return;
      const now = performance.now(); if (now - last < 120) return;
      const r = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      if (Math.hypot(dx, dy) > 70) return;
      last = now;
      const s = stage.getBoundingClientRect();
      const w = r.width, h = r.height;
      let nx = (cx - s.left) - Math.sign(dx || 1) * (60 + Math.random() * 60);
      let ny = (cy - s.top) - Math.sign(dy || 1) * (30 + Math.random() * 40);
      nx = Math.max(w / 2 + 6, Math.min(s.width - w / 2 - 6, nx));
      ny = Math.max(h / 2 + 6, Math.min(s.height - h / 2 - 6, ny));
      btn.style.left = nx.toFixed(0) + 'px';
      btn.style.top = ny.toFixed(0) + 'px';
    });
    btn.addEventListener('click', () => {
      caught = !caught;
      btn.classList.toggle('caught', caught);
      btn.setAttribute('aria-pressed', String(caught));
      btn.textContent = caught ? 'Caught!' : 'Catch me';
      if (!caught) { btn.style.left = ''; btn.style.top = ''; }
    });
  },
};
