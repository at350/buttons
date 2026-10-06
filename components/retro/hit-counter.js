export default {
  id: 'rt-hit-counter',
  credit: '1990s homepage hit counter — odometer digits in black cells, click to add a visitor',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #ffffff; padding: 12px 16px; border-radius: 12px; display: inline-flex; align-items: center; gap: 10px;
      font: 11px Verdana, Geneva, Arial, sans-serif; color: #000; }
    .ctr { display: inline-flex; gap: 1px; padding: 2px; border: 2px solid; border-color: #808080 #fff #fff #808080; background: #c0c0c0; cursor: pointer; }
    .ctr:focus-visible { outline: 2px dotted #000; outline-offset: 2px; }
    .ctr:active .d { background: #111; }
    .d { width: 14px; height: 22px; overflow: hidden; background: #000; position: relative; border-right: 1px solid #333; }
    .d span { display: block; font: bold 16px/22px "Courier New", Courier, monospace; color: #0f0; text-align: center; }
    .ctr.red .d span { color: #f00; }
    .s { transition: transform .3s; }
  `,
  html: `
    <div class="stage">
      <span class="lbl">You are visitor</span>
      <button class="ctr" type="button" aria-label="Hit counter, click to add a visitor"></button>
    </div>`,
  init(root) {
    const ctr = root.querySelector('.ctr');
    let n = 4821 + Math.floor(Math.random() * 300);
    const strips = [];
    const strip = '0123456789'.split('').map((c) => `<span>${c}</span>`).join('');
    for (let i = 0; i < 6; i++) {
      const d = document.createElement('div'); d.className = 'd'; d.innerHTML = `<div class="s">${strip}</div>`; ctr.appendChild(d); strips.push(d.firstChild);
    }
    const render = (anim) => {
      const str = String(n).padStart(6, '0');
      strips.forEach((s, i) => { s.style.transition = anim ? '' : 'none'; s.style.transform = `translateY(${-22 * Number(str[i])}px)`; });
      ctr.setAttribute('aria-valuenow', String(n));
    };
    render(false);
    ctr.addEventListener('click', () => { n++; render(true); });
  },
};
