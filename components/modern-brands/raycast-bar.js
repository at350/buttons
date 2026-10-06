export default {
  id: 'mb-raycast-bar',
  credit: 'Raycast — root search window: type to filter real app results, ↑↓ to move the highlight, ↵ to open; action bar with the Raycast mark, "Open Application ↵" and "Actions ⌘K"',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 20px; border-radius: 12px; background: #0b0b0d url(assets/wide/02.webp) 50% 40% / cover no-repeat; }
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
          <div class="it hl" role="option" aria-selected="false" data-n="Linear"><span class="tile" style="background:linear-gradient(160deg,#6c78e0,#3f47a8)"><svg viewBox="0 0 24 24"><path fill="#fff" d="M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z"/></svg></span>Linear<span class="k">Application</span></div>
          <div class="it" role="option" aria-selected="false" data-n="Figma"><span class="tile" style="background:#1e1e1e"><svg viewBox="0 0 38 57" style="width:10px"><path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/><path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/><path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/><path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/><path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg></span>Figma<span class="k">Application</span></div>
          <div class="it" role="option" aria-selected="false" data-n="Notion"><span class="tile" style="background:#fff"><svg viewBox="0 0 24 24"><path fill="#000" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg></span>Notion<span class="k">Application</span></div>
          <div class="it" role="option" aria-selected="false" data-n="Spotify"><span class="tile" style="background:#000"><svg viewBox="0 0 24 24"><path fill="#1ed760" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg></span>Spotify<span class="k">Application</span></div>
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
