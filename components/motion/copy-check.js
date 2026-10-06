// shadcn/ui docs copy button — Lucide copy → check with a scale + blur(4px) crossfade and the label rolling up.
// Spring: stiffness 500, damping 30 (ζ .67, ~5% overshoot) → linear().
const SPRING = 'linear(0, 0.04, 0.126, 0.249, 0.374, 0.509, 0.625, 0.737, 0.824, 0.9, 0.954, 0.998, 1.027, 1.044, 1.053, 1.056, 1.054, 1.05, 1.043, 1.036, 1.028, 1.021, 1.015, 1.01, 1.006, 1.003, 1, 0.999, 0.998, 0.997, 0.997, 0.997, 0.997, 0.998, 0.998, 0.998, 0.999, 0.999, 0.999, 1, 1)';

export default {
  id: 'mo-copy-check',
  credit: 'Copy → Copied — clipboard icon scale/blur crossfades into a check that draws itself, label rolls up (shadcn / Vercel docs)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 14px 0 12px; border-radius: 10px;
      border: 1px solid #e4e4e7; background: #fff; color: #09090b; font: 500 13.5px Inter, system-ui, sans-serif; cursor: pointer;
      box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: background .2s, border-color .3s, color .3s, transform .15s ${SPRING};
    }
    .btn:hover { background: #f4f4f5; } .btn:active { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .btn.done { border-color: #86efac; color: #15803d; background: #f0fdf4; }
    .ico { position: relative; width: 18px; height: 18px; display: grid; }
    .ico svg { grid-area: 1 / 1; width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: opacity .25s, transform .45s ${SPRING}, filter .25s; }
    .clip { opacity: 1; transform: scale(1); }
    .chk { opacity: 0; transform: scale(.5); filter: blur(4px); }
    .chk path { stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset .35s .15s cubic-bezier(.3, .7, .3, 1); }
    .btn.done .clip { opacity: 0; transform: scale(.5) rotate(-20deg); filter: blur(4px); }
    .btn.done .chk { opacity: 1; transform: scale(1); filter: blur(0); }
    .btn.done .chk path { stroke-dashoffset: 0; }
    .lbl { position: relative; display: inline-grid; height: 18px; overflow: hidden; width: 52px; text-align: left; }
    .lbl span { grid-area: 1 / 1; line-height: 18px; transition: transform .45s ${SPRING}, opacity .25s; }
    .lbl .b { transform: translateY(110%); opacity: 0; }
    .btn.done .lbl .a { transform: translateY(-110%); opacity: 0; }
    .btn.done .lbl .b { transform: none; opacity: 1; }
    .code { font: 500 12.5px 'JetBrains Mono', ui-monospace, monospace; color: #777; margin-right: 2px; }
  `,
  html: `
    <button class="btn" type="button" aria-live="polite">
      <span class="ico" aria-hidden="true">
        <svg class="clip" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <svg class="chk" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span class="lbl"><span class="a">Copy</span><span class="b">Copied</span></span>
    </button>`,
  init(root) {
    const b = root.querySelector('.btn');
    let t = 0;
    b.addEventListener('click', () => {
      b.classList.add('done');
      clearTimeout(t); t = setTimeout(() => b.classList.remove('done'), 1800);
    });
    return () => clearTimeout(t);
  },
};
