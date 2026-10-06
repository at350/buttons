export default {
  id: 'bt-win11-titlebar',
  credit: 'Microsoft Windows 11 — Mica title bar caption buttons (minimize, maximize / restore, red close)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .bar {
      display: inline-flex; align-items: center; height: 32px; padding-left: 16px; border-radius: 8px 8px 0 0;
      background: #f3f3f3; border: 1px solid #e5e5e5; border-bottom: 0; min-width: 300px;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
    }
    .bar.max { border-radius: 0; }
    .app { width: 16px; height: 16px; fill: #0078d4; flex: none; }
    .ttl { margin: 0 auto 0 12px; font: 400 12px/16px "Segoe UI Variable Text", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif; color: rgba(0,0,0,.894); white-space: nowrap; }
    .cap {
      width: 46px; height: 32px; border: 0; background: transparent; color: #1a1a1a; cursor: default;
      display: inline-flex; align-items: center; justify-content: center; transition: background-color .083s linear, color .083s linear;
      -webkit-tap-highlight-color: transparent;
    }
    .cap:hover { background: rgba(0,0,0,.0373); }
    .cap:active { background: rgba(0,0,0,.0241); color: rgba(0,0,0,.6063); }
    .cap.close:hover { background: #c42b1c; color: #fff; }
    .cap.close:active { background: rgba(196,43,28,.9); color: rgba(255,255,255,.7); }
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
      <svg class="app" viewBox="0 0 24 24" aria-hidden="true"><path d="M0,0H11.377V11.372H0ZM12.623,0H24V11.372H12.623ZM0,12.623H11.377V24H0Zm12.623,0H24V24H12.623"/></svg><span class="ttl"></span>
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
