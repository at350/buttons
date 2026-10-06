export default {
  id: 'bt-vercel-deploy',
  credit: 'Vercel / Geist — black "Deploy" button with triangle logo, inverts on hover',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 10px; flex-wrap: wrap; }
    .v {
      height: 40px; padding: 0 16px; border-radius: 6px; cursor: pointer; border: 1px solid #000;
      font: 500 14px/38px -apple-system, Inter, "Segoe UI", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 8px; transition: background .15s ease, color .15s ease, border-color .15s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .pri { background: #000; color: #fff; }
    .pri:hover { background: #fff; color: #000; }
    .sec { background: #fff; color: #000; border-color: #eaeaea; }
    .sec:hover { border-color: #000; }
    .v:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0070f3; }
    .v svg { width: 16px; height: 16px; fill: currentColor; }
    .pri[aria-pressed="true"] { background: #fff; color: #000; }
    .pri .lbl::after { content: 'Deploy'; }
    .pri[aria-pressed="true"] .lbl::after { content: 'Deployed'; }
    .pri[aria-pressed="true"] svg { fill: #0070f3; }
    .pri.busy .lbl::after { content: 'Building…'; }
    .pri.busy svg { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `,
  html: `
    <div class="row">
      <button class="v pri" type="button" aria-pressed="false"><svg viewBox="0 0 76 65"><path d="M37.5 0 75 65H0z"/></svg><span class="lbl"></span></button>
      <button class="v sec" type="button">Learn more</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.pri');
    let t;
    b.addEventListener('click', () => {
      if (b.getAttribute('aria-pressed') === 'true') { b.setAttribute('aria-pressed', 'false'); return; }
      if (b.classList.contains('busy')) return;
      b.classList.add('busy');
      t = setTimeout(() => { b.classList.remove('busy'); b.setAttribute('aria-pressed', 'true'); }, 1200);
    });
    return () => clearTimeout(t);
  },
};
