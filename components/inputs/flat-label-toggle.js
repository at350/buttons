// Designmodo Flat UI (2013) bootstrap-switch, values from flat-ui.css 2.3.0:
// 80×29 pill, a 132px strip that slides margin-left 0 / -51px in .25s ease-out,
// ON half #34495e with #1abc9c text, OFF half #bdc3c7 with white text,
// 29px knob with a 4px border in the track color (turquoise when on, #7f8c9a when off).
export default {
  id: 'in-flat-label-toggle',
  credit: 'Designmodo Flat UI switch (2013) — navy / turquoise ON, silver OFF, the whole label strip slides under a ringed knob',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .t {
      position: relative; display: block; width: 80px; height: 29px; border-radius: 30px; border: 0; padding: 0; overflow: hidden; cursor: pointer;
      background: #bdc3c7; font: 700 15px/19px Lato, system-ui, -apple-system, "Segoe UI", sans-serif; -webkit-tap-highlight-color: transparent;
    }
    .t:focus-visible { outline: 2px solid #1abc9c; outline-offset: 2px; }
    .strip { position: absolute; top: 0; left: 0; width: 132px; height: 29px; display: flex; transform: translateX(-51px); transition: transform .25s ease-out; }
    .t[aria-checked="true"] .strip { transform: translateX(0); }
    .on, .off { width: 66px; height: 29px; padding: 5px 0; text-align: center; transition: box-shadow .25s ease-out; }
    .on { background: #34495e; color: #1abc9c; padding-right: 15px; }
    .off { background: #bdc3c7; color: #fff; padding-left: 15px; }
    .knob {
      position: absolute; top: 0; left: 51px; width: 29px; height: 29px; border-radius: 50%; border: 4px solid #bdc3c7; background: #7f8c9a;
      background-clip: padding-box; transition: border-color .25s ease-out, background-color .25s ease-out;
    }
    .t[aria-checked="true"] .knob { border-color: #34495e; background-color: #1abc9c; }
    .t:hover .knob { filter: brightness(1.06); }
  `,
  html: `<button class="t" type="button" role="switch" aria-checked="true" aria-label="Notifications">
    <span class="strip"><span class="on">ON</span><span class="off">OFF</span><span class="knob"></span></span>
  </button>`,
  init(root) {
    const b = root.querySelector('.t');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
