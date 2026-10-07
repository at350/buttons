export default {
  id: 'ob-white-rabbit',
  credit: 'The Matrix (1999) — Neo\'s terminal: hover and "Follow the white rabbit." types itself in green phosphor with a blinking block cursor; click to knock',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .term { position: relative; width: 300px; max-width: 100%; height: 120px; padding: 16px 18px; border-radius: 12px; background: #000; color: #00ff41; font: 15px/1.5 "IBM Plex Mono", "JetBrains Mono", ui-monospace, monospace; text-shadow: 0 0 6px rgba(0,255,65,.7); cursor: text; overflow: hidden; border: 0; text-align: left; display: block; }
    .term::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(0,0,0,.25) 0 1px, transparent 1px 3px); pointer-events: none; }
    .term:focus-visible { outline: 1px solid #00ff41; outline-offset: 2px; }
    .ln { display: block; min-height: 22px; white-space: pre-wrap; word-break: break-word; }
    .cur { display: inline-block; width: 9px; height: 17px; background: #00ff41; vertical-align: -3px; margin-left: 1px; animation: blink 1s steps(1) infinite; box-shadow: 0 0 6px #00ff41; }
    @keyframes blink { 0%, 74% { opacity: 1; } 75%, 100% { opacity: 0; } }
    .term.typing .cur { animation: none; }
  `,
  html: `<button class="term" type="button" aria-label="Terminal"><span class="ln l1"><span class="cur" aria-hidden="true"></span></span><span class="ln l2"></span></button>`,
  init(root) {
    const term = root.querySelector('.term'), l1 = root.querySelector('.l1'), l2 = root.querySelector('.l2'), cur = root.querySelector('.cur');
    const lines = ['Wake up, Neo...', 'The Matrix has you...', 'Follow the white rabbit.', 'Knock, knock, Neo.'];
    let step = 0, iv = 0, typed = false;
    const stop = () => { clearInterval(iv); iv = 0; term.classList.remove('typing'); };
    const type = (el, text, done) => {
      stop(); term.classList.add('typing'); el.textContent = ''; el.appendChild(cur); let i = 0;
      iv = setInterval(() => { if (i < text.length) { cur.before(text[i++]); } else { stop(); done && done(); } }, 55 + Math.random() * 40);
    };
    const show = () => {
      if (step === 0) { l1.textContent = ''; l2.textContent = ''; l1.appendChild(cur); return; }
      if (step === 1) { type(l1, lines[0]); }
      if (step === 2) { l1.textContent = lines[0]; type(l2, lines[1]); }
      if (step === 3) { l1.textContent = lines[1]; type(l2, lines[2]); }
      if (step === 4) { l1.textContent = lines[2]; type(l2, lines[3]); }
    };
    term.addEventListener('mouseenter', () => { if (step === 0) { step = 1; show(); } });
    term.addEventListener('mouseleave', () => { if (iv) { stop(); show(); } });
    term.addEventListener('click', () => { step = step >= 4 ? 0 : step + 1; show(); });
    // Space finishes the current line instantly, Escape clears the screen
    term.addEventListener('keydown', (e) => {
      if (e.key === ' ' && iv) { e.preventDefault(); stop(); const el = step === 1 ? l1 : l2; el.textContent = lines[step - 1]; el.appendChild(cur); }
      if (e.key === 'Escape') { step = 0; stop(); show(); }
    });
    show();
    return stop;
  },
};
