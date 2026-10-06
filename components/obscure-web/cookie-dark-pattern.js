export default {
  id: 'ob-cookie-dark-pattern',
  credit: 'Dark-pattern cookie banner parody — "Reject all" shrinks every time you approach it; "Accept all" only grows',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 320px; max-width: 100%; height: 118px; border-radius: 12px; background: #e9e4dc; overflow: hidden; font: 13px/1.3 Inter, system-ui, sans-serif; }
    .banner {
      position: absolute; left: 10px; right: 10px; bottom: 10px; padding: 12px 14px; background: #1c1c1e; color: #fff; border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,.25); display: flex; align-items: center; gap: 10px; transition: transform .35s cubic-bezier(.2,.8,.2,1), opacity .3s;
    }
    .banner.gone { transform: translateY(120%); opacity: 0; pointer-events: none; }
    .cookie { font-size: 24px; flex: none; line-height: 1; }
    .acc { flex: none; background: #fff; color: #000; border: 0; border-radius: 999px; padding: 10px 16px; font: 700 13px Inter, system-ui, sans-serif; cursor: pointer; transition: transform .25s, background .15s; }
    .acc:hover { background: #ffd400; }
    .acc:focus-visible, .rej:focus-visible, .pill:focus-visible { outline: 2px solid #ffd400; outline-offset: 2px; }
    .rej { background: none; border: 0; color: #8e8e93; font: 400 12px Inter, system-ui, sans-serif; cursor: pointer; padding: 6px; transform-origin: center; transition: transform .3s cubic-bezier(.2,.8,.2,1), opacity .3s; text-decoration: underline; white-space: nowrap; }
    .spacer { flex: 1; }
    .pill { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) scale(.6); opacity: 0; pointer-events: none; border: 0; border-radius: 999px; padding: 8px 14px; cursor: pointer; background: #1c1c1e; color: #fff; font: 600 12px Inter, system-ui, sans-serif; transition: transform .35s .15s cubic-bezier(.2,.8,.2,1), opacity .3s .15s; display: flex; align-items: center; gap: 6px; }
    .pill.show { transform: translate(-50%, -50%) scale(1); opacity: 1; pointer-events: auto; }
    .pill.rejected { background: #d1d1d6; color: #1c1c1e; }
  `,
  html: `
    <div class="stage">
      <div class="banner" role="dialog" aria-label="Cookies">
        <span class="cookie" aria-hidden="true">🍪</span>
        <button class="rej" type="button">Reject all</button>
        <span class="spacer"></span>
        <button class="acc" type="button">Accept all</button>
      </div>
      <button class="pill" type="button"><span aria-hidden="true">🍪</span><span class="pt">Accepted</span></button>
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
