export default {
  id: 'mb-calcom-slot',
  credit: 'Cal.com Booker — available-times column with the 12h/24h toggle; picking a slot outlines it and slides the dark "Confirm" button in beside it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 236px; max-width: 100%; padding: 16px; border-radius: 12px; background: #fff; border: 1px solid #e5e7eb; display: grid; gap: 8px;
      font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; color: #101010; }
    .hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; font-weight: 600; font-size: 14px; }
    .hd span small { color: #6b7280; font-weight: 500; margin-left: 4px; }
    .fmt { display: flex; padding: 2px; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; }
    .fmt button { height: 22px; padding: 0 7px; border: 0; border-radius: 6px; background: transparent; color: #6b7280; font: 500 12px/1 Inter, system-ui, sans-serif; cursor: pointer; transition: background .15s, color .15s; }
    .fmt button[aria-pressed="true"] { background: #f3f4f6; color: #101010; }
    .fmt button:focus-visible { outline: 2px solid #101010; outline-offset: 1px; }
    .row { display: flex; gap: 8px; height: 38px; }
    .slot { flex: 1 1 0; min-width: 0; height: 38px; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; color: #101010; cursor: pointer; font: inherit; font-variant-numeric: tabular-nums;
      box-shadow: 0 1px 2px rgba(16,24,40,.05); transition: border-color .15s, background .15s; -webkit-tap-highlight-color: transparent; }
    .slot:hover, .slot[aria-pressed="true"] { border-color: #101010; }
    .slot:focus-visible, .ok:focus-visible { outline: 2px solid #101010; outline-offset: 2px; }
    .ok { flex: 0 0 0; width: 0; min-width: 0; padding: 0; border: 0; border-radius: 8px; background: #292929; color: #fff; cursor: pointer; font: inherit; overflow: hidden; white-space: nowrap; opacity: 0;
      display: grid; place-items: center; transition: flex-basis .3s cubic-bezier(.2,.8,.2,1), opacity .2s, background .15s; -webkit-tap-highlight-color: transparent; }
    .ok > * { grid-area: 1 / 1; }
    .row.open .ok { flex-basis: calc(50% - 4px); opacity: 1; }
    .ok:hover { background: #101010; }
    .ok svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
    .ok .sp { animation: spin .7s linear infinite; }
    .row.busy .ok .t, .row.booked .ok .t { opacity: 0; }
    .row.busy .ok .sp { opacity: 1; }
    .row.booked .ok .ck { opacity: 1; animation: pop .35s cubic-bezier(.2,1.6,.4,1); }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pop { from { transform: scale(.3); } }
  `,
  html: `
    <div class="stage">
      <div class="hd"><span>Mon<small>06</small></span><span class="fmt" role="group" aria-label="Time format"><button type="button" aria-pressed="true" data-f="12">12h</button><button type="button" aria-pressed="false" data-f="24">24h</button></span></div>
      <div class="row"><button class="slot" type="button" aria-pressed="false" data-m="540"></button><button class="ok" type="button" tabindex="-1"><span class="t">Confirm</span><svg class="sp" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg><svg class="ck" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button></div>
      <div class="row"><button class="slot" type="button" aria-pressed="false" data-m="570"></button><button class="ok" type="button" tabindex="-1"><span class="t">Confirm</span><svg class="sp" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg><svg class="ck" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button></div>
      <div class="row"><button class="slot" type="button" aria-pressed="false" data-m="780"></button><button class="ok" type="button" tabindex="-1"><span class="t">Confirm</span><svg class="sp" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg><svg class="ck" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></button></div>
    </div>`,
  init(root) {
    const rows = [...root.querySelectorAll('.row')];
    const fmtBtns = [...root.querySelectorAll('.fmt button')];
    let h24 = false, t;
    const fmt = (m) => { const h = Math.floor(m / 60), mm = String(m % 60).padStart(2, '0'); return h24 ? `${String(h).padStart(2, '0')}:${mm}` : `${((h + 11) % 12) + 1}:${mm}${h < 12 ? 'am' : 'pm'}`; };
    const paint = () => rows.forEach((r) => { const s = r.querySelector('.slot'); s.textContent = fmt(+s.dataset.m); });
    const reset = () => { clearTimeout(t); rows.forEach((r) => { r.classList.remove('open', 'busy', 'booked'); r.querySelector('.slot').setAttribute('aria-pressed', 'false'); r.querySelector('.ok').tabIndex = -1; }); };
    fmtBtns.forEach((b) => b.addEventListener('click', () => { h24 = b.dataset.f === '24'; fmtBtns.forEach((x) => x.setAttribute('aria-pressed', String(x === b))); paint(); }));
    rows.forEach((r) => {
      const slot = r.querySelector('.slot'), ok = r.querySelector('.ok');
      slot.addEventListener('click', () => { const was = r.classList.contains('open'); reset(); if (!was) { r.classList.add('open'); slot.setAttribute('aria-pressed', 'true'); ok.tabIndex = 0; } });
      ok.addEventListener('click', () => {
        if (r.classList.contains('busy')) return;
        if (r.classList.contains('booked')) { reset(); return; }
        r.classList.add('busy'); t = setTimeout(() => { r.classList.remove('busy'); r.classList.add('booked'); }, 900);
      });
    });
    paint();
    return () => clearTimeout(t);
  },
};
