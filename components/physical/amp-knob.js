// Marshall JCM800-style control: gold brushed panel, black levant tolex with white piping,
// black phenolic knob with gold anodised cap and a long black indicator line. This one goes to 11.
const CX = 75, CY = 82;
const SCALE = Array.from({ length: 12 }, (_, i) => {
  const a = (-150 + i * (300 / 11)) * Math.PI / 180;
  const p = (r) => [CX + r * Math.sin(a), CY - r * Math.cos(a)];
  const [x, y] = p(56), [x1, y1] = p(40), [x2, y2] = p(i === 11 ? 47 : 45);
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"${i === 11 ? ' class="hot"' : ''}/>` +
    `<text x="${x.toFixed(1)}" y="${(y + 3.4).toFixed(1)}">${i}</text>`;
}).join('');

export default {
  id: 'ph-amp-knob',
  credit: 'Marshall JCM800-style gold panel knob — black body, gold cap, long pointer line, and it goes to 11. Drag or use arrow keys.',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      display: inline-block; padding: 12px; border-radius: 12px;
      background:
        radial-gradient(circle at 30% 30%, rgba(255,255,255,.07) 0 .6px, transparent 1px) 0 0 / 3px 3px,
        radial-gradient(circle at 70% 60%, rgba(0,0,0,.5) 0 .7px, transparent 1.1px) 1px 1px / 4px 4px,
        linear-gradient(160deg, #222, #121212);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
    }
    .piping { padding: 3px; border-radius: 4px; background: linear-gradient(#f4f1e8, #c9c5b8); box-shadow: 0 1px 2px rgba(0,0,0,.8); }
    .panel {
      position: relative; width: 150px; height: 150px; border-radius: 2px; overflow: hidden;
      background:
        repeating-linear-gradient(0deg, rgba(255,255,255,.07) 0 1px, rgba(0,0,0,.04) 1px 2px, transparent 2px 3px),
        linear-gradient(100deg, #b98d33 0%, #e6c573 28%, #c99d43 52%, #f0d68b 74%, #b88a31 100%);
      box-shadow: inset 0 0 0 1px rgba(60,40,0,.45), inset 0 2px 3px rgba(0,0,0,.35);
    }
    svg { position: absolute; inset: 0; width: 150px; height: 150px; }
    svg text { font: 700 9.5px Inter, "Helvetica Neue", Arial, sans-serif; fill: #1c1405; text-anchor: middle; }
    svg line { stroke: #1c1405; stroke-width: 1.4; stroke-linecap: round; }
    svg .hot { stroke-width: 2.2; }
    svg .title { font: 800 8px Inter, "Helvetica Neue", Arial, sans-serif; letter-spacing: 1.6px; }
    .knob {
      position: absolute; left: 43px; top: 50px; width: 64px; height: 64px; border-radius: 50%;
      cursor: grab; touch-action: none; outline: none;
      box-shadow: 0 1px 1px rgba(40,25,0,.6), 0 5px 7px rgba(40,25,0,.45), 0 12px 16px -4px rgba(40,25,0,.35);
    }
    .knob.drag { cursor: grabbing; }
    .knob:focus-visible::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1c1405; }
    .rot { position: absolute; inset: 0; border-radius: 50%; transform: rotate(-150deg); }
    .skirt { position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(#0c0a08 0 5deg, #2a2420 5deg 7deg, #0c0a08 7deg 10deg); }
    .line { position: absolute; left: 50%; top: 2px; width: 3px; height: 30px; margin-left: -1.5px; border-radius: 1.5px; background: #0a0806; }
    .shade { position: absolute; inset: 0; border-radius: 50%; pointer-events: none; background: radial-gradient(circle at 40% 28%, rgba(255,255,255,.2), transparent 42%), radial-gradient(circle, transparent 58%, rgba(0,0,0,.6) 100%); }
    .cap {
      position: absolute; left: 13px; top: 13px; width: 38px; height: 38px; border-radius: 50%; pointer-events: none;
      background:
        repeating-conic-gradient(rgba(255,255,255,.08) 0 2deg, rgba(0,0,0,.05) 2deg 4deg),
        conic-gradient(from 20deg, #a77a22, #f6dc8f 12%, #b98c33 26%, #e9c66f 40%, #9c711d 55%, #f3d684 68%, #b5872e 82%, #dcb75d 92%, #a77a22);
      box-shadow: inset 0 0 0 1px rgba(70,45,0,.6), inset 0 1px 1px rgba(255,250,220,.7), 0 1px 2px rgba(0,0,0,.6);
    }
    .capline { position: absolute; left: 13px; top: 13px; width: 38px; height: 38px; border-radius: 50%; pointer-events: none; transform: rotate(-150deg); }
    .capline::after { content: ''; position: absolute; left: 50%; top: 1px; width: 2.4px; height: 19px; margin-left: -1.2px; background: #120d04; border-radius: 1px; }
  `,
  html: `
    <div class="stage">
      <div class="piping">
        <div class="panel">
          <svg viewBox="0 0 150 150" aria-hidden="true"><text class="title" x="75" y="14">VOLUME</text>${SCALE}</svg>
          <div class="knob" role="slider" tabindex="0" aria-label="Volume" aria-valuemin="0" aria-valuemax="11" aria-valuenow="0">
            <div class="rot"><div class="skirt"></div><div class="line"></div></div>
            <div class="shade"></div>
            <div class="cap"></div>
            <div class="capline"></div>
          </div>
        </div>
      </div>
    </div>`,
  init(root) {
    const knob = root.querySelector('.knob'), rot = root.querySelector('.rot'), capline = root.querySelector('.capline');
    const MIN = -150, MAX = 150;
    let ang = MIN, last = 0, dragging = false, raf = 0;
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => {
      rot.style.transform = capline.style.transform = `rotate(${ang}deg)`;
      knob.setAttribute('aria-valuenow', ((ang - MIN) / (MAX - MIN) * 11).toFixed(1));
    };
    knob.addEventListener('pointerdown', (e) => { dragging = true; last = angleAt(e); knob.setPointerCapture(e.pointerId); knob.classList.add('drag'); });
    knob.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      ang = Math.max(MIN, Math.min(MAX, ang + d));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = () => { dragging = false; knob.classList.remove('drag'); };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => {
      const st = 300 / 11;
      const step = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? st : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -st : e.key === 'End' ? 999 : e.key === 'Home' ? -999 : 0;
      if (!step) return; e.preventDefault(); ang = Math.max(MIN, Math.min(MAX, ang + step)); render();
    });
    return () => { if (raf) cancelAnimationFrame(raf); };
  },
};
