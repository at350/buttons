// TRON: Legacy (2010) — identity disc. Hover and the edge light chases around; click to pull it off your back and arm it; pick your side.
export default {
  id: 'sf-tron-disc',
  credit: 'TRON: Legacy (2010) — identity disc (Joseph Kosinski / Bradley "GMUNK" Munkowitz era Grid): edge-lit black disc on the Grid floor; click to arm it (rings light, it spins up), switch between user cyan and Clu orange',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { --c: #7df9ff; position: relative; width: 240px; height: 230px; max-width: 100%; border-radius: 12px; overflow: hidden; background: #000; display: grid; justify-items: center; align-content: start; padding-top: 18px; }
    .stage.clu { --c: #ff9a1f; }
    .floor { position: absolute; left: -50%; right: -50%; bottom: -10px; height: 120px; transform: perspective(160px) rotateX(58deg); transform-origin: 50% 100%;
      background: linear-gradient(transparent 0 92%, color-mix(in srgb, var(--c) 45%, transparent) 92%) 0 0 / 100% 24px, linear-gradient(90deg, transparent 0 94%, color-mix(in srgb, var(--c) 45%, transparent) 94%) 0 0 / 24px 100%;
      mask-image: linear-gradient(transparent, #000 70%); -webkit-mask-image: linear-gradient(transparent, #000 70%); opacity: .55; transition: background .4s; }
    .disc { position: relative; width: 150px; height: 150px; border-radius: 50%; overflow: hidden; border: 0; padding: 0; cursor: pointer; background: radial-gradient(circle, #050505 0 18%, #151718 19% 22%, #050505 23% 60%, #101213 61% 63%, #050505 64%);
      box-shadow: 0 0 0 2px #1a1c1d, 0 0 0 4px color-mix(in srgb, var(--c) 30%, #000), 0 0 10px color-mix(in srgb, var(--c) 35%, transparent); transition: box-shadow .3s, transform .5s cubic-bezier(.2,.9,.3,1.2); }
    .ring { position: absolute; inset: 4px; border-radius: 50%; border: 3px solid color-mix(in srgb, var(--c) 30%, #000); transition: border-color .3s, box-shadow .3s; }
    .seg { position: absolute; inset: 22px; border-radius: 50%; background: repeating-conic-gradient(color-mix(in srgb, var(--c) 18%, #000) 0 22deg, transparent 22deg 30deg);
      mask: radial-gradient(circle, transparent 0 58%, #000 59% 66%, transparent 67%); -webkit-mask: radial-gradient(circle, transparent 0 58%, #000 59% 66%, transparent 67%); transition: background .3s; }
    .chase { position: absolute; inset: 0; border-radius: 50%; opacity: 0; background: conic-gradient(var(--c) 0 40deg, transparent 90deg 360deg);
      mask: radial-gradient(circle, transparent 0 68.5%, #000 69.5% 72%, transparent 73%); -webkit-mask: radial-gradient(circle, transparent 0 68.5%, #000 69.5% 72%, transparent 73%); transition: opacity .2s; }
    .hub { position: absolute; inset: 62px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--c) 30%, #000) 0 30%, #0b0c0d 35%); box-shadow: 0 0 0 1px #222; }
    .disc:hover .chase, .disc:focus-visible .chase { opacity: 1; animation: sp 1.1s linear infinite; }
    @keyframes sp { to { transform: rotate(360deg); } }
    .disc[aria-pressed="true"] { transform: scale(1.04) rotate(720deg); box-shadow: 0 0 0 2px #1a1c1d, 0 0 0 4px var(--c), 0 0 24px var(--c), 0 0 60px color-mix(in srgb, var(--c) 40%, transparent); }
    .disc[aria-pressed="true"] .ring { border-color: var(--c); box-shadow: 0 0 10px var(--c), inset 0 0 10px var(--c); }
    .disc[aria-pressed="true"] .seg { background: repeating-conic-gradient(var(--c) 0 22deg, transparent 22deg 30deg); }
    .disc[aria-pressed="true"] .hub { background: radial-gradient(circle, #fff 0 12%, var(--c) 30%, #0b0c0d 36%); }
    .disc:focus-visible { outline: 1px solid var(--c); outline-offset: 6px; }
    .derez .disc { animation: dz .45s steps(1); }
    @keyframes dz { 0%, 40%, 80% { opacity: .25; filter: brightness(2); } 20%, 60%, 100% { opacity: 1; filter: none; } }
    .cyc { position: absolute; left: 0; bottom: 30px; width: 100%; height: 22px; pointer-events: none; }
    .cyc .bike { position: absolute; left: 0; top: 0; width: 46px; height: 18px; transform: translateX(-60px); }
    .cyc .bike path { fill: #000; stroke: var(--c); stroke-width: 1.4; filter: drop-shadow(0 0 3px var(--c)); }
    .cyc .wall { position: absolute; left: 0; top: 12px; height: 4px; width: 0; background: var(--c); box-shadow: 0 0 8px var(--c); opacity: .85; }
    .run .cyc .bike { animation: ride 1.3s cubic-bezier(.5,0,.6,1) forwards; }
    .run .cyc .wall { animation: wall 1.3s cubic-bezier(.5,0,.6,1) forwards, fade 1.6s .9s forwards; }
    @keyframes ride { to { transform: translateX(260px); } }
    @keyframes wall { to { width: 100%; } }
    @keyframes fade { to { opacity: 0; } }
    .side { position: relative; display: flex; gap: 10px; margin-top: 14px; }
    .sw { width: 54px; height: 18px; border-radius: 2px; cursor: pointer; background: #000; border: 1px solid var(--k); box-shadow: 0 0 6px color-mix(in srgb, var(--k) 50%, transparent); padding: 0; transform: skewX(-20deg); transition: background .2s; }
    .sw[aria-checked="true"] { background: var(--k); box-shadow: 0 0 12px var(--k); }
    .sw:hover { background: color-mix(in srgb, var(--k) 35%, #000); }
    .sw:focus-visible { outline: 1px solid #fff; outline-offset: 3px; }
  `,
  html: `<div class="stage"><div class="floor"></div>
    <div class="cyc"><span class="wall"></span><svg class="bike" viewBox="0 0 46 18"><path d="M2 14c0-5 4-8 9-8h14c6 0 9-4 15-4 3 0 4 3 4 6 0 5-3 8-8 8H8c-4 0-6-1-6-2z"/><path d="M6 11h8M30 11h8" /></svg></div>
    <button class="disc" type="button" aria-pressed="false" aria-label="Identity disc"><span class="seg"></span><span class="ring"></span><span class="chase"></span><span class="hub"></span></button>
    <div class="side" role="radiogroup"><button class="sw" type="button" role="radio" aria-checked="true" aria-label="User" style="--k:#7df9ff"></button><button class="sw" type="button" role="radio" aria-checked="false" aria-label="Clu" style="--k:#ff9a1f"></button></div></div>`,
  init(root) {
    const st = root.querySelector('.stage'), d = root.querySelector('.disc'), sws = [...root.querySelectorAll('.sw')];
    let tms = [];
    const later = (f, ms) => tms.push(setTimeout(f, ms));
    d.addEventListener('click', () => {
      const on = d.getAttribute('aria-pressed') !== 'true';
      d.setAttribute('aria-pressed', String(on));
      if (on) { st.classList.remove('run'); void st.offsetWidth; st.classList.add('run'); later(() => st.classList.remove('run'), 2600); }
    });
    const side = (i) => {
      if (sws[i].getAttribute('aria-checked') === 'true') return;
      sws.forEach((x, j) => { x.setAttribute('aria-checked', String(i === j)); x.tabIndex = i === j ? 0 : -1; });
      st.classList.remove('derez'); void st.offsetWidth; st.classList.add('derez');
      later(() => st.classList.toggle('clu', i === 1), 180); later(() => st.classList.remove('derez'), 460);
    };
    sws.forEach((s, i) => {
      s.tabIndex = i ? -1 : 0;
      s.addEventListener('click', () => side(i));
      s.addEventListener('keydown', (e) => { if (e.key.startsWith('Arrow')) { e.preventDefault(); const j = 1 - i; side(j); sws[j].focus(); } });
    });
    return () => tms.forEach(clearTimeout);
  },
};
