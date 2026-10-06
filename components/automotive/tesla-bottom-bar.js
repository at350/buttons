export default {
  id: 'au-tesla-bottom-bar',
  credit: 'Tesla Model 3 / Y touchscreen — bottom bar: car button, driver temp ‹ 70 ›, app dock and volume ‹ speaker › with the volume toast',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 340px; max-width: 100%; border-radius: 12px; overflow: hidden; background: #000; color: #fff; font: 500 15px/1 Inter, -apple-system, system-ui, sans-serif; }
    .screen { position: relative; height: 54px; background: linear-gradient(#1c1d1f, #121314); }
    .toast { position: absolute; right: 10px; top: 12px; width: 150px; height: 30px; border-radius: 15px; background: rgba(48,49,52,.92); display: flex; align-items: center; gap: 8px; padding: 0 12px; opacity: 0; transform: translateY(6px); transition: opacity .2s, transform .25s cubic-bezier(.2,0,0,1); pointer-events: none; }
    .toast.show { opacity: 1; transform: none; }
    .toast svg { width: 16px; height: 16px; flex: none; }
    .lvl { flex: 1; height: 4px; border-radius: 2px; background: #4a4b4f; overflow: hidden; }
    .lvl i { display: block; height: 100%; width: 40%; background: #fff; transition: width .15s; }
    .bar { display: flex; align-items: center; justify-content: space-between; height: 58px; padding: 0 6px; background: #000; border-top: 1px solid #1f1f1f; }
    button { border: 0; padding: 0; background: transparent; color: #e6e6e6; cursor: pointer; display: grid; place-items: center; -webkit-tap-highlight-color: transparent; transition: background .15s, color .15s, transform .1s; }
    button:focus-visible { outline: 2px solid #3e6ae1; outline-offset: -2px; }
    button:active { transform: scale(.92); }
    .ic { width: 40px; height: 40px; border-radius: 8px; }
    .ic:hover { background: #1c1c1c; color: #fff; }
    .ic[aria-pressed="true"] { background: #262626; color: #fff; }
    svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .grp { display: flex; align-items: center; }
    .ch { width: 22px; height: 40px; color: #8e8e8e; border-radius: 6px; }
    .ch:hover { color: #fff; }
    .ch svg { width: 18px; height: 18px; stroke-width: 2.4; }
    .temp { width: 46px; height: 40px; font: 400 21px/1 Inter, system-ui, sans-serif; letter-spacing: -.02em; color: #fff; font-variant-numeric: tabular-nums; border-radius: 8px; }
    .temp.off { color: #5a5a5a; }
    .temp:hover { background: #1c1c1c; }
    .dock { display: flex; gap: 2px; }
    .app { width: 36px; height: 36px; border-radius: 8px; }
    .app span { width: 26px; height: 26px; border-radius: 7px; display: grid; place-items: center; }
    .app span svg { width: 16px; height: 16px; stroke: #fff; stroke-width: 2.2; }
    .app:hover span { filter: brightness(1.2); }
    .app[aria-pressed="true"] { background: #262626; }
    .vol .x, .vol.m .o, .toast .x, .toast.m .o { display: none; }
    .vol.m .x, .toast.m .x { display: block; }
  `,
  html: `
    <div class="stage">
      <div class="screen"><div class="toast"><svg class="o" viewBox="0 0 24 24"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg><svg class="x" viewBox="0 0 24 24"><path d="M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"/><path d="m16.5 14.5 5-5"/><path d="m16.5 9.5 5 5"/></svg><div class="lvl"><i></i></div></div></div>
      <div class="bar">
        <button class="ic car" type="button" aria-pressed="false" aria-label="Controls"><svg viewBox="0 0 24 24"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg></button>
        <div class="grp">
          <button class="ch dn" type="button" aria-label="Driver temperature down"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
          <button class="temp" type="button" aria-pressed="true" aria-label="Climate">70</button>
          <button class="ch up" type="button" aria-label="Driver temperature up"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
        </div>
        <div class="dock">
          <button class="app" type="button" aria-pressed="false" aria-label="Phone"><span style="background:#2fb24c"><svg viewBox="0 0 24 24"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg></span></button>
          <button class="app" type="button" aria-pressed="false" aria-label="Media"><span style="background:#e8344e"><svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span></button>
          <button class="app" type="button" aria-pressed="false" aria-label="Camera"><span style="background:#3b3b3d"><svg viewBox="0 0 24 24"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></span></button>
        </div>
        <div class="grp">
          <button class="ch vdn" type="button" aria-label="Volume down"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
          <button class="ic vol" type="button" aria-pressed="false" aria-label="Mute"><svg class="o" viewBox="0 0 24 24"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg><svg class="x" viewBox="0 0 24 24"><path d="M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"/><path d="m16.5 14.5 5-5"/><path d="m16.5 9.5 5 5"/></svg></button>
          <button class="ch vup" type="button" aria-label="Volume up"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const temp = $('.temp'), toast = $('.toast'), lvl = $('.lvl i'), vol = $('.vol');
    let t = 70, v = 4, muted = false, timer = 0, climate = true;
    const paintVol = () => {
      const m = muted || !v;
      vol.classList.toggle('m', m); toast.classList.toggle('m', m);
      vol.setAttribute('aria-pressed', String(muted));
      lvl.style.width = (m ? 0 : v * 10) + '%';
      toast.classList.add('show'); clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove('show'), 1400);
    };
    const setClimate = (on) => { climate = on; temp.classList.toggle('off', !on); temp.setAttribute('aria-pressed', String(on)); };
    const setT = (d) => { t = Math.max(59, Math.min(82, t + d)); temp.textContent = t === 59 ? 'LO' : t === 82 ? 'HI' : t; setClimate(true); };
    $('.dn').addEventListener('click', () => setT(-1));
    $('.up').addEventListener('click', () => setT(1));
    temp.addEventListener('click', () => setClimate(!climate));
    $('.vdn').addEventListener('click', () => { v = Math.max(0, v - 1); muted = false; paintVol(); });
    $('.vup').addEventListener('click', () => { v = Math.min(10, v + 1); muted = false; paintVol(); });
    vol.addEventListener('click', () => { muted = !muted; paintVol(); });
    const tabs = [$('.car'), ...root.querySelectorAll('.app')];
    tabs.forEach((b) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      tabs.forEach((o) => o.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', String(on));
    }));
    return () => clearTimeout(timer);
  },
};
