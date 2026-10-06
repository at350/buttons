export default {
  id: 'ks-airline-seat',
  credit: 'Airline check-in seat map — fuselage cross-section with windows, exit row, taken seats greyed; pick one and confirm your seat',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 16px; border-radius: 12px; background: #0c2340; font-family: Inter, system-ui, sans-serif; color: #fff; }
    .body { position: relative; padding: 10px 18px; border-radius: 48px / 18px; background: #f2f4f7; box-shadow: inset 0 0 0 3px #c9d1dc; }
    .body::before, .body::after { content: ''; position: absolute; top: 18px; bottom: 18px; width: 4px; background: repeating-linear-gradient(#7fa7d9 0 8px, transparent 8px 26px); border-radius: 2px; }
    .body::before { left: 7px; } .body::after { right: 7px; }
    .hdr, .r { display: grid; grid-template-columns: repeat(3, 26px) 22px repeat(3, 26px); gap: 4px; align-items: center; justify-items: center; }
    .hdr { font-size: 10px; font-weight: 700; color: #5b6b80; margin-bottom: 4px; }
    .r { margin-bottom: 4px; }
    .r.exit { margin-top: 8px; position: relative; }
    .r.exit::before, .r.exit::after { content: ''; position: absolute; top: -6px; width: 8px; height: 30px; border-radius: 2px; background: #d6001c; box-shadow: 0 0 0 2px #f2f4f7; z-index: 1; }
    .r.exit::before { left: -17px; } .r.exit::after { right: -17px; }
    .n { font-size: 10px; color: #5b6b80; font-weight: 600; }
    .s { width: 26px; height: 24px; border: 0; padding: 0; border-radius: 6px 6px 3px 3px; cursor: pointer; background: #0a5cc2; box-shadow: inset 0 -4px 0 rgba(0,0,0,.25); color: #fff; display: grid; place-items: center; transition: background .12s, transform .08s; -webkit-tap-highlight-color: transparent; }
    .s.plus { background: #6244bb; }
    .s:hover { filter: brightness(1.15); transform: translateY(-1px); }
    .s:active { transform: scale(.9); }
    .s:focus-visible { outline: 2px solid #ffb81c; outline-offset: 1px; }
    .s svg { width: 14px; height: 14px; opacity: 0; transition: opacity .12s; }
    .s[aria-pressed="true"] { background: #ffb81c; color: #0c2340; }
    .s[aria-pressed="true"] svg { opacity: 1; }
    .s:disabled { background: #c3cad4; cursor: not-allowed; transform: none; filter: none; box-shadow: inset 0 -4px 0 rgba(0,0,0,.12); }
    .ft { display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px; }
    .sel { font-size: 11px; color: #9fb3cc; min-width: 104px; white-space: nowrap; } .sel b { display: block; font-size: 15px; color: #fff; }
    .ok { height: 36px; padding: 0 14px; border: 0; border-radius: 18px; background: #ffb81c; color: #0c2340; font: 700 13px/1 Inter, sans-serif; cursor: pointer; white-space: nowrap; min-width: 118px; transition: opacity .15s; }
    .ok:disabled { opacity: .35; cursor: default; }
    .ok:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .ok.done { background: #2bb673; color: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="body"><div class="hdr"><span>A</span><span>B</span><span>C</span><span></span><span>D</span><span>E</span><span>F</span></div><div class="rows"></div></div>
      <div class="ft"><div class="sel">Your seat<b>—</b></div><button class="ok" type="button" disabled>Confirm seat</button></div>
    </div>`,
  init(root) {
    const rows = root.querySelector('.rows'), out = root.querySelector('.sel b'), ok = root.querySelector('.ok');
    const taken = new Set(['21A', '21B', '22F', '23A', '23E', '24B', '24C', '24D', '25F', '26A', '26C']);
    const kind = { A: 'Window', F: 'Window', B: 'Middle', E: 'Middle', C: 'Aisle', D: 'Aisle' };
    const all = [];
    for (let n = 21; n <= 26; n++) {
      const r = document.createElement('div'); r.className = 'r' + (n === 23 ? ' exit' : '');
      'ABC DEF'.split('').forEach((c) => {
        if (c === ' ') { r.insertAdjacentHTML('beforeend', `<span class="n">${n}</span>`); return; }
        const b = document.createElement('button'); b.type = 'button'; b.className = 's' + (n <= 22 ? ' plus' : '');
        b.setAttribute('aria-label', n + c);
        b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
        if (taken.has(n + c)) b.disabled = true; else b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => {
          all.forEach((x) => x !== b && x.setAttribute('aria-pressed', 'false'));
          const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on));
          out.textContent = on ? `${n}${c} · ${kind[c]}` : '—'; ok.disabled = !on; ok.classList.remove('done'); ok.textContent = 'Confirm seat';
        });
        all.push(b); r.appendChild(b);
      });
      rows.appendChild(r);
    }
    ok.addEventListener('click', () => { ok.classList.add('done'); ok.textContent = 'Seat confirmed'; });
  },
};
