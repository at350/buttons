// "Turn Off the Lights" (Stefan Van Damme's browser extension) on a YouTube watch page: the grey bulb sits in the
// browser toolbar; clicking it fades a near-black curtain over the whole page except the playing video, and the bulb
// lights up amber. Page content is real YouTube chrome: logo, 16:9 player, title, channel row, Subscribe, Up next.
const YT = 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z';
const NEXT = [['01', 'Rain on a Pine Forest', '1:02:14'], ['20', 'Wind Through Wheat', '48:30'], ['33', 'Night Sky Timelapse', '12:07']];
export default {
  id: 'ob-lights-off',
  credit: '"Turn Off the Lights" browser extension on a YouTube watch page — click the bulb in the toolbar and everything but the video fades to black; click again to bring the lights back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .win { width: 330px; max-width: 100%; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: inset 0 0 0 1px #dcdcdc; font-family: Roboto, 'Roboto Flex', Arial, system-ui, sans-serif; }
    .bar { display: flex; align-items: center; gap: 8px; height: 30px; padding: 0 8px; background: #f1f3f4; border-bottom: 1px solid #dadce0; }
    .url { flex: 1; min-width: 0; height: 20px; border-radius: 10px; background: #fff; color: #5f6368; font: 400 10.5px/20px Roboto, Arial, system-ui, sans-serif; padding: 0 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .url b { color: #202124; font-weight: 400; }
    .lamp { width: 24px; height: 24px; flex: none; border: none; border-radius: 50%; background: none; cursor: pointer; display: grid; place-items: center; padding: 0; transition: background .2s; }
    .lamp:hover { background: rgba(60,64,67,.1); }
    .lamp:focus-visible { outline: 2px solid #1a73e8; outline-offset: 1px; }
    .lamp svg { width: 17px; height: 17px; fill: #e8eaed; stroke: #5f6368; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: fill .4s, stroke .4s, filter .4s; }
    .on .lamp svg { fill: #ffd54f; stroke: #f9a825; filter: drop-shadow(0 0 4px rgba(255,193,7,.9)); }
    .page { position: relative; padding: 8px 10px 10px; }
    .yt { display: flex; align-items: center; gap: 3px; height: 16px; margin-bottom: 8px; font: 700 12px/1 'Roboto Flex', Roboto, Arial, sans-serif; letter-spacing: -.5px; color: #0f0f0f; }
    .yt svg { width: 20px; height: 14px; fill: #ff0000; }
    .grid { display: grid; grid-template-columns: minmax(0, 1fr) 88px; gap: 8px; }
    .vid { position: relative; z-index: 2; aspect-ratio: 16 / 9; border-radius: 6px; overflow: hidden; background: #000; }
    .vid img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .prog { position: absolute; left: 6px; right: 6px; bottom: 5px; height: 3px; background: rgba(255,255,255,.35); border-radius: 2px; }
    .prog i { display: block; width: 38%; height: 100%; background: #f00; border-radius: 2px; }
    .ttl { margin: 6px 0 4px; font: 500 11.5px/1.3 Roboto, Arial, system-ui, sans-serif; color: #0f0f0f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ch { display: flex; align-items: center; gap: 6px; }
    .ch img { width: 20px; height: 20px; border-radius: 50%; object-fit: cover; }
    .ch > span:not(.sub) { min-width: 0; white-space: nowrap; font: 500 10.5px Roboto, Arial, system-ui, sans-serif; color: #0f0f0f; line-height: 1.2; }
    .ch small { display: block; color: #606060; font-weight: 400; font-size: 9px; }
    .ch .sub { margin-left: auto; flex: none; height: 20px; padding: 0 9px; border-radius: 10px; background: #0f0f0f; color: #fff; font: 500 10px/20px Roboto, Arial, system-ui, sans-serif; }
    .side { display: grid; gap: 6px; align-content: start; }
    .nx { position: relative; }
    .nx img { width: 88px; aspect-ratio: 16 / 9; border-radius: 4px; object-fit: cover; display: block; }
    .nx em { position: absolute; right: 3px; top: 34px; padding: 0 3px; border-radius: 3px; background: rgba(0,0,0,.8); color: #fff; font: 500 8px/12px Roboto, Arial, sans-serif; font-style: normal; }
    .nx span { display: block; margin-top: 2px; font: 500 9px/1.2 Roboto, Arial, system-ui, sans-serif; color: #0f0f0f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .curtain { position: absolute; inset: 0; z-index: 1; background: #000; opacity: 0; pointer-events: none; transition: opacity .6s ease; }
    .on .curtain { opacity: .9; }
    .on .vid { box-shadow: 0 0 24px rgba(255,255,255,.08); }
  `,
  html: `
    <div class="win">
      <div class="bar"><span class="url"><b>youtube.com</b>/watch?v=golden-hour-meadow</span>
        <button class="lamp" type="button" aria-pressed="false" aria-label="Turn Off the Lights"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6" fill="none"/><path d="M10 22h4" fill="none"/></svg></button>
      </div>
      <div class="page">
        <div class="yt" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${YT}"/></svg>YouTube</div>
        <div class="grid">
          <div>
            <div class="vid"><img src="assets/wide/22.webp" alt="" width="216" height="122"><span class="prog"><i></i></span></div>
            <div class="ttl">Golden Hour in the Meadow — 4K Nature Ambience</div>
            <div class="ch"><img src="assets/portraits/men-23.jpg" alt="" width="20" height="20"><span>Quiet Fields<small>412K subscribers</small></span><span class="sub">Subscribe</span></div>
          </div>
          <div class="side">${NEXT.map(([f, t, d]) => `<div class="nx"><img src="assets/wide/${f}.webp" alt="" width="88" height="50"><em>${d}</em><span>${t}</span></div>`).join('')}</div>
        </div>
        <div class="curtain"></div>
      </div>
    </div>`,
  init(root) {
    const win = root.querySelector('.win'), lamp = root.querySelector('.lamp');
    lamp.addEventListener('click', () => { const on = win.classList.toggle('on'); lamp.setAttribute('aria-pressed', String(on)); });
  },
};
