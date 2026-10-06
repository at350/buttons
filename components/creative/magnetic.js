export default {
  id: 'cr-magnetic',
  credit: 'Magnetic button — label and body follow the cursor and spring back (Awwwards / Cuberto style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; width: 260px; height: 140px; max-width: 100%; border-radius: 12px; background: #111;
      display: grid; place-items: center;
    }
    .btn {
      position: relative; width: 150px; height: 56px; border: 0; border-radius: 999px; background: #fff; cursor: pointer;
      transition: transform .25s cubic-bezier(.2, .8, .2, 1), background .2s;
      will-change: transform;
    }
    .btn:hover { background: #f3f3f3; }
    .btn:active { background: #e5e5e5; }
    .txt {
      display: inline-block; font: 700 15px/1 system-ui, sans-serif; color: #111; letter-spacing: .02em;
      transition: transform .25s cubic-bezier(.2, .8, .2, 1);
    }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
  `,
  html: `<div class="stage"><button class="btn" type="button"><span class="txt">Pull me</span></button></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), btn = root.querySelector('.btn'), txt = root.querySelector('.txt');
    const R = 120, EASE = 'cubic-bezier(.2,.8,.2,1)', SPRING = 'cubic-bezier(.34,1.8,.64,1)';
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      if (d > R) { reset(EASE); return; }
      const k = 1 - d / (R * 2.2);
      btn.style.transition = 'transform .25s ' + EASE + ', background .2s';
      txt.style.transition = 'transform .25s ' + EASE;
      btn.style.transform = 'translate(' + (dx * .45 * k).toFixed(1) + 'px,' + (dy * .45 * k).toFixed(1) + 'px)';
      txt.style.transform = 'translate(' + (dx * .25 * k).toFixed(1) + 'px,' + (dy * .25 * k).toFixed(1) + 'px)';
    });
    function reset(ease) {
      btn.style.transition = 'transform .7s ' + ease + ', background .2s';
      txt.style.transition = 'transform .7s ' + ease;
      btn.style.transform = 'translate(0,0)';
      txt.style.transform = 'translate(0,0)';
    }
    stage.addEventListener('mouseleave', () => reset(SPRING));
  },
};
