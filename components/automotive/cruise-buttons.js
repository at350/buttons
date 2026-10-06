export default {
  id: 'au-cruise-buttons',
  credit: 'Steering-wheel cruise control cluster — CRUISE on/off, RES+ / SET− rocker, CANCEL and the following-distance key; the cluster icon goes white on standby and green once a speed is set',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 12px; align-items: center; width: 300px; max-width: 100%; padding: 14px; border-radius: 12px; background: radial-gradient(circle at 80% 50%, #2b2b2d, #101011 75%); font: 700 9px/1 Inter, 'Helvetica Neue', system-ui, sans-serif; color: #e8e8e8; user-select: none; }
    .disp { flex: none; width: 110px; height: 120px; border-radius: 10px; background: #050608; box-shadow: inset 0 0 0 1px #1f2328; display: grid; place-items: center; align-content: center; gap: 6px; }
    .ic { width: 30px; height: 30px; fill: #2b2e33; transition: fill .25s, filter .25s; }
    .on .ic { fill: #f2f2f2; }
    .set .ic { fill: #2bd36a; filter: drop-shadow(0 0 4px rgba(43,211,106,.7)); }
    .sp { font: 300 34px/1 Inter, system-ui, sans-serif; letter-spacing: -.03em; color: #3a3d42; font-variant-numeric: tabular-nums; transition: color .25s; min-width: 60px; text-align: center; }
    .on .sp { color: #9aa0a8; }
    .set .sp { color: #fff; }
    .unit { color: #6b7078; font-weight: 500; letter-spacing: .1em; }
    .gap { display: flex; align-items: center; gap: 3px; height: 12px; }
    .gap svg { width: 14px; height: 14px; fill: none; stroke: #6b7078; stroke-width: 2; }
    .gap i { width: 3px; height: 10px; border-radius: 1px; background: #2b2e33; transition: background .2s; }
    .on .gap i.l { background: #9aa0a8; }
    .set .gap i.l { background: #2bd36a; }
    .spoke { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 12px; border-radius: 16px 30px 30px 16px; background: linear-gradient(160deg, #2a2a2a, #121212); box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 3px 8px rgba(0,0,0,.6); }
    button { border: 0; padding: 0; cursor: pointer; color: #e8e8e8; font: inherit; letter-spacing: .06em; background: linear-gradient(#3a3a3c, #1c1c1d); box-shadow: 0 2px 0 #050505, inset 0 1px 0 rgba(255,255,255,.14); display: grid; place-items: center; transition: transform .06s, box-shadow .06s, background .1s; -webkit-tap-highlight-color: transparent; }
    button:hover { background: linear-gradient(#444446, #222224); }
    button:active, button.pr { transform: translateY(2px); box-shadow: 0 0 0 #050505, inset 0 1px 0 rgba(255,255,255,.08); }
    button:focus-visible { outline: 2px solid #4da3ff; outline-offset: 2px; }
    .b { height: 32px; border-radius: 8px; }
    .b svg { width: 18px; height: 18px; fill: currentColor; }
    .rock { grid-row: span 2; display: grid; grid-template-rows: 1fr 1fr; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 0 #050505; }
    .rock button { border-radius: 0; box-shadow: inset 0 1px 0 rgba(255,255,255,.14); }
    .rock button:first-child { border-bottom: 1px solid #000; }
    .rock button:active { transform: none; background: #151516; }
    .led { position: relative; }
    .led::after { content: ''; position: absolute; right: 6px; top: 6px; width: 4px; height: 4px; border-radius: 50%; background: #2d2d2d; }
    .on .led::after { background: #2bd36a; box-shadow: 0 0 4px #2bd36a; }
  `,
  html: `
    <div class="stage">
      <div class="disp"><svg class="ic" viewBox="0 0 256 256"><path d="M114.34,154.34l96-96a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32ZM128,88a63.9,63.9,0,0,1,20.44,3.33,8,8,0,1,0,5.11-15.16A80,80,0,0,0,48.49,160.88,8,8,0,0,0,56.43,168c.29,0,.59,0,.89-.05a8,8,0,0,0,7.07-8.83A64.92,64.92,0,0,1,64,152,64.07,64.07,0,0,1,128,88Zm99.74,13a8,8,0,0,0-14.24,7.3,96.27,96.27,0,0,1,5,75.71l-181.1-.07A96.24,96.24,0,0,1,128,56h.88a95,95,0,0,1,42.82,10.5A8,8,0,1,0,179,52.27a112,112,0,0,0-156.66,137A16.07,16.07,0,0,0,37.46,200H218.53a16,16,0,0,0,15.11-10.71,112.35,112.35,0,0,0-5.9-88.3Z"/></svg><span class="sp">---</span><span class="unit">MPH</span><span class="gap"><svg viewBox="0 0 24 24"><path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"/></svg><i></i><i></i><i></i><i></i></span></div>
      <div class="spoke">
        <button class="b led pw" type="button" aria-pressed="false" aria-label="Cruise on / off"><svg viewBox="0 0 256 256"><path d="M114.34,154.34l96-96a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32ZM128,88a63.9,63.9,0,0,1,20.44,3.33,8,8,0,1,0,5.11-15.16A80,80,0,0,0,48.49,160.88,8,8,0,0,0,56.43,168c.29,0,.59,0,.89-.05a8,8,0,0,0,7.07-8.83A64.92,64.92,0,0,1,64,152,64.07,64.07,0,0,1,128,88Zm99.74,13a8,8,0,0,0-14.24,7.3,96.27,96.27,0,0,1,5,75.71l-181.1-.07A96.24,96.24,0,0,1,128,56h.88a95,95,0,0,1,42.82,10.5A8,8,0,1,0,179,52.27a112,112,0,0,0-156.66,137A16.07,16.07,0,0,0,37.46,200H218.53a16,16,0,0,0,15.11-10.71,112.35,112.35,0,0,0-5.9-88.3Z"/></svg></button>
        <div class="rock"><button class="res" type="button">RES +</button><button class="setb" type="button">SET −</button></div>
        <button class="b can" type="button">CANCEL</button>
        <button class="b gp" type="button" aria-label="Following distance"><svg viewBox="0 0 24 24" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const stage = $('.stage'), sp = $('.sp'), pw = $('.pw'), bars = [...root.querySelectorAll('.gap i')];
    let on = false, set = false, speed = 0, mem = 0, gap = 3;
    const cur = 62;
    const paint = () => {
      stage.classList.toggle('on', on); stage.classList.toggle('set', on && set);
      sp.textContent = !on ? '---' : set ? speed : mem || '--';
      bars.forEach((b, i) => b.classList.toggle('l', i < gap));
      pw.setAttribute('aria-pressed', String(on));
    };
    pw.addEventListener('click', () => { on = !on; set = false; if (!on) mem = 0; paint(); });
    $('.setb').addEventListener('click', () => { if (!on) return; if (set) speed = Math.max(20, speed - 1); else { speed = mem ? mem : cur; set = true; } mem = speed; paint(); });
    $('.res').addEventListener('click', () => { if (!on) return; if (set) speed = Math.min(90, speed + 1); else if (mem) { speed = mem; set = true; } mem = speed || mem; paint(); });
    $('.can').addEventListener('click', () => { set = false; paint(); });
    $('.gp').addEventListener('click', () => { gap = gap % 4 + 1; paint(); });
    paint();
  },
};
