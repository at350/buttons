// Iron Man — JARVIS HUD radial menu (Prologue / Cantina Creative): counter-rotating arcs, reticle ticks; the core opens a sector ring.
const C = 120, R0 = 66, R1 = 98, N = 6, GAP = 4;
const pt = (r, a) => `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`;
const LABELS = ['SUIT', 'POWER', 'TARGET', 'FLIGHT', 'COMMS', 'DIAG'];
const SECT = LABELS.map((l, i) => {
  const a0 = ((i * 60 - 90 - 30 + GAP / 2) * Math.PI) / 180, a1 = ((i * 60 - 90 + 30 - GAP / 2) * Math.PI) / 180, am = (a0 + a1) / 2;
  return { l, d: `M${pt(R1, a0)}A${R1} ${R1} 0 0 1 ${pt(R1, a1)}L${pt(R0, a1)}A${R0} ${R0} 0 0 0 ${pt(R0, a0)}Z`, x: (C + 82 * Math.cos(am)).toFixed(1), y: (C + 82 * Math.sin(am) + 3).toFixed(1) };
});
export default {
  id: 'sf-jarvis-ring',
  credit: 'Iron Man — JARVIS HUD ring menu (Cantina Creative / Prologue): cyan counter-rotating arcs and reticle ticks; tap the arc-reactor core to fan the sector menu, pick a system',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 260px; height: 260px; max-width: 100%; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 50% 50%, #06202b, #01080c 70%); }
    svg { position: absolute; left: 10px; top: 10px; width: 240px; height: 240px; overflow: visible; font: 600 8px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .14em; }
    .r { fill: none; stroke: #39d5ff; transform-origin: 120px 120px; }
    .spin1 { animation: sp 40s linear infinite; } .spin2 { animation: sp 22s linear infinite reverse; } .spin3 { animation: sp 9s linear infinite; }
    .stage:hover .spin3, .open .spin3 { animation-duration: 3s; } .stage:hover .spin2, .open .spin2 { animation-duration: 8s; }
    @keyframes sp { to { transform: rotate(360deg); } }
    .s { cursor: pointer; outline: none; transform-origin: 120px 120px; transform: scale(.6) rotate(-30deg); opacity: 0; transition: transform .35s cubic-bezier(.2,.9,.3,1.2), opacity .2s; transition-delay: calc(var(--i) * 30ms); pointer-events: none; }
    .open .s { transform: none; opacity: 1; pointer-events: auto; }
    .s path { fill: rgba(57,213,255,.08); stroke: #39d5ff; stroke-width: 1; transition: fill .15s; }
    .s text { fill: #9eeaff; text-anchor: middle; }
    .s:hover path, .s:focus-visible path { fill: rgba(57,213,255,.28); }
    .s[aria-checked="true"] path { fill: rgba(57,213,255,.55); stroke: #e8fbff; filter: drop-shadow(0 0 4px #39d5ff); }
    .s[aria-checked="true"] text { fill: #fff; }
    .core { position: absolute; left: 100px; top: 100px; width: 60px; height: 60px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; z-index: 2;
      background: radial-gradient(circle, #f2fdff 0 14%, #7fe6ff 22%, #1aa6d6 40%, #06303f 62%, #021117 70%); box-shadow: 0 0 0 2px #39d5ff, 0 0 18px #1fb8ee; transition: box-shadow .2s, transform .2s; }
    .core::after { content: ''; position: absolute; inset: 9px; border-radius: 50%; border: 2px dashed rgba(220,250,255,.6); }
    .core:hover { box-shadow: 0 0 0 2px #bff3ff, 0 0 26px #39d5ff; }
    .core:active { transform: scale(.94); }
    .core:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
  `,
  html: `<div class="stage"><button class="core" type="button" aria-expanded="false" aria-label="JARVIS"></button><svg viewBox="0 0 240 240" role="menu">
    <circle class="r spin1" cx="120" cy="120" r="116" stroke-width="5" stroke-dasharray="1 5" opacity=".7"/>
    <circle class="r spin2" cx="120" cy="120" r="108" stroke-width="2" stroke-dasharray="60 14 6 14 120 30" opacity=".85"/>
    <circle class="r" cx="120" cy="120" r="103" stroke-width=".6" opacity=".5"/>
    <circle class="r spin3" cx="120" cy="120" r="44" stroke-width="3" stroke-dasharray="40 10 10 10" opacity=".9"/>
    <circle class="r spin1" cx="120" cy="120" r="36" stroke-width="1" stroke-dasharray="2 3" opacity=".7"/>
    <path class="r" d="M120 0v10M120 230v10M0 120h10M230 120h10" stroke-width="1.5"/>
    ${SECT.map((s, i) => `<g class="s" role="menuitemradio" tabindex="-1" aria-checked="${i === 0}" style="--i:${i}"><path d="${s.d}"/><text x="${s.x}" y="${s.y}">${s.l}</text></g>`).join('')}
  </svg></div>`,
  init(root, host) {
    const st = root.querySelector('.stage'), core = root.querySelector('.core'), ss = [...root.querySelectorAll('.s')];
    const set = (o) => { st.classList.toggle('open', o); core.setAttribute('aria-expanded', String(o)); ss.forEach((s) => s.setAttribute('tabindex', o ? '0' : '-1')); };
    core.addEventListener('click', () => set(!st.classList.contains('open')));
    const pick = (s) => ss.forEach((x) => x.setAttribute('aria-checked', String(x === s)));
    ss.forEach((s) => {
      s.addEventListener('click', () => pick(s));
      s.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(s); } });
    });
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); core.focus(); } });
  },
};
