export default {
  id: 'rt-dos-dialog',
  credit: 'MS-DOS text-mode dialog (Turbo Vision / EDIT style) — double-line box with shadowed [ OK ] button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0000aa; padding: 14px 18px; border-radius: 12px; display: inline-block;
      font: 14px/16px "Perfect DOS VGA 437", "Px437 IBM VGA8", ui-monospace, "Courier New", Courier, monospace; color: #000; }
    pre { margin: 0; font: inherit; white-space: pre; background: #aaaaaa; display: inline-block; box-shadow: 8px 8px 0 #000000; padding: 0 8px; }
    .t { color: #000; }
    .btns { display: flex; gap: 16px; justify-content: center; padding: 0 0 12px; }
    .b { border: none; padding: 0; font: inherit; cursor: pointer; background: #00aa00; color: #000; position: relative; line-height: 16px; padding: 0 8px; }
    .b::after { content: ""; position: absolute; left: 8px; right: -8px; top: 100%; height: 8px; background: #000; }
    .b::before { content: ""; position: absolute; top: 8px; bottom: -8px; left: 100%; width: 8px; background: #000; }
    .b:active, .b.down { transform: translate(4px, 4px); }
    .b:active::after, .b.down::after, .b:active::before, .b.down::before { display: none; }
    .b.def { color: #fff; }
    .b:focus-visible { outline: none; background: #00ff00; }
    .b span { color: #ffff55; }
    .line { display: flex; }
    .line::before, .line::after { content: "\\2551"; }
    .msg, .btns { flex: 1; }
    .msg { padding: 8px 0 8px; text-align: center; }
  `,
  html: `
    <div class="stage"><pre class="t">╔════════════════════════════╗
║        Format Disk         ║
╠════════════════════════════╣
║                            ║
║                            ║
║                            ║
╚════════════════════════════╝</pre></div>`,
  init(root) {
    const pre = root.querySelector('pre');
    const lines = pre.textContent.split('\n');
    pre.innerHTML = '';
    const top = document.createElement('div'); top.textContent = lines.slice(0, 3).join('\n'); top.style.whiteSpace = 'pre';
    const msg = document.createElement('div'); msg.className = 'msg'; msg.textContent = 'Proceed with Format (Y/N)?';
    const btns = document.createElement('div'); btns.className = 'btns';
    const mk = (label, def) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'b' + (def ? ' def' : ''); b.innerHTML = `<span>${label[0]}</span>${label.slice(1)}`; b.setAttribute('aria-pressed', 'false'); return b; };
    const yes = mk('Yes', true), no = mk('No');
    btns.append(yes, no);
    const bottom = document.createElement('div'); bottom.textContent = lines[6]; bottom.style.whiteSpace = 'pre';
    const wrap = (el) => { const l = document.createElement('div'); l.className = 'line'; l.appendChild(el); return l; };
    pre.append(top, wrap(msg), wrap(btns), bottom);
    [yes, no].forEach((b) => b.addEventListener('click', () => {
      [yes, no].forEach((o) => { o.classList.remove('down'); o.setAttribute('aria-pressed', 'false'); });
      b.classList.add('down'); b.setAttribute('aria-pressed', 'true');
      msg.textContent = b === yes ? 'Formatting... 100% complete.' : 'Format cancelled.';
      setTimeout(() => { msg.textContent = 'Proceed with Format (Y/N)?'; b.classList.remove('down'); b.setAttribute('aria-pressed', 'false'); }, 1400);
    }));
  },
};
