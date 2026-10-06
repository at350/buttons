export default {
  id: 'ob-stumbleupon',
  credit: 'StumbleUpon toolbar — the green "Stumble!" button with the SU logo and thumbs up / down; every stumble lands you on a different random page',
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
    .th svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .th:hover { background: #fff; }
    .th.on.up { color: #fff; background: #5fa82d; border-color: #3e7a1e; }
    .th.on.dn { color: #fff; background: #c33; border-color: #911; }
        .sp { flex: 1; }
    .cnt { color: #555; font-size: 10px; }
    .page { position: relative; height: 96px; overflow: hidden; background: #e8f0fe; }
    .page img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; visibility: hidden; }
    .page img.on { visibility: visible; }
    .pt { position: absolute; left: 6px; bottom: 6px; padding: 1px 5px; background: rgba(255,255,255,.88); border: 1px solid #999; font: 10px Verdana, Arial, sans-serif; color: #333; }
    .page.flash { animation: fl .3s; }
    @keyframes fl { 0% { opacity: .2; } 100% { opacity: 1; } }
  `,
  html: `
    <div class="frame">
      <div class="tb">
        <button class="st" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#fff"/><path fill="#eb4924" d="M12 0C5.37 0 0 5.373 0 12c0 6.63 5.37 12 12 12s12-5.37 12-12c0-6.627-5.37-12-12-12zm-.618 8.907v4.949c0 1.854-1.692 3.251-3.45 3.251-1.644 0-3.18-.776-3.354-2.634V11.37h2.475v2.475c0 .615.436.716.878.716.439 0 .975-.099.975-.717v-4.95c.05-1.843 1.58-3.014 3.29-3.014 1.744 0 2.899 1.319 2.899 3.016v1.05l-1.228.585-1.248-.585V8.289s-.164-.18-.42-.18c-.424 0-.816.18-.817.798zm8.04 4.949c0 1.854-1.59 3.111-3.353 3.111-1.761 0-3.45-1.257-3.45-3.112V11.38h2.476v2.475c0 .618.535.717.975.717.44 0 .879-.099.879-.717V11.38h2.461v2.475l.012.001z"/></svg>Stumble!</button>
        <button class="th up" type="button" aria-pressed="false" aria-label="I like it"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/><path d="M7 10v12"/></svg></button>
        <button class="th dn" type="button" aria-pressed="false" aria-label="Not for me"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/><path d="M17 14V2"/></svg></button>
        <span class="sp"></span><span class="cnt"><b class="n">0</b> stumbles</span>
      </div>
      <div class="page" aria-live="polite"><img src="assets/wide/18.webp" alt="" width="300" height="96" class="on"><img src="assets/wide/16.webp" alt="" width="300" height="96"><img src="assets/wide/07.webp" alt="" width="300" height="96"><img src="assets/wide/13.webp" alt="" width="300" height="96"><img src="assets/wide/08.webp" alt="" width="300" height="96"><img src="assets/wide/28.webp" alt="" width="300" height="96"><img src="assets/wide/00.webp" alt="" width="300" height="96"><img src="assets/wide/20.webp" alt="" width="300" height="96"><span class="pt">weird-gifs.net</span></div>
    </div>`,
  init(root) {
    const st = root.querySelector('.st'), page = root.querySelector('.page'), pt = root.querySelector('.pt'), up = root.querySelector('.up'), dn = root.querySelector('.dn'), n = root.querySelector('.n');
    const sites = ['weird-gifs.net', 'cat-facts.org', 'optical-illusions.co', 'how-to-fold-a-crane.com', 'best-of-flash.biz', 'tiny-piano.io', 'random-wiki.page', 'infinite-zoom.art'];
    const pics = [...page.querySelectorAll('img')];
    let c = 0, cur = 0;
    st.addEventListener('click', () => {
      c++; n.textContent = String(c);
      let k = cur; while (k === cur) k = Math.floor(Math.random() * sites.length);
      cur = k; pics.forEach((im, j) => im.classList.toggle('on', j === k));
      pt.textContent = sites[k];
      page.classList.remove('flash'); void page.offsetWidth; page.classList.add('flash');
      up.classList.remove('on'); dn.classList.remove('on'); up.setAttribute('aria-pressed', 'false'); dn.setAttribute('aria-pressed', 'false');
    });
    const vote = (a, b) => () => { const on = a.classList.toggle('on'); a.setAttribute('aria-pressed', String(on)); b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); };
    up.addEventListener('click', vote(up, dn)); dn.addEventListener('click', vote(dn, up));
  },
};
