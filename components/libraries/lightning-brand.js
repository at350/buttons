export default {
  id: 'lb-lightning-brand',
  credit: 'Salesforce Lightning Design System — Neutral + Brand buttons, the stateful "Follow / Following / Unfollow" button (utility add / check / close icons, selected = transparent) and a bordered-filled settings icon button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; font: 400 13px/1.875rem -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .sl { position: relative; height: 32px; padding: 0 16px; border-radius: .25rem; border: 1px solid #c9c9c9; cursor: pointer; font: inherit; background: #fff; color: #0176d3; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; transition: border .15s linear; -webkit-tap-highlight-color: transparent; }
    .sl:hover, .sl:focus-visible { background: #f3f3f3; color: #014486; }
    .sl:active { background: #eee; }
    .sl:focus-visible { outline: 0; box-shadow: 0 0 3px #0176d3; }
    .br { background: #0176d3; border-color: #0176d3; color: #fff; }
    .br:hover, .br:focus-visible { background: #014486; border-color: #014486; color: #fff; }
    .br:active { background: #014486; border-color: #014486; }
    .sl svg { width: 14px; height: 14px; fill: currentColor; flex: none; margin-right: 8px; }
    .st .stack { display: grid; }
    .st .stack > span { grid-area: 1 / 1; display: inline-flex; align-items: center; justify-content: center; visibility: hidden; }
    .st[aria-pressed="false"] .n { visibility: visible; }
    .st[aria-pressed="true"] { background: transparent; border-color: transparent; }
    .st[aria-pressed="true"] .y { visibility: visible; }
    .st[aria-pressed="true"]:not(.clicked):is(:hover, :focus-visible) { background: #f3f3f3; border-color: #c9c9c9; }
    .st[aria-pressed="true"]:not(.clicked):is(:hover, :focus-visible) .y { visibility: hidden; }
    .st[aria-pressed="true"]:not(.clicked):is(:hover, :focus-visible) .u { visibility: visible; }
    .ic { width: 32px; padding: 0; color: #747474; }
    .ic svg { margin: 0; }
    .ic:hover, .ic:focus-visible { color: #0176d3; background: #f3f3f3; }
    .ic[aria-pressed="true"] { background: #0176d3; border-color: #0176d3; color: #fff; }
    .ic[aria-pressed="true"]:hover { background: #014486; border-color: #014486; color: #fff; }
  `,
  html: `
    <div class="row">
      <button class="sl" type="button">Cancel</button>
      <button class="sl br" type="button">Save</button>
      <button class="sl st" type="button" aria-pressed="false" aria-live="assertive">
        <span class="stack">
          <span class="n"><svg viewBox="0 0 520 520"><path d="M300 290h165c8 0 15-7 15-15v-30c0-8-7-15-15-15H300c-6 0-10-4-10-10V55c0-8-7-15-15-15h-30c-8 0-15 7-15 15v165c0 6-4 10-10 10H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h165c6 0 10 4 10 10v165c0 8 7 15 15 15h30c8 0 15-7 15-15V300c0-6 4-10 10-10z"/></svg>Follow</span>
          <span class="y"><svg viewBox="0 0 520 520"><path d="M191 425 26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0 0 15 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"/></svg>Following</span>
          <span class="u"><svg viewBox="0 0 520 520"><path d="m310 254 130-131c6-6 6-15 0-21l-20-21c-6-6-15-6-21 0L268 212a10 10 0 0 1-14 0L123 80c-6-6-15-6-21 0l-21 21c-6 6-6 15 0 21l131 131c4 4 4 10 0 14L80 399c-6 6-6 15 0 21l21 21c6 6 15 6 21 0l131-131a10 10 0 0 1 14 0l131 131c6 6 15 6 21 0l21-21c6-6 6-15 0-21L310 268a10 10 0 0 1 0-14z"/></svg>Unfollow</span>
        </span>
      </button>
      <button class="sl ic" type="button" aria-pressed="false" aria-label="Settings"><svg viewBox="0 0 520 520"><path d="M261 191c-39 0-70 31-70 70s31 70 70 70 70-31 70-70-31-70-70-70zm210 133-37-31a195 195 0 0 0 0-68l37-31c12-10 16-28 8-42l-16-28a34 34 0 0 0-40-14l-46 17a168 168 0 0 0-59-34l-8-47c-3-16-17-25-33-25h-32c-16 0-30 9-33 25l-8 46a180 180 0 0 0-60 34l-46-17-11-2c-12 0-23 6-29 16l-16 28c-8 14-5 32 8 42l37 31a195 195 0 0 0 0 68l-37 31a34 34 0 0 0-8 42l16 28a34 34 0 0 0 40 14l46-17c18 16 38 27 59 34l8 48a33 33 0 0 0 33 27h32c16 0 30-12 33-28l8-48a170 170 0 0 0 62-37l43 17 12 2c12 0 23-6 29-16l15-26c9-11 5-29-7-39zm-210 47c-61 0-110-49-110-110s49-110 110-110 110 49 110 110-49 110-110 110z"/></svg></button>
    </div>`,
  init(root) {
    root.querySelectorAll('[aria-pressed]').forEach((b) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on);
      if (b.classList.contains('st')) b.classList.toggle('clicked', on);
    }));
    const st = root.querySelector('.st');
    st.addEventListener('pointerleave', () => st.classList.remove('clicked'));
    st.addEventListener('blur', () => st.classList.remove('clicked'));
  },
};
