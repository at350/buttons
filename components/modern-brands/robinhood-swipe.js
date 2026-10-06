export default {
  id: 'mb-robinhood-swipe',
  credit: 'Robinhood — order review "Swipe up to submit": drag the green sheet past the line to send the order, it springs back if you let go early (↑ / Enter also work)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 248px; max-width: 100%; height: 186px; border-radius: 12px; background: #000; overflow: hidden; font: 500 14px/1.2 Inter, -apple-system, system-ui, sans-serif; color: #fff; }
    .top { position: absolute; left: 18px; right: 18px; top: 16px; display: flex; align-items: center; justify-content: space-between; }
    .top svg { width: 20px; height: 20px; fill: #ccff00; }
    .top small { color: #8a8a8e; font-size: 12px; }
    .sum { position: absolute; left: 18px; right: 18px; top: 48px; display: grid; gap: 6px; }
    .sum div { display: flex; justify-content: space-between; font-size: 13px; color: #c7c7cc; }
    .sum b { color: #fff; font-weight: 600; font-variant-numeric: tabular-nums; }
    .pan { position: absolute; left: 0; right: 0; top: 112px; height: 180px; border-radius: 20px 20px 0 0; background: #00c805; color: #000; cursor: grab; user-select: none; touch-action: none; -webkit-tap-highlight-color: transparent;
      display: flex; flex-direction: column; align-items: center; padding-top: 12px; gap: 4px; will-change: transform;
      transition: transform .5s linear(0, 0.22 6%, 0.6 15%, 0.88 25%, 1.03 35%, 1.06 43%, 1.03 55%, 0.995 72%, 1), background .3s; }
    .pan.drag { transition: none; cursor: grabbing; }
    .pan:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
    .pan svg { width: 22px; height: 22px; fill: none; stroke: #000; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .hint { height: 22px; animation: nudge 1.4s ease-in-out infinite; }
    @keyframes nudge { 50% { transform: translateY(-4px); } }
    .pan.drag .hint { animation: none; }
    .lbl { display: grid; font-weight: 600; letter-spacing: -.01em; }
    .lbl span { grid-area: 1 / 1; text-align: center; white-space: nowrap; transition: opacity .2s; }
    .lbl .b { opacity: 0; }
    .stage.done .pan { transform: translateY(-58px); }
    .stage.done .lbl .a, .stage.done .hint { opacity: 0; } .stage.done .lbl .b { opacity: 1; }
    .chk { width: 40px; height: 40px; border-radius: 50%; background: #000; display: grid; place-items: center; margin-top: 8px; transform: scale(0); }
    .chk svg { stroke: #00c805; }
    .stage.done .chk { transform: scale(1); transition: transform .45s .1s cubic-bezier(.34,1.56,.64,1); }
  `,
  html: `
    <div class="stage">
      <div class="top"><svg viewBox="0 0 24 24" role="img" aria-label="Robinhood"><path d="M2.84 24h.53c.096 0 .192-.048.224-.128C7.591 13.696 11.94 8.656 14.67 5.638c.112-.128.064-.225-.096-.225h-4.88a.55.55 0 0 0-.45.225L5.746 9.972c-.514.642-.642 1.236-.642 2.086v4.43c-1.14 3.194-1.862 5.361-2.392 7.32-.032.125.016.192.129.192M20.447.646c-.754-.802-4.157-.834-5.73-.224a3 3 0 0 0-.786.465 41 41 0 0 0-3.323 3.178c-.112.113-.064.225.097.225h5.409c.497 0 .786.289.786.786v6.1c0 .16.128.208.225.064l3.258-4.254c.53-.69.69-.898.835-1.861.192-1.413.08-3.58-.77-4.479m-6.982 16.18 2.231-3.676a.7.7 0 0 0 .064-.29V6.73c0-.16-.112-.225-.224-.097-3.355 3.74-5.971 7.672-8.395 12.407-.06.12.016.225.16.177l5.009-1.54c.565-.174.882-.402 1.155-.852"/></svg><small>Market order</small></div>
      <div class="sum"><div><span>Buy TSLA</span><b>2 shares</b></div><div><span>Estimated cost</span><b>$482.10</b></div></div>
      <div class="pan" role="button" tabindex="0" aria-label="Swipe up to submit order" aria-pressed="false">
        <span class="hint"><svg viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg></span>
        <span class="lbl"><span class="a">Swipe up to submit</span><span class="b">Order submitted</span></span>
        <span class="chk"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), pan = root.querySelector('.pan');
    const LIMIT = 58, THRESH = 36;
    let y0 = 0, dy = 0, drag = false;
    const submit = () => { stage.classList.add('done'); pan.setAttribute('aria-pressed', 'true'); pan.style.transform = ''; };
    const reset = () => { stage.classList.remove('done'); pan.setAttribute('aria-pressed', 'false'); pan.style.transform = ''; };
    pan.addEventListener('pointerdown', (e) => { if (stage.classList.contains('done')) return; drag = true; y0 = e.clientY; dy = 0; pan.classList.add('drag'); pan.setPointerCapture(e.pointerId); });
    pan.addEventListener('pointermove', (e) => { if (!drag) return; const raw = y0 - e.clientY; dy = Math.max(0, raw > LIMIT ? LIMIT + (raw - LIMIT) * .2 : raw); dy = Math.min(dy, LIMIT + 8); pan.style.transform = `translateY(${-dy}px)`; });
    const end = () => { if (!drag) return; drag = false; pan.classList.remove('drag'); if (dy > THRESH) submit(); else pan.style.transform = ''; };
    pan.addEventListener('pointerup', end); pan.addEventListener('pointercancel', end);
    pan.addEventListener('click', () => { if (stage.classList.contains('done') && dy === 0) reset(); else if (dy < 3 && !stage.classList.contains('done')) { pan.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-14px)' }, { transform: 'translateY(0)' }], { duration: 450, easing: 'cubic-bezier(.34,1.56,.64,1)' }); } dy = 0; });
    pan.addEventListener('keydown', (e) => { if (e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stage.classList.contains('done') ? reset() : submit(); } });
  },
};
