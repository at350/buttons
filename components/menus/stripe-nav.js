// Labels are stripe.com's own navigation strings (mkt-ssr.homepage.navigation.*); logo, chevron, hamburger
// and HoverArrow SVGs are copied from stripe.com's header markup; tokens from its HDS stylesheet.
const LOGO = '<svg width="60" height="25" viewBox="0 0 60 25" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M59.6444 14.2813h-8.062c.1843 1.9296 1.5983 2.5476 3.2032 2.5476 1.6352 0 2.9534-.3656 4.0453-.9506v3.3179c-1.1186.7115-2.5964 1.1068-4.5645 1.1068-4.011 0-6.8218-2.5122-6.8218-7.4783 0-4.19441 2.3837-7.52509 6.3017-7.52509 3.912 0 5.9537 3.28038 5.9537 7.49819 0 .3982-.0372 1.261-.0556 1.4835Zm-5.9241-5.62407c-1.0294 0-2.1739.72812-2.1739 2.58387h4.2573c0-1.85362-1.0721-2.58387-2.0834-2.58387ZM40.9547 20.303c-1.4411 0-2.322-.6087-2.9133-1.0417l-.0088 4.6271-4.1181.8755-.0014-19.19053h3.7543l.0864 1.01784c.6035-.52914 1.6114-1.29157 3.2256-1.29162 2.8925 0 5.6162 2.6052 5.6162 7.39971 0 5.2327-2.6948 7.6037-5.6409 7.6037Zm-.959-11.35573c-.9453 0-1.5376.34559-1.9669.81586l.0245 6.11967c.3997.433.9763.7813 1.9424.7813 1.5231 0 2.5437-1.6575 2.5437-3.8745 0-2.1544-1.037-3.84233-2.5437-3.84233Zm-11.7602-3.3739h4.1341V20.0088h-4.1341V5.57337Zm0-4.694699L32.3696 0v3.35821l-4.1341.87868V.878671ZM23.9198 10.2223v9.7861h-4.1156V5.57296h3.6867l.1317 1.21751c1.0035-1.7722 3.0722-1.41321 3.6209-1.21594v3.78524c-.5242-.16908-2.2894-.42779-3.3237.86253Zm-8.5525 4.7221c0 2.4275 2.5988 1.6719 3.1263 1.4609v3.3522c-.5492.3013-1.5437.5458-2.8901.5458-2.4441 0-4.2773-1.7999-4.2773-4.2379l.0173-13.17658 4.0206-.85464.0032 3.5395h3.1278V9.0857h-3.1278v5.8588-.0001Zm-4.9069.7026c0 2.9645-2.31051 4.6562-5.73464 4.6562-1.41958 0-2.92289-.2761-4.453935-.9347v-3.9319c1.382085.7516 3.093705 1.315 4.457755 1.315.91864 0 1.53106-.2459 1.53106-1.0069C6.26064 13.7786 0 14.5192 0 9.95995 0 7.04457 2.27622 5.2998 5.61655 5.2998c1.36404 0 2.72806.20934 4.09208.75351V9.9317c-1.25265-.67618-2.84332-1.05979-4.09588-1.05979-.86296 0-1.44753.24965-1.44753.8924.0001 1.85329 6.29518.97249 6.29518 5.88279v-.0001Z"/></svg>';
const CHEV = '<svg class="chev" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path class="cl" d="M4.67065 6L9.3 10.6" stroke="currentColor" stroke-width="1.75"/><path class="cr" d="M12.6707 6L8.67065 10" stroke="currentColor" stroke-width="1.75"/></svg>';
const ARROW = '<svg class="ha" width="5" height="8" viewBox="0 0.5 5 8" fill="none" aria-hidden="true"><defs><clipPath id="ha-clip"><rect x="0" y="0" width="12" height="9"/></clipPath></defs><g clip-path="url(#ha-clip)"><g class="ag"><rect class="shaft" x="-10" y="3.375" width="13" height="1.75" fill="currentColor"/><path d="M4.84766 3.63379L5.45898 4.25L4.84766 4.86621L1.24219 8.49902L0 7.2666L2.99316 4.24902L0 1.23242L1.24219 0L4.84766 3.63379Z" fill="currentColor"/></g></g></svg>';
const HAM = '<svg width="40" height="40" viewBox="0 0 100 100" aria-hidden="true"><rect class="hl l1" width="40" height="5" x="30" y="38"/><rect class="hl l2" width="40" height="5" x="30" y="48"/><rect class="hl l3" width="40" height="5" x="30" y="48"/><rect class="hl l4" width="40" height="5" x="30" y="58"/></svg>';

