export default {
  id: 'mb-linear-start',
  credit: 'Linear.app homepage — the pill "Get started" (invert variant, #e5e5e6 → white on hover) beside the translucent "Contact sales"; 160ms ease-out-quad, scale(.97) press',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 26px 28px; border-radius: 12px; background: radial-gradient(120% 140% at 50% 0%, #15161a 0%, #08090a 60%); display: flex; gap: 12px; align-items: center;
      font: 510 15px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: -.011em; -webkit-font-smoothing: antialiased; }
    .logo { width: 22px; height: 22px; fill: #f7f8f8; margin-right: 8px; flex: none; }
    .b { height: 40px; padding: 0 16px; border-radius: 9999px; cursor: pointer; font: inherit; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;
      transition: .16s cubic-bezier(.25,.46,.45,.94); transition-property: border, background-color, color, box-shadow, opacity, filter, transform; -webkit-tap-highlight-color: transparent; }
    .b:active { transform: scale(.97); }
    .b:focus-visible { outline: none; box-shadow: 0 0 0 2px #08090a, 0 0 0 4px #5e6ad2; }
    .inv { background: #e5e5e6; border: 1px solid #e5e5e6; color: #08090a; }
    .inv:hover { background: #fff; border-color: #fff; }
    .sec { border: none; background: rgba(255,255,255,.05); color: #f7f8f8; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.03), inset 0 1px rgba(255,255,255,.04), 0 0 0 1px rgba(0,0,0,.6), 0 4px 4px rgba(0,0,0,.1); }
    .sec:hover { background: #232326; }
  `,
  html: `
    <div class="stage">
      <svg class="logo" viewBox="0 0 24 24" role="img" aria-label="Linear"><path d="M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z"/></svg>
      <button class="b inv" type="button">Get started</button>
      <button class="b sec" type="button">Contact sales</button>
    </div>`,
};
