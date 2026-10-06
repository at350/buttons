export default {
  id: 'in-typing-dots',
  credit: 'iMessage typing indicator — three dots bounce inside a chat bubble while hovered; click to keep it going',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .bub {
      position: relative; display: inline-flex; gap: 5px; align-items: center; padding: 12px 14px; border-radius: 18px; background: #e9e9eb; border: 0; cursor: pointer;
      -webkit-tap-highlight-color: transparent; transition: background .15s;
    }
    .bub:hover, .bub[aria-pressed="true"] { background: #e2e2e4; }
    .bub:focus-visible { outline: 2px solid #0a84ff; outline-offset: 2px; }
    .bub::before { content: ''; position: absolute; left: -2px; bottom: 0; width: 12px; height: 12px; border-radius: 50%; background: inherit; }
    .bub::after { content: ''; position: absolute; left: -8px; bottom: -3px; width: 7px; height: 7px; border-radius: 50%; background: inherit; }
    .d { width: 8px; height: 8px; border-radius: 50%; background: #8e8e93; }
    .bub:hover .d, .bub[aria-pressed="true"] .d { animation: bounce 1.2s ease-in-out infinite; }
    .d:nth-child(2) { animation-delay: .15s; } .d:nth-child(3) { animation-delay: .3s; }
    @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); opacity: .6; } 30% { transform: translateY(-5px); opacity: 1; } }
  `,
  html: `<button class="bub" type="button" aria-pressed="false" aria-label="Typing"><span class="d"></span><span class="d"></span><span class="d"></span></button>`,
  init(root) {
    const b = root.querySelector('.bub');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
