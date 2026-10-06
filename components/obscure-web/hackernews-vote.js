// From news.ycombinator.com/news.css: #ff6600 header with the real y18.svg logo (18px, 1px white border),
// #f6f6ef body, Verdana 10pt, title links #000 (visited #828282), 8pt sitebit, 7pt #828282 subline,
// the 10×10 #999 triangle.svg vote arrow that turns `nosee` once voted while "unvote" appears in the subline.
export default {
  id: 'ob-hackernews-vote',
  credit: 'Hacker News — the #999 vote triangle (vanishes once voted, "unvote" appears) and the Verdana 7pt points | hide | comments subline',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .hn { width: 360px; max-width: 100%; background: #f6f6ef; font: 10pt Verdana, Geneva, sans-serif; color: #828282; padding-bottom: 10px; }
    .top { display: flex; align-items: center; gap: 4px; padding: 2px; background: #ff6600; line-height: 12px; white-space: nowrap; overflow: hidden; }
    .y { width: 20px; height: 20px; border: 1px solid #fff; flex: none; display: block; }
    .pagetop { font-size: 10pt; color: #222; }
    .pagetop b { color: #000; margin: 0 5px 0 1px; }
    table { border-collapse: collapse; margin-top: 10px; }
    td { padding: 0; vertical-align: top; }
    .rank { text-align: right; color: #828282; padding-left: 4px; }
    .votelinks { width: 14px; }
    .vote { display: block; width: 10px; height: 10px; margin: 3px 2px 6px; padding: 0; border: 0; cursor: pointer; background: none; }
    .vote svg { display: block; width: 10px; height: 10px; }
    .vote:focus-visible { outline: 1px dotted #000; outline-offset: 1px; }
    .vote.nosee { visibility: hidden; pointer-events: none; }
    .titleline a { color: #000; text-decoration: none; cursor: pointer; }
    .titleline a.v { color: #828282; }
    .sitebit { font-size: 8pt; color: #828282; }
    .subtext { font-size: 7pt; color: #828282; white-space: nowrap; padding-right: 6px; }
    .subtext a { color: #828282; text-decoration: none; cursor: pointer; }
    .subtext a:hover { text-decoration: underline; }
    a:focus-visible { outline: 1px dotted #000; }
    .unv[hidden] { display: none; }
  `,
  html: `
    <div class="hn">
      <div class="top"><svg class="y" viewBox="4 4 188 188" aria-hidden="true"><path d="m4 4h188v188h-188z" fill="#f60"/><path d="m73.2521756 45.01 22.7478244 47.39130083 22.7478244-47.39130083h19.56569631l-34.32352071 64.48661468v41.49338532h-15.98v-41.49338532l-34.32352071-64.48661468z" fill="#fff"/></svg><span class="pagetop"><b>Hacker News</b>new | past | comments | ask</span></div>
      <table>
        <tr><td class="rank">1.</td><td class="votelinks"><button class="vote" type="button" aria-label="upvote" title="upvote"><svg viewBox="0 -8 32 32" aria-hidden="true"><path d="m2 27 14-29 14 29z" fill="#999"/></svg></button></td>
          <td class="title"><span class="titleline"><a href="#" class="tl">Show HN: An endless page of buttons</a><span class="sitebit"> (buttons.page)</span></span></td></tr>
        <tr><td colspan="2"></td><td class="subtext"><span class="score">142 points</span> by <a href="#">pg</a> <a href="#">3 hours ago</a> <span class="unv" hidden>| <a href="#" class="u">unvote</a> </span>| <a href="#" class="hide">hide</a> | <a href="#" class="cmt">23&nbsp;comments</a></td></tr>
      </table>
    </div>`,
  init(root) {
    const vote = root.querySelector('.vote'), score = root.querySelector('.score'), unv = root.querySelector('.unv'), u = root.querySelector('.u');
    const hide = root.querySelector('.hide'), tl = root.querySelector('.tl'), table = root.querySelector('table');
    let n = 142, voted = false, hidden = false;
    const render = () => {
      vote.classList.toggle('nosee', voted); unv.hidden = !voted;
      score.textContent = `${n} point${n === 1 ? '' : 's'}`;
      hide.textContent = hidden ? 'un-hide' : 'hide';
      table.style.opacity = hidden ? '.35' : '';
    };
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    vote.addEventListener('click', () => { if (!voted) { voted = true; n++; render(); u.focus(); } });
    u.addEventListener('click', () => { voted = false; n--; render(); vote.focus(); });
    hide.addEventListener('click', () => { hidden = !hidden; render(); });
    tl.addEventListener('click', () => tl.classList.add('v'));
    render();
  },
};
