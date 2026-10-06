// Alien (1979) — MU-TH-UR 6000 interface on the Nostromo: phosphor text, the query Ripley types, Special Order 937.
const Q = [
  ['WHAT IS SPECIAL ORDER 937', 'NOSTROMO REROUTED TO NEW CO-ORDINATES. INVESTIGATE LIFE FORM. GATHER SPECIMEN. PRIORITY ONE. INSURE RETURN OF ORGANISM FOR ANALYSIS. ALL OTHER CONSIDERATIONS SECONDARY. CREW EXPENDABLE.'],
  ['REQUEST ENHANCEMENT', 'NO FURTHER ENHANCEMENT\nSPECIAL ORDER 937\nSCIENCE OFFICER EYES ONLY'],
  ['WHAT ARE MY CHANCES', 'DOES NOT COMPUTE'],
];
export default {
  id: 'sf-muthur-terminal',
  credit: 'Alien (1979) — MU-TH-UR 6000 terminal on the Nostromo: "INTERFACE 2037 READY FOR INQUIRY", Ripley\'s query and Special Order 937 typed out in flickering phosphor',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 320px; max-width: 100%; height: 224px; border-radius: 12px; overflow: hidden; padding: 14px 16px; background: radial-gradient(ellipse at 50% 45%, #061409, #010402 80%);
      font: 500 11px/1.45 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace; color: #9dffb7; text-shadow: 0 0 4px rgba(90,255,140,.7), 0 0 10px rgba(60,255,120,.25); letter-spacing: .02em; animation: fl 4s infinite; }
    .stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(0,0,0,.35) 0 1px, transparent 1px 3px); box-shadow: inset 0 0 40px #000; }
    @keyframes fl { 0%, 100% { opacity: 1; } 47% { opacity: .96; } 48% { opacity: .88; } 49% { opacity: 1; } 81% { opacity: .97; } }
    .hd { display: flex; justify-content: space-between; opacity: .8; }
    .out { height: 118px; margin: 4px 0 6px; overflow: hidden; white-space: pre-wrap; word-break: break-word; }
    .cur { display: inline-block; width: 7px; height: 11px; vertical-align: -1px; background: #9dffb7; animation: c 1s steps(1) infinite; }
    @keyframes c { 50% { opacity: 0; } }
    .q { display: block; width: 100%; text-align: left; font: inherit; color: inherit; text-shadow: inherit; background: none; border: 0; padding: 1px 4px; margin: 0 -4px; cursor: pointer;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: inherit; }
    .q::before { content: '> '; opacity: .6; }
    .q:hover, .q:focus-visible { background: #9dffb7; color: #021006; text-shadow: none; outline: none; }
    .q[aria-pressed="true"] { opacity: .55; }
  `,
  html: `<div class="stage"><div class="hd"><span>MU/TH/UR 6000</span><span>2037</span></div>
    <div class="out">INTERFACE 2037 READY FOR INQUIRY\n\n<span class="cur"></span></div>
    ${Q.map(([q], i) => `<button class="q" type="button" aria-pressed="false" data-i="${i}">${q}</button>`).join('')}</div>`,
  init(root) {
    const out = root.querySelector('.out');
    let tm = 0;
    let wait = 0;
    const type = (txt, cut) => {
      clearInterval(tm); clearTimeout(wait); let n = 0;
      out.innerHTML = txt.slice(0, cut).replace(/</g, '&lt;') + '<span class="cur"></span>';
      wait = setTimeout(() => { n = cut; tm = setInterval(tick, 30); }, 700);
      const tick = () => {
        n += 3; out.innerHTML = txt.slice(0, n).replace(/</g, '&lt;') + '<span class="cur"></span>';
        if (n >= txt.length) { clearInterval(tm); tm = 0; }
      };
    };
    root.querySelectorAll('.q').forEach((b) => b.addEventListener('click', () => {
      root.querySelectorAll('.q').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const [q, a] = Q[+b.dataset.i];
      const head = +b.dataset.i === 0 ? `EMERGENCY COMMAND OVERRIDE 100375\n${q}\n` : `${q}\n`;
      type(head + a, head.length);
    }));
    const qs = [...root.querySelectorAll('.q')];
    qs.forEach((b, i) => b.addEventListener('keydown', (e) => {
      const d = { ArrowDown: 1, ArrowUp: -1 }[e.key];
      if (d) { e.preventDefault(); qs[(i + d + qs.length) % qs.length].focus(); }
    }));
    return () => { clearInterval(tm); clearTimeout(wait); };
  },
};
