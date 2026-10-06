export default {
  id: 'ob-konami',
  credit: 'The Konami Code — ↑ ↑ ↓ ↓ ← → ← → B A: focus the locked button and type it (or tap the keycaps); the right sequence unlocks a rainbow and 30 lives',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; padding: 16px; border-radius: 12px; background: #141414; display: grid; gap: 12px; justify-items: center; }
    .lock { position: relative; width: 100%; height: 48px; border: 2px solid #444; border-radius: 6px; background: #222; color: #888; cursor: pointer; font: 700 14px/1 "JetBrains Mono", ui-monospace, monospace; letter-spacing: 3px; transition: color .2s, border-color .2s, transform .1s; overflow: hidden; }
    .lock:hover { border-color: #666; color: #aaa; }
    .lock:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .lock.bad { animation: shake .3s; border-color: #e33; }
    @keyframes shake { 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    .lock.open { color: #fff; border-color: transparent; background: linear-gradient(90deg, #ff004c, #ff8a00, #ffe600, #00d26a, #00b4ff, #8a00ff, #ff004c); background-size: 300% 100%; animation: rb 1.5s linear infinite; text-shadow: 0 1px 2px rgba(0,0,0,.5); }
    @keyframes rb { to { background-position: 300% 0; } }
    .seq { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
    .k { width: 22px; height: 22px; border: 1px solid #444; border-radius: 4px; background: #1c1c1c; color: #666; font: 700 11px/1 "JetBrains Mono", ui-monospace, monospace; cursor: pointer; padding: 0; display: grid; place-items: center; transition: background .1s, color .1s, border-color .1s, transform .08s; }
    .k:hover { border-color: #888; color: #ccc; }
    .k:active { transform: scale(.9); }
    .k:focus-visible { outline: 1px solid #fff; outline-offset: 1px; }
    .k.lit { background: #ffe600; color: #000; border-color: #ffe600; }
    .stage.open .k.lit { background: #00d26a; border-color: #00d26a; }
  `,
  html: `
    <div class="stage">
      <button class="lock" type="button" aria-pressed="false">LOCKED</button>
      <div class="seq" aria-hidden="true">
        <button class="k" type="button" data-k="ArrowUp">↑</button><button class="k" type="button" data-k="ArrowUp">↑</button>
        <button class="k" type="button" data-k="ArrowDown">↓</button><button class="k" type="button" data-k="ArrowDown">↓</button>
        <button class="k" type="button" data-k="ArrowLeft">←</button><button class="k" type="button" data-k="ArrowRight">→</button>
        <button class="k" type="button" data-k="ArrowLeft">←</button><button class="k" type="button" data-k="ArrowRight">→</button>
        <button class="k" type="button" data-k="b">B</button><button class="k" type="button" data-k="a">A</button>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), lock = root.querySelector('.lock'), keys = [...root.querySelectorAll('.k')];
    const code = keys.map((k) => k.dataset.k);
    let pos = 0, open = false;
    const paint = () => keys.forEach((k, i) => k.classList.toggle('lit', i < pos || open));
    const feed = (key) => {
      if (open) return;
      const k = key.length === 1 ? key.toLowerCase() : key;
      if (k === code[pos]) { pos++; if (pos === code.length) { open = true; stage.classList.add('open'); lock.classList.add('open'); lock.textContent = '30 LIVES'; lock.setAttribute('aria-pressed', 'true'); } }
      else { pos = k === code[0] ? 1 : 0; lock.classList.remove('bad'); void lock.offsetWidth; lock.classList.add('bad'); }
      paint();
    };
    lock.addEventListener('keydown', (e) => { if (/^Arrow|^[abAB]$/.test(e.key)) { e.preventDefault(); feed(e.key); } });
    lock.addEventListener('click', () => { if (open) { open = false; pos = 0; stage.classList.remove('open'); lock.classList.remove('open'); lock.textContent = 'LOCKED'; lock.setAttribute('aria-pressed', 'false'); paint(); } });
    keys.forEach((k) => k.addEventListener('click', () => feed(k.dataset.k)));
  },
};
