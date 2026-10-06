export default {
  id: 'ty2-chatter-phone',
  credit: 'Fisher-Price Chatter Telephone (1961) — drag a finger hole round to the stop, the dial ticks back and the eyes roll; lift the blue receiver',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; padding: 34px 18px 16px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 30% 20%, #fff7d6, #f5e3a3 70%); }
    .phone { position: relative; width: 184px; height: 170px; }
    .body { position: absolute; left: 0; top: 6px; width: 184px; height: 150px; border-radius: 46px 46px 26px 26px;
      background: radial-gradient(ellipse at 34% 18%, #ff8a80 0, #e3262d 34%, #a5141a 100%);
      box-shadow: 0 8px 0 #7d0d12, 0 14px 18px rgba(80,20,0,.35), inset 0 -6px 10px rgba(0,0,0,.18); }
    .wheel { position: absolute; bottom: -2px; width: 30px; height: 30px; border-radius: 50%;
      background: radial-gradient(circle at 40% 35%, #fff2a0, #f7c600 45%, #b98f00); box-shadow: 0 3px 4px rgba(0,0,0,.35); }
    .wl { left: 18px; } .wr { right: 18px; }
    .eyes { position: absolute; left: 50%; top: 18px; width: 92px; margin-left: -46px; display: flex; justify-content: space-between; }
    .eye { width: 30px; height: 30px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #fff, #e9eef5);
      box-shadow: inset 0 0 0 2px #1a1a1a, 0 2px 3px rgba(0,0,0,.3); position: relative; overflow: hidden; }
    .pupil { position: absolute; left: 7px; top: 7px; width: 16px; height: 16px; border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #fff 0 2px, #1a5fb4 3px, #0b2e5c 8px); }
    .eyes.roll .pupil { animation: roll .22s ease-in-out infinite alternate; }
    @keyframes roll { from { transform: translateY(-6px); } to { transform: translateY(6px); } }
    .dialwrap { position: absolute; left: 46px; top: 56px; width: 92px; height: 92px; border-radius: 50%;
      background: #f2efe6; box-shadow: inset 0 3px 6px rgba(0,0,0,.35); }
    .dial { position: absolute; inset: 0; border-radius: 50%; touch-action: none; cursor: grab; outline: none;
      background: radial-gradient(circle at 40% 30%, #fff, #e7e7e7 70%, #cfcfcf);
      box-shadow: 0 2px 3px rgba(0,0,0,.35), inset 0 -2px 3px rgba(0,0,0,.15); }
    .dial:focus-visible { box-shadow: 0 0 0 3px #1a5fb4, 0 2px 3px rgba(0,0,0,.35); }
    .hole { position: absolute; width: 20px; height: 20px; border-radius: 50%; background: radial-gradient(circle, #fdfdfd 50%, #d7d7d7);
      box-shadow: inset 0 2px 3px rgba(0,0,0,.45); font: 800 10px/20px 'DM Sans', system-ui, sans-serif; text-align: center; color: #1a5fb4; }
    .hole:nth-child(odd) { color: #e3262d; }
    .hub { position: absolute; left: 30px; top: 30px; width: 32px; height: 32px; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle at 40% 30%, #ffe680, #f7c600 60%, #c79c00); box-shadow: 0 1px 2px rgba(0,0,0,.35); }
    .stop { position: absolute; left: 80px; top: 64px; width: 14px; height: 6px; border-radius: 3px; transform: rotate(35deg);
      background: linear-gradient(#e9e9e9, #8d8d8d); box-shadow: 0 1px 2px rgba(0,0,0,.5); pointer-events: none; }
    .rcv { position: absolute; left: 22px; top: -24px; width: 140px; height: 30px; border: 0; padding: 0; background: none; cursor: pointer;
      transition: transform .28s cubic-bezier(.3,1.6,.5,1); }
    .rcv::before { content: ''; position: absolute; left: 22px; right: 22px; top: 9px; height: 13px; border-radius: 7px;
      background: linear-gradient(#5b93e6, #1a5fb4 60%, #0f3f7f); }
    .rcv i { position: absolute; top: 0; width: 38px; height: 30px; border-radius: 50% 50% 40% 40%;
      background: radial-gradient(circle at 40% 30%, #8cb6f2, #1a5fb4 55%, #0f3f7f); box-shadow: 0 3px 4px rgba(0,0,0,.35); }
    .rcv i:first-child { left: 0; } .rcv i:last-child { right: 0; }
    .rcv:hover { transform: translateY(-2px); }
    .rcv[aria-pressed="true"] { transform: translate(-10px, -4px) rotate(-12deg); }
    .rcv:focus-visible { outline: 2px solid #1a5fb4; outline-offset: 2px; border-radius: 12px; }
  `,
  html: `
    <div class="stage"><div class="phone">
      <div class="body"></div>
      <div class="wheel wl"></div><div class="wheel wr"></div>
      <div class="eyes"><span class="eye"><span class="pupil"></span></span><span class="eye"><span class="pupil"></span></span></div>
      <div class="dialwrap"><div class="dial" tabindex="0" role="button" aria-label="rotary dial"></div><span class="hub"></span><span class="stop"></span></div>
      <button class="rcv" type="button" aria-pressed="false" aria-label="receiver"><i></i><i></i></button>
    </div></div>`,
  init(root) {
    const dial = root.querySelector('.dial'), wrap = root.querySelector('.dialwrap'), eyes = root.querySelector('.eyes');
    const rcv = root.querySelector('.rcv');
    for (let k = 1; k <= 10; k++) {
      const a = (95 - 30 * (k - 1)) * Math.PI / 180, h = document.createElement('span');
      h.className = 'hole'; h.dataset.k = k; h.textContent = k % 10;
      h.style.left = (46 + 34 * Math.sin(a) - 10) + 'px'; h.style.top = (46 - 34 * Math.cos(a) - 10) + 'px';
      dial.appendChild(h);
    }
    let k = 0, ang = 0, acc = 0, prev = 0, drag = false, t = 0, t2 = 0;
    const angleAt = (e) => { const r = wrap.getBoundingClientRect(); return Math.atan2(e.clientX - r.left - r.width / 2, -(e.clientY - r.top - r.height / 2)) * 180 / Math.PI; };
    const set = () => { dial.style.transform = `rotate(${ang}deg)`; };
    const back = () => {
      const ms = ang * 5;
      dial.style.transition = `transform ${ms}ms linear`;
      if (ang > 20) { eyes.classList.add('roll'); clearTimeout(t); t = setTimeout(() => eyes.classList.remove('roll'), ms + 120); }
      ang = 0; set();
    };
    dial.addEventListener('pointerdown', (e) => {
      const h = e.target.closest('.hole'); if (!h) return;
      k = +h.dataset.k; drag = true; acc = 0; prev = angleAt(e);
      dial.setPointerCapture(e.pointerId); dial.style.transition = 'none';
    });
    dial.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const a = angleAt(e); let d = a - prev; if (d > 180) d -= 360; if (d < -180) d += 360; prev = a;
      acc += d; ang = Math.max(0, Math.min(30 * k, acc)); set();
    });
    const up = () => { if (!drag) return; drag = false; back(); };
    dial.addEventListener('pointerup', up); dial.addEventListener('pointercancel', up); dial.addEventListener('lostpointercapture', up);
    dial.addEventListener('keydown', (e) => {
      const n = /^[0-9]$/.test(e.key) ? (+e.key || 10) : (e.key === 'Enter' || e.key === ' ') ? 1 + Math.floor(Math.random() * 10) : 0;
      if (!n) return; e.preventDefault();
      dial.style.transition = 'transform .25s ease-out'; ang = 30 * n; set();
      clearTimeout(t2); t2 = setTimeout(back, 260);
    });
    rcv.addEventListener('click', () => rcv.setAttribute('aria-pressed', String(rcv.getAttribute('aria-pressed') !== 'true')));
    return () => { clearTimeout(t); clearTimeout(t2); };
  },
};
