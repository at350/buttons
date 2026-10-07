const COOKIE = '<path d="M11 17h.01"/><path d="M11.496 2c.324-.016.558.292.529.615a4 4 0 004.235 4.368.713.713 0 01.758.757 4 4 0 004.366 4.237c.323-.03.63.204.614.527a10 10 0 01-2.915 6.566A1 1 0 114.93 4.918 10 10 0 0111.496 2"/><path d="M12 12h.01"/><path d="M16 16h.01"/><path d="M16 3h.01"/><path d="M21 4h.01"/><path d="M21 8h.01"/><path d="M7 14h.01"/><path d="M9 8h.01"/>';
export default {
  id: 'ob-cookie-dark-pattern',
  credit: 'Dark-pattern cookie banner over a news site — "Reject all" shrinks every time you approach it, "Accept all" only grows; afterwards the little cookie-settings button reopens it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 320px; max-width: 100%; height: 176px; border-radius: 12px; background: #fff; overflow: hidden; font: 13px/1.3 Inter, system-ui, sans-serif; box-shadow: inset 0 0 0 1px #e2e2e2; }
    .nav { display: flex; align-items: center; height: 30px; padding: 0 12px; border-bottom: 1px solid #ececec; }
    .logo { font: 700 15px/1 'Playfair Display', Georgia, serif; color: #111; letter-spacing: -.2px; }
    .nav svg { margin-left: auto; width: 16px; height: 16px; fill: none; stroke: #111; stroke-width: 2; stroke-linecap: round; }
    .hero { display: flex; gap: 10px; padding: 10px 12px; }
    .hero img { width: 120px; height: 80px; object-fit: cover; border-radius: 3px; flex: none; }
    .kick { color: #c0392b; font: 700 9px/1 Inter, system-ui, sans-serif; letter-spacing: .6px; text-transform: uppercase; }
    .hl { margin-top: 5px; font: 700 15px/1.2 'Playfair Display', Georgia, serif; color: #111; }
    .by { margin-top: 6px; color: #777; font: 400 10px Inter, system-ui, sans-serif; }
    .banner {
      position: absolute; left: 10px; right: 10px; bottom: 10px; padding: 12px 14px; background: #1c1c1e; color: #fff; border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,.25); display: flex; align-items: center; gap: 10px; transition: transform .35s cubic-bezier(.2,.8,.2,1), opacity .3s;
    }
    .banner.gone { transform: translateY(120%); opacity: 0; pointer-events: none; }
    .cookie { width: 22px; height: 22px; flex: none; fill: none; stroke: #f5c86b; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .pill svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .acc { flex: none; background: #fff; color: #000; border: 0; border-radius: 999px; padding: 10px 16px; font: 700 13px Inter, system-ui, sans-serif; cursor: pointer; transition: transform .25s, background .15s; }
    .acc:hover { background: #ffd400; }
    .acc:focus-visible, .rej:focus-visible, .pill:focus-visible { outline: 2px solid #ffd400; outline-offset: 2px; }
    .rej { background: none; border: 0; color: #8e8e93; font: 400 12px Inter, system-ui, sans-serif; cursor: pointer; padding: 6px; transform-origin: center; transition: transform .3s cubic-bezier(.2,.8,.2,1), opacity .3s; text-decoration: underline; white-space: nowrap; }
    .spacer { flex: 1; }
    .pill { position: absolute; left: 10px; bottom: 10px; transform: scale(.6); transform-origin: left bottom; opacity: 0; pointer-events: none; border: 0; border-radius: 999px; padding: 8px 14px; cursor: pointer; background: #1c1c1e; color: #fff; font: 600 12px Inter, system-ui, sans-serif; transition: transform .35s .15s cubic-bezier(.2,.8,.2,1), opacity .3s .15s; display: flex; align-items: center; gap: 6px; }
    .pill.show { transform: scale(1); opacity: 1; pointer-events: auto; box-shadow: 0 4px 12px rgba(0,0,0,.25); }
    .pill.rejected { background: #d1d1d6; color: #1c1c1e; }
  `,
  html: `
    <div class="stage">
      <div class="nav" aria-hidden="true"><span class="logo">The Morning Post</span><svg viewBox="0 0 24 24"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg></div>
      <div class="hero" aria-hidden="true"><img src="assets/wide/14.webp" alt="" width="120" height="80"><div><div class="kick">Travel</div><div class="hl">Ten quiet beaches for the off-season</div><div class="by">By Clara Webb · 6 min read</div></div></div>
      <div class="banner" role="dialog" aria-label="Cookies">
        <svg class="cookie" viewBox="0 0 24 24" aria-hidden="true">${COOKIE}</svg>
        <button class="rej" type="button">Reject all</button>
        <span class="spacer"></span>
        <button class="acc" type="button">Accept all</button>
      </div>
      <button class="pill" type="button" aria-label="Cookie settings"><svg viewBox="0 0 24 24" aria-hidden="true">${COOKIE}</svg><span class="pt">Accepted</span></button>
    </div>`,
  init(root) {
    const banner = root.querySelector('.banner'), rej = root.querySelector('.rej'), acc = root.querySelector('.acc'), pill = root.querySelector('.pill'), pt = root.querySelector('.pt');
    let s = 1;
    const shrink = () => {
      s = Math.max(.18, s * .72);
      rej.style.transform = `scale(${s.toFixed(2)})`;
      acc.style.transform = `scale(${Math.min(1.35, 1 + (1 - s) * .5).toFixed(2)})`;
      acc.style.fontWeight = '800';
    };
    rej.addEventListener('mouseenter', shrink);
    rej.addEventListener('focus', shrink);
    const close = (accepted) => {
      banner.classList.add('gone');
      pill.classList.toggle('rejected', !accepted); pt.textContent = accepted ? 'Accepted' : 'Rejected';
      pill.classList.add('show'); pill.focus();
    };
    acc.addEventListener('click', () => close(true));
    rej.addEventListener('click', () => close(false));
    pill.addEventListener('click', () => {
      pill.classList.remove('show'); banner.classList.remove('gone');
      s = 1; rej.style.transform = ''; acc.style.transform = ''; acc.style.fontWeight = '';
    });
  },
};
