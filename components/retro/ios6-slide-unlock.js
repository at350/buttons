export default {
  id: 'rt-ios6-slide-unlock',
  credit: 'iOS 6 lock screen — clock bar over the wallpaper and "slide to unlock": glinting label in the black well, silver knob with the grey arrow',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .stage { width: 320px; max-width: 100%; border-radius: 12px; overflow: hidden; background: #0b1a24 url(assets/tall/00.webp) center 30% / cover; }
    .clk { height: 78px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; color: #fff; text-shadow: 0 -1px 0 rgba(0,0,0,.6);
      background: linear-gradient(180deg, rgba(0,0,0,.62), rgba(0,0,0,.42)); border-bottom: 1px solid rgba(255,255,255,.14); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .clk b { font: 200 46px/1 "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: -.5px; }
    .clk span { font: 500 12px/1.2 "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .wall { height: 64px; }
    .slab { padding: 22px 16px; background: linear-gradient(180deg, rgba(58,58,62,.88) 0%, rgba(28,28,31,.88) 48%, rgba(0,0,0,.9) 52%, rgba(11,11,12,.92) 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
    .track { position: relative; height: 47px; max-width: 288px; margin: 0 auto; border-radius: 10px; overflow: hidden;
      background: linear-gradient(#000, #141416); box-shadow: inset 0 1px 3px rgba(0,0,0,1), 0 1px 0 rgba(255,255,255,.22); }
    .label { position: absolute; inset: 0; display: grid; place-items: center; padding-left: 74px; user-select: none; pointer-events: none; white-space: nowrap;
      font: 300 22px "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: .2px;
      background: linear-gradient(90deg, #6d6d6d 0%, #6d6d6d 42%, #fff 50%, #6d6d6d 58%, #6d6d6d 100%); background-size: 300% 100%;
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
      animation: glint 2.6s linear infinite; transition: opacity .15s; }
    .track.unlocked .label { opacity: 0 !important; }
    .knob { position: absolute; top: 2px; left: 2px; width: 80px; height: 43px; border-radius: 8px; border: none; padding: 0; cursor: grab; touch-action: none; outline: none;
      background: linear-gradient(#fefefe 0%, #f0f0f0 45%, #dcdcdc 52%, #cfcfcf 100%); box-shadow: 0 1px 2px rgba(0,0,0,.8), inset 0 1px 0 #fff, inset 0 -1px 0 rgba(0,0,0,.12);
      display: grid; place-items: center; transition: left .3s cubic-bezier(.32,.72,0,1); }
    .knob:active { cursor: grabbing; transition: none; background: linear-gradient(#e8e8e8 0%, #dadada 45%, #c4c4c4 52%, #bcbcbc 100%); }
    .knob:focus-visible { box-shadow: 0 0 0 2px #4da3ff, 0 1px 2px rgba(0,0,0,.8); }
    @keyframes glint { from { background-position: 100% 0; } to { background-position: 0% 0; } }
  `,
  html: `
    <div class="stage">
      <div class="clk" aria-hidden="true"><b>9:41</b><span>Monday, September 17</span></div>
      <div class="wall"></div>
      <div class="slab">
      <div class="track">
        <button class="knob" type="button" aria-label="slide to unlock" aria-pressed="false">
          <svg width="30" height="22" viewBox="0 0 30 22" aria-hidden="true"><defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9a9a9"/><stop offset="1" stop-color="#6e6e6e"/></linearGradient></defs><path d="M3 8h13V3l11 8-11 8v-5H3z" fill="url(#ar)" stroke="url(#ar)" stroke-width="2.4" stroke-linejoin="round"/></svg>
        </button>
        <div class="label">slide to unlock</div>
      </div>
      </div>
    </div>`,
  init(root) {
    const track = root.querySelector('.track');
    const knob = root.querySelector('.knob');
    let startX = 0, dragging = false;
    const maxX = () => track.clientWidth - knob.offsetWidth - 2;
    const label = root.querySelector('.label');
    const setX = (x) => { const v = Math.max(2, Math.min(maxX(), x)); knob.style.left = v + 'px'; label.style.opacity = String(Math.max(0, 1 - (v - 2) / (maxX() * 0.45))); };
    const unlock = () => {
      track.classList.add('unlocked'); knob.setAttribute('aria-pressed', 'true'); setX(maxX());
      setTimeout(() => { track.classList.remove('unlocked'); knob.setAttribute('aria-pressed', 'false'); setX(2); }, 1200);
    };
    knob.addEventListener('pointerdown', (e) => { dragging = true; track.classList.add('dragging'); startX = e.clientX - knob.offsetLeft; knob.setPointerCapture(e.pointerId); });
    knob.addEventListener('pointermove', (e) => { if (dragging) setX(e.clientX - startX); });
    const end = () => { if (!dragging) return; dragging = false; track.classList.remove('dragging'); if (knob.offsetLeft > maxX() * 0.75) unlock(); else setX(2); };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); unlock(); } });
  },
};
