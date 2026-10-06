// Square D QO-style plug-on breakers seen through a load-centre dead-front: black bodies, a stubby
// handle with the amp rating on it, ON toward the outside, and the round Visi-Trip window.
const SIDE = (amp) => `
  <div class="bk dummy" aria-hidden="true">
    <span class="lbl off">OFF</span><span class="vt"></span>
    <span class="slot"><span class="handle on"><b>${amp}</b></span></span>
    <span class="lbl on">ON</span>
  </div>`;

export default {
  id: 'ph-breaker',
  credit: 'Square D QO-style circuit breaker in a load-centre dead-front — handle snaps hard between OFF and ON',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      display: inline-block; padding: 14px 16px; border-radius: 12px;
      background: radial-gradient(circle at 20% 0%, #e2e3df, #c4c6c1 70%), #cfd0cc;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7), inset 0 -1px 0 rgba(0,0,0,.12);
    }
    .opening {
      display: grid; gap: 3px; padding: 4px 6px; border-radius: 2px; background: #1a1b1c;
      box-shadow: inset 0 2px 4px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.8);
    }
    .bk {
      position: relative; display: flex; align-items: center; gap: 6px; width: 156px; height: 34px; padding: 0 8px;
      border: 0; border-radius: 2px; font: inherit;
      background: linear-gradient(#2b2c2e, #1e1f21 55%, #161718);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.1), inset 0 -1px 0 rgba(0,0,0,.6);
      -webkit-tap-highlight-color: transparent;
    }
    button.bk { cursor: pointer; }
    button.bk:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
    .lbl { font: 800 7.5px/1 Inter, Arial, sans-serif; letter-spacing: .6px; color: rgba(255,255,255,.72); }
    .lbl.on { margin-left: auto; }
    .vt { width: 7px; height: 7px; border-radius: 50%; background: #0b0b0c; box-shadow: inset 0 1px 1px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.08); }
    .slot {
      position: relative; width: 58px; height: 22px; border-radius: 2px; background: #0a0a0b; perspective: 120px;
      box-shadow: inset 0 2px 3px rgba(0,0,0,1), inset 0 -1px 0 rgba(255,255,255,.06);
    }
    .handle {
      position: absolute; top: 1px; left: 13px; width: 32px; height: 20px; border-radius: 2px;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(90deg, #121314, #3a3c3f 30%, #2a2c2e 70%, #101112);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 2px 3px rgba(0,0,0,.8);
      transform: translateX(-9px) rotateY(-28deg);
      transition: transform .085s cubic-bezier(.8,0,.2,1.35), background .085s;
    }
    .handle b { font: 800 10px/1 Inter, Arial, sans-serif; color: #f2f2f0; letter-spacing: -.2px; }
    .handle.on, button[aria-pressed="true"] .handle { transform: translateX(9px) rotateY(28deg); background: linear-gradient(90deg, #101112, #2a2c2e 30%, #3a3c3f 70%, #121314); }
    button.bk:active .handle { transform: translateX(0) rotateY(0); transition-duration: .05s; }
    .dummy { opacity: .9; }
  `,
  html: `
    <div class="stage">
      <div class="opening">
        ${SIDE(15)}
        <button class="bk" type="button" aria-pressed="true" aria-label="20 amp breaker">
          <span class="lbl off">OFF</span><span class="vt"></span>
          <span class="slot"><span class="handle"><b>20</b></span></span>
          <span class="lbl on">ON</span>
        </button>
        ${SIDE(15)}
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('button.bk');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
