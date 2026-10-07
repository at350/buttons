export default {
  id: 'mb-raycast-bar',
  credit: 'Raycast — root search window: type to filter real app results, ↑↓ to move the highlight, ↵ to open; action bar with the Raycast mark, "Open Application ↵" and "Actions ⌘K"',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 20px; border-radius: 12px; background: #0b0b0d url(assets/real/wall-macos-sonoma-dark.jpg) 50% 40% / cover no-repeat; }
    .win { max-width: 100%; border-radius: 12px; background: rgba(28,28,30,.94); backdrop-filter: blur(30px) saturate(150%); -webkit-backdrop-filter: blur(30px) saturate(150%); overflow: hidden;
      box-shadow: 0 0 0 1px rgba(255,255,255,.1) inset, 0 0 0 1px rgba(0,0,0,.6), 0 24px 60px -12px rgba(0,0,0,.7);
      font: 400 14px/1 Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif; color: #ececee; -webkit-font-smoothing: antialiased; }
    input { display: block; width: 100%; height: 52px; padding: 0 18px; border: 0; outline: none; background: transparent; color: #fff; font: inherit; font-size: 17px; }
    input::placeholder { color: #8e8e93; }
    .list { height: 218px; border-top: 1px solid rgba(255,255,255,.08); padding: 6px; overflow: hidden; }
    .sec { height: 26px; padding: 8px 10px 0; color: #8e8e93; font-size: 12px; font-weight: 500; }
    .it { display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 10px; border-radius: 8px; color: #ececee; cursor: pointer; }
    .it[hidden] { display: none; }
    .it.hl { background: rgba(255,255,255,.1); }
    .tile { width: 22px; height: 22px; border-radius: 6px; flex: none; display: grid; place-items: center; }
    .tile svg { width: 14px; height: 14px; }
    img.tile { display: block; object-fit: cover; }
    .it .k { margin-left: auto; color: #8e8e93; font-size: 13px; }
    .it[aria-selected="true"] .k { color: #ff6363; }
    .empty { display: none; height: 120px; place-items: center; color: #8e8e93; font-size: 13px; }
    .list.none .empty { display: grid; } .list.none .sec { visibility: hidden; }
    .foot { display: flex; align-items: center; gap: 10px; height: 40px; padding: 0 10px 0 14px; border-top: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.02); color: #ececee; font-size: 13px; font-weight: 500; }
    .foot .mark { width: 18px; height: 18px; fill: #ff6363; margin-right: auto; }
    .foot .act { display: inline-flex; align-items: center; gap: 6px; }
    .foot .act + .act { padding-left: 10px; border-left: 1px solid rgba(255,255,255,.12); color: #8e8e93; }
    kbd { min-width: 20px; height: 20px; padding: 0 5px; border-radius: 5px; background: rgba(255,255,255,.1); color: #c7c7cc; font: 500 12px/20px Inter, system-ui, sans-serif; text-align: center; }
  `,
  html: `
    <div class="stage">
      <div class="win">
        <input type="text" placeholder="Search for apps and commands..." aria-label="Search for apps and commands" spellcheck="false" autocomplete="off" role="combobox" aria-expanded="true">
        <div class="list" role="listbox" aria-label="Results">
          <div class="sec">Results</div>
          <div class="it hl" role="option" aria-selected="false" data-n="Linear"><img class="tile" src="assets/real/mb-app-linear.jpg" alt="" width="22" height="22">Linear<span class="k">Application</span></div>
          <div class="it" role="option" aria-selected="false" data-n="Figma"><img class="tile" src="assets/real/mb-app-figma.jpg" alt="" width="22" height="22">Figma<span class="k">Application</span></div>
          <div class="it" role="option" aria-selected="false" data-n="Notion"><img class="tile" src="assets/real/mb-app-notion.jpg" alt="" width="22" height="22">Notion<span class="k">Application</span></div>
          <div class="it" role="option" aria-selected="false" data-n="Spotify"><img class="tile" src="assets/real/mb-app-spotify.jpg" alt="" width="22" height="22">Spotify<span class="k">Application</span></div>
          <div class="it" role="option" aria-selected="false" data-n="Clipboard History"><span class="tile" style="background:#ff6363"><svg viewBox="0 0 24 24"><path fill="#fff" d="M6.004 15.492v2.504L0 11.992l1.258-1.249Zm2.504 2.504H6.004L12.008 24l1.253-1.253zm14.24-4.747L24 11.997 12.003 0 10.75 1.251 15.491 6h-2.865L9.317 2.692 8.065 3.944l2.06 2.06H8.691v9.31H18v-1.432l2.06 2.06 1.252-1.252-3.312-3.32V8.506ZM6.63 5.372 5.38 6.625l1.342 1.343 1.251-1.253Zm10.655 10.655-1.247 1.251 1.342 1.343 1.253-1.251zM3.944 8.059 2.692 9.31l3.312 3.314v-2.506zm9.936 9.937h-2.504l3.314 3.312 1.25-1.252z"/></svg></span>Clipboard History<span class="k">Command</span></div>
          <div class="empty">No Results</div>
        </div>
        <div class="foot"><svg class="mark" viewBox="0 0 24 24" aria-label="Raycast"><path d="M6.004 15.492v2.504L0 11.992l1.258-1.249Zm2.504 2.504H6.004L12.008 24l1.253-1.253zm14.24-4.747L24 11.997 12.003 0 10.75 1.251 15.491 6h-2.865L9.317 2.692 8.065 3.944l2.06 2.06H8.691v9.31H18v-1.432l2.06 2.06 1.252-1.252-3.312-3.32V8.506ZM6.63 5.372 5.38 6.625l1.342 1.343 1.251-1.253Zm10.655 10.655-1.247 1.251 1.342 1.343 1.253-1.251zM3.944 8.059 2.692 9.31l3.312 3.314v-2.506zm9.936 9.937h-2.504l3.314 3.312 1.25-1.252z"/></svg><span class="act"><span class="lab">Open Application</span><kbd>↵</kbd></span><span class="act">Actions <kbd>⌘</kbd><kbd>K</kbd></span></div>
      </div>
    </div>`,
  init(root) {
    const input = root.querySelector('input'), list = root.querySelector('.list'), lab = root.querySelector('.lab');
    const items = [...root.querySelectorAll('.it')];
    let vis = items, idx = 0;
    const paint = () => { items.forEach((it) => it.classList.toggle('hl', it === vis[idx])); const cur = vis[idx]; lab.textContent = cur && cur.dataset.n === 'Clipboard History' ? 'Open Command' : 'Open Application'; };
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      vis = items.filter((it) => { const ok = it.dataset.n.toLowerCase().includes(q); it.hidden = !ok; return ok; });
      list.classList.toggle('none', !vis.length); idx = 0; paint();
    });
    const open = (it) => items.forEach((x) => x.setAttribute('aria-selected', String(x === it && x.getAttribute('aria-selected') !== 'true')));
    input.addEventListener('keydown', (e) => {
      if (!vis.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); idx = (idx + 1) % vis.length; paint(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); idx = (idx + vis.length - 1) % vis.length; paint(); }
      else if (e.key === 'Enter') { e.preventDefault(); open(vis[idx]); }
    });
    items.forEach((it) => {
      it.addEventListener('mousemove', () => { const i = vis.indexOf(it); if (i !== idx) { idx = i; paint(); } });
      it.addEventListener('click', () => { open(it); input.focus(); });
    });
    paint();
  },
};
