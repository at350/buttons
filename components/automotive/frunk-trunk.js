export default {
  id: 'au-frunk-trunk',
  credit: 'Tesla car screen — "Open Frunk" / "Open Trunk" labels on the car render; tap and the lid swings up on the silhouette (Close to bring the power liftgate down)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; max-width: 100%; height: 170px; border-radius: 12px; overflow: hidden; background: radial-gradient(ellipse at 50% 85%, #26282b, #0d0e0f 70%); font: 500 12px/1.15 Inter, -apple-system, system-ui, sans-serif; color: #fff; user-select: none; }
    svg { position: absolute; left: 20px; bottom: 16px; width: 260px; height: 110px; }
    .shadow { fill: rgba(0,0,0,.6); filter: blur(4px); }
    .body { stroke: #5d6168; stroke-width: .8; }
    .glass { fill: #15181c; stroke: #2b2f35; stroke-width: .8; }
    .lid { fill: #a9aeb5; stroke: #5d6168; stroke-width: .8; transition: transform .9s cubic-bezier(.3,1.25,.5,1); }
    .fr { transform-origin: 100px 51px; }
    .tr { transform-origin: 214px 49px; }
    .f-open .fr { transform: rotate(32deg); }
    .t-open .tr { transform: rotate(-48deg); }
    .cav { fill: #050505; opacity: 0; transition: opacity .4s; }
    .f-open .cav.f, .t-open .cav.t { opacity: 1; }
    .tire { fill: #0b0b0b; }
    .rim { fill: #3a3d42; stroke: #8b9097; stroke-width: 1.5; }
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
        <defs><linearGradient id="au-ft-paint" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6d9de"/><stop offset=".55" stop-color="#9ea3aa"/><stop offset="1" stop-color="#5f646b"/></linearGradient></defs>
        <ellipse class="shadow" cx="132" cy="94" rx="122" ry="7"/>
        <path class="cav f" d="M28 61 100 53 100 57 30 64z"/>
        <path class="cav t" d="M214 49 246 53 246 57 214 53z"/>
        <path class="body" fill="url(#au-ft-paint)" d="M10 76Q8 64 28 61L100 53 128 31Q132 28 140 28H182Q188 28 192 32L214 49 246 53Q254 58 251 76Q250 84 240 84H22Q11 84 10 76Z"/>
        <path class="glass" d="M106 51 130 33Q133 31 139 31H180Q185 31 189 34L207 49Z"/>
        <path class="lid fr" d="M26 59Q30 57 36 57L100 50 101 53 30 61Z"/>
        <path class="lid tr" d="M214 47 244 51Q249 52 249 55L246 55 214 51Z"/>
        <circle class="tire" cx="58" cy="80" r="15"/><circle class="rim" cx="58" cy="80" r="9"/>
        <circle class="tire" cx="208" cy="80" r="15"/><circle class="rim" cx="208" cy="80" r="9"/>
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
