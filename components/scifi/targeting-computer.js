// Star Wars (1977) — Luke's X-wing targeting computer: the trench rushes in as wireframe, range counts down, the box locks red, fire.
export default {
  id: 'sf-targeting-computer',
  credit: 'Star Wars: A New Hope — X-wing targeting computer (Larry Cuba / Colin Cantwell): wireframe Death Star trench, range count-down and target lock; click to fire',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 280px; max-width: 100%; padding: 14px 16px 18px; border-radius: 12px; overflow: hidden; background: radial-gradient(120% 90% at 50% 0%, #3a3d40, #141516 70%); }
    .hood { position: relative; border-radius: 10px 10px 26px 26px; padding: 8px; background: linear-gradient(#1d1f21, #0b0c0d); box-shadow: inset 0 0 0 2px #45494d, 0 6px 12px #000; cursor: crosshair; outline: none; }
    .hood:focus-visible { box-shadow: inset 0 0 0 2px #ffd23a, 0 6px 12px #000; }
    canvas { display: block; width: 232px; height: 132px; max-width: 100%; border-radius: 4px 4px 18px 18px; background: #000; }
    .hood:active canvas { filter: brightness(1.4); }
  `,
  html: `<div class="stage"><div class="hood" role="button" tabindex="0" aria-label="Fire"><canvas width="464" height="264"></canvas></div></div>`,
  init(root) {
    const hood = root.querySelector('.hood'), cv = root.querySelector('canvas'), c = cv.getContext('2d');
    const W = 232, H = 132; c.scale(2, 2);
    let raf = 0, last = 0, hov = false, z = 0, range = 32000, flash = 0, hit = 0, prev = 0;
    const draw = () => {
      c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
      const vx = W / 2, vy = H * 0.42;
      c.lineWidth = 1; c.strokeStyle = '#ff9b1a'; c.shadowColor = '#ff7a00'; c.shadowBlur = 4;
      c.beginPath();
      for (const [x, y] of [[0, H], [W, H], [0, 0], [W, 0], [W * 0.22, H], [W * 0.78, H]]) { c.moveTo(vx, vy); c.lineTo(x, y); }
      c.stroke();
      for (let i = 0; i < 9; i++) {
        let d = ((i + z) % 9) / 9; d = d * d * d; const k = 0.02 + d;
        const l = vx - W * 0.5 * k * 2, r = vx + W * 0.5 * k * 2, t = vy - vy * k * 2, b = vy + (H - vy) * k * 2;
        c.globalAlpha = Math.min(1, d * 5);
        c.strokeRect(l, t, r - l, b - t);
      }
      c.globalAlpha = 1;
      const lock = range < 2600;
      c.strokeStyle = lock ? '#ff2b14' : '#ffd23a'; c.shadowColor = c.strokeStyle; c.lineWidth = lock ? 2 : 1;
      const s = lock ? 14 + Math.sin(performance.now() / 60) * 2 : 22;
      c.beginPath();
      for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { c.moveTo(vx + sx * s, vy + sy * s * 0.7 - sy * 6); c.lineTo(vx + sx * s, vy + sy * s * 0.7); c.lineTo(vx + sx * s - sx * 8, vy + sy * s * 0.7); }
      c.stroke();
      c.shadowBlur = 0; c.fillStyle = '#ffd23a'; c.font = '600 11px "JetBrains Mono", ui-monospace, monospace'; c.textAlign = 'right';
      c.fillText(String(Math.max(0, Math.round(range))).padStart(5, '0'), W - 8, 14);
      c.textAlign = 'left'; c.fillStyle = '#ff9b1a'; c.fillText(lock ? 'LOCK' : 'RANGE', 8, 14);
      if (flash > 0) { c.fillStyle = hit ? `rgba(255,240,200,${flash})` : `rgba(255,60,20,${flash * 0.5})`; c.fillRect(0, 0, W, H); }
    };
    const tick = (now) => {
      raf = 0; const dt = Math.min(0.1, (now - last) / 1000);
      if (dt < 1 / 30) { raf = requestAnimationFrame(tick); return; }
      last = now;
      if (hov) { z += dt * 2.2; range = range > 0 ? range - dt * 6200 : 0; }
      flash = Math.max(0, flash - dt * 1.6);
      if (!flash && hit && prev) { hit = 0; range = 32000; }
      prev = flash;
      draw();
      if (hov || flash > 0) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) { last = performance.now() - 40; raf = requestAnimationFrame(tick); } };
    const fire = () => { hit = range < 2600 ? 1 : 0; flash = 1; kick(); };
    hood.addEventListener('pointerenter', () => { hov = true; kick(); });
    hood.addEventListener('pointerleave', () => { hov = false; });
    hood.addEventListener('focus', () => { hov = true; kick(); });
    hood.addEventListener('blur', () => { hov = false; });
    hood.addEventListener('click', fire);
    hood.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); } });
    draw();
    return () => { cancelAnimationFrame(raf); raf = 0; hov = false; };
  },
};
