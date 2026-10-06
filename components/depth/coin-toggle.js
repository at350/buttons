export default {
  id: 'dp-coin-toggle',
  credit: '3D coin toggle — heads / tails faces with a stacked-slice edge, spins three turns on rotateY to land on the other side',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 26px 40px 30px; perspective: 700px; background: #14532d; border-radius: 12px; }
    .coin {
      --spin: 0deg; position: relative; width: 84px; height: 84px; border: 0; padding: 0; background: transparent; cursor: pointer;
      transform-style: preserve-3d; transform: rotateX(8deg) rotateY(var(--spin));
      transition: transform 1.4s cubic-bezier(.2, .9, .25, 1.05);
    }
    .coin:hover { transform: rotateX(14deg) rotateY(calc(var(--spin) + 18deg)) translateZ(8px); transition-duration: .5s; }
    .face {
      position: absolute; inset: 0; border-radius: 50%; display: grid; place-items: center; color: #7c4a03;
      -webkit-backface-visibility: hidden; backface-visibility: hidden;
      background: radial-gradient(circle at 35% 30%, #fff3b0, #f6c445 45%, #c98f14 100%);
      box-shadow: inset 0 0 0 5px #e0ab2a, inset 0 0 0 7px #fbe08a;
      font: 900 36px/1 'Fraunces', Georgia, serif;
    }
    .heads { transform: translateZ(5px); }
    .tails { transform: rotateY(180deg) translateZ(5px); }
    .tails svg { width: 38px; height: 38px; }
    .edge { position: absolute; inset: 0; border-radius: 50%; background: #b8820f; transform: translateZ(0); -webkit-backface-visibility: visible; backface-visibility: visible; }
    .edge:nth-child(n+3) { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .15); }
    .sh { position: absolute; left: 50%; bottom: -16px; width: 70px; height: 14px; border-radius: 50%; background: rgba(0, 0, 0, .35); filter: blur(4px); transform: translateX(-50%); transition: transform .5s, opacity .5s; }
    .coin:hover ~ .sh { transform: translateX(-50%) scale(.85); opacity: .6; }
    .wrap { position: relative; width: 84px; }
    .coin:focus-visible { outline: 0; }
    .coin:focus-visible .face { box-shadow: inset 0 0 0 5px #e0ab2a, inset 0 0 0 7px #fbe08a, 0 0 0 3px #fff; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <button class="coin" type="button" role="switch" aria-checked="false" aria-label="Flip coin">
          <span class="face heads">$</span>
          <span class="face tails"><svg viewBox="0 0 24 24" fill="#7c4a03" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg></span>
          <span class="edge" style="transform:translateZ(-4px)"></span><span class="edge" style="transform:translateZ(-2px)"></span>
          <span class="edge" style="transform:translateZ(0)"></span><span class="edge" style="transform:translateZ(2px)"></span><span class="edge" style="transform:translateZ(4px)"></span>
        </button>
        <span class="sh"></span>
      </div>
    </div>`,
  init(root) {
    const c = root.querySelector('.coin');
    let turns = 0;
    c.addEventListener('click', () => {
      const on = c.getAttribute('aria-checked') !== 'true';
      c.setAttribute('aria-checked', String(on));
      turns += 1;
      c.style.setProperty('--spin', (turns * 1260) + 'deg');
    });
  },
};
