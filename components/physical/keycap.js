export default {
  id: 'ph-keycap',
  credit: 'Single Cherry-profile mechanical keycap (PBT, dish top) on a switch — 2px travel',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 22px; border-radius: 12px; background: linear-gradient(#3a3d44, #24262b); }
    .housing { position: relative; width: 60px; height: 62px; }
    .housing::before { content: ''; position: absolute; left: 6px; right: 6px; top: 6px; bottom: 2px; border-radius: 5px; background: #0d0e10; box-shadow: inset 0 3px 6px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.08); }
    .key {
      position: absolute; left: 0; top: 0; width: 60px; height: 58px; border: 0; padding: 0; border-radius: 7px; cursor: pointer;
      background: linear-gradient(#a4a69f 0%, #8a8c86 50%, #6f716c 100%);
      box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 6px 0 -2px rgba(0,0,0,.6), 0 7px 8px rgba(0,0,0,.5);
      transition: transform .05s ease-out, box-shadow .05s ease-out; -webkit-tap-highlight-color: transparent;
    }
    .top {
      position: absolute; left: 6px; right: 6px; top: 3px; bottom: 11px; border-radius: 5px;
      background: radial-gradient(ellipse at 50% 45%, #b9bbb4, #c7c9c2 55%, #d2d4cd 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.5), inset 0 -1px 0 rgba(0,0,0,.08);
      font: 600 20px/1 system-ui, -apple-system, "Helvetica Neue", sans-serif; color: #2b2d2a;
      display: flex; align-items: center; justify-content: center; text-align: center;
    }
    .key:hover .top { background: radial-gradient(ellipse at 50% 45%, #c0c2bb, #ced0c9 55%, #d8dad3 100%); }
    .key:active, .key.down { transform: translateY(2px); box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 3px 0 -2px rgba(0,0,0,.6), 0 3px 4px rgba(0,0,0,.5); }
    .key:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="housing"><button class="key" type="button" aria-label="key A"><span class="top">A</span></button></div>
    </div>`,
  init(root) {
    const k = root.querySelector('.key');
    k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
    k.addEventListener('keyup', () => k.classList.remove('down'));
    k.addEventListener('blur', () => k.classList.remove('down'));
  },
};
