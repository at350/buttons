export default {
  id: 'lb-uiverse-glow',
  credit: 'Uiverse.io classic "glow on hover" (button-85 lineage) — a blurred rainbow gradient slides behind a black button and lights the rim; click keeps it lit',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #111; display: inline-block; }
    .gl { position: relative; z-index: 0; width: 180px; height: 50px; border: 0; border-radius: 10px; background: #111; color: #fff; cursor: pointer; font: 600 15px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: .02em; -webkit-tap-highlight-color: transparent; }
    .gl::before { content: ''; position: absolute; top: -2px; left: -2px; width: calc(100% + 4px); height: calc(100% + 4px); z-index: -1; border-radius: 12px; background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000); background-size: 400%; filter: blur(5px); opacity: 0; transition: opacity .3s ease-in-out; animation: glow 20s linear infinite; animation-play-state: paused; }
    .gl::after { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: 10px; background: #111; transition: background .2s; }
    .gl:hover::before, .gl:focus-visible::before, .gl[aria-pressed="true"]::before { opacity: 1; animation-play-state: running; }
    .gl:active::after { background: transparent; }
    .gl[aria-pressed="true"]::after { background: #191919; }
    .gl:focus-visible { outline: 0; }
    @keyframes glow { 0% { background-position: 0 0; } 50% { background-position: 400% 0; } 100% { background-position: 0 0; } }
    .gl span { position: relative; z-index: 1; }
  `,
  html: `
    <div class="stage">
      <button class="gl" type="button" aria-pressed="false"><span>Hover me</span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.gl'), s = b.querySelector('span');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); s.textContent = on ? 'Glowing' : 'Hover me'; });
  },
};
