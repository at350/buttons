const MODES = [
  ['All-Purpose', 10.9, '<svg viewBox="0 0 24 24"><path d="M4 19l4 -14"/><path d="M16 5l4 14"/><path d="M12 8v-2"/><path d="M12 13v-2"/><path d="M12 18v-2"/></svg>'],
  ['Conserve', 9.9, '<svg viewBox="0 0 24 24"><path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/></svg>'],
  ['Sport', 7.9, '<svg viewBox="0 0 24 24"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>'],
  ['All-Terrain', 14.9, '<svg viewBox="0 0 24 24"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>'],
  ['Snow', 10.9, '<svg viewBox="0 0 24 24"><path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/></svg>'],
  ['Towing', 10.9, '<svg class="f" viewBox="0 -960 960 960"><path d="M40-298v-60q0-13 8.5-21.5T70-388h410L100-682v117q0 13-8.5 21.5T70-535q-13 0-21.5-8.5T40-565v-166q0-17 14.5-26t29.5-1l470 259v-271q0-13 8.5-21.5T584-800h108q14 0 26 5.5t20 16.5l168 201q7 8 10.5 18t3.5 21v240q0 13-8.5 21.5T890-268h-67q0 45-31.5 76.5T715-160q-45 0-76.5-31.5T607-268H349q0 45-31.5 76.5T241-160q-45 0-76.5-31.5T133-268H70q-13 0-21.5-8.5T40-298Zm247 76q19-19 19-46t-19-46q-19-19-46-19t-46 19q-19 19-19 46t19 46q19 19 46 19t46-19Zm474 0q19-19 19-46t-19-46q-19-19-46-19t-46 19q-19 19-19 46t19 46q19 19 46 19t46-19ZM614-560h228L692-740h-78v180Z"/></svg>'],
];