const prod = (t, items) => `<section class="sec"><h3 class="st">${t}</h3><ul>${items.map(([l, d]) => `<li><a class="pl" href="#"><span class="pn">${l}</span><span class="pd">${d}</span></a></li>`).join('')}</ul></section>`;
const links = (t, items) => `<section class="sec"><h3 class="st">${t}</h3><ul>${items.map((l) => `<li><a class="ll" href="#">${l}</a></li>`).join('')}</ul></section>`;

const PANELS = {
  products: `<div class="grid g4">
    ${prod('Payments', [['Payments', 'Online payments'], ['Payment links', 'No-code payments'], ['Checkout', 'Prebuilt payment UIs'], ['Elements', 'Flexible UI components'], ['Terminal', 'In-person payments'], ['Link', 'Accelerated checkout']])}
    ${prod('Revenue', [['Billing', 'Recurring revenue'], ['Invoicing', 'One-time or recurring'], ['Tax', 'Sales tax &amp; VAT automation'], ['Revenue Recognition', 'Accounting automation'], ['Stripe Sigma', 'Custom reports'], ['Data Pipeline', 'Data sync']])}
    ${prod('Money Management', [['Treasury', 'Business banking and finances'], ['Global Payouts', 'Payouts to third parties'], ['Capital', 'Business financing'], ['Crypto Onramp', 'Embeddable crypto purchases']])}
    ${prod('Platforms and marketplaces', [['Connect', 'Payments for platforms'], ['Capital for platforms', 'Customer financing'], ['Treasury for platforms', 'Embedded financial services'], ['Issuing', 'Physical and virtual cards']])}
  </div>
  <div class="callout"><p class="ct">Not sure where to start?</p><a class="cl2" href="#"><b>Get recommendations</b><span>Tell us about your business</span></a><a class="cl2" href="#"><b>See all products</b><span>Explore our full product catalog</span></a></div>`,
  solutions: `<div class="grid g4">
    ${links('By stage', ['Enterprises', 'Startups'])}
    ${links('By use case', ['Agentic commerce', 'Ecommerce', 'Embedded finance', 'Finance automation', 'Global businesses', 'Marketplaces', 'Platforms', 'SaaS'])}
    ${links('By industry', ['AI companies', 'Creator economy', 'Fintech', 'Gaming', 'Insurance', 'Nonprofits', 'Retail'])}
    ${links('Ecosystem', ['Partners', 'Stripe App Marketplace'])}
  </div>`,
  developers: `<div class="grid g3">
    ${links('Documentation', ['Stripe docs', 'API reference', 'Libraries and SDKs', 'Stripe Apps'])}
    ${links('Guides', ['Accept online payments', 'Implement a prebuilt checkout', 'Build a platform or marketplace', 'Manage subscriptions', 'Offer usage-based billing'])}
    ${links('Resources', ['App integrations', 'Code samples', 'Developer blog', 'API status'])}
  </div>`,
  resources: `<div class="grid g4">
    ${links('Learn', ['Blog', 'Customer stories', 'Guides'])}
    ${links('Support', ['Get support', 'Managed support plans', 'Professional services'])}
    ${links('Company', ['Product roadmap', 'Sessions annual conference', 'Careers', 'Newsroom', 'Stripe Press', 'About'])}
    ${links('Contact', ['Become a partner'])}
  </div>`,
  mobile: `<ul class="mob">${['Products', 'Solutions', 'Developers', 'Resources', 'Pricing'].map((l) => `<li><a class="ml" href="#">${l}${l === 'Pricing' ? '' : CHEV}</a></li>`).join('')}</ul>
    <div class="mcta"><a class="btn pri" href="#">Contact sales${ARROW}</a></div>`,
};
const KEYS = ['products', 'solutions', 'developers', 'resources'];

