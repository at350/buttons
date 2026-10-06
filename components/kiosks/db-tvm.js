export default {
  id: 'ks-db-tvm',
  credit: 'Deutsche Bahn Fahrkartenautomat — red housing, white touch UI with the DB logo, fare tiles, traveller stepper and "Bezahlen" price',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 12px 12px; border-radius: 12px; background: linear-gradient(#ec0016, #b5000f); box-shadow: inset 0 1px 0 rgba(255,255,255,.3); }
    .scr { width: 284px; border-radius: 4px; overflow: hidden; background: #fff; box-shadow: 0 0 0 5px #282d37; font-family: 'DM Sans', Inter, system-ui, sans-serif; color: #282d37; }
    .hd { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-bottom: 1px solid #d7dce1; font-weight: 700; font-size: 14px; }
    .hd svg { width: 34px; height: 24px; fill: #ec0016; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 10px 10px 6px; }
    .t { min-height: 46px; border: 1px solid #afb4bb; border-radius: 4px; background: #f0f3f5; color: #282d37; font: 700 12px/1.2 'DM Sans', Inter, sans-serif; text-align: left; padding: 5px 9px; cursor: pointer; transition: background .1s, border-color .1s, transform .06s; -webkit-tap-highlight-color: transparent; }
    .t small { display: block; font-weight: 400; font-size: 10.5px; color: #646973; }
    .t:hover { background: #e2e6ea; }
    .t:active { transform: scale(.98); }
    .t:focus-visible { outline: 2px solid #ec0016; outline-offset: 1px; }
    .t[aria-checked="true"] { background: #fff; border: 2px solid #ec0016; padding: 4px 8px; }
    .pax { display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; font-size: 12px; }
    .st { display: flex; align-items: center; gap: 8px; }
    .st button { width: 28px; height: 28px; border-radius: 50%; border: 1px solid #afb4bb; background: #fff; color: #282d37; font: 600 16px/1 'DM Sans', sans-serif; cursor: pointer; }
    .st button:hover { border-color: #282d37; }
    .st button:focus-visible { outline: 2px solid #ec0016; outline-offset: 1px; }
    .st b { min-width: 14px; text-align: center; font-variant-numeric: tabular-nums; }
    .ft { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 10px 10px; border-top: 1px solid #d7dce1; }
    .pr { font-size: 11px; color: #646973; } .pr b { display: block; font-size: 19px; color: #282d37; font-variant-numeric: tabular-nums; }
    .pay { height: 38px; min-width: 112px; padding: 0 18px; border: 0; border-radius: 4px; background: #ec0016; color: #fff; font: 700 13px/1 'DM Sans', Inter, sans-serif; cursor: pointer; white-space: nowrap; transition: background .12s; }
    .pay:hover { background: #c50014; } .pay:active { transform: translateY(1px); }
    .pay:focus-visible { outline: 2px solid #282d37; outline-offset: 2px; }
    .pay.ok { background: #408335; }
  `,
  html: `
    <div class="stage"><div class="scr">
      <div class="hd">Fahrkarten<svg viewBox="0 3 24 18" aria-hidden="true"><path d="M21.6 3.6H2.4C1.08 3.6 0 4.68 0 6v12c0 1.32 1.08 2.4 2.4 2.4h19.2c1.32 0 2.4-1.08 2.4-2.424V6c0-1.32-1.08-2.4-2.4-2.4zm.648 14.376c.024.36-.264.672-.648.696H2.4c-.36 0-.648-.312-.648-.672V6a.667.667 0 0 1 .624-.696H21.6c.36 0 .648.312.648.672v12zM7.344 6.504H3.312v10.992h4.032c3.336-.024 4.416-2.376 4.416-5.544 0-3.672-1.560-5.448-4.416-5.448zm-.456 9.216h-.936V8.232h.528c2.376 0 2.616 1.728 2.616 3.936 0 2.424-.816 3.552-2.208 3.552zm11.832-3.984c1.128-.336 1.896-1.368 1.920-2.568 0-.24-.048-2.688-3.144-2.688h-4.584v10.992H16.8c1.032 0 4.248 0 4.248-3.096 0-.744-.336-2.208-2.328-2.640zm-2.352-3.528c1.176 0 1.656.408 1.656 1.320 0 .72-.528 1.320-1.440 1.320h-1.032v-2.640h.816zm.24 7.512h-1.080v-2.832h1.152c1.368 0 1.704.792 1.704 1.416 0 1.416-1.344 1.416-1.776 1.416z"/></svg></div>
      <div class="grid" role="radiogroup" aria-label="Fahrkarte">
        <button class="t" type="button" role="radio" aria-checked="true" data-p="3.80">Einzelfahrt<small>Kurzstrecke</small></button>
        <button class="t" type="button" role="radio" aria-checked="false" data-p="8.90">Einzelfahrt<small>Tarifgebiet AB</small></button>
        <button class="t" type="button" role="radio" aria-checked="false" data-p="17.80">Hin- und Rückfahrt<small>Tarifgebiet AB</small></button>
        <button class="t" type="button" role="radio" aria-checked="false" data-p="11.40">Tageskarte<small>Tarifgebiet AB</small></button>
      </div>
      <div class="pax"><span>Erwachsene</span><div class="st"><button type="button" aria-label="weniger" data-d="-1">−</button><b>1</b><button type="button" aria-label="mehr" data-d="1">+</button></div></div>
      <div class="ft"><div class="pr">Preis<b>3,80 €</b></div><button class="pay" type="button">Bezahlen</button></div>
    </div></div>`,
  init(root) {
    const tiles = [...root.querySelectorAll('.t')], pr = root.querySelector('.pr b'), cnt = root.querySelector('.st b'), pay = root.querySelector('.pay');
    let p = 3.8, n = 1;
    const upd = () => { pr.textContent = (p * n).toFixed(2).replace('.', ',') + ' €'; pay.classList.remove('ok'); pay.textContent = 'Bezahlen'; };
    tiles.forEach((t) => t.addEventListener('click', () => { tiles.forEach((x) => x.setAttribute('aria-checked', String(x === t))); p = +t.dataset.p; upd(); }));
    root.querySelectorAll('.st button').forEach((b) => b.addEventListener('click', () => { n = Math.max(1, Math.min(5, n + +b.dataset.d)); cnt.textContent = n; upd(); }));
    pay.addEventListener('click', () => { const ok = !pay.classList.contains('ok'); pay.classList.toggle('ok', ok); pay.textContent = ok ? 'Bezahlt ✓' : 'Bezahlen'; });
  },
};
