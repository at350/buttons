export default {
  id: 'ks-solari-row',
  credit: 'Solari di Udine split-flap departures board — time, destination, flight, gate, remarks on black flaps; click and the flaps clatter through the alphabet to the next status',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .stage { width: max-content; max-width: 100%; padding: 10px; border-radius: 12px; background: linear-gradient(#2e3034, #17181b); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .scroll { overflow-x: auto; scrollbar-width: none; border-radius: 5px; }
    .scroll::-webkit-scrollbar { display: none; }
    .board { display: block; width: max-content; border: 0; margin: 0; padding: 8px 10px 10px; border-radius: 5px; cursor: pointer; text-align: left;
      background: #0b0b0c; box-shadow: inset 0 0 0 1px #000, inset 0 2px 6px rgba(0,0,0,.9); -webkit-tap-highlight-color: transparent; }
    .board:focus-visible { outline: 2px solid #f2c14e; outline-offset: -2px; }
    .board:hover .c { filter: brightness(1.12); }
    .lab { display: flex; gap: 10px; margin: 0 0 7px; padding-left: 1px; }
    .lab span { font: 600 8.5px/1 'Roboto Flex', 'Helvetica Neue', Arial, sans-serif; letter-spacing: .16em; color: #c9c9c2; text-transform: uppercase; white-space: nowrap; }
    .lab span:last-child { flex: 1; }
    .row { display: flex; align-items: center; gap: 10px; }
    .row + .row { margin-top: 5px; }
    .f { display: flex; gap: 2px; }
    .c { position: relative; width: 16px; height: 26px; border-radius: 2px; overflow: hidden;
      background: linear-gradient(#2b2c30, #222327 49.5%, #1a1b1e 50.5%, #212226);
      box-shadow: 0 1px 0 rgba(255,255,255,.04), inset 0 0 0 1px rgba(0,0,0,.55);
      font: 700 19px/26px 'Roboto Flex', 'Helvetica Neue', Arial, sans-serif; font-stretch: 78%; color: #f4f3ec; text-align: center; }
    .c::after { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; margin-top: -.5px; background: #050506; box-shadow: 0 1px 0 rgba(255,255,255,.06); }
    .c::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 50%; z-index: 1; background: linear-gradient(#34353a, #26272b); transform-origin: 50% 100%; transform: scaleY(0); }
    .c.flip::before { animation: fl .07s linear; }
    @keyframes fl { from { transform: scaleY(1); } to { transform: scaleY(0); } }
    .lamp { width: 9px; height: 9px; flex: none; margin-left: 2px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #3a3b3e, #1d1e20); box-shadow: inset 0 0 0 1px #000; }
    .row.go .lamp { background: radial-gradient(circle at 40% 35%, #b8ffc4, #2ee05a 60%); box-shadow: 0 0 6px #2ee05a; animation: bl 1s steps(1) infinite; }
    .row.alert .lamp { background: radial-gradient(circle at 40% 35%, #ffc2b8, #ff3b2a 60%); box-shadow: 0 0 6px #ff3b2a; animation: bl .5s steps(1) infinite; }
    @keyframes bl { 50% { opacity: .25; } }
  `,
  html: `
    <div class="stage"><div class="scroll">
      <button class="board" type="button" aria-label="Departures board — next update">
        <div class="lab"><span style="width:88px">Time</span><span style="width:160px">Destination</span><span style="width:106px">Flight</span><span style="width:52px">Gate</span><span>Remarks</span></div>
        <div class="rows"></div>
      </button>
    </div></div>`,
  init(root) {
    const rowsEl = root.querySelector('.rows');
    const W = [5, 9, 6, 3, 9], CH = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.';
    const flights = [['14:35', 'ROMA FCO', 'AZ 611', 'B12'], ['14:50', 'PARIS CDG', 'AF1167', 'A04'], ['15:05', 'NEW YORK', 'BA 117', 'C31'], ['15:20', 'TOKYO HND', 'NH 212', 'D07'], ['15:40', 'MADRID', 'IB3163', 'B05'], ['15:55', 'ZURICH', 'LX 327', 'A11'], ['16:10', 'LISBOA', 'TP 813', 'C02']];
    const status = [['ON TIME', ''], ['BOARDING', 'go'], ['LAST CALL', 'alert'], ['DEPARTED', '']];
    const rows = [0, 1, 2].map(() => {
      const r = document.createElement('div'); r.className = 'row';
      const cells = [];
      W.forEach((w) => { const f = document.createElement('span'); f.className = 'f'; for (let j = 0; j < w; j++) { const c = document.createElement('span'); c.className = 'c'; c.textContent = ' '; f.appendChild(c); cells.push(c); } r.appendChild(f); });
      r.insertAdjacentHTML('beforeend', '<i class="lamp"></i>');
      rowsEl.appendChild(r); return { r, cells };
    });
    const all = rows.flatMap((x) => x.cells);
    let first = 0, st = [1, 0, 0], target = [], timer = 0;
    const text = () => rows.map((_, k) => { const fl = flights[(first + k) % flights.length], s = status[st[k]][0]; return [fl[0], fl[1], fl[2], fl[3], s].map((t, i) => t.padEnd(W[i]).slice(0, W[i])).join(''); }).join('');
    const lamps = () => rows.forEach((x, k) => { x.r.className = 'row' + (status[st[k]][1] ? ' ' + status[st[k]][1] : ''); });
    const step = () => {
      let moving = false;
      all.forEach((c, i) => {
        const cur = c.textContent || ' ', want = target[i];
        if (cur === want) { c.classList.remove('flip'); return; }
        moving = true; c.textContent = CH[(CH.indexOf(cur) + 1) % CH.length];
        c.classList.remove('flip'); void c.offsetWidth; c.classList.add('flip');
      });
      timer = moving ? setTimeout(step, 50) : 0;
    };
    const show = (instant) => {
      target = [...text()]; lamps();
      if (instant) { all.forEach((c, i) => (c.textContent = target[i])); return; }
      if (!timer) step();
    };
    root.querySelector('.board').addEventListener('click', () => {
      if (st[0] < status.length - 1) st[0]++;
      else { first = (first + 1) % flights.length; st = [Math.min(st[1] + 1, 2), st[2], 0]; }
      show(false);
    });
    show(true);
    return () => clearTimeout(timer);
  },
};
