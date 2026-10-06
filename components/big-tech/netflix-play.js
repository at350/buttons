export default {
  id: 'bt-netflix-play',
  credit: 'Netflix — billboard "Play" button and translucent "More Info" button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 12px; flex-wrap: wrap; padding: 20px 24px; border-radius: 12px; background: linear-gradient(135deg, #2b0d0f, #141414 60%); }
    .nf {
      height: 44px; padding: 0 24px 0 20px; border: 0; border-radius: 4px; cursor: pointer;
      font: 700 17px/44px "Netflix Sans", -apple-system, "Helvetica Neue", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 10px; transition: background .2s, opacity .2s; -webkit-tap-highlight-color: transparent;
    }
    .play { background: #fff; color: #000; }
    .play:hover { background: rgba(255,255,255,.75); }
    .info { background: rgba(109,109,110,.7); color: #fff; }
    .info:hover { background: rgba(109,109,110,.4); }
    .nf:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .nf svg { width: 24px; height: 24px; fill: currentColor; }
    .play .pause { display: none; }
    .play[aria-pressed="true"] .tri { display: none; }
    .play[aria-pressed="true"] .pause { display: block; }
    .play .lbl::after { content: 'Play'; }
    .play[aria-pressed="true"] .lbl::after { content: 'Pause'; }
    .info[aria-pressed="true"] { background: #e50914; }
  `,
  html: `
    <div class="stage">
      <button class="nf play" type="button" aria-pressed="false">
        <svg class="tri" viewBox="0 0 24 24"><path d="M5 2.69a1 1 0 0 1 1.5-.86l15.5 9.31a1 1 0 0 1 0 1.72L6.5 22.17A1 1 0 0 1 5 21.31V2.69z"/></svg>
        <svg class="pause" viewBox="0 0 24 24"><path d="M5 3h5v18H5V3zm9 0h5v18h-5V3z"/></svg>
        <span class="lbl"></span>
      </button>
      <button class="nf info" type="button" aria-pressed="false">
        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm-1 5h2v8h-2V9zm0-3h2v2h-2V6z"/></svg>
        More Info
      </button>
    </div>`,
  init(root) {
    root.querySelectorAll('.nf').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
