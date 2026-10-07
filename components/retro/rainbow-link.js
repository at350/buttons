const TEXT = 'Click HERE to enter!!!';
const CH = [...TEXT].map((c) => (c === ' ' ? '&nbsp;' : c));
// the cycler, pre-rendered: row k shows letter i in colour (i + k) % 7, which is what the staggered per-letter animation shows in step k
const ROWS = Array.from({ length: 7 }, (_, k) => `<b>${CH.map((c, i) => `<i class="c${(i + k) % 7}">${c}</i>`).join('')}</b>`).join('');
export default {
  id: 'rt-rainbow-link',
  credit: 'Late-90s homepage — per-letter rainbow-cycling link (the JavaScript colour-cycler) beside a default #0000ee / #551a8b link',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #ffffff; padding: 14px 18px; border-radius: 12px; display: inline-flex; gap: 18px; align-items: baseline;
      font: 16px "Times New Roman", Times, serif; }
    a { color: #0000ee; text-decoration: underline; cursor: pointer; }
    a.visited { color: #551a8b; }
    a:active { color: #ff0000; }
    a:focus-visible { outline: 1px dotted #000; }
    .rb { position: relative; font-weight: bold; font-size: 20px; white-space: nowrap; }
    /* at rest the in-flow letters stay transparent (layout, the link-colour underline and the accessible text) and the colours come from
       .cy: the 7 steps of the 1.4s cycle stacked 30px apart, scrolled one row per 0.2s by a steps(7) transform (compositor; animating
       color on 22 spans restyled every frame). Hover keeps the original per-letter cycler at .45s. */
    .rb > span:not(.cy) { color: transparent; }
    .rb:hover > span:not(.cy) { animation: cyc .45s steps(1) infinite; }
    .rb.visited > span:not(.cy) { animation: none; color: #551a8b; }
    @keyframes cyc { 0% { color: #ff0000; } 14% { color: #ff8000; } 28% { color: #ffff00; } 42% { color: #00ff00; } 57% { color: #00ffff; } 71% { color: #0000ff; } 85% { color: #ff00ff; } }
    .cy { position: absolute; left: -2px; right: -2px; top: -3px; height: 30px; overflow: hidden; pointer-events: none; user-select: none; }
    .cy > span { display: block; animation: rows 1.4s steps(7) infinite; }
    .cy b { display: block; height: 30px; padding: 3px 0 0 2px; }
    .cy i { font-style: normal; }
    .c0 { color: #ff0000; } .c1 { color: #ff8000; } .c2 { color: #ffff00; } .c3 { color: #00ff00; } .c4 { color: #00ffff; } .c5 { color: #0000ff; } .c6 { color: #ff00ff; }
    @keyframes rows { to { transform: translateY(-210px); } }
    .rb:hover .cy { visibility: hidden; }
    .rb.visited .cy { display: none; }
  `,
  html: `
    <div class="stage">
      <a href="#" class="rb">${CH.map((c, i) => `<span style="animation-delay:-${(i * 0.2).toFixed(1)}s">${c}</span>`).join('')}<span class="cy" aria-hidden="true"><span>${ROWS}</span></span></a>
      <a href="#" class="plain">guestbook</a>
    </div>`,
  init(root) {
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('visited'); }));
  },
};
