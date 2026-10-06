const L = (inner, cls = '') => `<svg class="${cls}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const FW = [['next.js', 'Next.js'], ['sveltekit', 'SvelteKit'], ['nuxt.js', 'Nuxt.js'], ['remix', 'Remix'], ['astro', 'Astro']];

export default {
  id: 'mn-combobox',
  credit: 'shadcn/ui — Combobox (Popover + cmdk Command): outline trigger, searchable list, check on the chosen value',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; width: 200px; font: 400 14px/20px Inter, Geist, system-ui, sans-serif; color: #09090b; -webkit-font-smoothing: antialiased; }
    .trig { display: inline-flex; align-items: center; justify-content: space-between; gap: 8px; width: 200px; height: 36px; padding: 0 12px; border: 1px solid #e4e4e7; border-radius: 6px; background: #fff; color: #09090b; font: 500 14px/20px Inter, Geist, system-ui, sans-serif; white-space: nowrap; cursor: pointer; outline: none; box-shadow: 0 1px 2px 0 rgba(0,0,0,.05); transition: color 150ms cubic-bezier(.4,0,.2,1), background-color 150ms cubic-bezier(.4,0,.2,1), border-color 150ms cubic-bezier(.4,0,.2,1), box-shadow 150ms cubic-bezier(.4,0,.2,1); }
    .trig:hover { background: #f4f4f5; }
    .trig:focus-visible { border-color: #a1a1aa; box-shadow: 0 0 0 3px rgba(161,161,170,.5); }
    .trig .val { overflow: hidden; text-overflow: ellipsis; }
    .trig svg { flex: none; opacity: .5; }
    .pop { position: absolute; top: 40px; left: 0; width: 200px; display: none; flex-direction: column; overflow: hidden; background: #fff; border: 1px solid #e4e4e7; border-radius: 6px; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1); transform-origin: 50% 0; }
    .pop.open { display: flex; animation: enter 150ms ease; }
    .pop.closing { display: flex; animation: exit 150ms ease forwards; pointer-events: none; }
    @keyframes enter { from { opacity: 0; transform: translateY(-8px) scale(.95); } }
    @keyframes exit { to { opacity: 0; transform: scale(.95); } }
    .in { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 12px; border-bottom: 1px solid #e4e4e7; }
    .in svg { flex: none; opacity: .5; }
    input { flex: 1; min-width: 0; height: 40px; padding: 12px 0; border: 0; background: transparent; color: #09090b; font: inherit; outline: none; }
    input::placeholder { color: #71717a; }
    .list { max-height: 300px; overflow-x: hidden; overflow-y: auto; scroll-padding: 4px 0; }
    .grp { padding: 4px; }
    .it { position: relative; display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 4px; cursor: default; user-select: none; white-space: nowrap; }
    .it[data-selected="true"] { background: #f4f4f5; color: #18181b; }
    .it svg { flex: none; margin-left: auto; color: #71717a; opacity: 0; }
    .it[aria-checked="true"] svg { opacity: 1; }
    .it[hidden] { display: none; }
    .empty { display: none; padding: 24px 0; text-align: center; }
    .list.none .empty { display: block; }
    .list.none .grp { display: none; }
  `,
  html: `
    <div class="wrap">
      <button class="trig" type="button" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-controls="cb-list"><span class="val">Select framework...</span>${L('<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>')}</button>
      <div class="pop">
        <div class="in">${L('<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>')}<input type="text" placeholder="Search framework..." aria-label="Search framework" role="combobox" aria-expanded="true" aria-controls="cb-list" aria-autocomplete="list" autocomplete="off" autocorrect="off" spellcheck="false"></div>
        <div class="list" id="cb-list" role="listbox" aria-label="Frameworks">
          <div class="empty" role="presentation">No framework found.</div>
          <div class="grp" role="presentation">
            ${FW.map(([v, l], i) => `<div class="it" id="cb-${i}" role="option" data-value="${v}" aria-selected="false" aria-checked="false">${l}${L('<path d="M20 6 9 17l-5-5"/>')}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const trig = root.querySelector('.trig'), val = trig.querySelector('.val'), pop = root.querySelector('.pop'), input = root.querySelector('input'), list = root.querySelector('.list');
    const items = [...root.querySelectorAll('.it')];
    let open = false, value = '', hl = 0, closeT = 0;
    const visible = () => items.filter((x) => !x.hidden);
    const paint = (scroll) => {
      const v = visible(); hl = Math.max(0, Math.min(hl, v.length - 1));
      items.forEach((x) => { x.dataset.selected = 'false'; x.setAttribute('aria-selected', 'false'); });
      const t = v[hl];
      if (t) { t.dataset.selected = 'true'; t.setAttribute('aria-selected', 'true'); input.setAttribute('aria-activedescendant', t.id); if (scroll) t.scrollIntoView({ block: 'nearest' }); }
      else input.removeAttribute('aria-activedescendant');
      list.classList.toggle('none', !v.length);
    };
    // cmdk-style fuzzy match: query characters must appear in order
    const match = (text, q) => { let j = 0; for (const c of text) if (c === q[j]) j++; return j === q.length; };
    const filter = () => { const q = input.value.trim().toLowerCase(); items.forEach((x) => { x.hidden = !!q && !match(x.textContent.toLowerCase(), q); }); hl = 0; paint(); };
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v, focusTrig) => {
      if (v === open) return; open = v;
      clearTimeout(closeT);
      trig.setAttribute('aria-expanded', v);
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
      if (v) {
        host.toggleAttribute('data-open', true);
        pop.classList.remove('closing'); pop.classList.add('open');
        input.value = ''; filter();
        const i = items.findIndex((x) => x.dataset.value === value); hl = i < 0 ? 0 : i; paint(true);
        input.focus({ preventScroll: true });
      } else {
        pop.classList.remove('open'); pop.classList.add('closing');
        closeT = setTimeout(() => { pop.classList.remove('closing'); host.toggleAttribute('data-open', false); }, 150);
        if (focusTrig) trig.focus({ preventScroll: true });
      }
    };
    const choose = (it) => {
      if (!it) return;
      value = it.dataset.value === value ? '' : it.dataset.value;
      items.forEach((x) => x.setAttribute('aria-checked', x.dataset.value === value));
      val.textContent = value ? it.textContent : 'Select framework...';
      set(false, true);
    };
    trig.addEventListener('click', () => set(!open));
    trig.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); set(true); } });
    input.addEventListener('input', filter);
    input.addEventListener('keydown', (e) => {
      const v = visible();
      if (e.key === 'ArrowDown') { e.preventDefault(); if (v.length) { hl = (hl + 1) % v.length; paint(true); } }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (v.length) { hl = (hl - 1 + v.length) % v.length; paint(true); } }
      else if (e.key === 'Home') { e.preventDefault(); hl = 0; paint(true); }
      else if (e.key === 'End') { e.preventDefault(); hl = v.length - 1; paint(true); }
      else if (e.key === 'Enter') { e.preventDefault(); choose(v[hl]); }
      else if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); set(false, true); }
    });
    items.forEach((it) => {
      it.addEventListener('pointermove', () => { const i = visible().indexOf(it); if (i !== hl) { hl = i; paint(); } });
      it.addEventListener('click', () => choose(it));
    });
    list.addEventListener('pointerdown', (e) => e.preventDefault());
    return () => { set(false); clearTimeout(closeT); host.toggleAttribute('data-open', false); };
  },
};
