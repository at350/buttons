// linear.app header: wordmark SVG, labels, tokens (dark), popup + slide keyframes copied from its CSS.
const LOGO = '<svg width="88" height="22" viewBox="0 0 400 100" fill="currentColor" aria-hidden="true"><path d="M12.927 16.371a1.47 1.47 0 0 0 .061 2.027l68.595 68.594c.555.555 1.446.59 2.026.062 10.058-9.152 16.372-22.348 16.372-37.018C99.98 22.402 77.579 0 49.945 0c-14.67 0-27.866 6.313-37.018 16.371M4.353 29.39a1.47 1.47 0 0 0 .309 1.648L68.943 95.32c.434.434 1.09.562 1.648.308a50 50 0 0 0 4.335-2.227c.834-.482.962-1.62.28-2.3L8.882 24.773c-.68-.68-1.818-.553-2.3.281a50 50 0 0 0-2.228 4.334m-3.9 18.407a1.48 1.48 0 0 1-.432-1.14q.2-2.986.74-5.866c.215-1.15 1.62-1.55 2.448-.722l56.703 56.704c.828.827.429 2.233-.722 2.448a50 50 0 0 1-5.865.74 1.48 1.48 0 0 1-1.14-.433zm3.48 13.963c-1.033-1.033-2.7-.143-2.322 1.268C6.221 80.22 19.761 93.76 36.954 98.37c1.41.379 2.3-1.289 1.268-2.322z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M201.602 27.536c3.587 0 6.494-2.918 6.494-6.518s-2.907-6.517-6.494-6.517-6.493 2.918-6.493 6.518 2.907 6.517 6.493 6.517m-55.621 56.84v-69.87h11.54v59.648h31.115v10.223zm82.136-28.511v28.51h-11.166V34.857h11.026v8.487l.14-.094q1.682-3.986 5.42-6.659 3.737-2.72 9.531-2.72 5.139 0 9.344 2.299 4.204 2.25 6.727 6.611 2.523 4.362 2.523 10.692v30.903h-11.166V55.02q0-5.628-2.99-8.535-2.943-2.954-7.896-2.954-3.177 0-5.793 1.313t-4.158 4.032-1.542 6.988M329.222 83.53q3.831 1.642 8.783 1.642 4.065 0 6.961-1.032 2.898-1.078 4.766-2.86 1.915-1.782 3.037-3.893h.187v6.988h10.699V50.283q0-3.61-1.402-6.612-1.401-3-4.065-5.205-2.616-2.205-6.354-3.376-3.737-1.22-8.409-1.22-6.4 0-11.073 2.205-4.625 2.157-7.242 5.814t-2.85 8.254h10.793a7.15 7.15 0 0 1 1.495-3.846q1.308-1.687 3.551-2.626 2.242-.984 5.186-.984t4.999.984q2.102.986 3.223 2.673 1.122 1.689 1.122 3.94v.375q0 1.687-1.168 2.485-1.122.797-3.831 1.172-2.664.375-7.289.891a59 59 0 0 0-7.288 1.266q-3.504.844-6.261 2.486a12.25 12.25 0 0 0-4.298 4.36q-1.588 2.72-1.588 6.988 0 4.923 2.242 8.253 2.243 3.282 6.074 4.97m18.081-8.3q-2.71 1.454-6.681 1.454-4.019 0-6.401-1.688-2.383-1.736-2.383-4.736 0-2.345 1.308-3.799 1.356-1.454 3.551-2.297t4.765-1.173q1.869-.281 3.645-.562 1.775-.329 3.317-.61 1.542-.329 2.616-.657 1.122-.328 1.635-.703v5.533q0 2.908-1.355 5.346-1.308 2.392-4.017 3.892m26.094 9.145v-49.52h10.745v8.16h.141q1.354-4.22 4.251-6.425 2.943-2.25 7.709-2.25 1.169 0 2.102.093.982.048 1.636.094V44.61a41 41 0 0 0-2.149-.234 36 36 0 0 0-3.271-.14q-2.756 0-5.046 1.265-2.29 1.267-3.644 3.892-1.308 2.58-1.308 6.518v28.465zm-177.401 0v-49.52h11.166v49.52zm84.238-2.204q5.373 3.33 12.755 3.329 5.7 0 10.372-2.063 4.719-2.11 7.849-5.768 3.13-3.705 4.065-8.535h-10.512a10.1 10.1 0 0 1-2.29 3.892q-1.541 1.642-3.877 2.58-2.337.937-5.42.937-4.158 0-7.148-1.875-2.943-1.876-4.485-5.205-1.4-3.065-1.529-6.94h35.915V59.52q0-5.721-1.682-10.41-1.682-4.735-4.766-8.16-3.082-3.47-7.428-5.345-4.298-1.875-9.578-1.876-6.867 0-12.147 3.33t-8.27 9.19-2.99 13.412q0 7.503 2.897 13.364 2.897 5.815 8.269 9.145m23.501-32.779q-1.542-3.189-4.392-4.923-2.85-1.736-6.728-1.736-3.831 0-6.681 1.736-2.802 1.734-4.391 4.923-1.134 2.31-1.434 5.252h25.059q-.3-2.942-1.433-5.252"></path></svg>';
const col = (title, items) => `<div class="col"><div class="ct">${title}</div><ul>${items.map((t) => `<li><a class="it" href="#">${t}</a></li>`).join('')}</ul></div>`;
const PANES = {
  product: col('Product', ['Intake', 'Plan', 'AI', 'Build', 'Security']) + col('Features', ['Asks', 'Agents', 'Coding Sessions', 'Customer Requests', 'Insights', 'Integrations']),
  resources: col('Resources', ['Switch', 'Download', 'Developers', 'Status', 'Changelog']) + col('Company', ['About', 'Careers', 'Method', 'Quality', 'Brand']),
};

