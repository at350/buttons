// spacejam.com/1996 (still online): the real tiled bg_stars.gif starfield, the swirl-backed SPACE JAM logo in
// the middle and the planet links around it, each planet GIF carrying its own yellow condensed caps label —
// Jam Central, Planet B-Ball, Lunar Tunes, The Lineup, Junior Jam, Jump Station. All six planets and the logo
// are the site's own 1996 GIFs (fetched from spacejam.com/1996/img); they sit in fixed slots inside the starfield.
const PLANETS = [
  ['p1', 'Jam Central', 'jamcentral', 55, 67],
  ['p2', 'Planet B-Ball', 'bball', 62, 62],
  ['p3', 'Lunar Tunes', 'lunartunes', 95, 77],
  ['p4', 'The Lineup', 'lineup', 63, 52],
  ['p5', 'Junior Jam', 'junior', 49, 57],
  ['p6', 'Jump Station', 'jump', 58, 52],
];
export default {
  id: 'ob-space-jam',
  credit: 'SpaceJam.com (1996) — the planet nav floating around the logo on a starfield; hover a planet and it glows, click to pick it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sky { position: relative; width: 340px; max-width: 100%; height: 290px; border-radius: 12px; overflow: hidden; background: #000 url(assets/real/spacejam-1996-stars.gif); }
    .logo { position: absolute; left: 50%; top: 50%; width: 220px; height: 133px; transform: translate(-50%, -50%); pointer-events: none; display: block; }
    .pl { position: absolute; display: block; padding: 0; border: 0; background: none; cursor: pointer; line-height: 0; }
    .pl img { display: block; transition: filter .15s, transform .15s; }
    .pl:hover img, .pl[aria-pressed="true"] img { filter: drop-shadow(0 0 5px rgba(255,255,160,.9)); transform: scale(1.06); }
    .pl[aria-pressed="true"] img { filter: drop-shadow(0 0 5px rgba(255,255,160,.9)) hue-rotate(-30deg) saturate(1.4); }
    .pl:focus-visible { outline: 1px dotted #ffff00; outline-offset: 2px; }
    .p1 { left: 12px; top: 8px; } .p2 { left: 100px; top: 6px; } .p3 { right: 12px; top: 8px; }
    .p4 { left: 12px; bottom: 10px; } .p5 { left: 146px; bottom: 8px; } .p6 { right: 14px; bottom: 10px; }
  `,
  html: `
    <div class="sky">
      <img class="logo" src="assets/real/spacejam-1996-logo.gif" alt="Space Jam" width="220" height="133">
      ${PLANETS.map(([c, n, f, w, h]) => `<button class="pl ${c}" type="button" aria-pressed="false" aria-label="${n}"><img src="assets/real/spacejam-1996-${f}.gif" alt="" width="${w}" height="${h}"></button>`).join('\n      ')}
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
