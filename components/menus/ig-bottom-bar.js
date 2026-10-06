export default {
  id: 'mn-ig-bottom-bar',
  credit: 'Instagram iOS bottom tab bar — five glyphs, active one fills and bounces',
  size: 'wide',
  css: `
    :host { display: block; }
    .phone { max-width: 390px; margin: 0 auto; background: #000; border-radius: 12px; padding: 10px 0 0; }
    .bar { display: flex; justify-content: space-around; align-items: center; height: 50px; border-top: 1px solid #262626; }
    .t { width: 56px; height: 44px; display: grid; place-items: center; background: none; border: 0; color: #fff; cursor: pointer; border-radius: 10px; padding: 0; }
    .t:focus-visible { outline: 2px solid #0095f6; outline-offset: -2px; }
    .t svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; transition: transform .25s; }
    .t:active svg { transform: scale(.85); }
    .t[aria-selected="true"] svg { fill: currentColor; animation: pop .35s cubic-bezier(.34,1.56,.64,1); }
    .t[aria-selected="true"] .sr { fill: none; stroke-width: 2.6; }
    .av { width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7); padding: 2px; }
    .av span { display: block; width: 100%; height: 100%; border-radius: 50%; background: #999 radial-gradient(circle at 50% 40%, #ddd 0 30%, transparent 32%), #999; }
    .t[aria-selected="true"] .av { box-shadow: 0 0 0 1.5px #000, 0 0 0 3px #fff; }
    .home { height: 22px; display: grid; place-items: center; }
    .home span { width: 134px; height: 5px; border-radius: 3px; background: #fff; }
    @keyframes pop { 0% { transform: scale(.8); } 60% { transform: scale(1.12); } 100% { transform: scale(1); } }
  `,
  html: `
    <div class="phone">
      <div class="bar" role="tablist">
        <button class="t" type="button" role="tab" aria-selected="true" aria-label="Home"><svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/></svg></button>
        <button class="t" type="button" role="tab" aria-selected="false" aria-label="Search"><svg class="sr" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="7.5"/><path d="M16 16l5 5"/></svg></button>
        <button class="t" type="button" role="tab" aria-selected="false" aria-label="Reels"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M3 8.5h18M8.5 3l3 5.5M14.5 3l3 5.5"/><path d="M10.5 12.5v5l4-2.5z" fill="#fff" stroke="none"/></svg></button>
        <button class="t" type="button" role="tab" aria-selected="false" aria-label="Shop"><svg viewBox="0 0 24 24"><path d="M5 8h14l1 13H4z"/><path d="M8.5 8V6a3.5 3.5 0 017 0v2"/></svg></button>
        <button class="t" type="button" role="tab" aria-selected="false" aria-label="Profile"><span class="av"><span></span></span></button>
      </div>
      <div class="home"><span></span></div>
    </div>`,
  init(root) {
    const tabs = [...root.querySelectorAll('.t')];
    tabs.forEach((t) => t.addEventListener('click', () => tabs.forEach((x) => x.setAttribute('aria-selected', x === t))));
  },
};
