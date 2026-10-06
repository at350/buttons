export default {
  id: 'dp-dock-stack',
  credit: 'macOS Dock stack — click the folder in the glass dock and four documents fan upward in an arc with translateZ depth',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 240px; height: 210px; border-radius: 12px; background: linear-gradient(180deg, #5b7cfa, #c084fc 60%, #f9a8d4); perspective: 800px; overflow: hidden; }
    .dock {
      position: absolute; left: 50%; bottom: 12px; transform: translateX(-50%); display: flex; align-items: flex-end; gap: 10px; padding: 8px 12px; border-radius: 18px;
      background: rgba(255, 255, 255, .28); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .5), 0 10px 30px rgba(0, 0, 0, .25);
    }
    .ic { width: 44px; height: 44px; border-radius: 11px; border: 0; padding: 0; cursor: pointer; display: grid; place-items: center; color: #fff; box-shadow: 0 4px 10px rgba(0, 0, 0, .25); transition: transform .25s cubic-bezier(.3, 1.4, .4, 1); }
    .ic:hover { transform: translateY(-8px) scale(1.12); }
    .ic:active { transform: translateY(-4px) scale(1.04); }
    .ic svg { width: 24px; height: 24px; }
    .a { background: linear-gradient(160deg, #60a5fa, #2563eb); } .c { background: linear-gradient(160deg, #a3e635, #16a34a); }
    .stack { background: linear-gradient(160deg, #7dd3fc, #0284c7); position: relative; }
    .stack[aria-expanded="true"] { transform: translateY(-6px) scale(1.05); }
    .fan { position: absolute; left: 50%; bottom: 70px; width: 0; height: 0; transform-style: preserve-3d; pointer-events: none; }
    .doc {
      --i: 0; position: absolute; left: -24px; bottom: 0; width: 48px; height: 58px; border: 0; border-radius: 6px; cursor: pointer; padding: 0;
      background: #fff; box-shadow: 0 8px 20px rgba(0, 0, 0, .25), inset 0 0 0 1px rgba(0, 0, 0, .06); display: grid; place-items: center; color: #1e293b;
      opacity: 0; transform: translateY(40px) translateZ(-40px) scale(.6); transition: transform .45s cubic-bezier(.3, 1.3, .4, 1) calc(var(--i) * 50ms), opacity .25s calc(var(--i) * 50ms);
    }
    .doc svg { width: 22px; height: 22px; }
    .open .fan { pointer-events: auto; }
    .open .doc { opacity: 1; transform: translateX(calc((var(--i) - 1.5) * 52px)) translateY(calc(var(--i) * var(--i) * -8px + var(--i) * 24px - 16px)) translateZ(calc(var(--i) * 10px)) rotate(calc((var(--i) - 1.5) * 10deg)); }
    .doc:hover { transform: translateX(calc((var(--i) - 1.5) * 52px)) translateY(calc(var(--i) * var(--i) * -8px + var(--i) * 24px - 28px)) translateZ(50px) rotate(0deg) !important; }
    .doc[aria-pressed="true"] { background: #fde68a; }
    .ic:focus-visible, .doc:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="fan">
        <button class="doc" type="button" style="--i:0" aria-pressed="false" tabindex="-1" aria-label="Document 1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg></button>
        <button class="doc" type="button" style="--i:1" aria-pressed="false" tabindex="-1" aria-label="Image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 16l5-5 4 4 3-3 6 6"/></svg></button>
        <button class="doc" type="button" style="--i:2" aria-pressed="false" tabindex="-1" aria-label="Music"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg></button>
        <button class="doc" type="button" style="--i:3" aria-pressed="false" tabindex="-1" aria-label="Archive"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9M10 13h4"/></svg></button>
      </div>
      <div class="dock">
        <button class="ic a" type="button" aria-label="Finder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 9v2M15 9v2M8 15c2.5 2 5.5 2 8 0"/></svg></button>
        <button class="ic stack" type="button" aria-expanded="false" aria-label="Downloads"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h6l2 2h10v9H3z"/></svg></button>
        <button class="ic c" type="button" aria-label="Notes"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 8h10M7 12h10M7 16h6"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), s = root.querySelector('.stack'), docs = root.querySelectorAll('.doc');
    s.addEventListener('click', () => {
      const o = s.getAttribute('aria-expanded') !== 'true';
      s.setAttribute('aria-expanded', String(o)); stage.classList.toggle('open', o);
      docs.forEach((d) => { d.tabIndex = o ? 0 : -1; });
    });
    docs.forEach((d) => d.addEventListener('click', () => d.setAttribute('aria-pressed', String(d.getAttribute('aria-pressed') !== 'true'))));
  },
};
