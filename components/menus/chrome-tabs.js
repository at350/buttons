export default {
  id: 'mn-chrome-tabs',
  credit: 'Google Chrome tab strip — rounded tabs with favicon, close button and new-tab "+"',
  size: 'full',
  css: `
    :host { display: block; }
    .strip { background: #dee1e6; border-radius: 12px 12px 0 0; padding: 8px 8px 0; display: flex; align-items: flex-end; font: 12px/1 system-ui, -apple-system, "Segoe UI", sans-serif; color: #3c4043; overflow: hidden; }
    .tabs { display: flex; align-items: flex-end; min-width: 0; flex: 0 1 auto; }
    /* Each tab is a wrapper holding two sibling buttons: the tab itself and the close "x" laid over its right edge. */
    .tw { position: relative; display: flex; flex: 1 1 200px; min-width: 60px; max-width: 240px; }
    .tab { position: relative; display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 32px 0 12px; flex: 1 1 auto; min-width: 0; background: none; border: 0; border-radius: 8px 8px 0 0; color: inherit; font: inherit; cursor: pointer; }
    .tab::before { content: ""; position: absolute; left: -1px; top: 8px; bottom: 8px; width: 1px; background: #9aa0a6; opacity: .6; }
    .tw:first-child .tab::before, .tw.on .tab::before, .tw.on + .tw .tab::before { opacity: 0; }
    .tw:hover .tab { background: rgba(255,255,255,.4); }
    .tw:hover .tab::before, .tw:hover + .tw .tab::before { opacity: 0; }
    .tw.on .tab { background: #fff; }
    .tw.on .tab::after, .tw.on .cL { content: ""; position: absolute; bottom: 0; width: 8px; height: 8px; background: radial-gradient(circle at 0 0, transparent 8px, #fff 8.5px); }
    .tw.on .tab::after { right: -8px; transform: scaleX(-1); }
    .tw.on .cL { left: -8px; display: block; }
    .cL { display: none; }
    .fav { width: 16px; height: 16px; border-radius: 4px; flex: none; }
    .ttl { flex: 1; min-width: 0; text-align: left; overflow: hidden; white-space: nowrap; mask-image: linear-gradient(90deg, #000 80%, transparent); -webkit-mask-image: linear-gradient(90deg, #000 80%, transparent); }
    .x { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; padding: 0; border: 0; background: none; border-radius: 50%; display: grid; place-items: center; color: #5f6368; cursor: pointer; }
    .x:hover { background: rgba(0,0,0,.1); }
    .x:focus-visible { outline: 2px solid #1a73e8; outline-offset: -1px; }
    .tab:focus-visible { outline: 2px solid #1a73e8; outline-offset: -2px; }
    .add { width: 28px; height: 28px; margin: 0 0 3px 6px; border-radius: 50%; border: 0; background: none; color: #3c4043; cursor: pointer; display: grid; place-items: center; flex: none; padding: 0; }
    .add:hover { background: rgba(0,0,0,.08); }
    .add:focus-visible { outline: 2px solid #1a73e8; }
    .bar { background: #fff; height: 36px; display: flex; align-items: center; gap: 8px; padding: 0 10px; border-radius: 0 0 12px 12px; }
    .omni { flex: 1; height: 28px; border-radius: 14px; background: #f1f3f4; display: flex; align-items: center; padding: 0 12px; color: #5f6368; gap: 8px; font-size: 13px; }
    .nb { width: 28px; height: 28px; display: grid; place-items: center; color: #5f6368; border: 0; background: none; border-radius: 50%; cursor: pointer; }
    .nb:hover { background: rgba(0,0,0,.06); }
    @container (width < 420px) { .ttl { display: none; } }
  `,
  html: `
    <div class="win" style="container-type:inline-size">
      <div class="strip">
        <div class="tabs" role="tablist"></div>
        <button class="add" type="button" aria-label="New tab"><svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7 1v12M1 7h12"/></svg></button>
      </div>
      <div class="bar">
        <button class="nb" type="button" aria-label="Back"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 3L5 8l5 5"/></svg></button>
        <button class="nb" type="button" aria-label="Forward"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3l5 5-5 5"/></svg></button>
        <button class="nb" type="button" aria-label="Reload"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 8a5 5 0 11-1.5-3.6M13 2v3h-3"/></svg></button>
        <div class="omni"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="5" width="8" height="6" rx="1"/><path d="M4 5V3.5a2 2 0 014 0V5"/></svg><span class="url"></span></div>
      </div>
    </div>`,
  init(root) {
    const list = root.querySelector('.tabs'), url = root.querySelector('.url');
    const palette = ['#4285f4', '#ea4335', '#34a853', '#fbbc04', '#a142f4', '#24c1e0', '#f538a0'];
    const names = ['New Tab', 'Inbox (3)', 'Dashboard', 'Docs', 'Calendar', 'Drive', 'Photos'];
    let n = 0;
    // `w` is always the .tw wrapper; its first child is the role="tab" button.
    const activate = (w) => {
      [...list.children].forEach((x) => { x.classList.toggle('on', x === w); x.firstElementChild.setAttribute('aria-selected', String(x === w)); });
      url.textContent = w.dataset.url;
    };
    const closeTab = (w) => {
      if (list.children.length === 1) return;
      const was = w.classList.contains('on'), next = w.nextElementSibling || w.previousElementSibling;
      const hadFocus = w.contains(root.activeElement);
      w.remove();
      if (was) activate(next);
      if (hadFocus) next.firstElementChild.focus({ preventScroll: true });
    };
    const make = () => {
      const i = n++ % names.length;
      const w = document.createElement('div');
      w.className = 'tw'; w.dataset.url = names[i].toLowerCase().replace(/[^a-z]+/g, '') + '.example.com';
      const t = document.createElement('button');
      t.className = 'tab'; t.type = 'button'; t.setAttribute('role', 'tab');
      t.innerHTML = `<span class="cL"></span><span class="fav" style="background:${palette[i]}"></span><span class="ttl">${names[i]}</span>`;
      const x = document.createElement('button');
      x.className = 'x'; x.type = 'button'; x.setAttribute('aria-label', 'Close tab');
      x.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M1 1l8 8M9 1L1 9"/></svg>`;
      t.addEventListener('click', () => activate(w));
      t.addEventListener('keydown', (e) => { if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); closeTab(w); } });
      x.addEventListener('click', () => closeTab(w));
      w.append(t, x);
      list.appendChild(w); activate(w);
    };
    make(); make(); make(); activate(list.children[0]);
    root.querySelector('.add').addEventListener('click', () => { if (list.children.length < 8) make(); });
  },
};
