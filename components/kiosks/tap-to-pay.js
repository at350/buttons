export default {
  id: 'ks-tap-to-pay',
  credit: 'Contactless card terminal — EMV contactless landing zone; a tap sends ripples out, the four green status lights fill in turn and the screen says Approved',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 22px 18px; border-radius: 12px; background: #e3e1dc; }
    .dev { width: 190px; padding: 12px; border-radius: 18px; background: linear-gradient(160deg, #2d2f33, #141517); box-shadow: 0 8px 14px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.14); }
    .leds { display: flex; justify-content: center; gap: 10px; margin-bottom: 8px; }
    .leds i { width: 18px; height: 5px; border-radius: 3px; background: #23352a; }
    .scr { position: relative; height: 66px; border-radius: 6px; background: #f6f7f8; display: grid; place-items: center; text-align: center; font-family: Inter, system-ui, sans-serif; color: #111; overflow: hidden; }
    .scr > div { grid-area: 1 / 1; }
    .a b { display: block; font-size: 22px; font-weight: 700; letter-spacing: -.01em; font-variant-numeric: tabular-nums; }
    .a span { font-size: 11px; color: #555; }
    .ok { visibility: hidden; color: #0d8a3a; font-weight: 700; font-size: 16px; display: flex; flex-direction: column; align-items: center; gap: 2px; }
    .ok svg { width: 26px; height: 26px; }
    .zone { position: relative; display: grid; place-items: center; width: 100%; height: 112px; margin-top: 12px; border: 0; padding: 0; border-radius: 12px; overflow: hidden; cursor: pointer;
      background: radial-gradient(circle at 50% 50%, #26282c, #1a1b1e 70%); box-shadow: inset 0 0 0 1px rgba(255,255,255,.07); -webkit-tap-highlight-color: transparent; }
    .zone:focus-visible { outline: 2px solid #4cd07d; outline-offset: 2px; }
    .zone svg.c { width: 56px; height: 56px; fill: #e9e9e9; transition: transform .15s, fill .2s; position: relative; z-index: 1; }
    .zone:hover svg.c { transform: scale(1.06); }
    .zone:active svg.c { transform: scale(.94); }
    .rip { position: absolute; left: 50%; top: 50%; width: 60px; height: 60px; margin: -30px; border-radius: 50%; border: 2px solid #4cd07d; opacity: 0; }
    .stage.tap .rip { animation: rip 1.1s cubic-bezier(.2,.6,.3,1) forwards; }
    .stage.tap .rip:nth-of-type(2) { animation-delay: .18s; } .stage.tap .rip:nth-of-type(3) { animation-delay: .36s; }
    @keyframes rip { 0% { transform: scale(.6); opacity: .9; } 100% { transform: scale(3); opacity: 0; } }
    .stage.tap .leds i { animation: led .01s forwards; }
    .stage.tap .leds i:nth-child(2) { animation-delay: .25s; } .stage.tap .leds i:nth-child(3) { animation-delay: .5s; } .stage.tap .leds i:nth-child(4) { animation-delay: .75s; }
    @keyframes led { to { background: #3cff6a; box-shadow: 0 0 8px rgba(60,255,106,.8); } }
    .stage.done .a { visibility: hidden; }
    .stage.done .ok { visibility: visible; animation: pop .28s cubic-bezier(.3,1.5,.5,1); }
    @keyframes pop { from { transform: scale(.8); } }
    .stage.tap:not(.done) .a span { color: #0d8a3a; }
    .stage.done svg.c { fill: #4cd07d; }
  `,
  html: `
    <div class="stage"><div class="dev">
      <div class="leds"><i></i><i></i><i></i><i></i></div>
      <div class="scr" aria-live="polite">
        <div class="a"><b>$18.75</b><span>Tap, insert or swipe</span></div>
        <div class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Approved</div>
      </div>
      <button class="zone" type="button" aria-label="Tap to pay" aria-pressed="false">
        <span class="rip"></span><span class="rip"></span><span class="rip"></span>
        <svg class="c" viewBox="0 0 256 256" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM97.07,100.26a59.33,59.33,0,0,1,0,55.48,8,8,0,1,1-14.14-7.48,42.79,42.79,0,0,0,0-40.52,8,8,0,0,1,14.14-7.480Zm56-32a126.67,126.67,0,0,1,0,119.54A8,8,0,0,1,139,180.23a110.62,110.62,0,0,0,0-104.46,8,8,0,0,1,14.12-7.54Zm-28,16a93,93,0,0,1,0,87.52,8,8,0,1,1-14.12-7.52,77,77,0,0,0,0-72.48,8,8,0,1,1,14.12-7.52Z"/></svg>
      </button>
    </div></div>`,
  init(root) {
    const st = root.querySelector('.stage'), z = root.querySelector('.zone'), msg = root.querySelector('.a span');
    let t;
    z.addEventListener('click', () => {
      clearTimeout(t);
      if (st.classList.contains('done')) { st.classList.remove('done', 'tap'); z.setAttribute('aria-pressed', 'false'); msg.textContent = 'Tap, insert or swipe'; return; }
      st.classList.remove('tap'); void st.offsetWidth; st.classList.add('tap'); msg.textContent = 'Processing…';
      t = setTimeout(() => { st.classList.add('done'); z.setAttribute('aria-pressed', 'true'); }, 1000);
    });
    return () => clearTimeout(t);
  },
};
