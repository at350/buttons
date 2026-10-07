export default {
  id: 'au-power-seat',
  credit: 'Power seat controls on the seat side — cushion-shaped switch (slide fore/aft, lift up/down), backrest-shaped switch (recline), plus M / 1 / 2 memory keys',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 10px; width: 320px; max-width: 100%; height: 170px; padding: 12px; border-radius: 12px; background: linear-gradient(#24211f, #141210); user-select: none; }
    .view { position: relative; flex: none; width: 150px; height: 146px; border-radius: 8px; background: radial-gradient(circle at 50% 30%, #2e2a27, #191614); overflow: hidden; }
    .view svg { width: 100%; height: 100%; }
    .rail { stroke: #4d4843; stroke-width: 4; stroke-linecap: round; }
    .seat { transition: transform .5s cubic-bezier(.3,1.2,.5,1); }
    .back { transform-origin: 52px 92px; transition: transform .5s cubic-bezier(.3,1.2,.5,1); }
    .live .seat, .live .back { transition: none; }
    .stitch { fill: none; stroke: #3d3229; stroke-width: 1; stroke-dasharray: 2 2; }
    .post { fill: none; stroke: #b9b9b9; stroke-width: 2; stroke-linecap: round; }
    .panel { position: relative; flex: 1; height: 146px; border-radius: 10px; background: linear-gradient(160deg, #2b2724, #120f0d); box-shadow: inset 0 1px 0 rgba(255,255,255,.08); }
    .sw { position: absolute; cursor: move; touch-action: none; background: repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 1px, transparent 1px 3px), linear-gradient(#eef0f2, #b6bac0 45%, #8b9097 70%, #c9ccd1); box-shadow: 0 3px 0 #2a2725, 0 5px 8px rgba(0,0,0,.65), inset 0 1px 0 #fff, inset 0 -1px 0 rgba(0,0,0,.25); transition: transform .15s cubic-bezier(.3,1.5,.5,1); }
    .sw.hold { transition: none; }
    .sw:focus-visible, .mem:focus-visible { outline: 2px solid #4da3ff; outline-offset: 3px; }
    .cs { left: 22px; top: 88px; width: 68px; height: 22px; border-radius: 8px 14px 12px 10px / 8px 9px 12px 12px; }
    .bs { left: 16px; top: 26px; width: 22px; height: 58px; border-radius: 9px 10px 7px 8px / 12px 12px 8px 8px; transform-origin: 50% 100%; }
    .hs { position: absolute; left: 15px; top: 8px; width: 22px; height: 14px; border-radius: 7px 8px 5px 5px; background: linear-gradient(#e6e8eb, #9ba0a6); box-shadow: 0 2px 0 #2a2725, 0 3px 5px rgba(0,0,0,.6), inset 0 1px 0 #fff; }
    .well { position: absolute; left: 8px; top: 2px; width: 90px; height: 116px; border-radius: 14px; background: linear-gradient(160deg, #1a1715, #0b0908); box-shadow: inset 0 2px 6px rgba(0,0,0,.8), 0 1px 0 rgba(255,255,255,.06); }
    .mems { position: absolute; right: 8px; top: 12px; display: grid; gap: 6px; }
    .mem { width: 28px; height: 22px; border: 0; border-radius: 5px; background: linear-gradient(#3e3e3e, #1b1b1b); box-shadow: 0 2px 0 #000, inset 0 1px 0 rgba(255,255,255,.15); color: #d0d0d0; font: 700 11px/1 Inter, system-ui, sans-serif; cursor: pointer; }
    .mem:active { transform: translateY(2px); box-shadow: 0 0 0 #000; }
    .mem.arm, .mem.saved { color: #ffb84d; text-shadow: 0 0 6px #ffb84d; }
  `,
  html: `
    <div class="stage">
      <div class="view">
        <svg viewBox="0 0 150 146" aria-hidden="true">
          <defs>
            <linearGradient id="au-ps-lea" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5b4a3c"/><stop offset=".5" stop-color="#8a735f"/><stop offset="1" stop-color="#5f4d3e"/></linearGradient>
            <linearGradient id="au-ps-cu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#937c67"/><stop offset="1" stop-color="#5a493b"/></linearGradient>
            <linearGradient id="au-ps-sh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f2b28"/><stop offset="1" stop-color="#171513"/></linearGradient>
          </defs>
          <path class="rail" d="M14 129H136"/><path d="M18 125H132" stroke="#2f2b28" stroke-width="5" stroke-linecap="round"/>
          <g class="seat">
            <path d="M56 106 61 125H101L107 106Z" fill="#26231f" stroke="#3b3632" stroke-width="1"/>
            <g class="back">
              <path class="post" d="M45 21.5 46 25M53 21 53.6 25"/>
              <path d="M40.4 94C36 80 34 60 35.6 41C36.4 31 39.6 24.6 47.6 23.4C56 22.2 60.4 26.6 60.4 34.8C60.4 52 58.4 70 60.2 89.6C60.6 95.6 56.6 98.4 50.4 98.4C44.6 98.4 41.4 97.2 40.4 94Z" fill="url(#au-ps-lea)" stroke="#a48c76" stroke-width="1"/>
              <path class="stitch" d="M47.6 31C46 48 45.8 70 47.4 92"/>
              <path d="M39.6 64C42 66 44 66.6 46.4 66.6" fill="none" stroke="#3d3229" stroke-width="1"/>
              <path d="M41.2 20.6C38.8 12.6 42 4.6 49.8 3.4C57 2.4 60.6 7.6 59.6 14.8C59 19 55.6 20.4 50.4 21Z" fill="url(#au-ps-lea)" stroke="#a48c76" stroke-width="1"/>
            </g>
            <path d="M43.6 92.6C43.6 86.4 49.4 84.2 60 84.2L107.6 86C116 86.6 121.2 88.2 122.2 93.2C123.2 99.4 119.2 104.2 112 104.2L52.4 106C46.4 106 43.6 100.6 43.6 92.6Z" fill="url(#au-ps-cu)" stroke="#a48c76" stroke-width="1"/>
            <path class="stitch" d="M52 90.6C70 89.8 96 90.2 116 91.6"/>
            <path d="M50 99.6 116.4 100.6C117 107.6 113 111.4 105 111.4L56.6 111.6C51.6 111.6 49.6 107 50 99.6Z" fill="url(#au-ps-sh)" stroke="#3b3632" stroke-width=".8"/>
            <path d="M62 105.4H86M90 105.4H96" stroke="#57514b" stroke-width="2.4" stroke-linecap="round"/>
          </g>
        </svg>
      </div>
      <div class="panel">
        <div class="well"></div><div class="hs"></div><div class="sw bs" tabindex="0" role="slider" aria-label="Backrest recline" aria-valuemin="-10" aria-valuemax="30" aria-valuenow="8"></div>
        <div class="sw cs" tabindex="0" role="slider" aria-label="Seat position" aria-valuemin="-14" aria-valuemax="18" aria-valuenow="0"></div>
        <div class="mems"><button class="mem" type="button" aria-pressed="false">M</button><button class="mem" type="button">1</button><button class="mem" type="button">2</button></div>
      </div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const view = $('.view'), seat = $('.seat'), back = $('.back'), cs = $('.cs'), bs = $('.bs'), mems = [...root.querySelectorAll('.mem')];
    const st = { x: 0, h: 0, r: 8 }, vel = { x: 0, h: 0, r: 0 }, slots = [{ x: -12, h: 8, r: 2 }, { x: 14, h: 0, r: 20 }];
    let raf = 0, armed = false;
    const paint = () => {
      seat.style.transform = `translate(${st.x}px, ${-st.h}px)`; back.style.transform = `rotate(${(-st.r * .8).toFixed(1)}deg)`;
      cs.setAttribute('aria-valuenow', Math.round(st.x)); bs.setAttribute('aria-valuenow', Math.round(st.r));
    };
    const loop = () => {
      st.x = Math.max(-14, Math.min(18, st.x + vel.x)); st.h = Math.max(0, Math.min(14, st.h + vel.h)); st.r = Math.max(-10, Math.min(30, st.r + vel.r));
      paint(); raf = vel.x || vel.h || vel.r ? requestAnimationFrame(loop) : 0;
    };
    const drive = (sw, axes) => {
      let x0 = 0, y0 = 0, on = false;
      sw.addEventListener('pointerdown', (e) => { on = true; x0 = e.clientX; y0 = e.clientY; sw.setPointerCapture(e.pointerId); sw.classList.add('hold'); view.classList.add('live'); });
      sw.addEventListener('pointermove', (e) => {
        if (!on) return;
        const dx = Math.max(-7, Math.min(7, e.clientX - x0)), dy = Math.max(-7, Math.min(7, e.clientY - y0));
        axes(dx, dy);
        if (!raf && (vel.x || vel.h || vel.r)) raf = requestAnimationFrame(loop);
      });
      const end = () => { on = false; sw.classList.remove('hold'); sw.style.transform = ''; vel.x = vel.h = vel.r = 0; view.classList.remove('live'); };
      sw.addEventListener('pointerup', end); sw.addEventListener('pointercancel', end);
    };
    drive(cs, (dx, dy) => {
      const hor = Math.abs(dx) >= Math.abs(dy);
      cs.style.transform = hor ? `translateX(${dx}px)` : `translateY(${dy}px)`;
      vel.x = hor && Math.abs(dx) > 2 ? Math.sign(dx) * .35 : 0; vel.h = !hor && Math.abs(dy) > 2 ? -Math.sign(dy) * .25 : 0;
    });
    drive(bs, (dx) => { bs.style.transform = `rotate(${dx * 2}deg)`; vel.r = Math.abs(dx) > 2 ? Math.sign(dx) * .4 : 0; });
    const key = (sw, map) => sw.addEventListener('keydown', (e) => { const f = map[e.key]; if (f) { e.preventDefault(); f(); paint(); } });
    key(cs, { ArrowLeft: () => (st.x = Math.max(-14, st.x - 2)), ArrowRight: () => (st.x = Math.min(18, st.x + 2)), ArrowUp: () => (st.h = Math.min(14, st.h + 2)), ArrowDown: () => (st.h = Math.max(0, st.h - 2)) });
    key(bs, { ArrowLeft: () => (st.r = Math.max(-10, st.r - 3)), ArrowRight: () => (st.r = Math.min(30, st.r + 3)) });
    mems[0].addEventListener('click', () => { armed = !armed; mems[0].classList.toggle('arm', armed); mems[0].setAttribute('aria-pressed', String(armed)); });
    mems.slice(1).forEach((m, i) => m.addEventListener('click', () => {
      if (armed) { slots[i] = { ...st }; armed = false; mems[0].classList.remove('arm'); mems[0].setAttribute('aria-pressed', 'false'); m.classList.add('saved'); setTimeout(() => m.classList.remove('saved'), 600); return; }
      Object.assign(st, slots[i]); paint();
    }));
    paint();
    return () => cancelAnimationFrame(raf);
  },
};
