export default {
  id: 'mb-raycast-bar',
  credit: 'Raycast — frosted command bar with the red-to-orange gradient outline; type to filter, ↑↓ to move, ↵ to open',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 22px; border-radius: 12px; background: radial-gradient(80% 80% at 20% 0%, #3a1f2f, transparent 60%), radial-gradient(70% 70% at 90% 100%, #1f2a3a, transparent 60%), #0b0b0d; }
    .bar { position: relative; border-radius: 12px; padding: 1px; max-width: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,.14), rgba(255,255,255,.05)); transition: background .3s, box-shadow .3s; }
    .bar:focus-within { background: linear-gradient(135deg, #ff6363, #ff9d57 50%, #ff6363); box-shadow: 0 0 0 1px rgba(255,99,99,.15), 0 20px 50px -10px rgba(255,99,99,.35); }
    .in { border-radius: 11px; background: rgba(28,28,32,.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); overflow: hidden;
      font: 450 14px/1 Inter, -apple-system, system-ui, sans-serif; color: #e7e7ea; }
    input { width: 100%; height: 48px; padding: 0 16px; border: 0; outline: none; background: transparent; color: #fff; font: inherit; font-size: 15px; }
    input::placeholder { color: #7c7c86; }
    .list { border-top: 1px solid rgba(255,255,255,.07); padding: 6px; display: grid; gap: 1px; }
    .it { display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 10px; border-radius: 8px; color: #c9c9d0; cursor: pointer; }
    .it[hidden] { display: none; }
    .it.hl { background: rgba(255,255,255,.08); color: #fff; }
    .it i { width: 20px; height: 20px; border-radius: 5px; flex: none; }
    .it .k { margin-left: auto; color: #7c7c86; font-size: 12px; }
    .it.hl .k { color: #a9a9b3; }
    .it[aria-selected="true"]::after { content: 'Open'; margin-left: 6px; font-size: 11px; padding: 2px 6px; border-radius: 4px; background: #ff6363; color: #fff; }
    .foot { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-top: 1px solid rgba(255,255,255,.07); color: #7c7c86; font-size: 12px; }
    .foot svg { width: 16px; height: 16px; }
    kbd { font: 500 11px/1 Inter, system-ui, sans-serif; padding: 3px 5px; border-radius: 4px; background: rgba(255,255,255,.1); color: #c9c9d0; }
    .bar:focus-within .mark { filter: saturate(1.4); }
  `,
  html: `
    <div class="stage">
      <div class="bar">
        <div class="in">
          <input type="text" placeholder="Search for apps and commands..." aria-label="Search" spellcheck="false" autocomplete="off">
          <div class="list" role="listbox">
            <div class="it hl" role="option" aria-selected="false" data-n="Calendar"><i style="background:#ff3b30"></i>Calendar<span class="k">Application</span></div>
            <div class="it" role="option" aria-selected="false" data-n="Clipboard History"><i style="background:#ff9d57"></i>Clipboard History<span class="k">Command</span></div>
            <div class="it" role="option" aria-selected="false" data-n="Notes"><i style="background:#ffd60a"></i>Notes<span class="k">Application</span></div>
            <div class="it" role="option" aria-selected="false" data-n="Spotify"><i style="background:#1db954"></i>Spotify<span class="k">Application</span></div>
          </div>
          <div class="foot"><svg class="mark" viewBox="0 0 24 24" fill="none" stroke="#ff6363" stroke-width="2" stroke-linecap="round"><path d="M6 18 18 6M8 6h10v10M3 15l3 3M9 21l-3-3"/></svg><span>Open <kbd>↵</kbd></span></div>
        </div>
      </div>
    </div>`,
  init(root) {
    const input = root.querySelector('input');
    const items = [...root.querySelectorAll('.it')];
    let vis = items, idx = 0;
    const paint = () => vis.forEach((it, i) => it.classList.toggle('hl', i === idx));
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      vis = items.filter((it) => { const ok = it.dataset.n.toLowerCase().includes(q); it.hidden = !ok; return ok; });
      idx = 0; paint();
    });
    input.addEventListener('keydown', (e) => {
      if (!vis.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); idx = (idx + 1) % vis.length; paint(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); idx = (idx + vis.length - 1) % vis.length; paint(); }
      else if (e.key === 'Enter') { e.preventDefault(); open(vis[idx]); }
    });
    const open = (it) => items.forEach((x) => x.setAttribute('aria-selected', String(x === it && x.getAttribute('aria-selected') !== 'true')));
    items.forEach((it) => {
      it.addEventListener('mousemove', () => { idx = vis.indexOf(it); paint(); });
      it.addEventListener('click', () => { open(it); input.focus(); });
    });
  },
};
