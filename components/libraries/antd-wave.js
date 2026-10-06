export default {
  id: 'lb-antd-wave',
  credit: 'Ant Design v5 — Primary (#1677ff) and Default buttons with the click "wave" ring that expands and fades from the border',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; font: 400 14px/22px -apple-system, BlinkMacSystemFont, Inter, "Segoe UI", system-ui, sans-serif; }
    .ad { position: relative; height: 32px; padding: 4px 15px; border-radius: 6px; border: 1px solid transparent; cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: all .2s cubic-bezier(.645,.045,.355,1); -webkit-tap-highlight-color: transparent; }
    .ad:focus-visible { outline: 4px solid #91caff; outline-offset: 1px; }
    .pri { background: #1677ff; color: #fff; box-shadow: 0 2px 0 rgba(5,145,255,.1); }
    .pri:hover { background: #4096ff; }
    .pri:active { background: #0958d9; }
    .def { background: #fff; color: rgba(0,0,0,.88); border-color: #d9d9d9; box-shadow: 0 2px 0 rgba(0,0,0,.02); }
    .def:hover { color: #4096ff; border-color: #4096ff; }
    .def:active { color: #0958d9; border-color: #0958d9; }
    .dsh { border-style: dashed; }
    .ad svg { width: 14px; height: 14px; }
    .ad.wave::after { content: ''; position: absolute; inset: -1px; border-radius: 6px; box-shadow: 0 0 0 0 var(--w); opacity: .2; animation: wave .4s cubic-bezier(.08,.82,.17,1) forwards; pointer-events: none; }
    @keyframes wave { to { box-shadow: 0 0 0 6px var(--w); opacity: 0; } }
    .pri { --w: #1677ff; }
    .def { --w: #1677ff; }
    .ad[aria-pressed="true"].def { color: #1677ff; border-color: #1677ff; }
    .ad[aria-pressed="true"].pri { background: #0958d9; }
  `,
  html: `
    <div class="row">
      <button class="ad pri" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>Search</button>
      <button class="ad def" type="button" aria-pressed="false">Default</button>
      <button class="ad def dsh" type="button" aria-pressed="false">Dashed</button>
    </div>`,
  init(root) {
    const timers = new Set();
    root.querySelectorAll('.ad').forEach((b) => b.addEventListener('click', () => {
      b.classList.remove('wave'); void b.offsetWidth; b.classList.add('wave');
      const k = setTimeout(() => { b.classList.remove('wave'); timers.delete(k); }, 450); timers.add(k);
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
    }));
    return () => timers.forEach(clearTimeout);
  },
};
