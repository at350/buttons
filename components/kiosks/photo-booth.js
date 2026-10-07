export default {
  id: 'ks-photo-booth',
  credit: 'Mall photo booth — red curtain, glowing chrome-ringed START button, a 3-2-1 countdown, four flashes and the strip fills in',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 12px; align-items: stretch; padding: 14px; border-radius: 12px; background: linear-gradient(#20242b, #121418); font-family: Unbounded, Inter, system-ui, sans-serif; isolation: isolate; }
    .curtain { width: 34px; border-radius: 4px; background: repeating-linear-gradient(90deg, #b3121b 0 6px, #d72430 6px 9px, #8c0d14 9px 12px); box-shadow: inset -4px 0 8px rgba(0,0,0,.5); }
    .main { position: relative; display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .scr { position: relative; width: 150px; height: 112px; border-radius: 6px; overflow: hidden; background: radial-gradient(ellipse at 50% 40%, #3b4a5c, #151b24 75%); box-shadow: 0 0 0 4px #000, 0 0 0 6px #555; display: grid; place-items: center; }
    .scr img.me { grid-area: 1 / 1; display: block; width: 150px; height: 112px; object-fit: cover; object-position: 50% 30%; transform: scaleX(-1); filter: brightness(.92); }
    .cd { grid-area: 1 / 1; font-size: 52px; font-weight: 800; color: #fff; text-shadow: 0 0 12px rgba(255,255,255,.6); opacity: 0; }
    .cd.on { animation: cd .9s ease-out; }
    @keyframes cd { 0% { opacity: 0; transform: scale(1.6); } 20% { opacity: 1; transform: scale(1); } 80% { opacity: 1; } 100% { opacity: 0; } }
    .flash { position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none; }
    .flash.on { animation: fl .35s ease-out; }
    @keyframes fl { 0% { opacity: 1; } 100% { opacity: 0; } }
    .go { width: 78px; height: 78px; border: 0; border-radius: 50%; cursor: pointer; font: 800 13px/1 Unbounded, Inter, sans-serif; letter-spacing: .04em; color: #fff;
      background: radial-gradient(circle at 50% 35%, #ff6b5a, #e3261a 60%, #9d140c); box-shadow: 0 0 0 5px #d9dbde, 0 0 0 7px #7a7d82, 0 5px 0 7px #2b2d31;
      transition: transform .06s, box-shadow .06s; -webkit-tap-highlight-color: transparent; }
    /* START's glow: two layers behind the button (z-index -1 inside the isolated stage, so under the chrome rings and the screen
       like the original last box-shadow), the resting glow and the peak glow, crossfaded by opacity only (compositor, no per-frame style recalc) */
    .main::before, .main::after { content: ''; position: absolute; left: 50%; top: 124px; width: 78px; height: 78px; margin-left: -39px; border-radius: 50%;
      z-index: -1; pointer-events: none; transition: transform .06s; animation: pulse 1.6s ease-in-out infinite; }
    .main::before { box-shadow: 0 0 18px 8px rgba(255,70,50,.35); animation-name: pulse-rest; }
    .main::after { box-shadow: 0 0 26px 12px rgba(255,70,50,.55); opacity: 0; }
    @keyframes pulse { 50% { opacity: 1; } }
    @keyframes pulse-rest { 50% { opacity: 0; } }
    .go:active { transform: translateY(4px); }
    .main:has(.go:active)::before, .main:has(.go:active)::after { transform: translateY(4px); }
    .go:focus-visible { outline: 2px solid #fff; outline-offset: 11px; }
    .go:disabled { filter: brightness(.6); cursor: default; }
    .main:has(.go:disabled)::before { animation: none; box-shadow: 0 0 18px 8px rgba(153,42,30,.35); } /* the resting glow through brightness(.6) */
    .main:has(.go:disabled)::after { animation: none; }
    /* pressed (transform) or disabled (filter), the original button and its glow paint above the screen: keep that order */
    .main:has(.go:active) .scr, .main:has(.go:disabled) .scr { z-index: -2; }
    .strip { display: flex; flex-direction: column; gap: 4px; padding: 5px; width: 48px; border-radius: 2px; background: #f5f2ea; box-shadow: 0 2px 6px rgba(0,0,0,.5); }
    .strip i { flex: 1; min-height: 38px; border-radius: 1px; background: #d5d0c4; overflow: hidden; }
    .strip i img { display: block; width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.15) brightness(1.05); opacity: 0; transition: opacity .5s ease-out; }
    .strip i.on img { opacity: 1; }
    .strip i:nth-child(2) img { transform: scale(1.18); object-position: 50% 35%; } .strip i:nth-child(3) img { transform: scale(1.1) translateX(-6%); }
    .strip i:nth-child(4) img { transform: scale(1.3); object-position: 50% 30%; }
  `,
  html: `
    <div class="stage">
      <div class="curtain"></div>
      <div class="main">
        <div class="scr"><img class="me" src="assets/portraits/women-03.jpg" alt="" width="150" height="112"><div class="cd" aria-live="polite"></div><div class="flash"></div></div>
        <button class="go" type="button">START</button>
      </div>
      <div class="strip" aria-hidden="true"></div>
    </div>`,
  init(root) {
    const go = root.querySelector('.go'), cd = root.querySelector('.cd'), fl = root.querySelector('.flash'), strip = root.querySelector('.strip');
    const me = '<img src="assets/portraits/women-03.jpg" alt="" width="38" height="38">';
    strip.innerHTML = ('<i>' + me + '</i>').repeat(4);
    const frames = [...strip.children];
    let timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const pop = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
    go.addEventListener('click', () => {
      go.disabled = true; frames.forEach((f) => f.classList.remove('on'));
      [3, 2, 1].forEach((n, i) => at(i * 900, () => { cd.textContent = n; pop(cd, 'on'); }));
      frames.forEach((f, i) => at(2700 + i * 700, () => { pop(fl, 'on'); f.classList.add('on'); }));
      at(2700 + 4 * 700, () => { go.disabled = false; });
    });
    return () => timers.forEach(clearTimeout);
  },
};
