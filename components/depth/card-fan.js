export default {
  id: 'dp-card-fan',
  credit: 'Hand of playing cards on felt — the squared-up deck fans out around a common pivot on hover, each card at its own depth; click raises a card out of the hand',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 18px 76px 26px; perspective: 900px; border-radius: 12px; background: radial-gradient(120% 100% at 50% 30%, #1f7a4d, #0d3f27); }
    .deck { position: relative; width: 76px; height: 106px; margin-top: 30px; transform-style: preserve-3d; transform: rotateX(10deg); }
    .card {
      --i: 0; --d: calc(var(--i) - 2); --lift: 0px;
      position: absolute; inset: 0; border: 0; padding: 0; border-radius: 7px; cursor: pointer;
      background: linear-gradient(170deg, #ffffff, #f4f4f2); color: #111;
      box-shadow: 0 0 0 .5px rgba(0, 0, 0, .25), 0 1px 1px rgba(0, 0, 0, .15), 0 6px 12px rgba(0, 0, 0, .25);
      transform-origin: 50% 125%;
      transform: translateZ(calc(var(--i) * 1.5px)) rotate(calc(var(--d) * 1.2deg)) translateY(var(--lift));
      transition: transform .5s cubic-bezier(.34, 1.3, .5, 1), box-shadow .3s;
      font-family: Georgia, 'Times New Roman', serif;
    }
    .card.red { color: #c62828; }
    .deck:hover .card, .deck:focus-within .card { transform: translateZ(calc(var(--i) * 4px)) rotate(calc(var(--d) * 14deg)) translateY(var(--lift)); }
    .deck .card:hover { --lift: -10px; box-shadow: 0 0 0 .5px rgba(0, 0, 0, .25), 0 10px 18px rgba(0, 0, 0, .35); }
    .deck .card[aria-pressed="true"] { --lift: -18px; box-shadow: 0 0 0 2px #fde047, 0 12px 20px rgba(0, 0, 0, .4); }
    .ix { position: absolute; display: flex; flex-direction: column; align-items: center; line-height: .95; }
    .ix b { font: 700 15px/1 Georgia, 'Times New Roman', serif; letter-spacing: -.04em; }
    .ix i { font-style: normal; font-size: 12px; }
    .tl { left: 5px; top: 5px; }
    .br { right: 5px; bottom: 5px; transform: rotate(180deg); }
    .pip { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 34px; line-height: 1; }
    .card:focus-visible { outline: 2px solid #fde047; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="deck" role="group" aria-label="Hand">
        <button class="card" type="button" style="--i:0" aria-pressed="false" aria-label="Ace of spades"><span class="ix tl"><b>A</b><i>&#x2660;&#xFE0E;</i></span><span class="pip">&#x2660;&#xFE0E;</span><span class="ix br"><b>A</b><i>&#x2660;&#xFE0E;</i></span></button>
        <button class="card red" type="button" style="--i:1" aria-pressed="false" aria-label="King of hearts"><span class="ix tl"><b>K</b><i>&#x2665;&#xFE0E;</i></span><span class="pip">&#x2665;&#xFE0E;</span><span class="ix br"><b>K</b><i>&#x2665;&#xFE0E;</i></span></button>
        <button class="card" type="button" style="--i:2" aria-pressed="false" aria-label="Queen of clubs"><span class="ix tl"><b>Q</b><i>&#x2663;&#xFE0E;</i></span><span class="pip">&#x2663;&#xFE0E;</span><span class="ix br"><b>Q</b><i>&#x2663;&#xFE0E;</i></span></button>
        <button class="card red" type="button" style="--i:3" aria-pressed="false" aria-label="Jack of diamonds"><span class="ix tl"><b>J</b><i>&#x2666;&#xFE0E;</i></span><span class="pip">&#x2666;&#xFE0E;</span><span class="ix br"><b>J</b><i>&#x2666;&#xFE0E;</i></span></button>
        <button class="card" type="button" style="--i:4" aria-pressed="false" aria-label="Ten of spades"><span class="ix tl"><b>10</b><i>&#x2660;&#xFE0E;</i></span><span class="pip">&#x2660;&#xFE0E;</span><span class="ix br"><b>10</b><i>&#x2660;&#xFE0E;</i></span></button>
      </div>
    </div>`,
  init(root) {
    const cards = root.querySelectorAll('.card');
    cards.forEach((c) => c.addEventListener('click', () => {
      const on = c.getAttribute('aria-pressed') !== 'true';
      cards.forEach((x) => x.setAttribute('aria-pressed', 'false'));
      c.setAttribute('aria-pressed', String(on));
    }));
  },
};
