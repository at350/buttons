export default {
  id: 'mb-stripe-gradient',
  credit: 'Stripe 2025 homepage — "Get started" pill over the live hero gradient; the mesh drifts on hover and the arrow leans into the click',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 26px; border-radius: 12px; background: #fff; border: 1px solid #e6ebf1; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .gs { position: relative; height: 40px; padding: 0 18px; border-radius: 999px; border: 0; cursor: pointer; overflow: hidden; isolation: isolate;
      color: #fff; font: 600 15px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: -.01em; display: inline-flex; align-items: center; gap: 6px; -webkit-tap-highlight-color: transparent;
      background: linear-gradient(115deg, #635bff 0%, #7a73ff 30%, #ff80b5 60%, #ffbd59 90%, #80e9ff 120%); background-size: 240% 100%; background-position: 0% 0;
      box-shadow: 0 6px 20px -6px rgba(99,91,255,.6); transition: background-position .8s cubic-bezier(.2,.8,.2,1), transform .18s cubic-bezier(.2,.8,.2,1), box-shadow .3s; }
    .gs:hover { background-position: 100% 0; box-shadow: 0 10px 28px -6px rgba(255,128,181,.55); }
    .gs:active { transform: scale(.97); }
    .gs:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #635bff; }
    .gs .ar { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .gs:hover .ar { transform: translateX(3px); }
    .gs[aria-pressed="true"] { background: #0a2540; background-size: auto; box-shadow: none; }
    .gs[aria-pressed="true"] .ar { transform: rotate(-45deg) translateX(1px); }
    .lk { height: 40px; padding: 0 4px; border: 0; background: transparent; color: #635bff; cursor: pointer; font: 600 15px/1 Inter, system-ui, sans-serif; display: inline-flex; align-items: center; gap: 4px; -webkit-tap-highlight-color: transparent; }
    .lk svg { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: transform .25s cubic-bezier(.2,.8,.2,1); }
    .lk:hover { color: #0a2540; } .lk:hover svg { transform: translateX(3px); }
    .lk:focus-visible { outline: 2px solid #635bff; outline-offset: 2px; border-radius: 4px; }
  `,
  html: `
    <div class="stage">
      <button class="gs" type="button" aria-pressed="false"><span class="lbl">Get started</span><svg class="ar" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button>
      <button class="lk" type="button">Contact sales<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.gs'), lbl = b.querySelector('.lbl');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); lbl.textContent = on ? 'Account created' : 'Get started'; });
  },
};
