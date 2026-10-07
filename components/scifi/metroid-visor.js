// Metroid Prime — Samus's combat visor HUD with the visor selector: Combat, Scan, Thermal and X-Ray each re-render the world.
// Layout after the GameCube original: radar top-left, energy tanks + ENERGY bar across the top, 3D map top-right,
// threat gauge on the left rim, missile gauge on the right, visor selector bottom-left, beam selector bottom-right,
// all inside the curved helmet glass. The world is a jungle gorge photo graded like Tallon Overworld.
const V = [['COMBAT', 'M12 5v4M12 15v4M5 12h4M15 12h4M12 12h.01'], ['SCAN', 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5'], ['THERMAL', 'M12 3c3 4 5 6 5 10a5 5 0 0 1-10 0c0-4 2-6 5-10z'], ['X-RAY', 'M6 4c4 3 8 3 12 0M6 20c4-3 8-3 12 0M12 4v16M7 9h10M7 15h10']];
export default {
  id: 'sf-metroid-visor',
  credit: 'Retro Studios Metroid Prime — Samus\'s visor HUD: radar, energy tanks, 3D map, threat and missile gauges, D-pad visor and beam selectors inside the helmet glass; switch Combat / Scan / Thermal / X-Ray and the whole view re-renders',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 320px; height: 200px; max-width: 100%; border-radius: 12px; overflow: hidden; background: #000; font-family: 'Space Grotesk', system-ui, sans-serif; --h: #6fd8ff; --a: #ff9a3c; }
    .w { position: absolute; inset: -4px; background: url(assets/square/26.webp) 50% 70% / cover; transition: filter .3s;
      filter: saturate(.55) hue-rotate(22deg) brightness(.5) contrast(1.2); }
    .rain { position: absolute; inset: 0; opacity: .35; background: repeating-linear-gradient(105deg, transparent 0 9px, rgba(200,240,255,.25) 9px 10px) 0 0 / 60px 60px; animation: rn .5s linear infinite; }
    @keyframes rn { to { background-position: -12px 60px; } }
    .stage.scan .w { filter: grayscale(1) brightness(.55) sepia(.6) hue-rotate(170deg) saturate(2.2); }
    .stage.thermal .w { filter: grayscale(1) contrast(1.4) brightness(.3) sepia(1) hue-rotate(205deg) saturate(3.5); }
    .stage.xray .w { filter: grayscale(1) invert(1) contrast(1.9) brightness(.85); }
    .stage.thermal .rain, .stage.xray .rain { opacity: 0; }
    .stage.scan { --h: #8fc4ff; } .stage.thermal { --h: #ffb04a; --a: #fff1c0; } .stage.xray { --h: #f2f2f2; --a: #ffffff; }
    .glass { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
    .glass .fr { fill: rgba(2,10,16,.9); } .glass .ed { fill: none; stroke: var(--h); stroke-width: 1; opacity: .55; }
    .glass .gl { fill: url(#sheen); }
    .hud { position: absolute; inset: 0; color: var(--h); text-shadow: 0 0 5px color-mix(in srgb, var(--h) 60%, transparent); pointer-events: none; }
    .rad { position: absolute; left: 22px; top: 14px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--h); overflow: hidden;
      background: radial-gradient(circle, transparent 0 32%, color-mix(in srgb, var(--h) 35%, transparent) 33% 34%, transparent 35%), linear-gradient(var(--h), var(--h)) 50% 0 / 1px 100% no-repeat, linear-gradient(var(--h), var(--h)) 0 50% / 100% 1px no-repeat, rgba(0,20,30,.45); }
    .rad::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(color-mix(in srgb, var(--h) 45%, transparent), transparent 70deg); animation: rs 2.4s linear infinite; }
    @keyframes rs { to { transform: rotate(360deg); } }
    .rad i { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #ff4a3a; box-shadow: 0 0 4px #ff4a3a; }
    .en { position: absolute; left: 72px; top: 14px; width: 168px; }
    .tanks { display: flex; gap: 3px; margin-left: 2px; } .tanks i { width: 8px; height: 6px; border: 1px solid var(--h); } .tanks i.f { background: var(--h); }
    .eb { display: flex; align-items: center; gap: 6px; margin-top: 4px; font-size: 7px; letter-spacing: .2em; white-space: nowrap; }
    .eb b { font: 600 15px/1 'Space Grotesk', sans-serif; letter-spacing: 0; font-variant-numeric: tabular-nums; }
    .eb u { flex: 1; height: 5px; border: 1px solid color-mix(in srgb, var(--h) 70%, transparent); background: linear-gradient(90deg, var(--h) 99%, transparent 99%) 0 0 / 99% 100% no-repeat; }
    .map { position: absolute; right: 20px; top: 12px; width: 50px; height: 42px; }
    .map path { fill: color-mix(in srgb, var(--h) 12%, transparent); stroke: var(--h); stroke-width: .8; }
    .map circle { fill: var(--a); }
    .g { position: absolute; top: 70px; width: 7px; height: 66px; border: 1px solid color-mix(in srgb, var(--h) 70%, transparent); border-radius: 4px; }
    .g i { position: absolute; left: 1px; right: 1px; bottom: 1px; border-radius: 2px; }
    .thr { left: 13px; transform: skewY(-8deg); } .thr i { height: 18%; background: var(--a); box-shadow: 0 0 5px var(--a); }
    .mis { right: 13px; transform: skewY(8deg); } .mis i { height: 72%; background: var(--h); }
    .mn { position: absolute; right: 9px; top: 140px; font: 600 9px 'Space Grotesk', sans-serif; font-variant-numeric: tabular-nums; }
    .ret { position: absolute; left: 50%; top: 52%; width: 46px; height: 46px; margin: -23px; opacity: .85; }
    .ret circle, .ret path { fill: none; stroke: var(--h); stroke-width: 1.2; }
    .ret .scn { display: none; }
    .scan .ret .cbt { display: none; } .scan .ret .scn { display: inline; }
    .heat { display: none; position: absolute; inset: 0; background: radial-gradient(9px 13px at 226px 100px, #fff6c8, #ffc23a 40%, #ff3a1a 75%, transparent), radial-gradient(7px 9px at 128px 136px, #ffe17a, #ff6a1a 60%, transparent); filter: blur(1px); }
    .thermal .heat { display: block; }
    .pts { display: none; } .scan .pts { display: block; }
    .pts i { position: absolute; width: 7px; height: 7px; border: 1.5px solid #ff9a3c; transform: rotate(45deg); box-shadow: 0 0 6px #ff9a3c; animation: pp 1s ease-in-out infinite alternate; }
    @keyframes pp { to { transform: rotate(45deg) scale(1.35); } }
    .sel { position: absolute; left: 20px; bottom: 12px; width: 66px; height: 66px; pointer-events: auto; }
    .v { position: absolute; width: 24px; height: 24px; border: 1px solid color-mix(in srgb, var(--h) 60%, transparent); background: rgba(0,20,30,.6); color: var(--h); cursor: pointer; padding: 0; display: grid; place-items: center; transform: rotate(45deg); }
    .v svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; transform: rotate(-45deg); }
    .v.p0 { left: 21px; top: 0; } .v.p1 { left: 0; top: 21px; } .v.p2 { left: 42px; top: 21px; } .v.p3 { left: 21px; top: 42px; }
    .v:hover { background: color-mix(in srgb, var(--h) 25%, #000); }
    .v[aria-checked="true"] { background: var(--h); color: #001018; box-shadow: 0 0 10px var(--h); }
    .v:focus-visible { outline: 1px solid #fff; outline-offset: 2px; }
    .vn { position: absolute; left: 92px; bottom: 16px; font-size: 8px; letter-spacing: .3em; white-space: nowrap; }
    .bm { position: absolute; right: 22px; bottom: 14px; width: 48px; height: 48px; }
    .bm i { position: absolute; width: 14px; height: 14px; transform: rotate(45deg); border: 1px solid color-mix(in srgb, var(--h) 60%, transparent); background: rgba(0,20,30,.6); }
    .bm i::after { content: ''; position: absolute; inset: 3px; background: var(--k); opacity: .9; }
    .bm i:nth-child(1) { left: 17px; top: 0; box-shadow: 0 0 8px var(--k); border-color: var(--k); } .bm i:nth-child(2) { left: 0; top: 17px; } .bm i:nth-child(3) { left: 34px; top: 17px; } .bm i:nth-child(4) { left: 17px; top: 34px; }
  `,
  html: `<div class="stage"><div class="w"></div><div class="rain"></div><div class="heat"></div>
    <div class="pts"><i style="left:126px;top:132px"></i><i style="left:226px;top:96px"></i><i style="left:170px;top:62px"></i></div>
    <svg class="glass" viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="sheen" cx=".3" cy=".15" r=".6"><stop offset="0" stop-color="#cfefff" stop-opacity=".12"/><stop offset="1" stop-color="#cfefff" stop-opacity="0"/></radialGradient></defs>
      <path class="fr" fill-rule="evenodd" d="M0 0H320V200H0Z M34 6C110 -2 210 -2 286 6Q312 9 314 36V164Q312 191 286 194C210 202 110 202 34 194Q8 191 6 164V36Q8 9 34 6Z"/>
      <path class="ed" d="M34 6C110 -2 210 -2 286 6Q312 9 314 36V164Q312 191 286 194C210 202 110 202 34 194Q8 191 6 164V36Q8 9 34 6Z"/>
      <rect class="gl" x="0" y="0" width="320" height="200"/></svg>
    <div class="hud"><div class="rad"><i style="left:26px;top:11px"></i><i style="left:9px;top:24px"></i></div>
      <div class="en"><div class="tanks"><i class="f"></i><i class="f"></i><i class="f"></i><i class="f"></i><i></i><i></i></div><div class="eb">ENERGY<b>99</b><u></u></div></div>
      <svg class="map" viewBox="0 0 50 42" aria-hidden="true"><path d="M8 22l10-5 10 5-10 5zM8 22v5l10 5v-5zM18 27v5l10-5v-5z"/><path d="M26 13l8-4 8 4-8 4zM26 13v4l8 4v-4zM34 17v4l8-4v-4z"/><path d="M20 30l6-3 6 3-6 3z"/><circle cx="18" cy="22" r="1.6"/></svg>
      <div class="g thr"><i></i></div><div class="g mis"><i></i></div><div class="mn">25</div>
      <svg class="ret" viewBox="0 0 46 46" aria-hidden="true"><g class="cbt"><circle cx="23" cy="23" r="13"/><path d="M23 4v6M23 36v6M4 23h6M36 23h6"/><circle cx="23" cy="23" r="1.4"/></g><g class="scn"><path d="M3 12V3h9M34 3h9v9M43 34v9h-9M12 43H3v-9"/><circle cx="23" cy="23" r="6"/></g></svg>
      <div class="vn">COMBAT</div>
      <div class="sel" role="radiogroup" aria-label="Visor">${[1, 0, 2, 3].map((i) => `<button class="v p${i}" type="button" role="radio" data-i="${i}" aria-checked="${i === 0}" aria-label="${V[i][0]} visor"><svg viewBox="0 0 24 24"><path d="${V[i][1]}"/></svg></button>`).join('')}</div>
      <div class="bm" aria-hidden="true"><i style="--k:#ffd23a"></i><i style="--k:#b06aff"></i><i style="--k:#9fe8ff"></i><i style="--k:#ff5a3a"></i></div></div></div>`,
  init(root) {
    const st = root.querySelector('.stage'), vs = [...root.querySelectorAll('.v')].sort((a, b) => a.dataset.i - b.dataset.i), vn = root.querySelector('.vn');
    const pick = (i) => {
      vs.forEach((x, j) => { x.setAttribute('aria-checked', String(j === i)); x.tabIndex = j === i ? 0 : -1; });
      st.classList.remove('scan', 'thermal', 'xray'); if (i) st.classList.add(['', 'scan', 'thermal', 'xray'][i]);
      vn.textContent = V[i][0];
    };
    vs.forEach((b, i) => {
      b.addEventListener('click', () => pick(i));
      b.addEventListener('keydown', (e) => { const j = { ArrowUp: 0, ArrowLeft: 1, ArrowRight: 2, ArrowDown: 3 }[e.key]; if (j !== undefined) { e.preventDefault(); pick(j); vs[j].focus(); } });
    });
    pick(0);
  },
};
