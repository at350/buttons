export default {
  id: 'dp-globe-button',
  credit: 'Wireframe globe button — a lit sphere whose meridians are true projected half-ellipses rotating about a tilted axis while hovered; click selects it with a halo',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 40px 30px; perspective: 600px; background: radial-gradient(120% 100% at 50% 0%, #0f1b3d, #020617 70%); border-radius: 12px; }
    .wrap { position: relative; width: 96px; height: 96px; }
    .globe {
      position: relative; display: block; width: 96px; height: 96px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; background: none;
      transform: translateZ(0); transition: transform .45s cubic-bezier(.3, 1.3, .4, 1), filter .3s;
      -webkit-tap-highlight-color: transparent;
    }
    .globe:hover { transform: translateZ(14px); }
    .globe:active { transform: translateZ(2px) scale(.97); transition-duration: .1s; }
    .globe svg { display: block; width: 96px; height: 96px; overflow: visible; }
    .grid path, .grid line { fill: none; stroke: #dbeafe; stroke-width: 1.1; vector-effect: non-scaling-stroke; }
    .halo { position: absolute; inset: -1px; border-radius: 50%; pointer-events: none; opacity: 0; transition: opacity .35s;
      box-shadow: 0 0 0 2px rgba(253, 230, 138, .95), 0 0 14px 2px rgba(253, 230, 138, .4); }
    .globe[aria-pressed="true"] .halo { opacity: 1; }
    .sh { position: absolute; left: 50%; top: 100%; width: 76px; height: 14px; margin: 6px 0 0 -38px; border-radius: 50%;
      background: radial-gradient(closest-side, rgba(0, 0, 0, .7), transparent); transition: transform .45s, opacity .45s; pointer-events: none; }
    .globe:hover + .sh { transform: scale(.82); opacity: .7; }
    .globe:focus-visible { outline: 2px solid #fff; outline-offset: 8px; }
  `,
  html: `
    <div class="stage"><div class="wrap">
      <button class="globe" type="button" aria-pressed="false" aria-label="World">
        <svg viewBox="-50 -50 100 100" aria-hidden="true">
          <defs>
            <radialGradient id="dpgbocean" cx="40%" cy="36%" r="70%" fx="34%" fy="28%">
              <stop offset="0" stop-color="#7cc4ff"/><stop offset=".45" stop-color="#2563eb"/><stop offset=".85" stop-color="#1e3a8a"/><stop offset="1" stop-color="#0b1a4a"/>
            </radialGradient>
            <radialGradient id="dpgbshade" cx="35%" cy="30%" r="80%">
              <stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/>
            </radialGradient>
            <radialGradient id="dpgbspec" cx="34%" cy="28%" r="30%">
              <stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
            </radialGradient>
            <clipPath id="dpgbclip"><circle r="46"/></clipPath>
          </defs>
          <circle r="46" fill="url(#dpgbocean)"/>
          <g class="grid" clip-path="url(#dpgbclip)" transform="rotate(-20)"></g>
          <circle r="46" fill="url(#dpgbshade)"/>
          <circle r="46" fill="url(#dpgbspec)"/>
          <circle r="45.5" fill="none" stroke="#bfdbfe" stroke-opacity=".35" stroke-width="1"/>
        </svg>
        <span class="halo"></span>
      </button><span class="sh"></span>
    </div></div>`,
  init(root) {
    const g = root.querySelector('.globe'), grid = root.querySelector('.grid');
    const R = 46, NS = 'http://www.w3.org/2000/svg';
    // latitudes: seen edge-on from the equator they are straight chords
    for (const lat of [-60, -30, 0, 30, 60]) {
      const y = R * Math.sin(lat * Math.PI / 180), hw = R * Math.cos(lat * Math.PI / 180);
      const l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', -hw); l.setAttribute('x2', hw); l.setAttribute('y1', y); l.setAttribute('y2', y);
      l.setAttribute('stroke-opacity', lat === 0 ? '.75' : '.5'); grid.appendChild(l);
    }
    const mer = Array.from({ length: 6 }, () => { const p = document.createElementNS(NS, 'path'); grid.appendChild(p); return p; });
    let phase = 12, raf = 0, last = 0, hover = false;
    const draw = () => {
      mer.forEach((p, k) => {
        let lon = ((phase + k * 30) % 180 + 180) % 180 - 90; // -90..90: the visible hemisphere
        const rx = Math.abs(R * Math.sin(lon * Math.PI / 180));
        const sweep = lon > 0 ? 1 : 0;
        p.setAttribute('d', `M0 ${-R}A${rx.toFixed(2)} ${R} 0 0 ${sweep} 0 ${R}`);
        p.setAttribute('stroke-opacity', (0.2 + 0.6 * Math.cos(lon * Math.PI / 180)).toFixed(2));
      });
    };
    const tick = (t) => {
      if (t - last >= 33) { phase += (t - last > 100 ? 33 : t - last) * 0.03; last = t; draw(); }
      raf = hover ? requestAnimationFrame(tick) : 0;
    };
    g.addEventListener('pointerenter', () => { hover = true; if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } });
    g.addEventListener('pointerleave', () => { hover = false; });
    g.addEventListener('click', () => g.setAttribute('aria-pressed', String(g.getAttribute('aria-pressed') !== 'true')));
    draw();
    return () => cancelAnimationFrame(raf);
  },
};
