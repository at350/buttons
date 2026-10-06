export default {
  id: 'dp-number-drum',
  credit: 'Mechanical number drums — two ten-faced cylinders (rotateX faces on a translateZ radius) roll with a spring when you step the count',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 26px 26px;
      background: #111827;
      border-radius: 12px;
    }
    .win {
      position: relative;
      display: flex;
      gap: 4px;
      padding: 6px 8px;
      border-radius: 8px;
      background: #0b0f1a;
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, .9), inset 0 0 0 1px rgba(255, 255, 255, .06);
    }
    .win::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 8px;
      pointer-events: none;
      background: linear-gradient(180deg, rgba(0, 0, 0, .75), transparent 35%, transparent 65%, rgba(0, 0, 0, .75));
    }
    .scene {
      width: 34px;
      height: 44px;
      perspective: 260px;
      overflow: hidden;
    }
    .drum {
      --a: 0deg;
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transform: rotateX(var(--a));
      transition: transform .9s cubic-bezier(.3, 1.3, .4, 1);
    }
    .f {
      position: absolute;
      left: 0;
      top: 8px;
      width: 34px;
      height: 28px;
      display: grid;
      place-items: center;
      color: #f9fafb;
      font: 600 24px/1 'JetBrains Mono', ui-monospace, monospace;
      background: linear-gradient(180deg, #4b5563, #1f2937);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .08);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    .k {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
      background: #1f2937;
      color: #e5e7eb;
      display: grid;
      place-items: center;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .12), 0 3px 0 #0b0f1a;
      transition: transform .1s, box-shadow .1s;
    }
    .k:hover { background: #374151; }
    .k:active { transform: translateY(3px); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .12), 0 0 0 #0b0f1a; }
    .k svg { width: 16px; height: 16px; }
    .k:focus-visible { outline: 2px solid #93c5fd; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <button class="k dec" type="button" aria-label="Decrease"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"/></svg></button>
      <div class="win" role="status" aria-live="polite" aria-label="0">
        <div class="scene"><div class="drum tens"></div></div>
        <div class="scene"><div class="drum ones"></div></div>
      </div>
      <button class="k inc" type="button" aria-label="Increase"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
    </div>`,
  init(root) {
    const R = 43; // 14px / tan(18deg)
    root.querySelectorAll('.drum').forEach((d) => {
      d.innerHTML = Array.from({ length: 10 }, (_, i) => `<span class="f" style="transform:rotateX(${i * 36}deg) translateZ(${R}px)">${i}</span>`).join('');
    });
    const tens = root.querySelector('.tens'), ones = root.querySelector('.ones'), win = root.querySelector('.win');
    let n = 0;
    const draw = () => {
      ones.style.setProperty('--a', (-n * 36) + 'deg');
      tens.style.setProperty('--a', (-Math.floor(n / 10) * 36) + 'deg');
      win.setAttribute('aria-label', String(n));
    };
    root.querySelector('.inc').addEventListener('click', () => { n++; draw(); });
    root.querySelector('.dec').addEventListener('click', () => { if (n > 0) { n--; draw(); } });
  },
};
