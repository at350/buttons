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
    .scr { font: 14px/normal "JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace; font-variant-ligatures: none; white-space: pre; color: #fff; }
    .ln { display: block; height: 1lh; }
    .ln span { display: inline; }
    .b { font: inherit; line-height: inherit; border: none; margin: 0; padding: 0; cursor: pointer; outline: none; background: #00aa00; color: #000; white-space: pre; vertical-align: top; }
    .b.def { color: #fff; }
    .b u { text-decoration: none; color: #ffff55; }
    .b:focus-visible { background: #55ff55; }
    .cell { display: inline-block; white-space: pre; vertical-align: top; }
    .bw { display: inline-block; position: relative; vertical-align: top; }
    .bw .sh1 { color: #000; background: #aaaaaa; }
    .bw.down .b { transform: translateX(1ch); }
    .bw.down .sh1 { visibility: hidden; }
    .sh2.down { visibility: hidden; }
  `,
  html: `<div class="stage"><div class="scr" role="dialog" aria-label="Format Disk"></div></div>`,
  init(root) {
    const scr = root.querySelector('.scr');
    const fr = (t) => s(t, P.white, P.gray);
    const shadow = s('  ', P.dgray, P.black);
    const body = (inner) => fr('║') + inner + fr('║') + shadow;
    const text = (t, fg = P.black) => s(pad(t, W - 2), fg, P.gray);
    const title = ' Format Disk ';
    const top = fr('╔═[') + s('■', P.lgreen, P.gray) + fr(']' + '═'.repeat(Math.floor((W - 6 - title.length) / 2))) + fr(title) + fr('═'.repeat(W - 6 - title.length - Math.floor((W - 6 - title.length) / 2)) + '╗');
    // buttons row (button + ▄ shadow cell) and the ▀ shadow row offset one cell right, exactly as Turbo Vision draws them
    const btnRow = s('    ', P.black, P.gray) +
      `<span class="bw"><button class="b def" type="button">  <u>O</u>K  </button><span class="sh1">▄</span></span>` +
      s('     ', P.black, P.gray) +
      `<span class="bw"><button class="b" type="button"> <u>C</u>ancel </button><span class="sh1">▄</span></span>` +
      s(pad('', W - 2 - 4 - 7 - 5 - 9), P.black, P.gray);
    const shRow = s('     ', P.black, P.gray) + `<span class="sh2" style="color:#000;background:#aaa">▀▀▀▀▀▀</span>` + s('      ', P.black, P.gray) + `<span class="sh2" style="color:#000;background:#aaa">▀▀▀▀▀▀▀▀</span>` + s(pad('', W - 2 - 5 - 6 - 6 - 8), P.black, P.gray);
    scr.innerHTML = [
      `<span class="ln">${top}${s('  ', P.blue, P.blue)}</span>`,
      `<span class="ln">${body(text(''))}</span>`,
      `<span class="ln">${body(`<span class="m1">${text(center('Format drive A:?', W - 2))}</span>`)}</span>`,
      `<span class="ln">${body(`<span class="m2">${text(center('All data will be lost.', W - 2))}</span>`)}</span>`,
      `<span class="ln">${body(text(''))}</span>`,
      `<span class="ln">${body(btnRow)}</span>`,
      `<span class="ln">${body(shRow)}</span>`,
      `<span class="ln">${fr('╚' + '═'.repeat(W - 2) + '╝')}${shadow}</span>`,
      `<span class="ln">${s('  ', P.blue, P.blue)}${s(' '.repeat(W), P.dgray, P.black)}</span>`,
    ].join('');
    const m1 = root.querySelector('.m1'), m2 = root.querySelector('.m2');
    const say = (a, b) => { m1.innerHTML = text(center(a, W - 2)); m2.innerHTML = text(center(b, W - 2)); };
    const [ok, cancel] = root.querySelectorAll('.b');
    let t = 0, busy = false;
    const reset = () => { busy = false; say('Format drive A:?', 'All data will be lost.'); };
    const shs = root.querySelectorAll('.sh2');
    const press = (b) => { const w = b.parentElement, sh = shs[b === ok ? 0 : 1]; w.classList.add('down'); sh.classList.add('down'); setTimeout(() => { w.classList.remove('down'); sh.classList.remove('down'); }, 140); };
    ok.addEventListener('click', () => {
      press(ok); if (busy) return; busy = true;
      let p = 0;
      const bar = () => '█'.repeat(Math.round(p / 5)) + '░'.repeat(20 - Math.round(p / 5));
      clearInterval(t);
      t = setInterval(() => {
        p += 10;
        if (p > 100) { clearInterval(t); say('Format complete.', '1,457,664 bytes free'); t = setTimeout(reset, 1600); return; }
        say('Formatting... ' + String(p).padStart(3) + '%', bar());
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
