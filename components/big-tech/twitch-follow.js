// Twitch channel buttons (dark theme). Follow collapses to a heart-only secondary button once followed (it only
// shrinks); Subscribe / Subscribed share one grid cell so that button keeps the wider width.
const HEART = 'M9.171 4.171A4 4 0 0 0 6.343 3H6a4 4 0 0 0-4 4v.343a4 4 0 0 0 1.172 2.829L10 17l6.828-6.828A4 4 0 0 0 18 7.343V7a4 4 0 0 0-4-4h-.343a4 4 0 0 0-2.829 1.172L10 5l-.829-.829z';
const STAR = 'M11.456 3.312a1.6 1.6 0 0 0-2.912 0L6.79 7.126l-4.17.606a1.6 1.6 0 0 0-.9 2.738l3.02 2.942-.713 4.154a1.6 1.6 0 0 0 2.355 1.683L10 17.284l3.618 1.965a1.6 1.6 0 0 0 2.355-1.683l-.713-4.154 3.02-2.942a1.6 1.6 0 0 0-.9-2.738l-4.17-.606-1.754-3.814z';
export default {
  id: 'bt-twitch-follow',
  credit: 'Twitch — purple "Follow" heart button and "Subscribe" star button (dark theme)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-grid; padding: 12px 16px; border-radius: 12px; background: #0e0e10; white-space: nowrap; }
    .row { grid-area: 1 / 1; display: flex; gap: 8px; }
    .sizer { visibility: hidden; pointer-events: none; }
    .tw {
      height: 30px; padding: 0 10px; border: 0; border-radius: 4px; color: #fff; cursor: pointer;
      font: 600 13px/30px Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
      display: inline-flex; align-items: center; gap: 5px; transition: background-color .1s ease; -webkit-tap-highlight-color: transparent;
    }
    .tw:focus-visible { outline: none; box-shadow: 0 0 0 2px #0e0e10, 0 0 0 4px #a970ff; }
    .tw svg { width: 20px; height: 20px; display: block; flex: none; transition: transform .15s ease; }
    .fol { background: #9147ff; }
    .fol:hover { background: #772ce8; }
    .fol:active { background: #5c16c5; }
    .fol svg path { fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; }
    .fol:hover svg { transform: scale(1.1); }
    .fol[aria-pressed="true"] { background: rgba(83,83,95,.38); padding: 0 5px; }
    .fol[aria-pressed="true"]:hover { background: rgba(83,83,95,.48); }
    .fol[aria-pressed="true"] svg path { fill: currentColor; }
    .fol[aria-pressed="true"] svg { animation: beat .4s cubic-bezier(.34,1.56,.64,1); }
    .fol[aria-pressed="true"]:hover svg path { fill: none; }
    .fol[aria-pressed="true"] .lbl { display: none; }
    @keyframes beat { 0% { transform: scale(.6); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
    .sub { background: rgba(83,83,95,.38); }
    .sub:hover { background: rgba(83,83,95,.48); }
    .sub:active { background: rgba(83,83,95,.55); }
    .sub svg path { fill: currentColor; }
    .sub[aria-pressed="true"] svg path { fill: #bf94ff; }
    .stk { display: grid; }
    .stk span { grid-area: 1 / 1; }
    .stk .b { visibility: hidden; }
    .sub[aria-pressed="true"] .a { visibility: hidden; }
    .sub[aria-pressed="true"] .b { visibility: visible; }
  `,
  html: `
    <div class="stage">
      <div class="row sizer" aria-hidden="true"><span class="tw fol"><svg viewBox="0 0 20 20"><path d="${HEART}"/></svg><span class="lbl">Follow</span></span><span class="tw sub"><svg viewBox="0 0 20 20"><path d="${STAR}"/></svg><span>Subscribed</span></span></div>
      <div class="row">
      <button class="tw fol" type="button" aria-pressed="false" aria-label="Follow">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="${HEART}"/></svg>
        <span class="lbl">Follow</span>
      </button>
      <button class="tw sub" type="button" aria-pressed="false">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="${STAR}"/></svg>
        <span class="stk"><span class="a">Subscribe</span><span class="b">Subscribed</span></span>
      </button>
      </div>
    </div>`,
  init(root) {
    const fol = root.querySelector('button.fol');
    fol.addEventListener('click', () => {
      const on = fol.getAttribute('aria-pressed') !== 'true';
      fol.setAttribute('aria-pressed', String(on));
      fol.setAttribute('aria-label', on ? 'Unfollow' : 'Follow');
    });
    const sub = root.querySelector('button.sub');
    sub.addEventListener('click', () => sub.setAttribute('aria-pressed', String(sub.getAttribute('aria-pressed') !== 'true')));
  },
};
