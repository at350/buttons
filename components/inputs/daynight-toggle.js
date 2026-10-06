export default {
  id: 'in-daynight-toggle',
  credit: 'Day / night toggle — sun slides into a crescent moon, sky darkens, stars come out (CodePen classic)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .t {
      position: relative; width: 72px; height: 36px; border-radius: 18px; border: 0; padding: 0; cursor: pointer; overflow: hidden;
      background: #5cb1ff; box-shadow: inset 0 2px 6px rgba(0,0,0,.3); transition: background .6s;
      -webkit-tap-highlight-color: transparent;
    }
    .t:focus-visible { outline: 3px solid #ffb400; outline-offset: 3px; }
    .t[aria-checked="true"] { background: #1a2140; }
    .knob {
      position: absolute; top: 4px; left: 4px; width: 28px; height: 28px; border-radius: 50%; overflow: hidden; background: #ffd438;
      box-shadow: 0 0 0 6px rgba(255,212,56,.28), 0 2px 4px rgba(0,0,0,.35);
      transition: transform .6s cubic-bezier(.34,1.4,.64,1), background .6s, box-shadow .6s;
    }
    .knob::after {
      content: ''; position: absolute; top: -5px; right: -5px; width: 26px; height: 26px; border-radius: 50%; background: #1a2140;
      transform: translate(26px,-26px); transition: transform .6s cubic-bezier(.34,1.2,.64,1);
    }
    .t[aria-checked="true"] .knob { transform: translateX(36px); background: #f2efe4; box-shadow: 0 0 0 6px rgba(255,255,255,.1), 0 2px 4px rgba(0,0,0,.5); }
    .t[aria-checked="true"] .knob::after { transform: translate(0,0); }
    .cloud { position: absolute; width: 14px; height: 14px; border-radius: 50%; background: #fff; transition: transform .6s, opacity .4s; }
    .c1 { left: 44px; top: 20px; } .c2 { left: 52px; top: 15px; width: 17px; height: 17px; } .c3 { left: 61px; top: 21px; }
    .t[aria-checked="true"] .cloud { transform: translateY(26px); opacity: 0; }
    .star { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #fff; opacity: 0; transform: scale(0); transition: transform .4s cubic-bezier(.34,1.56,.64,1), opacity .3s; }
    .s1 { left: 14px; top: 9px; } .s2 { left: 26px; top: 20px; width: 2px; height: 2px; } .s3 { left: 36px; top: 7px; width: 2px; height: 2px; } .s4 { left: 20px; top: 27px; }
    .t[aria-checked="true"] .star { opacity: 1; transform: scale(1); }
    .t[aria-checked="true"] .s1 { transition-delay: .25s; } .t[aria-checked="true"] .s2 { transition-delay: .4s; }
    .t[aria-checked="true"] .s3 { transition-delay: .5s; } .t[aria-checked="true"] .s4 { transition-delay: .32s; }
  `,
  html: `<button class="t" type="button" role="switch" aria-checked="false" aria-label="Day night toggle">
    <span class="cloud c1"></span><span class="cloud c2"></span><span class="cloud c3"></span>
    <span class="star s1"></span><span class="star s2"></span><span class="star s3"></span><span class="star s4"></span>
    <span class="knob"></span>
  </button>`,
  init(root) {
    const b = root.querySelector('.t');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
