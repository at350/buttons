export default {
  id: 'mo-flip-checklist',
  credit: 'FLIP checklist — tick an item and it glides to the bottom while the others slide up (Things 3 / Linear "completed sink")',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .list { width: 260px; max-width: 100%; padding: 8px; border-radius: 14px; background: #fff; border: 1px solid #e5e5e0; font-family: Inter, system-ui, sans-serif; display: flex; flex-direction: column; gap: 2px; }
    .row { display: flex; align-items: center; gap: 12px; height: 42px; padding: 0 10px; border-radius: 10px; cursor: pointer; transition: background .2s; user-select: none; -webkit-user-select: none; }
    .row:hover { background: #f6f6f3; }
    .row:focus-visible { outline: 2px solid #111; outline-offset: -2px; }
    .cb { width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid #c4c4bf; display: grid; place-items: center; flex: none; transition: background .25s, border-color .25s, transform .4s cubic-bezier(.34, 1.56, .64, 1); }
    .row:hover .cb { border-color: #111; }
    .row[aria-checked="true"] .cb { background: #111; border-color: #111; transform: scale(1.05); }
    .cb svg { width: 12px; height: 12px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .cb path { stroke-dasharray: 20; stroke-dashoffset: 20; transition: stroke-dashoffset .3s .05s; }
    .row[aria-checked="true"] .cb path { stroke-dashoffset: 0; }
    .lbl { position: relative; font-size: 13.5px; font-weight: 500; color: #111; transition: color .3s; }
    .lbl::after { content: ''; position: absolute; left: 0; top: 55%; height: 1.5px; width: 100%; background: #999; transform: scaleX(0); transform-origin: left; transition: transform .35s cubic-bezier(.3, .8, .3, 1); }
    .row[aria-checked="true"] .lbl { color: #999; }
    .row[aria-checked="true"] .lbl::after { transform: scaleX(1); }
  `,
  html: `
    <div class="list" role="group">
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="lbl">Review pull request</span></div>
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="lbl">Book flights</span></div>
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="lbl">Water the plants</span></div>
      <div class="row" role="checkbox" aria-checked="false" tabindex="0"><span class="cb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="lbl">Call mum</span></div>
    </div>`,
  init(root) {
    const list = root.querySelector('.list');
    const rows = () => [...list.querySelectorAll('.row')];
    const anims = new Set();
    const toggle = (row) => {
      const before = new Map(rows().map((r) => [r, r.getBoundingClientRect().top]));
      const on = row.getAttribute('aria-checked') !== 'true';
      row.setAttribute('aria-checked', String(on));
      const sorted = rows().sort((a, b) => (a.getAttribute('aria-checked') === 'true') - (b.getAttribute('aria-checked') === 'true'));
      sorted.forEach((r) => list.appendChild(r));
      sorted.forEach((r) => {
        const dy = before.get(r) - r.getBoundingClientRect().top;
        if (!dy) return;
        const a = r.animate([{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }], { duration: 480, easing: 'cubic-bezier(.3, .8, .3, 1)' });
        anims.add(a); a.onfinish = () => anims.delete(a);
      });
      row.focus({ preventScroll: true });
    };
    rows().forEach((r) => {
      r.addEventListener('click', () => toggle(r));
      r.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(r); } });
    });
    return () => anims.forEach((a) => a.cancel());
  },
};
