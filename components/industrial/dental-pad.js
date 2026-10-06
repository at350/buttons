// A-dec 500-style dental chair touchpad: sealed membrane keys for chair base up/down and backrest
// up/down (hold to drive), programmed positions 0 (entry/exit), 1, 2, LP (last position) and the
// operatory light. The chair beside it follows; presets travel at the real, unhurried pace.
const G = {
  bu: '<path d="M4 14h9l3-8M12 4l2-3 2 3M14 1v6"/>', bd: '<path d="M4 14h9l3-8M12 7l2 3 2-3M14 10V4"/>',
  cu: '<path d="M3 11h11M8 11v5M5 6l3-3 3 3M8 3v6"/>', cd: '<path d="M3 11h11M8 11v5M5 4l3 3 3-3M8 7V1"/>',
  li: '<path d="M4 7h10l-2 4H6z"/><path d="M9 3v4M5 15l1-2M13 15l-1-2M9 16v-3"/>',
};
const key = (k, inner, lbl) => `<button class="k" type="button" data-k="${k}" aria-label="${lbl}">${inner}</button>`;
const ico = (k) => `<svg viewBox="0 0 18 18" aria-hidden="true">${G[k]}</svg>`;
export default {
  id: 'nd-adec-touchpad',
  credit: 'A-dec 500-style dental chair touchpad — hold-to-drive base and backrest, programmed positions 0 / 1 / 2 / LP and the operatory light',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; overflow: hidden; background: linear-gradient(170deg, #eef1f2, #d5dbde); box-shadow: inset 0 1px 0 #fff; }
    .pad { display: grid; grid-template-columns: repeat(3, 34px); gap: 6px; padding: 10px; border-radius: 14px;
      background: linear-gradient(170deg, #f8f9f9, #dde2e4); box-shadow: 0 2px 4px rgba(0,0,0,.18), inset 0 0 0 1px rgba(0,0,0,.08), inset 0 1px 0 #fff; }
    .k { position: relative; height: 30px; border: 0; padding: 0; border-radius: 8px; cursor: pointer; display: grid; place-items: center; color: #4a565e;
      font: 700 12px/1 "DM Sans", Inter, Arial, sans-serif; background: linear-gradient(#fdfdfd, #e7ebed);
      box-shadow: 0 1px 0 #aab4ba, inset 0 0 0 1px rgba(80,95,105,.18), inset 0 1px 0 #fff; transition: transform .05s; touch-action: none; }
    .k svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    .k:hover { color: #1f6fb0; } .k:active, .k.down { transform: translateY(1px); background: linear-gradient(#e7ebed, #f6f7f8); box-shadow: inset 0 1px 2px rgba(0,0,0,.15), inset 0 0 0 1px rgba(80,95,105,.2); }
    .k:focus-visible { outline: 2px solid #1f6fb0; outline-offset: 2px; }
    .k[data-k="li"]::after { content: ''; position: absolute; right: 4px; top: 4px; width: 5px; height: 5px; border-radius: 50%; background: #b7c0c5; }
    .k[data-k="li"][aria-pressed="true"]::after { background: #31d158; box-shadow: 0 0 5px #31d158; }
    .k.go { color: #1f6fb0; }
    svg.ch { width: 132px; height: 128px; }
    .ch .p { transition: transform .5s cubic-bezier(.4,0,.2,1); }
    .ch.slow .p { transition-duration: 1.6s; }
    .ch .up { fill: #2f6f8f; } .ch .fr { fill: #9aa5ab; } .ch .base { fill: #6f7b82; }
    .beam { fill: url(#bm); opacity: 0; transition: opacity .25s; } .ch.lit .beam { opacity: 1; }
    .lamp { fill: #6f7b82; } .ch.lit .bulb { fill: #fff6c8; } .bulb { fill: #c9d0d4; }
  `,
  html: `
    <div class="stage">
      <div class="pad">
        ${key('bu', ico('bu'), 'Backrest up')}${key('cu', ico('cu'), 'Chair up')}${key('li', ico('li'), 'Operatory light')}
        ${key('bd', ico('bd'), 'Backrest down')}${key('cd', ico('cd'), 'Chair down')}${key('p0', '0', 'Entry exit position')}
        ${key('p1', '1', 'Position 1')}${key('p2', '2', 'Position 2')}${key('lp', 'LP', 'Last position')}
      </div>
      <svg class="ch" viewBox="0 0 132 128" aria-hidden="true">
        <defs><linearGradient id="bm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></linearGradient></defs>
        <path class="beam" d="M96 18 L70 72 L108 72 L104 18Z"/>
        <path class="lamp" d="M118 0v10h-14v4h18V0z"/><rect class="bulb" x="92" y="12" width="16" height="7" rx="3"/>
        <rect class="base" x="34" y="118" width="70" height="7" rx="3"/>
        <g class="p lift"><rect class="fr" x="60" y="86" width="12" height="40"/>
          <g class="up"><rect x="44" y="80" width="46" height="9" rx="4"/>
            <path d="M88 84l24 16 4 1-2 6-6-2-26-15z"/>
            <g class="p back"><rect x="2" y="80" width="46" height="9" rx="4"/><rect x="-10" y="78" width="14" height="10" rx="4" fill="#245a75"/></g>
            <rect x="52" y="70" width="4" height="12" class="fr"/><rect x="38" y="68" width="22" height="4" rx="2" class="fr"/></g>
        </g>
      </svg>
    </div>`,
  init(root) {
    const ch = root.querySelector('.ch'), lift = root.querySelector('.lift'), back = root.querySelector('.back'), li = root.querySelector('[data-k="li"]');
    let h = 0.1, b = 0.05, lp = { h: 0.5, b: 0.85 }, rep = 0;
    const P = { p0: { h: 0, b: 0 }, p1: { h: 0.45, b: 0.85 }, p2: { h: 0.7, b: 1 } };
    const draw = () => {
      lift.style.transform = `translateY(${(-h * 34).toFixed(1)}px)`;
      back.style.transformOrigin = '46px 84px';
      back.style.transform = `rotate(${(70 * (1 - b) + 4).toFixed(1)}deg)`;
    };
    const go = (p, slow) => { ch.classList.toggle('slow', !!slow); if (!(h === 0 && b === 0)) lp = { h, b }; h = p.h; b = p.b; draw(); };
    const drive = (k) => {
      ch.classList.remove('slow');
      const d = { bu: ['b', -1], bd: ['b', 1], cu: ['h', 1], cd: ['h', -1] }[k];
      if (d[0] === 'h') h = Math.max(0, Math.min(1, h + d[1] * 0.04)); else b = Math.max(0, Math.min(1, b + d[1] * 0.04));
      draw();
    };
    for (const btn of root.querySelectorAll('.k')) {
      const k = btn.dataset.k;
      if (['bu', 'bd', 'cu', 'cd'].includes(k)) {
        const stop = () => { clearInterval(rep); btn.classList.remove('down'); };
        btn.addEventListener('pointerdown', (e) => { btn.setPointerCapture(e.pointerId); drive(k); clearInterval(rep); rep = setInterval(() => drive(k), 90); });
        btn.addEventListener('pointerup', stop); btn.addEventListener('pointercancel', stop); btn.addEventListener('lostpointercapture', stop);
        btn.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); btn.classList.add('down'); drive(k); } });
        btn.addEventListener('keyup', stop);
      } else if (k === 'li') {
        btn.setAttribute('aria-pressed', 'false');
        btn.addEventListener('click', () => { const on = !ch.classList.contains('lit'); ch.classList.toggle('lit', on); btn.setAttribute('aria-pressed', on); });
      } else btn.addEventListener('click', () => go(k === 'lp' ? lp : P[k], true));
    }
    draw();
    return () => clearInterval(rep);
  },
};
