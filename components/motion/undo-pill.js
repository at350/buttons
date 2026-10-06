// Undo snackbar (Gmail / Linear): deleting springs a dark pill up from the bottom (stiffness 300, damping 24 → linear())
// with a 5s countdown bar; Undo puts the row back. When time runs out the row is gone, then a fresh copy fades back in.
const SPRING = 'linear(0, 0.032, 0.103, 0.206, 0.315, 0.435, 0.543, 0.649, 0.743, 0.818, 0.885, 0.934, 0.975, 1.004, 1.025, 1.038, 1.045, 1.047, 1.046, 1.043, 1.039, 1.034, 1.028, 1.023, 1.018, 1.013, 1.009, 1.006, 1.004, 1.002, 1, 0.999, 0.998, 0.998, 0.998, 0.998, 0.998, 0.998, 0.998, 0.999, 1)';

export default {
  id: 'mo-undo-pill',
  credit: 'Undo countdown pill — delete the row, a dark pill springs up with a shrinking progress bar; Undo restores it before time runs out (Gmail / Linear)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 150px; max-width: 100%; border-radius: 12px; background: #f4f4f1; border: 1px solid #e3e3df; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
    .row { position: absolute; left: 14px; right: 14px; top: 14px; height: 56px; display: flex; align-items: center; gap: 12px; padding: 0 14px; border-radius: 12px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.06); transition: transform .5s ${SPRING}, opacity .3s; }
    .row.gone { transform: translateX(40px) scale(.9); opacity: 0; pointer-events: none; }
    .ic { width: 34px; height: 34px; border-radius: 9px; background: #eef2ff; display: grid; place-items: center; }
    .ic svg { width: 18px; height: 18px; fill: none; stroke: #4f46e5; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .txt { display: flex; flex-direction: column; gap: 2px; } .txt b { font-size: 13.5px; font-weight: 600; color: #111; } .txt span { font-size: 12px; color: #888; }
    .del { margin-left: auto; width: 32px; height: 32px; border: 0; border-radius: 8px; background: transparent; color: #999; cursor: pointer; display: grid; place-items: center; transition: background .2s, color .2s, transform .2s; }
    .del:hover { background: #fee2e2; color: #dc2626; } .del:active { transform: scale(.9); }
    .del:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .del svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .pill {
      position: absolute; left: 50%; bottom: 14px; transform: translate(-50%, 70px) scale(.9); opacity: 0; display: flex; align-items: center; gap: 12px; height: 44px; padding: 0 8px 0 16px; border-radius: 999px;
      background: #111; color: #fff; font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; box-shadow: 0 10px 24px -8px rgba(0,0,0,.5); transition: transform .6s ${SPRING}, opacity .25s;
    }
    .stage.on .pill { transform: translate(-50%, 0) scale(1); opacity: 1; }
    .pill button { height: 30px; padding: 0 12px; border: 0; border-radius: 999px; background: rgba(255,255,255,.14); color: #fff; font: 600 12.5px Inter, system-ui, sans-serif; cursor: pointer; transition: background .2s; }
    .pill button:hover { background: rgba(255,255,255,.26); } .pill button:focus-visible { outline: 2px solid #fff; outline-offset: -3px; }
    .bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: #818cf8; transform-origin: left; transform: scaleX(1); }
    .stage.on .bar { transform: scaleX(0); transition: transform 5s linear; }
    .n { font-variant-numeric: tabular-nums; color: #a5b4fc; min-width: 10px; }
  `,
  html: `
    <div class="stage">
      <div class="row"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/></svg></span><span class="txt"><b>Q3 roadmap.fig</b><span>Edited 2h ago</span></span><button class="del" type="button" aria-label="Delete"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>
      <div class="pill" role="status">File deleted<button type="button">Undo <span class="n">5</span></button><span class="bar"></span></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), row = root.querySelector('.row'), n = root.querySelector('.n');
    let iv = 0, left = 5, rt = 0;
    const stop = () => { clearInterval(iv); iv = 0; stage.classList.remove('on'); };
    root.querySelector('.del').addEventListener('click', () => {
      row.classList.add('gone'); left = 5; n.textContent = left; stage.classList.add('on');
      clearInterval(iv);
      iv = setInterval(() => { left--; n.textContent = Math.max(0, left); if (left <= 0) { stop(); clearTimeout(rt); rt = setTimeout(() => row.classList.remove('gone'), 1400); } }, 1000);
    });
    root.querySelector('.pill button').addEventListener('click', () => { stop(); row.classList.remove('gone'); });
    return () => { clearInterval(iv); clearTimeout(rt); };
  },
};
