export default {
  id: 'lb-shiny-text',
  credit: 'Magic UI / 21st.dev — Animated Shiny Text announcement pill: a specular sweep runs through the gray label via background-clip:text; click to flip to the dark variant',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 20px 28px; border-radius: 12px; background: #fff; display: inline-block; transition: background .3s; }
    .stage.dark { background: #0a0a0a; }
    .pill { display: inline-flex; align-items: center; gap: 6px; height: 36px; padding: 0 16px 0 14px; border-radius: 9999px; border: 1px solid rgba(0,0,0,.08); background: #f5f5f5; cursor: pointer; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; transition: background .3s, border-color .3s, box-shadow .3s; -webkit-tap-highlight-color: transparent; }
    .pill:hover { background: #e5e5e5; border-color: rgba(0,0,0,.14); }
    .pill:focus-visible { outline: 2px solid #737373; outline-offset: 3px; }
    .dark .pill { background: #171717; border-color: rgba(255,255,255,.1); }
    .dark .pill:hover { background: #262626; }
    .sh { --w: 100px; display: inline-block; max-width: 400px; color: rgba(0,0,0,.6); background: linear-gradient(110deg, transparent calc(50% - var(--w)), rgba(0,0,0,.7) 50%, transparent calc(50% + var(--w))); background-size: 250% 100%; background-position: 100% 0; -webkit-background-clip: text; background-clip: text; animation: shine 2.5s cubic-bezier(.6,.6,0,1) infinite; }
    .dark .sh { color: rgba(255,255,255,.6); background-image: linear-gradient(110deg, transparent calc(50% - var(--w)), rgba(255,255,255,.9) 50%, transparent calc(50% + var(--w))); }
    @keyframes shine { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }
    .em { font-size: 14px; }
    .pill svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; color: rgba(0,0,0,.6); transition: transform .3s cubic-bezier(.2,0,0,1), color .3s; }
    .dark .pill svg { color: rgba(255,255,255,.7); }
    .pill:hover svg { transform: translateX(3px); }
  `,
  html: `
    <div class="stage">
      <button class="pill" type="button" aria-pressed="false"><span class="em">✨</span><span class="sh">Introducing Magic UI</span><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), b = root.querySelector('.pill');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); st.classList.toggle('dark', on); });
  },
};
