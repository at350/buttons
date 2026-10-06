// GitHub repo "<> Code" button. The clone panel is a popover: it escapes the box only while the host carries data-open.
export default {
  id: 'bt-github-code',
  credit: 'GitHub — green "<> Code" button that opens the Local / Codespaces clone panel (Primer)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { --f: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif; position: relative; display: inline-block; font: 400 14px/20px var(--f); color: #1f2328; }
    .gh {
      height: 32px; padding: 0 12px; border: 1px solid rgba(31,35,40,.15); border-radius: 6px; color: #fff; cursor: pointer;
      background: #1f883d; box-shadow: 0 1px 0 0 rgba(31,35,40,.1); font: 500 14px/20px var(--f);
      display: inline-flex; align-items: center; gap: 8px; white-space: nowrap;
      transition: background 80ms cubic-bezier(.65,0,.35,1); -webkit-tap-highlight-color: transparent;
    }
    .gh:hover { background: #1c8139; }
    .gh:active, .gh[aria-expanded="true"] { background: #197935; box-shadow: inset 0 1px 0 0 rgba(0,45,17,.2); }
    .gh:focus-visible { outline: 2px solid #0969da; outline-offset: 2px; }
    svg { width: 16px; height: 16px; fill: currentColor; flex: none; }
    .menu {
      position: absolute; top: calc(100% + 4px); left: 0; z-index: 10; width: 320px; display: none;
      background: #fff; border-radius: 12px;
      box-shadow: 0 0 0 1px #d1d9e0, 0 6px 12px -3px rgba(37,41,46,.04), 0 6px 18px 0 rgba(37,41,46,.12);
    }
    .gh[aria-expanded="true"] + .menu { display: block; }
    .tabs { display: flex; padding: 0 8px; border-bottom: 1px solid #d1d9e0; }
    .tab { position: relative; flex: 1; height: 40px; border: 0; background: none; font: 600 14px var(--f); color: #1f2328; cursor: pointer; }
    .tab[aria-selected="true"]::after { content: ''; position: absolute; left: 8px; right: 8px; bottom: -1px; height: 2px; border-radius: 6px; background: #fd8c73; }
    .tab:hover { background: rgba(208,215,222,.32); }
    .tab:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; border-radius: 6px; }
    .panel { padding: 16px; }
    .panel[hidden] { display: none; }
    .hd { display: flex; align-items: center; gap: 8px; font-weight: 600; }
    .hd svg { color: #59636e; }
    .sub { display: flex; gap: 16px; margin: 12px 0 8px; border-bottom: 1px solid #d1d9e0; }
    .sub button { position: relative; height: 30px; padding: 0; border: 0; background: none; font: 500 12px var(--f); color: #59636e; cursor: pointer; }
    .sub button[aria-selected="true"] { color: #1f2328; font-weight: 600; }
    .sub button[aria-selected="true"]::after { content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: #fd8c73; }
    .field { display: flex; height: 32px; }
    .field input {
      flex: 1; min-width: 0; height: 32px; padding: 0 8px; border: 1px solid #d1d9e0; border-radius: 6px 0 0 6px; background: #f6f8fa;
      font: 12px/20px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; color: #1f2328;
    }
    .field input:focus { outline: 2px solid #0969da; outline-offset: -2px; }
    .copy { width: 32px; height: 32px; border: 1px solid #d1d9e0; border-left: 0; border-radius: 0 6px 6px 0; background: #f6f8fa; color: #59636e; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
    .copy:hover { background: #eff2f5; }
    .copy .ok { display: none; color: #1a7f37; }
    .copy.done .cp { display: none; }
    .copy.done .ok { display: block; }
    .list { border-top: 1px solid #d1d9e0; padding: 8px; }
    .item { display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 0 8px; border: 0; border-radius: 6px; background: none; font: 400 14px var(--f); color: #1f2328; cursor: pointer; text-align: left; }
    .item:hover, .item:focus-visible { background: rgba(208,215,222,.32); outline: none; }
    .item svg { color: #59636e; }
    .empty { text-align: center; color: #59636e; padding: 8px 0 12px; }
    .create { display: block; margin: 0 auto; height: 32px; padding: 0 12px; border: 1px solid rgba(31,35,40,.15); border-radius: 6px; background: #1f883d; color: #fff; font: 500 14px var(--f); cursor: pointer; }
    .create:hover { background: #1c8139; }
  `,
  html: `
    <div class="wrap">
      <button class="gh" type="button" aria-expanded="false" aria-haspopup="true">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>
        Code
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/></svg>
      </button>
      <div class="menu">
        <div class="tabs" role="tablist">
          <button class="tab" type="button" role="tab" aria-selected="true" data-p="local">Local</button>
          <button class="tab" type="button" role="tab" aria-selected="false" data-p="cs">Codespaces</button>
        </div>
        <div class="panel" data-panel="local">
          <div class="hd"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25Zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25ZM7.25 8a.749.749 0 0 1-.22.53l-2.25 2.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L5.44 8 3.72 6.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.25 2.25c.141.14.22.331.22.53Zm1.5 1.5h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5Z"/></svg>Clone</div>
          <div class="sub" role="tablist">
            <button type="button" role="tab" aria-selected="true" data-u="https://github.com/octocat/Hello-World.git">HTTPS</button>
            <button type="button" role="tab" aria-selected="false" data-u="git@github.com:octocat/Hello-World.git">SSH</button>
            <button type="button" role="tab" aria-selected="false" data-u="gh repo clone octocat/Hello-World">GitHub CLI</button>
          </div>
          <div class="field">
            <input type="text" readonly value="https://github.com/octocat/Hello-World.git" aria-label="Clone URL">
            <button class="copy" type="button" aria-label="Copy url to clipboard">
              <svg class="cp" viewBox="0 0 16 16" aria-hidden="true"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>
              <svg class="ok" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>
            </button>
          </div>
        </div>
        <div class="list" data-panel="local">
          <button class="item" type="button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.927 5.427 2.896 2.896a.25.25 0 0 0 .354 0l2.896-2.896A.25.25 0 0 0 10.896 5H8.75V.75a.75.75 0 1 0-1.5 0V5H5.104a.25.25 0 0 0-.177.427Z"/><path d="M1.573 2.573a.25.25 0 0 0-.073.177v7.5a.25.25 0 0 0 .25.25h12.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25h-3a.75.75 0 1 1 0-1.5h3A1.75 1.75 0 0 1 16 2.75v7.5A1.75 1.75 0 0 1 14.25 12h-3.727c.099 1.041.52 1.872 1.292 2.757A.75.75 0 0 1 11.25 16h-6.5a.75.75 0 0 1-.565-1.243c.772-.885 1.192-1.716 1.292-2.757H1.75A1.75 1.75 0 0 1 0 10.25v-7.5A1.75 1.75 0 0 1 1.75 1h3a.75.75 0 0 1 0 1.5h-3a.25.25 0 0 0-.177.073ZM6.982 12a5.72 5.72 0 0 1-.765 2.5h3.566a5.72 5.72 0 0 1-.765-2.5H6.982Z"/></svg>Open with GitHub Desktop</button>
          <button class="item" type="button"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 1.75v11.5c0 .09.048.173.126.217a.75.75 0 0 1-.752 1.298A1.748 1.748 0 0 1 2 13.25V1.75C2 .784 2.784 0 3.75 0h5.586c.464 0 .909.185 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0 1 12.25 15h-.5a.75.75 0 0 1 0-1.5h.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177L9.513 1.573a.25.25 0 0 0-.177-.073H7.25a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5h-3a.25.25 0 0 0-.25.25Zm3.75 8.75h.5c.966 0 1.75.784 1.75 1.75v3a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-3c0-.966.784-1.75 1.75-1.75ZM6 5.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 6 5.25Zm.75 2.25h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM8 6.75A.75.75 0 0 1 8.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 8 6.75ZM8.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM8 9.75A.75.75 0 0 1 8.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 8 9.75Zm-1 2.5v2.25h1v-2.25a.25.25 0 0 0-.25-.25h-.5a.25.25 0 0 0-.25.25Z"/></svg>Download ZIP</button>
        </div>
        <div class="panel" data-panel="cs" hidden>
          <div class="empty">No codespaces</div>
          <button class="create" type="button">Create codespace on main</button>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap');
    const btn = root.querySelector('.gh');
    const input = root.querySelector('input');
    const copy = root.querySelector('.copy');
    let t;
    const setOpen = (open) => { btn.setAttribute('aria-expanded', String(open)); host?.toggleAttribute('data-open', open); };
    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    const tabs = [...root.querySelectorAll('.tab')];
    tabs.forEach((tb) => tb.addEventListener('click', () => {
      tabs.forEach((x) => x.setAttribute('aria-selected', String(x === tb)));
      root.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== tb.dataset.p; });
    }));
    const subs = [...root.querySelectorAll('.sub button')];
    subs.forEach((s) => s.addEventListener('click', () => { subs.forEach((x) => x.setAttribute('aria-selected', String(x === s))); input.value = s.dataset.u; }));
    copy.addEventListener('click', () => { input.select(); copy.classList.add('done'); clearTimeout(t); t = setTimeout(() => copy.classList.remove('done'), 2000); });
    root.querySelectorAll('.item, .create').forEach((i) => i.addEventListener('click', () => setOpen(false)));
    const onDoc = (e) => { if (!e.composedPath().includes(wrap)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setOpen(false); btn.focus({ preventScroll: true }); } };
    document.addEventListener('pointerdown', onDoc);
    root.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); document.removeEventListener('pointerdown', onDoc); };
  },
};
