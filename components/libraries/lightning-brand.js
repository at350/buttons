export default {
  id: 'lb-lightning-brand',
  credit: 'Salesforce Lightning (SLDS) — Neutral + Brand buttons and the stateful "Follow / Following / Unfollow" button with its swapping utility icons',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; font: 400 13px/1 "Salesforce Sans", Inter, -apple-system, system-ui, sans-serif; }
    .sl { height: 32px; padding: 0 16px; border-radius: 4px; border: 1px solid #c9c9c9; cursor: pointer; font: inherit; background: #fff; color: #0176d3; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: background 50ms linear, border-color 50ms, color 50ms; -webkit-tap-highlight-color: transparent; }
    .sl:hover { background: #f3f3f3; }
    .sl:active { background: #e5e5e5; }
    .sl:focus-visible { outline: 0; box-shadow: 0 0 3px #0176d3; border-color: #0176d3; }
    .br { background: #0176d3; border-color: #0176d3; color: #fff; }
    .br:hover { background: #014486; border-color: #014486; }
    .br:active, .br[aria-pressed="true"] { background: #032d60; border-color: #032d60; }
    .sl svg { width: 14px; height: 14px; fill: currentColor; }
    .st .s { display: none; align-items: center; gap: 8px; }
    .st[aria-pressed="false"] .n { display: inline-flex; }
    .st[aria-pressed="true"]:not(:hover) .y { display: inline-flex; }
    .st[aria-pressed="true"]:hover .u { display: inline-flex; }
    .st[aria-pressed="true"] { background: #0176d3; border-color: #0176d3; color: #fff; }
    .st[aria-pressed="true"]:hover { background: #fff; border-color: #c9c9c9; color: #ba0517; }
    .ic { width: 32px; height: 32px; padding: 0; justify-content: center; color: #747474; }
    .ic:hover { color: #0176d3; }
    .ic[aria-pressed="true"] { background: #f3f3f3; color: #0176d3; }
  `,
  html: `
    <div class="row">
      <button class="sl" type="button">Cancel</button>
      <button class="sl br" type="button" aria-pressed="false">Save</button>
      <button class="sl st" type="button" aria-pressed="false">
        <span class="s n"><svg viewBox="0 0 24 24"><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></svg>Follow</span>
        <span class="s y"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>Following</span>
        <span class="s u"><svg viewBox="0 0 24 24"><path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 0 0-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z"/></svg>Unfollow</span>
      </button>
      <button class="sl ic" type="button" aria-pressed="false" aria-label="Settings"><svg viewBox="0 0 24 24"><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6a.5.5 0 0 0 .1-.7l-2-3.4a.5.5 0 0 0-.6-.2l-2.5 1a7.4 7.4 0 0 0-1.7-1L14.4 2.4A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.5.4L9.1 5.1a7.4 7.4 0 0 0-1.7 1l-2.5-1a.5.5 0 0 0-.6.2l-2 3.4a.5.5 0 0 0 .1.7L4.6 11a7.6 7.6 0 0 0 0 2l-2.1 1.6a.5.5 0 0 0-.1.7l2 3.4c.1.2.4.3.6.2l2.5-1a7.4 7.4 0 0 0 1.7 1l.4 2.7c0 .2.2.4.5.4h4c.2 0 .5-.2.5-.4l.4-2.7a7.4 7.4 0 0 0 1.7-1l2.5 1c.2.1.5 0 .6-.2l2-3.4a.5.5 0 0 0-.1-.7L19.4 13zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg></button>
    </div>`,
  init(root) {
    root.querySelectorAll('[aria-pressed]').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
