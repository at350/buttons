export default {
  id: 'lb-daisy-buttons',
  credit: 'daisyUI 5 — btn-primary / secondary / accent / neutral / ghost in the default light theme (oklch tokens, --radius-field .25rem, --size-field 40px, depth shadow + inset highlight, 0.5px press)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; font: 600 14px/1 ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji"; }
    .btn { --btn-color: oklch(98% 0 0); --btn-fg: oklch(21% 0.006 285.885); --btn-bg: var(--btn-color);
      --btn-border: color-mix(in oklab, var(--btn-color), #000 5%);
      --btn-shadow: 0 3px 2px -2px color-mix(in oklab, var(--btn-bg) 30%, #0000), 0 4px 3px -2px color-mix(in oklab, var(--btn-bg) 30%, #0000);
      --btn-inset: 0 .5px 0 .5px oklch(100% 0 0 / 6%);
      height: 40px; padding-inline: 1rem; border: 1px solid var(--btn-border); border-radius: .25rem; background-color: var(--btn-bg); color: var(--btn-fg); cursor: pointer; font: inherit; display: inline-flex; align-items: center; justify-content: center; gap: .375rem; white-space: nowrap; user-select: none; touch-action: manipulation;
      text-shadow: 0 .5px oklch(100% 0 0 / .15); box-shadow: var(--btn-inset) inset, var(--btn-shadow); outline-offset: 2px; outline-color: var(--btn-color);
      transition-property: color, background-color, border-color, box-shadow, transform, translate; transition-duration: .2s; transition-timing-function: cubic-bezier(0,0,.2,1); -webkit-tap-highlight-color: transparent; }
    .btn:hover { --btn-bg: color-mix(in oklab, var(--btn-color), #000 7%); --btn-border: color-mix(in oklab, var(--btn-bg), #000 5%); }
    .btn:active:not([aria-pressed="true"]) { --btn-bg: color-mix(in oklab, var(--btn-color), #000 5%); --btn-border: color-mix(in oklab, var(--btn-color), #000 7%); --btn-inset: 0 0 0 0 oklch(0% 0 0 / 0); --btn-shadow: 0 0 0 0 oklch(0% 0 0 / 0); translate: 0 .5px; }
    .btn[aria-pressed="true"] { --btn-bg: color-mix(in oklab, var(--btn-color), #000 5%); --btn-shadow: 0 0 0 0 oklch(0% 0 0 / 0); isolation: isolate; }
    .btn:focus-visible { outline: 2px solid var(--btn-color); }
    .pri { --btn-color: oklch(45% 0.24 277.023); --btn-fg: oklch(93% 0.034 272.788); }
    .sec { --btn-color: oklch(65% 0.241 354.308); --btn-fg: oklch(94% 0.028 342.258); }
    .acc { --btn-color: oklch(77% 0.152 181.912); --btn-fg: oklch(38% 0.063 188.416); }
    .neu { --btn-color: oklch(14% 0.005 285.823); --btn-fg: oklch(92% 0.004 286.32); }
    .gho { --btn-bg: #0000; --btn-border: #0000; --btn-inset: 0 0 0 0 oklch(0% 0 0 / 0); --btn-shadow: 0 0 0 0 oklch(0% 0 0 / 0); outline-color: oklch(21% 0.006 285.885); }
    .gho:hover { --btn-bg: oklch(98% 0 0); --btn-border: color-mix(in oklab, oklch(98% 0 0), #000 5%); }
    .gho:focus-visible { outline-color: oklch(21% 0.006 285.885); }
  `,
  html: `
    <div class="row">
      <button class="btn pri" type="button" aria-pressed="false">Primary</button>
      <button class="btn sec" type="button" aria-pressed="false">Secondary</button>
      <button class="btn acc" type="button" aria-pressed="false">Accent</button>
      <button class="btn neu" type="button" aria-pressed="false">Neutral</button>
      <button class="btn gho" type="button" aria-pressed="false">Ghost</button>
    </div>`,
  init(root) {
    root.querySelectorAll('.btn').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
