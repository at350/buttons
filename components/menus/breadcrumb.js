export default {
  id: 'mn-breadcrumb',
  credit: 'Breadcrumb trail with chevrons and a collapsed "…" segment (Finder / Primer style)',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .bc { display: flex; align-items: center; flex-wrap: nowrap; max-width: 100%; overflow: hidden; background: #fff; border: 1px solid #d0d7de; border-radius: 8px; padding: 4px 6px; font: 14px/1 -apple-system, system-ui, sans-serif; color: #0969da; }
    .c { background: none; border: 0; font: inherit; color: inherit; cursor: pointer; padding: 6px 6px; border-radius: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px; }
    .c:hover { text-decoration: underline; background: #f6f8fa; }
    .c:focus-visible { outline: 2px solid #0969da; outline-offset: -1px; }
    .c[aria-current="page"] { color: #1f2328; font-weight: 600; cursor: default; text-decoration: none; }
    .c.more { color: #656d76; letter-spacing: .1em; }
    .sep { color: #8c959f; flex: none; display: flex; }
    .hid { display: none; }
    .bc.exp .hid { display: inline-flex; align-items: center; }
    .bc.exp .more, .bc.exp .msep { display: none; }
  `,
  html: `
    <nav class="bc" aria-label="Breadcrumb">
      <button class="c" type="button"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="vertical-align:-2px"><path d="M8 1.3l6.7 5.6-.9 1.1-.8-.7V14H3V7.3l-.8.7-.9-1.1zm0 1.9L4.5 6.1V12.6h2.3V9.2h2.4v3.4h2.3V6.1z"/></svg></button>
      <span class="sep"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3.5L10.5 8 6 12.5"/></svg></span>
      <button class="c more" type="button" aria-label="Show hidden paths" aria-expanded="false">···</button>
      <span class="sep msep"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3.5L10.5 8 6 12.5"/></svg></span>
      <span class="hid"><button class="c" type="button">Documents</button><span class="sep"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3.5L10.5 8 6 12.5"/></svg></span></span>
      <span class="hid"><button class="c" type="button">Projects</button><span class="sep"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3.5L10.5 8 6 12.5"/></svg></span></span>
      <button class="c" type="button">Quarterly Review Materials</button>
      <span class="sep"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3.5L10.5 8 6 12.5"/></svg></span>
      <button class="c" type="button" aria-current="page">Report.pdf</button>
    </nav>`,
  init(root) {
    const bc = root.querySelector('.bc');
    const more = root.querySelector('.more');
    more.addEventListener('click', () => { bc.classList.add('exp'); more.setAttribute('aria-expanded', 'true'); });
    const crumbs = [...root.querySelectorAll('.c:not(.more)')];
    crumbs.forEach((c) => c.addEventListener('click', () => crumbs.forEach((x) => (x === c ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current')))));
  },
};
