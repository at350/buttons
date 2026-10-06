export default {
  id: 'ty-bracket-submit',
  credit: 'Brutalist mono [ SUBMIT ] — IBM Plex Mono label whose square brackets slide out and snap back in, with a text-mode underline cursor (brutalist web / Bloomberg terminal lineage)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #f2f2ee; border: 1px solid #111; border-radius: 12px; padding: 18px 22px; }
    .btn {
      cursor: pointer; background: transparent; color: #111; border: 0; padding: 8px 0;
      font: 600 20px/1 'IBM Plex Mono', ui-monospace, monospace; text-transform: uppercase; letter-spacing: .08em;
      display: inline-grid; grid-template-columns: 1ch auto 1ch; column-gap: .6ch; align-items: center;
    }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 4px; }
    .br { display: inline-block; transition: transform .35s cubic-bezier(.34, 1.56, .64, 1), color .2s; }
    .btn:hover .br.l, .btn:focus-visible .br.l { transform: translateX(-.5ch); }
    .btn:hover .br.r, .btn:focus-visible .br.r { transform: translateX(.5ch); }
    .btn:active .br.l { transform: translateX(.3ch); }
    .btn:active .br.r { transform: translateX(-.3ch); }
    .lab { position: relative; display: inline-grid; }
    .lab > span { grid-area: 1 / 1; white-space: nowrap; }
    .lab .a { transition: opacity .15s; }
    .lab .b { opacity: 0; transition: opacity .15s; }
    .lab::after { content: ''; position: absolute; left: 0; right: 0; bottom: -5px; height: 2px; background: #111; transform: scaleX(0); transform-origin: left; transition: transform .3s cubic-bezier(.76, 0, .24, 1); }
    .btn:hover .lab::after, .btn:focus-visible .lab::after { transform: scaleX(1); }
    .btn.sent .br { color: #16a34a; }
    .btn.sent .lab .a { opacity: 0; }
    .btn.sent .lab .b { opacity: 1; color: #16a34a; }
    .btn.sent .lab::after { background: #16a34a; transform: scaleX(1); }
    .btn.busy .lab .a { animation: blinkTxt .5s steps(1) infinite; }
    @keyframes blinkTxt { 50% { opacity: .25; } }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><span class="br l" aria-hidden="true">[</span><span class="lab"><span class="a">Submit</span><span class="b" aria-hidden="true">Sent ✓</span></span><span class="br r" aria-hidden="true">]</span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    let t = 0;
    btn.addEventListener('click', () => {
      if (btn.classList.contains('sent')) { btn.classList.remove('sent'); btn.setAttribute('aria-pressed', 'false'); return; }
      if (btn.classList.contains('busy')) return;
      btn.classList.add('busy');
      t = setTimeout(() => { btn.classList.remove('busy'); btn.classList.add('sent'); btn.setAttribute('aria-pressed', 'true'); }, 700);
    });
    return () => clearTimeout(t);
  },
};
