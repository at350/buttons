export default {
  id: 'cr-label-swap',
  credit: 'Rolling label swap + Stripe "HoverArrow" (chevron grows a stem) — stripe.com "Start now" pill CTA',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; display: inline-flex; align-items: center; cursor: pointer; border: 0; border-radius: 16.5px;
      background: #635bff; color: #fff; padding: 0 14px 0 16px; height: 34px;
      font: 600 15px/1 Inter, system-ui, sans-serif; letter-spacing: -.01em;
      transition: background-color .15s cubic-bezier(.215, .61, .355, 1), transform .15s ease;
    }
    .btn:hover, .btn:focus-visible { background: #0a2540; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #635bff; outline-offset: 3px; }
    .roll { display: block; height: 18px; overflow: hidden; }
    .roll span { display: block; height: 18px; line-height: 18px; white-space: nowrap; transition: transform .45s cubic-bezier(.65, 0, .35, 1); }
    .btn:hover .roll span, .btn:focus-visible .roll span { transform: translateY(-100%); }
    .arr { margin-left: 6px; width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 2; position: relative; top: .5px; }
    .arr .line { opacity: 0; transition: opacity .15s cubic-bezier(.215, .61, .355, 1); }
    .arr .tip { transition: transform .15s cubic-bezier(.215, .61, .355, 1); }
    .btn:hover .arr .line, .btn:focus-visible .arr .line { opacity: 1; }
    .btn:hover .arr .tip, .btn:focus-visible .arr .tip { transform: translateX(3px); }
  `,
  html: `<button class="btn" type="button"><span class="roll"><span>Start now</span><span aria-hidden="true">Start now</span></span><svg class="arr" viewBox="0 0 10 10" aria-hidden="true"><g fill-rule="evenodd"><path class="line" d="M0 5h7"/><path class="tip" d="M1 1l4 4-4 4"/></g></svg></button>`,
};
