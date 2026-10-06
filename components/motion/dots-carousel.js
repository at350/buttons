const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-dots-carousel',
  credit: 'Carousel with a sliding pill indicator — the active dot stretches into a bar and glides between dots as the slides spring across (Framer / Instagram stories)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { width: 260px; max-width: 100%; font-family: Inter, system-ui, sans-serif; }
    .track { position: relative; height: 150px; border-radius: 14px; overflow: hidden; touch-action: pan-y; }
    .rail { display: flex; height: 100%; transform: translateX(calc(var(--i, 0) * -100%)); transition: transform .6s ${SPRING}; }
    .slide { flex: none; width: 100%; height: 100%; display: flex; align-items: flex-end; padding: 14px; color: #fff; font-weight: 600; font-size: 15px; letter-spacing: -.01em; }
    .slide span { opacity: 0; transform: translateY(8px); transition: opacity .3s, transform .5s ${SPRING}; }
    .slide.on span { opacity: 1; transform: none; transition-delay: .15s; }
    .nav { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
    .dots { position: relative; display: flex; gap: 6px; padding: 4px; }
    .dots button { width: 8px; height: 8px; border-radius: 4px; border: 0; background: #c9c9c4; cursor: pointer; padding: 0; transition: background .3s; }
    .dots button:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .pill { position: absolute; top: 4px; left: calc(4px + var(--i, 0) * 14px); width: 22px; height: 8px; border-radius: 4px; background: #111; transition: left .5s ${SPRING}, width .5s ${SPRING}; pointer-events: none; }
    .dots.stretch .pill { width: 36px; }
    .arr { width: 32px; height: 32px; border-radius: 50%; border: 1px solid #e2e2de; background: #fff; color: #111; cursor: pointer; display: grid; place-items: center; transition: transform .3s cubic-bezier(.34, 1.56, .64, 1), background .2s; }
    .arr:hover { background: #f5f5f3; transform: scale(1.08); } .arr:active { transform: scale(.92); }
    .arr:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .arr svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="box">
      <div class="track"><div class="rail">
        <div class="slide on" style="background:linear-gradient(135deg,#6366f1,#a855f7)"><span>Discover</span></div>
        <div class="slide" style="background:linear-gradient(135deg,#f59e0b,#ef4444)"><span>Create</span></div>
        <div class="slide" style="background:linear-gradient(135deg,#10b981,#06b6d4)"><span>Share</span></div>
        <div class="slide" style="background:linear-gradient(135deg,#0f172a,#475569)"><span>Grow</span></div>
      </div></div>
      <div class="nav">
        <button class="arr" type="button" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
        <div class="dots" role="tablist"><span class="pill"></span><button type="button" role="tab" aria-selected="true" aria-label="Slide 1"></button><button type="button" role="tab" aria-selected="false" aria-label="Slide 2"></button><button type="button" role="tab" aria-selected="false" aria-label="Slide 3"></button><button type="button" role="tab" aria-selected="false" aria-label="Slide 4"></button></div>
        <button class="arr" type="button" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const rail = root.querySelector('.rail'), dots = root.querySelector('.dots'), tabs = [...root.querySelectorAll('[role="tab"]')], slides = [...root.querySelectorAll('.slide')];
    let i = 0, t = 0, sx = 0, dragging = false;
    const go = (n) => {
      n = (n + 4) % 4; if (n === i) return; i = n;
      rail.style.setProperty('--i', i); dots.style.setProperty('--i', i);
      tabs.forEach((b, k) => b.setAttribute('aria-selected', String(k === i))); slides.forEach((s, k) => s.classList.toggle('on', k === i));
      dots.classList.add('stretch'); clearTimeout(t); t = setTimeout(() => dots.classList.remove('stretch'), 220);
    };
    tabs.forEach((b, k) => b.addEventListener('click', () => go(k)));
    const [prev, next] = root.querySelectorAll('.arr');
    prev.addEventListener('click', () => go(i - 1)); next.addEventListener('click', () => go(i + 1));
    const track = root.querySelector('.track');
    track.addEventListener('pointerdown', (e) => { dragging = true; sx = e.clientX; track.setPointerCapture(e.pointerId); });
    track.addEventListener('pointerup', (e) => { if (!dragging) return; dragging = false; const d = e.clientX - sx; if (Math.abs(d) > 30) go(i + (d < 0 ? 1 : -1)); });
    track.addEventListener('pointercancel', () => (dragging = false));
    dots.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { go(i + 1); tabs[i].focus(); } if (e.key === 'ArrowLeft') { go(i - 1); tabs[i].focus(); } });
    return () => clearTimeout(t);
  },
};
