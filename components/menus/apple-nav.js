export default {
  id: 'mn-apple-nav',
  credit: 'Apple.com global navigation bar (black, 12px, hover brightens)',
  size: 'full',
  css: `
    :host { display: block; }
    .bar {
      container-type: inline-size; background: rgba(0,0,0,.88); color: #f5f5f7; border-radius: 12px;
      font: 12px/1 -apple-system, system-ui, "Helvetica Neue", Helvetica, sans-serif; letter-spacing: -.01em;
    }
    .in { max-width: 1024px; margin: 0 auto; padding: 0 12px; height: 44px; display: flex; align-items: center; justify-content: space-between; }
    .in > * { display: flex; align-items: center; height: 44px; padding: 0 8px; background: none; border: 0; color: rgba(255,255,255,.8); font: inherit; cursor: pointer; border-radius: 4px; white-space: nowrap; }
    .in > *:hover, .in > *.on { color: #fff; }
    .in > *:focus-visible { outline: 2px solid #2997ff; outline-offset: -4px; }
    .in > *:active { color: rgba(255,255,255,.6); }
    svg { display: block; fill: currentColor; }
    .hb { display: none; }
    @container (width < 760px) {
      .txt { display: none; }
      .hb { display: flex; }
      .in > .logo { margin-right: auto; }
    }
  `,
  html: `
    <nav class="bar" aria-label="Apple">
      <div class="in">
        <button class="logo" type="button" aria-label="Apple"><svg width="14" height="17" viewBox="0 0 14 17"><path d="M11.6 9c0-2 1.7-3 1.8-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8s-1.7-.8-2.8-.7C2.9 4.4 1.6 5.3.9 6.6c-1.5 2.5-.4 6.3 1.1 8.4.7 1 1.5 2.2 2.6 2.1 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.2-2.4-.1 0-2.2-.8-2.2-3.6zM9.6 2.9c.6-.7 1-1.7.8-2.7-.8 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.6-1.2z"/></svg></button>
        <button class="txt" type="button">Store</button>
        <button class="txt" type="button">Mac</button>
        <button class="txt" type="button">iPad</button>
        <button class="txt" type="button">iPhone</button>
        <button class="txt" type="button">Watch</button>
        <button class="txt" type="button">Vision</button>
        <button class="txt" type="button">AirPods</button>
        <button class="txt" type="button">TV &amp; Home</button>
        <button class="txt" type="button">Entertainment</button>
        <button class="txt" type="button">Accessories</button>
        <button class="txt" type="button">Support</button>
        <button type="button" aria-label="Search"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="6.3" cy="6.3" r="4.8"/><path d="M9.8 9.8l4 4" stroke-linecap="round"/></svg></button>
        <button type="button" aria-label="Bag"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 5.5h10l.8 9.5H1.2z" stroke-linejoin="round"/><path d="M4.5 5.5V4a2.5 2.5 0 015 0v1.5"/></svg></button>
        <button class="hb" type="button" aria-expanded="false" aria-label="Menu"><svg width="18" height="12" viewBox="0 0 18 12" stroke="currentColor"><path d="M0 2.5h18M0 9.5h18"/></svg></button>
      </div>
    </nav>`,
  init(root) {
    const items = [...root.querySelectorAll('.txt')];
    items.forEach((b) => b.addEventListener('click', () => {
      const was = b.classList.contains('on');
      items.forEach((x) => x.classList.remove('on'));
      if (!was) b.classList.add('on');
    }));
    const hb = root.querySelector('.hb');
    hb.addEventListener('click', () => hb.setAttribute('aria-expanded', hb.getAttribute('aria-expanded') !== 'true'));
  },
};
