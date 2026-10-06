export default {
  id: 'lb-m3-expressive-split',
  credit: 'Material 3 Expressive (2025) — small filled Split button: 2dp gap, 4dp inner corners that round to 12dp on hover / press, and a trailing button that turns fully round with its chevron flipped while the menu is open',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; display: inline-flex; gap: 2px; font: 500 14px/20px "Roboto Flex", Roboto, system-ui, sans-serif; letter-spacing: .1px; }
    .sb { position: relative; height: 40px; border: 0; cursor: pointer; font: inherit; letter-spacing: inherit; background: #6750a4; color: #fff; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; overflow: hidden;
      transition: border-radius .35s cubic-bezier(.2,0,0,1), box-shadow .2s cubic-bezier(.2,0,0,1); -webkit-tap-highlight-color: transparent; }
    .sb::before { content: ''; position: absolute; inset: 0; background: #fff; opacity: 0; transition: opacity .2s cubic-bezier(.2,0,0,1); pointer-events: none; }
    .sb:hover { box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15); }
    .sb:hover::before { opacity: .08; }
    .sb:focus-visible::before { opacity: .1; }
    .sb:active::before { opacity: .1; }
    .sb:focus-visible { outline: 3px solid #625b71; outline-offset: 2px; }
    .sb svg { position: relative; width: 20px; height: 20px; fill: currentColor; flex: none; }
    .lead { padding: 0 12px 0 16px; border-radius: 20px 4px 4px 20px; }
    .lead:hover, .lead:active { border-radius: 20px 12px 12px 20px; }
    .trail { width: 48px; padding: 0 14px 0 12px; justify-content: center; border-radius: 4px 20px 20px 4px; }
    .trail:hover, .trail:active { border-radius: 12px 20px 20px 12px; }
    .trail[aria-expanded="true"] { border-radius: 20px; padding: 0 13px; }
    .trail svg { width: 22px; height: 22px; transition: transform .35s cubic-bezier(.2,0,0,1); }
    .trail[aria-expanded="true"] svg { transform: rotate(180deg); }
    .menu { position: absolute; top: 44px; left: 0; min-width: 180px; padding: 8px 0; background: #f3edf7; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15); display: none; transform-origin: top left; }
    .menu.open { display: block; animation: in .25s cubic-bezier(.2,0,0,1); }
    @keyframes in { from { opacity: 0; transform: scaleY(.6); } }
    .it { display: flex; align-items: center; gap: 12px; width: 100%; height: 48px; padding: 0 12px; border: 0; background: none; font: 400 14px/20px "Roboto Flex", Roboto, system-ui, sans-serif; letter-spacing: .25px; color: #1d1b20; cursor: pointer; text-align: left; white-space: nowrap; }
    .it:hover { background: rgba(29,27,32,.08); }
    .it:focus-visible { background: rgba(29,27,32,.1); outline: 0; }
    .it svg { width: 24px; height: 24px; fill: #49454f; flex: none; }
  `,
  html: `
    <div class="wrap">
      <button class="sb lead" type="button"><svg viewBox="0 -960 960 960"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM565-275q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg><span>Save</span></button>
      <button class="sb trail" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="More save options"><svg viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></button>
      <div class="menu" role="menu">
        <button class="it" type="button" role="menuitem"><svg viewBox="0 -960 960 960"><path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>Save as…</button>
        <button class="it" type="button" role="menuitem"><svg viewBox="0 -960 960 960"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>Save a copy</button>
        <button class="it" type="button" role="menuitem"><svg viewBox="0 -960 960 960"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>Download</button>
      </div>
    </div>`,
  init(root, host) {
    const trail = root.querySelector('.trail'), menu = root.querySelector('.menu');
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v) => { trail.setAttribute('aria-expanded', v); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); };
    trail.addEventListener('click', () => set(trail.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('.it').forEach((it) => it.addEventListener('click', () => { set(false); trail.focus({ preventScroll: true }); }));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && trail.getAttribute('aria-expanded') === 'true') { set(false); trail.focus({ preventScroll: true }); } });
    return () => set(false);
  },
};
