// Structure, labels, wordmark and Geist chevron copied from vercel.com's header; Geist light tokens.
const WORDMARK = '<svg width="105" height="21" viewBox="0 0 261 52" aria-hidden="true"><path fill="currentColor" d="M59.8 52H0L29.9 0zm67.82-38.45q4.9 0 8.81 2.13a15.5 15.5 0 0 1 6.22 6.32q2.3 4.2 2.38 10.26v2.06h-26.35q.27 4.4 2.58 6.92 2.38 2.47 6.36 2.47a8.4 8.4 0 0 0 7.76-4.93l9.16.67q-1.68 4.98-6.29 7.99t-10.63 3q-5.53 0-9.64-2.27a16 16 0 0 1-6.43-6.46 20 20 0 0 1-2.31-9.72q0-5.52 2.3-9.72a16 16 0 0 1 6.44-6.46 20 20 0 0 1 9.64-2.26m62.55 0q4.47 0 8.18 1.66a15.3 15.3 0 0 1 6.15 4.6q2.38 3 2.87 7.05l-9.23.47a8 8 0 0 0-2.8-5 7.7 7.7 0 0 0-5.17-1.86q-4.33 0-6.7 3-2.4 3-2.39 8.52t2.38 8.52q2.37 3 6.71 3 3.15 0 5.39-1.87 2.24-1.92 2.72-5.46l9.3.4a14.7 14.7 0 0 1-2.87 7.33 16 16 0 0 1-6.15 4.86 21 21 0 0 1-8.39 1.66q-5.53 0-9.64-2.26a16 16 0 0 1-6.44-6.46 20 20 0 0 1-2.3-9.72q0-5.52 2.3-9.72a16 16 0 0 1 6.44-6.46 20 20 0 0 1 9.64-2.26m38.66 0q4.9 0 8.8 2.13a15.5 15.5 0 0 1 6.22 6.32q2.31 4.2 2.38 10.26v2.06h-26.35q.28 4.4 2.58 6.92 2.38 2.47 6.36 2.47a8.4 8.4 0 0 0 7.77-4.93l9.15.67q-1.68 5-6.29 7.99t-10.62 3q-5.53 0-9.65-2.27a16 16 0 0 1-6.43-6.46 20 20 0 0 1-2.31-9.72q0-5.52 2.3-9.72a16 16 0 0 1 6.44-6.46 20 20 0 0 1 9.64-2.26M86.9 36.69l17.24-34.33h10.8L89.96 49.63h-6.12L58.85 2.36h10.81zm71.62-15.55a11 11 0 0 1 2.47-4.48q2.28-2.31 6.38-2.31h3.4v7.26h-3.47q-2.91 0-4.79.8a5.8 5.8 0 0 0-2.77 2.5q-.9 1.72-.9 4.37v20.35h-8.89V14.35h8.33zm101.73 28.5h-8.95V2.35h8.95zM127.62 20.26q-3.7 0-6 2.2-2.32 2.2-2.87 6.2h17.05q-.48-4.34-2.72-6.33a7.8 7.8 0 0 0-5.46-2.07m101.2 0q-3.7 0-6 2.2-2.31 2.2-2.87 6.2H237q-.5-4.34-2.73-6.33a7.8 7.8 0 0 0-5.46-2.07"/></svg>';
const CHEV = '<svg class="chev" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="m12.06 6.75-.53.53-2.82 2.82a1 1 0 0 1-1.42 0L4.47 7.28l-.53-.53L5 5.69l.53.53L8 8.69l2.47-2.47.53-.53z"/></svg>';

const col = (title, items) => `<div class="col"><div class="ch">${title}</div><ul>${items.map((t) => {
  const ext = t.endsWith('*');
  return `<li><a class="pi" href="#"><span class="u">${ext ? t.slice(0, -1) : t}</span>${ext ? '<span class="ext" aria-hidden="true">↗</span>' : ''}</a></li>`;
}).join('')}</ul></div>`;
const PANELS = {
  products: col('Agent Stack', ['AI SDK', 'AI Gateway', 'Sandbox', 'Passport', 'Connect']) + col('Core Platform', ['Security', 'Content Delivery', 'Fluid Compute', 'Observability', 'CI/CD']) + col('Tools', ['Next.js', 'Vercel Agent', 'Open Source', 'Domains', 'v0*']),
  resources: col('Learn', ['Docs', 'About', 'Blog', 'Changelog', 'Knowledge Base']) + col('Build', ['AI Apps', 'Web Apps', 'Marketing Sites', 'Platforms', 'Commerce']) + col('Explore', ['Customers', 'Marketplace', 'Partner Finder', 'AWS*', 'Community*']),
};

