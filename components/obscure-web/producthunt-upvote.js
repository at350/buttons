export default {
  id: 'ob-producthunt-upvote',
  credit: 'Product Hunt — the boxed upvote: triangle + count, outline until clicked, then fills PH orange and the number bounces',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; background: #fff; padding: 12px 14px; border-radius: 12px; border: 1px solid #e8e8e8; font: 14px/1.3 Inter, system-ui, sans-serif; color: #21293c; width: 300px; max-width: 100%; }
    .thumb { width: 48px; height: 48px; border-radius: 10px; background: linear-gradient(135deg, #ff6154, #ff9a8a); flex: none; display: grid; place-items: center; color: #fff; font: 800 20px Inter, system-ui, sans-serif; }
    .txt { flex: 1; min-width: 0; }
    .nm { font-weight: 600; }
    .tg { color: #4b587c; font-size: 12px; margin-top: 2px; }
    .up { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; width: 54px; height: 54px; border: 1px solid #e8e8e8; border-radius: 8px; background: #fff; cursor: pointer; color: #21293c; font: 700 13px Inter, system-ui, sans-serif; transition: border-color .15s, background .15s, color .15s; flex: none; }
    .up:hover { border-color: #ff6154; }
    .up:focus-visible { outline: 2px solid #ff6154; outline-offset: 2px; }
    .up .tri { width: 0; height: 0; border: 6px solid transparent; border-bottom: 8px solid #21293c; border-top: 0; transition: border-bottom-color .15s, transform .25s; }
    .up.on { background: #ff6154; border-color: #ff6154; color: #fff; }
    .up.on .tri { border-bottom-color: #fff; transform: translateY(-2px); }
    .up.on .n { animation: bounce .45s cubic-bezier(.2,1.6,.4,1); }
    @keyframes bounce { 0% { transform: translateY(8px) scale(.8); opacity: 0; } 100% { transform: none; opacity: 1; } }
    .up:active .tri { transform: scale(.8); }
    .cm { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; width: 44px; height: 54px; border: 0; background: none; cursor: pointer; color: #4b587c; font: 600 12px Inter, system-ui, sans-serif; border-radius: 8px; }
    .cm:hover { background: #f5f5f7; color: #21293c; }
    .cm:focus-visible { outline: 2px solid #ff6154; outline-offset: 2px; }
    .cm svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; }
  `,
  html: `
    <div class="row">
      <span class="thumb" aria-hidden="true">B</span>
      <div class="txt"><div class="nm">Buttons</div><div class="tg">An endless page of buttons</div></div>
      <button class="cm" type="button" aria-label="Comments"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v12H8l-4 4z"/></svg><span class="c">48</span></button>
      <button class="up" type="button" aria-pressed="false"><span class="tri" aria-hidden="true"></span><span class="n">612</span></button>
    </div>`,
  init(root) {
    const up = root.querySelector('.up'), n = root.querySelector('.n'), cm = root.querySelector('.cm'), cn = root.querySelector('.c');
    let on = false, c = 612, comments = 48;
    cm.addEventListener('click', () => { comments++; cn.textContent = String(comments); });
    up.addEventListener('click', () => {
      on = !on; c += on ? 1 : -1;
      up.classList.toggle('on', on); up.setAttribute('aria-pressed', String(on));
      n.textContent = String(c);
      if (on) { n.style.animation = 'none'; void n.offsetWidth; n.style.animation = ''; }
    });
  },
};
