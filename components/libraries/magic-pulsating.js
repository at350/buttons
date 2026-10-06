export default {
  id: 'lb-magic-pulsating',
  credit: 'Magic UI — Pulsating Button: #0096ff rounded-lg CTA with a soft expanding pulse ring; joining the waitlist calms it down',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 40px; border-radius: 12px; background: #fff; display: inline-block; }
    .pb { --pulse: #0096ff; position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 40px; padding: 0 16px; border-radius: 8px; border: 0; cursor: pointer; background: #0096ff; color: #fff; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; white-space: nowrap; transition: background .2s, transform .1s; -webkit-tap-highlight-color: transparent; }
    .pb::before { content: ''; position: absolute; inset: 0; border-radius: inherit; animation: pulse 1.5s cubic-bezier(.4,0,.6,1) infinite; }
    @keyframes pulse { 0% { box-shadow: 0 0 0 0 var(--pulse); } 100% { box-shadow: 0 0 0 10px transparent; } }
    .pb:hover { background: #0085e6; }
    .pb:active { transform: scale(.97); }
    .pb:focus-visible { outline: 2px solid #0096ff; outline-offset: 3px; }
    .pb svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; display: none; }
    .pb[aria-pressed="true"] { background: #16a34a; --pulse: #16a34a; }
    .pb[aria-pressed="true"]::before { animation-iteration-count: 1; }
    .pb[aria-pressed="true"] svg { display: block; }
    .pb[aria-pressed="true"] .l::after { content: 'Joined'; }
    .pb .l::after { content: 'Join Waitlist'; }
    .pb .l { position: relative; }
  `,
  html: `
    <div class="stage">
      <button class="pb" type="button" aria-pressed="false"><span class="l"></span><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.pb');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
