export default {
  id: 'gm-ps5-tiles',
  credit: 'Sony PlayStation 5 — home-screen game tile row; the focused tile grows and glows, PS-button pill below',
  size: 'wide',
  css: `
    :host { display: block; max-width: 100%; }
    .stage { background: radial-gradient(ellipse at 30% 20%, #1d2a4a 0%, #0b1020 55%, #05070f 100%); border-radius: 12px; padding: 22px 20px 16px; overflow: hidden; }
    .row { display: flex; gap: 8px; align-items: flex-end; height: 76px; }
    .tile { width: 50px; height: 50px; border-radius: 10px; border: none; padding: 0; cursor: pointer; flex: none; position: relative;
      transition: width .25s cubic-bezier(.2,.8,.2,1), height .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s; box-shadow: 0 4px 12px rgba(0,0,0,.5); }
    .tile.sel { width: 68px; height: 68px; box-shadow: 0 0 0 3px #fff, 0 0 22px 6px rgba(255,255,255,.35), 0 8px 24px rgba(0,0,0,.6); }
    .tile:focus-visible { outline: 2px solid #2e6cf6; outline-offset: 3px; }
    .tile:hover:not(.sel) { transform: translateY(-3px); }
    .t1 { background: linear-gradient(135deg, #ff7a00, #c1121f 60%, #5b0a0a); }
    .t2 { background: linear-gradient(160deg, #5fd3ff, #0c4a7a 70%); }
    .t3 { background: linear-gradient(135deg, #e5e5e5, #8a8a8a 50%, #2b2b2b); }
    .t4 { background: linear-gradient(135deg, #b8f26b, #1f7a3a 70%); }
    .t5 { background: linear-gradient(135deg, #b47aff, #4a1b9c 70%); }
    .t6 { background: linear-gradient(135deg, #ffd166, #c9792b 70%, #6a3410); }
    .tile svg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .55; mix-blend-mode: overlay; }
    .ps { margin-top: 12px; display: inline-flex; align-items: center; gap: 8px; height: 26px; padding: 0 12px 0 6px; border-radius: 13px;
      background: rgba(255,255,255,.12); color: #fff; font: 600 11px 'Inter', system-ui, sans-serif; letter-spacing: .3px; }
    .ps .glyph { width: 18px; height: 18px; border-radius: 50%; background: #fff; display: grid; place-items: center; }
    .ps .glyph svg { width: 11px; height: 11px; fill: #0b1020; }
  `,
  html: `
    <div class="stage">
      <div class="row" role="listbox" aria-label="Games">
        <button class="tile t1 sel" type="button" role="option" aria-selected="true" aria-label="Game 1"><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="#fff"/></svg></button>
        <button class="tile t2" type="button" role="option" aria-selected="false" aria-label="Game 2"><svg viewBox="0 0 10 10"><path d="M1 8 5 2l4 6z" fill="#fff"/></svg></button>
        <button class="tile t3" type="button" role="option" aria-selected="false" aria-label="Game 3"><svg viewBox="0 0 10 10"><rect x="2.5" y="2.5" width="5" height="5" fill="#fff"/></svg></button>
        <button class="tile t4" type="button" role="option" aria-selected="false" aria-label="Game 4"><svg viewBox="0 0 10 10"><path d="M5 1l4 4-4 4-4-4z" fill="#fff"/></svg></button>
        <button class="tile t5" type="button" role="option" aria-selected="false" aria-label="Game 5"><svg viewBox="0 0 10 10"><path d="M2 2h6v6H2z M4 4h2v2H4z" fill="#fff" fill-rule="evenodd"/></svg></button>
        <button class="tile t6" type="button" role="option" aria-selected="false" aria-label="Game 6"><svg viewBox="0 0 10 10"><path d="M5 1 6.2 3.9 9.3 4.1 6.9 6 7.7 9 5 7.3 2.3 9l.8-3L.7 4.1l3.1-.2z" fill="#fff"/></svg></button>
      </div>
      <div class="ps"><span class="glyph"><svg viewBox="0 0 24 24"><path d="M9 3v16.5l3.6 1.2V7.3c0-.7.3-1.1.8-1 .7.2.8.9.8 1.5v5.4c2.3 1.1 4-.1 4-3 0-3-1-4.3-4-5.3L9 3zM4.4 16.7c-1.6.5-1.9 1.4-1.1 2 .7.5 2 .8 3.6.5l1.9-.7v-2.2l-2.2.8c-.8.3-1.9.3-2.2 0-.3-.3.2-.6 1-.9l1.4-.5v-2.3l-2.4.8z"/></svg></span>Press to continue</div>
    </div>`,
  init(root) {
    const tiles = [...root.querySelectorAll('.tile')];
    const pick = (t) => tiles.forEach((o) => { const on = o === t; o.classList.toggle('sel', on); o.setAttribute('aria-selected', String(on)); });
    tiles.forEach((t, i) => {
      t.addEventListener('click', () => pick(t));
      t.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!d) return; e.preventDefault();
        const n = tiles[(i + d + tiles.length) % tiles.length]; pick(n); n.focus();
      });
    });
  },
};
