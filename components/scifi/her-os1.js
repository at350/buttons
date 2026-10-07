// Her (2013) — OS1: the warm coral screen with the white looping figure; tap to wake Samantha and the loop becomes her voice line.
// The figure is a single stroked lemniscate that draws around itself while it turns in 3D, like the OS1 install loader.
const LOOP = (() => {
  const pts = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * Math.PI * 2, d = 1 + Math.sin(t) ** 2;
    pts.push(`${(23 + (18 * Math.sin(t) * Math.cos(t)) / d).toFixed(2)} ${(46 + (40 * Math.cos(t)) / d).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
})();
const sine = (n, w, a) => `M0 30${Array.from({ length: n }, () => `q${w / 4} -${a} ${w / 2} 0t${w / 2} 0`).join('')}`;
export default {
  id: 'sf-her-os1',
  credit: 'Her (2013) — OS1 by Element Software (Geoff McFetridge / Spike Jonze): warm coral screen and white looping figure; tap to wake Samantha and it unspools into her oscillating voice line — move the pointer and she answers louder, tap again to let her rest',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 220px; height: 220px; max-width: 100%; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 50% 40%, #ea6a50, #d9503a 60%, #c4432f); }
    .os { --amp: .5; position: relative; display: block; width: 100%; height: 100%; border: 0; padding: 0; background: none; cursor: pointer; color: #fff; }
    .os:focus-visible { outline: 2px solid #fff; outline-offset: -8px; border-radius: 12px; }
    .loop { position: absolute; left: 50%; top: 50%; width: 46px; height: 92px; margin: -50px -23px; animation: sp 4.2s cubic-bezier(.6,0,.4,1) infinite; transition: opacity .45s, transform .45s; }
    .loop svg { width: 100%; height: 100%; overflow: visible; }
    /* the 3D turn (transform) runs on the compositor all the time; the gap travelling round the figure (stroke-dashoffset inside an <svg>
       whose wrapper also turns) cost a style + layout pass every frame, so it travels while she is being looked at (hover / focus)
       and holds where it stopped otherwise */
    .loop path { fill: none; stroke: #fff; stroke-width: 2.6; stroke-linecap: round; stroke-dasharray: 150 60; animation: dr 2.1s linear infinite paused; }
    .loop path + path { stroke-width: 1; opacity: .35; stroke-dasharray: none; animation: none; }
    .os:hover .loop path, .os:focus-visible .loop path { animation-play-state: running; }
    .os:hover .loop { animation-duration: 2.4s; }
    .os:hover .loop path { animation-duration: 1.2s; }
    @keyframes sp { from { transform: perspective(260px) rotateY(0) rotateZ(-10deg); } to { transform: perspective(260px) rotateY(360deg) rotateZ(-10deg); } }
    @keyframes dr { to { stroke-dashoffset: -210; } }
    /* the voice line is display: none until she is awake (its <g> scaleY is a main-thread SVG animation); exit kept by allow-discrete */
    .wave { position: absolute; left: 18px; right: 18px; top: 50%; height: 64px; margin-top: -36px; overflow: hidden; display: none; opacity: 0; transition: opacity .5s .15s, display .65s allow-discrete;
      mask-image: linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent); }
    .wave .sc { position: absolute; left: 0; top: 2px; width: 100%; height: 60px; transform: scaleY(var(--amp)); transition: transform .35s cubic-bezier(.3,1.4,.5,1); }
    .wave svg { position: absolute; left: 0; top: 0; width: 360px; height: 60px; animation: tx 1.6s linear infinite; }
    .wave svg + svg { animation-duration: 2.7s; animation-direction: reverse; }
    .wave g { transform-origin: 0 30px; animation: amp 2.3s ease-in-out infinite alternate; }
    .wave path { fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; }
    .wave svg + svg path { opacity: .4; stroke-width: 1.2; }
    @keyframes tx { to { transform: translateX(-60px); } }
    @keyframes amp { 0% { transform: scaleY(.18); } 40% { transform: scaleY(.9); } 70% { transform: scaleY(.38); } 100% { transform: scaleY(1); } }
    .os[aria-pressed="true"] .loop { opacity: 0; transform: scale(.4); animation-play-state: paused; }
    .os[aria-pressed="true"] .loop path { animation-play-state: paused; }
    .os[aria-pressed="true"] .wave { display: block; opacity: 1; }
    @starting-style { .os[aria-pressed="true"] .wave { opacity: 0; } }
    .os.boot .loop { animation-duration: .9s; }
    .lab { position: absolute; left: 0; right: 0; bottom: 18px; font: 300 12px 'DM Sans', system-ui, sans-serif; letter-spacing: .3em; opacity: .9; transition: opacity .4s; }
    .lab sup { font-size: 8px; letter-spacing: 0; }
    .os[aria-pressed="true"] .lab { opacity: .45; }
  `,
  html: `<div class="stage"><button class="os" type="button" aria-pressed="false" aria-label="OS1">
    <span class="loop"><svg viewBox="0 0 46 92"><path d="${LOOP}"/><path d="${LOOP}"/></svg></span>
    <span class="wave"><span class="sc"><svg viewBox="0 0 360 60"><g><path d="${sine(6, 60, 22)}"/></g></svg><svg viewBox="0 0 360 60"><g><path d="${sine(12, 30, 14)}"/></g></svg></span></span>
    <span class="lab">OS<sup>1</sup></span></button></div>`,
  init(root) {
    const os = root.querySelector('.os');
    let to = 0;
    os.addEventListener('click', () => {
      clearTimeout(to);
      if (os.getAttribute('aria-pressed') === 'true') { os.setAttribute('aria-pressed', 'false'); return; }
      os.classList.add('boot');
      to = setTimeout(() => { os.classList.remove('boot'); os.setAttribute('aria-pressed', 'true'); }, 450);
    });
    os.addEventListener('pointermove', (e) => {
      const r = os.getBoundingClientRect(); if (!r.height) return;
      const d = Math.hypot(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2) / (r.width / 2);
      os.style.setProperty('--amp', Math.max(.2, 1 - d * .8).toFixed(2));
    });
    os.addEventListener('pointerleave', () => os.style.setProperty('--amp', '.5'));
    return () => clearTimeout(to);
  },
};
