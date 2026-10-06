// Star Trek: The Next Generation — LCARS (Michael Okuda). No motion: states switch instantly, like the real panels.
const SETS = {
  HELM: ['4472', '0193', '7731', '2048', '5560', '0817', '3902', '6604', '1185', '47-0012', '11-38', '0332'],
  WARP: ['9.975', '7.000', '1.250', '0047', '2240', '8812', '0315', '6626', '7110', '22-4471', '09-17', '6015'],
  SHIELDS: ['100%', '097%', '084%', '3301', '0012', '4471', '9008', '1240', '0661', '03-8810', '74-02', '1999'],
  SENSORS: ['0005', '1701', '0174', '8820', '3315', '0042', '6109', '2257', '4018', '86-1172', '31-56', '0407'],
};
export default {
  id: 'sf-lcars-panel',
  credit: 'Star Trek: The Next Generation — LCARS console by Michael Okuda: elbow frame, right-aligned number blocks, instant (motionless) state changes and the ENGAGE pill',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 340px; max-width: 100%; height: 232px; background: #000; border-radius: 12px; padding: 12px; overflow: hidden;
      font-family: 'Bricolage Grotesque', 'Arial Narrow', sans-serif; font-stretch: 75%; font-variation-settings: 'wdth' 75, 'opsz' 24;
      font-weight: 600; text-transform: uppercase; color: #000; display: grid; grid-template-columns: 92px 1fr; grid-template-rows: 44px 1fr 30px; row-gap: 4px; }
    .elbow { position: relative; background: #cc99cc; border-radius: 34px 0 0 0; grid-column: 1 / 3; }
    .elbow::after { content: ''; position: absolute; left: 92px; top: 16px; right: 0; bottom: 0; background: #000; border-radius: 16px 0 0 0; }
    .elbow.b { border-radius: 0 0 0 34px; background: #ffcc99; }
    .elbow.b::after { top: 0; bottom: 14px; border-radius: 0 0 0 14px; }
    .ttl { position: absolute; z-index: 1; right: 0; top: 0; height: 16px; display: flex; gap: 4px; background: #000; padding-left: 4px; }
    .ttl i { display: block; height: 16px; background: #9999ff; }
    .ttl i:nth-child(1) { width: 52px; } .ttl i:nth-child(2) { width: 22px; background: #ffcc99; }
    .ttl span { color: #ff9900; font-size: 21px; line-height: 16px; padding: 0 4px; letter-spacing: .02em; min-width: 74px; text-align: right; }
    .ttl i:last-child { width: 18px; background: #ff9900; border-radius: 0 8px 8px 0; }
    .bb { position: absolute; z-index: 1; right: 0; bottom: 0; height: 14px; display: flex; gap: 4px; background: #000; padding-left: 4px; }
    .bb i { display: block; height: 14px; width: 40px; background: #ff9900; }
    .bb i:nth-child(2) { width: 70px; background: #cc6666; } .bb i:last-child { width: 14px; background: #9999ff; border-radius: 0 7px 7px 0; }
    .side { display: flex; flex-direction: column; gap: 4px; width: 92px; }
    .side button { all: unset; box-sizing: border-box; flex: 1; width: 92px; display: flex; align-items: flex-end; justify-content: flex-end; padding: 0 6px 2px 0;
      font-size: 14px; line-height: 1; letter-spacing: .03em; cursor: pointer; background: var(--c); color: #000; }
    .side button:nth-child(1) { --c: #ff9900; } .side button:nth-child(2) { --c: #cc99cc; } .side button:nth-child(3) { --c: #9999ff; } .side button:nth-child(4) { --c: #ffcc99; }
    .side button:hover { background: #ffcc66; }
    .side button[aria-pressed="true"] { background: #ff7700; }
    .side button:focus-visible, .eng:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
    .main { padding: 2px 2px 0 14px; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 15px; gap: 2px 8px; align-content: start; }
    .main b { font-weight: 500; font-size: 15px; line-height: 15px; text-align: right; font-variant-numeric: tabular-nums; color: #ff9900; }
    .main b:nth-child(3n+2) { color: #9999ff; } .main b:nth-child(3n) { color: #ffcc99; }
    .eng { all: unset; box-sizing: border-box; grid-column: 1 / 4; margin-top: 6px; height: 30px; border-radius: 15px; background: #ff9900; color: #000; cursor: pointer;
      display: flex; align-items: center; justify-content: flex-end; padding: 0 16px; font-size: 21px; letter-spacing: .06em; }
    .eng:hover { background: #ffcc99; }
    .eng[aria-pressed="true"] { background: #cc6666; }
    .eng:active { background: #ff5555; }
  `,
  html: `<div class="stage">
    <div class="elbow"><div class="ttl"><i></i><i></i><span>HELM</span><i></i></div></div>
    <div class="side">
      <button type="button" aria-pressed="true">HELM</button><button type="button" aria-pressed="false">WARP</button>
      <button type="button" aria-pressed="false">SHIELDS</button><button type="button" aria-pressed="false">SENSORS</button>
    </div>
    <div class="main">${'<b></b>'.repeat(12)}<button class="eng" type="button" aria-pressed="false">ENGAGE</button></div>
    <div class="elbow b"><div class="bb"><i></i><i></i><i></i></div></div>
  </div>`,
  init(root) {
    const btns = [...root.querySelectorAll('.side button')], cells = [...root.querySelectorAll('.main b')];
    const ttl = root.querySelector('.ttl span'), eng = root.querySelector('.eng');
    const show = (k) => {
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === k)));
      SETS[k].forEach((v, i) => { cells[i].textContent = v; });
      ttl.textContent = k;
    };
    btns.forEach((b) => b.addEventListener('click', () => show(b.textContent)));
    eng.addEventListener('click', () => eng.setAttribute('aria-pressed', String(eng.getAttribute('aria-pressed') !== 'true')));
    show('HELM');
  },
};
