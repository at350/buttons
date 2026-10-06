export default {
  id: 'gm-souls-menu',
  credit: 'FromSoftware Elden Ring / Dark Souls — title-menu items: dim serif text that brightens to gold with the flanking ornament line under the hovered or selected entry',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(ellipse at 50% 120%, #2a2418 0%, #0c0a07 60%, #050403 100%);
      padding: 22px 40px 18px;
      border-radius: 12px;
      min-width: 240px; }
    .menu { display: flex; flex-direction: column; align-items: center; gap: 2px; }
    .mi { position: relative;
      border: none;
      background: none;
      cursor: pointer;
      padding: 7px 24px;
      color: #6e6652;
      font: 400 17px 'Instrument Serif', 'Playfair Display', Georgia, serif;
      letter-spacing: 2px;
      transition: color .25s, text-shadow .25s; }
    .mi:hover, .mi:focus-visible, .mi.sel { color: #e9d9a6;
      text-shadow: 0 0 10px rgba(233,217,166,.45);
      outline: none; }
    .orn { position: absolute;
      left: 0;
      right: 0;
      bottom: 2px;
      height: 10px;
      opacity: 0;
      transition: opacity .25s, transform .25s;
      transform: scaleX(.7);
      pointer-events: none; }
    .mi:hover .orn, .mi:focus-visible .orn, .mi.sel .orn { opacity: 1; transform: scaleX(1); }
    .orn svg { width: 100%; height: 100%; fill: none; stroke: #c9b069; stroke-width: 1; }
    .mi.dim { color: #3e3a30; cursor: default; }
    .mi.dim:hover { color: #3e3a30; text-shadow: none; }
    .mi.dim .orn { display: none; }
    .sel .lbl::before, .sel .lbl::after { content: "◆"; position: absolute; top: 9px; font-size: 7px; color: #c9b069; }
    .sel .lbl::before { left: 8px; }
    .sel .lbl::after { right: 8px; }
  `,
  html: `
    <div class="stage">
      <div class="menu" role="menu">
        <button class="mi sel" type="button" role="menuitemradio" aria-checked="true"><span class="lbl">Continue</span><span class="orn"><svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M0 5h80 M120 5h80 M90 5l10-4 10 4-10 4z" vector-effect="non-scaling-stroke"/></svg></span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="lbl">Load Game</span><span class="orn"><svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M0 5h80 M120 5h80 M90 5l10-4 10 4-10 4z" vector-effect="non-scaling-stroke"/></svg></span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="lbl">New Game</span><span class="orn"><svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M0 5h80 M120 5h80 M90 5l10-4 10 4-10 4z" vector-effect="non-scaling-stroke"/></svg></span></button>
        <button class="mi dim" type="button" role="menuitem" aria-disabled="true"><span class="lbl">Online</span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="lbl">System</span><span class="orn"><svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M0 5h80 M120 5h80 M90 5l10-4 10 4-10 4z" vector-effect="non-scaling-stroke"/></svg></span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="lbl">Quit Game</span><span class="orn"><svg viewBox="0 0 200 10" preserveAspectRatio="none"><path d="M0 5h80 M120 5h80 M90 5l10-4 10 4-10 4z" vector-effect="non-scaling-stroke"/></svg></span></button>
      </div>
    </div>`,
  init(root) {
    const items = [...root.querySelectorAll('.mi:not(.dim)')];
    items.forEach((m, i) => {
      m.addEventListener('click', () => items.forEach((o) => { o.classList.toggle('sel', o === m); o.setAttribute('aria-checked', String(o === m)); }));
      m.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); const n = items[(i + d + items.length) % items.length]; n.focus(); n.click(); });
    });
  },
};
