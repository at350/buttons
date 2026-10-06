// Material 3 filter chips (md-filter-chip tokens, baseline scheme): 32px tall, 8px corners, 1px outline-variant
// #cac4d0 outline, 14/20 medium label +0.1 tracking in on-surface-variant #49454f; selected = secondary-container
// #e8def8 with on-secondary-container #4a4458 label and an 18px Material Symbols check that grows in
// (padding 16 → 8 leading). Hover 8% / press 12% state layer, 200ms emphasized cubic-bezier(0.2, 0, 0, 1).
// The widest (all-selected) row is reserved by an invisible ghost so selecting never changes the box.
const LABELS = ['Extra soft', 'Soft', 'Medium', 'Hard'];
const CHECK = 'M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z';
const chip = (l, on, ghost) => `<button class="chip" type="button" ${ghost ? 'tabindex="-1" aria-hidden="true"' : `aria-pressed="${on}"`}><svg viewBox="0 -960 960 960"><path d="${CHECK}"/></svg><span>${l}</span></button>`;
export default {
  id: 'in-filter-chips',
  credit: 'Google Material 3 filter chips — outline-variant pill fills secondary-container and grows a leading check when selected',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stack { display: grid; }
    .row { grid-area: 1 / 1; display: flex; gap: 8px; white-space: nowrap; }
    .ghost { visibility: hidden; pointer-events: none; }
    .chip {
      position: relative; display: inline-flex; align-items: center; height: 32px; padding: 0 16px; border-radius: 8px; border: 0; background: transparent;
      box-shadow: inset 0 0 0 1px #cac4d0; font: 500 14px/20px "Roboto Flex", Roboto, system-ui, sans-serif; letter-spacing: .1px; color: #49454f;
      cursor: pointer; overflow: hidden; transition: background-color 200ms cubic-bezier(.2,0,0,1), padding 200ms cubic-bezier(.2,0,0,1), box-shadow 200ms cubic-bezier(.2,0,0,1);
      -webkit-tap-highlight-color: transparent; outline: 0;
    }
    .chip::before { content: ''; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity 15ms linear; }
    .chip:hover::before { opacity: .08; }
    .chip:active::before { opacity: .12; }
    .chip:focus-visible { outline: 3px solid #625b71; outline-offset: 2px; }
    .chip svg { width: 0; height: 18px; flex: none; fill: #4a4458; opacity: 0; margin-right: 0; transition: width 200ms cubic-bezier(.2,0,0,1), margin 200ms cubic-bezier(.2,0,0,1), opacity 100ms linear; }
    .chip[aria-pressed="true"], .ghost .chip { padding-left: 8px; background: #e8def8; box-shadow: none; color: #4a4458; }
    .chip[aria-pressed="true"]:hover { box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15); }
    .chip[aria-pressed="true"] svg, .ghost .chip svg { width: 18px; margin-right: 8px; opacity: 1; }
    .chip span { position: relative; }
  `,
  html: `<div class="stack">
    <div class="row ghost">${LABELS.map((l) => chip(l, true, true)).join('')}</div>
    <div class="row live">${LABELS.map((l, i) => chip(l, i === 1, false)).join('')}</div>
  </div>`,
  init(root) {
    root.querySelectorAll('.live .chip').forEach((c) => c.addEventListener('click', () => c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true')));
  },
};
