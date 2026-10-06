export default {
  id: 'ob-dribbble-like',
  credit: 'Dribbble — shot card "Like" heart pill: outlined grey heart fills Dribbble pink with a pulse ring and the count ticks up',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .card { width: 240px; max-width: 100%; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.08); font: 12px/1.3 "Haas Grot Text", Inter, system-ui, sans-serif; color: #0d0c22; }
    .shot { height: 110px; background: linear-gradient(135deg, #f6dcea, #ea4c89 55%, #c32361); position: relative; }
    .shot i { position: absolute; border-radius: 50%; background: rgba(255,255,255,.65); }
    .shot i:nth-child(1) { left: 24px; top: 24px; width: 48px; height: 48px; } .shot i:nth-child(2) { left: 120px; top: 50px; width: 28px; height: 28px; } .shot i:nth-child(3) { left: 170px; top: 18px; width: 16px; height: 16px; }
    .meta { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; }
    .who { display: flex; align-items: center; gap: 6px; font-weight: 500; }
    .av { width: 20px; height: 20px; border-radius: 50%; background: #ea4c89; }
    .pro { font: 700 9px Inter, system-ui, sans-serif; background: #f3f3f4; color: #6e6d7a; padding: 2px 4px; border-radius: 3px; }
    .like { position: relative; display: inline-flex; align-items: center; gap: 5px; border: 0; background: none; cursor: pointer; color: #9e9ea7; font: 500 12px Inter, system-ui, sans-serif; padding: 4px 6px; border-radius: 8px; }
    .like:hover { background: #f3f3f4; color: #0d0c22; }
    .like:focus-visible { outline: 2px solid #ea4c89; outline-offset: 2px; }
    .like svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; transition: transform .15s; }
    .like.on svg { fill: #ea4c89; stroke: #ea4c89; animation: pop .4s cubic-bezier(.2,1.6,.4,1); }
    @keyframes pop { 0% { transform: scale(.6); } 60% { transform: scale(1.3); } 100% { transform: scale(1); } }
    .ring { position: absolute; left: 6px; top: 4px; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #ea4c89; opacity: 0; pointer-events: none; }
    .like.on .ring { animation: ring .5s ease-out; }
    @keyframes ring { 0% { transform: scale(.6); opacity: .9; } 100% { transform: scale(2.2); opacity: 0; } }
    .like.on .n { color: #0d0c22; }
  `,
  html: `
    <div class="card">
      <div class="shot" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="meta">
        <span class="who"><span class="av" aria-hidden="true"></span>Studio<span class="pro">PRO</span></span>
        <button class="like" type="button" aria-pressed="false"><span class="ring" aria-hidden="true"></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.3C1.1 8.3 3.3 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.7 0 5.9 3.8 4.5 7.2C19.5 16.4 12 21 12 21z"/></svg><span class="n">1,204</span></button>
      </div>
    </div>`,
  init(root) {
    const like = root.querySelector('.like'), n = root.querySelector('.n');
    let on = false, c = 1204;
    like.addEventListener('click', () => {
      on = !on; c += on ? 1 : -1;
      like.classList.toggle('on', on); like.setAttribute('aria-pressed', String(on));
      n.textContent = c.toLocaleString('en-US');
    });
  },
};
