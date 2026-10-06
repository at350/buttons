export default {
  id: 'lb-cult-texture',
  credit: 'cult/ui — Texture Button: layered gradient rim + inner bevel with a 1px white top highlight and text-shadow, in primary (paper) and accent (indigo)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 4px; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .tx { position: relative; padding: 2px; border-radius: 12px; border: 0; cursor: pointer; font: inherit; background: linear-gradient(to bottom, rgba(255,255,255,.6), rgba(0,0,0,.08)); box-shadow: 0 1px 2px rgba(0,0,0,.08), inset 0 0 0 1px rgba(0,0,0,.12); transition: transform .15s, box-shadow .15s; -webkit-tap-highlight-color: transparent; }
    .tx:hover { transform: translateY(-1px); box-shadow: 0 3px 6px rgba(0,0,0,.1), inset 0 0 0 1px rgba(0,0,0,.14); }
    .tx:active, .tx[aria-pressed="true"] { transform: translateY(0); box-shadow: 0 0 0 rgba(0,0,0,0), inset 0 0 0 1px rgba(0,0,0,.14); }
    .tx:focus-visible { outline: 2px solid #4f46e5; outline-offset: 3px; }
    .in { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 16px; border-radius: 10px; background: linear-gradient(to bottom, #fafafa, #e5e5e5); color: #171717; text-shadow: 0 1px 0 rgba(255,255,255,.8); box-shadow: inset 0 1px 0 0 #fff, inset 0 -1px 0 0 rgba(0,0,0,.05); white-space: nowrap; transition: background .15s, box-shadow .15s; }
    .tx:active .in, .tx[aria-pressed="true"] .in { background: linear-gradient(to bottom, #e5e5e5, #f0f0f0); box-shadow: inset 0 2px 3px rgba(0,0,0,.12), inset 0 -1px 0 #fff; }
    .acc { background: linear-gradient(to bottom, rgba(255,255,255,.4), rgba(0,0,0,.2)); box-shadow: 0 1px 2px rgba(79,70,229,.3), inset 0 0 0 1px #3730a3; }
    .acc .in { background: linear-gradient(to bottom, #6366f1, #4f46e5); color: #fff; text-shadow: 0 1px 0 rgba(0,0,0,.25); box-shadow: inset 0 1px 0 0 rgba(255,255,255,.35), inset 0 -1px 0 0 rgba(0,0,0,.15); }
    .acc:active .in, .acc[aria-pressed="true"] .in { background: linear-gradient(to bottom, #4338ca, #4f46e5); box-shadow: inset 0 2px 4px rgba(0,0,0,.3); }
    .dark { background: linear-gradient(to bottom, rgba(255,255,255,.25), rgba(0,0,0,.4)); box-shadow: 0 1px 2px rgba(0,0,0,.4), inset 0 0 0 1px #000; }
    .dark .in { background: linear-gradient(to bottom, #262626, #171717); color: #fafafa; text-shadow: 0 1px 0 rgba(0,0,0,.6); box-shadow: inset 0 1px 0 0 rgba(255,255,255,.12), inset 0 -1px 0 0 rgba(0,0,0,.4); }
    .dark:active .in, .dark[aria-pressed="true"] .in { background: linear-gradient(to bottom, #0a0a0a, #171717); box-shadow: inset 0 2px 4px rgba(0,0,0,.6); }
    .in svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="row">
      <button class="tx" type="button" aria-pressed="false"><span class="in">Primary</span></button>
      <button class="tx acc" type="button" aria-pressed="false"><span class="in"><svg viewBox="0 0 24 24"><path d="m12 3-1.9 5.8L4 10.7l5.5 3.6L7.6 20 12 16.4l4.4 3.6-1.9-5.7 5.5-3.6-6.1-1.9z"/></svg>Accent</span></button>
      <button class="tx dark" type="button" aria-pressed="false"><span class="in">Dark</span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.tx').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
