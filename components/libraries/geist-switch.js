export default {
  id: 'lb-geist-switch',
  credit: 'Vercel Geist — Toggle (black when on) beside the Switch segmented control (gray-100 track, white sliding item) with Source / Output / Preview',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 24px; font: 500 14px/1 Geist, Inter, -apple-system, system-ui, sans-serif; color: #171717; }
    .tg { position: relative; width: 36px; height: 20px; border-radius: 9999px; border: 0; padding: 0; cursor: pointer; background: #ebebeb; box-shadow: inset 0 0 0 1px #e5e5e5; transition: background .15s, box-shadow .15s; -webkit-tap-highlight-color: transparent; }
    .tg:hover { background: #e0e0e0; }
    .tg[aria-checked="true"] { background: #171717; box-shadow: none; }
    .tg[aria-checked="true"]:hover { background: #383838; }
    .tg:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0070f3; }
    .th { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.2); transition: transform .15s ease; }
    .tg[aria-checked="true"] .th { transform: translateX(16px); }
    .sw { position: relative; display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; padding: 2px; border-radius: 6px; background: #f2f2f2; box-shadow: inset 0 0 0 1px #ebebeb; }
    .ind { position: absolute; top: 2px; bottom: 2px; left: 2px; width: calc((100% - 4px) / 3); transform: translateX(calc(var(--i, 0) * 100%)); border-radius: 4px; background: #fff; box-shadow: 0 0 0 1px #ebebeb, 0 1px 2px rgba(0,0,0,.06); transition: transform .2s cubic-bezier(.4,0,.2,1), width .2s; }
    .op { position: relative; z-index: 1; height: 28px; padding: 0 12px; justify-content: center; border: 0; border-radius: 4px; background: none; font: inherit; color: #666; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; transition: color .15s; -webkit-tap-highlight-color: transparent; }
    .op:hover { color: #171717; }
    .op[aria-checked="true"] { color: #171717; }
    .op:focus-visible { outline: 0; box-shadow: 0 0 0 2px #0070f3; }
    .op svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="row">
      <button class="tg" type="button" role="switch" aria-checked="true" aria-label="Toggle"><span class="th"></span></button>
      <div class="sw" role="radiogroup" aria-label="View">
        <span class="ind"></span>
        <button class="op" type="button" role="radio" aria-checked="true"><svg viewBox="0 0 24 24"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>Source</button>
        <button class="op" type="button" role="radio" aria-checked="false"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6"/></svg>Output</button>
        <button class="op" type="button" role="radio" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>Preview</button>
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
