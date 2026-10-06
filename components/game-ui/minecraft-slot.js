export default {
  id: 'gm-minecraft-slot',
  credit: 'Mojang Minecraft — hotbar inventory slots; hover shows the white overlay, click moves the selection frame, number keys 1–9 jump',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #2a4a7a;
      background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
      background-size: 16px 16px;
      padding: 16px;
      border-radius: 12px; }
    .bar { display: inline-flex;
      background: #000;
      padding: 2px;
      gap: 0;
      position: relative;
      box-shadow: 0 0 0 2px #000, inset 0 0 0 2px #555;
      image-rendering: pixelated; }
    .slot { width: 36px;
      height: 36px;
      border: none;
      padding: 0;
      cursor: pointer;
      position: relative;
      background: #8b8b8b;
      box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #fff;
      margin: 2px; }
    .slot:hover::after { content: ""; position: absolute; inset: 2px; background: rgba(255,255,255,.45); }
    .slot:focus-visible { outline: 2px solid #ffffa0; }
    .slot.sel { box-shadow: inset 2px 2px 0 #373737, inset -2px -2px 0 #fff, 0 0 0 3px #fff, 0 0 0 4px #000; z-index: 1; }
    .it { position: absolute;
      left: 6px;
      top: 6px;
      width: 24px;
      height: 24px;
      display: grid;
      grid-template-columns: repeat(6, 4px);
      grid-template-rows: repeat(6, 4px); }
    .it i { display: block; width: 4px; height: 4px; }
    .cnt { position: absolute;
      right: 2px;
      bottom: 0;
      color: #fff;
      font: 700 11px 'JetBrains Mono', ui-monospace, monospace;
      text-shadow: 1px 1px 0 #3f3f3f; }
  `,
  html: `<div class="stage"><div class="bar" role="radiogroup" aria-label="Hotbar"></div></div>`,
  init(root) {
    const bar = root.querySelector('.bar');
    const items = [
      ['#8f6a3a,#6a4a25,#b58c55', 64], ['#7d7d7d,#5a5a5a,#a2a2a2', 32], ['#57a33a,#3e7a28,#7ccf5a', 12], ['#d8d8d8,#9e9e9e,#f4f4f4', 1],
      ['#e04646,#a52b2b,#ff7c7c', 3], ['#c9a640,#8a6f21,#f3d36e', 7], null, ['#3b6fd1,#24479a,#6f9bf0', 16], null,
    ];
    const pat = ['011110', '111111', '111111', '111111', '111111', '011110'];
    items.forEach((it, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'slot' + (i === 0 ? ' sel' : ''); b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', String(i === 0)); b.setAttribute('aria-label', 'Slot ' + (i + 1));
      if (it) {
        const [cols, n] = it; const [c, d, l] = cols.split(','); const g = document.createElement('span'); g.className = 'it';
        pat.forEach((row, y) => [...row].forEach((v, x) => { const px = document.createElement('i'); if (v === '1') px.style.background = x < 2 || y < 2 ? l : x > 3 || y > 3 ? d : c; g.appendChild(px); }));
        b.appendChild(g); if (n > 1) { const s = document.createElement('span'); s.className = 'cnt'; s.textContent = n; b.appendChild(s); }
      }
      b.addEventListener('click', () => sel(i)); bar.appendChild(b);
    });
    const slots = [...bar.children];
    const sel = (i) => slots.forEach((s, j) => { s.classList.toggle('sel', i === j); s.setAttribute('aria-checked', String(i === j)); });
    bar.addEventListener('keydown', (e) => { const n = Number(e.key); if (n >= 1 && n <= 9) { e.preventDefault(); sel(n - 1); slots[n - 1].focus(); } });
  },
};
