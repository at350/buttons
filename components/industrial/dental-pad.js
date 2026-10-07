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
        <defs>
          <linearGradient id="bm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></linearGradient>
          <linearGradient id="uph" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f93b5"/><stop offset=".45" stop-color="#2f6f8f"/><stop offset="1" stop-color="#1d4b62"/></linearGradient>
          <linearGradient id="col" x1="0" x2="1"><stop offset="0" stop-color="#8b969c"/><stop offset=".4" stop-color="#e3e8ea"/><stop offset="1" stop-color="#7d888e"/></linearGradient>
          <linearGradient id="shell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f7"/><stop offset="1" stop-color="#b9c2c7"/></linearGradient>
        </defs>
        <path class="beam" d="M95 21 L66 74 L110 74 L107 21Z"/>
        <!-- operatory light: ceiling arm, yoke and head -->
        <path d="M132 0h-6v8h-22v4h28z" fill="#8a959b"/><path d="M104 10v6" stroke="#8a959b" stroke-width="3"/>
        <path d="M90 15h26l-3 7H93z" fill="url(#shell)" stroke="#97a2a8" stroke-width=".8"/><rect class="bulb" x="95" y="19" width="16" height="3" rx="1.5"/>
        <!-- base plate -->
        <path d="M30 124c0-4 4-7 10-7h56c6 0 10 3 10 7z" fill="url(#shell)" stroke="#9aa5ab" stroke-width=".8"/>
        <g class="p lift">
          <rect x="59" y="88" width="16" height="38" rx="2" fill="url(#col)"/>
          <path d="M59 96h16M59 101h16M59 106h16M59 111h16" stroke="#9aa5ab" stroke-width=".8"/>
          <g class="up">
            <rect x="48" y="88" width="40" height="6" rx="2" fill="url(#shell)"/>
            <!-- leg rest with toe board -->
            <path d="M88 84L113 100" stroke="url(#uph)" stroke-width="10" stroke-linecap="round"/>
            <path d="M113 98l5 8" stroke="#9aa5ab" stroke-width="3" stroke-linecap="round"/>
            <!-- seat cushion -->
            <path d="M45 78h43c5 0 8 3 8 6s-3 6-8 6H45c-4 0-6-3-6-6s2-6 6-6z" fill="url(#uph)"/>
            <path d="M47 80h40" stroke="#7fb6d1" stroke-width="1" stroke-linecap="round" opacity=".7"/>
            <!-- armrest -->
            <path d="M54 72v8" stroke="#9aa5ab" stroke-width="3"/><rect x="40" y="68" width="24" height="5" rx="2.5" fill="#2a2f33"/>
            <g class="p back">
              <path d="M8 79h38c4 0 6 2.5 6 5.5S50 90 46 90H8c-4 0-6-2.5-6-5.5S4 79 8 79z" fill="url(#uph)"/>
              <path d="M10 81h34" stroke="#7fb6d1" stroke-width="1" stroke-linecap="round" opacity=".7"/>
              <path d="M2 85h-4" stroke="#9aa5ab" stroke-width="3"/>
              <rect x="-15" y="80" width="13" height="9" rx="4.5" fill="url(#uph)"/>
            </g>
          </g>
        </g>
      </svg>
    </div>`,
  init(root) {
    const ch = root.querySelector('.ch'), lift = root.querySelector('.lift'), back = root.querySelector('.back'), li = root.querySelector('[data-k="li"]');
    let h = 0.1, b = 0.05, lp = { h: 0.5, b: 0.85 }, rep = 0;
    const P = { p0: { h: 0, b: 0 }, p1: { h: 0.45, b: 0.85 }, p2: { h: 0.7, b: 1 } };
    const draw = () => {
      lift.style.transform = `translateY(${(-h * 34).toFixed(1)}px)`;
      back.style.transformOrigin = '48px 84.5px';
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
