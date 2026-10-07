const STARS = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%23000'/%3E%3Cg fill='%23fff'%3E%3Crect x='5' y='9' width='1' height='1'/%3E%3Crect x='22' y='3' width='1' height='1' opacity='.6'/%3E%3Crect x='41' y='14' width='2' height='2'/%3E%3Crect x='57' y='6' width='1' height='1' opacity='.7'/%3E%3Crect x='13' y='30' width='1' height='1' opacity='.5'/%3E%3Crect x='33' y='37' width='1' height='1'/%3E%3Crect x='51' y='29' width='1' height='1' opacity='.6'/%3E%3Crect x='8' y='52' width='2' height='2' opacity='.8'/%3E%3Crect x='28' y='58' width='1' height='1' opacity='.5'/%3E%3Crect x='46' y='49' width='1' height='1'/%3E%3C/g%3E%3Crect x='60' y='41' width='1' height='1' fill='%23ff0'/%3E%3C/svg%3E";
const links = ['Home', 'About Me', 'My Pets', 'Cool Links', 'Guestbook', 'WebRing', 'E-Mail Me!'];
export default {
  id: 'mn-geocities-nav',
  credit: '1998 GeoCities homepage nav — starfield tile, Win95-bevel table cells, blue/red/purple links, blinking NEW!, odometer hit counter',
  size: 'full',
  css: `
    :host { display: block; }
    .stage { background: #000 url("${STARS}") repeat; border-radius: 12px; padding: 12px; overflow-x: auto; color: #fff; font-family: "Times New Roman", Times, serif; }
    .rainbow { height: 4px; margin: 0 auto 10px; min-width: 520px; background: linear-gradient(90deg, #f00, #ff8000, #ff0, #0f0, #00f, #8000ff, #f0f); }
    table { border-collapse: separate; border-spacing: 3px; width: 100%; min-width: 520px; background: #c0c0c0; box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; padding: 2px; }
    td { padding: 0; text-align: center; }
    .lk { position: relative; display: block; width: 100%; padding: 6px 10px 7px; border: 0; background: #c0c0c0; box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; color: #0000ee; font: bold 16px/1 "Times New Roman", Times, serif; text-decoration: underline; cursor: pointer; white-space: nowrap; }
    .lk:hover { color: #ff0000; }
    .lk:active { box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080; padding: 7px 9px 6px 11px; }
    .lk.v { color: #551a8b; }
    .lk.v:hover { color: #ff0000; }
    .lk:focus-visible { outline: 1px dotted #000; outline-offset: -5px; }
    .new { position: absolute; top: -7px; right: -4px; padding: 1px 3px; background: #ff0000; color: #ffff00; font: bold 10px/1 Arial, sans-serif; text-decoration: none; animation: blink 1s steps(1, end) infinite; transform: rotate(8deg); }
    @keyframes blink { 50% { opacity: 0; } }
    .cnt { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 10px; min-width: 520px; font: 13px/1 "Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive; color: #0f0; }
    .odo { display: inline-flex; gap: 1px; padding: 2px; background: #333; border: 1px solid #888; }
    .odo b { width: 12px; height: 17px; display: grid; place-items: center; background: linear-gradient(#000, #222 50%, #000 50%, #1a1a1a); color: #fff; font: bold 13px/1 "Courier New", Courier, monospace; }
    .odo b.flip { animation: flip .25s; }
    @keyframes flip { from { transform: scaleY(.2); } }
  `,
  html: `
    <div class="stage">
      <div class="rainbow"></div>
      <table><tr>${links.map((l, i) => `<td><button class="lk" type="button">${l}${i === 3 ? '<span class="new" aria-hidden="true">NEW!</span>' : ''}</button></td>`).join('')}</tr></table>
      <div class="cnt">You are visitor # <span class="odo" aria-live="polite">${'000124'.split('').map((d) => `<b>${d}</b>`).join('')}</span></div>
    </div>`,
  init(root) {
    const odo = root.querySelector('.odo');
    let n = 124;
    root.querySelectorAll('.lk').forEach((b) => b.addEventListener('click', () => {
      b.classList.add('v');
      const prev = String(n).padStart(6, '0'); n++; const s = String(n).padStart(6, '0');
      [...odo.children].forEach((c, i) => { if (prev[i] !== s[i]) { c.textContent = s[i]; c.classList.remove('flip'); void c.offsetWidth; c.classList.add('flip'); } });
    }));
  },
};
