function spokes() {
  let s = '';
  for (let i = 0; i < 12; i++) s += '<rect x="11" y="1" width="2" height="6" rx="1" transform="rotate(' + i * 30 + ' 12 12)" style="animation-delay:' + (-(11 - i) / 12).toFixed(3) + 's"/>';
  return s;
}

export default {
  id: 'in-ios-spinner',
  credit: 'Apple iOS / macOS activity indicator — 12 fading spokes; click to pause and resume',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sp { width: 48px; height: 48px; border: 0; border-radius: 12px; background: none; padding: 0; cursor: pointer; display: grid; place-items: center; transition: background .15s; -webkit-tap-highlight-color: transparent; }
    .sp:hover { background: rgba(0,0,0,.05); }
    .sp:focus-visible { outline: 2px solid #8e8e93; outline-offset: 2px; }
    svg { width: 28px; height: 28px; }
    rect { fill: #8e8e93; animation: fade 1s linear infinite; }
    .sp[aria-pressed="false"] rect { animation-play-state: paused; }
    @keyframes fade { 0% { opacity: 1; } 100% { opacity: .15; } }
  `,
  html: `<button class="sp" type="button" aria-pressed="true" aria-label="Loading"><svg viewBox="0 0 24 24">${spokes()}</svg></button>`,
  init(root) {
    const b = root.querySelector('.sp');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
