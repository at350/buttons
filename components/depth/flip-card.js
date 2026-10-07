export default {
  id: 'dp-flip-card',
  credit: '3D flip card — a memory-game tile: preserve-3d front / back with backface-visibility, flips on click with a springy overshoot to reveal its photo',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 40px; perspective: 900px; }
    .card {
      position: relative;
      width: 190px;
      height: 118px;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: rotateY(0deg);
      transition: transform .8s cubic-bezier(.34, 1.3, .5, 1);
    }
    .card[aria-pressed="true"] { transform: rotateY(180deg); }
    .card:hover { transform: rotateY(-12deg) translateZ(10px); }
    .card[aria-pressed="true"]:hover { transform: rotateY(192deg) translateZ(10px); }
    .face {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      display: grid;
      place-items: center;
      gap: 6px;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      font: 600 15px/1 'DM Sans', system-ui, sans-serif;
      letter-spacing: .02em;
      box-shadow: 0 12px 22px -6px rgba(0, 0, 0, .35);
    }
    .front { background: linear-gradient(145deg, #111827, #374151); color: #fff; }
    .front::before {
      content: ''; position: absolute; inset: 7px; border-radius: 11px; pointer-events: none;
      border: 1px solid rgba(255, 255, 255, .14);
      background: repeating-linear-gradient(45deg, rgba(255, 255, 255, .045) 0 6px, transparent 6px 12px);
    }
    .back {
      background: #1e293b url(assets/wide/02.webp) 50% 40% / cover no-repeat;
      transform: rotateY(180deg);
      overflow: hidden;
    }
    .face::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 16px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35);
      pointer-events: none;
    }
    .front svg { width: 36px; height: 36px; }
    .card:focus-visible { outline: 0; }
    .card:focus-visible .face { box-shadow: 0 12px 22px -6px rgba(0, 0, 0, .35), 0 0 0 3px #f59e0b; }
  `,
  html: `
    <div class="stage">
      <button class="card" type="button" aria-pressed="false" aria-label="Reveal tile">
        <span class="face front">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
          <span>Reveal</span>
        </span>
        <span class="face back" aria-hidden="true"></span>
      </button>
    </div>`,
  init(root) {
    const c = root.querySelector('.card');
    c.addEventListener('click', () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')));
  },
};
