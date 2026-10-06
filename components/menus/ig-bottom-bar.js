// Glyphs are Instagram's own 24x24 nav icons (outline + active variants).
const S = (inner, cls) => `<svg class="${cls}" viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">${inner}</svg>`;
const HOME = S('<path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"/>', 'o')
  + S('<path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"/>', 'f');
const REELS = S('<line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"/><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"/><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"/><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fill-rule="evenodd"/>', 'o')
  + S('<path d="m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z" fill-rule="evenodd"/>', 'f');
const DM = S('<line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"/><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"/>', 'o')
  + S('<polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"/><line fill="none" stroke="#000" stroke-linejoin="round" stroke-width="1.8" x1="21" x2="9.218" y1="3.6" y2="10.083"/>', 'f');
const SEARCH = S('<path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"/>', 'o')
  + S('<path d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="16.511" x2="21.643" y1="16.511" y2="21.643"/>', 'f');

const t = (label, glyph, sel, extra = '') => `<button class="t" type="button" role="tab" aria-selected="${sel}" aria-label="${label}"><span class="g">${glyph}${extra}</span></button>`;

export default {
  id: 'mn-ig-bottom-bar',
  credit: 'Instagram iOS tab bar (2025–26 layout: Home, Reels, Messages, Search, Profile) — dark mode',
  size: 'wide',
  css: `
    :host { display: block; }
    .phone { width: 390px; max-width: 100%; margin: 0 auto; background: #000; border-radius: 12px; overflow: hidden; }
    .bar { display: flex; height: 49px; border-top: .5px solid #262626; -webkit-tap-highlight-color: transparent; }
    .t { flex: 1; min-width: 0; height: 49px; display: grid; place-items: center; background: none; border: 0; padding: 0; color: #f5f5f5; cursor: pointer; outline: none; }
    .g { position: relative; display: grid; place-items: center; width: 26px; height: 26px; transition: transform .35s cubic-bezier(.32,.72,0,1); }
    .t:active .g { transform: scale(.86); transition-duration: .1s; }
    .g svg { grid-area: 1 / 1; display: block; }
    .g .f, .t[aria-selected="true"] .g .o { display: none; }
    .t[aria-selected="true"] .g .f { display: block; }
    .t:focus-visible .g::after { content: ""; position: absolute; inset: -7px; border-radius: 10px; box-shadow: 0 0 0 2px #0095f6; }
    .badge { position: absolute; top: -8px; left: 17px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; background: #ff3040; color: #fff; box-shadow: 0 0 0 2px #000; font: 700 11px/18px -apple-system, system-ui, sans-serif; text-align: center; transition: transform .25s cubic-bezier(.32,.72,0,1), opacity .2s; }
    .badge.gone { transform: scale(0); opacity: 0; }
    .av { grid-area: 1 / 1; display: block; width: 26px; height: 26px; border-radius: 50%; object-fit: cover; background: #262626; transition: box-shadow .2s; }
    .t[aria-selected="true"] .av { box-shadow: 0 0 0 1.5px #000, 0 0 0 3.5px #f5f5f5; }
    .hi { height: 34px; display: grid; place-items: end center; padding-bottom: 8px; }
    .hi span { width: 134px; height: 5px; border-radius: 3px; background: #f5f5f5; }
  `,
  html: `
    <div class="phone">
      <div class="bar" role="tablist" aria-label="Instagram">
        ${t('Home', HOME, true)}
        ${t('Reels', REELS, false)}
        ${t('Messages', DM, false, '<span class="badge" aria-label="3 unread">3</span>')}
        ${t('Search', SEARCH, false)}
        ${t('Profile', '<img class="av" src="assets/portraits/women-19.jpg" alt="" width="26" height="26" draggable="false">', false)}
      </div>
      <div class="hi" aria-hidden="true"><span></span></div>
    </div>`,
  init(root) {
    const tabs = [...root.querySelectorAll('.t')];
    const badge = root.querySelector('.badge');
    const select = (t) => {
      tabs.forEach((x) => { x.setAttribute('aria-selected', x === t); x.tabIndex = x === t ? 0 : -1; });
      if (t.getAttribute('aria-label') === 'Messages') badge.classList.add('gone');
    };
    tabs.forEach((t, i) => {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const n = tabs[(i + d + tabs.length) % tabs.length]; select(n); n.focus({ preventScroll: true });
      });
    });
  },
};
