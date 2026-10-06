export default {
  id: 'cr-text-scramble',
  credit: 'Text scramble on hover — Justin Windle’s "Text Scramble Effect" (CodePen)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0b0b10; padding: 28px 36px; border-radius: 12px; }
    .btn {
      cursor: pointer; background: transparent; color: #e6e6e6; border: 1px solid #3a3a48; border-radius: 6px;
      font: 600 15px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .25em;
      padding: 16px 28px; transition: border-color .25s, color .25s, box-shadow .25s;
    }
    .btn:hover, .btn:focus-visible { border-color: #7cf; color: #fff; box-shadow: 0 0 0 1px #7cf, 0 0 24px rgba(119, 204, 255, .25); outline: 0; }
    .btn:active { transform: translateY(1px); }
    .t { display: inline-block; min-width: 7ch; text-align: left; }
    .t .x { color: #7cf; opacity: .7; }
  `,
  html: `<div class="stage"><button class="btn" type="button"><span class="t">ENCRYPT</span></button></div>`,
  init(root) {
    const b = root.querySelector('.btn'), span = root.querySelector('.t');
    const A = 'ENCRYPT', B = 'DECRYPT', CH = '!<>-_\\/[]{}=+*^?#%&';
    let timer = null, current = A;
    const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    function run(to) {
      if (to === current && !timer) return;
      clearInterval(timer);
      const from = current; current = to;
      let frame = 0;
      const start = [...to].map((_, i) => i * 2 + Math.floor(Math.random() * 4));
      const end = start.map((s) => s + 6 + Math.floor(Math.random() * 8));
      timer = setInterval(() => {
        frame++;
        let out = '', done = true;
        for (let i = 0; i < to.length; i++) {
          if (frame >= end[i]) out += esc(to[i]);
          else if (frame >= start[i]) { done = false; out += '<span class="x">' + esc(CH[Math.floor(Math.random() * CH.length)]) + '</span>'; }
          else { done = false; out += esc(from[i] || ' '); }
        }
        span.innerHTML = out;
        if (done) { clearInterval(timer); timer = null; }
      }, 32);
    }
    b.addEventListener('mouseenter', () => run(B));
    b.addEventListener('mouseleave', () => run(A));
    b.addEventListener('focus', () => run(B));
    b.addEventListener('blur', () => run(A));
    return () => clearInterval(timer);
  },
};
