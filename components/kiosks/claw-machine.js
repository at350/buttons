export default {
  id: 'ks-claw-machine',
  credit: 'Arcade claw crane — ball-top joystick steers the gantry, the DROP button lowers the three-prong claw into the plush pile; carry one to the chute to win',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; padding: 10px 12px 14px; border-radius: 12px;
      background: linear-gradient(90deg, #b3124f, #ff4f97 18%, #ff2f84 50%, #ff4f97 82%, #b3124f); box-shadow: inset 0 1px 0 rgba(255,255,255,.4); font-family: Inter, system-ui, sans-serif; }
    .bulbs { display: flex; justify-content: space-between; width: 232px; height: 12px; padding: 0 4px; margin-bottom: 8px; }
    .bulbs i { width: 8px; height: 8px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #fff, #ffe46b 45%, #e8a400); box-shadow: 0 0 6px 1px rgba(255,214,80,.75); }
    .bulbs i:nth-child(even) { background: radial-gradient(circle at 40% 35%, #fff4cc, #f0c040 50%, #a77400); box-shadow: none; opacity: .75; }
    .stage:hover .bulbs i { animation: chase .5s steps(1) infinite; }
    .stage:hover .bulbs i:nth-child(even) { animation-delay: -.25s; }
    @keyframes chase { 50% { opacity: .35; box-shadow: none; } }
    .frame { padding: 6px; border-radius: 8px; background: linear-gradient(#e9edf1, #a9b0b8 50%, #e2e6ea); box-shadow: 0 2px 4px rgba(80,0,30,.4); }
    .win { position: relative; width: 232px; height: 190px; border-radius: 3px; overflow: hidden;
      background: radial-gradient(ellipse 90% 60% at 50% 0%, #fff6fb, #f7d4e6 45%, #d79bc0 100%); box-shadow: inset 0 0 0 1px rgba(0,0,0,.25), inset 0 -18px 24px rgba(90,20,60,.25); }
    .win::before { content: ''; position: absolute; left: 8px; right: 8px; top: 0; height: 5px; border-radius: 0 0 4px 4px; background: linear-gradient(#fff, #fff7d6); box-shadow: 0 0 14px 6px rgba(255,250,220,.85); z-index: 1; }
    .glass { position: absolute; inset: 0; z-index: 6; pointer-events: none; background: linear-gradient(115deg, rgba(255,255,255,.32) 0 12%, transparent 12% 22%, rgba(255,255,255,.14) 22% 25%, transparent 25%); }
    .rail { position: absolute; left: 0; right: 0; top: 10px; height: 6px; z-index: 3; background: linear-gradient(#f3f5f7, #8c939b 60%, #5d646c); box-shadow: 0 2px 2px rgba(0,0,0,.25); }
    .gan { position: absolute; left: 0; top: 7px; width: 40px; z-index: 4; display: flex; flex-direction: column; align-items: center; }
    .gan.glide { transition: transform 1s cubic-bezier(.4,0,.3,1); }
    .trol { width: 34px; height: 13px; border-radius: 3px; background: linear-gradient(#4a4f56, #24272b); box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 2px 3px rgba(0,0,0,.35); position: relative; }
    .trol::before, .trol::after { content: ''; position: absolute; top: -3px; width: 7px; height: 7px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #ddd, #555); }
    .trol::before { left: 4px; } .trol::after { right: 4px; }
    .cable { width: 2px; height: 8px; background: linear-gradient(90deg, #333, #9aa0a6, #333); transition: height .9s ease-in-out; }
    .claw { position: relative; width: 40px; height: 36px; margin-top: -1px; }
    .claw svg { position: absolute; inset: 0; width: 40px; height: 36px; overflow: visible; z-index: 1; }
    .claw .p { fill: none; stroke: url(#cm-chrome); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; transition: transform .3s cubic-bezier(.3,0,.3,1); }
    .claw .pl { transform-origin: 14px 13px; } .claw .pr { transform-origin: 26px 13px; } .claw .pc { transform-origin: 20px 13px; }
    .shut .claw .pl { transform: rotate(-24deg); } .shut .claw .pr { transform: rotate(24deg); } .shut .claw .pc { transform: scaleY(.9); }
    .toy { position: absolute; width: 40px; height: 44px; }
    .toy svg { display: block; width: 40px; height: 44px; overflow: visible; filter: drop-shadow(0 2px 1.5px rgba(70,10,40,.35)); }
    .back .toy { filter: brightness(.86) saturate(.9); }
    .front { position: absolute; inset: 0; z-index: 2; }
    .front .toy { transition: transform .45s cubic-bezier(.5,0,.75,0), opacity .3s; }
    .claw .toy { left: 0; top: 14px; z-index: 0; transition: transform .45s cubic-bezier(.5,0,.75,0), opacity .25s .2s; }
    .chute { position: absolute; left: 4px; bottom: 0; width: 54px; height: 62px; z-index: 5; border: 2px solid rgba(255,255,255,.85); border-bottom: 0; border-radius: 3px 3px 0 0;
      background: linear-gradient(rgba(255,255,255,.38), rgba(255,255,255,.18)); box-shadow: inset 0 0 0 1px rgba(150,40,90,.25); }
    .chute::after { content: ''; position: absolute; left: 4px; right: 4px; bottom: 0; height: 10px; border-radius: 50% 50% 0 0 / 100% 100% 0 0; background: #2a0e1d; box-shadow: inset 0 3px 4px #000; }
    .ctl { display: flex; align-items: center; justify-content: space-between; width: 244px; margin-top: 10px; padding: 10px 16px 12px; border-radius: 10px;
      background: linear-gradient(#26262b, #141417); box-shadow: inset 0 2px 4px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.3); }
    .stick { order: 1; position: relative; width: 52px; height: 60px; border: 0; padding: 0; background: none; cursor: grab; touch-action: none; }
    .stick:focus-visible { outline: 2px solid #ffd500; outline-offset: 2px; border-radius: 8px; }
    .base { position: absolute; left: 50%; bottom: 2px; width: 42px; height: 12px; margin-left: -21px; border-radius: 50%; background: radial-gradient(ellipse at 50% 40%, #3a3a3f, #0a0a0b 70%); box-shadow: 0 1px 0 rgba(255,255,255,.15); }
    .shaft { position: absolute; left: 50%; bottom: 8px; width: 7px; height: 30px; margin-left: -3.5px; border-radius: 3px; transform-origin: 50% 100%; background: linear-gradient(90deg, #6b6f75, #f1f3f5 45%, #5a5e63); transition: transform .12s; }
    .ball { position: absolute; left: 50%; top: -22px; width: 28px; height: 28px; margin-left: -14px; border-radius: 50%; background: radial-gradient(circle at 36% 30%, #ffb0b0, #ff2a2a 28%, #c4000a 62%, #6d0006); box-shadow: 0 2px 3px rgba(0,0,0,.5); }
    .led { order: 2; position: relative; padding: 5px 8px 4px; border-radius: 4px; background: #120304; box-shadow: inset 0 0 0 1px #3a0b0e, inset 0 2px 4px #000; text-align: center; }
    .led small { display: block; font: 700 7px/1 Inter, sans-serif; letter-spacing: .18em; color: #c9a3ad; margin-bottom: 3px; }
    .led span { position: relative; display: block; font: 700 22px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .04em; }
    .led span::before { content: '88'; position: absolute; inset: 0; color: rgba(255,50,40,.12); }
    .led b { position: relative; color: #ff3b2a; text-shadow: 0 0 6px rgba(255,59,42,.7); font-weight: 700; }
    .drop { order: 3; width: 66px; height: 66px; flex: none; border: 0; border-radius: 50%; cursor: pointer; font: 800 11px/1 Unbounded, Inter, sans-serif; letter-spacing: .02em; color: #4a3200;
      background: radial-gradient(circle at 50% 38%, #fff6a8, #ffd400 50%, #d79f00); box-shadow: 0 0 0 4px #0e0e10, 0 0 0 6px #6a6d72, 0 0 0 7px #2a2b2e, 0 5px 0 7px #1a1a1c, 0 0 18px 4px rgba(255,212,0,.25); transition: transform .05s; }
    .drop:hover { filter: brightness(1.06); }
    .drop:active { transform: translateY(3px); }
    .drop:disabled { filter: brightness(.6) saturate(.7); cursor: default; }
    .drop:focus-visible { outline: 2px solid #fff; outline-offset: 9px; }
  `,
  html: `
    <div class="stage">
      <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
        <radialGradient id="cm-sh" cx=".36" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".26"/></radialGradient>
        <linearGradient id="cm-chrome" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#6f767e"/><stop offset=".45" stop-color="#f4f6f8"/><stop offset="1" stop-color="#7d848c"/></linearGradient>
      </defs></svg>
      <div class="bulbs" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div class="frame"><div class="win">
        <div class="rail"></div>
        <div class="back"></div><div class="front"></div>
        <div class="gan"><div class="trol"></div><div class="cable"></div><div class="claw"><svg viewBox="0 0 40 36" aria-hidden="true">
          <rect x="13" y="0" width="14" height="10" rx="2" fill="url(#cm-chrome)"/><rect x="10" y="9" width="20" height="5" rx="2.5" fill="#4b5158"/><circle cx="20" cy="11.5" r="1.4" fill="#c7ccd1"/>
          <path class="p pc" d="M20 14 C21 20 21 26 19.5 31 Q19 33.5 21.5 33"/>
          <path class="p pl" d="M14 13 C6 15 2.5 22 5 29.5 Q7 34 11.5 32.5"/>
          <path class="p pr" d="M26 13 C34 15 37.5 22 35 29.5 Q33 34 28.5 32.5"/>
        </svg></div></div>
        <div class="chute"></div>
        <div class="glass"></div>
      </div></div>
      <div class="ctl">
        <button class="drop" type="button">DROP</button>
        <div class="led"><small>WIN</small><span><b class="w">00</b></span></div>
        <button class="stick" type="button" aria-label="Joystick (left / right)"><span class="base"></span><span class="shaft"><span class="ball" data-overhang></span></span></button>
      </div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), gan = root.querySelector('.gan'), cable = root.querySelector('.cable'), claw = root.querySelector('.claw'), drop = root.querySelector('.drop');
    const stick = root.querySelector('.stick'), shaft = root.querySelector('.shaft'), back = root.querySelector('.back'), front = root.querySelector('.front'), w = root.querySelector('.w');
    const SH = 'fill="url(#cm-sh)"';
    const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#1b1310"/><circle cx="${x + .6}" cy="${y - .7}" r=".6" fill="#fff"/>`;
    const body = (c, l) => `<ellipse cx="9" cy="31" rx="4.2" ry="6.5" transform="rotate(28 9 31)" fill="${c}"/><ellipse cx="31" cy="31" rx="4.2" ry="6.5" transform="rotate(-28 31 31)" fill="${c}"/>
      <ellipse cx="20" cy="33" rx="11" ry="10" fill="${c}"/><ellipse cx="20" cy="33" rx="11" ry="10" ${SH}/><ellipse cx="20" cy="34.5" rx="6" ry="6.2" fill="${l}"/>
      <ellipse cx="12.5" cy="40.5" rx="5" ry="3.4" fill="${c}"/><ellipse cx="27.5" cy="40.5" rx="5" ry="3.4" fill="${c}"/><ellipse cx="12.5" cy="40.9" rx="2.8" ry="2" fill="${l}"/><ellipse cx="27.5" cy="40.9" rx="2.8" ry="2" fill="${l}"/>`;
    const head = (c, cy = 15, rx = 12.5, ry = 11) => `<ellipse cx="20" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}"/><ellipse cx="20" cy="${cy}" rx="${rx}" ry="${ry}" ${SH}/>`;
    const P = {
      bear: (c, l, a) => `${body(c, l)}<circle cx="9" cy="6.5" r="5" fill="${c}"/><circle cx="31" cy="6.5" r="5" fill="${c}"/><circle cx="9" cy="6.9" r="2.7" fill="${l}"/><circle cx="31" cy="6.9" r="2.7" fill="${l}"/>${head(c)}
        <ellipse cx="20" cy="19.4" rx="5.6" ry="4.3" fill="${l}"/><ellipse cx="20" cy="17.6" rx="2.4" ry="1.7" fill="#2a1a12"/><path d="M20 19.2v1.5M17.7 21.2q2.3 1.6 4.6 0" stroke="#2a1a12" stroke-width=".9" fill="none" stroke-linecap="round"/>${eye(14.4, 13.4)}${eye(25.6, 13.4)}
        <path d="M20 25.8l-5-2.8v5.6zM20 25.8l5-2.8v5.6z" fill="${a}"/><circle cx="20" cy="25.8" r="1.6" fill="${a}"/>`,
      bunny: (c, l, a) => `${body(c, l)}<ellipse cx="14" cy="7" rx="3.8" ry="9" transform="rotate(-12 14 7)" fill="${c}"/><ellipse cx="26" cy="7" rx="3.8" ry="9" transform="rotate(12 26 7)" fill="${c}"/>
        <ellipse cx="14" cy="7.5" rx="1.8" ry="6.4" transform="rotate(-12 14 7.5)" fill="${a}"/><ellipse cx="26" cy="7.5" rx="1.8" ry="6.4" transform="rotate(12 26 7.5)" fill="${a}"/>${head(c, 17, 11.5, 10)}
        ${eye(15, 15.5)}${eye(25, 15.5)}<path d="M18.6 19.2h2.8l-1.4 1.6z" fill="${a}"/><path d="M20 20.8v1M18.2 22.4q1.8 1 3.6 0" stroke="#6b4a4a" stroke-width=".8" fill="none" stroke-linecap="round"/>
        <circle cx="12.5" cy="20" r="2.2" fill="${a}" opacity=".45"/><circle cx="27.5" cy="20" r="2.2" fill="${a}" opacity=".45"/>`,
      frog: (c, l, a) => `${body(c, l)}${head(c, 18, 13.5, 9.5)}<circle cx="12" cy="10.5" r="5.2" fill="${c}"/><circle cx="28" cy="10.5" r="5.2" fill="${c}"/>
        <circle cx="12" cy="10.2" r="3.4" fill="#fff"/><circle cx="28" cy="10.2" r="3.4" fill="#fff"/><circle cx="12.6" cy="10.6" r="1.8" fill="#1b1310"/><circle cx="27.4" cy="10.6" r="1.8" fill="#1b1310"/>
        <path d="M13 20q7 5 14 0" stroke="#24461b" stroke-width="1.1" fill="none" stroke-linecap="round"/><circle cx="11" cy="20" r="2.2" fill="${a}" opacity=".55"/><circle cx="29" cy="20" r="2.2" fill="${a}" opacity=".55"/>`,
      penguin: (c, l, a) => `<ellipse cx="7.5" cy="28" rx="3.6" ry="8" transform="rotate(22 7.5 28)" fill="${c}"/><ellipse cx="32.5" cy="28" rx="3.6" ry="8" transform="rotate(-22 32.5 28)" fill="${c}"/>
        <ellipse cx="20" cy="24" rx="13" ry="18" fill="${c}"/><ellipse cx="20" cy="24" rx="13" ry="18" ${SH}/><path d="M20 12c-6 0-9 3-9 7 0 2 1 3 1 5 0 6 2 15 8 15s8-9 8-15c0-2 1-3 1-5 0-4-3-7-9-7z" fill="${l}"/>
        ${eye(15.5, 16.5)}${eye(24.5, 16.5)}<path d="M17.4 20.2h5.2l-2.6 3.2z" fill="${a}"/><ellipse cx="14" cy="41.5" rx="4.6" ry="2.4" fill="${a}"/><ellipse cx="26" cy="41.5" rx="4.6" ry="2.4" fill="${a}"/>
        <circle cx="13" cy="21" r="1.8" fill="#ff8fa3" opacity=".5"/><circle cx="27" cy="21" r="1.8" fill="#ff8fa3" opacity=".5"/>`,
      cat: (c, l, a) => `${body(c, l)}<path d="M8.5 11 9 1.5l8 5.5zM31.5 11 31 1.5l-8 5.5z" fill="${c}"/><path d="M10.3 8.5l.3-4.4 3.6 2.6zM29.7 8.5l-.3-4.4-3.6 2.6z" fill="${a}"/>${head(c, 15.5, 12.5, 10.5)}
        <path d="M17 6.5l1 3M20 6l0 3.2M23 6.5l-1 3" stroke="${l}" stroke-width="1.2" stroke-linecap="round"/>${eye(14.6, 14.6)}${eye(25.4, 14.6)}<path d="M18.8 18.4h2.4L20 19.8z" fill="#c45a6a"/>
        <path d="M20 19.8v.9M17.6 21.2q1.2 1 2.4 0 1.2 1 2.4 0" stroke="#5a3a2a" stroke-width=".8" fill="none" stroke-linecap="round"/><path d="M6 17.5l7 1M6 20.5l7-.5M34 17.5l-7 1M34 20.5l-7-.5" stroke="#5a3a2a" stroke-width=".5" opacity=".7"/>`,
      chick: (c, l, a) => `<ellipse cx="20" cy="27" rx="15" ry="15.5" fill="${c}"/><ellipse cx="20" cy="27" rx="15" ry="15.5" ${SH}/><ellipse cx="8" cy="30" rx="4" ry="6.5" transform="rotate(25 8 30)" fill="${l}"/><ellipse cx="32" cy="30" rx="4" ry="6.5" transform="rotate(-25 32 30)" fill="${l}"/>
        <path d="M18 12.5c0-3 1-5 3-6-1 2 0 3 1.5 3.5-2 0-3 1-3 2.5z" fill="${c}"/>${eye(14.8, 22)}${eye(25.2, 22)}<path d="M17 25h6l-3 3.4z" fill="${a}"/><ellipse cx="14" cy="42" rx="3.6" ry="1.8" fill="${a}"/><ellipse cx="26" cy="42" rx="3.6" ry="1.8" fill="${a}"/>
        <circle cx="12" cy="26" r="2" fill="#ff8fa3" opacity=".55"/><circle cx="28" cy="26" r="2" fill="#ff8fa3" opacity=".55"/>`,
    };
    const svg = (k, c, l, a) => `<svg viewBox="0 0 40 44" aria-hidden="true">${P[k](c, l, a)}</svg>`;
    const mk = (parent, k, cols, x, y, s = 1) => { const d = document.createElement('div'); d.className = 'toy'; d.style.left = x + 'px'; d.style.top = y + 'px'; if (s !== 1) d.style.transform = `scale(${s})`; d.innerHTML = svg(k, ...cols); parent.appendChild(d); return d; };
    const C = { brown: ['#a8703f', '#ecd0a6', '#e0314b'], white: ['#f6f2ec', '#fffdf9', '#f5a3b8'], green: ['#62b94a', '#cdeba4', '#ff8fa3'], navy: ['#2c3444', '#f7f5f0', '#ff9f1c'], ginger: ['#f19a3e', '#fde7c8', '#f5a3b8'], yellow: ['#ffd23f', '#ffe995', '#ff8a1c'], pink: ['#f58fb4', '#ffe1ec', '#7b4bd6'], blue: ['#7cb7f0', '#e3f0fd', '#ff5c8a'] };
    // the heap: two rows behind (decor), four grabbable plush in front
    [['chick', C.yellow, 54, 104, .9], ['bear', C.pink, 86, 98, .92], ['cat', C.white, 120, 100, .9], ['frog', C.green, 152, 98, .92], ['bunny', C.blue, 186, 96, .92], ['penguin', C.navy, 200, 112, .9]].forEach(([k, c, x, y, s]) => mk(back, k, c, x, y, s));
    [['bunny', C.white, 66, 120, .96], ['bear', C.ginger, 102, 118, .96], ['chick', C.yellow, 138, 120, .95], ['cat', C.ginger, 172, 118, .96]].forEach(([k, c, x, y, s]) => mk(back, k, c, x, y, s));
    const xs = [78, 116, 154, 192];
    const toys = [['bear', C.brown], ['frog', C.green], ['penguin', C.navy], ['bunny', C.pink]].map(([k, c], i) => ({ d: mk(front, k, c, xs[i] - 20, 144), x: xs[i], k, c, won: false }));
    let x = 96, dir = 0, raf = 0, last = 0, busy = false, won = 0, timers = [];
    const place = (anim) => { gan.classList.toggle('glide', anim); gan.style.transform = `translateX(${x}px)`; };
    place(false);
    const loop = (ts) => { if (last) { x = Math.max(8, Math.min(186, x + dir * (ts - last) * 0.09)); place(false); } last = ts; raf = requestAnimationFrame(loop); };
    const move = (d) => { if (busy) return; dir = d; shaft.style.transform = d ? `rotate(${d * 22}deg)` : ''; cancelAnimationFrame(raf); raf = 0; last = 0; if (d) raf = requestAnimationFrame(loop); };
    stick.addEventListener('pointerdown', (e) => { stick.setPointerCapture(e.pointerId); const r = stick.getBoundingClientRect(); move(e.clientX < r.left + r.width / 2 ? -1 : 1); });
    stick.addEventListener('pointermove', (e) => { if (!dir) return; const r = stick.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2); if (Math.abs(dx) > 4) move(dx < 0 ? -1 : 1); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => stick.addEventListener(ev, () => move(0)));
    stick.addEventListener('keydown', (e) => { const d = { ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (d && dir !== d) { e.preventDefault(); move(d); } });
    stick.addEventListener('keyup', () => move(0)); stick.addEventListener('blur', () => move(0));
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    drop.addEventListener('click', () => {
      if (busy) return; move(0); busy = true; drop.disabled = true;
      const cx = x + 20, hit = toys.find((t) => !t.won && Math.abs(t.x - cx) < 13);
      cable.style.height = '104px';
      at(950, () => st.classList.add('shut'));
      at(1250, () => {
        if (hit) { const dx = hit.x - cx; hit.won = true; hit.d.remove(); hit.g = mk(claw, hit.k, hit.c, dx, 14); claw.insertBefore(hit.g, claw.firstChild); }
        cable.style.height = '8px';
      });
      at(2200, () => { x = 8; place(true); });
      at(3250, () => {
        st.classList.remove('shut');
        if (hit) { hit.g.style.transform = 'translateY(70px)'; hit.g.style.opacity = '0'; at(450, () => { hit.g.remove(); w.textContent = String(++won).padStart(2, '0'); }); }
      });
      at(3800, () => {
        busy = false; drop.disabled = false;
        if (toys.every((t) => t.won)) toys.forEach((t) => { t.won = false; t.d.style.transition = 'none'; t.d.style.transform = 'translateY(-60px)'; t.d.style.opacity = '0'; front.appendChild(t.d); void t.d.offsetWidth; t.d.style.transition = ''; t.d.style.transform = ''; t.d.style.opacity = ''; });
      });
    });
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  },
};
