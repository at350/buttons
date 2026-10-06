// UIActivityIndicatorView, iOS 13+ ".medium" style: 8 rounded spokes in systemGray #8e8e93 with a falling opacity
// ramp; the whole glyph advances one spoke at a time (steps(8), one turn per second) exactly like the system
// indicator, rather than fading each spoke smoothly. Click stops / starts it (stopAnimating freezes on a frame).
const spokes = () => Array.from({ length: 8 }, (_, i) =>
  '<rect x="10.85" y="1.6" width="2.3" height="6.4" rx="1.15" opacity="' + (1 - i * 0.11).toFixed(2) + '" transform="rotate(' + (-i * 45) + ' 12 12)"/>').join('');
export default {
  id: 'in-ios-spinner',
  credit: 'Apple UIActivityIndicatorView (iOS 13+, medium) — 8 gray spokes stepping round once a second; click to stop / start',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sp { width: 52px; height: 52px; border: 0; border-radius: 12px; background: none; padding: 0; cursor: pointer; display: grid; place-items: center; transition: background-color .15s; -webkit-tap-highlight-color: transparent; }
    .sp:hover { background: rgba(120,120,128,.12); }
    .sp:active { background: rgba(120,120,128,.2); }
    .sp:focus-visible { outline: 3px solid rgba(0,122,255,.5); outline-offset: 2px; }
    svg { width: 30px; height: 30px; fill: #8e8e93; animation: turn 1s steps(8) infinite; }
    .sp[aria-pressed="false"] svg { animation-play-state: paused; }
    @keyframes turn { to { transform: rotate(360deg); } }
  `,
  html: `<button class="sp" type="button" aria-pressed="true" aria-label="Loading"><svg viewBox="0 0 24 24">${spokes()}</svg></button>`,
  init(root) {
    const b = root.querySelector('.sp');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
