// GitHub merge box: split "Merge pull request" button whose caret opens the merge-method menu (a data-open popover).
// All three method labels and the "Merged" state label are stacked in one grid cell, so the box is the widest of them.
export default {
  id: 'bt-github-merge',
  credit: 'GitHub Primer — "Merge pull request" split button with merge-method menu, then the purple "Merged" state',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { --f: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif; position: relative; display: grid; font: 400 14px/20px var(--f); color: #1f2328; }
    .grp, .state { grid-area: 1 / 1; }
    .grp { display: inline-flex; justify-self: start; }
    .gh {
      height: 32px; padding: 0 12px; border: 1px solid rgba(31,35,40,.15); color: #fff; cursor: pointer; white-space: nowrap;
      background: #1f883d; box-shadow: 0 1px 0 0 rgba(31,35,40,.1); font: 500 14px/20px var(--f);
      display: inline-grid; align-items: center; transition: background 80ms cubic-bezier(.65,0,.35,1); -webkit-tap-highlight-color: transparent;
    }
    .gh:hover { background: #1c8139; }
    .gh:active, .caret[aria-expanded="true"] { background: #197935; box-shadow: inset 0 1px 0 0 rgba(0,45,17,.2); }
    .gh:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; z-index: 1; }
    .main { border-radius: 6px 0 0 6px; }
    .main span { grid-area: 1 / 1; text-align: center; visibility: hidden; }
    .main span.on { visibility: visible; }
    .caret { border-radius: 0 6px 6px 0; border-left: 0; padding: 0 8px; box-shadow: inset 1px 0 0 rgba(31,35,40,.15), 0 1px 0 0 rgba(31,35,40,.1); }
    svg { width: 16px; height: 16px; fill: currentColor; display: block; }
    .state {
      display: none; justify-self: start; align-items: center; gap: 4px; height: 32px; padding: 0 12px; border: 0; border-radius: 2em;
      background: #8250df; color: #fff; font: 500 14px/20px var(--f); cursor: pointer; white-space: nowrap;
    }
    .state:focus-visible { outline: 2px solid #0969da; outline-offset: 2px; }
    .wrap.merged .grp, .wrap.merged .grp * { visibility: hidden !important; }
    .wrap.merged .state { display: inline-flex; animation: in .2s cubic-bezier(.33,1,.68,1); }
    @keyframes in { from { opacity: 0; transform: scale(.96); } }
    .menu {
      position: absolute; top: calc(100% + 4px); left: 0; z-index: 10; width: 296px; padding: 8px; display: none;
      background: #fff; border-radius: 12px; box-shadow: 0 0 0 1px #d1d9e0, 0 6px 12px -3px rgba(37,41,46,.04), 0 6px 18px 0 rgba(37,41,46,.12);
    }
    .wrap.open .menu { display: block; }
    .opt { display: flex; gap: 8px; width: 100%; padding: 6px 8px; border: 0; border-radius: 6px; background: none; text-align: left; cursor: pointer; font: 400 14px/20px var(--f); color: #1f2328; }
    .opt:hover, .opt:focus-visible { background: rgba(208,215,222,.32); outline: none; }
    .opt .ck { visibility: hidden; margin-top: 2px; }
    .opt[aria-checked="true"] .ck { visibility: visible; }
    .opt b { display: block; font-weight: 600; }
  `,
  html: `
    <div class="wrap">
      <div class="grp">
        <button class="gh main" type="button"><span class="on">Merge pull request</span><span>Squash and merge</span><span>Rebase and merge</span></button>
        <button class="gh caret" type="button" aria-label="Select merge method" aria-haspopup="true" aria-expanded="false"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/></svg></button>
      </div>
      <button class="state" type="button" aria-label="Merged. Click to reopen">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"/></svg>Merged
      </button>
      <div class="menu" role="menu">
        <button class="opt" type="button" role="menuitemradio" aria-checked="true" data-i="0"><svg class="ck" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg><span><b>Create a merge commit</b></span></button>
        <button class="opt" type="button" role="menuitemradio" aria-checked="false" data-i="1"><svg class="ck" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg><span><b>Squash and merge</b></span></button>
        <button class="opt" type="button" role="menuitemradio" aria-checked="false" data-i="2"><svg class="ck" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg><span><b>Rebase and merge</b></span></button>
      </div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap');
    const main = root.querySelector('.main');
    const caret = root.querySelector('.caret');
    const state = root.querySelector('.state');
    const labels = [...main.querySelectorAll('span')];
    const opts = [...root.querySelectorAll('.opt')];
    const setOpen = (open) => { caret.setAttribute('aria-expanded', String(open)); wrap.classList.toggle('open', open); host?.toggleAttribute('data-open', open); };
    caret.addEventListener('click', () => setOpen(caret.getAttribute('aria-expanded') !== 'true'));
    opts.forEach((o) => o.addEventListener('click', () => {
      opts.forEach((x) => x.setAttribute('aria-checked', String(x === o)));
      labels.forEach((l, i) => l.classList.toggle('on', i === +o.dataset.i));
      setOpen(false); main.focus({ preventScroll: true });
    }));
    main.addEventListener('click', () => { setOpen(false); wrap.classList.add('merged'); state.focus({ preventScroll: true }); });
    state.addEventListener('click', () => { wrap.classList.remove('merged'); main.focus({ preventScroll: true }); });
    const onDoc = (e) => { if (!e.composedPath().includes(wrap)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape' && caret.getAttribute('aria-expanded') === 'true') { setOpen(false); caret.focus({ preventScroll: true }); } };
    document.addEventListener('pointerdown', onDoc);
    root.addEventListener('keydown', onKey);
    return () => document.removeEventListener('pointerdown', onDoc);
  },
};
