// From the live dribbble.com shot grid: 8px-radius thumbnail, hover overlay with the shot title and white
// 40px round Save / Like buttons, then avatar + 14px/500 #0d0c22 name + grey PRO badge, and the real
// 16px heart (#9e9ea7 at rest, #ea4c89 when liked) + eye icons with 12px counts. Font: Mona Sans stack.
export default {
  id: 'ob-dribbble-like',
  credit: 'Dribbble — shot thumbnail: hover overlay with the round white Like button; liking turns the heart #ea4c89 and ticks the count',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .card { width: 280px; max-width: 100%; padding: 12px; background: #fff; border-radius: 12px; font: 400 14px/20px "Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #0d0c22; }
    .shot { position: relative; height: 196px; border-radius: 8px; overflow: hidden; background: #f3f0ea; }
    .art { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
    .ov { position: absolute; inset: 0; display: flex; align-items: flex-end; gap: 8px; padding: 16px; background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,.46)); opacity: 0; transition: opacity .2s ease; }
    .shot:hover .ov, .shot:focus-within .ov { opacity: 1; }
    .ttl { flex: 1; min-width: 0; color: #fff; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .rb { width: 40px; height: 40px; flex: none; border: 0; border-radius: 50%; background: #fff; color: #0d0c22; display: grid; place-items: center; cursor: pointer; padding: 0; transition: color .2s, background .2s; }
    .rb:hover { color: #6e6d7a; }
    .rb svg { width: 16px; height: 16px; }
    .rb:focus-visible, .lk:focus-visible { outline: 2px solid #ea4c89; outline-offset: 2px; }
    .card.on .rb.like { color: #ea4c89; }
    .card.on .rb.like path { fill: currentColor; }
    .meta { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
    .av { width: 24px; height: 24px; flex: none; border-radius: 50%; object-fit: cover; display: block; background: #e7e7e9; }
    .nm { font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
    .pro { flex: none; padding: 0 4px; border-radius: 4px; background: #e7e7e9; color: #6e6d7a; font: 700 10px/16px "Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: .3px; }
    .stats { margin-left: auto; display: flex; align-items: center; gap: 8px; flex: none; font: 500 12px/16px "Mona Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #3d3d4e; }
    .st { display: inline-flex; align-items: center; gap: 4px; }
    .lk { display: inline-flex; padding: 0; border: 0; background: none; cursor: pointer; color: #9e9ea7; border-radius: 4px; }
    .lk:hover { color: #6e6d7a; }
    .st svg { width: 16px; height: 16px; }
    .lk path { fill: currentColor; }
    .eye { color: #9e9ea7; }
    .card.on .lk { color: #ea4c89; }
    .card.pop .lk svg, .card.pop .rb.like svg { animation: pop .35s cubic-bezier(.2,1.6,.4,1); }
    @keyframes pop { 0% { transform: scale(.6); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
    .n { min-width: 20px; font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="card">
      <div class="shot">
        <img class="art" src="assets/wide/32.webp" alt="" width="256" height="196">
        <div class="ov">
          <span class="ttl">Symbol Brand Identity</span>
          <button class="rb" type="button" aria-label="Save shot"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.33337 5.2C3.33337 4.0799 3.33337 3.51984 3.55136 3.09202C3.74311 2.71569 4.04907 2.40973 4.42539 2.21799C4.85322 2 5.41327 2 6.53337 2H9.46671C10.5868 2 11.1469 2 11.5747 2.21799C11.951 2.40973 12.257 2.71569 12.4487 3.09202C12.6667 3.51984 12.6667 4.0799 12.6667 5.2V14L8.00004 11.3333L3.33337 14V5.2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="rb like" type="button" aria-label="Like shot"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
      </div>
      <div class="meta">
        <img class="av" src="assets/portraits/women-09.jpg" alt="" width="24" height="24"><span class="nm">Mira Lind</span><span class="pro">PRO</span>
        <span class="stats">
          <span class="st"><button class="lk" type="button" aria-pressed="false" aria-label="Like shot"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button><span class="n">52</span></span>
          <span class="st"><svg class="eye" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3C4.36992 3 1.98789 6.21774 1.18763 7.49059C1.09079 7.64462 1.04237 7.72163 1.01527 7.84042C0.99491 7.92964 0.99491 8.07036 1.01527 8.15958C1.04237 8.27837 1.09079 8.35539 1.18763 8.50941C1.98789 9.78226 4.36992 13 8 13C11.6301 13 14.0121 9.78226 14.8124 8.50941C14.9092 8.35538 14.9576 8.27837 14.9847 8.15958C15.0051 8.07036 15.0051 7.92964 14.9847 7.84042C14.9576 7.72163 14.9092 7.64462 14.8124 7.4906C14.0121 6.21774 11.6301 3 8 3Z" fill="currentColor"/><path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="#fff"/></svg><span>2.5k</span></span>
        </span>
      </div>
    </div>`,
  init(root) {
    const card = root.querySelector('.card'), lk = root.querySelector('.lk'), rl = root.querySelector('.rb.like'), n = root.querySelector('.n'), save = root.querySelector('.rb:not(.like)');
    let on = false, c = 52;
    const toggle = () => {
      on = !on; c += on ? 1 : -1;
      card.classList.toggle('on', on); lk.setAttribute('aria-pressed', String(on)); rl.setAttribute('aria-label', on ? 'Unlike shot' : 'Like shot');
      n.textContent = String(c);
      card.classList.remove('pop'); void card.offsetWidth; if (on) card.classList.add('pop');
    };
    lk.addEventListener('click', toggle); rl.addEventListener('click', toggle);
    save.addEventListener('click', () => { const s = save.classList.toggle('saved'); save.style.color = s ? '#ea4c89' : ''; save.querySelector('path').style.fill = s ? 'currentColor' : ''; });
  },
};
