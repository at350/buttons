// From the 2010 thepiratebay.org stylesheet (pirate6.css) and markup: Verdana .7em, #D2B9A6 table head,
// #F6F1EE rows that go white on hover, bold #7B563A category cell, #009 detLink, #353535 detDesc line, and the
// original 9×11 dl.gif / 12×12 icon-magnet.gif / comment / VIP-skull GIFs redrawn pixel for pixel as SVG.
export default {
  id: 'ob-piratebay-magnet',
  credit: 'The Pirate Bay (c. 2010) — a search-result row with the pixel horseshoe magnet link, VIP skull and SE / LE counts',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pg { width: 360px; max-width: 100%; padding: 8px; background: #fff; border-radius: 12px; font: 11.2px/1.3 Verdana, Arial, Helvetica, sans-serif; color: #000; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th, td { padding: 3px; border: 1px solid #fff; vertical-align: middle; }
    th { background: #d2b9a6; font-weight: 700; }
    th.n, td.n { text-align: right; width: 40px; }
    tbody tr { background: #f6f1ee; }
    tbody tr:hover { background: #fff; }
    .vertTh { font-weight: 700; color: #7b563a; text-align: center; width: 62px; }
    a { color: #009; text-decoration: none; cursor: pointer; }
    a:hover { text-decoration: underline; }
    .detLink { font-weight: 700; font-size: 12px; }
    .icons { display: flex; align-items: center; gap: 0; margin-top: 2px; }
    .ib { display: inline-grid; place-items: center; padding: 1px 2px; border: 1px solid transparent; background: none; cursor: pointer; }
    .ib:hover { border-color: #d2b9a6; }
    .ib[aria-pressed="true"] { border-color: #7b563a; background: #fff; }
    .ib:focus-visible, a:focus-visible { outline: 1px dotted #000; }
    .ic { display: block; image-rendering: pixelated; }
    .dl { width: 9px; height: 11px; } .mg { width: 12px; height: 12px; } .cm, .vip { width: 11px; height: 11px; margin: 0 2px; }
    .detDesc { display: block; margin-top: 1px; color: #353535; font-size: 9.5px; }
    .detDesc a { color: #353535; }
    .num { font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="pg">
      <table>
        <thead><tr><th>Type</th><th>Name</th><th class="n">SE</th><th class="n">LE</th></tr></thead>
        <tbody><tr>
          <td class="vertTh"><a href="#">Other</a><br>(<a href="#">Other</a>)</td>
          <td>
            <a class="detLink" href="#">Buttons.2026.WEB-TPB</a>
            <div class="icons">
              <button class="ib dlb" type="button" aria-pressed="false" title="Download this torrent" aria-label="Download this torrent"><svg class="ic dl" viewBox="0 0 9 11" shape-rendering="crispEdges" aria-hidden="true"><path fill="#008e00" d="M0 0h9v1h-9zM0 1h1v1h-1zM8 1h1v1h-1zM1 2h1v1h-1zM7 2h1v1h-1zM2 3h1v1h-1zM6 3h1v1h-1zM3 4h1v1h-1zM5 4h1v1h-1zM0 5h9v1h-9zM0 6h1v1h-1zM8 6h1v1h-1zM1 7h1v1h-1zM7 7h1v1h-1zM2 8h1v1h-1zM6 8h1v1h-1zM3 9h1v1h-1zM5 9h1v1h-1zM4 10h1v1h-1z"/><path fill="#a0d5a0" d="M1 1h4v1h-4zM2 2h1v1h-1zM1 6h4v1h-4zM2 7h1v1h-1z"/><path fill="#99d299" d="M5 1h1v1h-1zM5 6h1v1h-1z"/><path fill="#8fce8f" d="M6 1h1v1h-1zM3 3h1v1h-1zM6 6h1v1h-1zM3 8h1v1h-1z"/><path fill="#83c883" d="M7 1h1v1h-1zM7 6h1v1h-1z"/><path fill="#7ac47a" d="M3 2h1v1h-1zM3 7h1v1h-1z"/><path fill="#69bd69" d="M4 2h1v1h-1zM4 7h1v1h-1z"/><path fill="#52b352" d="M5 2h1v1h-1zM5 7h1v1h-1z"/><path fill="#3aa83a" d="M6 2h1v1h-1zM6 7h1v1h-1z"/><path fill="#46ad46" d="M4 3h1v1h-1zM4 8h1v1h-1z"/><path fill="#2ea22e" d="M5 3h1v1h-1zM5 8h1v1h-1z"/><path fill="#71c071" d="M4 4h1v1h-1zM4 9h1v1h-1z"/></svg></button>
              <button class="ib mag" type="button" aria-pressed="false" title="Download this torrent using magnet" aria-label="Magnet link"><svg class="ic mg" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true"><path fill="#464646" d="M4 0h4v1h-4zM2 1h2v1h-2zM8 1h2v1h-2zM1 2h1v1h-1zM10 2h1v1h-1zM0 3h1v1h-1zM11 3h1v1h-1zM0 4h1v1h-1zM5 4h2v1h-2zM11 4h1v1h-1zM0 5h1v1h-1zM4 5h1v1h-1zM7 5h1v1h-1zM11 5h1v1h-1zM0 6h1v1h-1zM4 6h1v1h-1zM7 6h1v1h-1zM0 7h1v1h-1zM4 7h1v1h-1zM7 7h1v1h-1zM11 7h1v1h-1zM0 8h1v1h-1zM4 8h1v1h-1zM7 8h1v1h-1zM11 8h1v1h-1zM4 9h1v1h-1zM7 9h1v1h-1zM11 9h1v1h-1zM0 10h1v1h-1zM7 10h1v1h-1zM11 10h1v1h-1zM0 11h5v1h-5zM7 11h5v1h-5z"/><path fill="#891c0d" d="M4 1h1v1h-1zM2 2h1v1h-1zM1 3h1v1h-1zM1 4h1v1h-1zM7 4h1v1h-1zM1 6h1v1h-1zM8 6h1v1h-1zM1 7h1v1h-1z"/><path fill="#cd1500" d="M5 1h1v1h-1zM4 2h2v1h-2zM7 2h2v1h-2zM3 3h3v1h-3zM7 3h2v1h-2zM2 4h1v1h-1zM8 4h2v1h-2zM2 5h1v1h-1zM2 6h1v1h-1z"/><path fill="#cd1600" d="M6 1h1v1h-1zM3 2h1v1h-1zM2 3h1v1h-1zM9 5h1v1h-1zM2 7h1v1h-1z"/><path fill="#eb2e12" d="M7 1h1v1h-1zM9 2h1v1h-1zM10 3h1v1h-1zM4 4h1v1h-1zM10 4h1v1h-1zM3 5h1v1h-1zM3 6h1v1h-1zM10 6h1v1h-1zM10 7h1v1h-1z"/><path fill="#cc1500" d="M6 2h1v1h-1zM6 3h1v1h-1zM9 3h1v1h-1zM3 4h1v1h-1zM9 6h1v1h-1zM9 7h1v1h-1z"/><path fill="#8a1c0e" d="M1 5h1v1h-1zM8 5h1v1h-1zM8 7h1v1h-1z"/><path fill="#ec2f12" d="M10 5h1v1h-1zM3 7h1v1h-1z"/><path fill="#454545" d="M11 6h1v1h-1zM0 9h1v1h-1zM4 10h1v1h-1z"/><path fill="#b5b5b5" d="M1 8h1v1h-1zM8 8h1v1h-1z"/><path fill="#e3e3e3" d="M2 8h1v1h-1zM10 8h1v1h-1zM2 10h1v1h-1z"/><path fill="#e4e4e4" d="M3 8h1v1h-1zM9 8h1v1h-1zM2 9h1v1h-1zM3 10h1v1h-1zM9 10h2v1h-2z"/><path fill="#b6b6b6" d="M1 9h1v1h-1zM8 9h1v1h-1zM1 10h1v1h-1zM8 10h1v1h-1z"/><path fill="#e6e6e6" d="M3 9h1v1h-1z"/><path fill="#e5e5e5" d="M9 9h2v1h-2z"/></svg></button>
              <svg class="ic cm" viewBox="0 0 11 11" shape-rendering="crispEdges" aria-label="This torrent has 3 comments." role="img"><path fill="#363636" d="M2 0h7v1h-7zM1 1h1v1h-1zM9 1h1v1h-1zM0 2h1v1h-1zM10 2h1v1h-1zM0 3h1v1h-1zM10 3h1v1h-1zM0 4h1v1h-1zM10 4h1v1h-1zM0 5h1v1h-1zM10 5h1v1h-1zM1 6h1v1h-1zM9 6h1v1h-1zM2 7h3v1h-3zM8 7h1v1h-1zM5 8h1v1h-1zM8 8h1v1h-1zM6 9h1v1h-1zM8 9h1v1h-1zM7 10h2v1h-2z"/><path fill="#f9e38a" d="M2 1h1v1h-1zM1 2h1v1h-1zM1 3h1v1h-1zM1 4h1v1h-1zM1 5h1v1h-1zM2 6h2v1h-2zM5 7h1v1h-1zM6 8h1v1h-1zM7 9h1v1h-1z"/><path fill="#ffcc00" d="M3 1h6v1h-6zM2 2h8v1h-8zM2 3h8v1h-8zM2 4h8v1h-8zM2 5h8v1h-8zM4 6h5v1h-5zM6 7h2v1h-2zM7 8h1v1h-1z"/></svg>
              <a href="#" class="vipl" title="VIP"><svg class="ic vip" viewBox="0 0 11 11" shape-rendering="crispEdges" aria-label="VIP" role="img"><path fill="#04ec04" d="M3 0h5v1h-5zM2 1h7v1h-7zM2 2h1v1h-1zM4 2h3v1h-3zM8 2h1v1h-1zM2 3h3v1h-3zM6 3h3v1h-3zM2 4h7v1h-7zM3 5h1v1h-1zM5 5h1v1h-1zM7 5h1v1h-1zM0 6h2v1h-2zM3 6h5v1h-5zM9 6h2v1h-2zM0 7h3v1h-3zM8 7h3v1h-3zM3 8h5v1h-5zM1 9h2v1h-2zM8 9h2v1h-2zM1 10h2v1h-2zM8 10h2v1h-2z"/></svg></a>
            </div>
            <span class="detDesc">Uploaded Today&nbsp;13:37, Size 420&nbsp;KiB, ULed by <a href="#">anonymous</a></span>
          </td>
          <td class="n num se">1337</td><td class="n num le">42</td>
        </tr></tbody>
      </table>
    </div>`,
  init(root) {
    const mag = root.querySelector('.mag'), dlb = root.querySelector('.dlb'), se = root.querySelector('.se'), le = root.querySelector('.le');
    let s = 1337, l = 42;
    const tog = (b, bump) => b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); bump(on ? 1 : -1); });
    tog(mag, (d) => { l += d; le.textContent = String(l); });
    tog(dlb, (d) => { s += d; se.textContent = String(s); });
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
  },
};
