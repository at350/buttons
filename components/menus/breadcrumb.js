const KEBAB = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/></svg>';
export default {
  id: 'mn-breadcrumb',
  credit: 'GitHub Primer — Breadcrumbs with the overflow "…" ActionMenu (slanted separators, accent links)',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; position: relative; }
    :host([data-open]) { z-index: 30; }
    .card { position: relative; background: #fff; border: 1px solid #d1d9e0; border-radius: 12px; padding: 10px 14px; font: 14px/20px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif; color: #1f2328; }
    ol { display: flex; align-items: center; margin: 0; padding: 0; list-style: none; white-space: nowrap; }
    li { display: inline-flex; align-items: center; font-size: 14px; }
    li:not(:last-child)::after { content: ""; display: inline-block; height: .8em; margin: 0 .5em; border-right: .1em solid #59636e; transform: rotate(15deg) translateY(.0625em); }
    .a { background: none; border: 0; padding: 0; font: inherit; color: #0969da; cursor: pointer; border-radius: 6px; }
    .a:hover { text-decoration: underline; text-underline-offset: .2rem; }
    .a[aria-current="page"] { color: #1f2328; font-weight: 600; cursor: default; text-decoration: none; }
    .a:focus-visible, .ib:focus-visible, .mi:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; box-shadow: none; }
    .a:focus-visible { outline-offset: 2px; }
    .ib { width: 28px; height: 28px; display: grid; place-items: center; padding: 0; border: 0; border-radius: 6px; background: transparent; color: #59636e; cursor: pointer; transition: background-color 80ms cubic-bezier(.33,1,.68,1); }
    .ib:hover { background: rgba(129,139,152,.15); color: #1f2328; }
    .ib:active, .ib[aria-expanded="true"] { background: rgba(129,139,152,.2); color: #1f2328; }
    .ov { position: absolute; top: calc(100% - 4px); left: 40px; min-width: 192px; padding: 8px 0; background: #fff; border-radius: 12px; box-shadow: 0 0 0 1px #d1d9e0, 0 6px 12px -3px rgba(37,41,46,.04), 0 6px 18px 0 rgba(37,41,46,.12); opacity: 0; transform: translateY(-4px); visibility: hidden; transition: opacity 200ms cubic-bezier(.33,1,.68,1), transform 200ms cubic-bezier(.33,1,.68,1), visibility 0s 200ms; }
    .ov.open { opacity: 1; transform: none; visibility: visible; transition: opacity 200ms cubic-bezier(.33,1,.68,1), transform 200ms cubic-bezier(.33,1,.68,1); }
    .mi { display: flex; align-items: center; width: calc(100% - 16px); margin: 0 8px; height: 32px; padding: 6px 8px; border: 0; border-radius: 6px; background: none; font: inherit; color: #1f2328; text-align: left; cursor: pointer; }
    .mi:hover { background: rgba(129,139,152,.15); }
    .mi:active { background: rgba(129,139,152,.24); }
  `,
  html: `
    <nav class="card" aria-label="Breadcrumbs">
      <ol>
        <li><button class="a" type="button">primer</button></li>
        <li><button class="ib" type="button" aria-label="More breadcrumb items" aria-haspopup="true" aria-expanded="false">${KEBAB}</button></li>
        <li><button class="a" type="button">components</button></li>
        <li><button class="a" type="button" aria-current="page">Breadcrumbs.tsx</button></li>
      </ol>
      <div class="ov" role="menu">
        <button class="mi" type="button" role="menuitem">react</button>
        <button class="mi" type="button" role="menuitem">packages</button>
        <button class="mi" type="button" role="menuitem">src</button>
      </div>
    </nav>`,
  init(root, host) {
    const ib = root.querySelector('.ib'), ov = root.querySelector('.ov');
    const items = [...ov.querySelectorAll('.mi')];
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => {
      ib.setAttribute('aria-expanded', String(v)); ov.classList.toggle('open', v); host.toggleAttribute('data-open', v);
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
    };
    ib.addEventListener('click', () => { const v = ib.getAttribute('aria-expanded') !== 'true'; set(v); if (v) items[0].focus({ preventScroll: true }); });
    items.forEach((m) => m.addEventListener('click', () => { set(false); ib.focus({ preventScroll: true }); }));
    const crumbs = [...root.querySelectorAll('.a')];
    crumbs.forEach((c) => c.addEventListener('click', () => crumbs.forEach((x) => (x === c ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current')))));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && ov.classList.contains('open')) { set(false); ib.focus({ preventScroll: true }); }
      if (ov.classList.contains('open') && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const i = items.indexOf(root.activeElement);
        items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus({ preventScroll: true });
      }
    });
    return () => set(false);
  },
};
