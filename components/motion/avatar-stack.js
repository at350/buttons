// Aceternity UI "Animated Tooltip" (Manu Arora): avatars overlap by 16px (-mr-4), hovering one springs a black
// tooltip up from y:20 scale:.6 with { stiffness: 260, damping: 10 }, and the tooltip rotates (±45° over ±100px)
// and slides (±50px) toward the pointer through a { stiffness: 100, damping: 15 } spring. Both springs → linear().
const ENTER = 'linear(0, 0.135, 0.447, 0.807, 1.111, 1.299, 1.358, 1.311, 1.2, 1.071, 0.962, 0.894, 0.872, 0.888, 0.928, 0.974, 1.013, 1.038, 1.046, 1.04, 1.026, 1.009, 0.995, 0.986, 0.984, 0.986, 0.991, 0.997, 1.002, 1.005, 1.006, 1.005, 1.003, 1.001, 0.999, 0.998, 0.998, 0.998, 0.999, 1, 1)';
const FOLLOW = 'linear(0, 0.021, 0.076, 0.15, 0.236, 0.333, 0.425, 0.514, 0.601, 0.676, 0.743, 0.805, 0.854, 0.896, 0.932, 0.959, 0.981, 0.998, 1.01, 1.018, 1.023, 1.026, 1.027, 1.027, 1.026, 1.024, 1.022, 1.019, 1.017, 1.014, 1.012, 1.01, 1.008, 1.006, 1.004, 1.003, 1.002, 1.001, 1.001, 1, 1)';
const PEOPLE = [
  ['John Doe', 'Software Engineer', 'men-14'],
  ['Robert Johnson', 'Product Manager', 'men-22'],
  ['Jane Smith', 'Data Scientist', 'women-12'],
  ['Emily Davis', 'UX Designer', 'women-26'],
];

export default {
  id: 'mo-avatar-stack',
  credit: 'Aceternity UI "Animated Tooltip" — hover a face and the name card springs up (stiffness 260, damping 10), then tilts and slides after your cursor on a softer spring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 310px; height: 178px; max-width: 100%; border-radius: 12px; background: #fff; border: 1px solid #ececec; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 26px; font-family: Inter, system-ui, sans-serif; overflow: hidden; }
    .row { display: flex; padding-right: 16px; }
    .it { position: relative; margin-right: -16px; }
    .av {
      position: relative; display: block; width: 56px; height: 56px; border-radius: 50%; border: 2px solid #fff; object-fit: cover; object-position: top;
      background: #e5e5e5; cursor: pointer; transition: transform .5s cubic-bezier(.4, 0, .2, 1); outline: none;
    }
    .it:hover, .it:focus-within { z-index: 30; }
    .it:hover .av, .av:focus-visible { transform: scale(1.05); }
    .av:focus-visible { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #111; }
    .tw { position: absolute; left: 50%; bottom: calc(100% + 8px); translate: calc(-50% + var(--tx, 0px)) 0; rotate: var(--rot, 0deg); transition: translate .85s ${FOLLOW}, rotate .85s ${FOLLOW}; pointer-events: none; z-index: 50; }
    .tip {
      position: relative; display: flex; flex-direction: column; align-items: center; padding: 8px 16px; border-radius: 6px; background: #000; white-space: nowrap;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1);
      opacity: 0; transform: translateY(20px) scale(.6); transition: opacity .2s, transform .3s cubic-bezier(.4, 0, 1, 1);
    }
    .it:hover .tip, .it:focus-within .tip { opacity: 1; transform: none; transition: opacity .15s, transform 1.36s ${ENTER}; }
    .tip b { font-size: 16px; font-weight: 700; line-height: 24px; color: #fff; }
    .tip span { font-size: 12px; line-height: 16px; color: #fff; }
    .tip i { position: absolute; bottom: -1px; height: 1px; }
    .tip i.e { left: 40px; right: 40px; width: 20%; background: linear-gradient(90deg, transparent, #10b981, transparent); }
    .tip i.s { left: 40px; width: 40%; background: linear-gradient(90deg, transparent, #0ea5e9, transparent); }
  `,
  html: `
    <div class="stage"><div class="row">
      ${PEOPLE.map(([n, d, img]) => `<div class="it"><div class="tw"><div class="tip" role="tooltip"><i class="e"></i><i class="s"></i><b>${n}</b><span>${d}</span></div></div><img class="av" tabindex="0" src="assets/portraits/${img}.jpg" width="56" height="56" alt="${n}, ${d}"></div>`).join('')}
    </div></div>`,
  init(root) {
    root.querySelectorAll('.it').forEach((it) => {
      const av = it.querySelector('.av'), tw = it.querySelector('.tw');
      av.addEventListener('pointermove', (e) => {
        const r = av.getBoundingClientRect();
        const x = Math.max(-100, Math.min(100, (e.clientX - r.left) / r.width * 56 - 28));
        tw.style.setProperty('--rot', (x * .45).toFixed(2) + 'deg');
        tw.style.setProperty('--tx', (x * .5).toFixed(1) + 'px');
      });
      av.addEventListener('pointerleave', () => { tw.style.setProperty('--rot', '0deg'); tw.style.setProperty('--tx', '0px'); });
    });
  },
};
