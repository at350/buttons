export default {
  id: 'mn-editor-toolbar',
  credit: 'Rich-text editor toolbar — B/I/U/S toggles, alignment radio group, list buttons (Google Docs / Quill)',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .tb { display: flex; align-items: center; gap: 2px; padding: 4px; background: #fff; border: 1px solid #dadce0; border-radius: 8px; box-shadow: 0 1px 3px rgba(60,64,67,.15); flex-wrap: wrap; font: 14px/1 -apple-system, system-ui, sans-serif; color: #3c4043; }
    .b { width: 32px; height: 32px; border: 0; border-radius: 4px; background: none; color: inherit; cursor: pointer; display: grid; place-items: center; padding: 0; transition: background .1s; }
    .b:hover { background: #f1f3f4; }
    .b:active { background: #e8eaed; }
    .b:focus-visible { outline: 2px solid #1a73e8; outline-offset: -2px; }
    .b[aria-pressed="true"], .b[aria-checked="true"] { background: #e8f0fe; color: #1967d2; }
    .b svg { fill: currentColor; }
    .sep { width: 1px; height: 20px; background: #dadce0; margin: 0 4px; }
    .b.bold svg { font-weight: 900; }
  `,
  html: `
    <div class="tb" role="toolbar" aria-label="Formatting">
      <button class="b" type="button" aria-pressed="false" aria-label="Bold"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M15.6 10.8A4 4 0 0013 4H7v16h6.5a4.3 4.3 0 002.1-9.2zM10 6.5h3a1.5 1.5 0 010 3h-3zm3.5 11H10v-3h3.5a1.5 1.5 0 010 3z"/></svg></button>
      <button class="b" type="button" aria-pressed="false" aria-label="Italic"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M10 4v3h2.2l-3.4 10H6v3h8v-3h-2.2l3.4-10H18V4z"/></svg></button>
      <button class="b" type="button" aria-pressed="false" aria-label="Underline"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 17a6 6 0 006-6V3h-2.5v8a3.5 3.5 0 01-7 0V3H6v8a6 6 0 006 6zM5 19v2h14v-2z"/></svg></button>
      <button class="b" type="button" aria-pressed="false" aria-label="Strikethrough"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M10 19h4v-3h-4zM5 4v3h5v3h4V7h5V4zM3 14h18v-2H3z"/></svg></button>
      <span class="sep"></span>
      <span role="radiogroup" aria-label="Alignment" style="display:contents">
        <button class="b al" type="button" role="radio" aria-checked="true" aria-label="Align left"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M15 15H3v2h12zm0-8H3v2h12zM3 13h18v-2H3zm0 8h18v-2H3zM3 3v2h18V3z"/></svg></button>
        <button class="b al" type="button" role="radio" aria-checked="false" aria-label="Align center"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M7 15v2h10v-2zm-4 6h18v-2H3zm0-8h18v-2H3zm4-6v2h10V7zM3 3v2h18V3z"/></svg></button>
        <button class="b al" type="button" role="radio" aria-checked="false" aria-label="Align right"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 21h18v-2H3zm6-4h12v-2H9zm-6-4h18v-2H3zm6-4h12V7H9zM3 3v2h18V3z"/></svg></button>
        <button class="b al" type="button" role="radio" aria-checked="false" aria-label="Justify"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 21h18v-2H3zm0-4h18v-2H3zm0-4h18v-2H3zm0-4h18V7H3zm0-6v2h18V3z"/></svg></button>
      </span>
      <span class="sep"></span>
      <button class="b" type="button" aria-pressed="false" aria-label="Bulleted list"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM7 19h14v-2H7zm0-6h14v-2H7zm0-8v2h14V5z"/></svg></button>
      <button class="b" type="button" aria-pressed="false" aria-label="Numbered list"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2zm1-9h1V4H2v1h1zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2zm5-6v2h14V5zm0 14h14v-2H7zm0-6h14v-2H7z"/></svg></button>
      <span class="sep"></span>
      <button class="b" type="button" aria-pressed="false" aria-label="Link"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M3.9 12a3.1 3.1 0 013.1-3.1h4V7H7a5 5 0 000 10h4v-1.9H7A3.1 3.1 0 013.9 12zM8 13h8v-2H8zm9-6h-4v1.9h4a3.1 3.1 0 010 6.2h-4V17h4a5 5 0 000-10z"/></svg></button>
    </div>`,
  init(root) {
    root.querySelectorAll('[aria-pressed]').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
    const als = [...root.querySelectorAll('.al')];
    als.forEach((a, i) => {
      a.addEventListener('click', () => als.forEach((x) => x.setAttribute('aria-checked', x === a)));
      a.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = als[(i + (e.key === 'ArrowRight' ? 1 : -1) + als.length) % als.length]; n.click(); n.focus({ preventScroll: true }); } });
    });
  },
};
