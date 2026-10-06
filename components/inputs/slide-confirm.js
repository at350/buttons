export default {
  id: 'in-slide-confirm',
  credit: 'Slide-to-confirm track — drag the knob all the way right to confirm (iOS "slide to unlock" / Revolut style)',
  size: 'wide',
  css: `
    :host { display: block; }
    .track {
      position: relative; width: 100%; max-width: 300px; height: 54px; border-radius: 27px; background: #e5e7eb;
      user-select: none; touch-action: none; overflow: hidden; margin: 0 auto;
    }
    .fill { position: absolute; inset: 0; background: #22c55e; opacity: var(--p, 0); transition: opacity .2s; }
    .track.drag .fill { transition: none; }
    .chev { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 2px; opacity: calc(1 - var(--p, 0) * 1.5); color: #9ca3af; }
    .chev svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
    .track:hover .chev svg { animation: nudge 1s infinite; }
    .chev svg:nth-child(2) { animation-delay: .15s; } .chev svg:nth-child(3) { animation-delay: .3s; }
    @keyframes nudge { 0%, 100% { transform: translateX(0); opacity: .5; } 50% { transform: translateX(4px); opacity: 1; } }
    .track.done .chev { display: none; }
    .knob {
      position: absolute; top: 4px; left: 4px; width: 46px; height: 46px; border-radius: 50%; background: #fff; border: 0; padding: 0;
      box-shadow: 0 2px 6px rgba(0,0,0,.2); cursor: grab; display: grid; place-items: center; color: #111;
      transform: translateX(var(--x, 0px)); transition: transform .3s cubic-bezier(.34,1.3,.64,1);
    }
    .track.drag .knob { transition: none; cursor: grabbing; }
    .knob:focus-visible { outline: 3px solid #22c55e; outline-offset: 2px; }
    .knob svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; position: absolute; transition: opacity .2s; }
    .ok { opacity: 0; color: #22c55e; } .track.done .ok { opacity: 1; } .track.done .arr { opacity: 0; }
  `,
  html: `<div class="track">
    <span class="fill"></span>
    <span class="chev"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span>
    <button class="knob" type="button" aria-pressed="false" aria-label="Slide to confirm">
      <svg class="arr" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      <svg class="ok" viewBox="0 0 24 24"><path d="M5 12.5l5 5L20 7"/></svg>
    </button>
  </div>`,
  init(root) {
    const track = root.querySelector('.track'), knob = root.querySelector('.knob');
    const max = () => track.clientWidth - 54;
    const cur = () => parseFloat(track.style.getPropertyValue('--x')) || 0;
    const setX = (x) => { track.style.setProperty('--x', x + 'px'); track.style.setProperty('--p', (x / max()).toFixed(3)); };
    const finish = (done) => {
      track.classList.toggle('done', done); knob.setAttribute('aria-pressed', done); setX(done ? max() : 0);
    };
    let startX = 0, startPos = 0, suppressClick = false;
    knob.addEventListener('pointerdown', (e) => {
      suppressClick = false;
      if (track.classList.contains('done')) return;
      knob.setPointerCapture(e.pointerId); track.classList.add('drag');
      startX = e.clientX; startPos = cur(); e.preventDefault();
    });
    knob.addEventListener('pointermove', (e) => {
      if (!track.classList.contains('drag')) return;
      setX(Math.max(0, Math.min(max(), startPos + e.clientX - startX)));
    });
    // pointerup ends the drag and decides confirm / snap back. The same gesture also fires a click
    // right after, which must not undo the result — flag it so the click handler ignores it.
    const up = () => {
      if (!track.classList.contains('drag')) return;
      track.classList.remove('drag');
      suppressClick = true;
      finish(cur() / max() > 0.88);
    };
    // pointercancel (scroll steal, touch lost) abandons the gesture: snap back, never confirm.
    const cancel = () => {
      if (!track.classList.contains('drag')) return;
      track.classList.remove('drag');
      finish(false);
    };
    knob.addEventListener('pointerup', up); knob.addEventListener('pointercancel', cancel);
    // A deliberate activation (click / Space) on a confirmed knob resets it.
    knob.addEventListener('click', () => {
      if (suppressClick) { suppressClick = false; return; }
      if (track.classList.contains('done')) finish(false);
    });
    knob.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); finish(true); }
      if (e.key === 'ArrowLeft' || e.key === 'Escape') { e.preventDefault(); finish(false); }
    });
  },
};
