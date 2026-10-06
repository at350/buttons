export default {
  id: 'mb-cursor-download',
  credit: 'Cursor (cursor.com, 2025) — warm-dark hero with the pill "Download for macOS ⤓" and the card-tone "Request a demo →"; the download arrow drops and fills a progress hairline',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 24px; border-radius: 12px; background: #14120b; display: flex; gap: 10px; align-items: center;
      font: 400 14px/1 Inter, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    .btn { position: relative; display: inline-flex; align-items: center; padding: .78em 1.35em .8em; border-radius: 999px; border: 1px solid #edecec; background: #edecec; color: #14120b;
      font: inherit; line-height: 1; cursor: pointer; overflow: hidden; white-space: nowrap; -webkit-tap-highlight-color: transparent;
      transition: background-color .15s ease, border-color .15s ease, color .15s ease; }
    .btn:hover { background: #d9d8d6; border-color: #d9d8d6; }
    .btn:focus-visible { outline: 2px solid #f54e00; outline-offset: 2px; }
    .ic { display: inline-flex; padding-inline-start: .25em; opacity: .7; }
    .ic svg { width: 1em; height: 1em; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; overflow: visible; }
    .lbl { display: grid; }
    .lbl span { grid-area: 1 / 1; transition: opacity .15s; }
    .lbl .b, .lbl .c { opacity: 0; }
    .dl.busy .lbl .a, .dl.got .lbl .a { opacity: 0; }
    .dl.busy .lbl .b { opacity: 1; }
    .dl.got .lbl .c { opacity: 1; }
    .dl .arr { transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .dl:hover .arr { transform: translateY(1.5px); }
    .dl.busy .arr { animation: drop .9s cubic-bezier(.5,0,.5,1) infinite; }
    @keyframes drop { 0% { transform: translateY(-6px); opacity: 0; } 30% { opacity: 1; } 70% { transform: translateY(3px); opacity: 1; } 100% { transform: translateY(6px); opacity: 0; } }
    .bar { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: #f54e00; transform: scaleX(0); transform-origin: left; }
    .dl.busy .bar { transform: scaleX(1); transition: transform 1.5s cubic-bezier(.3,.1,.3,1); }
    .dl.got .bar { opacity: 0; transition: opacity .2s; }
    .sec { background: #26241e; border-color: rgba(237,236,236,.025); color: #edecec; }
    .sec:hover { background: #2b2923; border-color: rgba(237,236,236,.025); }
    .sec .ic svg { transition: transform .2s ease; }
    .sec:hover .ic svg { transform: translateX(2px); }
  `,
  html: `
    <div class="stage">
      <button class="btn dl" type="button" aria-live="polite"><span class="lbl"><span class="a">Download for macOS</span><span class="b">Downloading…</span><span class="c">Downloaded</span></span><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24"><g class="arr"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/></g><path d="M19 21H5"/></svg></span><span class="bar"></span></button>
      <button class="btn sec" type="button">Request a demo<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span></button>
    </div>`,
  init(root) {
    const dl = root.querySelector('.dl');
    let t;
    dl.addEventListener('click', () => {
      if (dl.classList.contains('busy')) return;
      if (dl.classList.contains('got')) { dl.classList.remove('got'); return; }
      dl.classList.add('busy');
      t = setTimeout(() => { dl.classList.remove('busy'); dl.classList.add('got'); }, 1600);
    });
    return () => clearTimeout(t);
  },
};
