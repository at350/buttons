export default {
  id: 'rt-frutiger-aero',
  credit: 'Frutiger Aero (c. 2008) — glossy aqua bubble button with lens highlight and bokeh sky',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; overflow: hidden; padding: 20px 26px; border-radius: 12px; display: inline-block;
      background: radial-gradient(ellipse at 20% 100%, #7ee37a 0%, transparent 45%), radial-gradient(ellipse at 90% 10%, #c8f3ff 0%, transparent 40%), linear-gradient(#1e8fe0, #67c7f5 55%, #a6e7ff); }
    .stage::before, .stage::after { content: ""; position: absolute; border-radius: 50%; border: 2px solid rgba(255,255,255,.55); background: rgba(255,255,255,.12); pointer-events: none; }
    .stage::before { width: 42px; height: 42px; left: 8px; top: 6px; }
    .stage::after { width: 20px; height: 20px; right: 16px; bottom: 10px; }
    .bub { position: relative; min-width: 120px; height: 44px; padding: 0 22px; border: 1px solid rgba(255,255,255,.8); border-radius: 22px; cursor: pointer;
      font: bold 15px "Segoe UI", "Frutiger", "Trebuchet MS", Arial, sans-serif; color: #fff; text-shadow: 0 1px 2px rgba(0,40,90,.6);
      background: radial-gradient(ellipse at 50% 120%, #c9f6ff 0%, #35b4f0 40%, #0a78d6 100%); overflow: hidden;
      box-shadow: inset 0 -6px 10px rgba(0,40,120,.35), inset 0 2px 2px rgba(255,255,255,.7), 0 6px 14px rgba(0,30,80,.35); transition: transform .15s, filter .15s; }
    .bub::before { content: ""; position: absolute; left: 10%; right: 10%; top: 2px; height: 46%; border-radius: 50%; background: linear-gradient(rgba(255,255,255,.95), rgba(255,255,255,.1)); pointer-events: none; }
    .bub::after { content: ""; position: absolute; width: 14px; height: 14px; border-radius: 50%; right: 12px; top: 6px; background: radial-gradient(#fff, rgba(255,255,255,0) 70%); pointer-events: none; }
    .bub:hover { transform: translateY(-2px) scale(1.03); filter: brightness(1.08); }
    .bub:active { transform: scale(.97); filter: brightness(.92); }
    .bub.on { background: radial-gradient(ellipse at 50% 120%, #e4ffd0 0%, #7fdc4a 40%, #2f9d1a 100%); }
    .bub:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <button class="bub" type="button" aria-pressed="false">Connect</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.bub');
    b.addEventListener('click', () => { const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Connected' : 'Connect'; });
  },
};
