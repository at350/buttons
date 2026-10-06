// YouTube like / dislike segmented pill. Thumbs swap outline → filled (Material Symbols, YouTube's icon family);
// the count sits in a tabular-figure slot so liking never changes the width.
const UP = 'M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z';
const UPF = 'M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z';
const DN = 'M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z';
const DNF = 'M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z';
export default {
  id: 'bt-youtube-like',
  credit: 'YouTube — like / dislike segmented pill with count (thumbs fill when selected)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .seg { display: inline-flex; height: 36px; border-radius: 18px; background: rgba(0,0,0,.05); font: 500 14px/36px "Roboto Flex", Roboto, Arial, sans-serif; color: #0f0f0f; white-space: nowrap; }
    .yt {
      position: relative; height: 36px; border: 0; background: transparent; color: inherit; cursor: pointer; font: inherit;
      display: inline-flex; align-items: center; gap: 6px; transition: background-color .1s cubic-bezier(.05,0,0,1); -webkit-tap-highlight-color: transparent;
    }
    .like { padding: 0 16px 0 12px; border-radius: 18px 0 0 18px; }
    .like::after { content: ''; position: absolute; right: 0; top: 6px; bottom: 6px; width: 1px; background: rgba(0,0,0,.1); }
    .dis { padding: 0 16px 0 12px; border-radius: 0 18px 18px 0; }
    .yt:hover { background: rgba(0,0,0,.1); }
    .yt:active { background: rgba(0,0,0,.2); }
    .yt:focus-visible { outline: none; box-shadow: inset 0 0 0 2px #065fd4; }
    .ic { display: grid; width: 24px; height: 24px; }
    .ic svg { grid-area: 1 / 1; width: 24px; height: 24px; fill: currentColor; }
    .ic .f { visibility: hidden; }
    .yt[aria-pressed="true"] .ic .o { visibility: hidden; }
    .yt[aria-pressed="true"] .ic .f { visibility: visible; }
    .like[aria-pressed="true"] .ic { animation: thumb .5s cubic-bezier(.2,0,0,1); transform-origin: 30% 80%; }
    @keyframes thumb { 0% { transform: rotate(0) scale(1); } 35% { transform: rotate(-18deg) scale(1.2); } 100% { transform: none; } }
    .n { display: inline-block; min-width: 3.4ch; font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="seg">
      <button class="yt like" type="button" aria-pressed="false" aria-label="like this video along with 12,004 other people">
        <span class="ic" aria-hidden="true"><svg class="o" viewBox="0 -960 960 960"><path d="${UP}"/></svg><svg class="f" viewBox="0 -960 960 960"><path d="${UPF}"/></svg></span>
        <span class="n">12K</span>
      </button>
      <button class="yt dis" type="button" aria-pressed="false" aria-label="Dislike this video">
        <span class="ic" aria-hidden="true"><svg class="o" viewBox="0 -960 960 960"><path d="${DN}"/></svg><svg class="f" viewBox="0 -960 960 960"><path d="${DNF}"/></svg></span>
      </button>
    </div>`,
  init(root) {
    const like = root.querySelector('.like');
    const dis = root.querySelector('.dis');
    // YouTube abbreviates the count, so one like does not change the visible "12K".
    like.addEventListener('click', () => { const on = like.getAttribute('aria-pressed') !== 'true'; like.setAttribute('aria-pressed', String(on)); if (on) dis.setAttribute('aria-pressed', 'false'); });
    dis.addEventListener('click', () => { const on = dis.getAttribute('aria-pressed') !== 'true'; dis.setAttribute('aria-pressed', String(on)); if (on) like.setAttribute('aria-pressed', 'false'); });
  },
};
