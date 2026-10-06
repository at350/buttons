export default {
  id: 'lb-magic-pulsating',
  credit: 'Magic UI — Pulsating Button: bg-primary rounded-lg CTA; an inherit-colored layer pulses a box-shadow 0 → 8px → 0 at 50% of the background colour (1.5s ease-out); click switches to the "ripple" variant',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #fff; display: inline-block; }
    .pb { --bg: #171717; --pulse: rgba(23,23,23,.5); --duration: 1.5s; --distance: 8px; position: relative; display: flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 10px; border: 0; cursor: pointer; background: var(--bg); color: #fafafa; font: 400 16px/24px Inter, -apple-system, system-ui, sans-serif; text-align: center; white-space: nowrap; -webkit-tap-highlight-color: transparent; }
    .pb:focus-visible { outline: 2px solid #a1a1a1; outline-offset: 3px; }
    .pb .l { position: relative; z-index: 10; }
    .pb .ring { position: absolute; inset: 0; border-radius: inherit; background: inherit; pointer-events: none; animation: pulse var(--duration) ease-out infinite; }
    .pb[aria-pressed="true"] .ring { animation: pulse-ripple var(--duration) cubic-bezier(.16,1,.3,1) infinite; }
    @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 var(--pulse); } 50% { box-shadow: 0 0 0 var(--distance) var(--pulse); } }
    @keyframes pulse-ripple { 0% { box-shadow: 0 0 0 0 rgba(23,23,23,1); } 100% { box-shadow: 0 0 0 var(--distance) rgba(23,23,23,0); } }
  `,
  html: `
    <div class="stage">
      <button class="pb" type="button" aria-pressed="false"><span class="l">Join Affiliate Program</span><span class="ring" aria-hidden="true"></span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.pb');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
