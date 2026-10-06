// Page-control with expanding dots: the active dot grows into an 18px capsule while the old one shrinks back,
// both on one spring (stiffness 420, damping 32), and the slides ride the same spring.
const SPRING = 'linear(0, 0.043, 0.142, 0.267, 0.408, 0.534, 0.646, 0.742, 0.82, 0.882, 0.928, 0.962, 0.987, 1.003, 1.012, 1.016, 1.018, 1.018, 1.016, 1.014, 1.011, 1.009, 1.007, 1.005, 1.004, 1.002, 1.002, 1.001, 1, 1, 1)';

export default {
  id: 'mo-dots-carousel',
  credit: 'Carousel with an expanding-dot page control (Framer / iOS onboarding pagers) — the active dot springs into a capsule as the slides glide across; drag, arrows or dots',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { width: 260px; max-width: 100%; font-family: Inter, system-ui, sans-serif; }
    .track { position: relative; height: 150px; border-radius: 14px; overflow: hidden; touch-action: pan-y; }
    .rail { display: flex; height: 100%; transform: translateX(calc(var(--i, 0) * -100%)); transition: transform .6s ${SPRING}; }
    .slide { position: relative; flex: none; width: 100%; height: 100%; display: flex; align-items: flex-end; padding: 14px; color: #fff; font-weight: 600; font-size: 15px; letter-spacing: -.01em; background: #d8d8d4; }
    .slide img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; -webkit-user-drag: none; }
    .slide::after { content: ''; position: absolute; inset: 45% 0 0; background: linear-gradient(transparent, rgba(0,0,0,.5)); pointer-events: none; }
    .slide span { position: relative; z-index: 1; text-shadow: 0 1px 8px rgba(0,0,0,.3); opacity: 0; transform: translateY(8px); transition: opacity .3s, transform .5s ${SPRING}; }
    .slide.on span { opacity: 1; transform: none; transition-delay: .15s; }
    .nav { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; padding: 0 2px 2px; }
    .dots { display: flex; align-items: center; gap: 6px; width: 64px; justify-content: center; }
    .dots button { width: 6px; height: 6px; border-radius: 3px; border: 0; background: #c4c4c0; cursor: pointer; padding: 0; transition: width .55s ${SPRING}, background .3s; }
    .dots button[aria-selected="true"] { width: 18px; background: #111; }
    .dots button:hover:not([aria-selected="true"]) { background: #9a9a96; }
    .dots button:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .arr { width: 32px; height: 32px; border-radius: 50%; border: 1px solid #e2e2de; background: #fff; color: #111; cursor: pointer; display: grid; place-items: center; transition: transform .35s ${SPRING}, background .2s; }
    .arr:hover { background: #f5f5f3; transform: scale(1.08); } .arr:active { transform: scale(.92); }
    .arr:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .arr svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="box">
      <div class="track"><div class="rail">
        <div class="slide on"><img src="assets/wide/29.webp" alt="" width="260" height="150" draggable="false"><span>Discover</span></div>
        <div class="slide"><img src="assets/wide/07.webp" alt="" width="260" height="150" draggable="false"><span>Create</span></div>
        <div class="slide"><img src="assets/wide/17.webp" alt="" width="260" height="150" draggable="false"><span>Share</span></div>
        <div class="slide"><img src="assets/wide/20.webp" alt="" width="260" height="150" draggable="false"><span>Grow</span></div>
      </div></div>
      <div class="nav">
        <button class="arr" type="button" aria-label="Previous"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
        <div class="dots" role="tablist"><button type="button" role="tab" aria-selected="true" aria-label="Slide 1"></button><button type="button" role="tab" aria-selected="false" tabindex="-1" aria-label="Slide 2"></button><button type="button" role="tab" aria-selected="false" tabindex="-1" aria-label="Slide 3"></button><button type="button" role="tab" aria-selected="false" tabindex="-1" aria-label="Slide 4"></button></div>
        <button class="arr" type="button" aria-label="Next"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const rail = root.querySelector('.rail'), dots = root.querySelector('.dots'), tabs = [...root.querySelectorAll('[role="tab"]')], slides = [...root.querySelectorAll('.slide')];
    let i = 0, sx = 0, dragging = false;
    const go = (n) => {
      n = (n + 4) % 4; if (n === i) return; i = n;
      rail.style.setProperty('--i', i);
      tabs.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; }); slides.forEach((s, k) => s.classList.toggle('on', k === i));
    };
    tabs.forEach((b, k) => b.addEventListener('click', () => go(k)));
    const [prev, next] = root.querySelectorAll('.arr');
    prev.addEventListener('click', () => go(i - 1)); next.addEventListener('click', () => go(i + 1));
    const track = root.querySelector('.track');
    track.addEventListener('pointerdown', (e) => { dragging = true; sx = e.clientX; track.setPointerCapture(e.pointerId); });
    track.addEventListener('pointerup', (e) => { if (!dragging) return; dragging = false; const d = e.clientX - sx; if (Math.abs(d) > 30) go(i + (d < 0 ? 1 : -1)); });
    track.addEventListener('pointercancel', () => (dragging = false));
    dots.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { go(i + 1); tabs[i].focus(); } if (e.key === 'ArrowLeft') { go(i - 1); tabs[i].focus(); } });
  },
};
