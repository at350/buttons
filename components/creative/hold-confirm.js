export default {
  id: 'cr-hold-confirm',
  credit: 'Press-and-hold to confirm — progress ring charges while held, drains on early release (Apple Watch / iOS "hold to" pattern)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; display: inline-flex; align-items: center; gap: 12px; cursor: pointer;
      border: 0; border-radius: 999px; padding: 8px 22px 8px 8px; background: #1e293b; color: #fff;
      font: 600 15px/1 Inter, system-ui, sans-serif; letter-spacing: -.01em; user-select: none; -webkit-user-select: none; touch-action: none;
      transition: background-color .3s ease, transform .2s cubic-bezier(.2, .8, .2, 1);
    }
    .btn:hover { background: #334155; }
    .btn.holding { transform: scale(.97); }
    .btn.ok { background: #16a34a; }
    .btn:focus-visible { outline: 2px solid #1e293b; outline-offset: 3px; }
    .dial { position: relative; width: 40px; height: 40px; flex: none; }
    .ring { position: absolute; inset: 0; transform: rotate(-90deg); }
    .ring circle { fill: none; stroke-width: 3.5; }
    .ring .bg { stroke: rgba(255, 255, 255, .18); }
    .ring .fg { stroke: #38bdf8; stroke-linecap: round; stroke-dasharray: 100.53; stroke-dashoffset: 100.53; transition: stroke-dashoffset .35s cubic-bezier(.2, .8, .2, 1); }
    .btn.holding .fg { stroke-dashoffset: 0; transition: stroke-dashoffset 1.2s linear; }
    .btn.ok .fg { stroke: #fff; stroke-dashoffset: 0; transition: none; }
    .ico { position: absolute; inset: 0; display: grid; place-items: center; }
    .ico svg { grid-area: 1 / 1; width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: opacity .2s ease, transform .3s cubic-bezier(.34, 1.56, .64, 1); }
    .ico .chk { opacity: 0; transform: scale(.4); }
    .btn.ok .lock { opacity: 0; transform: scale(.4); }
    .btn.ok .chk { opacity: 1; transform: none; }
    .lbl { display: grid; }
    .lbl span { grid-area: 1 / 1; white-space: nowrap; transition: opacity .2s ease; }
    .lbl .b { opacity: 0; }
    .btn.ok .lbl .a { opacity: 0; }
    .btn.ok .lbl .b { opacity: 1; }
  `,
  html: `
    <button class="btn" type="button" aria-pressed="false">
      <span class="dial" aria-hidden="true">
        <svg class="ring" viewBox="0 0 40 40"><circle class="bg" cx="20" cy="20" r="16"/><circle class="fg" cx="20" cy="20" r="16"/></svg>
        <span class="ico"><svg class="lock" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><svg class="chk" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>
      </span>
      <span class="lbl"><span class="a">Hold to confirm</span><span class="b" aria-hidden="true">Confirmed</span></span>
    </button>`,
  init(root) {
    const b = root.querySelector('.btn'), a = root.querySelector('.lbl .a'), c = root.querySelector('.lbl .b');
    let t = 0, done = false;
    const set = (on) => { done = on; b.classList.toggle('ok', on); b.setAttribute('aria-pressed', String(on)); a.toggleAttribute('aria-hidden', on); c.toggleAttribute('aria-hidden', !on); };
    const start = () => {
      if (done) { set(false); return; }
      b.classList.add('holding');
      clearTimeout(t);
      t = setTimeout(() => { b.classList.remove('holding'); set(true); }, 1200);
    };
    const stop = () => { clearTimeout(t); b.classList.remove('holding'); };
    b.addEventListener('pointerdown', (e) => { if (e.button === 0) { e.preventDefault(); b.focus({ preventScroll: true }); start(); } });
    b.addEventListener('pointerup', stop); b.addEventListener('pointerleave', stop); b.addEventListener('pointercancel', stop);
    // losing focus mid-hold must not let a keyboard hold keep charging
    b.addEventListener('blur', stop);
    b.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start(); } });
    b.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stop(); });
    b.addEventListener('click', (e) => e.preventDefault());
    return () => clearTimeout(t);
  },
};
