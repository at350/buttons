export default {
  id: 'mn-material-appbar',
  credit: 'Google Material 3 — small top app bar with navigation icon and action icons',
  size: 'full',
  css: `
    :host { display: block; }
    .bar { container-type: inline-size; height: 64px; background: #fef7ff; border-radius: 12px; display: flex; align-items: center; padding: 0 4px; gap: 4px; font: 22px/1.3 Roboto, system-ui, sans-serif; color: #1d1b20; box-shadow: 0 1px 2px rgba(0,0,0,.08); transition: background .2s; }
    .bar.scrolled { background: #f3edf7; box-shadow: 0 2px 4px rgba(0,0,0,.14); }
    .ib { position: relative; width: 48px; height: 48px; border-radius: 50%; border: 0; background: none; color: #49454f; cursor: pointer; display: grid; place-items: center; padding: 0; flex: none; overflow: hidden; }
    .ib::before { content: ""; position: absolute; inset: 0; border-radius: 50%; background: currentColor; opacity: 0; transition: opacity .15s; }
    .ib:hover::before { opacity: .08; }
    .ib:active::before { opacity: .12; }
    .ib:focus-visible { outline: 2px solid #6750a4; outline-offset: 1px; }
    .ib[aria-pressed="true"] { color: #6750a4; }
    .ib svg { position: relative; fill: currentColor; }
    .title { flex: 1; min-width: 0; margin-left: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .acts { display: flex; }
    @container (width < 420px) { .acts .ib:not(:last-child) { display: none; } }
  `,
  html: `
    <header class="bar">
      <button class="ib nav" type="button" aria-label="Menu" aria-expanded="false"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg></button>
      <div class="title">Inbox</div>
      <div class="acts">
        <button class="ib" type="button" aria-label="Attach" aria-pressed="false"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 6v11.5a4 4 0 01-8 0V5a2.5 2.5 0 015 0v10.5a1 1 0 01-2 0V6H10v9.5a2.5 2.5 0 005 0V5a4 4 0 00-8 0v12.5a5.5 5.5 0 0011 0V6h-1.5z"/></svg></button>
        <button class="ib" type="button" aria-label="Calendar" aria-pressed="false"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14v11z"/></svg></button>
        <button class="ib" type="button" aria-label="More" aria-pressed="false"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 8a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z"/></svg></button>
      </div>
    </header>`,
  init(root) {
    const bar = root.querySelector('.bar');
    root.querySelectorAll('.acts .ib').forEach((b) => b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
      bar.classList.toggle('scrolled', !!root.querySelector('[aria-pressed="true"]'));
    }));
    const nav = root.querySelector('.nav');
    nav.addEventListener('click', () => nav.setAttribute('aria-expanded', nav.getAttribute('aria-expanded') !== 'true'));
  },
};
