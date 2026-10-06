export default {
  id: 'mb-lovable-generate',
  credit: 'Lovable / Bolt-style AI builder — pink-to-orange gradient "Generate" with a travelling shimmer; while building, a progress hairline fills and the sparkle spins',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 26px; border-radius: 12px; background: #0b0b0f; }
    .gen { position: relative; height: 42px; padding: 0 18px; border-radius: 10px; border: 0; cursor: pointer; overflow: hidden; isolation: isolate; min-width: 150px;
      background: linear-gradient(100deg, #ff4d8d, #ff7a45 55%, #ffb347); color: #fff; font: 600 14px/1 "DM Sans", Inter, system-ui, sans-serif; letter-spacing: -.01em;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px; -webkit-tap-highlight-color: transparent;
      box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 8px 24px -8px rgba(255,77,141,.6); transition: transform .18s cubic-bezier(.2,.8,.2,1), box-shadow .3s, filter .2s, background .3s; }
    .gen::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.45) 50%, transparent 70%); background-size: 250% 100%;
      background-position: 130% 0; transition: background-position .9s cubic-bezier(.2,.8,.2,1); }
    .gen:hover { transform: translateY(-1px); box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 14px 32px -8px rgba(255,122,69,.7); filter: saturate(1.1); }
    .gen:hover::after { background-position: -130% 0; }
    .gen:active { transform: scale(.97); }
    .gen:focus-visible { outline: 2px solid #ff7a45; outline-offset: 3px; }
    .gen svg { width: 16px; height: 16px; fill: currentColor; transition: transform .5s cubic-bezier(.2,.8,.2,1); }
    .gen:hover svg { transform: rotate(90deg) scale(1.1); }
    .gen.busy svg { animation: spin 1s linear infinite; }
    .gen.busy::after { animation: sweep 1s linear infinite; transition: none; }
    @keyframes sweep { from { background-position: 130% 0; } to { background-position: -130% 0; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    .bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 0; background: #fff; opacity: 0; transition: width 1.8s cubic-bezier(.2,.8,.2,1), opacity .2s; }
    .gen.busy .bar { width: 100%; opacity: .9; }
    .gen.done { background: #16161d; box-shadow: inset 0 0 0 1px #2a2a35; }
    .gen.done svg { fill: none; stroke: #ff7a45; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transform: none; }
    .gen.done::after { display: none; }
  `,
  html: `
    <div class="stage">
      <button class="gen" type="button" aria-live="polite">
        <svg class="ic" viewBox="0 0 24 24"><path d="M12 2.5c.6 4.4 2.6 7.5 7 9.5-4.4 2-6.4 5.1-7 9.5-.6-4.4-2.6-7.5-7-9.5 4.4-2 6.4-5.1 7-9.5z"/></svg>
        <span class="lbl">Generate</span>
        <span class="bar"></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.gen'), lbl = b.querySelector('.lbl'), path = b.querySelector('.ic path');
    const STAR = 'M12 2.5c.6 4.4 2.6 7.5 7 9.5-4.4 2-6.4 5.1-7 9.5-.6-4.4-2.6-7.5-7-9.5 4.4-2 6.4-5.1 7-9.5z', CHECK = 'm5 12.5 4.5 4.5L19 7.5';
    let t;
    b.addEventListener('click', () => {
      if (b.classList.contains('busy')) return;
      if (b.classList.contains('done')) { b.classList.remove('done'); lbl.textContent = 'Generate'; path.setAttribute('d', STAR); return; }
      b.classList.add('busy'); lbl.textContent = 'Building…';
      t = setTimeout(() => { b.classList.remove('busy'); b.classList.add('done'); lbl.textContent = 'Preview ready'; path.setAttribute('d', CHECK); }, 1900);
    });
    return () => clearTimeout(t);
  },
};
