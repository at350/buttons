export default {
  id: 'mn-newspaper-nav',
  credit: 'New York Times-style section bar — uppercase Franklin, hairlines, underline on hover',
  size: 'full',
  css: `
    :host { display: block; }
    .wrap { background: #fff; border-radius: 12px; padding: 0 16px; }
    .mast { text-align: center; font: 700 34px/1 Georgia, "Times New Roman", serif; letter-spacing: -.01em; color: #121212; padding: 16px 0 12px; border-bottom: 1px solid #121212; }
    .mast span { display: inline-block; border-top: 1px solid #121212; border-bottom: 1px solid #121212; padding: 4px 10px; font-size: 20px; letter-spacing: .02em; }
    .nav { position: relative; display: flex; justify-content: center; gap: 0; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid #e2e2e2; }
    .nav::-webkit-scrollbar { display: none; }
    .it { flex: none; position: relative; background: none; border: 0; padding: 12px 11px; font: 700 11px/1 "Helvetica Neue", Arial, sans-serif; letter-spacing: .05em; text-transform: uppercase; color: #121212; cursor: pointer; white-space: nowrap; }
    .it::after { content: ""; position: absolute; left: 11px; right: 11px; bottom: 8px; height: 1px; background: #121212; transform: scaleX(0); transition: transform .15s; }
    .it:hover::after { transform: scaleX(1); }
    .it[aria-current="true"]::after { transform: scaleX(1); height: 2px; bottom: -1px; left: 0; right: 0; }
    .it:focus-visible { outline: 2px solid #326891; outline-offset: -2px; }
  `,
  html: `
    <div class="wrap">
      <div class="mast"><span>The Daily</span></div>
      <nav class="nav">
        <button class="it" type="button" aria-current="true">U.S.</button>
        <button class="it" type="button">World</button>
        <button class="it" type="button">Business</button>
        <button class="it" type="button">Arts</button>
        <button class="it" type="button">Lifestyle</button>
        <button class="it" type="button">Opinion</button>
        <button class="it" type="button">Audio</button>
        <button class="it" type="button">Games</button>
        <button class="it" type="button">Cooking</button>
        <button class="it" type="button">Wirecutter</button>
        <button class="it" type="button">The Athletic</button>
      </nav>
    </div>`,
  init(root) {
    const items = [...root.querySelectorAll('.it')];
    items.forEach((b) => b.addEventListener('click', () => {
      items.forEach((x) => x.removeAttribute('aria-current'));
      b.setAttribute('aria-current', 'true');
      const nav = b.parentElement, l = b.offsetLeft, r = l + b.offsetWidth;
      if (l < nav.scrollLeft) nav.scrollTo({ left: l - 8, behavior: 'smooth' });
      else if (r > nav.scrollLeft + nav.clientWidth) nav.scrollTo({ left: r - nav.clientWidth + 8, behavior: 'smooth' });
    }));
  },
};
