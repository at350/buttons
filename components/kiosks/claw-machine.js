export default {
  id: 'ks-claw-machine',
  credit: 'Arcade claw crane — red ball-top joystick steers the gantry, the big DROP button lowers the claw; line it up over a plush to win',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; padding: 12px 14px 14px; border-radius: 12px; background: linear-gradient(#ff3d8b, #c3185f); font-family: Unbounded, Inter, sans-serif; }
    .win { position: relative; width: 200px; height: 150px; border-radius: 6px; overflow: hidden; background: linear-gradient(#bfe9ff, #7cc6ef 60%, #5aa9d6); box-shadow: inset 0 0 0 4px #ffd0e4, inset 0 0 0 6px #8a0f43; }
    .win::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(255,255,255,.35) 0 18%, transparent 18% 28%, rgba(255,255,255,.15) 28% 31%, transparent 31%); pointer-events: none; }
    .rail { position: absolute; left: 6px; right: 6px; top: 8px; height: 4px; background: #555; }
    .chute { position: absolute; left: 6px; bottom: 6px; width: 34px; height: 46px; background: rgba(255,255,255,.4); border: 2px solid #fff; border-bottom: 0; }
    .gan { position: absolute; top: 4px; left: 0; width: 30px; transition: transform .9s linear; }
    .gan .car { width: 30px; height: 10px; border-radius: 2px; background: #333; }
    .cable { width: 2px; height: 6px; margin: 0 auto; background: #444; transition: height .8s ease-in-out; }
    .claw { width: 30px; height: 18px; }
    .claw path { stroke: #c9c9c9; stroke-width: 2.4; fill: none; stroke-linecap: round; transition: transform .25s; }
    .claw .l { transform-origin: 15px 2px; } .claw .r { transform-origin: 15px 2px; }
    .stage.shut .claw .l { transform: rotate(-18deg); } .stage.shut .claw .r { transform: rotate(18deg); }
    .toy { position: absolute; bottom: 6px; width: 26px; height: 26px; border-radius: 50% 50% 46% 46%; transition: transform .8s ease-in-out, opacity .3s; }
    .toy::before, .toy::after { content: ''; position: absolute; top: -4px; width: 9px; height: 9px; border-radius: 50%; background: inherit; }
    .toy::before { left: 1px; } .toy::after { right: 1px; }
    .toy i { position: absolute; left: 7px; top: 9px; width: 12px; height: 6px; border-radius: 0 0 6px 6px; border-bottom: 2px solid rgba(0,0,0,.55); }
    .ctl { display: flex; align-items: center; gap: 22px; padding: 8px 18px; border-radius: 10px; background: #1b1b1f; box-shadow: inset 0 2px 4px rgba(0,0,0,.6); }
    .stick { width: 50px; height: 62px; position: relative; border: 0; background: none; padding: 0; cursor: grab; touch-action: none; }
    .stick:focus-visible { outline: 2px solid #ffd500; outline-offset: 2px; border-radius: 8px; }
    .base { position: absolute; left: 50%; bottom: 0; width: 40px; height: 10px; margin-left: -20px; border-radius: 50%; background: radial-gradient(#444, #111 70%); }
    .shaft { position: absolute; left: 50%; bottom: 5px; width: 7px; height: 36px; margin-left: -3.5px; border-radius: 3px; transform-origin: 50% 100%; background: linear-gradient(90deg, #666, #ddd 50%, #555); transition: transform .12s; }
    .ball { position: absolute; left: 50%; top: -20px; width: 26px; height: 26px; margin-left: -13px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #ff7a7a, #e8141c 50%, #7a0008); }
    .drop { width: 64px; height: 64px; border: 0; border-radius: 50%; cursor: pointer; font: 800 11px/1 Unbounded, Inter, sans-serif; color: #3a2a00; background: radial-gradient(circle at 50% 35%, #fff07a, #ffd000 55%, #c79a00); box-shadow: 0 0 0 4px #0e0e10, 0 0 0 6px #444, 0 5px 0 6px #222; transition: transform .05s; }
    .drop:active { transform: translateY(3px); }
    .drop:disabled { filter: brightness(.6); cursor: default; }
    .drop:focus-visible { outline: 2px solid #fff; outline-offset: 9px; }
    .wins { font-size: 9px; color: #ff9fc6; text-align: center; line-height: 1.4; } .wins b { display: block; font-size: 16px; color: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="win"><div class="rail"></div><div class="chute"></div><div class="toys"></div>
        <div class="gan"><div class="car"></div><div class="cable"></div><svg class="claw" viewBox="0 0 30 18" aria-hidden="true"><path class="l" d="M15 2 L7 9 L9 16"/><path class="r" d="M15 2 L23 9 L21 16"/></svg></div>
      </div>
      <div class="ctl">
        <button class="stick" type="button" aria-label="Joystick (left / right)"><span class="base"></span><span class="shaft"><span class="ball"></span></span></button>
        <div class="wins">WIN<b class="w">00</b></div>
        <button class="drop" type="button">DROP</button>
      </div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), gan = root.querySelector('.gan'), cable = root.querySelector('.cable'), drop = root.querySelector('.drop');
    const stick = root.querySelector('.stick'), shaft = root.querySelector('.shaft'), toysEl = root.querySelector('.toys'), w = root.querySelector('.w');
    const colors = ['#ff9f1c', '#9b5de5', '#00bb7f', '#f15bb5'], xs = [62, 96, 128, 160];
    const toys = xs.map((x, i) => { const d = document.createElement('div'); d.className = 'toy'; d.style.left = x + 'px'; d.style.background = colors[i]; d.innerHTML = '<i></i>'; toysEl.appendChild(d); return { d, x }; });
    let x = 100, dir = 0, raf = 0, last = 0, busy = false, won = 0, timers = [];
    const place = (anim) => { gan.style.transition = anim ? '' : 'none'; gan.style.transform = `translateX(${x}px)`; };
    place(false);
    const loop = (ts) => { if (last) { x = Math.max(6, Math.min(164, x + dir * (ts - last) * 0.09)); place(false); } last = ts; raf = requestAnimationFrame(loop); };
    const move = (d) => { if (busy) return; dir = d; shaft.style.transform = d ? `rotate(${d * 24}deg)` : ''; cancelAnimationFrame(raf); raf = 0; last = 0; if (d) raf = requestAnimationFrame(loop); };
    stick.addEventListener('pointerdown', (e) => { stick.setPointerCapture(e.pointerId); const r = stick.getBoundingClientRect(); move(e.clientX < r.left + r.width / 2 ? -1 : 1); });
    stick.addEventListener('pointermove', (e) => { if (!dir) return; const r = stick.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2); if (Math.abs(dx) > 4) move(dx < 0 ? -1 : 1); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => stick.addEventListener(ev, () => move(0)));
    stick.addEventListener('keydown', (e) => { const d = { ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (d && dir !== d) { e.preventDefault(); move(d); } });
    stick.addEventListener('keyup', () => move(0)); stick.addEventListener('blur', () => move(0));
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    drop.addEventListener('click', () => {
      if (busy) return; move(0); busy = true; drop.disabled = true;
      const hit = toys.find((t) => t.d.style.opacity !== '0' && Math.abs(t.x - (x + 2)) < 13);
      cable.style.height = '96px';
      at(850, () => st.classList.add('shut'));
      at(1150, () => { cable.style.height = '6px'; if (hit) hit.d.style.transform = 'translateY(-96px)'; });
      at(2000, () => { const from = x; x = 8; place(true); if (hit) { hit.d.style.transform = `translate(${8 - from}px, -96px)`; } });
      at(2950, () => { st.classList.remove('shut'); if (hit) { hit.d.style.transform = `translate(${8 - hit.x}px, 20px)`; hit.d.style.opacity = '0'; w.textContent = String(++won).padStart(2, '0'); } });
      at(3300, () => { busy = false; drop.disabled = false; if (toys.every((t) => t.d.style.opacity === '0')) toys.forEach((t) => { t.d.style.transition = 'none'; t.d.style.transform = ''; t.d.style.opacity = ''; void t.d.offsetWidth; t.d.style.transition = ''; }); });
    });
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  },
};
