export default {
  id: 'rt-ios6-slide-unlock',
  credit: 'iOS 1–6 — "slide to unlock" with shimmering text and draggable arrow knob',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { background: #0b0b0e; padding: 18px 14px; border-radius: 12px; }
    .track { position: relative; height: 46px; max-width: 320px; margin: 0 auto; border-radius: 9px; overflow: hidden;
      background: linear-gradient(#111, #1d1d22 40%, #2a2a30); box-shadow: inset 0 2px 5px rgba(0,0,0,.9), inset 0 -1px 0 rgba(255,255,255,.12), 0 1px 0 rgba(255,255,255,.08); }
    .label { position: absolute; inset: 0; display: grid; place-items: center; padding-left: 48px; user-select: none; pointer-events: none;
      font: 22px "Helvetica Neue", Helvetica, Arial, sans-serif;
      background: linear-gradient(90deg, #6a6a72 0%, #6a6a72 40%, #fff 50%, #6a6a72 60%, #6a6a72 100%); background-size: 220% 100%;
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; transition: opacity .15s; }
    .track:hover .label, .knob:focus-visible ~ .label { animation: shimmer 2.4s linear infinite; }
    .track.unlocked .label { opacity: 0; }
    .knob { position: absolute; top: 3px; left: 3px; width: 66px; height: 40px; border-radius: 7px; border: none; padding: 0; cursor: grab; touch-action: none;
      background: linear-gradient(#fefefe, #d7d7d9 50%, #bfbfc3 50%, #e9e9eb); box-shadow: 0 1px 2px rgba(0,0,0,.6), inset 0 0 0 1px rgba(255,255,255,.7);
      display: grid; place-items: center; transition: left .22s; }
    .knob:active { cursor: grabbing; transition: none; }
    .knob:focus-visible { outline: 2px solid #4da3ff; outline-offset: 1px; }
    @keyframes shimmer { from { background-position: 100% 0; } to { background-position: -100% 0; } }
  `,
  html: `
    <div class="stage">
      <div class="track">
        <button class="knob" type="button" aria-label="slide to unlock" aria-pressed="false">
          <svg width="22" height="20" viewBox="0 0 22 20"><path d="M2 10h12M9 4l6 6-6 6" fill="none" stroke="#4e4e52" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="label">slide to unlock</div>
      </div>
    </div>`,
  init(root) {
    const track = root.querySelector('.track');
    const knob = root.querySelector('.knob');
    let startX = 0, dragging = false;
    const maxX = () => track.clientWidth - knob.offsetWidth - 3;
    const setX = (x) => { knob.style.left = Math.max(3, Math.min(maxX(), x)) + 'px'; };
    const unlock = () => {
      track.classList.add('unlocked'); knob.setAttribute('aria-pressed', 'true'); setX(maxX());
      setTimeout(() => { track.classList.remove('unlocked'); knob.setAttribute('aria-pressed', 'false'); setX(3); }, 1200);
    };
    knob.addEventListener('pointerdown', (e) => { dragging = true; startX = e.clientX - knob.offsetLeft; knob.setPointerCapture(e.pointerId); });
    knob.addEventListener('pointermove', (e) => { if (dragging) setX(e.clientX - startX); });
    const end = () => { if (!dragging) return; dragging = false; if (knob.offsetLeft > maxX() * 0.75) unlock(); else setX(3); };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); unlock(); } });
  },
};
