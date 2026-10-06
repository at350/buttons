export default {
  id: 'rt-gameboy',
  credit: 'Nintendo Game Boy (DMG-01) — D-pad plus magenta A / B buttons on the grey shell',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c4bebb; padding: 18px 22px; border-radius: 12px; display: inline-flex; gap: 34px; align-items: center;
      box-shadow: inset 0 0 0 2px #b0aaa6; }
    .dpad { position: relative; width: 78px; height: 78px; }
    .dpad .k { position: absolute; width: 26px; height: 26px; border: none; background: #2a2a2e; cursor: pointer; padding: 0;
      box-shadow: inset 0 -2px 0 #111, inset 0 1px 0 #4a4a50; }
    .dpad .k:active, .dpad .k.on { box-shadow: inset 0 2px 3px #000; background: #202024; }
    .dpad .k:focus-visible { outline: 2px solid #8b2252; outline-offset: 1px; }
    .u { left: 26px; top: 0; border-radius: 4px 4px 0 0; } .d { left: 26px; bottom: 0; border-radius: 0 0 4px 4px; }
    .l { left: 0; top: 26px; border-radius: 4px 0 0 4px; } .r { right: 0; top: 26px; border-radius: 0 4px 4px 0; }
    .c { position: absolute; left: 26px; top: 26px; width: 26px; height: 26px; background: #2a2a2e; }
    .c::after { content: ""; position: absolute; inset: 7px; border-radius: 50%; background: radial-gradient(#333 30%, #1c1c1f 70%); }
    .ab { display: flex; gap: 10px; transform: rotate(-25deg); }
    .ab button { width: 42px; height: 42px; border-radius: 50%; border: none; cursor: pointer; padding: 0;
      background: radial-gradient(circle at 40% 35%, #c84b8f, #a2366f 60%, #7f2756); color: #3a1230; font: bold 12px Arial, sans-serif;
      box-shadow: 0 3px 0 #6c1f49, 0 4px 4px rgba(0,0,0,.35), inset 0 1px 1px rgba(255,255,255,.3); transition: transform .05s, box-shadow .05s; }
    .ab button:active, .ab button.on { transform: translateY(3px); box-shadow: 0 0 0 #6c1f49, inset 0 2px 4px rgba(0,0,0,.4); }
    .ab button:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .ab span { position: relative; }
    .ab span::after { content: attr(data-l); position: absolute; left: 50%; top: 50px; transform: translateX(-50%) rotate(25deg); color: #3a3a7a; font: bold 12px Arial, sans-serif; }
  `,
  html: `
    <div class="stage">
      <div class="dpad">
        <button class="k u" type="button" aria-label="Up"></button>
        <button class="k l" type="button" aria-label="Left"></button>
        <div class="c"></div>
        <button class="k r" type="button" aria-label="Right"></button>
        <button class="k d" type="button" aria-label="Down"></button>
      </div>
      <div class="ab">
        <span data-l="B"><button type="button" aria-label="B" aria-pressed="false"></button></span>
        <span data-l="A"><button type="button" aria-label="A" aria-pressed="false"></button></span>
      </div>
    </div>`,
  init(root) {
    root.querySelectorAll('.dpad .k').forEach((k) => k.addEventListener('click', () => {
      root.querySelectorAll('.dpad .k').forEach((o) => o.classList.remove('on'));
      k.classList.add('on'); setTimeout(() => k.classList.remove('on'), 300);
    }));
    root.querySelectorAll('.ab button').forEach((b) => b.addEventListener('click', () => {
      const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on));
    }));
  },
};
