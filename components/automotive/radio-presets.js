export default {
  id: 'au-radio-presets',
  credit: 'Car head unit — preset bar 1–6 (latching, hold to store), SEEK ‹ ›, and the volume knob: twist for level, push to mute; blue segment LCD',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 330px; max-width: 100%; padding: 12px; border-radius: 12px; background: linear-gradient(#2e2f33, #18191b); font: 700 11px/1 Inter, 'Helvetica Neue', system-ui, sans-serif; color: #d8dbe0; user-select: none; }
    .top { display: flex; align-items: center; gap: 10px; }
    .vk { position: relative; width: 58px; height: 58px; flex: none; border-radius: 50%; cursor: grab; touch-action: none; background: radial-gradient(circle at 40% 30%, #4a4b50, #141517 70%); box-shadow: 0 0 0 3px #8d9198, 0 0 0 5px #111, 0 5px 8px rgba(0,0,0,.7); transform: rotate(var(--r, 0deg)); transition: transform .08s; }
    .vk.down { transform: rotate(var(--r, 0deg)) scale(.94); }
    .vk::after { content: ''; position: absolute; left: 50%; top: 5px; width: 3px; height: 9px; margin-left: -1.5px; border-radius: 2px; background: #9fd3ff; box-shadow: 0 0 4px #4fb3ff; }
    .vk:focus-visible, button:focus-visible { outline: 2px solid #4fb3ff; outline-offset: 3px; }
    .lcd { flex: 1; height: 58px; border-radius: 4px; padding: 7px 10px; background: linear-gradient(#071019, #0b1a28); box-shadow: inset 0 0 0 1px #000, inset 0 2px 6px rgba(0,0,0,.8); color: #8fd0ff; text-shadow: 0 0 6px rgba(79,179,255,.7); font-family: 'JetBrains Mono', ui-monospace, monospace; display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr; align-items: end; }
    .band { font-size: 10px; font-weight: 500; letter-spacing: .1em; opacity: .8; }
    .pn { justify-self: end; font-size: 10px; font-weight: 500; opacity: .8; min-width: 20px; text-align: right; }
    .fq { font: 500 24px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .02em; }
    .fq small { font-size: 10px; margin-left: 3px; }
    .vb { justify-self: end; display: flex; align-items: flex-end; gap: 2px; height: 20px; min-width: 52px; }
    .vb i { width: 3px; background: #8fd0ff; opacity: .2; border-radius: 1px; }
    .vb i.on { opacity: 1; }
    .mute .vb { display: none; }
    .mt { display: none; justify-self: end; font: 600 12px/20px 'JetBrains Mono', monospace; letter-spacing: .1em; animation: bl 1s steps(1) infinite; }
    .mute .mt { display: block; }
    @keyframes bl { 50% { opacity: .3; } }
    .row { display: grid; grid-template-columns: 26px repeat(6, 1fr) 26px; gap: 4px; margin-top: 10px; }
    button { height: 30px; border: 0; padding: 0; border-radius: 4px; background: linear-gradient(#45464b, #232427); box-shadow: 0 3px 0 #08080a, inset 0 1px 0 rgba(255,255,255,.15); color: #e2e5ea; font: inherit; cursor: pointer; transition: transform .06s, box-shadow .06s; position: relative; }
    button:active, button[aria-pressed="true"] { transform: translateY(2px); box-shadow: 0 1px 0 #08080a, inset 0 1px 0 rgba(255,255,255,.08); }
    button[aria-pressed="true"] { background: linear-gradient(#36373b, #1d1e21); color: #9fd3ff; text-shadow: 0 0 6px #4fb3ff; }
    button.saved { animation: sv .5s 1; }
    @keyframes sv { 50% { background: #2a6db0; } }
    button svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="stage">
      <div class="top">
        <div class="vk" tabindex="0" role="slider" aria-label="Volume (press to mute)" aria-valuemin="0" aria-valuemax="30" aria-valuenow="12"></div>
        <div class="lcd"><span class="band">FM1</span><span class="pn">P1</span><span class="fq">101.1<small>MHz</small></span><span class="vb"></span><span class="mt">MUTE</span></div>
      </div>
      <div class="row">
        <button class="sk dn" type="button" aria-label="Seek down"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
        ${[1, 2, 3, 4, 5, 6].map((n) => `<button class="p" type="button" aria-pressed="${n === 1}">${n}</button>`).join('')}
        <button class="sk up" type="button" aria-label="Seek up"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const lcd = $('.lcd'), fq = $('.fq'), pn = $('.pn'), vb = $('.vb'), vk = $('.vk'), ps = [...root.querySelectorAll('.p')];
    const presets = [101.1, 88.5, 94.9, 97.3, 104.3, 106.7], STN = [88.5, 90.3, 94.9, 97.3, 99.7, 101.1, 102.7, 104.3, 106.7, 107.7];
    let f = 101.1, vol = 12, mute = false, rot = 0, holdT = 0, held = false;
    vb.innerHTML = Array.from({ length: 10 }, (_, i) => `<i style="height:${4 + i * 1.6}px"></i>`).join('');
    const bars = [...vb.children];
    const paint = () => {
      fq.innerHTML = f.toFixed(1) + '<small>MHz</small>';
      const p = presets.findIndex((x) => Math.abs(x - f) < .05);
      ps.forEach((b, i) => b.setAttribute('aria-pressed', String(i === p)));
      pn.textContent = p >= 0 ? 'P' + (p + 1) : '';
      bars.forEach((b, i) => b.classList.toggle('on', i < Math.ceil(vol / 3)));
      lcd.classList.toggle('mute', mute); vk.setAttribute('aria-valuenow', vol);
    };
    ps.forEach((b, i) => {
      b.addEventListener('pointerdown', () => { held = false; clearTimeout(holdT); holdT = setTimeout(() => { held = true; presets[i] = f; b.classList.remove('saved'); void b.offsetWidth; b.classList.add('saved'); paint(); }, 650); });
      b.addEventListener('pointerleave', () => clearTimeout(holdT));
      b.addEventListener('click', () => { clearTimeout(holdT); if (held) { held = false; return; } f = presets[i]; paint(); });
    });
    const seek = (d) => { const list = d > 0 ? STN.filter((s) => s > f + .05) : STN.filter((s) => s < f - .05).reverse(); f = list.length ? list[0] : d > 0 ? STN[0] : STN[STN.length - 1]; paint(); };
    $('.dn').addEventListener('click', () => seek(-1)); $('.up').addEventListener('click', () => seek(1));
    let on = false, last = 0, acc = 0, moved = 0;
    const ang = (e) => { const r = vk.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 180 / Math.PI; };
    vk.addEventListener('pointerdown', (e) => { on = true; moved = 0; acc = 0; last = ang(e); vk.setPointerCapture(e.pointerId); vk.classList.add('down'); });
    vk.addEventListener('pointermove', (e) => {
      if (!on) return; const a = ang(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; acc += d; moved += Math.abs(d);
      if (moved > 6) vk.classList.remove('down');
      while (Math.abs(acc) >= 12) { vol = Math.max(0, Math.min(30, vol + Math.sign(acc))); rot += Math.sign(acc) * 12; acc -= Math.sign(acc) * 12; mute = false; vk.style.setProperty('--r', rot + 'deg'); paint(); }
    });
    vk.addEventListener('pointerup', () => { if (!on) return; on = false; vk.classList.remove('down'); if (moved < 6) { mute = !mute; paint(); } });
    vk.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); vol = Math.max(0, Math.min(30, vol + d)); mute = false; paint(); }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mute = !mute; paint(); }
    });
    paint();
    return () => clearTimeout(holdT);
  },
};
