export default {
  id: 'rt-arcade',
  credit: 'Arcade cabinet control panel — red ball-top joystick and concave Sanwa-style push buttons',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #1b1b1f; padding: 18px 24px 14px; border-radius: 12px; display: inline-flex; gap: 30px; align-items: flex-end;
      background-image: radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px); background-size: 6px 6px; }
    .stick { width: 60px; height: 84px; position: relative; cursor: grab; border: none; background: none; padding: 0; touch-action: none; }
    .stick:focus-visible { outline: 2px solid #ffd500; outline-offset: 2px; border-radius: 8px; }
    .base { position: absolute; left: 50%; bottom: 0; width: 46px; height: 12px; margin-left: -23px; border-radius: 50%; background: radial-gradient(#444, #111 70%); box-shadow: 0 0 0 2px #0a0a0a; }
    .shaft { position: absolute; left: 50%; bottom: 6px; width: 8px; height: 50px; margin-left: -4px; border-radius: 4px 4px 0 0; transform-origin: 50% 100%;
      background: linear-gradient(90deg, #666, #ddd 50%, #555); transition: transform .12s; }
    .ball { position: absolute; left: 50%; top: -24px; width: 30px; height: 30px; margin-left: -15px; border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #ff7a7a, #e8141c 50%, #7a0008); box-shadow: 0 4px 6px rgba(0,0,0,.6); }
    .btns { display: flex; gap: 14px; padding-bottom: 8px; }
    .pb { width: 44px; height: 44px; border-radius: 50%; border: none; padding: 0; cursor: pointer; position: relative;
      box-shadow: 0 0 0 3px #0e0e10, 0 0 0 5px #333, 0 4px 0 5px #222; transition: transform .05s, box-shadow .05s; }
    .pb::after { content: ""; position: absolute; inset: 4px; border-radius: 50%; background: radial-gradient(circle at 50% 45%, rgba(0,0,0,.35), rgba(0,0,0,0) 45%, rgba(255,255,255,.35) 95%); }
    .pb.red { background: #e02020; } .pb.blue { background: #1f6fe0; } .pb.yellow { background: #f2c20f; }
    .pb:active, .pb.on { transform: translateY(3px); box-shadow: 0 0 0 3px #0e0e10, 0 0 0 5px #333, 0 1px 0 5px #222; filter: brightness(1.25); }
    .pb:focus-visible { outline: 2px solid #fff; outline-offset: 7px; }
  `,
  html: `
    <div class="stage">
      <button class="stick" type="button" aria-label="Joystick"><div class="base"></div><div class="shaft"><div class="ball"></div></div></button>
      <div class="btns">
        <button class="pb red" type="button" aria-label="Button 1" aria-pressed="false"></button>
        <button class="pb blue" type="button" aria-label="Button 2" aria-pressed="false"></button>
        <button class="pb yellow" type="button" aria-label="Button 3" aria-pressed="false"></button>
      </div>
    </div>`,
  init(root) {
    const stick = root.querySelector('.stick'); const shaft = root.querySelector('.shaft');
    let dragging = false;
    const tilt = (x, y) => { shaft.style.transform = `rotate(${Math.max(-28, Math.min(28, x * 0.9))}deg) translateY(${Math.max(0, Math.min(6, y * 0.2))}px)`; };
    stick.addEventListener('pointerdown', (e) => { dragging = true; stick.setPointerCapture(e.pointerId); });
    stick.addEventListener('pointermove', (e) => { if (!dragging) return; const r = stick.getBoundingClientRect(); tilt(e.clientX - (r.left + r.width / 2), e.clientY - r.top); });
    const rel = () => { dragging = false; shaft.style.transform = ''; };
    stick.addEventListener('pointerup', rel); stick.addEventListener('pointercancel', rel);
    stick.addEventListener('keydown', (e) => { const m = { ArrowLeft: -30, ArrowRight: 30 }[e.key]; if (m !== undefined) { e.preventDefault(); tilt(m, 0); setTimeout(rel, 250); } });
    root.querySelectorAll('.pb').forEach((b) => b.addEventListener('click', () => { const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on)); }));
  },
};
