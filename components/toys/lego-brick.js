const P = 22, C30 = Math.cos(Math.PI / 6) * P, S30 = 0.5 * P, OX = 86, OY = 74;
const iso = (x, y, z) => [OX + (x - y) * C30, OY + (x + y) * S30 - z * P];
const poly = (pts, fill) => `<path d="M${pts.map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L')} Z" fill="${fill}"/>`;
const box = (x0, y0, x1, y1, z0, z1, top, left, right) =>
  poly([iso(x0, y1, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x0, y1, z1)], left) +
  poly([iso(x1, y0, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x1, y0, z1)], right) +
  poly([iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1)], top);
const stud = (x, y, z, top, side, logo) => {
  const [cx, cy] = iso(x, y, z), rx = 0.3 * P * 1.2247, ry = 0.3 * P * 0.7071, h = 0.2 * P;
  return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${side}"/>` +
    `<rect x="${(cx - rx).toFixed(1)}" y="${(cy - h).toFixed(1)}" width="${(2 * rx).toFixed(1)}" height="${h.toFixed(1)}" fill="${side}"/>` +
    `<ellipse cx="${cx.toFixed(1)}" cy="${(cy - h).toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${top}"/>` +
    (logo ? `<text x="${cx.toFixed(1)}" y="${(cy - h + 1.2).toFixed(1)}" transform="rotate(-8 ${cx.toFixed(1)} ${(cy - h).toFixed(1)})" class="lg">LEGO</text>` : '');
};
const studs = (x0, y0, nx, ny, z, top, side, logo, skip = () => false) => {
  let s = ''; for (let k = 0; k <= nx + ny; k++) for (let i = 0; i < nx; i++) { const j = k - i; if (j < 0 || j >= ny || skip(i, j)) continue; s += stud(x0 + i + 0.5, y0 + j + 0.5, z, top, side, logo); }
  return s;
};
const under = (i, j) => i >= 1 && i < 5 && j >= 1 && j < 3, front = (i, j) => i >= 5 || j >= 3;
const PLATE = box(0, 0, 6, 4, -0.4, 0, '#00a83a', '#006b23', '#00852b') + studs(0, 0, 6, 4, 0, '#22c45a', '#00852b', false, (i, j) => under(i, j) || front(i, j));
const FRONT = studs(0, 0, 6, 4, 0, '#22c45a', '#00852b', false, (i, j) => !front(i, j));
const BRICK = box(1, 1, 5, 3, 0, 1.2, '#e8261f', '#a30b0e', '#d01012') + studs(1, 1, 4, 2, 1.2, '#f2443d', '#b30d10', true);

export default {
  id: 'ty2-lego-brick',
  credit: 'LEGO 2×4 brick (1958 stud-and-tube patent) — bright red #d01012 on a green baseplate; click it and it snaps down onto the studs, click to pull it off',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 8px 12px; border-radius: 12px; overflow: hidden; background: linear-gradient(#fff8d8, #f8e7a6); }
    .lego { display: block; width: 210px; height: 180px; border: 0; padding: 0; background: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .lego svg { display: block; width: 100%; height: 100%; }
    .lego:focus-visible { outline: 3px solid #d01012; outline-offset: 2px; border-radius: 10px; }
    .brick { transform: translateY(-30px); transition: transform .32s cubic-bezier(.3,1.5,.5,1); }
    .shadow { opacity: .18; transform-box: fill-box; transform-origin: center; transform: scale(.85); transition: opacity .3s, transform .3s; }
    .lego:hover .brick { transform: translateY(-36px); }
    .lego:active .brick { transform: translateY(-4px); transition-duration: .1s; }
    .lego[aria-pressed="true"] .brick { transform: translateY(0); }
    .lego[aria-pressed="true"] .shadow { opacity: 0; }
    .lego[aria-pressed="true"]:hover .brick { transform: translateY(-2px); }
    .lg { font: italic 900 4.2px/1 'Unbounded', system-ui, sans-serif; fill: #c20d10; text-anchor: middle; letter-spacing: -.1px; }
    .hl { fill: none; stroke: rgba(255,255,255,.35); stroke-width: 1.2; }
  `,
  html: `
    <div class="stage">
      <button class="lego" type="button" aria-pressed="false" aria-label="LEGO 2 by 4 brick">
        <svg viewBox="0 18 210 180" aria-hidden="true">
          <g>
            ${PLATE}
            <path class="shadow" d="${'M' + [iso(1, 1, 0), iso(5, 1, 0), iso(5, 3, 0), iso(1, 3, 0)].map((p) => p.map((n) => n.toFixed(1)).join(' ')).join(' L') + ' Z'}" fill="#000"/>
            <g class="brick">${BRICK}<path class="hl" d="M${iso(1, 3, 1.2).map((n) => n.toFixed(1)).join(' ')} L${iso(5, 3, 1.2).map((n) => n.toFixed(1)).join(' ')} L${iso(5, 1, 1.2).map((n) => n.toFixed(1)).join(' ')}"/></g>
            ${FRONT}
          </g>
        </svg>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.lego');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
