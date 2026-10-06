export default {
  id: 'mn-bootstrap-navbar',
  credit: 'Bootstrap 5 — navbar-dark bg-dark with collapse toggler, dropdown and search form',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .nb { container-type: inline-size; position: relative; background: #212529; color: rgba(255,255,255,.55); border-radius: 12px; padding: 8px 16px; font: 16px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
    .row { display: flex; align-items: center; flex-wrap: wrap; gap: 0 8px; }
    .brand { color: #fff; font-size: 20px; background: none; border: 0; padding: 5px 0; cursor: pointer; font: inherit; font-size: 20px; margin-right: 16px; }
    .tog { display: none; margin-left: auto; padding: 4px 12px; border: 1px solid rgba(255,255,255,.1); border-radius: 6px; background: none; color: rgba(255,255,255,.55); cursor: pointer; }
    .tog:focus-visible, .brand:focus-visible, .lnk:focus-visible, .btn:focus-visible { outline: 0; box-shadow: 0 0 0 .25rem rgba(255,255,255,.25); border-radius: 6px; }
    .col { display: flex; align-items: center; flex: 1; gap: 8px; }
    .nav { display: flex; gap: 0; margin-right: auto; }
    .lnk { display: inline-flex; align-items: center; gap: 4px; padding: 8px; background: none; border: 0; color: rgba(255,255,255,.55); font: inherit; cursor: pointer; }
    .lnk:hover { color: rgba(255,255,255,.75); }
    .lnk.active { color: #fff; }
    .lnk.dis { color: rgba(255,255,255,.25); cursor: default; }
    .lnk::after { content: none; }
    .dd { position: relative; }
    .dd .lnk::after { content: ""; display: inline-block; margin-left: 4px; border: 4px solid transparent; border-top-color: currentColor; border-bottom: 0; }
    .menu { position: absolute; left: 0; top: 100%; min-width: 160px; background: #fff; border: 1px solid rgba(0,0,0,.175); border-radius: 6px; padding: 8px 0; display: none; z-index: 2; }
    .menu.show { display: block; }
    .menu button, .menu hr { display: block; width: 100%; }
    .menu button { padding: 4px 16px; background: none; border: 0; text-align: left; color: #212529; font: inherit; cursor: pointer; }
    .menu button:hover { background: #e9ecef; color: #1e2125; }
    .menu hr { border: 0; border-top: 1px solid rgba(0,0,0,.175); margin: 8px 0; }
    form { display: flex; gap: 8px; }
    input { font: inherit; padding: 6px 12px; border: 1px solid #ced4da; border-radius: 6px; min-width: 0; width: 160px; }
    input:focus { outline: 0; border-color: #86b7fe; box-shadow: 0 0 0 .25rem rgba(13,110,253,.25); }
    .btn { font: inherit; padding: 6px 12px; border-radius: 6px; border: 1px solid #198754; color: #198754; background: none; cursor: pointer; white-space: nowrap; }
    .btn:hover, .btn[aria-pressed="true"] { background: #198754; color: #fff; }
    @container (width < 760px) {
      .tog { display: inline-block; }
      .col { flex-direction: column; align-items: stretch; flex-basis: 100%; display: grid; grid-template-rows: 0fr; overflow: hidden; transition: grid-template-rows .35s ease; }
      .col.show { grid-template-rows: 1fr; }
      .col > div { min-height: 0; overflow: hidden; }
      .col.show > div { overflow: visible; }
      .nav { flex-direction: column; align-items: stretch; padding-top: 8px; }
      form { padding: 8px 0; }
      input { flex: 1; }
      .menu { position: static; background: none; border: 0; padding-left: 16px; }
      .menu button { color: rgba(255,255,255,.55); }
      .menu button:hover { background: none; color: #fff; }
      .menu hr { border-color: rgba(255,255,255,.15); }
    }
  `,
  html: `
    <nav class="nb">
      <div class="row">
        <button class="brand" type="button">Navbar</button>
        <button class="tog" type="button" aria-expanded="false" aria-label="Toggle navigation"><svg width="30" height="30" viewBox="0 0 30 30" stroke="rgba(255,255,255,.55)" stroke-width="2" stroke-linecap="round"><path d="M4 7h22M4 15h22M4 23h22"/></svg></button>
        <div class="col"><div>
          <div class="nav">
            <button class="lnk active" type="button" aria-current="page">Home</button>
            <button class="lnk" type="button">Link</button>
            <div class="dd">
              <button class="lnk ddt" type="button" aria-expanded="false">Dropdown</button>
              <div class="menu"><button type="button">Action</button><button type="button">Another action</button><hr><button type="button">Something else here</button></div>
            </div>
            <button class="lnk dis" type="button" aria-disabled="true" tabindex="-1">Disabled</button>
          </div>
          <form><input type="search" placeholder="Search" aria-label="Search"><button class="btn" type="button" aria-pressed="false">Search</button></form>
        </div></div>
      </div>
    </nav>`,
  init(root, host) {
    const tog = root.querySelector('.tog'), col = root.querySelector('.col');
    tog.addEventListener('click', () => { const v = tog.getAttribute('aria-expanded') !== 'true'; tog.setAttribute('aria-expanded', v); col.classList.toggle('show', v); });
    const links = [...root.querySelectorAll('.nav > .lnk:not(.dis)')];
    links.forEach((l) => l.addEventListener('click', () => { links.forEach((x) => x.classList.toggle('active', x === l)); }));
    const ddt = root.querySelector('.ddt'), menu = root.querySelector('.menu');
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { ddt.setAttribute('aria-expanded', v); menu.classList.toggle('show', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); };
    ddt.addEventListener('click', () => set(ddt.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => set(false)));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); ddt.focus({ preventScroll: true }); } });
    root.querySelector('form').addEventListener('submit', (e) => e.preventDefault());
    const sb = root.querySelector('.btn');
    sb.addEventListener('click', () => sb.setAttribute('aria-pressed', sb.getAttribute('aria-pressed') !== 'true'));
    return () => set(false);
  },
};
