export default {
  id: 'lb-chakra-saving',
  credit: 'Chakra UI v3 — Button colorPalette="teal": solid "Email" (RiMailLine) runs loading + loadingText="Sending…" with the 2px spinner (width reserved so nothing jumps), next to the outline "Call us →" and subtle variants',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 16px; flex-wrap: wrap; font: 600 14px/20px Inter, -apple-system, system-ui, "Segoe UI", sans-serif; }
    .ck { height: 40px; min-width: 40px; padding: 0 16px; border-radius: 4px; border: 1px solid transparent; cursor: pointer; font: inherit; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; user-select: none; transition: background .15s cubic-bezier(.4,0,.2,1), color .15s, border-color .15s, opacity .15s; -webkit-tap-highlight-color: transparent; }
    .ck:focus-visible { outline: 2px solid #14b8a6; outline-offset: 2px; }
    .ck svg { width: 16px; height: 16px; fill: currentColor; flex: none; }
    .in { display: inline-flex; align-items: center; gap: 8px; }
    .solid { background: #0d9488; color: #fff; }
    .solid:hover { background: rgba(13,148,136,.9); }
    .solid[data-loading] { opacity: .5; cursor: not-allowed; }
    .solid .stack { display: grid; }
    .solid .stack > .in { grid-area: 1 / 1; }
    .solid .ld { visibility: hidden; }
    .solid[data-loading] .ld { visibility: visible; }
    .solid[data-loading] .idle { visibility: hidden; }
    .sp { width: 16px; height: 16px; border-radius: 9999px; border: 2px solid currentColor; border-bottom-color: transparent; border-left-color: transparent; animation: spin .5s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .outline { background: transparent; color: #0f766e; border-color: #99f6e4; }
    .outline:hover { background: #ccfbf1; }
    .subtle { background: #ccfbf1; color: #0f766e; }
    .subtle:hover { background: #99f6e4; }
  `,
  html: `
    <div class="row">
      <button class="ck solid" type="button"><span class="stack"><span class="in idle"><svg viewBox="0 0 24 24"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"/></svg>Email</span><span class="in ld" aria-hidden="true"><span class="sp"></span>Sending…</span></span></button>
      <button class="ck outline" type="button"><span class="in">Call us<svg viewBox="0 0 24 24"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"/></svg></span></button>
      <button class="ck subtle" type="button">Subtle</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.solid');
    let t;
    b.addEventListener('click', () => {
      if (b.hasAttribute('data-loading')) return;
      b.setAttribute('data-loading', ''); b.setAttribute('aria-busy', 'true');
      clearTimeout(t); t = setTimeout(() => { b.removeAttribute('data-loading'); b.removeAttribute('aria-busy'); }, 1800);
    });
    return () => clearTimeout(t);
  },
};
