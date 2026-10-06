function drag(el, onPos) {
  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    el.setPointerCapture(e.pointerId); el.classList.add('active'); onPos(e); e.preventDefault();
    const mv = (ev) => onPos(ev);
    const up = () => { el.classList.remove('active'); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
}

const ICONS = {
  off: 'M681-188q-17 12-35.5 22T607-148q-12 5-24.5 0T565-165q-5-11 .5-22t17.5-16q15-5 28.5-12t26.5-17L473-397v165q0 20-18.5 27.5T422-211L273-360H143q-13 0-21.5-8.5T113-390v-180q0-13 8.5-21.5T143-600h126L70-799q-9-9-8.5-21.5T71-842q9-9 21.5-9t21.5 9l721 721q9 9 9 21.5T835-78q-9 9-22 9t-22-9L681-188Zm92-293q0-93-52.5-168.5T583-759q-12-5-17-16t0-22q5-12 17.5-16.5t25.5.5q101 41 162.5 130.5T833-481q0 38-7.5 75T802-334q-8 17-19.5 20.5T760-315q-11-5-16.5-14.5t.5-20.5q15-30 22-63t7-68ZM576-628q38 23 57.5 63.5T653-480v15q0 7-2 15-2 10-11 13t-17-5l-61-61q-5-5-7-10t-2-11v-91q0-9 7.5-13.5t15.5.5Zm-196-57q-5-5-5-11t5-11l42-42q14-14 32.5-6.5T473-728v100q0 10-9.5 13.5T447-618l-67-67Z',
  mute: 'M440-360H310q-13 0-21.5-8.5T280-390v-180q0-13 8.5-21.5T310-600h130l149-149q14-14 32.5-6.5T640-728v496q0 20-18.5 27.5T589-211L440-360Z',
  down: 'M360-360H230q-13 0-21.5-8.5T200-390v-180q0-13 8.5-21.5T230-600h130l149-149q14-14 32.5-6.5T560-728v496q0 20-18.5 27.5T509-211L360-360Zm380-120q0 52-26 94t-73 64q-8 4-14.5-1t-6.5-13v-289q0-8 6.5-13t14.5-1q47 22 73 65t26 94Z',
  up: 'M780-481q0-94-52.5-169T590-759q-12-5-17-16t0-22q5-12 17.5-16.5t25.5.5q101 41 162.5 131T840-481q0 111-61.5 201T616-149q-13 5-25.5.5T573-165q-5-11 0-22t17-16q85-34 137.5-109T780-481ZM280-360H150q-13 0-21.5-8.5T120-390v-180q0-13 8.5-21.5T150-600h130l149-149q14-14 32.5-6.5T480-728v496q0 20-18.5 27.5T429-211L280-360Zm380-120q0 52-26 94t-73 64q-8 4-14.5-1t-6.5-13v-289q0-8 6.5-13t14.5-1q47 22 73 65t26 94Z',
};

// iOS 16+/17 volume HUD: the slim frosted capsule that appears beside the volume buttons. At rest it is a 12pt sliver;
// touching it springs it open to ~48pt (iOS spring cubic-bezier(.32,.72,0,1)) and reveals the speaker glyph at its foot,
// which drops waves as the level falls and slashes at zero. White fill rises from the bottom.
export default {
  id: 'in-volume-vertical',
  credit: 'Apple iOS 17 volume HUD — slim frosted capsule that springs wide when touched, white level, speaker glyph loses waves',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; width: 104px; height: 212px; border-radius: 12px; overflow: hidden;
      background: #8a7a68 url(assets/tall/02.webp) 40% center / cover;
    }
    .sl {
      position: absolute; left: 16px; top: 24px; width: 12px; height: 164px; border-radius: 6px; overflow: hidden; cursor: pointer;
      background: rgba(60,60,67,.42); -webkit-backdrop-filter: blur(24px) saturate(1.8); backdrop-filter: blur(24px) saturate(1.8);
      touch-action: none; user-select: none; outline: 0;
      transition: width .45s cubic-bezier(.32,.72,0,1), border-radius .45s cubic-bezier(.32,.72,0,1), left .45s cubic-bezier(.32,.72,0,1);
    }
    .sl:hover, .sl.active, .sl:focus-visible { width: 48px; border-radius: 16px; }
    .sl:focus-visible { box-shadow: 0 0 0 2px rgba(255,255,255,.9); }
    .fill { position: absolute; left: 0; right: 0; bottom: 0; height: var(--p, 50%); background: #fff; transition: height .12s linear; }
    .sl.active .fill { transition: none; }
    .ic { position: absolute; left: 0; right: 0; bottom: 12px; display: grid; place-items: center; opacity: 0; transform: scale(.6); transition: opacity .2s, transform .35s cubic-bezier(.32,.72,0,1); }
    .sl:hover .ic, .sl.active .ic, .sl:focus-visible .ic { opacity: 1; transform: none; }
    .ic svg { width: 22px; height: 22px; fill: #8e8e93; }
    .sl.low .ic svg { fill: #fff; }
  `,
  html: `<div class="stage">
    <div class="sl" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-orientation="vertical" aria-label="Volume" style="--p:50%">
      <div class="fill"></div>
      <span class="ic"><svg viewBox="0 -960 960 960"><path d="${ICONS.up}"/></svg></span>
    </div>
  </div>`,
  init(root) {
    const sl = root.querySelector('.sl'), path = root.querySelector('.ic path');
    let v = 50;
    const set = (n) => {
      v = Math.max(0, Math.min(100, Math.round(n)));
      sl.style.setProperty('--p', v + '%'); sl.setAttribute('aria-valuenow', v);
      path.setAttribute('d', ICONS[v === 0 ? 'off' : v < 34 ? 'mute' : v < 67 ? 'down' : 'up']);
      sl.classList.toggle('low', v < 12);
    };
    set(50);
    drag(sl, (e) => { const r = sl.getBoundingClientRect(); set((1 - (e.clientY - r.top) / r.height) * 100); });
    sl.addEventListener('keydown', (e) => {
      const d = { ArrowUp: 6.25, ArrowRight: 6.25, ArrowDown: -6.25, ArrowLeft: -6.25 }[e.key];
      if (d) { e.preventDefault(); set(v + d); }
    });
  },
};
