export default {
  id: 'bt-apple-pay',
  credit: 'Apple Pay — black "Buy with  Pay" pill button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .ap {
      display: inline-flex; align-items: center; justify-content: center; gap: 5px;
      height: 40px; min-width: 200px; padding: 0 16px; border: 0; border-radius: 8px;
      background: #000; color: #fff; cursor: pointer;
      font: 500 17px -apple-system, "SF Pro Text", system-ui, sans-serif; letter-spacing: -.2px;
      transition: background .15s, transform .1s; -webkit-tap-highlight-color: transparent;
    }
    .ap:hover { background: #1a1a1a; }
    .ap:active { transform: scale(.98); background: #2a2a2a; }
    .ap:focus-visible { outline: 2px solid #007aff; outline-offset: 3px; }
    .ap svg { height: 19px; width: 19px; fill: currentColor; margin-left: 2px; margin-top: -3px; }
    .pay { font-weight: 600; font-size: 19px; letter-spacing: -.6px; margin-left: -2px; }
    .lbl::after { content: 'Buy with'; }
    .ap.done { background: #34c759; }
    .ap.done .lbl::after { content: 'Paid with'; }
  `,
  html: `
    <button class="ap" type="button" aria-pressed="false">
      <span class="lbl"></span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
      <span class="pay">Pay</span>
    </button>`,
  init(root) {
    const b = root.querySelector('.ap');
    b.addEventListener('click', () => {
      const on = b.classList.toggle('done');
      b.setAttribute('aria-pressed', on);
    });
  },
};
