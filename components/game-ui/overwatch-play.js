export default {
  id: 'gm-overwatch-play',
  credit: 'Blizzard Overwatch — main-menu "PLAY" button: orange slanted slab that slides white on hover, with the hex role-queue pips beneath',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: linear-gradient(160deg, #1b2a4a, #0d1526 60%, #06090f);
      padding: 22px 30px 18px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start; }
    .play { position: relative;
      border: none;
      cursor: pointer;
      padding: 0;
      width: 190px;
      height: 52px;
      background: none;
      transform: skewX(-14deg);
      overflow: hidden; }
    .play .f { position: absolute; inset: 0; background: #f99e1a; transition: transform .2s cubic-bezier(.2,.8,.2,1); }
    .play .w { position: absolute;
      inset: 0;
      background: #fff;
      transform: translateX(-101%);
      transition: transform .2s cubic-bezier(.2,.8,.2,1); }
    .play:hover .w, .play.sel .w { transform: translateX(0); }
    .play .l { position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      transform: skewX(14deg);
      color: #fff;
      font: 800 italic 24px 'Unbounded', 'Syne', system-ui, sans-serif;
      letter-spacing: 2px;
      transition: color .2s; }
    .play:hover .l, .play.sel .l { color: #0d1526; }
    .play:active { transform: skewX(-14deg) scale(.97); }
    .play:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
    .roles { display: flex; gap: 8px; margin-left: 6px; }
    .hex { width: 40px;
      height: 44px;
      border: none;
      cursor: pointer;
      padding: 0;
      background: rgba(255,255,255,.12);
      clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
      display: grid;
      place-items: center;
      transition: background .15s, transform .15s; }
    .hex svg { width: 20px; height: 20px; fill: #fff; }
    .hex:hover { background: rgba(255,255,255,.3); transform: translateY(-2px); }
    .hex.on { background: #f99e1a; } .hex.on svg { fill: #0d1526; }
    .hex:focus-visible { outline: none; background: rgba(255,255,255,.5); }
    .sub { color: rgba(255,255,255,.6);
      font: 600 10px 'Inter', system-ui, sans-serif;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-left: 6px; }
  `,
  html: `
    <div class="stage">
      <button class="play" type="button" aria-pressed="false"><span class="f"></span><span class="w"></span><span class="l">PLAY</span></button>
      <div class="roles" role="group" aria-label="Role queue">
        <button class="hex on" type="button" aria-label="Tank" aria-pressed="true"><svg viewBox="0 0 24 24"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z"/></svg></button>
        <button class="hex" type="button" aria-label="Damage" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg></button>
        <button class="hex" type="button" aria-label="Support" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/></svg></button>
      </div>
      <div class="sub">Quick Play</div>
    </div>`,
  init(root) {
    const p = root.querySelector('.play'), sub = root.querySelector('.sub');
    p.addEventListener('click', () => { const on = p.classList.toggle('sel'); p.setAttribute('aria-pressed', String(on)); p.querySelector('.l').textContent = on ? 'QUEUED' : 'PLAY'; sub.textContent = on ? 'Searching…' : 'Quick Play'; });
    root.querySelectorAll('.hex').forEach((h) => h.addEventListener('click', () => { const on = h.classList.toggle('on'); h.setAttribute('aria-pressed', String(on)); }));
  },
};
