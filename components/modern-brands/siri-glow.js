export default {
  id: 'mb-siri-glow',
  credit: 'Apple Intelligence Siri (iOS 18+) — tap "Type to Siri" and the screen edge lights with the flowing rainbow rim (#BC82F3 · #F5B9EA · #8D9FFF · #FF6778 · #FFBA71 · #C686FF) in layered blurs',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 10px; border-radius: 12px; background: #111; }
    .scr { position: relative; width: 240px; max-width: 100%; height: 170px; border-radius: 30px; overflow: hidden; isolation: isolate;
      background: radial-gradient(90% 70% at 20% 10%, #3a4f86 0%, transparent 60%), radial-gradient(80% 70% at 90% 100%, #6b3a6e 0%, transparent 60%), #14141c;
      font: 400 15px/1 -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .apps { position: absolute; left: 22px; right: 22px; top: 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px 18px; transition: filter .5s cubic-bezier(.32,.72,0,1), opacity .5s; }
    .apps i { aspect-ratio: 1; border-radius: 11px; background: rgba(255,255,255,.14); }
    .scr.on .apps { filter: blur(3px); opacity: .6; }
    .glow { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .5s cubic-bezier(.32,.72,0,1); }
    .glow.l1 { filter: none; } .glow.l2 { filter: blur(4px); } .glow.l3 { filter: blur(12px); } .glow.l4 { filter: blur(22px); }
    .scr.on .glow { opacity: 1; }
    .scr.on .glow.l4 { opacity: .8; }
    .ring { position: absolute; inset: 0; border-radius: 30px; overflow: hidden; padding: var(--w);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
      transition: padding .6s cubic-bezier(.32,.72,0,1); }
    .l1 .ring { --w: 2px; } .l2 .ring { --w: 5px; } .l3 .ring { --w: 10px; } .l4 .ring { --w: 18px; }
    .scr:not(.on) .ring { padding: 0; }
    .spin { position: absolute; left: 50%; top: 50%; width: 300px; height: 300px; margin: -150px 0 0 -150px;
      background: conic-gradient(from 0deg, #bc82f3, #f5b9ea, #8d9fff, #aa6eee, #ff6778, #ffba71, #c686ff, #bc82f3);
      animation: rot 3.2s linear infinite; animation-play-state: paused; }
    .l2 .spin { animation-duration: 2.6s; animation-direction: reverse; } .l3 .spin { animation-duration: 4s; } .l4 .spin { animation-duration: 5s; animation-direction: reverse; }
    .scr.on .spin { animation-play-state: running; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .bar { position: absolute; left: 14px; right: 14px; bottom: 14px; height: 40px; border-radius: 20px; border: 0; padding: 0 16px; cursor: pointer; z-index: 2; text-align: left; color: rgba(255,255,255,.62); font: inherit;
      background: rgba(255,255,255,.14); backdrop-filter: blur(16px) saturate(160%); -webkit-backdrop-filter: blur(16px) saturate(160%);
      box-shadow: inset 0 .5px 0 rgba(255,255,255,.35), inset 0 0 0 .5px rgba(255,255,255,.12); display: grid; align-items: center;
      transition: transform .45s cubic-bezier(.32,.72,0,1), background .3s, box-shadow .4s; -webkit-tap-highlight-color: transparent; }
    .bar > span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .25s; }
    .bar .b { opacity: 0; color: #fff; }
    .bar:hover { background: rgba(255,255,255,.2); }
    .bar:active { transform: scale(.97); }
    .bar:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .scr.on .bar { background: rgba(20,20,28,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.25), 0 0 18px rgba(188,130,243,.55), 0 0 6px rgba(255,103,120,.45); }
    .scr.on .bar .a { opacity: 0; } .scr.on .bar .b { opacity: 1; }
    .caret { display: inline-block; width: 2px; height: 18px; margin-left: 2px; vertical-align: -3px; background: #bc82f3; animation: blink 1s steps(1) infinite; }
    @keyframes blink { 50% { opacity: 0; } }
  `,
  html: `
    <div class="stage">
      <div class="scr">
        <div class="apps" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="glow l4" aria-hidden="true"><div class="ring"><div class="spin"></div></div></div>
        <div class="glow l3" aria-hidden="true"><div class="ring"><div class="spin"></div></div></div>
        <div class="glow l2" aria-hidden="true"><div class="ring"><div class="spin"></div></div></div>
        <div class="glow l1" aria-hidden="true"><div class="ring"><div class="spin"></div></div></div>
        <button class="bar" type="button" aria-pressed="false"><span class="a">Type to Siri</span><span class="b">Ask Siri…<i class="caret"></i></span></button>
      </div>
    </div>`,
  init(root) {
    const scr = root.querySelector('.scr'), bar = root.querySelector('.bar');
    const set = (on) => { scr.classList.toggle('on', on); bar.setAttribute('aria-pressed', String(on)); };
    bar.addEventListener('click', () => set(!scr.classList.contains('on')));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  },
};
