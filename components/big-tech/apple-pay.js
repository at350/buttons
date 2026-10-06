// Apple Pay "Buy with Apple Pay" button (black style). After the (simulated) payment sheet completes, the button
// shows the sheet's "Done" checkmark. Both states share one grid cell, so the width never changes.
const APPLE = 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701';
export default {
  id: 'bt-apple-pay',
  credit: 'Apple Pay — black "Buy with Apple Pay" button (Apple Pay on the Web)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .ap {
      display: inline-grid; place-items: center; height: 44px; min-width: 220px; padding: 0 20px; border: 0; border-radius: 8px;
      background: #000; color: #fff; cursor: pointer; white-space: nowrap;
      font: 500 18px/1 -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif; letter-spacing: -.01em;
      transition: opacity .15s ease; -webkit-tap-highlight-color: transparent;
    }
    .ap:hover { opacity: .9; }
    .ap:active { opacity: .7; }
    .ap:focus-visible { outline: 3px solid rgba(0,122,255,.6); outline-offset: 2px; }
    .ap > span { grid-area: 1 / 1; display: inline-flex; align-items: center; }
    .buy svg { width: 18px; height: 18px; fill: currentColor; margin: -4px 1px 0 6px; }
    .pay { font-weight: 600; font-size: 19px; letter-spacing: -.02em; }
    .done { gap: 8px; visibility: hidden; }
    .done svg { width: 22px; height: 22px; }
    .ap.paid .buy { visibility: hidden; }
    .ap.paid .done { visibility: visible; }
    .ap.paid .done svg { animation: pop .35s cubic-bezier(.32,.72,0,1); }
    .ap.paid .done path { stroke-dasharray: 20; animation: draw .35s cubic-bezier(.32,.72,0,1) .1s backwards; }
    @keyframes pop { from { transform: scale(.4); opacity: 0; } }
    @keyframes draw { from { stroke-dashoffset: 20; } }
    .ap.wait .buy { opacity: .5; }
  `,
  html: `
    <button class="ap" type="button" aria-label="Buy with Apple Pay" aria-pressed="false">
      <span class="buy" aria-hidden="true">Buy with<svg viewBox="0 0 24 24"><path d="${APPLE}"/></svg><span class="pay">Pay</span></span>
      <span class="done" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#fff"/><path d="m7 12.4 3.3 3.3L17.2 8.6" fill="none" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Done</span>
    </button>`,
  init(root) {
    const b = root.querySelector('.ap');
    let t;
    b.addEventListener('click', () => {
      clearTimeout(t);
      if (b.classList.contains('paid')) { b.classList.remove('paid'); b.setAttribute('aria-pressed', 'false'); return; }
      b.classList.add('wait');
      t = setTimeout(() => { b.classList.remove('wait'); b.classList.add('paid'); b.setAttribute('aria-pressed', 'true'); }, 500);
    });
    return () => clearTimeout(t);
  },
};
