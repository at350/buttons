const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-shuffle-fan',
  credit: 'Shuffle — three stacked cards fan out like a hand of cards, trade places and spring back into a fresh pile; hover peeks the fan',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 260px; height: 200px; max-width: 100%; border-radius: 12px; background: #0f172a; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
    .deck { position: absolute; left: 50%; top: 24px; width: 90px; height: 120px; margin-left: -45px; }
    .card {
      position: absolute; inset: 0; border-radius: 12px; overflow: hidden; border: 3px solid #fff; background: #fff;
      transform-origin: 50% 130%; transform: rotate(calc(var(--i) * 2deg - 2deg)) translateY(calc(var(--i) * -2px)); z-index: calc(3 - var(--i));
      transition: transform .7s ${SPRING}, z-index 0s .35s; box-shadow: 0 10px 25px -10px rgba(0,0,0,.7);
    }
    .card img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 9px; }
    .deck:hover .card { transform: rotate(calc(var(--i) * 14deg - 14deg)) translateY(calc(var(--i) * -2px)); }
    .stage.fan .card { transform: rotate(calc(var(--i) * 28deg - 28deg)) translate(calc(var(--i) * 6px - 6px), -14px) scale(1.04); }
    .btn { position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%); height: 36px; padding: 0 16px; border-radius: 999px; border: 0; background: #fff; color: #0f172a; font: 600 13px Inter, system-ui, sans-serif; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: transform .3s cubic-bezier(.34, 1.56, .64, 1), background .2s; }
    .btn:hover { background: #e2e8f0; transform: translateX(-50%) scale(1.05); } .btn:active { transform: translateX(-50%) scale(.95); }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .btn svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .6s ${SPRING}; }
    .stage.fan .btn svg { transform: scaleX(-1); }
  `,
  html: `
    <div class="stage">
      <div class="deck" aria-hidden="true">
        <div class="card" data-k="0" style="--i:0"><img src="assets/square/45.webp" alt="" width="84" height="114"></div>
        <div class="card" data-k="1" style="--i:1"><img src="assets/square/64.webp" alt="" width="84" height="114"></div>
        <div class="card" data-k="2" style="--i:2"><img src="assets/square/67.webp" alt="" width="84" height="114"></div>
      </div>
      <button class="btn" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/></svg>Shuffle</button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), cards = [...root.querySelectorAll('.card')], btn = root.querySelector('.btn');
    let t1 = 0, t2 = 0, order = [0, 1, 2];
    btn.addEventListener('click', () => {
      if (stage.classList.contains('fan')) return;
      stage.classList.add('fan');
      clearTimeout(t1); clearTimeout(t2);
      t1 = setTimeout(() => {
        const top = order[0];
        for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
        if (order[0] === top) order.push(order.shift());
        order.forEach((k, i) => cards[k].style.setProperty('--i', i));
      }, 420);
      t2 = setTimeout(() => stage.classList.remove('fan'), 760);
    });
    return () => { clearTimeout(t1); clearTimeout(t2); };
  },
};
