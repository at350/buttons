export default {
  id: 'mb-oneui-toggle',
  credit: 'Samsung One UI 7 — settings rows with the blue toggle whose knob overshoots, stretches while pressed and swaps its sub-label',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 250px; max-width: 100%; padding: 6px; border-radius: 12px; background: #000; font: 500 15px/1 "Roboto Flex", Roboto, Inter, system-ui, sans-serif; }
    .card { border-radius: 26px; background: #17171a; padding: 4px 0; }
    .row { display: flex; align-items: center; justify-content: space-between; height: 56px; padding: 0 22px; color: #fff; cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; }
    .row + .row { border-top: 1px solid #2a2a2e; }
    .row:focus-visible { outline: none; background: #202024; border-radius: 22px; }
    .row span { display: grid; gap: 5px; }
    .row small { color: #8e8e93; font-size: 12px; font-weight: 400; transition: color .25s; }
    .row[aria-checked="true"] small { color: #3e7bff; }
    .sw { position: relative; width: 44px; height: 24px; border-radius: 12px; background: #4a4a4f; flex: none; transition: background .3s cubic-bezier(.2,.8,.2,1); }
    .row:hover .sw { background: #5a5a60; }
    .row[aria-checked="true"] .sw { background: #3e7bff; }
    .row[aria-checked="true"]:hover .sw { background: #5a8fff; }
    .sw::before { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 10px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.4);
      transition: transform .4s linear(0, 0.35 8%, 0.72 16%, 0.96 25%, 1.08 34%, 1.04 48%, 0.99 62%, 1), width .2s; }
    .row[aria-checked="true"] .sw::before { transform: translateX(20px); }
    .row:active .sw::before { width: 24px; }
    .row[aria-checked="true"]:active .sw::before { transform: translateX(14px); }
  `,
  html: `
    <div class="stage">
      <div class="card">
        <div class="row" role="switch" aria-checked="true" tabindex="0"><span>Wi-Fi<small>Connected</small></span><i class="sw"></i></div>
        <div class="row" role="switch" aria-checked="false" tabindex="0"><span>Bluetooth<small>Off</small></span><i class="sw"></i></div>
        <div class="row" role="switch" aria-checked="true" tabindex="0"><span>Mobile data<small>5G</small></span><i class="sw"></i></div>
      </div>
    </div>`,
  init(root) {
    const TXT = [['Connected', 'Off'], ['On', 'Off'], ['5G', 'Off']];
    root.querySelectorAll('.row').forEach((r, i) => {
      const flip = () => { const on = r.getAttribute('aria-checked') !== 'true'; r.setAttribute('aria-checked', String(on)); r.querySelector('small').textContent = TXT[i][on ? 0 : 1]; };
      r.addEventListener('click', flip);
      r.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
    });
  },
};
