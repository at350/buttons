const VIEWS = ['Front', 'Rear', 'Left', 'Right'];
const WEDGE = { Front: 'M55 72 20 0h70z', Rear: 'M55 108 20 180h70z', Left: 'M44 90 0 40v100z', Right: 'M66 90 110 40v100z' };

export default {
  id: 'au-360-camera',
  credit: 'Surround-view / 360° camera — bird\'s-eye car with the active camera wedge, the live feed with coloured parking guide lines, view keys and the 3D orbit toggle',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 330px; max-width: 100%; padding: 8px; border-radius: 12px; background: #0b0c0e; color: #fff; font: 500 11px/1 Inter, system-ui, sans-serif; user-select: none; }
    .scr { display: flex; gap: 6px; height: 150px; }
    .bird { position: relative; flex: none; width: 110px; border-radius: 8px; overflow: hidden; background: radial-gradient(ellipse at 50% 50%, #5d6168, #3a3d42 60%, #2a2c30); perspective: 300px; }
    .bird svg { position: absolute; inset: 0; width: 100%; height: 100%; transition: transform .6s cubic-bezier(.2,0,0,1); }
    .d3 .bird svg { transform: rotateX(42deg) rotateZ(-20deg) scale(.95); }
    .wg { fill: rgba(77,163,255,.32); stroke: #4da3ff; stroke-width: 1; transition: d .3s; }
    .car { fill: #e9ecef; }
    .gl { fill: #1e242b; }
    .lane { stroke: #f2f2f2; stroke-width: 2; stroke-dasharray: 8 6; opacity: .5; }
    .feed { position: relative; flex: 1; min-width: 0; border-radius: 8px; overflow: hidden; background: linear-gradient(#6f8fa8 0 34%, #555a60 34%, #3c4046); }
    .feed .sc { position: absolute; inset: 0; transition: opacity .3s; }
    .feed .tag { position: absolute; left: 6px; top: 6px; padding: 3px 6px; border-radius: 4px; background: rgba(0,0,0,.55); }
    .gd path { fill: none; stroke-width: 3; stroke-linecap: round; }
    .bump { position: absolute; left: -10%; right: -10%; bottom: -26px; height: 44px; border-radius: 50%; background: linear-gradient(#2a2d31, #121315); }
    .side .curb { position: absolute; left: 0; right: 0; bottom: 30px; height: 10px; background: repeating-linear-gradient(90deg, #d0d0d0 0 18px, #9a9a9a 18px 36px); transform: skewX(-30deg); }
    .side .door { position: absolute; top: 0; bottom: 0; width: 30px; background: linear-gradient(90deg, #22252a, #3a3e44); }
    .keys { display: grid; grid-template-columns: repeat(4, 1fr) 40px; gap: 4px; margin-top: 6px; }
    button { height: 28px; border: 0; border-radius: 6px; background: #1c1e22; color: #c4c8ce; font: inherit; cursor: pointer; transition: background .15s, color .15s; display: grid; place-items: center; }
    button:hover { background: #262a2f; color: #fff; }
    button[aria-pressed="true"] { background: #4da3ff; color: #04121f; }
    button:focus-visible { outline: 2px solid #4da3ff; outline-offset: 2px; }
    button svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="stage">
      <div class="scr">
        <div class="bird"><svg viewBox="0 0 110 180" aria-hidden="true">
          <line class="lane" x1="8" y1="0" x2="8" y2="180"/><line class="lane" x1="102" y1="0" x2="102" y2="180"/>
          <path class="wg" d="${WEDGE.Rear}"/>
          <rect class="car" x="34" y="48" width="42" height="84" rx="13"/><rect class="gl" x="38" y="68" width="34" height="16" rx="4"/><rect class="gl" x="38" y="112" width="34" height="11" rx="4"/>
        </svg></div>
        <div class="feed"><div class="sc"></div><span class="tag">Rear</span></div>
      </div>
      <div class="keys">${VIEWS.map((v) => `<button class="vw" type="button" aria-pressed="${v === 'Rear'}">${v}</button>`).join('')}<button class="d3b" type="button" aria-pressed="false" aria-label="3D view"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M8 12a4 9 0 1 0 8 0a4 9 0 1 0 -8 0"/><path d="M3 12c0 2.21 4.03 4 9 4s9 -1.79 9 -4s-4.03 -4 -9 -4s-9 1.79 -9 4"/></svg></button></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), wg = root.querySelector('.wg'), sc = root.querySelector('.sc'), tag = root.querySelector('.tag'), vws = [...root.querySelectorAll('.vw')], d3 = root.querySelector('.d3b');
    const GUIDE = '<svg class="gd" viewBox="0 0 200 150" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><path stroke="#ff3b30" d="M40 130 52 112M160 130 148 112M52 112h12M148 112h-12"/><path stroke="#ffd400" d="M52 112 66 88M148 112 134 88M66 88h10M134 88h-10"/><path stroke="#35d05b" d="M66 88 80 64M134 88 120 64M80 64h40"/></svg>';
    const SCENES = {
      Front: `<div class="bump"></div>${GUIDE}`,
      Rear: `<div class="bump"></div>${GUIDE}`,
      Left: '<div class="side"><div class="curb"></div><div class="door" style="right:0"></div></div>',
      Right: '<div class="side"><div class="curb" style="transform:skewX(30deg)"></div><div class="door" style="left:0;transform:scaleX(-1)"></div></div>',
    };
    let t = 0;
    const pick = (v) => {
      vws.forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === v)));
      wg.setAttribute('d', WEDGE[v]); tag.textContent = v;
      sc.style.opacity = 0; clearTimeout(t); t = setTimeout(() => { sc.innerHTML = SCENES[v]; sc.style.opacity = 1; }, 120);
      sc.parentElement.style.background = v === 'Front' ? 'linear-gradient(#8fb0c8 0 40%, #5a5f66 40%, #3c4046)' : v === 'Rear' ? '' : 'linear-gradient(#4b5058, #34383d)';
    };
    vws.forEach((b) => b.addEventListener('click', () => pick(b.textContent)));
    d3.addEventListener('click', () => { const on = d3.getAttribute('aria-pressed') !== 'true'; d3.setAttribute('aria-pressed', String(on)); stage.classList.toggle('d3', on); });
    sc.innerHTML = SCENES.Rear;
    return () => clearTimeout(t);
  },
};
