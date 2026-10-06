export default {
  id: 'lb-aceternity-moving-border',
  credit: 'Aceternity UI — Moving Border button: an 80px sky-500 radial blob rides a rect with rx/ry 30% at one lap per 3000ms around a 160×64 slate-900/80 pill; click flips it to the light (white / neutral-200) variant from the demo',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #020617; display: inline-block; transition: background .3s; }
    .stage.light { background: #fff; }
    .mb { position: relative; display: block; width: 160px; height: 64px; padding: 1px; border-radius: 1.75rem; background: transparent; border: 0; cursor: pointer; overflow: hidden; font: 400 20px/28px Inter, -apple-system, system-ui, sans-serif; -webkit-tap-highlight-color: transparent; }
    .mb:focus-visible { outline: 2px solid #0ea5e9; outline-offset: 3px; }
    .rail { position: absolute; inset: 0; border-radius: calc(1.75rem * 0.96); }
    .blob { position: absolute; top: 0; left: 0; width: 80px; height: 80px; opacity: .8; background: radial-gradient(#0ea5e9 40%, transparent 60%); offset-path: inset(0 round 48px / 19.2px); offset-anchor: 50% 50%; offset-rotate: 0deg; animation: ride 3s linear infinite; }
    @keyframes ride { from { offset-distance: 0%; } to { offset-distance: 100%; } }
    .in { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: calc(1.75rem * 0.96); border: 1px solid #1e293b; background: rgba(15,23,42,.8); color: #fff; font-size: 14px; line-height: 20px; -webkit-font-smoothing: antialiased; backdrop-filter: blur(24px); transition: background .3s, color .3s, border-color .3s; }
    .light .in { background: #fff; color: #000; border-color: #e5e5e5; }
  `,
  html: `
    <div class="stage">
      <button class="mb" type="button" aria-pressed="false">
        <span class="rail"><span class="blob"></span></span>
        <span class="in">Borders are cool</span>
      </button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), b = root.querySelector('.mb');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); st.classList.toggle('light', on); });
  },
};
