export default {
  id: 'mn-vercel-nav',
  credit: 'Vercel.com nav — hover pill that glides between items plus the sliding active underline',
  size: 'full',
  css: `
    :host { display: block; }
    .bar { container-type: inline-size; background: #fff; border-radius: 12px; border: 1px solid #eaeaea; height: 56px; display: flex; align-items: center; padding: 0 14px; gap: 10px; font: 14px/1 -apple-system, system-ui, "Segoe UI", sans-serif; color: #171717; }
    .logo { width: 32px; height: 32px; display: grid; place-items: center; border: 0; background: none; cursor: pointer; border-radius: 6px; padding: 0; color: #000; }
    .logo:focus-visible, .tab:focus-visible, .btn:focus-visible { outline: 2px solid #0070f3; outline-offset: 2px; }
    .tabs { position: relative; display: flex; align-items: stretch; height: 54px; }
    .tab { position: relative; z-index: 1; background: none; border: 0; padding: 0 12px; font: inherit; color: #666; cursor: pointer; transition: color .15s; white-space: nowrap; }
    .tab:hover, .tab.on { color: #171717; }
    .pill { position: absolute; top: 11px; height: 32px; left: 0; width: 0; border-radius: 6px; background: #f2f2f2; opacity: 0; transition: left .2s cubic-bezier(.2,.8,.2,1), width .2s cubic-bezier(.2,.8,.2,1), opacity .15s; pointer-events: none; }
    .tabs:hover .pill, .tabs:focus-within .pill { opacity: 1; }
    .line { position: absolute; bottom: 0; height: 2px; left: 0; width: 0; background: #171717; transition: left .25s cubic-bezier(.2,.8,.2,1), width .25s cubic-bezier(.2,.8,.2,1); }
    .right { margin-left: auto; display: flex; gap: 8px; }
    .btn { height: 32px; padding: 0 12px; border-radius: 6px; font: inherit; cursor: pointer; border: 1px solid #eaeaea; background: #fff; color: #171717; transition: background .15s, border-color .15s; white-space: nowrap; }
    .btn:hover { background: #fafafa; border-color: #999; }
    .btn.dark { background: #171717; color: #fff; border-color: #171717; }
    .btn.dark:hover { background: #383838; }
    @container (width < 640px) { .tabs { display: none; } .right .btn:first-child { display: none; } }
  `,
  html: `
    <nav class="bar" aria-label="Vercel">
      <button class="logo" type="button" aria-label="Home"><svg width="20" height="18" viewBox="0 0 20 18" fill="currentColor"><path d="M10 0l10 18H0z"/></svg></button>
      <div class="tabs" role="tablist">
        <span class="pill"></span>
        <button class="tab on" type="button" role="tab" aria-selected="true">Products</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Solutions</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Resources</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Enterprise</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Docs</button>
        <button class="tab" type="button" role="tab" aria-selected="false">Pricing</button>
        <span class="line"></span>
      </div>
      <div class="right"><button class="btn" type="button">Log In</button><button class="btn" type="button">Contact</button><button class="btn dark" type="button">Sign Up</button></div>
    </nav>`,
  init(root) {
    const tabs = [...root.querySelectorAll('.tab')];
    const pill = root.querySelector('.pill');
    const line = root.querySelector('.line');
    const place = (el, t) => { el.style.left = t.offsetLeft + 'px'; el.style.width = t.offsetWidth + 'px'; };
    const active = () => tabs.find((t) => t.classList.contains('on'));
    tabs.forEach((t) => {
      t.addEventListener('pointerenter', () => place(pill, t));
      t.addEventListener('focus', () => place(pill, t));
      t.addEventListener('click', () => {
        tabs.forEach((x) => { x.classList.toggle('on', x === t); x.setAttribute('aria-selected', x === t); });
        place(line, t);
      });
    });
    root.querySelector('.tabs').addEventListener('pointerleave', () => place(pill, active()));
    const ro = new ResizeObserver(() => { place(line, active()); place(pill, active()); });
    ro.observe(root.querySelector('.tabs'));
    return () => ro.disconnect();
  },
};
