export default {
  id: 'cr-heart-explode',
  credit: 'Twitter "Like" heart animation (2016) — colour-shifting circle → ring burst, 7 dot pairs, heart pops in; count rolls up',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #fff; border-radius: 12px; padding: 24px 30px 24px 22px; }
    .like {
      display: inline-flex; align-items: center; gap: 2px; border: 0; padding: 0; background: none; cursor: pointer; color: #536471;
      font: 400 13px/16px system-ui, -apple-system, 'Segoe UI', sans-serif; font-variant-numeric: tabular-nums;
      transition: color .2s ease;
    }
    .like:hover, .like[aria-pressed="true"] { color: #f91880; }
    .ic { position: relative; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; transition: background-color .2s ease; }
    .like:hover .ic { background: rgba(249, 24, 128, .1); }
    .like:focus-visible { outline: 0; }
    .like:focus-visible .ic { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1d9bf0; }
    .h { position: relative; z-index: 1; width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; }
    .like[aria-pressed="true"] .h { fill: #f91880; stroke: #f91880; }
    .like:active .h { transform: scale(.85); }
    .pop .h { animation: heart .8s cubic-bezier(.17, .89, .32, 1.28) both; }
    .circ { position: absolute; left: 50%; top: 50%; width: 34px; height: 34px; margin: -17px; border-radius: 50%; border: 17px solid #e2264d; opacity: 0; pointer-events: none; }
    .pop .circ { animation: circ .45s cubic-bezier(.21, .61, .35, 1) both; }
    .dot { position: absolute; left: 50%; top: 50%; width: 5px; height: 5px; margin: -2.5px; border-radius: 50%; background: var(--c); opacity: 0; pointer-events: none; }
    .pop .dot { animation: dot .6s .22s cubic-bezier(.21, .61, .35, 1) both; }
    .cnt { display: block; height: 16px; overflow: hidden; padding: 0 2px; }
    .cnt span { display: block; transition: transform .3s cubic-bezier(.2, 0, 0, 1); }
    .like[aria-pressed="true"] .cnt span { transform: translateY(-100%); }
    @keyframes heart { 0%, 28% { transform: scale(0); } 55% { transform: scale(1.2); } 100% { transform: scale(1); } }
    @keyframes circ {
      0% { opacity: 1; transform: scale(0); border-color: #e2264d; border-width: 17px; }
      45% { opacity: 1; transform: scale(1); border-color: #cd8aeb; border-width: 17px; }
      100% { opacity: 1; transform: scale(1.05); border-color: #cd8aeb; border-width: 0; }
    }
    @keyframes dot {
      0% { opacity: 1; transform: rotate(var(--a)) translateY(-14px) scale(1); }
      100% { opacity: 1; transform: rotate(var(--a)) translateY(-31px) scale(0); }
    }
  `,
  html: `
    <div class="stage">
      <button class="like" type="button" aria-pressed="false" aria-label="Like, 1,203 likes">
        <span class="ic" aria-hidden="true"><span class="circ"></span><span class="dots"></span><svg class="h" viewBox="0 0 24 24"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></span>
        <span class="cnt" aria-hidden="true"><span>1,203</span><span>1,204</span></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.like'), ic = root.querySelector('.ic'), dots = root.querySelector('.dots');
    const pairs = [['#9fc7fa', '#9fdeb4'], ['#9fdeb4', '#f0928d'], ['#cc8ef5', '#91d2fa'], ['#91d2fa', '#9ae4cf'], ['#9ae4cf', '#cc8ef5'], ['#cc8ef5', '#f48ea7'], ['#f48ea7', '#9fc7fa']];
    dots.innerHTML = pairs.map((p, i) => {
      const a = (360 / 7) * i;
      return `<span class="dot" style="--a:${a - 7}deg;--c:${p[0]}"></span><span class="dot" style="--a:${a + 7}deg;--c:${p[1]}"></span>`;
    }).join('');
    let t = 0;
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', on ? 'Unlike, 1,204 likes' : 'Like, 1,203 likes');
      ic.classList.remove('pop');
      clearTimeout(t);
      if (on) { void ic.offsetWidth; ic.classList.add('pop'); t = setTimeout(() => ic.classList.remove('pop'), 900); }
    });
    return () => clearTimeout(t);
  },
};
