// Windows 11 desktop context menu. Icons: Fluent UI System Icons (MIT), 20px regular set.
const I = {"cut": "M5.92 2.23a.5.5 0 0 0-.84.54L9.4 9.43l-1.92 2.96a3 3 0 1 0 .78.64L10 10.35l1.74 2.68a3 3 0 1 0 .78-.64zM14 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4M4 15a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7.2-6.49-.6-.92 3.48-5.36a.5.5 0 0 1 .84.54z", "copy": "M7 7H5.5C4.67 7 4 7.67 4 8.5v6c0 .83.67 1.5 1.5 1.5h4c.65 0 1.2-.42 1.41-1h1.04a2.5 2.5 0 0 1-2.45 2h-4A2.5 2.5 0 0 1 3 14.5v-6A2.5 2.5 0 0 1 5.5 6H7zm7.5-4A2.5 2.5 0 0 1 17 5.5v6a2.5 2.5 0 0 1-2.5 2.5h-4A2.5 2.5 0 0 1 8 11.5v-6A2.5 2.5 0 0 1 10.5 3zm-4 1C9.67 4 9 4.67 9 5.5v6c0 .83.67 1.5 1.5 1.5h4c.83 0 1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5z", "clipboard_paste": "M4.5 4h1.59c.2.58.76 1 1.41 1h3c.65 0 1.2-.42 1.41-1h1.59c.28 0 .5.22.5.5v1a.5.5 0 0 0 1 0v-1c0-.83-.67-1.5-1.5-1.5h-1.59c-.2-.58-.76-1-1.41-1h-3c-.65 0-1.2.42-1.41 1H4.5C3.67 3 3 3.67 3 4.5v12c0 .83.67 1.5 1.5 1.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 1-.5-.5v-12c0-.28.22-.5.5-.5m3 0a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm3 3C9.67 7 9 7.67 9 8.5v8c0 .83.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5v-8c0-.83-.67-1.5-1.5-1.5zM10 8.5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5v8a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z", "rename": "M11.5 2a.5.5 0 0 1 0 1h-1v14h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V3h-1a.5.5 0 0 1 0-1zm-3 3H5a2 2 0 0 0-2 2v6c0 1.1.9 2 2 2h3.5v1H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h3.5zM15 4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3.5v-1H15a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.5V4z", "share": "M9.5 3a.5.5 0 0 1 0 1H6a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1.5a.5.5 0 0 1 1 0V14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm3.8-.96a.5.5 0 0 1 .53.09l5 4.5a.5.5 0 0 1 0 .74l-5 4.5a.5.5 0 0 1-.83-.37V9.34c-1.4.13-2.67.78-3.7 1.6a10 10 0 0 0-2.2 2.5l-.15.28A.5.5 0 0 1 6 13.5c0-2.05.38-4.28 1.52-6.02A6.6 6.6 0 0 1 13 4.5V2.43a.5.5 0 0 1 .3-.39M14 5a.5.5 0 0 1-.5.5c-2.59 0-4.18 1.05-5.14 2.52a9 9 0 0 0-1.25 3.69 11 11 0 0 1 1.56-1.54 7.8 7.8 0 0 1 4.83-1.85c.28 0 .5.22.5.5v1.56L17.75 7 14 3.62z", "delete": "M8.5 4h3a1.5 1.5 0 0 0-3 0m-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.05l-1.2 10.34A3 3 0 0 1 12.27 18H7.73a3 3 0 0 1-2.98-2.66L3.55 5H2.5a.5.5 0 0 1 0-1zM5.74 15.23A2 2 0 0 0 7.73 17h4.54a2 2 0 0 0 1.99-1.77L15.44 5H4.56zM8.5 7.5c.28 0 .5.22.5.5v6a.5.5 0 0 1-1 0V8c0-.28.22-.5.5-.5M12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z", "grid": "M7.5 11c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4A1.5 1.5 0 0 1 2 16.5v-4c0-.83.67-1.5 1.5-1.5zm9 0c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-4c0-.83.67-1.5 1.5-1.5zm-9 1h-4a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5m9 0h-4a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5m-9-10C8.33 2 9 2.67 9 3.5v4C9 8.33 8.33 9 7.5 9h-4A1.5 1.5 0 0 1 2 7.5v-4C2 2.67 2.67 2 3.5 2zm9 0c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4A1.5 1.5 0 0 1 11 7.5v-4c0-.83.67-1.5 1.5-1.5zm-9 1h-4a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5m9 0h-4a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5", "arrow_sort": "M2.35 7.35 5 4.71V16.5a.5.5 0 0 0 1 0V4.7l2.65 2.65a.5.5 0 0 0 .7-.7l-3.49-3.5A.5.5 0 0 0 5.5 3a.5.5 0 0 0-.39.18L1.65 6.65a.5.5 0 1 0 .7.7m15.3 5.3L15 15.29V3.5a.5.5 0 0 0-1 0v11.8l-2.65-2.65a.5.5 0 0 0-.7.7l3.49 3.5a.5.5 0 0 0 .36.15.5.5 0 0 0 .39-.18l3.46-3.47a.5.5 0 1 0-.7-.7", "arrow_clockwise": "M4 10a6 6 0 0 1 10.47-4H12.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-1 0v1.6a7 7 0 1 0 1.98 4.36.5.5 0 1 0-1 .08L16 10a6 6 0 0 1-12 0", "add_circle": "M6 10c0-.28.22-.5.5-.5h3v-3a.5.5 0 0 1 1 0v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3A.5.5 0 0 1 6 10m4 8a8 8 0 1 0 0-16 8 8 0 0 0 0 16m0-1a7 7 0 1 1 0-14 7 7 0 0 1 0 14", "desktop": "M4 2a2 2 0 0 0-2 2v9c0 1.1.9 2 2 2h3v2H5.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1H13v-2h3a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm8 13v2H8v-2zM3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", "paint_brush": "M5.5 2a.5.5 0 0 0-.5.5V11c0 1.1.9 2 2 2h1v3a2 2 0 1 0 4 0v-3h1a2 2 0 0 0 2-2V2.5a.5.5 0 0 0-.5-.5zm.5 8h8v1a1 1 0 0 1-1 1h-1.5a.5.5 0 0 0-.5.5V16a1 1 0 1 1-2 0v-3.5a.5.5 0 0 0-.5-.5H7a1 1 0 0 1-1-1zm8-1H6V3h4v1.5a.5.5 0 0 0 1 0V3h1v2.5a.5.5 0 0 0 1 0V3h1z", "open": "M6 4a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-2.5a.5.5 0 0 1 1 0V14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h2.5a.5.5 0 0 1 0 1zm5-.5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5v5a.5.5 0 0 1-1 0V4.7l-4.15 4.15a.5.5 0 0 1-.7-.7L15.29 4H11.5a.5.5 0 0 1-.5-.5", "chevron_right": "M7.65 4.15c.2-.2.5-.2.7 0l5.49 5.46c.21.22.21.57 0 .78l-5.49 5.47a.5.5 0 0 1-.7-.71L12.8 10 7.65 4.85a.5.5 0 0 1 0-.7", "checkmark": "M3.37 10.17a.5.5 0 0 0-.74.66l4 4.5c.19.22.52.23.72.02l10.5-10.5a.5.5 0 0 0-.7-.7L7.02 14.27z", "dot": "M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16", "folder": "M4.5 3A2.5 2.5 0 0 0 2 5.5v9A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 15.5 5H9.7L8.23 3.51A1.8 1.8 0 0 0 6.98 3zM3 5.5C3 4.67 3.67 4 4.5 4h2.48q.32 0 .53.22L8.8 5.5 7.44 6.85a.5.5 0 0 1-.35.15H3zM3 8h4.09c.4 0 .78-.16 1.06-.44L9.7 6h5.79c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5z", "link": "M8 6a.5.5 0 0 1 .09 1H6a3 3 0 0 0-.2 6H8a.5.5 0 0 1 .09 1H6a4 4 0 0 1-.22-8H8m6 0a4 4 0 0 1 .22 8H12a.5.5 0 0 1-.09-1H14a3 3 0 0 0 .2-6H12a.5.5 0 0 1-.09-1H14M6 9.5h8a.5.5 0 0 1 .09 1H6a.5.5 0 0 1-.09-1zh8z", "image": "M14 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-2a2 2 0 0 0-2 2v8q0 .56.28 1.02l4.67-4.59a1.5 1.5 0 0 1 2.1 0l4.67 4.59Q16 14.56 16 14V6a2 2 0 0 0-2-2zm0 12h8a2 2 0 0 0 1.01-.27l-4.66-4.58a.5.5 0 0 0-.7 0l-4.66 4.58A2 2 0 0 0 6 16", "document": "M6 2a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V7.41c0-.4-.16-.78-.44-1.06l-3.91-3.91A1.5 1.5 0 0 0 10.59 2zM5 4a1 1 0 0 1 1-1h4v3.5c0 .83.67 1.5 1.5 1.5H15v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm9.8 3h-3.3a.5.5 0 0 1-.5-.5V3.2z", "document_text": "M6.5 10a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zM4 4c0-1.1.9-2 2-2h4.59q.62.01 1.06.44l3.91 3.91c.28.28.44.67.44 1.06V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8h-3.5A1.5 1.5 0 0 1 10 6.5V3zm5.5 4h3.3L11 3.2v3.3c0 .28.22.5.5.5", "folder_zip": "M6.98 3c.47 0 .91.18 1.24.51L9.71 5h5.79A2.5 2.5 0 0 1 18 7.5v7a2.5 2.5 0 0 1-2.5 2.5H15v.54c0 .25-.2.46-.46.46h-3.08l-.1-.01a.46.46 0 0 1-.36-.45V17H4.5A2.5 2.5 0 0 1 2 14.5v-9A2.5 2.5 0 0 1 4.5 3zM13 13a1 1 0 0 0-1 1v3h2v-3a1 1 0 0 0-1-1M8.15 7.56A1.5 1.5 0 0 1 7.09 8H3v6.5c0 .83.67 1.5 1.5 1.5H11v-2a2 2 0 1 1 4 0v2h.5c.83 0 1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5H9.7zM13 12h-1.5a.5.5 0 0 1 0-1H13zm1.5-2a.5.5 0 0 1 0 1H13v-1zM13 10h-1.5a.5.5 0 0 1 0-1H13zm1.5-2a.5.5 0 0 1 0 1H13V8zM13 8h-1.5a.5.5 0 0 1 0-1H13zM4.5 4C3.67 4 3 4.67 3 5.5V7h4.09a.5.5 0 0 0 .35-.15L8.79 5.5 7.51 4.22A.8.8 0 0 0 6.98 4z"};
const ic = (n, s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="${I[n]}"/></svg>`;
const row = (icon, label, opts = {}) => `<button class="r" type="button" role="${opts.role || 'menuitem'}" tabindex="-1"${opts.sub ? ` aria-haspopup="menu" aria-expanded="false" data-sub="${opts.sub}"` : ''}${opts.on != null ? ` aria-checked="${opts.on}"` : ''}><span class="i">${icon ? ic(icon) : opts.mark || ''}</span><span class="l">${label}</span>${opts.k ? `<span class="k">${opts.k}</span>` : ''}${opts.sub ? `<span class="ch">${ic('chevron_right', 12)}</span>` : ''}</button>`;
const SEP = '<div class="sep" role="separator"></div>';
const DOT = `<svg width="6" height="6" viewBox="0 0 20 20" fill="currentColor"><path d="${I.dot}"/></svg>`;
const radio = (label, k, on) => row(null, label, { role: 'menuitemradio', k, on, mark: on ? DOT : '' });
const check = (label, on) => row(null, label, { role: 'menuitemcheckbox', on, mark: on ? ic('checkmark', 16) : '' });
const SUBS = {
  view: [radio('Large icons', 'Ctrl+Shift+2', false), radio('Medium icons', 'Ctrl+Shift+3', true), radio('Small icons', 'Ctrl+Shift+4', false), SEP, check('Auto arrange icons', false), check('Align icons to grid', true), SEP, check('Show desktop icons', true)],
  sort: [radio('Name', '', true), radio('Size', '', false), radio('Item type', '', false), radio('Date modified', '', false)],
  new: [row('folder', 'Folder'), row('link', 'Shortcut'), SEP, row('image', 'Bitmap image'), row('document', 'Rich Text Document'), row('document_text', 'Text Document'), row('folder_zip', 'Compressed (zipped) Folder')],
};

export default {
  id: 'mn-win11-context',
  credit: 'Windows 11 desktop context menu — acrylic flyout, Fluent icons, compact command row, cascading submenus',
  size: 'wide',
  css: `
    :host { display: block; }
    :host([data-open]) { z-index: 30; }
    .stage { position: relative; width: 600px; max-width: 100%; height: 336px; border-radius: 12px; overflow: hidden; cursor: default; user-select: none; outline: 0;
      background: radial-gradient(60% 55% at 50% 58%, rgba(255,255,255,.55), rgba(255,255,255,0) 70%), linear-gradient(180deg, #e3eefb 0%, #b9d3f2 55%, #93b8e8 100%);
      font: 400 14px/20px "Segoe UI Variable Text", "Segoe UI Variable", "Segoe UI", system-ui, sans-serif; color: rgba(0,0,0,.896); }
    .stage:focus-visible { box-shadow: inset 0 0 0 2px #000, inset 0 0 0 3px #fff; }
    .bloom { position: absolute; left: 50%; top: 56%; width: 300px; height: 300px; margin: -150px 0 0 -150px; pointer-events: none; }
    .cm, .sm { position: absolute; left: 0; top: 0; z-index: 2; min-width: 236px; padding: 4px 0; border-radius: 8px; display: none;
      background: rgba(249,249,249,.85); -webkit-backdrop-filter: blur(30px) saturate(1.25); backdrop-filter: blur(30px) saturate(1.25);
      box-shadow: 0 0 0 1px rgba(0,0,0,.0578), 0 8px 16px rgba(0,0,0,.14); }
    .sm { z-index: 3; min-width: 0; white-space: nowrap; }
    .cm.open, .sm.open { display: block; animation: fly .25s cubic-bezier(0,0,0,1); }
    .up.open { animation-name: flyup; }
    @keyframes fly { from { opacity: 0; transform: translateY(-12px); clip-path: inset(0 0 60% 0 round 8px); } to { clip-path: inset(0 0 0 0 round 8px); } }
    @keyframes flyup { from { opacity: 0; transform: translateY(12px); clip-path: inset(60% 0 0 0 round 8px); } to { clip-path: inset(0 0 0 0 round 8px); } }
    .bar { display: flex; justify-content: space-between; padding: 0 4px 4px; }
    .ib { position: relative; width: 40px; height: 36px; border: 0; border-radius: 4px; background: none; color: rgba(0,0,0,.896); display: grid; place-items: center; padding: 0; cursor: default; outline: 0; }
    .ib:hover, .r:hover, .r.hl, .ib:focus-visible, .r:focus-visible { background: rgba(0,0,0,.0373); }
    .ib:active, .r:active { background: rgba(0,0,0,.0241); color: rgba(0,0,0,.6063); }
    .ib:focus-visible, .r:focus-visible { box-shadow: inset 0 0 0 2px rgba(0,0,0,.896); }
    .ib::after { content: attr(aria-label); position: absolute; top: calc(100% + 6px); left: 50%; transform: translateX(-50%); z-index: 4; padding: 5px 8px 6px; border-radius: 4px; background: #f9f9f9; box-shadow: 0 0 0 1px rgba(0,0,0,.0578), 0 4px 8px rgba(0,0,0,.14); font-size: 12px; line-height: 16px; white-space: nowrap; opacity: 0; visibility: hidden; transition: opacity .1s, visibility 0s .1s; pointer-events: none; }
    .ib:hover::after { opacity: 1; visibility: visible; transition: opacity .15s .6s, visibility 0s .6s; }
    .r { display: flex; align-items: center; width: calc(100% - 8px); height: 32px; margin: 0 4px; padding: 0 12px 0 12px; border: 0; border-radius: 4px; background: none; font: inherit; color: inherit; cursor: default; text-align: left; white-space: nowrap; outline: 0; }
    .r .i { width: 16px; height: 16px; margin-right: 16px; flex: none; display: grid; place-items: center; }
    .r .l { flex: 1; padding-right: 24px; }
    .r .k { color: rgba(0,0,0,.6063); font-size: 12px; margin-left: auto; }
    .r .ch { display: grid; place-items: center; color: rgba(0,0,0,.6063); margin-left: auto; }
    .r[aria-expanded="true"] { background: rgba(0,0,0,.0373); }
    .sep { height: 1px; margin: 4px 0; background: rgba(0,0,0,.0803); }
  `,
  html: `
    <div class="stage" tabindex="0" role="application" aria-label="Desktop" aria-haspopup="menu">
      <svg class="bloom" viewBox="-100 -100 200 200" aria-hidden="true"><defs>
        <linearGradient id="w11a" x1="0" y1="-1" x2="0" y2="1"><stop offset="0" stop-color="#7fb4ff"/><stop offset=".55" stop-color="#1a5fe0"/><stop offset="1" stop-color="#0a2f9c"/></linearGradient>
        <linearGradient id="w11b" x1="0" y1="-1" x2="0" y2="1"><stop offset="0" stop-color="#c8ddff"/><stop offset="1" stop-color="#3b7cf0"/></linearGradient></defs>
        ${[-64, -32, 0, 32, 64].map((a, i) => `<path d="M0 46 C-34 18 -30 -40 0 -78 C30 -40 34 18 0 46Z" fill="url(#${i % 2 ? 'w11b' : 'w11a'})" opacity="${i % 2 ? .7 : .92}" transform="rotate(${a})"/>`).join('')}
      </svg>
      <div class="cm" role="menu" aria-label="Context menu">
        <div class="bar" role="group">
          <button class="ib" type="button" tabindex="-1" aria-label="Cut">${ic('cut')}</button>
          <button class="ib" type="button" tabindex="-1" aria-label="Copy">${ic('copy')}</button>
          <button class="ib" type="button" tabindex="-1" aria-label="Paste">${ic('clipboard_paste')}</button>
          <button class="ib" type="button" tabindex="-1" aria-label="Rename">${ic('rename')}</button>
          <button class="ib" type="button" tabindex="-1" aria-label="Share">${ic('share')}</button>
          <button class="ib" type="button" tabindex="-1" aria-label="Delete">${ic('delete')}</button>
        </div>
        ${SEP}
        ${row('grid', 'View', { sub: 'view' })}
        ${row('arrow_sort', 'Sort by', { sub: 'sort' })}
        ${row('arrow_clockwise', 'Refresh')}
        ${SEP}
        ${row('add_circle', 'New', { sub: 'new' })}
        ${SEP}
        ${row('desktop', 'Display settings')}
        ${row('paint_brush', 'Personalize')}
        ${SEP}
        ${row('open', 'Show more options', { k: 'Shift+F10' })}
      </div>
      ${Object.entries(SUBS).map(([k, items]) => `<div class="sm" role="menu" data-id="${k}">${items.join('')}</div>`).join('')}
    </div>`,
  init(root, host) {
    const stage = root.querySelector('.stage'), cm = root.querySelector('.cm');
    const subs = Object.fromEntries([...root.querySelectorAll('.sm')].map((s) => [s.dataset.id, s]));
    let open = false, subOpen = null, timer = 0;
    const rows = (m) => [...m.querySelectorAll(':scope > .r')];
    const onDoc = (e) => { if (!e.composedPath().includes(host)) close(); };
    const closeSub = () => {
      if (!subOpen) return;
      subOpen.classList.remove('open', 'up');
      const r = cm.querySelector(`[data-sub="${subOpen.dataset.id}"]`); r.setAttribute('aria-expanded', 'false');
      subOpen = null;
    };
    const close = () => {
      clearTimeout(timer); closeSub();
      if (!open) return; open = false;
      cm.classList.remove('open', 'up'); host.removeAttribute('data-open');
      document.removeEventListener('pointerdown', onDoc, true);
    };
    const openAt = (x, y) => {
      closeSub(); cm.classList.remove('open', 'up'); void cm.offsetWidth;
      cm.classList.add('open'); open = true; host.setAttribute('data-open', '');
      const W = stage.clientWidth, H = stage.clientHeight, w = cm.offsetWidth, h = cm.offsetHeight;
      const up = y + h > H - 4 && y - h >= 4;
      cm.classList.toggle('up', up);
      cm.style.left = Math.max(4, Math.min(x, W - w - 4)) + 'px';
      cm.style.top = (up ? y - h : Math.max(4, Math.min(y, H - h - 4))) + 'px';
      document.addEventListener('pointerdown', onDoc, true);
    };
    const showSub = (r, focusFirst) => {
      const s = subs[r.dataset.sub]; if (subOpen === s) { if (focusFirst) rows(s)[0].focus({ preventScroll: true }); return; }
      closeSub(); subOpen = s; r.setAttribute('aria-expanded', 'true');
      s.classList.add('open');
      const W = stage.clientWidth, H = stage.clientHeight, w = s.offsetWidth, h = s.offsetHeight;
      const L = cm.offsetLeft, T = cm.offsetTop + r.offsetTop - 4;
      let x = L + cm.offsetWidth - 2; if (x + w > W - 4) x = L - w + 2 >= 4 ? L - w + 2 : W - w - 4;
      s.style.left = Math.max(4, x) + 'px'; s.style.top = Math.max(4, Math.min(T, H - h - 4)) + 'px';
      if (focusFirst) rows(s)[0].focus({ preventScroll: true });
    };
    stage.addEventListener('contextmenu', (e) => { e.preventDefault(); const b = stage.getBoundingClientRect(); openAt(e.clientX - b.left, e.clientY - b.top); });
    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.cm, .sm')) return;
      if (e.button === 0) { if (open) close(); else { const b = stage.getBoundingClientRect(); openAt(e.clientX - b.left, e.clientY - b.top); } }
    });
    cm.querySelectorAll(':scope > .r').forEach((r) => {
      r.addEventListener('pointerenter', () => {
        clearTimeout(timer);
        if (r.dataset.sub) timer = setTimeout(() => showSub(r), 250);
        else if (subOpen) timer = setTimeout(closeSub, 250);
      });
    });
    root.querySelectorAll('.r, .ib').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.sub) { clearTimeout(timer); showSub(b, false); return; }
      const role = b.getAttribute('role');
      if (role === 'menuitemradio') b.parentElement.querySelectorAll('[role="menuitemradio"]').forEach((x) => { const on = x === b; x.setAttribute('aria-checked', on); x.firstElementChild.innerHTML = on ? `<svg width="6" height="6" viewBox="0 0 20 20" fill="currentColor"><path d="${I.dot}"/></svg>` : ''; });
      if (role === 'menuitemcheckbox') { const on = b.getAttribute('aria-checked') !== 'true'; b.setAttribute('aria-checked', on); b.firstElementChild.innerHTML = on ? ic('checkmark') : ''; }
      close(); stage.focus({ preventScroll: true });
    }));
    stage.addEventListener('keydown', (e) => {
      const a = root.activeElement;
      if (!open) {
        if (e.target === stage && (e.key === 'Enter' || e.key === ' ' || e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10'))) { e.preventDefault(); openAt(40, 24); rows(cm)[0].focus({ preventScroll: true }); }
        return;
      }
      const menu = a && a.closest('.sm') ? a.closest('.sm') : cm;
      if (e.key === 'Escape') { e.preventDefault(); if (menu !== cm) { const p = cm.querySelector(`[data-sub="${menu.dataset.id}"]`); closeSub(); p.focus({ preventScroll: true }); } else { close(); stage.focus({ preventScroll: true }); } }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); const rs = rows(menu), i = rs.indexOf(a), d = e.key === 'ArrowDown' ? 1 : -1; rs[i < 0 ? (d > 0 ? 0 : rs.length - 1) : (i + d + rs.length) % rs.length].focus({ preventScroll: true }); }
      else if (e.key === 'ArrowRight' && a && a.dataset && a.dataset.sub) { e.preventDefault(); showSub(a, true); }
      else if (e.key === 'ArrowLeft' && menu !== cm) { e.preventDefault(); const p = cm.querySelector(`[data-sub="${menu.dataset.id}"]`); closeSub(); p.focus({ preventScroll: true }); }
    });
    return () => close();
  },
};
