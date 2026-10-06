export default {
  id: 'mb-tesla-fan',
  credit: 'Tesla app — climate card: power button, big setpoint with ± steppers, and the segmented fan-speed bar that spins the fan faster',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 260px; max-width: 100%; padding: 18px; border-radius: 12px; background: #000; color: #fff; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .top { display: flex; align-items: center; justify-content: space-between; }
    .pw { width: 40px; height: 40px; border-radius: 50%; border: 0; background: #1b1b1b; color: #8e8e93; cursor: pointer; display: grid; place-items: center; transition: background .25s, color .25s, box-shadow .3s; -webkit-tap-highlight-color: transparent; }
    .pw svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }
    .pw[aria-pressed="true"] { background: #3e6ae1; color: #fff; box-shadow: 0 0 20px rgba(62,106,225,.55); }
    .pw:focus-visible, .st:focus-visible, .seg:focus-visible { outline: 2px solid #3e6ae1; outline-offset: 2px; }
    .tmp { display: flex; align-items: center; gap: 6px; }
    .st { width: 34px; height: 34px; border-radius: 50%; border: 0; background: transparent; color: #8e8e93; font: 500 20px/1 Inter, system-ui, sans-serif; cursor: pointer; transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; }
    .st:hover { background: #1b1b1b; color: #fff; }
    .deg { font: 300 34px/1 Inter, system-ui, sans-serif; letter-spacing: -.03em; min-width: 68px; text-align: center; font-variant-numeric: tabular-nums; transition: color .3s; }
    .stage.off .deg { color: #3a3a3c; }
    .fanrow { display: flex; align-items: center; gap: 12px; margin-top: 18px; }
    .fan { width: 22px; height: 22px; flex: none; color: #8e8e93; transition: color .3s; animation: spin var(--spd, 2s) linear infinite paused; }
    .stage.on .fan { animation-play-state: running; color: #fff; }
    .fan svg { width: 100%; height: 100%; fill: currentColor; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .bar { display: flex; gap: 3px; flex: 1; height: 28px; border-radius: 6px; overflow: hidden; }
    .seg { flex: 1; border: 0; padding: 0; background: #1b1b1b; cursor: pointer; transition: background .2s, transform .15s; -webkit-tap-highlight-color: transparent; }
    .seg:hover { background: #2c2c2e; }
    .seg.lit { background: #3e6ae1; }
    .stage.off .seg.lit { background: #2c2c2e; }
    .seg:active { transform: scaleY(.9); }
    .bar:hover .seg.lit { background: #4f78e8; }
  `,
  html: `
    <div class="stage on" style="--spd: 1.4s">
      <div class="top">
        <button class="pw" type="button" aria-pressed="true" aria-label="Climate power"><svg viewBox="0 0 24 24"><path d="M12 3v8M6.3 6.3a8 8 0 1 0 11.4 0"/></svg></button>
        <div class="tmp"><button class="st" type="button" aria-label="Cooler">−</button><span class="deg">68°</span><button class="st" type="button" aria-label="Warmer">+</button></div>
      </div>
      <div class="fanrow">
        <span class="fan"><svg viewBox="0 0 24 24"><path d="M12 10.2c.6 0 1.1.2 1.5.5C14.6 7 16 2 12.9 2 10 2 9.8 6.4 10.5 10.7c.4-.3.9-.5 1.5-.5zm-1.6 2.3c-4.3-.6-8.6 1.5-7.2 4.2 1.4 2.7 5.6.6 8.8-2.3-.7-.3-1.3-1-1.6-1.9zm3.2 0c-.3.9-.9 1.6-1.6 1.9 3.2 2.9 7.4 5 8.8 2.3 1.4-2.7-2.9-4.8-7.2-4.2z"/></svg></span>
        <div class="bar" role="group" aria-label="Fan speed"></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), bar = root.querySelector('.bar'), pw = root.querySelector('.pw'), deg = root.querySelector('.deg');
    const segs = Array.from({ length: 10 }, (_, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'seg'; b.setAttribute('aria-label', `Fan ${i + 1}`); bar.appendChild(b); return b; });
    let speed = 4, temp = 68;
    const paint = () => { segs.forEach((s, i) => s.classList.toggle('lit', i < speed)); stage.style.setProperty('--spd', (2.4 - speed * 0.2) + 's'); };
    segs.forEach((s, i) => s.addEventListener('click', () => { speed = (speed === i + 1) ? i : i + 1; if (!stage.classList.contains('on')) pw.click(); paint(); }));
    pw.addEventListener('click', () => { const on = pw.getAttribute('aria-pressed') !== 'true'; pw.setAttribute('aria-pressed', String(on)); stage.classList.toggle('on', on); stage.classList.toggle('off', !on); });
    root.querySelectorAll('.st').forEach((b, i) => b.addEventListener('click', () => { temp = Math.max(60, Math.min(80, temp + (i ? 1 : -1))); deg.textContent = temp + '°'; }));
    paint();
  },
};
