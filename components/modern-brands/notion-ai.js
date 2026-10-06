export default {
  id: 'mb-notion-ai',
  credit: 'Notion AI — the purple-gradient sparkle "Ask AI" button; while it thinks the sparkle spins and the label shimmers',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 18px 22px; border-radius: 12px; background: #fff; border: 1px solid #e9e9e7; display: flex; gap: 8px; align-items: center; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .ai { position: relative; height: 32px; padding: 0 10px 0 8px; border-radius: 6px; border: 1px solid #e9e9e7; background: #fff; color: #37352f; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
      transition: background .15s, border-color .2s, box-shadow .25s, transform .15s cubic-bezier(.2,.8,.2,1); -webkit-tap-highlight-color: transparent; box-shadow: 0 1px 2px rgba(0,0,0,.04); }
    .ai:hover { background: #f7f6f3; border-color: #dcd9d4; }
    .ai:active { transform: scale(.97); }
    .ai:focus-visible { outline: 2px solid #9a6dd7; outline-offset: 2px; }
    .sp { width: 18px; height: 18px; flex: none; transition: transform .5s cubic-bezier(.2,.8,.2,1), filter .3s; }
    .ai:hover .sp { transform: rotate(20deg) scale(1.1); filter: drop-shadow(0 0 6px rgba(154,109,215,.6)); }
    .ai.busy .sp { animation: spin 1.1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .ai.busy .lbl { background: linear-gradient(90deg, #9b9a97 0%, #37352f 50%, #9b9a97 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shim 1.1s linear infinite; }
    @keyframes shim { from { background-position: 100% 0; } to { background-position: -100% 0; } }
    .ai.done { border-color: #d8c9f4; background: linear-gradient(135deg, #f6f1ff, #fff); }
    .ai.done .sp { transform: scale(1.05); filter: drop-shadow(0 0 8px rgba(154,109,215,.5)); }
    .o { height: 32px; padding: 0 10px; border-radius: 6px; border: 1px solid transparent; background: transparent; color: #787774; cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 6px; transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; }
    .o:hover { background: #f1f0ee; color: #37352f; }
    .o:focus-visible { outline: 2px solid #37352f; outline-offset: 2px; }
    .o svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .o[aria-pressed="true"] { color: #37352f; background: #ebeae8; }
  `,
  html: `
    <div class="stage">
      <button class="ai" type="button" aria-live="polite">
        <svg class="sp" viewBox="0 0 24 24"><defs><linearGradient id="nai" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7f5af0"/><stop offset=".55" stop-color="#c76ad1"/><stop offset="1" stop-color="#ff7ab6"/></linearGradient></defs>
          <path fill="url(#nai)" d="M12 2.5c.6 4.4 2.6 7.5 7 9.5-4.4 2-6.4 5.1-7 9.5-.6-4.4-2.6-7.5-7-9.5 4.4-2 6.4-5.1 7-9.5z"/><path fill="url(#nai)" d="M19 2c.3 1.6 1 2.7 2.5 3.5C20 6.3 19.3 7.4 19 9c-.3-1.6-1-2.7-2.5-3.5C18 4.7 18.7 3.6 19 2z"/></svg>
        <span class="lbl">Ask AI</span>
      </button>
      <button class="o" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>Improve writing</button>
    </div>`,
  init(root) {
    const ai = root.querySelector('.ai'), lbl = ai.querySelector('.lbl'), o = root.querySelector('.o');
    let t;
    ai.addEventListener('click', () => {
      if (ai.classList.contains('busy')) return;
      if (ai.classList.contains('done')) { ai.classList.remove('done'); lbl.textContent = 'Ask AI'; return; }
      ai.classList.add('busy'); lbl.textContent = 'Thinking';
      t = setTimeout(() => { ai.classList.remove('busy'); ai.classList.add('done'); lbl.textContent = 'Done'; }, 1600);
    });
    o.addEventListener('click', () => o.setAttribute('aria-pressed', String(o.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
