export default {
  id: 'ob-neopets-nav',
  credit: 'Neopets (c. 2004) — the yellow bubble navigation bar: bold Verdana tabs, the hovered one turns white, the picked one goes orange and bulges',
  size: 'wide',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .bar { display: flex; flex-wrap: wrap; gap: 3px; padding: 6px; background: #ffcc00; border: 2px solid #cc9900; border-radius: 12px; box-shadow: inset 0 2px 0 #ffe680, inset 0 -2px 0 #e6b800; max-width: 100%; }
    .tab { flex: 1 1 auto; min-width: 64px; padding: 6px 10px; border: 1px solid #b38600; border-radius: 10px; background: linear-gradient(#fff3b3, #ffd633); color: #663300; cursor: pointer; font: 700 11px/1 Verdana, Arial, sans-serif; text-shadow: 0 1px 0 #fff6cc; white-space: nowrap; transition: transform .1s, background .15s; }
    .tab:hover { background: linear-gradient(#fff, #fff3b3); }
    .tab:active { transform: translateY(1px); }
    .tab:focus-visible { outline: 2px dotted #663300; outline-offset: 1px; }
    .tab.on { background: linear-gradient(#ffb84d, #ff8c00); color: #fff; text-shadow: 0 1px 0 #995200; border-color: #995200; transform: scale(1.06); }
    .np { display: block; width: 100%; padding: 0 2px 6px; text-align: center; font: 700 10px Verdana, Arial, sans-serif; color: #663300; }
    .np b { color: #060; }
  `,
  html: `
    <div class="bar" role="tablist">
      <button class="tab on" type="button" role="tab" aria-selected="true">Explore</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Games</button>
      <button class="tab" type="button" role="tab" aria-selected="false">News</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Pet Central</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Shops</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Customise</button>
      <span class="np">NP: <b class="v">1,337</b></span>
    </div>`,
  init(root) {
    const tabs = [...root.querySelectorAll('.tab')], v = root.querySelector('.v');
    let np = 1337;
    const pick = (i) => {
      tabs.forEach((x) => { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); x.tabIndex = -1; });
      tabs[i].classList.add('on'); tabs[i].setAttribute('aria-selected', 'true'); tabs[i].tabIndex = 0;
      np += i === 4 ? -50 : 25; v.textContent = np.toLocaleString('en-US');
    };
    tabs.forEach((t, i) => {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener('click', () => pick(i));
      t.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); const j = (i + d + tabs.length) % tabs.length; pick(j); tabs[j].focus(); }
      });
    });
  },
};
