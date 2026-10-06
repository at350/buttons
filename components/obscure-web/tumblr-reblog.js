export default {
  id: 'ob-tumblr-reblog',
  credit: 'Tumblr dashboard post footer — notes count, reply, the two-arrow reblog (spins green) and the heart that pops red',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .post { width: 300px; max-width: 100%; background: #fff; border-radius: 12px; overflow: hidden; font: 14px/1.3 "Favorit", Inter, system-ui, sans-serif; color: #444; box-shadow: 0 0 0 1px rgba(0,0,0,.06); }
    .top { display: flex; align-items: center; gap: 8px; padding: 10px 14px; }
    .av { width: 32px; height: 32px; border-radius: 3px; background: #001935; display: grid; place-items: center; }
    .av svg { width: 14px; height: 14px; fill: #fff; }
    .un { font-weight: 700; color: #000; font-size: 13px; }
    .pic { height: 90px; background: linear-gradient(120deg, #ff8a00, #e52e71 50%, #001935); }
    .ft { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; }
    .notes { font: 600 13px/1 "Favorit", Inter, system-ui, sans-serif; color: #000; cursor: pointer; background: none; border: 1px solid rgba(0,0,0,.13); border-radius: 18px; padding: 7px 12px; white-space: nowrap; }
    .notes .n { display: inline-block; min-width: 38px; text-align: right; font-variant-numeric: tabular-nums; }
    .notes:hover { background: rgba(0,0,0,.05); }
    .notes:focus-visible, .ib:focus-visible { outline: 2px solid #00b8ff; outline-offset: 2px; border-radius: 3px; }
    .acts { display: flex; gap: 18px; }
    .ib { width: 24px; height: 24px; border: 0; background: none; padding: 0; cursor: pointer; display: grid; place-items: center; color: rgba(0,0,0,.65); }
    .ib svg { width: 20px; height: 20px; fill: currentColor; transition: transform .35s cubic-bezier(.2,1.4,.4,1), color .2s; }
    .ib:hover svg { transform: scale(1.1); }
    .rb.on svg { color: #00cf35; transform: rotate(180deg); }
    .lk.on svg { color: #ff4930; animation: pop .35s cubic-bezier(.2,1.6,.4,1); }
    @keyframes pop { 0% { transform: scale(.4); } 60% { transform: scale(1.35); } 100% { transform: scale(1); } }
    .rp.on svg { color: #00b8ff; }
  `,
  html: `
    <div class="post">
      <div class="top"><span class="av" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z"/></svg></span><span class="un">staff</span></div>
      <div class="pic" aria-hidden="true"></div>
      <div class="ft">
        <button class="notes" type="button"><span class="n">1,204</span> notes</button>
        <div class="acts">
          <button class="ib rp" type="button" aria-pressed="false" aria-label="Reply"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.4 1.3 4.5 3.4 6L4 21l4.6-2.3c1 .2 2.2.3 3.4.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg></button>
          <button class="ib rb" type="button" aria-pressed="false" aria-label="Reblog"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3l4 4-4 4V8H9a2 2 0 0 0-2 2v2H4v-2a5 5 0 0 1 5-5h8zM7 21l-4-4 4-4v3h8a2 2 0 0 0 2-2v-2h3v2a5 5 0 0 1-5 5H7z"/></svg></button>
          <button class="ib lk" type="button" aria-pressed="false" aria-label="Like"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.3C1.1 8.3 3.3 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.7 0 5.9 3.8 4.5 7.2C19.5 16.4 12 21 12 21z"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const n = root.querySelector('.n'); let c = 1204;
    const bump = (d) => { c += d; n.textContent = c.toLocaleString('en-US'); };
    root.querySelectorAll('.ib').forEach((b) => b.addEventListener('click', () => { const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on)); bump(on ? 1 : -1); }));
    root.querySelector('.notes').addEventListener('click', () => bump(1));
  },
};
