const RAINBOW = ['#ff3b3b', '#ff8f1f', '#ffe11f', '#3ddc4a', '#2f8cff', '#9b4dff'];
const BUBBLES = RAINBOW.map((c) => Array.from({ length: 6 }, () => `<button class="b" type="button" aria-pressed="false" aria-label="bubble" style="--c:${c}"></button>`).join('')).join('');

export default {
  id: 'ty2-pop-it',
  credit: 'Pop It — rainbow silicone push-pop sensory sheet: press a bubble to pop it inside out, flip the sheet to pop them all back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; padding: 14px 18px 44px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(135deg, #fde6f3, #e3e8ff); perspective: 700px; }
    .sheet { display: grid; grid-template-columns: repeat(6, 26px); gap: 5px; padding: 10px; border-radius: 22px;
      background: linear-gradient(180deg, #ff3b3b 0 16.6%, #ff8f1f 16.6% 33.3%, #ffe11f 33.3% 50%, #3ddc4a 50% 66.6%, #2f8cff 66.6% 83.3%, #9b4dff 83.3%);
      box-shadow: 0 6px 12px rgba(80,40,120,.3), inset 0 2px 3px rgba(255,255,255,.6), inset 0 -3px 5px rgba(0,0,0,.15); }
    .b { width: 26px; height: 26px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; -webkit-tap-highlight-color: transparent;
      background: radial-gradient(circle at 36% 30%, rgba(255,255,255,.85) 0 10%, transparent 34%), radial-gradient(circle at 50% 55%, var(--c) 40%, color-mix(in srgb, var(--c) 72%, #000) 100%);
      box-shadow: 0 3px 3px rgba(0,0,0,.25), inset 0 -2px 3px rgba(0,0,0,.18);
      transition: transform .12s cubic-bezier(.3,1.7,.5,1), box-shadow .1s, background .1s; }
    .b:hover { transform: scale(1.05); }
    .b:active { transform: scale(.9); }
    .b[aria-pressed="true"] { transform: scale(.94);
      background: radial-gradient(circle at 60% 70%, rgba(255,255,255,.5) 0 8%, transparent 30%), radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--c) 75%, #000) 30%, var(--c) 90%);
      box-shadow: inset 0 3px 5px rgba(0,0,0,.35), 0 0 0 1px rgba(0,0,0,.05); }
    .b:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
    .flip { position: absolute; left: 50%; margin-left: -13px; bottom: 10px; width: 26px; height: 26px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
      display: grid; place-items: center; color: #6b3fd1; background: #fff; box-shadow: 0 2px 4px rgba(60,30,120,.35);
      transition: transform .3s cubic-bezier(.3,1.6,.5,1); }
    .flip:hover { transform: rotate(-30deg); }
    .flip:active { transform: rotate(-90deg) scale(.92); }
    .flip:focus-visible { outline: 2px solid #6b3fd1; outline-offset: 2px; }
    .flip svg { width: 15px; height: 15px; }
  `,
  html: `
    <div class="stage">
      <div class="sheet">${BUBBLES}</div>
      <button class="flip" type="button" aria-label="flip sheet">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      </button>
    </div>`,
  init(root) {
    const sheet = root.querySelector('.sheet'), bs = [...root.querySelectorAll('.b')];
    let t = 0, busy = false;
    sheet.addEventListener('click', (e) => {
      const b = e.target.closest('.b'); if (!b || busy) return;
      b.setAttribute('aria-pressed', 'true');
    });
    root.querySelector('.flip').addEventListener('click', () => {
      if (busy) return; busy = true;
      sheet.animate([{ transform: 'rotateY(0)' }, { transform: 'rotateY(90deg)' }, { transform: 'rotateY(0)' }], { duration: 520, easing: 'cubic-bezier(.4,0,.2,1)' });
      t = setTimeout(() => { bs.forEach((b) => b.setAttribute('aria-pressed', 'false')); busy = false; }, 260);
    });
    return () => clearTimeout(t);
  },
};
