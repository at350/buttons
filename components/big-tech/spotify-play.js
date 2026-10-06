export default {
  id: 'bt-spotify-play',
  credit: 'Spotify — round green play button (scales on hover) and black "Play" pill',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 20px; padding: 16px 20px; border-radius: 12px; background: #121212; }
    .pl {
      width: 56px; height: 56px; border-radius: 50%; border: 0; background: #1ed760; color: #000; cursor: pointer; padding: 0;
      display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 8px 8px rgba(0,0,0,.3);
      transition: transform 33ms cubic-bezier(.3,0,0,1), background 33ms; -webkit-tap-highlight-color: transparent;
    }
    .pl:hover { transform: scale(1.04); background: #1fdf64; }
    .pl:active { transform: scale(1); background: #169c46; }
    .pl:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
    .pl svg { width: 24px; height: 24px; fill: currentColor; }
    .pause { display: none; }
    .pl[aria-pressed="true"] .play { display: none; }
    .pl[aria-pressed="true"] .pause { display: block; }
    .pill {
      height: 48px; padding: 0 32px; border: 0; border-radius: 500px; background: #fff; color: #000; cursor: pointer;
      font: 700 16px/48px CircularSp, -apple-system, "Segoe UI", system-ui, sans-serif; letter-spacing: .2px;
      transition: transform 33ms cubic-bezier(.3,0,0,1), background 33ms; -webkit-tap-highlight-color: transparent;
    }
    .pill:hover { transform: scale(1.04); background: #f6f6f6; }
    .pill:active { transform: scale(1); background: #b7b7b7; }
    .pill:focus-visible { outline: 3px solid #1ed760; outline-offset: 2px; }
    .pill[aria-pressed="true"] { background: #1ed760; }
    .pill .lbl::after { content: 'Play'; }
    .pill[aria-pressed="true"] .lbl::after { content: 'Pause'; }
  `,
  html: `
    <div class="stage">
      <button class="pl" type="button" aria-pressed="false" aria-label="Play">
        <svg class="play" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/></svg>
        <svg class="pause" viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"/></svg>
      </button>
      <button class="pill" type="button" aria-pressed="false"><span class="lbl"></span></button>
    </div>`,
  init(root) {
    const a = root.querySelector('.pl');
    const b = root.querySelector('.pill');
    const set = (on) => { a.setAttribute('aria-pressed', on); b.setAttribute('aria-pressed', on); a.setAttribute('aria-label', on ? 'Pause' : 'Play'); };
    a.addEventListener('click', () => set(a.getAttribute('aria-pressed') !== 'true'));
    b.addEventListener('click', () => set(b.getAttribute('aria-pressed') !== 'true'));
  },
};
