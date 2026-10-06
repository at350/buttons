// Portal 2 — the pedestal button in a test chamber: press it, the indicator dots run blue→orange to the door, which irises open; the timer ticks back.
const DOTS = 8;
export default {
  id: 'sf-aperture-push',
  credit: 'Valve Portal 2 — Aperture Science pedestal button: press the red dome, the dotted indicator line runs from blue to orange, the checkmark sign flips and the chamber door opens until the timer ticks it shut',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; height: 200px; max-width: 100%; border-radius: 12px; overflow: hidden;
      background: linear-gradient(transparent 0 70%, #8b9093 70% 71%, #b9bec0 71%), repeating-linear-gradient(90deg, transparent 0 59px, rgba(0,0,0,.08) 59px 60px), repeating-linear-gradient(0deg, #e6e9ea 0 34px, #d3d7d9 34px 35px); }
    .ped { position: absolute; left: 34px; bottom: 26px; width: 56px; display: grid; justify-items: center; }
    .cap { position: relative; width: 56px; height: 30px; border-radius: 6px 6px 3px 3px; background: linear-gradient(#fbfbfb, #c9cdcf); box-shadow: 0 2px 0 #7f8487; }
    .btn { position: absolute; left: 9px; top: -9px; width: 38px; height: 22px; border: 0; padding: 0; cursor: pointer; border-radius: 50% 50% 40% 40% / 70% 70% 30% 30%;
      background: radial-gradient(ellipse at 40% 25%, #ff8a7a, #e0261b 45%, #9a120c); box-shadow: 0 3px 0 #6d0a06, 0 4px 3px rgba(0,0,0,.3); transition: transform .08s, box-shadow .08s; }
    .btn:hover { filter: brightness(1.08); }
    .btn:active, .btn[aria-pressed="true"] { transform: translateY(4px); box-shadow: 0 0 0 #6d0a06, 0 1px 2px rgba(0,0,0,.3); }
    .btn:focus-visible { outline: 2px solid #2aa3ff; outline-offset: 4px; }
    .stem { width: 14px; height: 50px; background: linear-gradient(90deg, #4a4f52, #9aa0a3 40%, #3a3e41); }
    .base { width: 44px; height: 8px; border-radius: 4px 4px 0 0; background: linear-gradient(#e9ecee, #a7acaf); }
    .dots { position: absolute; left: 90px; bottom: 30px; display: flex; gap: 9px; }
    .dots i { width: 7px; height: 7px; border-radius: 1px; background: #2aa3ff; box-shadow: 0 0 6px #2aa3ff; transition: background .12s, box-shadow .12s; }
    .dots i.on { background: #ff9a00; box-shadow: 0 0 7px #ff9a00; }
    .sign { position: absolute; right: 74px; top: 40px; width: 26px; height: 26px; border-radius: 3px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.25); display: grid; place-items: center; }
    .sign svg { width: 18px; height: 18px; fill: none; stroke: #2aa3ff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .open .sign svg { stroke: #ff9a00; }
    .sign .ck, .open .sign .x { display: none; } .open .sign .ck { display: block; }
    .door { position: absolute; right: 16px; bottom: 60px; width: 52px; height: 72px; border-radius: 26px 26px 4px 4px; overflow: hidden; background: #0d0f10; box-shadow: 0 0 0 4px #9aa0a3, 0 0 0 5px #6b7073; }
    .door i { position: absolute; top: 0; bottom: 0; width: 50%; background: linear-gradient(90deg, #f1f3f4, #c3c8ca); transition: transform .45s cubic-bezier(.6,0,.2,1); }
    .door i:first-child { left: 0; border-right: 1px solid #8b9093; } .door i:last-child { right: 0; }
    .open .door i:first-child { transform: translateX(-100%); } .open .door i:last-child { transform: translateX(100%); }
    .door::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 70%, rgba(255,255,255,.18), transparent 60%); }
    .logo { position: absolute; left: 16px; top: 14px; width: 26px; height: 26px; opacity: .55; }
  `,
  html: `<div class="stage"><svg class="logo" viewBox="-12 -12 24 24">${Array.from({ length: 8 }, (_, i) => `<path d="M2.5 -10.5 L8.2 -6.2 L3.3 -3.1 Z" fill="#3a3e41" transform="rotate(${i * 45})"/>`).join('')}</svg>
    <div class="ped"><div class="cap"><button class="btn" type="button" aria-pressed="false" aria-label="Pedestal button"></button></div><div class="stem"></div><div class="base"></div></div>
    <div class="dots">${'<i></i>'.repeat(DOTS)}</div>
    <div class="sign"><svg viewBox="0 0 24 24"><path class="x" d="M6 6l12 12M18 6L6 18"/><path class="ck" d="M4 12l5 5L20 6"/></svg></div>
    <div class="door"><i></i><i></i></div></div>`,
  init(root) {
    const st = root.querySelector('.stage'), b = root.querySelector('.btn'), dots = [...root.querySelectorAll('.dots i')];
    let tms = [];
    const clear = () => { tms.forEach(clearTimeout); tms = []; };
    const press = () => {
      clear(); b.setAttribute('aria-pressed', 'true');
      dots.forEach((d, i) => tms.push(setTimeout(() => d.classList.add('on'), 40 + i * 45)));
      tms.push(setTimeout(() => st.classList.add('open'), 40 + DOTS * 45));
      tms.push(setTimeout(() => b.setAttribute('aria-pressed', 'false'), 260));
      dots.forEach((d, i) => tms.push(setTimeout(() => d.classList.remove('on'), 1600 + (DOTS - i) * 380)));
      tms.push(setTimeout(() => st.classList.remove('open'), 1600 + (DOTS + 1) * 380));
    };
    b.addEventListener('click', press);
    return clear;
  },
};
