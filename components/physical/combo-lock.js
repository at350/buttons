// Master Lock No. 1500-style combination padlock: hardened shackle, stainless body, black 40-number dial
// with a knurled rim. Turn it by dragging (or arrow keys); it clicks into each of the 40 detents.
const C = 60;
const pt = (deg, r) => [C + r * Math.sin(deg * Math.PI / 180), C - r * Math.cos(deg * Math.PI / 180)];
const TICKS = Array.from({ length: 40 }, (_, i) => {
  const a = i * 9, major = i % 5 === 0;
  const [x1, y1] = pt(a, 55), [x2, y2] = pt(a, major ? 47 : 50.5);
  return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke-width="${major ? 1.6 : 1}"/>`;
}).join('');
const NUMS = Array.from({ length: 8 }, (_, i) => {
  const a = i * 45, [x, y] = pt(a, 38);
  return `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" transform="rotate(${a} ${x.toFixed(2)} ${y.toFixed(2)})">${(40 - i * 5) % 40}</text>`;
}).join('');

export default {
  id: 'ph-combo-lock',
  credit: 'Master Lock No. 1500-style combination padlock — 40-click dial under the fixed index; drag to spin',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px 22px 18px; border-radius: 12px; background: linear-gradient(#dcdcd8, #bdbdb8); }
    .lock { position: relative; width: 140px; height: 196px; }
    .shackle {
      position: absolute; left: 30px; top: 0; width: 80px; height: 84px; border-radius: 40px 40px 0 0;
      border: 11px solid transparent; border-bottom: 0;
      background: linear-gradient(90deg, #6d7075, #f1f2f3 22%, #9fa3a8 45%, #e2e4e6 70%, #6a6d72) border-box;
      -webkit-mask: linear-gradient(#000 0 0) border-box, linear-gradient(#000 0 0) padding-box; -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) border-box exclude, linear-gradient(#000 0 0) padding-box;
      filter: drop-shadow(0 2px 2px rgba(0,0,0,.35));
    }
    .body {
      position: absolute; left: 0; top: 56px; width: 140px; height: 140px; border-radius: 50%;
      background:
        repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.12) 0 1px, rgba(0,0,0,.04) 1px 2px),
        conic-gradient(from 200deg, #8d9094, #f3f4f5 15%, #a4a7ab 32%, #e8e9eb 50%, #8a8d91 68%, #eceeef 84%, #8d9094);
      box-shadow: 0 2px 2px rgba(0,0,0,.35), 0 10px 16px -4px rgba(0,0,0,.4), inset 0 0 0 1px rgba(0,0,0,.25), inset 0 2px 1px rgba(255,255,255,.8);
    }
    .index { position: absolute; left: 50%; top: 3px; width: 0; height: 0; margin-left: -5px; border: 5px solid transparent; border-top: 7px solid #1a1a1a; border-bottom: 0; z-index: 2; }
    .dial {
      position: absolute; left: 10px; top: 10px; width: 120px; height: 120px; border-radius: 50%; cursor: grab; touch-action: none; outline: none;
      box-shadow: 0 0 0 1px rgba(0,0,0,.5), 0 3px 5px rgba(0,0,0,.45);
    }
    .dial.drag { cursor: grabbing; }
    .dial:focus-visible { box-shadow: 0 0 0 1px rgba(0,0,0,.5), 0 0 0 4px #1d4ed8; }
    .dial svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
    .face { transform-box: view-box; transform-origin: 60px 60px; }
    .face line { stroke: #f2f2f2; stroke-linecap: butt; }
    .face text { font: 700 11px Inter, Arial, sans-serif; fill: #f4f4f4; text-anchor: middle; dominant-baseline: central; }
    .gloss { position: absolute; inset: 0; border-radius: 50%; pointer-events: none; background: radial-gradient(ellipse 70% 40% at 45% 18%, rgba(255,255,255,.22), transparent 70%), radial-gradient(circle, transparent 62%, rgba(0,0,0,.35) 100%); }
    .hub { position: absolute; left: 50%; top: 50%; width: 34px; height: 34px; margin: -17px; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle at 42% 35%, #3a3a3d, #0e0e10 70%); box-shadow: 0 1px 2px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.15); }
  `,
  html: `
    <div class="stage">
      <div class="lock">
        <div class="shackle"></div>
        <div class="body">
          <span class="index"></span>
          <div class="dial" role="slider" tabindex="0" aria-label="Combination dial" aria-valuemin="0" aria-valuemax="39" aria-valuenow="0">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="60" fill="#111113"/>
              <circle cx="60" cy="60" r="58.5" fill="none" stroke="#2c2c30" stroke-width="3" stroke-dasharray="1.2 1.2"/>
              <g class="face">${TICKS}${NUMS}</g>
            </svg>
            <span class="gloss"></span>
            <span class="hub"></span>
          </div>
        </div>
      </div>
    </div>`,
  init(root) {
    const dial = root.querySelector('.dial'), face = root.querySelector('.face'), rim = root.querySelector('circle[stroke-dasharray]');
    let ang = 0, raw = 0, last = 0, dragging = false, raf = 0;
    const angleAt = (e) => { const r = dial.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => {
      ang = Math.round(raw / 9) * 9;
      face.style.transform = `rotate(${ang}deg)`;
      rim.style.strokeDashoffset = (-ang * 0.3).toFixed(2);
      dial.setAttribute('aria-valuenow', ((Math.round(ang / 9) % 40) + 40) % 40);
    };
    dial.addEventListener('pointerdown', (e) => { dragging = true; last = angleAt(e); dial.setPointerCapture(e.pointerId); dial.classList.add('drag'); });
    dial.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; raw += d;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = () => { if (!dragging) return; dragging = false; dial.classList.remove('drag'); if (raf) cancelAnimationFrame(raf); raf = 0; render(); raw = ang; };
    dial.addEventListener('pointerup', end); dial.addEventListener('pointercancel', end);
    dial.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 9 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -9 : 0;
      if (!s) return; e.preventDefault(); raw = ang + s; render();
    });
    return () => { if (raf) cancelAnimationFrame(raf); };
  },
};