export default {
  id: 'mn-vercel-nav',
  credit: 'Vercel.com header — Geist nav with full-width Products / Resources panels',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap {
      --g100: #f2f2f2; --g400: #ebebeb; --g500: #c9c9c9; --g900: #666666; --g1000: #171717; --bg200: #fafafa; --focus: hsla(212,100%,48%,1);
      position: relative; container-type: inline-size; color: var(--g1000);
      font-family: Geist, Inter, -apple-system, system-ui, sans-serif; font-size: 14px; line-height: 20px;
      -webkit-font-smoothing: antialiased;
    }
    .bar { position: relative; z-index: 2; height: 64px; display: flex; align-items: center; padding: 0 24px; background: #fff; border: 1px solid var(--g400); border-radius: 12px; }
    .wrap.open .bar { border-radius: 12px 12px 0 0; }
    .logo { display: flex; color: var(--g1000); margin-right: 20px; border-radius: 4px; }
    .nav { display: flex; align-items: center; height: 100%; flex: 1; min-width: 0; }
    .tr {
      display: flex; align-items: center; gap: 3px; padding: 6px 12px; margin: 0; border: 0; border-radius: 6px; background: transparent;
      font: inherit; color: var(--g900); cursor: pointer; text-decoration: none; white-space: nowrap; transition: color 150ms ease;
    }
    .tr.dd { padding-right: 8px; }
    .tr:hover, .tr[aria-expanded="true"] { color: var(--g1000); }
    .chev { display: block; transition: none; }
    .tr[aria-expanded="true"] .chev { transform: rotate(180deg); }
    a:focus, button:focus { outline: none; }
    .tr:focus-visible, .logo:focus-visible, .pi:focus-visible, .ml:focus-visible { box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--focus); }
    .right { display: flex; align-items: center; gap: 8px; flex: none; }
    .btn {
      display: inline-flex; align-items: center; height: 32px; padding: 0 12px; border: 0; border-radius: 6px;
      font: inherit; font-weight: 500; white-space: nowrap; text-decoration: none; cursor: pointer;
      transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease;
    }
    .sec { background: #fff; color: var(--g1000); box-shadow: 0 0 0 1px var(--g400); }
    .sec:hover { background: var(--g100); }
    .pri { background: var(--g1000); color: #fff; box-shadow: 0 0 0 1px var(--g1000); }
    .pri:hover { background: hsl(0,0%,22%); box-shadow: 0 0 0 1px hsl(0,0%,22%); }
    .btn:focus-visible { box-shadow: 0 0 0 1px var(--g400), 0 0 0 2px #fff, 0 0 0 4px var(--focus); }
    .ham { display: none; position: relative; width: 44px; height: 44px; margin-right: -10px; padding: 0; border: 0; background: transparent; color: var(--g1000); cursor: pointer; border-radius: 6px; }
    .ham i { position: absolute; left: 13px; width: 18px; height: 1.5px; background: currentColor; border-radius: 1px; transition: transform 150ms ease; }
    .ham i:first-child { top: 18px; } .ham i:last-child { top: 24px; }
    .wrap.mopen .ham i:first-child { transform: translateY(3px) rotate(45deg); }
    .wrap.mopen .ham i:last-child { transform: translateY(-3px) rotate(-45deg); }
    .ham:focus-visible { box-shadow: 0 0 0 2px var(--focus); }

    .panel {
      position: absolute; left: 0; right: 0; top: 64px; z-index: 1; visibility: hidden; opacity: 0;
      background: var(--bg200); border: 1px solid var(--g400); border-top: 0; border-radius: 0 0 12px 12px;
      box-shadow: 0 1px 0 0 rgba(0,0,0,.08), 0 16px 32px -12px rgba(0,0,0,.12);
      transition: opacity 150ms ease, visibility 0s 150ms;
    }
    .wrap.open .panel { visibility: visible; opacity: 1; transition: opacity 150ms ease, visibility 0s; }
    .pane { display: none; gap: 16px; padding: 16px 24px 24px 36px; }
    .pane.on { display: flex; animation: in 150ms ease; }
    @keyframes in { from { opacity: 0; transform: translateY(-4px); } }
    .col { min-width: 200px; flex: 0 1 250px; }
    .ch { color: var(--g900); font-size: 14px; line-height: 20px; }
    ul { list-style: none; margin: 5px 0 0; padding: 0; }
    .pi { display: inline-flex; align-items: center; gap: 4px; color: var(--g1000); text-decoration: none; font-size: 20px; line-height: 32px; letter-spacing: -0.02em; white-space: nowrap; border-radius: 4px; }
    .pi .u { text-decoration: underline; text-decoration-color: transparent; text-decoration-thickness: 1px; text-underline-offset: 5px; transition: text-decoration-color 150ms ease; }
    .pi:hover .u { text-decoration-color: var(--g500); }
    .ext { font-size: .6em; color: var(--g900); margin-left: .125em; }
    .mob { list-style: none; margin: 0; padding: 8px 12px 12px; }
    .ml { display: flex; align-items: center; justify-content: space-between; padding: 0 12px; height: 48px; color: var(--g1000); text-decoration: none; font-size: 16px; border-bottom: 1px solid var(--g400); }
    .ml .chev { transform: rotate(-90deg); color: var(--g900); }
    .mbtns { display: flex; flex-direction: column; gap: 8px; padding: 0 24px 20px; }
    .mbtns .btn { justify-content: center; height: 40px; }

    @container (width < 960px) { .demo { display: none; } .col { min-width: 0; } .pi { font-size: 18px; } }
    @container (width < 880px) {
      .nav { display: none; }
      .bar { justify-content: space-between; padding: 0 16px 0 20px; }
      .logo { margin-right: auto; }
      .ham { display: block; }
    }
    @container (width < 420px) { .right .sec { display: none; } }
  `,
  html: `
    <div class="wrap">
      <header class="bar">
        <a class="logo" href="#" aria-label="Vercel Logo">${WORDMARK}</a>
        <nav class="nav" aria-label="Main navigation">
          <button class="tr dd" type="button" data-k="products" aria-expanded="false">Products${CHEV}</button>
          <button class="tr dd" type="button" data-k="resources" aria-expanded="false">Resources${CHEV}</button>
          <a class="tr" href="#">Enterprise</a>
          <a class="tr" href="#">Pricing</a>
        </nav>
        <div class="right">
          <a class="btn sec demo" href="#">Get a Demo</a>
          <a class="btn sec" href="#">Log In</a>
          <a class="btn pri" href="#">Sign Up</a>
          <button class="ham" type="button" data-k="mobile" aria-label="Toggle menu" aria-expanded="false"><i></i><i></i></button>
        </div>
      </header>
      <div class="panel">
        <div class="pane" data-k="products">${PANELS.products}</div>
        <div class="pane" data-k="resources">${PANELS.resources}</div>
        <div class="pane pane-m" data-k="mobile" style="display:none"></div>
      </div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap');
    const trig = [...root.querySelectorAll('button[data-k]')];
    const panes = Object.fromEntries([...root.querySelectorAll('.pane')].map((p) => [p.dataset.k, p]));
    // mobile pane is built here so the desktop markup stays the single source of labels
    const mp = panes.mobile; mp.removeAttribute('style'); mp.style.flexDirection = 'column'; mp.style.padding = '0'; mp.style.gap = '0';
    mp.innerHTML = `<ul class="mob">${['Products', 'Resources', 'Enterprise', 'Pricing'].map((l, i) => `<li><a class="ml" href="#">${l}${i < 2 ? CHEV : ''}</a></li>`).join('')}</ul><div class="mbtns"><a class="btn sec" href="#">Log In</a><a class="btn pri" href="#">Sign Up</a></div>`;
    let cur = null, openT = 0, closeT = 0;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(null); };
    const onKey = (e) => { if (e.key === 'Escape' && cur) { const t = trig.find((b) => b.dataset.k === cur); set(null); t && t.focus({ preventScroll: true }); } };
    const set = (k) => {
      clearTimeout(openT); clearTimeout(closeT);
      if (k === cur) return;
      const prev = cur; cur = k;
      trig.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.k === k)));
      Object.entries(panes).forEach(([pk, p]) => p.classList.toggle('on', pk === k));
      wrap.classList.toggle('open', !!k);
      wrap.classList.toggle('mopen', k === 'mobile');
      host.toggleAttribute('data-open', !!k);
      if (k && !prev) { document.addEventListener('pointerdown', onDoc, true); document.addEventListener('keydown', onKey); }
      if (!k) { document.removeEventListener('pointerdown', onDoc, true); document.removeEventListener('keydown', onKey); }
    };
    trig.forEach((b) => {
      b.addEventListener('click', () => set(cur === b.dataset.k ? null : b.dataset.k));
      if (b.dataset.k !== 'mobile') b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { clearTimeout(closeT); openT = setTimeout(() => set(b.dataset.k), cur ? 0 : 100); } });
    });
    root.querySelectorAll('.nav > a').forEach((a) => a.addEventListener('pointerenter', () => { if (cur && cur !== 'mobile') closeT = setTimeout(() => set(null), 100); }));
    wrap.addEventListener('pointerleave', () => { clearTimeout(openT); if (cur && cur !== 'mobile') closeT = setTimeout(() => set(null), 150); });
    wrap.addEventListener('pointerenter', () => clearTimeout(closeT));
    root.addEventListener('click', (e) => { const a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); });
    return () => { clearTimeout(openT); clearTimeout(closeT); set(null); };
  },
};
