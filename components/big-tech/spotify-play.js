// Spotify artist action bar: the green play button, shuffle toggle and the outlined "Follow" pill.
// Follow / Following share one grid cell so the pill keeps the wider width.
export default {
  id: 'bt-spotify-play',
  credit: 'Spotify — artist page action bar: green play button, shuffle and outlined "Follow" pill (Encore)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 24px; padding: 16px 24px; border-radius: 12px; background: linear-gradient(#1f1f1f, #121212); white-space: nowrap; }
    .pl {
      width: 56px; height: 56px; border-radius: 50%; border: 0; background: #1ed760; color: #000; cursor: pointer; padding: 0; flex: none;
      display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 8px 8px rgba(0,0,0,.3);
      transition: transform 33ms cubic-bezier(.3,0,0,1), background-color 33ms; -webkit-tap-highlight-color: transparent;
    }
    .pl:hover { transform: scale(1.04); background: #3be477; }
    .pl:active { transform: scale(1); background: #1abc54; }
    .pl:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
    .pl svg { width: 24px; height: 24px; fill: currentColor; }
    .pl .pause { display: none; }
    .pl[aria-pressed="true"] .play { display: none; }
    .pl[aria-pressed="true"] .pause { display: block; }
    .sh {
      position: relative; width: 32px; height: 32px; border: 0; padding: 0; background: none; color: #b3b3b3; cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center; transition: transform 33ms cubic-bezier(.3,0,0,1), color 33ms; -webkit-tap-highlight-color: transparent;
    }
    .sh:hover { color: #fff; transform: scale(1.04); }
    .sh:active { transform: scale(1); color: #b3b3b3; }
    .sh:focus-visible { outline: 2px solid #fff; outline-offset: 2px; border-radius: 4px; }
    .sh svg { width: 32px; height: 32px; fill: currentColor; }
    .sh[aria-pressed="true"] { color: #1ed760; }
    .sh[aria-pressed="true"]:hover { color: #3be477; }
    .sh[aria-pressed="true"]::after { content: ''; position: absolute; bottom: -6px; left: 50%; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: #1ed760; }
    .fo {
      height: 32px; padding: 0 15px; border: 1px solid #7c7c7c; border-radius: 9999px; background: transparent; color: #fff; cursor: pointer;
      font: 700 14px/1 SpotifyMixUI, CircularSp, "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: .1px;
      display: inline-grid; place-items: center; transition: transform 33ms cubic-bezier(.3,0,0,1), border-color 33ms; -webkit-tap-highlight-color: transparent;
    }
    .fo:hover { border-color: #fff; transform: scale(1.04); }
    .fo:active { transform: scale(1); border-color: #7c7c7c; }
    .fo:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
    .fo span { grid-area: 1 / 1; }
    .fo .b { visibility: hidden; }
    .fo[aria-pressed="true"] .a { visibility: hidden; }
    .fo[aria-pressed="true"] .b { visibility: visible; }
  `,
  html: `
    <div class="stage">
      <button class="pl" type="button" aria-pressed="false" aria-label="Play">
        <svg class="play" viewBox="0 0 24 24" aria-hidden="true"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/></svg>
        <svg class="pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"/></svg>
      </button>
      <button class="sh" type="button" aria-pressed="false" aria-label="Enable shuffle"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"/><path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"/></svg></button>
      <button class="fo" type="button" aria-pressed="false"><span class="a">Follow</span><span class="b">Following</span></button>
    </div>`,
  init(root) {
    const pl = root.querySelector('.pl');
    const sh = root.querySelector('.sh');
    const fo = root.querySelector('.fo');
    pl.addEventListener('click', () => { const on = pl.getAttribute('aria-pressed') !== 'true'; pl.setAttribute('aria-pressed', String(on)); pl.setAttribute('aria-label', on ? 'Pause' : 'Play'); });
    sh.addEventListener('click', () => { const on = sh.getAttribute('aria-pressed') !== 'true'; sh.setAttribute('aria-pressed', String(on)); sh.setAttribute('aria-label', on ? 'Disable shuffle' : 'Enable shuffle'); });
    fo.addEventListener('click', () => fo.setAttribute('aria-pressed', String(fo.getAttribute('aria-pressed') !== 'true')));
  },
};
