export default {
  id: 'mn-stripe-nav',
  credit: 'Stripe.com navigation with the hover mega-menu panel under "Products"',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; container-type: inline-size; font: 15px/1 -apple-system, system-ui, "Segoe UI", sans-serif; }
    .bar {
      background: #fff; border-radius: 12px; height: 60px; display: flex; align-items: center; gap: 4px;
      padding: 0 16px; box-shadow: 0 1px 2px rgba(0,0,0,.06), inset 0 0 0 1px rgba(0,0,0,.04);
    }
    .logo { font-weight: 800; font-size: 24px; color: #635bff; letter-spacing: -.04em; margin-right: 18px; padding: 0 4px; background: none; border: 0; cursor: pointer; font-family: inherit; }
    .mid { display: flex; align-items: center; gap: 2px; flex: 1; }
    .it { display: inline-flex; align-items: center; gap: 5px; height: 36px; padding: 0 12px; border: 0; background: none; color: #0a2540; font: inherit; font-weight: 500; cursor: pointer; border-radius: 8px; white-space: nowrap; }
    .it:hover, .it[aria-expanded="true"] { color: #635bff; }
    .it:focus-visible { outline: 2px solid #635bff; outline-offset: 2px; }
    .it svg { transition: transform .2s; }
    .it[aria-expanded="true"] svg { transform: rotate(180deg); }
    .right { display: flex; align-items: center; gap: 6px; margin-left: auto; }
    .cta { display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 14px; border-radius: 17px; border: 0; background: #0a2540; color: #fff; font: inherit; font-weight: 500; cursor: pointer; white-space: nowrap; transition: background .15s; }
    .cta:hover { background: #425466; }
    .cta:focus-visible { outline: 2px solid #635bff; outline-offset: 2px; }
    .panel {
      position: absolute; left: 60px; top: 66px; width: 560px; max-width: calc(100% - 24px); background: #fff; border-radius: 10px;
      box-shadow: 0 30px 60px -12px rgba(50,50,93,.25), 0 18px 36px -18px rgba(0,0,0,.3); padding: 22px 24px 20px;
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px 16px; opacity: 0; visibility: hidden;
      transform: translateY(-6px) rotateX(-6deg); transform-origin: top; transition: opacity .2s, transform .25s cubic-bezier(.2,.8,.2,1), visibility 0s .25s;
    }
    .panel::before { content: ""; position: absolute; top: -6px; left: 78px; width: 12px; height: 12px; background: #fff; transform: rotate(45deg); border-radius: 2px; }
    .panel.open { opacity: 1; visibility: visible; transform: none; transition: opacity .2s, transform .25s cubic-bezier(.2,.8,.2,1), visibility 0s; }
    .p { display: flex; align-items: center; gap: 10px; padding: 8px; border: 0; background: none; border-radius: 6px; color: #0a2540; font: inherit; font-weight: 500; font-size: 14px; cursor: pointer; text-align: left; }
    .p:hover { color: #635bff; background: #f6f9fc; }
    .p:focus-visible { outline: 2px solid #635bff; }
    .ic { width: 22px; height: 22px; border-radius: 6px; flex: none; }
    .hb { display: none; }
    @container (width < 720px) {
      .mid, .cta, .panel { display: none; }
      .hb { display: flex; }
    }
  `,
  html: `
    <div class="wrap">
      <nav class="bar" aria-label="Stripe">
        <button class="logo" type="button">stripe</button>
        <div class="mid">
          <button class="it trig" type="button" aria-expanded="false" aria-haspopup="true">Products <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 3.5l3 3 3-3"/></svg></button>
          <button class="it" type="button">Solutions <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 3.5l3 3 3-3"/></svg></button>
          <button class="it" type="button">Developers</button>
          <button class="it" type="button">Resources <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 3.5l3 3 3-3"/></svg></button>
          <button class="it" type="button">Pricing</button>
        </div>
        <div class="right">
          <button class="it" type="button">Sign in <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 5h10M7 1l4 4-4 4"/></svg></button>
          <button class="cta" type="button">Contact sales <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 5h10M7 1l4 4-4 4"/></svg></button>
          <button class="it hb" type="button" aria-label="Menu"><svg width="20" height="14" viewBox="0 0 20 14" stroke="currentColor" stroke-width="2"><path d="M0 1h20M0 7h20M0 13h20"/></svg></button>
        </div>
      </nav>
      <div class="panel" role="menu">
        <button class="p" type="button" role="menuitem"><span class="ic" style="background:#635bff"></span>Payments</button>
        <button class="p" type="button" role="menuitem"><span class="ic" style="background:#00d4ff"></span>Billing</button>
        <button class="p" type="button" role="menuitem"><span class="ic" style="background:#11efe3"></span>Connect</button>
        <button class="p" type="button" role="menuitem"><span class="ic" style="background:#ff80ff"></span>Terminal</button>
        <button class="p" type="button" role="menuitem"><span class="ic" style="background:#ffd848"></span>Radar</button>
        <button class="p" type="button" role="menuitem"><span class="ic" style="background:#0073e6"></span>Issuing</button>
        <button class="p" type="button" role="menuitem"><span class="ic" style="background:#9966ff"></span>Checkout</button>
        <button class="p" type="button" role="menuitem"><span class="ic" style="background:#15be53"></span>Tax</button>
        <button class="p" type="button" role="menuitem"><span class="ic" style="background:#ff5996"></span>Atlas</button>
      </div>
    </div>`,
  init(root, host) {
    const trig = root.querySelector('.trig');
    const panel = root.querySelector('.panel');
    const wrap = root.querySelector('.wrap');
    let timer = 0;
    const set = (v) => {
      clearTimeout(timer);
      trig.setAttribute('aria-expanded', v);
      panel.classList.toggle('open', v);
      host.toggleAttribute('data-open', v);
    };
    trig.addEventListener('click', () => set(trig.getAttribute('aria-expanded') !== 'true'));
    trig.addEventListener('pointerenter', () => set(true));
    panel.addEventListener('pointerenter', () => clearTimeout(timer));
    wrap.addEventListener('pointerleave', () => { timer = setTimeout(() => set(false), 180); });
    root.querySelectorAll('.mid .it:not(.trig)').forEach((b) => b.addEventListener('pointerenter', () => set(false)));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); trig.focus({ preventScroll: true }); } });
    root.addEventListener('focusout', (e) => { if (!wrap.contains(e.relatedTarget)) set(false); });
    return () => clearTimeout(timer);
  },
};
