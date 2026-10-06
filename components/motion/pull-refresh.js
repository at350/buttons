// iOS UIRefreshControl — pull the list down with UIScrollView's rubber band, f(x) = (1 − 1/(x·0.55/d + 1))·d,
// the 8-spoke activity indicator draws itself spoke by spoke as you pull, past the threshold it spins while the
// content holds, then the list springs home (response .4 / damping .85) and the new message slides in at the top.
const IOS = 'linear(0, 0.038, 0.117, 0.226, 0.343, 0.451, 0.557, 0.65, 0.726, 0.793, 0.847, 0.891, 0.922, 0.948, 0.967, 0.98, 0.99, 0.997, 1.001, 1.004, 1.005, 1.005, 1.005, 1.005, 1.004, 1.004, 1.003, 1.003, 1.002, 1.002, 1.001, 1.001, 1)';
const MAIL = [
  ['Linear', 'Weekly digest — 12 issues closed', '9:41 AM'],
  ['Mia Jones', 'Design review notes', '9:12 AM'],
  ['Alex Chen', 'Thursday offsite', '8:30 AM'],
  ['Vercel', 'Deployment ready: acme-web', 'Yesterday'],
  ['Ravi Kumar', 'Re: Q3 roadmap', 'Yesterday'],
  ['GitHub', '[acme/web] PR #482 merged', 'Mon'],
];

export default {
  id: 'mo-pull-refresh',
  credit: 'iOS pull-to-refresh (UIRefreshControl) — rubber-band drag, the activity indicator fills spoke by spoke, release past the line to spin, then the new mail slides in',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 270px; height: 272px; max-width: 100%; border-radius: 12px; background: #f2f2f7; border: 1px solid #e5e5ea; overflow: hidden; touch-action: none; font-family: system-ui, -apple-system, 'SF Pro Text', Inter, sans-serif; user-select: none; -webkit-user-select: none; }
    .spin { position: absolute; top: 14px; left: 50%; width: 22px; height: 22px; margin-left: -11px; }
    .spin i { position: absolute; left: 9.75px; top: 0; width: 2.5px; height: 6.5px; border-radius: 2px; background: #8e8e93; transform-origin: 1.25px 11px; transform: rotate(calc(var(--k) * 45deg)); opacity: 0; transition: opacity .12s; }
    .spin i.on { opacity: 1; }
    .stage.busy .spin i { opacity: 1; animation: fade .8s linear infinite; animation-delay: calc(var(--k) * .1s - .8s); }
    @keyframes fade { from { opacity: 1; } to { opacity: .25; } }
    .scroll { position: absolute; inset: 0; overflow: hidden; background: #f2f2f7; transform: translateY(var(--y, 0px)); transition: transform .55s ${IOS}; cursor: grab; outline: none; }
    .stage.drag .scroll { transition: none; cursor: grabbing; }
    .scroll:focus-visible { box-shadow: inset 0 0 0 2px #007aff; border-radius: 12px; }
    h1 { margin: 0; padding: 12px 16px 6px; line-height: 32px; font-size: 26px; font-weight: 700; letter-spacing: .01em; color: #000; }
    ul { margin: 0; padding: 0; list-style: none; background: #fff; }
    li { position: relative; height: 54px; display: flex; flex-direction: column; justify-content: center; padding: 0 14px 0 28px; overflow: hidden; transition: height .5s ${IOS}, opacity .35s; }
    li + li::before { content: ''; position: absolute; top: 0; left: 28px; right: 0; height: 1px; background: #e5e5ea; }
    li.new { height: 0; opacity: 0; }
    li .u { position: absolute; left: 11px; top: 14px; width: 9px; height: 9px; border-radius: 50%; background: #007aff; }
    li div { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
    li b { font-size: 14px; font-weight: 600; color: #000; } li time { font-size: 12.5px; color: #8e8e93; white-space: nowrap; }
    li span { font-size: 13px; color: #3c3c43; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  `,
  html: `
    <div class="stage">
      <div class="spin" aria-hidden="true">${Array.from({ length: 8 }, (_, k) => `<i style="--k:${k}"></i>`).join('')}</div>
      <div class="scroll" tabindex="0" role="button" aria-label="Inbox — pull down or press Enter to refresh">
        <h1>Inbox</h1>
        <ul></ul>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), scroll = root.querySelector('.scroll'), ul = root.querySelector('ul'), spokes = [...root.querySelectorAll('.spin i')];
    const T = 64, HOLD = 50;
    let next = 0, y = 0, sy = 0, busy = false, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const row = ([who, sub, t], unread) => { const li = document.createElement('li'); li.innerHTML = `${unread ? '<i class="u"></i>' : ''}<div><b>${who}</b><time>${t}</time></div><span>${sub}</span>`; return li; };
    for (let i = 0; i < 4; i++) ul.appendChild(row(MAIL[(next + i) % MAIL.length], i === 0));
    next = 4;
    const setY = (v) => { y = v; scroll.style.setProperty('--y', v + 'px'); const n = busy ? 8 : Math.floor(Math.min(1, v / T) * 8); spokes.forEach((s, k) => s.classList.toggle('on', k < n)); };
    const refresh = () => {
      busy = true; stage.classList.add('busy'); setY(HOLD);
      later(() => {
        busy = false; stage.classList.remove('busy'); setY(0);
        const li = row(['Notion', 'Your weekly summary is ready', 'now'], true); li.classList.add('new');
        ul.insertBefore(li, ul.firstChild);
        requestAnimationFrame(() => requestAnimationFrame(() => li.classList.remove('new')));
        later(() => { while (ul.children.length > 4) ul.lastChild.remove(); }, 600);
      }, 1300);
    };
    scroll.addEventListener('pointerdown', (e) => { if (busy) return; scroll.setPointerCapture(e.pointerId); sy = e.clientY; stage.classList.add('drag'); });
    scroll.addEventListener('pointermove', (e) => {
      if (!stage.classList.contains('drag')) return;
      const d = Math.max(0, e.clientY - sy), D = stage.offsetHeight;
      setY((1 - 1 / (d * .55 / D + 1)) * D);
    });
    const end = () => { if (!stage.classList.contains('drag')) return; stage.classList.remove('drag'); if (y >= T) refresh(); else setY(0); };
    scroll.addEventListener('pointerup', end); scroll.addEventListener('pointercancel', end);
    scroll.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !busy) { e.preventDefault(); refresh(); } });
    return () => timers.forEach(clearTimeout);
  },
};
