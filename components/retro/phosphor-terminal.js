export default {
  id: 'rt-phosphor-terminal',
  credit: 'VT220 / BBS green-phosphor terminal — bracketed menu buttons with blinking block cursor and bloom',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #050905; padding: 14px 18px; border-radius: 12px; display: inline-block; position: relative; overflow: hidden;
      font: 14px/20px ui-monospace, Menlo, Consolas, "Courier New", monospace; color: #33ff33; text-shadow: 0 0 4px rgba(51,255,51,.7); }
    .stage::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(0,0,0,.25) 0 1px, transparent 1px 3px); }
    .ln { white-space: nowrap; }
    .b { background: none; border: none; padding: 0 2px; color: inherit; font: inherit; text-shadow: inherit; cursor: pointer; }
    .b:hover, .b:focus-visible { background: #33ff33; color: #050905; text-shadow: none; outline: none; }
    .b.sel { background: #33ff33; color: #050905; text-shadow: none; }
    .b:active { filter: brightness(.7); }
    .cur { display: inline-block; width: 9px; height: 16px; background: #33ff33; vertical-align: -3px; margin-left: 2px; animation: blink 1s steps(1) infinite; }
    .out { min-height: 20px; opacity: .85; }
    @keyframes blink { 50% { opacity: 0; } }
  `,
  html: `
    <div class="stage">
      <div class="ln">&gt; MAIN MENU</div>
      <div class="ln"><button class="b" type="button" aria-pressed="false">[1] FILES</button> <button class="b" type="button" aria-pressed="false">[2] MAIL</button> <button class="b" type="button" aria-pressed="false">[3] CHAT</button></div>
      <div class="ln out"></div>
      <div class="ln">&gt; <span class="typed"></span><span class="cur"></span></div>
    </div>`,
  init(root) {
    const out = root.querySelector('.out'); const typed = root.querySelector('.typed');
    const bs = [...root.querySelectorAll('.b')];
    bs.forEach((b, i) => b.addEventListener('click', () => {
      bs.forEach((o) => { o.classList.remove('sel'); o.setAttribute('aria-pressed', 'false'); });
      b.classList.add('sel'); b.setAttribute('aria-pressed', 'true');
      typed.textContent = String(i + 1);
      out.textContent = ['LOADING FILE AREA...', 'YOU HAVE 3 NEW MESSAGES', 'ENTERING CHAT ROOM #1'][i];
    }));
  },
};
