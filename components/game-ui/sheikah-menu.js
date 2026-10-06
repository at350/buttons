export default {
  id: 'gm-sheikah-menu',
  credit: 'Nintendo Zelda: Breath of the Wild — Sheikah Slate pause-menu tabs; the chosen tab gets the cyan rune glow and the diamond cursor',
  size: 'wide',
  css: `
    :host { display: block; max-width: 100%; }
    .stage { background: radial-gradient(ellipse at 50% 0%, #1a3a44 0%, #0b1a20 60%, #06100f 100%); border-radius: 12px; padding: 14px 16px 16px; font-family: 'Syne', 'Inter', system-ui, sans-serif; overflow: hidden; }
    .tabs { display: flex; gap: 2px; border-bottom: 1px solid rgba(120,220,230,.35); position: relative; }
    .tab { flex: 1; min-width: 0; height: 34px; border: none; background: none; cursor: pointer; color: rgba(190,230,235,.6); font: 600 11px 'Syne', 'Inter', system-ui, sans-serif; letter-spacing: 1.5px; text-transform: uppercase; position: relative; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .2s, text-shadow .2s; }
    .tab:hover { color: #d8f7fb; }
    .tab.sel { color: #e9fdff; text-shadow: 0 0 8px #4fe3ec, 0 0 18px rgba(79,227,236,.6); }
    .tab.sel::after { content: ""; position: absolute; left: 50%; bottom: -5px; width: 8px; height: 8px; background: #4fe3ec; transform: translateX(-50%) rotate(45deg); box-shadow: 0 0 8px #4fe3ec; }
    .tab:focus-visible { outline: 1px solid #4fe3ec; outline-offset: -3px; }
    .ul { position: absolute; bottom: -1px; height: 2px; left: calc(var(--i, 0) * 20%); width: 20%; background: #4fe3ec; box-shadow: 0 0 8px #4fe3ec, 0 0 16px #4fe3ec; transition: left .25s cubic-bezier(.2,.8,.2,1), width .25s cubic-bezier(.2,.8,.2,1); }
    .items { display: grid; grid-template-columns: repeat(auto-fill, minmax(44px, 1fr)); gap: 8px; margin-top: 14px; }
    .it { height: 44px; border: 1px solid rgba(120,220,230,.25); background: rgba(10,30,36,.6); cursor: pointer; position: relative; display: grid; place-items: center; transition: border-color .15s, box-shadow .15s; }
    .it svg { width: 22px; height: 22px; fill: none; stroke: rgba(190,230,235,.7); stroke-width: 1.5; }
    .it:hover, .it:focus-visible { border-color: #4fe3ec; box-shadow: 0 0 10px rgba(79,227,236,.5), inset 0 0 10px rgba(79,227,236,.15); outline: none; }
    .it.sel { border-color: #f0d36a; box-shadow: 0 0 12px rgba(240,211,106,.6), inset 0 0 12px rgba(240,211,106,.2); }
    .it.sel svg { stroke: #f0d36a; }
    .it::before, .it::after { content: ""; position: absolute; width: 5px; height: 5px; border: 1px solid rgba(120,220,230,.6); }
    .it::before { left: -1px; top: -1px; border-right: 0; border-bottom: 0; } .it::after { right: -1px; bottom: -1px; border-left: 0; border-top: 0; }
  `,
  html: `
    <div class="stage">
      <div class="tabs" role="tablist">
        <button class="tab sel" type="button" role="tab" aria-selected="true">Weapons</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Bows</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Armor</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Materials</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Key Items</button>
        <span class="ul"></span>
      </div>
      <div class="items" role="listbox" aria-label="Inventory">
        <button class="it sel" type="button" role="option" aria-selected="true" aria-label="Master Sword"><svg viewBox="0 0 24 24"><path d="M12 2v14M9 16h6M12 16v6M7 7l5-3 5 3"/></svg></button>
        <button class="it" type="button" role="option" aria-selected="false" aria-label="Spear"><svg viewBox="0 0 24 24"><path d="M4 20 20 4M17 4h3v3"/></svg></button>
        <button class="it" type="button" role="option" aria-selected="false" aria-label="Claymore"><svg viewBox="0 0 24 24"><path d="M12 3v15M8 18h8M12 18v3M9 7h6"/></svg></button>
        <button class="it" type="button" role="option" aria-selected="false" aria-label="Boomerang"><svg viewBox="0 0 24 24"><path d="M5 19c0-8 4-14 14-14-5 3-8 7-8 14z"/></svg></button>
        <button class="it" type="button" role="option" aria-selected="false" aria-label="Shield"><svg viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/></svg></button>
        <button class="it" type="button" role="option" aria-selected="false" aria-label="Empty"><svg viewBox="0 0 24 24"><path d="M8 12h8" opacity=".3"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const tabs = [...root.querySelectorAll('.tab')], ul = root.querySelector('.ul');
    tabs.forEach((t) => t.addEventListener('click', () => { tabs.forEach((o) => { o.classList.toggle('sel', o === t); o.setAttribute('aria-selected', String(o === t)); }); ul.style.setProperty("--i", tabs.indexOf(t)); }));
    const its = [...root.querySelectorAll('.it')];
    its.forEach((i) => i.addEventListener('click', () => its.forEach((o) => { o.classList.toggle('sel', o === i); o.setAttribute('aria-selected', String(o === i)); })));
  },
};
