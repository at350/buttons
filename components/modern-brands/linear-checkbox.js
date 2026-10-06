export default {
  id: 'mb-linear-checkbox',
  credit: 'Linear — issue list checkboxes: hairline circle that fills indigo and pops a check with a spring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 14px 18px; border-radius: 12px; background: #0f1011; display: grid; gap: 2px; min-width: 220px; }
    .row { display: flex; align-items: center; gap: 12px; padding: 7px 8px; border-radius: 6px; cursor: pointer; user-select: none;
      font: 450 13px/1 Inter, -apple-system, system-ui, sans-serif; color: #d0d2d8; transition: background .15s; }
    .row:hover { background: #17181b; }
    .row:focus-visible { outline: none; box-shadow: 0 0 0 2px #5e6ad2; }
    .cb { position: relative; width: 16px; height: 16px; border-radius: 50%; flex: none;
      box-shadow: inset 0 0 0 1.5px #4c4f58; background: transparent;
      transition: box-shadow .2s, background .25s, transform .4s linear(0, 0.5 10%, 0.95 22%, 1.15 32%, 1.05 48%, 0.98 65%, 1); }
    .row:hover .cb { box-shadow: inset 0 0 0 1.5px #8a8f98; }
    .cb svg { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round;
      stroke-dasharray: 14; stroke-dashoffset: 14; transition: stroke-dashoffset .3s .08s cubic-bezier(.2,.8,.2,1); }
    .row:hover .cb svg { stroke: #6b6f7a; stroke-dashoffset: 0; }
    .row[aria-checked="true"] .cb { background: #5e6ad2; box-shadow: inset 0 0 0 1.5px #5e6ad2; transform: scale(1.12); }
    .row[aria-checked="true"] .cb svg { stroke: #fff; stroke-dashoffset: 0; }
    .id { color: #6b6f7a; font: 450 12px/1 "JetBrains Mono", ui-monospace, monospace; min-width: 60px; }
    .t { position: relative; transition: color .25s; }
    .t::after { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: #6b6f7a; transform: scaleX(0); transform-origin: left; transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .row[aria-checked="true"] .t { color: #6b6f7a; }
    .row[aria-checked="true"] .t::after { transform: scaleX(1); }
    .pri { margin-left: auto; width: 14px; height: 10px; display: flex; gap: 2px; align-items: flex-end; }
    .pri i { width: 3px; background: #4c4f58; border-radius: 1px; } .pri i:nth-child(1){height:4px} .pri i:nth-child(2){height:7px} .pri i:nth-child(3){height:10px}
    .pri.hi i { background: #8a8f98; } .pri.hi i:nth-child(3) { background: #f2994a; }
  `,
  html: `
    <div class="stage">
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 16 16"><path d="m4.5 8.3 2.4 2.4 4.8-5.2"/></svg></span><span class="id">ENG-142</span><span class="t">Spring easing</span><span class="pri hi"><i></i><i></i><i></i></span></div>
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 16 16"><path d="m4.5 8.3 2.4 2.4 4.8-5.2"/></svg></span><span class="id">ENG-143</span><span class="t">Hover glow</span><span class="pri"><i></i><i></i><i></i></span></div>
      <div class="row" role="checkbox" aria-checked="true" tabindex="0"><span class="cb"><svg viewBox="0 0 16 16"><path d="m4.5 8.3 2.4 2.4 4.8-5.2"/></svg></span><span class="id">ENG-139</span><span class="t">Dark mode</span><span class="pri"><i></i><i></i><i></i></span></div>
    </div>`,
  init(root) {
    root.querySelectorAll('.row').forEach((r) => {
      const flip = () => r.setAttribute('aria-checked', String(r.getAttribute('aria-checked') !== 'true'));
      r.addEventListener('click', flip);
      r.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
    });
  },
};
