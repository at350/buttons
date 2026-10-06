// Schneider Harmony XB4 22 mm selector heads in ZBY6 legend carriers on a RAL 7035 door:
// a 3-position stay-put long-lever selector (HAND – OFF – AUTO, ±45°) and a 2-position Ronis-style
// key switch. With the key turned to 0 the selector is locked out — it shakes and refuses to move.
const ticks = (angles) => angles.map((a) => `<i class="lg" style="--a:${a}deg"></i>`).join('');
export default {
  id: 'nd-selector-switch',
  credit: 'Schneider Harmony XB4 selector switches — 3-position HAND / OFF / AUTO lever and a 2-position key switch that locks it out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 18px; padding: 14px 18px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.05) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #d8dcd8, #c3c8c4);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7); }
    .carrier { position: relative; width: 92px; height: 100px; border-radius: 4px; background: linear-gradient(#2a2c2e, #18191a);
      box-shadow: 0 1px 0 rgba(255,255,255,.6), inset 0 1px 0 rgba(255,255,255,.1); }
    .lg { position: absolute; left: 46px; top: 58px; width: 0; height: 0; transform: rotate(var(--a)); }
    .lg::before { content: ''; position: absolute; left: -1px; top: -40px; width: 2px; height: 5px; background: #f2f2ee; }
    .txt { position: absolute; top: 8px; font: 700 7.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .8px; color: #f2f2ee; }
    .head { position: absolute; left: 24px; top: 36px; width: 44px; height: 44px; border-radius: 50%; padding: 0; border: 0; cursor: pointer; touch-action: none;
      background: conic-gradient(from 30deg, #8d9296, #f4f6f7 12%, #a5aaae 26%, #e7eaec 42%, #7d8287 58%, #f0f2f3 72%, #9a9fa3 86%, #8d9296);
      box-shadow: 0 2px 3px rgba(0,0,0,.6), inset 0 0 0 1px rgba(255,255,255,.5); -webkit-tap-highlight-color: transparent; }
    .head:focus-visible { outline: 2px solid #5aa9ff; outline-offset: 3px; }
    .rot { position: absolute; inset: 4px; border-radius: 50%; transform: rotate(var(--r, 0deg)); transition: transform .16s cubic-bezier(.3,1.6,.5,1); }
    .lever .rot { background: radial-gradient(circle at 45% 35%, #3b3d40, #111214 70%); }
    .lever .rot::after { content: ''; position: absolute; left: 50%; top: -2px; bottom: -2px; width: 13px; margin-left: -6.5px; border-radius: 6px;
      background: linear-gradient(90deg, #070708, #3a3c3f 40%, #1b1c1e 70%, #050506); box-shadow: 0 2px 3px rgba(0,0,0,.7); }
    .lever .rot::before { content: ''; position: absolute; left: 50%; top: 0; width: 3px; height: 9px; margin-left: -1.5px; z-index: 1; border-radius: 1px; background: #f2f2ee; }
    .key .rot { background: radial-gradient(circle, #6b7075 0 22%, #d7dadc 24%, #9ba0a4 60%, #6d7277); }
    .key .rot::before { content: ''; position: absolute; left: 50%; top: 50%; width: 4px; height: 16px; margin: -8px 0 0 -2px; background: #1a1b1c; border-radius: 1px; }
    .bow { position: absolute; left: 50%; top: 50%; width: 18px; height: 30px; margin: -22px 0 0 -9px; border-radius: 9px 9px 3px 3px;
      background: linear-gradient(90deg, #8a6418, #f3d27a 35%, #c89a3a 65%, #7d5a12); box-shadow: 0 3px 4px rgba(0,0,0,.55); }
    .bow::after { content: ''; position: absolute; left: 5px; top: 4px; width: 8px; height: 8px; border-radius: 50%; background: #1d1e20; box-shadow: inset 0 1px 1px rgba(0,0,0,.8), 0 1px 0 rgba(255,255,255,.4); }
    .shake .rot { animation: shake .28s; }
    @keyframes shake { 25% { transform: rotate(calc(var(--r) + 5deg)); } 75% { transform: rotate(calc(var(--r) - 5deg)); } }
  `,
  html: `
    <div class="stage">
      <div class="carrier">
        <span class="txt" style="left:6px;top:20px">HAND</span><span class="txt" style="left:38px">OFF</span><span class="txt" style="right:6px;top:20px">AUTO</span>
        ${ticks([-45, 0, 45])}
        <button class="head lever" type="button" role="slider" aria-label="Hand off auto" aria-valuemin="-1" aria-valuemax="1" aria-valuenow="0" aria-valuetext="OFF"><span class="rot"></span></button>
      </div>
      <div class="carrier">
        <span class="txt" style="left:18px;top:20px">0</span><span class="txt" style="right:18px;top:20px">I</span>
        ${ticks([-45, 45])}
        <button class="head key" type="button" role="switch" aria-checked="true" aria-label="Key enable"><span class="rot" style="--r:45deg"><span class="bow"></span></span></button>
      </div>
    </div>`,
  init(root) {
    const sel = root.querySelector('.lever'), key = root.querySelector('.key');
    const srot = sel.firstElementChild, krot = key.firstElementChild;
    const NAMES = ['HAND', 'OFF', 'AUTO'];
    let pos = 0, enabled = true, drag = null;
    const shake = () => { sel.classList.remove('shake'); void sel.offsetWidth; sel.classList.add('shake'); };
    const set = (p) => {
      p = Math.max(-1, Math.min(1, p)); if (p === pos) return;
      if (!enabled) return shake();
      pos = p; srot.style.setProperty('--r', pos * 45 + 'deg');
      sel.setAttribute('aria-valuenow', pos); sel.setAttribute('aria-valuetext', NAMES[pos + 1]);
    };
    const ang = (e) => { const r = sel.getBoundingClientRect(); return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI; };
    sel.addEventListener('pointerdown', (e) => { drag = { moved: false, x: e.clientX }; sel.setPointerCapture(e.pointerId); });
    sel.addEventListener('pointermove', (e) => {
      if (!drag) return; if (Math.abs(e.clientX - drag.x) > 4) drag.moved = true;
      if (drag.moved) set(Math.round(Math.max(-60, Math.min(60, ang(e))) / 45));
    });
    sel.addEventListener('pointerup', (e) => {
      if (drag && !drag.moved) { const r = sel.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2); set(dx < -5 ? pos - 1 : dx > 5 ? pos + 1 : pos === 1 ? -1 : pos + 1); }
      drag = null;
    });
    sel.addEventListener('pointercancel', () => { drag = null; });
    sel.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0;
      if (d) { e.preventDefault(); set(pos + d); }
    });
    sel.addEventListener('click', (e) => { if (e.detail === 0) set(pos === 1 ? -1 : pos + 1); });
    key.addEventListener('click', () => {
      enabled = !enabled; krot.style.setProperty('--r', enabled ? '45deg' : '-45deg'); key.setAttribute('aria-checked', enabled);
    });
  },
};
