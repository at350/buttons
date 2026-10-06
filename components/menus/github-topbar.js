export default {
  id: 'mn-github-topbar',
  credit: 'GitHub.com top header (dark) with search, "+" menu and avatar menu',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .bar { position: relative; container-type: inline-size; background: #24292f; color: #fff; border-radius: 12px; height: 62px; display: flex; align-items: center; gap: 12px; padding: 0 16px; font: 14px/1 -apple-system, system-ui, "Segoe UI", sans-serif; }
    .ico { width: 32px; height: 32px; display: grid; place-items: center; background: none; border: 0; color: #fff; border-radius: 6px; cursor: pointer; padding: 0; flex: none; }
    .ico:hover { color: #c9d1d9; }
    .ico:focus-visible, .lnk:focus-visible, .av:focus-visible { outline: 2px solid #2f81f7; outline-offset: 2px; }
    .search { flex: 0 1 272px; height: 30px; display: flex; align-items: center; gap: 8px; padding: 0 10px; border: 1px solid #57606a; border-radius: 6px; color: #c9d1d9; background: rgba(255,255,255,.03); cursor: text; transition: flex-basis .2s, border-color .15s; min-width: 0; }
    .search:focus-within { background: #fff; color: #24292f; border-color: #2f81f7; flex-basis: 420px; }
    .search input { flex: 1; min-width: 0; border: 0; background: none; color: inherit; font: inherit; outline: 0; }
    .search input::placeholder { color: inherit; opacity: .8; }
    .search:focus-within kbd { display: none; }
    kbd { font: 11px/1 ui-monospace, Menlo, monospace; border: 1px solid #57606a; border-radius: 4px; padding: 3px 5px; color: #c9d1d9; }
    .links { display: flex; gap: 16px; }
    .lnk { background: none; border: 0; color: #fff; font: inherit; font-weight: 600; cursor: pointer; padding: 6px 2px; border-radius: 6px; white-space: nowrap; }
    .lnk:hover { color: #c9d1d9; }
    .right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
    .plus { display: inline-flex; align-items: center; gap: 2px; }
    .av { width: 20px; height: 20px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: linear-gradient(135deg, #f78166, #ea4aaa 60%, #2f81f7); display: inline-flex; align-items: center; }
    .av::after { content: ""; border: 4px solid transparent; border-top-color: #fff; margin: 4px 0 0 24px; }
    .menu { position: absolute; top: 56px; right: 16px; min-width: 180px; background: #fff; color: #24292f; border: 1px solid #d0d7de; border-radius: 6px; box-shadow: 0 8px 24px rgba(140,149,159,.2); padding: 4px 0; display: none; }
    .menu.open { display: block; }
    .menu button { display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; font: inherit; color: inherit; cursor: pointer; }
    .menu button:hover, .menu button:focus-visible { background: #0969da; color: #fff; outline: 0; }
    .menu hr { border: 0; border-top: 1px solid #d0d7de; margin: 4px 0; }
    .hb { display: none; }
    @container (width < 860px) { .links { display: none; } }
    @container (width < 560px) { .search, .plus { display: none; } .hb { display: grid; } }
  `,
  html: `
    <div class="bar">
      <button class="ico hb" type="button" aria-label="Menu"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12h12.5a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5z"/></svg></button>
      <button class="ico" type="button" aria-label="Home"><svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.77-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 008 0z"/></svg></button>
      <label class="search"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M10.68 11.74a6 6 0 01-7.92-8.98 6 6 0 018.98 7.92l3.04 3.04a.75.75 0 11-1.06 1.06zM11.5 7a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z"/></svg><input type="text" placeholder="Search or jump to…" aria-label="Search"><kbd>/</kbd></label>
      <div class="links"><button class="lnk" type="button">Pull requests</button><button class="lnk" type="button">Issues</button><button class="lnk" type="button">Marketplace</button><button class="lnk" type="button">Explore</button></div>
      <div class="right">
        <button class="ico" type="button" aria-label="Notifications"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 16a2 2 0 001.98-1.75c.02-.14-.09-.25-.23-.25h-3.5c-.14 0-.25.11-.23.25A2 2 0 008 16zM3 5a5 5 0 0110 0v2.95c0 .22.07.44.21.6l1.57 1.82c.6.7.1 1.63-.78 1.63H2c-.88 0-1.38-.93-.78-1.63L2.79 8.6c.14-.17.21-.38.21-.6V5z"/></svg></button>
        <button class="ico plus trig" type="button" data-menu="m1" aria-expanded="false" aria-haspopup="true" aria-label="Create new"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 010 1.5H8.5v4.25a.75.75 0 01-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"/></svg><svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M4.4 6h7.2L8 10.3z"/></svg></button>
        <button class="av trig" type="button" data-menu="m2" aria-expanded="false" aria-haspopup="true" aria-label="Account"></button>
      </div>
      <div class="menu" id="m1" role="menu"><button type="button" role="menuitem">New repository</button><button type="button" role="menuitem">Import repository</button><hr><button type="button" role="menuitem">New gist</button><button type="button" role="menuitem">New organization</button><button type="button" role="menuitem">New project</button></div>
      <div class="menu" id="m2" role="menu"><button type="button" role="menuitem">Your profile</button><button type="button" role="menuitem">Your repositories</button><button type="button" role="menuitem">Your stars</button><hr><button type="button" role="menuitem">Settings</button><button type="button" role="menuitem">Sign out</button></div>
    </div>`,
  init(root, host) {
    const trigs = [...root.querySelectorAll('.trig')];
    let cur = null;
    const onDoc = (e) => { if (!host.contains(e.target)) close(); };
    function close() {
      if (!cur) return;
      root.getElementById(cur.dataset.menu).classList.remove('open');
      cur.setAttribute('aria-expanded', 'false');
      cur = null; host.removeAttribute('data-open');
      document.removeEventListener('pointerdown', onDoc, true);
    }
    function open(t) {
      close(); cur = t;
      root.getElementById(t.dataset.menu).classList.add('open');
      t.setAttribute('aria-expanded', 'true'); host.setAttribute('data-open', '');
      document.addEventListener('pointerdown', onDoc, true);
    }
    trigs.forEach((t) => t.addEventListener('click', () => (cur === t ? close() : open(t))));
    root.querySelectorAll('.menu button').forEach((b) => b.addEventListener('click', close));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { const t = cur; close(); if (t) t.focus({ preventScroll: true }); return; }
      if (!cur || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
      e.preventDefault();
      const items = [...root.getElementById(cur.dataset.menu).querySelectorAll('button')];
      const i = items.indexOf(root.activeElement);
      items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus({ preventScroll: true });
    });
    return close;
  },
};
