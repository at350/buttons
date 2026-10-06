export default {
  id: 'dp-hinge-door',
  credit: 'Hinged panel door — swings ajar on hover and wide open on click (rotateY on the hinge edge, with real door thickness), spilling warm light from the room behind',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; padding: 24px 54px 30px 74px; perspective: 800px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(180deg, #2b3440 0, #252d38 170px, #1a2028 170px, #141920 100%);
    }
    .frame {
      position: relative; width: 90px; height: 146px; transform-style: preserve-3d;
      box-shadow: 0 0 0 5px #e8e2d6, 0 0 0 6px #b9b0a0, 0 8px 14px 4px rgba(0, 0, 0, .35);
    }
    /* the room seen through the opening: back wall, floor and a lamp glow, painted in perspective */
    .room {
      position: absolute; inset: 0; overflow: hidden;
      background:
        radial-gradient(60px 50px at 62% 28%, rgba(255, 236, 190, .95), transparent 70%),
        linear-gradient(180deg, #f6d9a2 0, #e9bd78 62%, #b77a3c 62%, #8f5b2a 100%);
    }
    .room::before { content: ''; position: absolute; left: 18%; top: 22%; width: 26%; height: 30%; background: #fbe7bf; box-shadow: inset 0 0 0 3px #d9a964, 0 0 12px rgba(255, 240, 200, .8); }
    .room::after { content: ''; position: absolute; left: 0; right: 0; top: 62%; height: 3px; background: rgba(90, 50, 20, .35); }
    .spill {
      position: absolute; left: 74px; width: 90px; top: calc(24px + 146px); height: 30px; pointer-events: none;
      background: linear-gradient(180deg, rgba(255, 214, 140, .55), transparent); clip-path: polygon(0 0, 100% 0, 128% 100%, -22% 100%);
      opacity: 0; transition: opacity .6s;
    }
    .door {
      position: absolute; inset: 0; border: 0; padding: 0; cursor: pointer; background: none;
      transform-origin: left center; transform-style: preserve-3d; transform: rotateY(0deg);
      transition: transform .9s cubic-bezier(.3, 1.05, .4, 1);
    }
    .door:hover { transform: rotateY(-26deg); }
    .door[aria-expanded="true"], .door[aria-expanded="true"]:hover { transform: rotateY(-104deg); }
    .face { position: absolute; inset: 0; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
    .front {
      background: linear-gradient(90deg, #7b4a22, #9a6233 45%, #8a5629);
      box-shadow: inset 0 0 0 1px #5e3816;
    }
    .front::before, .front::after {
      content: ''; position: absolute; left: 13px; right: 13px; border-radius: 1px;
      background: linear-gradient(135deg, #8d5a2d, #a56d3a 60%, #8a5629);
      box-shadow: inset 2px 2px 0 rgba(0, 0, 0, .28), inset -2px -2px 0 rgba(255, 220, 170, .18), 0 0 0 1px #5e3816;
    }
    .front::before { top: 13px; height: 46px; }
    .front::after { bottom: 13px; height: 60px; }
    .back { transform: rotateY(180deg); background: linear-gradient(90deg, #6e421d, #8a5629); box-shadow: inset 0 0 0 1px #4c2c10; }
    .edge { position: absolute; right: 0; top: 0; bottom: 0; width: 6px; background: linear-gradient(90deg, #4f2f12, #6a4019); transform-origin: right center; transform: rotateY(90deg); }
    .knob {
      position: absolute; right: 9px; top: 50%; width: 9px; height: 9px; margin-top: -2px; border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #fff3c4, #d4a24a 55%, #8a5a16); box-shadow: 0 1.5px 2px rgba(0, 0, 0, .55);
      transform: translateZ(3px);
    }
    .knob.in { transform: rotateY(180deg) translateZ(3px); right: 9px; }
    .stage.open .spill { opacity: 1; }
    .door:focus-visible { outline: 2px solid #fde68a; outline-offset: 7px; }
  `,
  html: `
    <div class="stage">
      <div class="frame">
        <span class="room"></span>
        <button class="door" type="button" aria-expanded="false" aria-label="Open door" data-overhang>
          <span class="face front"></span><span class="face back"></span><span class="edge"></span>
          <span class="knob"></span>
        </button>
      </div>
      <span class="spill"></span>
    </div>`,
  init(root) {
    const d = root.querySelector('.door'), st = root.querySelector('.stage');
    d.addEventListener('click', () => {
      const o = d.getAttribute('aria-expanded') !== 'true';
      d.setAttribute('aria-expanded', String(o)); d.setAttribute('aria-label', o ? 'Close door' : 'Open door');
      st.classList.toggle('open', o);
    });
  },
};
