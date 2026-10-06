export default {
  id: 'gm-candy-play',
  credit: 'King Candy Crush Saga — glossy candy-pink "Play!" lozenge with the white highlight band and sparkle; squishes when pressed',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(circle at 50% 30%, #ffd9f0, #ff9ad4 60%, #e85aa8); padding: 24px 30px; border-radius: 12px; }
    .play { position: relative; width: 170px; height: 64px; border: none; cursor: pointer; padding: 0; border-radius: 32px; overflow: visible;
      background: linear-gradient(180deg, #ff6ec7 0%, #ff2fa0 45%, #d0107a 100%); box-shadow: 0 6px 0 #8f0a55, 0 10px 16px rgba(120,0,70,.4), inset 0 -4px 6px rgba(0,0,0,.15), inset 0 0 0 3px rgba(255,255,255,.7);
      color: #fff; font: 800 28px 'Unbounded', 'Syne', system-ui, sans-serif; text-shadow: 0 3px 0 #a80d62, 0 0 8px rgba(0,0,0,.2); transition: transform .08s, box-shadow .08s; }
    .play::before { content: ""; position: absolute; left: 14px; right: 14px; top: 6px; height: 22px; border-radius: 14px 14px 10px 10px; background: linear-gradient(180deg, rgba(255,255,255,.85), rgba(255,255,255,.1)); pointer-events: none; }
    .play:hover { transform: scale(1.05); }
    .play:active, .play.sq { transform: scale(1.08, .9) translateY(5px); box-shadow: 0 1px 0 #8f0a55, 0 4px 8px rgba(120,0,70,.4), inset 0 -4px 6px rgba(0,0,0,.15), inset 0 0 0 3px rgba(255,255,255,.7); }
    .play:focus-visible { outline: 3px solid #fff; outline-offset: 4px; }
    .sp { position: absolute; width: 14px; height: 14px; pointer-events: none; opacity: 0; }
    .sp svg { display: block; width: 100%; height: 100%; fill: #fff; filter: drop-shadow(0 0 3px #fff); }
    .s1 { left: -4px; top: -6px; }
    .s2 { right: 10px; top: -10px; }
    .s3 { right: -6px; bottom: 6px; }
    .s4 { left: 20px; bottom: -8px; }
    .play:hover .sp, .play.sq .sp { animation: tw 1.1s ease-in-out infinite; }
    .s2 { animation-delay: .3s !important; }
    .s3 { animation-delay: .6s !important; }
    .s4 { animation-delay: .85s !important; }
    @keyframes tw { 0%, 100% { opacity: 0; transform: scale(.3) rotate(0); } 50% { opacity: 1; transform: scale(1.1) rotate(45deg); } }
    .lv { display: block; margin: 10px auto 0; width: fit-content; background: rgba(255,255,255,.85); color: #c21a7a; border-radius: 14px; padding: 4px 14px; font: 800 12px 'Unbounded', 'Syne', system-ui, sans-serif; }
  `,
  html: `
    <div class="stage">
      <button class="play" type="button">Play!
        <span class="sp s1" data-overhang><svg viewBox="0 0 10 10"><path d="M5 0 6 4l4 1-4 1-1 4-1-4-4-1 4-1z"/></svg></span>
        <span class="sp s2" data-overhang><svg viewBox="0 0 10 10"><path d="M5 0 6 4l4 1-4 1-1 4-1-4-4-1 4-1z"/></svg></span>
        <span class="sp s3" data-overhang><svg viewBox="0 0 10 10"><path d="M5 0 6 4l4 1-4 1-1 4-1-4-4-1 4-1z"/></svg></span>
        <span class="sp s4" data-overhang><svg viewBox="0 0 10 10"><path d="M5 0 6 4l4 1-4 1-1 4-1-4-4-1 4-1z"/></svg></span>
      </button>
      <span class="lv">Level <span class="n">1</span></span>
    </div>`,
  init(root) {
    const p = root.querySelector('.play'), n = root.querySelector('.n'); let lv = 1, t;
    p.addEventListener('click', () => { lv++; n.textContent = lv; p.classList.add('sq'); clearTimeout(t); t = setTimeout(() => p.classList.remove('sq'), 180); });
    return () => clearTimeout(t);
  },
};
