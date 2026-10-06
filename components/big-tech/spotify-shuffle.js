export default {
  id: 'bt-spotify-shuffle',
  credit: 'Spotify — player transport: shuffle toggle (green dot), prev / next, repeat cycle',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 18px; padding: 14px 22px; border-radius: 12px; background: #121212; }
    .tb {
      position: relative; width: 32px; height: 32px; border: 0; background: none; color: #b3b3b3; cursor: pointer; padding: 0;
      display: inline-flex; align-items: center; justify-content: center; transition: color .1s, transform .1s; -webkit-tap-highlight-color: transparent;
    }
    .tb:hover { color: #fff; }
    .tb:active { transform: scale(.94); color: #b3b3b3; }
    .tb:focus-visible { outline: 2px solid #fff; outline-offset: 2px; border-radius: 4px; }
    .tb svg { width: 16px; height: 16px; fill: currentColor; }
    .tb[aria-pressed="true"] { color: #1ed760; }
    .tb[aria-pressed="true"]:hover { color: #1fdf64; }
    .tb[aria-pressed="true"]::after { content: ''; position: absolute; bottom: 0; left: 50%; width: 4px; height: 4px; border-radius: 50%; background: #1ed760; transform: translateX(-50%); }
    .one { display: none; }
    .tb[data-mode="2"] .all { display: none; }
    .tb[data-mode="2"] .one { display: block; }
  `,
  html: `
    <div class="stage">
      <button class="tb shuf" type="button" aria-pressed="false" aria-label="Shuffle"><svg viewBox="0 0 16 16"><path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"/><path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"/></svg></button>
      <button class="tb" type="button" aria-label="Previous"><svg viewBox="0 0 16 16"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"/></svg></button>
      <button class="tb" type="button" aria-label="Next"><svg viewBox="0 0 16 16"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"/></svg></button>
      <button class="tb rep" type="button" aria-pressed="false" data-mode="0" aria-label="Repeat">
        <svg class="all" viewBox="0 0 16 16"><path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"/></svg>
        <svg class="one" viewBox="0 0 16 16"><path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"/><path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"/></svg>
      </button>
    </div>`,
  init(root) {
    const sh = root.querySelector('.shuf');
    const rep = root.querySelector('.rep');
    sh.addEventListener('click', () => sh.setAttribute('aria-pressed', sh.getAttribute('aria-pressed') !== 'true'));
    rep.addEventListener('click', () => {
      const m = (+rep.dataset.mode + 1) % 3;
      rep.dataset.mode = m;
      rep.setAttribute('aria-pressed', m > 0);
    });
  },
};
