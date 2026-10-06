export default {
  id: 'ob-useless-web',
  credit: 'TheUselessWeb.com — the big pink "PLEASE" button; every press flings you to a different pointless site (here: a different pointless pattern)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; max-width: 100%; height: 160px; border-radius: 12px; overflow: hidden; background: #fff; display: grid; place-items: center; transition: background .4s; }
    .please { position: relative; padding: 16px 38px; border: 0; border-radius: 6px; background: #ff5a8d; color: #fff; cursor: pointer; font: 700 28px/1 "Open Sans", Arial, Helvetica, sans-serif; letter-spacing: 1px; box-shadow: 0 6px 0 #c23a66, 0 10px 20px rgba(0,0,0,.2); transition: transform .08s, box-shadow .08s, background .15s; }
    .please:hover { background: #ff6d9b; }
    .please:active { transform: translateY(5px); box-shadow: 0 1px 0 #c23a66, 0 4px 8px rgba(0,0,0,.2); }
    .please:focus-visible { outline: 3px solid #333; outline-offset: 4px; }
    .n { position: absolute; left: 10px; top: 8px; font: 700 11px Arial, Helvetica, sans-serif; color: rgba(0,0,0,.45); }
    .stage.p7 .n { color: #0f0; }
    .site { position: absolute; left: 0; right: 0; bottom: 8px; text-align: center; font: 700 10px Arial, Helvetica, sans-serif; letter-spacing: 1px; color: rgba(0,0,0,.45); text-transform: lowercase; }
    .stage.p1 { background: repeating-linear-gradient(45deg, #ffe600 0 14px, #000 14px 28px); }
    .stage.p2 { background: radial-gradient(circle, #0ff 20%, transparent 21%) 0 0 / 24px 24px, #f0f; }
    .stage.p3 { background: linear-gradient(90deg, #f00, #ff8000, #ff0, #0f0, #0ff, #00f, #8000ff); }
    .stage.p4 { background: repeating-radial-gradient(circle at 50% 50%, #fff 0 8px, #222 8px 16px); }
    .stage.p5 { background: conic-gradient(#39f, #f93, #3f9, #93f, #39f); }
    .stage.p6 { background: repeating-linear-gradient(0deg, #cfc 0 6px, #060 6px 8px); }
    .stage.p7 { background: #000; }
    .stage.p7 .site { color: #0f0; }
    .stage.p8 { background: linear-gradient(135deg, #ffd1dc 25%, transparent 25%) -14px 0 / 28px 28px, linear-gradient(225deg, #ffd1dc 25%, transparent 25%) -14px 0 / 28px 28px, #fff0f5; }
  `,
  html: `
    <div class="stage">
      <button class="please" type="button">PLEASE</button>
      <span class="site" aria-live="polite">theuselessweb.com</span>
      <span class="n" aria-hidden="true"></span>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), btn = root.querySelector('.please'), site = root.querySelector('.site');
    const sites = ['eelslap.com', 'cat-bounce.com', 'pointerpointer.com', 'heeeeeeeey.com', 'koalastothemax.com', 'ducksarethebest.com', 'hackertyper.net', 'corndog.io', 'staggeringbeauty.com', 'isitchristmas.com'];
    const n = root.querySelector('.n');
    let last = 0, visits = 0;
    btn.addEventListener('click', () => {
      visits++; n.textContent = visits + (visits === 1 ? ' site' : ' sites');
      let k; do { k = 1 + Math.floor(Math.random() * 8); } while (k === last); last = k;
      stage.className = 'stage p' + k; site.textContent = sites[Math.floor(Math.random() * sites.length)];
    });
  },
};
