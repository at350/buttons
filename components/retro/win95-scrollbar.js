export default {
  id: 'rt-win95-scrollbar',
  credit: 'Windows 95 — vertical scrollbar with checkered track and bevelled arrow buttons',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 12px; border-radius: 12px; display: inline-block; }
    .frame { display: flex; width: 160px; height: 120px; background: #fff;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px #0a0a0a, inset -2px -2px #dfdfdf; padding: 2px; }
    .content { flex: 1; overflow: hidden; position: relative; }
    .lines { position: absolute; left: 6px; right: 6px; top: 6px; transition: transform .1s; }
    .lines i { display: block; height: 4px; background: #000080; margin-bottom: 7px; opacity: .25; }
    .lines i:nth-child(odd) { width: 80%; } .lines i:nth-child(3n) { width: 55%; }
    .sb { width: 16px; display: flex; flex-direction: column; background: #c0c0c0;
      background-image: repeating-conic-gradient(#fff 0 25%, #c0c0c0 0 50%); background-size: 2px 2px; }
    .ab { width: 16px; height: 16px; background: #c0c0c0; border: none; padding: 0; display: grid; place-items: center; flex: none;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .ab:active { box-shadow: inset 1px 1px #808080; }
    .ab:focus-visible { outline: 1px dotted #000; outline-offset: -3px; }
    .track { flex: 1; position: relative; }
    .thumb { position: absolute; left: 0; width: 16px; height: 34px; background: #c0c0c0; transition: top .1s;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
  `,
  html: `
    <div class="stage">
      <div class="frame">
        <div class="content"><div class="lines"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
        <div class="sb">
          <button class="ab up" type="button" aria-label="Scroll up"><svg width="7" height="4" viewBox="0 0 7 4"><path d="M0 4h7L3.5 0z" fill="#000"/></svg></button>
          <div class="track"><div class="thumb" role="scrollbar" aria-valuenow="0"></div></div>
          <button class="ab dn" type="button" aria-label="Scroll down"><svg width="7" height="4" viewBox="0 0 7 4"><path d="M0 0h7L3.5 4z" fill="#000"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const thumb = root.querySelector('.thumb');
    const lines = root.querySelector('.lines');
    const track = root.querySelector('.track');
    let pos = 0;
    const render = () => {
      const max = track.clientHeight - thumb.offsetHeight;
      thumb.style.top = pos * max + 'px';
      thumb.setAttribute('aria-valuenow', String(Math.round(pos * 100)));
      lines.style.transform = `translateY(${-pos * 100}px)`;
    };
    const step = (d) => { pos = Math.min(1, Math.max(0, pos + d)); render(); };
    root.querySelector('.up').addEventListener('click', () => step(-0.2));
    root.querySelector('.dn').addEventListener('click', () => step(0.2));
    track.addEventListener('click', (e) => { if (e.target === track) step(e.offsetY < thumb.offsetTop ? -0.4 : 0.4); });
    requestAnimationFrame(render);
  },
};
