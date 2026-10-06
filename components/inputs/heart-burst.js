// Twitter "Like" heart (Nov 2015 – 2016), rebuilt from the original animation's frames: the outline heart
// (#aab8c2, Twitter's 2015 web icon path) vanishes; a #e2264d disc grows and shifts to #cc8ef5 by 15%, then hollows
// into a thinning ring (30%); 7 groups of 2 particles fan out from the ring's edge to 1.25× its radius and shrink away
// (from 20%); the solid heart pops back from 17.5% with easeOutBack cubic-bezier(.17,.89,.32,1.49). The count turns red.
// Everything happens inside a stage sized for the burst.
const OUT = 'M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z';
const FILL = 'M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z';
const R = 26; // bubble radius
const particles = () => {
  let s = '';
  for (let g = 0; g < 7; g++) {
    const a = g * (360 / 7);
    for (let p = 0; p < 2; p++) {
      const hue = Math.round(((g + p) * 360) / 7) % 360;
      s += '<i class="pt p' + p + '" style="--a:' + (a + (p ? 9 : -9)).toFixed(1) + 'deg;--c:hsl(' + hue + ',100%,75%)"></i>';
    }
  }
  return s;
};
export default {
  id: 'in-heart-burst',
  credit: 'Twitter like heart (2016) — #e2264d disc grows, turns violet #cc8ef5 and hollows into a ring, 7×2 particles burst, heart pops back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .b {
      display: inline-flex; align-items: center; border: 0; padding: 0 10px 0 0; background: none; cursor: pointer; color: #aab8c2;
      font: 400 13px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; -webkit-tap-highlight-color: transparent; outline: 0;
    }
    .st { position: relative; width: 84px; height: 84px; display: grid; place-items: center; margin-right: -26px; }
    .hv { position: absolute; left: 50%; top: 50%; width: 36px; height: 36px; margin: -18px 0 0 -18px; border-radius: 50%; background: rgba(226,38,77,.1); opacity: 0; transition: opacity .15s; }
    .b:hover { color: #e2264d; }
    .b:hover .hv { opacity: 1; }
    .b:focus-visible .hv { opacity: 1; box-shadow: 0 0 0 2px #e2264d; }
    .ic { position: relative; width: 22px; height: 22px; fill: currentColor; }
    .ic .f { display: none; }
    .b[aria-pressed="true"] { color: #e2264d; }
    .b[aria-pressed="true"] .ic .o { display: none; }
    .b[aria-pressed="true"] .ic .f { display: inline; }
    .b.go .ic { animation: heart 1s cubic-bezier(.17,.89,.32,1.49) both; }
    @keyframes heart { 0%, 17.5% { transform: scale(0); } 100% { transform: scale(1); } }
    .bub { position: absolute; left: 50%; top: 50%; width: ${R * 2}px; height: ${R * 2}px; margin: -${R}px 0 0 -${R}px; border-radius: 50%; border: ${R}px solid #e2264d; transform: scale(0); opacity: 0; pointer-events: none; }
    .b.go .bub { animation: bubble 1s cubic-bezier(.21,.61,.35,1) both; }
    @keyframes bubble {
      0% { opacity: 1; transform: scale(0); border-color: #e2264d; border-width: ${R}px; }
      15% { opacity: 1; transform: scale(1); border-color: #cc8ef5; border-width: ${R}px; }
      30%, 99% { opacity: 1; transform: scale(1); border-color: #cc8ef5; border-width: 0; }
      100% { opacity: 0; transform: scale(1); border-width: 0; }
    }
    .pt { position: absolute; left: 50%; top: 50%; width: 6px; height: 6px; margin: -3px 0 0 -3px; border-radius: 50%; background: var(--c); opacity: 0; pointer-events: none; transform: rotate(var(--a)) translateY(-${R}px) scale(1); }
    .pt.p1 { width: 5px; height: 5px; margin: -2.5px 0 0 -2.5px; }
    .b.go .pt { animation: burst 1s cubic-bezier(.21,.61,.35,1) both; }
    @keyframes burst {
      0%, 20% { opacity: 0; transform: rotate(var(--a)) translateY(-${R}px) scale(1); }
      25% { opacity: 1; transform: rotate(var(--a)) translateY(-${Math.round(R * 1.05)}px) scale(1); }
      100% { opacity: 0; transform: rotate(var(--a)) translateY(-${Math.round(R * 1.25)}px) scale(0); }
    }
    .n { position: relative; min-width: 3ch; font-variant-numeric: tabular-nums; text-align: left; }
  `,
  html: `<button class="b" type="button" aria-pressed="false" aria-label="Like">
    <span class="st"><span class="hv"></span><span class="bub"></span>${particles()}
      <svg class="ic" viewBox="0 0 24 24"><path class="o" d="${OUT}"/><path class="f" d="${FILL}"/></svg></span><span class="n">41</span>
  </button>`,
  init(root) {
    const b = root.querySelector('.b'), n = root.querySelector('.n'), bub = root.querySelector('.bub');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on); n.textContent = on ? 42 : 41;
      b.classList.remove('go');
      if (on) { void b.offsetWidth; b.classList.add('go'); }
    });
    bub.addEventListener('animationend', () => b.classList.remove('go'));
  },
};
