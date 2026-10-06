// Matches the live producthunt.com launch row: 48px rounded-xl thumbnail, 16px semibold name, secondary
// tagline, tag icon + topics, and the two 48×48 rounded-xl accessory buttons with a 2px #eaecf0 border
// (comment bubble + count, rounded upvote triangle + count). Hover and voted state switch to brand #ff6154.
export default {
  id: 'ob-producthunt-upvote',
  credit: 'Product Hunt — the launch-list upvote box: 2px grey border, rounded triangle + count; voting fills it #ff6154',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; align-items: flex-start; gap: 16px; width: 412px; max-width: 100%; padding: 16px; background: #fff; border-radius: 12px; font: 400 16px/1.4 Inter, system-ui, -apple-system, sans-serif; color: #21293c; }
    .thumb { width: 48px; height: 48px; flex: none; border-radius: 12px; background: #0d0d12; display: grid; place-items: center; }
    .thumb i { display: block; width: 28px; height: 12px; border-radius: 6px; background: #fff; box-shadow: 0 3px 0 #ff6154; }
    .txt { flex: 1; min-width: 0; }
    .nm { font-weight: 600; font-size: 16px; color: #21293c; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .3s; }
    .row:hover .nm { color: #ff6154; }
    .tg { color: #4b587c; font-size: 14px; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .tags { display: flex; align-items: center; gap: 6px; margin-top: 6px; font-size: 12px; color: #21293c; white-space: nowrap; }
    .tags svg { width: 14px; height: 14px; color: #667085; flex: none; }
    .tags i { width: 2px; height: 2px; border-radius: 50%; background: #98a2b3; }
    .acc { flex: none; padding: 0; border: 0; background: none; cursor: pointer; border-radius: 12px; }
    .acc:focus-visible { outline: 2px solid #ff6154; outline-offset: 2px; }
    .box { width: 48px; height: 48px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; border: 2px solid #eaecf0; border-radius: 12px; background: #fff; transition: border-color .3s; }
    .acc:hover .box, .acc[aria-pressed="true"] .box { border-color: #ff6154; }
    .box p { margin: 0; font: 600 14px/1 Inter, system-ui, sans-serif; color: #344054; font-variant-numeric: tabular-nums; transition: color .3s; }
    .box svg { flex: none; transition: fill .3s, stroke .3s, transform .3s; }
    .up svg { width: 16px; height: 16px; fill: #fff; stroke: #344054; stroke-width: 1.5px; }
    .cm svg { width: 14px; height: 14px; fill: none; stroke: #344054; stroke-width: 1.5px; }
    .up[aria-pressed="true"] svg { fill: #ff6154; stroke: #ff6154; }
    .up[aria-pressed="true"] p { color: #ff6154; }
    .up:active svg { transform: translateY(-2px); }
    .up.bump p { animation: bump .3s ease-out; }
    @keyframes bump { 0% { transform: translateY(4px); opacity: .2; } 100% { transform: none; opacity: 1; } }
    .acts { display: flex; gap: 16px; flex: none; }
  `,
  html: `
    <div class="row">
      <span class="thumb" aria-hidden="true"><i></i></span>
      <div class="txt">
        <div class="nm">1. Buttons</div>
        <div class="tg">Every button on the web</div>
        <div class="tags"><svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.25 6.417-4.43-4.43c-.303-.303-.454-.454-.63-.562a1.8 1.8 0 0 0-.506-.21c-.202-.048-.416-.048-.844-.048H3.5M1.75 5.075v1.152c0 .285 0 .428.032.562q.044.18.14.337c.072.118.173.219.375.42l4.55 4.55c.462.463.693.694.96.78.233.077.486.077.72 0 .267-.086.498-.317.96-.78l1.44-1.44c.462-.462.693-.693.78-.96a1.17 1.17 0 0 0 0-.72c-.087-.267-.318-.498-.78-.96L6.2 3.535c-.202-.202-.303-.303-.42-.375a1.2 1.2 0 0 0-.338-.14c-.134-.032-.277-.032-.562-.032H3.733c-.693 0-1.04 0-1.304.135a1.25 1.25 0 0 0-.545.545c-.134.264-.134.61-.134 1.304zM4.67 5.25h.006"/></svg>Design Tools<i></i>Developer Tools</div>
      </div>
      <div class="acts">
        <button class="acc cm" type="button" aria-label="Comments"><span class="box"><svg viewBox="0 0 14 14" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12.25 6.708a4.958 4.958 0 0 1-6.74 4.629 2 2 0 0 0-.192-.068.5.5 0 0 0-.11-.014 1.4 1.4 0 0 0-.176.012l-2.987.309c-.285.03-.427.044-.511-.007a.3.3 0 0 1-.137-.204c-.015-.097.053-.223.19-.475l.953-1.766c.079-.146.118-.218.136-.288a.5.5 0 0 0 .016-.19c-.006-.072-.037-.166-.1-.353a4.958 4.958 0 1 1 9.658-1.585"/></svg><p class="c">48</p></span></button>
        <button class="acc up" type="button" aria-pressed="false" aria-label="Upvote"><span class="box"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.579 3.467c.71-1.067 2.132-1.067 2.842 0L12.975 8.8c.878 1.318.043 3.2-1.422 3.2H4.447c-1.464 0-2.3-1.882-1.422-3.2z"/></svg><p class="n">612</p></span></button>
      </div>
    </div>`,
  init(root) {
    const up = root.querySelector('.up'), n = root.querySelector('.n'), cm = root.querySelector('.cm'), cn = root.querySelector('.c');
    let on = false, c = 612, comments = 48;
    cm.addEventListener('click', () => { comments++; cn.textContent = String(comments); });
    up.addEventListener('click', () => {
      on = !on; c += on ? 1 : -1;
      up.setAttribute('aria-pressed', String(on));
      n.textContent = String(c);
      up.classList.remove('bump'); void up.offsetWidth; up.classList.add('bump');
    });
  },
};
