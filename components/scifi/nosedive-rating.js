// Black Mirror "Nosedive" — the pastel social-rating app: Lacie's 4.2, five stars, flick a rating and watch the score tick.
export default {
  id: 'sf-nosedive-rating',
  credit: 'Black Mirror "Nosedive" (2016) — the pastel peer-rating app: hover the stars to aim, tap to rate Lacie, the glow rings out and her three-decimal score ticks toward the new average',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 240px; height: 262px; max-width: 100%; border-radius: 12px; overflow: hidden; display: grid; place-items: center; background: linear-gradient(160deg, #f9dccf, #f3c9cf 45%, #c9e8dc); font-family: 'DM Sans', system-ui, sans-serif; }
    .card { position: relative; width: 196px; padding: 18px 14px 16px; border-radius: 22px; text-align: center; color: #5d5a66;
      background: rgba(255,255,255,.62); box-shadow: 0 10px 30px rgba(190,130,140,.35), inset 0 1px 0 #fff; }
    .av { position: relative; width: 74px; height: 74px; margin: 0 auto; border-radius: 50%; background: radial-gradient(circle at 50% 38%, #f6cdb4 0 22%, transparent 23%), radial-gradient(ellipse at 50% 100%, #f6cdb4 0 38%, transparent 39%), linear-gradient(#e7b98c, #d79f73);
      box-shadow: 0 0 0 3px #fff, 0 0 0 5px rgba(255,255,255,.6); }
    .ring { position: absolute; inset: -6px; border-radius: 50%; border: 2px solid #fff; opacity: 0; }
    .ping .ring { animation: ring .9s cubic-bezier(.2,.7,.3,1); }
    @keyframes ring { from { opacity: .9; transform: scale(.9); } to { opacity: 0; transform: scale(1.5); } }
    .nm { margin-top: 8px; font-size: 12px; font-weight: 500; letter-spacing: .02em; }
    .sc { margin-top: 2px; font: 200 38px/1 'DM Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; color: #4b4856; letter-spacing: -.01em; }
    .stars { display: flex; justify-content: center; gap: 4px; margin-top: 10px; }
    .s { width: 30px; height: 30px; border: 0; padding: 0; background: none; cursor: pointer; color: #e9dde2; transition: color .12s, transform .15s cubic-bezier(.3,1.6,.5,1); }
    .s svg { width: 100%; height: 100%; fill: currentColor; filter: drop-shadow(0 1px 1px rgba(160,110,120,.25)); }
    .s.lit { color: #ffc96b; }
    .s.lit.mine { color: #ffb648; }
    .s:hover { transform: scale(1.12); }
    .s:focus-visible { outline: 2px solid #fff; outline-offset: 1px; border-radius: 50%; }
    .dl { position: absolute; right: 22px; top: 112px; font: 500 11px 'DM Sans', sans-serif; color: #e58a5c; opacity: 0; pointer-events: none; }
    .dl.dn { color: #9a8fb5; }
    .ping .dl { animation: dl 1.2s ease-out; }
    @keyframes dl { 0% { opacity: 0; transform: translateY(6px); } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(-14px); } }
    .stars { touch-action: none; }
    .glow .s.lit svg { filter: drop-shadow(0 0 6px #ffe1a0); }
  `,
  html: `<div class="stage"><div class="card"><div class="av"><span class="ring"></span></div><div class="nm">Lacie Pound</div><div class="sc">4.183</div><span class="dl"></span>
    <div class="stars" role="radiogroup" aria-label="Rate">${[1, 2, 3, 4, 5].map((n) => `<button class="s" type="button" role="radio" aria-checked="false" aria-label="${n} stars"><svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg></button>`).join('')}</div></div></div>`,
  init(root) {
    const card = root.querySelector('.card'), sc = root.querySelector('.sc'), ss = [...root.querySelectorAll('.s')];
    const dl = root.querySelector('.dl'), row = root.querySelector('.stars');
    let score = 4.183, votes = 214, mine = 0, tm = 0, to = 0, swipe = false;
    const lite = (n, m = false) => ss.forEach((s, i) => { s.classList.toggle('lit', i < n); s.classList.toggle('mine', m && i < n); });
    ss.forEach((s, i) => {
      s.addEventListener('pointerenter', () => lite(i + 1));
      s.addEventListener('focus', () => lite(i + 1));
      s.addEventListener('click', () => {
        const prev = mine; mine = i + 1; ss.forEach((x, j) => x.setAttribute('aria-checked', String(j === i)));
        const target = prev ? score + (mine - prev) / votes : (score * votes + mine) / (votes + 1); if (!prev) votes++;
        lite(mine, true); card.classList.remove('ping', 'glow'); void card.offsetWidth; card.classList.add('ping', 'glow');
        const delta = target - score; dl.textContent = `${delta >= 0 ? '+' : '−'}${Math.abs(delta).toFixed(3)}`; dl.classList.toggle('dn', delta < 0);
        clearInterval(tm); clearTimeout(to);
        tm = setInterval(() => { score += (target - score) * .25; if (Math.abs(target - score) < .0006) { score = target; clearInterval(tm); } sc.textContent = score.toFixed(3); }, 40);
        to = setTimeout(() => card.classList.remove('glow'), 900);
      });
    });
    const at = (e) => { const r = row.getBoundingClientRect(); return Math.max(1, Math.min(5, Math.ceil(((e.clientX - r.left) / r.width) * 5))); };
    row.addEventListener('pointerdown', () => { swipe = true; });
    row.addEventListener('pointermove', (e) => { if (swipe) lite(at(e)); });
    row.addEventListener('pointerup', (e) => { if (swipe && e.target === row) ss[at(e) - 1].click(); swipe = false; });
    ss.forEach((s, i) => s.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
      if (d && ss[i + d]) { e.preventDefault(); ss[i + d].focus(); }
    }));
    row.addEventListener('pointerleave', () => { swipe = false; lite(mine, true); });
    root.querySelector('.stars').addEventListener('focusout', () => lite(mine, true));
    return () => { clearInterval(tm); clearTimeout(to); };
  },
};
