export default {
  id: 'mb-arc-tab',
  credit: 'Arc browser — tinted sidebar with pill tabs that glide the white highlight, plus a "Little Arc" bubble that pops from the + button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; max-width: 100%; height: 190px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(160deg, #f7a7c5, #c8a7f7 55%, #a7d8f7); font: 500 13px/1 Inter, -apple-system, system-ui, sans-serif; }
    .side { position: absolute; left: 10px; top: 10px; bottom: 10px; width: 150px; display: flex; flex-direction: column; gap: 4px; }
    .tabs { position: relative; display: grid; gap: 4px; }
    .pill { position: absolute; left: 0; right: 0; top: 0; height: 32px; border-radius: 9px; background: rgba(255,255,255,.7); box-shadow: 0 1px 2px rgba(0,0,0,.08);
      transition: transform .45s linear(0, 0.35 8%, 0.72 16%, 0.95 25%, 1.05 34%, 1.02 48%, 0.99 62%, 1); }
    .tab { position: relative; height: 32px; padding: 0 10px; border: 0; border-radius: 9px; background: transparent; color: rgba(40,20,60,.75); cursor: pointer;
      display: flex; align-items: center; gap: 9px; text-align: left; -webkit-tap-highlight-color: transparent; transition: background .15s, color .15s; }
    .tab:hover { background: rgba(255,255,255,.3); }
    .tab[aria-selected="true"] { color: #1d1030; }
    .tab:focus-visible { outline: 2px solid #fff; outline-offset: -2px; }
    .tab i { width: 16px; height: 16px; border-radius: 4px; flex: none; }
    .new { height: 32px; margin-top: auto; border: 0; border-radius: 9px; background: transparent; color: rgba(40,20,60,.75); cursor: pointer; display: flex; align-items: center; gap: 9px; padding: 0 10px; -webkit-tap-highlight-color: transparent; transition: background .15s; }
    .new:hover { background: rgba(255,255,255,.3); }
    .new:focus-visible { outline: 2px solid #fff; outline-offset: -2px; }
    .new svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; transition: transform .35s cubic-bezier(.2,.8,.2,1); }
    .new[aria-expanded="true"] svg { transform: rotate(45deg); }
    .win { position: absolute; left: 172px; top: 10px; right: 10px; bottom: 10px; border-radius: 10px; background: #fff; box-shadow: 0 10px 30px rgba(60,20,90,.18); }
    .win::before { content: ''; position: absolute; left: 12px; top: 12px; width: 60%; height: 8px; border-radius: 4px; background: #e9e4f2; }
    .win::after { content: ''; position: absolute; left: 12px; top: 28px; width: 40%; height: 8px; border-radius: 4px; background: #f1edf7; }
    .little { position: absolute; left: 50%; top: 50%; width: 176px; height: 110px; border-radius: 14px; background: rgba(255,255,255,.96);
      box-shadow: 0 20px 50px rgba(60,20,90,.3), 0 0 0 1px rgba(255,255,255,.6); transform: translate(-50%,-50%) scale(.6); opacity: 0; pointer-events: none;
      transition: transform .4s linear(0, 0.4 10%, 0.85 20%, 1.08 32%, 1.03 48%, 0.99 64%, 1), opacity .2s; }
    .little.on { transform: translate(-50%,-50%) scale(1); opacity: 1; pointer-events: auto; }
    .little input { position: absolute; left: 12px; right: 12px; top: 12px; height: 32px; border: 0; border-radius: 8px; background: #f1edf7; padding: 0 10px; font: inherit; outline: none; color: #1d1030; }
    .little input:focus { box-shadow: 0 0 0 2px #c8a7f7; }
  `,
  html: `
    <div class="stage">
      <div class="side">
        <div class="tabs" role="tablist">
          <span class="pill"></span>
          <button class="tab" type="button" role="tab" aria-selected="true"><i style="background:#f24e1e"></i>Figma</button>
          <button class="tab" type="button" role="tab" aria-selected="false"><i style="background:#5e6ad2"></i>Linear</button>
          <button class="tab" type="button" role="tab" aria-selected="false"><i style="background:#1d1030"></i>Notion</button>
        </div>
        <button class="new" type="button" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>New Tab</button>
      </div>
      <div class="win"></div>
      <div class="little" role="dialog" aria-label="Little Arc"><input type="text" placeholder="Search or enter URL…" aria-label="Search or enter URL"></div>
    </div>`,
  init(root) {
    const pill = root.querySelector('.pill');
    const tabs = [...root.querySelectorAll('.tab')];
    const nb = root.querySelector('.new');
    const little = root.querySelector('.little');
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      tabs.forEach((x, j) => x.setAttribute('aria-selected', String(i === j)));
      pill.style.transform = `translateY(${i * 36}px)`;
    }));
    const toggle = (on) => { nb.setAttribute('aria-expanded', String(on)); little.classList.toggle('on', on); if (on) little.querySelector('input').focus(); };
    nb.addEventListener('click', () => toggle(nb.getAttribute('aria-expanded') !== 'true'));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
  },
};
