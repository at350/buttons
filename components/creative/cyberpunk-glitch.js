export default {
  id: 'cr-cyberpunk-glitch',
  credit: 'Cyberpunk 2077 UI button — clipped corners + RGB glitch slices (CodePen by Ikbal Ahmed)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0d0d0d; padding: 30px 40px; border-radius: 12px; }
    .btn {
      --c: #fcee0a; --cut: 16px;
      position: relative; cursor: pointer; border: 0; color: #0d0d0d; background: var(--c);
      font: 700 15px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .18em; text-transform: uppercase;
      padding: 18px 44px 18px 34px;
      clip-path: polygon(0 0, calc(100% - var(--cut)) 0, 100% var(--cut), 100% 100%, var(--cut) 100%, 0 calc(100% - var(--cut)));
      transition: background .15s;
    }
    .btn::before, .btn::after {
      content: attr(data-text); position: absolute; inset: 0; display: grid; place-items: center;
      padding-right: 10px; background: var(--c); color: #0d0d0d; opacity: 0;
      clip-path: inset(0 0 100% 0);
    }
    .btn::before { background: #00f0ff; }
    .btn::after { background: #ff003c; color: #fff; }
    .btn:hover::before, .btn:focus-visible::before { opacity: 1; animation: g1 .9s steps(1) infinite; }
    .btn:hover::after, .btn:focus-visible::after { opacity: 1; animation: g2 .9s steps(1) infinite; }
    .btn:hover { background: #ffd60a; }
    .btn:active { transform: translate(2px, 2px); }
    .btn[aria-pressed="true"] { --c: #00f0ff; }
    .btn:focus-visible { outline: 0; }
    .tag {
      position: absolute; right: 6px; bottom: 3px; font-size: 7px; letter-spacing: .1em; opacity: .75;
      pointer-events: none;
    }
    @keyframes g1 {
      0% { clip-path: inset(10% 0 70% 0); transform: translateX(-6px); }
      20% { clip-path: inset(60% 0 15% 0); transform: translateX(5px); }
      40% { clip-path: inset(30% 0 50% 0); transform: translateX(-3px); }
      60% { clip-path: inset(80% 0 5% 0); transform: translateX(4px); }
      80% { clip-path: inset(0 0 85% 0); transform: translateX(-5px); }
      100% { clip-path: inset(45% 0 40% 0); transform: translateX(3px); }
    }
    @keyframes g2 {
      0% { clip-path: inset(70% 0 10% 0); transform: translateX(5px); }
      20% { clip-path: inset(20% 0 65% 0); transform: translateX(-4px); }
      40% { clip-path: inset(85% 0 0 0); transform: translateX(6px); }
      60% { clip-path: inset(5% 0 80% 0); transform: translateX(-6px); }
      80% { clip-path: inset(50% 0 30% 0); transform: translateX(3px); }
      100% { clip-path: inset(25% 0 60% 0); transform: translateX(-2px); }
    }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false" data-text="Engage_">Engage_<span class="tag">R25</span></button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
