function col() {
  let s = '';
  for (let i = 0; i < 10; i++) s += '<span>' + i + '</span>';
  return '<span class="dg"><span class="col">' + s + '</span></span>';
}

export default {
  id: 'in-odometer-stepper',
  credit: 'HubSpot Odometer.js, "car" theme — gradient digit wheels on a black rounded bezel roll to the new value',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    /* odometer-theme-car.css: black 0.34em bezel, 0.15em padding, #333→#101010→#444 gradient wheels, #eee Arimo digits */
    .w { display: inline-flex; align-items: center; gap: 12px; padding: 4px; }
    .b {
      width: 34px; height: 34px; border: 0; border-radius: 50%; background: #fff; color: #33475b; cursor: pointer; display: grid; place-items: center;
      box-shadow: 0 0 0 1px #cbd6e2; transition: background-color .15s, box-shadow .15s, transform .1s; -webkit-tap-highlight-color: transparent;
    }
    .b:hover { background: #eaf0f6; box-shadow: 0 0 0 1px #7c98b6; }
    .b:active { transform: scale(.94); }
    .b:focus-visible { outline: 2px solid #00a4bd; outline-offset: 2px; }
    .b svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; }
    .disp { display: flex; padding: .15em; border-radius: .34em; background: #000; font: 400 34px/1.1 Arimo, Arial, "Liberation Sans", sans-serif; color: #eee; font-variant-numeric: tabular-nums; }
    .dg {
      position: relative; height: 1.1em; width: .7em; overflow: hidden; padding: 0 .05em; border-radius: .1em; box-sizing: content-box;
      background: linear-gradient(to bottom, #333 0%, #333 40%, #101010 60%, #333 80%, #444 100%);
    }
    .dg + .dg { margin-left: .1em; }
    .col { display: flex; flex-direction: column; transition: transform .8s cubic-bezier(.2,.7,.2,1); transform: translateY(calc(var(--d, 0) * -1.1em)); }
    .col span { height: 1.1em; display: block; text-align: center; }
  `,
  html: `<div class="w" role="group" aria-label="Guests">
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
