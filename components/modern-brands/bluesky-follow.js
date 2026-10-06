export default {
  id: 'mb-bluesky-follow',
  credit: 'Bluesky — profile row (avatar, display name, handle), the blue "+ Follow" pill that settles to grey "Following", and the pink like heart that pops',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 14px 16px; border-radius: 12px; background: #fff; border: 1px solid #e6ebf0; display: flex; align-items: center; gap: 12px;
      font: 600 14px/1 Inter, -apple-system, system-ui, sans-serif; color: #0b0f14; letter-spacing: -.01em; }
    .av { display: block; width: 40px; height: 40px; border-radius: 50%; object-fit: cover; background: #e6ebf0; flex: none; }
    .who { display: grid; gap: 4px; min-width: 0; margin-right: 6px; }
    .who small { color: #6f869f; font-weight: 400; font-size: 13px; }
    .fl { display: grid; height: 33px; padding: 0 14px 0 11px; border-radius: 999px; border: 0; background: #0085ff; color: #fff; cursor: pointer; font: inherit; font-size: 13px;
      transition: background .15s, transform .15s ease-out; -webkit-tap-highlight-color: transparent; }
    .fl > span { grid-area: 1 / 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px; white-space: nowrap; }
    .fl svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .fl .b { visibility: hidden; }
    .fl:hover { background: #0072dc; }
    .fl:active { transform: scale(.97); }
    .fl:focus-visible, .lk:focus-visible { outline: 2px solid #0085ff; outline-offset: 2px; }
    .fl[aria-pressed="true"] { background: #eef1f5; color: #42576c; }
    .fl[aria-pressed="true"]:hover { background: #e2e7ee; }
    .fl[aria-pressed="true"] .a { visibility: hidden; } .fl[aria-pressed="true"] .b { visibility: visible; }
    .lk { position: relative; height: 33px; padding: 0 6px; border-radius: 999px; border: 0; background: transparent; color: #6f869f; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;
      font: 400 13px/1 Inter, system-ui, sans-serif; -webkit-tap-highlight-color: transparent; transition: background .15s, color .15s; }
    .lk:hover { background: #fdf2f8; }
    .lk svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; overflow: visible; }
    .lk .n { display: inline-block; min-width: 2ch; font-variant-numeric: tabular-nums; text-align: left; }
    .lk[aria-pressed="true"] { color: #ec4899; }
    .lk[aria-pressed="true"] svg { fill: #ec4899; stroke: #ec4899; }
    .lk.pop svg { animation: pop .45s cubic-bezier(.2,1.6,.4,1); }
    @keyframes pop { 0% { transform: scale(.6); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
    .lk i { position: absolute; left: 15px; top: 50%; width: 4px; height: 4px; margin: -2px; border-radius: 50%; background: #ec4899; opacity: 0; pointer-events: none; }
    .lk.pop i { animation: fly .55s cubic-bezier(.2,.8,.2,1) forwards; }
    .lk i:nth-of-type(2) { --r: 60deg; } .lk i:nth-of-type(3) { --r: 120deg; } .lk i:nth-of-type(4) { --r: 180deg; } .lk i:nth-of-type(5) { --r: 240deg; } .lk i:nth-of-type(6) { --r: 300deg; }
    @keyframes fly { 0% { opacity: 1; transform: rotate(var(--r, 0deg)) translateY(-6px); } 100% { opacity: 0; transform: rotate(var(--r, 0deg)) translateY(-15px) scale(.4); } }
  `,
  html: `
    <div class="stage">
      <img class="av" src="assets/portraits/women-26.jpg" alt="" width="40" height="40">
      <span class="who">Priya Nair<small>@priya.bsky.social</small></span>
      <button class="fl" type="button" aria-pressed="false"><span class="a"><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg>Follow</span><span class="b"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Following</span></button>
      <button class="lk" type="button" aria-pressed="false" aria-label="Like"><svg viewBox="0 0 24 24"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg><span class="n">42</span><i></i><i></i><i></i><i></i><i></i><i></i></button>
    </div>`,
  init(root) {
    const fl = root.querySelector('.fl'), lk = root.querySelector('.lk'), n = lk.querySelector('.n');
    fl.addEventListener('click', () => fl.setAttribute('aria-pressed', String(fl.getAttribute('aria-pressed') !== 'true')));
    lk.addEventListener('click', () => {
      const on = lk.getAttribute('aria-pressed') !== 'true';
      lk.setAttribute('aria-pressed', String(on)); n.textContent = String(+n.textContent + (on ? 1 : -1));
      lk.classList.remove('pop'); if (on) { void lk.offsetWidth; lk.classList.add('pop'); }
    });
  },
};
