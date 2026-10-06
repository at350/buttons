export default {
  id: 'ob-cloudflare-turnstile',
  credit: 'Cloudflare Turnstile — "Verify you are human" box: checkbox, spinner, "Success!" with the orange cloud',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box {
      display: flex; align-items: center; width: 300px; max-width: 100%; height: 65px; padding: 0 14px; gap: 10px;
      background: #fafafa; border: 1px solid #e0e0e0; border-radius: 4px; font: 500 14px/1 -apple-system, system-ui, "Segoe UI", Roboto, sans-serif; color: #232323;
    }
    .cb { position: relative; width: 24px; height: 24px; flex: none; background: #fff; border: 2px solid #6d6d6d; border-radius: 2px; padding: 0; cursor: pointer; transition: border-color .15s, background .2s; }
    .cb:hover { border-color: #0051c3; }
    .cb:focus-visible { outline: 2px solid #0051c3; outline-offset: 2px; }
    .cb.busy, .cb.ok { border-color: transparent; background: transparent; }
    .ring { position: absolute; inset: -3px; border-radius: 50%; border: 3px solid #d9d9d9; border-top-color: #0051c3; opacity: 0; }
    .cb.busy .ring { opacity: 1; animation: rot .7s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .tick { position: absolute; inset: -4px; fill: none; stroke: #00a65a; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 34; stroke-dashoffset: 34; }
    .cb.ok .tick { animation: draw .3s ease-out forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .lbl { flex: 1; }
    .ok .lbl, .lbl.ok { color: #00a65a; }
    .brand { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; flex: none; }
    .brand svg { width: 64px; height: 20px; }
    .brand small { font: 400 8px/1 system-ui, sans-serif; color: #555; }
    .brand small span { text-decoration: underline; margin-left: 4px; }
  `,
  html: `
    <div class="box">
      <button class="cb" type="button" role="checkbox" aria-checked="false" aria-label="Verify you are human">
        <span class="ring" aria-hidden="true"></span>
        <svg class="tick" viewBox="0 0 28 28" aria-hidden="true"><path d="M6 14.5l5.5 5.5L22 9"/></svg>
      </button>
      <span class="lbl">Verify you are human</span>
      <div class="brand" aria-hidden="true">
        <svg viewBox="0 0 64 20"><path d="M20 15H7.5a4.5 4.5 0 0 1-.6-8.96A7 7 0 0 1 20 5.3a4.9 4.9 0 0 1 1.5 9.7z" fill="#f6821f"/><path d="M19.6 15a4.8 4.8 0 0 0 .9-9.6L19.3 5a5 5 0 0 0-.3 1.4A3.3 3.3 0 0 1 22 10a3.3 3.3 0 0 1-2.4 5z" fill="#fbad41"/><text x="26" y="14" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#232323">CLOUDFLARE</text></svg>
        <small>Privacy<span>Terms</span></small>
      </div>
    </div>`,
  init(root) {
    const cb = root.querySelector('.cb'), lbl = root.querySelector('.lbl');
    let t = 0, busy = false, ok = false;
    cb.addEventListener('click', () => {
      clearTimeout(t);
      if (ok || busy) { ok = busy = false; cb.className = 'cb'; lbl.className = 'lbl'; lbl.textContent = 'Verify you are human'; cb.setAttribute('aria-checked', 'false'); return; }
      busy = true; cb.classList.add('busy'); lbl.textContent = 'Verifying...';
      t = setTimeout(() => { busy = false; ok = true; cb.classList.remove('busy'); cb.classList.add('ok'); lbl.classList.add('ok'); lbl.textContent = 'Success!'; cb.setAttribute('aria-checked', 'true'); }, 1200);
    });
    return () => clearTimeout(t);
  },
};
