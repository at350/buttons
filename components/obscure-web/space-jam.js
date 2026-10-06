// spacejam.com/1996 (still online): black starfield, the swirl-backed SPACE JAM logo in the middle and the
// planet links around it, each with its yellow condensed caps label on top — Jam Central (purple world),
// Planet B-Ball (basketball), Lunar Tunes (blue, red ring), The Lineup (red, cyan ring), Junior Jam (green,
// yellow bands), Jump Station (glossy green). Everything sits in fixed slots inside the starfield.
export default {
  id: 'ob-space-jam',
  credit: 'SpaceJam.com (1996) — the planet nav floating around the logo on a starfield; hover a planet and it glows, click to pick it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sky { position: relative; width: 340px; max-width: 100%; height: 236px; border-radius: 12px; overflow: hidden; background-color: #000;
      background-image: radial-gradient(1px 1px at 12px 18px, #fff, transparent), radial-gradient(1px 1px at 47px 61px, #ccc, transparent), radial-gradient(1px 1px at 83px 9px, #fff, transparent), radial-gradient(1px 1px at 101px 77px, #aaa, transparent), radial-gradient(1.5px 1.5px at 66px 33px, #fff, transparent), radial-gradient(1px 1px at 23px 92px, #bbb, transparent);
      background-size: 113px 101px; }
    .logo { position: absolute; left: 50%; top: 52%; width: 170px; height: 104px; transform: translate(-50%, -50%); pointer-events: none; }
    .pl { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 0; border: 0; background: none; cursor: pointer; }
    .pl b { font: 400 10px/1 Impact, "Arial Narrow", "Arial Black", sans-serif; letter-spacing: .2px; color: #ffff00; white-space: nowrap; text-shadow: 1px 1px 0 #000; }
    .pl svg { display: block; overflow: visible; transition: filter .15s, transform .15s; }
    .pl:hover svg, .pl[aria-pressed="true"] svg { filter: drop-shadow(0 0 4px rgba(255,255,160,.9)); transform: scale(1.06); }
    .pl[aria-pressed="true"] b { color: #ff4c4c; }
    .pl:focus-visible { outline: 1px dotted #ffff00; outline-offset: 2px; }
    .p1 { left: 14px; top: 10px; } .p2 { left: 94px; top: 6px; } .p3 { right: 12px; top: 8px; }
    .p4 { left: 10px; bottom: 12px; } .p5 { left: 144px; bottom: 6px; } .p6 { right: 14px; bottom: 10px; }
  `,
  html: `
    <div class="sky">
      <svg class="logo" viewBox="0 0 170 104" aria-label="Space Jam" role="img">
        <defs>
          <radialGradient id="sjs" cx=".5" cy=".5" r=".5"><stop offset=".25" stop-color="#2a1250"/><stop offset=".45" stop-color="#d4241a"/><stop offset=".6" stop-color="#ff8a00"/><stop offset=".72" stop-color="#ffe23a"/><stop offset=".84" stop-color="#ff6a00"/><stop offset="1" stop-color="#8a1010" stop-opacity="0"/></radialGradient>
          <linearGradient id="sjl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9f2c4"/><stop offset=".5" stop-color="#5fb7a8"/><stop offset="1" stop-color="#2a6f86"/></linearGradient>
        </defs>
        <ellipse cx="96" cy="50" rx="64" ry="46" transform="rotate(-24 96 50)" fill="url(#sjs)"/>
        <ellipse cx="96" cy="50" rx="34" ry="22" transform="rotate(-24 96 50)" fill="none" stroke="#ffd23a" stroke-width="2" opacity=".7"/>
        <text x="12" y="62" font-family="Impact, 'Arial Black', sans-serif" font-size="30" fill="url(#sjl)" stroke="#0b1a1a" stroke-width="1.6" paint-order="stroke" transform="skewX(-6)">SPACE</text>
        <text x="86" y="78" font-family="Impact, 'Arial Black', sans-serif" font-size="46" fill="url(#sjl)" stroke="#0b1a1a" stroke-width="2" paint-order="stroke">JAM</text>
      </svg>
      <button class="pl p1" type="button" aria-pressed="false"><b>JAM CENTRAL</b><svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true"><circle cx="19" cy="19" r="18" fill="#8b2fc9"/><path d="M8 12c3-3 8-4 10-1s-2 5 1 8-4 6-7 3-6-6-4-10zM22 6c4 0 9 3 10 7s-3 3-5 2-6-2-5-6zM24 22c3-1 7 1 7 4s-4 6-7 5-3-8 0-9z" fill="#39d353"/><circle cx="13" cy="12" r="5" fill="#fff" opacity=".18"/></svg></button>
      <button class="pl p2" type="button" aria-pressed="false"><b>PLANET B-BALL</b><svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="17" fill="#ff9a1f" stroke="#7a3b00" stroke-width="1"/><path d="M1 18h34M18 1v34M6 6c6 6 6 18 0 24M30 6c-6 6-6 18 0 24" fill="none" stroke="#5a2a00" stroke-width="1.3"/></svg></button>
      <button class="pl p3" type="button" aria-pressed="false"><b>LUNAR TUNES</b><svg width="56" height="40" viewBox="0 0 56 40" aria-hidden="true"><circle cx="28" cy="20" r="16" fill="#1f63c9"/><circle cx="23" cy="14" r="7" fill="#5fa0f0" opacity=".55"/><ellipse cx="28" cy="22" rx="27" ry="6" transform="rotate(-14 28 22)" fill="none" stroke="#ff2a3d" stroke-width="3"/><path d="M12 20a16 16 0 0 0 32 0" fill="#1f63c9" opacity="0"/></svg></button>
      <button class="pl p4" type="button" aria-pressed="false"><b>THE LINEUP</b><svg width="48" height="34" viewBox="0 0 48 34" aria-hidden="true"><ellipse cx="24" cy="17" rx="23" ry="6" transform="rotate(-12 24 17)" fill="none" stroke="#2fd0e8" stroke-width="3"/><circle cx="24" cy="17" r="13" fill="#f2263f"/><circle cx="20" cy="12" r="5" fill="#ff8a96" opacity=".6"/><path d="M2.5 21.5a23 6 -12 0 0 43-9" fill="none" stroke="#2fd0e8" stroke-width="3"/></svg></button>
      <button class="pl p5" type="button" aria-pressed="false"><b>JUNIOR JAM</b><svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="16" fill="#3ccf1a"/><path d="M3 11c6-2 10 2 16 0s9-3 12 0M2 17c6-2 11 2 16 0s10-2 14 0M3 23c6-2 10 2 16 0s9-2 12 0" fill="none" stroke="#f5f53a" stroke-width="2.2"/></svg></button>
      <button class="pl p6" type="button" aria-pressed="false"><b>JUMP STATION</b><svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><defs><radialGradient id="sjg" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#e8ffe0"/><stop offset=".35" stop-color="#4fe04a"/><stop offset="1" stop-color="#0a8a12"/></radialGradient></defs><circle cx="18" cy="18" r="17" fill="url(#sjg)"/></svg></button>
    </div>`,
  init(root) {
    const pls = [...root.querySelectorAll('.pl')];
    pls.forEach((b, i) => {
      b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; pls.forEach((x) => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', String(on)); });
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); pls[(i + 1) % pls.length].focus(); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); pls[(i - 1 + pls.length) % pls.length].focus(); }
      });
    });
  },
};
