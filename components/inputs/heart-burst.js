export default {
  id: 'in-heart-burst',
  credit: 'Twitter / X like button — heart pops with a ring and a burst of confetti dots (CSS only)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .h { position: relative; width: 48px; height: 48px; border: 0; border-radius: 50%; background: none; padding: 0; cursor: pointer; display: grid; place-items: center; color: #536471; transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; }
    .h:hover { background: rgba(249,24,128,.1); color: #f91880; }
    .h:focus-visible { outline: 2px solid #f91880; outline-offset: 1px; }
    .h svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; position: relative; z-index: 1; }
    .h[aria-pressed="true"] { color: #f91880; }
    .h[aria-pressed="true"] svg { fill: currentColor; animation: pop .5s cubic-bezier(.34,1.56,.64,1); }
    @keyframes pop { 0% { transform: scale(0); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
    .ring { position: absolute; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #f91880; opacity: 0; transform: scale(.4); }
    .h[aria-pressed="true"] .ring { animation: ring .55s ease-out; }
    @keyframes ring { 0% { opacity: 1; transform: scale(.4); border-width: 10px; } 70% { opacity: .5; } 100% { opacity: 0; transform: scale(1.9); border-width: 0; } }
    .dots { position: absolute; left: 50%; top: 50%; width: 5px; height: 5px; margin: -2.5px 0 0 -2.5px; border-radius: 50%; opacity: 0; }
    .dots::before, .dots::after { content: ''; position: absolute; inset: 0; border-radius: 50%; }
    .dots::before { box-shadow: 0 -20px 0 #ff6b6b, 14px -14px 0 #ffd93d, 20px 0 0 #6bcB77, 14px 14px 0 #4d96ff, 0 20px 0 #f91880, -14px 14px 0 #ffd93d, -20px 0 0 #4d96ff, -14px -14px 0 #6bcB77; }
    .dots::after { transform: rotate(22deg); box-shadow: 0 -16px 0 #f91880, 11px -11px 0 #6bcB77, 16px 0 0 #ffd93d, 11px 11px 0 #ff6b6b, 0 16px 0 #4d96ff, -11px 11px 0 #f91880, -16px 0 0 #ff6b6b, -11px -11px 0 #ffd93d; }
    .h[aria-pressed="true"] .dots { animation: burst .7s ease-out; }
    @keyframes burst { 0% { opacity: 1; transform: scale(.2); } 60% { opacity: 1; } 100% { opacity: 0; transform: scale(1.5); } }
  `,
  html: `<button class="h" type="button" aria-pressed="false" aria-label="Like">
    <span class="ring"></span><span class="dots"></span>
    <svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.9c0 5.4-7.5 10-7.5 10z"/></svg>
  </button>`,
  init(root) {
    const b = root.querySelector('.h');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
