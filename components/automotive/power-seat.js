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
    .cush, .bk, .hr { fill: #6b5a4a; stroke: #8d7966; stroke-width: 1.2; }
    .stitch { fill: none; stroke: #3d3229; stroke-width: 1; stroke-dasharray: 2 2; }
    .post { stroke: #9a9a9a; stroke-width: 2.5; }
    .panel { position: relative; flex: 1; height: 146px; border-radius: 10px; background: linear-gradient(160deg, #2b2724, #120f0d); box-shadow: inset 0 1px 0 rgba(255,255,255,.08); }
    .sw { position: absolute; cursor: move; touch-action: none; background: linear-gradient(#5a5a5a, #2a2a2a 40%, #1c1c1c); box-shadow: 0 3px 0 #000, 0 4px 6px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.2); transition: transform .15s cubic-bezier(.3,1.5,.5,1); }
    .sw.hold { transition: none; }
    .sw:focus-visible, .mem:focus-visible { outline: 2px solid #4da3ff; outline-offset: 3px; }
    .cs { left: 22px; top: 86px; width: 92px; height: 24px; border-radius: 6px 12px 12px 8px; }
    .bs { left: 20px; top: 14px; width: 22px; height: 64px; border-radius: 8px 8px 6px 6px; transform-origin: 50% 100%; }
    .mems { position: absolute; right: 8px; top: 12px; display: grid; gap: 6px; }
    .mem { width: 28px; height: 22px; border: 0; border-radius: 5px; background: linear-gradient(#3e3e3e, #1b1b1b); box-shadow: 0 2px 0 #000, inset 0 1px 0 rgba(255,255,255,.15); color: #d0d0d0; font: 700 11px/1 Inter, system-ui, sans-serif; cursor: pointer; }
    .mem:active { transform: translateY(2px); box-shadow: 0 0 0 #000; }
    .mem.arm, .mem.saved { color: #ffb84d; text-shadow: 0 0 6px #ffb84d; }
  `,
  html: `
    <div class="stage">
      <div class="view">
        <svg viewBox="0 0 150 146" aria-hidden="true">
          <line class="rail" x1="14" y1="128" x2="136" y2="128"/>
          <g class="seat">
            <line class="post" x1="50" y1="126" x2="50" y2="104"/><line class="post" x1="104" y1="126" x2="104" y2="104"/>
            <g class="back"><rect class="bk" x="38" y="22" width="22" height="76" rx="9"/><path class="stitch" d="M44 30v60"/><rect class="hr" x="40" y="4" width="20" height="16" rx="6"/><line class="post" x1="46" y1="20" x2="46" y2="24"/></g>
            <rect class="cush" x="44" y="88" width="76" height="18" rx="8"/><path class="stitch" d="M54 93h58"/>
          </g>
        </svg>
      </div>
      <div class="panel">
        <div class="sw bs" tabindex="0" role="slider" aria-label="Backrest recline" aria-valuemin="-10" aria-valuemax="30" aria-valuenow="8"></div>
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
