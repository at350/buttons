// make-everything-ok.com (2011, Yury Fonareff & Dmitry Nikolaev), from its live style.css / script.js: a big
// grey keyboard-key button on a pale grey page, then the "Making everything OK is in progress" panel with the
// #2BCF18 bar, then the #167519 answer card (10px #025200 border, 20px radius, white Tahoma) with "continue".
export default {
  id: 'ob-make-everything-ok',
  credit: 'make-everything-ok.com — the magic keycap: press it, watch the progress bar, and everything is OK now',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pg { position: relative; width: 300px; max-width: 100%; height: 190px; border-radius: 12px; overflow: hidden; background: linear-gradient(#d9d8de, #ececee 60%, #fafafa); display: grid; place-items: center; font-family: Tahoma, Verdana, sans-serif; }
    .pg > * { grid-area: 1 / 1; transition: opacity .25s, transform .25s; }
    .key { position: relative; width: 210px; height: 66px; padding: 0; border: 0; background: none; cursor: pointer; }
    .key::before { content: ""; position: absolute; inset: 6px -6px -6px; border-radius: 9px; background: #1c1c1c; box-shadow: 0 0 0 2px #f4f4f4, 0 6px 10px rgba(0,0,0,.25); }
    .cap { position: absolute; inset: 0 0 6px; border-radius: 8px; display: grid; place-items: center; font: 17px/1 Tahoma, Verdana, sans-serif; color: #333;
      background: linear-gradient(#fbfbfb, #e8e8e8); box-shadow: inset 0 1px 0 #fff, inset 0 -9px 0 -2px #d4d4d4, inset 0 -10px 0 -2px #c4c4c4, 0 1px 0 #aaa; transition: transform .07s; }
    .key:hover .cap { background: linear-gradient(#fff, #efefef); }
    .key:active .cap, .key.dn .cap { transform: translateY(5px); }
    .key:focus-visible { outline: 2px solid #4a90e2; outline-offset: 10px; border-radius: 8px; }
    .prog { width: 260px; padding: 14px 16px 16px; background: #f4f4f4; border: 1px solid #b9b9b9; border-radius: 6px; box-shadow: 0 2px 10px rgba(0,0,0,.2); text-align: center; font-size: 13px; color: #000; }
    .bar { height: 10px; margin-top: 12px; border: 1px solid #9a9a9a; background: #fff; }
    .bar i { display: block; height: 100%; width: 0; background: #2bcf18; }
    .ans { width: 270px; padding: 12px 10px 14px; background: #167519; border: 8px solid #025200; border-radius: 18px; box-shadow: #555 3px 3px 14px; text-align: center; color: #fff; }
    .ans h4 { margin: 0 0 6px; font: 700 22px/1.1 Tahoma, sans-serif; }
    .ans p { margin: 0; font: 12px/1.2 Tahoma, sans-serif; }
    .cont { margin-top: 10px; padding: 4px 36px; border: 0; border-radius: 15px; box-shadow: 1px 1px 4px #051f00; background: rgba(255,255,255,.7); color: #189900; font: 12px Tahoma, sans-serif; text-transform: uppercase; cursor: pointer; }
    .cont:hover { background: #fff; }
    .cont:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .pg:not(.s0) .key, .pg:not(.s1) .prog, .pg:not(.s2) .ans { opacity: 0; pointer-events: none; transform: scale(.96); }
  `,
  html: `
    <div class="pg s0">
      <button class="key" type="button"><span class="cap">Make everything OK</span></button>
      <div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">Making everything OK is in progress<div class="bar"><i></i></div></div>
      <div class="ans" aria-live="polite"><h4>Everything is OK now</h4><p>If everything is still not OK, try checking your settings of perception of objective reality.</p><button class="cont" type="button" tabindex="-1">continue</button></div>
    </div>`,
  init(root) {
    const pg = root.querySelector('.pg'), key = root.querySelector('.key'), fill = root.querySelector('.bar i'), prog = root.querySelector('.prog'), cont = root.querySelector('.cont');
    let raf = 0, t = 0;
    const set = (s) => { pg.className = 'pg s' + s; key.tabIndex = s === 0 ? 0 : -1; cont.tabIndex = s === 2 ? 0 : -1; };
    const stop = () => { cancelAnimationFrame(raf); clearTimeout(t); raf = 0; };
    key.addEventListener('click', () => {
      stop(); key.classList.add('dn');
      t = setTimeout(() => {
        key.classList.remove('dn'); set(1); fill.style.width = '0';
        const t0 = performance.now(), D = 3200;
        const step = (now) => {
          const p = Math.min(1, (now - t0) / D); fill.style.width = (p * 100) + '%'; prog.setAttribute('aria-valuenow', String(Math.round(p * 100)));
          if (p < 1) raf = requestAnimationFrame(step); else { raf = 0; set(2); cont.focus(); }
        };
        raf = requestAnimationFrame(step);
      }, 450);
    });
    cont.addEventListener('click', () => { stop(); set(0); key.focus(); });
    return stop;
  },
};
