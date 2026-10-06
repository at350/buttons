export default {
  id: 'mb-tesla-fan',
  credit: 'Tesla app — Climate screen: chevron setpoint stepper, the round power button that glows Tesla blue, and the segmented fan-speed bar that spins the fan faster',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 264px; max-width: 100%; padding: 16px 18px 18px; border-radius: 12px; background: #000; color: #fff; font: 400 14px/1 "Universal Sans", "Gotham", Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .hd { display: flex; align-items: center; justify-content: space-between; color: #a2a3a5; font-size: 13px; margin-bottom: 10px; }
    .hd svg { width: 18px; height: 18px; fill: #e31937; }
    .tmp { display: flex; align-items: center; justify-content: space-between; }
    .st { width: 44px; height: 44px; border-radius: 50%; border: 0; background: transparent; color: #a2a3a5; cursor: pointer; display: grid; place-items: center; transition: background .2s, color .2s; -webkit-tap-highlight-color: transparent; }
    .st:hover { background: #1c1c1e; color: #fff; }
    .st:active { background: #2a2a2c; }
    .st svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .deg { font-weight: 300; font-size: 46px; letter-spacing: -.03em; font-variant-numeric: tabular-nums; min-width: 4ch; text-align: center; transition: color .3s; }
    .deg sup { font-size: 20px; vertical-align: 20px; margin-left: 2px; }
    .stage.off .deg { color: #3a3a3c; }
    .ctl { display: flex; align-items: center; gap: 12px; margin-top: 14px; }
    .pw { width: 44px; height: 44px; border-radius: 50%; border: 0; background: #1c1c1e; color: #a2a3a5; cursor: pointer; display: grid; place-items: center; flex: none;
      transition: background .25s, color .25s, box-shadow .3s; -webkit-tap-highlight-color: transparent; }
    .pw svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }
    .pw:hover { color: #fff; }
    .pw[aria-pressed="true"] { background: #3e6ae1; color: #fff; box-shadow: 0 0 18px rgba(62,106,225,.55); }
    .pw:focus-visible, .st:focus-visible, .seg:focus-visible { outline: 2px solid #3e6ae1; outline-offset: 2px; }
    .fan { width: 22px; height: 22px; flex: none; color: #a2a3a5; animation: spin var(--spd, 1.6s) linear infinite; animation-play-state: paused; }
    .stage:not(.off) .fan { animation-play-state: running; color: #fff; }
    .fan svg { width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .bar { display: flex; gap: 3px; flex: 1; height: 26px; border-radius: 6px; overflow: hidden; }
    .seg { flex: 1; border: 0; padding: 0; background: #1c1c1e; cursor: pointer; transition: background .2s; -webkit-tap-highlight-color: transparent; }
    .seg:hover { background: #2c2c2e; }
    .seg.lit { background: #3e6ae1; }
    .seg.lit:hover { background: #5a80ea; }
    .stage.off .seg.lit { background: #3a3a3c; }
  `,
  html: `
    <div class="stage" style="--spd: 1.4s">
      <div class="hd"><span>Interior 68°F</span><svg viewBox="0 0 24 24" role="img" aria-label="Tesla"><path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z"/></svg></div>
      <div class="tmp"><button class="st" type="button" aria-label="Cooler"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button><span class="deg" aria-live="polite">70<sup>°</sup></span><button class="st" type="button" aria-label="Warmer"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button></div>
      <div class="ctl">
        <button class="pw" type="button" aria-pressed="true" aria-label="Climate on"><svg viewBox="0 0 24 24"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg></button>
        <span class="fan" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/></svg></span>
        <div class="bar" role="group" aria-label="Fan speed"></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), bar = root.querySelector('.bar'), pw = root.querySelector('.pw'), deg = root.querySelector('.deg');
    const segs = Array.from({ length: 10 }, (_, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'seg'; b.setAttribute('aria-label', `Fan speed ${i + 1}`); bar.appendChild(b); return b; });
    let speed = 4, temp = 70;
    const paint = () => { segs.forEach((s, i) => { s.classList.toggle('lit', i < speed); s.setAttribute('aria-pressed', String(i === speed - 1)); }); stage.style.setProperty('--spd', (2.2 - speed * 0.18).toFixed(2) + 's'); };
    const power = (on) => { pw.setAttribute('aria-pressed', String(on)); pw.setAttribute('aria-label', on ? 'Climate on' : 'Climate off'); stage.classList.toggle('off', !on); };
    segs.forEach((s, i) => s.addEventListener('click', () => { speed = (speed === i + 1) ? i : i + 1; if (speed === 0) speed = 1; power(true); paint(); }));
    pw.addEventListener('click', () => power(pw.getAttribute('aria-pressed') !== 'true'));
    root.querySelectorAll('.st').forEach((b, i) => b.addEventListener('click', () => { temp = Math.max(59, Math.min(82, temp + (i ? 1 : -1))); deg.firstChild.textContent = String(temp); power(true); }));
    paint();
  },
};
