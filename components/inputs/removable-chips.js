export default {
  id: 'in-removable-chips',
  credit: 'Removable tag chips — the × scales a chip out; the + puts the last one back (Gmail recipient chips)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .chip {
      display: inline-flex; align-items: center; gap: 4px; height: 30px; padding: 0 6px 0 12px; border-radius: 15px; background: #e8eaed; color: #202124;
      font: 500 13px system-ui, sans-serif; transition: transform .2s, opacity .2s, background .15s; transform-origin: center;
    }
    .chip:hover { background: #dadce0; }
    .chip.out { transform: scale(.5); opacity: 0; }
    .x { width: 20px; height: 20px; border: 0; border-radius: 50%; background: none; padding: 0; cursor: pointer; display: grid; place-items: center; color: #5f6368; transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; }
    .x:hover { background: #5f6368; color: #fff; }
    .x:focus-visible { outline: 2px solid #1a73e8; }
    .x svg, .add svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; }
    .add { width: 30px; height: 30px; border-radius: 50%; border: 1px dashed #9aa0a6; background: none; color: #5f6368; cursor: pointer; display: grid; place-items: center; transition: background .15s, border-color .15s; -webkit-tap-highlight-color: transparent; }
    .add:hover { background: #f1f3f4; border-color: #5f6368; }
    .add:disabled { opacity: .35; cursor: default; background: none; }
    .add:focus-visible { outline: 2px solid #1a73e8; outline-offset: 1px; }
  `,
  html: `<div class="row"><button class="add" type="button" aria-label="Add back"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button></div>`,
  init(root) {
    const row = root.querySelector('.row'), add = root.querySelector('.add');
    const all = ['Design', 'Dev', 'Ops', 'Growth'];
    const removed = [];
    const make = (name) => {
      const c = document.createElement('span'); c.className = 'chip';
      c.innerHTML = name + '<button class="x" type="button" aria-label="Remove"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
      c.querySelector('.x').addEventListener('click', () => {
        if (c.classList.contains('out')) return; // already removing — a second click must not finalize twice
        c.classList.add('out');
        let finished = false;
        const finalize = () => {
          if (finished) return; finished = true;
          clearTimeout(fallback); c.removeEventListener('transitionend', onEnd);
          c.remove(); removed.push(name); add.disabled = false;
        };
        // only the chip's own transition counts — the × button's hover transitions bubble up too
        const onEnd = (e) => { if (e.target === c) finalize(); };
        c.addEventListener('transitionend', onEnd);
        // if transitionend never arrives (reduced motion, hidden tab, interrupted transition) don't strand the chip
        const fallback = setTimeout(finalize, 400);
      });
      return c;
    };
    all.forEach((n) => row.insertBefore(make(n), add));
    add.disabled = true;
    add.addEventListener('click', () => {
      const n = removed.pop(); if (!n) return;
      const c = make(n); c.classList.add('out'); row.insertBefore(c, add);
      requestAnimationFrame(() => c.classList.remove('out'));
      add.disabled = removed.length === 0;
    });
  },
};
