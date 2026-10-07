export default {
  id: 'au-frunk-trunk',
  credit: 'Tesla car screen — "Open Frunk" / "Open Trunk" labels on the car render; tap and the lid swings up on the silhouette (Close to bring the power liftgate down)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; max-width: 100%; height: 170px; border-radius: 12px; overflow: hidden; background: radial-gradient(ellipse at 50% 85%, #26282b, #0d0e0f 70%); font: 500 12px/1.15 Inter, -apple-system, system-ui, sans-serif; color: #fff; user-select: none; }
    svg { position: absolute; left: 20px; bottom: 10px; width: 260px; height: 110px; }
    .shadow { fill: rgba(0,0,0,.6); filter: blur(4px); }
    .body { stroke: #7d838b; stroke-width: .6; }
    .glass { stroke: #0b0d10; stroke-width: .6; }
    .lid { stroke: #7d838b; stroke-width: .6; transition: transform .9s cubic-bezier(.3,1.25,.5,1); }
    .fr { transform-origin: 86px 46.5px; }
    .tr { transform-origin: 221.5px 42.5px; }
    .f-open .fr { transform: rotate(24deg); }
    .t-open .tr { transform: rotate(-52deg); }
    .cav { fill: #050505; opacity: 0; transition: opacity .4s; }
    .f-open .cav.f, .t-open .cav.t { opacity: 1; }
    .lab { position: absolute; top: 18px; width: 64px; border: 0; padding: 6px 4px; border-radius: 8px; background: transparent; color: #fff; font: inherit; text-align: center; cursor: pointer; transition: background .15s, transform .1s; }
    .lab span { display: block; color: #9a9a9a; font-size: 11px; }
    .lab b { font-weight: 600; }
    .lab:hover { background: rgba(255,255,255,.07); }
    .lab:active { transform: scale(.95); }
    .lab:focus-visible { outline: 2px solid #3e6ae1; outline-offset: 1px; }
    .lab.f { left: 22px; }
    .lab.t { right: 14px; }
    .lab[aria-pressed="true"] span { color: #3e6ae1; }
  `,
  html: `
    <div class="stage">
      <button class="lab f" type="button" aria-pressed="false"><span>Open</span><b>Frunk</b></button>
      <button class="lab t" type="button" aria-pressed="false"><span>Open</span><b>Trunk</b></button>
      <svg viewBox="0 0 260 110" aria-hidden="true">
        <defs>
          <linearGradient id="au-ft-paint" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f7f8"/><stop offset=".45" stop-color="#dfe2e6"/><stop offset=".72" stop-color="#b5bac1"/><stop offset="1" stop-color="#6f757d"/></linearGradient>
          <linearGradient id="au-ft-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a414b"/><stop offset=".5" stop-color="#14171c"/><stop offset="1" stop-color="#0b0d10"/></linearGradient>
          <radialGradient id="au-ft-rim"><stop offset="0" stop-color="#7d838b"/><stop offset="1" stop-color="#3b3f45"/></radialGradient>
        </defs>
        <ellipse class="shadow" cx="130" cy="96" rx="124" ry="5.5"/>
        <path class="cav f" d="M18 61.5C40 56.5 62 51.5 86 48.3L86.5 53C63 56 41 60.5 21 65Z"/>
        <path class="cav t" d="M222 45.5C236 48.5 243.5 53.5 245 60L239 60C237 55 231 51 222 48.8Z"/>
        <path class="body" fill="url(#au-ft-paint)" d="M10 70C9 64.5 11 61.2 16 59.6C40 54 62 49 86 46C100 37 116 27.5 130 24.2C150 21 170 22 190 28C208 33 222 40 232 44L238 44.5C245 46 249 50 249.5 56L249.2 72C249 80 246 85 240 86L219.1 86A21.5 21.5 0 0 0 178.9 86L74.1 86A21.5 21.5 0 0 0 31.9 86L18 86C12 86 10 80 10 70Z"/>
        <path d="M74.1 86A21.5 21.5 0 0 0 31.9 86M219.1 86A21.5 21.5 0 0 0 178.9 86" fill="none" stroke="#2a2d31" stroke-width="2.2"/>
        <path d="M76 85.5H177" stroke="#3a3e44" stroke-width="2.4"/>
        <path d="M28 66.5C80 63.2 180 62 246 59.6" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".8"/>
        <path class="glass" fill="url(#au-ft-glass)" d="M97 45.2C109 36.2 120 30.2 131 27.6C150 25 170 25.6 188 30.2C202 34 213 39 220.5 43.6C188 44.8 130 45.4 97 45.2Z"/>
        <path d="M150.5 26.2 153.5 26.1 153.2 45.2 150.4 45.2Z" fill="#0b0d10"/>
        <path d="M96.8 46.2 95 66C94.4 70 91 73.5 86.5 75M150.6 46 150.6 84M196 44.6C197.5 54 195 60 189.5 64" fill="none" stroke="#8f959d" stroke-width=".7"/>
        <rect x="129" y="51.4" width="10" height="2.2" rx="1.1" fill="#9aa0a8"/><rect x="180" y="50.8" width="10" height="2.2" rx="1.1" fill="#9aa0a8"/>
        <path d="M100 45.6 93.6 44.4Q90.4 44.2 90.6 47.4L91.4 50Q92.4 51.8 95.2 51L100.6 49Z" fill="url(#au-ft-paint)" stroke="#8f959d" stroke-width=".5"/>
        <path d="M14.5 61.2C24 58.6 34 57.1 44 56.2L43.2 58.6C33.2 59.6 24 61.2 15.4 63.6Z" fill="#1d2127" stroke="#fff" stroke-opacity=".8" stroke-width=".5"/>
        <path d="M12 76.5H22" stroke="#2a2d31" stroke-width="1.6" stroke-linecap="round"/>
        <path class="lid fr" fill="url(#au-ft-paint)" d="M16 59.6C40 54 62 49 86 46L86.4 48.4C62.5 51.4 40.5 56.4 17.2 62Z"/>
        <path class="lid tr" fill="url(#au-ft-paint)" d="M221.4 42.4C226 43.4 229.5 44 232 44L238 44.5C245 46 249 50 249.5 56L249.4 60.4 245.2 60.4C243.8 54.2 236.6 49.2 222.2 45.4Z"/>
        <path class="lid tr" d="M236 50.4 249.3 55.4 249.3 58.6 237.2 53.2Z" fill="#c8102e" stroke="none"/>
        <g transform="translate(53 78.5)"><circle r="17.5" fill="#0c0c0d"/><circle r="12.6" fill="url(#au-ft-rim)" stroke="#a3a9b0" stroke-width=".8"/><g stroke="#1b1d20" stroke-width="2.2" stroke-linecap="round"><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(0)"/><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(72)"/><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(144)"/><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(216)"/><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(288)"/></g><circle r="3.2" fill="#2b2e33"/></g>
        <g transform="translate(199 78.5)"><circle r="17.5" fill="#0c0c0d"/><circle r="12.6" fill="url(#au-ft-rim)" stroke="#a3a9b0" stroke-width=".8"/><g stroke="#1b1d20" stroke-width="2.2" stroke-linecap="round"><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(0)"/><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(72)"/><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(144)"/><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(216)"/><path d="M0 -3.2 1.6 -11.4M0 -3.2 -1.6 -11.4" transform="rotate(288)"/></g><circle r="3.2" fill="#2b2e33"/></g>
      </svg>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage');
    root.querySelectorAll('.lab').forEach((b) => b.addEventListener('click', () => {
      const k = b.classList.contains('f') ? 'f-open' : 't-open';
      const on = !stage.classList.contains(k);
      stage.classList.toggle(k, on);
      b.setAttribute('aria-pressed', String(on));
      b.querySelector('span').textContent = on ? 'Close' : 'Open';
    }));
  },
};
