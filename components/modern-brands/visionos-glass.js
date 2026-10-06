export default {
  id: 'mb-visionos-glass',
  credit: 'Apple visionOS — glass ornament buttons: the hover highlight follows your gaze/pointer as a soft spotlight, the specular rim catches light, and the selected button turns solid white with a dark glyph',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 26px; border-radius: 12px; display: flex;
      background: radial-gradient(90% 80% at 20% 0%, #6d8fb8 0%, transparent 60%), radial-gradient(70% 80% at 90% 100%, #a07a8f 0%, transparent 60%), linear-gradient(160deg, #39465c, #2a2f3d); }
    .orn { display: flex; gap: 8px; padding: 8px; border-radius: 40px; position: relative; isolation: isolate;
      background: rgba(128,128,128,.3); backdrop-filter: blur(40px) saturate(150%); -webkit-backdrop-filter: blur(40px) saturate(150%);
      box-shadow: inset 0 0 0 .5px rgba(255,255,255,.12), 0 18px 40px rgba(0,0,0,.28); }
    .orn::after, .vg::after { content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.2px; pointer-events: none;
      background: linear-gradient(140deg, rgba(255,255,255,.6), rgba(255,255,255,.05) 35%, rgba(255,255,255,0) 60%, rgba(255,255,255,.3));
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); }
    .vg { --mx: 50%; --my: 50%; position: relative; width: 56px; height: 56px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; isolation: isolate; -webkit-tap-highlight-color: transparent;
      background: rgba(255,255,255,.06); color: rgba(255,255,255,.96); display: grid; place-items: center;
      transition: transform .35s cubic-bezier(.32,.72,0,1), background .3s cubic-bezier(.32,.72,0,1), color .3s; }
    .vg::before { content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1; opacity: 0; transition: opacity .3s cubic-bezier(.32,.72,0,1);
      background: radial-gradient(44px 44px at var(--mx) var(--my), rgba(255,255,255,.42), rgba(255,255,255,.1) 60%, rgba(255,255,255,.04) 100%); }
    .vg:hover::before, .vg:focus-visible::before { opacity: 1; }
    .vg:active { transform: scale(.94); }
    .vg:focus-visible { outline: none; }
    .vg[aria-pressed="true"] { background: rgba(255,255,255,.95); color: #1c1c1e; }
    .vg[aria-pressed="true"]::before { opacity: 0; }
    .vg svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="stage">
      <div class="orn" role="toolbar" aria-label="Ornament">
        <button class="vg" type="button" aria-pressed="false" aria-label="Photos"><svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button>
        <button class="vg" type="button" aria-pressed="false" aria-label="Environments"><svg viewBox="0 0 24 24"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/></svg></button>
        <button class="vg" type="button" aria-pressed="false" aria-label="Music"><svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></button>
      </div>
    </div>`,
  init(root) {
    root.querySelectorAll('.vg').forEach((b) => {
      b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); b.style.setProperty('--mx', (e.clientX - r.left) + 'px'); b.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
      b.addEventListener('pointerleave', () => { b.style.setProperty('--mx', '50%'); b.style.setProperty('--my', '50%'); });
      b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
    });
  },
};
