export default {
  id: 'in-todo-strike',
  credit: 'To-do item — check it and a strikethrough sweeps across the label while it fades (Apple Reminders style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .todo {
      display: inline-flex; align-items: center; gap: 12px; padding: 10px 16px 10px 12px; border: 0; border-radius: 12px; background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,.1); cursor: pointer; font: 500 16px system-ui, sans-serif; color: #111; -webkit-tap-highlight-color: transparent;
    }
    .todo:hover { box-shadow: 0 2px 8px rgba(0,0,0,.12); }
    .todo:focus-visible { outline: 3px solid #ff9f0a; outline-offset: 2px; }
    .box { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #c7c7cc; display: grid; place-items: center; transition: background .2s, border-color .2s; }
    .box svg { width: 13px; height: 13px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 20; stroke-dashoffset: 20; transition: stroke-dashoffset .25s .05s; }
    .todo[aria-checked="true"] .box { background: #ff9f0a; border-color: #ff9f0a; }
    .todo[aria-checked="true"] .box svg { stroke-dashoffset: 0; }
    .txt { position: relative; transition: color .35s; }
    .txt::after { content: ''; position: absolute; left: 0; top: 55%; height: 2px; width: 0; background: #111; border-radius: 1px; transition: width .35s cubic-bezier(.4,0,.2,1), background .35s; }
    .todo[aria-checked="true"] .txt { color: #a1a1a6; }
    .todo[aria-checked="true"] .txt::after { width: 100%; background: #a1a1a6; }
  `,
  html: `<button class="todo" type="button" role="checkbox" aria-checked="false">
    <span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="txt">Buy milk</span>
  </button>`,
  init(root) {
    const b = root.querySelector('.todo');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
