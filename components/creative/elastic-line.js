export default {
  id: 'cr-elastic-line',
  credit: 'Elastic SVG underline — a plucked-string quadratic path that follows the cursor and springs back (portfolio footer links)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 260px; height: 130px; max-width: 100%; border-radius: 12px; background: #fafaf9; display: grid; place-items: center; cursor: crosshair; }
    .lnk { position: relative; z-index: 1; cursor: pointer; background: transparent; border: 0; padding: 8px 10px 22px;
      font: 400 28px/1 'Instrument Serif', Georgia, serif; color: #1c1917; letter-spacing: -.01em; white-space: nowrap; }
    .lnk:focus-visible { outline: 2px solid #1c1917; outline-offset: 2px; border-radius: 4px; }
    .lnk.on { color: #ea580c; }
    svg { position: absolute; left: 20px; right: 20px; bottom: 10px; width: calc(100% - 40px); height: 80px; overflow: visible; pointer-events: none; }
    path { fill: none; stroke: #1c1917; stroke-width: 3; stroke-linecap: round; }
    .lnk.on + svg path { stroke: #ea580c; }
  `,
  html: `<div class="stage"><button class="lnk" type="button" aria-pressed="false">Let’s talk</button><svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 Q100 40 200 40"/></svg></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), svg = root.querySelector('svg'), path = root.querySelector('path'), lnk = root.querySelector('.lnk');
    const Y = 40; let cx = 100, cy = Y, vy = 0, raf = 0;
    const draw = () => path.setAttribute('d', 'M0 ' + Y + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' 200 ' + Y);
    stage.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf); raf = 0; vy = 0;
      const r = svg.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width * 200, py = (e.clientY - r.top) / r.height * 80;
      cx = Math.max(10, Math.min(190, px));
      cy = Math.max(Y - 6, Math.min(112, 2 * py - Y)); // the string never rises into the label
      draw();
    });
    const spring = () => {
      vy += (Y - cy) * .14; vy *= .8; cy = Math.max(Y - 6, cy + vy);
      cx += (100 - cx) * .15;
      draw();
      if (Math.abs(vy) > .05 || Math.abs(cy - Y) > .05) raf = requestAnimationFrame(spring);
      else { cy = Y; cx = 100; draw(); raf = 0; }
    };
    stage.addEventListener('mouseleave', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(spring); });
    lnk.addEventListener('click', () => { const on = !lnk.classList.contains('on'); lnk.classList.toggle('on', on); lnk.setAttribute('aria-pressed', String(on)); });
    return () => cancelAnimationFrame(raf);
  },
};
