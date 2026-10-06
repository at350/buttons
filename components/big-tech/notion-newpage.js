// Notion database toolbar: gray "Filter" / "Sort" text buttons (they turn Notion blue while a rule is active) and the
// blue split "New" button. Nothing changes width, so the toolbar never reflows.
const I = (p) => `<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
export default {
  id: 'bt-notion-newpage',
  credit: 'Notion — database toolbar: Filter / Sort toggles and the blue split "New" button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 2px; align-items: center; padding: 12px 14px; border-radius: 12px; background: #fff; box-shadow: 0 0 0 1px rgba(55,53,47,.09); white-space: nowrap;
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif; }
    .nb {
      height: 28px; padding: 0 8px; border-radius: 6px; border: 0; cursor: pointer;
      font-family: inherit; font-size: 14px; font-weight: 500; line-height: 1.2; background: transparent; color: rgba(55,53,47,.65);
      display: inline-flex; align-items: center; gap: 6px; transition: background 20ms ease-in; -webkit-tap-highlight-color: transparent;
    }
    .nb:hover { background: rgba(55,53,47,.08); }
    .nb:active { background: rgba(55,53,47,.16); }
    .nb[aria-pressed="true"] { color: #2383e2; }
    .nb:focus-visible, .nw button:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(35,131,226,.57); }
    svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
    .nw { display: inline-flex; margin-left: 6px; border-radius: 6px; overflow: hidden; }
    .nw button {
      height: 28px; border: 0; background: #2383e2; color: #fff; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500;
      display: inline-flex; align-items: center; transition: background 20ms ease-in; -webkit-tap-highlight-color: transparent;
    }
    .nw button:hover { background: #0077d4; }
    .nw button:active { background: #0070c9; }
    .new { padding: 0 8px; }
    .dd { padding: 0 4px; box-shadow: inset 1px 0 0 rgba(255,255,255,.25); }
    .dd svg { transition: transform .2s cubic-bezier(.2,0,0,1); }
    .new.made { animation: blip .3s ease-out; }
    @keyframes blip { 50% { background: #0070c9; } }
  `,
  html: `
    <div class="stage">
      <button class="nb" type="button" aria-pressed="false">${I('<path d="M2 5h20"/><path d="M6 12h12"/><path d="M9 19h6"/>')}Filter</button>
      <button class="nb" type="button" aria-pressed="false">${I('<path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>')}Sort</button>
      <span class="nw">
        <button class="new" type="button">New</button>
        <button class="dd" type="button" aria-label="Choose a template">${I('<path d="m6 9 6 6 6-6"/>')}</button>
      </span>
    </div>`,
  init(root) {
    root.querySelectorAll('.nb').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
    const n = root.querySelector('.new');
    n.addEventListener('click', () => { n.classList.remove('made'); void n.offsetWidth; n.classList.add('made'); });
    const dd = root.querySelector('.dd');
    dd.addEventListener('click', () => n.click());
  },
};
