export default {
  id: 'ob-hackernews-vote',
  credit: 'Hacker News — the grey upvote triangle (vanishes once voted, "unvote" appears) and the Verdana 7pt points / flag / hide / comments row',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .hn { width: 300px; max-width: 100%; background: #f6f6ef; border-top: 3px solid #ff6600; padding: 8px 10px 10px; font: 10pt Verdana, Geneva, sans-serif; color: #828282; border-radius: 0 0 12px 12px; }
    .row { display: flex; align-items: flex-start; gap: 4px; }
    .rank { color: #828282; min-width: 18px; text-align: right; }
    .vote { width: 14px; height: 14px; padding: 0; border: 0; background: transparent; cursor: pointer; margin-top: 2px; position: relative; flex: none; }
    .vote::before { content: ""; position: absolute; left: 2px; top: 2px; border: 5px solid transparent; border-bottom: 8px solid #9a9a9a; border-top: 0; }
    .vote:hover::before { border-bottom-color: #ff6600; }
    .vote:focus-visible { outline: 1px dotted #000; }
    .vote.hid { visibility: hidden; }
    .title { color: #000; font-size: 10pt; }
    .host { color: #828282; font-size: 8pt; }
    .sub { font-size: 7pt; color: #828282; margin-top: 2px; padding-left: 40px; }
    .sub a { color: #828282; text-decoration: none; cursor: pointer; }
    .sub a:hover { text-decoration: underline; }
    .sub a:focus-visible { outline: 1px dotted #000; }
    .hn.hidden .row, .hn.hidden .sub .k { opacity: .3; }
  `,
  html: `
    <div class="hn">
      <div class="row">
        <span class="rank">1.</span>
        <button class="vote" type="button" aria-label="upvote"></button>
        <span><span class="title">Show HN: An endless page of buttons</span> <span class="host">(buttons.page)</span></span>
      </div>
      <div class="sub">
        <span class="k"><span class="pts">142</span> points by <span class="by">pg</span> 3 hours ago</span>
        <span class="unv"></span> | <a class="flag" href="#" role="button">flag</a> | <a class="hide" href="#" role="button">hide</a> | <a class="cmt" href="#" role="button">23 comments</a>
      </div>
    </div>`,
  init(root) {
    const hn = root.querySelector('.hn'), vote = root.querySelector('.vote'), pts = root.querySelector('.pts'), unv = root.querySelector('.unv'), flag = root.querySelector('.flag'), hide = root.querySelector('.hide'), cmt = root.querySelector('.cmt');
    let voted = false, flagged = false, hidden = false, n = 142, c = 23;
    const render = () => {
      vote.classList.toggle('hid', voted); pts.textContent = String(n);
      unv.innerHTML = voted ? ' | <a class="u" href="#" role="button">unvote</a>' : '';
      if (voted) unv.querySelector('.u').addEventListener('click', (e) => { e.preventDefault(); voted = false; n--; render(); });
      flag.textContent = flagged ? 'unflag' : 'flag';
      hide.textContent = hidden ? 'un-hide' : 'hide';
      hn.classList.toggle('hidden', hidden);
    };
    vote.addEventListener('click', () => { if (!voted) { voted = true; n++; render(); } });
    flag.addEventListener('click', (e) => { e.preventDefault(); flagged = !flagged; render(); });
    hide.addEventListener('click', (e) => { e.preventDefault(); hidden = !hidden; render(); });
    cmt.addEventListener('click', (e) => { e.preventDefault(); c++; cmt.textContent = `${c} comments`; });
    render();
  },
};