export default {
  id: 'mn-linear-nav',
  credit: 'Linear.app header — dark glass nav with pill hovers and the sliding Product / Resources popup',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap {
      --bg: #08090a; --t1: #f7f8f8; --t2: #d0d6e0; --t3: #8a8f98; --t4: #62666d; --border: #23252a; --glass: #ffffff14;
      --ease: cubic-bezier(.25,.46,.45,.94); --inout: cubic-bezier(.455,.03,.515,.955);
      position: relative; container-type: inline-size; color: var(--t1);
      font-family: Inter, "Inter Variable", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px; font-feature-settings: "cv01", "ss03"; -webkit-font-smoothing: antialiased;
    }
    .bar { position: relative; height: 64px; display: flex; align-items: center; gap: 16px; padding: 0 20px 0 24px; background: var(--bg); border: 1px solid var(--glass); border-radius: 12px; }
    .logo { display: flex; align-items: center; height: 32px; margin-left: -8px; padding: 0 8px; border-radius: 6px; color: var(--t1); flex: none; }
    .logo svg { display: block; }
    .nav { display: flex; align-items: center; gap: 0; list-style: none; margin: 0 auto; padding: 0; }
    .a {
      position: relative; display: flex; align-items: center; justify-content: center; height: 32px; padding: 0 12px; margin: 0;
      border: 0; border-radius: 9999px; background: transparent; color: var(--t3); font: inherit; cursor: pointer;
      text-decoration: none; white-space: nowrap; transition: .1s var(--ease); transition-property: color, background;
    }
    .a:hover, .a[aria-expanded="true"] { color: var(--t1); background: var(--glass); }
    a:focus, button:focus { outline: none; }
    .a:focus-visible, .logo:focus-visible, .btn:focus-visible, .it:focus-visible, .ham:focus-visible, .ml:focus-visible { box-shadow: 0 0 0 2px #5e6ad2; }
    .right { display: flex; align-items: center; gap: 8px; flex: none; }
    .dv { width: 1px; height: 16px; background: var(--border); margin-inline: 4px; }
    .btn {
      display: inline-flex; align-items: center; height: 32px; padding: 0 12px; border-radius: 9999px; white-space: nowrap; text-decoration: none;
      background: #e5e5e6; border: 1px solid #e5e5e6; color: var(--bg); font-weight: 510; cursor: pointer;
      box-shadow: 0px 8px 2px 0px #0000, 0px 5px 2px 0px #00000003, 0px 3px 2px 0px #0000000a, 0px 1px 1px 0px #00000012, 0px 0px 1px 0px #00000014;
      transition: background .1s var(--ease), transform .1s var(--ease);
    }
    .btn:hover { background: #fff; }
    .btn:active { transform: scale(.97); }
    .ham { display: none; width: 32px; height: 32px; padding: 8px; margin-right: -6px; border: 0; border-radius: 9999px; background: transparent; color: var(--t1); cursor: pointer; }
    .ham svg { display: block; }
    .ham rect { transform-origin: center; transition: 160ms var(--ease); }
    .ham rect:first-child { transform: translateY(-3.5px); }
    .ham rect:last-child { transform: translateY(3.5px); }
    .ham[aria-expanded="true"] rect:first-child { transform: rotate(45deg); }
    .ham[aria-expanded="true"] rect:last-child { transform: rotate(-45deg); }

    .pop {
      position: absolute; top: 60px; left: 0; z-index: 2; overflow: hidden; visibility: hidden;
      background: #0c0d0ef7; -webkit-backdrop-filter: blur(32px); backdrop-filter: blur(32px);
      border: 1px solid var(--glass); border-radius: 14px; box-shadow: 0 8px 32px #08090a;
      transform-origin: top; transition: height .22s, width .22s, left .22s;
    }
    .pop.on { visibility: visible; animation: scaleIn .18s both; }
    .pop.out { visibility: visible; animation: scaleOut .18s both; }
    @keyframes scaleIn { 0% { opacity: 0; transform: scale(.98); } to { opacity: 1; transform: scale(1); } }
    @keyframes scaleOut { 0% { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(.98); } }
    .pane { position: absolute; top: 0; left: 0; display: none; padding: 8px 10px 10px 8px; --anim: 48px; }
    .pane.on, .pane.leaving { display: block; }
    .pane.on.from-r { animation: fadeIn .18s var(--inout) both; } .pane.on.from-r .grid > * { animation: fromR .18s var(--inout) both; }
    .pane.on.from-l { animation: fadeIn .18s var(--inout) both; } .pane.on.from-l .grid > * { animation: fromL .18s var(--inout) both; }
    .pane.leaving.to-l { animation: fadeOut .18s var(--inout) both; } .pane.leaving.to-l .grid > * { animation: toL .18s var(--inout) both; }
    .pane.leaving.to-r { animation: fadeOut .18s var(--inout) both; } .pane.leaving.to-r .grid > * { animation: toR .18s var(--inout) both; }
    @keyframes fadeIn { 0% { opacity: 0; } }
    @keyframes fadeOut { to { opacity: 0; } }
    @keyframes fromR { 0% { transform: translateX(var(--anim)); } }
    @keyframes fromL { 0% { transform: translateX(calc(-1 * var(--anim))); } }
    @keyframes toL { to { transform: translateX(calc(-1 * var(--anim))); } }
    @keyframes toR { to { transform: translateX(var(--anim)); } }
    .grid { display: grid; grid-template-columns: 216px 216px; column-gap: 24px; padding: 12px; }
    .ct { padding: 0 8px 8px; color: var(--t4); font-size: 12px; font-weight: 510; }
    .pop ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1px; }
    .it { display: flex; align-items: center; height: 32px; padding: 0 8px; border-radius: 8px; color: var(--t2); text-decoration: none; white-space: nowrap; transition: .1s var(--ease); transition-property: color, background; }
    .it:hover { color: var(--t1); background: #28282c; }
    .pane-m { position: static; padding: 8px; }
    .mob { gap: 2px; }
    .ml { display: flex; align-items: center; height: 44px; padding: 0 12px; border-radius: 8px; color: var(--t1); text-decoration: none; font-size: 15px; font-weight: 510; }
    .ml:hover { background: #28282c; }
    .mfoot { display: flex; gap: 8px; padding: 8px 12px 12px; border-top: 1px solid var(--border); margin-top: 6px; }
    .mfoot .a, .mfoot .btn { flex: 1; justify-content: center; }
    .mfoot .a { background: var(--glass); color: var(--t1); }

    @container (width < 900px) { .nav li.x2 { display: none; } }
    @container (width < 720px) {
      .nav, .right .a, .dv { display: none; }
      .bar { justify-content: space-between; }
      .ham { display: block; }
      .pop.m { left: 8px !important; right: 8px; width: auto !important; }
    }
  `,
  html: `
    <div class="wrap">
      <header class="bar">
        <a class="logo" href="#" aria-label="Linear">${LOGO}</a>
        <ul class="nav">
          <li><button class="a" type="button" data-k="product" aria-expanded="false">Product</button></li>
          <li><button class="a" type="button" data-k="resources" aria-expanded="false">Resources</button></li>
          <li><a class="a" href="#">Customers</a></li>
          <li><a class="a" href="#">Pricing</a></li>
          <li class="x2"><a class="a" href="#">Now</a></li>
          <li class="x2"><a class="a" href="#">Contact</a></li>
        </ul>
        <div class="right">
          <span class="dv"></span>
          <a class="a" href="#">Log in</a>
          <a class="btn" href="#">Sign up</a>
          <button class="ham" type="button" data-k="mobile" aria-label="Open menu" aria-expanded="false"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="1" y="7.5" width="14" height="1" rx="0.5"/><rect x="1" y="7.5" width="14" height="1" rx="0.5"/></svg></button>
        </div>
      </header>
      <div class="pop">
        <div class="pane" data-k="product"><div class="grid">${PANES.product}</div></div>
        <div class="pane" data-k="resources"><div class="grid">${PANES.resources}</div></div>
        <div class="pane pane-m" data-k="mobile"><ul class="mob">${['Product', 'Resources', 'Customers', 'Pricing', 'Now', 'Contact'].map((l) => `<li><a class="ml" href="#">${l}</a></li>`).join('')}</ul><div class="mfoot"><a class="a" href="#">Log in</a><a class="btn" href="#">Sign up</a></div></div>
      </div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap'), pop = root.querySelector('.pop'), bar = root.querySelector('.bar');
    const trig = [...root.querySelectorAll('button[data-k]')];
    const panes = Object.fromEntries([...root.querySelectorAll('.pane')].map((p) => [p.dataset.k, p]));
    const order = ['product', 'resources', 'mobile'];
    let cur = null, openT = 0, closeT = 0, outT = 0;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(null); };
    const onKey = (e) => { if (e.key === 'Escape' && cur) { const t = trig.find((b) => b.dataset.k === cur); set(null); t && t.focus({ preventScroll: true }); } };
    const place = (k) => {
      const p = panes[k];
      pop.classList.toggle('m', k === 'mobile');
      if (k === 'mobile') { pop.style.height = p.offsetHeight + 'px'; return; }
      const br = bar.getBoundingClientRect(), tr = trig.find((b) => b.dataset.k === k).getBoundingClientRect();
      const w = p.offsetWidth, h = p.offsetHeight;
      pop.style.width = w + 2 + 'px'; pop.style.height = h + 2 + 'px';
      pop.style.left = Math.max(0, Math.min(tr.left - br.left - 8, br.width - w - 2)) + 'px';
    };
    const set = (k) => {
      clearTimeout(openT); clearTimeout(closeT);
      if (k === cur) return;
      const prev = cur; cur = k;
      trig.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.k === k)));
      Object.values(panes).forEach((p) => p.classList.remove('leaving', 'to-l', 'to-r', 'from-l', 'from-r'));
      if (k) {
        clearTimeout(outT); pop.classList.remove('out');
        if (prev) {
          const fwd = order.indexOf(k) > order.indexOf(prev);
          panes[prev].classList.remove('on'); panes[prev].classList.add('leaving', fwd ? 'to-l' : 'to-r');
          panes[k].classList.add(fwd ? 'from-r' : 'from-l');
          setTimeout(() => panes[prev].classList.remove('leaving', 'to-l', 'to-r'), 190);
        } else {
          pop.style.transition = 'none';
        }
        panes[k].classList.add('on');
        place(k);
        if (!prev) { void pop.offsetWidth; pop.style.transition = ''; pop.classList.add('on'); host.toggleAttribute('data-open', true); document.addEventListener('pointerdown', onDoc, true); document.addEventListener('keydown', onKey); }
      } else {
        pop.classList.remove('on'); pop.classList.add('out');
        outT = setTimeout(() => { pop.classList.remove('out'); panes[prev] && panes[prev].classList.remove('on'); }, 180);
        host.toggleAttribute('data-open', false);
        document.removeEventListener('pointerdown', onDoc, true); document.removeEventListener('keydown', onKey);
      }
    };
    trig.forEach((b) => {
      b.addEventListener('click', () => set(cur === b.dataset.k ? null : b.dataset.k));
      if (b.dataset.k !== 'mobile') b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { clearTimeout(closeT); openT = setTimeout(() => set(b.dataset.k), cur ? 0 : 50); } });
    });
    root.querySelectorAll('.nav a, .right > a').forEach((a) => a.addEventListener('pointerenter', () => { if (cur && cur !== 'mobile') closeT = setTimeout(() => set(null), 100); }));
    wrap.addEventListener('pointerleave', () => { clearTimeout(openT); if (cur && cur !== 'mobile') closeT = setTimeout(() => set(null), 150); });
    wrap.addEventListener('pointerenter', () => clearTimeout(closeT));
    root.addEventListener('click', (e) => { if (e.target.closest('a[href="#"]')) e.preventDefault(); });
    return () => { clearTimeout(openT); clearTimeout(closeT); clearTimeout(outT); set(null); };
  },
};
