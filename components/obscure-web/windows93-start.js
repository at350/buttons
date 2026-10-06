const WORDS = ['Start', 'Strat', 'St4rt', 'S̷t̷a̷r̷t̷', 'tratS', 'STAЯT', 'Sta rt', '▓tart', 'Start?', 'Stop'];
// every glitch word is stacked invisibly in the label cell, so the label is always as wide as the widest one
export default {
  id: 'ob-windows93-start',
  credit: 'Windows 93 (windows93.net) — the Start button, but glitchy: the label corrupts and RGB-splits while hovered, pressed state sticks',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .bar { display: inline-flex; align-items: center; gap: 8px; padding: 3px; background: #c0c0c0; border-top: 1px solid #fff; box-shadow: 0 -1px 0 #dfdfdf; border-radius: 0 0 12px 12px; }
    .start { position: relative; display: inline-flex; align-items: center; gap: 5px; height: 24px; padding: 0 7px 0 4px; background: #c0c0c0; border: 0; cursor: pointer;
      font: 700 12px/1 Tahoma, Verdana, Arial, sans-serif; color: #000; letter-spacing: 0;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf; }
    .start:active, .start.on { box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey; background: repeating-conic-gradient(#c0c0c0 0 25%, #fff 0 50%) 0 0 / 2px 2px; }
    .start:focus-visible { outline: 1px dotted #000; outline-offset: -4px; }
    .flag { width: 18px; height: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 1px; transform: skewY(-6deg); }
    .flag i { display: block; }
    .flag i:nth-child(1) { background: #ff0000; } .flag i:nth-child(2) { background: #00ff00; } .flag i:nth-child(3) { background: #0000ff; } .flag i:nth-child(4) { background: #ffff00; }
    .start:hover .flag { animation: hue .4s steps(2) infinite; }
    @keyframes hue { 50% { filter: hue-rotate(180deg) invert(1); } }
    .lbl { position: relative; display: inline-grid; text-align: left; }
    .lbl > span { grid-area: 1 / 1; white-space: nowrap; }
    .lbl .sz { visibility: hidden; }
    .start:hover .lbl { animation: split .25s steps(2) infinite; }
    @keyframes split { 0% { text-shadow: -1px 0 #0ff, 1px 0 #f0f; } 50% { text-shadow: 1px 0 #0ff, -1px 0 #f0f; clip-path: inset(30% 0 0 0); } 75% { transform: translateX(1px); } 100% { text-shadow: -1px 0 #f00, 1px 0 #0f0; } }
    .tray { display: flex; align-items: center; gap: 6px; height: 24px; padding: 0 8px; box-shadow: inset 1px 1px grey, inset -1px -1px #fff; font: 11px Tahoma, Verdana, sans-serif; }
    .tray .clk { display: inline-grid; font-variant-numeric: tabular-nums; }
    .clk > span { grid-area: 1 / 1; white-space: nowrap; } .clk .sz { visibility: hidden; }
    .tray .ico { width: 12px; height: 12px; background: #008080; border: 1px solid #000; }
  `,
  html: `
    <div class="bar">
      <button class="start" type="button" aria-pressed="false"><span class="flag" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="lbl"><span class="t">Start</span>${WORDS.map((w) => `<span class="sz" aria-hidden="true">${w}</span>`).join('')}</span></button>
      <div class="tray"><span class="ico" aria-hidden="true"></span><span class="clk"><span class="t">13:37</span><span class="sz" aria-hidden="true">??:??</span></span></div>
    </div>`,
  init(root) {
    const btn = root.querySelector('.start'), lbl = root.querySelector('.lbl .t'), clk = root.querySelector('.clk .t');
    const words = WORDS;
    let iv = 0;
    btn.addEventListener('mouseenter', () => {
      clearInterval(iv);
      iv = setInterval(() => {
        lbl.textContent = Math.random() < .35 ? words[Math.floor(Math.random() * words.length)] : 'Start';
        clk.textContent = Math.random() < .2 ? '??:??' : '13:37';
      }, 120);
    });
    btn.addEventListener('mouseleave', () => { clearInterval(iv); iv = 0; lbl.textContent = 'Start'; clk.textContent = '13:37'; });
    btn.addEventListener('click', () => { const on = btn.classList.toggle('on'); btn.setAttribute('aria-pressed', String(on)); });
    return () => clearInterval(iv);
  },
};
