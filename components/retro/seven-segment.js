export default {
  id: 'rt-seven-segment',
  credit: 'Red seven-segment LED counter (slanted 0.56" digits behind a red filter) with a count button and reset',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #202020; padding: 14px 16px; border-radius: 12px; display: inline-flex; gap: 14px; align-items: center; }
    .disp { background: #0a0000; border: 2px solid #3a3a3a; border-radius: 4px; padding: 6px 8px; display: flex; gap: 4px; box-shadow: inset 0 0 10px #000; }
    svg { width: 26px; height: 46px; transform: skewX(-8deg); }
    .disp { background: linear-gradient(#1a0000, #0a0000); }
    path { fill: #3a0a0a; transition: fill .05s; }
    path.on { fill: #ff2a2a; filter: drop-shadow(0 0 2px #ff2a2a); }
    .btn { width: 40px; height: 40px; border-radius: 50%; border: none; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 40% 35%, #555, #2a2a2a 70%); box-shadow: 0 3px 0 #111, inset 0 1px 0 #777; }
    .btn:active { transform: translateY(2px); box-shadow: 0 1px 0 #111, inset 0 1px 0 #777; }
    .btn:focus-visible { outline: 2px solid #ff2a2a; outline-offset: 3px; }
    .rst { width: 16px; height: 16px; border-radius: 50%; background: #ff2a2a; border: 2px solid #111; padding: 0; cursor: pointer; align-self: flex-start; }
    .rst:active { filter: brightness(.7); }
    .rst:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="disp"></div>
      <button class="btn" type="button" aria-label="Count"></button>
      <button class="rst" type="button" aria-label="Reset"></button>
    </div>`,
  init(root) {
    const SEG = 'M2 2l3-2h12l3 2-3 2H5z|M20 3l2 3v12l-2 3-2-3V6z|M20 23l2 3v12l-2 3-2-3V26z|M2 42l3-2h12l3 2-3 2H5z|M2 23l2 3v12l-2 3-2-3V26z|M2 3l2 3v12l-2 3-2-3V6z|M2 22l3-2h12l3 2-3 2H5z'.split('|');
    const MAP = ['1111110', '0110000', '1101101', '1111001', '0110011', '1011011', '1011111', '1110000', '1111111', '1111011'];
    const disp = root.querySelector('.disp');
    const digits = [];
    for (let i = 0; i < 3; i++) {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', '0 0 24 46');
      s.innerHTML = SEG.map((d) => `<path d="${d}" class="seg"/>`).join('');
      disp.appendChild(s); digits.push([...s.querySelectorAll('path')]);
    }
    let n = 0;
    const render = () => {
      const str = String(n % 1000).padStart(3, '0');
      digits.forEach((segs, i) => segs.forEach((p, k) => p.setAttribute('style', MAP[Number(str[i])][k] === '1' ? 'fill:#ff2215;filter:drop-shadow(0 0 2px rgba(255,40,20,.9))' : 'fill:#2e0806')));
      disp.setAttribute('aria-label', String(n));
    };
    render();
    root.querySelector('.btn').addEventListener('click', () => { n++; render(); });
    root.querySelector('.rst').addEventListener('click', () => { n = 0; render(); });
  },
};
