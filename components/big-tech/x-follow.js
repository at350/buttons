// X profile "Follow" button. Follow / Following / Unfollow share one grid cell so the pill never changes width.
export default {
  id: 'bt-x-follow',
  credit: 'X / Twitter — "Follow" pill that becomes "Following" and turns red "Unfollow" on hover',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 8px; align-items: center; white-space: nowrap; }
    .xf {
      min-height: 36px; padding: 0 16px; border-radius: 9999px; border: 1px solid transparent; background: #0f1419; color: #fff; cursor: pointer;
      font: 700 15px/20px TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      transition: background-color .2s, border-color .2s, color .2s; -webkit-tap-highlight-color: transparent;
    }
    .xf:hover { background: #272c30; }
    .xf:active { background: #3f4448; }
    .xf:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1d9bf0; }
    .lbl { display: grid; }
    .lbl span { grid-area: 1 / 1; visibility: hidden; }
    .xf .a { visibility: visible; }
    .xf[aria-pressed="true"] { background: transparent; color: #0f1419; border-color: #cfd9de; }
    .xf[aria-pressed="true"] .a { visibility: hidden; }
    .xf[aria-pressed="true"] .b { visibility: visible; }
    .xf[aria-pressed="true"]:hover { background: rgba(244,33,46,.1); color: #f4212e; border-color: #fdc9ce; }
    .xf[aria-pressed="true"]:hover .b { visibility: hidden; }
    .xf[aria-pressed="true"]:hover .c { visibility: visible; }
    .more {
      width: 36px; height: 36px; padding: 0; border-radius: 9999px; border: 1px solid #cfd9de; background: transparent; color: #0f1419; cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center; transition: background-color .2s; -webkit-tap-highlight-color: transparent;
    }
    .more:hover { background: rgba(15,20,25,.1); }
    .more:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1d9bf0; }
    .more svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .more .on { display: none; }
    .more[aria-pressed="true"] { color: #1d9bf0; border-color: #8ecdf8; }
    .more[aria-pressed="true"] .off { display: none; }
    .more[aria-pressed="true"] .on { display: block; }
  `,
  html: `
    <div class="row">
      <button class="more" type="button" aria-pressed="false" aria-label="Turn on post notifications">
        <svg class="off" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M15 8h6"/><path d="M18 5v6"/><path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332"/></svg>
        <svg class="on" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M22 8c0-2.3-.8-4.3-2-6"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/></svg>
      </button>
      <button class="xf" type="button" aria-pressed="false">
        <span class="lbl"><span class="a">Follow</span><span class="b">Following</span><span class="c">Unfollow</span></span>
      </button>
    </div>`,
  init(root) {
    root.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      if (b.classList.contains('more')) b.setAttribute('aria-label', on ? 'Turn off post notifications' : 'Turn on post notifications');
    }));
  },
};
