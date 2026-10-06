export default {
  id: 'mn-ios-segmented',
  credit: 'Apple iOS 13+ UISegmentedControl — sliding thumb, spring motion, press-to-shrink, drag between segments',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .stage { padding: 14px 16px; border-radius: 12px; background: #fff; }
    .seg { --n: 3; --i: 0; position: relative; display: grid; grid-template-columns: repeat(var(--n), 1fr); width: 300px; max-width: 100%; height: 32px; padding: 2px; border-radius: 9px;
      background: rgba(118,118,128,.12); font: 400 13px/16px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; letter-spacing: -.08px; color: #000;
      -webkit-font-smoothing: antialiased; user-select: none; -webkit-user-select: none; touch-action: none; }
    .thumb { position: absolute; top: 2px; left: 2px; height: 28px; width: calc((100% - 4px) / var(--n)); border-radius: 7px; background: #fff; pointer-events: none;
      box-shadow: 0 3px 8px rgba(0,0,0,.12), 0 3px 1px rgba(0,0,0,.04), 0 0 0 .5px rgba(0,0,0,.04);
      transform: translateX(calc(var(--i) * 100%)) scale(var(--s, 1)); transition: transform .35s cubic-bezier(.32,.72,0,1); }
    .s { position: relative; z-index: 1; height: 28px; padding: 0 8px; border: 0; border-radius: 7px; background: none; font: inherit; color: inherit; cursor: pointer; outline: 0; white-space: nowrap; display: grid; place-items: center; }
    .s span { transition: opacity .2s; }
    .s b { grid-area: 1 / 1; font-weight: 400; transition: opacity .2s; }
    .s b + b { font-weight: 600; opacity: 0; }
    .s[aria-checked="true"] b { opacity: 0; }
    .s[aria-checked="true"] b + b { opacity: 1; }
    .s.press:not([aria-checked="true"]) b { opacity: .35; }
    .s:focus-visible { box-shadow: 0 0 0 3px rgba(0,122,255,.5); }
    .s::before { content: ""; position: absolute; left: -.5px; top: 8px; width: 1px; height: 12px; border-radius: .5px; background: rgba(142,142,147,.3); transition: opacity .2s; }
    .s:first-of-type::before, .s[aria-checked="true"]::before, .s[aria-checked="true"] + .s::before { opacity: 0; }
  `,
  html: `
    <div class="stage"><div class="seg" role="radiogroup" aria-label="Map type">
      <span class="thumb"></span>
      <button class="s" type="button" role="radio" aria-checked="true"><b>Map</b><b aria-hidden="true">Map</b></button>
      <button class="s" type="button" role="radio" aria-checked="false" tabindex="-1"><b>Transit</b><b aria-hidden="true">Transit</b></button>
      <button class="s" type="button" role="radio" aria-checked="false" tabindex="-1"><b>Satellite</b><b aria-hidden="true">Satellite</b></button>
    </div></div>`,
  init(root) {
    const seg = root.querySelector('.seg'), segs = [...root.querySelectorAll('.s')];
    let cur = 0, drag = null;
    const select = (i) => {
      cur = i; seg.style.setProperty('--i', i);
      segs.forEach((s, j) => { s.setAttribute('aria-checked', String(i === j)); s.tabIndex = i === j ? 0 : -1; });
    };
    const at = (x) => { const r = seg.getBoundingClientRect(); return Math.max(0, Math.min(segs.length - 1, Math.floor((x - r.left - 2) / ((r.width - 4) / segs.length)))); };
    seg.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const i = at(e.clientX);
      // iOS: touching the selected segment shrinks the thumb and lets you drag it; touching another dims its label
      drag = { i, onThumb: i === cur, id: e.pointerId };
      if (drag.onThumb) seg.style.setProperty('--s', '.95'); else segs[i].classList.add('press');
      try { seg.setPointerCapture(e.pointerId); } catch (err) { /* synthetic events */ }
    });
    seg.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const i = at(e.clientX);
      if (drag.onThumb) { if (i !== cur) select(i); }
      else if (i !== drag.i) { segs[drag.i].classList.remove('press'); drag.i = i; if (i !== cur) segs[i].classList.add('press'); }
    });
    const end = (e, commit) => {
      if (!drag) return;
      seg.style.setProperty('--s', '1');
      segs.forEach((s) => s.classList.remove('press'));
      if (commit && !drag.onThumb) select(drag.i);
      drag = null;
    };
    seg.addEventListener('pointerup', (e) => end(e, true));
    seg.addEventListener('pointercancel', (e) => end(e, false));
    segs.forEach((s, i) => {
      s.addEventListener('click', (e) => { if (e.detail === 0) select(i); });
      s.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + segs.length) % segs.length;
        select(n); segs[n].focus({ preventScroll: true });
      });
    });
  },
};
