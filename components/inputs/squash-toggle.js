export default {
  id: 'in-squash-toggle',
  credit: 'Jelly toggle — knob squashes and stretches mid-travel (Android 12 style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .t {
      position: relative; width: 60px; height: 32px; border-radius: 16px; border: 0; padding: 0; cursor: pointer;
      background: #cfd3d8; transition: background .4s; -webkit-tap-highlight-color: transparent;
    }
    .t:focus-visible { outline: 3px solid #7c5cff; outline-offset: 3px; }
    .t[aria-checked="true"] { background: #7c5cff; }
    .knob {
      position: absolute; top: 4px; left: 4px; width: 24px; height: 24px; border-radius: 12px; background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,.25); transition: transform .4s cubic-bezier(.68,-.3,.32,1.3);
    }
    .t[aria-checked="true"] .knob { transform: translateX(28px); }
    .t.anim .knob { animation: squash .4s ease-in-out; }
    @keyframes squash {
      0%, 100% { width: 24px; height: 24px; top: 4px; }
      50% { width: 36px; height: 20px; top: 6px; }
    }
    .t:active:not(.anim) .knob { width: 30px; height: 22px; top: 5px; transition: transform .4s, width .15s, height .15s, top .15s; }
  `,
  html: `<button class="t" type="button" role="switch" aria-checked="false" aria-label="Jelly toggle"><span class="knob"></span></button>`,
  init(root) {
    const b = root.querySelector('.t');
    b.addEventListener('click', () => {
      b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true');
      b.classList.remove('anim');
      void b.offsetWidth;
      b.classList.add('anim');
    });
    b.addEventListener('animationend', () => b.classList.remove('anim'));
  },
};
