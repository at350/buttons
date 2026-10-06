function drag(el, onPos) {
  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    el.setPointerCapture(e.pointerId); el.classList.add('active'); onPos(e); e.preventDefault();
    const mv = (ev) => onPos(ev);
    const up = () => { el.classList.remove('active'); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
}

// Figma (UI3) color picker strips: a full-round hue strip over the 0–360° spectrum and the opacity strip
// (checkerboard under a transparent → current-hue ramp) beneath it, each with Figma's hollow white ring thumb
// (3px white border + hairline dark ring + soft shadow) and the 12px Inter value readout of the hex + opacity.
export default {
  id: 'in-hue-slider',
  credit: 'Figma color picker — hue strip + checkerboard opacity strip with hollow white ring thumbs and the hex / % readout',
  size: 'wide',
  css: `
    :host { display: block; }
    .p {
      width: 248px; max-width: 100%; margin: 0 auto; padding: 12px 16px 12px; border-radius: 13px; background: #fff;
      box-shadow: 0 0 .5px rgba(0,0,0,.18), 0 3px 8px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1); font: 400 11px/16px Inter, system-ui, sans-serif; color: #000;
    }
    .sl { position: relative; height: 16px; margin: 0 0 10px; touch-action: none; user-select: none; cursor: default; }
    .strip { position: absolute; inset: 0; border-radius: 8px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); }
    .hue .strip { background: linear-gradient(to right, #f00 0%, #ff0 16.67%, #0f0 33.33%, #0ff 50%, #00f 66.67%, #f0f 83.33%, #f00 100%); }
    .op .strip {
      background:
        linear-gradient(to right, hsla(var(--h), 100%, 50%, 0), hsl(var(--h), 100%, 50%)),
        conic-gradient(#e6e6e6 25%, #fff 0 50%, #e6e6e6 0 75%, #fff 0) 0 0 / 8px 8px;
    }
    .th {
      position: absolute; top: 0; width: 16px; height: 16px; margin-left: -8px; border-radius: 50%; padding: 0; background: transparent; cursor: default;
      border: 3px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.1), inset 0 0 0 1px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3);
      transition: transform .1s ease; outline: 0; -webkit-tap-highlight-color: transparent;
    }
    .hue .th { left: calc(8px + (100% - 16px) * var(--f)); }
    .op .th { left: calc(8px + (100% - 16px) * var(--a)); }
    .sl.active .th { transform: scale(1.12); }
    .th:focus-visible { box-shadow: 0 0 0 2px #0d99ff, 0 1px 3px rgba(0,0,0,.3); }
    .row { display: flex; align-items: center; gap: 8px; height: 24px; padding: 0 8px; border-radius: 5px; background: #f5f5f5; }
    .sw { width: 14px; height: 14px; border-radius: 3px; background: hsl(var(--h), 100%, 50%); box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); }
    .hex { flex: 1; font-variant-numeric: tabular-nums; text-transform: uppercase; }
    .pc { width: 38px; text-align: right; font-variant-numeric: tabular-nums; color: rgba(0,0,0,.9); }
  `,
  html: `<div class="p" style="--f:.55;--h:198;--a:1">
    <div class="sl hue"><div class="strip"></div><button class="th" type="button" role="slider" aria-valuemin="0" aria-valuemax="360" aria-valuenow="198" aria-label="Hue"></button></div>
    <div class="sl op"><div class="strip"></div><button class="th" type="button" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-label="Opacity"></button></div>
    <div class="row"><span class="sw"></span><span class="hex">00B7FF</span><span class="pc">100%</span></div>
  </div>`,
  init(root) {
    const p = root.querySelector('.p'), hue = root.querySelector('.hue'), op = root.querySelector('.op');
    const [th, to] = root.querySelectorAll('.th'), hex = root.querySelector('.hex'), pc = root.querySelector('.pc');
    let h = 198, a = 100;
    const toHex = (hh) => {
      const f = (n) => { const k = (n + hh / 30) % 12; const c = 0.5 - 0.5 * Math.max(-1, Math.min(k - 3, 9 - k, 1)); return Math.round(c * 255).toString(16).padStart(2, '0'); };
      return f(0) + f(8) + f(4);
    };
    const paint = () => {
      p.style.setProperty('--f', h / 360); p.style.setProperty('--h', h); p.style.setProperty('--a', a / 100);
      th.setAttribute('aria-valuenow', h); to.setAttribute('aria-valuenow', a);
      hex.textContent = toHex(h).toUpperCase(); pc.textContent = a + '%';
    };
    const pos = (el, e) => { const r = el.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - r.left - 8) / (r.width - 16))); };
    drag(hue, (e) => { h = Math.round(pos(hue, e) * 360); paint(); });
    drag(op, (e) => { a = Math.round(pos(op, e) * 100); paint(); });
    th.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key]; if (d) { e.preventDefault(); h = Math.max(0, Math.min(360, h + d * (e.shiftKey ? 10 : 1))); paint(); } });
    to.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key]; if (d) { e.preventDefault(); a = Math.max(0, Math.min(100, a + d * (e.shiftKey ? 10 : 1))); paint(); } });
    paint();
  },
};
