// BD Alaris-style large-volume infusion pump channel: backlit LCD with rate and VTBI, INFUSING
// (green, chasing) and ALARM (amber) LEDs, membrane keys. START infuses (VTBI counts down), PAUSE
// holds and — left paused — raises the RESTART CHANNEL alarm; SILENCE mutes it (bell-slash) until
// the channel is restarted or switched off. ▲▼ titrate the rate.
const BELL = '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>';
const BELL_OFF = '<path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"/><path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="m2 2 20 20"/>';
export default {
  id: 'nd-alaris-pump',
  credit: 'BD Alaris-style infusion pump channel — rate mL/h with ▲▼, START / PAUSE / CHANNEL OFF, INFUSING and ALARM LEDs, SILENCE (Lucide bell-off)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; gap: 9px; padding: 12px; border-radius: 12px; overflow: hidden; width: 232px;
      background: linear-gradient(170deg, #eef0f1, #d3d8db); box-shadow: inset 0 1px 0 #fff, inset 0 -2px 0 rgba(0,0,0,.06); }
    .lcd { position: relative; height: 74px; border-radius: 4px; padding: 6px 8px; overflow: hidden; background: linear-gradient(#123a5c, #0b2741); color: #e9f4ff;
      box-shadow: inset 0 2px 5px rgba(0,0,0,.6), 0 0 0 3px #3b4a56; font-family: "IBM Plex Mono", ui-monospace, monospace; }
    .ch { position: absolute; left: 8px; top: 6px; font: 600 9px/1 "DM Sans", Inter, Arial, sans-serif; padding: 2px 4px; border-radius: 2px; background: #e9f4ff; color: #0b2741; }
    .st { position: absolute; right: 8px; top: 6px; font: 600 8.5px/1 "IBM Plex Mono", ui-monospace, monospace; letter-spacing: .5px; }
    .rate { position: absolute; left: 8px; top: 22px; font: 600 30px/1 "IBM Plex Mono", ui-monospace, monospace; width: 82px; text-align: right; }
    .u { position: absolute; left: 94px; top: 38px; font: 500 9px/1 "IBM Plex Mono", ui-monospace, monospace; }
    .vt { position: absolute; right: 8px; top: 30px; font: 500 8px/1.35 "IBM Plex Mono", ui-monospace, monospace; text-align: right; opacity: .85; }
    .ban { position: absolute; left: 0; right: 0; bottom: 0; height: 17px; display: flex; align-items: center; justify-content: center; gap: 5px;
      font: 700 8.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .6px; color: #111; background: #ffb400; transform: translateY(18px); transition: transform .15s; border-radius: 0 0 4px 4px; }
    .ban svg { width: 11px; height: 11px; fill: none; stroke: #111; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; display: none; }
    .stage.alarm .ban { transform: none; }
    .stage.alarm:not(.sil) .ban { animation: fl .5s steps(2, jump-none) infinite; }
    .stage.sil .ban svg { display: block; }
    @keyframes fl { 50% { background: #5a4000; color: #ffb400; } }
    .leds { display: flex; justify-content: space-between; padding: 0 2px; font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .6px; color: #4b5560; }
    .leds span { display: flex; align-items: center; gap: 5px; }
    .inf { display: flex; gap: 2px; } .inf i { width: 6px; height: 6px; border-radius: 50%; background: #20502c; }
    .stage.run .inf i { animation: chase 1.2s linear infinite; } .stage.run .inf i:nth-child(2) { animation-delay: .4s; } .stage.run .inf i:nth-child(3) { animation-delay: .8s; }
    @keyframes chase { 0%, 30% { background: #3dff6e; box-shadow: 0 0 5px #3dff6e; } 40%, 100% { background: #20502c; } }
    .al { width: 9px; height: 9px; border-radius: 50%; background: #5c4210; }
    .stage.alarm .al { background: #ffb400; box-shadow: 0 0 7px #ffb400; }
    .stage.alarm:not(.sil) .al { animation: fl2 .5s steps(2, jump-none) infinite; } @keyframes fl2 { 50% { background: #5c4210; box-shadow: none; } }
    .keys { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .k { height: 28px; border: 0; padding: 0 2px; border-radius: 5px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;
      font: 700 8px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .4px; color: #23303a; white-space: nowrap;
      background: linear-gradient(#ffffff, #e3e7ea); box-shadow: 0 2px 0 #9aa4ac, 0 0 0 1px #b9c2c8, inset 0 1px 0 #fff; }
    .k svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .k.go { color: #fff; background: linear-gradient(#2db24f, #1b8a3a); box-shadow: 0 2px 0 #0f5a24, inset 0 1px 0 rgba(255,255,255,.3); }
    .k.pa { background: linear-gradient(#ffd24d, #f2b400); box-shadow: 0 2px 0 #9a7200, inset 0 1px 0 rgba(255,255,255,.5); }
    .k:hover { filter: brightness(1.04); }
    .k:active { transform: translateY(2px); box-shadow: 0 0 0 #9aa4ac, 0 0 0 1px #b9c2c8; }
    .k:focus-visible { outline: 2px solid #1a6ad1; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="lcd" aria-live="polite"><span class="ch">A</span><span class="st">STOPPED</span>
        <span class="rate">125</span><span class="u">mL/h</span><span class="vt">VTBI<br><b>1000.0</b> mL</span>
        <div class="ban"><svg viewBox="0 0 24 24">${BELL_OFF}</svg>RESTART CHANNEL</div></div>
      <div class="leds"><span>INFUSING <span class="inf"><i></i><i></i><i></i></span></span><span><i class="al"></i> ALARM</span></div>
      <div class="keys">
        <button class="k up" type="button" aria-label="Rate up"><svg viewBox="0 0 24 24"><path d="m6 15 6-6 6 6"/></svg></button>
        <button class="k dn" type="button" aria-label="Rate down"><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
        <button class="k sil" type="button" aria-label="Silence"><svg viewBox="0 0 24 24">${BELL}</svg>SILENCE</button>
        <button class="k go" type="button">START</button><button class="k pa" type="button">PAUSE</button><button class="k off" type="button">CHANNEL OFF</button>
      </div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s), stage = $('.stage');
    const rateEl = $('.rate'), st = $('.st'), vtEl = $('.vt b');
    let rate = 125, vtbi = 1000, state = 'stop', tick = 0, pauseT = 0;
    const draw = () => {
      rateEl.textContent = rate; vtEl.textContent = vtbi.toFixed(1);
      st.textContent = { stop: 'STOPPED', run: 'INFUSING', pause: 'PAUSED', alarm: 'PAUSED' }[state];
      stage.classList.toggle('run', state === 'run'); stage.classList.toggle('alarm', state === 'alarm');
      if (state !== 'alarm') stage.classList.remove('sil');
    };
    const clear = () => { clearInterval(tick); clearTimeout(pauseT); tick = pauseT = 0; };
    $('.go').addEventListener('click', () => {
      clear(); state = 'run'; tick = setInterval(() => { vtbi = Math.max(0, vtbi - rate / 3600 * 6); if (!vtbi) { clear(); state = 'stop'; } draw(); }, 1000); draw();
    });
    $('.pa').addEventListener('click', () => { if (state !== 'run') return; clear(); state = 'pause'; pauseT = setTimeout(() => { state = 'alarm'; draw(); }, 4000); draw(); });
    $('.off').addEventListener('click', () => { clear(); state = 'stop'; vtbi = 1000; draw(); });
    $('.sil').addEventListener('click', () => { if (state === 'alarm') stage.classList.add('sil'); });
    $('.up').addEventListener('click', () => { rate = Math.min(999, rate + (rate < 10 ? 1 : 5)); draw(); });
    $('.dn').addEventListener('click', () => { rate = Math.max(1, rate - (rate <= 10 ? 1 : 5)); draw(); });
    draw();
    return clear;
  },
};
