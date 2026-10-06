export default {
  id: 'rt-nixie',
  credit: 'Nixie tube counter (IN-14 style) — orange neon digit in a glass envelope, click to count up',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0d0a08; padding: 16px 20px 12px; border-radius: 12px; display: inline-flex; gap: 8px; align-items: flex-end; }
    .tube { width: 46px; height: 84px; border: none; padding: 0; cursor: pointer; position: relative; background: none; }
    .tube:focus-visible { outline: 2px solid #ff9a3c; outline-offset: 3px; border-radius: 14px; }
    .glass { position: absolute; inset: 0 0 10px; border-radius: 22px 22px 8px 8px; background: linear-gradient(90deg, rgba(255,255,255,.08), rgba(255,255,255,.02) 40%, rgba(255,255,255,.12) 70%, rgba(255,255,255,.03));
      border: 1px solid rgba(255,255,255,.14); box-shadow: inset 0 0 14px rgba(0,0,0,.8), inset 2px 0 4px rgba(255,255,255,.08); overflow: hidden; }
    .mesh { position: absolute; inset: 14px 6px 10px; background: repeating-linear-gradient(0deg, rgba(90,70,60,.55) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, rgba(90,70,60,.55) 0 1px, transparent 1px 4px); }
    .ghost, .lit { position: absolute; left: 0; right: 0; top: 22px; text-align: center; font: 300 40px/1 "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .ghost { color: rgba(140,100,80,.22); }
    .lit { color: #ffb25a; text-shadow: 0 0 2px #fff, 0 0 6px #ff7a00, 0 0 14px #ff5a00, 0 0 28px rgba(255,80,0,.8); }
    .tube:active .lit { color: #ffd9a8; }
    .pins { position: absolute; left: 10px; right: 10px; bottom: 0; height: 10px; background: repeating-linear-gradient(90deg, #8a8a8a 0 2px, transparent 2px 6px); }
    .ring { position: absolute; left: 4px; right: 4px; bottom: 8px; height: 6px; background: #1a1412; border-radius: 2px; border-top: 1px solid #3a2f2a; }
  `,
  html: `
    <div class="stage">
      <button class="tube" type="button" aria-label="Nixie counter, click to increment"><div class="glass"><div class="mesh"></div><div class="ghost">8</div><div class="lit">0</div></div><div class="ring"></div><div class="pins"></div></button>
      <button class="tube" type="button" aria-label="Nixie counter, click to increment"><div class="glass"><div class="mesh"></div><div class="ghost">8</div><div class="lit">0</div></div><div class="ring"></div><div class="pins"></div></button>
    </div>`,
  init(root) {
    const tubes = [...root.querySelectorAll('.tube')];
    const lits = tubes.map((t) => t.querySelector('.lit'));
    let n = 0;
    const render = () => { const s = String(n % 100).padStart(2, '0'); lits.forEach((l, i) => (l.textContent = s[i])); };
    tubes.forEach((t) => t.addEventListener('click', () => { n++; render(); }));
  },
};
