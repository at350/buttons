export default {
  id: 'in-draw-check',
  credit: 'SVG checkbox — the box fills indigo and a Lucide check draws itself in with stroke-dashoffset, then settles with a small spring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cb { width: 40px; height: 40px; border: 0; background: none; padding: 0; cursor: pointer; display: grid; place-items: center; border-radius: 10px; -webkit-tap-highlight-color: transparent; }
    .cb:focus-visible { outline: 3px solid #4f46e5; outline-offset: 2px; }
    svg { width: 30px; height: 30px; overflow: visible; }
    rect { fill: #fff; stroke: #a1a1aa; stroke-width: 2; transition: fill .2s, stroke .2s; }
    .cb:hover rect { stroke: #4f46e5; }
    path { fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 23; stroke-dashoffset: 23; transition: stroke-dashoffset .25s ease-out; }
    .cb[aria-checked="true"] rect { fill: #4f46e5; stroke: #4f46e5; }
    .cb[aria-checked="true"] path { stroke-dashoffset: 0; transition-delay: .1s; }
    .cb[aria-checked="true"] svg { animation: bounce .35s cubic-bezier(.34,1.56,.64,1); }
    @keyframes bounce { 0% { transform: scale(.85); } 100% { transform: scale(1); } }
  `,
  html: `<button class="cb" type="button" role="checkbox" aria-checked="false" aria-label="Remember me">
    <svg viewBox="0 0 30 30"><rect x="1" y="1" width="28" height="28" rx="8"/><path transform="translate(3 3)" d="M20 6 9 17l-5-5"/></svg>
  </button>`,
  init(root) {
    const b = root.querySelector('.cb');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
