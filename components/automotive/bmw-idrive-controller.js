const ITEMS = [['Navigation', '<polygon points="3 11 22 2 13 21 11 13 3 11"/>'], ['Media', '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'], ['Phone', '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>'], ['Apps', '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>'], ['My Vehicle', '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>'], ['Settings', '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>']];
const B = (cls, label, ic) => `<button class="hb ${cls}" type="button" aria-label="${label}"><svg viewBox="0 0 24 24">${ic}</svg></button>`;

export default {
  id: 'au-bmw-idrive-controller',
  credit: 'BMW iDrive Controller — knurled rotary on the console: drag it around to step the menu one detent at a time, press it to select; Home / Back / Option / Media / Phone / Map keys',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 12px; width: 336px; max-width: 100%; padding: 12px; border-radius: 12px; background: radial-gradient(circle at 70% 50%, #2a2a2c, #111 75%); font: 400 11px/1 Inter, system-ui, sans-serif; color: #e9eef6; user-select: none; }
    .scr { position: relative; flex: none; width: 118px; height: 168px; padding: 6px; border-radius: 8px; background: #05070a; box-shadow: 0 0 0 1px #2c2f35; overflow: hidden; }
    .list { display: grid; gap: 2px; transition: opacity .25s, transform .3s cubic-bezier(.2,0,0,1); }
    .it { position: relative; display: flex; align-items: center; gap: 6px; height: 24px; padding: 0 6px; border-radius: 4px; color: #93a0b3; white-space: nowrap; transition: color .15s; }
    .it svg, .det svg { width: 13px; height: 13px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .it.sel { color: #fff; }
    .hl { position: absolute; left: 6px; right: 6px; top: 6px; height: 24px; border-radius: 4px; background: linear-gradient(90deg, #1c69d4, #0f3f86); box-shadow: 0 0 10px rgba(28,105,212,.6); transition: transform .18s cubic-bezier(.2,0,0,1); }
    .flash .hl { background: #4f93f0; }
    .det { position: absolute; inset: 6px; display: grid; place-items: center; align-content: center; gap: 8px; opacity: 0; transform: translateX(16px); transition: opacity .25s, transform .3s cubic-bezier(.2,0,0,1); font-size: 13px; font-weight: 600; }
    .det svg { width: 28px; height: 28px; color: #4f93f0; }
    .in .list { opacity: 0; transform: translateX(-16px); }
    .in .hl { opacity: 0; }
    .in .det { opacity: 1; transform: none; }
    .con { display: flex; align-items: center; gap: 8px; }
    .col { display: grid; gap: 6px; }
    .hb { width: 34px; height: 24px; border: 0; border-radius: 6px; background: linear-gradient(#34353a, #1d1e21); box-shadow: 0 2px 0 #0b0b0c, inset 0 1px 0 rgba(255,255,255,.12); color: #c9cfd8; cursor: pointer; display: grid; place-items: center; transition: transform .06s, box-shadow .06s; }
    .hb:active { transform: translateY(2px); box-shadow: 0 0 0 #0b0b0c, inset 0 1px 0 rgba(255,255,255,.08); }
    .hb:focus-visible, .knob:focus-visible { outline: 2px solid #4f93f0; outline-offset: 2px; }
    .hb svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .knob { position: relative; width: 92px; height: 92px; flex: none; border-radius: 50%; cursor: grab; touch-action: none; box-shadow: 0 8px 14px rgba(0,0,0,.7), 0 0 0 3px #0c0c0d; transition: transform .08s; }
    .knob.down { transform: scale(.955); }
    .ring { position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(#d9dce1 0 3deg, #8a8f97 3deg 6deg); }
    .ring::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: linear-gradient(150deg, rgba(255,255,255,.35), transparent 50%, rgba(0,0,0,.35)); }
    .pad { position: absolute; inset: 12px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #3a3c42, #0d0e10 70%); box-shadow: inset 0 2px 4px rgba(0,0,0,.8), 0 0 0 1px #000; }
    .pad::after { content: ''; position: absolute; left: 50%; top: 6px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: #4f93f0; box-shadow: 0 0 6px #4f93f0; }
  `,
  html: `
    <div class="stage">
      <div class="scr"><div class="hl"></div><div class="list">${ITEMS.map(([n, ic], i) => `<div class="it${i ? '' : ' sel'}"><svg viewBox="0 0 24 24">${ic}</svg>${n}</div>`).join('')}</div><div class="det"><svg viewBox="0 0 24 24"></svg><span></span></div></div>
      <div class="con">
        <div class="col">${B('home', 'Home', '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')}${B('back', 'Back', '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>')}${B('opt', 'Option', '<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>')}</div>
        <div class="knob" tabindex="0" role="slider" aria-label="iDrive Controller" aria-valuemin="1" aria-valuemax="6" aria-valuenow="1" aria-valuetext="Navigation"><div class="ring"></div><div class="pad"></div></div>
        <div class="col">${B('j1', 'Media', '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>')}${B('j2', 'Phone', '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>')}${B('j0', 'Map', '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>')}</div>
      </div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const scr = $('.scr'), hl = $('.hl'), its = [...root.querySelectorAll('.it')], knob = $('.knob'), ring = $('.ring'), det = $('.det');
    let idx = 0, rot = 0, acc = 0, last = 0, moved = 0, drag = false, ft = 0;
    const paint = () => {
      hl.style.transform = `translateY(${idx * 26}px)`;
      its.forEach((it, i) => it.classList.toggle('sel', i === idx));
      knob.setAttribute('aria-valuenow', idx + 1); knob.setAttribute('aria-valuetext', ITEMS[idx][0]);
    };
    const step = (d) => { if (scr.classList.contains('in')) return; const n = Math.max(0, Math.min(5, idx + d)); if (n !== idx) { idx = n; rot += d * 15; ring.style.transform = `rotate(${rot}deg)`; paint(); } };
    const enter = () => {
      det.querySelector('svg').innerHTML = its[idx].querySelector('svg').innerHTML; det.querySelector('span').textContent = ITEMS[idx][0];
      scr.classList.add('flash'); clearTimeout(ft); ft = setTimeout(() => { scr.classList.remove('flash'); scr.classList.add('in'); }, 140);
    };
    const ang = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 180 / Math.PI; };
    knob.addEventListener('pointerdown', (e) => { drag = true; moved = 0; acc = 0; last = ang(e); knob.setPointerCapture(e.pointerId); knob.classList.add('down'); });
    knob.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const a = ang(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; acc += d; moved += Math.abs(d);
      if (moved > 6) knob.classList.remove('down');
      while (acc > 24) { acc -= 24; step(1); } while (acc < -24) { acc += 24; step(-1); }
    });
    const up = () => { if (!drag) return; drag = false; knob.classList.remove('down'); if (moved < 6) { if (scr.classList.contains('in')) return; enter(); } };
    knob.addEventListener('pointerup', up); knob.addEventListener('pointercancel', () => { drag = false; knob.classList.remove('down'); });
    knob.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); }
      if (e.key === 'Backspace' || e.key === 'Escape') scr.classList.remove('in');
    });
    $('.back').addEventListener('click', () => scr.classList.remove('in'));
    $('.home').addEventListener('click', () => { scr.classList.remove('in'); idx = 0; paint(); });
    $('.opt').addEventListener('click', () => { scr.classList.remove('in'); idx = 5; paint(); });
    ['j0', 'j1', 'j2'].forEach((c) => $('.' + c).addEventListener('click', () => { scr.classList.remove('in'); idx = +c[1]; paint(); enter(); }));
    paint();
    return () => clearTimeout(ft);
  },
};
