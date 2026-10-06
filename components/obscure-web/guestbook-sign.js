export default {
  id: 'ob-guestbook-sign',
  credit: 'GeoCities guestbook — "Sign My Guestbook" / "View My Guestbook" with the open-book icon, grey bevelled form buttons, and a visitor count that goes up',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .gb { width: 330px; max-width: 100%; padding: 14px; border-radius: 12px; background: #000080; color: #fff; font: 13px "Times New Roman", Times, serif; display: grid; gap: 10px; justify-items: center; text-align: center; }
    .book { width: 52px; height: 36px; }
    .btns { display: flex; gap: 10px; }
    .b { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; white-space: nowrap; background: #c0c0c0; color: #000; border: 0; cursor: pointer; font: 12px Arial, Helvetica, sans-serif; box-shadow: inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .b:active, .b.dn { box-shadow: inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf; }
    .b:focus-visible { outline: 1px dotted #000; outline-offset: -4px; }
    .b i { width: 12px; height: 12px; display: inline-block; background: #fff; border: 1px solid #000; }
    .b .pen { background: none; border: 0; width: 12px; height: 12px; }
    .b .pen svg { width: 12px; height: 12px; }
    .vis { font: 11px Verdana, Arial, sans-serif; color: #ffff00; white-space: nowrap; }
    .vis b { font-family: "Courier New", monospace; background: #000; color: #0f0; padding: 1px 4px; border: 1px solid #0f0; letter-spacing: 2px; }
    .msg { font: italic 12px "Times New Roman", serif; color: #ffcc00; height: 16px; white-space: nowrap; overflow: hidden; max-width: 100%; }
    .cnt { display: inline-block; margin-top: 2px; }
  `,
  html: `
    <div class="gb">
      <svg class="book" viewBox="0 0 52 36" aria-hidden="true"><path d="M2 6c8-4 16-4 24 0v28c-8-4-16-4-24 0z" fill="#fff" stroke="#000"/><path d="M50 6c-8-4-16-4-24 0v28c8-4 16-4 24 0z" fill="#fff" stroke="#000"/><path d="M6 12h14M6 16h14M6 20h14M32 12h14M32 16h14M32 20h14" stroke="#88a" stroke-width="1"/><path d="M26 6v28" stroke="#000"/></svg>
      <div class="btns">
        <button class="b sign" type="button"><span class="pen" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M1 11l2-5 6-5 2 2-5 6z" fill="#fc3" stroke="#000" stroke-width=".8"/></svg></span>Sign My Guestbook</button>
        <button class="b view" type="button" aria-pressed="false"><i aria-hidden="true"></i>View My Guestbook</button>
      </div>
      <div class="msg" aria-live="polite">&nbsp;</div>
      <div class="vis">You are visitor <b class="n">000421</b></div>
      <div class="vis last">Last signed: <span class="when">never</span></div>
    </div>`,
  init(root) {
    const sign = root.querySelector('.sign'), view = root.querySelector('.view'), msg = root.querySelector('.msg'), n = root.querySelector('.n');
    let c = 421, entries = 0;
    const when = root.querySelector('.when');
    sign.addEventListener('click', () => {
      c++; entries++; n.textContent = String(c).padStart(6, '0');
      msg.textContent = `Thanks for signing! (${entries} ${entries === 1 ? 'entry' : 'entries'})`;
      const d = new Date(); when.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    });
    view.addEventListener('click', () => { const on = view.classList.toggle('dn'); view.setAttribute('aria-pressed', String(on)); msg.textContent = on ? (entries ? `Showing ${entries} ${entries === 1 ? 'entry' : 'entries'}` : 'Nobody has signed yet :(') : ' '; });
  },
};
