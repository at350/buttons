export default {
  id: 'lb-uiverse-glow',
  credit: 'Uiverse.io / CodePen classic "glow-on-hover": a 400%-wide blurred rainbow gradient (45deg, 9 stops) drifts behind a #111 button on a 20s loop and fades in on hover; pressing turns the face transparent with black text, click keeps it lit',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #000; display: inline-block; }
    .gl { position: relative; z-index: 0; width: 220px; height: 50px; border: none; outline: none; border-radius: 10px; background: #111; color: #fff; cursor: pointer; font: 400 13.33px Arial, system-ui, sans-serif; -webkit-tap-highlight-color: transparent; }
    .gl::before { content: ''; position: absolute; top: -2px; left: -2px; z-index: -1; width: calc(100% + 4px); height: calc(100% + 4px); border-radius: 10px; background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000); background-size: 400%; filter: blur(5px); opacity: 0; transition: opacity .3s ease-in-out; animation: glowing 20s linear infinite; }
    .gl::after { content: ''; position: absolute; left: 0; top: 0; z-index: -1; width: 100%; height: 100%; border-radius: 10px; background: #111; }
    .gl:hover::before, .gl:focus-visible::before, .gl[aria-pressed="true"]::before { opacity: 1; }
    .gl:active { color: #000; }
    .gl:active::after { background: transparent; }
    @keyframes glowing { 0% { background-position: 0 0; } 50% { background-position: 400% 0; } 100% { background-position: 0 0; } }
  `,
  html: `
    <div class="stage">
      <button class="gl" type="button" aria-pressed="false">HOVER ME, THEN CLICK ME!</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.gl');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
