export default {
  id: 'lb-chakra-saving',
  credit: 'Chakra UI v3 — Button (solid, colorPalette teal) with loading + loadingText: spinner and "Saving…" then a check, plus the subtle and outline variants',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; font: 500 14px/1 Inter, -apple-system, "Segoe UI", system-ui, sans-serif; }
    .ck { height: 40px; min-width: 40px; padding: 0 16px; border-radius: 4px; border: 1px solid transparent; cursor: pointer; font: inherit; display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; transition: background .15s, color .15s, border-color .15s; -webkit-tap-highlight-color: transparent; }
    .ck:focus-visible { outline: 2px solid #0d9488; outline-offset: 2px; }
    .solid { background: #0d9488; color: #fff; }
    .solid:hover { background: #0f766e; }
    .solid:active { background: #115e59; }
    .solid.busy { opacity: .9; pointer-events: none; }
    .subtle { background: #ccfbf1; color: #115e59; }
    .subtle:hover { background: #99f6e4; }
    .subtle[aria-pressed="true"] { background: #5eead4; }
    .outline { background: transparent; color: #0f766e; border-color: #99f6e4; }
    .outline:hover { background: #f0fdfa; }
    .outline[aria-pressed="true"] { background: #ccfbf1; border-color: #5eead4; }
    .sp { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: rot .45s linear infinite; display: none; }
    .ck.busy .sp { display: block; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .ck svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .ck .ok { display: none; }
    .ck.done .ok { display: block; }
    .ck.done { background: #15803d; }
    .ck.done .save, .ck.busy .save { display: none; }
  `,
  html: `
    <div class="row">
      <button class="ck solid" type="button"><span class="sp"></span><svg class="save" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg><svg class="ok" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span class="l">Save</span></button>
      <button class="ck subtle" type="button" aria-pressed="false">Subtle</button>
      <button class="ck outline" type="button" aria-pressed="false">Outline</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.solid'), l = b.querySelector('.l');
    let t1, t2;
    b.addEventListener('click', () => {
      b.classList.add('busy'); l.textContent = 'Saving…';
      clearTimeout(t1); clearTimeout(t2);
      t1 = setTimeout(() => { b.classList.remove('busy'); b.classList.add('done'); l.textContent = 'Saved'; }, 1500);
      t2 = setTimeout(() => { b.classList.remove('done'); l.textContent = 'Save'; }, 2900);
    });
    root.querySelectorAll('[aria-pressed]').forEach((x) => x.addEventListener('click', () => x.setAttribute('aria-pressed', x.getAttribute('aria-pressed') !== 'true')));
    return () => { clearTimeout(t1); clearTimeout(t2); };
  },
};
