// From a 2006 capture of myspace.com/tom: the "Contacting Tom" box (2px #6699cc frame, #6699cc header with
// bold white Verdana, eight #0000ff Verdana links with their grey-figure / orange-accent icons) and the
// #ffcc99 / #ff6600 "Tom's Friend Space" header with the #cc0000 friend count and his Top 8 photos.
export default {
  id: 'ob-myspace-add-friend',
  credit: 'MySpace (2006) — Tom\'s "Contacting Tom" box: blue #6699cc frame, grey-figure icons, and "Add to Friends" that bumps his friend count',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pr .tn { font: 700 16px/1 Verdana, Arial, sans-serif; margin: 0 0 6px; }
    .pr .pb { display: flex; gap: 10px; margin-bottom: 10px; }
    .pr .ph { width: 84px; height: 84px; flex: none; object-fit: cover; display: block; }
    .pr .inf { font: 10px/1.35 Verdana, Arial, sans-serif; color: #000; }
    .pr .inf q { display: block; margin-bottom: 8px; font-style: italic; }
    .pg { width: 320px; max-width: 100%; padding: 10px; background: #fff; border-radius: 12px; font: 10px/1.3 Verdana, Arial, Helvetica, sans-serif; color: #000; }
    .box { border: 2px solid #6699cc; }
    .hd { background: #6699cc; color: #fff; font: 700 11px/1 Verdana, Arial, sans-serif; padding: 3px 8px 4px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 8px; padding: 9px 8px 8px 12px; }
    .lk { display: flex; align-items: center; gap: 4px; color: #0000ff; text-decoration: none; cursor: pointer; white-space: nowrap; min-height: 22px; }
    .lk:hover { text-decoration: underline; }
    .lk:focus-visible { outline: 1px dotted #000; }
    .lk svg { width: 22px; height: 20px; flex: none; }
    .st { display: grid; } .st span { grid-area: 1 / 1; } .st .on { visibility: hidden; }
    .lk[aria-pressed="true"] .st .off { visibility: hidden; } .lk[aria-pressed="true"] .st .on { visibility: visible; }
    .lk[aria-pressed="true"] { color: #660099; }
    .fs { margin-top: 10px; background: #ffcc99; color: #ff6600; font: 700 11px/1 Verdana, Arial, sans-serif; padding: 3px 6px 4px; }
    .cnt { padding: 6px 4px 0; font: 700 10px Verdana, Arial, sans-serif; }
    .top8 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px 6px; padding: 8px 4px 0; text-align: center; }
    .top8 a { display: flex; flex-direction: column; align-items: center; gap: 3px; color: #0000ff; text-decoration: none; font: 10px/1.2 Verdana, Arial, sans-serif; white-space: nowrap; }
    .top8 a:hover { text-decoration: underline; }
    .top8 a:focus-visible { outline: 1px dotted #000; }
    .top8 img { width: 60px; height: 60px; object-fit: cover; display: block; border: 1px solid #c9c9c9; }
    .cnt b { color: #cc0000; font: 400 13px Verdana, Arial, sans-serif; font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="pg">
      <div class="pr">
        <div class="tn">Tom</div>
        <div class="pb"><img class="ph" src="assets/portraits/men-14.jpg" alt="" width="84" height="84"><div class="inf"><q>Thanks for joining MySpace!</q>Male<br>31 years old<br>Santa Monica, CALIFORNIA<br>United States</div></div>
      </div>
      <div class="box">
        <div class="hd">Contacting Tom</div>
        <div class="grid">
          <a class="lk" href="#" role="button"><svg viewBox="0 0 22 20" aria-hidden="true"><rect x="2" y="6" width="13" height="9" fill="#e8e8e8" stroke="#7a7a7a"/><path d="M2 6l6.5 5L15 6" fill="none" stroke="#7a7a7a"/><path d="M17 6h3M17 9h4M17 12h3" stroke="#ff6600" stroke-width="1.4"/></svg>Send Message</a>
          <a class="lk" href="#" role="button"><svg viewBox="0 0 22 20" aria-hidden="true"><path d="M2 9l9-5 6 6-9 6z" fill="#d6d6d6" stroke="#7a7a7a"/><path d="M2 9l7 2 2 5" fill="none" stroke="#7a7a7a"/><path d="M15 5h4l-1.5-2.5M19 5l-1.5 2.5" fill="none" stroke="#ff6600" stroke-width="1.6"/></svg>Forward to Friend</a>
          <a class="lk add" href="#" role="button" aria-pressed="false"><svg viewBox="0 0 22 20" aria-hidden="true"><circle cx="8" cy="5" r="3" fill="#a8a8a8"/><path d="M3 18v-5a5 5 0 0 1 10 0v5z" fill="#a8a8a8"/><circle cx="14" cy="5.5" r="2.6" fill="#8a8a8a"/><path d="M10 18v-4.5a4 4 0 0 1 8 0V18z" fill="#8a8a8a"/><path d="M2 16h5M4.5 13.5v5" stroke="#ff6600" stroke-width="1.8"/></svg><span class="st"><span class="off">Add to Friends</span><span class="on">Request Sent!</span></span></a>
          <a class="lk fav" href="#" role="button" aria-pressed="false"><svg viewBox="0 0 22 20" aria-hidden="true"><path d="M2 6h6l1.5 2H17v9H2z" fill="#c9c9c9" stroke="#7a7a7a"/><path d="M8 11l3 3 7-8" fill="none" stroke="#ff6600" stroke-width="2.2"/></svg><span class="st"><span class="off">Add to Favorites</span><span class="on">In Favorites</span></span></a>
          <a class="lk" href="#" role="button"><svg viewBox="0 0 22 20" aria-hidden="true"><circle cx="5.5" cy="4" r="2.6" fill="#a8a8a8"/><rect x="2.5" y="7.5" width="6" height="11" rx="2" fill="#a8a8a8"/><circle cx="14.5" cy="4" r="2.6" fill="#a8a8a8"/><rect x="11.5" y="7.5" width="6" height="11" rx="2" fill="#a8a8a8"/></svg>Instant Message</a>
          <a class="lk blk" href="#" role="button" aria-pressed="false"><svg viewBox="0 0 22 20" aria-hidden="true"><circle cx="12" cy="4" r="2.8" fill="#a8a8a8"/><rect x="8.5" y="7.5" width="7" height="11" rx="2" fill="#a8a8a8"/><path d="M5 9l6 6M11 9l-6 6" stroke="#ff6600" stroke-width="2.4"/></svg><span class="st"><span class="off">Block User</span><span class="on">Unblock User</span></span></a>
        </div>
      </div>
      <div class="fs">Tom's Friend Space</div>
      <div class="cnt">Tom has <b class="n">74259343</b> Friends.</div>
      <div class="top8"><a href="#">Jessica<img src="assets/portraits/women-03.jpg" alt="" width="60" height="60"></a><a href="#">Dave<img src="assets/portraits/men-07.jpg" alt="" width="60" height="60"></a><a href="#">Amber<img src="assets/portraits/women-14.jpg" alt="" width="60" height="60"></a><a href="#">Kevin<img src="assets/portraits/men-33.jpg" alt="" width="60" height="60"></a><a href="#">Brittany<img src="assets/portraits/women-25.jpg" alt="" width="60" height="60"></a><a href="#">Chris<img src="assets/portraits/men-12.jpg" alt="" width="60" height="60"></a><a href="#">Ashley<img src="assets/portraits/women-31.jpg" alt="" width="60" height="60"></a><a href="#">Mike<img src="assets/portraits/men-18.jpg" alt="" width="60" height="60"></a></div>
    </div>`,
  init(root) {
    const n = root.querySelector('.n');
    let friends = 74259343;
    root.querySelectorAll('.top8 a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    root.querySelectorAll('.lk').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      if (!a.hasAttribute('aria-pressed')) { a.style.color = '#660099'; return; }
      const on = a.getAttribute('aria-pressed') !== 'true';
      a.setAttribute('aria-pressed', String(on));
      if (a.classList.contains('add')) { friends += on ? 1 : -1; n.textContent = String(friends); }
    }));
  },
};
