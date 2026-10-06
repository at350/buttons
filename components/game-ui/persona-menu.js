// Persona 5 pause menu: #e60012 field with halftone dots and a black jagged burst, each entry a tilted
// black shard with ransom-note lettering (per-letter size / tilt jitter). The focused entry flips to a white
// shard with a red jagged echo behind it and black letters, snapping in with an overshoot.
const jit = [[-6, 1.12], [4, .92], [-2, 1.04], [7, .96], [-4, 1.1], [3, .9], [-7, 1.06], [5, 1]];
const word = (w, k) => [...w].map((ch, i) => { const [r, s] = jit[(i + k * 3) % jit.length]; return `<span class="ch${(i + k) % 4 === 1 ? ' inv' : ''}" style="--r:${r}deg;--s:${s}">${ch}</span>`; }).join('');
const ITEMS = ['Skill', 'Item', 'Equip', 'Persona', 'Stats'];
const TILT = [-8, -4, -9, -5, -7];

export default {
  id: 'gm-persona-menu',
  credit: 'Atlus Persona 5 — the pause menu: tilted black shards with ransom-note letters on #e60012; the focused entry snaps to a white shard with a jagged red echo',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 250px; padding: 16px 0 18px 18px; border-radius: 12px; overflow: hidden; background: #e60012; }
    .stage::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle, rgba(0,0,0,.28) 1.3px, transparent 1.6px) 0 0 / 7px 7px; pointer-events: none;
      -webkit-mask: linear-gradient(115deg, #000 10%, transparent 70%); mask: linear-gradient(115deg, #000 10%, transparent 70%); }
    .burst { position: absolute; right: -60px; top: -40px; width: 230px; height: 300px; background: #000;
      clip-path: polygon(40% 0, 55% 18%, 78% 4%, 70% 28%, 100% 30%, 76% 46%, 96% 66%, 68% 62%, 74% 92%, 52% 70%, 36% 100%, 34% 70%, 6% 82%, 24% 56%, 0 40%, 28% 34%, 14% 10%, 38% 22%); }
    .menu { position: relative; display: flex; flex-direction: column; gap: 4px; }
    .mi { position: relative; align-self: flex-start; border: none; background: none; cursor: pointer; padding: 3px 24px 4px 14px; height: 36px;
      transform: rotate(var(--t)) translateX(var(--o, 0px)); transform-origin: left center; transition: transform 120ms cubic-bezier(.3,1.8,.5,1); }
    .mi:nth-child(2) { --o: 14px; } .mi:nth-child(3) { --o: 4px; } .mi:nth-child(4) { --o: 20px; } .mi:nth-child(5) { --o: 8px; }
    .mi .bg, .mi .echo { position: absolute; inset: 0; pointer-events: none; }
    .mi .bg { background: #000; clip-path: polygon(0 12%, 8% 0, 96% 8%, 100% 64%, 90% 100%, 3% 90%); transition: background 80ms; }
    .mi .echo { background: #e60012; clip-path: polygon(2% 30%, 12% 2%, 100% 0, 92% 50%, 104% 100%, 0 88%); transform: translate(7px, 5px) scale(1.06); opacity: 0; box-shadow: none; }
    .mi .echo::after { content: ""; position: absolute; inset: 3px; background: #000; clip-path: inherit; }
    .lbl { position: relative; display: flex; align-items: center; height: 100%; gap: 0; white-space: nowrap; }
    .ch { display: inline-block; color: #fff; font: 800 22px/1 'Bricolage Grotesque', 'Unbounded', system-ui, sans-serif; font-variation-settings: 'wdth' 75; text-transform: uppercase;
      transform: rotate(var(--r)) scale(var(--s)); margin-right: -1px; }
    .ch.inv { background: #fff; color: #000; padding: 0 2px; margin: 0 1px; }
    .mi:hover { --o: 22px; }
    .mi:hover .bg { animation: jit 160ms steps(2) 1; }
    @keyframes jit { 50% { clip-path: polygon(0 4%, 10% 6%, 98% 0, 96% 70%, 92% 96%, 0 100%); } }
    .mi.sel { --o: 26px; transform: rotate(var(--t)) translateX(var(--o)) scale(1.12); z-index: 2; }
    .mi.sel .bg { background: #fff; }
    .mi.sel .echo { opacity: 1; }
    .mi.sel .ch { color: #000; }
    .mi.sel .ch.inv { background: #000; color: #fff; }
    .mi:focus-visible { outline: none; }
    .mi:focus-visible .bg { box-shadow: none; background: #fff; }
    .mi:focus-visible .ch { color: #000; }
  `,
  html: `
    <div class="stage">
      <div class="burst"></div>
      <div class="menu" role="menu">
        ${ITEMS.map((w, k) => `<button class="mi${k === 0 ? ' sel' : ''}" type="button" role="menuitemradio" aria-checked="${k === 0}" aria-label="${w}" style="--t:${TILT[k]}deg"><span class="echo"></span><span class="bg"></span><span class="lbl" aria-hidden="true">${word(w, k)}</span></button>`).join('')}
      </div>
    </div>`,
  init(root) {
    const items = [...root.querySelectorAll('.mi')];
    const pick = (m) => items.forEach((o) => { o.classList.toggle('sel', o === m); o.setAttribute('aria-checked', String(o === m)); });
    items.forEach((m, i) => {
      m.addEventListener('click', () => pick(m));
      m.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); const n = items[(i + d + items.length) % items.length]; pick(n); n.focus(); });
    });
  },
};
