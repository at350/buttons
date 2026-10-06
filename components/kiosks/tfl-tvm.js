export default {
  id: 'ks-tfl-tvm',
  credit: 'London Underground ticket machine (TfL) — blue touch screen with roundel header, ticket tiles and the "To pay £" fare readout',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px; border-radius: 12px; background: linear-gradient(#c7cbd1, #9ba1a9); box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
    .scr { width: 288px; border-radius: 6px; overflow: hidden; background: #0019a8; box-shadow: 0 0 0 6px #15171b; font-family: Inter, system-ui, sans-serif; color: #fff; }
    .hd { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #000f6b; font-weight: 700; font-size: 13px; }
    .hd svg { width: 30px; height: 30px; flex: none; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; padding: 10px; }
    .t { height: 52px; border: 0; border-radius: 4px; background: #fff; color: #000f6b; font: 700 12.5px/1.2 Inter, system-ui, sans-serif; text-align: left; padding: 6px 10px; cursor: pointer;
      box-shadow: 0 2px 0 rgba(0,0,0,.35); transition: background .1s, transform .06s; -webkit-tap-highlight-color: transparent; }
    .t small { display: block; font-weight: 500; font-size: 10.5px; color: #4a5a8a; }
    .t:hover { background: #e6ecff; }
    .t:active { transform: translateY(1px); box-shadow: 0 1px 0 rgba(0,0,0,.35); }
    .t:focus-visible { outline: 3px solid #ffd329; outline-offset: 1px; }
    .t[aria-checked="true"] { background: #ffd329; color: #000; }
    .t[aria-checked="true"] small { color: #4d3f00; }
    .ft { display: flex; align-items: stretch; gap: 7px; padding: 0 10px 10px; }
    .fare { flex: 1; border-radius: 4px; background: #000; padding: 5px 10px; font: 600 10px/1.1 'IBM Plex Mono', ui-monospace, monospace; color: #9aa6d6; }
    .fare b { display: block; font-size: 22px; color: #ffb000; font-variant-numeric: tabular-nums; text-shadow: 0 0 6px rgba(255,176,0,.5); }
    .x { width: 76px; border: 0; border-radius: 4px; background: #dc241f; color: #fff; font: 700 13px/1 Inter, sans-serif; cursor: pointer; box-shadow: 0 2px 0 rgba(0,0,0,.35); }
    .x:hover { filter: brightness(1.1); } .x:active { transform: translateY(1px); }
    .x:focus-visible { outline: 3px solid #ffd329; outline-offset: 1px; }
  `,
  html: `
    <div class="stage"><div class="scr">
      <div class="hd"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.6" fill="none" stroke="#dc241f" stroke-width="3.4"/><rect x="1" y="10" width="22" height="4.2" fill="#0019a8" stroke="#fff" stroke-width=".6"/></svg>Select ticket</div>
      <div class="grid" role="radiogroup" aria-label="Ticket">
        <button class="t" type="button" role="radio" aria-checked="false" data-f="6.70">Single<small>Zone 1</small></button>
        <button class="t" type="button" role="radio" aria-checked="false" data-f="13.40">Return<small>Zone 1</small></button>
        <button class="t" type="button" role="radio" aria-checked="false" data-f="15.90">Day Travelcard<small>Zones 1-2 · Anytime</small></button>
        <button class="t" type="button" role="radio" aria-checked="false" data-f="top">Top up<small>Pay as you go</small></button>
      </div>
      <div class="ft"><div class="fare">To pay<b>£0.00</b></div><button class="x" type="button">Cancel</button></div>
    </div></div>`,
  init(root) {
    const tiles = [...root.querySelectorAll('.t')], fare = root.querySelector('.fare b');
    const tops = [5, 10, 20, 50]; let ti = -1;
    tiles.forEach((t) => t.addEventListener('click', () => {
      tiles.forEach((x) => x.setAttribute('aria-checked', String(x === t)));
      let f;
      if (t.dataset.f === 'top') { ti = (ti + 1) % tops.length; f = tops[ti]; t.querySelector('small').textContent = 'Pay as you go · £' + f; }
      else { f = +t.dataset.f; }
      fare.textContent = '£' + f.toFixed(2);
    }));
    root.querySelector('.x').addEventListener('click', () => { tiles.forEach((x) => x.setAttribute('aria-checked', 'false')); fare.textContent = '£0.00'; ti = -1; tiles[3].querySelector('small').textContent = 'Pay as you go'; });
  },
};
