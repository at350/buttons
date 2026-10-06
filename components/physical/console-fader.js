export default {
  id: 'ph-console-fader',
  credit: 'Mixing console channel fader (SSL / Neve style) — 100mm throw, dB scale, drag the cap',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 18px; border-radius: 12px; background: linear-gradient(#4a4e55, #2e3137); }
    .strip { position: relative; width: 64px; height: 208px; border-radius: 4px; background: linear-gradient(90deg, #3d4148, #4a4f57 50%, #3d4148); box-shadow: inset 0 1px 0 rgba(255,255,255,.12), inset 0 -1px 0 rgba(0,0,0,.4); }
    .scale { position: absolute; left: 8px; top: 12px; bottom: 12px; width: 18px; font: 500 8px/1 ui-monospace, Menlo, monospace; color: #d6d9de; text-align: right; }
    .scale span { position: absolute; right: 0; margin-top: -4px; }
    .scale span::after { content: ''; position: absolute; left: 100%; top: 4px; width: 5px; height: 1px; margin-left: 3px; background: #c4c7cc; }
    .slot { position: absolute; left: 40px; top: 12px; bottom: 12px; width: 6px; border-radius: 3px; background: #090a0b; box-shadow: inset 0 1px 3px rgba(0,0,0,1), 0 0 0 1px rgba(255,255,255,.08); }
    .cap {
      position: absolute; left: 29px; width: 28px; height: 46px; margin-top: -23px; border-radius: 3px; cursor: grab; touch-action: none;
      background: linear-gradient(90deg, #1c1d20, #3c3e43 30%, #2a2c30 60%, #141517); 
      box-shadow: 0 4px 6px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.18), inset 0 -1px 0 rgba(0,0,0,.6);
    }
    .cap::before { content: ''; position: absolute; left: 3px; right: 3px; top: 50%; height: 2px; margin-top: -1px; background: #f2f2f2; border-radius: 1px; }
    .cap::after { content: ''; position: absolute; left: 4px; right: 4px; top: 6px; bottom: 6px; border-radius: 2px; background: repeating-linear-gradient(0deg, transparent 0 5px, rgba(255,255,255,.07) 5px 6px); }
    .cap.drag { cursor: grabbing; }
    .cap:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="strip">
        <div class="scale"><span style="top:0">+10</span><span style="top:25%">+5</span><span style="top:50%">0</span><span style="top:70%">-10</span><span style="top:85%">-20</span><span style="top:100%">∞</span></div>
        <div class="slot"></div>
        <div class="cap" role="slider" tabindex="0" aria-label="channel fader" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" style="top:50%"></div>
      </div>
    </div>`,
  init(root) {
    const cap = root.querySelector('.cap'), strip = root.querySelector('.strip');
    let pos = 50, startY = 0, startPos = 0, dragging = false, raf = 0, travel = 1;
    const render = () => { cap.style.top = `calc(12px + (100% - 24px) * ${pos / 100})`; cap.setAttribute('aria-valuenow', Math.round(100 - pos)); };
    cap.addEventListener('pointerdown', (e) => { dragging = true; startY = e.clientY; startPos = pos; travel = strip.getBoundingClientRect().height - 24; cap.setPointerCapture(e.pointerId); cap.classList.add('drag'); });
    cap.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      pos = Math.max(0, Math.min(100, startPos + (e.clientY - startY) / travel * 100));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = () => { dragging = false; cap.classList.remove('drag'); };
    cap.addEventListener('pointerup', end); cap.addEventListener('pointercancel', end);
    cap.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowUp' ? -4 : e.key === 'ArrowDown' ? 4 : 0;
      if (!s) return; e.preventDefault(); pos = Math.max(0, Math.min(100, pos + s)); render();
    });
  },
};
