// Metroid Prime — Samus's combat visor HUD with the visor selector: Combat, Scan, Thermal and X-Ray each re-render the world.
const V = [['COMBAT', 'M12 4v16M4 12h16'], ['SCAN', 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5'], ['THERMAL', 'M12 3c3 4 5 6 5 10a5 5 0 0 1-10 0c0-4 2-6 5-10z'], ['X-RAY', 'M5 5l14 14M19 5L5 19']];
export default {
  id: 'sf-metroid-visor',
  credit: 'Retro Studios Metroid Prime — Samus\'s visor HUD: energy tanks, radar and the D-pad visor selector; switch Combat / Scan / Thermal / X-Ray and the whole view re-renders',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 320px; height: 200px; max-width: 100%; border-radius: 12px; overflow: hidden; background: #000; font-family: 'Space Grotesk', system-ui, sans-serif; --h: #5fd4ff; }
    .w { position: absolute; inset: 0; overflow: hidden; transition: filter .3s; background: linear-gradient(#5d8a7a, #9cc0a4 45%, #3c4a33 46%, #1d2618); }
    .w i { position: absolute; display: block; }
    .rock { left: -10px; bottom: 30px; width: 130px; height: 90px; border-radius: 50% 60% 0 0; background: linear-gradient(#55604a, #262c21); }
    .rock2 { right: -20px; bottom: 40px; width: 150px; height: 110px; border-radius: 60% 40% 0 0; background: linear-gradient(#4b5642, #20261c); }
    .foe { left: 186px; top: 74px; width: 26px; height: 34px; border-radius: 40% 40% 30% 30%; background: radial-gradient(circle at 50% 35%, #8b5a7a, #3a2235); }
    .foe::after { content: ''; position: absolute; left: 7px; top: 9px; width: 12px; height: 4px; border-radius: 2px; background: #d9ff6a; }
    .thermal .w { filter: grayscale(1) contrast(1.5) brightness(.55) sepia(1) hue-rotate(-40deg) saturate(6); }
    .thermal .foe { background: radial-gradient(circle, #fff 0 20%, #ffe066 40%, #ff5a00 80%); box-shadow: 0 0 14px #ff8a00; }
    .xray .w { filter: grayscale(1) invert(1) contrast(1.6) brightness(1.1); }
    .xray .foe { background: repeating-linear-gradient(0deg, #000 0 3px, #555 3px 5px); }
    .scan .w { filter: saturate(.3) brightness(.7) sepia(.3) hue-rotate(160deg); }
    .helm { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 75% 85% at 50% 50%, transparent 62%, rgba(0,10,20,.85) 82%, #000 92%); }
    .scan .stage, .stage.scan { --h: #7ec8ff; } .stage.thermal { --h: #ffb04a; } .stage.xray { --h: #f2f2f2; }
    .hud { position: absolute; inset: 0; color: var(--h); text-shadow: 0 0 5px color-mix(in srgb, var(--h) 60%, transparent); pointer-events: none; }
    .en { position: absolute; left: 30px; top: 18px; font-size: 9px; letter-spacing: .18em; }
    .en b { font-size: 15px; letter-spacing: 0; margin-left: 4px; }
    .tanks { display: flex; gap: 3px; margin-top: 3px; } .tanks i { width: 9px; height: 6px; border: 1px solid var(--h); } .tanks i.f { background: var(--h); }
    .bar { width: 110px; height: 4px; margin-top: 3px; background: linear-gradient(90deg, var(--h) 99%, transparent 99%); opacity: .85; }
    .rad { position: absolute; right: 30px; top: 16px; width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--h); opacity: .8; }
    .rad::after { content: ''; position: absolute; left: 50%; top: 50%; width: 4px; height: 4px; margin: -2px; border-radius: 50%; background: #ff4a3a; transform: translate(9px, -4px); }
    .ret { position: absolute; left: 50%; top: 50%; width: 40px; height: 40px; margin: -20px; border: 1px solid var(--h); border-radius: 50%; opacity: .7; }
    .scan .ret { border-radius: 0; width: 60px; height: 60px; margin: -30px; border-style: dashed; animation: lk 1.2s ease-in-out infinite alternate; }
    @keyframes lk { to { transform: translate(49px, -9px) scale(.6); } }
    .sel { position: absolute; left: 24px; bottom: 16px; width: 66px; height: 66px; pointer-events: auto; }
    .v { position: absolute; width: 24px; height: 24px; border: 1px solid color-mix(in srgb, var(--h) 60%, transparent); background: rgba(0,20,30,.6); color: var(--h); cursor: pointer; padding: 0; display: grid; place-items: center; transform: rotate(45deg); }
    .v svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2; transform: rotate(-45deg); }
    .v:nth-child(1) { left: 21px; top: 0; } .v:nth-child(2) { left: 0; top: 21px; } .v:nth-child(3) { left: 42px; top: 21px; } .v:nth-child(4) { left: 21px; top: 42px; }
    .v:hover { background: color-mix(in srgb, var(--h) 25%, #000); }
    .v[aria-checked="true"] { background: var(--h); color: #001018; box-shadow: 0 0 10px var(--h); }
    .v:focus-visible { outline: 1px solid #fff; outline-offset: 2px; }
    .vn { position: absolute; left: 96px; bottom: 22px; font-size: 9px; letter-spacing: .3em; white-space: nowrap; }
  `,
  html: `<div class="stage"><div class="w"><i class="rock"></i><i class="rock2"></i><i class="foe"></i></div><div class="helm"></div>
    <div class="hud"><div class="en">ENERGY<b>99</b><div class="tanks"><i class="f"></i><i class="f"></i><i class="f"></i><i></i><i></i></div><div class="bar"></div></div>
      <div class="rad"></div><div class="ret"></div><div class="vn">COMBAT</div>
      <div class="sel" role="radiogroup" aria-label="Visor">${V.map(([n, d], i) => `<button class="v" type="button" role="radio" aria-checked="${i === 0}" aria-label="${n} visor"><svg viewBox="0 0 24 24"><path d="${d}"/></svg></button>`).join('')}</div></div></div>`,
  init(root) {
    const st = root.querySelector('.stage'), vs = [...root.querySelectorAll('.v')], vn = root.querySelector('.vn');
    vs.forEach((b, i) => b.addEventListener('click', () => {
      vs.forEach((x) => x.setAttribute('aria-checked', String(x === b)));
      st.classList.remove('scan', 'thermal', 'xray'); if (i) st.classList.add(['', 'scan', 'thermal', 'xray'][i]);
      vn.textContent = V[i][0];
    }));
  },
};
