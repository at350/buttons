export default {
  id: 'bt-slack-reaction',
  credit: 'Slack — emoji reaction pills under a message (blue when you have reacted)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 4px; flex-wrap: wrap; font: 400 12px/1 Lato, -apple-system, "Segoe UI", system-ui, sans-serif; }
    .rx {
      height: 24px; padding: 0 8px 0 6px; border-radius: 12px; border: 1px solid transparent; background: #f2f2f2; color: #1d1c1d; cursor: pointer;
      display: inline-flex; align-items: center; gap: 4px; font: inherit; font-weight: 700;
      transition: background .1s, border-color .1s, color .1s; -webkit-tap-highlight-color: transparent;
    }
    .rx:hover { background: #fff; border-color: #1d1c1d; }
    .rx:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1264a3; }
    .rx[aria-pressed="true"] { background: #e8f5fa; border-color: #1264a3; color: #1264a3; }
    .rx[aria-pressed="true"]:hover { background: #d9edf7; }
    .e { font-size: 15px; line-height: 1; display: inline-block; }
    .rx[aria-pressed="true"] .e { animation: hop .35s cubic-bezier(.34,1.56,.64,1); }
    @keyframes hop { 0% { transform: translateY(0) scale(.7); } 50% { transform: translateY(-5px) scale(1.25); } 100% { transform: none; } }
    .add { width: 32px; padding: 0; justify-content: center; }
    .add svg { width: 16px; height: 16px; fill: #616061; }
    .add:hover svg { fill: #1d1c1d; }
  `,
  html: `
    <div class="row">
      <button class="rx" type="button" aria-pressed="true"><span class="e">✅</span><span class="n">3</span></button>
      <button class="rx" type="button" aria-pressed="false"><span class="e">🙌</span><span class="n">5</span></button>
      <button class="rx" type="button" aria-pressed="false"><span class="e">👀</span><span class="n">1</span></button>
      <button class="rx" type="button" aria-pressed="false"><span class="e">🔥</span><span class="n">2</span></button>
      <button class="rx add" type="button" aria-label="Add reaction"><svg viewBox="0 0 20 20"><path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 1.5a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM7 7.25a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-6.4 4.4a.75.75 0 0 0-1.2.9A5.8 5.8 0 0 0 10 14.75a5.8 5.8 0 0 0 4.6-2.2.75.75 0 1 0-1.2-.9A4.3 4.3 0 0 1 10 13.25a4.3 4.3 0 0 1-3.4-1.6Z"/><path d="M15.5 1v2h2v1.5h-2v2H14v-2h-2V3h2V1h1.5Z"/></svg></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.rx:not(.add)').forEach((b) => {
      const n = b.querySelector('.n');
      b.addEventListener('click', () => {
        const on = b.getAttribute('aria-pressed') !== 'true';
        b.setAttribute('aria-pressed', on);
        n.textContent = String(+n.textContent + (on ? 1 : -1));
      });
    });
    root.querySelector('.add').addEventListener('click', () => {
      const first = root.querySelector('.rx[aria-pressed="false"]');
      if (first) first.click();
    });
  },
};
