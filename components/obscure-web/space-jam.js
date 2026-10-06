export default {
  id: 'ob-space-jam',
  credit: 'SpaceJam.com (1996, still online) — planets orbiting the logo on a starfield; hover a planet and it glows, click to visit (it stays lit)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sky { position: relative; width: 320px; max-width: 100%; height: 200px; border-radius: 12px; overflow: hidden; background: #000;
      background-image: radial-gradient(#fff .6px, transparent .7px), radial-gradient(#9cf .5px, transparent .6px), radial-gradient(circle at 50% 50%, #1a0a2e 0, #000 70%); background-size: 37px 41px, 53px 47px, 100% 100%; }
    .logo { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center; pointer-events: none; }
    .logo b { display: block; font: 900 22px/1 Impact, "Arial Black", Arial, sans-serif; letter-spacing: 1px; color: #ffd200; -webkit-text-stroke: 1px #c0392b; text-shadow: 2px 2px 0 #c0392b; }
    .logo b + b { color: #fff; -webkit-text-stroke: 1px #2b3fc0; text-shadow: 2px 2px 0 #2b3fc0; font-size: 18px; }
    .pl { position: absolute; width: 44px; height: 44px; padding: 0; border: 0; border-radius: 50%; cursor: pointer; background: none; display: grid; place-items: center; transition: transform .2s; }
    .pl:hover { transform: scale(1.15); }
    .pl:focus-visible { outline: 2px dotted #fff; outline-offset: 2px; }
    .pl svg { width: 100%; height: 100%; overflow: visible; }
    .pl .orb { transition: filter .2s; }
    .pl:hover .orb, .pl.vis .orb { filter: drop-shadow(0 0 6px currentColor) drop-shadow(0 0 12px currentColor); }
    .pl .nm { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); font: 700 8px/1 Impact, "Arial Black", Arial, sans-serif; letter-spacing: .5px; color: #fff; white-space: nowrap; text-shadow: 1px 1px 0 #000; opacity: .7; }
    .pl:hover .nm, .pl.vis .nm { opacity: 1; color: #ffd200; }
    .p1 { left: 18px; top: 18px; color: #ff6b35; }
    .p2 { right: 24px; top: 14px; color: #6bd3ff; }
    .p3 { left: 40px; bottom: 36px; color: #c86bff; }
    .p4 { right: 44px; bottom: 30px; color: #6bff95; }
    .p5 { left: 50%; top: 10px; margin-left: -22px; color: #ffd200; }
  `,
  html: `
    <div class="sky">
      <div class="logo" aria-hidden="true"><b>SPACE</b><b>JAM</b></div>
      <button class="pl p1" type="button" aria-pressed="false"><svg viewBox="0 0 44 44" aria-hidden="true"><circle class="orb" cx="22" cy="22" r="14" fill="currentColor"/><ellipse cx="22" cy="22" rx="20" ry="5" fill="none" stroke="#fff" stroke-width="1.5" opacity=".8"/></svg><span class="nm">JAM CENTRAL</span></button>
      <button class="pl p2" type="button" aria-pressed="false"><svg viewBox="0 0 44 44" aria-hidden="true"><circle class="orb" cx="22" cy="22" r="13" fill="currentColor"/><circle cx="17" cy="18" r="3" fill="rgba(0,0,0,.25)"/><circle cx="26" cy="26" r="2" fill="rgba(0,0,0,.25)"/></svg><span class="nm">PLANET B-BALL</span></button>
      <button class="pl p3" type="button" aria-pressed="false"><svg viewBox="0 0 44 44" aria-hidden="true"><circle class="orb" cx="22" cy="22" r="12" fill="currentColor"/><path d="M12 22h20M22 12v20" stroke="rgba(0,0,0,.3)" stroke-width="2"/></svg><span class="nm">LUNAR TUNES</span></button>
      <button class="pl p4" type="button" aria-pressed="false"><svg viewBox="0 0 44 44" aria-hidden="true"><circle class="orb" cx="22" cy="22" r="11" fill="currentColor"/><path d="M11 22a11 11 0 0 0 22 0" fill="rgba(0,0,0,.25)"/></svg><span class="nm">JUNIOR JAM</span></button>
      <button class="pl p5" type="button" aria-pressed="false"><svg viewBox="0 0 44 44" aria-hidden="true"><circle class="orb" cx="22" cy="22" r="10" fill="currentColor"/><circle cx="22" cy="22" r="14" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/></svg><span class="nm">SITE MAP</span></button>
    </div>`,
  init(root) {
    const pls = [...root.querySelectorAll('.pl')];
    pls.forEach((b, i) => {
      b.addEventListener('click', () => { const on = b.classList.toggle('vis'); b.setAttribute('aria-pressed', String(on)); });
      // orbit with the arrow keys, like tabbing around the planets
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); pls[(i + 1) % pls.length].focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); pls[(i - 1 + pls.length) % pls.length].focus(); }
      });
    });
  },
};
