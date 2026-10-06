export default {
  id: 'ks-library-checkout',
  credit: 'Library self-checkout (bibliotheca selfCheck) — set books on the RFID pad, each one lands on the list with its due date; Done clears it for the next patron',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 12px; padding: 12px 14px 14px; border-radius: 12px; background: linear-gradient(#f4f1ea, #d6d0c3); font-family: Inter, system-ui, sans-serif; }
    .scr { width: 270px; height: 172px; border-radius: 6px; overflow: hidden; background: #fff; box-shadow: 0 0 0 6px #2b2f33; color: #222; display: flex; flex-direction: column; }
    .hd { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; background: #00a19a; color: #fff; font-size: 12px; font-weight: 700; }
    .hd span { font-weight: 500; opacity: .9; }
    ul { list-style: none; margin: 0; padding: 0 10px; flex: 1; overflow: hidden; }
    li { display: flex; align-items: center; gap: 8px; height: 28px; border-bottom: 1px solid #eee; font-size: 11.5px; animation: in .3s cubic-bezier(.2,.8,.2,1); }
    li svg { width: 14px; height: 14px; color: #00a19a; flex: none; }
    li img { flex: none; display: block; width: 17px; height: 24px; border-radius: 1px 2px 2px 1px; object-fit: cover; background: #ddd; box-shadow: inset 2px 0 0 rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.25); }
    li b { flex: 1; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    li span { color: #777; font-size: 10.5px; white-space: nowrap; }
    li.empty { color: #888; justify-content: center; border: 0; height: 84px; animation: none; }
    @keyframes in { from { opacity: 0; transform: translateX(12px); } }
    .ft { display: flex; gap: 6px; padding: 6px 8px 8px; }
    .b { flex: 1; height: 32px; border: 0; border-radius: 4px; cursor: pointer; font: 700 12px/1 Inter, sans-serif; transition: filter .1s, transform .06s; }
    .b:hover { filter: brightness(1.07); } .b:active { transform: scale(.98); }
    .b:focus-visible, .pad:focus-visible { outline: 2px solid #00a19a; outline-offset: 2px; }
    .rc { background: #e9f6f5; color: #00756f; } .dn { background: #00a19a; color: #fff; }
    .rc[aria-pressed="true"] { background: #00756f; color: #fff; }
    .pad { position: relative; width: 210px; height: 58px; border: 0; border-radius: 8px; cursor: pointer; background: linear-gradient(#5f646b, #3c4046); box-shadow: inset 0 2px 4px rgba(0,0,0,.5), 0 1px 0 #fff;
      display: flex; align-items: center; justify-content: center; gap: 8px; color: #d9f3f1; font: 600 11px/1 Inter, sans-serif; letter-spacing: .04em; overflow: hidden; -webkit-tap-highlight-color: transparent; }
    .pad svg { width: 22px; height: 22px; }
    .pad::after { content: ''; position: absolute; inset: 6px; border: 1.5px dashed rgba(0,210,200,.5); border-radius: 5px; }
    .pad:hover::after { border-color: rgba(0,230,220,.9); }
    .pad.read { animation: rd .5s; }
    @keyframes rd { 30% { box-shadow: inset 0 0 22px rgba(0,230,220,.8), 0 1px 0 #fff; } }
  `,
  html: `
    <div class="stage">
      <div class="scr">
        <div class="hd">Checkout<span>Hi, Alex · <b class="n">0</b> items</span></div>
        <ul aria-live="polite"><li class="empty">Place items on the pad</li></ul>
        <div class="ft"><button class="b rc" type="button" aria-pressed="false">Email receipt</button><button class="b dn" type="button">Done</button></div>
      </div>
      <button class="pad" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/></svg>PLACE ITEMS HERE</button>
    </div>`,
  init(root) {
    const ul = root.querySelector('ul'), n = root.querySelector('.n'), pad = root.querySelector('.pad'), rc = root.querySelector('.rc');
    const books = [['Moby-Dick', '16'], ['Pride and Prejudice', '23'], ['Frankenstein', '47'], ['The Great Gatsby', '51'], ['Middlemarch', '17'], ['Dracula', '70']];
    let i = 0, c = 0;
    const tick = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    pad.addEventListener('click', () => {
      if (!c) ul.innerHTML = '';
      const li = document.createElement('li'); const [t, img] = books[i++ % books.length]; li.innerHTML = `<img src="assets/square/${img}.webp" alt="" width="17" height="24"><b>${t}</b><span>Due 10/26/2026</span>${tick}`;
      ul.prepend(li); while (ul.children.length > 3) ul.lastElementChild.remove();
      n.textContent = ++c; pad.classList.remove('read'); void pad.offsetWidth; pad.classList.add('read');
    });
    rc.addEventListener('click', () => rc.setAttribute('aria-pressed', String(rc.getAttribute('aria-pressed') !== 'true')));
    root.querySelector('.dn').addEventListener('click', () => { c = 0; n.textContent = 0; ul.innerHTML = '<li class="empty">Place items on the pad</li>'; rc.setAttribute('aria-pressed', 'false'); });
  },
};
