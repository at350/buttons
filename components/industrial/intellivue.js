// Philips IntelliVue MX-series main screen: IEC 60601-1-8 colours (ECG/HR green, SpO2 cyan,
// Resp yellow), alarm limits beside each numeric. A yellow ** SpO2 alarm is active: Silence
// acknowledges it (✓, stops flashing). Touch a numeric to switch that parameter's alarms off
// (crossed bell); "Alarms Off" suspends everything with the red banner.
const BOFF = '<svg viewBox="0 0 24 24" class="bo"><path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"/><path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="m2 2 20 20"/></svg>';
const ECG = 'M0 20h14l2-2 2 2h4l2 4 3-20 3 22 2-6h6l3-3 4 3h12l2-2 2 2h4l2 4 3-20 3 22 2-6h6l3-3 4 3h12';
const PL = 'M0 18c6 0 7-14 13-14s6 9 9 9 4-3 6-3 5 8 10 8 7-14 13-14 6 9 9 9 4-3 6-3 5 8 10 8 7-14 13-14 6 9 9 9 4-3 6-3';
const RS = 'M0 14c10 0 14-10 24-10s14 10 24 10 14-10 24-10 14 10 24 10 14-10 24-10';
const MSG = '** SpO₂ Low', SPO2 = '89'; // shown in the html and again on the flashing (inverted) overlays in the css
const num = (k, lbl, v, hi, lo, cls) => `<button class="n ${cls}" type="button" data-k="${k}" aria-pressed="false" aria-label="${lbl} alarms">
  <span class="l">${lbl}</span><span class="lim"><b>${hi}</b><b>${lo}</b></span>${BOFF}<span class="v">${v}</span></button>`;
