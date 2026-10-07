// Netflix billboard buttons. Play/Pause labels share one grid cell so toggling never changes the width.
export default {
  id: 'bt-netflix-play',
  credit: 'Netflix — billboard white "Play" and translucent gray "More Info" buttons',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: grid; gap: 10px; padding: 18px 24px 24px; border-radius: 12px; background: linear-gradient(90deg, #141414 8%, rgba(20,20,20,.55) 48%, rgba(20,20,20,0) 80%), linear-gradient(0deg, rgba(20,20,20,.6), rgba(20,20,20,0) 50%), #141414 url(assets/real/bt-stranger-things-s4.jpg) right -6px top -24px / 292px auto no-repeat; }
    .ttl { display: grid; gap: 3px; color: #fff; }
    .ttl b { font: 800 19px/1 "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #e50914; text-shadow: 0 1px 8px rgba(0,0,0,.7); }
    .ttl span { font: 500 12px/1 "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #d2d2d2; text-shadow: 0 1px 6px rgba(0,0,0,.8); }
    .row { display: flex; gap: 12px; }
    .nf {
      height: 42px; padding: 0 26px 0 22px; border: 0; border-radius: 4px; cursor: pointer; white-space: nowrap;
      font: 500 17.6px/24px "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
      display: inline-flex; align-items: center; gap: 12px; transition: background-color .2s ease, opacity .2s ease; -webkit-tap-highlight-color: transparent;
    }
    .play { background: #fff; color: #000; }
    .play:hover { background: rgba(255,255,255,.75); }
    .info { background: rgba(109,109,110,.7); color: #fff; }
    .info:hover { background: rgba(109,109,110,.4); }
    .nf:active { opacity: .7; }
    .nf:focus-visible { outline: none; box-shadow: 0 0 0 2px #141414, 0 0 0 4px #fff; }
    .nf svg { width: 24px; height: 24px; fill: currentColor; display: block; }
    .stk { display: grid; }
    .stk > * { grid-area: 1 / 1; }
    .play .b { visibility: hidden; }
    .play[aria-pressed="true"] .a { visibility: hidden; }
    .play[aria-pressed="true"] .b { visibility: visible; }
  `,
  html: `
    <div class="stage">
      <div class="ttl"><b>Stranger Things</b><span>Season 4 &nbsp;·&nbsp; TV-14</span></div>
      <div class="row">
      <button class="nf play" type="button" aria-pressed="false">
        <span class="stk" aria-hidden="true">
          <svg class="a" viewBox="0 0 24 24"><path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"/></svg>
          <svg class="b" viewBox="0 0 24 24"><path d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z"/></svg>
        </span>
        <span class="stk"><span class="a">Play</span><span class="b">Pause</span></span>
      </button>
      <button class="nf info" type="button" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"/></svg>
        More Info
      </button>
      </div>
    </div>`,
  init(root) {
    const play = root.querySelector('.play');
    const info = root.querySelector('.info');
    play.addEventListener('click', () => play.setAttribute('aria-pressed', String(play.getAttribute('aria-pressed') !== 'true')));
    info.addEventListener('click', () => info.setAttribute('aria-expanded', String(info.getAttribute('aria-expanded') !== 'true')));
  },
};
