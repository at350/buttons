export default {
  id: 'ob-slashdot-score',
  credit: 'Slashdot — comment header with "(Score:5, Funny)" in the teal title bar; [-] collapses the comment, moderating bumps the score and mood',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .c { width: 320px; max-width: 100%; border: 1px solid #ccc; border-radius: 12px; overflow: hidden; background: #fff; font: 12px/1.45 Verdana, Arial, sans-serif; color: #000; }
    .hd { display: flex; align-items: center; gap: 6px; padding: 4px 8px; background: #006666; color: #fff; font: 700 12px Verdana, Arial, sans-serif; }
    .tog { width: 16px; height: 16px; border: 1px solid #fff; background: none; color: #fff; cursor: pointer; font: 700 11px/1 monospace; padding: 0; flex: none; }
    .tog:hover { background: rgba(255,255,255,.2); }
    .tog:focus-visible, .mod:focus-visible { outline: 1px dotted #fff; outline-offset: 1px; }
    .ttl { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sc { font-weight: 400; color: #cfe; white-space: nowrap; }
    .by { padding: 2px 8px; background: #e6f2f2; color: #333; font-size: 11px; border-bottom: 1px solid #cde; }
    .by a { color: #006666; }
    .bd { padding: 8px; }
    .c.closed .by, .c.closed .bd { display: none; }
    .mods { display: flex; gap: 4px; padding: 0 8px 8px; }
    .mod { font: 10px Verdana, Arial, sans-serif; padding: 1px 6px; border: 1px solid #999; background: #f4f4f4; cursor: pointer; color: #000; }
    .mod:hover { background: #e4e4e4; }
    .mod.on { background: #006666; color: #fff; border-color: #004444; }
    .c.closed .mods { display: none; }
  `,
  html: `
    <div class="c">
      <div class="hd"><button class="tog" type="button" aria-expanded="true" aria-label="collapse">−</button><span class="ttl">Re: In Soviet Russia, button presses you</span><span class="sc">(Score:<span class="n">5</span>, <span class="m">Funny</span>)</span></div>
      <div class="by">by <a href="#">Anonymous Coward</a> on Sunday October 05, @01:33PM</div>
      <div class="bd">Imagine a Beowulf cluster of these.</div>
      <div class="mods"><button class="mod" type="button" data-m="Insightful">Insightful</button><button class="mod" type="button" data-m="Funny">Funny</button><button class="mod" type="button" data-m="Informative">Informative</button><button class="mod" type="button" data-m="Troll">Troll</button></div>
    </div>`,
  init(root) {
    const c = root.querySelector('.c'), tog = root.querySelector('.tog'), n = root.querySelector('.n'), m = root.querySelector('.m'), mods = [...root.querySelectorAll('.mod')];
    let score = 5, mood = 'Funny', active = null;
    tog.addEventListener('click', () => { const closed = c.classList.toggle('closed'); tog.textContent = closed ? '+' : '−'; tog.setAttribute('aria-expanded', String(!closed)); tog.setAttribute('aria-label', closed ? 'expand' : 'collapse'); });
    mods.forEach((b) => b.addEventListener('click', () => {
      if (active === b) { active.classList.remove('on'); active = null; score = 5; mood = 'Funny'; }
      else { mods.forEach((x) => x.classList.remove('on')); b.classList.add('on'); active = b; mood = b.dataset.m; score = mood === 'Troll' ? -1 : 5; }
      n.textContent = String(score); m.textContent = mood;
    }));
    root.querySelector('.by a').addEventListener('click', (e) => e.preventDefault());
  },
};
