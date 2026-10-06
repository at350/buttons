export default {
  id: 'rt-flip-clock',
  credit: 'Split-flap flip clock (Solari / Twemco style) — click a digit to flap it over to the next number',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #2a2a2a; padding: 14px 16px; border-radius: 12px; display: inline-flex; gap: 6px; align-items: center; }
    .dg { position: relative; width: 48px; height: 66px; border: none; padding: 0; background: none; cursor: pointer; perspective: 220px; font: bold 50px/66px "Helvetica Neue", Helvetica, Arial, sans-serif; color: #f2f2f2; }
    .dg:focus-visible { outline: 2px solid #ffb300; outline-offset: 2px; border-radius: 6px; }
    .half { position: absolute; left: 0; right: 0; height: 33px; overflow: hidden; background: #111; backface-visibility: hidden; }
    .top { top: 0; border-radius: 6px 6px 0 0; } .bot { bottom: 0; border-radius: 0 0 6px 6px; }
    .half span { position: absolute; left: 0; right: 0; text-align: center; }
    .top span { top: 0; } .bot span { top: -33px; }
    .st { background: #161616; } .sb { background: #0e0e0e; }
    .f { transform-origin: 50% 100%; z-index: 2; }
    .f.top { transform: rotateX(0); background: #1a1a1a; }
    .f.bot { transform-origin: 50% 0; transform: rotateX(90deg); background: #101010; }
    .dg.go .f.top { animation: ft .22s ease-in forwards; }
    .dg.go .f.bot { animation: fb .22s .22s ease-out forwards; }
    .dg::after { content: ""; position: absolute; left: 0; right: 0; top: 32px; height: 2px; background: #2a2a2a; z-index: 3; }
    .colon { width: 8px; height: 40px; display: flex; flex-direction: column; justify-content: space-around; align-items: center; }
    .colon i { width: 6px; height: 6px; border-radius: 50%; background: #666; }
    @keyframes ft { to { transform: rotateX(-90deg); } }
    @keyframes fb { to { transform: rotateX(0); } }
  `,
  html: `
    <div class="stage">
      <button class="dg" type="button" data-v="1" aria-label="hour tens"></button>
      <button class="dg" type="button" data-v="2" aria-label="hour ones"></button>
      <div class="colon"><i></i><i></i></div>
      <button class="dg" type="button" data-v="0" aria-label="minute tens"></button>
      <button class="dg" type="button" data-v="0" aria-label="minute ones"></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.dg').forEach((d) => {
      let v = Number(d.dataset.v); let busy = false;
      const paint = (cur, nxt) => {
        d.innerHTML = `<div class="half top st"><span>${nxt}</span></div><div class="half bot sb"><span>${cur}</span></div>` +
          `<div class="half top f"><span>${cur}</span></div><div class="half bot f"><span>${nxt}</span></div>`;
      };
      paint(v, v);
      d.addEventListener('click', () => {
        if (busy) return; busy = true;
        const nxt = (v + 1) % 10; paint(v, nxt); d.classList.add('go');
        setTimeout(() => { v = nxt; d.classList.remove('go'); paint(v, v); busy = false; }, 460);
      });
    });
  },
};
