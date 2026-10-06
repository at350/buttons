export default {
  id: 'bt-win11-titlebar',
  credit: 'Microsoft Windows 11 — caption buttons (minimize, maximize/restore, close)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .bar {
      display: inline-flex; align-items: center; height: 32px; padding-left: 16px; border-radius: 8px 8px 0 0;
      background: #f3f3f3; border: 1px solid #e5e5e5; border-bottom: 0; min-width: 240px;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
    }
    .bar.max { border-radius: 0; }
    .dot { width: 16px; height: 16px; border-radius: 3px; background: linear-gradient(135deg,#0a84ff,#53c0ff); margin-right: auto; }
    .cap {
      width: 46px; height: 32px; border: 0; background: transparent; color: #1a1a1a; cursor: default;
      display: inline-flex; align-items: center; justify-content: center; transition: background .1s, color .1s;
      -webkit-tap-highlight-color: transparent;
    }
    .cap:hover { background: rgba(0,0,0,.05); }
    .cap:active { background: rgba(0,0,0,.03); color: rgba(0,0,0,.6); }
    .cap.close:hover { background: #c42b1c; color: #fff; }
    .cap.close:active { background: #c42b1c; color: rgba(255,255,255,.7); }
    .cap:focus-visible { outline: 2px solid #000; outline-offset: -2px; }
    .cap svg { width: 10px; height: 10px; stroke: currentColor; stroke-width: 1; fill: none; }
    .restore { display: none; }
    .bar.max .maxi { display: none; }
    .bar.max .restore { display: block; }
    .bar.gone { opacity: 0; transform: scale(.9); transition: opacity .15s, transform .15s; pointer-events: none; }
    .bar { transition: opacity .15s, transform .15s, border-radius .15s; }
    .bar.min { transform: translateY(6px) scaleY(.9); opacity: .5; }
  `,
  html: `
    <div class="bar">
      <span class="dot"></span>
      <button class="cap mini" type="button" aria-label="Minimize"><svg viewBox="0 0 10 10"><path d="M0 5h10"/></svg></button>
      <button class="cap maxi" type="button" aria-label="Maximize"><svg viewBox="0 0 10 10"><rect x=".5" y=".5" width="9" height="9" rx="1.5"/></svg></button>
      <button class="cap restore" type="button" aria-label="Restore"><svg viewBox="0 0 10 10"><path d="M2.5 2.5V1.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1"/><rect x=".5" y="2.5" width="7" height="7" rx="1"/></svg></button>
      <button class="cap close" type="button" aria-label="Close"><svg viewBox="0 0 10 10"><path d="M0 0l10 10M10 0L0 10"/></svg></button>
    </div>`,
  init(root) {
    const bar = root.querySelector('.bar');
    // Temporary animation classes, each with its own duration and timer. `max` is a persistent toggle and is not touched here.
    const TEMP = { min: 600, gone: 900 };
    const timers = {};
    const resetAll = () => {
      for (const cls of Object.keys(TEMP)) { clearTimeout(timers[cls]); delete timers[cls]; bar.classList.remove(cls); }
    };
    // Starting one temporary animation supersedes any other in flight (a close replaces a pending minimize and vice versa),
    // and every reset clears all temporary classes, so none can be left stuck.
    const flash = (cls) => { resetAll(); bar.classList.add(cls); timers[cls] = setTimeout(resetAll, TEMP[cls]); };
    root.querySelector('.mini').addEventListener('click', () => flash('min'));
    root.querySelector('.maxi').addEventListener('click', () => bar.classList.add('max'));
    root.querySelector('.restore').addEventListener('click', () => bar.classList.remove('max'));
    root.querySelector('.close').addEventListener('click', () => flash('gone'));
    return resetAll;
  },
};
