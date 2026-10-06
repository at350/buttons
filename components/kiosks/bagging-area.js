export default {
  id: 'ks-bagging-area',
  credit: 'Self-checkout bagging scale — "Please place item in the bagging area" with the bag count; every so often the infamous "Unexpected item in the bagging area"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .lamp { width: 30px; height: 8px; margin: 0 auto 8px; border-radius: 4px; background: #1d8f3c; box-shadow: 0 0 8px rgba(40,200,90,.6); }
    .stage.alert .lamp { animation: lamp .6s steps(1) infinite; }
    @keyframes lamp { 0%, 49% { background: #e02a20; box-shadow: 0 0 12px rgba(255,40,30,.9); } 50% { background: #f2b400; box-shadow: 0 0 12px rgba(255,190,0,.9); } }
    .stage { display: inline-block; padding: 12px; border-radius: 12px; background: linear-gradient(#3a3d42, #22252a); }
    .scr { position: relative; width: 270px; height: 196px; border-radius: 6px; overflow: hidden; background: #f4f6f8; box-shadow: 0 0 0 5px #0d0e10; font-family: Inter, system-ui, sans-serif; color: #1a1a1a; display: flex; flex-direction: column; }
    .top { padding: 7px 10px; background: #0b4f9c; color: #fff; font-size: 12px; font-weight: 600; transition: background .2s; white-space: nowrap; }
    .body { flex: 1; display: flex; align-items: center; gap: 12px; padding: 10px 14px; }
    .ic { width: 64px; height: 64px; flex: none; border-radius: 50%; display: grid; place-items: center; background: #e2ebf6; color: #0b4f9c; transition: background .2s, color .2s; }
    .ic svg { width: 34px; height: 34px; }
    .msg { font-size: 14px; font-weight: 600; line-height: 1.3; }
    .cnt { margin-top: 6px; font-size: 12px; color: #555; font-weight: 500; }
    .cnt b { color: #0b4f9c; font-variant-numeric: tabular-nums; }
    .bar { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 0 8px 8px; }
    .b { height: 40px; border: 0; border-radius: 5px; cursor: pointer; font: 700 12.5px/1 Inter, system-ui, sans-serif; white-space: nowrap; transition: filter .1s, transform .06s; -webkit-tap-highlight-color: transparent; }
    .b:hover { filter: brightness(1.08); } .b:active { transform: translateY(1px) scale(.98); }
    .b:focus-visible { outline: 2px solid #0b4f9c; outline-offset: 2px; }
    .main { background: linear-gradient(#3bb54a, #1f9137); color: #fff; box-shadow: 0 2px 0 #146b27; }
    .sec { background: #fff; color: #0b4f9c; box-shadow: inset 0 0 0 2px #0b4f9c; }
    .stage.alert .top { background: #d62c1f; }
    .stage.alert .ic { background: #fde7c2; color: #c76a00; animation: pulse .8s ease-in-out infinite; }
    .stage.alert .main { background: linear-gradient(#f5a623, #d98200); box-shadow: 0 2px 0 #9c5d00; }
    @keyframes pulse { 50% { transform: scale(1.08); } }
  `,
  html: `
    <div class="stage"><div class="lamp"></div><div class="scr">
      <div class="top">Bagging area</div>
      <div class="body">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg></div>
        <div><div class="msg" aria-live="polite">Please place item in the bagging area.</div><div class="cnt">Items in bag: <b>0</b></div></div>
      </div>
      <div class="bar"><button class="b sec" type="button">Skip bagging</button><button class="b main" type="button">Place item in bag</button></div>
    </div></div>`,
  init(root) {
    const st = root.querySelector('.stage'), msg = root.querySelector('.msg'), top = root.querySelector('.top'), cnt = root.querySelector('.cnt b');
    const main = root.querySelector('.main'), skip = root.querySelector('.sec');
    let n = 0;
    const normal = () => { st.classList.remove('alert'); top.textContent = 'Bagging area'; msg.textContent = 'Please place item in the bagging area.'; main.textContent = 'Place item in bag'; };
    main.addEventListener('click', () => {
      if (st.classList.contains('alert')) return normal();
      n++; cnt.textContent = n;
      if (n % 3 === 0) { st.classList.add('alert'); top.textContent = 'Unexpected item in the bagging area'; msg.textContent = 'Please remove the item before continuing.'; main.textContent = 'Item removed'; }
    });
    skip.addEventListener('click', normal);
  },
};
