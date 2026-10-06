export default {
  id: 'dp-card-fan',
  credit: '3D card deck — five stacked cards fan out on hover with rotateZ + translateZ depth, click picks one',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 30px 90px 22px; perspective: 900px; }
    .deck {
      position: relative;
      width: 84px;
      height: 118px;
      transform-style: preserve-3d;
      transform: rotateX(12deg);
    }
    .card {
      --i: 0;
      position: absolute;
      inset: 0;
      border: 0;
      padding: 0;
      border-radius: 10px;
      cursor: pointer;
      background: linear-gradient(160deg, #fff, #f1f5f9);
      color: #0f172a;
      box-shadow: 0 2px 0 rgba(0, 0, 0, .06), 0 10px 24px rgba(0, 0, 0, .18), inset 0 0 0 1px rgba(0, 0, 0, .08);
      transform-origin: 50% 130%;
      transform: translateZ(calc(var(--i) * 4px)) translateY(calc(var(--i) * -1px)) rotateZ(calc(var(--i) * 1.5deg - 3deg));
      transition: transform .55s cubic-bezier(.34, 1.4, .5, 1), box-shadow .3s;
      display: grid;
      place-items: center;
      font: 800 30px/1 'Playfair Display', Georgia, serif;
    }
    .deck:hover .card, .deck:focus-within .card { transform: translateZ(calc(var(--i) * 10px)) rotateZ(calc(var(--i) * 16deg - 32deg)) translateY(-8px); }
    .card:hover { transform: translateZ(calc(var(--i) * 10px + 30px)) rotateZ(calc(var(--i) * 16deg - 32deg)) translateY(-28px) !important; box-shadow: 0 30px 40px rgba(0, 0, 0, .3), inset 0 0 0 1px rgba(0, 0, 0, .1); }
    .card[aria-pressed="true"] { background: linear-gradient(160deg, #1e293b, #0f172a); color: #fde68a; }
    .card span { position: absolute; font: 700 12px/1 'Playfair Display', Georgia, serif; }
    .tl { left: 7px; top: 6px; }
    .br {
      right: 7px;
      bottom: 6px;
      transform: rotate(180deg);
    }
    .card:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="deck" role="group">
        <button class="card" type="button" style="--i:0" aria-pressed="false"><span class="tl">A</span>♠<span class="br">A</span></button>
        <button class="card" type="button" style="--i:1" aria-pressed="false"><span class="tl">K</span>♥<span class="br">K</span></button>
        <button class="card" type="button" style="--i:2" aria-pressed="false"><span class="tl">Q</span>♣<span class="br">Q</span></button>
        <button class="card" type="button" style="--i:3" aria-pressed="false"><span class="tl">J</span>♦<span class="br">J</span></button>
        <button class="card" type="button" style="--i:4" aria-pressed="false"><span class="tl">10</span>♠<span class="br">10</span></button>
      </div>
    </div>`,
  init(root) {
    const cards = root.querySelectorAll('.card');
    cards.forEach((c, i) => {
      if (i === 1 || i === 3) c.style.color = '#dc2626';
      c.addEventListener('click', () => {
        const on = c.getAttribute('aria-pressed') !== 'true';
        cards.forEach((x) => x.setAttribute('aria-pressed', 'false'));
        c.setAttribute('aria-pressed', String(on));
      });
    });
  },
};
