export default {
  id: 'ph-elevator-call',
  credit: 'Elevator hall call button — black cap, white halo that lights and stays lit (Otis / Schindler style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px 24px; border-radius: 12px; background: linear-gradient(#5b5f66, #3c3f45); }
    .plate {
      position: relative; width: 72px; height: 118px; border-radius: 3px; display: flex; align-items: center; justify-content: center;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 3px), linear-gradient(#d2d4d7, #a9abaf);
      box-shadow: 0 1px 0 rgba(255,255,255,.5) inset, 0 2px 4px rgba(0,0,0,.4), 0 10px 20px rgba(0,0,0,.3);
    }
    .screw { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff, #c5c6c9 60%, #7d7f84); box-shadow: inset 0 1px 1px rgba(0,0,0,.4); }
    .screw.a { top: 6px; left: 6px; } .screw.b { top: 6px; right: 6px; } .screw.c { bottom: 6px; left: 6px; } .screw.d { bottom: 6px; right: 6px; }
    .btn {
      position: relative; width: 48px; height: 48px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 50% 50%, #1b1b1d 0 56%, #e9e9e9 60%, #fafafa 64%, #c9c9c9 70%, #2a2a2c 72%);
      box-shadow: 0 3px 4px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.2);
      transition: transform .06s, box-shadow .06s, background .12s; -webkit-tap-highlight-color: transparent;
    }
    .btn:active { transform: translateY(1.5px); box-shadow: 0 1px 1px rgba(0,0,0,.6); }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .btn svg { position: absolute; left: 50%; top: 50%; width: 22px; height: 22px; margin: -11px; fill: #d0d0d0; }
    .btn[aria-pressed="true"] { background: radial-gradient(circle at 50% 50%, #1b1b1d 0 56%, #fff3cc 59%, #ffd166 64%, #ffb21f 70%, #2a2a2c 72%); box-shadow: 0 3px 4px rgba(0,0,0,.6), 0 0 14px 2px rgba(255,180,50,.55); }
    .btn[aria-pressed="true"] svg { fill: #ffd27a; }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        <span class="screw a"></span><span class="screw b"></span><span class="screw c"></span><span class="screw d"></span>
        <button class="btn" type="button" aria-pressed="false" aria-label="call elevator up"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5 3 17h18z"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
