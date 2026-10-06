export default {
  id: 'cr-text-scramble',
  credit: 'Text scramble — Justin Windle’s "Text Scramble Effect" (CodePen): per-letter random start/end frames, flickering glyph soup, rAF only while resolving',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0b0b10; padding: 28px 34px; border-radius: 12px; }
    .btn {
      cursor: pointer; background: transparent; color: #fafafa; border: 1px solid #3a3a48; border-radius: 6px;
      font: 500 15px/1 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .2em;
      padding: 16px 22px 16px 26px; transition: border-color .25s ease, box-shadow .25s ease;
    }
    .btn:hover, .btn:focus-visible { border-color: #7cf; box-shadow: 0 0 0 1px #7cf, 0 0 24px rgba(119, 204, 255, .22); outline: 0; }
    .btn:active { transform: translateY(1px); }
    .t { display: inline-block; min-width: 7ch; white-space: pre; text-align: left; }
    .t .dud { color: #757575; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-label="Decrypt"><span class="t" aria-hidden="true">ENCRYPT</span></button></div>`,
  init(root) {
    const b = root.querySelector('.btn'), span = root.querySelector('.t');
    const A = 'ENCRYPT', B = 'DECRYPT', CH = '!<>-_\\/[]{}—=+*^?#________';
    let raf = 0, queue = [], frame = 0, target = A;
    const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    const rnd = () => CH[Math.floor(Math.random() * CH.length)];
    const update = () => {
      let out = '', done = 0;
      for (const q of queue) {
        if (frame >= q.end) { done++; out += esc(q.to); }
        else if (frame >= q.start) {
          if (!q.ch || Math.random() < .28) q.ch = rnd();
          out += '<span class="dud">' + esc(q.ch) + '</span>';
        } else out += esc(q.from);
      }
      span.innerHTML = out;
      if (done === queue.length) { raf = 0; return; }
      frame++; raf = requestAnimationFrame(update);
    };
    const setText = (to) => {
      if (to === target) return;
      const from = span.textContent; target = to;
      queue = [...to].map((c, i) => { const start = Math.floor(Math.random() * 16); return { from: from[i] || ' ', to: c, start, end: start + 6 + Math.floor(Math.random() * 18) }; });
      cancelAnimationFrame(raf); frame = 0; update();
    };
    b.addEventListener('pointerenter', () => setText(B));
    b.addEventListener('pointerleave', () => { if (!b.matches(':focus-visible')) setText(A); });
    b.addEventListener('focus', () => { if (b.matches(':focus-visible')) setText(B); });
    b.addEventListener('blur', () => setText(A));
    return () => cancelAnimationFrame(raf);
  },
};
