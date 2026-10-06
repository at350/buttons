// Philips HeartStart FRx AED face: green ON/OFF button, flashing blue "i" key and the orange SHOCK
// button with the heart-and-bolt symbol. ON starts rhythm analysis, the ring around SHOCK charges in
// orange, then SHOCK flashes until pressed; the ring turns green for the CPR pause and the "i" key
// flashes — press it to re-analyse. ON again switches the unit off.
export default {
  id: 'nd-heartstart-aed',
  credit: 'Philips HeartStart FRx AED — green ON/OFF, flashing blue "i", orange SHOCK button with a charging ring (orange charge → green delivered)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; display: inline-block; width: 210px; height: 168px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(120% 90% at 30% 10%, #4b5055, #2a2d30 70%); box-shadow: inset 0 1px 0 rgba(255,255,255,.12), inset 0 0 0 3px #1c1e20; }
    .on, .info, .shock { position: absolute; border: 0; padding: 0; border-radius: 50%; cursor: pointer; display: grid; place-items: center; -webkit-tap-highlight-color: transparent; }
    .on { left: 18px; top: 18px; width: 44px; height: 44px; background: radial-gradient(circle at 50% 35%, #69d36e, #2f9a3c 60%, #1d6b28);
      box-shadow: 0 3px 0 #124a1a, 0 4px 6px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.5); }
    .on svg { width: 20px; height: 20px; fill: none; stroke: #fff; stroke-width: 2.6; stroke-linecap: round; }
    .on[aria-pressed="true"] { box-shadow: 0 3px 0 #124a1a, 0 0 14px 3px rgba(100,240,110,.55), inset 0 1px 1px rgba(255,255,255,.5); }
    .info { left: 26px; top: 108px; width: 30px; height: 30px; background: radial-gradient(circle at 50% 35%, #4d8de0, #1f56a8 65%, #123a75);
      box-shadow: 0 2px 0 #0b2550, 0 3px 4px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.4); color: #fff; font: 700 16px/1 Georgia, serif; font-style: italic; }
    .info.fl { animation: inf .7s steps(2, jump-none) infinite; } @keyframes inf { 50% { background: radial-gradient(circle at 50% 40%, #fff 0 12%, #8fc0ff 40%, #2f74e0); box-shadow: 0 2px 0 #0b2550, 0 0 12px 3px rgba(80,150,255,.7); } }
    .ring { position: absolute; left: 82px; top: 34px; width: 110px; height: 110px; transform: rotate(-90deg); }
    .ring circle { fill: none; stroke-width: 7; }
    .ring .bg { stroke: #1a1c1e; }
    .ring .fg { stroke: #f7861e; stroke-linecap: round; stroke-dasharray: 0 302; transition: stroke-dasharray .2s; }
    .stage.charge .ring .fg { stroke-dasharray: 302 302; transition: stroke-dasharray 2.6s linear; }
    .stage.ready .ring .fg { stroke-dasharray: 302 302; filter: drop-shadow(0 0 4px #f7861e); }
    .stage.done .ring .fg { stroke: #3fd35a; stroke-dasharray: 302 302; filter: drop-shadow(0 0 4px #3fd35a); }
    .stage.anal .ring .fg { stroke-dasharray: 40 262; animation: spin 1s linear infinite; transform-origin: 55px 55px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .shock { left: 101px; top: 53px; width: 72px; height: 72px; background: radial-gradient(circle at 50% 35%, #ffb25c, #f47b14 55%, #b4540a);
      box-shadow: 0 4px 0 #7a3805, 0 6px 8px rgba(0,0,0,.5), inset 0 1px 2px rgba(255,255,255,.5); transition: transform .06s, box-shadow .06s; }
    .shock svg { width: 36px; height: 36px; }
    .shock:active { transform: translateY(3px); box-shadow: 0 1px 0 #7a3805, 0 2px 3px rgba(0,0,0,.5), inset 0 1px 2px rgba(255,255,255,.4); }
    .stage.ready .shock { animation: sh .5s steps(2, jump-none) infinite; }
    @keyframes sh { 50% { background: radial-gradient(circle at 50% 40%, #fff3d6 0 10%, #ffb04a 40%, #f07010); box-shadow: 0 4px 0 #7a3805, 0 0 18px 6px rgba(255,150,40,.75), inset 0 1px 2px #fff; } }
    .stage.zap .shock { box-shadow: 0 4px 0 #7a3805, 0 0 30px 12px rgba(255,255,255,.9); }
    .on:focus-visible, .info:focus-visible, .shock:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .lbl { position: absolute; font: 800 8px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1px; color: #d9dcdf; }
  `,
  html: `
    <div class="stage">
      <button class="on" type="button" aria-pressed="false" aria-label="On / Off"><svg viewBox="0 0 24 24"><path d="M12 3v9"/><path d="M6.4 6.6a8 8 0 1 0 11.2 0"/></svg></button>
      <button class="info" type="button" aria-label="Information">i</button>
      <svg class="ring" viewBox="0 0 110 110" aria-hidden="true"><circle class="bg" cx="55" cy="55" r="48"/><circle class="fg" cx="55" cy="55" r="48"/></svg>
      <button class="shock" type="button" aria-label="Shock"><svg viewBox="0 0 36 36" aria-hidden="true">
        <path d="M18 31S4 22.5 4 12.6A7.4 7.4 0 0 1 18 9a7.4 7.4 0 0 1 14 3.6C32 22.5 18 31 18 31Z" fill="#fff"/>
        <path d="M20 8.5 13.5 19h5l-2.6 9.5 7.6-12h-5.2l2.3-8Z" fill="#f47b14"/></svg></button>
      <span class="lbl" style="left:120px;top:150px">SHOCK</span>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), on = root.querySelector('.on'), info = root.querySelector('.info'), shock = root.querySelector('.shock');
    let state = 'off', t = 0;
    const set = (s) => {
      state = s; clearTimeout(t);
      stage.classList.remove('anal', 'charge', 'ready', 'done', 'zap');
      if (s !== 'off' && s !== 'idle') stage.classList.add(s);
      on.setAttribute('aria-pressed', s !== 'off'); info.classList.toggle('fl', s === 'done');
      if (s === 'anal') t = setTimeout(() => set('charge'), 1600);
      if (s === 'charge') t = setTimeout(() => set('ready'), 2700);
    };
    on.addEventListener('click', () => set(state === 'off' ? 'anal' : 'off'));
    info.addEventListener('click', () => { if (state === 'done') set('anal'); });
    shock.addEventListener('click', () => {
      if (state !== 'ready') return;
      stage.classList.add('zap'); stage.classList.remove('ready'); state = 'zapping';
      t = setTimeout(() => set('done'), 260);
    });
    return () => clearTimeout(t);
  },
};
