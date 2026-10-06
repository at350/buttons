export default {
  id: 'mb-gemini-sparkle',
  credit: 'Google Gemini — the four-point blue-to-pink gradient sparkle; the "Ask Gemini" pill glows and the star spins and pulses while it thinks',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 20px 24px; border-radius: 12px; background: #131314; display: flex; align-items: center; gap: 10px; }
    .gm { position: relative; height: 40px; padding: 0 16px 0 12px; border-radius: 999px; border: 0; cursor: pointer; isolation: isolate; -webkit-tap-highlight-color: transparent;
      background: #1e1f20; color: #e3e3e3; font: 500 14px/1 "Google Sans", "Roboto Flex", Inter, system-ui, sans-serif; display: inline-flex; align-items: center; gap: 9px;
      transition: background .2s, transform .15s cubic-bezier(.2,.8,.2,1), box-shadow .3s; }
    .gm:hover { background: #2a2b2d; box-shadow: 0 0 0 1px rgba(76,141,255,.3), 0 0 30px -6px rgba(168,133,255,.6); }
    .gm:active { transform: scale(.97); }
    .gm:focus-visible { outline: 2px solid #a8c7fa; outline-offset: 2px; }
    .gm::before { content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1; opacity: 0; transition: opacity .3s;
      background: linear-gradient(90deg, rgba(76,141,255,.25), rgba(168,133,255,.25), rgba(255,117,170,.25)); }
    .gm.busy::before, .gm.done::before { opacity: 1; }
    .st { width: 20px; height: 20px; flex: none; transition: transform .5s cubic-bezier(.2,.8,.2,1), filter .3s; }
    .gm:hover .st { transform: rotate(45deg) scale(1.1); filter: drop-shadow(0 0 6px rgba(168,133,255,.7)); }
    .gm.busy .st { animation: spin 1.6s cubic-bezier(.6,.05,.3,.95) infinite, pulse 1.6s ease-in-out infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 50% { filter: drop-shadow(0 0 10px rgba(76,141,255,.9)) brightness(1.3); } }
    .gm.busy .lbl { background: linear-gradient(90deg, #4c8dff, #a885ff, #ff75aa, #4c8dff); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: flow 1.6s linear infinite; }
    @keyframes flow { to { background-position: 300% 0; } }
    .gm.done .lbl { background: linear-gradient(90deg, #4c8dff, #a885ff, #ff75aa); -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 600; }
    .mic { width: 40px; height: 40px; border-radius: 50%; border: 0; background: #1e1f20; color: #e3e3e3; cursor: pointer; display: grid; place-items: center; transition: background .2s; -webkit-tap-highlight-color: transparent; }
    .mic:hover { background: #2a2b2d; }
    .mic:focus-visible { outline: 2px solid #a8c7fa; outline-offset: 2px; }
    .mic svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
    .mic[aria-pressed="true"] { background: #a8c7fa; color: #062e6f; }
  `,
  html: `
    <div class="stage">
      <button class="gm" type="button" aria-live="polite">
        <svg class="st" viewBox="0 0 24 24"><defs><linearGradient id="gmg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4c8dff"/><stop offset=".5" stop-color="#a885ff"/><stop offset="1" stop-color="#ff75aa"/></linearGradient></defs>
          <path fill="url(#gmg)" d="M12 1.5C12.4 7.4 16.6 11.6 22.5 12 16.6 12.4 12.4 16.6 12 22.5 11.6 16.6 7.4 12.4 1.5 12 7.4 11.6 11.6 7.4 12 1.5z"/></svg>
        <span class="lbl">Ask Gemini</span>
      </button>
      <button class="mic" type="button" aria-pressed="false" aria-label="Talk"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.gm'), lbl = b.querySelector('.lbl'), mic = root.querySelector('.mic');
    let t;
    b.addEventListener('click', () => {
      if (b.classList.contains('busy')) return;
      if (b.classList.contains('done')) { b.classList.remove('done'); lbl.textContent = 'Ask Gemini'; return; }
      b.classList.add('busy'); lbl.textContent = 'Just a sec…';
      t = setTimeout(() => { b.classList.remove('busy'); b.classList.add('done'); lbl.textContent = 'Here you go'; }, 1800);
    });
    mic.addEventListener('click', () => mic.setAttribute('aria-pressed', String(mic.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
