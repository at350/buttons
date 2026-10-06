// Simon (Milton Bradley, 1978): four translucent quadrant pads in the black case with the thick
// centre cross, round control hub with the "simon" wordmark and the START / LAST / LONGEST buttons.
// Each pad lamps up from behind while pressed (plus a short afterglow on click).
export default {
  id: 'ph-simon-pad',
  credit: 'Simon (Milton Bradley, 1978) — four translucent pads lamp up from behind when pressed',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; background: linear-gradient(#e4e1d8, #cdc9be); }
    .case { position: relative; width: 168px; height: 168px; border-radius: 50%;
      background: radial-gradient(circle at 40% 30%, #2c2c2e, #0b0b0c 70%);
      box-shadow: 0 2px 2px rgba(0,0,0,.4), 0 10px 16px -4px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.12), inset 0 -2px 3px rgba(0,0,0,.6); }
    .pad {
      position: absolute; width: 72px; height: 72px; border: 0; padding: 0; cursor: pointer; -webkit-tap-highlight-color: transparent;
      background: var(--c); transition: background .1s, box-shadow .1s, transform .12s cubic-bezier(.3,1.7,.5,1);
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.35), inset var(--sx) var(--sy) 8px rgba(0,0,0,.35), inset calc(var(--sx) * -1) calc(var(--sy) * -1) 6px rgba(255,255,255,.18);
    }
    .g { --c: #0f8a3a; --l: #4dff7f; --sx: 3px; --sy: 3px; left: 10px; top: 10px; border-radius: 72px 0 0 0; }
    .r { --c: #b3141c; --l: #ff4f45; --sx: -3px; --sy: 3px; right: 10px; top: 10px; border-radius: 0 72px 0 0; }
    .y { --c: #d4ad00; --l: #fff04a; --sx: 3px; --sy: -3px; left: 10px; bottom: 10px; border-radius: 0 0 0 72px; }
    .b { --c: #0b4bb5; --l: #4f9bff; --sx: -3px; --sy: -3px; right: 10px; bottom: 10px; border-radius: 0 0 72px 0; }
    .pad:hover { filter: brightness(1.08); }
    .pad:active, .pad.lit {
      background: radial-gradient(circle at 50% 50%, #fff 0, var(--l) 45%, var(--c) 120%);
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.2), 0 0 18px 2px var(--l);
      transform: scale(.985); transition-duration: .03s;
    }
    .pad:focus-visible { outline: 2px solid #fff; outline-offset: -5px; }
    .hub { position: absolute; left: 50%; top: 50%; width: 66px; height: 66px; margin: -33px; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle at 45% 35%, #2b2b2d, #070708 80%);
      box-shadow: 0 0 0 5px #0b0b0c, 0 2px 6px 5px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.12); }
    .logo { position: absolute; left: 0; right: 0; top: 15px; text-align: center; font: 800 13px/1 "Unbounded", "Syne", Arial, sans-serif; letter-spacing: -.3px; color: #f2f2f2; }
    .ctl { position: absolute; top: 37px; width: 9px; height: 9px; border-radius: 50%; box-shadow: inset 0 -1px 1px rgba(0,0,0,.5), 0 1px 1px rgba(0,0,0,.8); }
    .ctl.a { left: 13px; background: #e7c300; } .ctl.s { left: 28.5px; background: #c71d1d; } .ctl.c { left: 44px; background: #e7c300; }
    .sl { position: absolute; left: 22px; top: 51px; width: 22px; height: 5px; border-radius: 2px; background: #2a2a2c; box-shadow: inset 0 1px 1px #000; }
    .sl::after { content: ''; position: absolute; left: 3px; top: -1px; width: 6px; height: 7px; border-radius: 1px; background: #8c8c8f; }
  `,
  html: `
    <div class="stage">
      <div class="case">
        <button class="pad g" type="button" aria-label="Green"></button>
        <button class="pad r" type="button" aria-label="Red"></button>
        <button class="pad y" type="button" aria-label="Yellow"></button>
        <button class="pad b" type="button" aria-label="Blue"></button>
        <div class="hub" aria-hidden="true"><span class="logo">simon</span><i class="ctl a"></i><i class="ctl s"></i><i class="ctl c"></i><span class="sl"></span></div>
      </div>
    </div>`,
  init(root) {
    const timers = [];
    root.querySelectorAll('.pad').forEach((p, i) => {
      p.addEventListener('click', () => { p.classList.add('lit'); clearTimeout(timers[i]); timers[i] = setTimeout(() => p.classList.remove('lit'), 280); });
    });
    return () => timers.forEach(clearTimeout);
  },
};
