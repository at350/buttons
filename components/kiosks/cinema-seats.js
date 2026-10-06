export default {
  id: 'ks-cinema-seats',
  credit: 'Cinema ticket kiosk seat map (AMC / Cineworld style) — curved screen, sold-out seats greyed, tap seats to pick and the total updates',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 16px; border-radius: 12px; background: #0e0f13; font-family: Inter, system-ui, sans-serif; color: #e8e8ea; }
    .screen { width: 240px; height: 18px; margin: 0 auto 4px; border-top: 3px solid #cfd6ff; border-radius: 50% 50% 0 0 / 100% 100% 0 0; box-shadow: 0 -6px 14px -6px rgba(160,180,255,.6); }
    .scap { text-align: center; font-size: 9px; letter-spacing: .3em; color: #8a8fa3; margin-bottom: 10px; }
    .map { display: grid; gap: 5px; }
    .r { display: grid; grid-template-columns: 12px repeat(2, 18px) 8px repeat(6, 18px) 8px repeat(2, 18px) 12px; gap: 4px; align-items: center; }
    .r i { font-style: normal; font-size: 9px; color: #6b7086; text-align: center; }
    .seat { width: 18px; height: 16px; border: 0; padding: 0; border-radius: 4px 4px 2px 2px; cursor: pointer; background: #3b82f6; box-shadow: inset 0 -3px 0 rgba(0,0,0,.3); transition: background .12s, transform .08s; -webkit-tap-highlight-color: transparent; }
    .seat:hover { background: #60a5fa; transform: translateY(-1px); }
    .seat:active { transform: scale(.9); }
    .seat:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
    .seat[aria-pressed="true"] { background: #f5c518; }
    .seat:disabled { background: #34363f; cursor: not-allowed; transform: none; box-shadow: inset 0 -3px 0 rgba(0,0,0,.3); }
    .key { display: flex; justify-content: center; gap: 12px; margin: 12px 0 10px; font-size: 10px; color: #a3a7b8; }
    .key span::before { content: ''; display: inline-block; width: 9px; height: 8px; margin-right: 4px; border-radius: 2px; vertical-align: -1px; }
    .key .a::before { background: #3b82f6; } .key .s::before { background: #f5c518; } .key .x::before { background: #34363f; }
    .ft { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
    .tot { font-size: 12px; color: #a3a7b8; white-space: nowrap; min-width: 120px; } .tot b { color: #fff; font-variant-numeric: tabular-nums; }
    .go { height: 34px; padding: 0 16px; border: 0; border-radius: 6px; background: #e50914; color: #fff; font: 700 13px/1 Inter, sans-serif; cursor: pointer; transition: opacity .15s, filter .1s; }
    .go:disabled { opacity: .35; cursor: default; }
    .go:not(:disabled):hover { filter: brightness(1.1); }
    .go:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="screen"></div><div class="scap">SCREEN</div>
      <div class="map"></div>
      <div class="key"><span class="a">Available</span><span class="s">Selected</span><span class="x">Sold</span></div>
      <div class="ft"><div class="tot">0 seats · <b>$0.00</b></div><button class="go" type="button" disabled>Continue</button></div>
    </div>`,
  init(root) {
    const map = root.querySelector('.map'), tot = root.querySelector('.tot'), go = root.querySelector('.go');
    const sold = new Set(['A3', 'A4', 'B5', 'B6', 'B7', 'C1', 'C2', 'D4', 'D5', 'D6', 'D7', 'E9', 'E10', 'A9']);
    let n = 0;
    const upd = () => { tot.innerHTML = `${n} seat${n === 1 ? '' : 's'} · <b>$${(n * 15.99).toFixed(2)}</b>`; go.disabled = !n; };
    'ABCDE'.split('').forEach((row) => {
      const r = document.createElement('div'); r.className = 'r';
      r.innerHTML = `<i>${row}</i>`;
      for (let s = 1; s <= 10; s++) {
        if (s === 3 || s === 9) r.appendChild(document.createElement('span'));
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'seat'; b.setAttribute('aria-label', row + s);
        if (sold.has(row + s)) b.disabled = true; else b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); n += on ? 1 : -1; upd(); });
        r.appendChild(b);
      }
      r.insertAdjacentHTML('beforeend', `<i>${row}</i>`);
      map.appendChild(r);
    });
    upd();
  },
};
