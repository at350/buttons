export default {
  id: 'ob-stumbleupon',
  credit: 'StumbleUpon toolbar (2007) — the green "Stumble!" button with the swirl logo and thumbs up / down; every stumble lands you on a different-coloured page',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .frame { width: 300px; max-width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid #999; font: 11px Verdana, Arial, sans-serif; }
    .tb { display: flex; align-items: center; gap: 6px; padding: 4px 6px; background: linear-gradient(#f7f7f7, #d9d9d9); border-bottom: 1px solid #999; }
    .st { display: inline-flex; align-items: center; gap: 5px; height: 24px; padding: 0 10px 0 6px; border: 1px solid #3e7a1e; border-radius: 4px; cursor: pointer; color: #fff; font: 700 12px Verdana, Arial, sans-serif; text-shadow: 0 -1px 0 #2d5a14; background: linear-gradient(#9ad65e, #5fa82d 50%, #4f9420); box-shadow: inset 0 1px 0 rgba(255,255,255,.5); transition: transform .08s; }
    .st:hover { background: linear-gradient(#a8e06d, #6bb83a 50%, #5aa32a); }
    .st:active { transform: translateY(1px); }
    .st:focus-visible, .th:focus-visible { outline: 2px solid #1a5fb4; outline-offset: 1px; }
    .st svg { width: 16px; height: 16px; }
    .th { width: 24px; height: 24px; border: 1px solid #aaa; border-radius: 3px; background: linear-gradient(#fff, #e6e6e6); cursor: pointer; display: grid; place-items: center; padding: 0; color: #555; }
    .th svg { width: 14px; height: 14px; fill: currentColor; }
    .th:hover { background: #fff; }
    .th.on.up { color: #fff; background: #5fa82d; border-color: #3e7a1e; }
    .th.on.dn { color: #fff; background: #c33; border-color: #911; }
    .dn svg { transform: rotate(180deg); }
    .sp { flex: 1; }
    .cnt { color: #555; font-size: 10px; }
    .page { height: 96px; display: grid; place-items: center; background: #e8f0fe; transition: background .4s; font: 700 13px Georgia, serif; color: rgba(0,0,0,.55); }
    .page.flash { animation: fl .3s; }
    @keyframes fl { 0% { opacity: .2; } 100% { opacity: 1; } }
  `,
  html: `
    <div class="frame">
      <div class="tb">
        <button class="st" type="button"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7.5" fill="#fff"/><path d="M8 3.5a2.5 2.5 0 0 1 2.5 2.5v.5h-2V6a.5.5 0 0 0-1 0v4a2.5 2.5 0 0 1-5 0V9h2v1a.5.5 0 0 0 1 0V6A2.5 2.5 0 0 1 8 3.5zm2.5 5h2V10a2.5 2.5 0 0 1-2.5 2.5c-.9 0-1.6-.4-2.1-1l1.2-1.4c.2.3.5.4.9.4a.5.5 0 0 0 .5-.5z" fill="#5fa82d"/></svg>Stumble!</button>
        <button class="th up" type="button" aria-pressed="false" aria-label="I like it"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M4 6h2l1-4c1 0 2 .7 2 2L8.5 6H12a1 1 0 0 1 1 1l-1 5a1 1 0 0 1-1 1H4zM1 6h2v7H1z"/></svg></button>
        <button class="th dn" type="button" aria-pressed="false" aria-label="Not for me"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M4 6h2l1-4c1 0 2 .7 2 2L8.5 6H12a1 1 0 0 1 1 1l-1 5a1 1 0 0 1-1 1H4zM1 6h2v7H1z"/></svg></button>
        <span class="sp"></span><span class="cnt"><b class="n">0</b> stumbles</span>
      </div>
      <div class="page" aria-live="polite"><span class="pt">example.com</span></div>
    </div>`,
  init(root) {
    const st = root.querySelector('.st'), page = root.querySelector('.page'), pt = root.querySelector('.pt'), up = root.querySelector('.up'), dn = root.querySelector('.dn'), n = root.querySelector('.n');
    const sites = ['weird-gifs.net', 'cat-facts.org', 'optical-illusions.co', 'how-to-fold-a-crane.com', 'best-of-flash.biz', 'tiny-piano.io', 'random-wiki.page', 'infinite-zoom.art'];
    let c = 0;
    st.addEventListener('click', () => {
      c++; n.textContent = String(c);
      page.style.background = `hsl(${Math.floor(Math.random() * 360)} 60% 85%)`;
      pt.textContent = sites[Math.floor(Math.random() * sites.length)];
      page.classList.remove('flash'); void page.offsetWidth; page.classList.add('flash');
      up.classList.remove('on'); dn.classList.remove('on'); up.setAttribute('aria-pressed', 'false'); dn.setAttribute('aria-pressed', 'false');
    });
    const vote = (a, b) => () => { const on = a.classList.toggle('on'); a.setAttribute('aria-pressed', String(on)); b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); };
    up.addEventListener('click', vote(up, dn)); dn.addEventListener('click', vote(dn, up));
  },
};
