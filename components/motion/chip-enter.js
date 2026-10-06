// Real CSS enter/exit: @starting-style for the enter, transition-behavior: allow-discrete for the exit, and a FLIP
// pass so the neighbours glide into the gap instead of jumping. Spring: stiffness 380, damping 28 → linear().
const SPRING = 'linear(0, 0.023, 0.085, 0.164, 0.264, 0.36, 0.465, 0.557, 0.649, 0.724, 0.79, 0.852, 0.899, 0.94, 0.97, 0.995, 1.012, 1.024, 1.031, 1.036, 1.037, 1.037, 1.035, 1.032, 1.028, 1.025, 1.021, 1.017, 1.014, 1.011, 1.008, 1.006, 1.004, 1.003, 1.001, 1, 1, 0.999, 0.999, 0.999, 1)';

export default {
  id: 'mo-chip-enter',
  credit: 'Tag chips with native CSS enter/exit — @starting-style springs new chips in from blur, allow-discrete lets removed ones fade out, and FLIP glides the neighbours into place',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { position: relative; width: 280px; max-width: 100%; height: 118px; padding: 10px; border-radius: 14px; background: #fff; border: 1px solid #e5e5e0; font-family: Inter, system-ui, sans-serif; display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; overflow: hidden; }
    .chip {
      display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 6px 0 12px; border-radius: 999px; background: #f1f1ee; color: #111; font-size: 13px; font-weight: 500; white-space: nowrap;
      transition: transform .5s ${SPRING}, opacity .25s, filter .25s, display .5s allow-discrete, background .2s;
    }
    .chip:hover { filter: brightness(.96); }
    @starting-style { .chip { transform: scale(.8); opacity: 0; filter: blur(4px); } }
    .chip.out { position: absolute; display: none; transform: scale(.8); opacity: 0; filter: blur(4px); pointer-events: none; transition: transform .25s ease-in, opacity .2s, filter .2s, display .25s allow-discrete; }
    .chip button { width: 20px; height: 20px; border-radius: 50%; border: 0; background: transparent; color: #777; cursor: pointer; display: grid; place-items: center; transition: background .15s, color .15s, transform .3s ${SPRING}; }
    .chip button:hover { background: rgba(0,0,0,.75); color: #fff; }
    .chip button:focus-visible { outline: 2px solid #111; outline-offset: 1px; }
    .chip button svg { width: 11px; height: 11px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; }
    .add { height: 30px; padding: 0 12px; border-radius: 999px; border: 1.5px dashed #c8c8c3; background: transparent; color: #666; font: 500 13px Inter, system-ui, sans-serif; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: border-color .2s, color .2s, transform .3s ${SPRING}; }
    .add:hover { border-color: #111; color: #111; } .add:active { transform: scale(.94); }
    .add:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .add svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; }
  `,
  html: `
    <div class="box">
      <span class="chip" style="background:#dbeafe">Design<button type="button" aria-label="Remove Design"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button></span>
      <span class="chip" style="background:#fce7f3">Motion<button type="button" aria-label="Remove Motion"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button></span>
      <button class="add" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>Add</button>
    </div>`,
  init(root) {
    const box = root.querySelector('.box'), add = root.querySelector('.add');
    const pool = [['CSS', '#dcfce7'], ['Springs', '#fef3c7'], ['Figma', '#ede9fe'], ['Type', '#ffe4e6'], ['Web', '#e0f2fe'], ['Haptics', '#f3f4f6']];
    let n = 0, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const flip = (change) => {
      const els = [...box.children].filter((c) => !c.classList.contains('out'));
      const before = new Map(els.map((c) => [c, c.getBoundingClientRect()]));
      change();
      els.forEach((c) => {
        if (!c.isConnected || c.classList.contains('out')) return;
        const a = before.get(c), b = c.getBoundingClientRect();
        const dx = a.left - b.left, dy = a.top - b.top;
        if (dx || dy) c.animate([{ translate: `${dx}px ${dy}px` }, { translate: '0 0' }], { duration: 450, easing: SPRING });
      });
    };
    const wire = (chip) => chip.querySelector('button').addEventListener('click', () => {
      flip(() => { chip.style.left = chip.offsetLeft + 'px'; chip.style.top = chip.offsetTop + 'px'; chip.classList.add('out'); });
      add.focus({ preventScroll: true });
      later(() => chip.remove(), 300);
    });
    root.querySelectorAll('.chip').forEach(wire);
    add.addEventListener('click', () => {
      if (box.querySelectorAll('.chip:not(.out)').length >= 7) return;
      const [name, bg] = pool[n++ % pool.length];
      const c = document.createElement('span'); c.className = 'chip'; c.style.background = bg;
      c.innerHTML = `${name}<button type="button" aria-label="Remove ${name}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>`;
      flip(() => box.insertBefore(c, add)); wire(c);
    });
    return () => timers.forEach(clearTimeout);
  },
};