export default {
  id: 'au-rivian-drive-modes',
  credit: 'Rivian R1T / R1S — drive mode selector on the charcoal-and-amber UI; the truck rises and drops to each mode\'s ride height',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 12px; width: 340px; max-width: 100%; padding: 12px; border-radius: 12px; background: #1d1f1b; color: #e9e6dc; font: 500 13px/1 'DM Sans', system-ui, sans-serif; }
    .list { display: grid; gap: 3px; flex: none; width: 132px; }
    .m { position: relative; display: flex; align-items: center; gap: 9px; height: 30px; padding: 0 10px; border: 0; border-radius: 6px; background: transparent; color: #a3a99a; font: inherit; text-align: left; cursor: pointer; white-space: nowrap; transition: background .2s, color .2s; }
    .m::before { content: ''; position: absolute; left: 0; top: 7px; bottom: 7px; width: 3px; border-radius: 2px; background: #ffad00; transform: scaleY(0); transition: transform .25s cubic-bezier(.2,0,0,1); }
    .m:hover { background: #262923; color: #e9e6dc; }
    .m[aria-checked="true"] { background: #2b2e27; color: #ffad00; }
    .m[aria-checked="true"]::before { transform: none; }
    .m:focus-visible { outline: 2px solid #ffad00; outline-offset: -2px; }
    .m svg { width: 16px; height: 16px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .m svg.f { fill: currentColor; stroke: none; }
    .view { position: relative; flex: 1; min-width: 0; border-radius: 8px; background: linear-gradient(#24271f, #1a1c18); overflow: hidden; }
    .name { position: absolute; left: 12px; top: 12px; font: 600 15px/1 'DM Sans', system-ui, sans-serif; color: #f4f1e8; }
    .ht { position: absolute; left: 12px; top: 34px; color: #8d9584; font-size: 12px; font-variant-numeric: tabular-nums; }
    .ht b { color: #ffad00; font-weight: 600; font-size: 20px; margin-right: 3px; }
    .truck { position: absolute; left: 4px; right: 4px; bottom: 6px; width: calc(100% - 8px); height: 88px; }
    .body { transition: transform .9s cubic-bezier(.34,1.3,.5,1); }
    .body .pt { fill: url(#au-rv-paint); stroke: #7c876f; stroke-width: .6; }
    .body .win { fill: url(#au-rv-glass); stroke: #0a0b09; stroke-width: .8; }
    .body .pil { fill: #0a0b09; }
    .body .sm { fill: none; stroke: #222820; stroke-width: .6; }
    .body .hl { stroke: #8a9580; stroke-opacity: .55; }
    .body .hd { fill: #262c22; }
    .body .lb { fill: #fff6d8; filter: drop-shadow(0 0 3px #fff3c4); }
    .body .lbar { stroke: #fff6d8; stroke-width: 1.1; stroke-linecap: round; filter: drop-shadow(0 0 2px #fff3c4); }
    .body .tl { fill: #ff3b2f; }
    .body .sk { fill: none; stroke: #1a1d17; stroke-width: 1.6; }
    .wh { fill: #121411; stroke: #2c3129; stroke-width: 1; }
    .tr path { stroke: #2c3129; stroke-width: 2.2; }
    .rim { fill: #3b4237; stroke: #8d9584; stroke-width: .8; }
    .sp path { stroke: #1d211b; stroke-width: 2.2; stroke-linecap: round; }
    .hub { fill: #8d9584; }
    .gnd { stroke: #4c5245; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .arrow { stroke: #ffad00; stroke-width: 1.5; fill: none; transition: transform .9s cubic-bezier(.34,1.3,.5,1); }
  `,
  html: `
    <div class="stage">
      <div class="list" role="radiogroup" aria-label="Drive mode">${MODES.map(([n, , ic], i) => `<button class="m" type="button" role="radio" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${ic}${n}</button>`).join('')}</div>
      <div class="view">
        <div class="name">All-Purpose</div>
        <div class="ht"><b>10.9</b>in</div>
        <svg class="truck" viewBox="0 0 170 88" aria-hidden="true">
          <line class="gnd" x1="0" y1="84" x2="170" y2="84"/>
          <defs><linearGradient id="au-rv-paint" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b7663"/><stop offset=".5" stop-color="#4a5443"/><stop offset="1" stop-color="#262c22"/></linearGradient><linearGradient id="au-rv-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a4038"/><stop offset="1" stop-color="#0d0f0c"/></linearGradient></defs>
          <g class="body">
            <path class="pt" d="M8 49Q8 47 10 47L62 47 64 46C66 40 68 33.4 72 31.6L100 31C104 31 106 32 108 34L120 44.5C135 45.5 150 46.5 156 48C159.5 49 160.5 51 160.5 55L160 66C160 70 158 72 154 73L148.3 73.5A14.5 14.5 0 0 0 119.7 73.5L52.3 73.5A14.5 14.5 0 0 0 23.7 73.5L12 73.5C9 73.5 8 71 8 68Z"/>
            <path class="win" d="M73.6 33.6 99.4 33.1C102 33.1 103.8 33.8 105.6 35.4L116 44.4 74.6 44.7C73 44.7 72 43.8 72.1 42.2Z"/>
            <path class="pil" d="M91 33.3H93.6L93.4 44.6H90.8Z"/>
            <path class="sm" d="M63.6 46.6V72.6M57.2 47.4V72.8M92.2 45.2V73.2M118.2 45L117 58C116.4 62 114.6 65 111.6 67M8.6 52H61.4M10 47.8H61.6"/>
            <path class="sm hl" d="M66 55.5C100 54 130 53.5 159 53.2"/>
            <rect class="hd" x="80" y="49.4" width="6.5" height="1.6" rx=".8"/><rect class="hd" x="104" y="49.2" width="6.5" height="1.6" rx=".8"/>
            <path class="pt" d="M116.6 44.2 112.4 43.6Q110.6 43.6 110.8 45.4L111.4 47.2Q112 48.4 113.6 48L117 47.2Z"/>
            <path class="lb" d="M157.6 49.4Q160.4 49.4 160.4 52.4V57.4Q160.4 60 157.6 60Z"/>
            <path class="lbar" d="M141 46.3 157.6 48.6"/>
            <path class="tl" d="M8.2 48.8H12V51.2H8.2Z"/>
            <path class="sk" d="M24 73.6H52M120 73.6H148M150 73.4 157 72"/>
          </g>
          <g transform="translate(38 70)"><circle class="wh" r="12"/><g class="tr"><path d="M0 -12V-10.2" transform="rotate(0)"/><path d="M0 -12V-10.2" transform="rotate(20)"/><path d="M0 -12V-10.2" transform="rotate(40)"/><path d="M0 -12V-10.2" transform="rotate(60)"/><path d="M0 -12V-10.2" transform="rotate(80)"/><path d="M0 -12V-10.2" transform="rotate(100)"/><path d="M0 -12V-10.2" transform="rotate(120)"/><path d="M0 -12V-10.2" transform="rotate(140)"/><path d="M0 -12V-10.2" transform="rotate(160)"/><path d="M0 -12V-10.2" transform="rotate(180)"/><path d="M0 -12V-10.2" transform="rotate(200)"/><path d="M0 -12V-10.2" transform="rotate(220)"/><path d="M0 -12V-10.2" transform="rotate(240)"/><path d="M0 -12V-10.2" transform="rotate(260)"/><path d="M0 -12V-10.2" transform="rotate(280)"/><path d="M0 -12V-10.2" transform="rotate(300)"/><path d="M0 -12V-10.2" transform="rotate(320)"/><path d="M0 -12V-10.2" transform="rotate(340)"/></g><circle class="rim" r="7.6"/><g class="sp"><path d="M0 -2.6V-7" transform="rotate(0)"/><path d="M0 -2.6V-7" transform="rotate(72)"/><path d="M0 -2.6V-7" transform="rotate(144)"/><path d="M0 -2.6V-7" transform="rotate(216)"/><path d="M0 -2.6V-7" transform="rotate(288)"/></g><circle class="hub" r="2.4"/></g><g transform="translate(134 70)"><circle class="wh" r="12"/><g class="tr"><path d="M0 -12V-10.2" transform="rotate(0)"/><path d="M0 -12V-10.2" transform="rotate(20)"/><path d="M0 -12V-10.2" transform="rotate(40)"/><path d="M0 -12V-10.2" transform="rotate(60)"/><path d="M0 -12V-10.2" transform="rotate(80)"/><path d="M0 -12V-10.2" transform="rotate(100)"/><path d="M0 -12V-10.2" transform="rotate(120)"/><path d="M0 -12V-10.2" transform="rotate(140)"/><path d="M0 -12V-10.2" transform="rotate(160)"/><path d="M0 -12V-10.2" transform="rotate(180)"/><path d="M0 -12V-10.2" transform="rotate(200)"/><path d="M0 -12V-10.2" transform="rotate(220)"/><path d="M0 -12V-10.2" transform="rotate(240)"/><path d="M0 -12V-10.2" transform="rotate(260)"/><path d="M0 -12V-10.2" transform="rotate(280)"/><path d="M0 -12V-10.2" transform="rotate(300)"/><path d="M0 -12V-10.2" transform="rotate(320)"/><path d="M0 -12V-10.2" transform="rotate(340)"/></g><circle class="rim" r="7.6"/><g class="sp"><path d="M0 -2.6V-7" transform="rotate(0)"/><path d="M0 -2.6V-7" transform="rotate(72)"/><path d="M0 -2.6V-7" transform="rotate(144)"/><path d="M0 -2.6V-7" transform="rotate(216)"/><path d="M0 -2.6V-7" transform="rotate(288)"/></g><circle class="hub" r="2.4"/></g>
        </svg>
      </div>
    </div>`,
  init(root) {
    const btns = [...root.querySelectorAll('.m')], body = root.querySelector('.body'), name = root.querySelector('.name'), ht = root.querySelector('.ht b');
    const pick = (i) => {
      btns.forEach((b, j) => { b.setAttribute('aria-checked', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
      const [n, h] = MODES[i];
      name.textContent = n; ht.textContent = h.toFixed(1);
      body.style.transform = `translateY(${((10.9 - h) * 2.2).toFixed(1)}px)`;
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => pick(i));
      b.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        if (d) { e.preventDefault(); const n = (i + d + btns.length) % btns.length; pick(n); btns[n].focus(); }
      });
    });
  },
};
