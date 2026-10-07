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
    /* the blob rides inset(0 round 48px / 19.2px) of the 160x64 rail at constant speed: the keyframes are that offset-path sampled
       (centre - 40px, within .15px), so the lap is a compositor transform instead of a main-thread offset-distance animation */
    .blob { position: absolute; top: 0; left: 0; width: 80px; height: 80px; opacity: .8; background: radial-gradient(#0ea5e9 40%, transparent 60%); transform: translate(8px, -40px); animation: ride 3s linear infinite; }
    @keyframes ride {
      0% { transform: translate(8px, -40px); } 16% { transform: translate(71.9px, -40px); } 18.25% { transform: translate(80.8px, -39.6px); } 20.5% { transform: translate(89.8px, -38.6px); }
      22.25% { transform: translate(97px, -37.1px); } 23.5% { transform: translate(101.8px, -35.8px); } 24.5% { transform: translate(105.4px, -34.5px); } 25.75% { transform: translate(110px, -32.5px); }
      26.5% { transform: translate(112.5px, -31px); } 27% { transform: translate(114.3px, -29.8px); } 27.75% { transform: translate(116.4px, -28px); } 28.5% { transform: translate(118.4px, -25.6px); }
      29.25% { transform: translate(119.7px, -22.9px); } 29.75% { transform: translate(120px, -21px); } 36.25% { transform: translate(120px, 4.9px); } 37% { transform: translate(119.3px, 7.8px); }
      37.5% { transform: translate(118.5px, 9.5px); } 38% { transform: translate(117.2px, 11.1px); } 39% { transform: translate(114.3px, 13.8px); } 39.75% { transform: translate(111.7px, 15.5px); }
      40.5% { transform: translate(109.2px, 16.9px); } 41.25% { transform: translate(106.3px, 18.2px); } 42% { transform: translate(103.7px, 19.2px); } 43.75% { transform: translate(97.1px, 21.1px); }
      45.5% { transform: translate(89.9px, 22.6px); } 47.25% { transform: translate(82.8px, 23.5px); } 49.25% { transform: translate(74.9px, 23.9px); } 66.25% { transform: translate(7.1px, 24px); }
      67.75% { transform: translate(1.2px, 23.8px); } 69.5% { transform: translate(-5.8px, 23.1px); } 70.5% { transform: translate(-9.8px, 22.6px); } 72% { transform: translate(-16px, 21.4px); }
      73.25% { transform: translate(-20.9px, 20.1px); } 74.25% { transform: translate(-24.5px, 18.9px); } 75.5% { transform: translate(-29.1px, 16.9px); } 76.25% { transform: translate(-31.7px, 15.5px); }
      77.25% { transform: translate(-35px, 13.2px); } 78% { transform: translate(-37.2px, 11.2px); } 78.5% { transform: translate(-38.4px, 9.6px); } 79% { transform: translate(-39.3px, 7.9px); }
      79.75% { transform: translate(-40px, 5px); } 86.25% { transform: translate(-40px, -20.9px); } 87% { transform: translate(-39.3px, -23.8px); } 87.5% { transform: translate(-38.5px, -25.5px); }
      88% { transform: translate(-37.2px, -27.1px); } 89% { transform: translate(-34.3px, -29.8px); } 90.25% { transform: translate(-30.1px, -32.4px); } 91.5% { transform: translate(-25.4px, -34.5px); }
      93% { transform: translate(-20px, -36.3px); } 94.5% { transform: translate(-14.1px, -37.8px); } 96.25% { transform: translate(-6.9px, -39px); } 98.25% { transform: translate(1.1px, -39.8px); }
      100% { transform: translate(8px, -40px); }
    }
    .in { position: relative; z-index: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: calc(1.75rem * 0.96); border: 1px solid #1e293b; background: #020617; color: #fff; font-size: 14px; line-height: 20px; -webkit-font-smoothing: antialiased; transition: background .3s, color .3s, border-color .3s; }
    /* backdrop-filter: blur(24px) re-blurred the moving blob every frame. Same picture, pre-blurred: the stage colour (.in background),
       the blob convolved with a 24px gaussian riding the same path (::before, 208px, centred on the blob), then the slate-900/80 fill (::after) */
    .in::before { content: ''; position: absolute; left: -66px; top: -66px; width: 208px; height: 208px; z-index: -1; transform: translate(8px, -40px); background: radial-gradient(closest-side, rgba(14,165,233,0.3991) 0%, rgba(14,165,233,0.3843) 7.69%, rgba(14,165,233,0.3428) 15.38%, rgba(14,165,233,0.283) 23.08%, rgba(14,165,233,0.2157) 30.77%, rgba(14,165,233,0.1514) 38.46%, rgba(14,165,233,0.0977) 46.15%, rgba(14,165,233,0.0577) 53.85%, rgba(14,165,233,0.0311) 61.54%, rgba(14,165,233,0.0153) 69.23%, rgba(14,165,233,0.0068) 76.92%, rgba(14,165,233,0.0028) 84.62%, rgba(14,165,233,0.001) 92.31%, rgba(14,165,233,0) 100%); animation: ride 3s linear infinite; }
    .in::after { content: ''; position: absolute; inset: 0; z-index: -1; background: rgba(15,23,42,.8); transition: background .3s; }
    .light .in { background: #fff; color: #000; border-color: #e5e5e5; }
    .light .in::after { background: #fff; }
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
