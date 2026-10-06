export default {
  id: 'mb-slack-huddle',
  credit: 'Slack — channel header huddle split button: the headphones toggle turns Slack green with a live wave when you join, and the caret opens the huddle menu',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; max-width: 100%; height: 56px; padding: 0 12px 0 14px; border-radius: 12px; background: #fff; border: 1px solid #e2e2e2; display: flex; align-items: center; gap: 10px;
      font: 900 18px/1 Lato, "Slack-Lato", Inter, -apple-system, system-ui, sans-serif; color: #1d1c1d; }
    .ch { display: inline-flex; align-items: center; gap: 3px; margin-right: auto; font-weight: 800; font-size: 17px; }
    .ch svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; }
    .wrap { position: relative; }
    .hud { display: inline-flex; align-items: stretch; height: 28px; border-radius: 8px; box-shadow: inset 0 0 0 1px rgba(29,28,29,.3); background: #fff; transition: background .15s, box-shadow .15s; }
    .hud.on { background: #007a5a; box-shadow: none; }
    .tg, .cv { border: 0; background: transparent; color: #1d1c1d; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font: 700 13px/1 Lato, "Slack-Lato", Inter, system-ui, sans-serif;
      transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; }
    .tg { padding: 0 8px; border-radius: 8px 0 0 8px; }
    .cv { padding: 0 5px; border-radius: 0 8px 8px 0; box-shadow: inset 1px 0 0 rgba(29,28,29,.3); }
    .tg:hover, .cv:hover, .cv[aria-expanded="true"] { background: #f8f8f8; }
    .hud.on .tg, .hud.on .cv { color: #fff; }
    .hud.on .cv { box-shadow: inset 1px 0 0 rgba(255,255,255,.35); }
    .hud.on .tg:hover, .hud.on .cv:hover, .hud.on .cv[aria-expanded="true"] { background: #148567; }
    .tg:focus-visible, .cv:focus-visible, .mi:focus-visible { outline: none; box-shadow: 0 0 0 1px #1264a3, 0 0 0 5px rgba(29,155,209,.3); position: relative; }
    .tg svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .cv svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: transform .2s; }
    .cv[aria-expanded="true"] svg { transform: rotate(180deg); }
    .ico { display: grid; width: 18px; height: 18px; place-items: center; }
    .ico > * { grid-area: 1 / 1; }
    .wave { display: flex; gap: 2px; align-items: center; height: 14px; opacity: 0; }
    .wave i { width: 2.5px; height: 4px; border-radius: 2px; background: #fff; animation: w .7s ease-in-out infinite alternate; animation-play-state: paused; }
    .wave i:nth-child(2) { animation-delay: -.2s; } .wave i:nth-child(3) { animation-delay: -.45s; } .wave i:nth-child(4) { animation-delay: -.1s; }
    @keyframes w { from { height: 4px; } to { height: 14px; } }
    .hud.on .wave { opacity: 1; } .hud.on .wave i { animation-play-state: running; } .hud.on .tg svg { opacity: 0; }
    .lbl { display: grid; } .lbl span { grid-area: 1 / 1; white-space: nowrap; } .lbl .b { visibility: hidden; }
    .hud.on .lbl .a { visibility: hidden; } .hud.on .lbl .b { visibility: visible; }
    .menu { position: absolute; right: 0; top: calc(100% + 6px); width: 210px; padding: 8px 0; border-radius: 8px; background: #fff; z-index: 2;
      box-shadow: 0 0 0 1px rgba(29,28,29,.13), 0 4px 12px rgba(0,0,0,.12); font: 400 15px/1 Lato, "Slack-Lato", Inter, system-ui, sans-serif;
      opacity: 0; visibility: hidden; transform: translateY(-4px); transition: opacity .12s, transform .12s, visibility 0s .12s; }
    .menu.on { opacity: 1; visibility: visible; transform: none; transition: opacity .12s, transform .12s; }
    .mi { display: flex; align-items: center; gap: 10px; width: 100%; height: 30px; padding: 0 20px; border: 0; background: transparent; color: #1d1c1d; font: inherit; cursor: pointer; text-align: left; }
    .mi:hover { background: #1264a3; color: #fff; }
    .mi svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="stage">
      <span class="ch"><svg viewBox="0 0 24 24"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>design</span>
      <div class="wrap">
        <div class="hud">
          <button class="tg" type="button" aria-pressed="false" aria-label="Start huddle in design"><span class="ico"><svg viewBox="0 0 24 24"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg><span class="wave"><i></i><i></i><i></i><i></i></span></span><span class="lbl"><span class="a">Huddle</span><span class="b">Leave</span></span></button>
          <button class="cv" type="button" aria-expanded="false" aria-haspopup="menu" aria-label="Huddle options"><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
        </div>
        <div class="menu" role="menu">
          <button class="mi" type="button" role="menuitem"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>Copy huddle link</button>
          <button class="mi" type="button" role="menuitem"><svg viewBox="0 0 24 24"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>Start with video</button>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const hud = root.querySelector('.hud'), tg = root.querySelector('.tg'), cv = root.querySelector('.cv'), menu = root.querySelector('.menu');
    const join = (on) => { tg.setAttribute('aria-pressed', String(on)); hud.classList.toggle('on', on); tg.setAttribute('aria-label', on ? 'Leave huddle' : 'Start huddle in design'); };
    const open = (on) => { cv.setAttribute('aria-expanded', String(on)); menu.classList.toggle('on', on); host.toggleAttribute('data-open', on); };
    tg.addEventListener('click', () => join(tg.getAttribute('aria-pressed') !== 'true'));
    cv.addEventListener('click', () => open(cv.getAttribute('aria-expanded') !== 'true'));
    root.querySelectorAll('.mi').forEach((m, i) => m.addEventListener('click', () => { open(false); if (i === 1) join(true); cv.focus(); }));
    const outside = (e) => { if (cv.getAttribute('aria-expanded') === 'true' && !e.composedPath().includes(host)) open(false); };
    document.addEventListener('pointerdown', outside);
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && cv.getAttribute('aria-expanded') === 'true') { open(false); cv.focus(); } });
    return () => { document.removeEventListener('pointerdown', outside); host.removeAttribute('data-open'); };
  },
};
