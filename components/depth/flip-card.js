export default {
  id: 'dp-flip-card',
  credit: '3D flip card — preserve-3d front / back with backface-visibility, flips on click with a springy overshoot',
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
      box-shadow: 0 16px 36px rgba(0, 0, 0, .25);
    }
    .front { background: linear-gradient(145deg, #111827, #374151); color: #fff; }
    .back {
      background: linear-gradient(145deg, #fef3c7, #fde68a);
      color: #78350f;
      transform: rotateY(180deg);
    }
    .face::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 16px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35);
      pointer-events: none;
    }
    .back b { font: 800 34px/1 'Unbounded', system-ui, sans-serif; letter-spacing: -.02em; }
    .front svg { width: 36px; height: 36px; }
    .card:focus-visible { outline: 0; }
    .card:focus-visible .face { box-shadow: 0 16px 36px rgba(0, 0, 0, .25), 0 0 0 3px #f59e0b; }
  `,
  html: `
    <div class="stage">
      <button class="card" type="button" aria-pressed="false">
        <span class="face front">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>
          <span>Reveal</span>
        </span>
        <span class="face back"><b>42</b></span>
      </button>
    </div>`,
  init(root) {
    const c = root.querySelector('.card');
    c.addEventListener('click', () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')));
  },
};
