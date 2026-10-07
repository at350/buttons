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
    .lane { stroke: #f2f2f2; stroke-width: 2; stroke-dasharray: 8 6; opacity: .5; }
    .feed { position: relative; flex: 1; min-width: 0; border-radius: 8px; overflow: hidden; background: #2a2d31; }
    .feed .ph { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; filter: saturate(.85) contrast(1.08) brightness(.95); transform: scale(1.08); }
    .feed::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(120% 95% at 50% 45%, transparent 55%, rgba(0,0,0,.55)); }
    .feed .sc { position: absolute; inset: 0; transition: opacity .3s; }
    .feed .tag { z-index: 1; position: absolute; left: 6px; top: 6px; padding: 3px 6px; border-radius: 4px; background: rgba(0,0,0,.55); }
    .gd path { fill: none; stroke-width: 3; stroke-linecap: round; }
    .bump { position: absolute; left: -10%; right: -10%; bottom: -26px; height: 44px; border-radius: 50%; background: linear-gradient(#2a2d31, #121315); }
    .side .door { position: absolute; top: -12%; bottom: -12%; width: 34px; border-radius: 100% 0 0 100% / 50% 0 0 50%; background: linear-gradient(90deg, #f1f2f4, #c9cdd3 55%, #8d939b); box-shadow: -2px 0 8px rgba(0,0,0,.5); }
    .side .door::before { content: ''; position: absolute; left: 10px; top: 46%; width: 12px; height: 3px; border-radius: 2px; background: #6c727a; }
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
          <defs><linearGradient id="c3b" x1="0" x2="1"><stop offset="0" stop-color="#b9bec5"/><stop offset=".22" stop-color="#eef0f2"/><stop offset=".5" stop-color="#fbfbfc"/><stop offset=".78" stop-color="#eef0f2"/><stop offset="1" stop-color="#b9bec5"/></linearGradient><linearGradient id="c3g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b434d"/><stop offset="1" stop-color="#1a1e24"/></linearGradient></defs>
          <ellipse cx="55" cy="91" rx="30" ry="56" fill="#000" opacity=".35"/>
          <rect x="28.5" y="53" width="6" height="17" rx="2.5" fill="#15171a"/><rect x="75.5" y="53" width="6" height="17" rx="2.5" fill="#15171a"/><rect x="28.5" y="112" width="6" height="17" rx="2.5" fill="#15171a"/><rect x="75.5" y="112" width="6" height="17" rx="2.5" fill="#15171a"/>
          <path d="M31.5 70.5 25 68.5Q23.6 68.4 23.8 70.3L24.4 73Q24.7 74.4 26.2 74.1L31.6 73.4Z" fill="#d7dade"/><path d="M78.5 70.5 85 68.5Q86.4 68.4 86.2 70.3L85.6 73Q85.3 74.4 83.8 74.1L78.4 73.4Z" fill="#d7dade"/>
          <path d="M55 39C67 39 75.5 42.5 77.4 50.5L79.3 66C80.4 82 80.4 110 79.4 126C78.6 134.5 72.5 141 55 141S31.4 134.5 30.6 126C29.6 110 29.6 82 30.7 66L32.6 50.5C34.5 42.5 43 39 55 39Z" fill="url(#c3b)" stroke="#9aa0a8" stroke-width=".6"/>
          <path d="M36.5 44.5Q40 41.6 46 41.2L45 43.4Q40 44 37.6 46.6Z" fill="#fff"/><path d="M73.5 44.5Q70 41.6 64 41.2L65 43.4Q70 44 72.4 46.6Z" fill="#fff"/>
          <path d="M37.6 68.5C45 63.6 65 63.6 72.4 68.5L70.6 79.6C62.5 76.8 47.5 76.8 39.4 79.6Z" fill="url(#c3g)"/>
          <path d="M39.6 81.6C47.5 79 62.5 79 70.4 81.6L71 112C62.5 114.5 47.5 114.5 39 112Z" fill="#20252c"/><path d="M42 84C48 82.4 55 82 60 82.2L44 110Z" fill="#fff" opacity=".07"/>
          <path d="M39.4 115.2C47.5 117.4 62.5 117.4 70.6 115.2L72 124.5C63.5 128.6 46.5 128.6 38 124.5Z" fill="url(#c3g)"/>
          <path d="M33.4 134.6Q36 139 44 139.8L43 137.6Q37.4 137 35 133.2Z" fill="#e0262b"/><path d="M76.6 134.6Q74 139 66 139.8L67 137.6Q72.6 137 75 133.2Z" fill="#e0262b"/>
          <path d="M31.4 97H33.2M76.8 97H78.6" stroke="#9aa0a8" stroke-width=".7"/>
          </svg></div>
        <div class="feed"><div class="sc"></div><span class="tag">Rear</span></div>
      </div>
      <div class="keys">${VIEWS.map((v) => `<button class="vw" type="button" aria-pressed="${v === 'Rear'}">${v}</button>`).join('')}<button class="d3b" type="button" aria-pressed="false" aria-label="3D view"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M8 12a4 9 0 1 0 8 0a4 9 0 1 0 -8 0"/><path d="M3 12c0 2.21 4.03 4 9 4s9 -1.79 9 -4s-4.03 -4 -9 -4s-9 1.79 -9 4"/></svg></button></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), wg = root.querySelector('.wg'), sc = root.querySelector('.sc'), tag = root.querySelector('.tag'), vws = [...root.querySelectorAll('.vw')], d3 = root.querySelector('.d3b');
    const GUIDE = '<svg class="gd" viewBox="0 0 200 150" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><path stroke="#ff3b30" d="M40 130 52 112M160 130 148 112M52 112h12M148 112h-12"/><path stroke="#ffd400" d="M52 112 66 88M148 112 134 88M66 88h10M134 88h-10"/><path stroke="#35d05b" d="M66 88 80 64M134 88 120 64M80 64h40"/></svg>';
    const PH = (n) => `<img class="ph" src="assets/real/cam-${n}-garage.jpg" alt="" width="200" height="150">`;
    const SCENES = {
      Front: `${PH('front')}<div class="bump"></div>${GUIDE}`,
      Rear: `${PH('rear')}<div class="bump"></div>${GUIDE}`,
      Left: `${PH('left')}<div class="side"><div class="door" style="right:0"></div></div>`,
      Right: `${PH('right')}<div class="side"><div class="door" style="left:0;transform:scaleX(-1)"></div></div>`,
    };
    let t = 0;
    const pick = (v) => {
      vws.forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === v)));
      wg.setAttribute('d', WEDGE[v]); tag.textContent = v;
      sc.style.opacity = 0; clearTimeout(t); t = setTimeout(() => { sc.innerHTML = SCENES[v]; sc.style.opacity = 1; }, 120);
    };
    vws.forEach((b) => b.addEventListener('click', () => pick(b.textContent)));
    d3.addEventListener('click', () => { const on = d3.getAttribute('aria-pressed') !== 'true'; d3.setAttribute('aria-pressed', String(on)); stage.classList.toggle('d3', on); });
    sc.innerHTML = SCENES.Rear;
    return () => clearTimeout(t);
  },
};
