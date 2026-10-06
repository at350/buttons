export default {
  id: 'in-tally-counter',
  credit: 'Hand tally counter — chrome ring, mechanical display, big press plunger; small reset knob',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .tc { position: relative; display: inline-flex; flex-direction: column; align-items: center; gap: 6px; padding: 10px 12px 12px; border-radius: 50px 50px 14px 14px; background: linear-gradient(#f4f4f5, #d4d4d8); box-shadow: 0 2px 6px rgba(0,0,0,.25), inset 0 1px 0 #fff; }
    .press {
      width: 72px; height: 72px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; -webkit-tap-highlight-color: transparent;
      background: radial-gradient(circle at 50% 40%, #fafafa, #c7c7cc 70%, #9d9da3); box-shadow: 0 6px 0 #8e8e93, 0 8px 10px rgba(0,0,0,.35), inset 0 1px 2px #fff;
      transition: transform .06s, box-shadow .06s;
    }
    .press:hover { filter: brightness(1.03); }
    .press:active { transform: translateY(5px); box-shadow: 0 1px 0 #8e8e93, 0 2px 4px rgba(0,0,0,.35), inset 0 1px 2px #fff; }
    .press:focus-visible { outline: 3px solid #0a84ff; outline-offset: 3px; }
    .disp { display: flex; gap: 2px; padding: 5px 8px; border-radius: 6px; background: #1c1c1e; box-shadow: inset 0 2px 5px rgba(0,0,0,.8); font: 700 20px/1 ui-monospace, Menlo, monospace; color: #f5f5f7; letter-spacing: .08em; }
    .disp span { display: inline-block; min-width: .7em; text-align: center; }
    .disp.bump span:last-child { animation: flip .18s ease-out; }
    @keyframes flip { 0% { transform: translateY(-40%); opacity: .3; } 100% { transform: none; opacity: 1; } }
    .reset { position: absolute; right: -6px; top: 44px; width: 22px; height: 22px; border-radius: 50%; border: 0; padding: 0; background: #3a3a3c; color: #d1d1d6; cursor: pointer; display: grid; place-items: center; box-shadow: 0 1px 3px rgba(0,0,0,.4); transition: transform .3s; }
    .reset:hover { background: #48484a; } .reset:active { transform: rotate(-120deg); }
    .reset:focus-visible { outline: 2px solid #0a84ff; outline-offset: 2px; }
    .reset svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `<div class="tc">
    <button class="press" type="button" aria-label="Count"></button>
    <output class="disp" aria-live="polite"><span>0</span><span>0</span><span>0</span><span>0</span></output>
    <button class="reset" type="button" aria-label="Reset"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg></button>
  </div>`,
  init(root) {
    const disp = root.querySelector('.disp'), sp = disp.querySelectorAll('span');
    let v = 0;
    const show = () => { const s = String(v).padStart(4, '0'); sp.forEach((e, i) => (e.textContent = s[i])); };
    root.querySelector('.press').addEventListener('click', () => { v = (v + 1) % 10000; show(); disp.classList.remove('bump'); void disp.offsetWidth; disp.classList.add('bump'); });
    root.querySelector('.reset').addEventListener('click', () => { v = 0; show(); });
  },
};
