export default {
  id: 'mn-linear-nav',
  credit: 'Linear.app top nav — frosted glass bar over a dark glowing backdrop',
  size: 'full',
  css: `
    :host { display: block; }
    .stage { position: relative; overflow: hidden; border-radius: 12px; background: #08090a; padding: 14px 14px 26px; container-type: inline-size; }
    .glow { position: absolute; inset: auto 10% -60px 20%; height: 120px; background: radial-gradient(60% 100% at 50% 100%, rgba(94,106,210,.65), rgba(94,106,210,0) 70%); filter: blur(10px); pointer-events: none; }
    .glow2 { position: absolute; left: -40px; top: -40px; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,.14), transparent 70%); pointer-events: none; }
    .bar { position: relative; height: 56px; display: flex; align-items: center; gap: 4px; padding: 0 12px 0 16px; border-radius: 10px; background: rgba(10,10,10,.55); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,.08); font: 14px/1 -apple-system, "Inter", system-ui, sans-serif; color: #f7f8f8; }
    .logo { width: 30px; height: 30px; display: grid; place-items: center; background: none; border: 0; color: #fff; border-radius: 6px; cursor: pointer; margin-right: 14px; padding: 0; }
    .it { height: 32px; padding: 0 10px; background: none; border: 0; color: #8a8f98; font: inherit; font-weight: 500; cursor: pointer; border-radius: 6px; transition: color .15s, background .15s; white-space: nowrap; }
    .it:hover { color: #f7f8f8; }
    .it.on { color: #f7f8f8; background: rgba(255,255,255,.06); }
    .it:focus-visible, .logo:focus-visible, .cta:focus-visible { outline: 2px solid #5e6ad2; outline-offset: 2px; }
    .right { margin-left: auto; display: flex; align-items: center; gap: 6px; }
    .cta { height: 32px; padding: 0 12px; border-radius: 8px; border: 0; background: #e6e6e6; color: #08090a; font: inherit; font-weight: 500; cursor: pointer; transition: background .15s; white-space: nowrap; }
    .cta:hover { background: #fff; }
    .hb { display: none; }
    @container (width < 680px) { .mid { display: none; } .hb { display: inline-flex; } }
  `,
  html: `
    <div class="stage">
      <span class="glow"></span><span class="glow2"></span>
      <nav class="bar" aria-label="Linear">
        <button class="logo" type="button" aria-label="Home"><svg width="22" height="22" viewBox="0 0 100 100" fill="currentColor"><path d="M1.2 61.5a50 50 0 0037.3 37.3zM.1 48.6l51.3 51.3a50 50 0 0010.3-1.6L1.7 38.3A50 50 0 00.1 48.6zm4-19.2l66.5 66.5a50 50 0 008-5.3L9.4 21.4a50 50 0 00-5.3 8zm9.1-14.1l71.5 71.5A50 50 0 0013.2 15.3z"/></svg></button>
        <div class="mid">
          <button class="it" type="button">Product</button>
          <button class="it" type="button">Resources</button>
          <button class="it" type="button">Pricing</button>
          <button class="it" type="button">Customers</button>
          <button class="it" type="button">Blog</button>
          <button class="it" type="button">Contact</button>
        </div>
        <div class="right">
          <button class="it" type="button">Log in</button>
          <button class="cta" type="button">Sign up</button>
          <button class="it hb" type="button" aria-expanded="false" aria-label="Menu"><svg width="18" height="12" viewBox="0 0 18 12" stroke="currentColor" stroke-width="1.5"><path d="M0 1h18M0 6h18M0 11h18"/></svg></button>
        </div>
      </nav>
    </div>`,
  init(root) {
    const items = [...root.querySelectorAll('.mid .it')];
    items.forEach((b) => b.addEventListener('click', () => {
      const was = b.classList.contains('on');
      items.forEach((x) => x.classList.toggle('on', x === b && !was));
    }));
    const hb = root.querySelector('.hb');
    hb.addEventListener('click', () => hb.setAttribute('aria-expanded', hb.getAttribute('aria-expanded') !== 'true'));
  },
};
