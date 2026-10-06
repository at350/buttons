// Siemens SIMATIC Comfort Panel running a WinCC screen drawn to ISA-101 high-performance HMI rules:
// gray process graphics, colour only where state matters. Click the valve (bowtie + actuator) to
// open/close it, click the pump to start/stop it (impeller turns only while running). With both on,
// T-101 fills; at 85 % the priority-2 HI alarm appears and at 95 % the HH interlock trips the pump.
export default {
  id: 'nd-scada-tank',
  credit: 'Siemens WinCC / ISA-101 high-performance HMI faceplate — XV-102 valve (green open / red closed), P-101 pump with impeller, T-101 level bar with HI alarm and HH pump trip',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px 12px 8px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(170deg, #3a3f43, #24282b); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .brand { display: flex; justify-content: space-between; align-items: center; height: 14px; margin-top: 4px;
      font: 700 8px/1 Inter, Arial, sans-serif; letter-spacing: 1.6px; color: #00a3a3; }
    .brand i { font-style: normal; color: #8b9298; font-weight: 600; letter-spacing: 1px; font-size: 7px; }
    .scr { display: block; width: 264px; height: 150px; border-radius: 2px; background: #d4d5d5;
      box-shadow: 0 0 0 2px #121416, inset 0 0 12px rgba(0,0,0,.08); }
    .pipe { fill: none; stroke: #74787b; stroke-width: 3; }
    .flowln { fill: none; stroke: #4c5054; stroke-width: 3; stroke-dasharray: 3 9; opacity: 0; }
    svg.flow .flowln { opacity: 1; animation: flow .6s linear infinite; }
    @keyframes flow { to { stroke-dashoffset: -12; } }
    .tank { fill: #e7e8e8; stroke: #74787b; stroke-width: 1.5; }
    .lvl { fill: #5d86ad; }
    .tag { font: 500 7px "IBM Plex Mono", ui-monospace, monospace; fill: #3d4246; text-anchor: middle; }
    .val { font: 600 9px "IBM Plex Mono", ui-monospace, monospace; fill: #111; text-anchor: end; }
    .box { fill: #f1f2f2; stroke: #8b8f92; stroke-width: 1; }
    .valve, .pump { cursor: pointer; outline: none; }
    .hit { fill: transparent; stroke: none; }
    .valve:focus-visible .hit, .pump:focus-visible .hit { stroke: #0b63ce; stroke-width: 1.4; stroke-dasharray: 3 2; }
    .vb { fill: #c8302b; stroke: #3d4246; stroke-width: 1; transition: fill .15s; }
    .valve.open .vb { fill: #2f9a4e; }
    .act { fill: #b9bcbe; stroke: #3d4246; stroke-width: 1; }
    .valve:hover .act, .pump:hover .body { filter: brightness(1.08); }
    .body { fill: #b9bcbe; stroke: #3d4246; stroke-width: 1.2; transition: fill .15s; }
    .pump.run .body { fill: #2f9a4e; }
    .imp { fill: none; stroke: #3d4246; stroke-width: 2; stroke-linecap: round; transform-origin: 76px 116px; }
    .pump.run .imp { stroke: #fff; animation: spin .7s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .alm { opacity: 0; transition: opacity .15s; }
    .alm.on { opacity: 1; animation: blink 1s steps(2, jump-none) infinite; }
    @keyframes blink { 50% { opacity: .35; } }
    .alm path { fill: #f5b800; stroke: #1b1b1b; stroke-width: .8; }
    .alm text { font: 700 8px Inter, Arial, sans-serif; fill: #111; text-anchor: middle; }
  `,
  html: `
    <div class="stage">
      <svg class="scr" viewBox="0 0 264 150">
        <path class="pipe" d="M4 116H60M76 101V40H112M140 40H176V50M216 128H260"/>
        <path class="flowln" d="M4 116H60M76 101V40H112M140 40H176V50M216 128H260"/>
        <rect class="tank" x="160" y="50" width="56" height="88" rx="6"/>
        <rect class="lvl" x="164" y="100.4" width="48" height="33.6"/>
        <text class="tag" x="188" y="148">T-101</text>
        <g class="alm"><path d="M196 40H212L204 26Z"/><text x="204" y="38.5">2</text></g>
        <text class="tag" x="128" y="68">LI-101</text>
        <rect class="box" x="104" y="72" width="48" height="14"/>
        <text class="val" x="148" y="82.5">42.0 %</text>
        <g class="valve" role="button" tabindex="0" aria-pressed="false" aria-label="XV-102 valve">
          <rect class="hit" x="106" y="14" width="40" height="38" rx="3"/>
          <path class="act" d="M126 40V26M118 26a8 8 0 0 1 16 0Z"/>
          <path class="vb" d="M112 32V48L126 40ZM140 32V48L126 40Z"/>
        </g>
        <text class="tag" x="126" y="11">XV-102</text>
        <g class="pump" role="button" tabindex="0" aria-pressed="false" aria-label="P-101 pump">
          <rect class="hit" x="56" y="96" width="40" height="46" rx="3"/>
          <path class="body" d="M67 139h18l-4-9h-10z"/>
          <circle class="body" cx="76" cy="116" r="14"/>
          <path class="imp" d="M76 116q2-7-3-10M76 116q6 4 10 0M76 116q-8 3-7 9"/>
        </g>
        <text class="tag" x="110" y="120">P-101</text>
      </svg>
      <div class="brand">SIEMENS<i>SIMATIC HMI</i></div>
    </div>`,
  init(root) {
    const svg = root.querySelector('svg'), v = root.querySelector('.valve'), p = root.querySelector('.pump');
    const lvl = root.querySelector('.lvl'), val = root.querySelector('.val'), alm = root.querySelector('.alm');
    let open = false, run = false, L = 42, raf = 0, t0 = 0;
    const draw = () => {
      const h = 80 * L / 100; lvl.setAttribute('y', (134 - h).toFixed(1)); lvl.setAttribute('height', h.toFixed(1));
      val.textContent = L.toFixed(1) + ' %'; alm.classList.toggle('on', L >= 85);
    };
    const sync = () => {
      v.classList.toggle('open', open); v.setAttribute('aria-pressed', open);
      p.classList.toggle('run', run); p.setAttribute('aria-pressed', run);
      svg.classList.toggle('flow', run && open);
    };
    const moving = () => (run && open) || (!run && L > 20);
    const tick = (t) => {
      const dt = t0 ? Math.min(0.05, (t - t0) / 1000) : 0; t0 = t;
      if (run && open) L += 6 * dt; else if (!run) L = Math.max(20, L - 2.5 * dt);
      if (L >= 95) { L = 95; run = false; sync(); }
      draw();
      if (moving()) raf = requestAnimationFrame(tick); else { raf = 0; t0 = 0; }
    };
    const kick = () => { sync(); if (!raf && moving()) raf = requestAnimationFrame(tick); };
    const bind = (el, fn) => {
      el.addEventListener('click', () => { fn(); kick(); });
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); kick(); } });
    };
    bind(v, () => { open = !open; });
    bind(p, () => { run = !run; });
    draw();
    return () => cancelAnimationFrame(raf);
  },
};
