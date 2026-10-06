export default {
  id: 'ty-wavy-toggle',
  credit: 'Wavy text switch — the label rides an SVG textPath; clicking morphs the path from a flat line into a wave with SMIL, and it keeps swelling while on (Pentagram-ish playful nav)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer;
      background: #fff;
      border: 2px solid #111;
      border-radius: 999px;
      padding: 6px 14px;
      color: #111;
      width: 236px;
      height: 72px;
      display: grid;
      place-items: center;
      transition: background .3s, color .3s;
    }
    .btn:hover { background: #fef08a; }
    .btn.on {
      background: #111;
      color: #fef08a;
      border-color: #111;
    }
    .btn:active svg { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      transition: transform .15s;
    }
    text {
      font: 800 15px Syne, 'Space Grotesk', system-ui, sans-serif;
      fill: currentColor;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Make waves"><svg viewBox="0 0 208 56" aria-hidden="true"><path id="ty-wv-p" fill="none" d="M4 34 C 30 34, 60 34, 104 34 S 180 34, 204 34"><animate class="to-wave" attributeName="d" dur=".5s" fill="freeze" begin="indefinite" calcMode="spline" keySplines=".34 1.56 .64 1" to="M4 36 C 30 6, 60 62, 104 34 S 180 6, 204 36"/><animate class="to-flat" attributeName="d" dur=".4s" fill="freeze" begin="indefinite" calcMode="spline" keySplines=".2 .8 .2 1" to="M4 34 C 30 34, 60 34, 104 34 S 180 34, 204 34"/><animate class="swell" attributeName="d" dur="2.4s" begin="indefinite" repeatCount="indefinite" values="M4 36 C 30 6, 60 62, 104 34 S 180 6, 204 36;M4 32 C 30 58, 60 10, 104 34 S 180 60, 204 32;M4 36 C 30 6, 60 62, 104 34 S 180 6, 204 36"/></path><text textLength="196" lengthAdjust="spacing"><textPath href="#ty-wv-p" startOffset="2">Make waves</textPath></text></svg></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    const toWave = root.querySelector('.to-wave');
    const toFlat = root.querySelector('.to-flat');
    const swell = root.querySelector('.swell');
    let t = 0;
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
      clearTimeout(t);
      if (on) {
        toWave.beginElement();
        t = setTimeout(() => swell.beginElement(), 500);
      } else {
        swell.endElement();
        toFlat.beginElement();
      }
    });
    return () => clearTimeout(t);
  },
};
