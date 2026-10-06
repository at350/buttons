const R = 54, LEN = +(2 * Math.PI * R).toFixed(1);

export default {
  id: 'au-ev-charge-ring',
  credit: 'EV charging screen (Hyundai Ioniq 5 / Kia EV6 style) — state-of-charge ring with a target-limit notch, the target slider and Start / Stop Charging; the ring breathes while charging',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 250px; padding: 14px; border-radius: 12px; background: radial-gradient(circle at 50% 30%, #13202a, #05080b 75%); color: #fff; font: 500 12px/1 'DM Sans', system-ui, sans-serif; user-select: none; }
    .ring { position: relative; width: 150px; height: 150px; margin: 0 auto; }
    .ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
    .trk { fill: none; stroke: #16232d; stroke-width: 10; }
    .soc { fill: none; stroke-width: 10; stroke-linecap: round; transition: stroke-dasharray .4s; }
    .chg .soc { animation: br 1.6s ease-in-out infinite; }
    @keyframes br { 50% { opacity: .55; } }
    .lim { stroke: #fff; stroke-width: 3; stroke-linecap: round; }
    .mid { position: absolute; inset: 0; display: grid; place-items: center; align-content: center; gap: 5px; }
    .pct { font: 300 36px/1 'DM Sans', system-ui, sans-serif; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
    .pct small { font-size: 15px; color: #8aa3b4; }
    .st { color: #8aa3b4; font-size: 11px; display: flex; align-items: center; gap: 4px; white-space: nowrap; }
    .st svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .chg .st { color: #00d2e0; }
    .lr { display: flex; justify-content: space-between; margin: 12px 2px 6px; color: #8aa3b4; font-size: 11px; }
    .lr b { color: #fff; font-weight: 600; font-variant-numeric: tabular-nums; }
    input { width: 100%; height: 22px; margin: 0; -webkit-appearance: none; appearance: none; background: transparent; cursor: pointer; }
    input::-webkit-slider-runnable-track { height: 4px; border-radius: 2px; background: linear-gradient(90deg, #00d2e0 var(--p, 80%), #22323e var(--p, 80%)); }
    input::-moz-range-track { height: 4px; border-radius: 2px; background: #22323e; }
    input::-moz-range-progress { height: 4px; border-radius: 2px; background: #00d2e0; }
    input::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -7px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,.5); }
    input::-moz-range-thumb { width: 18px; height: 18px; border: 0; border-radius: 50%; background: #fff; }
    input:focus-visible { outline: 2px solid #00d2e0; outline-offset: 2px; border-radius: 4px; }
    .go { width: 100%; height: 38px; margin-top: 8px; border: 0; border-radius: 19px; background: #00d2e0; color: #02161a; font: 700 13px/1 'DM Sans', system-ui, sans-serif; cursor: pointer; transition: background .2s, color .2s, transform .1s; }
    .go:hover { filter: brightness(1.08); }
    .go:active { transform: scale(.97); }
    .go:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .go[aria-pressed="true"] { background: #22323e; color: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="ring">
        <svg viewBox="0 0 150 150" aria-hidden="true"><defs><linearGradient id="au-ev-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00e0c6"/><stop offset="1" stop-color="#0094ff"/></linearGradient></defs>
          <circle class="trk" cx="75" cy="75" r="${R}"/><circle class="soc" stroke="url(#au-ev-g)" cx="75" cy="75" r="${R}" stroke-dasharray="0 ${LEN}"/><line class="lim" x1="${75 + R - 9}" y1="75" x2="${75 + R + 9}" y2="75"/></svg>
        <div class="mid"><div class="pct">38<small>%</small></div><div class="st"><svg viewBox="0 0 24 24"><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m18 3-4 4h6l-4 4"/></svg><span>Plugged in</span></div></div>
      </div>
      <div class="lr"><span>Target</span><b class="tv">80%</b></div>
      <input type="range" min="50" max="100" step="5" value="80" aria-label="Charging target">
      <button class="go" type="button" aria-pressed="false">Start Charging</button>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const stage = $('.stage'), soc = $('.soc'), lim = $('.lim'), pct = $('.pct'), st = $('.st span'), tv = $('.tv'), rng = $('input'), go = $('.go');
    let level = 38, target = 80, iv = 0;
    const paint = () => {
      soc.setAttribute('stroke-dasharray', `${(level / 100 * LEN).toFixed(1)} ${LEN}`);
      lim.setAttribute('transform', `rotate(${target * 3.6} 75 75)`);
      pct.innerHTML = `${level}<small>%</small>`; tv.textContent = target + '%';
      rng.style.setProperty('--p', ((target - 50) / 50 * 100) + '%');
      const mins = Math.max(0, target - level) * 2;
      st.textContent = iv ? `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m to ${target}%` : level >= target ? 'Target reached' : 'Plugged in';
      go.textContent = iv ? 'Stop Charging' : 'Start Charging'; go.setAttribute('aria-pressed', String(!!iv));
      stage.classList.toggle('chg', !!iv);
    };
    const stop = () => { clearInterval(iv); iv = 0; };
    go.addEventListener('click', () => {
      if (iv) stop();
      else if (level < target) iv = setInterval(() => { level++; if (level >= target) stop(); paint(); }, 220);
      paint();
    });
    rng.addEventListener('input', () => { target = +rng.value; if (iv && level >= target) stop(); paint(); });
    paint();
    return () => clearInterval(iv);
  },
};
