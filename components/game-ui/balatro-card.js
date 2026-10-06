export default {
  id: 'gm-balatro-card',
  credit: 'LocalThunk Balatro — a pixel Joker card that tilts toward the cursor with a holographic shine; click to select (it lifts and the chip glows)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #2b4b3f; background-image: repeating-linear-gradient(45deg, rgba(0,0,0,.08) 0 6px, transparent 6px 12px); padding: 20px 36px; border-radius: 12px; perspective: 500px; display: flex; align-items: flex-end; gap: 10px; }
    .card { position: relative; width: 84px; height: 116px; border: none; padding: 0; cursor: pointer; background: #f6efe0; border-radius: 6px; transform-style: preserve-3d; transition: transform .12s ease-out, box-shadow .12s;
      box-shadow: 0 3px 0 #b7b0a0, 0 7px 10px rgba(0,0,0,.45); image-rendering: pixelated; overflow: hidden; }
    .card.sel { transform: translateY(-16px) !important; box-shadow: 0 3px 0 #b7b0a0, 0 20px 18px rgba(0,0,0,.5), 0 0 0 3px #ff4c40; }
    .card:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
    .face { position: absolute; inset: 6px; border: 3px solid #1d1d2b; border-radius: 3px; background: linear-gradient(180deg, #e3b341, #c7472f); shape-rendering: crispEdges; }
    .face svg { width: 100%; height: 100%; shape-rendering: crispEdges; }
    .holo { position: absolute; inset: 0; background: linear-gradient(115deg, transparent 20%, rgba(255,0,128,.35) 35%, rgba(0,255,200,.35) 45%, rgba(255,255,0,.35) 55%, transparent 70%); background-size: 250% 250%; background-position: var(--hx, 100%) 0; mix-blend-mode: screen; opacity: 0; transition: opacity .2s; pointer-events: none; }
    .card:hover .holo, .card.sel .holo { opacity: 1; }
    .chip { position: absolute; right: -8px; top: -8px; width: 26px; height: 26px; border-radius: 50%; background: #1e88e5; border: 3px dashed #fff; color: #fff; font: 700 11px 'JetBrains Mono', ui-monospace, monospace; display: grid; place-items: center; box-shadow: 0 2px 0 #0d47a1; transition: transform .2s, box-shadow .2s; }
    .card.sel ~ .chip, .wrap:hover .chip { transform: scale(1.15); box-shadow: 0 2px 0 #0d47a1, 0 0 12px #64b5f6; }
    .wrap { position: relative; }
    .mult { background: #ff4c40; color: #fff; border: none; cursor: pointer; font: 700 12px 'JetBrains Mono', ui-monospace, monospace; padding: 6px 10px; border-radius: 4px; box-shadow: 0 3px 0 #a52a20; margin-bottom: 4px; }
    .mult:active { transform: translateY(2px); box-shadow: 0 1px 0 #a52a20; }
    .mult:focus-visible { outline: 2px solid #fff; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <button class="card" type="button" aria-pressed="false" aria-label="Joker">
          <span class="face"><svg viewBox="0 0 24 34"><rect x="4" y="6" width="16" height="22" fill="#f6efe0"/><rect x="7" y="9" width="3" height="3" fill="#1d1d2b"/><rect x="14" y="9" width="3" height="3" fill="#1d1d2b"/><rect x="8" y="17" width="8" height="2" fill="#c7472f"/><rect x="7" y="15" width="2" height="2" fill="#c7472f"/><rect x="15" y="15" width="2" height="2" fill="#c7472f"/><rect x="2" y="2" width="4" height="4" fill="#2b9b7a"/><rect x="18" y="2" width="4" height="4" fill="#c7472f"/><rect x="10" y="0" width="4" height="4" fill="#e3b341"/><rect x="5" y="4" width="14" height="3" fill="#2b4b3f"/></svg></span>
          <span class="holo"></span>
        </button>
        <span class="chip">+4</span>
      </div>
      <button class="mult" type="button">x3 Mult</button>
    </div>`,
  init(root) {
    const c = root.querySelector('.card'), holo = root.querySelector('.holo'), mult = root.querySelector('.mult'); let m = 3;
    c.addEventListener('pointermove', (e) => { if (c.classList.contains('sel')) return; const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = 'rotateY(' + (x * 24) + 'deg) rotateX(' + (-y * 24) + 'deg)'; holo.style.setProperty('--hx', (100 - (x + .5) * 100) + '%'); });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    c.addEventListener('click', () => { const on = c.classList.toggle('sel'); c.setAttribute('aria-pressed', String(on)); c.style.transform = ''; });
    mult.addEventListener('click', () => { m = m >= 12 ? 3 : m + 3; mult.textContent = 'x' + m + ' Mult'; });
  },
};
