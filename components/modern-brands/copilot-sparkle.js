export default {
  id: 'mb-copilot-sparkle',
  credit: 'GitHub Copilot (Primer dark) — "Ask Copilot" button whose outline turns into the Copilot blue-to-pink gradient ring while it thinks',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 20px 24px; border-radius: 12px; background: #0d1117; display: flex; gap: 8px; align-items: center; }
    .cp { position: relative; height: 32px; padding: 0 12px; border-radius: 6px; border: 0; cursor: pointer; isolation: isolate; -webkit-tap-highlight-color: transparent;
      background: #21262d; color: #c9d1d9; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; display: inline-flex; align-items: center; gap: 8px;
      transition: background .15s, color .15s, transform .15s cubic-bezier(.2,.8,.2,1); box-shadow: inset 0 0 0 1px #30363d; }
    .cp:hover { background: #30363d; color: #fff; }
    .cp:active { transform: scale(.97); }
    .cp:focus-visible { outline: 2px solid #1f6feb; outline-offset: 2px; }
    .rim { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: -1; opacity: 0; transition: opacity .3s; }
    .rim::before { content: ''; position: absolute; inset: -400px; background: conic-gradient(#1f6feb, #a371f7, #f778ba, #1f6feb); animation: spin 1.4s linear infinite paused; }
    .rim::after { content: ''; position: absolute; inset: 1px; border-radius: 5px; background: #0d1117; }
    .cp:hover .rim, .cp.busy .rim { opacity: 1; }
    .cp:hover .rim::before, .cp.busy .rim::before { animation-play-state: running; }
    .cp:hover { background: transparent; box-shadow: none; }
    .cp.busy { background: transparent; box-shadow: none; color: #fff; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .cp svg { width: 16px; height: 16px; fill: currentColor; transition: transform .4s cubic-bezier(.2,.8,.2,1); }
    .cp:hover svg { transform: scale(1.1); }
    .cp.busy svg { animation: bob 1s ease-in-out infinite; }
    @keyframes bob { 50% { transform: translateY(-2px) scale(1.08); } }
    .cp.done { background: #238636; color: #fff; box-shadow: inset 0 0 0 1px rgba(240,246,252,.1); }
    .cp.done .rim { opacity: 0; }
    .cp.done svg path { d: path('M4 12.5 9 17.5 20 6.5'); fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .cnt { height: 32px; padding: 0 10px; border-radius: 6px; background: transparent; color: #8b949e; border: 0; font: 500 13px/1 Inter, system-ui, sans-serif; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .cnt:hover { color: #c9d1d9; background: #161b22; }
    .cnt:focus-visible { outline: 2px solid #1f6feb; outline-offset: 2px; }
    .cnt[aria-pressed="true"] { color: #58a6ff; }
    .cnt svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="stage">
      <button class="cp" type="button" aria-live="polite"><span class="rim"></span>
        <svg viewBox="0 0 24 24"><path d="M12 2c.2 1.6.8 3 1.8 4.2S16.4 8.2 18 8.5c-1.6.3-3 1-4.2 2.1S12.2 13.2 12 15c-.2-1.8-.8-3.3-1.8-4.4S7.6 8.8 6 8.5c1.6-.3 3-1.1 4.2-2.3S11.8 3.6 12 2zM5 15c.1 1 .5 1.8 1.1 2.4S7.4 18.4 8.5 18.5c-1 .1-1.9.5-2.4 1.1S5.1 21 5 22c-.1-1-.5-1.9-1.1-2.4S2.5 18.6 1.5 18.5c1-.1 1.9-.5 2.4-1.1S4.9 16 5 15zm14 .5c.1.8.4 1.4.8 1.9s1.1.7 1.7.8c-.7.1-1.3.4-1.7.8s-.7 1.1-.8 1.9c-.1-.8-.4-1.4-.8-1.9s-1.1-.7-1.7-.8c.7-.1 1.3-.4 1.7-.8s.7-1.1.8-1.9z"/></svg>
        <span class="lbl">Ask Copilot</span>
      </button>
      <button class="cnt" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Add context</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.cp'), lbl = b.querySelector('.lbl'), c = root.querySelector('.cnt');
    let t;
    b.addEventListener('click', () => {
      if (b.classList.contains('busy')) return;
      if (b.classList.contains('done')) { b.classList.remove('done'); lbl.textContent = 'Ask Copilot'; return; }
      b.classList.add('busy'); lbl.textContent = 'Thinking…';
      t = setTimeout(() => { b.classList.remove('busy'); b.classList.add('done'); lbl.textContent = 'Suggestion ready'; }, 1700);
    });
    c.addEventListener('click', () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
