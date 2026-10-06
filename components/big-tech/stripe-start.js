// stripe.com hero CTAs with Stripe's HoverArrow: the chevron slides 3px right and the shaft fades in on hover.
const ARROW = '<svg class="ha" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><g fill-rule="evenodd"><path class="ln" d="M0 5h7"/><path class="tp" d="M1 1l4 4-4 4"/></g></svg>';
export default {
  id: 'bt-stripe-start',
  credit: 'Stripe — "Start now" and "Contact sales" pill CTAs with the HoverArrow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 16px; align-items: center; white-space: nowrap; }
    .st {
      height: 36px; padding: 0 12px 1px 16px; border: 0; border-radius: 16.5px; cursor: pointer;
      font: 500 15px/24px sohne-var, "Sohne", "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: .1px;
      display: inline-flex; align-items: center; transition: background-color .2s cubic-bezier(.215,.61,.355,1), color .2s cubic-bezier(.215,.61,.355,1);
      -webkit-tap-highlight-color: transparent;
    }
    .pri { background: #635bff; color: #fff; }
    .pri:hover { background: #0a2540; }
    .sec { background: transparent; color: #0a2540; }
    .sec:hover { color: #425466; }
    .st:active { opacity: .85; }
    .st:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(99,91,255,.45); }
    .ha { margin-left: 8px; margin-top: 1px; fill: none; stroke: currentColor; stroke-width: 2; overflow: visible; }
    .ha .ln { opacity: 0; transition: opacity .15s cubic-bezier(.215,.61,.355,1); }
    .ha .tp { transition: transform .15s cubic-bezier(.215,.61,.355,1); }
    .st:hover .ln, .st:focus-visible .ln { opacity: 1; }
    .st:hover .tp, .st:focus-visible .tp { transform: translateX(3px); }
  `,
  html: `
    <div class="row">
      <button class="st pri" type="button">Start now${ARROW}</button>
      <button class="st sec" type="button">Contact sales${ARROW}</button>
    </div>`,
};
