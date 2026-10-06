// Medium clap button (current medium.com story footer): 24px clapping-hands glyph + count in 13px Söhne-ish sans
// #6b6b6b, darkening to #242424 on hover. Each clap fills the hands solid, pops a ring of tiny confetti strokes
// around them and shows the black "+N" bubble above that counts this burst; hold to keep clapping (max +50).
// Glyph: Phosphor "hands-clapping" (regular / fill). The stage reserves the room the bubble rises into.
const REG = 'M160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0ZM196.1,41a7.91,7.91,0,0,0,4.17,1.17,8,8,0,0,0,6.84-3.83l8-13.11a8,8,0,0,0-13.68-8.33l-8,13.1A8,8,0,0,0,196.1,41Zm47.51,12.59a8,8,0,0,0-10.08-5.16l-15.06,4.85a8,8,0,0,0,2.46,15.62,8.15,8.15,0,0,0,2.46-.39l15.05-4.85A8,8,0,0,0,243.61,53.55ZM217,97.58a80.22,80.22,0,0,1-10.22,94c-.34,1.73-.72,3.46-1.19,5.18A80.17,80.17,0,0,1,58.77,216L23.5,155a26,26,0,0,1,19.24-38.79l-3-5.2a26,26,0,0,1,19.2-38.78L58.24,71A26,26,0,0,1,95.47,36.53,26.06,26.06,0,0,1,140.3,37l12.26,21.2A26.07,26.07,0,0,1,195.81,61ZM109.07,55l0,0h0l25,43.17a26,26,0,0,1,17.33-10L126.42,45a10,10,0,1,0-17.35,10ZM72.12,63l6.46,11.17a26.05,26.05,0,0,1,17.32-10L89.45,53A10,10,0,1,0,72.12,63Zm111.54,81-20.22-35a10,10,0,0,0-17.74,9.25L158.3,140a8,8,0,0,1-13.87,8l-36.5-63A10,10,0,1,0,90.58,95l26.05,45a8,8,0,0,1-13.87,8L71,93h0l0,0a10,10,0,0,0-17.33,10l35.22,61A8,8,0,0,1,75,172L54.72,137a10,10,0,0,0-17.34,10l35.27,61a64.12,64.12,0,0,0,117.42-15.44A63.52,63.52,0,0,0,183.66,144Zm19.41-38.42L181.93,69A10,10,0,0,0,164.55,79l33,57.05A80.2,80.2,0,0,1,207,161.51,64.23,64.23,0,0,0,203.07,105.58Z';
const FIL = 'M188.87,65A18,18,0,0,0,157.62,83L133.36,41a18,18,0,0,0-31.22,18L96.4,49A18,18,0,0,0,65.18,67l3.34,5.77A26,26,0,0,0,39.74,111l3,5.2A26,26,0,0,0,23.5,155l35.27,61a80.14,80.14,0,0,0,149.52-39.57A71.92,71.92,0,0,0,210,101.58Zm1.2,127.56A64.12,64.12,0,0,1,72.65,208L37.38,147a10,10,0,0,1,17.34-10L75,172a8,8,0,0,0,13.87-8L53.62,103A10,10,0,0,1,71,93l31.81,55a8,8,0,0,0,13.87-8l-26-45a10,10,0,0,1,17.35-10l36.5,63a8,8,0,0,0,13.87-8l-12.6-21.75A10,10,0,0,1,163.44,109l20.22,35A63.52,63.52,0,0,1,190.07,192.57ZM160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0Zm33.22,6,8-13.1a8,8,0,0,1,13.68,8.33l-8,13.11a8,8,0,0,1-6.84,3.83A8,8,0,0,1,193.44,30Zm45,33.66-15.05,4.85a8.15,8.15,0,0,1-2.46.39,8,8,0,0,1-2.46-15.62l15.06-4.85a8,8,0,1,1,4.91,15.23Z';
const RAYS = [0, 60, 120, 180, 240, 300].map((a) => '<i class="ray" style="--a:' + a + 'deg"></i>').join('');
export default {
  id: 'in-clap-button',
  credit: 'Medium clap button — hands fill black, confetti strokes pop, a black +N bubble rises; hold to keep clapping',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .w { position: relative; display: inline-flex; align-items: center; gap: 6px; padding: 46px 12px 6px 6px; font: 400 13px/20px "Söhne", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #6b6b6b; }
    .c {
      position: relative; width: 36px; height: 36px; border: 0; padding: 0; border-radius: 50%; background: none; color: #6b6b6b; cursor: pointer;
      display: grid; place-items: center; -webkit-tap-highlight-color: transparent; user-select: none; touch-action: none; outline: 0; transition: color .15s;
    }
    .w:hover .c, .w:hover .n, .c.hot { color: #242424; }
    .c:focus-visible { box-shadow: 0 0 0 2px #242424; }
    .c svg { width: 24px; height: 24px; fill: currentColor; }
    .c .f { display: none; }
    .c.hot .o { display: none; }
    .c.hot .f { display: inline; }
    .c.pulse svg { animation: pulse .3s cubic-bezier(.2,0,0,1); }
    @keyframes pulse { 0% { transform: scale(1); } 40% { transform: scale(1.18); } 100% { transform: scale(1); } }
    .ray { position: absolute; left: 50%; top: 50%; width: 2px; height: 5px; margin: -2.5px 0 0 -1px; border-radius: 1px; background: #242424; opacity: 0; transform: rotate(var(--a)) translateY(-13px); pointer-events: none; }
    .c.pulse .ray { animation: ray .45s ease-out; }
    @keyframes ray { 0% { opacity: 1; transform: rotate(var(--a)) translateY(-12px) scaleY(.6); } 100% { opacity: 0; transform: rotate(var(--a)) translateY(-20px) scaleY(1); } }
    .bub {
      position: absolute; left: 24px; top: 4px; width: 36px; height: 36px; margin-left: -18px; border-radius: 50%; background: #242424; color: #fff;
      font: 500 13px/36px "Söhne", "Helvetica Neue", Helvetica, Arial, sans-serif; text-align: center; opacity: 0; transform: translateY(14px) scale(.6);
      transition: transform .25s cubic-bezier(.2,0,0,1), opacity .2s; pointer-events: none;
    }
    .w.show .bub { opacity: 1; transform: none; }
    .w.leave .bub { opacity: 0; transform: translateY(-6px); transition: transform .4s ease-in, opacity .4s ease-in; }
    .n { min-width: 3.2ch; font-variant-numeric: tabular-nums; transition: color .15s; }
  `,
  html: `<div class="w">
    <span class="bub" aria-hidden="true">+1</span>
    <button class="c" type="button" aria-label="Clap">${RAYS}<svg viewBox="0 0 256 256"><path class="o" d="${REG}"/><path class="f" d="${FIL}"/></svg></button>
    <span class="n">1.2K</span>
  </div>`,
  init(root) {
    const w = root.querySelector('.w'), c = root.querySelector('.c'), n = root.querySelector('.n'), bub = root.querySelector('.bub');
    let mine = 0, timer = 0, hide = 0, leave = 0;
    const fmt = (x) => (x >= 1000 ? (x / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : String(x));
    const clap = () => {
      if (mine >= 50) return;
      mine++; n.textContent = fmt(1200 + mine); bub.textContent = '+' + mine;
      w.classList.remove('leave'); w.classList.add('show'); c.classList.add('hot');
      c.classList.remove('pulse'); void c.offsetWidth; c.classList.add('pulse');
      clearTimeout(hide); clearTimeout(leave);
      hide = setTimeout(() => { w.classList.add('leave'); w.classList.remove('show'); leave = setTimeout(() => w.classList.remove('leave'), 400); }, 900);
    };
    const start = (e) => { if (e.button !== 0) return; e.preventDefault(); c.setPointerCapture(e.pointerId); clap(); clearInterval(timer); timer = setInterval(clap, 150); };
    const stop = () => { clearInterval(timer); timer = 0; };
    c.addEventListener('pointerdown', start);
    c.addEventListener('pointerup', stop); c.addEventListener('pointercancel', stop); c.addEventListener('lostpointercapture', stop);
    c.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); clap(); } });
    return () => { stop(); clearTimeout(hide); clearTimeout(leave); };
  },
};
