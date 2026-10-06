const ROWS = ['ABCDEFGHI', 'JKLMNOPQR', "STUVWXYZ'"];
const KEYS = ROWS.map((r) => `<div class="row">${[...r].map((c) => `<button class="key" type="button" data-k="${c}">${c}</button>`).join('')}</div>`).join('');

export default {
  id: 'ty2-speak-spell',
  credit: 'Texas Instruments Speak & Spell (1978) — ABC keypad, GO / ERASE / ENTER, and the 8-character VFD that spells what you type',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 14px; border-radius: 12px; overflow: hidden; background: linear-gradient(#efe6d8, #d9cbb5); }
    .toy { position: relative; width: 252px; padding: 40px 12px 12px; border-radius: 16px 16px 22px 22px;
      background: linear-gradient(170deg, #ff7a4c, #e8552c 40%, #c23e1a);
      box-shadow: 0 6px 0 #8f2b10, 0 12px 16px rgba(60,20,0,.35), inset 0 2px 0 rgba(255,255,255,.35); }
    .handle { position: absolute; left: 60px; right: 60px; top: 9px; height: 18px; border-radius: 9px; background: #e2d5c0;
      box-shadow: inset 0 3px 4px rgba(0,0,0,.4), 0 1px 0 rgba(255,255,255,.3); }
    .brand { position: absolute; left: 14px; top: 26px; font: italic 800 9px/1 'Bricolage Grotesque', system-ui, sans-serif; color: #ffd23a; letter-spacing: .02em; }
    .vfd { display: grid; grid-template-columns: repeat(8, 1fr); gap: 3px; padding: 8px 9px; margin: 8px 0 10px; border-radius: 6px;
      background: linear-gradient(#0d1416, #1b2427); box-shadow: inset 0 3px 6px #000, 0 1px 0 rgba(255,255,255,.3); }
    .cell { position: relative; height: 26px; font: 700 20px/26px 'JetBrains Mono', ui-monospace, monospace; text-align: center;
      color: #7ff7e6; text-shadow: 0 0 4px #2fe0c8, 0 0 10px rgba(47,224,200,.6); }
    .cell::after { content: ''; position: absolute; left: 3px; right: 3px; bottom: 0; height: 2px; background: rgba(127,247,230,.14); }
    .cell.cur::after { background: #7ff7e6; box-shadow: 0 0 6px #2fe0c8; animation: blink 1s steps(1) infinite; }
    @keyframes blink { 50% { opacity: 0; } }
    .vfd.flash .cell { animation: fl .18s steps(1) 3; }
    @keyframes fl { 50% { opacity: .1; } }
    .pad { padding: 7px; border-radius: 10px; background: linear-gradient(#5a2614, #3e180b); box-shadow: inset 0 2px 4px rgba(0,0,0,.6); }
    .row { display: flex; gap: 3px; margin-bottom: 3px; }
    .key, .fn { border: 0; padding: 0; cursor: pointer; border-radius: 5px; font: 800 11px/1 'DM Sans', system-ui, sans-serif; color: #5a2614;
      background: linear-gradient(#ffd77a, #f6a91c 70%, #d98a06); box-shadow: 0 3px 0 #8a4a00, inset 0 1px 0 rgba(255,255,255,.6);
      transform: translateY(-2px); transition: transform .05s, box-shadow .05s, filter .12s; }
    .key { flex: 1; height: 22px; }
    .key:hover, .fn:hover { filter: brightness(1.06); }
    .key:active, .fn:active, .down { transform: translateY(1px); box-shadow: 0 0 0 #8a4a00, inset 0 2px 3px rgba(0,0,0,.25); }
    .key:focus-visible, .fn:focus-visible { outline: 2px solid #7ff7e6; outline-offset: 1px; }
    .fns { display: flex; gap: 4px; margin-top: 5px; }
    .fn { flex: 1; height: 24px; font-size: 9px; letter-spacing: .06em; }
    .go { background: linear-gradient(#7fe0ff, #2a9fd8 70%, #1a6fa8); color: #08324d; box-shadow: 0 3px 0 #0e4469, inset 0 1px 0 rgba(255,255,255,.6); }
  `,
  html: `
    <div class="stage"><div class="toy" tabindex="-1">
      <div class="handle"></div><span class="brand">Speak &amp; Spell</span>
      <div class="vfd" aria-live="polite"><span class="cell"></span><span class="cell"></span><span class="cell"></span><span class="cell"></span><span class="cell"></span><span class="cell"></span><span class="cell"></span><span class="cell"></span></div>
      <div class="pad">${KEYS}
        <div class="fns"><button class="fn go" type="button" data-f="go">GO</button><button class="fn" type="button" data-f="erase">ERASE</button><button class="fn" type="button" data-f="enter">ENTER</button></div>
      </div>
    </div></div>`,
  init(root) {
    const cells = [...root.querySelectorAll('.cell')], vfd = root.querySelector('.vfd'), toy = root.querySelector('.toy');
    let word = '', t = 0;
    const show = (s, cursor = true) => cells.forEach((c, i) => { c.textContent = s[i] || ''; c.classList.toggle('cur', cursor && i === Math.min(s.length, 7)); });
    const flash = () => { vfd.classList.remove('flash'); void vfd.offsetWidth; vfd.classList.add('flash'); };
    const type = (ch) => { if (word.length < 8) word += ch; show(word); };
    const fn = (f) => {
      clearTimeout(t);
      if (f === 'erase') { word = word.slice(0, -1); show(word); }
      else if (f === 'enter') { flash(); t = setTimeout(() => { word = ''; show(word); }, 700); }
      else { word = ''; show('SPELL', false); flash(); t = setTimeout(() => show(word), 900); }
    };
    root.querySelector('.pad').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.k) type(b.dataset.k); else fn(b.dataset.f);
    });
    toy.addEventListener('keydown', (e) => {
      const k = e.key.toUpperCase();
      if (/^[A-Z']$/.test(k)) { type(k); e.preventDefault(); }
      else if (e.key === 'Backspace') { fn('erase'); e.preventDefault(); }
    });
    show(word);
    return () => clearTimeout(t);
  },
};
