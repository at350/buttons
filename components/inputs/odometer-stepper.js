function col() {
  let s = '';
  for (let i = 0; i < 10; i++) s += '<span>' + i + '</span>';
  return '<span class="dg"><span class="col">' + s + '</span></span>';
}

export default {
  id: 'in-odometer-stepper',
  credit: 'Odometer stepper — digits roll vertically like a mechanical counter when the value changes',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .w { display: inline-flex; align-items: center; gap: 10px; padding: 8px; border-radius: 14px; background: #15171c; box-shadow: inset 0 1px 0 rgba(255,255,255,.06); }
    .b { width: 36px; height: 36px; border: 0; border-radius: 10px; background: #262930; color: #e5e7eb; cursor: pointer; display: grid; place-items: center; transition: background .15s, transform .1s; -webkit-tap-highlight-color: transparent; }
    .b:hover { background: #343841; } .b:active { transform: scale(.94); }
    .b:focus-visible { outline: 2px solid #22d3ee; outline-offset: 2px; }
    .b svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; }
    .disp { display: flex; gap: 2px; padding: 4px 8px; border-radius: 8px; background: #0a0b0e; box-shadow: inset 0 2px 6px rgba(0,0,0,.8); font: 700 30px/1 ui-monospace, Menlo, monospace; color: #22d3ee; }
    .dg { position: relative; height: 1em; width: .7em; overflow: hidden; }
    .dg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(rgba(10,11,14,.7), transparent 30%, transparent 70%, rgba(10,11,14,.7)); pointer-events: none; }
    .col { display: flex; flex-direction: column; transition: transform .45s cubic-bezier(.4,0,.2,1); transform: translateY(calc(var(--d, 0) * -1em)); }
    .col span { height: 1em; display: block; text-align: center; }
  `,
  html: `<div class="w" role="group" aria-label="Counter">
    <button class="b dec" type="button" aria-label="Decrease"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button>
    <output class="disp" aria-live="polite">${col()}${col()}</output>
    <button class="b inc" type="button" aria-label="Increase"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
  </div>`,
  init(root) {
    const cols = root.querySelectorAll('.col'), disp = root.querySelector('.disp');
    let v = 7;
    const set = (x) => {
      v = (x + 100) % 100;
      cols[0].style.setProperty('--d', Math.floor(v / 10)); cols[1].style.setProperty('--d', v % 10);
      disp.setAttribute('aria-label', String(v));
    };
    root.querySelector('.dec').addEventListener('click', () => set(v - 1));
    root.querySelector('.inc').addEventListener('click', () => set(v + 1));
    set(7);
  },
};
