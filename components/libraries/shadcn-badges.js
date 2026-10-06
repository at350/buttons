export default {
  id: 'lb-shadcn-badges',
  credit: 'shadcn/ui — Badge variants (default, secondary, destructive, outline) as toggleable filter chips with a count that follows your picks',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; font: 600 12px/1 Inter, -apple-system, system-ui, sans-serif; }
    .bd { display: inline-flex; align-items: center; gap: 4px; height: 22px; padding: 0 10px; border-radius: 9999px; border: 1px solid transparent; cursor: pointer; font: inherit; transition: background .15s, color .15s, opacity .15s, box-shadow .15s; -webkit-tap-highlight-color: transparent; }
    .bd:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .bd svg { width: 12px; height: 12px; stroke: currentColor; fill: none; stroke-width: 2.5; stroke-linecap: round; display: none; }
    .bd[aria-pressed="true"] svg { display: block; }
    .def { background: #18181b; color: #fafafa; }
    .def:hover { background: rgba(24,24,27,.85); }
    .sec { background: #f4f4f5; color: #18181b; }
    .sec:hover { background: rgba(244,244,245,.8); }
    .des { background: #ef4444; color: #fafafa; }
    .des:hover { background: rgba(239,68,68,.85); }
    .out { background: transparent; color: #09090b; border-color: #e4e4e7; }
    .out:hover { background: #f4f4f5; }
    .bd[aria-pressed="false"] { opacity: .55; }
    .bd[aria-pressed="false"]:hover { opacity: .85; }
    .cnt { margin-left: 4px; display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 9999px; background: #18181b; color: #fafafa; font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="row">
      <button class="bd def" type="button" aria-pressed="true">Badge<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
      <button class="bd sec" type="button" aria-pressed="true">Secondary<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
      <button class="bd des" type="button" aria-pressed="false">Destructive<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
      <button class="bd out" type="button" aria-pressed="false">Outline<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button>
      <span class="cnt" aria-live="polite">2</span>
    </div>`,
  init(root) {
    const all = [...root.querySelectorAll('.bd')], cnt = root.querySelector('.cnt');
    all.forEach((b) => b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
      cnt.textContent = all.filter((x) => x.getAttribute('aria-pressed') === 'true').length;
    }));
  },
};