export default {
  id: 'nd-intellivue-vitals',
  credit: 'Philips IntelliVue MX patient monitor — green HR, cyan SpO2, yellow Resp with alarm limits; Silence acknowledges, touch a numeric or Alarms Off to suspend alarms',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 10px; border-radius: 12px; overflow: hidden; background: linear-gradient(170deg, #4a4f55, #2c3035); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .scr { position: relative; width: 300px; background: #000; border-radius: 3px; font-family: Inter, Arial, sans-serif; box-shadow: 0 0 0 1px #000; }
    .bar { height: 15px; display: flex; align-items: center; justify-content: space-between; padding: 0 5px; background: #1a2733; font: 600 8px/1 Inter, Arial, sans-serif; color: #c8d2db; }
    .msg { position: relative; padding: 1px 5px; border-radius: 1px; background: #ffe600; color: #000; font-weight: 700; }
    .msg.ack::after { content: ' \\2713'; }
    /* the flashes are overlays with the inverted colours baked in; only their opacity animates (compositor, no per-frame style recalc) */
    .msg:not(.ack)::before { content: '${MSG}'; position: absolute; inset: 0; padding: 1px 5px; border-radius: 1px; white-space: nowrap; background: #000; color: #ffe600;
      opacity: 0; animation: fl .6s steps(2, jump-none) infinite; } @keyframes fl { 50% { opacity: 1; } }
    .msg.off { display: none; }
    .aoff { display: none; padding: 1px 5px; background: #e2231a; color: #fff; font-weight: 700; }
    .scr.all .aoff { display: inline; } .scr.all .msg { display: none; }
    .main { display: grid; grid-template-columns: 1fr 104px; }
    .waves svg { display: block; width: 196px; height: 36px; fill: none; stroke-width: 1.3; }
    .waves text { font: 600 7px Inter, Arial, sans-serif; stroke: none; }
    .n { position: relative; display: block; width: 104px; height: 36px; border: 0; padding: 0; background: transparent; cursor: pointer; text-align: left; color: var(--c); border-left: 1px solid #222; }
    .n + .n { border-top: 1px solid #222; }
    .n:hover { background: #0e1418; } .n:focus-visible { outline: 2px solid #4aa3ff; outline-offset: -2px; }
    .n .l { position: absolute; left: 4px; top: 3px; font: 600 8px/1 Inter, Arial, sans-serif; }
    .n .lim { position: absolute; left: 4px; top: 14px; display: flex; flex-direction: column; gap: 2px; font: 500 7px/1 Inter, Arial, sans-serif; opacity: .8; }
    .n .v { position: absolute; right: 6px; top: 3px; font: 600 28px/1 "Roboto Flex", Inter, Arial, sans-serif; font-variation-settings: "wdth" 80; }
    .bo { position: absolute; left: 4px; top: 15px; width: 12px; height: 12px; fill: none; stroke: #e2231a; stroke-width: 2.4; stroke-linecap: round; display: none; }
    .n.off .lim, .scr.all .n .lim { display: none; } .n.off .bo, .scr.all .n .bo { display: block; }
    .hr { --c: #3cf23c; } .sp { --c: #34d3ff; } .rr { --c: #ffe600; }
    .sp.alm:not(.ack) .v::after { content: '${SPO2}'; position: absolute; inset: 0; white-space: nowrap; color: #000; background: #ffe600;
      opacity: 0; animation: fl2 .6s steps(2, jump-none) infinite; } @keyframes fl2 { 50% { opacity: 1; } }
    .hr .l::after { content: ' \\2665'; display: inline-block; white-space: pre; animation: beat .83s steps(2, jump-none) infinite; } @keyframes beat { 50% { opacity: 0; } }
    .keys { display: flex; gap: 4px; padding: 4px; background: #11181e; }
    .sk { flex: 1; height: 20px; border: 0; border-radius: 3px; cursor: pointer; font: 600 8px/1 Inter, Arial, sans-serif; color: #e6edf3; white-space: nowrap;
      background: linear-gradient(#3d5568, #2a3e4f); box-shadow: inset 0 1px 0 rgba(255,255,255,.15); }
    .sk:hover { background: linear-gradient(#4a6479, #33495b); } .sk:active { transform: translateY(1px); }
    .sk[aria-pressed="true"] { background: linear-gradient(#e2231a, #a8140e); }
    .sk:focus-visible { outline: 2px solid #4aa3ff; outline-offset: 1px; }
  `,
  html: `
    <div class="stage"><div class="scr">
      <div class="bar"><span>Bed 12</span><span class="msg">${MSG}</span><span class="aoff">Alarms Off</span><span>Adult</span></div>
      <div class="main">
        <div class="waves">
          <svg viewBox="0 0 120 26" preserveAspectRatio="none" stroke="#3cf23c"><text x="2" y="7" fill="#3cf23c">II</text><path d="${ECG}" transform="translate(0 0)"/></svg>
          <svg viewBox="0 0 120 26" preserveAspectRatio="none" stroke="#34d3ff"><text x="2" y="7" fill="#34d3ff">Pleth</text><path d="${PL}" transform="translate(0 2)"/></svg>
          <svg viewBox="0 0 120 26" preserveAspectRatio="none" stroke="#ffe600"><text x="2" y="7" fill="#ffe600">Resp</text><path d="${RS}" transform="translate(0 4)"/></svg>
        </div>
        <div>${num('hr', 'HR', '72', '120', '50', 'hr')}${num('sp', 'SpO₂', SPO2, '100', '90', 'sp alm')}${num('rr', 'RR', '16', '30', '8', 'rr')}</div>
      </div>
      <div class="keys"><button class="sk sil" type="button">Silence</button><button class="sk ao" type="button" aria-pressed="false">Alarms Off</button><button class="sk ms" type="button">Main Screen</button></div>
    </div></div>`,
  init(root) {
    const scr = root.querySelector('.scr'), msg = root.querySelector('.msg'), sp = root.querySelector('.sp'), ao = root.querySelector('.ao');
    let ack = false, all = false; const off = { hr: false, sp: false, rr: false };
    const draw = () => {
      scr.classList.toggle('all', all); ao.setAttribute('aria-pressed', all);
      const live = !off.sp && !all;
      msg.classList.toggle('off', !live); msg.classList.toggle('ack', ack); sp.classList.toggle('alm', live); sp.classList.toggle('ack', ack);
      for (const b of root.querySelectorAll('.n')) { b.classList.toggle('off', off[b.dataset.k]); b.setAttribute('aria-pressed', off[b.dataset.k]); }
    };
    root.querySelector('.sil').addEventListener('click', () => { ack = true; draw(); });
    ao.addEventListener('click', () => { all = !all; if (!all) ack = false; draw(); });
    for (const b of root.querySelectorAll('.n')) b.addEventListener('click', () => { off[b.dataset.k] = !off[b.dataset.k]; if (!off[b.dataset.k]) ack = false; draw(); });
    root.querySelector('.ms').addEventListener('click', () => { off.hr = off.sp = off.rr = false; draw(); });
    draw();
  },
};
