export default {
  id: 'gm-steam-deck-qam',
  credit: 'Valve Steam Deck — the "…" Quick Access button opens the right-hand QAM rail (tabs light up as you move); the panel overlays the screen',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 260px; height: 150px; border-radius: 12px; overflow: hidden; background: radial-gradient(ellipse at 20% 0%, #1f3a5a, #0f1823 60%, #0b1118); font-family: 'Motiva Sans', 'DM Sans', Arial, sans-serif; }
    .hero { position: absolute; left: 16px; top: 18px; width: 120px; height: 68px; border-radius: 4px; background: #2a1a10 url(assets/wide/31.webp) center / cover; box-shadow: 0 4px 12px rgba(0,0,0,.5); }
    .hero::after { content: "Play"; position: absolute; left: 8px; bottom: 8px; background: #59bf40; color: #fff; font: 700 10px 'Inter', system-ui, sans-serif; padding: 3px 9px; border-radius: 2px; }
    .dots { position: absolute; left: 16px; bottom: 14px; width: 34px; height: 34px; border-radius: 50%; border: 2px solid #3b4a5c; background: #141c26; color: #8fa3b8; cursor: pointer;
      display: grid; place-items: center; font: 700 14px/1 'Inter', system-ui, sans-serif; letter-spacing: 1px; padding: 0 0 4px; transition: background .15s, color .15s; }
    .dots:hover, .dots.on { background: #1a9fff; color: #fff; border-color: #1a9fff; }
    .dots:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .qam { position: absolute; right: 0; top: 0; bottom: 0; width: 150px; background: rgba(13, 20, 30, .92); backdrop-filter: blur(6px); transform: translateX(100%); transition: transform .22s cubic-bezier(.2,.8,.2,1); display: flex; }
    .qam.open { transform: translateX(0); }
    .rail { width: 34px; display: flex; flex-direction: column; align-items: center; padding-top: 10px; gap: 6px; border-right: 1px solid rgba(255,255,255,.08); }
    .rail button { width: 24px; height: 24px; border: none; border-radius: 4px; background: none; color: #6f8296; cursor: pointer; display: grid; place-items: center; padding: 0; }
    .rail button svg { width: 15px; height: 15px; fill: currentColor; }
    .rail button:hover { color: #c7d5e0; }
    .rail button.sel { color: #fff; background: #1a9fff; }
    .rail button:focus-visible { outline: 2px solid #fff; }
    .body { flex: 1; padding: 12px 10px; color: #c7d5e0; font-size: 10px; }
    .body h6 { margin: 0 0 8px; font: 700 11px 'Inter', system-ui, sans-serif; color: #fff; }
    .sl { height: 4px; border-radius: 2px; background: #2c3a4a; margin: 10px 0; position: relative; }
    .sl::after { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: var(--v, 60%); background: #1a9fff; border-radius: 2px; }
    .row { display: flex; justify-content: space-between; margin: 6px 0; }
  `,
  html: `
    <div class="stage">
      <div class="hero"></div>
      <button class="dots" type="button" aria-label="Quick Access Menu" aria-expanded="false">···</button>
      <aside class="qam" aria-hidden="true">
        <div class="rail" role="tablist">
          <button type="button" role="tab" aria-selected="true" class="sel" aria-label="Notifications"><svg viewBox="0 0 16 16"><path d="M8 1a4 4 0 0 0-4 4v3L2.5 11h11L12 8V5a4 4 0 0 0-4-4zm0 14a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"/></svg></button>
          <button type="button" role="tab" aria-selected="false" aria-label="Friends"><svg viewBox="0 0 16 16"><circle cx="6" cy="5" r="3"/><path d="M1 14c0-3 2-5 5-5s5 2 5 5zM11 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm0 6c2.6 0 4 1.7 4 4h-3.3c0-1.6-.4-3-1.4-4z"/></svg></button>
          <button type="button" role="tab" aria-selected="false" aria-label="Quick Settings"><svg viewBox="0 0 16 16"><path d="M9.3 1l.4 1.8 1.6.7 1.6-.9 1.3 1.3-.9 1.6.7 1.6 1.8.4v1.8l-1.8.4-.7 1.6.9 1.6-1.3 1.3-1.6-.9-1.6.7L9.3 15H6.7l-.4-1.8-1.6-.7-1.6.9-1.3-1.3.9-1.6-.7-1.6L.2 8.4V6.6l1.8-.4.7-1.6-.9-1.6 1.3-1.3 1.6.9 1.6-.7L6.7 1zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg></button>
          <button type="button" role="tab" aria-selected="false" aria-label="Performance"><svg viewBox="0 0 16 16"><path d="M9 1 3 9h4l-1 6 7-9H9z"/></svg></button>
        </div>
        <div class="body"><h6 class="hd">Quick Settings</h6><div class="row"><span>Brightness</span><span>60%</span></div><div class="sl" style="--v:60%"></div><div class="row"><span>Volume</span><span>45%</span></div><div class="sl" style="--v:45%"></div></div>
      </aside>
    </div>`,
  init(root) {
    const dots = root.querySelector('.dots'), qam = root.querySelector('.qam'), hd = root.querySelector('.hd');
    dots.addEventListener('click', () => { const open = qam.classList.toggle('open'); dots.classList.toggle('on', open); dots.setAttribute('aria-expanded', String(open)); qam.setAttribute('aria-hidden', String(!open)); });
    root.querySelectorAll('.rail button').forEach((b) => b.addEventListener('click', () => {
      root.querySelectorAll('.rail button').forEach((o) => { o.classList.toggle('sel', o === b); o.setAttribute('aria-selected', String(o === b)); });
      hd.textContent = b.getAttribute('aria-label');
    }));
  },
};
