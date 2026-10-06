// MSN Messenger 7 (2005) conversation window on Windows XP Luna: blue Luna title bar (Trebuchet bold,
// red close), the light-blue Messenger interior with menu bar and "To:" line, white history pane, the
// lower toolbar (font, emoticons, winks, nudge) and Send. The nudge shakes the whole window — inside its
// own desktop stage, so it never leaves the element's box.
export default {
  id: 'ob-msn-nudge',
  credit: 'MSN Messenger 7 (2005) — the Nudge button: the conversation window shakes and "You have just sent a nudge." appears',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .desk { width: 344px; max-width: 100%; padding: 12px; border-radius: 12px; background: linear-gradient(#2f6fdc, #6aa7ef 70%, #4f9a3a 70.5%, #3f8a2c); }
    .win { border: 1px solid #0831d9; border-radius: 8px 8px 0 0; overflow: hidden; background: #e3ecf9; font: 11px/1.3 Tahoma, Verdana, Arial, sans-serif; color: #000; box-shadow: 2px 3px 8px rgba(0,0,0,.35); }
    .win.shake { animation: nudge .5s linear; }
    @keyframes nudge { 0%,100% { transform: translate(0,0); } 10% { transform: translate(-6px,3px); } 20% { transform: translate(6px,-3px); } 30% { transform: translate(-6px,-3px); } 40% { transform: translate(6px,3px); } 50% { transform: translate(-5px,2px); } 60% { transform: translate(5px,-2px); } 70% { transform: translate(-3px,-2px); } 80% { transform: translate(3px,2px); } 90% { transform: translate(-1px,1px); } }
    .tb { height: 25px; display: flex; align-items: center; gap: 4px; padding: 0 3px 0 5px; background: linear-gradient(#0997ff, #0053ee 12%, #0050ee 85%, #0066ff); color: #fff; font: 700 12px/1 "Trebuchet MS", Tahoma, sans-serif; text-shadow: 1px 1px #0f1089; white-space: nowrap; }
    .tb .ic { width: 16px; height: 16px; flex: none; }
    .tb .t { flex: 1; overflow: hidden; text-overflow: ellipsis; }
    .cap { width: 21px; height: 21px; border: 1px solid #fff; border-radius: 3px; display: grid; place-items: center; flex: none; background: linear-gradient(135deg, #3c8cfe, #2663de); }
    .cap.x { background: linear-gradient(135deg, #e9805f, #c63e14); }
    .cap svg { width: 9px; height: 9px; stroke: #fff; stroke-width: 2; fill: none; }
    .menu { display: flex; gap: 10px; padding: 3px 7px; background: linear-gradient(#f4f8fd, #e3ecf9); border-bottom: 1px solid #b6c8e6; color: #000; }
    .to { padding: 4px 8px; color: #1e3d75; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .to span { color: #555; }
    .chat { height: 70px; margin: 0 6px; padding: 4px 6px; background: #fff; border: 1px solid #9eb6ce; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; overflow: hidden; }
    .chat .who { color: #555; }
    .chat .msg { padding-left: 12px; color: #000; }
    .chat .sys { color: #7a7a7a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-height: 14px; }
    .bar { display: flex; align-items: center; gap: 1px; padding: 3px 6px 2px; }
    .tbtn { height: 22px; min-width: 24px; padding: 0 2px; border: 1px solid transparent; border-radius: 3px; background: none; cursor: pointer; display: inline-flex; align-items: center; gap: 1px; font: 700 12px/1 "Times New Roman", serif; color: #1e3d75; }
    .tbtn:hover { border-color: #7a96df; background: linear-gradient(#fff, #d6e3f7); }
    .tbtn:active { background: #b9cdf0; }
    .tbtn:focus-visible { outline: 1px dotted #000; outline-offset: -2px; }
    .tbtn svg { width: 18px; height: 18px; flex: none; }
    .tbtn .dd { width: 5px; height: 4px; }
    .tbtn.cool { opacity: .45; pointer-events: none; }
    .inp { display: flex; gap: 6px; padding: 0 6px 6px; }
    .inp input { flex: 1; min-width: 0; height: 40px; border: 1px solid #9eb6ce; padding: 3px 5px; font: 11px Tahoma, Verdana, sans-serif; background: #fff; color: #000; }
    .inp input:focus { outline: 0; border-color: #3c6fcf; }
    .send { width: 56px; height: 40px; border: 1px solid #003c74; border-radius: 3px; background: linear-gradient(#fff, #ece9d8 85%, #d6d0c5); cursor: pointer; font: 11px Tahoma, Verdana, sans-serif; color: #000; }
    .send:hover { box-shadow: inset 0 -2px #f8b636, inset 0 2px #fde1a0; }
    .send:active { background: linear-gradient(#e5e3dc, #f2f1ec); }
    .send:focus-visible { outline: 1px dotted #000; outline-offset: -4px; }
  `,
  html: `
    <div class="desk">
      <div class="win">
        <div class="tb"><svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><circle cx="10.5" cy="4" r="2.6" fill="#2f78e8"/><path d="M6.5 15c0-4 1.6-6.5 4-6.5s4 2.5 4 6.5z" fill="#2f78e8"/><circle cx="5.5" cy="5" r="2.8" fill="#3cb43c"/><path d="M1 15.5c0-4.4 1.8-7 4.5-7s4.5 2.6 4.5 7z" fill="#3cb43c"/></svg><span class="t">Tom - Conversation</span><span class="cap" aria-hidden="true"><svg viewBox="0 0 9 9"><path d="M1 7.5h5"/></svg></span><span class="cap" aria-hidden="true"><svg viewBox="0 0 9 9"><path d="M1 1.5h7v6.5H1z"/></svg></span><span class="cap x" aria-hidden="true"><svg viewBox="0 0 9 9"><path d="M1.5 1.5l6 6M7.5 1.5l-6 6"/></svg></span></div>
        <div class="menu" aria-hidden="true"><span>File</span><span>Edit</span><span>Actions</span><span>Tools</span><span>Help</span></div>
        <div class="to">To: <b>Tom</b> <span>&lt;tom@hotmail.com&gt;</span></div>
        <div class="chat" aria-live="polite"><div class="who">Tom says:</div><div class="msg">hey u there??</div><div class="sys log"></div></div>
        <div class="bar">
          <button class="tbtn" type="button" aria-label="Change font">A</button>
          <button class="tbtn emo" type="button" aria-label="Emoticons"><svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7.5" fill="#ffd21f" stroke="#c48a00"/><circle cx="6.5" cy="7" r="1.1"/><circle cx="11.5" cy="7" r="1.1"/><path d="M5.3 10.5a3.8 3.8 0 0 0 7.4 0" fill="none" stroke="#000" stroke-width="1.2"/></svg><svg class="dd" viewBox="0 0 5 4" aria-hidden="true"><path d="M0 0h5L2.5 4z" fill="#1e3d75"/></svg></button>
          <button class="tbtn wink" type="button" aria-label="Winks"><svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7.5" fill="#ffd21f" stroke="#c48a00"/><path d="M5 7.2h3" stroke="#000" stroke-width="1.3"/><circle cx="11.5" cy="7" r="1.1"/><path d="M5.3 10.5a3.8 3.8 0 0 0 7.4 0" fill="none" stroke="#000" stroke-width="1.2"/></svg><svg class="dd" viewBox="0 0 5 4" aria-hidden="true"><path d="M0 0h5L2.5 4z" fill="#1e3d75"/></svg></button>
          <button class="tbtn nudge" type="button" aria-label="Send a nudge"><svg viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="5" r="2.8" fill="#3cb43c"/><path d="M4.5 16c0-4.4 1.8-7 4.5-7s4.5 2.6 4.5 7z" fill="#3cb43c"/><path d="M2 5.5l-1 1.5 1 1.5M3.5 4.5L2 7l1.5 2.5M16 5.5l1 1.5-1 1.5M14.5 4.5L16 7l-1.5 2.5" fill="none" stroke="#e8670c" stroke-width="1"/></svg></button>
        </div>
        <div class="inp"><input type="text" aria-label="Message"><button class="send" type="button">Send</button></div>
      </div>
    </div>`,
  init(root) {
    const win = root.querySelector('.win'), nudge = root.querySelector('.nudge'), log = root.querySelector('.log'), send = root.querySelector('.send'), inp = root.querySelector('input'), emo = root.querySelector('.emo'), wink = root.querySelector('.wink');
    let t = 0;
    nudge.addEventListener('click', () => {
      win.classList.remove('shake'); void win.offsetWidth; win.classList.add('shake');
      log.textContent = 'You have just sent a nudge.'; nudge.classList.add('cool');
      clearTimeout(t); t = setTimeout(() => nudge.classList.remove('cool'), 2000);
    });
    const say = () => { const v = inp.value.trim(); if (!v) return; log.textContent = 'You say: ' + v; inp.value = ''; };
    send.addEventListener('click', say);
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); say(); } });
    emo.addEventListener('click', () => { inp.value += ':)'; inp.focus(); });
    wink.addEventListener('click', () => { log.textContent = 'You have just sent a wink.'; });
    return () => clearTimeout(t);
  },
};
