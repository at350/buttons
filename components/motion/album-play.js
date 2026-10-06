const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-album-play',
  credit: 'Now-playing card — press play and the album art lifts, tilts in 3D and glows in its own colours while the bars dance (Apple Music / Spotify widget)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 120px; max-width: 100%; border-radius: 12px; background: #111; display: flex; align-items: center; gap: 16px; padding: 18px; font-family: Inter, system-ui, sans-serif; perspective: 600px; }
    .art { position: relative; width: 84px; height: 84px; flex: none; border-radius: 12px; background: linear-gradient(135deg, #f472b6 0%, #fb923c 50%, #facc15 100%); transform-style: preserve-3d; transition: transform .8s ${SPRING}, box-shadow .6s; box-shadow: 0 4px 12px rgba(0,0,0,.4); }
    .art::after { content: ''; position: absolute; inset: 26px; border-radius: 50%; background: #111; box-shadow: inset 0 0 0 10px rgba(255,255,255,.18); }
    .stage.on .art { transform: translateY(-6px) rotateX(10deg) rotateY(-14deg) scale(1.06); box-shadow: 0 20px 40px -12px rgba(251, 146, 60, .7), 0 0 50px -10px rgba(244, 114, 182, .5); }
    .meta { display: flex; flex-direction: column; gap: 3px; min-width: 0; flex: 1; }
    .meta b { font-size: 14px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .meta span { font-size: 12px; color: #888; }
    .bars { display: flex; gap: 3px; align-items: flex-end; height: 16px; margin-top: 8px; }
    .bars i { width: 3px; height: 4px; border-radius: 2px; background: #fb923c; transition: height .4s ${SPRING}; }
    .stage.on .bars i { animation: eq .8s ease-in-out infinite alternate; }
    .stage.on .bars i:nth-child(2) { animation-delay: -.2s; } .stage.on .bars i:nth-child(3) { animation-delay: -.5s; } .stage.on .bars i:nth-child(4) { animation-delay: -.35s; }
    @keyframes eq { from { height: 4px; } to { height: 16px; } }
    .play { width: 44px; height: 44px; border-radius: 50%; border: 0; background: #fff; color: #111; cursor: pointer; display: grid; place-items: center; flex: none; transition: transform .5s ${SPRING}, background .2s; }
    .play:hover { transform: scale(1.08); background: #f3f3f3; } .play:active { transform: scale(.92); }
    .play:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .play svg { width: 18px; height: 18px; } .play path { fill: currentColor; transition: d .35s cubic-bezier(.4, 0, .2, 1); }
    .stage.on .play .p1 { d: path('M6 4h4v16H6z'); } .stage.on .play .p2 { d: path('M14 4h4v16h-4z'); }
  `,
  html: `
    <div class="stage">
      <div class="art" aria-hidden="true"></div>
      <div class="meta"><b>Midnight City</b><span>M83</span><span class="bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span></div>
      <button class="play" type="button" aria-pressed="false" aria-label="Play"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="p1" d="M7 4l6.5 4v8L7 20z"/><path class="p2" d="M13.5 8l5.5 4-5.5 4z"/></svg></button>
    </div>`,
  init(root) {
    const s = root.querySelector('.stage'), b = root.querySelector('.play');
    b.addEventListener('click', () => { const on = !s.classList.contains('on'); s.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Pause' : 'Play'); });
  },
};
