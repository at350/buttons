export default {
  id: 'in-led-toggle',
  credit: 'Industrial slide switch with a status LED — glows red when off, green when on',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; align-items: center; gap: 14px; padding: 12px 16px; background: #1f2226; border-radius: 12px; box-shadow: inset 0 1px 0 rgba(255,255,255,.06); }
    .led {
      width: 14px; height: 14px; border-radius: 50%; background: #ff3b30; border: 2px solid #111;
      box-shadow: 0 0 6px 2px rgba(255,59,48,.6), inset 0 -2px 3px rgba(0,0,0,.4), inset 0 2px 2px rgba(255,255,255,.35);
      transition: background .25s, box-shadow .25s;
    }
    .stage.on .led { background: #30d158; box-shadow: 0 0 8px 3px rgba(48,209,88,.7), inset 0 -2px 3px rgba(0,0,0,.4), inset 0 2px 2px rgba(255,255,255,.4); }
    .t {
      position: relative; width: 62px; height: 28px; border-radius: 6px; border: 0; padding: 0; cursor: pointer;
      background: #0b0c0e; box-shadow: inset 0 2px 5px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.08);
      -webkit-tap-highlight-color: transparent;
    }
    .t:focus-visible { outline: 2px solid #30d158; outline-offset: 3px; }
    .knob {
      position: absolute; top: 3px; left: 3px; width: 30px; height: 22px; border-radius: 4px;
      background: linear-gradient(#5a5e66, #3a3d44); box-shadow: 0 2px 3px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.25);
      transition: transform .18s cubic-bezier(.4,0,.2,1);
    }
    .knob::before, .knob::after { content: ''; position: absolute; top: 6px; bottom: 6px; width: 2px; background: rgba(0,0,0,.45); border-radius: 1px; box-shadow: 1px 0 0 rgba(255,255,255,.12); }
    .knob::before { left: 11px; } .knob::after { left: 17px; }
    .t[aria-checked="true"] .knob { transform: translateX(26px); }
    .t:active .knob { filter: brightness(.9); }
  `,
  html: `<div class="stage">
    <span class="led"></span>
    <button class="t" type="button" role="switch" aria-checked="false" aria-label="Power"><span class="knob"></span></button>
  </div>`,
  init(root) {
    const b = root.querySelector('.t'), s = root.querySelector('.stage');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-checked') !== 'true';
      b.setAttribute('aria-checked', on); s.classList.toggle('on', on);
    });
  },
};
