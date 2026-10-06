export default {
  id: 'mb-robinhood-swipe',
  credit: 'Robinhood — "Swipe up to submit" order sheet: drag the green panel up past the line to submit, it springs back if you let go early',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 240px; max-width: 100%; height: 170px; border-radius: 12px; background: #000; overflow: hidden; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .sum { position: absolute; left: 20px; right: 20px; top: 18px; color: #fff; display: flex; justify-content: space-between; font: 500 15px/1 Inter, system-ui, sans-serif; }
    .sum b { font-weight: 600; color: #00c805; }
    .pan { position: absolute; left: 0; right: 0; top: 70px; height: 170px; border-radius: 22px 22px 0 0; background: #00c805; color: #000; cursor: grab; user-select: none; touch-action: none; -webkit-tap-highlight-color: transparent;
      display: flex; flex-direction: column; align-items: center; padding-top: 14px; gap: 8px; will-change: transform;
      transition: transform .5s linear(0, 0.3 8%, 0.65 16%, 0.9 24%, 1.05 34%, 1.02 48%, 0.99 62%, 1), background .3s; }
    .pan.drag { transition: none; cursor: grabbing; }
    .pan:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
    .pan svg { width: 22px; height: 22px; fill: none; stroke: #000; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; animation: nudge 1.4s ease-in-out infinite; }
    @keyframes nudge { 50% { transform: translateY(-4px); } }
    .pan.drag svg, .stage.done .pan svg { animation: none; }
    .pan span { font-weight: 600; letter-spacing: -.01em; }
    .stage.done .pan { background: #fff; transform: translateY(-62px); }
    .chk { display: none; width: 44px; height: 44px; border-radius: 50%; background: #00c805; place-items: center; margin-top: 6px; }
    .chk svg { width: 22px; height: 22px; stroke: #000; animation: none; }
    .stage.done .chk { display: grid; animation: pop .45s linear(0, 0.5 15%, 1.2 40%, 0.95 65%, 1); }
    .stage.done .hint { display: none; }
    @keyframes pop { from { transform: scale(0); } }
  `,
  html: `
    <div class="stage">
      <div class="sum"><span>Buy 2 TSLA</span><b>$482.10</b></div>
      <div class="pan" role="button" tabindex="0" aria-label="Swipe up to submit order" aria-pressed="false">
        <span class="hint"><svg viewBox="0 0 24 24"><path d="m6 14 6-6 6 6"/></svg></span>
        <span class="lbl">Swipe up to submit</span>
        <span class="chk"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), pan = root.querySelector('.pan'), lbl = root.querySelector('.lbl');
    const LIMIT = 62, THRESH = 40;
    let y0 = 0, dy = 0, drag = false;
    const submit = () => { stage.classList.add('done'); pan.setAttribute('aria-pressed', 'true'); pan.style.transform = ''; lbl.textContent = 'Order submitted'; };
    const reset = () => { stage.classList.remove('done'); pan.setAttribute('aria-pressed', 'false'); pan.style.transform = ''; lbl.textContent = 'Swipe up to submit'; };
    pan.addEventListener('pointerdown', (e) => { if (stage.classList.contains('done')) return; drag = true; y0 = e.clientY; dy = 0; pan.classList.add('drag'); pan.setPointerCapture(e.pointerId); });
    pan.addEventListener('pointermove', (e) => { if (!drag) return; dy = Math.max(0, Math.min(LIMIT + 10, y0 - e.clientY)); pan.style.transform = `translateY(${-dy}px)`; });
    const end = () => { if (!drag) return; drag = false; pan.classList.remove('drag'); if (dy > THRESH) submit(); else pan.style.transform = ''; };
    pan.addEventListener('pointerup', end); pan.addEventListener('pointercancel', end);
    pan.addEventListener('click', () => { if (stage.classList.contains('done')) reset(); });
    pan.addEventListener('keydown', (e) => { if (e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stage.classList.contains('done') ? reset() : submit(); } });
  },
};
