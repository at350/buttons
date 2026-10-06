export default {
  id: 'dp-spatial-window',
  credit: 'Apple visionOS window — frosted glass pane with a specular rim that tilts toward the pointer; a toolbar ornament floats in front of its bottom edge and the window bar sits beneath',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; padding: 24px 34px 18px; border-radius: 12px; overflow: hidden; perspective: 900px; isolation: isolate;
      background:
        radial-gradient(130px 110px at 18% 20%, #f9a8d4, transparent 70%),
        radial-gradient(150px 120px at 88% 78%, #7dd3fc, transparent 70%),
        linear-gradient(160deg, #4338ca, #312e81 60%, #1e1b4b);
    }
    .win { --rx: 0deg; --ry: 0deg; position: relative; width: 240px; height: 128px; max-width: 100%; transform-style: preserve-3d; transform: rotateX(var(--rx)) rotateY(var(--ry)); }
    .glass { position: absolute; inset: 0; border-radius: 26px; pointer-events: none;
      background: linear-gradient(180deg, rgba(255, 255, 255, .22), rgba(255, 255, 255, .12));
      -webkit-backdrop-filter: blur(26px) saturate(1.8); backdrop-filter: blur(26px) saturate(1.8);
      box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .2), 0 24px 44px rgba(10, 8, 40, .4);
    }
    .glass::before, .orn::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.2px; pointer-events: none;
      background: linear-gradient(150deg, rgba(255, 255, 255, .85), rgba(255, 255, 255, .14) 32%, rgba(255, 255, 255, .04) 60%, rgba(255, 255, 255, .42));
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
    }
    .content { position: absolute; inset: 0; transform: translateZ(2px); pointer-events: none; }
    .ttl { position: absolute; left: 22px; top: 18px; color: #fff; font: 700 17px/1 system-ui, -apple-system, 'Inter', sans-serif; letter-spacing: -.01em; }
    .tiles { position: absolute; left: 22px; right: 22px; top: 46px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; }
    .tiles img { display: block; width: 100%; height: 38px; min-width: 0; object-fit: cover; border-radius: 9px; box-shadow: 0 2px 6px rgba(20, 10, 60, .25); }
    .orn {
      position: absolute; left: 50%; top: 100%; display: flex; gap: 2px; padding: 5px; border-radius: 999px;
      transform: translate(-50%, -50%) translateZ(28px);
      background: linear-gradient(180deg, rgba(255, 255, 255, .24), rgba(255, 255, 255, .14));
      -webkit-backdrop-filter: blur(22px) saturate(1.8); backdrop-filter: blur(22px) saturate(1.8);
      box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .2), 0 12px 24px rgba(10, 8, 40, .35);
    }
    .ob {
      --x: 50%; --y: 50%; position: relative; width: 38px; height: 38px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; overflow: hidden;
      color: rgba(255, 255, 255, .96); background: transparent; display: grid; place-items: center;
      transition: transform .3s cubic-bezier(.32, .72, 0, 1), background-color .25s, color .2s;
    }
    .ob::before { content: ''; position: absolute; inset: 0; border-radius: 50%; opacity: 0; transition: opacity .25s;
      background: radial-gradient(30px 30px at var(--x) var(--y), rgba(255, 255, 255, .45), rgba(255, 255, 255, .1) 70%, rgba(255, 255, 255, .06)); }
    .ob:hover::before { opacity: 1; }
    .ob:active { transform: scale(.88); transition-duration: .12s; }
    .ob[aria-pressed="true"] { background: rgba(255, 255, 255, .96); color: #111; }
    .ob svg { position: relative; width: 18px; height: 18px; }
    .ob:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .bar { display: flex; justify-content: center; margin-top: 30px; }
    .bar i { width: 64px; height: 5px; border-radius: 3px; background: rgba(255, 255, 255, .7); box-shadow: 0 1px 3px rgba(0, 0, 0, .2); transition: width .25s, background .25s; }
    .stage:hover .bar i { width: 76px; background: rgba(255, 255, 255, .9); }
  `,
  html: `
    <div class="stage">
      <div class="win">
        <span class="glass"></span>
        <span class="content"><span class="ttl">Library</span><span class="tiles"><img src="assets/square/58.webp" alt="" width="38" height="38" draggable="false"><img src="assets/square/35.webp" alt="" width="38" height="38" draggable="false"><img src="assets/square/45.webp" alt="" width="38" height="38" draggable="false"><img src="assets/square/71.webp" alt="" width="38" height="38" draggable="false"></span></span>
        <div class="orn" role="toolbar" aria-label="Library">
          <button class="ob" type="button" aria-pressed="false" aria-label="Back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
          <button class="ob" type="button" aria-pressed="false" aria-label="Favorite"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
          <button class="ob" type="button" aria-pressed="false" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></button>
        </div>
      </div>
      <div class="bar"><i></i></div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), w = root.querySelector('.win');
    let raf = 0, hover = false, tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * .12; cy += (ty - cy) * .12;
      w.style.setProperty('--ry', cx.toFixed(2) + 'deg'); w.style.setProperty('--rx', cy.toFixed(2) + 'deg');
      raf = (hover || Math.abs(tx - cx) + Math.abs(ty - cy) > .05) ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
    st.addEventListener('pointerenter', () => { hover = true; start(); });
    st.addEventListener('pointermove', (e) => {
      const r = w.getBoundingClientRect();
      tx = Math.max(-.5, Math.min(.5, (e.clientX - r.left) / r.width - .5)) * 14; ty = Math.max(-.5, Math.min(.5, .5 - (e.clientY - r.top) / r.height)) * 10;
    });
    st.addEventListener('pointerleave', () => { hover = false; tx = 0; ty = 0; start(); });
    root.querySelectorAll('.ob').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%'); b.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
      b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
    });
    return () => cancelAnimationFrame(raf);
  },
};
