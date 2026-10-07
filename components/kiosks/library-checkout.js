export default {
  id: 'ks-library-checkout',
  credit: 'Library self-checkout (bibliotheca selfCheck) — set books on the RFID pad, each one lands on the list with its due date; Done clears it for the next patron',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 12px; padding: 12px 14px 14px; border-radius: 12px; background: linear-gradient(#f4f1ea, #d6d0c3); font-family: Inter, system-ui, sans-serif; }
    .scr { order: 1; width: 270px; height: 172px; border-radius: 6px; overflow: hidden; background: #fff; box-shadow: 0 0 0 6px #2b2f33; color: #222; display: flex; flex-direction: column; }
    .hd { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; background: #00a19a; color: #fff; font-size: 12px; font-weight: 700; }
    .hd span { font-weight: 500; opacity: .9; }
    ul { list-style: none; margin: 0; padding: 0 10px; flex: 1; overflow: hidden; }
    li { display: flex; align-items: center; gap: 8px; height: 28px; border-bottom: 1px solid #eee; font-size: 11.5px; animation: in .3s cubic-bezier(.2,.8,.2,1); }
    li svg { width: 14px; height: 14px; color: #00a19a; flex: none; }
    li img { flex: none; display: block; width: 17px; height: 24px; border-radius: 1px 2px 2px 1px; object-fit: cover; background: #ddd; box-shadow: inset 2px 0 0 rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.25); }
    li b { flex: 1; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    li span { color: #777; font-size: 10.5px; white-space: nowrap; }
    li.empty { flex-direction: column; color: #888; justify-content: center; gap: 6px; border: 0; height: 84px; animation: none; }
    li.empty svg { width: 26px; height: 26px; color: #b5c9c7; }
    @keyframes in { from { opacity: 0; transform: translateX(12px); } }
    .ft { display: flex; gap: 6px; padding: 6px 8px 8px; }
    .b { flex: 1; height: 32px; border: 0; border-radius: 4px; cursor: pointer; font: 700 12px/1 Inter, sans-serif; transition: filter .1s, transform .06s; }
    .b:hover { filter: brightness(1.07); } .b:active { transform: scale(.98); }
    .b:focus-visible, .pad:focus-visible { outline: 2px solid #00a19a; outline-offset: 2px; }
    .rc { background: #e9f6f5; color: #00756f; } .dn { background: #00a19a; color: #fff; }
    .rc[aria-pressed="true"] { background: #00756f; color: #fff; }
    .pad { order: 2; position: relative; width: 230px; height: 58px; border: 0; border-radius: 8px; cursor: pointer; background: linear-gradient(#5f646b, #3c4046); box-shadow: inset 0 2px 4px rgba(0,0,0,.5), 0 1px 0 #fff;
      display: flex; align-items: center; justify-content: center; gap: 8px; padding-left: 44px; color: #d9f3f1; font: 600 11px/1 Inter, sans-serif; letter-spacing: .04em; overflow: hidden; -webkit-tap-highlight-color: transparent; }
    .pad svg { width: 22px; height: 22px; }
    .pad img { position: absolute; left: 22px; top: 7px; width: 32px; height: 46px; border-radius: 1px 3px 3px 1px; object-fit: cover; transform: rotate(-9deg); box-shadow: inset 3px 0 0 rgba(0,0,0,.25), 2px 3px 4px rgba(0,0,0,.5); z-index: 1; transition: transform .25s, opacity .25s; }
    .pad.read img { animation: take .5s; }
    @keyframes take { 50% { transform: rotate(-9deg) translateY(-6px); opacity: .4; } }
    .pad::after { content: ''; position: absolute; inset: 6px; border: 1.5px dashed rgba(0,210,200,.5); border-radius: 5px; }
    .pad:hover::after { border-color: rgba(0,230,220,.9); }
    .pad.read { animation: rd .5s; }
    @keyframes rd { 30% { box-shadow: inset 0 0 22px rgba(0,230,220,.8), 0 1px 0 #fff; } }
  `,
  html: `
    <div class="stage">
      <button class="pad" type="button">PLACE ITEMS HERE<img class="nx" src="assets/real/book-frankenstein.jpg" alt="" width="32" height="46"></button>
      <div class="scr">
        <div class="hd">Checkout<span>Hi, Alex · <b class="n">2</b> items</span></div>
        <ul aria-live="polite"></ul>
        <div class="ft"><button class="b rc" type="button" aria-pressed="false">Email receipt</button><button class="b dn" type="button">Done</button></div>
      </div>
    </div>`,
  init(root) {
    const ul = root.querySelector('ul'), n = root.querySelector('.n'), pad = root.querySelector('.pad'), rc = root.querySelector('.rc');
    const books = [['Moby-Dick', 'book-moby-dick'], ['Pride and Prejudice', 'book-pride-and-prejudice'], ['Frankenstein', 'book-frankenstein'], ['The Great Gatsby', 'book-great-gatsby'], ['Middlemarch', 'book-middlemarch'], ['Dracula', 'book-dracula']];
    let i = 0, c = 0;
    const tick = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    const nx = root.querySelector('.nx');
    const empty = '<li class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>Place items on the pad</li>';
    const add = () => {
      if (!c) ul.innerHTML = '';
      const li = document.createElement('li'); const [t, img] = books[i++ % books.length]; li.innerHTML = `<img src="assets/real/${img}.jpg" alt="" width="17" height="24"><b>${t}</b><span>Due 10/27/2026</span>${tick}`;
      ul.prepend(li); while (ul.children.length > 4) ul.lastElementChild.remove();
      n.textContent = ++c; nx.src = `assets/real/${books[i % books.length][1]}.jpg`;
    };
    add(); add();
    pad.addEventListener('click', () => { add(); pad.classList.remove('read'); void pad.offsetWidth; pad.classList.add('read'); });
    rc.addEventListener('click', () => rc.setAttribute('aria-pressed', String(rc.getAttribute('aria-pressed') !== 'true')));
    root.querySelector('.dn').addEventListener('click', () => { c = 0; n.textContent = 0; ul.innerHTML = empty; rc.setAttribute('aria-pressed', 'false'); });
  },
};
