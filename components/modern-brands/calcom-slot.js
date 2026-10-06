export default {
  id: 'mb-calcom-slot',
  credit: 'Cal.com booking page — time-slot pills; picking one slides a black "Confirm" button in beside it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px; border-radius: 12px; background: #fff; border: 1px solid #e5e7eb; display: grid; gap: 8px; width: 200px; max-width: 100%;
      font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .row { display: flex; gap: 8px; height: 40px; }
    .slot { flex: 1; height: 40px; border-radius: 6px; border: 1px solid #d1d5db; background: #fff; color: #111827; cursor: pointer; font: inherit; letter-spacing: -.01em;
      transition: flex-basis .3s cubic-bezier(.2,.8,.2,1), border-color .15s, background .15s, color .15s, transform .12s; -webkit-tap-highlight-color: transparent; }
    .slot:hover { border-color: #111827; background: #f9fafb; }
    .slot:active { transform: scale(.98); }
    .slot:focus-visible, .ok:focus-visible { outline: 2px solid #111827; outline-offset: 2px; }
    .slot[aria-pressed="true"] { border-color: #111827; color: #111827; background: #f3f4f6; font-weight: 600; }
    .ok { width: 0; padding: 0; border: 0; border-radius: 6px; background: #111827; color: #fff; cursor: pointer; font: inherit; overflow: hidden; white-space: nowrap; opacity: 0;
      transition: width .3s cubic-bezier(.2,.8,.2,1), opacity .2s, background .15s, transform .12s; -webkit-tap-highlight-color: transparent; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
    .row.open .ok { width: 50%; opacity: 1; }
    .ok:hover { background: #000; }
    .ok:active { transform: scale(.98); }
    .ok svg { width: 14px; height: 14px; stroke: #fff; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; display: none; }
    .row.booked .slot { border-color: #16a34a; background: #f0fdf4; color: #15803d; }
    .row.booked .ok { background: #16a34a; }
    .row.booked .ok svg { display: block; animation: pop .35s linear(0, 0.5 15%, 1.2 40%, 0.95 65%, 1); }
    .row.booked .ok .t { display: none; }
    @keyframes pop { from { transform: scale(0); } }
  `,
  html: `
    <div class="stage">
      <div class="row"><button class="slot" type="button" aria-pressed="false">9:00am</button><button class="ok" type="button" tabindex="-1"><span class="t">Confirm</span><svg viewBox="0 0 16 16"><path d="M3 8.5 6.5 12 13 4.5"/></svg></button></div>
      <div class="row"><button class="slot" type="button" aria-pressed="false">9:30am</button><button class="ok" type="button" tabindex="-1"><span class="t">Confirm</span><svg viewBox="0 0 16 16"><path d="M3 8.5 6.5 12 13 4.5"/></svg></button></div>
      <div class="row"><button class="slot" type="button" aria-pressed="false">10:00am</button><button class="ok" type="button" tabindex="-1"><span class="t">Confirm</span><svg viewBox="0 0 16 16"><path d="M3 8.5 6.5 12 13 4.5"/></svg></button></div>
    </div>`,
  init(root) {
    const rows = [...root.querySelectorAll('.row')];
    const reset = () => rows.forEach((r) => { r.classList.remove('open', 'booked'); r.querySelector('.slot').setAttribute('aria-pressed', 'false'); r.querySelector('.ok').tabIndex = -1; });
    rows.forEach((r) => {
      const slot = r.querySelector('.slot'), ok = r.querySelector('.ok');
      slot.addEventListener('click', () => {
        const was = r.classList.contains('open');
        reset();
        if (!was) { r.classList.add('open'); slot.setAttribute('aria-pressed', 'true'); ok.tabIndex = 0; }
      });
      ok.addEventListener('click', () => { if (r.classList.contains('booked')) reset(); else r.classList.add('booked'); });
    });
  },
};
