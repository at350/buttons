export default {
  id: 'ob-msn-nudge',
  credit: 'MSN Messenger 7 (2005) — the Nudge button: the whole conversation window shakes, and the status line says you just sent a nudge',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .win { width: 300px; max-width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid #0831d9; background: #fff; font: 11px Tahoma, Verdana, Arial, sans-serif; color: #000; box-shadow: 0 2px 8px rgba(0,0,0,.2); }
    .win.shake { animation: nudge .6s linear; }
    @keyframes nudge { 0%, 100% { transform: translate(0, 0); } 10% { transform: translate(-6px, 4px); } 20% { transform: translate(6px, -4px); } 30% { transform: translate(-6px, -4px); } 40% { transform: translate(6px, 4px); } 50% { transform: translate(-5px, 2px); } 60% { transform: translate(5px, -2px); } 70% { transform: translate(-3px, -2px); } 80% { transform: translate(3px, 2px); } 90% { transform: translate(-1px, 1px); } }
    .tb { height: 24px; display: flex; align-items: center; padding: 0 8px; gap: 6px; color: #fff; font-weight: 700; background: linear-gradient(#0a5fd8, #0831d9 40%, #0a4ec4); }
    .tb .x { margin-left: auto; width: 16px; height: 14px; background: #d8502c; border: 1px solid #fff; border-radius: 3px; }
    .chat { height: 64px; padding: 6px 8px; background: #fff; overflow: hidden; display: grid; align-content: end; gap: 3px; }
    .chat .who { color: #0831d9; font-weight: 700; }
    .chat .sys { color: #777; font-style: italic; }
    .bar { display: flex; gap: 2px; padding: 4px 6px; background: linear-gradient(#f6f8ff, #dde6f7); border-top: 1px solid #a9b9d9; border-bottom: 1px solid #a9b9d9; }
    .tbtn { width: 26px; height: 24px; border: 1px solid transparent; border-radius: 3px; background: none; cursor: pointer; display: grid; place-items: center; padding: 0; }
    .tbtn:hover { border-color: #7a96df; background: linear-gradient(#fff, #cfdcf6); }
    .tbtn:active { background: #b9cdf0; }
    .tbtn:focus-visible { outline: 1px dotted #000; }
    .tbtn svg { width: 18px; height: 18px; }
    .tbtn.cool { opacity: .4; cursor: default; }
    .inp { display: flex; gap: 6px; padding: 6px; }
    .inp input { flex: 1; min-width: 0; height: 22px; border: 1px solid #7f9db9; padding: 0 4px; font: 11px Tahoma, Verdana, sans-serif; }
    .inp input:focus-visible { outline: 1px solid #0831d9; }
    .send { padding: 0 10px; height: 22px; border: 1px solid #003c74; border-radius: 3px; background: linear-gradient(#fff, #ece9d8); cursor: pointer; font: 11px Tahoma, Verdana, sans-serif; color: #000; }
    .send:hover { box-shadow: inset 0 0 0 1px #ffc73c; }
    .send:focus-visible { outline: 1px dotted #000; outline-offset: -3px; }
  `,
  html: `
    <div class="win">
      <div class="tb">Tom &lt;3 - Conversation<span class="x" aria-hidden="true"></span></div>
      <div class="chat" aria-live="polite"><div><span class="who">Tom says:</span> hey u there??</div><div class="sys log">&nbsp;</div></div>
      <div class="bar">
        <button class="tbtn emo" type="button" aria-label="Emoticons"><svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7.5" fill="#ffd21f" stroke="#b58a00"/><circle cx="6.5" cy="7" r="1" /><circle cx="11.5" cy="7" r="1"/><path d="M5.5 10.5a3.5 3.5 0 0 0 7 0" fill="none" stroke="#000" stroke-width="1.2"/></svg></button>
        <button class="tbtn wink" type="button" aria-label="Winks"><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 15l4-11 4 7 4-9v13z" fill="#f26522"/></svg></button>
        <button class="tbtn nudge" type="button" aria-label="Nudge"><svg viewBox="0 0 18 18" aria-hidden="true"><rect x="4" y="2" width="10" height="14" rx="2" fill="#4f8ef7" stroke="#1b4fb3"/><path d="M1.5 6v6M16.5 6v6" stroke="#f26522" stroke-width="1.6"/></svg></button>
      </div>
      <div class="inp"><input type="text" aria-label="Message" placeholder=""><button class="send" type="button">Send</button></div>
    </div>`,
  init(root) {
    const win = root.querySelector('.win'), nudge = root.querySelector('.nudge'), log = root.querySelector('.log'), send = root.querySelector('.send'), inp = root.querySelector('input'), emo = root.querySelector('.emo'), wink = root.querySelector('.wink');
    let t = 0;
    nudge.addEventListener('click', () => {
      if (nudge.classList.contains('cool')) return;
      win.classList.remove('shake'); void win.offsetWidth; win.classList.add('shake');
      log.textContent = 'You have just sent a nudge.'; nudge.classList.add('cool');
      t = setTimeout(() => nudge.classList.remove('cool'), 2500);
    });
    const say = () => { const v = inp.value.trim(); if (!v) return; log.innerHTML = `<span class="who" style="color:#c00">You say:</span> ${v.replace(/[<>&]/g, '')}`; inp.value = ''; };
    send.addEventListener('click', say);
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); say(); } });
    emo.addEventListener('click', () => { inp.value += ':)'; inp.focus(); });
    wink.addEventListener('click', () => { log.textContent = 'You sent a Wink.'; });
    return () => clearTimeout(t);
  },
};
