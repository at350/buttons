// Chrome (2023 "Chrome Refresh" / GM3) window chrome on macOS. Colours are Chromium's baseline sys tokens:
// header #D3E3FD (primary90), toolbar/active tab #FFFFFF, omnibox #E9EEF6, dividers #A8C7FA (primary80),
// icons #474747, hover = 6% neutral10. Favicons are Simple Icons glyphs (CC0) in their brand colours;
// toolbar icons are Material Symbols (Apache-2.0).
const P = { google: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z', gmail: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z', github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12', youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', chrome: 'M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z' };
const MS = (d, s = 20) => `<svg width="${s}" height="${s}" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
const ICON = {
  back: 'm274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z',
  fwd: 'M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z',
  reload: 'M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-129h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q83 0 152-47.5T728-393h62q-29 105-115 169t-195 64Z',
  tune: 'M427-120v-225h60v83h353v60H487v82h-60Zm-307-82v-60h247v60H120Zm187-166v-82H120v-60h187v-84h60v226h-60Zm120-82v-60h413v60H427Zm166-165v-225h60v82h187v60H653v83h-60Zm-473-83v-60h413v60H120Z',
  star: 'm323-245 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z',
  more: 'M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z',
  add: 'M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z',
  close: 'm249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z',
};
const FAV = {
  google: '<svg viewBox="0 0 24 24"><g clip-path="url(#cg)"><path fill="#EA4335" d="M12 12 0 5V0h22z"/><path fill="#FBBC05" d="M12 12 0 5v14z"/><path fill="#34A853" d="M12 12 0 19v5h24l-3-4z"/><path fill="#4285F4" d="M12 12l9 8 3 4V9H12z"/></g></svg>',
  gmail: '<svg viewBox="0 0 24 24"><g clip-path="url(#cm)"><rect width="5.46" height="24" fill="#4285F4"/><rect x="5.45" width="13.1" height="24" fill="#EA4335"/><rect x="18.54" width="5.46" height="24" fill="#34A853"/><rect x="18.54" width="5.46" height="6.2" fill="#FBBC04"/><rect width="5.46" height="6.2" fill="#C5221F"/></g></svg>',
  github: `<svg viewBox="0 0 24 24"><path fill="#1f2328" d="${P.github}"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24"><rect x="8" y="7" width="9" height="10" fill="#fff"/><path fill="#FF0000" d="${P.youtube}"/></svg>`,
  ntp: `<svg viewBox="0 0 24 24"><path fill="#757575" d="${P.chrome}"/></svg>`,
};
const SITES = [
  ['google', 'Google', 'google.com'], ['gmail', 'Inbox (3) - Gmail', 'mail.google.com/mail/u/0/#inbox'], ['github', 'GitHub', 'github.com'],
  ['youtube', 'YouTube', 'youtube.com'], ['ntp', 'New Tab', ''],
];

