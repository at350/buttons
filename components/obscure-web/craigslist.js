// Sampled from the live sfbay.craigslist.org front page: #eee left bar with the #800080 serif "craigslist"
// logo and peace sign, the white "post an ad" box in #009900 with a pen-square icon, the rounded #ccc
// "search craigslist" field, and a category column — #eee ban header in bold #0000ee, #0000ee links over
// 1px #ccc rules, visited links #551a8b.
export default {
  id: 'ob-craigslist',
  credit: 'Craigslist — the front page: purple peace-sign logo, green "post an ad", the #eee "community" ban and blue links that go purple once visited',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cl { display: flex; width: 360px; max-width: 100%; border-radius: 12px; overflow: hidden; background: #fff; font: 14px/1.35 Arial, Helvetica, sans-serif; color: #222; }
    .left { width: 156px; flex: none; background: #eee; padding: 10px 10px 14px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .logo { display: flex; align-items: center; gap: 5px; color: #800080; font: 26px/1 "Times New Roman", Times, serif; letter-spacing: -.5px; white-space: nowrap; }
    .logo svg { width: 26px; height: 26px; flex: none; }
    .post { display: inline-flex; align-items: center; gap: 4px; padding: 3px 7px; background: #fff; color: #009900; font: 18px/1.2 Arial, Helvetica, sans-serif; text-decoration: none; cursor: pointer; white-space: nowrap; }
    .post svg { width: 17px; height: 17px; flex: none; }
    .post:hover { text-decoration: underline; }
    .post.v { color: #551a8b; }
    .sch { position: relative; width: 100%; }
    .sch svg { position: absolute; left: 6px; top: 50%; width: 13px; height: 13px; margin-top: -6.5px; color: #757575; pointer-events: none; }
    .q { width: 100%; height: 29px; padding: 0 6px 0 23px; border: 1px solid #ccc; border-radius: 4px; background: #fff; font: 14px Arial, Helvetica, sans-serif; color: #222; outline: none; }
    .q::placeholder { color: #757575; }
    .q:focus { border-color: #0000ee; }
    .right { flex: 1; min-width: 0; padding: 10px 8px 10px; }
    .ban { display: flex; align-items: center; justify-content: center; gap: 6px; height: 34px; background: #eee; color: #0000ee; font: 700 16px/1 Arial, Helvetica, sans-serif; cursor: default; }
    .ban .em { font: 17px/1 "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif; }
    ul { list-style: none; margin: 4px 0 0; padding: 0; }
    li { border-bottom: 1px solid #ccc; }
    .lnk { display: block; padding: 2px 3px 1px; color: #0000ee; text-decoration: none; cursor: pointer; white-space: nowrap; }
    .lnk:hover { text-decoration: underline; }
    .lnk.v { color: #551a8b; }
    a:focus-visible { outline: 1px dotted #000; outline-offset: 1px; }
  `,
  html: `
    <div class="cl">
      <div class="left">
        <div class="logo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M12 3v18"/><path d="M12 12l6.3 6.3"/><path d="M12 12l-6.3 6.3"/></svg>craigslist</div>
        <a class="post" href="#" role="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>post an ad</a>
        <div class="sch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg><input class="q" type="text" placeholder="search craigslist" aria-label="search craigslist"></div>
      </div>
      <div class="right">
        <div class="ban"><span class="em" aria-hidden="true">🌈</span>community</div>
        <ul>
          <li><a class="lnk" href="#">activities</a></li>
          <li><a class="lnk" href="#">lost + found</a></li>
          <li><a class="lnk" href="#">missed connections</a></li>
          <li><a class="lnk" href="#">rants &amp; raves</a></li>
          <li><a class="lnk" href="#">volunteers</a></li>
        </ul>
      </div>
    </div>`,
  init(root) {
    const q = root.querySelector('.q');
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); a.classList.add('v'); }));
    q.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); q.select(); } if (e.key === 'Escape') q.value = ''; });
  },
};
