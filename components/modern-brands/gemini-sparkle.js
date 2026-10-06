export default {
  id: 'mb-gemini-sparkle',
  credit: 'Google Gemini (dark) — the "Ask Gemini" chip with the gradient Gemini spark; while it thinks the spark spins and the label runs the blue-violet-rose Gemini gradient; Material mic toggle',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 20px 22px; border-radius: 12px; background: #131314; display: flex; align-items: center; gap: 8px; }
    .gm { height: 40px; padding: 0 16px 0 12px; border-radius: 999px; border: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; position: relative; isolation: isolate;
      background: #1e1f20; color: #e3e3e3; font: 500 14px/1 "Google Sans", "Roboto Flex", Roboto, system-ui, sans-serif; font-variation-settings: "wdth" 100, "GRAD" 0; letter-spacing: .1px;
      display: inline-flex; align-items: center; gap: 8px; transition: background .2s cubic-bezier(.2,0,0,1), transform .2s cubic-bezier(.2,0,0,1); }
    .gm::before { content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1; background: #e3e3e3; opacity: 0; transition: opacity .2s; }
    .gm:hover::before { opacity: .08; }
    .gm:active::before { opacity: .12; }
    .gm:focus-visible, .mic:focus-visible { outline: 2px solid #a8c7fa; outline-offset: 2px; }
    .st { width: 20px; height: 20px; flex: none; transition: transform .5s cubic-bezier(.2,0,0,1); }
    .gm:hover .st { transform: rotate(45deg); }
    .gm.busy .st { animation: spin 1.4s cubic-bezier(.5,0,.5,1) infinite; }
    @keyframes spin { 0% { transform: rotate(0) scale(1); } 50% { transform: rotate(180deg) scale(.82); } 100% { transform: rotate(360deg) scale(1); } }
    .lbl { display: grid; }
    .lbl span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .2s; }
    .lbl .b, .lbl .c { opacity: 0; }
    .gm.busy .a, .gm.done .a { opacity: 0; } .gm.busy .b, .gm.done .c { opacity: 1; }
    .lbl .b, .lbl .c { background: linear-gradient(74deg, #4285f4 0%, #9b72cb 33%, #d96570 66%, #4285f4 100%); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; }
    .gm.busy .b { animation: flow 1.6s linear infinite; }
    @keyframes flow { to { background-position: -300% 0; } }
    .mic { width: 40px; height: 40px; border-radius: 50%; border: 0; background: #1e1f20; color: #e3e3e3; cursor: pointer; display: grid; place-items: center; position: relative; isolation: isolate;
      transition: background .2s cubic-bezier(.2,0,0,1), color .2s; -webkit-tap-highlight-color: transparent; }
    .mic::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: currentColor; opacity: 0; z-index: -1; transition: opacity .2s; }
    .mic:hover::before { opacity: .08; }
    .mic svg { width: 22px; height: 22px; fill: currentColor; }
    .mic[aria-pressed="true"] { background: #a8c7fa; color: #062e6f; }
  `,
  html: `
    <div class="stage">
      <button class="gm" type="button" aria-live="polite">
        <svg class="st" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="gmg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#4285f4"/><stop offset=".55" stop-color="#9b72cb"/><stop offset="1" stop-color="#d96570"/></linearGradient></defs><path fill="url(#gmg)" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg>
        <span class="lbl"><span class="a">Ask Gemini</span><span class="b">Thinking…</span><span class="c">Ask Gemini</span></span>
      </button>
      <button class="mic" type="button" aria-pressed="false" aria-label="Use microphone"><svg viewBox="0 -960 960 960"><path d="M408-453.92q-29-30.91-29-75.08v-251q0-41.67 29.44-70.83Q437.88-880 479.94-880t71.56 29.17Q581-821.67 581-780v251q0 44.17-29 75.08Q523-423 480-423t-72-30.92ZM480-651Zm-30 501v-106q-96-11-166.5-77.5T202-498q-2-12.85 6.59-21.93 8.6-9.07 21.5-9.07 12.91 0 21.41 9t10.5 22q12 81 74.71 132.5Q399.42-314 479.65-314q81.35 0 143.85-51.5T698-498q2-13 10.68-22 8.67-9 21.5-9 12.82 0 21.32 9.07 8.5 9.08 6.5 21.93-11 97-81 164t-167 78v106q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37Zm59.5-346.5Q521-510 521-529v-251q0-17-11.79-28.5T480-820q-17.42 0-29.21 11.5T439-780v251q0 19 11.5 32.5T480-483q18 0 29.5-13.5Z"/></svg></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.gm'), mic = root.querySelector('.mic');
    let t;
    b.addEventListener('click', () => {
      if (b.classList.contains('busy')) return;
      if (b.classList.contains('done')) { b.classList.remove('done'); return; }
      b.classList.add('busy');
      t = setTimeout(() => { b.classList.remove('busy'); b.classList.add('done'); }, 1800);
    });
    mic.addEventListener('click', () => mic.setAttribute('aria-pressed', String(mic.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
