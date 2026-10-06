// Primer Octicons (MIT): triangle-down-16, check-16.
const TRI = '<svg class="oc tri" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/></svg>';
const CHECK = '<svg class="oc" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>';
const OPTS = ['Newest', 'Oldest', 'Most commented', 'Least commented', 'Recently updated'];

export default {
  id: 'mn-github-select',
  credit: 'GitHub Primer ActionMenu — single-select sort menu (Button + Overlay + ActionList with check)',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap {
      --fg: #1f2328; --muted: #59636e; --border: #d1d9e0; --ease: cubic-bezier(0.33, 1, 0.68, 1);
      position: relative; display: inline-block;
      font: 14px/20px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      color: var(--fg);
    }
    .btn {
      display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 12px; margin: 0;
      background: #f6f8fa; color: var(--fg); border: 1px solid var(--border); border-radius: 6px;
      box-shadow: 0 1px 0 0 #1f23280a; font: inherit; font-weight: 500; cursor: pointer; white-space: nowrap;
      transition: background-color 80ms var(--ease), border-color 80ms var(--ease);
    }
    .btn:hover { background: #eff2f5; border-color: #d1d9e0; }
    .btn:active, .btn[aria-expanded="true"] { background: #e6eaef; border-color: #d1d9e0; }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; box-shadow: none; }
    .lbl { color: var(--muted); font-weight: 400; }
    .val { display: inline-grid; text-align: left; }
    .val > span { grid-area: 1 / 1; visibility: hidden; }
    .val > span.on { visibility: visible; }
    .oc { display: block; flex: none; }
    .tri { color: var(--muted); margin-right: -4px; }
    .ov {
      position: absolute; top: calc(100% + 4px); left: 0; min-width: 192px; padding: 8px 0;
      background: #fff; border-radius: 12px;
      box-shadow: 0 0 0 1px #d1d9e080, 0 6px 12px -3px #25292e0a, 0 6px 18px 0 #25292e1f;
      visibility: hidden; opacity: 0; transition: opacity 200ms var(--ease), visibility 0s 200ms;
    }
    .ov.on { visibility: visible; opacity: 1; transition: opacity 200ms var(--ease), visibility 0s; }
    ul { list-style: none; margin: 0; padding: 0; }
    .gh { padding: 6px 16px; font-size: 12px; line-height: 18px; font-weight: 600; color: var(--muted); }
    .it {
      display: flex; align-items: center; gap: 8px; width: calc(100% - 16px); min-height: 32px; margin: 0 8px; padding: 6px 8px;
      border: 0; border-radius: 6px; background: transparent; color: var(--fg); font: inherit; text-align: left;
      cursor: pointer; white-space: nowrap; transition: background-color 80ms var(--ease);
    }
    .it:hover, .it:focus-visible { background: #818b981a; outline: none; }
    .it:active { background: #818b9826; }
    .it .ck { display: flex; width: 16px; visibility: hidden; color: var(--fg); }
    .it[aria-checked="true"] .ck { visibility: inherit; }
  `,
  html: `
    <div class="wrap">
      <button class="btn" type="button" aria-haspopup="true" aria-expanded="false"><span class="lbl">Sort:</span><span class="val">${OPTS.map((o, i) => `<span${i ? '' : ' class="on"'}>${o}</span>`).join('')}</span>${TRI}</button>
      <div class="ov" role="menu" aria-label="Sort by">
        <div class="gh" aria-hidden="true">Sort by</div>
        <ul>${OPTS.map((o, i) => `<li role="none"><button class="it" type="button" role="menuitemradio" aria-checked="${i === 0}" tabindex="-1"><span class="ck">${CHECK}</span>${o}</button></li>`).join('')}</ul>
      </div>
    </div>`,
  init(root, host) {
    const btn = root.querySelector('.btn'), ov = root.querySelector('.ov');
    const vals = [...root.querySelectorAll('.val > span')], its = [...root.querySelectorAll('.it')];
    let open = false;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v, focusFirst) => {
      open = v;
      btn.setAttribute('aria-expanded', String(v));
      ov.classList.toggle('on', v);
      host.toggleAttribute('data-open', v);
      document.removeEventListener('pointerdown', onDoc, true);
      if (v) {
        document.addEventListener('pointerdown', onDoc, true);
        if (focusFirst) (its.find((i) => i.getAttribute('aria-checked') === 'true') || its[0]).focus({ preventScroll: true });
      }
    };
    btn.addEventListener('click', (e) => set(!open, e.detail === 0));
    btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); set(true, true); } });
    its.forEach((it, i) => it.addEventListener('click', () => {
      its.forEach((x) => x.setAttribute('aria-checked', String(x === it)));
      vals.forEach((v, j) => v.classList.toggle('on', j === i));
      set(false); btn.focus({ preventScroll: true });
    }));
    ov.addEventListener('keydown', (e) => {
      const i = its.indexOf(root.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); its[(i + (e.key === 'ArrowDown' ? 1 : -1) + its.length) % its.length].focus({ preventScroll: true }); }
      else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); its[e.key === 'Home' ? 0 : its.length - 1].focus({ preventScroll: true }); }
      else if (e.key === 'Tab') set(false);
    });
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) { set(false); btn.focus({ preventScroll: true }); } });
    return () => set(false);
  },
};
