export default {
  id: 'mb-framer-publish',
  credit: 'Framer — blue "Publish" button with the pulsing unpublished-changes dot; publishes with a spinner, then settles to a check',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 12px 14px; border-radius: 12px; background: #111; display: flex; align-items: center; gap: 8px; }
    .ghost { height: 30px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #999; cursor: pointer;
      font: 500 12px/1 Inter, -apple-system, system-ui, sans-serif; display: inline-flex; align-items: center; gap: 6px; transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; }
    .ghost:hover { background: #222; color: #fff; }
    .ghost:focus-visible, .pub:focus-visible { outline: 2px solid #0099ff; outline-offset: 2px; }
    .ghost svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .pub { position: relative; height: 30px; padding: 0 12px; border: 0; border-radius: 8px; background: #0099ff; color: #fff; cursor: pointer;
      font: 600 12px/1 Inter, -apple-system, system-ui, sans-serif; display: inline-flex; align-items: center; gap: 8px; min-width: 88px; justify-content: center;
      transition: background .15s, transform .15s cubic-bezier(.2,.8,.2,1), box-shadow .2s; -webkit-tap-highlight-color: transparent; }
    .pub:hover { background: #1aa3ff; box-shadow: 0 0 0 1px rgba(0,153,255,.3), 0 4px 16px rgba(0,153,255,.35); }
    .pub:active { transform: scale(.96); }
    .dot { position: relative; width: 7px; height: 7px; border-radius: 50%; background: #fff; flex: none; }
    .dot::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #fff; animation: ping 1.6s cubic-bezier(.2,.8,.2,1) infinite; }
    @keyframes ping { 0% { transform: scale(1); opacity: .8; } 80%,100% { transform: scale(3); opacity: 0; } }
    .spin { display: none; width: 12px; height: 12px; border-radius: 50%; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; animation: rot .7s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .chk { display: none; width: 12px; height: 12px; stroke: #fff; fill: none; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .pub.busy .dot, .pub.done .dot { display: none; }
    .pub.busy .spin { display: block; }
    .pub.done .chk { display: block; animation: pop .4s linear(0, 0.5 15%, 1.2 40%, 0.95 65%, 1); }
    .pub.done { background: #222; color: #ccc; }
    @keyframes pop { from { transform: scale(0); } }
  `,
  html: `
    <div class="stage">
      <button class="ghost" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M4 12h16M4 6h16M4 18h16"/></svg>Preview</button>
      <button class="pub" type="button"><span class="dot"></span><span class="spin"></span><svg class="chk" viewBox="0 0 16 16"><path d="M3 8.5 6.5 12 13 4.5"/></svg><span class="lbl">Publish</span></button>
    </div>`,
  init(root) {
    const pub = root.querySelector('.pub');
    const lbl = pub.querySelector('.lbl');
    const prev = root.querySelector('.ghost');
    let t;
    pub.addEventListener('click', () => {
      if (pub.classList.contains('busy')) return;
      if (pub.classList.contains('done')) { pub.classList.remove('done'); lbl.textContent = 'Publish'; return; }
      pub.classList.add('busy'); lbl.textContent = 'Publishing';
      t = setTimeout(() => { pub.classList.remove('busy'); pub.classList.add('done'); lbl.textContent = 'Published'; }, 1300);
    });
    prev.addEventListener('click', () => prev.setAttribute('aria-pressed', String(prev.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
