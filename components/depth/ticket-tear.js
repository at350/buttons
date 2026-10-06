export default {
  id: 'dp-ticket-tear',
  credit: '3D ticket stub — drag the stub to the right and it hinges on the perforation, tears off and tumbles away; click the torn ticket to restore',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 30px 70px 34px 30px; perspective: 700px; background: #fff7ed; border-radius: 12px; }
    .ticket { position: relative; display: flex; width: 214px; height: 72px; transform-style: preserve-3d; transform: rotateX(6deg); -webkit-user-select: none; user-select: none; }
    .body {
      position: relative; width: 150px; height: 72px; border-radius: 10px 0 0 10px; display: flex; align-items: center; padding: 0 16px; gap: 10px;
      background: linear-gradient(180deg, #f97316, #ea580c); color: #fff; font: 800 15px/1 'Bricolage Grotesque', system-ui, sans-serif; letter-spacing: .04em;
      box-shadow: 0 10px 24px rgba(0, 0, 0, .2);
      -webkit-mask: radial-gradient(circle at 100% 0, transparent 7px, #000 7.5px), radial-gradient(circle at 100% 100%, transparent 7px, #000 7.5px); -webkit-mask-composite: source-in; mask: radial-gradient(circle at 100% 0, transparent 7px, #000 7.5px), radial-gradient(circle at 100% 100%, transparent 7px, #000 7.5px); mask-composite: intersect;
    }
    .body::after { content: ''; position: absolute; right: 0; top: 8px; bottom: 8px; border-right: 2px dashed rgba(255, 255, 255, .6); }
    .body svg { width: 22px; height: 22px; flex: none; }
    .stub {
      --a: 0deg; --x: 0px; width: 64px; height: 72px; border: 0; padding: 0; border-radius: 0 10px 10px 0; cursor: grab; color: #fff;
      background: linear-gradient(180deg, #fb923c, #f97316); display: grid; place-items: center; font: 700 12px/1 'JetBrains Mono', ui-monospace, monospace;
      transform-origin: left; transform: translateX(var(--x)) rotateY(var(--a)); transition: transform .12s, opacity .4s; touch-action: none;
      -webkit-mask: radial-gradient(circle at 0 0, transparent 7px, #000 7.5px), radial-gradient(circle at 0 100%, transparent 7px, #000 7.5px); -webkit-mask-composite: source-in; mask: radial-gradient(circle at 0 0, transparent 7px, #000 7.5px), radial-gradient(circle at 0 100%, transparent 7px, #000 7.5px); mask-composite: intersect;
    }
    .stub:active { cursor: grabbing; }
    .stub span { transform: rotate(-90deg); display: block; }
    .ticket.torn .stub { transform: translateX(70px) translateY(40px) rotateY(80deg) rotateZ(35deg); opacity: 0; transition: transform .6s cubic-bezier(.3, .6, .4, 1), opacity .5s .1s; pointer-events: none; }
    .ticket.torn .body { -webkit-mask: none; mask: none; clip-path: polygon(0 0, 100% 0, 97% 10%, 100% 22%, 96% 34%, 100% 48%, 97% 60%, 100% 74%, 96% 86%, 100% 100%, 0 100%); border-radius: 10px; }
    .stub:focus-visible { outline: 2px solid #9a3412; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="ticket">
        <div class="body"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 0 0-4V6H3z"/><path d="M13 6v12" stroke-dasharray="2 3"/></svg>ADMIT ONE</div>
        <button class="stub" type="button" aria-label="Tear stub"><span>№ 0421</span></button>
      </div>
    </div>`,
  init(root) {
    const t = root.querySelector('.ticket'), s = root.querySelector('.stub');
    let x0 = 0, dragging = false;
    const tear = () => { t.classList.add('torn'); s.style.setProperty('--a', '0deg'); s.style.setProperty('--x', '0px'); };
    const reset = () => t.classList.remove('torn');
    s.addEventListener('pointerdown', (e) => { if (t.classList.contains('torn')) return; dragging = true; x0 = e.clientX; s.setPointerCapture(e.pointerId); s.style.transition = 'none'; });
    s.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const d = Math.max(0, Math.min(70, e.clientX - x0));
      s.style.setProperty('--a', (-d * 1.1) + 'deg'); s.style.setProperty('--x', (d * .4) + 'px');
      if (d >= 60) { dragging = false; s.style.transition = ''; tear(); }
    });
    const end = () => { if (!dragging) return; dragging = false; s.style.transition = ''; s.style.setProperty('--a', '0deg'); s.style.setProperty('--x', '0px'); };
    s.addEventListener('pointerup', end); s.addEventListener('pointercancel', end);
    s.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.classList.contains('torn') ? reset() : tear(); } });
    t.addEventListener('click', () => { if (t.classList.contains('torn')) reset(); });
  },
};
