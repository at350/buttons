export default {
  id: 'ty-letter-grid',
  credit: 'A–Z letter keys — a JetBrains Mono alphabet grid where each key lifts on hover and latches down when pressed, spelling into a small readout (type-specimen glyph grids)',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { background: #18181b; border-radius: 12px; padding: 14px; display: grid; gap: 10px; }
    .out { height: 34px; border: 1px solid #3f3f46; border-radius: 6px; display: flex; align-items: center; padding: 0 10px; overflow: hidden; }
    .out span { font: 500 16px/1 'JetBrains Mono', ui-monospace, monospace; color: #e4e4e7; letter-spacing: .1em; white-space: pre; }
    .out span:empty::before { content: ''; display: inline-block; width: 0; }
    .out .cur { display: inline-block; width: 9px; height: 18px; background: #a3e635; margin-left: 3px; animation: blink 1s steps(1) infinite; }
    .grid { display: grid; grid-template-columns: repeat(13, 1fr); gap: 5px; }
    .k {
      cursor: pointer; aspect-ratio: 1; min-width: 0; border: 0; border-radius: 5px; background: #27272a; color: #d4d4d8; padding: 0;
      font: 600 14px/1 'JetBrains Mono', ui-monospace, monospace; box-shadow: 0 2px 0 #09090b;
      transition: transform .12s, box-shadow .12s, background .15s, color .15s;
    }
    .k:hover { transform: translateY(-3px); box-shadow: 0 5px 0 #09090b, 0 8px 14px -6px rgba(163, 230, 53, .4); color: #fff; }
    .k:active { transform: translateY(1px); box-shadow: 0 0 0 #09090b; }
    .k[aria-pressed=true] { background: #a3e635; color: #111; transform: translateY(1px); box-shadow: 0 0 0 #09090b; }
    .k:focus-visible { outline: 2px solid #a3e635; outline-offset: 2px; }
    @keyframes blink { 50% { opacity: 0; } }
    @media (max-width: 420px) { .grid { grid-template-columns: repeat(9, 1fr); } }
  `,
  html: `<div class="stage"><div class="out" aria-live="polite"><span class="txt"></span><i class="cur" aria-hidden="true"></i></div><div class="grid" role="group"></div></div>`,
  init(root) {
    const grid = root.querySelector('.grid');
    const txt = root.querySelector('.txt');
    const keys = [];
    for (let i = 0; i < 26; i++) {
      const k = document.createElement('button');
      k.type = 'button'; k.className = 'k'; k.textContent = String.fromCharCode(65 + i);
      k.setAttribute('aria-pressed', 'false');
      k.addEventListener('click', () => {
        const on = k.getAttribute('aria-pressed') !== 'true';
        k.setAttribute('aria-pressed', String(on));
        const s = txt.textContent;
        txt.textContent = on ? (s + k.textContent).slice(-14) : s.replace(k.textContent, '');
      });
      grid.appendChild(k); keys.push(k);
    }
  },
};
