const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-chip-enter',
  credit: 'Tag chips with real CSS enter/exit — @starting-style springs new chips in, transition-behavior: allow-discrete lets removed ones animate out before display: none',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { width: 280px; max-width: 100%; height: 118px; padding: 10px; border-radius: 14px; background: #fff; border: 1px solid #e5e5e0; font-family: Inter, system-ui, sans-serif; display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; overflow: hidden; }
    .chip {
      display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 6px 0 12px; border-radius: 999px; background: #f1f1ee; color: #111; font-size: 13px; font-weight: 500; white-space: nowrap;
      transition: transform .5s ${SPRING}, opacity .25s, filter .25s, display .5s allow-discrete, background .2s;
    }
    .chip:hover { filter: brightness(.96); }
    @starting-style { .chip { transform: scale(.5) translateY(6px); opacity: 0; filter: blur(4px); } }
    .chip.out { display: none; transform: scale(.5) translateY(6px); opacity: 0; filter: blur(4px); }
    .chip button { width: 20px; height: 20px; border-radius: 50%; border: 0; background: transparent; color: #777; cursor: pointer; display: grid; place-items: center; transition: background .15s, color .15s, transform .3s ${SPRING}; }
    .chip button:hover { background: #111; color: #fff; transform: rotate(90deg); }
    .chip button:focus-visible { outline: 2px solid #111; outline-offset: 1px; }
    .chip button svg { width: 11px; height: 11px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; }
    .add { height: 30px; padding: 0 12px; border-radius: 999px; border: 1.5px dashed #c8c8c3; background: transparent; color: #666; font: 500 13px Inter, system-ui, sans-serif; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: border-color .2s, color .2s, transform .3s ${SPRING}; }
    .add:hover { border-color: #111; color: #111; } .add:active { transform: scale(.94); }
    .add:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .add svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; }
  `,
  html: `
    <div class="box">
      <span class="chip" style="background:#dbeafe">Design<button type="button" aria-label="Remove Design"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></span>
      <span class="chip" style="background:#fce7f3">Motion<button type="button" aria-label="Remove Motion"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></span>
      <button class="add" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Add</button>
    </div>`,
  init(root) {
    const box = root.querySelector('.box'), add = root.querySelector('.add');
    const pool = [['CSS', '#dcfce7'], ['Springs', '#fef3c7'], ['Figma', '#ede9fe'], ['Type', '#ffe4e6'], ['Web', '#e0f2fe'], ['Haptics', '#f3f4f6']];
    let n = 0, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const wire = (chip) => chip.querySelector('button').addEventListener('click', () => { chip.classList.add('out'); later(() => chip.remove(), 520); });
    root.querySelectorAll('.chip').forEach(wire);
    add.addEventListener('click', () => {
      if (box.querySelectorAll('.chip:not(.out)').length >= 7) return;
      const [name, bg] = pool[n++ % pool.length];
      const c = document.createElement('span'); c.className = 'chip'; c.style.background = bg;
      c.innerHTML = `${name}<button type="button" aria-label="Remove ${name}"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`;
      box.insertBefore(c, add); wire(c);
    });
    return () => timers.forEach(clearTimeout);
  },
};
