export default {
  id: 'ks-solari-row',
  credit: 'Solari di Udine split-flap departures board — a full row (time, destination, flight, gate, remarks); click and every flap clatters through the alphabet to the next status',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { max-width: 100%; padding: 12px 14px; border-radius: 12px; background: linear-gradient(#26282c, #141518); }
    .scroll { overflow-x: auto; scrollbar-width: none; }
    .scroll::-webkit-scrollbar { display: none; }
    .board { display: inline-flex; flex-direction: column; gap: 6px; }
    .lab, .row { display: flex; gap: 8px; }
    .lab span { font: 600 8px/1 Inter, system-ui, sans-serif; letter-spacing: .14em; color: #f2c14e; }
    .row { border: 0; padding: 4px; margin: -4px; border-radius: 6px; background: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .row:hover { background: rgba(255,255,255,.04); }
    .row:focus-visible { outline: 2px solid #f2c14e; outline-offset: 2px; }
    .f { display: flex; gap: 2px; }
    .c { position: relative; width: 14px; height: 22px; border-radius: 2px; background: linear-gradient(#2f3136 50%, #26282c 50%); box-shadow: 0 1px 1px rgba(0,0,0,.6), inset 0 0 0 1px rgba(0,0,0,.4);
      font: 700 15px/22px 'Roboto Flex', 'Helvetica Neue', Arial, sans-serif; font-stretch: 85%; color: #f1f1ea; text-align: center; overflow: hidden; }
    .c::after { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: rgba(0,0,0,.75); }
    .c.flip::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 50%; background: linear-gradient(#3a3d43, #2f3136); transform-origin: 50% 100%; animation: fl .06s linear; }
    @keyframes fl { from { transform: scaleY(1); } to { transform: scaleY(0); } }
    .f.rem .c { color: #ffd23d; }
    .f.rem.alert .c { color: #ff5a4a; }
    .f.rem.go .c { color: #5be36f; }
  `,
  html: `
    <div class="stage"><div class="scroll"><div class="board">
      <div class="lab"><span style="width:78px">TIME</span><span style="width:158px">DESTINATION</span><span style="width:94px">FLIGHT</span><span style="width:46px">GATE</span><span>REMARKS</span></div>
      <button class="row" type="button" aria-label="Next departure status"></button>
    </div></div></div>`,
  init(root) {
    const row = root.querySelector('.row');
    const W = [5, 10, 6, 3, 9], CH = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.';
    const flights = [['14:35', 'ROMA FCO', 'AZ 611', 'B12'], ['14:50', 'PARIS CDG', 'AF1167', 'A04'], ['15:05', 'NEW YORK', 'BA 117', 'C31'], ['15:20', 'TOKYO HND', 'NH 212', 'D07'], ['15:40', 'MADRID', 'IB3163', 'B05']];
    const status = [['ON TIME', ''], ['BOARDING', 'go'], ['LAST CALL', 'alert'], ['DEPARTED', '']];
    const fields = W.map((w, i) => { const f = document.createElement('span'); f.className = 'f' + (i === 4 ? ' rem' : ''); for (let j = 0; j < w; j++) f.insertAdjacentHTML('beforeend', '<span class="c"> </span>'); row.appendChild(f); return f; });
    const cells = fields.flatMap((f) => [...f.children]);
    let fi = 0, si = 0, target = [], timer = 0;
    const text = () => { const fl = flights[fi], s = status[si]; return [fl[0], fl[1], fl[2], fl[3], s[0]].map((t, i) => t.padEnd(W[i]).slice(0, W[i])).join(''); };
    const step = () => {
      let moving = false;
      cells.forEach((c, i) => {
        const cur = c.textContent || ' ', want = target[i];
        if (cur === want) { c.classList.remove('flip'); return; }
        moving = true; c.textContent = CH[(CH.indexOf(cur) + 1) % CH.length];
        c.classList.remove('flip'); void c.offsetWidth; c.classList.add('flip');
      });
      if (moving) timer = setTimeout(step, 55); else timer = 0;
    };
    const show = (instant) => {
      target = [...text()]; fields[4].className = 'f rem' + (status[si][1] ? ' ' + status[si][1] : '');
      if (instant) { cells.forEach((c, i) => (c.textContent = target[i])); return; }
      if (!timer) step();
    };
    row.addEventListener('click', () => { si++; if (si >= status.length) { si = 0; fi = (fi + 1) % flights.length; } show(false); });
    show(true);
    return () => clearTimeout(timer);
  },
};
