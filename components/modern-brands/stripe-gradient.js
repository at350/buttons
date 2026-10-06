export default {
  id: 'mb-stripe-gradient',
  credit: 'Stripe.com hero (2025) — under the signature wave gradient: the #533AFD "Get started" with Stripe’s hover-arrow (the shaft slides in behind the chevron) and the outlined "Sign up with Google"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 70px 26px 24px; border-radius: 12px; overflow: hidden; background: #fff; display: flex; gap: 12px; align-items: center;
      font: 500 16px/1 "sohne-var", "SF Pro Display", Inter, -apple-system, system-ui, sans-serif; letter-spacing: 0; -webkit-font-smoothing: antialiased; }
    .wave { position: absolute; left: -20%; right: -20%; top: -70px; height: 150px; transform: skewY(-8deg); transform-origin: 0 0;
      background: radial-gradient(40% 90% at 15% 60%, #ffba27 0%, transparent 70%), radial-gradient(35% 80% at 40% 40%, #ef008f 0%, transparent 70%),
                  radial-gradient(40% 90% at 70% 70%, #7038ff 0%, transparent 70%), radial-gradient(35% 90% at 92% 40%, #6ec3f4 0%, transparent 70%), #a960ee;
      background-size: 130% 100%; background-position: 0% 0; transition: background-position 1.6s cubic-bezier(.25,1,.5,1); }
    .stage:hover .wave { background-position: 100% 0; }
    .b { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 24px; border-radius: 4px; cursor: pointer; font: inherit; white-space: nowrap; position: relative;
      transition: background-color .3s cubic-bezier(.25,1,.5,1), color .3s cubic-bezier(.25,1,.5,1), border-color .3s cubic-bezier(.25,1,.5,1); -webkit-tap-highlight-color: transparent; }
    .b:focus-visible { outline: 2px solid #533afd; outline-offset: 2px; }
    .pri { border: 0; background: #533afd; color: #fff; }
    .pri:hover { background: #4032c8; }
    .pri:active { background: #2e2b8c; }
    .ha { width: 5px; height: 8px; overflow: visible; margin-right: 6px; }
    .ha .shaft { opacity: 0; transition: opacity .3s cubic-bezier(.25,1,.5,1); }
    .ha .grp { transition: transform .3s cubic-bezier(.25,1,.5,1); }
    .pri:hover .shaft, .pri:focus-visible .shaft { opacity: 1; }
    .pri:hover .grp, .pri:focus-visible .grp { transform: translateX(6px); }
    .sec { border: 1px solid #d6d9fc; background: transparent; color: #533afd; }
    .sec:hover { border-color: #7f7dfc; background: #f5f5ff; }
    .sec svg { width: 14px; height: 14px; }
  `,
  html: `
    <div class="stage">
      <div class="wave" aria-hidden="true"></div>
      <button class="b pri" type="button">Get started<svg class="ha" width="5" height="8" viewBox="0 0.5 5 8" aria-hidden="true"><defs><clipPath id="sclip"><rect x="0" y="0" width="12" height="9"/></clipPath></defs><g clip-path="url(#sclip)"><g class="grp"><rect class="shaft" x="-10" y="3.375" width="13" height="1.75" fill="currentColor"/><path fill="currentColor" d="M4.84766 3.63379L5.45898 4.25L4.84766 4.86621L1.24219 8.49902L0 7.2666L2.99316 4.24902L0 1.23242L1.24219 0L4.84766 3.63379Z"/></g></g></svg></button>
      <button class="b sec" type="button"><svg viewBox="0 0 12 12" aria-hidden="true"><path fill="#4285f4" d="M11.8846 4.91113H6.11987v2.31403h3.30546c-.06676.36934-.20976.72135-.42019 1.03438s-.48385.58047-.80343.78585V10.551h1.96699c.6038-.57079 1.0787-1.2598 1.394-2.02239.4722-1.14225.5273-2.4075.3219-3.61748"/><path fill="#34a853" d="M6.11985 12c1.64722 0 3.04228-.5278 4.04885-1.449L8.20168 9.0454c-.61936.39256-1.34496.59231-2.08183.5731-.76295-.00928-1.50387-.25249-2.11917-.69564-.61531-.44314-1.07424-1.06406-1.31264-1.77595H.652344v1.53908C1.16135 9.68188 1.9422 10.5192 2.90769 11.1044c.9655.5852 2.07762.8953 3.21216.8956"/><path fill="#fbbc04" d="M2.68809 7.14693c-.25717-.74696-.25717-1.55625 0-2.30321v-1.5499H.652386c-.427544.83671-.65018873 1.75993-.65018873 2.6961S.224842 7.84931.652386 8.68602z"/><path fill="#ea4335" d="M6.11985 2.37211c.87133-.0146 1.71351.30816 2.34449.89853l1.75046-1.71879C9.51693.932184 8.68295.478902 7.77771.227229 6.87246-.0244442 5.92032-.0677314 4.99527.100731c-.92505.168462-1.79809.544137-2.5513 1.097839-.75321.55369-1.3663 1.2705-1.791626 2.09473L2.68804 4.84371c.2384-.71189.69733-1.33281 1.31264-1.77595.6153-.44315 1.35622-.68636 2.11917-.69565"/></svg>Sign up with Google</button>
    </div>`,
};
