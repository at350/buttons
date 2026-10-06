// Bootstrap 5.3 "navbar-expand-lg bg-body-tertiary" from getbootstrap.com/docs/5.3/components/navbar,
// with the compiled bootstrap.css values (navbar, nav-link, dropdown-menu, form-control, btn-outline-success,
// navbar-toggler-icon SVG) and the brand mark from Simple Icons (bootstrap).
const LOGO = '<svg width="30" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="#712cf9" d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z"/></svg>';
// navbar-toggler-icon: Bootstrap's own data-URI SVG, inlined.
const TOGGLER = '<svg class="navbar-toggler-icon" viewBox="0 0 30 30" aria-hidden="true"><path stroke="rgba(33, 37, 41, 0.75)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"/></svg>';

export default {
  id: 'mn-bootstrap-navbar',
  credit: 'Bootstrap 5.3 navbar (navbar-expand-lg bg-body-tertiary) — nav links, dropdown, search form, toggler',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .navbar {
      --c: rgba(0,0,0,.65); --hc: rgba(0,0,0,.8); --ac: #000; --dc: rgba(0,0,0,.3); --border: rgba(0,0,0,.175);
      position: relative; container-type: inline-size;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif;
      font-size: 1rem; font-weight: 400; line-height: 1.5; color: #212529;
      background-color: #f8f9fa; border-radius: 12px; padding: .5rem 0;
    }
    .navbar.shown { border-radius: 12px 12px 0 0; }
    .cf { display: flex; flex-wrap: nowrap; align-items: center; justify-content: space-between; padding: 0 .75rem; }
    a { text-decoration: none; }
    .navbar-brand { display: inline-flex; align-items: center; gap: .5rem; padding: .3125rem 0; margin-right: 1rem; font-size: 1.25rem; color: #000; white-space: nowrap; }
    .navbar-brand:hover { color: #000; }
    .navbar-toggler {
      display: none; padding: .25rem .75rem; font-size: 1.25rem; line-height: 1; color: var(--c); background: transparent;
      border: 1px solid rgba(0,0,0,.15); border-radius: .375rem; cursor: pointer; transition: box-shadow .15s ease-in-out;
    }
    .navbar-toggler:focus { outline: 0; box-shadow: 0 0 0 .25rem; }
    .navbar-toggler:focus:not(:focus-visible) { box-shadow: none; }
    .navbar-toggler-icon { display: inline-block; width: 1.5em; height: 1.5em; vertical-align: middle; }
    .navbar-collapse { display: flex; flex-basis: auto; flex-grow: 1; align-items: center; }
    .navbar-nav { display: flex; flex-direction: row; padding: 0; margin: 0 auto 0 0; list-style: none; }
    .nav-item { position: relative; }
    .nav-link {
      display: block; padding: .5rem; font: inherit; color: var(--c); background: none; border: 0; cursor: pointer; white-space: nowrap;
      transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
    }
    .nav-link:hover, .nav-link:focus { color: var(--hc); }
    .nav-link.active, .nav-link.show { color: var(--ac); }
    .nav-link.disabled { color: var(--dc); pointer-events: none; cursor: default; }
    .nav-link:focus-visible { outline: 0; box-shadow: 0 0 0 .25rem rgba(13,110,253,.25); border-radius: .375rem; }
    .dropdown-toggle::after { display: inline-block; margin-left: .255em; vertical-align: .255em; content: ""; border-top: .3em solid; border-right: .3em solid transparent; border-bottom: 0; border-left: .3em solid transparent; }
    .dropdown-menu {
      position: absolute; top: 100%; left: 0; z-index: 1000; display: none; min-width: 10rem; padding: .5rem 0; margin: .125rem 0 0;
      font-size: 1rem; color: #212529; text-align: left; list-style: none; background-color: #fff; background-clip: padding-box;
      border: 1px solid var(--border); border-radius: .375rem;
    }
    .dropdown-menu.show { display: block; }
    .dropdown-item {
      display: block; width: 100%; padding: .25rem 1rem; clear: both; font-weight: 400; color: #212529; text-align: inherit; white-space: nowrap;
      background-color: transparent; border: 0; border-radius: 0; font: inherit; cursor: pointer;
    }
    .dropdown-item:hover, .dropdown-item:focus { color: #1e2125; background-color: #f8f9fa; outline: 0; }
    .dropdown-item:active { color: #fff; background-color: #0d6efd; }
    .dropdown-divider { height: 0; margin: .5rem 0; overflow: hidden; border: 0; border-top: 1px solid var(--border); opacity: 1; }
    .d-flex { display: flex; }
    .form-control {
      display: block; width: 100%; min-width: 0; padding: .375rem .75rem; font: inherit; color: #212529; background-color: #fff; appearance: none;
      border: 1px solid #dee2e6; border-radius: .375rem; transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out; margin-right: .5rem;
    }
    .form-control::placeholder { color: rgba(33,37,41,.75); opacity: 1; }
    .form-control:focus { color: #212529; background-color: #fff; border-color: #86b7fe; outline: 0; box-shadow: 0 0 0 .25rem rgba(13,110,253,.25); }
    .search { flex: 0 1 auto; }
    .search .form-control { width: 12.5rem; }
    .btn {
      display: inline-block; padding: .375rem .75rem; font: inherit; line-height: 1.5; text-align: center; vertical-align: middle; cursor: pointer;
      border: 1px solid transparent; border-radius: .375rem; background-color: transparent;
      transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }
    .btn-outline-success { color: #198754; border-color: #198754; }
    .btn-outline-success:hover { color: #fff; background-color: #198754; border-color: #198754; }
    .btn-outline-success:active { color: #fff; background-color: #198754; border-color: #198754; }
    .btn-outline-success:focus-visible { outline: 0; box-shadow: 0 0 0 .25rem rgba(25,135,84,.5); }

    /* Below the lg breakpoint (992px) the collapse becomes a panel that drops over the content (absolute, never grows the box). */
    @container (width < 992px) {
      .navbar-toggler { display: inline-block; }
      .navbar-collapse {
        position: absolute; left: 0; right: 0; top: 100%; z-index: 5; display: block; height: 0; overflow: hidden; visibility: hidden;
        padding: 0 .75rem; background: #f8f9fa; border-radius: 0 0 12px 12px; box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
        transition: height .35s ease, visibility 0s .35s;
      }
      .navbar.shown .navbar-collapse { visibility: visible; transition: height .35s ease, visibility 0s; }
      .navbar-nav { flex-direction: column; margin: 0 0 .5rem; }
      .nav-link { width: 100%; text-align: left; padding: .5rem 0; }
      .dropdown-menu { position: static; }
      .search { padding-bottom: .5rem; }
      .search .form-control { width: auto; flex: 1; }
    }
  `,
  html: `
    <nav class="navbar">
      <div class="cf">
        <a class="navbar-brand" href="#">${LOGO}Bootstrap</a>
        <button class="navbar-toggler" type="button" aria-controls="nbc" aria-expanded="false" aria-label="Toggle navigation">${TOGGLER}</button>
        <div class="navbar-collapse" id="nbc">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Pricing</a></li>
            <li class="nav-item dropdown">
              <button class="nav-link dropdown-toggle" type="button" aria-expanded="false">Dropdown</button>
              <ul class="dropdown-menu">
                <li><button class="dropdown-item" type="button">Action</button></li>
                <li><button class="dropdown-item" type="button">Another action</button></li>
                <li><hr class="dropdown-divider"></li>
                <li><button class="dropdown-item" type="button">Something else here</button></li>
              </ul>
            </li>
            <li class="nav-item"><a class="nav-link disabled" aria-disabled="true">Disabled</a></li>
          </ul>
          <form class="d-flex search" role="search">
            <input class="form-control" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>`,
  init(root, host) {
    const nav = root.querySelector('.navbar'), tog = root.querySelector('.navbar-toggler'), col = root.querySelector('.navbar-collapse');
    const dt = root.querySelector('.dropdown-toggle'), dm = root.querySelector('.dropdown-menu');
    let ddOpen = false, shown = false, t = 0;
    const sync = () => {
      const open = ddOpen || shown;
      host.toggleAttribute('data-open', open);
      document.removeEventListener('pointerdown', onDoc, true); document.removeEventListener('keydown', onKey);
      if (open) { document.addEventListener('pointerdown', onDoc, true); document.addEventListener('keydown', onKey); }
    };
    const fitCollapse = () => { if (shown) col.style.height = col.scrollHeight + 'px'; };
    const setDD = (v) => {
      ddOpen = v; dm.classList.toggle('show', v); dt.classList.toggle('show', v); dt.setAttribute('aria-expanded', String(v));
      if (shown) { col.style.transition = 'none'; fitCollapse(); void col.offsetHeight; col.style.transition = ''; }
      sync();
    };
    const setCollapse = (v) => {
      shown = v; tog.setAttribute('aria-expanded', String(v)); clearTimeout(t);
      if (v) { nav.classList.add('shown'); col.style.height = col.scrollHeight + 'px'; }
      else { col.style.height = '0px'; if (ddOpen) { ddOpen = false; dm.classList.remove('show'); dt.classList.remove('show'); dt.setAttribute('aria-expanded', 'false'); } t = setTimeout(() => !shown && nav.classList.remove('shown'), 350); }
      sync();
    };
    const onDoc = (e) => { if (!e.composedPath().includes(host)) { if (ddOpen) setDD(false); if (shown) setCollapse(false); } else if (ddOpen && !e.composedPath().includes(dt.parentElement)) setDD(false); };
    const onKey = (e) => { if (e.key !== 'Escape') return; if (ddOpen) { setDD(false); dt.focus({ preventScroll: true }); } else if (shown) { setCollapse(false); tog.focus({ preventScroll: true }); } };
    dt.addEventListener('click', () => setDD(!ddOpen));
    tog.addEventListener('click', () => setCollapse(!shown));
    root.querySelectorAll('.dropdown-item').forEach((b) => b.addEventListener('click', () => { setDD(false); dt.focus({ preventScroll: true }); }));
    root.querySelector('form').addEventListener('submit', (e) => e.preventDefault());
    root.querySelectorAll('a[href="#"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    return () => { clearTimeout(t); ddOpen = false; shown = false; sync(); };
  },
};
