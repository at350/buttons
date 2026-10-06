// Material 3 standard icon button (more_vert) opening an M3 menu. Glyphs: Material Symbols Outlined (Apache-2.0).
const ms = (d) => `<svg width="24" height="24" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
const MORE = 'M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z';
const ITEMS = [
  ['Download', 'M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z'],
  ['Rename', 'M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z'],
  ['Make a copy', 'M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-620h60v620h500v60H180Zm120-180v-560 560Z'],
  '-',
  ['Share', 'M730-400v-130H600v-60h130v-130h60v130h130v60H790v130h-60ZM252-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM40-160v-94q0-35 17.5-63.5T108-360q75-33 133.5-46.5T360-420q60 0 118 13.5T611-360q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587-306q-71-33-120-43.5T360-360q-58 0-107.5 10.5T132-306q-15 7-23.5 21.5T100-254v34Zm324.5-346.5Q450-592 450-631t-25.5-64.5Q399-721 360-721t-64.5 25.5Q270-670 270-631t25.5 64.5Q321-541 360-541t64.5-25.5ZM360-631Zm0 411Z'],
  ['Copy link', 'M450-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h170v60H280q-58.33 0-99.17 40.76-40.83 40.77-40.83 99Q140-422 180.83-381q40.84 41 99.17 41h170v60ZM325-450v-60h310v60H325Zm185 170v-60h170q58.33 0 99.17-40.76 40.83-40.77 40.83-99Q820-538 779.17-579q-40.84-41-99.17-41H510v-60h170q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H510Z'],
  '-',
  ['Move to trash', 'M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z', 'Delete'],
];

export default {
  id: 'mn-kebab-menu',
  credit: 'Material 3 — standard icon button (more_vert) with an M3 menu (surface-container, 48dp items, emphasized motion)',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; font: 500 14px/20px "Roboto Flex", Roboto, system-ui, sans-serif; letter-spacing: .1px; color: #1d1b20; }
    .ib { position: relative; width: 40px; height: 40px; margin: 4px; padding: 0; border: 0; border-radius: 50%; background: none; color: #49454f; display: grid; place-items: center; cursor: pointer; outline: 0; overflow: hidden; -webkit-tap-highlight-color: transparent; }
    .ib::before { content: ""; position: absolute; inset: 0; border-radius: inherit; background: #49454f; opacity: 0; transition: opacity 15ms linear; }
    .ib:hover::before { opacity: .08; }
    .ib:focus-visible::before, .ib[aria-expanded="true"]::before { opacity: .1; }
    .ib:active::before { opacity: .1; }
    .ib:focus-visible { outline: 3px solid #625b71; outline-offset: 2px; }
    .rip { position: absolute; left: 0; top: 0; width: 40px; height: 40px; margin: -20px 0 0 -20px; border-radius: 50%; background: #49454f; opacity: 0; pointer-events: none; }
    .menu { position: absolute; top: 46px; right: 4px; min-width: 112px; max-width: 280px; width: max-content; padding: 8px 0; border-radius: 4px; background: #f3edf7;
      box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15); display: none; clip-path: inset(0 0 100% 0 round 4px); opacity: 0;
      transition: clip-path .15s cubic-bezier(.3,0,.8,.15), opacity .15s linear, display .15s allow-discrete; }
    .menu.l { right: auto; left: 4px; }
    .menu.open { display: block; opacity: 1; clip-path: inset(0 0 0 0 round 4px); transition: clip-path .4s cubic-bezier(.2,0,0,1), opacity 50ms linear; @starting-style { opacity: 0; clip-path: inset(0 0 100% 0 round 4px); } }
    .r { position: relative; display: flex; align-items: center; gap: 12px; width: 100%; min-width: 200px; height: 48px; padding: 0 12px; border: 0; background: none; font: inherit; letter-spacing: inherit; color: #1d1b20; cursor: pointer; text-align: left; outline: 0; white-space: nowrap; }
    .r > * { position: relative; }
    .r::before { content: ""; position: absolute; inset: 0; background: #1d1b20; opacity: 0; transition: opacity 15ms linear; }
    .r:hover::before { opacity: .08; }
    .r:focus-visible::before { opacity: .1; }
    .r:active::before { opacity: .1; }
    .r:focus-visible { outline: 3px solid #625b71; outline-offset: -3px; }
    .r svg { color: #49454f; flex: none; }
    .r .t { flex: 1; }
    .r .sc { margin-left: 24px; color: #49454f; }
    .menu.open .r { animation: fadein .25s cubic-bezier(.2,0,0,1) both; animation-delay: calc(var(--d) * 25ms + 40ms); }
    @keyframes fadein { from { opacity: 0; } }
    hr { height: 1px; margin: 8px 0; border: 0; background: #cac4d0; }
  `,
  html: `
    <div class="wrap">
      <button class="ib" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="More actions">${ms(MORE)}<span class="rip"></span></button>
      <div class="menu" role="menu" aria-label="More actions">${ITEMS.map((it, i) => it === '-' ? '<hr role="separator">'
        : `<button class="r" type="button" role="menuitem" tabindex="-1" style="--d:${i}">${ms(it[1])}<span class="t">${it[0]}</span>${it[2] ? `<span class="sc">${it[2]}</span>` : ''}</button>`).join('')}</div>
    </div>`,
  init(root, host) {
    const b = root.querySelector('.ib'), menu = root.querySelector('.menu'), rip = root.querySelector('.rip');
    const items = [...menu.querySelectorAll('.r')];
    let open = false;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v, focus) => {
      if (v === open) return; open = v;
      if (v) { menu.classList.remove('l'); menu.classList.toggle('l', b.getBoundingClientRect().right - 216 < 4); }
      b.setAttribute('aria-expanded', String(v)); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v);
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
      if (v && focus) items[0].focus({ preventScroll: true });
    };
    b.addEventListener('pointerdown', (e) => {
      const r = b.getBoundingClientRect();
      rip.animate([{ transform: `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px) scale(.2)`, opacity: .12 }, { transform: 'translate(20px, 20px) scale(1.6)', opacity: .12, offset: .7 }, { transform: 'translate(20px, 20px) scale(1.6)', opacity: 0 }], { duration: 450, easing: 'cubic-bezier(.2,0,0,1)' });
    });
    b.addEventListener('click', (e) => set(!open, e.detail === 0));
    items.forEach((r) => r.addEventListener('click', () => { set(false); b.focus({ preventScroll: true }); }));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) { e.preventDefault(); set(false); b.focus({ preventScroll: true }); return; }
      if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp') && root.activeElement === b) { e.preventDefault(); set(true, true); return; }
      if (!open) return;
      const i = items.indexOf(root.activeElement);
      let n = null;
      if (e.key === 'ArrowDown') n = i < 0 ? 0 : (i + 1) % items.length;
      else if (e.key === 'ArrowUp') n = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length;
      else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = items.length - 1;
      else if (e.key === 'Tab') set(false);
      if (n !== null) { e.preventDefault(); items[n].focus({ preventScroll: true }); }
    });
    return () => set(false);
  },
};
