export default {
  id: 'ks-photo-booth',
  credit: 'Mall photo booth — red curtain, glowing chrome-ringed START button, a 3-2-1 countdown, four flashes and the strip fills in',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 12px; align-items: stretch; padding: 14px; border-radius: 12px; background: linear-gradient(#20242b, #121418); font-family: Unbounded, Inter, system-ui, sans-serif; }
    .curtain { width: 34px; border-radius: 4px; background: repeating-linear-gradient(90deg, #b3121b 0 6px, #d72430 6px 9px, #8c0d14 9px 12px); box-shadow: inset -4px 0 8px rgba(0,0,0,.5); }
    .main { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .scr { position: relative; width: 150px; height: 112px; border-radius: 6px; overflow: hidden; background: radial-gradient(ellipse at 50% 40%, #3b4a5c, #151b24 75%); box-shadow: 0 0 0 4px #000, 0 0 0 6px #555; display: grid; place-items: center; }
    .scr svg.me { width: 70px; height: 70px; color: rgba(255,255,255,.22); grid-area: 1 / 1; }
    .cd { grid-area: 1 / 1; font-size: 52px; font-weight: 800; color: #fff; text-shadow: 0 0 12px rgba(255,255,255,.6); opacity: 0; }
    .cd.on { animation: cd .9s ease-out; }
    @keyframes cd { 0% { opacity: 0; transform: scale(1.6); } 20% { opacity: 1; transform: scale(1); } 80% { opacity: 1; } 100% { opacity: 0; } }
    .flash { position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none; }
    .flash.on { animation: fl .35s ease-out; }
    @keyframes fl { 0% { opacity: 1; } 100% { opacity: 0; } }
    .go { width: 78px; height: 78px; border: 0; border-radius: 50%; cursor: pointer; font: 800 13px/1 Unbounded, Inter, sans-serif; letter-spacing: .04em; color: #fff;
      background: radial-gradient(circle at 50% 35%, #ff6b5a, #e3261a 60%, #9d140c); box-shadow: 0 0 0 5px #d9dbde, 0 0 0 7px #7a7d82, 0 5px 0 7px #2b2d31, 0 0 18px 8px rgba(255,70,50,.35);
      transition: transform .06s, box-shadow .06s; animation: pulse 1.6s ease-in-out infinite; -webkit-tap-highlight-color: transparent; }
    @keyframes pulse { 50% { box-shadow: 0 0 0 5px #d9dbde, 0 0 0 7px #7a7d82, 0 5px 0 7px #2b2d31, 0 0 26px 12px rgba(255,70,50,.55); } }
    .go:active { transform: translateY(4px); }
    .go:focus-visible { outline: 2px solid #fff; outline-offset: 11px; }
    .go:disabled { animation: none; filter: brightness(.6); cursor: default; }
    .strip { display: flex; flex-direction: column; gap: 4px; padding: 5px; width: 48px; border-radius: 2px; background: #f5f2ea; box-shadow: 0 2px 6px rgba(0,0,0,.5); }
    .strip i { flex: 1; min-height: 38px; border-radius: 1px; background: #d5d0c4; display: grid; place-items: center; transition: background .3s; }
    .strip i svg { width: 22px; height: 22px; color: #fff; opacity: 0; transition: opacity .3s; }
    .strip i.on svg { opacity: .85; }
    .strip i.on:nth-child(1) { background: linear-gradient(#6d5a4f, #3b2f29); } .strip i.on:nth-child(2) { background: linear-gradient(#5b6670, #2c3238); }
    .strip i.on:nth-child(3) { background: linear-gradient(#77665a, #3f342c); } .strip i.on:nth-child(4) { background: linear-gradient(#636a5d, #30352c); }
  `,
  html: `
    <div class="stage">
      <div class="curtain"></div>
      <div class="main">
        <div class="scr"><svg class="me" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg><div class="cd" aria-live="polite"></div><div class="flash"></div></div>
        <button class="go" type="button">START</button>
      </div>
      <div class="strip" aria-hidden="true"></div>
    </div>`,
  init(root) {
    const go = root.querySelector('.go'), cd = root.querySelector('.cd'), fl = root.querySelector('.flash'), strip = root.querySelector('.strip');
    const me = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>';
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
