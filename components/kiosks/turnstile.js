export default {
  id: 'ks-turnstile',
  credit: 'London Underground ticket gate (Cubic) — touch the yellow reader: the obey sign turns to a green arrow and the red paddles swing open; "Seek assistance" when the balance runs out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; height: 212px; border-radius: 12px; overflow: hidden; font-family: Inter, system-ui, sans-serif;
      background: linear-gradient(#e9e6dd 0 46%, #cfcabd 46% 47%, #7d7a74 47%, #55534f); }
    .stage::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 46%; background: repeating-linear-gradient(90deg, transparent 0 23px, rgba(0,0,0,.06) 23px 24px), repeating-linear-gradient(transparent 0 11px, rgba(0,0,0,.06) 11px 12px); }
    .floor { position: absolute; left: 0; right: 0; bottom: 0; height: 53%; background: linear-gradient(#6e6b65, #3f3d3a); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
    .far { position: absolute; left: 110px; width: 80px; top: 74px; height: 36px; background: linear-gradient(#c9c5bb, #a29e95); box-shadow: inset 0 -3px 0 rgba(0,0,0,.15); }
    /* cabinets: end face + stainless top in perspective */
    .cab { position: absolute; bottom: 14px; }
    .cab .top { position: absolute; left: 0; right: 0; top: 0; height: 26px; background: linear-gradient(#f4f5f6, #b9bec4 70%, #9aa0a7); clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%); }
    .cab .face { position: absolute; left: 0; right: 0; top: 26px; bottom: 0; border-radius: 0 0 3px 3px; background: linear-gradient(90deg, #8d939a, #d7dbdf 40%, #c3c8cd 60%, #7f858c); box-shadow: inset 0 2px 0 rgba(255,255,255,.5), 0 6px 10px rgba(0,0,0,.4); }
    .cab .face::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: #2b2c2e; border-radius: 0 0 3px 3px; }
    .l { left: 22px; width: 72px; height: 134px; }
    .r { right: 18px; width: 96px; height: 146px; }
    .grille { position: absolute; left: 14px; right: 14px; top: 30px; height: 40px; border-radius: 3px; background: repeating-linear-gradient(#5a5f65 0 2px, #9ca2a8 2px 5px); opacity: .55; }
    .sign { position: absolute; left: 50%; top: 6px; width: 44px; height: 40px; margin-left: -22px; border-radius: 4px; background: #060607; box-shadow: inset 0 0 0 2px #2a2c30; display: grid; place-items: center; }
    .sign svg { grid-area: 1 / 1; width: 30px; height: 30px; transition: opacity .12s; }
    .sign .go { color: #2bd94b; filter: drop-shadow(0 0 4px rgba(43,217,75,.85)); opacity: 0; }
    .sign .no { color: #ff2a1f; filter: drop-shadow(0 0 4px rgba(255,42,31,.85)); }
    .stage.go .sign .go { opacity: 1; } .stage.go .sign .no { opacity: 0; }
    .lcd { position: absolute; left: 10px; right: 10px; top: 54px; height: 46px; padding: 5px 6px; border-radius: 3px; background: #08090b; box-shadow: inset 0 0 0 2px #2a2d33;
      color: #ffb000; font: 600 8.5px/1.25 'IBM Plex Mono', ui-monospace, monospace; white-space: nowrap; overflow: hidden; }
    .lcd b { display: block; font-size: 12px; font-variant-numeric: tabular-nums; }
    .stage.no .lcd { color: #ff4b3e; }
    .rdr { position: absolute; left: 18px; top: -10px; width: 60px; height: 34px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; z-index: 2;
      background: radial-gradient(ellipse at 50% 35%, #fff09a, #ffd200 55%, #c99a00); box-shadow: 0 0 0 3px #2d2f33, 0 4px 0 3px #1c1d20, 0 6px 8px rgba(0,0,0,.4); display: grid; place-items: center; color: #1a1a1a; transition: transform .08s; -webkit-tap-highlight-color: transparent; }
    .rdr svg { width: 34px; height: 22px; }
    .rdr:hover { filter: brightness(1.06); }
    .rdr:active { transform: translateY(2px); }
    .rdr:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
    /* paddles */
    .aisle { position: absolute; left: 94px; right: 114px; bottom: 44px; height: 70px; perspective: 260px; }
    .pad { position: absolute; top: 0; width: 50%; height: 100%; background: linear-gradient(#ff3b30, #dc241f 40%, #b51a14); box-shadow: inset 0 2px 0 rgba(255,255,255,.35), inset 0 -3px 0 rgba(0,0,0,.2);
      transition: transform .5s cubic-bezier(.3,1.2,.5,1); }
    .pad::after { content: ''; position: absolute; top: 8px; bottom: 8px; width: 3px; border-radius: 2px; background: #1b1b1b; }
    .pad.a { left: 0; border-radius: 4px 14px 6px 4px; transform-origin: 0 50%; } .pad.a::after { right: 0; }
    .pad.b { right: 0; border-radius: 14px 4px 4px 6px; transform-origin: 100% 50%; } .pad.b::after { left: 0; }
    .stage.go .pad.a { transform: rotateY(84deg); } .stage.go .pad.b { transform: rotateY(-84deg); }
  `,
  html: `
    <div class="stage">
      <div class="floor"></div><div class="far"></div>
      <div class="aisle" aria-hidden="true"><div class="pad a"></div><div class="pad b"></div></div>
      <div class="cab l" aria-hidden="true"><div class="top"></div><div class="face"><div class="grille"></div></div></div>
      <div class="cab r"><div class="top"></div>
          <button class="rdr" type="button" aria-label="Touch in"><svg viewBox="0 0 24 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M7 5.2a6 6 0 0 1 0 5.6"/><path d="M10 3.6a9.4 9.4 0 0 1 0 8.8"/><path d="M13 2a12.8 12.8 0 0 1 0 12"/><path d="M16 .6a16 16 0 0 1 0 14.8"/></svg></button>
        <div class="face">
          <div class="sign" aria-hidden="true">
            <svg class="no" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-6 8.5h12v3H6z" fill-rule="evenodd"/></svg>
            <svg class="go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
          </div>
          <div class="lcd" aria-live="polite"><span class="l1">Touch in</span><b class="l2">£8.70</b><span class="l3">Balance</span></div>
        </div>
      </div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), l1 = root.querySelector('.l1'), l2 = root.querySelector('.l2'), l3 = root.querySelector('.l3');
    let bal = 8.7, t;
    root.querySelector('.rdr').addEventListener('click', () => {
      clearTimeout(t); st.classList.remove('go', 'no');
      if (bal < 2.9) { st.classList.add('no'); l1.textContent = 'Seek'; l2.textContent = 'assistance'; l3.textContent = 'Top up: £' + bal.toFixed(2); bal += 20; return; }
      bal -= 2.9; st.classList.add('go'); l1.textContent = 'Fare £2.90'; l2.textContent = '£' + bal.toFixed(2); l3.textContent = 'Balance';
      t = setTimeout(() => { st.classList.remove('go'); l1.textContent = 'Touch in'; l3.textContent = 'Balance'; }, 2600);
    });
    return () => clearTimeout(t);
  },
};
