// Mr. Robot — Elliot's terminal for the 5/9 hack on E Corp: ./fuxsocy.py, "Are you sure? y/n", then the encryption runs.
const RUN = ['Executing FuxSocy', 'Locating E Corp backups... found 3', 'Encrypting ledger.db   ', 'Encrypting steelmtn.bak ', 'Encrypting debt.db     '];
export default {
  id: 'sf-ecorp-terminal',
  credit: 'Mr. Robot (USA Network) — the 5/9 hack: Elliot\'s Kali terminal runs ./fuxsocy.py against E Corp; answer y and the encryption bars run, n aborts (show tech by Kor Adana)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 320px; max-width: 100%; border-radius: 12px; overflow: hidden; background: #0c0c0c; padding: 10px; }
    .win { border-radius: 6px; overflow: hidden; background: #1d1f21; box-shadow: 0 0 0 1px #2c2f33, 0 8px 18px rgba(0,0,0,.6); }
    .tb { height: 22px; display: flex; align-items: center; gap: 6px; padding: 0 8px; background: #2b2e31; font: 500 10px 'JetBrains Mono', ui-monospace, monospace; color: #9aa0a6; }
    .tb i { width: 9px; height: 9px; border-radius: 50%; background: #55595e; } .tb i:first-child { background: #e0443e; }
    .tb span { margin-left: 6px; white-space: nowrap; }
    .out { height: 140px; padding: 8px 10px 0; overflow: hidden; font: 400 10.5px/1.45 'JetBrains Mono', ui-monospace, monospace; color: #d7dadc; white-space: pre; }
    .p { color: #ff5f56; } .h { color: #5fb3ff; } .g { color: #8ae234; } .d { color: #8a9096; }
    .cur { display: inline-block; width: 6px; height: 11px; vertical-align: -2px; background: #d7dadc; animation: c 1s steps(1) infinite; }
    @keyframes c { 50% { opacity: 0; } }
    .keys { display: flex; gap: 8px; padding: 8px 10px 10px; }
    .k { min-width: 40px; height: 28px; border-radius: 4px; border: 0; cursor: pointer; font: 600 11px 'JetBrains Mono', ui-monospace, monospace; color: #d7dadc;
      background: linear-gradient(#3a3d41, #2a2c2f); box-shadow: inset 0 1px 0 #50545a, 0 2px 0 #0b0b0c; }
    .k:hover { color: #fff; background: linear-gradient(#45494e, #313337); }
    .k:active { transform: translateY(2px); box-shadow: inset 0 1px 0 #50545a; }
    .k:focus-visible { outline: 2px solid #5fb3ff; outline-offset: 2px; }
    .k:disabled { opacity: .35; cursor: default; }
    .k.y { color: #8ae234; }
  `,
  html: `<div class="stage"><div class="win"><div class="tb"><i></i><i></i><i></i><span>root@kali: ~</span></div><div class="out"></div>
    <div class="keys"><button class="k y" type="button">y</button><button class="k n" type="button">n</button></div></div></div>`,
  init(root) {
    const out = root.querySelector('.out'), y = root.querySelector('.y'), n = root.querySelector('.n');
    const PS = '<span class="p">root@kali</span>:<span class="h">~</span># ';
    let tm = 0, to = 0, lines = [];
    const paint = (cur = true) => { out.innerHTML = lines.slice(-8).join('\n') + (cur ? '<span class="cur"></span>' : ''); };
    const idle = () => { clearInterval(tm); tm = 0; lines = [`${PS}./fuxsocy.py`, 'Executing FuxSocy', 'Are you sure? [y/n] ']; y.disabled = n.disabled = false; paint(); };
    y.addEventListener('click', () => {
      y.disabled = n.disabled = true; lines[lines.length - 1] += 'y'; let step = 1, pct = 0;
      lines.push(RUN[step]); paint();
      tm = setInterval(() => {
        if (step >= 2 && step < RUN.length) {
          pct = Math.min(100, pct + 12); const bar = '█'.repeat(Math.round(pct / 10)).padEnd(10, '░');
          lines[lines.length - 1] = `<span class="d">${RUN[step]}</span>${bar} ${pct}%`;
          if (pct === 100) { step++; pct = 0; if (step < RUN.length) lines.push(''); }
        } else if (step < 2) { step++; lines.push(''); }
        else { clearInterval(tm); tm = 0; lines.push('<span class="g">Done.</span> Hello, friend.', PS); n.disabled = false; n.textContent = 'n'; }
        paint();
      }, 60);
    });
    n.addEventListener('click', () => { if (tm) return; if (y.disabled) return idle(); lines[lines.length - 1] += 'n'; lines.push('Aborted.', PS); y.disabled = true; paint(); clearTimeout(to); to = setTimeout(() => { if (!tm) idle(); }, 1200); });
    idle();
    return () => { clearInterval(tm); clearTimeout(to); };
  },
};
