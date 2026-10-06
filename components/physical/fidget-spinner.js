// Tri-bar fidget spinner: anodised aluminium body, a 608 ball bearing in every lobe (outer race,
// seven balls, inner race) and a centre cap. Flick it (click) and it coasts down on the centre bearing.
const C = 66;
const LOBES = [[66, 22], [104.1, 88], [27.9, 88]];
const bearing = ([x, y], r = 15) => {
  const balls = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2;
    return `<circle class="ball" cx="${(x + r * 0.63 * Math.cos(a)).toFixed(2)}" cy="${(y + r * 0.63 * Math.sin(a)).toFixed(2)}" r="${(r * 0.2).toFixed(2)}"/>`;
  }).join('');
  return `<circle class="race" cx="${x}" cy="${y}" r="${r}"/><circle class="cage" cx="${x}" cy="${y}" r="${(r * 0.8).toFixed(2)}"/>${balls}<circle class="inner" cx="${x}" cy="${y}" r="${(r * 0.42).toFixed(2)}"/><circle class="bore" cx="${x}" cy="${y}" r="${(r * 0.24).toFixed(2)}"/>`;
};
const BODY = (() => {
  // three lobes joined by concave waists: union of lobe circles + centre disc + arm bars
  const arms = LOBES.map(([x, y]) => `<line x1="${C}" y1="${C}" x2="${x}" y2="${y}"/>`).join('');
  const lobes = LOBES.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="21"/>`).join('');
  return `<g class="body">${arms}${lobes}<circle cx="${C}" cy="${C}" r="27"/></g>`;
})();

export default {
  id: 'ph-fidget-spinner',
  credit: 'Tri-bar fidget spinner with 608 bearings — flick it (click) and it coasts down on its centre bearing',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; background: radial-gradient(circle at 50% 40%, #f1eee8, #d9d4ca); }
    .wrap { position: relative; width: 132px; height: 132px; }
    .shadow { position: absolute; inset: 8px; border-radius: 50%; background: radial-gradient(circle, rgba(60,40,20,.28), rgba(60,40,20,0) 68%); transform: translate(3px, 6px); }
    .spin { position: absolute; inset: 0; border: 0; padding: 0; background: transparent; cursor: pointer; border-radius: 50%; overflow: hidden; -webkit-tap-highlight-color: transparent; }
    .spin:focus-visible { outline: 2px solid #1d4ed8; outline-offset: 2px; }
    .rotor { display: block; width: 100%; height: 100%; transform: rotate(0deg); transition: transform 3.2s cubic-bezier(.12,.62,.22,1); }
    .rotor.go { animation: blur 3.2s cubic-bezier(.12,.62,.22,1); }
    @keyframes blur { 0%, 25% { filter: blur(1.4px); } 100% { filter: none; } }
    .body { fill: url(#fs-anod); }
    .body line { stroke: url(#fs-anod); stroke-width: 22; stroke-linecap: round; }
    .race { fill: url(#fs-steel); stroke: #5d6168; stroke-width: .8; }
    .cage { fill: #2a2c30; }
    .ball { fill: url(#fs-ball); }
    .inner { fill: url(#fs-steel); stroke: #6a6e75; stroke-width: .6; }
    .bore { fill: #16171a; }
    .hl { fill: none; stroke: rgba(255,255,255,.35); stroke-width: 1.2; }
    .cap { position: absolute; left: 50%; top: 50%; width: 34px; height: 34px; margin: -17px; border-radius: 50%; pointer-events: none;
      background: repeating-radial-gradient(circle, rgba(255,255,255,.12) 0 .6px, rgba(0,0,0,.05) .6px 1.2px), conic-gradient(from 200deg, #8c9096, #f4f5f6 15%, #a6aaaf 33%, #eceeef 52%, #888c91 70%, #e6e8ea 86%, #8c9096);
      box-shadow: 0 2px 3px rgba(0,0,0,.45), inset 0 0 0 1px rgba(0,0,0,.25), inset 0 1px 1px #fff; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <span class="shadow"></span>
        <button class="spin" type="button" aria-label="Spin the fidget spinner">
          <svg class="rotor" viewBox="0 0 132 132" aria-hidden="true">
            <defs>
              <linearGradient id="fs-anod" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f05a47"/><stop offset=".45" stop-color="#c8231a"/><stop offset=".7" stop-color="#e2402f"/><stop offset="1" stop-color="#8f130c"/></linearGradient>
              <radialGradient id="fs-steel" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#c3c7cc"/><stop offset="1" stop-color="#7d828a"/></radialGradient>
              <radialGradient id="fs-ball" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#b8bdc3"/><stop offset="1" stop-color="#4c5057"/></radialGradient>
            </defs>
            ${BODY}
            <circle class="hl" cx="66" cy="66" r="25"/>
            ${LOBES.map((p) => bearing(p)).join('')}
          </svg>
        </button>
        <span class="cap"></span>
      </div>
    </div>`,
  init(root) {
    const s = root.querySelector('.spin'), rotor = root.querySelector('.rotor');
    let rot = 0;
    s.addEventListener('click', () => {
      rot += 1080 + Math.round(Math.random() * 720);
      rotor.classList.remove('go'); void rotor.offsetWidth; rotor.classList.add('go');
      rotor.style.transform = `rotate(${rot}deg)`;
    });
    rotor.addEventListener('animationend', () => rotor.classList.remove('go'));
  },
};
