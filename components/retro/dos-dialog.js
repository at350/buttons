// CGA/VGA text-mode palette
const P = { blue: '#0000aa', gray: '#aaaaaa', black: '#000000', white: '#ffffff', green: '#00aa00', lgreen: '#55ff55', yellow: '#ffff55', dgray: '#555555', cyan: '#00aaaa' };
const W = 32; // dialog width in cells
const s = (t, fg, bg) => `<span style="color:${fg};background:${bg}">${t}</span>`;
const pad = (t, n) => (t + ' '.repeat(n)).slice(0, n);
const center = (t, n) => { const l = Math.floor((n - t.length) / 2); return pad(' '.repeat(Math.max(0, l)) + t, n); };
export default {
  id: 'rt-dos-dialog',
  credit: 'MS-DOS text mode, Turbo Vision style — #0000aa desktop, double-line ╔═╗ dialog frame, green buttons with ▄▀ shadows',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0000aa; padding: 14px 16px; border-radius: 12px; display: inline-block; }
    .scr { font: 14px/18px "JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace; font-variant-ligatures: none; white-space: pre; color: #fff; }
    .ln { display: block; height: 1lh; }
    .ln span { display: inline; }
    /* frame, shadows and bar are CSS, not U+2550-2591 glyphs: no loaded web font has them and fallbacks leave gaps */
    .dlg { position: relative; background: #aaaaaa; box-shadow: 2ch 1lh 0 #000; margin: 0 2ch 1lh 0; }
    .dlg::before { content: ''; position: absolute; inset: calc(.5lh - 1.5px) calc(.5ch - 1.5px); border: 3px double #fff; pointer-events: none; }
    .ln .t { position: relative; display: inline-block; height: 1lh; vertical-align: top; background: #aaaaaa; }
    .b { font: inherit; line-height: inherit; border: none; margin: 0; padding: 0; cursor: pointer; outline: none; background: #00aa00; color: #000; white-space: pre; vertical-align: top; box-shadow: 1ch .5lh 0 #000; }
    .b.def { color: #fff; }
    .b u { text-decoration: none; color: #ffff55; }
    .b:focus-visible { background: #55ff55; }
    .b.down { transform: translateX(1ch); box-shadow: none; }
    .cell { display: inline-block; white-space: pre; vertical-align: top; }
    .ln .bar { display: inline-block; width: 20ch; height: 1lh; vertical-align: top;
      background: linear-gradient(#000 0 0) 0 0 / calc(var(--n) * 1ch) 100% no-repeat,
        conic-gradient(from 270deg at 1px 1px, #000 90deg, #0000 0) 0 0 / 4px 2px, conic-gradient(from 270deg at 1px 1px, #000 90deg, #0000 0) 2px 1px / 4px 2px; }
  `,
  html: `<div class="stage"><div class="scr" role="dialog" aria-label="Format Disk"></div></div>`,
  init(root) {
    const scr = root.querySelector('.scr');
    const text = (t, fg = P.black) => s(pad(t, W - 2), fg, P.gray);
    const sp = (n) => ' '.repeat(n);
    // ╔═[■]═ Format Disk ═╗: the double border runs under the cells; the close box and title cover it
    const top = sp(2) + `<span class="t">[<span style="color:${P.lgreen}">■</span>]</span>` + sp(6) + `<span class="t"> Format Disk </span>` + sp(8);
    // buttons cast a Turbo Vision ▄▀ shadow (box-shadow 1ch right, half a cell down) into the next row
    const btnRow = sp(5) + `<button class="b def" type="button">  <u>O</u>K  </button>` + sp(6) + `<button class="b" type="button"> <u>C</u>ancel </button>` + sp(7);
    scr.innerHTML = `<div class="dlg">${[
      top,
      sp(W),
      ` <span class="m1">${text(center('Format drive A:?', W - 2))}</span> `,
      ` <span class="m2">${text(center('All data will be lost.', W - 2))}</span> `,
      sp(W),
      btnRow,
      sp(W),
      sp(W),
    ].map((r) => `<span class="ln">${r}</span>`).join('')}</div>`;
    const m1 = root.querySelector('.m1'), m2 = root.querySelector('.m2');
    const say = (a, b, html) => { m1.innerHTML = text(center(a, W - 2)); m2.innerHTML = html || text(center(b, W - 2)); };
    const [ok, cancel] = root.querySelectorAll('.b');
    let t = 0, busy = false;
    const reset = () => { busy = false; say('Format drive A:?', 'All data will be lost.'); };
    const press = (b) => { b.classList.add('down'); setTimeout(() => b.classList.remove('down'), 140); };
    ok.addEventListener('click', () => {
      press(ok); if (busy) return; busy = true;
      let p = 0;
      // █ cells fill a 20-cell ░ track
      const bar = () => s(sp(5), P.black, P.gray) + `<span class="bar" style="--n:${Math.round(p / 5)}"></span>` + s(sp(5), P.black, P.gray);
      clearInterval(t);
      t = setInterval(() => {
        p += 10;
        if (p > 100) { clearInterval(t); say('Format complete.', '1,457,664 bytes free'); t = setTimeout(reset, 1600); return; }
        say('Formatting... ' + String(p).padStart(3) + '%', '', bar());
      }, 120);
    });
    cancel.addEventListener('click', () => { press(cancel); clearInterval(t); clearTimeout(t); busy = true; say('Format cancelled.', ''); t = setTimeout(reset, 1200); });
    root.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (k === 'o') { e.preventDefault(); ok.click(); } else if (k === 'c' || k === 'escape') { e.preventDefault(); cancel.click(); }
    });
    return () => { clearInterval(t); clearTimeout(t); };
  },
};
