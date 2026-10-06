export default {
  id: 'mb-siri-glow',
  credit: 'Apple Intelligence Siri (iOS 18+) — tap "Type to Siri" and the screen edge lights with the flowing rainbow rim (#BC82F3 · #F5B9EA · #8D9FFF · #FF6778 · #FFBA71 · #C686FF) in layered blurs',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 10px; border-radius: 12px; background: #111; }
    .scr { position: relative; width: 240px; max-width: 100%; height: 170px; border-radius: 30px; overflow: hidden; isolation: isolate;
      background: linear-gradient(rgba(0,0,0,.12), rgba(0,0,0,.12)), #1d4a4f url(assets/tall/01.webp) 50% 40% / cover no-repeat;
      font: 400 15px/1 -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .apps { position: absolute; left: 22px; right: 22px; top: 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px 18px; transition: filter .5s cubic-bezier(.32,.72,0,1), opacity .5s; }
    .apps i { aspect-ratio: 1; border-radius: 11px; display: grid; place-items: center; background: rgba(255,255,255,.16); backdrop-filter: blur(8px) saturate(150%); -webkit-backdrop-filter: blur(8px) saturate(150%); box-shadow: inset 0 .5px 0 rgba(255,255,255,.45), inset 0 0 0 .5px rgba(255,255,255,.18); }
    .apps svg { width: 56%; height: 56%; fill: none; stroke: #fff; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
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
        <div class="apps" aria-hidden="true"><i><svg viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 20.5l1.4-5A8.5 8.5 0 1 1 21 11.5z"/></svg></i><i><svg viewBox="0 0 24 24"><path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2l1.6-2h5.8l1.6 2h2A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.6"/></svg></i><i><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-4.5-4.5L5 21"/></svg></i><i><svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></i><i><svg viewBox="0 0 24 24"><path d="M3 6.5 9 3.5l6 3 6-3v14l-6 3-6-3-6 3z"/><path d="M9 3.5v14M15 6.5v14"/></svg></i><i><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg></i><i><svg viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg></i><i><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg></i></div>
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
