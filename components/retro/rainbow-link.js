const TEXT = 'Click HERE to enter!!!';
export default {
  id: 'rt-rainbow-link',
  credit: 'Late-90s homepage — per-letter rainbow-cycling link (the JavaScript colour-cycler) beside a default #0000ee / #551a8b link',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #ffffff; padding: 14px 18px; border-radius: 12px; display: inline-flex; gap: 18px; align-items: baseline;
      font: 16px "Times New Roman", Times, serif; }
    a { color: #0000ee; text-decoration: underline; cursor: pointer; }
    a.visited { color: #551a8b; }
    a:active { color: #ff0000; }
    a:focus-visible { outline: 1px dotted #000; }
    .rb { font-weight: bold; font-size: 20px; white-space: nowrap; }
    .rb span { animation: cyc 1.4s steps(1) infinite; }
    .rb:hover span { animation-duration: .45s; }
    .rb.visited span { animation: none; color: #551a8b; }
    @keyframes cyc { 0% { color: #ff0000; } 14% { color: #ff8000; } 28% { color: #ffff00; } 42% { color: #00ff00; } 57% { color: #00ffff; } 71% { color: #0000ff; } 85% { color: #ff00ff; } }
  `,
  html: `
    <div class="stage">
      <a href="#" class="rb">${[...TEXT].map((c, i) => `<span style="animation-delay:-${(i * 0.2).toFixed(1)}s">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</a>
      <a href="#" class="plain">guestbook</a>
    </div>`,
  init(root) {
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('visited'); }));
  },
};
