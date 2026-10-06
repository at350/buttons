const FONTS = ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier', 'Courier New', 'Fixedsys', 'Impact', 'Marlett', 'Modern', 'MS Sans Serif', 'MS Serif', 'Small Fonts', 'Symbol', 'System', 'Terminal', 'Times New Roman', 'Verdana', 'Wingdings'];
const UP = 'M3 0h1v1h-1zM2 1h3v1h-3zM1 2h5v1h-5zM0 3h7v1h-7z';
const DN = 'M0 0h7v1h-7zM1 1h5v1h-5zM2 2h3v1h-3zM3 3h1v1h-1z';
export default {
  id: 'rt-win95-scrollbar',
  credit: 'Windows 95 — list box with a vertical scrollbar: dithered track, proportional thumb, bevelled arrow buttons',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 12px; border-radius: 12px; display: inline-block; }
    .frame { display: flex; width: 168px; height: 121px; background: #fff; padding: 2px;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px #000, inset -2px -2px #dfdfdf;
      font: 11px/13px "MS Sans Serif", "Microsoft Sans Serif", Tahoma, Arial, sans-serif; -webkit-font-smoothing: none; color: #000; }
    .content { flex: 1; overflow: hidden; position: relative; outline: none; }
    .rows { position: absolute; left: 0; right: 0; top: 0; }
    .rows div { height: 13px; padding: 0 2px; white-space: nowrap; cursor: default; }
    .rows div.sel { background: #000080; color: #fff; }
    .content:focus-visible .rows div.sel { outline: 1px dotted #fff; outline-offset: -1px; }
    .sb { width: 16px; display: flex; flex-direction: column; flex: none;
      background-color: #c0c0c0; background-image: repeating-conic-gradient(#fff 0 25%, #c0c0c0 0 50%); background-size: 2px 2px; }
    .ab { width: 16px; height: 16px; background: #c0c0c0; border: none; padding: 0; display: grid; place-items: center; flex: none; cursor: default; outline: none;
      box-shadow: inset -1px -1px #000, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff; }
    .ab svg { display: block; }
    .ab:active, .ab.held { box-shadow: inset 0 0 0 1px #808080; }
    .ab:active svg, .ab.held svg { transform: translate(1px, 1px); }
    .track { flex: 1; position: relative; }
    .track.pg-up::before, .track.pg-dn::before { content: ""; position: absolute; left: 0; right: 0; background-image: repeating-conic-gradient(#000 0 25%, #808080 0 50%); background-size: 2px 2px; }
    .track.pg-up::before { top: 0; height: var(--t); } .track.pg-dn::before { top: var(--b); bottom: 0; }
    .thumb { position: absolute; left: 0; top: 0; width: 16px; background: #c0c0c0; cursor: default; touch-action: none;
      box-shadow: inset -1px -1px #000, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff; }
  `,
  html: `
    <div class="stage">
      <div class="frame">
        <div class="content" tabindex="0" role="listbox" aria-label="Fonts"><div class="rows">${FONTS.map((f, i) => `<div role="option" aria-selected="${i === 9}"${i === 9 ? ' class="sel"' : ''}>${f}</div>`).join('')}</div></div>
        <div class="sb" role="scrollbar" aria-orientation="vertical" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <button class="ab up" type="button" tabindex="-1" aria-label="Scroll up"><svg width="7" height="4" viewBox="0 0 7 4" shape-rendering="crispEdges"><path d="${UP}"/></svg></button>
          <div class="track"><div class="thumb"></div></div>
          <button class="ab dn" type="button" tabindex="-1" aria-label="Scroll down"><svg width="7" height="4" viewBox="0 0 7 4" shape-rendering="crispEdges"><path d="${DN}"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const ROW = 13, VIS = 9, MAX = FONTS.length - VIS, TRACK = 85, TH = Math.round(TRACK * VIS / FONTS.length);
    const rows = root.querySelector('.rows'), thumb = root.querySelector('.thumb'), track = root.querySelector('.track');
    const sb = root.querySelector('.sb'), content = root.querySelector('.content');
    const items = [...rows.children];
    let top = 0, sel = 9, timer = 0;
    thumb.style.height = TH + 'px';
    const ty = () => Math.round((TRACK - TH) * top / MAX);
    const render = () => {
      rows.style.transform = `translateY(${-top * ROW}px)`;
      thumb.style.top = ty() + 'px';
      sb.setAttribute('aria-valuenow', String(Math.round(top / MAX * 100)));
    };
    const scroll = (d) => { top = Math.max(0, Math.min(MAX, top + d)); render(); };
    const hold = (fn, el) => { fn(); el && el.classList.add('held'); clearInterval(timer); timer = setTimeout(() => { timer = setInterval(fn, 50); }, 400); };
    const stop = () => { clearTimeout(timer); clearInterval(timer); root.querySelectorAll('.held').forEach((e) => e.classList.remove('held')); track.classList.remove('pg-up', 'pg-dn'); };
    root.querySelector('.up').addEventListener('pointerdown', (e) => { e.preventDefault(); hold(() => scroll(-1)); });
    root.querySelector('.dn').addEventListener('pointerdown', (e) => { e.preventDefault(); hold(() => scroll(1)); });
    track.addEventListener('pointerdown', (e) => {
      if (e.target !== track) return;
      e.preventDefault();
      const up = e.offsetY < ty();
      track.style.setProperty('--t', ty() + 'px'); track.style.setProperty('--b', ty() + TH + 'px');
      track.classList.add(up ? 'pg-up' : 'pg-dn');
      hold(() => { scroll(up ? -VIS : VIS); track.style.setProperty('--t', ty() + 'px'); track.style.setProperty('--b', ty() + TH + 'px'); });
    });
    let drag = null;
    thumb.addEventListener('pointerdown', (e) => { e.preventDefault(); drag = { y: e.clientY, t: top }; thumb.setPointerCapture(e.pointerId); });
    thumb.addEventListener('pointermove', (e) => { if (!drag) return; top = Math.max(0, Math.min(MAX, Math.round(drag.t + (e.clientY - drag.y) * MAX / (TRACK - TH)))); render(); });
    thumb.addEventListener('pointerup', () => { drag = null; });
    root.addEventListener('pointerup', stop); root.addEventListener('pointerleave', stop); root.addEventListener('pointercancel', stop);
    const pick = (i) => {
      sel = Math.max(0, Math.min(FONTS.length - 1, i));
      items.forEach((it, k) => { it.classList.toggle('sel', k === sel); it.setAttribute('aria-selected', String(k === sel)); });
      if (sel < top) scroll(sel - top); else if (sel >= top + VIS) scroll(sel - top - VIS + 1);
    };
    items.forEach((it, i) => it.addEventListener('pointerdown', () => pick(i)));
    content.addEventListener('keydown', (e) => {
      const m = { ArrowDown: 1, ArrowUp: -1, PageDown: VIS, PageUp: -VIS }[e.key];
      if (m) { e.preventDefault(); pick(sel + m); }
      else if (e.key === 'Home') { e.preventDefault(); pick(0); } else if (e.key === 'End') { e.preventDefault(); pick(FONTS.length - 1); }
    });
    content.addEventListener('wheel', (e) => { const d = e.deltaY > 0 ? 1 : -1; if ((d > 0 && top >= MAX) || (d < 0 && top <= 0)) return; e.preventDefault(); scroll(d * 3); }, { passive: false });
    render();
    return stop;
  },
};
