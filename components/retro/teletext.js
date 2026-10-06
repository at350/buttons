export default {
  id: 'rt-teletext',
  credit: 'Teletext / Ceefax Fastext — red, green, yellow, blue remote keys that select a block-graphic page',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #000; padding: 12px; border-radius: 12px; display: inline-block; font: bold 14px/16px "Courier New", Courier, monospace; }
    .page { width: 184px; height: 72px; background: #000; color: #fff; padding: 4px 6px; margin-bottom: 8px; overflow: hidden; position: relative; }
    .hdr { display: flex; justify-content: space-between; color: #fff; }
    .hdr b { color: #ff0; }
    .blocks { display: grid; grid-template-columns: repeat(8, 1fr); gap: 2px; margin-top: 6px; }
    .blocks i { height: 10px; background: var(--c, #0f0); opacity: .9; }
    .blocks i:nth-child(3n) { background: #fff; } .blocks i:nth-child(5n) { background: #f0f; opacity: .6; }
    .row { display: flex; gap: 8px; }
    .fk { flex: 1; height: 28px; border: none; border-radius: 6px; cursor: pointer; position: relative;
      box-shadow: inset 0 -3px 0 rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.35), 0 2px 0 #111; }
    .fk:active, .fk.on { transform: translateY(2px); box-shadow: inset 0 2px 3px rgba(0,0,0,.5), 0 0 0 #111; filter: brightness(1.2); }
    .fk:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .r { background: #d81e1e; } .g { background: #19a81e; } .y { background: #e6c71a; } .b { background: #1a4fd8; }
  `,
  html: `
    <div class="stage">
      <div class="page"><div class="hdr"><span>P<b class="num">100</b></span><span>CEEFAX</span><span>21:34/19</span></div><div class="blocks"></div></div>
      <div class="row">
        <button class="fk r" type="button" aria-label="Red" aria-pressed="false"></button>
        <button class="fk g" type="button" aria-label="Green" aria-pressed="false"></button>
        <button class="fk y" type="button" aria-label="Yellow" aria-pressed="false"></button>
        <button class="fk b" type="button" aria-label="Blue" aria-pressed="false"></button>
      </div>
    </div>`,
  init(root) {
    const blocks = root.querySelector('.blocks'); const num = root.querySelector('.num');
    blocks.innerHTML = '<i></i>'.repeat(24);
    const pages = { r: ['101', '#f00'], g: ['200', '#0f0'], y: ['300', '#ff0'], b: ['400', '#0ff'] };
    root.querySelectorAll('.fk').forEach((k) => k.addEventListener('click', () => {
      const key = k.classList.contains('r') ? 'r' : k.classList.contains('g') ? 'g' : k.classList.contains('y') ? 'y' : 'b';
      root.querySelectorAll('.fk').forEach((o) => { o.classList.remove('on'); o.setAttribute('aria-pressed', 'false'); });
      k.classList.add('on'); k.setAttribute('aria-pressed', 'true');
      num.textContent = pages[key][0]; blocks.style.setProperty('--c', pages[key][1]);
    }));
  },
};
