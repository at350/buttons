export default {
  id: 'au-tesla-charging',
  credit: 'Tesla touchscreen — Charging card: draggable charge-limit marker over the green battery bar, Daily / Trip zones, "Open Charge Port" and "Start Charging"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 320px; max-width: 100%; padding: 16px; border-radius: 12px; background: #161616; color: #fff; font: 500 13px/1 Inter, -apple-system, system-ui, sans-serif; user-select: none; }
    .top { display: flex; align-items: baseline; justify-content: space-between; }
    .pct { font: 300 34px/1 Inter, system-ui, sans-serif; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
    .pct small { font-size: 16px; color: #9a9a9a; margin-left: 2px; }
    .st { color: #9a9a9a; font-size: 12px; min-width: 120px; text-align: right; white-space: nowrap; }
    .st.ch { color: #3cc35a; }
    .bar { position: relative; height: 30px; margin: 14px 0 6px; border-radius: 6px; background: #2c2c2c; touch-action: none; cursor: pointer; }
    .fill { position: absolute; left: 0; top: 0; bottom: 0; width: 52%; border-radius: 6px 0 0 6px; background: #3cc35a; transition: width .3s; }
    .ch .fill, .bar.ch .fill { background: repeating-linear-gradient(115deg, #3cc35a 0 10px, #52d270 10px 20px); background-size: 200% 100%; animation: flow 1s linear infinite; }
    @keyframes flow { to { background-position: -42px 0; } }
    .lim { position: absolute; top: -4px; bottom: -4px; left: 80%; width: 4px; margin-left: -2px; border-radius: 2px; background: #fff; box-shadow: 0 0 0 2px #161616; }
    .lim::after { content: ''; position: absolute; left: 50%; top: 100%; width: 14px; height: 14px; margin: 2px 0 0 -7px; border-radius: 50%; background: #fff; }
    .bar:focus-visible { outline: 2px solid #3e6ae1; outline-offset: 4px; }
    .zones { display: flex; margin-top: 24px; color: #6f6f6f; font-size: 11px; }
    .zones span:first-child { flex: 0 0 90%; border-top: 2px solid #3a3a3a; padding-top: 5px; }
    .zones span:last-child { flex: 1; border-top: 2px solid #5a4a2a; padding-top: 5px; text-align: right; }
    .btns { display: flex; gap: 8px; margin-top: 14px; }
    button { flex: 1; height: 40px; border: 0; border-radius: 8px; background: #2c2c2c; color: #fff; font: 500 13px/1 Inter, system-ui, sans-serif; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; transition: background .15s, transform .1s, opacity .2s; }
    button:hover { background: #393939; }
    button:active { transform: scale(.97); }
    button:focus-visible { outline: 2px solid #3e6ae1; outline-offset: 2px; }
    button:disabled { opacity: .35; cursor: default; transform: none; }
    button svg { width: 16px; height: 16px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .led { width: 8px; height: 8px; border-radius: 50%; background: #444; flex: none; transition: background .3s, box-shadow .3s; }
    .open .led { background: #4da3ff; box-shadow: 0 0 8px #4da3ff; }
    .ch .led { background: #3cc35a; box-shadow: 0 0 8px #3cc35a; animation: pulse 1.6s ease-in-out infinite; }
    @keyframes pulse { 50% { opacity: .35; } }
  `,
  html: `
    <div class="stage">
      <div class="top"><div class="pct">52<small>%</small></div><div class="st">Set Limit 80%</div></div>
      <div class="bar" tabindex="0" role="slider" aria-label="Charge limit" aria-valuemin="50" aria-valuemax="100" aria-valuenow="80"><div class="fill"></div><div class="lim"></div></div>
      <div class="zones"><span>Daily</span><span>Trip</span></div>
      <div class="btns">
        <button class="port" type="button" aria-pressed="false"><span class="led"></span><svg viewBox="0 0 24 24"><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m18 3-4 4h6l-4 4"/></svg><span class="pl">Open Charge Port</span></button>
        <button class="go" type="button" aria-pressed="false" disabled>Start Charging</button>
      </div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const stage = $('.stage'), bar = $('.bar'), fill = $('.fill'), lim = $('.lim'), pct = $('.pct'), st = $('.st'), port = $('.port'), go = $('.go'), pl = $('.pl');
    let limit = 80, soc = 52, open = false, charging = false, iv = 0, drag = false;
    const paint = () => {
      fill.style.width = soc + '%'; lim.style.left = limit + '%';
      pct.innerHTML = `${soc}<small>%</small>`;
      bar.setAttribute('aria-valuenow', limit);
      st.textContent = charging ? 'Charging' : soc >= limit && open ? 'Charging Complete' : `Set Limit ${limit}%`;
      st.classList.toggle('ch', charging); stage.classList.toggle('ch', charging); stage.classList.toggle('open', open);
      go.textContent = charging ? 'Stop Charging' : 'Start Charging'; go.disabled = !open || (!charging && soc >= limit);
      pl.textContent = open ? 'Close Charge Port' : 'Open Charge Port'; port.setAttribute('aria-pressed', String(open)); port.disabled = charging;
    };
    const stop = () => { clearInterval(iv); iv = 0; charging = false; };
    const tick = () => { if (soc >= limit) { stop(); } else soc++; paint(); };
    const setFrom = (e) => { const r = bar.getBoundingClientRect(); limit = Math.round(Math.max(50, Math.min(100, (e.clientX - r.left) / r.width * 100))); paint(); };
    bar.addEventListener('pointerdown', (e) => { drag = true; bar.setPointerCapture(e.pointerId); setFrom(e); });
    bar.addEventListener('pointermove', (e) => drag && setFrom(e));
    bar.addEventListener('pointerup', () => { drag = false; });
    bar.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0;
      if (d) { e.preventDefault(); limit = Math.max(50, Math.min(100, limit + d * 5)); paint(); }
    });
    port.addEventListener('click', () => { open = !open; paint(); });
    go.addEventListener('click', () => {
      if (charging) stop(); else { charging = true; iv = setInterval(tick, 350); }
      paint();
    });
    paint();
    return () => clearInterval(iv);
  },
};
