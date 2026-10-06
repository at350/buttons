export default {
  id: 'rt-crt-power',
  credit: 'CRT television — rocker power switch: the picture warms up from a bright line, and collapses to a dot when switched off',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #3b3a37; padding: 14px; border-radius: 12px; display: inline-flex; gap: 14px; align-items: center;
      background-image: linear-gradient(90deg, rgba(0,0,0,.18) 1px, transparent 1px); background-size: 4px 100%; }
    .screen { position: relative; width: 150px; height: 112px; border-radius: 12px / 16px; background: #0a0a0a; overflow: hidden;
      box-shadow: inset 0 0 30px #000, 0 0 0 6px #222, 0 0 0 8px #4a4844; }
    .pic { position: absolute; inset: 0; opacity: 0; transition: opacity .25s;
      background: #2b7fd6 url(assets/wide/03.webp) center / cover; }
    .pic::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(0,0,0,.35) 0 1px, transparent 1px 3px); }
    .pic::after { content: ""; position: absolute; left: -20%; right: -20%; height: 30%; top: -30%; background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.12), rgba(255,255,255,0)); }
    .screen.on .pic { opacity: 1; animation: warm .5s steps(4) 1; }
    .screen.on .pic::after { animation: roll 2.8s linear infinite; }
    .glare { position: absolute; inset: 0; background: linear-gradient(115deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,0) 40%); pointer-events: none; }
    .pw { width: 30px; height: 54px; border: none; padding: 0; cursor: pointer; border-radius: 4px; position: relative;
      background: #1c1c1c; box-shadow: inset 0 0 0 2px #0a0a0a, 0 0 0 1px #5a5854; }
    .pw::after { content: ""; position: absolute; left: 3px; right: 3px; height: 50%; top: 50%; border-radius: 3px;
      background: linear-gradient(#3a3a3a, #262626); box-shadow: 0 -2px 2px rgba(0,0,0,.6), inset 0 1px 0 #555; transition: top .1s; }
    .pw[aria-checked="true"]::after { top: 3px; }
    .ctl { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .led { display: block; width: 6px; height: 6px; border-radius: 50%; background: #3a0000; transition: background .15s, box-shadow .15s; }
    .pw[aria-checked="true"] + .led { background: #ff2a00; box-shadow: 0 0 6px #ff4a00; }
    .pw:focus-visible { outline: 2px solid #ffb300; outline-offset: 3px; }
    .screen.dying .pic { opacity: 1; animation: crtoff .55s cubic-bezier(.5,0,.75,0) forwards; }
    .screen.dying .pic::after { display: none; }
    @keyframes crtoff { 0% { transform: none; filter: none; } 55% { transform: scale(1, .006); filter: brightness(5) saturate(0); } 85% { transform: scale(.02, .006); filter: brightness(6) saturate(0); opacity: 1; } 100% { transform: scale(0, 0); opacity: 0; } }
    @keyframes warm { from { filter: brightness(4) contrast(2) saturate(0); transform: scaleY(.02); } to { filter: none; transform: none; } }
    @keyframes roll { to { top: 130%; } }
  `,
  html: `
    <div class="stage">
      <div class="screen"><div class="pic"></div><div class="glare"></div></div>
      <div class="ctl"><button class="pw" type="button" role="switch" aria-checked="false" aria-label="Power"></button><span class="led"></span></div>
    </div>`,
  init(root) {
    const pw = root.querySelector('.pw'); const screen = root.querySelector('.screen');
    let t = 0;
    pw.addEventListener('click', () => {
      const on = pw.getAttribute('aria-checked') !== 'true';
      pw.setAttribute('aria-checked', String(on)); screen.classList.toggle('on', on);
      clearTimeout(t); screen.classList.toggle('dying', !on);
      if (!on) t = setTimeout(() => screen.classList.remove('dying'), 600);
    });
    return () => clearTimeout(t);
  },
};
