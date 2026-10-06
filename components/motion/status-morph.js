const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-status-morph',
  credit: 'Status button — idle → loading → success → error on repeated clicks; icons blur-scale crossfade, the label rolls, the colour morphs (Family / Emil Kowalski "button states")',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; display: inline-flex; align-items: center; gap: 10px; height: 44px; width: 150px; padding: 0 16px; border: 0; border-radius: 12px; cursor: pointer; color: #fff;
      background: var(--bg, #111); font: 600 14px Inter, system-ui, sans-serif; transition: background .4s, transform .2s ${SPRING}, box-shadow .4s; box-shadow: 0 6px 16px -8px var(--bg, #111);
    }
    .btn:hover { filter: brightness(1.1); } .btn:active { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid var(--bg, #111); outline-offset: 3px; }
    .btn[data-s="loading"] { --bg: #2563eb; } .btn[data-s="success"] { --bg: #16a34a; } .btn[data-s="error"] { --bg: #dc2626; }
    .ico { position: relative; width: 20px; height: 20px; display: grid; flex: none; }
    .ico > * { grid-area: 1 / 1; width: 20px; height: 20px; opacity: 0; transform: scale(.5); filter: blur(4px); transition: opacity .25s, transform .5s ${SPRING}, filter .25s; }
    .ico svg { fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .btn[data-s="idle"] .i-idle, .btn[data-s="loading"] .i-load, .btn[data-s="success"] .i-ok, .btn[data-s="error"] .i-err { opacity: 1; transform: none; filter: none; }
    .i-load { border-radius: 50%; border: 2.4px solid rgba(255,255,255,.3); border-top-color: #fff; }
    .btn[data-s="loading"] .i-load { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .i-ok path { stroke-dasharray: 24; stroke-dashoffset: 24; } .btn[data-s="success"] .i-ok path { stroke-dashoffset: 0; transition: stroke-dashoffset .4s .1s; }
    .i-err path { stroke-dasharray: 18; stroke-dashoffset: 18; } .btn[data-s="error"] .i-err path { stroke-dashoffset: 0; transition: stroke-dashoffset .3s .1s; }
    .btn[data-s="error"] { animation: shake .4s cubic-bezier(.36, .07, .19, .97); }
    @keyframes shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-3px); } 40%, 60% { transform: translateX(3px); } }
    .lbl { position: relative; display: grid; height: 20px; flex: 1; text-align: left; overflow: hidden; }
    .lbl span { grid-area: 1 / 1; line-height: 20px; transform: translateY(120%); opacity: 0; transition: transform .5s ${SPRING}, opacity .25s; }
    .lbl span.cur { transform: none; opacity: 1; } .lbl span.old { transform: translateY(-120%); opacity: 0; }
  `,
  html: `
    <button class="btn" type="button" data-s="idle" aria-live="polite">
      <span class="ico" aria-hidden="true">
        <svg class="i-idle" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        <span class="i-load"></span>
        <svg class="i-ok" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
        <svg class="i-err" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </span>
      <span class="lbl"><span class="cur" data-s="idle">Submit</span><span data-s="loading">Sending…</span><span data-s="success">Sent</span><span data-s="error">Try again</span></span>
    </button>`,
  init(root) {
    const b = root.querySelector('.btn'), labels = [...root.querySelectorAll('.lbl span')];
    const order = ['idle', 'loading', 'success', 'error'];
    let i = 0;
    b.addEventListener('click', () => {
      const prev = order[i]; i = (i + 1) % order.length; const s = order[i];
      b.dataset.s = s;
      labels.forEach((l) => { l.classList.toggle('cur', l.dataset.s === s); l.classList.toggle('old', l.dataset.s === prev); });
    });
  },
};
