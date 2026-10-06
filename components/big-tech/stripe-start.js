export default {
  id: 'bt-stripe-start',
  credit: 'Stripe — "Start now" pill button with sliding arrow (Stripe blurple)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .st {
      height: 36px; padding: 0 16px; border: 0; border-radius: 18px; cursor: pointer;
      background: #635bff; color: #fff; font: 500 15px/36px -apple-system, "Segoe UI", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 2px; transition: background .2s, color .2s;
      -webkit-tap-highlight-color: transparent;
    }
    .st:hover { background: #0a2540; }
    .st:focus-visible { outline: 3px solid rgba(99,91,255,.5); outline-offset: 2px; }
    .arrow { width: 14px; height: 14px; position: relative; display: inline-block; margin-left: 4px; }
    .arrow svg { position: absolute; inset: 0; width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .arrow .shaft { stroke-dasharray: 10; stroke-dashoffset: 10; transition: stroke-dashoffset .2s; }
    .arrow .head { transition: transform .2s; }
    .st:hover .arrow .shaft { stroke-dashoffset: 0; }
    .st:hover .arrow .head { transform: translateX(3px); }
    .ghost { background: transparent; color: #635bff; }
    .ghost:hover { background: transparent; color: #0a2540; }
    .st[aria-pressed="true"] { background: #0a2540; }
    .lbl::after { content: 'Start now'; }
    .st[aria-pressed="true"] .lbl::after { content: 'Started'; }
  `,
  html: `
    <div class="row">
      <button class="st" type="button" aria-pressed="false"><span class="lbl"></span><span class="arrow"><svg viewBox="0 0 14 14"><path class="shaft" d="M1.5 7h9"/><path class="head" d="M6.5 2.5 11 7l-4.5 4.5"/></svg></span></button>
      <button class="st ghost" type="button">Contact sales<span class="arrow"><svg viewBox="0 0 14 14"><path class="shaft" d="M1.5 7h9"/><path class="head" d="M6.5 2.5 11 7l-4.5 4.5"/></svg></span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.st:not(.ghost)');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
