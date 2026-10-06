export default {
  id: 'lb-park-swatch',
  credit: 'Park UI / Ark UI — ColorPicker trigger: a checkered swatch button with hex label that opens a compact swatch grid popover; picking re-tints the trigger',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; color: #18181b; }
    .trig { height: 40px; padding: 0 12px 0 8px; border-radius: 6px; border: 1px solid #e4e4e7; background: #fff; display: inline-flex; align-items: center; gap: 10px; cursor: pointer; font: inherit; color: inherit; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: border-color .15s, box-shadow .15s; -webkit-tap-highlight-color: transparent; }
    .trig:hover { border-color: #d4d4d8; }
    .trig:focus-visible, .trig[aria-expanded="true"] { outline: 0; border-color: #18181b; box-shadow: 0 0 0 1px #18181b; }
    .swc { position: relative; width: 24px; height: 24px; border-radius: 4px; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); background: conic-gradient(#e4e4e7 25%, #fff 0 50%, #e4e4e7 0 75%, #fff 0) 0 0 / 8px 8px; }
    .swc::after { content: ''; position: absolute; inset: 0; background: var(--c); transition: background .2s; }
    .hex { font: 500 13px/1 "JetBrains Mono", ui-monospace, monospace; letter-spacing: .02em; min-width: 62px; text-align: left; }
    .trig svg { width: 16px; height: 16px; stroke: #71717a; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .15s; }
    .trig[aria-expanded="true"] svg { transform: rotate(180deg); }
    .pop { position: absolute; top: 46px; left: 0; padding: 12px; width: 196px; border-radius: 8px; border: 1px solid #e4e4e7; background: #fff; box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); display: none; }
    .pop.r { left: auto; right: 0; }
    .pop.open { display: block; animation: in .15s cubic-bezier(.16,1,.3,1); }
    @keyframes in { from { opacity: 0; transform: translateY(-4px) scale(.98); } }
    .grid { display: grid; grid-template-columns: repeat(6, 24px); gap: 6px; }
    .sw { width: 24px; height: 24px; border-radius: 4px; border: 0; padding: 0; cursor: pointer; background: var(--c); box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); transition: transform .1s, box-shadow .1s; -webkit-tap-highlight-color: transparent; }
    .sw:hover { transform: scale(1.12); }
    .sw:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .sw[aria-checked="true"] { box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px var(--c); }
  `,
  html: `
    <div class="wrap">
      <button class="trig" type="button" aria-haspopup="dialog" aria-expanded="false"><span class="swc" style="--c:#2563eb"></span><span class="hex">#2563EB</span><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
      <div class="pop" role="dialog" aria-label="Pick a color"><div class="grid" role="radiogroup"></div></div>
    </div>`,
  init(root, host) {
    const trig = root.querySelector('.trig'), pop = root.querySelector('.pop'), grid = root.querySelector('.grid'), swc = root.querySelector('.swc'), hex = root.querySelector('.hex');
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#2563eb', '#6366f1', '#a855f7', '#ec4899', '#18181b', '#a1a1aa'];
    grid.innerHTML = colors.map((c) => `<button class="sw" type="button" role="radio" aria-checked="${c === '#2563eb'}" style="--c:${c}" aria-label="${c}"></button>`).join('');
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { if (v) pop.classList.toggle('r', trig.getBoundingClientRect().left + 206 > document.documentElement.clientWidth); trig.setAttribute('aria-expanded', v); pop.classList.toggle('open', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); };
    trig.addEventListener('click', () => set(trig.getAttribute('aria-expanded') !== 'true'));
    grid.addEventListener('click', (e) => {
      const s = e.target.closest('.sw'); if (!s) return;
      const c = s.getAttribute('aria-label');
      grid.querySelectorAll('.sw').forEach((x) => x.setAttribute('aria-checked', x === s));
      swc.style.setProperty('--c', c); hex.textContent = c.toUpperCase();
      set(false); trig.focus({ preventScroll: true });
    });
    pop.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); trig.focus({ preventScroll: true }); } });
    return () => set(false);
  },
};
