export default {
  id: 'lb-geist-switch',
  credit: 'Vercel Geist — Toggle (gray-alpha track, gray-1000 when on) beside the Switch segmented selector from the docs: <SwitchControl label="Source"> / "Output", gray-alpha-400 border, gray-200 active pill',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 24px; font: 500 14px/20px Geist, Inter, -apple-system, system-ui, sans-serif; color: #171717; }
    .tg { position: relative; flex: none; width: 36px; height: 20px; border-radius: 9999px; border: 0; padding: 0; cursor: pointer; background: #ebebeb; box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); transition: background .15s ease, box-shadow .15s ease; -webkit-tap-highlight-color: transparent; }
    .tg:hover { background: #e0e0e0; }
    .tg[aria-checked="true"] { background: #171717; box-shadow: none; }
    .tg[aria-checked="true"]:hover { background: #383838; }
    .tg:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #006bff; }
    .th { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.16), 0 0 0 1px rgba(0,0,0,.04); transition: transform .15s ease; }
    .tg[aria-checked="true"] .th { transform: translateX(16px); }
    .sw { position: relative; display: inline-grid; grid-template-columns: 1fr 1fr; height: 40px; padding: 4px; gap: 0; border-radius: 6px; background: #fff; box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); }
    .ind { position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / 2); transform: translateX(calc(var(--i, 0) * 100%)); border-radius: 4px; background: #ebebeb; transition: transform .2s cubic-bezier(.175,.885,.32,1.1); }
    .op { position: relative; z-index: 1; height: 32px; padding: 0 12px; border: 0; border-radius: 4px; background: none; font: inherit; color: #666; cursor: pointer; white-space: nowrap; transition: color .15s ease; -webkit-tap-highlight-color: transparent; }
    .op:hover, .op[aria-checked="true"] { color: #171717; }
    .op:focus-visible { outline: 0; box-shadow: 0 0 0 2px #006bff; }
  `,
  html: `
    <div class="row">
      <button class="tg" type="button" role="switch" aria-checked="true" aria-label="Password Protection"><span class="th"></span></button>
      <div class="sw" role="radiogroup" aria-label="View">
        <span class="ind"></span>
        <button class="op" type="button" role="radio" aria-checked="true">Source</button>
        <button class="op" type="button" role="radio" aria-checked="false">Output</button>
      </div>
    </div>`,
  init(root) {
    const tg = root.querySelector('.tg'), sw = root.querySelector('.sw'), ops = [...root.querySelectorAll('.op')];
    tg.addEventListener('click', () => tg.setAttribute('aria-checked', tg.getAttribute('aria-checked') !== 'true'));
    const pick = (b) => { ops.forEach((x) => x.setAttribute('aria-checked', x === b)); sw.style.setProperty('--i', ops.indexOf(b)); };
    ops.forEach((b, i) => {
      b.addEventListener('click', () => pick(b));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); const n = ops[(i + d + ops.length) % ops.length]; pick(n); n.focus({ preventScroll: true }); } });
    });
  },
};
