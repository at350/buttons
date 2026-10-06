const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-dynamic-island',
  credit: 'Apple Dynamic Island — the black pill springs wider and taller into a live call, content blurs in; tap again to collapse (iPhone 14 Pro)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 150px; max-width: 100%; border-radius: 12px; background: linear-gradient(160deg, #dbeafe, #fce7f3); overflow: hidden; font-family: Inter, system-ui, sans-serif; }
    .isl {
      position: absolute; top: 12px; left: 50%; width: var(--w, 120px); height: var(--h, 36px); transform: translateX(-50%); border-radius: 999px; border: 0; background: #000; color: #fff; cursor: pointer; padding: 0; overflow: hidden;
      transition: width .65s ${SPRING}, height .65s ${SPRING}, border-radius .5s; box-shadow: 0 8px 24px -8px rgba(0,0,0,.5);
    }
    .isl:hover { --w: 128px; } .isl:focus-visible { outline: 2px solid #000; outline-offset: 3px; }
    .isl[aria-expanded="true"], .isl[aria-expanded="true"]:hover { --w: 250px; --h: 76px; border-radius: 38px; }
    .mini { position: absolute; inset: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 14px; transition: opacity .2s, transform .5s ${SPRING}, filter .2s; }
    .isl[aria-expanded="true"] .mini { opacity: 0; transform: scale(.8); filter: blur(4px); }
    .mini .ph { width: 16px; height: 16px; fill: none; stroke: #4ade80; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .wave { display: flex; gap: 2px; align-items: center; height: 14px; }
    .wave i { width: 3px; border-radius: 2px; background: #4ade80; height: 6px; animation: w .9s ease-in-out infinite alternate paused; }
    .wave i:nth-child(2) { animation-delay: -.3s; } .wave i:nth-child(3) { animation-delay: -.6s; } .wave i:nth-child(4) { animation-delay: -.15s; }
    .stage:hover .wave i { animation-play-state: running; }
    @keyframes w { from { height: 4px; } to { height: 14px; } }
    .full { position: absolute; inset: 0; display: flex; align-items: center; gap: 12px; padding: 0 16px; opacity: 0; transform: scale(.9); filter: blur(6px); transition: opacity .3s, transform .6s ${SPRING}, filter .3s; transition-delay: .08s; }
    .isl[aria-expanded="true"] .full { opacity: 1; transform: none; filter: none; }
    .av { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #f472b6, #8b5cf6); flex: none; }
    .txt { display: flex; flex-direction: column; gap: 2px; flex: 1; text-align: left; } .txt b { font-size: 14px; font-weight: 600; } .txt span { font-size: 12px; color: #4ade80; font-variant-numeric: tabular-nums; }
    .acts { display: flex; gap: 8px; }
    .acts span { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; }
    .acts .end { background: #ef4444; } .acts .ans { background: #22c55e; }
    .acts svg { width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .time { position: absolute; top: 22px; left: 22px; font-size: 13px; font-weight: 600; color: #1e293b; }
  `,
  html: `
    <div class="stage">
      <span class="time">9:41</span>
      <button class="isl" type="button" aria-expanded="false" aria-label="Call">
        <span class="mini"><svg class="ph" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg><span class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span></span>
        <span class="full"><span class="av"></span><span class="txt"><b>Mia Jones</b><span class="t">00:00</span></span><span class="acts"><span class="end"><svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg></span><span class="ans"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></span></span></span>
      </button>
    </div>`,
  init(root) {
    const isl = root.querySelector('.isl'), t = root.querySelector('.t');
    let iv = 0, s = 0;
    isl.addEventListener('click', () => {
      const open = isl.getAttribute('aria-expanded') !== 'true';
      isl.setAttribute('aria-expanded', String(open));
      clearInterval(iv); iv = 0;
      if (open) { s = 0; t.textContent = '00:00'; iv = setInterval(() => { s++; t.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }, 1000); }
    });
    return () => clearInterval(iv);
  },
};
