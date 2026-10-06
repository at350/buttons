// Fallout 4 — Pip-Boy 3000 Mk IV in amber: STAT / INV / DATA / MAP / RADIO, the bracketed tab rule, a CRT that flickers; turn the knob or tap a tab.
const TABS = ['STAT', 'INV', 'DATA', 'MAP', 'RADIO'];
const BODY = [
  ['STRENGTH 5', 'PERCEPTION 4', 'ENDURANCE 6', 'CHARISMA 3', 'INTELLIGENCE 7'],
  ['10mm Pistol', 'Stimpak (4)', 'Nuka-Cola (2)', 'RadAway (1)', 'Bobby Pin (12)'],
  ['When Freedom Calls', 'Out of Time', 'Jewel of the Commonwealth', 'Unlikely Valentine', 'Getting a Clue'],
  [],
  ['Diamond City Radio', 'Classical Radio', 'Distress Signal', 'Minutemen Radio', 'Silver Shroud Radio'],
];
export default {
  id: 'sf-pipboy',
  credit: 'Bethesda Fallout 4 — Pip-Boy 3000 Mk IV with the amber display colour: STAT / INV / DATA / MAP / RADIO tabs on the bracketed rule, flickering scanlined CRT; turn the tuning knob or tap a tab, pick a row',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 340px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 12px; background: linear-gradient(#5a5640, #3b3829); display: grid; grid-template-columns: 1fr 44px; gap: 10px; align-items: center;
      box-shadow: inset 0 1px 0 #7c7758, inset 0 -2px 0 #24221a; }
    .crt { position: relative; height: 196px; border-radius: 16px / 22px; overflow: hidden; padding: 8px 12px; background: radial-gradient(ellipse at 50% 45%, #2a1a02, #0e0800 80%);
      box-shadow: inset 0 0 0 3px #15130d, inset 0 0 26px #000; color: #ffb642; font: 500 10px/1.25 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .04em;
      text-shadow: 0 0 4px rgba(255,170,50,.7); animation: fl 5s infinite; }
    @keyframes fl { 0%, 100% { opacity: 1; } 31% { opacity: .93; } 32% { opacity: 1; } 77% { opacity: .96; } }
    .crt::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(0,0,0,.32) 0 1px, transparent 1px 3px); }
    .tabs { display: flex; justify-content: space-between; position: relative; padding: 0 4px 5px; }
    .tabs::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: #ffb642; box-shadow: 0 0 4px #ffb642; }
    .t { position: relative; z-index: 1; border: 0; background: none; color: inherit; cursor: pointer; font: 600 11px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .06em; text-shadow: inherit; padding: 2px 4px; }
    .t[aria-selected="true"]::after { content: ''; position: absolute; left: -3px; right: -3px; bottom: -6px; height: 9px; border: 1px solid #ffb642; border-bottom: 0; background: #1a1001; }
    .t[aria-selected="true"]::before { content: ''; position: absolute; left: -2px; right: -2px; bottom: -6px; height: 3px; background: #1a1001; z-index: 1; }
    .t:hover { color: #ffd38a; }
    .t:focus-visible, .r:focus-visible, .knob:focus-visible { outline: 1px dashed #ffb642; outline-offset: 1px; }
    .list { margin-top: 8px; height: 128px; display: grid; align-content: start; gap: 2px; }
    .r { display: flex; align-items: center; gap: 6px; height: 21px; padding: 0 6px; border: 0; background: none; color: inherit; font: inherit; letter-spacing: inherit; text-shadow: inherit; cursor: pointer; text-align: left; white-space: nowrap; }
    .r::before { content: ''; width: 6px; height: 6px; flex: none; }
    .r[aria-checked="true"]::before { background: currentColor; }
    .r:hover, .r.hl { background: #ffb642; color: #1a1001; text-shadow: none; }
    .map { position: absolute; left: 12px; right: 12px; top: 40px; height: 126px; display: none; background: linear-gradient(rgba(255,182,66,.25) 1px, transparent 1px) 0 0 / 18px 18px, linear-gradient(90deg, rgba(255,182,66,.25) 1px, transparent 1px) 0 0 / 18px 18px; }
    .map b { position: absolute; left: 56%; top: 46%; width: 0; height: 0; border: 6px solid transparent; border-bottom: 12px solid #ffb642; transform: rotate(30deg); }
    .map i { position: absolute; width: 5px; height: 5px; border: 1px solid #ffb642; }
    .m .map { display: block; } .m .list { visibility: hidden; }
    .ft { position: absolute; left: 12px; right: 12px; bottom: 8px; display: flex; justify-content: space-between; padding: 3px 6px; background: rgba(255,182,66,.18); font-size: 9px; white-space: nowrap; }
    .knob { width: 44px; height: 44px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: repeating-conic-gradient(#2a281d 0 6deg, #5f5a42 6deg 12deg);
      box-shadow: 0 0 0 3px #24221a, 0 3px 4px rgba(0,0,0,.6); transition: transform .25s cubic-bezier(.3,1.5,.5,1); }
    .knob::after { content: ''; display: block; margin: 9px; height: 26px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #8a8462, #3e3a2a); box-shadow: inset 0 0 0 1px #1d1b14; }
    .knob:active { filter: brightness(1.15); }
  `,
  html: `<div class="stage"><div class="crt"><div class="tabs" role="tablist">${TABS.map((t, i) => `<button class="t" type="button" role="tab" aria-selected="${i === 0}">${t}</button>`).join('')}</div>
    <div class="list"></div><div class="map"><i style="left:20%;top:30%"></i><i style="left:74%;top:18%"></i><i style="left:34%;top:70%"></i><b></b></div>
    <div class="ft"><span>HP 115/115</span><span>LEVEL 12</span><span>AP 80/80</span></div></div>
    <button class="knob" type="button" aria-label="Tuning knob"></button></div>`,
  init(root) {
    const crt = root.querySelector('.crt'), tabs = [...root.querySelectorAll('.t')], list = root.querySelector('.list'), knob = root.querySelector('.knob');
    let cur = 0, turns = 0; const pick = [0, 1, 0, 0, 0];
    const show = (i) => {
      cur = i; tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === i))); crt.classList.toggle('m', i === 3);
      list.innerHTML = BODY[i].map((r, j) => `<button class="r" type="button" role="radio" aria-checked="${j === pick[i]}">${r}</button>`).join('');
      [...list.children].forEach((b, j) => b.addEventListener('click', () => { pick[i] = j; [...list.children].forEach((x, k) => x.setAttribute('aria-checked', String(k === j))); }));
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => show(i)));
    knob.addEventListener('click', () => { turns++; knob.style.transform = `rotate(${turns * 72}deg)`; show((cur + 1) % TABS.length); });
    knob.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); turns--; knob.style.transform = `rotate(${turns * 72}deg)`; show((cur + TABS.length - 1) % TABS.length); } });
    show(0);
  },
};
