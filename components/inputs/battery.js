export default {
  id: 'in-battery',
  credit: 'Segmented battery indicator — click to drain a cell, it turns amber then red, and recharges from empty (with a bolt)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .b { position: relative; display: inline-flex; align-items: center; border: 0; background: none; padding: 6px; cursor: pointer; -webkit-tap-highlight-color: transparent; border-radius: 10px; }
    .b:focus-visible { outline: 2px solid #111; outline-offset: 1px; }
    .body { display: flex; gap: 3px; padding: 3px; width: 64px; height: 30px; border: 2px solid #3a3a3c; border-radius: 7px; background: #fff; }
    .cap { width: 4px; height: 12px; margin-left: 2px; border-radius: 0 2px 2px 0; background: #3a3a3c; }
    .seg { flex: 1; border-radius: 2px; background: #34c759; transition: background .25s, transform .25s, opacity .25s; }
    .b[data-l="4"] .seg:nth-child(n+5), .b[data-l="3"] .seg:nth-child(n+4), .b[data-l="2"] .seg:nth-child(n+3), .b[data-l="1"] .seg:nth-child(n+2), .b[data-l="0"] .seg { transform: scaleY(.3); opacity: 0; }
    .b[data-l="2"] .seg { background: #ff9f0a; }
    .b[data-l="1"] .seg { background: #ff3b30; }
    .b[data-l="1"] .seg:first-child { animation: blink 1s infinite; }
    @keyframes blink { 50% { opacity: .35; } }
    .bolt { position: absolute; left: 50%; top: 50%; width: 14px; height: 14px; transform: translate(-60%, -50%) scale(0); fill: #fff; stroke: #3a3a3c; stroke-width: 1.5; stroke-linejoin: round; transition: transform .25s cubic-bezier(.34,1.56,.64,1); }
    .b.charge .bolt { transform: translate(-60%, -50%) scale(1); }
    .b:hover .body { border-color: #000; }
  `,
  html: `<button class="b" type="button" data-l="4" aria-label="Battery" aria-valuenow="100" role="meter" aria-valuemin="0" aria-valuemax="100">
    <span class="body"><span class="seg"></span><span class="seg"></span><span class="seg"></span><span class="seg"></span></span><span class="cap"></span>
    <svg class="bolt" viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>
  </button>`,
  init(root) {
    const b = root.querySelector('.b');
    let l = 4;
    b.addEventListener('click', () => {
      l = l === 0 ? 4 : l - 1;
      b.dataset.l = l; b.setAttribute('aria-valuenow', l * 25); b.classList.toggle('charge', l === 4);
    });
  },
};
