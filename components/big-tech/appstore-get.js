export default {
  id: 'bt-appstore-get',
  credit: 'Apple App Store — "GET" pill that downloads (ring progress) then becomes "OPEN"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 32px; }
    .get {
      display: inline-flex; align-items: center; justify-content: center;
      height: 28px; min-width: 72px; padding: 0 14px; border: 0; border-radius: 14px;
      background: #f0f0f5; color: #007aff; font: 700 15px/28px -apple-system, system-ui, sans-serif;
      letter-spacing: .2px; cursor: pointer; transition: transform .1s, background .15s, opacity .15s;
      -webkit-tap-highlight-color: transparent;
    }
    .get:active { transform: scale(.94); opacity: .7; }
    .get:focus-visible { outline: 2px solid #007aff; outline-offset: 2px; }
    .ring { display: none; width: 28px; height: 28px; }
    .ring circle { fill: none; stroke-width: 2.5; }
    .ring .bg { stroke: #d9d9de; }
    .ring .fg { stroke: #007aff; stroke-linecap: round; stroke-dasharray: 72; stroke-dashoffset: 72; transform: rotate(-90deg); transform-origin: 50% 50%; }
    .ring rect { fill: #007aff; }
    /* While downloading the same button shrinks to the bare ring; clicking it cancels. */
    .wrap.loading .get { width: 28px; min-width: 0; padding: 0; border-radius: 50%; background: transparent; transition: transform .1s, opacity .15s; }
    .wrap.loading .lbl { display: none; }
    .wrap.loading .ring { display: block; }
    .wrap.loading .fg { animation: fill 1.6s linear forwards; }
    @keyframes fill { to { stroke-dashoffset: 0; } }
  `,
  html: `
    <div class="wrap">
      <button class="get" type="button" aria-label="Get">
        <span class="lbl">GET</span>
        <svg class="ring" viewBox="0 0 28 28" aria-hidden="true"><circle class="bg" cx="14" cy="14" r="11.5"/><circle class="fg" cx="14" cy="14" r="11.5"/><rect x="10" y="10" width="8" height="8" rx="1.5"/></svg>
      </button>
    </div>`,
  init(root) {
    const wrap = root.querySelector('.wrap');
    const btn = root.querySelector('.get');
    const lbl = root.querySelector('.lbl');
    const fg = root.querySelector('.fg');
    const LABELS = { get: 'Get', loading: 'Cancel download', open: 'Open' };
    const setState = (s) => {
      wrap.classList.toggle('loading', s === 'loading');
      if (s !== 'loading') lbl.textContent = s === 'open' ? 'OPEN' : 'GET';
      btn.setAttribute('aria-label', LABELS[s]);
      btn.setAttribute('aria-busy', String(s === 'loading'));
    };
    btn.addEventListener('click', () => {
      if (wrap.classList.contains('loading')) setState('get');          // cancel
      else if (lbl.textContent === 'OPEN') setState('get');             // reset
      else setState('loading');                                         // start download
    });
    // Removing .loading on cancel drops the animation (animationcancel, not animationend), so this only fires on completion.
    fg.addEventListener('animationend', () => setState('open'));
  },
};
