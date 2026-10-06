// Mechanical signal box lever frame (Westinghouse / Stevens pattern) with its interlocking:
// yellow 1 distant, red 2 home, black 3 points, blue 4 facing point lock, red 5 starter, white 6
// spare. Pull a lever (click, Space) to reverse it. Locked levers jar against the catch: points 3 need
// the FPL out, FPL 4 needs both stop signals on, 2 and 5 need the FPL in, distant 1 needs 2 and 5 off —
// and nothing can be put back while a lever that depends on it is still reversed.
const LEV = [['y', 'Distant'], ['r', 'Home'], ['k', 'Points'], ['b', 'Facing point lock'], ['r', 'Starter'], ['w', 'Spare']];
export default {
  id: 'nd-lever-frame',
  credit: 'Mechanical signal box lever frame with interlocking — yellow distant, red stop signals, black points, blue FPL, white spare; locked levers refuse',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; padding: 14px 16px 0; border-radius: 12px; overflow: hidden;
      background: linear-gradient(180deg, #e8e1cf 0 70%, #6b4a2b 70%, #5a3d22); box-shadow: inset 0 1px 0 #fff; }
    .frame { position: relative; display: flex; gap: 12px; padding: 0 8px; height: 168px; align-items: flex-end; }
    .frame::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 16px; background: linear-gradient(#2a2c2e, #121314); box-shadow: inset 0 1px 0 rgba(255,255,255,.2); }
    .lv { position: relative; width: 22px; height: 168px; border: 0; padding: 0; background: transparent; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .lv:focus-visible { outline: 2px solid #2b6fd6; outline-offset: 2px; border-radius: 3px; }
    .arm { position: absolute; left: 4px; bottom: 8px; width: 14px; height: 150px; transform-origin: 50% 100%; border-radius: 2px 2px 0 0; transition: transform .35s cubic-bezier(.3,1.2,.5,1); }
    .arm::before { content: ''; position: absolute; left: -2px; top: 0; width: 18px; height: 30px; border-radius: 3px; background: linear-gradient(90deg, #8e9398, #fbfbfb 40%, #c9cdd0 60%, #7e8388); box-shadow: 0 2px 2px rgba(0,0,0,.3); }
    .arm::after { content: ''; position: absolute; left: -4px; top: 38px; width: 22px; height: 6px; border-radius: 2px; background: linear-gradient(#cfd3d6, #7c8186); }
    .arm { background: var(--c); box-shadow: inset -3px 0 0 rgba(0,0,0,.18), inset 2px 0 0 rgba(255,255,255,.25); }
    .y { --c: #f2c200; } .r { --c: #c8221b; } .k { --c: #1d1e20; } .b { --c: #1f56b5; } .w { --c: #f2f2ee; }
    .lv[aria-pressed="true"] .arm { transform: scaleY(.78); filter: brightness(.92); }
    .lv.no .arm { animation: no .3s; }
    @keyframes no { 30% { transform: scaleY(.96); } 60% { transform: scaleY(1.01); } }
    .lv[aria-pressed="true"].no .arm { animation: no2 .3s; }
    @keyframes no2 { 30% { transform: scaleY(.82); } 60% { transform: scaleY(.77); } }
    .plate { position: absolute; left: 0; bottom: 70px; width: 22px; height: 16px; border-radius: 2px; display: grid; place-items: center; z-index: 1;
      background: linear-gradient(135deg, #f6dc8f, #b9892b 60%, #8a6214); box-shadow: 0 1px 1px rgba(0,0,0,.4); font: 800 10px/1 "Playfair Display", Georgia, serif; color: #2b1c05; }
  `,
  html: `
    <div class="stage"><div class="frame">${LEV.map(([c, n], i) => `<button class="lv ${c}" type="button" aria-pressed="false" aria-label="Lever ${i + 1} ${n}"><span class="arm"></span><span class="plate">${i + 1}</span></button>`).join('')}</div></div>`,
  init(root) {
    const lv = [...root.querySelectorAll('.lv')];
    const R = [false, false, false, false, false, false];
    const can = (i, to) => {
      if (to) return [() => R[1] && R[4], () => R[3] && !R[2], () => !R[3], () => !R[1] && !R[4], () => R[3], () => true][i]();
      return [() => true, () => !R[0], () => !R[3], () => !R[1] && !R[4], () => !R[0], () => true][i]();
    };
    lv.forEach((b, i) => {
      b.addEventListener('click', () => {
        const to = !R[i];
        if (!can(i, to)) { b.classList.remove('no'); void b.offsetWidth; b.classList.add('no'); return; }
        R[i] = to; b.setAttribute('aria-pressed', to);
      });
      b.addEventListener('animationend', () => b.classList.remove('no'));
    });
  },
};
