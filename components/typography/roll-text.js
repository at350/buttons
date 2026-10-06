export default {
  id: 'ty-roll-text',
  credit: 'Rolling text button — every letter rolls up to reveal its duplicate, staggered left to right (the GSAP "text roll" classic, CSS only)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .btn {
      cursor: pointer; background: #111; color: #fff; border: 0; border-radius: 999px; padding: 16px 30px;
      font: 500 18px/1 'DM Sans', Inter, system-ui, sans-serif; letter-spacing: .01em;
      display: inline-flex; align-items: center; gap: 12px; transition: background .25s, transform .15s;
    }
    .btn:hover { background: #2563eb; }
    .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; }
    .w { display: inline-flex; overflow: hidden; height: 1em; }
    .ch { position: relative; display: inline-block; height: 1em; transition: transform .5s cubic-bezier(.76, 0, .24, 1); transition-delay: calc(var(--i) * 22ms); }
    .ch.sp { width: .28em; }
    .ch > span { display: block; height: 1em; line-height: 1; }
    .btn:hover .ch, .btn:focus-visible .ch { transform: translateY(-1em); }
    .btn.on .ch { transform: translateY(-1em); }
    .btn.on .ch > span:last-child { color: #bfdbfe; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; flex: none; transition: transform .4s cubic-bezier(.34, 1.56, .64, 1), background .25s; }
    .btn:hover .dot { transform: scale(1.4); }
    .btn.on .dot { background: #bfdbfe; transform: scale(1.4); }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Get started"><span class="w" data-label="Get started" aria-hidden="true"></span><i class="dot" aria-hidden="true"></i></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    const w = root.querySelector('.w');
    let i = 0;
    for (const c of w.dataset.label) {
      const ch = document.createElement('span');
      ch.className = 'ch' + (c === ' ' ? ' sp' : '');
      ch.style.setProperty('--i', String(i++));
      const a = document.createElement('span'); a.textContent = c;
      const b = document.createElement('span'); b.textContent = c;
      ch.append(a, b);
      w.appendChild(ch);
    }
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
