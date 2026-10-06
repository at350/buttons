export default {
  id: 'dp-bento-lift',
  credit: 'Bento grid with depth — the hovered tile rises on translateZ while the whole board tilts toward it (Linear / Vercel bento hover)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 30px 40px;
      perspective: 900px;
      background: #0a0a0a;
      border-radius: 12px;
    }
    .board {
      --tx: 0;
      --ty: 0;
      display: grid;
      grid-template-columns: repeat(3, 68px);
      gap: 10px;
      transform-style: preserve-3d;
      transform: rotateX(calc(var(--ty) * -6deg)) rotateY(calc(var(--tx) * 6deg));
      transition: transform .5s cubic-bezier(.3, 1, .4, 1);
    }
    .tile {
      position: relative;
      height: 68px;
      border-radius: 14px;
      border: 0;
      cursor: pointer;
      padding: 0;
      color: #e5e5e5;
      background: linear-gradient(160deg, #1c1c1e, #111);
      display: grid;
      place-items: center;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08), 0 0 0 rgba(0, 0, 0, 0);
      transform: translateZ(0);
      transition: transform .35s cubic-bezier(.3, 1.4, .4, 1), box-shadow .35s, background .3s;
    }
    .tile::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, .14), transparent 55%);
      pointer-events: none;
    }
    .tile:hover {
      transform: translateZ(34px) scale(1.04);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .22), 0 24px 40px rgba(0, 0, 0, .7);
      background: linear-gradient(160deg, #2a2a2e, #161618);
      z-index: 1;
    }
    .tile:active { transform: translateZ(10px) scale(.98); transition-duration: .08s; }
    .tile[aria-pressed="true"] {
      background: linear-gradient(160deg, #7c3aed, #4c1d95);
      color: #fff;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .3), 0 10px 30px rgba(124, 58, 237, .45);
    }
    .tile svg { width: 24px; height: 24px; }
    .tile:focus-visible { outline: 2px solid #a78bfa; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="board" role="group">
        <button class="tile" type="button" aria-pressed="false" aria-label="Home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9H3z"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Calendar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Music"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const board = root.querySelector('.board'), tiles = [...root.querySelectorAll('.tile')];
    tiles.forEach((t, i) => {
      t.addEventListener('pointerenter', () => { board.style.setProperty('--tx', (i % 3) - 1); board.style.setProperty('--ty', Math.floor(i / 3) - .5); });
      t.addEventListener('click', () => t.setAttribute('aria-pressed', String(t.getAttribute('aria-pressed') !== 'true')));
    });
    board.addEventListener('pointerleave', () => { board.style.setProperty('--tx', 0); board.style.setProperty('--ty', 0); });
  },
};
