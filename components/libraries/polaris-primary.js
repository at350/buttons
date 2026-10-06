export default {
  id: 'lb-polaris-primary',
  credit: 'Shopify Polaris 13 — secondary "Edit" and primary "Fulfill items" (bevelled #303030 with the 15% top-sheen gradient, 28px, 8px radius, Inter 550 12px) toggling the order Badge: attention "Unfulfilled" with the incomplete pip → success "Fulfilled" with the complete pip',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; font: 550 12px/16px Inter, -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif; color: #303030; }
    .pl { position: relative; box-sizing: border-box; min-height: 28px; min-width: 28px; padding: 6px 12px; border-radius: 8px; border: 0; cursor: pointer; font: inherit; display: inline-flex; align-items: center; justify-content: center; gap: 2px; white-space: nowrap; user-select: none; -webkit-tap-highlight-color: transparent; }
    .pl:focus-visible { outline: 2px solid #005bd3; outline-offset: 1px; }
    .sec { background: #fff; color: #303030; box-shadow: 0 -1px 0 0 #b5b5b5 inset, 0 0 0 1px rgba(0,0,0,.1) inset, 0 .5px 0 1.5px #fff inset; }
    .sec:hover { background: #fafafa; }
    .sec:active { background: #f7f7f7; box-shadow: -1px 0 1px 0 rgba(26,26,26,.122) inset, 1px 0 1px 0 rgba(26,26,26,.122) inset, 0 2px 1px 0 rgba(26,26,26,.2) inset; }
    .pri { --sheen: linear-gradient(180deg, rgba(48,48,48,0) 63.53%, rgba(255,255,255,.15) 100%); background: var(--sheen), #303030; color: #fff; box-shadow: 0 -1px 0 1px rgba(0,0,0,.8) inset, 0 0 0 1px #303030 inset, 0 .5px 0 1.5px rgba(255,255,255,.25) inset; }
    .pri:hover { background: var(--sheen), #1a1a1a; }
    .pri:active { background: var(--sheen), #1a1a1a; box-shadow: 0 3px 0 0 #000 inset; }
    .bg { display: inline-flex; align-items: center; padding: 2px 8px 2px 6px; border-radius: 8px; transition: background-color .2s, color .2s; }
    .bg .ic { display: grid; width: 20px; height: 20px; margin: -2px 2px -2px -2px; }
    .bg svg { grid-area: 1 / 1; width: 20px; height: 20px; fill: currentColor; }
    .bg .st { display: grid; }
    .bg .st > span { grid-area: 1 / 1; }
    .bg[data-t="att"] { background: #ffeb78; color: #4f4700; }
    .bg[data-t="suc"] { background: #affebf; color: #014b40; }
    .bg[data-t="att"] .done, .bg[data-t="suc"] .todo { visibility: hidden; }
  `,
  html: `
    <div class="row">
      <button class="pl sec" type="button">Edit</button>
      <button class="pl pri" type="button" aria-pressed="false">Fulfill items</button>
      <span class="bg" data-t="att" aria-live="polite"><span class="ic"><svg class="todo" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.547 12.69c.183.05.443.06 1.453.06s1.27-.01 1.453-.06a1.75 1.75 0 0 0 1.237-1.237c.05-.182.06-.443.06-1.453s-.01-1.27-.06-1.453a1.75 1.75 0 0 0-1.237-1.237c-.182-.05-.443-.06-1.453-.06s-1.27.01-1.453.06A1.75 1.75 0 0 0 7.31 8.547c-.05.183-.06.443-.06 1.453s.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237ZM6.102 8.224C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C8.605 14 9.07 14 10 14s1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C11.395 6 10.93 6 10 6c-.93 0-1.395 0-1.776.102a3 3 0 0 0-2.122 2.122Z"/></svg><svg class="done" viewBox="0 0 20 20"><path d="M6 10c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C8.605 6 9.07 6 10 6c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C14 8.605 14 9.07 14 10s0 1.395-.102 1.777a3 3 0 0 1-2.122 2.12C11.395 14 10.93 14 10 14s-1.395 0-1.777-.102a3 3 0 0 1-2.12-2.121C6 11.395 6 10.93 6 10Z"/></svg></span><span class="st"><span class="todo">Unfulfilled</span><span class="done">Fulfilled</span></span></span>
    </div>`,
  init(root) {
    const b = root.querySelector('.pri'), bg = root.querySelector('.bg');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on);
      bg.dataset.t = on ? 'suc' : 'att';
    });
  },
};
