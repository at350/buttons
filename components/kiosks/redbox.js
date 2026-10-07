export default {
  id: 'ks-redbox',
  credit: 'Redbox DVD rental kiosk — red cabinet, touchscreen carousel of new releases with ‹ › arrows, DVD / Blu-ray toggle and "Rent" that fills the cart',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 12px 12px; border-radius: 12px; background: linear-gradient(#e42222, #a8100f); box-shadow: inset 0 1px 0 rgba(255,255,255,.3); }
    .scr { width: 292px; border-radius: 6px; overflow: hidden; background: #121212; box-shadow: 0 0 0 5px #1a1a1a; font-family: Inter, system-ui, sans-serif; color: #fff; }
    .hd { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; font-size: 12px; font-weight: 800; }
    .hd .lg { color: #fff; background: #e42222; padding: 3px 7px; border-radius: 3px; letter-spacing: -.02em; font-size: 13px; }
    .cart { position: relative; display: flex; align-items: center; gap: 4px; font-weight: 600; color: #ccc; font-size: 11px; }
    .cart svg { width: 18px; height: 18px; }
    .cart b { position: absolute; right: -7px; top: -6px; min-width: 16px; height: 16px; border-radius: 8px; background: #e42222; color: #fff; font-size: 10px; display: grid; place-items: center; transform: scale(0); transition: transform .2s cubic-bezier(.3,1.6,.5,1); }
    .cart b.on { transform: scale(1); }
    .car { position: relative; display: flex; align-items: center; gap: 4px; padding: 0 4px; }
    .vp { flex: 1; overflow: hidden; }
    .track { display: flex; gap: 8px; padding: 8px 4px; transition: transform .35s cubic-bezier(.2,.8,.2,1); }
    .cv { flex: none; width: 70px; height: 104px; border: 0; padding: 6px; border-radius: 3px; cursor: pointer; display: flex; flex-direction: column; justify-content: flex-end; text-align: left; font: 800 11px/1.05 'Roboto Flex', Inter, sans-serif; font-stretch: 70%; letter-spacing: .01em; hyphens: manual; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.6); background: #222 center / cover no-repeat; box-shadow: 0 2px 6px rgba(0,0,0,.6); transition: transform .15s, box-shadow .15s; }
    .cv small { font-size: 7.5px; font-weight: 600; opacity: .85; }
    .cv:hover { transform: translateY(-2px); }
    .cv:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .cv[aria-pressed="true"] { box-shadow: 0 0 0 3px #e42222, 0 2px 8px rgba(0,0,0,.6); }
    .ar { width: 22px; height: 48px; flex: none; border: 0; border-radius: 4px; background: rgba(255,255,255,.1); color: #fff; cursor: pointer; display: grid; place-items: center; }
    .ar svg { width: 18px; height: 18px; }
    .ar.prev { order: -1; }
    .ar:hover { background: rgba(255,255,255,.2); } .ar:disabled { opacity: .25; cursor: default; }
    .ar:focus-visible { outline: 2px solid #fff; }
    .ft { display: flex; align-items: center; gap: 8px; padding: 8px 10px 10px; }
    .fmt { display: flex; border-radius: 15px; background: #2a2a2a; padding: 2px; }
    .fmt button { height: 26px; padding: 0 9px; border: 0; border-radius: 13px; background: none; color: #aaa; font: 700 10.5px/1 Inter, sans-serif; cursor: pointer; }
    .fmt button[aria-pressed="true"] { background: #fff; color: #111; }
    .fmt button:focus-visible { outline: 2px solid #e42222; }
    .rent { flex: 1; height: 34px; border: 0; border-radius: 17px; background: #e42222; color: #fff; font: 800 12px/1 Inter, sans-serif; cursor: pointer; white-space: nowrap; transition: filter .1s, transform .06s; }
    .rent:hover { filter: brightness(1.1); } .rent:active { transform: scale(.97); }
    .rent:disabled { background: #2a2a2a; color: #777; cursor: default; filter: none; }
    .rent:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="scr">
      <div class="hd"><span class="lg">redbox.</span><span class="cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/></svg>Cart<b>0</b></span></div>
      <div class="car"><div class="vp"><div class="track"></div></div><button class="ar prev" type="button" aria-label="Previous" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><button class="ar next" type="button" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button></div>
      <div class="ft"><div class="fmt"><button type="button" aria-pressed="true" data-p="2.25">DVD</button><button type="button" aria-pressed="false" data-p="2.75">Blu-ray</button></div><button class="rent" type="button" disabled>Rent · $2.25/night</button></div>
    </div></div>`,
  init(root) {
    const track = root.querySelector('.track'), prev = root.querySelector('.prev'), next = root.querySelector('.next'), rent = root.querySelector('.rent'), badge = root.querySelector('.cart b');
    const films = [['Dune: Part Two', 'PG-13', 'poster-dune-part-two.jpg'], ['Wonka', 'PG', 'poster-wonka.jpg'], ['Oppenheimer', 'R', 'poster-oppenheimer.jpg'], ['Barbie', 'PG-13', 'poster-barbie.jpg'], ['Top Gun: Maverick', 'PG-13', 'poster-top-gun-maverick.jpg'], ['Wicked', 'PG', 'poster-wicked.png'], ['Inside Out 2', 'PG', 'poster-inside-out-2.jpg']];
    let pos = 0, sel = null, price = 2.25, n = 0;
    const covers = films.map(([t, r, img]) => {
      const c = document.createElement('button'); c.type = 'button'; c.className = 'cv'; c.setAttribute('aria-pressed', 'false');
      c.style.backgroundImage = `linear-gradient(transparent 78%, rgba(0,0,0,.85)), url(assets/real/${img})`; c.setAttribute('aria-label', `${t}, rated ${r}`); c.innerHTML = `<small>${r} · NEW</small>`;
      c.addEventListener('click', () => { sel = sel === c ? null : c; covers.forEach((x) => x.setAttribute('aria-pressed', String(x === sel))); rent.disabled = !sel; });
      track.appendChild(c); return c;
    });
    const max = films.length - 3;
    const go = (d) => { pos = Math.max(0, Math.min(max, pos + d)); track.style.transform = `translateX(${-pos * 78}px)`; prev.disabled = pos === 0; next.disabled = pos === max; };
    prev.addEventListener('click', () => go(-1)); next.addEventListener('click', () => go(1));
    const fmts = root.querySelectorAll('.fmt button');
    fmts.forEach((f) => f.addEventListener('click', () => { fmts.forEach((x) => x.setAttribute('aria-pressed', String(x === f))); price = +f.dataset.p; rent.textContent = `Rent · $${price.toFixed(2)}/night`; }));
    rent.addEventListener('click', () => { if (!sel) return; badge.textContent = ++n; badge.classList.add('on'); sel.setAttribute('aria-pressed', 'false'); sel = null; rent.disabled = true; });
  },
};
