// iOS "slide to power off": a frosted capsule on the dimmed wallpaper, white knob carrying a red power glyph,
// shimmering "slide to power off" label that fades as the knob travels; releasing early springs back
// (iOS spring cubic-bezier(.32,.72,0,1)), reaching the end powers off: the screen goes black with the
// 8-spoke activity indicator, then comes back.
export default {
  id: 'in-slide-confirm',
  credit: 'Apple iOS "slide to power off" — frosted capsule, white knob with red power glyph, shimmering label, spring-back',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage {
      position: relative; isolation: isolate; width: 320px; max-width: 100%; margin: 0 auto; padding: 22px 18px; border-radius: 12px; overflow: hidden; background: #1c2230;
    }
    .stage::before { content: ''; position: absolute; inset: -24px; z-index: -1; background: url(assets/wide/02.webp) center / cover; filter: blur(12px) brightness(.55); }
    .track {
      position: relative; height: 62px; border-radius: 31px; background: rgba(255,255,255,.22);
      -webkit-backdrop-filter: blur(20px) saturate(1.6); backdrop-filter: blur(20px) saturate(1.6);
      user-select: none; touch-action: none; transition: opacity .35s ease;
    }
    .lbl {
      position: absolute; inset: 0 0 0 62px; display: grid; place-items: center; white-space: nowrap; pointer-events: none;
      font: 400 19px/1 system-ui, -apple-system, "SF Pro Text", sans-serif; letter-spacing: -.01em;
      --shine: linear-gradient(100deg, rgba(255,255,255,.45) 40%, #fff 50%, rgba(255,255,255,.45) 60%);
      color: transparent; background: var(--shine) 0 0 / 300% 100%;
      -webkit-background-clip: text; background-clip: text; animation: shine 2.6s linear infinite;
      opacity: calc(1 - var(--p, 0) * 2.2);
    }
    @keyframes shine { from { background-position: 100% 0; } to { background-position: 0 0; } }
    /* Same shine on the compositor: the label's glyphs become the mask and a 3x-wide copy of the gradient slides under
       them with transform (no per-frame style recalc). Browsers without mask-clip:text keep the version above. */
    @supports (-webkit-mask-clip: text) {
      .lbl { overflow: hidden; background: none; animation: none; -webkit-mask-image: linear-gradient(#000, #000); -webkit-mask-clip: text; }
      .lbl::before { content: ''; position: absolute; top: 0; left: 0; width: 300%; height: 100%; background: var(--shine); animation: shine-x 2.6s linear infinite; }
      @keyframes shine-x { from { transform: translateX(-66.6667%); } to { transform: none; } }
    }
    .knob {
      position: absolute; top: 4px; left: 4px; width: 54px; height: 54px; border-radius: 50%; border: 0; padding: 0; background: #fff;
      display: grid; place-items: center; cursor: grab; color: #ff3b30; box-shadow: 0 1px 4px rgba(0,0,0,.18);
      transform: translateX(var(--x, 0px)); transition: transform .45s cubic-bezier(.32,.72,0,1);
      -webkit-tap-highlight-color: transparent;
    }
    .knob:hover { box-shadow: 0 2px 10px rgba(0,0,0,.28); }
    .track.drag .knob { transition: none; cursor: grabbing; }
    .knob:focus-visible { outline: 3px solid rgba(255,255,255,.85); outline-offset: 3px; }
    .knob svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .black { position: absolute; inset: 0; background: #000; opacity: 0; pointer-events: none; transition: opacity .5s ease; display: grid; place-items: center; }
    .stage.off .black { opacity: 1; }
    .stage.off .track { opacity: 0; }
    .spin { width: 26px; height: 26px; animation: step 1s steps(8) infinite; }
    .spin rect { fill: #fff; }
    @keyframes step { to { transform: rotate(360deg); } }
  `,
  html: `<div class="stage">
    <div class="track">
      <span class="lbl">slide to power off</span>
      <button class="knob" type="button" aria-pressed="false" aria-label="Slide to power off"><svg viewBox="0 0 24 24"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg></button>
    </div>
    <div class="black" aria-hidden="true"><svg class="spin" viewBox="0 0 24 24">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => '<rect x="10.75" y="1.5" width="2.5" height="6.5" rx="1.25" opacity="' + (1 - i * 0.1).toFixed(2) + '" transform="rotate(' + (-i * 45) + ' 12 12)"/>').join('')}</svg></div>
  </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), track = root.querySelector('.track'), knob = root.querySelector('.knob');
    const max = () => Math.max(1, track.clientWidth - 62);
    let x = 0, startX = 0, startPos = 0, timer = 0;
    const setX = (n) => { x = n; track.style.setProperty('--x', n + 'px'); track.style.setProperty('--p', (n / max()).toFixed(3)); };
    const powerOff = () => {
      setX(max()); knob.setAttribute('aria-pressed', 'true'); stage.classList.add('off');
      clearTimeout(timer);
      timer = setTimeout(() => { stage.classList.remove('off'); setX(0); knob.setAttribute('aria-pressed', 'false'); }, 1800);
    };
    knob.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || stage.classList.contains('off')) return;
      knob.setPointerCapture(e.pointerId); track.classList.add('drag');
      startX = e.clientX; startPos = x; e.preventDefault();
    });
    knob.addEventListener('pointermove', (e) => {
      if (!track.classList.contains('drag')) return;
      setX(Math.max(0, Math.min(max(), startPos + e.clientX - startX)));
    });
    const end = (ok) => {
      if (!track.classList.contains('drag')) return;
      track.classList.remove('drag');
      if (ok && x / max() > 0.92) powerOff(); else setX(0);
    };
    knob.addEventListener('pointerup', () => end(true));
    knob.addEventListener('pointercancel', () => end(false));
    knob.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); powerOff(); }
    });
    return () => clearTimeout(timer);
  },
};
