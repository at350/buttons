export default {
  id: 'mb-visionos-glass',
  credit: 'Apple visionOS — glass buttons whose hover highlight follows the pointer like a gaze spotlight; the selected one brightens and lifts',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 26px 28px; border-radius: 12px; display: flex; gap: 12px;
      background: radial-gradient(90% 80% at 20% 0%, #5b7fa8 0%, transparent 60%), radial-gradient(70% 80% at 90% 100%, #8c6a9b 0%, transparent 60%), #2b3140; }
    .vg { --mx: 50%; --my: 50%; position: relative; width: 64px; height: 64px; border-radius: 50%; border: 0; cursor: pointer; isolation: isolate; -webkit-tap-highlight-color: transparent;
      background: rgba(255,255,255,.14); backdrop-filter: blur(16px) saturate(150%); -webkit-backdrop-filter: blur(16px) saturate(150%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.5), inset 0 -1px 0 rgba(255,255,255,.1), 0 10px 30px rgba(0,0,0,.25);
      color: #fff; display: grid; place-items: center; transition: transform .35s cubic-bezier(.2,.8,.2,1), background .3s, box-shadow .3s; }
    .vg::before { content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1; opacity: 0; transition: opacity .25s;
      background: radial-gradient(60px 60px at var(--mx) var(--my), rgba(255,255,255,.55), rgba(255,255,255,.08) 60%, transparent 75%); }
    .vg:hover { transform: scale(1.08); background: rgba(255,255,255,.2); }
    .vg:hover::before { opacity: 1; }
    .vg:active { transform: scale(.96); }
    .vg:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .vg[aria-pressed="true"] { background: rgba(255,255,255,.85); color: #1b2030; transform: translateY(-4px) scale(1.04); box-shadow: inset 0 1px 0 #fff, 0 18px 40px rgba(0,0,0,.35); }
    .vg[aria-pressed="true"]::before { opacity: 0; }
    .vg svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; transition: transform .35s cubic-bezier(.2,.8,.2,1); }
    .vg:hover svg { transform: scale(1.08); }
  `,
  html: `
    <div class="stage">
      <button class="vg" type="button" aria-pressed="false" aria-label="Photos"><svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m4 17 5-4.5 3 2.5 3.5-3.5L20 16"/></svg></button>
      <button class="vg" type="button" aria-pressed="false" aria-label="Environments"><svg viewBox="0 0 24 24"><path d="M3 18.5 9 9l4 6 2.5-3.5 5.5 7z"/><circle cx="17.5" cy="6.5" r="2"/></svg></button>
      <button class="vg" type="button" aria-pressed="false" aria-label="Music"><svg viewBox="0 0 24 24"><path d="M9 18.5V6l10-2v12.5"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.vg').forEach((b) => {
      b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); b.style.setProperty('--mx', (e.clientX - r.left) + 'px'); b.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
      b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
    });
  },
};
