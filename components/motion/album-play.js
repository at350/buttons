// Apple Music now playing — the signature move: pausing shrinks the artwork back into the card and drops its shadow,
// playing springs it forward to full size. Spring response .5s / damping .7 → linear(). SF-style filled transport
// glyphs (play/pause morph via matching path commands; skip glyphs from Phosphor fill).
const SPRING = 'linear(0, 0.044, 0.144, 0.278, 0.422, 0.555, 0.68, 0.785, 0.867, 0.932, 0.98, 1.012, 1.031, 1.041, 1.045, 1.043, 1.039, 1.033, 1.027, 1.021, 1.015, 1.01, 1.007, 1.003, 1.001, 1, 0.999, 0.998, 0.998, 0.998, 0.998, 0.998, 1)';

export default {
  id: 'mo-album-play',
  credit: 'Apple Music now playing — pause and the artwork sinks back to ~84% with a flatter shadow, play and it springs forward to full size',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; width: 290px; height: 128px; max-width: 100%; border-radius: 12px; display: flex; align-items: center; gap: 14px; padding: 0 16px 0 14px; overflow: hidden;
      background: radial-gradient(120% 140% at 0% 0%, #4b2a6b 0%, transparent 60%), radial-gradient(120% 140% at 100% 100%, #13305a 0%, transparent 60%), #1a1626;
      font-family: system-ui, -apple-system, 'SF Pro Text', Inter, sans-serif; color: #fff;
    }
    .art {
      position: relative; display: block; width: 96px; height: 96px; flex: none; border-radius: 8px; overflow: hidden; object-fit: cover; background: #2a2438;
      transform: scale(.84); box-shadow: 0 4px 10px -4px rgba(0,0,0,.45); transition: transform .8s ${SPRING}, box-shadow .6s ease;
    }
    .stage.on .art { transform: none; box-shadow: 0 14px 28px -10px rgba(0,0,0,.65); }
    .meta { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .meta b { font-size: 15px; font-weight: 600; letter-spacing: -.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .meta .ar { font-size: 13px; color: rgba(255,255,255,.6); margin-top: 1px; }
    .bar { position: relative; height: 4px; margin-top: 10px; border-radius: 2px; background: rgba(255,255,255,.2); overflow: hidden; }
    .bar i { position: absolute; inset: 0; transform-origin: left; transform: scaleX(.3); background: rgba(255,255,255,.75); animation: prog 240s linear forwards paused; }
    .stage.on .bar i { animation-play-state: running; }
    @keyframes prog { from { transform: scaleX(.3); } to { transform: scaleX(1); } }
    .ctl { display: flex; align-items: center; justify-content: space-between; margin-top: 6px; padding: 0 2px; }
    .ctl button { width: 36px; height: 36px; border-radius: 50%; border: 0; background: transparent; color: #fff; display: grid; place-items: center; cursor: pointer; transition: background .2s, transform .35s ${SPRING}; }
    .ctl button:hover { background: rgba(255,255,255,.1); } .ctl button:active { transform: scale(.86); background: rgba(255,255,255,.18); }
    .ctl button:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
    .ctl .sk svg { width: 20px; height: 20px; fill: currentColor; }
    .play svg { width: 26px; height: 26px; }
    .play path { fill: currentColor; stroke: currentColor; stroke-width: 2.2; stroke-linejoin: round; transition: d .32s cubic-bezier(.32, .72, 0, 1); }
    .stage.on .play .p1 { d: path('M6.5 4.5 L10.5 4.5 L10.5 19.5 L6.5 19.5 Z'); }
    .stage.on .play .p2 { d: path('M13.5 4.5 L17.5 4.5 L17.5 19.5 L13.5 19.5 Z'); }
  `,
  html: `
    <div class="stage">
      <img class="art" src="assets/real/album-m83-hurry-up-were-dreaming.jpg" alt="" width="96" height="96">
      <div class="meta">
        <b>Midnight City</b><span class="ar">M83</span>
        <span class="bar" aria-hidden="true"><i></i></span>
        <div class="ctl">
          <button class="sk" type="button" aria-label="Previous"><svg viewBox="0 0 256 256" aria-hidden="true"><path d="M208,47.88V208.12a16,16,0,0,1-24.43,13.43L64,146.77V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0v69.23L183.57,34.45A15.95,15.95,0,0,1,208,47.88Z"/></svg></button>
          <button class="play" type="button" aria-pressed="false" aria-label="Play"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="p1" d="M7 4.5 L13 8.2 L13 15.8 L7 19.5 Z"/><path class="p2" d="M13 8.2 L19 12 L19 12 L13 15.8 Z"/></svg></button>
          <button class="sk" type="button" aria-label="Next"><svg viewBox="0 0 256 256" aria-hidden="true"><path d="M208,40V216a8,8,0,0,1-16,0V146.77L72.43,221.55A15.95,15.95,0,0,1,48,208.12V47.88A15.95,15.95,0,0,1,72.43,34.45L192,109.23V40a8,8,0,0,1,16,0Z"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const s = root.querySelector('.stage'), b = root.querySelector('.play');
    b.addEventListener('click', () => { const on = !s.classList.contains('on'); s.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Pause' : 'Play'); });
  },
};
