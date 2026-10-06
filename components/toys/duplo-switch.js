const STRAIGHT = 'M14 112 L232 112';
const BRANCH = 'M14 112 L84 112 C146 112 150 42 232 42';

export default {
  id: 'ty2-duplo-switch',
  credit: 'LEGO DUPLO train switch track — flip the red points lever and the push-along engine takes the other branch',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 8px; border-radius: 12px; overflow: hidden; background: linear-gradient(#bde59a, #8fcf63); }
    .yard { position: relative; width: 246px; height: 156px; border-radius: 10px;
      background: radial-gradient(circle, #00a83a 0 4px, transparent 5px) 0 0 / 22px 22px, linear-gradient(#00852b, #00852b);
      box-shadow: inset 0 0 0 3px #006b23, 0 4px 0 #005a1d; }
    svg { position: absolute; inset: 0; }
    .bed { fill: none; stroke: #2e2f33; stroke-width: 26; stroke-linecap: butt; }
    .rail { fill: none; stroke: #4b4d52; stroke-width: 20; }
    .groove { fill: none; stroke: #222327; stroke-width: 2; }
    .route { fill: none; stroke: #6a6d75; stroke-width: 10; opacity: 0; transition: opacity .25s; }
    .yard:not(.on) .r0, .yard.on .r1 { opacity: 1; }
    .points { transform-box: view-box; transform-origin: 84px 112px; transition: transform .3s cubic-bezier(.3,1.6,.5,1); }
    .on .points { transform: rotate(-22deg); }
    .lever { position: absolute; left: 66px; top: 128px; width: 58px; height: 22px; border: 0; padding: 0; border-radius: 11px; cursor: pointer;
      background: #2e2f33; box-shadow: inset 0 2px 4px rgba(0,0,0,.6); }
    .knob { position: absolute; left: 3px; top: 2px; width: 26px; height: 18px; border-radius: 6px;
      background: radial-gradient(circle at 50% 40%, #d01012 0 4px, transparent 5px), linear-gradient(#ff4a43, #d01012 60%, #9c0a0c);
      box-shadow: 0 2px 0 #6f0708, inset 0 1px 0 rgba(255,255,255,.4); transition: transform .25s cubic-bezier(.3,1.6,.5,1); }
    .lever[aria-checked="true"] .knob { transform: translateX(26px); }
    .lever:hover .knob { filter: brightness(1.1); }
    .lever:focus-visible { outline: 3px solid #f8c400; outline-offset: 2px; }
    .engine { position: absolute; left: 0; top: 0; width: 34px; height: 22px; offset-path: path('${STRAIGHT}'); offset-distance: 4%; offset-rotate: auto; pointer-events: none; }
    .engine::before { content: ''; position: absolute; inset: 0; border-radius: 5px; background: linear-gradient(#ff4a43, #d01012 70%, #9c0a0c); box-shadow: 0 3px 4px rgba(0,0,0,.4); }
    .engine::after { content: ''; position: absolute; left: 4px; top: 4px; width: 14px; height: 14px; border-radius: 3px;
      background: radial-gradient(circle at 50% 50%, #1b1b1b 0 3px, transparent 4px) 22px 0 / 10px 14px no-repeat, linear-gradient(#ffe25a, #f8c400);
      box-shadow: 18px 3px 0 -3px #1b1b1b; }
  `,
  html: `
    <div class="stage"><div class="yard">
      <svg viewBox="0 0 246 156" aria-hidden="true">
        <path class="bed" d="${STRAIGHT}"/><path class="bed" d="${BRANCH}"/>
        <path class="rail" d="${STRAIGHT}"/><path class="rail" d="${BRANCH}"/>
        <path class="route r0" d="${STRAIGHT}"/><path class="route r1" d="${BRANCH}"/>
        <path class="groove" d="M14 105 L232 105 M14 119 L232 119"/>
        <path class="groove" d="M84 105 C140 105 144 35 232 35 M84 119 C150 119 156 49 232 49"/>
        <g class="points"><rect x="84" y="108" width="40" height="8" rx="3" fill="#f8c400"/></g>
      </svg>
      <div class="engine"></div>
      <button class="lever" type="button" role="switch" aria-checked="false" aria-label="track switch"><span class="knob"></span></button>
    </div></div>`,
  init(root) {
    const yard = root.querySelector('.yard'), lever = root.querySelector('.lever'), eng = root.querySelector('.engine');
    let anim = null;
    const run = (on) => {
      if (anim) anim.cancel();
      eng.style.offsetPath = `path('${on ? BRANCH : STRAIGHT}')`;
      anim = eng.animate([{ offsetDistance: '4%' }, { offsetDistance: '92%', offset: 0.8 }, { offsetDistance: '92%' }], { duration: 1600, easing: 'ease-in-out', fill: 'forwards' });
    };
    lever.addEventListener('click', () => {
      const on = lever.getAttribute('aria-checked') !== 'true';
      lever.setAttribute('aria-checked', String(on)); yard.classList.toggle('on', on); run(on);
    });
    return () => { if (anim) anim.cancel(); };
  },
};
