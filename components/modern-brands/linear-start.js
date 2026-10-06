export default {
  id: 'mb-linear-start',
  credit: 'Linear.app 2024 homepage — "Start building" with a hairline conic-gradient border that wakes up and spins on hover',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 26px; border-radius: 12px; background: #08090a; display: flex; gap: 10px; flex-wrap: wrap; }
    .ln { position: relative; height: 38px; padding: 0 16px; border-radius: 8px; border: 0; cursor: pointer; isolation: isolate;
      background: #0f1012; color: #f7f8f8; font: 510 14px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: -.012em;
      display: inline-flex; align-items: center; gap: 8px; -webkit-tap-highlight-color: transparent;
      transition: transform .18s cubic-bezier(.2,.8,.2,1), background .2s, box-shadow .25s; }
    .rim { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: -1; transition: opacity .3s; }
    .rim::before { content: ''; position: absolute; inset: -400px; transform: rotate(200deg);
      background: conic-gradient(#2b2d31, #5e6ad2 25%, #b8c0ff 32%, #2b2d31 45%, #2b2d31 70%, #5e6ad2 88%, #2b2d31); }
    .rim::after { content: ''; position: absolute; inset: 1px; border-radius: 7px; background: #0f1012; transition: background .2s; }
    .ln:hover .rim::before { animation: turn 2.4s linear infinite; }
    .ln:hover .rim::after { background: #141518; }
    .ln:hover { background: #141518; box-shadow: 0 0 0 1px rgba(94,106,210,.15), 0 8px 30px -8px rgba(94,106,210,.5); }
    .ln:active { transform: scale(.975); }
    .ln:focus-visible { outline: none; box-shadow: 0 0 0 2px #08090a, 0 0 0 4px #5e6ad2; }
    .ln[aria-pressed="true"] { background: #5e6ad2; box-shadow: 0 0 0 1px #6e79e0, 0 10px 32px -8px rgba(94,106,210,.8); }
    .ln[aria-pressed="true"] .rim { opacity: 0; }
    .ln svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
      transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .ln:hover svg { transform: translateX(2px); }
    .ln[aria-pressed="true"] svg { transform: rotate(-90deg) translateX(0); }
    .ghost { background: transparent; color: #8a8f98; }
    .ghost:hover { color: #f7f8f8; background: rgba(255,255,255,.04); box-shadow: none; }
    @keyframes turn { from { transform: rotate(200deg); } to { transform: rotate(560deg); } }
  `,
  html: `
    <div class="stage">
      <button class="ln" type="button" aria-pressed="false"><span class="rim"></span><span class="lbl">Start building</span><svg viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button>
      <button class="ln ghost" type="button">Introducing Linear for Agents<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.ln:not(.ghost)');
    const lbl = b.querySelector('.lbl');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      lbl.textContent = on ? 'Workspace ready' : 'Start building';
    });
  },
};
