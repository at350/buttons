export default {
  id: 'gm-minecraft-button',
  credit: 'Mojang Minecraft (Java) — title-screen stone buttons with the pixel bevel; hover turns the frame white and the label yellow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #3b3b3b;
      background-image: repeating-conic-gradient(#3f3f3f 0 25%, #353535 0 50%);
      background-size: 12px 12px;
      padding: 18px 20px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      image-rendering: pixelated; }
    .mc { width: 220px; max-width: 100%; height: 40px; border: none; cursor: pointer; position: relative; padding: 0;
      background: #6f6f6f; background-image: repeating-linear-gradient(90deg, #717171 0 4px, #6a6a6a 4px 8px, #747474 8px 12px, #666 12px 16px);
      box-shadow: inset -2px -4px 0 #2b2b2b, inset 2px 2px 0 #a8a8a8, 0 0 0 2px #000; color: #e0e0e0; font: 400 16px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .5px;
      text-shadow: 2px 2px 0 #3f3f3f; image-rendering: pixelated; }
    .mc:hover, .mc:focus-visible { box-shadow: inset -2px -4px 0 #2b2b2b, inset 2px 2px 0 #a8a8a8, 0 0 0 2px #000, 0 0 0 4px #fff;
      color: #ffffa0;
      outline: none; }
    .mc:active, .mc.on { box-shadow: inset 2px 2px 0 #2b2b2b, inset -2px -2px 0 #8c8c8c, 0 0 0 2px #000; transform: translateY(1px); }
    .mc.on { color: #ffffa0; }
    .mc.dis { color: #a0a0a0; cursor: default; opacity: .9; }
    .mc.dis:hover { box-shadow: inset -2px -4px 0 #2b2b2b, inset 2px 2px 0 #a8a8a8, 0 0 0 2px #000; color: #a0a0a0; }
    .pair { display: flex; gap: 8px; width: 220px; max-width: 100%; }
    .pair .mc { flex: 1; width: auto; font-size: 13px; }
  `,
  html: `
    <div class="stage">
      <button class="mc" type="button" aria-pressed="false">Singleplayer</button>
      <button class="mc" type="button" aria-pressed="false">Multiplayer</button>
      <button class="mc dis" type="button" aria-disabled="true">Minecraft Realms</button>
      <div class="pair"><button class="mc" type="button" aria-pressed="false">Options...</button><button class="mc" type="button" aria-pressed="false">Quit Game</button></div>
    </div>`,
  init(root) {
    const btns = [...root.querySelectorAll('.mc:not(.dis)')];
    btns.forEach((b) => b.addEventListener('click', () => btns.forEach((o) => { const on = o === b && !o.classList.contains('on'); o.classList.toggle('on', on); o.setAttribute('aria-pressed', String(on)); })));
  },
};
