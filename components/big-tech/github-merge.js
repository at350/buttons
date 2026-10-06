export default {
  id: 'bt-github-merge',
  credit: 'GitHub Primer — green "Merge pull request" button with merge-method caret',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .grp { display: inline-flex; font: 500 14px/20px -apple-system, "Segoe UI", system-ui, sans-serif; }
    .gh {
      height: 32px; padding: 5px 16px; border: 1px solid rgba(31,35,40,.15); color: #fff; cursor: pointer;
      background: #1f883d; box-shadow: 0 1px 0 rgba(31,35,40,.1), inset 0 1px 0 rgba(255,255,255,.03);
      font: inherit; display: inline-flex; align-items: center; gap: 8px; transition: background .08s;
      -webkit-tap-highlight-color: transparent;
    }
    .main { border-radius: 6px 0 0 6px; }
    .caret { border-radius: 0 6px 6px 0; border-left: 0; padding: 5px 8px; }
    .gh:hover { background: #1a7f37; }
    .gh:active { background: #197935; box-shadow: inset 0 1px 0 rgba(0,45,17,.2); }
    .gh:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; }
    .gh svg { width: 16px; height: 16px; fill: currentColor; }
    .grp.merged .gh { background: #8250df; border-color: rgba(31,35,40,.15); cursor: default; }
    .grp.merged .main .t::after { content: 'Merged'; }
    .main .t::after { content: 'Merge pull request'; }
    .grp.merged .caret { display: none; }
    .grp.merged .main { border-radius: 6px; }
  `,
  html: `
    <div class="grp">
      <button class="gh main" type="button" aria-pressed="false">
        <svg viewBox="0 0 16 16"><path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"/></svg>
        <span class="t"></span>
      </button>
      <button class="gh caret" type="button" aria-label="Select merge method"><svg viewBox="0 0 16 16"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/></svg></button>
    </div>`,
  init(root) {
    const grp = root.querySelector('.grp');
    const main = root.querySelector('.main');
    main.addEventListener('click', () => {
      const on = grp.classList.toggle('merged');
      main.setAttribute('aria-pressed', on);
    });
  },
};
