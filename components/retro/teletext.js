// Teletext level-1 palette: the seven full-saturation colours on black.
const C = { r: '#ff0000', g: '#00ff00', y: '#ffff00', b: '#0000ff', m: '#ff00ff', c: '#00ffff', w: '#ffffff', k: '#000000' };
const PAGES = {
  100: { band: 'b', ink: 'y', title: 'CEEFAX', lines: [['News', '101', 'c'], ['Sport', '300', 'g'], ['Weather', '400', 'y']] },
  101: { band: 'r', ink: 'w', title: 'NEWS', lines: [['UK', '104', 'c'], ['World', '120', 'c'], ['Business', '124', 'c']] },
  300: { band: 'g', ink: 'b', title: 'SPORT', lines: [['Football', '302', 'y'], ['Cricket', '340', 'y'], ['Tennis', '350', 'y']] },
  400: { band: 'y', ink: 'b', title: 'WEATHER', lines: [['Forecast', '401', 'w'], ['Regions', '402', 'w'], ['Travel', '430', 'w']] },
  600: { band: 'c', ink: 'b', title: 'TV', lines: [['BBC One', '601', 'w'], ['BBC Two', '602', 'w'], ['Radio', '640', 'w']] },
};
const FAST = { r: '101', g: '300', y: '400', c: '600' };
export default {
  id: 'rt-teletext',
  credit: 'BBC Ceefax teletext — 40-column page in the seven teletext colours, Fastext prompts and the matching remote keys',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #161616; padding: 12px; border-radius: 12px; display: inline-block; }
    .scr { width: 252px; padding: 6px; background: #000; border-radius: 6px; box-shadow: inset 0 0 12px rgba(255,255,255,.08);
      font: 700 10px/10px "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace; color: #fff; }
    .row { height: 10px; width: 240px; white-space: pre; display: flex; }
    .row span { flex: none; }
    .band { height: 20px; display: flex; align-items: flex-start; }
    .band .dh { display: inline-block; transform: scaleY(2); transform-origin: 0 0; letter-spacing: 0; }
    .bbc { display: inline-flex; gap: 2px; margin: 2px 8px 0 6px; }
    .bbc i { width: 12px; height: 16px; background: #fff; color: #000; font: 900 11px/16px "Arial Black", Arial, sans-serif; text-align: center; font-style: normal; }
    .num.seek { color: #ffffff; }
    .keys { display: flex; gap: 8px; margin-top: 10px; padding: 0 4px; }
    .fk { flex: 1; height: 16px; border: none; border-radius: 8px; cursor: pointer; position: relative; padding: 0; outline: none;
      box-shadow: inset 0 -3px 0 rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.45), 0 2px 0 #050505; transition: transform .05s; }
    .fk:active { transform: translateY(2px); box-shadow: inset 0 2px 3px rgba(0,0,0,.45); }
    .fk:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .fk.r { background: #d9141e; } .fk.g { background: #17a53b; } .fk.y { background: #f0c400; } .fk.c { background: #1b54c9; }
  `,
  html: `
    <div class="stage">
      <div class="scr" aria-live="polite"></div>
      <div class="keys">
        <button class="fk r" type="button" aria-label="Red: News"></button>
        <button class="fk g" type="button" aria-label="Green: Sport"></button>
        <button class="fk y" type="button" aria-label="Yellow: Weather"></button>
        <button class="fk c" type="button" aria-label="Blue: TV"></button>
      </div>
    </div>`,
  init(root) {
    const scr = root.querySelector('.scr');
    const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);
    const dots = (a, b, n) => a + ' ' + '.'.repeat(Math.max(1, n - a.length - b.length - 2)) + ' ' + b;
    let cur = 100, timer = 0;
    const header = (num) => `<div class="row"><span style="color:${C.w}"> P${num}  </span><span style="color:${C.y}">CEEFAX 1 </span><span class="num" style="color:${C.w}">${num}</span><span style="color:${C.w}"> Mon 06 Oct</span><span style="color:${C.y}"> 21:34/19</span></div>`;
    const draw = (shown, num) => {
      const p = PAGES[shown];
      const band = `<div class="row band" style="background:${C[p.band]}">${shown === 100 ? '<span class="bbc"><i>B</i><i>B</i><i>C</i></span>' : '<span>  </span>'}<span class="dh" style="color:${C[p.ink]}">${pad(p.title, 20)}</span></div>`;
      const lines = p.lines.map(([a, n, c]) => `<div class="row"><span style="color:${C[c]}">  ${dots(a, '', 26)}</span><span style="color:${C.w}">${n}</span></div>`).join('');
      const fast = `<div class="row"><span style="color:${C.r}">News    </span><span style="color:${C.g}">Sport   </span><span style="color:${C.y}">Weather </span><span style="color:${C.c}">TV</span></div>`;
      scr.innerHTML = header(num) + band + '<div class="row"></div>' + lines + '<div class="row"></div>' + fast;
    };
    const go = (target) => {
      clearInterval(timer);
      let n = cur, steps = 0;
      timer = setInterval(() => {
        n = n >= 899 ? 100 : n + 1 + Math.floor(Math.random() * 3); steps++;
        if (steps >= 9) { clearInterval(timer); cur = Number(target); draw(cur, cur); return; }
        draw(cur, n);
      }, 70);
    };
    root.querySelectorAll('.fk').forEach((k) => k.addEventListener('click', () => go(FAST[k.classList[1]])));
    draw(100, 100);
    return () => clearInterval(timer);
  },
};
