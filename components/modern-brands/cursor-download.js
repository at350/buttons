export default {
  id: 'mb-cursor-download',
  credit: 'Cursor (cursor.com) — white "Download for macOS" with the ⌘ keycap hint and a chip-picker chevron menu',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 22px 26px 94px; border-radius: 12px; background: #0f0f10; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .grp { position: relative; display: inline-flex; border-radius: 8px; box-shadow: 0 1px 0 rgba(255,255,255,.08) inset, 0 8px 24px -8px rgba(0,0,0,.8); }
    .dl, .ch { height: 40px; border: 0; background: #fff; color: #0f0f10; cursor: pointer; font: inherit; -webkit-tap-highlight-color: transparent; transition: background .15s, transform .15s cubic-bezier(.2,.8,.2,1); }
    .dl { padding: 0 14px; border-radius: 8px 0 0 8px; display: inline-flex; align-items: center; gap: 9px; letter-spacing: -.01em; }
    .ch { width: 36px; border-radius: 0 8px 8px 0; border-left: 1px solid #e3e3e3; display: grid; place-items: center; }
    .dl:hover, .ch:hover { background: #ebebeb; }
    .grp:active .dl, .grp:active .ch { transform: translateY(1px); }
    .dl:focus-visible, .ch:focus-visible, .opt:focus-visible { outline: 2px solid #fff; outline-offset: 2px; z-index: 1; }
    .dl svg { width: 15px; height: 15px; fill: currentColor; }
    .ch svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .ch[aria-expanded="true"] svg { transform: rotate(180deg); }
    kbd { display: inline-flex; gap: 2px; height: 20px; padding: 0 5px; align-items: center; border-radius: 4px; background: #f0f0f0; border: 1px solid #dcdcdc; border-bottom-width: 2px;
      font: 500 11px/1 "JetBrains Mono", ui-monospace, monospace; color: #555; transition: transform .1s, border-bottom-width .1s; }
    .dl:active kbd { transform: translateY(1px); border-bottom-width: 1px; }
    .menu { position: absolute; left: 26px; top: 68px; width: 196px; padding: 4px; border-radius: 10px; background: #1a1a1c; border: 1px solid #2a2a2e; box-shadow: 0 16px 40px rgba(0,0,0,.6);
      transform-origin: top left; transform: scale(.95) translateY(-4px); opacity: 0; pointer-events: none; transition: transform .2s cubic-bezier(.2,.8,.2,1), opacity .15s; }
    .menu.on { transform: none; opacity: 1; pointer-events: auto; }
    .opt { display: flex; align-items: center; justify-content: space-between; width: 100%; height: 34px; padding: 0 10px; border: 0; border-radius: 6px; background: transparent; color: #d4d4d8; font: inherit; font-size: 13px; cursor: pointer; text-align: left; }
    .opt:hover { background: #26262a; color: #fff; }
    .opt[aria-checked="true"]::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #fff; }
    .dl.got { background: #e8f5e9; }
    .dl.got svg path { d: path('M4 12.5 9 17.5 20 6.5'); fill: none; stroke: #0f0f10; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="stage">
      <div class="grp">
        <button class="dl" type="button"><svg viewBox="0 0 24 24"><path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8 2.2-1.2 3-2.4c.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.6-3.9zM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z"/></svg><span class="lbl">Download for macOS</span><kbd><span>⌘</span><span>D</span></kbd></button>
        <button class="ch" type="button" aria-expanded="false" aria-label="Choose build"><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button>
      </div>
      <div class="menu" role="menu">
        <button class="opt" type="button" role="menuitemradio" aria-checked="true" data-l="Apple Silicon">Apple Silicon</button>
        <button class="opt" type="button" role="menuitemradio" aria-checked="false" data-l="Intel">Intel</button>
        <button class="opt" type="button" role="menuitemradio" aria-checked="false" data-l="Universal">Universal</button>
      </div>
    </div>`,
  init(root) {
    const dl = root.querySelector('.dl'), lbl = root.querySelector('.lbl'), ch = root.querySelector('.ch'), menu = root.querySelector('.menu');
    const set = (on) => { ch.setAttribute('aria-expanded', String(on)); menu.classList.toggle('on', on); };
    ch.addEventListener('click', () => set(ch.getAttribute('aria-expanded') !== 'true'));
    root.querySelectorAll('.opt').forEach((o) => o.addEventListener('click', () => {
      root.querySelectorAll('.opt').forEach((x) => x.setAttribute('aria-checked', String(x === o)));
      dl.classList.remove('got'); lbl.textContent = `Download for macOS`; dl.dataset.chip = o.dataset.l; set(false);
    }));
    dl.addEventListener('click', () => { const on = dl.classList.toggle('got'); lbl.textContent = on ? `Downloaded · ${dl.dataset.chip || 'Apple Silicon'}` : 'Download for macOS'; });
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') { e.preventDefault(); dl.click(); } });
  },
};
