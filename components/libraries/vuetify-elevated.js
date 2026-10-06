export default {
  id: 'lb-vuetify-elevated',
  credit: 'Vuetify 3 — v-btn elevated (white, elevation 2 → 4 on hover) and tonal (primary at 12%): uppercase Roboto, 4px radius, state-layer overlay',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 16px; flex-wrap: wrap; padding: 6px 2px; font: 500 14px/1 "Roboto Flex", Roboto, Inter, system-ui, sans-serif; letter-spacing: .0892857em; text-transform: uppercase; }
    .vb { position: relative; overflow: hidden; height: 36px; min-width: 64px; padding: 0 16px; border-radius: 4px; border: 0; cursor: pointer; font: inherit; letter-spacing: inherit; text-transform: inherit; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: box-shadow .28s cubic-bezier(.4,0,.2,1), background .2s; -webkit-tap-highlight-color: transparent; }
    .vb::before { content: ''; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity .2s; pointer-events: none; }
    .vb:hover::before { opacity: .04; }
    .vb:focus-visible { outline: 0; }
    .vb:focus-visible::before { opacity: .12; }
    .vb[aria-pressed="true"]::before { opacity: .12; }
    .el { background: #fff; color: rgba(0,0,0,.87); box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); }
    .el:hover { box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); }
    .el:active { box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12); }
    .el.pri { background: #1867c0; color: #fff; }
    .tn { background: rgba(24,103,192,.12); color: #1867c0; }
    .tn:hover::before { opacity: .08; }
    .vb svg { width: 18px; height: 18px; fill: currentColor; margin-left: -4px; }
    .rp { position: absolute; border-radius: 50%; background: currentColor; opacity: .25; transform: translate(-50%, -50%) scale(0); animation: rip .55s cubic-bezier(.4,0,.2,1) forwards; pointer-events: none; }
    @keyframes rip { to { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
  `,
  html: `
    <div class="row">
      <button class="vb el" type="button" aria-pressed="false">Elevated</button>
      <button class="vb el pri" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>Create</button>
      <button class="vb tn" type="button" aria-pressed="false">Tonal</button>
    </div>`,
  init(root) {
    const timers = new Set();
    root.querySelectorAll('.vb').forEach((b) => b.addEventListener('click', (e) => {
      const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height);
      const rp = document.createElement('span'); rp.className = 'rp';
      rp.style.cssText = `left:${(e.clientX || r.left + r.width / 2) - r.left}px;top:${(e.clientY || r.top + r.height / 2) - r.top}px;width:${s / 2}px;height:${s / 2}px`;
      b.appendChild(rp);
      const k = setTimeout(() => { rp.remove(); timers.delete(k); }, 550); timers.add(k);
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
    }));
    return () => timers.forEach(clearTimeout);
  },
};
