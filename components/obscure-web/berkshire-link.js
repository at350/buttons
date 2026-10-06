// Straight from berkshirehathaway.com's <body link="#800080" text="#000080" vlink="#ff0000">: purple links,
// navy text, RED visited links, Times, the <font size=6>B</font><font size=4>ERKSHIRE</font> small-caps
// header with the Farnam Street address, a default inset <hr>, bulleted links with size=1 "Updated" notes.
export default {
  id: 'ob-berkshire-link',
  credit: 'BerkshireHathaway.com — the famously unstyled home page: navy Times text, purple links that turn red once visited',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pg { width: 340px; max-width: 100%; background: #fff; padding: 12px 14px 10px; border-radius: 12px; font: 16px/1.15 "Times New Roman", Times, serif; color: #000080; }
    .hd { text-align: center; font-weight: 700; }
    .hd .b { font-size: 32px; } .hd .m { font-size: 18px; } .hd .s { font-size: 13px; }
    hr { border: 0; border-top: 1px solid #9a9a9a; border-bottom: 1px solid #eee; margin: 8px 0; }
    ul { margin: 0; padding-left: 40px; list-style: disc; }
    li { margin: 0 0 12px; }
    li:last-child { margin-bottom: 4px; }
    a { color: #800080; text-decoration: underline; cursor: pointer; }
    a.v, a:active { color: #ff0000; }
    a:focus-visible { outline: 1px dotted #000; }
    small { display: block; font-size: 10px; color: #000080; }
  `,
  html: `
    <div class="pg">
      <div class="hd"><span class="b">B</span><span class="m">ERKSHIRE </span><span class="b">H</span><span class="m">ATHAWAY </span><span class="s">INC.<br>3555 Farnam Street<br>Omaha, NE 68131</span><br>Official Home Page</div>
      <hr>
      <ul>
        <li><a href="#">A Message from Warren E. Buffett</a></li>
        <li><a href="#">Annual &amp; Interim Reports</a><small>Updated August 8, 2026</small></li>
        <li><a href="#">Warren Buffett's Letters to Berkshire Shareholders</a></li>
        <li><a href="#">Links to Berkshire Operating Companies</a></li>
      </ul>
    </div>`,
  init(root) {
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); a.classList.add('v'); }));
    // Escape "clears history" so the links go back to unvisited purple
    root.querySelector('.pg').addEventListener('keydown', (e) => { if (e.key === 'Escape') root.querySelectorAll('a.v').forEach((a) => a.classList.remove('v')); });
  },
};
