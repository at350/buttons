// Windows XP flag: the four panes of Simple Icons "windowsxp" (CC0), each filled with its Luna colour.
const FLAG = `
  <defs>
    <linearGradient id="xr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a5c"/><stop offset="1" stop-color="#e8401c"/></linearGradient>
    <linearGradient id="xg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9e54f"/><stop offset="1" stop-color="#5fa80f"/></linearGradient>
    <linearGradient id="xb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ec2ff"/><stop offset="1" stop-color="#0a78d8"/></linearGradient>
    <linearGradient id="xy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#f7a800"/></linearGradient>
  </defs>
  <path fill="url(#xr)" d="M9.302 1.415c-1.184.02-2.592.32-4.341 1.044l-2.283 7.949c1.846-.761 3.311-1.114 4.537-1.1a7.596 7.596 0 014.37 1.593l2.296-7.92c-1.26-.855-2.607-1.599-4.58-1.566z"/>
  <path fill="url(#xg)" d="M15.052 3.826l-2.256 7.949c2.016 1.367 4.44 2.494 8.907.493L24 4.333h-.042c-4.651 1.931-6.906.846-8.907-.507z"/>
  <path fill="url(#xb)" d="M6.617 10.77c-1.184.018-2.591.315-4.335 1.034L0 19.779c4.65-1.93 6.863-.803 8.878.55l2.326-7.99c-1.26-.855-2.613-1.6-4.586-1.57z"/>
  <path fill="url(#xy)" d="M12.412 13.122l-2.294 7.898c2.015 1.367 4.256 2.453 8.906.522l2.297-7.92c-4.641 1.927-6.882.85-8.909-.5z"/>`;
export default {
  id: 'rt-xp-start',
  credit: 'Windows XP (Luna) — the green "start" button on the blue taskbar, with notification-area clock',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: stretch; width: 250px; height: 30px; border-radius: 12px; overflow: hidden; box-sizing: content-box; padding: 0;
      background: linear-gradient(#1f2f86 0, #3165c4 3%, #3682e5 6%, #4490e6 10%, #3883e5 12%, #2b71e0 15%, #2663da 18%, #235bd6 20%, #2258d5 23%, #2157d6 38%, #245ddb 54%, #2562df 86%, #245fdc 89%, #2158d4 92%, #1d4ec0 95%, #1941a5 98%); }
    .start { width: 99px; height: 30px; flex: none; padding: 0 0 0 9px; margin: 0; border: none; border-radius: 0 10px 10px 0; position: relative; cursor: default; outline: none;
      display: flex; align-items: center; gap: 5px; color: #fff;
      font: italic 700 19px/1 "Franklin Gothic Medium", "Franklin Gothic", "Trebuchet MS", Tahoma, sans-serif; letter-spacing: .2px; text-shadow: 1px 1px 3px rgba(0,0,0,.65);
      background: linear-gradient(#3c8f3c 0%, #5eac5e 6%, #4a9e4a 12%, #3a913a 40%, #318a31 70%, #2f7d2f 90%, #1d5d1d 100%);
      box-shadow: inset 0 1px #7cc77c, inset -1px 0 #2c6e2c, inset 0 -1px #1f561f, 2px 0 4px rgba(0,0,0,.45); }
    .start::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; transition: background .1s; }
    .start:hover::after { background: rgba(255,255,255,.12); }
    .start[aria-pressed="true"] { background: linear-gradient(#1e5e1e 0%, #2b7a2b 10%, #2f842f 50%, #2c7d2c 90%, #235f23 100%);
      box-shadow: inset 0 2px 3px rgba(0,0,0,.45), inset -1px 0 #1d521d, 2px 0 4px rgba(0,0,0,.45); }
    .start:active::after { background: rgba(0,0,0,.12); }
    .start:focus-visible .cap { outline: 1px dotted #fff; outline-offset: 1px; }
    .start svg { width: 22px; height: 21px; flex: none; filter: drop-shadow(1px 1px 1px rgba(0,0,0,.55)); }
    .tray { margin-left: auto; display: flex; align-items: center; gap: 6px; padding: 0 12px 0 10px; color: #fff; white-space: nowrap;
      font: 11px Tahoma, "Segoe UI", Verdana, sans-serif;
      background: linear-gradient(#0c59b9 1%, #139ee9 6%, #18b5f2 10%, #139beb 14%, #1290e8 19%, #0d8dea 63%, #0d9ff1 81%, #0f9eed 88%, #119be9 91%, #1392e2 94%, #137ed7 97%, #095bc9);
      box-shadow: inset 1px 0 #1042af, inset 2px 0 #18bbff; }
  `,
  html: `
    <div class="stage">
      <button class="start" type="button" aria-pressed="false"><svg viewBox="0 0 24 22" aria-hidden="true">${FLAG}</svg><span class="cap">start</span></button>
      <div class="tray"><span>9:41 PM</span></div>
    </div>`,
  init(root) {
    const b = root.querySelector('.start');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
    b.addEventListener('keydown', (e) => { if (e.key === 'Escape') b.setAttribute('aria-pressed', 'false'); });
  },
};
