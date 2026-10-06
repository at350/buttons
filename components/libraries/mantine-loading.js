export default {
  id: 'lb-mantine-loading',
  credit: 'Mantine v7 — Button filled / light / outline (blue.6 #228be6, 4px radius); click the filled one for the loading overlay with the oval Loader',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; font: 600 14px/1 Inter, -apple-system, "Segoe UI", system-ui, sans-serif; }
    .mt { position: relative; height: 36px; padding: 0 18px; border-radius: 4px; border: 1px solid transparent; cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 10px; white-space: nowrap; transition: background .1s, color .1s, border-color .1s; -webkit-tap-highlight-color: transparent; user-select: none; }
    .mt:active { transform: translateY(1px); }
    .mt:focus-visible { outline: 2px solid #228be6; outline-offset: 2px; }
    .filled { background: #228be6; color: #fff; }
    .filled:hover { background: #1c7ed6; }
    .light { background: #e7f5ff; color: #228be6; }
    .light:hover { background: #d0ebff; }
    .light[aria-pressed="true"] { background: #a5d8ff; color: #1864ab; }
    .outline { background: transparent; color: #228be6; border-color: #228be6; }
    .outline:hover { background: rgba(34,139,230,.05); }
    .outline[aria-pressed="true"] { background: #228be6; color: #fff; }
    .mt .in { display: inline-flex; align-items: center; gap: 10px; transition: opacity .15s; }
    .mt.loading { pointer-events: none; }
    .mt.loading .in { opacity: 0; }
    .ov { position: absolute; inset: 0; display: none; place-items: center; border-radius: inherit; background: rgba(34,139,230,.75); backdrop-filter: blur(1px); }
    .mt.loading .ov { display: grid; }
    .oval { width: 20px; height: 20px; border-radius: 50%; border: 2.5px solid rgba(255,255,255,.25); border-top-color: #fff; animation: rot .6s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .mt svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="row">
      <button class="mt filled" type="button"><span class="in"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><span class="l">Create</span></span><span class="ov"><span class="oval"></span></span></button>
      <button class="mt light" type="button" aria-pressed="false">Light</button>
      <button class="mt outline" type="button" aria-pressed="false">Outline</button>
    </div>`,
  init(root) {
    const f = root.querySelector('.filled'), l = f.querySelector('.l');
    let t;
    f.addEventListener('click', () => {
      f.classList.add('loading');
      clearTimeout(t);
      t = setTimeout(() => { f.classList.remove('loading'); l.textContent = l.textContent === 'Create' ? 'Created' : 'Create'; }, 1600);
    });
    root.querySelectorAll('[aria-pressed]').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
