export default {
  id: 'lb-magic-subscribe',
  credit: 'Magic UI — Animated Subscribe Button (w-36): "Follow ›" exits right (x +50, 0.1s) as the button cross-fades, then "✓ Subscribed" springs down from y −50',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 36px; border-radius: 12px; background: #fff; display: inline-block; }
    .as { position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; height: 40px; width: 144px; padding: 0 24px; border-radius: 10px; border: 0; cursor: pointer; background: #171717; color: #fafafa; font: 600 16px/24px Inter, -apple-system, system-ui, sans-serif; -webkit-tap-highlight-color: transparent; }
    .as:focus-visible { outline: 0; box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .as.swap { animation: xfade .45s ease-in-out; }
    @keyframes xfade { 0% { opacity: 1; } 35% { opacity: 0; } 100% { opacity: 1; } }
    .ly { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
    .ly svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .a svg { margin-left: 4px; transition: transform .3s cubic-bezier(.4,0,.2,1); }
    .as:hover .a svg { transform: translateX(4px); }
    .b svg { margin-right: 8px; }
    .a { transform: translateX(0); opacity: 1; }
    .b { transform: translateY(-50px); opacity: 0; }
    .as[aria-pressed="true"] .a { transform: translateX(50px); opacity: 0; transition: transform .1s, opacity .1s; }
    .as[aria-pressed="true"] .b { transform: translateY(0); opacity: 1; transition: transform .5s cubic-bezier(.34,1.45,.64,1) .15s, opacity 0s .15s; }
  `,
  html: `
    <div class="stage">
      <button class="as" type="button" aria-pressed="false">
        <span class="ly a">Follow<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></span>
        <span class="ly b"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Subscribed</span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.as');
    b.addEventListener('click', () => {
      b.classList.remove('swap'); void b.offsetWidth; b.classList.add('swap');
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
    });
    b.addEventListener('animationend', () => b.classList.remove('swap'));
  },
};
