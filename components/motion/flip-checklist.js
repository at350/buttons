// Things 3 to-do list — rounded-square checkbox fills Things blue with a springy pop and the check draws in;
// a beat later the completed to-do sinks below the open ones (FLIP: measure, reorder, invert, play) on a
// non-bouncy spring (stiffness 260, damping 27) while the others slide up. Completed titles go grey, no strike.
const SINK = 'linear(0, 0.042, 0.131, 0.244, 0.371, 0.486, 0.596, 0.687, 0.767, 0.829, 0.88, 0.918, 0.948, 0.968, 0.984, 0.994, 1.001, 1.004, 1.006, 1.007, 1.007, 1.007, 1.006, 1.005, 1.004, 1.003, 1.003, 1.002, 1.001, 1.001, 1)';
const POP = 'linear(0, 0.098, 0.318, 0.574, 0.81, 0.983, 1.102, 1.158, 1.165, 1.141, 1.102, 1.059, 1.022, 0.995, 0.979, 0.972, 0.973, 0.978, 0.985, 0.992, 0.998, 1.002, 1.004, 1.005, 1.004, 1.003, 1.002, 1.001, 1, 1, 1)';

export default {
  id: 'mo-flip-checklist',
  credit: 'Things 3 to-dos — tick the box: it pops blue, the check draws itself, then the finished to-do glides below the open ones while the rest slide up (FLIP)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .list { width: 270px; max-width: 100%; padding: 8px; border-radius: 12px; background: #fff; border: 1px solid #e6e6e9; box-shadow: 0 1px 2px rgba(0,0,0,.04); font-family: system-ui, -apple-system, 'SF Pro Text', Inter, sans-serif; display: flex; flex-direction: column; }
    .row { display: flex; align-items: center; gap: 10px; height: 34px; padding: 0 8px; border-radius: 6px; cursor: default; user-select: none; -webkit-user-select: none; outline: none; transition: background .15s; }
    .row:hover { background: #f4f4f6; }
    .row:focus-visible { background: #e3edfd; }
    .cb { position: relative; width: 15px; height: 15px; flex: none; border-radius: 4px; border: 1.5px solid #b9b9be; display: grid; place-items: center; cursor: pointer; transition: background .2s, border-color .2s; }
    .row:hover .cb { border-color: #8e8e93; }
    .row[aria-checked="true"] .cb { background: #2f7ef0; border-color: #2f7ef0; animation: pop .55s ${POP}; }
    @keyframes pop { 0% { transform: scale(.7); } 100% { transform: scale(1); } }
    .cb svg { width: 11px; height: 11px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .cb path { stroke-dasharray: 22; stroke-dashoffset: 22; transition: stroke-dashoffset .25s ease-out; }
    .row[aria-checked="true"] .cb path { stroke-dashoffset: 0; transition-delay: .08s; }
    .lbl { font-size: 14px; color: #1d1d1f; letter-spacing: -.005em; transition: color .3s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .row[aria-checked="true"] .lbl { color: #8e8e93; }
    .tag { margin-left: auto; padding: 1px 6px; border-radius: 4px; background: #f0f0f2; color: #8e8e93; font-size: 11px; font-weight: 500; }
  `,
  html: `
    <div class="list" role="group" aria-label="Today">
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span class="lbl">Review pull request</span><span class="tag">Work</span></div>
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span class="lbl">Book flights to Lisbon</span></div>
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span class="lbl">Water the plants</span><span class="tag">Home</span></div>
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><span class="lbl">Call Mum</span></div>
    </div>`,
  init(root) {
    const list = root.querySelector('.list');
    const rows = () => [...list.querySelectorAll('.row')];
    const anims = new Set();
    let t = 0;
    const settle = () => {
      const before = new Map(rows().map((r) => [r, r.getBoundingClientRect().top]));
      const sorted = rows().sort((a, b) => (a.getAttribute('aria-checked') === 'true') - (b.getAttribute('aria-checked') === 'true'));
      const focused = root.activeElement;
      sorted.forEach((r) => list.appendChild(r));
      if (focused && focused.focus) focused.focus({ preventScroll: true });
      sorted.forEach((r) => {
        const dy = before.get(r) - r.getBoundingClientRect().top;
        if (!dy) return;
        const a = r.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 560, easing: SINK });
        anims.add(a); a.onfinish = () => anims.delete(a);
      });
    };
    const toggle = (row) => {
      row.setAttribute('aria-checked', String(row.getAttribute('aria-checked') !== 'true'));
      clearTimeout(t); t = setTimeout(settle, 550);
    };
    rows().forEach((r) => {
      r.addEventListener('click', () => toggle(r));
      r.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(r); } });
    });
    return () => { clearTimeout(t); anims.forEach((a) => a.cancel()); };
  },
};
