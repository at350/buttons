export default {
  id: 'cr-play-pause-morph',
  credit: 'Morphing play / pause — two clip-path polygons that reshape (Cassie Evans style SVG morph, in CSS)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #18181b; padding: 24px 32px; border-radius: 12px; }
    .btn { position: relative; width: 64px; height: 64px; border: 0; border-radius: 50%; background: #fafafa; cursor: pointer;
      transition: transform .15s, background .2s; }
    .btn:hover { background: #fff; transform: scale(1.06); }
    .btn:active { transform: scale(.94); }
    .btn:focus-visible { outline: 2px solid #fafafa; outline-offset: 4px; }
    .s { position: absolute; inset: 0; background: #18181b; transition: clip-path .4s cubic-bezier(.4, 0, .2, 1); }
    .l { clip-path: polygon(33% 25%, 54% 36.5%, 54% 63.5%, 33% 75%); }
    .r { clip-path: polygon(54% 36.5%, 75% 50%, 75% 50%, 54% 63.5%); }
    .btn[aria-pressed="true"] .l { clip-path: polygon(30% 25%, 44% 25%, 44% 75%, 30% 75%); }
    .btn[aria-pressed="true"] .r { clip-path: polygon(56% 25%, 70% 25%, 70% 75%, 56% 75%); }
    .btn[aria-pressed="true"] { background: #a3e635; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false" aria-label="play"><span class="s l"></span><span class="s r"></span></button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', on ? 'pause' : 'play');
    });
  },
};
