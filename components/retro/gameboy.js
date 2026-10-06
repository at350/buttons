// "Nintendo" wordmark: Simple Icons "nintendo" (CC0) with the race-track oval removed, as on the DMG boot screen.
const NIN = 'm4.447 12.546-1.202-1.942h-.864v2.793h.864v-1.942l1.202 1.942h.856v-2.793H4.44l.007 1.942Zm6.828-1.001v-.279h-.451v-.376h-.841v.376h-.458v.279h.458v1.852h.841v-1.852h.451Zm-5.491 1.844h.834v-1.852h-.834v1.852Zm0-2.213h.841v-.572h-.841v.572Zm14.663.233c-.676 0-1.224.467-1.224 1.039 0 .572.548 1.039 1.224 1.039.676 0 1.225-.467 1.225-1.039 0-.572-.549-1.039-1.225-1.039Zm.338 1.431c0 .293-.173.414-.338.414-.165 0-.346-.121-.346-.414v-.783c0-.294.173-.414.346-.414.165 0 .338.12.338.414v.783Zm-2.659-1.212a1.093 1.093 0 0 0-.473-.166c-.601-.053-1.067.482-1.067.971 0 .648.496.881.571.919.285.128.646.135.961-.068v.105h.827v-2.785h-.827c.008 0 .008.595.008 1.024Zm.008.828v.331c0 .286-.196.361-.331.361s-.331-.075-.331-.361v-.662c0-.287.196-.362.331-.362.128 0 .33.075.33.362v.331h.001Zm-9.556-1.001a1.02 1.02 0 0 0-.668.278v-.196h-.834v1.852h.834V12.17c0-.158.172-.339.398-.339.225 0 .383.181.383.339v1.219h.834v-1.008c0-.731-.631-.942-.947-.926Zm6.798 0a1.01 1.01 0 0 0-.668.278v-.196h-.834v1.852h.834V12.17c0-.158.173-.339.398-.339.225 0 .383.181.383.339v1.219h.834v-1.008c0-.731-.631-.942-.947-.926Zm-1.75 1.016c0-.572-.556-1.054-1.232-1.054-.683 0-1.232.467-1.232 1.039 0 .572.549 1.039 1.232 1.039.564 0 1.044-.324 1.187-.76h-.834v.112c0 .339-.225.414-.345.414-.128 0-.353-.075-.353-.413v-.385l1.577.008Zm-1.517-.655a.346.346 0 0 1 .293-.166c.112 0 .225.053.293.166.052.09.052.203.052.361h-.698c0-.158.007-.263.06-.361Zm9.893-.866c0-.09-.068-.135-.203-.135h-.188v.474h.113v-.196h.06l.09.196h.128l-.105-.211c.067-.022.105-.068.105-.128Zm-.218.068h-.06v-.136h.052c.068 0 .105.023.105.068 0 .053-.029.068-.097.068Zm.007-.392a.433.433 0 0 0-.428.43c0 .233.196.429.429.429a.429.429 0 0 0 0-.859h-.001Zm0 .776a.35.35 0 0 1-.345-.346.35.35 0 0 1 .346-.347.35.35 0 0 1 .345.347.35.35 0 0 1-.345.346h-.001Z';
export default {
  id: 'rt-gameboy',
  credit: 'Nintendo Game Boy (DMG-01, 1989) — #c4bebb shell, #8b956d LCD, magenta A / B; press START to boot',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #34343c; padding: 14px; border-radius: 12px; display: inline-block; }
    .gb { position: relative; width: 180px; height: 296px; border-radius: 8px 8px 44px 8px; background: #c4bebb; user-select: none;
      box-shadow: inset -2px -3px 0 #a8a29f, inset 2px 2px 0 #d6d1ce; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .groove { position: absolute; left: 0; right: 0; top: 12px; height: 2px; border-top: 1px solid #a8a29f; border-bottom: 1px solid #d9d4d1; }
    .groove::before, .groove::after { content: ""; position: absolute; top: -12px; width: 1px; height: 12px; background: #a8a29f; box-shadow: 1px 0 #d9d4d1; }
    .groove::before { left: 14px; } .groove::after { right: 14px; }
    .bez { position: absolute; left: 14px; top: 24px; width: 152px; height: 106px; border-radius: 6px 6px 26px 6px; background: #74738a; box-shadow: inset 0 1px 2px rgba(0,0,0,.35); }
    .stripe { position: absolute; left: 8px; right: 8px; top: 8px; height: 5px; display: flex; align-items: center; gap: 4px; }
    .stripe i { flex: 1; height: 5px; border-top: 1.5px solid #8b1e55; border-bottom: 1.5px solid #2b2a6e; }
    .stripe i:first-child { flex: none; width: 14px; } .stripe i:last-child { flex: none; width: 20px; }
    .stripe span { font: italic 600 5.2px/1 "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: .25px; color: #d8d6e2; white-space: nowrap; }
    .led { position: absolute; left: 11px; top: 40px; width: 6px; height: 6px; border-radius: 50%; background: #3a1414; box-shadow: inset 0 1px 1px rgba(0,0,0,.6); transition: background .2s, box-shadow .2s; }
    .gb.on .led { background: #ff2a1a; box-shadow: 0 0 4px #ff3b2a, inset 0 -1px 1px rgba(0,0,0,.3); }
    .bat { position: absolute; left: 4px; top: 49px; font: 600 4.2px/1 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #d8d6e2; letter-spacing: .2px; }
    .lcd { position: absolute; left: 30px; top: 19px; width: 92px; height: 83px; background: #8b956d; overflow: hidden;
      box-shadow: inset 1px 1px 2px rgba(0,0,0,.45); }
    .logo { position: absolute; left: 50%; top: 36px; width: 56px; margin-left: -28px; transform: translateY(-50px); }
    .logo svg { display: block; width: 56px; height: 12px; fill: #2c3a1c; }
    .gb.on .logo { animation: boot 2.3s steps(50) forwards; }
    .gb.on .logo.moved { animation: none; transform: translate(var(--x, 0px), var(--y, 0px)); }
    .lcd::after { content: ""; position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px) 0 0 / 2px 2px, linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px) 0 0 / 2px 2px; }
    .brand { position: absolute; left: 16px; top: 136px; display: flex; align-items: baseline; gap: 4px; color: #2b2a8f; }
    .brand svg { width: 46px; height: 10px; fill: #2b2a8f; transform: translateY(1px); }
    .brand b { font: italic 800 14px/1 "Futura", "Century Gothic", "Helvetica Neue", Arial, sans-serif; letter-spacing: -.2px; }
    .brand sup { font: 600 5px/1 Arial, sans-serif; margin-left: -2px; }
    .dwell { position: absolute; left: 10px; top: 166px; width: 60px; height: 60px; border-radius: 50%; background: radial-gradient(circle, #b9b3b0 60%, #cbc6c3 72%); }
    .dpad { position: absolute; left: 16px; top: 172px; width: 48px; height: 48px; }
    .k { position: absolute; padding: 0; margin: 0; border: none; background: #28272c; cursor: default; outline: none; }
    .k.u { left: 16px; top: 0; width: 16px; height: 17px; border-radius: 3px 3px 0 0; }
    .k.d { left: 16px; bottom: 0; width: 16px; height: 17px; border-radius: 0 0 3px 3px; }
    .k.l { left: 0; top: 16px; width: 17px; height: 16px; border-radius: 3px 0 0 3px; }
    .k.r { right: 0; top: 16px; width: 17px; height: 16px; border-radius: 0 3px 3px 0; }
    .hub { position: absolute; left: 16px; top: 16px; width: 16px; height: 16px; background: #28272c; pointer-events: none; }
    .hub::after { content: ""; position: absolute; inset: 4px; border-radius: 50%; background: radial-gradient(circle at 50% 40%, #1c1b1f, #333238); }
    .dpad::before { content: ""; position: absolute; inset: 0; pointer-events: none; z-index: 2;
      background: linear-gradient(#3e3d44 0 1px, transparent 1px); clip-path: polygon(33% 0, 67% 0, 67% 33%, 100% 33%, 100% 67%, 67% 67%, 67% 100%, 33% 100%, 33% 67%, 0 67%, 0 33%, 33% 33%); }
    .dpad .k:active { background: #1c1b20; }
    .dpad.p-u { transform: perspective(120px) rotateX(6deg); } .dpad.p-d { transform: perspective(120px) rotateX(-6deg); }
    .dpad.p-l { transform: perspective(120px) rotateY(-6deg); } .dpad.p-r { transform: perspective(120px) rotateY(6deg); }
    .k:focus-visible { box-shadow: 0 0 0 2px #2b2a8f; z-index: 3; }
    .abwell { position: absolute; left: 96px; top: 182px; width: 76px; height: 36px; border-radius: 18px; background: #b7b1ae; transform: rotate(-25deg); box-shadow: inset 0 1px 2px rgba(0,0,0,.18); }
    .ab { position: absolute; width: 26px; height: 26px; border-radius: 50%; padding: 0; margin: 0; border: none; cursor: default; outline: none;
      background: radial-gradient(circle at 45% 38%, #b03070, #9b2257 55%, #861b4a); box-shadow: 0 2px 0 #6e1640, 0 3px 3px rgba(0,0,0,.25);
      transition: transform .05s, box-shadow .05s; }
    .ab:active, .ab.held { transform: translateY(2px); box-shadow: 0 0 0 #6e1640, inset 0 1px 2px rgba(0,0,0,.35); }
    .ab:focus-visible { box-shadow: 0 2px 0 #6e1640, 0 0 0 2px #2b2a8f; }
    .ab.b { left: 103px; top: 200px; } .ab.a { left: 137px; top: 184px; }
    .lab { position: absolute; font: 700 9px/1 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #2b2a8f; }
    .ss { position: absolute; width: 24px; height: 7px; border-radius: 4px; padding: 0; margin: 0; border: none; cursor: default; outline: none; transform: rotate(-25deg);
      background: #8f8c95; box-shadow: 0 0 0 2px #b7b1ae, 0 1px 0 2px #a8a29f; }
    .ss:active { background: #6f6c75; }
    .ss:focus-visible { box-shadow: 0 0 0 2px #2b2a8f; }
    .ssl { position: absolute; font: italic 600 5.5px/1 "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: .4px; color: #2b2a8f; transform: rotate(-25deg); }
    .spk { position: absolute; left: 128px; top: 246px; width: 44px; height: 40px; transform: rotate(-25deg); display: flex; gap: 4px; }
    .spk i { width: 3px; height: 34px; border-radius: 2px; background: #8f8a88; box-shadow: inset 1px 1px 1px rgba(0,0,0,.4); }
    @keyframes boot { to { transform: translateY(0); } }
  `,
  html: `
    <div class="stage">
      <div class="gb">
        <div class="groove"></div>
        <div class="bez">
          <div class="stripe"><i></i><i></i><span>DOT MATRIX WITH STEREO SOUND</span><i></i><i></i></div>
          <div class="led"></div><span class="bat">BATTERY</span>
          <div class="lcd"><div class="logo"><svg viewBox="0.7 10.6 22.7 2.9" preserveAspectRatio="none" aria-hidden="true"><path d="${NIN}"/></svg></div></div>
        </div>
        <div class="brand"><svg viewBox="0.7 10.6 22.7 2.9" preserveAspectRatio="none" aria-hidden="true"><path d="${NIN}"/></svg><b>GAME BOY</b><sup>TM</sup></div>
        <div class="dwell"></div>
        <div class="dpad"><span class="hub"></span>
          <button class="k u" type="button" aria-label="Up"></button><button class="k d" type="button" aria-label="Down"></button>
          <button class="k l" type="button" aria-label="Left"></button><button class="k r" type="button" aria-label="Right"></button>
        </div>
        <div class="abwell"></div>
        <button class="ab b" type="button" aria-label="B"></button><button class="ab a" type="button" aria-label="A"></button>
        <span class="lab" style="left:113px;top:231px">B</span><span class="lab" style="left:147px;top:215px">A</span>
        <button class="ss sel" type="button" aria-label="Select" style="left:52px;top:252px"></button>
        <button class="ss st" type="button" aria-label="Start" aria-pressed="false" style="left:84px;top:252px"></button>
        <span class="ssl" style="left:49px;top:265px">SELECT</span><span class="ssl" style="left:85px;top:265px">START</span>
        <div class="spk"><i></i><i></i><i></i><i></i><i></i><i></i></div>
      </div>
    </div>`,
  init(root) {
    const gb = root.querySelector('.gb'), logo = root.querySelector('.logo'), dpad = root.querySelector('.dpad'), st = root.querySelector('.st');
    let x = 0, y = 0;
    const power = (on) => {
      gb.classList.toggle('on', on); st.setAttribute('aria-pressed', String(on));
      logo.classList.remove('moved'); x = 0; y = 0; logo.style.removeProperty('--x'); logo.style.removeProperty('--y');
      if (on) { logo.style.animation = 'none'; void logo.offsetWidth; logo.style.animation = ''; }
    };
    st.addEventListener('click', () => power(!gb.classList.contains('on')));
    root.querySelector('.sel').addEventListener('click', () => { if (gb.classList.contains('on')) power(true); });
    root.querySelectorAll('.ab').forEach((b) => b.addEventListener('click', () => { if (!gb.classList.contains('on')) power(true); }));
    const step = { u: [0, -4], d: [0, 4], l: [-4, 0], r: [4, 0] };
    root.querySelectorAll('.dpad .k').forEach((k) => {
      const dir = k.className.split(' ')[1];
      k.addEventListener('pointerdown', () => dpad.classList.add('p-' + dir));
      k.addEventListener('click', () => {
        if (!gb.classList.contains('on')) return;
        x = Math.max(-16, Math.min(16, x + step[dir][0])); y = Math.max(-32, Math.min(30, y + step[dir][1]));
        logo.classList.add('moved'); logo.style.setProperty('--x', x + 'px'); logo.style.setProperty('--y', y + 'px');
      });
    });
    const release = () => dpad.classList.remove('p-u', 'p-d', 'p-l', 'p-r');
    root.addEventListener('pointerup', release); root.addEventListener('pointerleave', release);
  },
};
