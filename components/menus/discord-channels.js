// Discord (2024) server channel sidebar. Channel glyphs: Phosphor (MIT) hash-bold / speaker-high-fill;
// UI glyphs: Lucide (ISC); avatar mark: Simple Icons "discord" (CC0).
const lu = (paths, s = 18, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const L = {
  chev: '<path d="m6 9 6 6 6-6"/>', x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  userPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  gear: '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>',
  circlePlus: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>',
  folderPlus: '<path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  calPlus: '<path d="M16 18h6"/><path d="M16 2v3"/><path d="M19 15v6"/><path d="M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3"/><path d="M3 9h18"/><path d="M8 2v3"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  logout: '<path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>',
  mic: '<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>',
  phones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
};
const HASH = '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M224,84H180.2l7.61-41.85a12,12,0,0,0-23.62-4.3L155.8,84H116.2l7.61-41.85a12,12,0,1,0-23.62-4.3L91.8,84H48a12,12,0,0,0,0,24H87.44l-7.27,40H32a12,12,0,0,0,0,24H75.8l-7.61,41.85a12,12,0,0,0,9.66,14A11.430,11.430,0,0,0,80,228a12,12,0,0,0,11.8-9.86L100.2,172h39.6l-7.61,41.85a12,12,0,0,0,9.66,14,11.43,11.43,0,0,0,2.160.2,12,12,0,0,0,11.8-9.86L164.2,172H208a12,12,0,0,0,0-24H168.56l7.27-40H224a12,12,0,0,0,0-24Zm-79.83,64H104.56l7.27-40h39.61Z"/></svg>';
const SPEAKER = '<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M160,32.25V223.69a8.29,8.29,0,0,1-3.91,7.18,8,8,0,0,1-9-.56l-65.57-51A4,4,0,0,1,80,176.16V79.84a4,4,0,0,1,1.55-3.15l65.57-51a8,8,0,0,1,10,.16A8.27,8.27,0,0,1,160,32.25ZM60,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H60a4,4,0,0,0,4-4V84A4,4,0,0,0,60,80Zm126.77,20.840a8,8,0,0,0-.72,11.3,24,24,0,0,1,0,31.72,8,8,0,1,0,12,10.58,40,40,0,0,0,0-52.88A8,8,0,0,0,186.74,100.84Zm40.89-26.17a8,8,0,1,0-11.92,10.66,64,64,0,0,1,0,85.34,8,8,0,1,0,11.92,10.66,80,80,0,0,0,0-106.66Z"/></svg>';
const CLYDE = '<svg width="60%" height="60%" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>';
const av = (c, s) => `<span class="av" style="background:${c};width:${s}px;height:${s}px">${CLYDE}</span>`;
const ch = (name, o = {}) => `<button class="ch${o.un ? ' un' : ''}" type="button"${o.cur ? ' aria-current="page"' : ''}>${o.voice ? SPEAKER : HASH}<span class="tx">${name}</span>${o.n ? `<span class="n">${o.n}</span>` : ''}<span class="act"><span title="Create Invite">${lu(L.userPlus, 16)}</span><span title="Edit Channel">${lu(L.gear, 16)}</span></span></button>`;
const MENU = [
  ['Invite People', L.userPlus, 'inv'], ['Server Settings', L.gear], ['Create Channel', L.circlePlus], ['Create Category', L.folderPlus], ['Create Event', L.calPlus], '-',
  ['Notification Settings', L.bell], ['Privacy Settings', L.shield], '-', ['Edit Per-server Profile', L.pencil], '-', ['Leave Server', L.logout, 'red'],
];

export default {
  id: 'mn-discord-channels',
  credit: 'Discord server sidebar — server dropdown, collapsible categories, unread pills, mention badge, voice users, user panel',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .sb { position: relative; display: flex; flex-direction: column; width: 240px; height: 452px; border-radius: 12px; overflow: hidden; background: #2b2d31; color: #949ba4;
      font: 500 16px/20px "gg sans", "Noto Sans", "DM Sans", "Helvetica Neue", system-ui, sans-serif; -webkit-font-smoothing: antialiased; user-select: none; }
    button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; text-align: left; outline: 0; }
    button:focus-visible { box-shadow: inset 0 0 0 2px #00a8fc; }
    .hd { position: relative; z-index: 2; flex: none; display: flex; align-items: center; justify-content: space-between; height: 48px; padding: 0 16px; color: #f2f3f5; font-weight: 600; font-size: 16px; transition: background .1s;
      box-shadow: 0 1px 0 rgba(4,4,5,.2), 0 1.5px 0 rgba(6,6,7,.05), 0 2px 0 rgba(4,4,5,.05); }
    .hd:hover, .hd[aria-expanded="true"] { background: rgba(78,80,88,.3); }
    .hd .ic { display: grid; width: 18px; height: 18px; }
    .hd .ic svg { grid-area: 1 / 1; transition: opacity .1s, transform .15s; }
    .hd .ic svg + svg, .hd[aria-expanded="true"] .ic svg:first-child { opacity: 0; transform: rotate(-90deg); }
    .hd[aria-expanded="true"] .ic svg + svg { opacity: 1; transform: none; }
    .menu { position: absolute; top: 56px; left: 10px; z-index: 3; width: 220px; padding: 6px 8px; border-radius: 4px; background: #111214; box-shadow: 0 0 0 1px rgba(4,4,5,.15), 0 8px 16px rgba(0,0,0,.24);
      opacity: 0; visibility: hidden; transform: scale(.95); transform-origin: top center; transition: opacity .1s, transform .1s ease-out, visibility 0s .1s; }
    .menu.open { opacity: 1; visibility: visible; transform: none; transition: opacity .1s, transform .1s ease-out; }
    .mi { display: flex; align-items: center; justify-content: space-between; width: 100%; min-height: 32px; margin: 2px 0; padding: 6px 8px; border-radius: 2px; font-size: 14px; line-height: 18px; color: #b5bac1; }
    .mi svg { flex: none; }
    .mi:hover, .mi:focus-visible { background: #4752c4; color: #fff; box-shadow: none; }
    .mi.inv { color: #949cf7; } .mi.inv:hover, .mi.inv:focus-visible { color: #fff; }
    .mi.red { color: #f23f43; } .mi.red:hover, .mi.red:focus-visible { background: #da373c; color: #fff; }
    .msep { height: 1px; margin: 4px 4px; background: rgba(78,80,88,.48); }
    .body { flex: 1; min-height: 0; overflow: hidden; padding: 0 8px 0 8px; }
    .cat { display: flex; align-items: center; gap: 2px; width: 100%; height: 24px; margin-top: 16px; padding: 0 0 0 2px; color: #949ba4; font-size: 12px; line-height: 16px; font-weight: 600; letter-spacing: .02em; text-transform: uppercase; }
    .cat:hover { color: #dbdee1; }
    .cat > svg { flex: none; transition: transform .2s; }
    .cat[aria-expanded="false"] > svg { transform: rotate(-90deg); }
    .cat .add { margin-left: auto; margin-right: 6px; display: grid; opacity: 0; color: #b5bac1; }
    .cat:hover .add { opacity: 1; }
    .grp.closed .ch:not(.un):not([aria-current]), .grp.closed .vu { display: none; }
    .ch { position: relative; display: flex; align-items: center; gap: 6px; width: 100%; height: 32px; margin: 2px 0 0; padding: 6px 8px; border-radius: 4px; color: #80848e; }
    .ch > svg { flex: none; color: #80848e; }
    .ch:hover { background: rgba(78,80,88,.3); color: #dbdee1; }
    .ch[aria-current] { background: rgba(78,80,88,.6); color: #f2f3f5; }
    .ch[aria-current] > svg, .ch:hover > svg { color: #b5bac1; }
    .ch.un { color: #f2f3f5; font-weight: 600; }
    .ch.un::before { content: ""; position: absolute; left: -8px; top: 12px; width: 4px; height: 8px; border-radius: 0 4px 4px 0; background: #f2f3f5; }
    .ch .tx { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
    .ch .n { flex: none; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 8px; background: #f23f43; color: #fff; font-size: 12px; line-height: 16px; font-weight: 700; text-align: center; }
    .ch .act { display: none; gap: 4px; color: #b5bac1; }
    .ch .act span { display: grid; } .ch .act span:hover { color: #dbdee1; }
    .ch:hover .act, .ch[aria-current] .act { display: flex; }
    .ch:hover .n { display: none; }
    .vu { display: flex; align-items: center; gap: 8px; height: 28px; margin: 1px 0 0 32px; padding: 0 8px; border-radius: 4px; font-size: 14px; color: #949ba4; }
    .vu:hover { background: rgba(78,80,88,.3); color: #dbdee1; }
    .av { position: relative; flex: none; display: grid; place-items: center; border-radius: 50%; }
    .me { flex: none; display: flex; align-items: center; gap: 8px; height: 52px; padding: 0 8px; background: #232428; }
    .me .who { flex: 1; min-width: 0; display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 4px 0 2px; border-radius: 4px; }
    .me .who:hover { background: rgba(78,80,88,.3); }
    .me .av::after { content: ""; position: absolute; right: -2px; bottom: -2px; width: 10px; height: 10px; border-radius: 50%; background: #23a55a; box-shadow: 0 0 0 3px #232428; }
    .me .nm { display: flex; flex-direction: column; min-width: 0; font-size: 14px; line-height: 18px; color: #f2f3f5; font-weight: 600; }
    .me .nm small { font-size: 12px; line-height: 13px; font-weight: 400; color: #b5bac1; }
    .tb { width: 32px; height: 32px; border-radius: 4px; display: grid; place-items: center; color: #b5bac1; }
    .tb:hover { background: rgba(78,80,88,.3); color: #dbdee1; }
    .tb[aria-pressed="true"] { color: #f23f43; }
    .tb .sl { display: none; } .tb[aria-pressed="true"] .sl { display: block; }
  `,
  html: `
    <nav class="sb" aria-label="Buttons HQ (server)">
      <button class="hd" type="button" aria-haspopup="menu" aria-expanded="false">Buttons HQ<span class="ic">${lu(L.chev, 18, 2.4)}${lu(L.x, 18, 2.4)}</span></button>
      <div class="menu" role="menu">${MENU.map((m) => m === '-' ? '<div class="msep" role="separator"></div>' : `<button class="mi${m[2] ? ' ' + m[2] : ''}" type="button" role="menuitem" tabindex="-1">${m[0]}${lu(m[1], 18)}</button>`).join('')}</div>
      <div class="body">
        <button class="cat" type="button" aria-expanded="true">${lu(L.chev, 12, 3)}Text Channels<span class="add" title="Create Channel">${lu(L.plus, 18)}</span></button>
        <div class="grp">${ch('announcements', { un: 1, n: 3 })}${ch('general', { cur: 1 })}${ch('design', { un: 1 })}${ch('off-topic')}</div>
        <button class="cat" type="button" aria-expanded="true">${lu(L.chev, 12, 3)}Voice Channels<span class="add" title="Create Channel">${lu(L.plus, 18)}</span></button>
        <div class="grp">${ch('Lounge', { voice: 1 })}<div class="vu">${av('#5865f2', 24)}Nova</div><div class="vu">${av('#3ba55c', 24)}Kit</div>${ch('Standup', { voice: 1 })}</div>
      </div>
      <div class="me">
        <div class="who">${av('#eb459e', 32)}<span class="nm">alex<small>Online</small></span></div>
        <button class="tb" type="button" aria-label="Mute" aria-pressed="false">${lu(L.mic + '<path class="sl" d="M3 3l18 18"/>', 20)}</button>
        <button class="tb" type="button" aria-label="Deafen" aria-pressed="false">${lu(L.phones + '<path class="sl" d="M3 3l18 18"/>', 20)}</button>
        <button class="tb" type="button" aria-label="User Settings">${lu(L.gear, 20)}</button>
      </div>
    </nav>`,
  init(root, host) {
    const chans = [...root.querySelectorAll('.ch')];
    chans.forEach((c) => c.addEventListener('click', () => {
      chans.forEach((x) => (x === c ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current')));
      c.classList.remove('un'); const n = c.querySelector('.n'); if (n) n.remove();
    }));
    root.querySelectorAll('.cat').forEach((cat) => cat.addEventListener('click', () => {
      const v = cat.getAttribute('aria-expanded') !== 'true';
      cat.setAttribute('aria-expanded', String(v)); cat.nextElementSibling.classList.toggle('closed', !v);
    }));
    root.querySelectorAll('.tb[aria-pressed]').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
    const hd = root.querySelector('.hd'), menu = root.querySelector('.menu'), items = [...menu.querySelectorAll('.mi')];
    let open = false;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v, focus) => {
      if (v === open) return; open = v;
      hd.setAttribute('aria-expanded', String(v)); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v);
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
      if (v && focus) items[0].focus({ preventScroll: true });
    };
    hd.addEventListener('click', (e) => set(!open, e.detail === 0));
    items.forEach((m) => m.addEventListener('click', () => { set(false); hd.focus({ preventScroll: true }); }));
    root.addEventListener('pointerdown', (e) => { if (open && !e.composedPath().some((n) => n === menu || n === hd)) set(false); });
    root.addEventListener('keydown', (e) => {
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); set(false); hd.focus({ preventScroll: true }); return; }
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      const i = items.indexOf(root.activeElement), d = e.key === 'ArrowDown' ? 1 : -1;
      items[i < 0 ? 0 : (i + d + items.length) % items.length].focus({ preventScroll: true });
    });
    return () => set(false);
  },
};
