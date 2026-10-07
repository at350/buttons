export default {
  id: 'ty-bricolage-menu',
  credit: 'Bricolage Grotesque nav — each item widens along the wdth axis (75→100) and gains weight on hover; the active one holds a red marker (Bricolage specimen site)',
  size: 'wide',
  css: `
    :host { display: block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .nav {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 30px;
      padding: 14px 20px 14px 34px;
      background: #fff;
      border: 1px solid #111;
      border-radius: 12px;
    }
    .it {
      cursor: pointer;
      background: transparent;
      border: 0;
      padding: 6px 0;
      color: #111;
      text-decoration: none;
      position: relative;
      font: 400 22px/1 'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif; display: inline-grid;
    }
    .it > span { grid-area: 1 / 1; white-space: nowrap; }
    .it .g { visibility: hidden; font-variation-settings: 'opsz' 22, 'wdth' 100, 'wght' 800; }
    .it .v { font-variation-settings: 'opsz' 22, 'wdth' 75, 'wght' 400; transition: font-variation-settings .4s cubic-bezier(.2, .8, .2, 1), color .3s; }
    .it:hover .v, .it:focus-visible .v { font-variation-settings: 'opsz' 22, 'wdth' 100, 'wght' 800; }
    .it[aria-current=true] .v { font-variation-settings: 'opsz' 22, 'wdth' 100, 'wght' 800; color: #d6241f; }
    .it::before {
      content: '';
      position: absolute;
      left: -14px;
      top: 50%;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #d6241f;
      transform: translateY(-50%) scale(0);
      transition: transform .3s cubic-bezier(.34, 1.56, .64, 1);
    }
    .it[aria-current=true]::before { transform: translateY(-50%) scale(1); }
    .it:active .v { font-variation-settings: 'opsz' 22, 'wdth' 85, 'wght' 800; }
    .it:focus-visible {
      outline: 2px solid #111;
      outline-offset: 4px;
      border-radius: 2px;
    }
  `,
  html: `<nav class="nav">
    <a class="it" href="#" aria-current="true"><span class="g" aria-hidden="true">Work</span><span class="v">Work</span></a>
    <a class="it" href="#"><span class="g" aria-hidden="true">Studio</span><span class="v">Studio</span></a>
    <a class="it" href="#"><span class="g" aria-hidden="true">Journal</span><span class="v">Journal</span></a>
    <a class="it" href="#"><span class="g" aria-hidden="true">Contact</span><span class="v">Contact</span></a>
  </nav>`,
  init(root) {
    const items = [...root.querySelectorAll('.it')];
    for (const it of items) {
      it.addEventListener('click', (e) => {
        e.preventDefault();
        for (const o of items) o.removeAttribute('aria-current');
        it.setAttribute('aria-current', 'true');
      });
    }
  },
};
