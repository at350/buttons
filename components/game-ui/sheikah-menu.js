const ITEMS = [['master-sword', 'Master Sword', 30], ['savage-lynel-sword', 'Savage Lynel Sword', 58], ['royal-claymore', 'Royal Claymore', 52], ['guardian-sword', 'Guardian Sword++', 40], ['knights-broadsword', "Knight's Broadsword", 26], ['soldiers-broadsword', "Soldier's Broadsword", 14], ['travelers-sword', "Traveler's Sword", 5], ['boko-club', 'Boko Club', 4], ['tree-branch', 'Tree Branch', 2]];
export default {
  id: 'gm-sheikah-menu',
  credit: 'Nintendo Zelda: Breath of the Wild — the Sheikah Slate inventory: category tabs with the cyan rune glow, real weapon icons with attack values, and the selected item\'s name and Attack readout',
  size: 'wide',
  css: `
    :host { display: block; max-width: 100%; }
    .stage { background: radial-gradient(ellipse at 50% 0%, #1a3a44 0%, #0b1a20 60%, #06100f 100%); border-radius: 12px; padding: 14px 16px 16px; font-family: 'Syne', 'Inter', system-ui, sans-serif; overflow: hidden; }
    .tabs { display: flex; gap: 2px; border-bottom: 1px solid rgba(120,220,230,.35); position: relative; }
    .tab { flex: 1; min-width: 0; height: 34px; border: none; background: none; cursor: pointer; color: rgba(190,230,235,.6); font: 600 10px 'Syne', 'Inter', system-ui, sans-serif; letter-spacing: .6px; text-transform: uppercase; position: relative; white-space: nowrap; overflow: hidden; transition: color .2s, text-shadow .2s; }
    .tab:hover { color: #d8f7fb; }
    .tab.sel { color: #e9fdff; text-shadow: 0 0 8px #4fe3ec, 0 0 18px rgba(79,227,236,.6); }
    .tab.sel::after { content: ""; position: absolute; left: 50%; bottom: -5px; width: 8px; height: 8px; background: #4fe3ec; transform: translateX(-50%) rotate(45deg); box-shadow: 0 0 8px #4fe3ec; }
    .tab:focus-visible { outline: 1px solid #4fe3ec; outline-offset: -3px; }
    .ul { position: absolute; bottom: -1px; height: 2px; left: calc(var(--i, 0) * 20%); width: 20%; background: #4fe3ec; box-shadow: 0 0 8px #4fe3ec, 0 0 16px #4fe3ec; transition: left .25s cubic-bezier(.2,.8,.2,1), width .25s cubic-bezier(.2,.8,.2,1); }
    .body { display: flex; gap: 14px; margin-top: 14px; align-items: flex-start; }
    .items { flex: 0 1 auto; min-width: 0; display: flex; flex-wrap: wrap; gap: 7px; }
    .it { width: clamp(54px, calc((100cqw - 200px) / 9 - 7px), 92px); aspect-ratio: 1; border: 1px solid rgba(170,200,205,.22); border-radius: 4px; background: radial-gradient(circle at 50% 40%, rgba(60,70,72,.55), rgba(8,14,16,.75)); cursor: pointer; position: relative; padding: 3px; transition: border-color .15s, box-shadow .15s; }
    .it img { display: block; width: 100%; height: 100%; object-fit: contain; pointer-events: none; -webkit-user-drag: none; }
    .it b { position: absolute; right: 4px; bottom: 2px; color: #fff; font: 700 clamp(11px, 1.3cqw, 14px)/1.2 'Inter', system-ui, sans-serif; text-shadow: 0 1px 2px #000, 0 0 3px #000; }
    .it:hover, .it:focus-visible { border-color: rgba(230,240,240,.7); outline: none; }
    .it.sel { border-color: #fdf7d8; box-shadow: 0 0 0 1px rgba(253,247,216,.5), 0 0 12px rgba(250,236,170,.55), inset 0 0 10px rgba(250,236,170,.18); }
    .it.sel::before, .it.sel::after { content: ""; position: absolute; width: 8px; height: 8px; border: 2px solid #fdf7d8; }
    .it.sel::before { left: -4px; top: -4px; border-right: 0; border-bottom: 0; } .it.sel::after { right: -4px; bottom: -4px; border-left: 0; border-top: 0; }
    .info { flex: 1 1 138px; min-width: 120px; color: #f4f1e6; border-top: 1px solid rgba(240,230,190,.45); padding-top: 8px; }
    .name { font: 600 clamp(14px, 1.6cqw, 18px)/1.2 'Inter', system-ui, sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .atk { display: flex; align-items: center; gap: 6px; margin-top: 8px; font: 700 22px/1 'Inter', system-ui, sans-serif; }
    .atk svg { width: 18px; height: 18px; fill: none; stroke: #f4f1e6; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .atk small { font: 600 10px 'Inter', system-ui, sans-serif; letter-spacing: .5px; text-transform: uppercase; color: rgba(244,241,230,.7); margin-left: auto; }
    @container (max-width: 360px) { .info { display: none; } }
    .wrapq { container-type: inline-size; }
  `,
  html: `
    <div class="stage">
      <div class="tabs" role="tablist">
        <button class="tab sel" type="button" role="tab" aria-selected="true">Weapons</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Bows</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Shields</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Armor</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Key Items</button>
        <span class="ul"></span>
      </div>
      <div class="wrapq"><div class="body">
        <div class="items" role="listbox" aria-label="Weapons">
          ${ITEMS.map(([f, n, v], i) => `<button class="it${i === 0 ? ' sel' : ''}" type="button" role="option" aria-selected="${i === 0}" aria-label="${n}, attack ${v}" data-n="${n}" data-v="${v}"><img src="assets/real/botw-${f}.png" alt="" width="54" height="54"><b>${v}</b></button>`).join('')}
        </div>
        <div class="info" aria-live="polite"><div class="name">${ITEMS[0][1]}</div><div class="atk"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m11 19-6-6" /> <path d="m5 21-2-2" /> <path d="m8 16-4 4" /> <path d="M9.5 17.5 20.414 6.586A2 2 0 0021 5.172V3h-2.172a2 2 0 00-1.414.586L6.5 14.5" /></svg><span class="av">${ITEMS[0][2]}</span><small>Attack</small></div></div>
      </div></div>
    </div>`,
  init(root) {
    const tabs = [...root.querySelectorAll('.tab')], ul = root.querySelector('.ul');
    tabs.forEach((t) => t.addEventListener('click', () => { tabs.forEach((o) => { o.classList.toggle('sel', o === t); o.setAttribute('aria-selected', String(o === t)); }); ul.style.setProperty("--i", tabs.indexOf(t)); }));
    const its = [...root.querySelectorAll('.it')];
    const nm = root.querySelector('.name'), av = root.querySelector('.av');
    its.forEach((i) => i.addEventListener('click', () => { its.forEach((o) => { o.classList.toggle('sel', o === i); o.setAttribute('aria-selected', String(o === i)); }); nm.textContent = i.dataset.n; av.textContent = i.dataset.v; }));
  },
};
