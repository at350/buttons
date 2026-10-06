export default {
  id: 'bt-slack-reaction',
  credit: 'Slack — emoji reaction pills under a message (blue when you have reacted)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 4px; white-space: nowrap; font: 400 12px/1 Lato, Slack-Lato, appleLogo, sans-serif; }
    .rx {
      height: 24px; padding: 0 7px 0 5px; border-radius: 12px; border: 1px solid transparent; background: rgba(29,28,29,.06); color: #1d1c1d; cursor: pointer;
      display: inline-flex; align-items: center; gap: 4px; font: inherit; font-weight: 700;
      transition: background .1s, border-color .1s, color .1s; -webkit-tap-highlight-color: transparent;
    }
    .rx:hover { background: #fff; border-color: rgba(29,28,29,.5); }
    .rx:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1264a3; }
    .rx[aria-pressed="true"] { background: rgba(29,155,209,.1); border-color: #1d9bd1; color: #1264a3; }
    .rx[aria-pressed="true"]:hover { background: rgba(29,155,209,.18); }
    .n { min-width: 1ch; font-variant-numeric: tabular-nums; }
    .e { font-size: 16px; line-height: 1; display: inline-block; font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif; }
    .rx[aria-pressed="true"] .e { animation: hop .25s ease-out; }
    @keyframes hop { 0% { transform: scale(.8); } 50% { transform: scale(1.15); } 100% { transform: none; } }
    .add { width: 36px; padding: 0; justify-content: center; }
    .add svg { width: 16px; height: 16px; fill: none; stroke: #616061; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .add:hover svg { stroke: #1d1c1d; }
  `,
  html: `
    <div class="row">
      <button class="rx" type="button" aria-pressed="true"><span class="e">✅</span><span class="n">3</span></button>
      <button class="rx" type="button" aria-pressed="false"><span class="e">🙌</span><span class="n">5</span></button>
      <button class="rx" type="button" aria-pressed="false"><span class="e">👀</span><span class="n">1</span></button>
      <button class="rx" type="button" aria-pressed="false"><span class="e">🔥</span><span class="n">2</span></button>
      <button class="rx add" type="button" aria-label="Add reaction"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.267 2.08a10 10 0 108.653 8.653"/><path d="M15 10V9"/><path d="M16 5h6"/><path d="M16.472 15a6 6 0 01-8.943 0"/><path d="M19 2v6"/><path d="M9 10V9"/></svg></button>
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
