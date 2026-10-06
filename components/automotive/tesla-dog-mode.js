export default {
  id: 'au-tesla-dog-mode',
  credit: 'Tesla — "Keep Climate On" selector Off / On / Dog / Camp; Dog swaps the screen to the big "My owner will be back soon." temperature card',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; padding: 14px; border-radius: 12px; background: #000; color: #fff; font: 500 13px/1 Inter, -apple-system, system-ui, sans-serif; }
    .hd { display: flex; justify-content: space-between; align-items: center; color: #a0a0a0; font-size: 12px; margin-bottom: 10px; }
    .hd b { font-weight: 500; color: #fff; }
    .seg { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); padding: 3px; border-radius: 10px; background: #1d1d1d; }
    .pill { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc((100% - 6px) / 4); border-radius: 8px; background: #3a3a3a; transition: transform .35s cubic-bezier(.32,.72,0,1); }
    .opt { position: relative; z-index: 1; height: 50px; border: 0; background: transparent; color: #8a8a8a; cursor: pointer; display: grid; place-items: center; align-content: center; gap: 5px; font: 500 11px/1 Inter, system-ui, sans-serif; transition: color .2s; -webkit-tap-highlight-color: transparent; }
    .opt:hover { color: #cfcfcf; }
    .opt[aria-checked="true"] { color: #fff; }
    .opt:focus-visible { outline: 2px solid #3e6ae1; outline-offset: -2px; border-radius: 8px; }
    .opt svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .scr { position: relative; height: 112px; margin-top: 12px; border-radius: 10px; background: #111; overflow: hidden; }
    .v { position: absolute; inset: 0; display: grid; place-items: center; align-content: center; gap: 8px; opacity: 0; transform: scale(.96); transition: opacity .3s, transform .4s cubic-bezier(.32,.72,0,1); }
    .v.on { opacity: 1; transform: none; }
    .big { font: 200 44px/1 Inter, system-ui, sans-serif; letter-spacing: -.03em; }
    .msg { font: 500 13px/1.2 Inter, system-ui, sans-serif; color: #e6e6e6; }
    .v svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .dog { background: radial-gradient(120% 90% at 50% 0%, #1d2a44, #0b0f18); }
    .dog .row { display: flex; align-items: center; gap: 10px; }
    .dog svg { color: #9cc0ff; }
    .off .big { color: #444; }
    .spin { animation: spin 1.6s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .camp { background: radial-gradient(120% 90% at 50% 100%, #2a1d10, #0d0a07); }
    .camp svg { color: #ffb366; }
  `,
  html: `
    <div class="stage">
      <div class="hd"><b>Keep Climate On</b><span>70°F</span></div>
      <div class="seg" role="radiogroup" aria-label="Keep Climate On">
        <span class="pill"></span>
        <button class="opt" type="button" role="radio" aria-checked="true"><svg viewBox="0 0 24 24"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg>Off</button>
        <button class="opt" type="button" role="radio" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/></svg>On</button>
        <button class="opt" type="button" role="radio" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/></svg>Dog</button>
        <button class="opt" type="button" role="radio" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/></svg>Camp</button>
      </div>
      <div class="scr">
        <div class="v off on"><div class="big">--°</div></div>
        <div class="v"><svg class="spin" viewBox="0 0 24 24"><path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/></svg><div class="big">70°F</div></div>
        <div class="v dog"><div class="big">70°F</div><div class="row"><svg viewBox="0 0 24 24"><path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/></svg><span class="msg">My owner will be back soon.</span></div></div>
        <div class="v camp"><svg viewBox="0 0 24 24"><path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/></svg><div class="big">70°F</div></div>
      </div>
    </div>`,
  init(root) {
    const opts = [...root.querySelectorAll('.opt')], views = [...root.querySelectorAll('.v')], pill = root.querySelector('.pill');
    const pick = (i) => {
      opts.forEach((o, j) => { o.setAttribute('aria-checked', String(i === j)); o.tabIndex = i === j ? 0 : -1; });
      views.forEach((v, j) => v.classList.toggle('on', i === j));
      pill.style.transform = `translateX(${i * 100}%)`;
    };
    opts.forEach((o, i) => {
      o.addEventListener('click', () => pick(opts.indexOf(o) === i && o.getAttribute('aria-checked') === 'true' && i ? 0 : i));
      o.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); const n = (i + d + 4) % 4; pick(n); opts[n].focus(); }
      });
    });
    pick(0);
  },
};