export default {
  id: 'mn-stripe-nav',
  credit: 'Stripe.com header — HDS nav with sliding mega menu, two-stroke chevrons and the HoverArrow CTA',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap {
      --solid: #061b31; --soft: #50617a; --subdued: #64748d; --brand: #533afd; --brand-700: #4032c8; --border: #e5edf5;
      --ease: cubic-bezier(0.45,0.05,0.55,0.95); --out: cubic-bezier(.25,1,.5,1);
      position: relative; container-type: inline-size; color: var(--solid);
      font-family: "sohne-var", Inter, "SF Pro Display", system-ui, sans-serif; font-size: 14px; font-weight: 425;
      -webkit-font-smoothing: antialiased;
    }
    .bar { position: relative; z-index: 2; height: 76px; display: flex; align-items: center; gap: 40px; padding: 0 16px 0 28px; background: #fff; border: 1px solid var(--border); border-radius: 12px; transition: border-radius 0s .3s; }
    .wrap.open .bar { border-radius: 12px 12px 0 0; border-bottom-color: transparent; transition: none; }
    .logo { display: flex; color: var(--solid); border-radius: 4px; flex: none; }
    .nav { display: flex; gap: 24px; list-style: none; margin: 0; padding: 0; flex: 1; min-width: 0; }
    .tr {
      position: relative; display: inline-flex; align-items: center; gap: 4px; padding: 12px 0; margin: 0; border: 0; background: none;
      font: inherit; color: var(--solid); cursor: pointer; white-space: nowrap; text-decoration: none;
      transition: color 240ms var(--ease);
    }
    .tr::after { content: ""; position: absolute; inset: 0 -12px; }
    .wrap.open .tr:not([aria-expanded="true"]) { color: var(--subdued); }
    .wrap.open .tr:not([aria-expanded="true"]):hover { color: var(--solid); }
    .chev { position: relative; top: .1em; display: block; color: currentColor; }
    .cl, .cr { transition: transform .25s cubic-bezier(.6,0,.2,.5); }
    .cl { transform-origin: 44% 53%; } .cr { transform-origin: 64% 53%; }
    .tr[aria-expanded="true"] .cl { transform: rotate(-90deg); }
    .tr[aria-expanded="true"] .cr { transform: rotate(90deg); }
    .right { display: flex; align-items: center; gap: 12px; flex: none; }
    .btn {
      display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 20px; border-radius: 4px; border: 1px solid transparent;
      font: inherit; font-weight: 425; line-height: 1; white-space: nowrap; text-decoration: none; cursor: pointer;
      transition: background-color .3s var(--out), color .3s var(--out), border-color .3s var(--out);
    }
    .sec2 { color: var(--brand); border-color: #d6d9fc; background: transparent; }
    .sec2:hover { border-color: var(--brand-700); color: #2e2b8c; }
    .pri { background: var(--brand); color: #fff; }
    .pri:hover { background: var(--brand-700); }
    .ha { display: inline; overflow: visible; flex: none; margin-left: 0; }
    .ha .shaft { opacity: 0; transition: opacity .3s var(--out); }
    .ha .ag { transition: transform .3s var(--out); }
    .btn:hover .ha .shaft, .btn:focus-visible .ha .shaft { opacity: 1; }
    .btn:hover .ha .ag, .btn:focus-visible .ha .ag { transform: translateX(6px); }
    a:focus, button:focus { outline: none; }
    .tr:focus-visible, .logo:focus-visible, .btn:focus-visible, .ham:focus-visible, .pl:focus-visible, .ll:focus-visible, .cl2:focus-visible, .ml:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; border-radius: 4px; }
    .ham { display: none; width: 40px; height: 40px; padding: 0; border: 0; border-radius: 4px; background: transparent; color: var(--solid); cursor: pointer; }
    .ham svg { display: block; fill: currentColor; }
    .hl { transform-box: fill-box; transform-origin: center; transition: transform .25s var(--ease), opacity .25s var(--ease); }
    .wrap.mopen .l1, .wrap.mopen .l4 { opacity: 0; transform: scaleX(0); }
    .wrap.mopen .l2 { transform: rotate(45deg); }
    .wrap.mopen .l3 { transform: rotate(-45deg); }

    /* popup: clip-path reveal like stripe.com, contents slide by activation direction */
    .pop {
      position: absolute; left: 0; right: 0; top: 76px; z-index: 1; height: 0; overflow: hidden;
      background: #fff; border: 1px solid var(--border); border-top-color: var(--border); border-radius: 0 0 12px 12px;
      box-shadow: 0px 15px 40px -2px rgba(0,55,112,.1), 0px 5px 20px -2px rgba(0,59,137,.04);
      clip-path: inset(0 -60px 100% -60px); opacity: 0; visibility: hidden;
      transition: clip-path .3s var(--ease), height .3s var(--ease), opacity .2s var(--ease), visibility 0s .3s;
    }
    .wrap.open .pop { clip-path: inset(0 -60px -60px -60px); opacity: 1; visibility: visible; transition: clip-path .3s var(--ease), height .3s var(--ease), opacity .2s var(--ease), visibility 0s; }
    .pane { position: absolute; top: 0; left: 0; right: 0; opacity: 0; visibility: hidden; transform: translateX(20%); transition: opacity .25s cubic-bezier(.4,0,.2,1), transform .5s cubic-bezier(.4,0,.2,1), visibility 0s .5s; }
    .pane.on { opacity: 1; visibility: visible; transform: none; transition: opacity .25s cubic-bezier(.4,0,.2,1), transform .5s cubic-bezier(.4,0,.2,1), visibility 0s; }
    .pane.pre { transform: translateX(-20%); }
    .grid { display: grid; }
    .g4 { grid-template-columns: repeat(4, 1fr); }
    .g3 { grid-template-columns: repeat(3, 1fr); }
    .sec { padding: 28px 28px 32px; min-width: 0; }
    .sec + .sec { border-left: 1px solid var(--border); }
    .st { margin: 0 0 14px; font-size: 13px; line-height: 18px; font-weight: 350; color: var(--soft); letter-spacing: .01em; }
    ul { list-style: none; margin: 0; padding: 0; }
    .pl { display: flex; flex-direction: column; gap: 2px; padding: 6px 0; text-decoration: none; }
    .pn { color: var(--solid); font-size: 14px; line-height: 20px; transition: color .3s var(--out); }
    .pd { color: var(--soft); font-size: 13px; line-height: 18px; font-weight: 350; transition: color .3s var(--out); }
    .pl:hover .pn { color: var(--brand); }
    .pl:hover .pd { color: var(--solid); }
    .ll { display: block; padding: 6px 0; color: var(--solid); text-decoration: none; font-size: 14px; line-height: 20px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .3s var(--out); }
    .ll:hover { color: var(--brand); }
    .callout { display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 24px; align-items: start; padding: 20px 28px 24px; border-top: 1px solid var(--border); background: #f8fafd; font-size: 13px; line-height: 18px; }
    .ct { margin: 0; color: #1c1e54; }
    .cl2 { display: flex; flex-direction: column; text-decoration: none; color: var(--solid); }
    .cl2 b { font-weight: 425; } .cl2 span { color: var(--soft); font-weight: 350; }
    .cl2:hover b { color: var(--brand); }
    .mob { padding: 8px 0; }
    .ml { display: flex; align-items: center; justify-content: space-between; padding: 14px 24px; color: var(--solid); text-decoration: none; font-size: 16px; }
    .ml .chev { transform: rotate(-90deg); color: var(--brand); top: 0; }
    .ml:hover { background: #f8fafd; }
    .mcta { padding: 12px 24px 24px; border-top: 1px solid var(--border); }
    .mcta .btn { width: 100%; justify-content: center; }

    @container (width < 1060px) {
      .bar { gap: 28px; }
      .nav { gap: 20px; }
      .sec { padding: 24px 20px 28px; }
      .callout { padding: 18px 20px 22px; }
      .g4 .sec:nth-child(4) { display: none; }
      .g4 { grid-template-columns: repeat(3, 1fr); }
      .callout { grid-template-columns: 1fr 1fr 1fr; }
    }
    @container (width < 880px) {
      .nav, .right .pri { display: none; }
      .bar { justify-content: space-between; padding: 0 12px 0 20px; }
      .ham { display: block; }
    }
  `,
  html: `
    <div class="wrap">
      <header class="bar">
        <a class="logo" href="#" aria-label="Stripe homepage">${LOGO}</a>
        <ul class="nav">
          ${KEYS.map((k) => `<li><button class="tr" type="button" data-k="${k}" aria-expanded="false">${k[0].toUpperCase() + k.slice(1)}${CHEV}</button></li>`).join('')}
          <li><a class="tr" href="#">Pricing</a></li>
        </ul>
        <div class="right">
          <a class="btn sec2" href="#">Sign in</a>
          <a class="btn pri" href="#">Contact sales${ARROW}</a>
          <button class="ham" type="button" data-k="mobile" aria-label="Toggle navigation menu" aria-expanded="false">${HAM}</button>
        </div>
      </header>
      <div class="pop">${Object.entries(PANELS).map(([k, h]) => `<div class="pane" data-k="${k}">${h}</div>`).join('')}</div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap'), pop = root.querySelector('.pop');
    const trig = [...root.querySelectorAll('button[data-k]')];
    const panes = Object.fromEntries([...root.querySelectorAll('.pane')].map((p) => [p.dataset.k, p]));
    const order = [...KEYS, 'mobile'];
    let cur = null, openT = 0, closeT = 0;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(null); };
    const onKey = (e) => { if (e.key === 'Escape' && cur) { const t = trig.find((b) => b.dataset.k === cur); set(null); t && t.focus({ preventScroll: true }); } };
    const set = (k) => {
      clearTimeout(openT); clearTimeout(closeT);
      if (k === cur) return;
      const prev = cur; cur = k;
      trig.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.k === k)));
      wrap.classList.toggle('mopen', k === 'mobile');
      if (prev && k) {
        // slide: the old pane leaves toward the side opposite the new one
        const fwd = order.indexOf(k) > order.indexOf(prev);
        panes[prev].classList.remove('on'); panes[prev].classList.toggle('pre', fwd);
        const p = panes[k]; p.style.transition = 'none'; p.classList.toggle('pre', !fwd); void p.offsetWidth; p.style.transition = '';
        p.classList.remove('pre'); p.classList.add('on');
      } else if (k) {
        Object.values(panes).forEach((p) => { p.classList.remove('pre'); p.style.transition = 'none'; });
        panes[k].classList.add('on'); void pop.offsetWidth;
        Object.values(panes).forEach((p) => { p.style.transition = ''; });
      }
      if (k) {
        pop.style.height = panes[k].offsetHeight + 2 + 'px';
        wrap.classList.add('open');
        if (!prev) { host.toggleAttribute('data-open', true); document.addEventListener('pointerdown', onDoc, true); document.addEventListener('keydown', onKey); }
      } else {
        wrap.classList.remove('open');
        pop.style.height = '0px';
        if (prev) setTimeout(() => { if (!cur) panes[prev].classList.remove('on'); }, 320);
        host.toggleAttribute('data-open', false);
        document.removeEventListener('pointerdown', onDoc, true); document.removeEventListener('keydown', onKey);
      }
    };
    trig.forEach((b) => {
      b.addEventListener('click', () => set(cur === b.dataset.k ? null : b.dataset.k));
      if (b.dataset.k !== 'mobile') b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { clearTimeout(closeT); clearTimeout(openT); openT = setTimeout(() => set(b.dataset.k), cur ? 0 : 80); } });
    });
    wrap.addEventListener('pointerleave', () => { clearTimeout(openT); if (cur && cur !== 'mobile') closeT = setTimeout(() => set(null), 200); });
    wrap.addEventListener('pointerenter', () => clearTimeout(closeT));
    root.querySelectorAll('a[href="#"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    return () => { clearTimeout(openT); clearTimeout(closeT); set(null); };
  },
};
