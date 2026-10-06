export default {
  id: 'mb-supabase-start',
  credit: 'Supabase — brand-green "Start your project" that glows on hover, beside the outlined "Request a demo"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 26px; border-radius: 12px; background: #171717; display: flex; gap: 10px; flex-wrap: wrap; }
    .sb { height: 36px; padding: 0 14px; border-radius: 6px; cursor: pointer; border: 1px solid transparent;
      font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: -.005em; display: inline-flex; align-items: center; gap: 8px;
      transition: background .2s, border-color .2s, box-shadow .3s, transform .15s cubic-bezier(.2,.8,.2,1), color .2s; -webkit-tap-highlight-color: transparent; }
    .pri { background: #006239; border-color: #3ecf8e; color: #fff; box-shadow: 0 0 0 0 rgba(62,207,142,0); }
    .pri:hover { background: #3ecf8e; color: #0b1f16; box-shadow: 0 0 0 1px rgba(62,207,142,.4), 0 0 28px -4px rgba(62,207,142,.7); }
    .pri:active { transform: scale(.97); }
    .sb:focus-visible { outline: none; box-shadow: 0 0 0 2px #171717, 0 0 0 4px #3ecf8e; }
    .sec { background: #242424; border-color: #363636; color: #ededed; }
    .sec:hover { background: #2e2e2e; border-color: #4a4a4a; }
    .sb svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .bolt { fill: currentColor; stroke: none; transition: transform .35s cubic-bezier(.2,.8,.2,1); }
    .pri:hover .bolt { transform: scale(1.15) rotate(-6deg); }
    .pri[aria-pressed="true"] { background: #3ecf8e; color: #0b1f16; border-color: #3ecf8e; box-shadow: 0 0 0 1px rgba(62,207,142,.4), 0 0 36px -2px rgba(62,207,142,.8); }
    .pri[aria-pressed="true"] .bolt { fill: none; stroke: #0b1f16; }
    .pri .lbl::after { content: 'Start your project'; }
    .pri[aria-pressed="true"] .lbl::after { content: 'Project ready'; }
    .pri[aria-pressed="true"] .bolt path { d: path('M4 12.5 9 17.5 20 6.5'); }
  `,
  html: `
    <div class="stage">
      <button class="sb pri" type="button" aria-pressed="false"><svg class="bolt" viewBox="0 0 24 24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg><span class="lbl"></span></button>
      <button class="sb sec" type="button">Request a demo</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.pri');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
