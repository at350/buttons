export default {
  id: 'dp-pyramid-stack',
  credit: 'Isometric pyramid of three stacked slab buttons — each tier is a preserve-3d box that lifts on hover and sinks when selected',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 32px 60px 10px;
      perspective: 1200px;
      background: #ecfeff;
      border-radius: 12px;
    }
    .iso {
      position: relative;
      width: 140px;
      height: 140px;
      transform-style: preserve-3d;
      transform: rotateX(58deg) rotateZ(-45deg);
    }
    .tier {
      --h: 22px;
      --z: 0px;
      position: absolute;
      left: 50%;
      top: 50%;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: translate(-50%, -50%) translateZ(var(--z));
      transition: transform .28s cubic-bezier(.3, 1.3, .4, 1);
    }
    .t1 {
      width: 140px;
      height: 140px;
      --z: 0px;
    }
    .t2 {
      width: 100px;
      height: 100px;
      --z: 22px;
    }
    .t3 {
      width: 60px;
      height: 60px;
      --z: 44px;
    }
    .top, .fr, .sd { position: absolute; }
    .top {
      inset: 0;
      transform: translateZ(var(--h));
      border-radius: 4px;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .5);
    }
    .fr {
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--h);
      transform-origin: bottom;
      transform: rotateX(-90deg);
    }
    .sd {
      top: 0;
      bottom: 0;
      left: 0;
      width: var(--h);
      transform-origin: left;
      transform: rotateY(-90deg);
    }
    /* one light from the upper left: tops lightest, left faces mid, right faces darkest */
    .t1 .top { background: #0891b2; } .t1 .sd { background: #0e7490; } .t1 .fr { background: #155e75; }
    .t2 .top { background: #22d3ee; } .t2 .sd { background: #06b6d4; } .t2 .fr { background: #0891b2; }
    .t3 .top { background: #a5f3fc; } .t3 .sd { background: #67e8f9; } .t3 .fr { background: #22d3ee; }
    .tier:hover .top { filter: brightness(1.08); }
    .tier[aria-pressed="true"] .top { background: #fdba74; }
    .tier[aria-pressed="true"] .sd { background: #f97316; }
    .tier[aria-pressed="true"] .fr { background: #c2410c; }
    .tier:focus-visible { outline: 0; }
    .tier:focus-visible .top { box-shadow: inset 0 0 0 3px #fff; }
  `,
  html: `
    <div class="stage">
      <div class="iso" role="group">
        <button class="tier t1" type="button" aria-pressed="false" aria-label="Base"><span class="fr"></span><span class="sd"></span><span class="top"></span></button>
        <button class="tier t2" type="button" aria-pressed="false" aria-label="Middle"><span class="fr"></span><span class="sd"></span><span class="top"></span></button>
        <button class="tier t3" type="button" aria-pressed="false" aria-label="Apex"><span class="fr"></span><span class="sd"></span><span class="top"></span></button>
      </div>
    </div>`,
  init(root) {
    // a tier that lifts or sinks carries every tier above it, so slabs never intersect
    const tiers = [...root.querySelectorAll('.tier')];
    let hov = -1;
    const lay = () => {
      let acc = 0;
      tiers.forEach((t, i) => {
        acc += (i === hov ? 8 : 0) + (t.getAttribute('aria-pressed') === 'true' ? -6 : 0);
        t.style.setProperty('--z', (i * 22 + acc) + 'px');
      });
    };
    tiers.forEach((t, i) => {
      t.addEventListener('pointerenter', () => { hov = i; lay(); });
      t.addEventListener('pointerleave', () => { if (hov === i) { hov = -1; lay(); } });
      t.addEventListener('click', () => { t.setAttribute('aria-pressed', String(t.getAttribute('aria-pressed') !== 'true')); lay(); });
    });
    lay();
  },
};
