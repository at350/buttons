// Apple Reminders (iOS 17) row: 22pt hollow circle in systemGray3, 17pt title, hairline separator inset under the text.
// Completing turns the ring the list color (Reminders blue #007aff) with a filled inner dot that springs in
// (iOS spring curve), and the title dims to secondaryLabel rgba(60,60,67,.6) — Reminders does not strike through.
export default {
  id: 'in-todo-strike',
  credit: 'Apple Reminders (iOS) row — tap the ring, a blue dot springs into it and the title dims to secondary gray',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cell { display: inline-block; min-width: 240px; padding-left: 16px; border-radius: 10px; background: #fff; }
    .todo {
      display: flex; align-items: flex-start; gap: 12px; width: 100%; padding: 11px 16px 0 0; border: 0; background: none; cursor: pointer; text-align: left;
      font: 400 17px/22px system-ui, -apple-system, "SF Pro Text", sans-serif; letter-spacing: -.41px; color: #000; -webkit-tap-highlight-color: transparent;
    }
    .todo:focus-visible { outline: 2px solid #007aff; outline-offset: 2px; border-radius: 6px; }
    .ring {
      position: relative; flex: none; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #c7c7cc; display: grid; place-items: center;
      transition: border-color .2s ease;
    }
    .todo:hover .ring { border-color: #aeaeb2; }
    .ring::after {
      content: ''; width: 14px; height: 14px; border-radius: 50%; background: #007aff; transform: scale(0);
      transition: transform .35s cubic-bezier(.32,.72,0,1);
    }
    .todo:active .ring { transform: scale(.92); }
    .todo[aria-checked="true"] .ring { border-color: #007aff; }
    .todo[aria-checked="true"] .ring::after { transform: scale(1); transition: transform .45s cubic-bezier(.34,1.56,.64,1); }
    .txt { flex: 1; padding-bottom: 11px; border-bottom: .5px solid #c6c6c8; white-space: nowrap; transition: color .25s ease; }
    .todo[aria-checked="true"] .txt { color: rgba(60,60,67,.6); }
  `,
  html: `<div class="cell"><button class="todo" type="button" role="checkbox" aria-checked="false">
    <span class="ring"></span><span class="txt">Buy milk</span>
  </button></div>`,
  init(root) {
    const b = root.querySelector('.todo');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
