export default {
  id: 'mb-openai-send',
  credit: 'ChatGPT composer — the black up-arrow send circle that turns into a pulsing stop square while the answer streams',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 22px; border-radius: 12px; background: #fff; border: 1px solid #ececec; font: 400 15px/1 Inter, -apple-system, system-ui, sans-serif; }
    .bar { display: flex; align-items: center; gap: 8px; min-height: 52px; padding: 6px 6px 6px 8px; border-radius: 26px; background: #f4f4f4; transition: box-shadow .2s, background .2s; }
    .bar:focus-within { background: #fff; box-shadow: 0 0 0 1px #e3e3e3, 0 4px 20px rgba(0,0,0,.08); }
    .ic { width: 36px; height: 36px; border-radius: 50%; border: 0; background: transparent; color: #0d0d0d; cursor: pointer; display: grid; place-items: center; flex: none; transition: background .15s; -webkit-tap-highlight-color: transparent; }
    .ic:hover { background: #e3e3e3; }
    .ic:focus-visible, .send:focus-visible { outline: 2px solid #0d0d0d; outline-offset: 2px; }
    .ic svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    input { flex: 1; min-width: 0; height: 36px; border: 0; outline: none; background: transparent; font: inherit; color: #0d0d0d; }
    input::placeholder { color: #8f8f8f; }
    .send { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 0; background: #0d0d0d; color: #fff; cursor: pointer; display: grid; place-items: center; flex: none;
      transition: background .2s, border-radius .35s cubic-bezier(.2,.8,.2,1), transform .2s cubic-bezier(.2,.8,.2,1), opacity .2s; -webkit-tap-highlight-color: transparent; }
    .send:disabled { background: #d7d7d7; color: #fff; cursor: default; }
    .send:not(:disabled):hover { background: #333; }
    .send:not(:disabled):active { transform: scale(.9); }
    .send svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .send .sq { position: absolute; width: 12px; height: 12px; border-radius: 2px; background: #fff; transform: scale(0); transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .send.gen { border-radius: 50%; }
    .send.gen svg { transform: scale(0); }
    .send.gen .sq { transform: scale(1); }
    .send.gen::after { content: ''; position: absolute; inset: -3px; border-radius: 50%; border: 2px solid rgba(13,13,13,.25); animation: pulse 1.2s ease-out infinite; }
    @keyframes pulse { from { transform: scale(.9); opacity: 1; } to { transform: scale(1.5); opacity: 0; } }
    .typing { display: none; flex: 1; gap: 5px; align-items: center; height: 36px; padding-left: 10px; }
    .typing i { width: 8px; height: 8px; border-radius: 50%; background: #0d0d0d; animation: bl 1s ease-in-out infinite; }
    .typing i:nth-child(2) { animation-delay: .15s; } .typing i:nth-child(3) { animation-delay: .3s; }
    .bar.gen .typing { display: inline-flex; } .bar.gen input { display: none; }
    @keyframes bl { 0%,100% { transform: scale(.6); opacity: .4; } 50% { transform: scale(1); opacity: 1; } }
  `,
  html: `
    <div class="stage">
      <div class="bar">
        <button class="ic" type="button" aria-label="Attach"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
        <input type="text" placeholder="Ask anything" aria-label="Message">
        <span class="typing" aria-label="Generating"><i></i><i></i><i></i></span>
        <button class="ic" type="button" aria-label="Voice"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>
        <button class="send" type="button" aria-label="Send" disabled aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M12 19V5m-7 7 7-7 7 7"/></svg><span class="sq"></span></button>
      </div>
    </div>`,
  init(root) {
    const bar = root.querySelector('.bar'), input = root.querySelector('input'), send = root.querySelector('.send');
    let t;
    const gen = (on) => { bar.classList.toggle('gen', on); send.classList.toggle('gen', on); send.setAttribute('aria-pressed', String(on)); send.setAttribute('aria-label', on ? 'Stop generating' : 'Send'); if (!on) { send.disabled = !input.value.trim(); input.focus(); } };
    input.addEventListener('input', () => { if (!send.classList.contains('gen')) send.disabled = !input.value.trim(); });
    const go = () => {
      if (send.classList.contains('gen')) { clearTimeout(t); gen(false); return; }
      if (!input.value.trim()) return;
      input.value = ''; gen(true); send.disabled = false;
      t = setTimeout(() => gen(false), 2600);
    };
    send.addEventListener('click', go);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); go(); } });
    return () => clearTimeout(t);
  },
};
