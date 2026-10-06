export default {
  id: 'rt-rainbow-link',
  credit: 'Late-90s homepage — animated rainbow-cycling link beside a default blue/purple visited link',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #ffffff; padding: 14px 18px; border-radius: 12px; display: inline-flex; gap: 18px; align-items: center;
      font: 16px "Times New Roman", Times, serif; }
    a { color: #0000ee; text-decoration: underline; cursor: pointer; }
    a.visited { color: #551a8b; }
    a:active { color: #ff0000; }
    a:focus-visible { outline: 1px dotted #000; }
    .rb { font-weight: bold; font-size: 20px; text-decoration: none;
      background: linear-gradient(90deg, #f00, #ff8000, #ff0, #0f0, #0ff, #00f, #8000ff, #f00); background-size: 200% 100%;
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
      animation: cycle 1.6s linear infinite; }
    .rb:hover { animation-duration: .4s; }
    .rb.clicked { animation: none; background: #551a8b; -webkit-background-clip: text; background-clip: text; text-decoration: underline; }
    @keyframes cycle { to { background-position: -200% 0; } }
  `,
  html: `
    <div class="stage">
      <a href="#" class="rb">Click HERE to enter!!!</a>
      <a href="#" class="plain">guestbook</a>
    </div>`,
  init(root) {
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      a.classList.toggle(a.classList.contains('rb') ? 'clicked' : 'visited');
    }));
  },
};
