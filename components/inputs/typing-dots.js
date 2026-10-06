// iMessage typing indicator (iOS): incoming-gray #e9e9eb bubble with the "thought" tail — a round blob and a
// smaller dot trailing off the bottom-left — and three #8e8e93 dots that brighten in turn (opacity + a slight swell,
// 1.4s cycle, 0.2s stagger) while the bubble breathes. Animates on hover; click pins it on.
export default {
  id: 'in-typing-dots',
  credit: 'Apple iMessage typing indicator — gray bubble with thought-bubble tail, three dots darken in turn while it breathes',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .w { display: inline-block; padding: 6px 8px 10px 14px; }
    .bub {
      position: relative; display: inline-flex; gap: 5px; align-items: center; padding: 13px 15px; border-radius: 20px; background: #e9e9eb; border: 0; cursor: pointer;
      -webkit-tap-highlight-color: transparent; transform-origin: 0 100%;
    }
    .bub:focus-visible { outline: 3px solid rgba(0,122,255,.5); outline-offset: 3px; }
    .bub::before { content: ''; position: absolute; left: -3px; bottom: -3px; width: 14px; height: 14px; border-radius: 50%; background: #e9e9eb; }
    .bub::after { content: ''; position: absolute; left: -9px; bottom: -9px; width: 7px; height: 7px; border-radius: 50%; background: #e9e9eb; }
    .d { position: relative; width: 9px; height: 9px; border-radius: 50%; background: #8e8e93; opacity: .45; }
    .bub:hover, .bub[aria-pressed="true"] { animation: breathe 1.4s ease-in-out infinite; }
    .bub:hover .d, .bub[aria-pressed="true"] .d { animation: dot 1.4s ease-in-out infinite; }
    .d:nth-child(2) { animation-delay: .2s !important; } .d:nth-child(3) { animation-delay: .4s !important; }
    @keyframes dot { 0%, 60%, 100% { opacity: .45; transform: scale(1); } 30% { opacity: 1; transform: scale(1.12); } }
    @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  `,
  html: `<div class="w"><button class="bub" type="button" aria-pressed="false" aria-label="Typing indicator"><span class="d"></span><span class="d"></span><span class="d"></span></button></div>`,
  init(root) {
    const b = root.querySelector('.bub');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
