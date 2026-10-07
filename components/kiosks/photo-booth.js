export default {
  id: 'ks-photo-booth',
  credit: 'Mall photo booth — red curtain, glowing chrome-ringed START button, a 3-2-1 countdown, four flashes and the strip fills in',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 12px; align-items: stretch; padding: 14px; border-radius: 12px; background: linear-gradient(#20242b, #121418); font-family: Unbounded, Inter, system-ui, sans-serif; }
    .curtain { position: relative; width: 38px; border-top: 4px solid #a9adb3; border-radius: 0 0 3px 3px; background: linear-gradient(90deg, rgba(0,0,0,.25), transparent 30%, transparent 70%, rgba(0,0,0,.45)), repeating-linear-gradient(90deg, #6e0910 0, #a8131c 2px, #d92a34 4px, #e8414a 4.6px, #c11d27 5.6px, #8a0d15 7.4px, #6e0910 8px);
      -webkit-mask: radial-gradient(4px 5px at 50% 100%, transparent 98%, #000) 0 0 / 6.5px 100% repeat-x; mask: radial-gradient(4px 5px at 50% 100%, transparent 98%, #000) 0 0 / 6.5px 100% repeat-x; }
    .main { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .scr { position: relative; width: 150px; height: 112px; border-radius: 6px; overflow: hidden; background: radial-gradient(ellipse at 50% 40%, #3b4a5c, #151b24 75%); box-shadow: 0 0 0 4px #000, 0 0 0 6px #555; display: grid; place-items: center; }
    .scr img.me { grid-area: 1 / 1; display: block; width: 150px; height: 112px; object-fit: cover; object-position: 50% 24%; transform: scaleX(-1); }
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
    .strip { display: flex; flex-direction: column; gap: 4px; padding: 5px 5px 14px; width: 50px; border-radius: 1px; background: #f7f5ef; box-shadow: 0 2px 6px rgba(0,0,0,.5); }
    .strip { align-self: center; }
    .strip i { flex: none; height: 44px; background: #ece9e1; overflow: hidden; }
    .strip i img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: 50% 20%; filter: grayscale(1) contrast(1.2) brightness(1.04); opacity: 0; transition: opacity .6s ease-out; }
    .strip i.on img { opacity: 1; }
    .strip i:nth-child(2) img { transform: scale(1.25) rotate(-4deg); } .strip i:nth-child(3) img { transform: scale(1.1) translateX(-8%); }
    .strip i:nth-child(4) img { transform: scale(1.45) translateY(6%); }
  `,
  html: `
    <div class="stage">
      <div class="curtain"></div>
      <div class="main">
        <div class="scr"><img class="me" src="assets/real/booth-sitter-1.jpg" alt="" width="150" height="112"><div class="cd" aria-live="polite"></div><div class="flash"></div></div>
        <button class="go" type="button">START</button>
      </div>
      <div class="strip" aria-hidden="true"></div>
    </div>`,
  init(root) {
    const go = root.querySelector('.go'), cd = root.querySelector('.cd'), fl = root.querySelector('.flash'), strip = root.querySelector('.strip');
    const pic = (f) => `<i class="on"><img src="assets/real/${f}.jpg" alt="" width="40" height="40"></i>`;
    strip.innerHTML = pic('booth-sitter-2').repeat(4);
    const frames = [...strip.children];
    let timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const pop = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
    go.addEventListener('click', () => {
      go.disabled = true; frames.forEach((f) => { f.classList.remove('on'); f.firstChild.src = 'assets/real/booth-sitter-1.jpg'; });
      [3, 2, 1].forEach((n, i) => at(i * 900, () => { cd.textContent = n; pop(cd, 'on'); }));
      frames.forEach((f, i) => at(2700 + i * 700, () => { pop(fl, 'on'); f.classList.add('on'); }));
      at(2700 + 4 * 700, () => { go.disabled = false; });
    });
    return () => timers.forEach(clearTimeout);
  },
};
