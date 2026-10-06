const SEAT = (cls) => `<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true"><g class="w"><path d="M11 9c-1.6-1.4 1.6-2.6 0-4s1.6-2.6 0-4"/><path d="M16 9c-1.6-1.4 1.6-2.6 0-4s1.6-2.6 0-4"/><path d="M21 9c-1.6-1.4 1.6-2.6 0-4s1.6-2.6 0-4"/></g><g class="s" transform="translate(5 10) scale(.086)"><path d="M224,232a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16H216A8,8,0,0,1,224,232Zm0-72v32a16,16,0,0,1-16,16H114.11a15.93,15.93,0,0,1-14.32-8.85l-58.11-116a16.1,16.1,0,0,1,0-14.32l22.12-44A16,16,0,0,1,85,17.56l33.69,14.22.47.22a16,16,0,0,1,7.15,21.46,1.51,1.51,0,0,1-.11.22L112,80l31.78,64L208,144A16,16,0,0,1,224,160Zm-16,0H143.77a15.91,15.91,0,0,1-14.31-8.85l-31.79-64a16.07,16.07,0,0,1,0-14.29l.12-.22L112,46.32,78.57,32.21A4.84,4.84,0,0,1,78.1,32L56,76,114.1,192H208Z"/></g></svg>`;
const BTN = (label, cls = '') => `<button class="seat" type="button" aria-label="${label} seat heater" data-lvl="0">${SEAT(cls)}<span class="dots"><i></i><i></i><i></i></span></button>`;

export default {
  id: 'au-tesla-seat-heaters',
  credit: 'Tesla Model 3 / Y — seat heater controls: tap a seat to cycle 3 → 2 → 1 → off (red heat waves), plus the heated steering wheel',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 292px; max-width: 100%; padding: 14px; border-radius: 12px; background: #000; font: 500 12px/1 Inter, -apple-system, system-ui, sans-serif; color: #fff; }
    .card { border-radius: 10px; background: #171717; padding: 12px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .seat, .wheel { height: 64px; border: 0; border-radius: 8px; background: #222; color: #a8a8a8; cursor: pointer; display: grid; place-items: center; align-content: center; gap: 6px; -webkit-tap-highlight-color: transparent; transition: background .15s, transform .1s; }
    .seat:hover, .wheel:hover { background: #2c2c2c; }
    .seat:active, .wheel:active { transform: scale(.94); }
    .seat:focus-visible, .wheel:focus-visible { outline: 2px solid #3e6ae1; outline-offset: 2px; }
    .seat svg { width: 32px; height: 32px; }
    .seat .flip { transform: scaleX(-1); }
    .s { fill: currentColor; }
    .w path { fill: none; stroke: #4a4a4a; stroke-width: 1.8; stroke-linecap: round; transition: stroke .2s; }
    .seat[data-lvl="1"] .w path:nth-child(1),
    .seat[data-lvl="2"] .w path:nth-child(-n+2),
    .seat[data-lvl="3"] .w path { stroke: #e82127; filter: drop-shadow(0 0 2px rgba(232,33,39,.7)); }
    .seat:not([data-lvl="0"]) { color: #e6e6e6; }
    .dots { display: flex; gap: 3px; }
    .dots i { width: 5px; height: 5px; border-radius: 50%; background: #3a3a3a; transition: background .2s; }
    .seat[data-lvl="1"] .dots i:nth-child(1), .seat[data-lvl="2"] .dots i:nth-child(-n+2), .seat[data-lvl="3"] .dots i { background: #e82127; }
    .wheel svg { width: 28px; height: 28px; fill: currentColor; }
    .wheel span { font-size: 10px; letter-spacing: .02em; color: #6a6a6a; }
    .wheel[aria-pressed="true"] { color: #e82127; }
    .wheel[aria-pressed="true"] span { color: #e6e6e6; }
    .wheel[aria-pressed="true"] svg { filter: drop-shadow(0 0 3px rgba(232,33,39,.6)); }
    .row2 { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding-top: 8px; border-top: 1px solid #262626; }
  `,
  html: `
    <div class="stage">
      <div class="card">
        ${BTN('Driver')}
        <button class="wheel" type="button" aria-pressed="false" aria-label="Steering wheel heater"><svg viewBox="0 -960 960 960"><path d="M860-673q0-18-6.5-34.5T834-738q-21-23-32.5-50.5T790-847q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T920-671q0 22-6.5 43T894-589l-8 12q-7 11-18.5 12.5T845-570q-11-7-13-18.5t5-22.5l7-11q8-11 12-24t4-27Zm-173 1q0-19-7-35.5T660-738q-21-23-32.5-50.5T616-847q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-7 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T747-671q0 22-6.5 43T721-589l-4 6-4 6q-7 11-18.5 12.5T672-570q-11-7-13-18.5t5-22.5l7-11q8-11 12-23.5t4-26.5ZM510-141q124-11 211-98t98-211H632L510-298v157Zm4-531q0-19-7-35.5T487-738q-21-23-33-50.5T442-847q0-22 6.5-43t20.5-39l9-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T574-671q0 22-6.5 43T548-589l-8 12q-7 11-18.5 12.5T499-570q-11-7-13-18.5t5-22.5l7-11q8-11 12-23.5t4-26.5ZM141-450q11 124 98 211t211 98v-157L328-450H141Zm-61-30q0-130 72.5-231T340-855q13-5 23 1t14 17q4 11 0 22.5T358-797q-89 34-148.5 110.5T141-510h704q14 0 24.5 10.5T880-475q-1 81-32.5 153T762-196.5q-54 53.5-126.5 85T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480Z"/></svg><span>Auto</span></button>
        ${BTN('Passenger', 'flip')}
        <div class="row2">${BTN('Rear left')}${BTN('Rear center')}${BTN('Rear right', 'flip')}</div>
      </div>
    </div>`,
  init(root) {
    const NEXT = { 0: 3, 3: 2, 2: 1, 1: 0 };
    root.querySelectorAll('.seat').forEach((b) => {
      b.addEventListener('click', () => {
        const l = NEXT[b.dataset.lvl];
        b.dataset.lvl = l;
        b.setAttribute('aria-label', b.getAttribute('aria-label').replace(/ level \d$/, '') + (l ? ` level ${l}` : ''));
      });
    });
    const w = root.querySelector('.wheel'), lab = w.querySelector('span');
    w.addEventListener('click', () => {
      const on = w.getAttribute('aria-pressed') !== 'true';
      w.setAttribute('aria-pressed', String(on));
      lab.textContent = on ? 'On' : 'Auto';
    });
  },
};
