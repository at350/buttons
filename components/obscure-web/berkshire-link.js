export default {
  id: 'ob-berkshire-link',
  credit: 'BerkshireHathaway.com — the most valuable unstyled page on the web: Times New Roman, default blue links, visited purple, no CSS whatsoever',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pg { width: 300px; max-width: 100%; background: #fff; padding: 14px 16px; border-radius: 12px; font: 16px/1.25 "Times New Roman", Times, serif; color: #000; }
    hr { border: 0; border-top: 1px inset #999; margin: 8px 0; }
    .ttl { font-weight: 700; margin-bottom: 4px; }
    ul { margin: 0; padding-left: 22px; }
    li { margin: 2px 0; }
    a { color: #0000ee; text-decoration: underline; cursor: pointer; }
    a.v { color: #551a8b; }
    a:active { color: #f00; }
    a:focus-visible { outline: 1px dotted #000; }
    .legal { font-size: 11px; margin-top: 6px; }
    .legal b { color: #000; }
    .cp { font-size: 11px; color: #000; }
  `,
  html: `
    <div class="pg">
      <div class="ttl">BERKSHIRE HATHAWAY INC.</div>
      <hr>
      <ul>
        <li><a href="#">A Message From Warren E. Buffett</a></li>
        <li><a href="#">Annual &amp; Interim Reports</a></li>
        <li><a href="#">Berkshire Activewear</a></li>
        <li><a href="#">Special Letters from Warren &amp; Charlie RE:Past, Present and Future</a></li>
        <li><a href="#">Links to Berkshire Subsidiary Companies</a></li>
        <li><a href="#">Berkshire Hathaway Energy</a></li>
        <li><a href="#">Comparative Rights and Relative Prices of Class A and B Stock</a></li>
      </ul>
      <hr>
      <div class="legal"><a href="#">Legal Disclaimer</a></div>
      <div class="cp">Copyright © 1978-2026 Berkshire Hathaway Inc.</div>
    </div>`,
  init(root) {
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('v'); }));
  },
};
