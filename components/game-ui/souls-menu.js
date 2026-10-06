// Elden Ring title menu: near-black backdrop with a faint Erdtree-gold glow, centred serif entries in muted
// parchment grey; the focused entry brightens and gets the soft horizontal light band framed by thin #c8a861
// gold rules that fade out at both ends. Slow, ease-out fades (≈250ms) like the game.
export default {
  id: 'gm-souls-menu',
  credit: 'FromSoftware Elden Ring — title menu: muted serif entries; the focused one brightens inside the faded light band with thin #c8a861 gold rules',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 20px 26px 18px; border-radius: 12px; overflow: hidden; width: 260px;
      background: radial-gradient(ellipse 70% 55% at 50% 0%, rgba(200,168,97,.22), transparent 70%), radial-gradient(ellipse at 50% 120%, #1c1810, #070605 60%); }
    .menu { display: flex; flex-direction: column; gap: 2px; }
    .mi { position: relative; display: block; width: 100%; height: 34px; border: none; background: none; cursor: pointer; padding: 0;
      color: #8f8877; font: 400 19px/34px 'Instrument Serif', 'Playfair Display', Georgia, serif; letter-spacing: 1.2px; text-align: center; white-space: nowrap;
      transition: color 250ms ease-out, text-shadow 250ms ease-out; }
    .mi::before { content: ""; position: absolute; inset: 0; opacity: 0; transition: opacity 250ms ease-out; pointer-events: none;
      background:
        linear-gradient(90deg, transparent, #c8a861 25%, #e6d3a0 50%, #c8a861 75%, transparent) top / 100% 1px no-repeat,
        linear-gradient(90deg, transparent, #c8a861 25%, #e6d3a0 50%, #c8a861 75%, transparent) bottom / 100% 1px no-repeat,
        linear-gradient(90deg, transparent, rgba(200,168,97,.16) 22%, rgba(236,220,170,.22) 50%, rgba(200,168,97,.16) 78%, transparent); }
    .mi .l { position: relative; }
    .mi:hover { color: #cfc4a6; }
    .mi.sel, .mi:focus-visible { color: #f3e7c4; text-shadow: 0 0 10px rgba(200,168,97,.55); outline: none; }
    .mi.sel::before, .mi:focus-visible::before { opacity: 1; }
    .mi.dim, .mi.dim:hover { color: #47433a; cursor: default; text-shadow: none; }
    .mi.chosen { animation: ch 600ms ease-out; }
    @keyframes ch { 0% { text-shadow: 0 0 22px #e6d3a0; color: #fff; } 100% { text-shadow: 0 0 10px rgba(200,168,97,.55); } }
  `,
  html: `
    <div class="stage">
      <div class="menu" role="menu">
        <button class="mi sel" type="button" role="menuitemradio" aria-checked="true"><span class="l">Continue</span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="l">Load Game</span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="l">New Game</span></button>
        <button class="mi dim" type="button" role="menuitem" aria-disabled="true"><span class="l">Online</span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="l">System</span></button>
        <button class="mi" type="button" role="menuitemradio" aria-checked="false"><span class="l">Quit Game</span></button>
      </div>
    </div>`,
  init(root) {
    const items = [...root.querySelectorAll('.mi:not(.dim)')];
    const pick = (m) => items.forEach((o) => { o.classList.toggle('sel', o === m); o.setAttribute('aria-checked', String(o === m)); });
    items.forEach((m, i) => {
      m.addEventListener('click', () => { pick(m); m.classList.remove('chosen'); void m.offsetWidth; m.classList.add('chosen'); });
      m.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); const n = items[(i + d + items.length) % items.length]; pick(n); n.focus(); });
    });
  },
};
