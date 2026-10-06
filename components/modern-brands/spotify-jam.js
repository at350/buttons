export default {
  id: 'mb-spotify-jam',
  credit: 'Spotify Jam — the green "Start a Jam" pill (scale 1.04 on hover); starting one stacks listener avatars in and the pill flips to the outlined "End Jam"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 18px 20px; border-radius: 12px; background: #121212; display: flex; align-items: center; gap: 14px;
      font: 700 16px/1 "Spotify Mix", "Circular Std", Inter, -apple-system, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .logo { width: 28px; height: 28px; fill: #1ed760; flex: none; }
    .jam { display: grid; height: 48px; padding: 0 32px; border-radius: 500px; border: 0; cursor: pointer; color: #000; background: #1ed760; font: inherit; letter-spacing: 0;
      transition: transform 33ms cubic-bezier(.3,0,0,1), background 33ms, box-shadow .2s; -webkit-tap-highlight-color: transparent; }
    .jam span { grid-area: 1 / 1; align-self: center; white-space: nowrap; }
    .jam .b { visibility: hidden; }
    .jam:hover { transform: scale(1.04); background: #3be477; }
    .jam:active { transform: scale(1); background: #1abc54; }
    .jam:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
    .jam[aria-pressed="true"] { background: transparent; color: #fff; box-shadow: inset 0 0 0 1px #7c7c7c; }
    .jam[aria-pressed="true"]:hover { box-shadow: inset 0 0 0 1px #fff; background: transparent; }
    .jam[aria-pressed="true"] .a { visibility: hidden; } .jam[aria-pressed="true"] .b { visibility: visible; }
    .ppl { display: flex; align-items: center; }
    .ppl > * { box-sizing: border-box; width: 32px; height: 32px; border-radius: 50%; border: 2px solid #121212; margin-left: -10px; flex: none;
      transform: scale(0); opacity: 0; transition: transform .45s cubic-bezier(.34,1.56,.64,1), opacity .2s; }
    .ppl img { display: block; object-fit: cover; background: #2a2a2a; }
    .ppl b { display: grid; place-items: center; background: #2a2a2a; color: #b3b3b3; font: 700 11px/1 Inter, system-ui, sans-serif; }
    .ppl > :nth-child(1) { margin-left: 0; }
    .ppl > :nth-child(2) { transition-delay: .07s; }
    .ppl > :nth-child(3) { transition-delay: .14s; }
    .ppl > :nth-child(4) { transition-delay: .21s; }
    .stage.on .ppl > * { transform: scale(1); opacity: 1; }
  `,
  html: `
    <div class="stage">
      <svg class="logo" viewBox="0 0 24 24" role="img" aria-label="Spotify"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
      <button class="jam" type="button" aria-pressed="false"><span class="a">Start a Jam</span><span class="b">End Jam</span></button>
      <span class="ppl" aria-hidden="true"><img src="assets/portraits/women-33.jpg" alt="" width="32" height="32"><img src="assets/portraits/men-38.jpg" alt="" width="32" height="32"><img src="assets/portraits/women-21.jpg" alt="" width="32" height="32"><b>+2</b></span>
    </div>`,
  init(root) {
    const b = root.querySelector('.jam'), stage = root.querySelector('.stage');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); stage.classList.toggle('on', on); });
  },
};
