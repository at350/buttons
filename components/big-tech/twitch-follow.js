export default {
  id: 'bt-twitch-follow',
  credit: 'Twitch — purple "Follow" heart button (heart fills, then becomes a plain unfollow heart)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 8px; padding: 12px 16px; border-radius: 12px; background: #0e0e10; }
    .tw {
      height: 30px; padding: 0 10px; border: 0; border-radius: 4px; background: #9147ff; color: #fff; cursor: pointer;
      font: 600 13px/30px Roobert, Inter, -apple-system, "Segoe UI", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 5px; transition: background .1s ease, color .1s; -webkit-tap-highlight-color: transparent;
    }
    .tw:hover { background: #772ce8; }
    .tw:active { background: #5c16c5; }
    .tw:focus-visible { outline: none; box-shadow: 0 0 0 2px #0e0e10, 0 0 0 4px #a970ff; }
    .tw svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; transition: transform .15s; }
    .tw:hover svg { transform: scale(1.1); }
    .tw[aria-pressed="true"] { background: #2f2f35; padding: 0 5px; }
    .tw[aria-pressed="true"]:hover { background: #3f3f46; }
    .tw[aria-pressed="true"] svg { fill: #bf94ff; stroke: #bf94ff; animation: beat .4s cubic-bezier(.34,1.56,.64,1); }
    .tw[aria-pressed="true"]:hover svg { fill: none; stroke: #fff; }
    .tw[aria-pressed="true"] .lbl { display: none; }
    @keyframes beat { 0% { transform: scale(.6); } 60% { transform: scale(1.3); } 100% { transform: scale(1); } }
    .sub { background: #9147ff; }
    .sub[aria-pressed="true"] { background: #2f2f35; padding: 0 10px; }
    .sub svg { fill: currentColor; stroke: none; width: 18px; height: 18px; }
    .sub .lbl::after { content: 'Subscribe'; }
    .sub[aria-pressed="true"] .lbl { display: inline; }
    .sub[aria-pressed="true"] .lbl::after { content: 'Subscribed'; }
    .sub[aria-pressed="true"] svg { fill: #bf94ff; stroke: none; }
  `,
  html: `
    <div class="stage">
      <button class="tw fol" type="button" aria-pressed="false" aria-label="Follow">
        <svg viewBox="0 0 20 20"><path d="M9.171 4.171A4 4 0 0 0 6.343 3H6a4 4 0 0 0-4 4v.343a4 4 0 0 0 1.172 2.829L10 17l6.828-6.828A4 4 0 0 0 18 7.343V7a4 4 0 0 0-4-4h-.343a4 4 0 0 0-2.829 1.172L10 5l-.829-.829z"/></svg>
        <span class="lbl">Follow</span>
      </button>
      <button class="tw sub" type="button" aria-pressed="false">
        <svg viewBox="0 0 20 20"><path d="M11.456 3.312a1.6 1.6 0 0 0-2.912 0L6.79 7.126l-4.17.606a1.6 1.6 0 0 0-.9 2.738l3.02 2.942-.713 4.154a1.6 1.6 0 0 0 2.355 1.683L10 17.284l3.618 1.965a1.6 1.6 0 0 0 2.355-1.683l-.713-4.154 3.02-2.942a1.6 1.6 0 0 0-.9-2.738l-4.17-.606-1.754-3.814z"/></svg>
        <span class="lbl"></span>
      </button>
    </div>`,
  init(root) {
    root.querySelectorAll('.tw').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
