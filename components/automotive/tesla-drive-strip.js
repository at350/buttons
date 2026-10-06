export default {
  id: 'au-tesla-drive-strip',
  credit: 'Tesla Model 3 Highland — stalk-less drive mode strip: swipe the car up for D, down for R, plus the grey Autosteer wheel that turns Tesla blue when engaged',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; display: flex; gap: 14px; width: 320px; max-width: 100%; height: 186px; padding: 12px; border-radius: 12px; overflow: hidden; background: #000; color: #fff; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .strip { position: relative; flex: none; width: 46px; border-radius: 23px; background: linear-gradient(#141414, #1e1e1e 50%, #141414); touch-action: none; }
    .strip::before, .strip::after { content: ''; position: absolute; left: 50%; width: 10px; height: 10px; margin-left: -5px; border: solid #4a4a4a; border-width: 2px 2px 0 0; }
    .strip::before { top: 14px; transform: rotate(-45deg); }
    .strip::after { bottom: 14px; transform: rotate(135deg); }
    .thumb { position: absolute; left: 3px; top: 50%; width: 40px; height: 40px; margin-top: -20px; border-radius: 50%; border: 0; padding: 0; background: #2c2c2c; color: #fff; display: grid; place-items: center; cursor: grab; transition: transform .35s cubic-bezier(.32,.72,0,1), background .2s; }
    .thumb.drag { transition: none; cursor: grabbing; background: #3a3a3a; }
    .thumb:focus-visible { outline: 2px solid #3e6ae1; outline-offset: 2px; }
    .thumb svg { width: 22px; height: 22px; }
    svg { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .main { position: relative; flex: 1; min-width: 0; }
    .prnd { display: flex; gap: 2px; }
    .g { width: 26px; height: 26px; border: 0; border-radius: 6px; background: transparent; color: #5c5c5c; font: 600 15px/1 Inter, system-ui, sans-serif; cursor: pointer; transition: color .2s, background .2s; }
    .g:hover { color: #9a9a9a; }
    .g[aria-pressed="true"] { color: #fff; background: #1f1f1f; }
    .g:focus-visible, .as:focus-visible { outline: 2px solid #3e6ae1; outline-offset: 1px; }
    .sign { position: absolute; right: 0; top: 0; width: 34px; height: 42px; border-radius: 5px; background: #f2f2f2; border: 2px solid #000; box-shadow: 0 0 0 1px #9a9a9a; color: #000; text-align: center; font: 700 6px/1.05 Inter, system-ui, sans-serif; padding-top: 5px; }
    .sign b { display: block; margin-top: 3px; font: 700 16px/1 Inter, system-ui, sans-serif; }
    .spd { margin-top: 12px; font: 300 52px/1 Inter, system-ui, sans-serif; letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
    .unit { margin-top: 2px; color: #8a8a8a; font-size: 11px; letter-spacing: .08em; }
    .row { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: 10px; }
    .as { width: 40px; height: 40px; flex: none; border: 0; border-radius: 50%; background: #161616; color: #5c5c5c; display: grid; place-items: center; cursor: pointer; transition: color .25s, background .25s, box-shadow .25s; }
    .as svg { width: 26px; height: 26px; }
    .as[aria-disabled="true"] { opacity: .35; cursor: default; }
    .as[aria-pressed="true"] { color: #3e6ae1; background: #0d1530; box-shadow: 0 0 14px rgba(62,106,225,.45); }
    .road { flex: 1; height: 44px; }
    .road path { stroke: #3a3a3a; stroke-width: 2.5; transition: stroke .3s; }
    .on .road path { stroke: #3e6ae1; }
    .road rect { fill: #d9d9d9; stroke: none; }
  `,
  html: `
    <div class="stage">
      <div class="strip"><button class="thumb" type="button" role="slider" aria-label="Drive mode" aria-valuetext="P"><svg viewBox="0 0 24 24"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg></button></div>
      <div class="main">
        <div class="prnd"><button class="g" type="button" aria-pressed="true">P</button><button class="g" type="button" aria-pressed="false">R</button><button class="g" type="button" aria-pressed="false">N</button><button class="g" type="button" aria-pressed="false">D</button></div>
        <div class="sign">SPEED<br>LIMIT<b>45</b></div>
        <div class="spd">0</div><div class="unit">MPH</div>
        <div class="row">
          <button class="as" type="button" aria-pressed="false" aria-disabled="true" aria-label="Autosteer"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M12 14l0 7"/><path d="M10 12l-6.75 -2"/><path d="M14 12l6.75 -2"/></svg></button>
          <svg class="road" viewBox="0 0 160 44" preserveAspectRatio="none"><path d="M54 2 34 44M106 2l20 42"/><rect x="72" y="26" width="16" height="14" rx="4"/></svg>
        </div>
      </div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const stage = $('.stage'), thumb = $('.thumb'), spdEl = $('.spd'), as = $('.as'), gs = [...root.querySelectorAll('.g')];
    let gear = 'P', speed = 0, target = 0, raf = 0, startY = 0, dy = 0, drag = false;
    const ramp = () => {
      clearInterval(raf);
      raf = setInterval(() => {
        speed += Math.sign(target - speed);
        spdEl.textContent = speed;
        if (speed === target) { clearInterval(raf); raf = 0; }
      }, 28);
    };
    const setGear = (g) => {
      gear = g;
      gs.forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === g)));
      thumb.setAttribute('aria-valuetext', g);
      as.setAttribute('aria-disabled', String(g !== 'D'));
      if (g !== 'D') { as.setAttribute('aria-pressed', 'false'); stage.classList.remove('on'); }
      target = g === 'D' ? 37 : g === 'R' ? 3 : 0;
      if (speed !== target) ramp();
    };
    gs.forEach((b) => b.addEventListener('click', () => setGear(b.textContent)));
    thumb.addEventListener('pointerdown', (e) => { drag = true; startY = e.clientY; dy = 0; thumb.setPointerCapture(e.pointerId); thumb.classList.add('drag'); });
    thumb.addEventListener('pointermove', (e) => { if (!drag) return; dy = Math.max(-58, Math.min(58, e.clientY - startY)); thumb.style.transform = `translateY(${dy}px)`; });
    const end = () => {
      if (!drag) return; drag = false; thumb.classList.remove('drag'); thumb.style.transform = '';
      if (dy < -34) setGear('D'); else if (dy > 34) setGear('R');
    };
    thumb.addEventListener('pointerup', end); thumb.addEventListener('pointercancel', end);
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); setGear('D'); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setGear('R'); }
    });
    as.addEventListener('click', () => {
      if (gear !== 'D') return;
      const on = as.getAttribute('aria-pressed') !== 'true';
      as.setAttribute('aria-pressed', String(on)); stage.classList.toggle('on', on);
    });
    return () => clearInterval(raf);
  },
};
