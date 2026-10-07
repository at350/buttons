// Fallout 4 — Pip-Boy 3000 Mk IV in its default green: STAT ▸ SPECIAL with Vault Boy, INV / DATA / MAP / RADIO, the bracketed tab rule,
// a CRT that flickers; turn the knob or tap a tab. Vault Boy is the real artwork, tinted to the screen phosphor.
const TABS = ['STAT', 'INV', 'DATA', 'MAP', 'RADIO'];
const SUB = [['STATUS', 'SPECIAL', 'PERKS'], ['WEAPONS', 'APPAREL', 'AID'], ['QUESTS', 'WORKSHOPS', 'STATS'], ['WORLD MAP', 'LOCAL MAP'], []];
const BODY = [
  [['Strength', 5], ['Perception', 4], ['Endurance', 6], ['Charisma', 3], ['Intelligence', 7], ['Agility', 5], ['Luck', 4]],
  [['10mm Pistol', ''], ['Pipe Rifle', ''], ['Baseball Bat', ''], ['Laser Musket', ''], ['Fat Man', ''], ['Frag Grenade', '(6)'], ['Molotov Cocktail', '(3)']],
  [['When Freedom Calls', ''], ['Out of Time', ''], ['Jewel of the Commonwealth', ''], ['Unlikely Valentine', ''], ['Getting a Clue', ''], ['Reunions', ''], ['Dangerous Minds', '']],
  [],
  [['Diamond City Radio', ''], ['Classical Radio', ''], ['Distress Signal', ''], ['Minutemen Radio', ''], ['Silver Shroud Radio', ''], ['Military Frequency AF95', ''], ['Emergency Frequency RJ1138', '']],
];
export default {
  id: 'sf-pipboy',
  credit: 'Bethesda Fallout 4 — Pip-Boy 3000 Mk IV in the default green: STAT ▸ SPECIAL list with Vault Boy, INV / DATA / MAP / RADIO tabs on the bracketed rule, flickering scanlined CRT; turn the tuning knob or tap a tab, pick a row',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 340px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 12px; background: linear-gradient(#5a5640, #3b3829); display: grid; grid-template-columns: 1fr 44px; gap: 10px; align-items: center;
      box-shadow: inset 0 1px 0 #7c7758, inset 0 -2px 0 #24221a; --g: #1aff80; --gd: #0a3a20; }
    .crt { position: relative; height: 204px; border-radius: 16px / 22px; overflow: hidden; padding: 8px 12px; background: radial-gradient(ellipse at 50% 45%, #06261a, #010a06 80%);
      box-shadow: inset 0 0 0 3px #15130d, inset 0 0 26px #000; color: var(--g); font: 500 10px/1.25 'Roboto Flex', 'Space Grotesk', system-ui, sans-serif; letter-spacing: .02em;
      text-shadow: 0 0 4px rgba(26,255,128,.6); animation: fl 5s infinite; }
    @keyframes fl { 0%, 100% { opacity: 1; } 31% { opacity: .93; } 32% { opacity: 1; } 77% { opacity: .96; } }
    .crt::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(0,0,0,.3) 0 1px, transparent 1px 3px); }
    .tabs { display: flex; justify-content: space-between; position: relative; padding: 0 4px 5px; }
    .tabs::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--g); box-shadow: 0 0 4px var(--g); }
    .t { position: relative; z-index: 1; border: 0; background: none; color: inherit; cursor: pointer; font: 700 12px 'Roboto Flex', 'Space Grotesk', sans-serif; font-stretch: 85%; letter-spacing: .04em; text-shadow: inherit; padding: 2px 4px; }
    .t[aria-selected="true"]::after { content: ''; position: absolute; left: -3px; right: -3px; bottom: -6px; height: 9px; border: 1px solid var(--g); border-bottom: 0; background: #031a0e; }
    .t[aria-selected="true"]::before { content: ''; position: absolute; left: -2px; right: -2px; bottom: -6px; height: 3px; background: #031a0e; z-index: 1; }
    .t:hover { color: #b8ffd8; }
    .t:focus-visible, .r:focus-visible, .knob:focus-visible { outline: 1px dashed var(--g); outline-offset: 1px; }
    .sub { display: flex; justify-content: center; gap: 12px; height: 14px; margin-top: 4px; font: 600 8.5px 'Roboto Flex', sans-serif; font-stretch: 85%; letter-spacing: .06em; white-space: nowrap; }
    .sub span { opacity: .45; } .sub span.on { opacity: 1; }
    .body { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 3px; height: 119px; }
    .st .body { grid-template-columns: 132px 1fr; }
    .list { display: grid; align-content: start; gap: 1px; min-width: 0; }
    .r { display: flex; align-items: center; justify-content: space-between; gap: 6px; height: 16px; padding: 0 5px; border: 0; background: none; color: inherit; font: inherit; font-size: 10px; letter-spacing: inherit; text-shadow: inherit; cursor: pointer; text-align: left; white-space: nowrap; overflow: hidden; }
    .r::before { content: ''; width: 5px; height: 5px; flex: none; margin-right: 1px; }
    .r span { flex: 1; overflow: hidden; text-overflow: ellipsis; }
    .r[aria-checked="true"] { background: var(--g); color: #031a0e; text-shadow: none; }
    .r[aria-checked="true"]::before { background: #031a0e; }
    .r:hover:not([aria-checked="true"]) { background: rgba(26,255,128,.16); }
    .vb { display: none; position: relative; justify-self: center; width: 74px; height: 112px; background: var(--g); filter: drop-shadow(0 0 3px rgba(26,255,128,.55));
      -webkit-mask: url(assets/real/scifi-vault-boy.png) center / contain no-repeat; mask: url(assets/real/scifi-vault-boy.png) center / contain no-repeat; }
    .vb img { display: block; width: 100%; height: 100%; object-fit: contain; filter: grayscale(1) contrast(1.6) brightness(1.15); mix-blend-mode: multiply; }
    .st .vb { display: block; }
    .map { position: absolute; left: 12px; right: 12px; top: 50px; height: 116px; display: none; background: linear-gradient(rgba(26,255,128,.22) 1px, transparent 1px) 0 0 / 18px 18px, linear-gradient(90deg, rgba(26,255,128,.22) 1px, transparent 1px) 0 0 / 18px 18px; }
    .map b { position: absolute; left: 56%; top: 46%; width: 0; height: 0; border: 6px solid transparent; border-bottom: 12px solid var(--g); transform: rotate(30deg); }
    .map i { position: absolute; width: 5px; height: 5px; border: 1px solid var(--g); }
    .m .map { display: block; } .m .body { visibility: hidden; }
    .ft { position: absolute; left: 12px; right: 12px; bottom: 8px; display: flex; align-items: center; gap: 6px; height: 15px; padding: 0 6px; background: rgba(26,255,128,.16); font-size: 9px; white-space: nowrap; }
    .ft u { flex: 1; height: 5px; border: 1px solid var(--g); background: linear-gradient(90deg, var(--g) 62%, transparent 62%); }
    .ft span:first-child { margin-right: auto; }
    .crt { grid-column: 1; grid-row: 1; }
    .knob { grid-column: 2; grid-row: 1; width: 44px; height: 44px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: repeating-conic-gradient(#2a281d 0 6deg, #5f5a42 6deg 12deg);
      box-shadow: 0 0 0 3px #24221a, 0 3px 4px rgba(0,0,0,.6); transition: transform .25s cubic-bezier(.3,1.5,.5,1); }
    .knob::after { content: ''; display: block; margin: 9px; height: 26px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #8a8462, #3e3a2a); box-shadow: inset 0 0 0 1px #1d1b14; }
    .knob:active { filter: brightness(1.15); }
  `,
  html: `<div class="stage"><button class="knob" type="button" aria-label="Tuning knob"></button><div class="crt st"><div class="tabs" role="tablist">${TABS.map((t, i) => `<button class="t" type="button" role="tab" aria-selected="${i === 0}">${t}</button>`).join('')}</div>
    <div class="sub"></div>
    <div class="body"><div class="list"></div><div class="vb"><img src="assets/real/scifi-vault-boy.png" alt="" draggable="false"></div></div>
    <div class="map"><i style="left:20%;top:30%"></i><i style="left:74%;top:18%"></i><i style="left:34%;top:70%"></i><b></b></div>
    <div class="ft"><span>HP 115/115</span><span>LEVEL 12</span><u></u><span>AP 80/80</span></div></div>
    </div>`,
  init(root) {
    const crt = root.querySelector('.crt'), tabs = [...root.querySelectorAll('.t')], list = root.querySelector('.list'), sub = root.querySelector('.sub'), knob = root.querySelector('.knob');
    let cur = 0, turns = 0; const pick = [0, 0, 1, 0, 0];
    const show = (i) => {
      cur = i; tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === i))); crt.classList.toggle('m', i === 3); crt.classList.toggle('st', i === 0);
      sub.innerHTML = SUB[i].map((s, j) => `<span class="${j === (i === 0 ? 1 : 0) ? 'on' : ''}">${s}</span>`).join('');
      list.innerHTML = BODY[i].map(([n, v], j) => `<button class="r" type="button" role="radio" aria-checked="${j === pick[i]}"><span>${n}</span>${v === '' ? '' : `<b>${v}</b>`}</button>`).join('');
      [...list.children].forEach((b, j) => b.addEventListener('click', () => { pick[i] = j; [...list.children].forEach((x, k) => x.setAttribute('aria-checked', String(k === j))); }));
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => show(i)));
    knob.addEventListener('click', () => { turns++; knob.style.transform = `rotate(${turns * 72}deg)`; show((cur + 1) % TABS.length); });
    knob.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); turns--; knob.style.transform = `rotate(${turns * 72}deg)`; show((cur + TABS.length - 1) % TABS.length); } });
    show(0);
  },
};
