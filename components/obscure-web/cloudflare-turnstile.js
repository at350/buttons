// Turnstile "normal" widget, light theme: 300×65, #fafafa on a 1px #e0e0e0 border, 24px checkbox with a
// 2px #6d6d6d border, 14px system label in #232323, Cloudflare logo (real two-tone cloud, Simple Icons
// path split into #f38020 / #faae40) over "Privacy · Terms". Verifying shows the spinner, then Success!
export default {
  id: 'ob-cloudflare-turnstile',
  credit: 'Cloudflare Turnstile — the "Verify you are human" widget: checkbox, spinner, green "Success!" and the orange cloud',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box {
      display: flex; align-items: center; width: 300px; max-width: 100%; height: 65px; padding: 0 12px 0 16px; gap: 12px;
      background: #fafafa; border: 1px solid #e0e0e0; font: 400 14px/17px -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #232323;
    }
    .cbw { position: relative; width: 28px; height: 28px; flex: none; display: grid; place-items: center; }
    .cb { width: 24px; height: 24px; padding: 0; background: #fff; border: 2px solid #6d6d6d; border-radius: 2px; cursor: pointer; transition: border-color .15s; }
    .cb:hover { border-color: #f38020; }
    .cb:focus-visible { outline: 2px solid #f38020; outline-offset: 2px; }
    .busy .cb, .ok .cb { opacity: 0; }
    .spin, .done { position: absolute; inset: 0; width: 28px; height: 28px; opacity: 0; pointer-events: none; }
    .spin circle { fill: none; stroke: #038127; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 52 80; }
    .busy .spin { opacity: 1; animation: rot .9s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .done circle { fill: #038127; }
    .done path { fill: none; stroke: #fff; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 16; stroke-dashoffset: 16; }
    .ok .done { opacity: 1; animation: pop .3s cubic-bezier(.2,.9,.3,1.3); }
    .ok .done path { animation: draw .3s .1s ease-out forwards; }
    @keyframes pop { from { transform: scale(.4); } }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .lbl { flex: 1; display: grid; white-space: nowrap; }
    .lbl span { grid-area: 1 / 1; visibility: hidden; }
    .box:not(.busy):not(.ok) .l0, .busy .l1, .ok .l2 { visibility: visible; }
    .brand { flex: none; display: flex; flex-direction: column; align-items: center; gap: 3px; width: 74px; }
    .logo { display: flex; flex-direction: column; align-items: center; }
    .logo svg { width: 36px; height: 18px; }
    .logo b { font: 800 8.5px/1 -apple-system, system-ui, "Segoe UI", Arial, sans-serif; letter-spacing: .5px; color: #232323; margin-top: 1px; }
    .links { font: 400 8px/1 -apple-system, system-ui, "Segoe UI", Arial, sans-serif; color: #232323; white-space: nowrap; }
    .links span { text-decoration: underline; }
  `,
  html: `
    <div class="box">
      <span class="cbw">
        <button class="cb" type="button" role="checkbox" aria-checked="false" aria-label="Verify you are human"></button>
        <svg class="spin" viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="11"/></svg>
        <svg class="done" viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="12"/><path d="M8.5 14.5l3.6 3.6 7.4-7.6"/></svg>
      </span>
      <span class="lbl" aria-live="polite"><span class="l0">Verify you are human</span><span class="l1">Verifying...</span><span class="l2">Success!</span></span>
      <div class="brand" aria-hidden="true">
        <div class="logo"><svg viewBox="0 6.4 24 11.3"><path fill="#f38020" d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268z"/><path fill="#faae40" d="M19.2656 11.2813c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/></svg><b>CLOUDFLARE</b></div>
        <div class="links"><span>Privacy</span> • <span>Terms</span></div>
      </div>
    </div>`,
  init(root) {
    const box = root.querySelector('.box'), cb = root.querySelector('.cb');
    let t = 0;
    const set = (s) => { box.className = 'box' + (s ? ' ' + s : ''); cb.setAttribute('aria-checked', String(s === 'ok')); };
    cb.addEventListener('click', () => {
      clearTimeout(t);
      if (box.classList.contains('ok')) { set(''); return; }
      if (box.classList.contains('busy')) return;
      set('busy');
      t = setTimeout(() => set('ok'), 1300);
    });
    return () => clearTimeout(t);
  },
};
