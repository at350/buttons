export default {
  id: 'ty-typewriter',
  credit: 'Typewriter button — label types itself out with a blinking caret while hovered and un-types when you leave (typed.js lineage)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .btn {
      cursor: pointer; background: #fffdf7; color: #1c1917; border: 1.5px solid #1c1917; border-radius: 6px; padding: 14px 20px;
      font: 400 18px/1 'IBM Plex Mono', ui-monospace, monospace; display: inline-grid; text-align: left;
      box-shadow: 3px 3px 0 #1c1917; margin: 0 4px 4px 0; transition: transform .12s, box-shadow .12s, background .2s;
    }
    .btn:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 #1c1917; }
    .btn:focus-visible { outline: 2px solid #ea580c; outline-offset: 3px; }
    .btn > span { grid-area: 1 / 1; white-space: pre; }
    .g { visibility: hidden; }
    .v { color: #a8a29e; }
    .v .typed { color: #1c1917; }
    .caret { display: inline-block; width: .6ch; height: 1.05em; vertical-align: -.15em; background: #ea580c; margin-left: 1px; animation: blink 1s steps(1) infinite; }
    .btn.typing .caret { animation: none; }
        .btn.done { font-weight: 600; background: #ea580c; color: #fff; border-color: #ea580c; box-shadow: 3px 3px 0 #7c2d12; }
    .btn.done .v, .btn.done .v .typed { color: #fff; }
    .btn.done .caret { background: #fff; }
    @keyframes blink { 50% { opacity: 0; } }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Type something"><span class="g" aria-hidden="true">Type something_</span><span class="v" aria-hidden="true"><span class="typed"></span><span class="rest">Type something</span><i class="caret"></i></span></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    const typed = root.querySelector('.typed');
    const rest = root.querySelector('.rest');
    const full = 'Type something';
    let n = 0, t = 0, dir = 0;
    const paint = () => { typed.textContent = full.slice(0, n); rest.textContent = full.slice(n); };
    const stop = () => { clearInterval(t); t = 0; btn.classList.remove('typing'); };
    const run = (d) => {
      dir = d; stop(); btn.classList.add('typing');
      t = setInterval(() => {
        n += dir;
        if (n >= full.length) { n = full.length; stop(); }
        if (n <= 0) { n = 0; stop(); }
        paint();
      }, dir > 0 ? 55 : 30);
    };
    btn.addEventListener('pointerenter', () => { if (!btn.classList.contains('done')) run(1); });
    btn.addEventListener('pointerleave', () => { if (!btn.classList.contains('done')) run(-1); });
    btn.addEventListener('focus', () => { if (!btn.classList.contains('done')) run(1); });
    btn.addEventListener('blur', () => { if (!btn.classList.contains('done') && !btn.matches(':hover')) run(-1); });
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('done');
      btn.setAttribute('aria-pressed', String(on));
      if (on) { stop(); n = full.length; paint(); } else run(-1);
    });
    paint();
    return stop;
  },
};
