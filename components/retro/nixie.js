// IN-14 cathode shapes (note the IN-14 quirk: "5" is an upside-down "2", "9" an upside-down "6"),
// stacked front-to-back in the real tube order 1 6 2 7 5 0 4 9 8 3.
const TWO = 'M2.5 8C2.5 4 5.5 2 10 2s7.5 2.5 7.5 6.5c0 4.5-4.5 8-15 23.5h15';
const SIX = 'M15.5 3.5C13 2 6 1.2 4 9c-1.7 6.5-1.8 14.5 0 18.6C5.8 31.8 14 33 16.5 28c2-4 .5-10-3.5-11s-9 1-10 6';
const D = [
  '<ellipse cx="10" cy="17" rx="7.5" ry="15"/>',
  '<path d="M6.5 5.5L10 2v30"/>',
  `<path d="${TWO}"/>`,
  '<path d="M3 2h14l-8 12.3c5.2-.3 8.5 3 8.5 8.4C17.5 28.6 14 32 9.8 32c-3.4 0-6-1.6-7.3-4.6"/>',
  '<path d="M14 32V2L2.5 22.5H18"/>',
  `<path d="${TWO}" transform="rotate(180 10 17)"/>`,
  `<path d="${SIX}"/>`,
  '<path d="M2.5 2h15L7 32"/>',
  '<ellipse cx="10" cy="9" rx="6.2" ry="7"/><ellipse cx="10" cy="24.5" rx="7.5" ry="7.5"/>',
  `<path d="${SIX}" transform="rotate(180 10 17)"/>`,
];
const ORDER = [3, 8, 9, 4, 0, 5, 7, 2, 6, 1];
const tube = (i) => `
  <button class="tube" type="button" aria-label="Nixie digit">
    <svg viewBox="0 0 46 100" width="46" height="100" aria-hidden="true">
      <defs>
        <filter id="g${i}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
        <pattern id="hx${i}" width="4.5" height="7.8" patternUnits="userSpaceOnUse"><path d="M0 1.3l2.25-1.3 2.25 1.3v2.6L2.25 5.2 0 3.9zM2.25 5.2v2.6" fill="none" stroke="#6b5d52" stroke-width=".45"/></pattern>
        <linearGradient id="gl${i}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".18" stop-color="#fff" stop-opacity=".03"/><stop offset=".72" stop-color="#fff" stop-opacity=".02"/><stop offset=".86" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".04"/></linearGradient>
      </defs>
      <path d="M5 26C5 10 13 4 23 4s18 6 18 22v58H5z" fill="#140c08"/>
      <path d="M21.5 4.5V1h3v3.5" fill="#2a2420"/>
      <g transform="translate(10 22) scale(1.3)" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <g class="ghost" stroke="#5b4c42" stroke-width=".7">${ORDER.map((n) => D[n]).join('')}</g>
        <g class="lit"><g class="halo" stroke="#ff5a00" stroke-width="3.4" filter="url(#g${i})"></g><g class="mid" stroke="#ff8a24" stroke-width="1.7"></g><g class="core" stroke="#ffe2b8" stroke-width=".8"></g></g>
      </g>
      <rect x="7" y="16" width="32" height="66" fill="url(#hx${i})" opacity=".85"/>
      <path d="M5 26C5 10 13 4 23 4s18 6 18 22v58H5z" fill="url(#gl${i})" stroke="rgba(255,255,255,.22)" stroke-width=".8"/>
      <path d="M5 84h36v4c0 2-2 4-4 4H9c-2 0-4-2-4-4z" fill="#3a302a"/>
      <path d="M10 92v8M14 92v8M18 92v8M22 92v8M26 92v8M30 92v8M34 92v8" stroke="#9a9590" stroke-width=".8"/>
    </svg>
  </button>`;
export default {
  id: 'rt-nixie',
  credit: 'IN-14 Nixie tubes — stacked wire cathodes behind a honeycomb anode, orange neon glow; click to count up',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(ellipse at 50% 30%, #2a1a10, #0c0806 70%); padding: 14px 18px 10px; border-radius: 12px; display: inline-flex; gap: 6px; }
    .tube { width: 46px; height: 100px; border: none; padding: 0; margin: 0; background: none; cursor: pointer; outline: none; border-radius: 16px 16px 4px 4px; }
    .tube svg { display: block; overflow: visible; }
    .tube:focus-visible { box-shadow: 0 0 0 2px #ff9a3c; }
    .lit { transition: opacity .06s; }
    .tube.flick .lit { opacity: .25; }
    .tube:active .core { stroke: #fff4e0; }
  `,
  html: `<div class="stage">${tube(0)}${tube(1)}</div>`,
  init(root) {
    const tubes = [...root.querySelectorAll('.tube')];
    let n = 0;
    const render = () => {
      const s = String(n % 100).padStart(2, '0');
      tubes.forEach((t, i) => {
        const g = D[Number(s[i])];
        t.querySelectorAll('.halo, .mid, .core').forEach((el) => { el.innerHTML = g; });
        t.setAttribute('aria-label', 'Nixie digit ' + s[i]);
      });
    };
    tubes.forEach((t) => t.addEventListener('click', () => {
      n++;
      tubes.forEach((x) => x.classList.add('flick'));
      render();
      requestAnimationFrame(() => requestAnimationFrame(() => tubes.forEach((x) => x.classList.remove('flick'))));
    }));
    n = 19; render();
  },
};
