export default {
  id: 'ob-piratebay-magnet',
  credit: 'The Pirate Bay — the little horseshoe magnet link beside a torrent row with green seeders / red leechers counts',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .tpb { width: 320px; max-width: 100%; background: #fff; border: 1px solid #ccc; border-radius: 12px; padding: 8px 10px; font: 11px/1.4 verdana, sans-serif; color: #000; }
    .hd { display: grid; grid-template-columns: 1fr 34px 34px; gap: 6px; background: #f6f6f6; border: 1px solid #ddd; padding: 3px 6px; font-weight: 700; }
    .row { display: grid; grid-template-columns: 1fr 34px 34px; gap: 6px; align-items: center; padding: 6px; border-bottom: 1px solid #eee; }
    .nm { color: #06c; font-weight: 700; text-decoration: none; cursor: pointer; }
    .nm:hover { text-decoration: underline; }
    .meta { color: #666; font-size: 10px; display: flex; align-items: center; gap: 6px; margin-top: 3px; }
    .se { color: #0a0; text-align: right; font-weight: 700; } .le { color: #c00; text-align: right; font-weight: 700; }
    .mag { width: 20px; height: 20px; padding: 0; border: 0; background: none; cursor: pointer; display: grid; place-items: center; position: relative; }
    .mag svg { width: 16px; height: 16px; }
    .mag:hover svg { transform: rotate(-20deg) scale(1.15); }
    .mag:focus-visible { outline: 1px dotted #000; }
    .mag.on .pole { fill: #0a0; }
    .mag .tip { position: absolute; left: 50%; top: -22px; transform: translate(-50%, 6px); background: #222; color: #fff; padding: 2px 6px; border-radius: 3px; font: 10px verdana, sans-serif; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }
    .mag.on .tip { opacity: 1; transform: translate(-50%, 0); }
    .trust { width: 14px; height: 14px; border-radius: 50%; background: #e3b3e3; border: 1px solid #a3a; display: inline-block; }
    .trust.vip { background: #8be38b; border-color: #0a0; }
    .trust:hover { filter: brightness(1.1); }
    .tbtn { padding: 0; border: 0; cursor: pointer; background: none; display: inline-flex; }
    .tbtn:focus-visible { outline: 1px dotted #000; }
  `,
  html: `
    <div class="tpb">
      <div class="hd"><span>Name</span><span class="se">SE</span><span class="le">LE</span></div>
      <div class="row">
        <div>
          <a class="nm" href="#">Buttons.Collection.2026.WEB.x265</a>
          <div class="meta">
            <button class="mag" type="button" aria-pressed="false" aria-label="magnet link"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 1h3v7a2 2 0 0 0 4 0V1h3v7a5 5 0 0 1-10 0z" fill="#c00" class="pole"/><path d="M3 1h3v3H3zM10 1h3v3h-3z" fill="#888"/></svg><span class="tip">Added</span></button>
            <span class="up">Uploaded 10-05 13:37, Size 420 KiB,</span>
            <button class="tbtn" type="button" aria-pressed="false" aria-label="trusted"><span class="trust"></span></button>
          </div>
        </div>
        <span class="se">1337</span><span class="le">42</span>
      </div>
    </div>`,
  init(root) {
    const mag = root.querySelector('.mag'), se = root.querySelector('.row .se'), le = root.querySelector('.row .le'), nm = root.querySelector('.nm'), tb = root.querySelector('.tbtn'), tr = root.querySelector('.trust');
    let s = 1337, l = 42;
    mag.addEventListener('click', () => {
      const on = mag.classList.toggle('on'); mag.setAttribute('aria-pressed', String(on));
      l += on ? 1 : -1; le.textContent = String(l);
    });
    nm.addEventListener('click', (e) => { e.preventDefault(); s++; se.textContent = String(s); });
    tb.addEventListener('click', () => { const vip = tr.classList.toggle('vip'); tb.setAttribute('aria-pressed', String(vip)); });
  },
};
