const STAR = 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z';
const star = () => '<span class="s"><svg class="bg" viewBox="0 0 24 24"><path d="' + STAR + '"/></svg><svg class="fg" viewBox="0 0 24 24"><path d="' + STAR + '"/></svg></span>';

// Amazon star rating: #ffa41c stars with a #de7921 outline; the unfilled part of a star stays white inside the
// orange outline (so half stars read like Amazon's "4.5 out of 5"); the score sits in front in Amazon Ember 14px
// #0f1111 and the review count after it in link teal #007185. Hover previews in half-star steps, click commits.
export default {
  id: 'in-star-rating',
  credit: 'Amazon star rating — orange #ffa41c stars with #de7921 outline, half-star precision, score and teal ratings link',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .w { display: inline-flex; align-items: center; gap: 6px; padding: 4px; font: 400 14px/20px "Amazon Ember", Arial, sans-serif; color: #0f1111; white-space: nowrap; }
    .v { width: 22px; text-align: right; font-variant-numeric: tabular-nums; }
    .r { display: inline-flex; gap: 1px; cursor: pointer; outline: 0; border-radius: 4px; touch-action: none; }
    .r:focus-visible { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #007185; }
    .s { position: relative; width: 22px; height: 22px; }
    .s svg { position: absolute; inset: 0; width: 100%; height: 100%; stroke: #de7921; stroke-width: 1.4; stroke-linejoin: round; }
    .bg { fill: #fff; }
    .fg { fill: #ffa41c; clip-path: inset(0 100% 0 0); transition: clip-path .1s; }
    .s.half .fg { clip-path: inset(0 50% 0 0); }
    .s.full .fg { clip-path: inset(0 0 0 0); }
    .r.hover .fg { fill: #ffb84d; }
    .r:active .s { transform: scale(.94); }
    .n { color: #007185; }
    .w:hover .n { color: #c7511f; text-decoration: underline; }
  `,
  html: `<div class="w"><span class="v">3.5</span>
    <div class="r" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="5" aria-valuenow="3.5" aria-valuetext="3.5 out of 5 stars" aria-label="Rating">${star()}${star()}${star()}${star()}${star()}</div>
    <span class="n">2,184 ratings</span>
  </div>`,
  init(root) {
    const r = root.querySelector('.r'), stars = [...root.querySelectorAll('.s')], val = root.querySelector('.v');
    let v = 3.5;
    const paint = (x) => { val.textContent = x.toFixed(1); stars.forEach((s, i) => { s.classList.toggle('full', x >= i + 1); s.classList.toggle('half', x >= i + 0.5 && x < i + 1); }); };
    const fromEvent = (e) => {
      const i = stars.findIndex((s) => e.clientX < s.getBoundingClientRect().right);
      if (i < 0) return 5;
      const b = stars[i].getBoundingClientRect();
      return i + (e.clientX - b.left < b.width / 2 ? 0.5 : 1);
    };
    const commit = (n) => { v = n; r.setAttribute('aria-valuenow', v); r.setAttribute('aria-valuetext', v + ' out of 5 stars'); paint(v); };
    r.addEventListener('pointermove', (e) => { r.classList.add('hover'); paint(fromEvent(e)); });
    r.addEventListener('pointerleave', () => { r.classList.remove('hover'); paint(v); });
    r.addEventListener('click', (e) => commit(fromEvent(e)));
    r.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 0.5, ArrowUp: 0.5, ArrowLeft: -0.5, ArrowDown: -0.5 }[e.key];
      if (d) { e.preventDefault(); commit(Math.max(0.5, Math.min(5, v + d))); }
    });
    paint(v);
  },
};
