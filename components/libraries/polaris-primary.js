export default {
  id: 'lb-polaris-primary',
  credit: 'Shopify Polaris v12 — Primary (inset-bevel #303030) and success-tone buttons with the fulfillment status Badge that flips Unfulfilled → Fulfilled',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; font: 550 12px/16px Inter, -apple-system, "Segoe UI", system-ui, sans-serif; color: #303030; }
    .pl { height: 28px; padding: 6px 12px; border-radius: 8px; border: 0; cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; transition: background .1s, box-shadow .1s; -webkit-tap-highlight-color: transparent; }
    .pl:focus-visible { outline: 2px solid #005bd3; outline-offset: 1px; }
    .pri { background: #303030; color: #e3e3e3; box-shadow: 0 -1px 0 1px rgba(0,0,0,.8) inset, 0 0 0 1px #303030 inset, 0 .5px 0 1.5px rgba(255,255,255,.25) inset; }
    .pri:hover { background: #1a1a1a; }
    .pri:active { background: #1a1a1a; box-shadow: 0 2px 1px 0 rgba(26,26,26,.8) inset, 0 0 0 1px #1a1a1a inset; }
    .suc { background: #29845a; color: #fff; box-shadow: 0 -1px 0 1px rgba(0,0,0,.3) inset, 0 0 0 1px #29845a inset, 0 .5px 0 1.5px rgba(255,255,255,.25) inset; }
    .suc:hover { background: #0c5132; }
    .suc:active { background: #0c5132; box-shadow: 0 2px 1px 0 rgba(0,0,0,.5) inset; }
    .def { background: #fff; color: #303030; box-shadow: 0 -1px 0 0 #b5b5b5 inset, 0 0 0 1px rgba(0,0,0,.1) inset, 0 .5px 0 1.5px #fff inset; }
    .def:hover { background: #fafafa; }
    .def:active { background: #f7f7f7; box-shadow: 0 2px 1px 0 #e3e3e3 inset; }
    .bg { display: inline-flex; align-items: center; gap: 4px; height: 20px; padding: 2px 8px 2px 6px; border-radius: 8px; font: 550 12px/16px Inter, -apple-system, system-ui, sans-serif; transition: background .2s, color .2s; }
    .bg i { width: 20px; height: 20px; display: grid; place-items: center; }
    .bg svg { width: 20px; height: 20px; }
    .bg[data-t="att"] { background: #ffd6a4; color: #5e4200; }
    .bg[data-t="suc"] { background: #cdfee1; color: #0c5132; }
    .bg[data-t="suc"] .pie, .bg[data-t="att"] .chk { display: none; }
  `,
  html: `
    <div class="row">
      <button class="pl def" type="button">Edit</button>
      <button class="pl pri" type="button" aria-pressed="false"><span class="l">Fulfill items</span></button>
      <span class="bg" data-t="att"><i><svg class="pie" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 1.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"/><path d="M10 6.5a3.5 3.5 0 0 1 3.5 3.5h-3.5v-3.5Z"/></svg><svg class="chk" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 16.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm3.03-8.03a.75.75 0 0 0-1.06-1.06l-2.72 2.72-1.22-1.22a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.25-3.25Z"/></svg></i><span class="t">Unfulfilled</span></span>
    </div>`,
  init(root) {
    const b = root.querySelector('.pri'), bg = root.querySelector('.bg'), t = bg.querySelector('.t'), l = b.querySelector('.l');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on);
      b.classList.toggle('suc', on);
      bg.dataset.t = on ? 'suc' : 'att';
      t.textContent = on ? 'Fulfilled' : 'Unfulfilled';
      l.textContent = on ? 'Mark unfulfilled' : 'Fulfill items';
    });
  },
};
