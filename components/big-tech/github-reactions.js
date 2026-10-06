// GitHub comment reactions. The smiley opens the 8-emoji reaction picker (a data-open popover); picking one
// toggles that reaction. Every possible pill is in the row from the start (unused ones hidden with visibility),
// and counts use tabular figures in a fixed-width slot, so reacting never changes the box.
const EMOJI = [['+1', '👍'], ['-1', '👎'], ['laugh', '😄'], ['hooray', '🎉'], ['confused', '😕'], ['heart', '❤️'], ['rocket', '🚀'], ['eyes', '👀']];
const START = { '+1': [12, false], hooray: [4, true], heart: [3, false], rocket: [1, false] };
export default {
  id: 'bt-github-reactions',
  credit: 'GitHub — issue comment reactions with the smiley reaction picker (Primer)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { --f: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif; position: relative; display: flex; gap: 4px; align-items: center; font: 500 12px/1 var(--f); white-space: nowrap; }
    .re {
      height: 26px; padding: 0 8px; border-radius: 100px; border: 1px solid #d1d9e0; background: transparent; color: #59636e;
      display: inline-flex; align-items: center; gap: 4px; cursor: pointer; font: inherit; white-space: nowrap;
      transition: background 80ms cubic-bezier(.65,0,.35,1), border-color 80ms; -webkit-tap-highlight-color: transparent;
    }
    .re:hover { background: #eff2f5; }
    .re:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; }
    .re[aria-pressed="true"] { background: #ddf4ff; border-color: #0969da; color: #0969da; }
    .re[aria-pressed="true"]:hover { background: #b6e3ff; }
    .re[hidden] { display: none; }
    .e { font-size: 14px; line-height: 1; font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif; }
    .n { min-width: 2ch; text-align: left; font-variant-numeric: tabular-nums; }
    .add { width: 28px; height: 28px; padding: 0; border: 0; border-radius: 50%; background: transparent; color: #59636e; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; flex: none; }
    .add:hover, .add[aria-expanded="true"] { background: #eff2f5; color: #1f2328; }
    .add:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; }
    .add svg { width: 16px; height: 16px; fill: currentColor; }
    .pick {
      position: absolute; bottom: calc(100% + 6px); left: 0; z-index: 10; display: none; grid-template-columns: repeat(4, 32px); gap: 4px; padding: 8px;
      background: #fff; border-radius: 12px; box-shadow: 0 0 0 1px #d1d9e0, 0 6px 12px -3px rgba(37,41,46,.04), 0 6px 18px 0 rgba(37,41,46,.12);
    }
    .add[aria-expanded="true"] + .pick { display: grid; }
    .pk { width: 32px; height: 32px; border: 0; border-radius: 6px; background: none; cursor: pointer; font-size: 16px; line-height: 32px; padding: 0; font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif; }
    .pk:hover, .pk:focus-visible { background: #eff2f5; outline: none; }
    .pk[aria-pressed="true"] { background: #ddf4ff; }
    .slots { display: grid; }
    .slots > .list, .slots > .sizer { grid-area: 1 / 1; display: flex; gap: 4px; }
    .sizer { visibility: hidden; pointer-events: none; }
  `,
  html: `
    <div class="wrap">
      <button class="add" type="button" aria-label="Add or remove reactions" aria-haspopup="true" aria-expanded="false"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z"/></svg></button>
      <div class="pick" role="menu" aria-label="Pick your reaction">
        ${EMOJI.map(([k, e]) => `<button class="pk" type="button" role="menuitemcheckbox" aria-pressed="${START[k] ? START[k][1] : false}" data-k="${k}" aria-label="${k}">${e}</button>`).join('')}
      </div>
      <div class="slots">
        <div class="sizer" aria-hidden="true">${EMOJI.slice(0, 5).map(([, e]) => `<span class="re"><span class="e">${e}</span><span class="n">00</span></span>`).join('')}</div>
        <div class="list">
          ${EMOJI.map(([k, e]) => `<button class="re" type="button" data-k="${k}" aria-pressed="${START[k] ? START[k][1] : false}"${START[k] ? '' : ' hidden'}><span class="e">${e}</span><span class="n">${START[k] ? START[k][0] : 0}</span></button>`).join('')}
        </div>
      </div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap');
    const add = root.querySelector('.add');
    const count = Object.fromEntries(EMOJI.map(([k]) => [k, START[k] ? START[k][0] : 0]));
    const mine = Object.fromEntries(EMOJI.map(([k]) => [k, START[k] ? START[k][1] : false]));
    const render = (k) => {
      const pill = root.querySelector(`.re[data-k="${k}"]`);
      pill.hidden = count[k] === 0;
      pill.setAttribute('aria-pressed', String(mine[k]));
      pill.querySelector('.n').textContent = count[k];
      root.querySelector(`.pk[data-k="${k}"]`).setAttribute('aria-pressed', String(mine[k]));
    };
    const toggle = (k) => { mine[k] = !mine[k]; count[k] += mine[k] ? 1 : -1; render(k); };
    // The sizer reserves five pills; never show more than five at once (GitHub wraps after that; we cap instead).
    const visible = () => EMOJI.filter(([k]) => count[k] > 0).length;
    root.querySelectorAll('button.re').forEach((b) => b.addEventListener('click', () => toggle(b.dataset.k)));
    const setOpen = (open) => { add.setAttribute('aria-expanded', String(open)); host?.toggleAttribute('data-open', open); };
    add.addEventListener('click', () => setOpen(add.getAttribute('aria-expanded') !== 'true'));
    root.querySelectorAll('.pk').forEach((p) => p.addEventListener('click', () => {
      const k = p.dataset.k;
      if (count[k] === 0 && visible() >= 5) return;
      toggle(k); setOpen(false); add.focus({ preventScroll: true });
    }));
    const onDoc = (e) => { if (!e.composedPath().includes(wrap)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape' && add.getAttribute('aria-expanded') === 'true') { setOpen(false); add.focus({ preventScroll: true }); } };
    document.addEventListener('pointerdown', onDoc);
    root.addEventListener('keydown', onKey);
    return () => document.removeEventListener('pointerdown', onDoc);
  },
};
