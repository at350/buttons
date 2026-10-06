export default {
  id: 'bt-airbnb-heart',
  credit: 'Airbnb — listing wishlist heart (outlined white → filled rausch with a pop)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .card { position: relative; width: 120px; height: 90px; border-radius: 12px; background: linear-gradient(135deg, #c9d6df, #8fa3b1); overflow: visible; }
    .hb {
      position: absolute; top: 8px; right: 8px; width: 32px; height: 32px; border: 0; background: none; cursor: pointer; padding: 0;
      display: flex; align-items: center; justify-content: center; border-radius: 50%; -webkit-tap-highlight-color: transparent;
    }
    .hb:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
    .hb svg { width: 24px; height: 24px; overflow: visible; transition: transform .1s; }
    .hb:hover svg { transform: scale(1.1); }
    .hb:active svg { transform: scale(.9); }
    .hb path { fill: rgba(0,0,0,.5); stroke: #fff; stroke-width: 2; transition: fill .15s; }
    .hb[aria-pressed="true"] path { fill: #ff385c; }
    .hb[aria-pressed="true"] svg { animation: pop .4s cubic-bezier(.34,1.56,.64,1); }
    @keyframes pop { 0% { transform: scale(.7); } 50% { transform: scale(1.25); } 100% { transform: scale(1); } }
  `,
  html: `
    <div class="card">
      <button class="hb" type="button" aria-pressed="false" aria-label="Save to wishlist">
        <svg viewBox="0 0 32 32"><path d="M16 28c7-4.733 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.267 14 17z"/></svg>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.hb');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
