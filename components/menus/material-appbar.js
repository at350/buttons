const ICON = (d) => `<svg width="24" height="24" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`;
const item = (d, label) => `<button class="mi" type="button" role="menuitem" tabindex="-1"><span class="sl"></span>${ICON(d)}<span class="ml">${label}</span></button>`;

export default {
  id: 'mn-material-appbar',
  credit: 'Google Material 3 — small top app bar (navigation icon, title-large, trailing icon buttons, overflow menu)',
  size: 'full',
  css: `
    :host { display: block; }
    :host([data-open]) { z-index: 30; }
    .bar { position: relative; container-type: inline-size; height: 64px; background: #fef7ff; border-radius: 12px; display: flex; align-items: center; padding: 0 4px; font-family: 'Roboto Flex', Roboto, system-ui, sans-serif; color: #1d1b20; -webkit-tap-highlight-color: transparent; }
    .title { flex: 1; min-width: 0; margin: 0 0 0 4px; font: 400 22px/28px 'Roboto Flex', Roboto, system-ui, sans-serif; letter-spacing: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .acts { display: flex; flex: none; }
    .ib { position: relative; width: 48px; height: 48px; border: 0; padding: 0; background: none; color: #49454f; cursor: pointer; display: grid; place-items: center; flex: none; border-radius: 50%; outline: none; }
    .ib.nav { color: #1d1b20; }
    .ib .sl { position: absolute; left: 4px; top: 4px; width: 40px; height: 40px; border-radius: 50%; overflow: hidden; pointer-events: none; }
    .ib .sl::before, .mi .sl::before { content: ""; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity 15ms linear; }
    .ib:hover .sl::before, .mi:hover .sl::before { opacity: .08; }
    .ib:focus-visible .sl::before, .mi:focus-visible .sl::before { opacity: .12; }
    .ib:focus-visible .sl { outline: 3px solid #625b71; outline-offset: 2px; }
    .ib:focus-visible .sl::before { border-radius: 50%; }
    .ib[aria-expanded="true"] .sl::before { opacity: .12; }
    .ib svg, .mi svg { position: relative; fill: currentColor; flex: none; }
    .rp { position: absolute; border-radius: 50%; background: currentColor; opacity: .12; transform: scale(0); animation: rp 450ms cubic-bezier(.2,0,0,1) forwards; transition: opacity 375ms linear; pointer-events: none; }
    @keyframes rp { to { transform: scale(1); } }
    .wrap { position: relative; }
    .menu { position: absolute; top: 52px; right: 0; z-index: 2; min-width: 112px; max-width: 280px; width: max-content; padding: 8px 0; background: #f3edf7; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15); transform-origin: top right; opacity: 0; visibility: hidden; transform: scale(.8); transition: opacity 75ms linear, transform 75ms cubic-bezier(.4,0,1,1), visibility 0s 75ms; }
    .menu.open { opacity: 1; visibility: visible; transform: none; transition: opacity 30ms linear, transform 120ms cubic-bezier(0,0,.2,1), visibility 0s; }
    .mi { position: relative; display: flex; align-items: center; gap: 12px; width: 100%; min-width: 200px; height: 48px; padding: 0 12px; border: 0; background: none; color: #1d1b20; font: 500 14px/20px 'Roboto Flex', Roboto, system-ui, sans-serif; letter-spacing: .1px; text-align: left; cursor: pointer; outline: none; white-space: nowrap; }
    .mi svg { color: #49454f; }
    .mi .sl { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
    .mi:focus-visible { outline: 3px solid #625b71; outline-offset: -3px; }
    .div { height: 1px; margin: 8px 0; background: #cac4d0; }
    @container (width < 330px) { .acts .ib.opt { display: none; } }
  `,
  html: `
    <header class="bar">
      <button class="ib nav" type="button" aria-label="Open navigation menu"><span class="sl"></span>${ICON('M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z')}</button>
      <h1 class="title">Inbox</h1>
      <div class="acts">
        <button class="ib opt" type="button" aria-label="Attach file"><span class="sl"></span>${ICON('M728-326q0 103-72.18 174.5-72.17 71.5-175 71.5Q378-80 305.5-151.5T233-326v-380q0-72.5 51.5-123.25T408-880q72 0 123.5 50.75T583-706v360q0 42-30 72t-72.5 30q-42.5 0-72.5-29.67-30-29.68-30-72.33v-370h60v370q0 17 12.5 29.5t30.64 12.5q18.14 0 30-12.5T523-346v-360q0-48-33.5-81t-81.71-33q-48.21 0-81.5 33.06T293-706v380q0 78 54.97 132T481-140q77.92 0 132.46-54Q668-248 668-326v-390h60v390Z')}</button>
        <button class="ib opt" type="button" aria-label="Pick a date"><span class="sl"></span>${ICON('M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z')}</button>
        <div class="wrap">
          <button class="ib more" type="button" aria-label="More options" aria-haspopup="menu" aria-expanded="false"><span class="sl"></span>${ICON('M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z')}</button>
          <div class="menu" role="menu" aria-label="More options">
            ${item('M686-80q-47.5 0-80.75-33.25T572-194q0-8 5-34L278-403q-16.28 17.34-37.64 27.17Q219-366 194-366q-47.5 0-80.75-33T80-480q0-48 33.25-81T194-594q24 0 45 9.3 21 9.29 37 25.7l301-173q-2-8-3.5-16.5T572-766q0-47.5 33.25-80.75T686-880q47.5 0 80.75 33.25T800-766q0 47.5-33.25 80.75T686-652q-23.27 0-43.64-9Q622-670 606-685L302-516q3 8 4.5 17.5t1.5 18q0 8.5-1 16t-3 15.5l303 173q16-15 36.09-23.5 20.1-8.5 43.07-8.5Q734-308 767-274.75T800-194q0 47.5-33.25 80.75T686-80Zm.04-60q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5Zm-492-286q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5ZM724.5-727.54q15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5 22.96 0 38.46-15.54ZM686-194ZM194-480Zm492-286Z', 'Share')}
            ${item('M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-620h60v620h500v60H180Zm120-180v-560 560Z', 'Copy link')}
            ${item('M658-648v-132H302v132h-60v-192h476v192h-60Zm-518 60h680-680Zm599 95q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm-81 313v-192H302v192h356Zm60 60H242v-176H80v-246q0-45.05 30.5-75.53Q141-648 186-648h588q45.05 0 75.53 30.47Q880-587.05 880-542v246H718v176Zm102-236v-186.21Q820-562 806.78-575q-13.23-13-32.78-13H186q-19.55 0-32.77 13.22Q140-561.55 140-542v186h102v-76h476v76h102Z', 'Print')}
            <div class="div" role="separator"></div>
            ${item('m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z', 'Settings')}
            ${item('M511-258q11-11 11-27t-11-27q-11-11-27-11t-27 11q-11 11-11 27t11 27q11 11 27 11t27-11Zm-62-135h59q0-26 6.5-47.5T555-490q31-26 44-51t13-55q0-53-34.5-85T486-713q-49 0-86.5 24.5T345-621l53 20q11-28 33-43.5t52-15.5q34 0 55 18.5t21 47.5q0 22-13 41.5T508-512q-30 26-44.5 51.5T449-393Zm31 313q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z', 'Help &amp; feedback')}
          </div>
        </div>
      </div>
    </header>`,
  init(root, host) {
    const timers = new Set();
    const ripple = (el, layer) => el.addEventListener('pointerdown', (e) => {
      const r = layer.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
      const d = 2 * Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
      const s = document.createElement('span'); s.className = 'rp';
      s.style.cssText = `width:${d}px;height:${d}px;left:${x - d / 2}px;top:${y - d / 2}px`;
      layer.append(s);
      const up = () => { ['pointerup', 'pointerleave', 'pointercancel'].forEach((t) => el.removeEventListener(t, up)); s.style.opacity = '0'; const t = setTimeout(() => { s.remove(); timers.delete(t); }, 400); timers.add(t); };
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((t) => el.addEventListener(t, up));
    });
    root.querySelectorAll('.ib, .mi').forEach((b) => ripple(b, b.querySelector('.sl')));
    const more = root.querySelector('.more'), menu = root.querySelector('.menu');
    const items = [...menu.querySelectorAll('.mi')];
    let open = false;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v, focus) => {
      if (v === open) return; open = v;
      more.setAttribute('aria-expanded', v); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v);
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
      if (v && focus) items[0].focus({ preventScroll: true });
      if (!v && focus) more.focus({ preventScroll: true });
    };
    more.addEventListener('click', (e) => set(!open, e.detail === 0));
    more.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); set(true, true); } });
    items.forEach((it) => it.addEventListener('click', () => { const t = setTimeout(() => { set(false, true); timers.delete(t); }, 150); timers.add(t); }));
    menu.addEventListener('keydown', (e) => {
      const i = items.indexOf(root.activeElement);
      const go = (n) => { e.preventDefault(); items[(n + items.length) % items.length].focus({ preventScroll: true }); };
      if (e.key === 'ArrowDown') go(i + 1); else if (e.key === 'ArrowUp') go(i - 1);
      else if (e.key === 'Home') go(0); else if (e.key === 'End') go(items.length - 1);
      else if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); set(false, true); }
    });
    const onKey = (e) => { if (e.key === 'Escape' && open) set(false, true); };
    root.addEventListener('keydown', onKey);
    return () => { set(false); timers.forEach(clearTimeout); };
  },
};