export default {
  id: 'mn-chrome-tabs',
  credit: 'Google Chrome (2023 Refresh) — tab strip with flared active tab, favicons, omnibox toolbar',
  size: 'full',
  css: `
    :host { display: block; }
    .win { container-type: inline-size; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.08), 0 6px 20px rgba(0,0,0,.08);
      font: 400 12px/16px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; color: #1f1f1f; user-select: none; }
    .strip { display: flex; align-items: flex-end; height: 42px; padding: 0 8px 0 0; background: #d3e3fd; }
    .lights { display: flex; gap: 8px; padding: 0 18px 0 14px; align-self: center; margin-top: -2px; flex: none; }
    .lights i { width: 12px; height: 12px; border-radius: 50%; box-shadow: inset 0 0 0 .5px rgba(0,0,0,.18); }
    .tabs { display: flex; align-items: flex-end; min-width: 0; flex: 1 1 0; height: 34px; }
    .tl { display: contents; }
    .tw { position: relative; display: flex; align-items: center; height: 34px; flex: 0 1 240px; min-width: 40px; max-width: 240px; transition: max-width .2s cubic-bezier(.2,0,0,1), flex-basis .2s cubic-bezier(.2,0,0,1); }
    .tw.new { max-width: 0; min-width: 0; flex-basis: 0; overflow: hidden; }
    .tw.on { background: #fff; border-radius: 10px 10px 0 0; z-index: 1; }
    .tw.on::before, .tw.on::after { content: ""; position: absolute; bottom: 0; width: 12px; height: 12px; pointer-events: none; }
    .tw.on::before { left: -12px; background: radial-gradient(circle at 0 0, transparent 11.5px, #fff 12px); }
    .tw.on::after { right: -12px; background: radial-gradient(circle at 100% 0, transparent 11.5px, #fff 12px); }
    .sp { position: absolute; left: 0; top: 9px; width: 1px; height: 16px; background: #a8c7fa; transition: opacity .15s; }
    .tw:first-child .sp, .tw.on .sp, .tw.on + .tw .sp, .tw:hover .sp, .tw:hover + .tw .sp { opacity: 0; }
    .hv { position: absolute; inset: 4px 2px 4px 2px; border-radius: 8px; background: rgba(168,199,250,.72); opacity: 0; transition: opacity .15s; pointer-events: none; }
    .tw:not(.on):hover .hv { opacity: 1; }
    .tab { position: relative; display: flex; align-items: center; gap: 8px; width: 100%; height: 100%; min-width: 0; padding: 0 30px 0 12px; border: 0; background: none; font: inherit; color: #474747; cursor: default; text-align: left; outline: 0; border-radius: 10px 10px 0 0; }
    .tw.on .tab { color: #1f1f1f; }
    .tab:focus-visible { box-shadow: inset 0 0 0 2px #0b57d0; }
    .fav { width: 16px; height: 16px; flex: none; display: block; }
    .fav svg { display: block; width: 16px; height: 16px; }
    .ttl { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; -webkit-mask-image: linear-gradient(90deg, #000 calc(100% - 24px), transparent); mask-image: linear-gradient(90deg, #000 calc(100% - 24px), transparent); }
    .x { position: absolute; right: 8px; top: 50%; width: 18px; height: 18px; margin-top: -9px; padding: 0; border: 0; border-radius: 50%; background: none; color: #474747; display: grid; place-items: center; cursor: default; outline: 0; }
    .x:hover { background: rgba(31,31,31,.08); color: #1f1f1f; }
    .x:active { background: rgba(31,31,31,.14); }
    .x:focus-visible { box-shadow: 0 0 0 2px #0b57d0; }
    .tiny .tab { padding: 0; justify-content: center; } .tiny .ttl { display: none; } .tiny .x { display: none; } .tiny.on .x { display: grid; right: 50%; margin-right: -9px; } .tiny.on .fav { display: none; }
    .add { flex: none; width: 28px; height: 28px; margin: 0 0 3px 6px; padding: 0; border: 0; border-radius: 50%; background: none; color: #474747; display: grid; place-items: center; cursor: default; outline: 0; transition: background .15s; }
    .add:hover { background: rgba(31,31,31,.06); }
    .add:active { background: rgba(31,31,31,.1); }
    .add:focus-visible, .nb:focus-visible, .omni:focus-visible { box-shadow: 0 0 0 2px #0b57d0; }
    .bar { display: flex; align-items: center; gap: 2px; height: 46px; padding: 0 6px; background: #fff; border-bottom: 1px solid #e8eaed; }
    .nb { flex: none; width: 34px; height: 34px; padding: 0; border: 0; border-radius: 50%; background: none; color: #474747; display: grid; place-items: center; cursor: default; outline: 0; transition: background .15s; }
    .nb:hover:not(:disabled) { background: rgba(31,31,31,.06); }
    .nb:active:not(:disabled) { background: rgba(31,31,31,.1); }
    .nb:disabled { color: rgba(31,31,31,.38); }
    .omni { flex: 1; min-width: 0; display: flex; align-items: center; gap: 2px; height: 36px; margin: 0 6px; padding: 0 4px; border-radius: 18px; background: #e9eef6; font-size: 14px; line-height: 20px; color: #1f1f1f; transition: background .15s; }
    .omni:hover { background: #dfe5ee; }
    .chip { flex: none; width: 28px; height: 28px; padding: 0; border: 0; border-radius: 50%; background: none; color: #474747; display: grid; place-items: center; cursor: default; outline: 0; }
    .chip:hover { background: rgba(31,31,31,.08); }
    .url { flex: 1; min-width: 0; padding-left: 6px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
    .url span { color: #474747; }
    .av { flex: none; display: block; width: 24px; height: 24px; margin: 0 5px; border-radius: 50%; object-fit: cover; background: #e3e3e3; }
    .pb { width: 34px; height: 34px; padding: 0; border: 0; border-radius: 50%; background: none; display: grid; place-items: center; cursor: default; outline: 0; }
    .pb:hover { background: rgba(31,31,31,.06); }
    @container (max-width: 460px) { .fwd { display: none; } .lights { padding: 0 10px 0 12px; gap: 6px; } }
  `,
  html: `
    <div class="win">
      <svg width="0" height="0" style="position:absolute" aria-hidden="true"><clipPath id="cg" clipPathUnits="userSpaceOnUse"><path d="${P.google}"/></clipPath><clipPath id="cm" clipPathUnits="userSpaceOnUse"><path d="${P.gmail}"/></clipPath></svg>
      <div class="strip">
        <div class="lights" aria-hidden="true"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div>
        <div class="tabs"><div class="tl" role="tablist" aria-label="Tabs"></div><button class="add" type="button" aria-label="New tab">${MS(ICON.add, 20)}</button></div>
      </div>
      <div class="bar">
        <button class="nb" type="button" aria-label="Back">${MS(ICON.back)}</button>
        <button class="nb fwd" type="button" aria-label="Forward" disabled>${MS(ICON.fwd)}</button>
        <button class="nb rl" type="button" aria-label="Reload">${MS(ICON.reload)}</button>
        <div class="omni">
          <button class="chip" type="button" aria-label="View site information">${MS(ICON.tune, 18)}</button>
          <span class="url"></span>
          <button class="chip star" type="button" aria-label="Bookmark this tab" aria-pressed="false">${MS(ICON.star, 18)}</button>
        </div>
        <button class="pb" type="button" aria-label="Profile"><img class="av" src="assets/portraits/women-27.jpg" alt="" width="24" height="24" draggable="false"></button>
        <button class="nb" type="button" aria-label="Customize and control Google Chrome">${MS(ICON.more)}</button>
      </div>
    </div>`,
  init(root) {
    const list = root.querySelector('.tl'), url = root.querySelector('.url'), star = root.querySelector('.star');
    let n = 0; const timers = [];
    const STAR_FILL = 'm233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z';
    const setStar = (on) => { star.setAttribute('aria-pressed', on); star.querySelector('path').setAttribute('d', on ? STAR_FILL : ICON.star); star.style.color = on ? '#0b57d0' : ''; };
    const activate = (w) => {
      [...list.children].forEach((x) => { x.classList.toggle('on', x === w); x.querySelector('.tab').setAttribute('aria-selected', String(x === w)); });
      const u = w.dataset.url; const i = u.indexOf('/');
      url.innerHTML = u ? (i < 0 ? u : `${u.slice(0, i)}<span>${u.slice(i)}</span>`) : '<span>Search Google or type a URL</span>';
      setStar(w.dataset.star === '1');
    };
    const closeTab = (w) => {
      const tabs = [...list.children].filter((x) => !x.classList.contains('new'));
      if (tabs.length === 1) return;
      const was = w.classList.contains('on'), next = w.nextElementSibling || w.previousElementSibling;
      const hadFocus = w.contains(root.activeElement);
      if (was) activate(next);
      w.classList.add('new');
      timers.push(setTimeout(() => w.remove(), 220));
      if (hadFocus) next.querySelector('.tab').focus({ preventScroll: true });
    };
    const make = (site, animate) => {
      const [k, title, u] = site;
      const w = document.createElement('div');
      w.className = 'tw' + (animate ? ' new' : ''); w.dataset.url = u;
      w.innerHTML = `<span class="sp"></span><span class="hv"></span><button class="tab" type="button" role="tab" aria-selected="false" title="${title}"><span class="fav">${FAV[k]}</span><span class="ttl">${title}</span></button><button class="x" type="button" aria-label="Close tab">${MS(ICON.close, 16)}</button>`;
      w.querySelector('.tab').addEventListener('click', () => activate(w));
      w.querySelector('.tab').addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const t = e.key === 'ArrowRight' ? w.nextElementSibling : w.previousElementSibling; if (t) { activate(t); t.querySelector('.tab').focus({ preventScroll: true }); } }
      });
      w.querySelector('.x').addEventListener('click', () => closeTab(w));
      w.addEventListener('auxclick', (e) => { if (e.button === 1) closeTab(w); });
      list.appendChild(w); ro.observe(w);
      if (animate) { void w.offsetWidth; w.classList.remove('new'); }
      return w;
    };
    const ro = new ResizeObserver((es) => { for (const e of es) e.target.classList.toggle('tiny', e.contentRect.width < 64); });
    SITES.slice(0, 4).forEach((s) => make(s));
    activate(list.children[0]);
    root.querySelector('.add').addEventListener('click', () => {
      const room = root.querySelector('.tabs').clientWidth - 40;
      if ((list.children.length + 1) * 40 > room || list.children.length >= 10) return;
      activate(make(SITES[4], true));
      n++;
    });
    star.addEventListener('click', () => { const w = list.querySelector('.tw.on'); w.dataset.star = w.dataset.star === '1' ? '0' : '1'; setStar(w.dataset.star === '1'); });
    const rl = root.querySelector('.rl');
    rl.addEventListener('click', () => { const s = rl.querySelector('svg'); s.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 450, easing: 'cubic-bezier(.2,0,0,1)' }); });
    return () => { timers.forEach(clearTimeout); ro.disconnect(); };
  },
};
