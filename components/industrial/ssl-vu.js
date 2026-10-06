// SSL 4000-style meter bridge VU with the channel's SOLO and CUT keys and a tape-remote PLAY.
// Backlit cream VU face (-20 … +3, red above 0) with real 300 ms-ish ballistics: PLAY puts programme
// on the channel and the needle dances; CUT kills it (needle falls back), SOLO lights yellow.
const pct = (db) => Math.pow(10, db / 20) * 100;
const ANG = (db) => -45 + Math.min(141, pct(db)) / 141 * 90;
const SC = [-20, -10, -7, -5, -3, -2, -1, 0, 1, 2, 3].map((db) => {
  const a = ANG(db) * Math.PI / 180, p = (r) => [(75 + r * Math.sin(a)).toFixed(1), (104 - r * Math.cos(a)).toFixed(1)];
  const [x1, y1] = p(74), [x2, y2] = p(db === 0 || db === -20 ? 82 : 79), [tx, ty] = p(88);
  return `<line class="${db > 0 ? 'hot' : ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><text class="${db > 0 ? 'hot' : ''}" x="${tx}" y="${ty}">${db > 0 ? '+' + db : Math.abs(db)}</text>`;
}).join('');
const arc = (d0, d1) => { const a0 = ANG(d0) * Math.PI / 180, a1 = ANG(d1) * Math.PI / 180; return `M${(75 + 74 * Math.sin(a0)).toFixed(1)} ${(104 - 74 * Math.cos(a0)).toFixed(1)}A74 74 0 0 1 ${(75 + 74 * Math.sin(a1)).toFixed(1)} ${(104 - 74 * Math.cos(a1)).toFixed(1)}`; };
export default {
  id: 'nd-ssl-vu',
  credit: 'SSL 4000-style VU meter with channel SOLO / CUT keys and a tape PLAY — needle swings with programme, CUT drops it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.03) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #4a4f55, #30343a); box-shadow: inset 0 1px 0 rgba(255,255,255,.15); }
    .vu { position: relative; width: 168px; height: 102px; padding: 6px; border-radius: 4px; background: linear-gradient(#1b1c1e, #0e0f10); box-shadow: 0 2px 4px rgba(0,0,0,.5); }
    .face { position: relative; width: 156px; height: 90px; border-radius: 2px; overflow: hidden; background: radial-gradient(120% 120% at 50% 85%, #fff5cf, #f4dd92 60%, #d8b860); box-shadow: inset 0 0 10px rgba(120,80,0,.35); }
    .stage.dark .face { background: radial-gradient(120% 120% at 50% 85%, #e9dcae, #d8c27c 60%, #b8994c); }
    .face svg { position: absolute; left: 3px; top: 0; width: 150px; height: 104px; }
    .face line { stroke: #1d1a12; stroke-width: 1.2; } .face .hot { stroke: #c4170e; fill: #c4170e; }
    .face text { font: 600 7px "DM Sans", Inter, Arial, sans-serif; fill: #1d1a12; text-anchor: middle; }
    .face .arc { fill: none; stroke: #1d1a12; stroke-width: 1.1; } .face .arc.red { stroke: #c4170e; stroke-width: 3; }
    .face .lbl { font: 700 13px Georgia, serif; fill: #1d1a12; }
    .ndl { position: absolute; left: 77px; top: 18px; width: 1.6px; height: 86px; background: #111; transform-origin: 50% 100%; transform: rotate(-45deg); transition: transform .45s cubic-bezier(.3,0,.3,1); }
    .stage.play:not(.cut) .ndl { animation: prog 3.2s linear infinite; transition: none; }
    @keyframes prog { 0% { transform: rotate(-12deg); } 8% { transform: rotate(14deg); } 15% { transform: rotate(4deg); } 22% { transform: rotate(24deg); } 28% { transform: rotate(10deg); }
      36% { transform: rotate(-4deg); } 44% { transform: rotate(18deg); } 50% { transform: rotate(31deg); } 56% { transform: rotate(12deg); } 63% { transform: rotate(20deg); }
      70% { transform: rotate(2deg); } 78% { transform: rotate(16deg); } 86% { transform: rotate(26deg); } 93% { transform: rotate(6deg); } 100% { transform: rotate(-12deg); } }
    .keys { display: flex; gap: 8px; }
    .k { position: relative; width: 44px; height: 30px; border: 0; padding: 12px 0 0; border-radius: 3px; cursor: pointer; font: 800 8px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .8px; color: #e9ecee;
      background: linear-gradient(#5e646a, #42474d); box-shadow: 0 3px 0 #1b1d20, inset 0 1px 0 rgba(255,255,255,.2); }
    .k::before { content: ''; position: absolute; left: 50%; top: 5px; width: 14px; height: 4px; margin-left: -7px; border-radius: 1px; background: var(--off); }
    .k[aria-pressed="true"]::before { background: var(--on); box-shadow: 0 0 6px var(--on); }
    .k:active, .k[aria-pressed="true"] { transform: translateY(2px); box-shadow: 0 1px 0 #1b1d20, inset 0 1px 0 rgba(255,255,255,.15); }
    .k:focus-visible { outline: 2px solid #9fd0ff; outline-offset: 2px; }
    .pl { --on: #3dff6e; --off: #163a20; } .so { --on: #ffd21a; --off: #3a3208; } .ct { --on: #ff2a1a; --off: #3a0d0a; }
  `,
  html: `
    <div class="stage dark">
      <div class="vu"><div class="face"><svg viewBox="0 0 150 104" aria-hidden="true"><path class="arc" d="${arc(-20, 0)}"/><path class="arc red" d="${arc(0, 3)}"/>${SC}<text class="lbl" x="75" y="78">VU</text></svg><span class="ndl"></span></div></div>
      <div class="keys"><button class="k pl" type="button" aria-pressed="false">PLAY</button><button class="k so" type="button" aria-pressed="false">SOLO</button><button class="k ct" type="button" aria-pressed="false">CUT</button></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), ndl = root.querySelector('.ndl');
    const st = { pl: false, so: false, ct: false };
    // When programme stops, freeze the needle where the animation left it, then let it fall back with ballistics.
    const settle = (cur) => { ndl.style.transition = 'none'; ndl.style.transform = cur; void ndl.offsetWidth; ndl.style.transition = ''; ndl.style.transform = ''; };
    for (const b of root.querySelectorAll('.k')) {
      const k = b.classList[1];
      b.addEventListener('click', () => {
        const wasLive = st.pl && !st.ct, cur = getComputedStyle(ndl).transform; st[k] = !st[k]; b.setAttribute('aria-pressed', st[k]);
        stage.classList.toggle('play', st.pl); stage.classList.toggle('cut', st.ct); stage.classList.toggle('dark', !st.pl && !st.so);
        if (wasLive && !(st.pl && !st.ct)) settle(cur);
      });
    }
  },
};
