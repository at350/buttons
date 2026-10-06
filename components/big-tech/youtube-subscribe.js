// YouTube "Subscribe" → "Subscribed" (bell + chevron). Clicking "Subscribed" opens YouTube's notification menu
// (All / Personalized / None / Unsubscribe) as a data-open popover. An invisible copy of the subscribed state
// sits in the same grid cell, so the box is reserved for the wider state from the first paint.
const P = {
  all: 'M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z',
  personalized: 'M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z',
  none: 'M160-200v-80h80v-280q0-33 8.5-65t25.5-61l60 60q-7 16-10.5 32.5T320-560v280h248L56-792l56-56 736 736-56 56-146-144H160Zm560-154-80-80v-126q0-66-47-113t-113-47q-26 0-50 8t-44 24l-58-58q20-16 43-28t49-18v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v206Zm-276-50Zm36 324q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Zm33-481Z',
  unsub: 'M640-520v-80h240v80H640Zm-393-7q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-640Zm0 400Z',
  chev: 'M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z',
};
const ic = (k, cls = '') => `<svg class="${cls}" viewBox="0 -960 960 960" aria-hidden="true"><path d="${P[k]}"/></svg>`;
export default {
  id: 'bt-youtube-subscribe',
  credit: 'YouTube — "Subscribe" pill that becomes "Subscribed" with the bell and notification menu',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; display: grid; font: 500 14px/36px "Roboto Flex", Roboto, Arial, sans-serif; }
    .wrap > .yt, .wrap > .sizer { grid-area: 1 / 1; justify-self: start; }
    .sizer { visibility: hidden; pointer-events: none; }
    .yt {
      height: 36px; padding: 0 16px; border: 0; border-radius: 18px; background: #0f0f0f; color: #fff; cursor: pointer; white-space: nowrap;
      font: inherit; display: inline-flex; align-items: center; gap: 6px; -webkit-tap-highlight-color: transparent;
      transition: background-color .1s cubic-bezier(.05,0,0,1);
    }
    .yt:hover { background: #272727; }
    .yt:active { background: #3f3f3f; }
    .yt:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #065fd4; }
    svg { width: 24px; height: 24px; fill: currentColor; flex: none; display: block; }
    .yt .bell, .yt .chev, .yt .b { display: none; }
    .sub, .sizer { padding: 0 10px 0 6px; background: rgba(0,0,0,.05); color: #0f0f0f; }
    .yt.sub { padding: 0 10px 0 6px; background: rgba(0,0,0,.05); color: #0f0f0f; }
    .yt.sub:hover, .yt.sub[aria-expanded="true"] { background: rgba(0,0,0,.1); }
    .yt.sub .bell, .yt.sub .chev, .sizer .bell, .sizer .chev { display: block; }
    .yt.sub .b { display: inline; }
    .yt.sub .a { display: none; }
    .yt.sub .bell { animation: ring .9s cubic-bezier(.2,0,0,1); transform-origin: 50% 12%; }
    @keyframes ring { 0%,100% { transform: rotate(0); } 15% { transform: rotate(22deg); } 30% { transform: rotate(-18deg); } 45% { transform: rotate(12deg); } 60% { transform: rotate(-8deg); } 75% { transform: rotate(4deg); } }
    .bell svg { position: absolute; }
    .bell { position: relative; width: 24px; height: 24px; }
    .bell svg { visibility: hidden; }
    .bell[data-m="all"] .all, .bell[data-m="personalized"] .personalized, .bell[data-m="none"] .none { visibility: visible; }
    .menu {
      position: absolute; top: calc(100% + 4px); left: 0; z-index: 10; display: none; width: 200px; padding: 8px 0;
      background: #fff; border-radius: 12px; box-shadow: 0 4px 32px rgba(0,0,0,.1); font: 400 14px/20px "Roboto Flex", Roboto, Arial, sans-serif;
    }
    .yt[aria-expanded="true"] ~ .menu { display: block; }
    .it { display: flex; align-items: center; gap: 16px; width: 100%; height: 36px; padding: 0 16px; border: 0; background: none; color: #0f0f0f; font: inherit; cursor: pointer; text-align: left; }
    .it:hover, .it:focus-visible { background: rgba(0,0,0,.1); outline: none; }
  `,
  html: `
    <div class="wrap">
      <span class="yt sizer" aria-hidden="true"><span class="bell">${ic('all')}</span><span>Subscribed</span><span class="chev">${ic('chev')}</span></span>
      <button class="yt" type="button" aria-pressed="false" aria-haspopup="false">
        <span class="bell" data-m="personalized">${ic('all', 'all')}${ic('personalized', 'personalized')}${ic('none', 'none')}</span>
        <span class="a">Subscribe</span><span class="b">Subscribed</span>
        <span class="chev">${ic('chev')}</span>
      </button>
      <div class="menu" role="menu">
        <button class="it" type="button" role="menuitem" data-m="all">${ic('all')}All</button>
        <button class="it" type="button" role="menuitem" data-m="personalized">${ic('personalized')}Personalized</button>
        <button class="it" type="button" role="menuitem" data-m="none">${ic('none')}None</button>
        <button class="it" type="button" role="menuitem" data-m="unsub">${ic('unsub')}Unsubscribe</button>
      </div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap');
    const b = root.querySelector('button.yt');
    const bell = b.querySelector('.bell');
    const setOpen = (open) => { b.setAttribute('aria-expanded', String(open)); host?.toggleAttribute('data-open', open); };
    const setSub = (on) => {
      b.classList.toggle('sub', on); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-haspopup', String(on));
      if (!on) b.removeAttribute('aria-expanded');
    };
    b.addEventListener('click', () => {
      if (!b.classList.contains('sub')) { bell.dataset.m = 'personalized'; setSub(true); return; }
      setOpen(b.getAttribute('aria-expanded') !== 'true');
    });
    root.querySelectorAll('.it').forEach((it) => it.addEventListener('click', () => {
      setOpen(false);
      if (it.dataset.m === 'unsub') setSub(false); else bell.dataset.m = it.dataset.m;
      b.focus({ preventScroll: true });
    }));
    const onDoc = (e) => { if (!e.composedPath().includes(wrap)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape' && b.getAttribute('aria-expanded') === 'true') { setOpen(false); b.focus({ preventScroll: true }); } };
    document.addEventListener('pointerdown', onDoc);
    root.addEventListener('keydown', onKey);
    return () => document.removeEventListener('pointerdown', onDoc);
  },
};
