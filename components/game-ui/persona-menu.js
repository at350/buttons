export default {
  id: 'gm-persona-menu',
  credit: 'Atlus Persona 5 — the slanted red/black pause menu; the hovered entry jumps to white with a jagged black slash behind it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #d40b1e;
      background-image: repeating-linear-gradient(135deg, rgba(0,0,0,.12) 0 2px, transparent 2px 14px);
      padding: 20px 34px 22px 26px;
      border-radius: 12px;
      overflow: hidden;
      position: relative; }
    .stage::before { content: "";
      position: absolute;
      left: -30px;
      top: -20px;
      width: 140px;
      height: 200%;
      background: #000;
      transform: rotate(14deg);
      clip-path: polygon(0 0, 100% 0, 78% 100%, 10% 100%); }
    .menu { position: relative; display: flex; flex-direction: column; gap: 4px; }
    .mi { position: relative;
      border: none;
      background: none;
      cursor: pointer;
      padding: 6px 26px 6px 18px;
      text-align: left;
      color: #fff;
      font: 800 italic 20px 'Syne', 'Unbounded', system-ui, sans-serif;
      letter-spacing: -.5px;
      text-transform: uppercase;
      transform: skewX(-12deg) rotate(-4deg);
      transform-origin: left center;
      transition: transform .1s, color .1s; }
    .mi:nth-child(odd) { margin-left: 10px; } .mi:nth-child(3) { margin-left: 22px; }
    .mi .bg { position: absolute;
      inset: 0;
      background: #000;
      clip-path: polygon(0 20%, 8% 0, 96% 6%, 100% 70%, 92% 100%, 4% 94%);
      z-index: -1;
      transform: scaleX(.3);
      transform-origin: left;
      opacity: 0;
      transition: transform .12s cubic-bezier(.2,.9,.3,1.3), opacity .1s; }
    .mi:hover, .mi:focus-visible, .mi.sel { color: #fff;
      transform: skewX(-12deg) rotate(-4deg) translateX(10px) scale(1.08);
      outline: none; }
    .mi:hover .bg, .mi:focus-visible .bg, .mi.sel .bg { transform: scaleX(1); opacity: 1; }
    .mi.sel { color: #d40b1e; } .mi.sel .bg { background: #fff; }
    .mi .lbl { position: relative; z-index: 1; }
    .mi:not(:hover):not(:focus-visible):not(.sel) { color: #1a0004; text-shadow: 1px 1px 0 rgba(255,255,255,.3); }
    .star { position: absolute;
      right: 8px;
      top: 50%;
      width: 12px;
      height: 12px;
      transform: translateY(-50%) rotate(0);
      opacity: 0;
      transition: opacity .1s, transform .3s; }
    .mi.sel .star { opacity: 1; transform: translateY(-50%) rotate(180deg); }
    .star svg { fill: #d40b1e; width: 100%; height: 100%; }
  `,
  html: `
    <div class="stage">
      <div class="menu" role="menu">
        <button class="mi sel" type="button" role="menuitemradio" aria-checked="true"><span class="bg"></span><span class="lbl">Skill</span><span class="star"><svg viewBox="0 0 10 10"><path d="M5 0l1.4 3.6L10 5 6.4 6.4 5 10 3.6 6.4 0 5l3.6-1.4z"/></svg></span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="bg"></span><span class="lbl">Item</span><span class="star"><svg viewBox="0 0 10 10"><path d="M5 0l1.4 3.6L10 5 6.4 6.4 5 10 3.6 6.4 0 5l3.6-1.4z"/></svg></span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="bg"></span><span class="lbl">Equip</span><span class="star"><svg viewBox="0 0 10 10"><path d="M5 0l1.4 3.6L10 5 6.4 6.4 5 10 3.6 6.4 0 5l3.6-1.4z"/></svg></span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="bg"></span><span class="lbl">Persona</span><span class="star"><svg viewBox="0 0 10 10"><path d="M5 0l1.4 3.6L10 5 6.4 6.4 5 10 3.6 6.4 0 5l3.6-1.4z"/></svg></span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="bg"></span><span class="lbl">System</span><span class="star"><svg viewBox="0 0 10 10"><path d="M5 0l1.4 3.6L10 5 6.4 6.4 5 10 3.6 6.4 0 5l3.6-1.4z"/></svg></span></button>
      </div>
    </div>`,
  init(root) {
    const items = [...root.querySelectorAll('.mi')];
    items.forEach((m, i) => {
      m.addEventListener('click', () => items.forEach((o) => { o.classList.toggle('sel', o === m); o.setAttribute('aria-checked', String(o === m)); }));
      m.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); items[(i + d + items.length) % items.length].focus(); });
    });
  },
};
