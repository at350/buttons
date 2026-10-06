export default {
  id: 'cr-hold-confirm',
  credit: 'Press-and-hold to confirm — circular progress ring fills while held (Apple Watch power-off style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; display: inline-flex; align-items: center; gap: 12px; cursor: pointer;
      border: 0; border-radius: 999px; padding: 10px 22px 10px 10px; background: #1e293b; color: #fff;
      font: 600 15px/1 system-ui, sans-serif; user-select: none; -webkit-user-select: none; touch-action: none;
      transition: background .3s, transform .1s;
    }
    .btn:hover { background: #334155; }
    .btn.holding { transform: scale(.98); }
    .btn.ok { background: #16a34a; }
    .btn:focus-visible { outline: 2px solid #1e293b; outline-offset: 3px; }
    .ring { width: 40px; height: 40px; transform: rotate(-90deg); }
    .ring .bg { fill: none; stroke: rgba(255, 255, 255, .2); stroke-width: 4; }
    .ring .fg { fill: none; stroke: #38bdf8; stroke-width: 4; stroke-linecap: round; stroke-dasharray: 100.5; stroke-dashoffset: 100.5; transition: stroke-dashoffset .25s ease-out; }
    .btn.holding .fg { stroke-dashoffset: 0; transition: stroke-dashoffset 1.3s linear; }
    .btn.ok .fg { stroke: #fff; stroke-dashoffset: 0; }
    .ico { position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: grid; place-items: center; }
    .ico svg { width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .chk { stroke-dasharray: 26; stroke-dashoffset: 26; transition: stroke-dashoffset .35s .1s; }
    .btn.ok .chk { stroke-dashoffset: 0; }
    .btn.ok .lock { opacity: 0; }
    .lock { transition: opacity .2s; }
    .btn.ok .chk { display: block; }
  `,
  html: `
    <button class="btn" type="button" aria-pressed="false">
      <svg class="ring" viewBox="0 0 40 40" aria-hidden="true"><circle class="bg" cx="20" cy="20" r="16"/><circle class="fg" cx="20" cy="20" r="16"/></svg>
      <span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path class="lock" d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z"/><path class="chk" d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
      <span class="lbl">Hold to confirm</span>
    </button>`,
  init(root) {
    const b = root.querySelector('.btn'), lbl = root.querySelector('.lbl');
    let t = 0, done = false;
    const start = () => {
      if (done) { done = false; b.classList.remove('ok'); b.setAttribute('aria-pressed', 'false'); lbl.textContent = 'Hold to confirm'; return; }
      b.classList.add('holding');
      clearTimeout(t);
      t = setTimeout(() => { done = true; b.classList.remove('holding'); b.classList.add('ok'); b.setAttribute('aria-pressed', 'true'); lbl.textContent = 'Confirmed'; }, 1300);
    };
    const stop = () => { clearTimeout(t); b.classList.remove('holding'); };
    b.addEventListener('pointerdown', (e) => { e.preventDefault(); start(); });
    b.addEventListener('pointerup', stop); b.addEventListener('pointerleave', stop); b.addEventListener('pointercancel', stop);
    b.addEventListener('lostpointercapture', stop);
    // losing focus mid-hold (Tab, window blur) must not let a keyboard hold keep charging
    b.addEventListener('blur', stop);
    b.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start(); } });
    b.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stop(); });
    b.addEventListener('click', (e) => e.preventDefault());
    return () => clearTimeout(t);
  },
};
