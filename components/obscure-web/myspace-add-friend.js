export default {
  id: 'ob-myspace-add-friend',
  credit: 'MySpace (2006) — the "Contacting Tom" box: orange header, the little person+ icon and the blue "Add to Friends" link that becomes a sent request',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { width: 300px; max-width: 100%; border: 2px solid #6699cc; background: #fff; font: 10px Verdana, Arial, sans-serif; color: #000; border-radius: 0 0 12px 12px; overflow: hidden; }
    .hd { background: #ff9933; color: #fff; font: 700 11px Verdana, Arial, sans-serif; padding: 3px 6px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; padding: 8px 10px; gap: 6px 10px; }
    .lk { display: flex; align-items: center; gap: 5px; color: #003399; text-decoration: none; cursor: pointer; white-space: nowrap; }
    .lk:hover { text-decoration: underline; }
    .lk:focus-visible { outline: 1px dotted #000; }
    .lk svg { width: 14px; height: 14px; flex: none; }
    .lk.sent { color: #666; cursor: default; }
    .lk.sent:hover { text-decoration: none; }
    .lk.sent b { color: #c00; font-weight: 700; }
    .lk.on { color: #008000; }
    .mood { padding: 0 10px 8px; color: #333; }
    .mood a { color: #003399; cursor: pointer; text-decoration: none; }
    .mood a:hover { text-decoration: underline; }
  `,
  html: `
    <div class="box">
      <div class="hd">Contacting Tom</div>
      <div class="grid">
        <a class="lk add" href="#" role="button"><svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="5" cy="4" r="2.5" fill="#f90"/><path d="M1 12a4 4 0 0 1 8 0z" fill="#f90"/><path d="M10 4v6M7 7h6" stroke="#390" stroke-width="2"/></svg><span class="at">Add to Friends</span></a>
        <a class="lk fwd" href="#" role="button"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 4h8v6H1z" fill="#39f"/><path d="M9 7l4-3v6z" fill="#39f"/></svg>Forward to Friend</a>
        <a class="lk msg" href="#" role="button"><svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="3" width="12" height="8" fill="#fc3" stroke="#960"/><path d="M1 3l6 5 6-5" fill="none" stroke="#960"/></svg>Send Message</a>
        <a class="lk fav" href="#" role="button"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1l1.8 3.8 4.2.6-3 2.9.7 4.2L7 10.5l-3.7 2 .7-4.2-3-2.9 4.2-.6z" fill="#f90"/></svg><span class="ft">Add to Favorites</span></a>
        <a class="lk im" href="#" role="button"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2h10v7H6l-3 3V9H2z" fill="#9c6"/></svg>Instant Message</a>
        <a class="lk blk" href="#" role="button"><svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="none" stroke="#c00" stroke-width="2"/><path d="M3 11L11 3" stroke="#c00" stroke-width="2"/></svg><span class="bt">Block User</span></a>
      </div>
      <div class="mood">Tom's Friend Space (<b class="n">1,234,567</b> friends)</div>
    </div>`,
  init(root) {
    const add = root.querySelector('.add'), at = root.querySelector('.at'), fav = root.querySelector('.fav'), ft = root.querySelector('.ft'), blk = root.querySelector('.blk'), bt = root.querySelector('.bt'), n = root.querySelector('.n');
    let friends = 1234567, isF = false;
    add.addEventListener('click', (e) => { e.preventDefault(); isF = !isF; add.classList.toggle('sent', isF); at.innerHTML = isF ? 'Friend Request <b>Sent!</b>' : 'Add to Friends'; friends += isF ? 1 : -1; n.textContent = friends.toLocaleString('en-US'); });
    fav.addEventListener('click', (e) => { e.preventDefault(); const on = fav.classList.toggle('on'); ft.textContent = on ? 'Added to Favorites' : 'Add to Favorites'; });
    blk.addEventListener('click', (e) => { e.preventDefault(); const on = blk.classList.toggle('on'); bt.textContent = on ? 'Unblock User' : 'Block User'; });
    root.querySelectorAll('.fwd, .msg, .im').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); a.style.color = a.style.color ? '' : '#660099'; }));
  },
};
