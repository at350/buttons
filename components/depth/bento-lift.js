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
        <button class="tile" type="button" aria-pressed="false" aria-label="Home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Calendar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Music"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></button>
        <button class="tile" type="button" aria-pressed="false" aria-label="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg></button>
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
