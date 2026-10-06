export default {
  id: 'ph-vending-button',
  credit: 'Vending machine selection button — backlit drink window; goes dark and "sold out" after four presses, a fifth restocks',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px 20px; border-radius: 12px; background: linear-gradient(#1c3f8a, #122a5c); box-shadow: inset 0 1px 0 rgba(255,255,255,.15); }
    .bezel { position: relative; width: 72px; height: 96px; border-radius: 6px; padding: 5px; background: linear-gradient(135deg, #e6e8eb, #8d9197); box-shadow: 0 3px 6px rgba(0,0,0,.6), inset 0 1px 0 #fff; }
    .btn {
      position: relative; display: block; width: 62px; height: 86px; border: 0; padding: 0; border-radius: 4px; cursor: pointer; overflow: hidden;
      background: radial-gradient(ellipse at 50% 30%, #ffb347, #f26d0c 60%, #a8400a 100%);
      box-shadow: 0 0 14px 2px rgba(255,140,40,.55), inset 0 0 0 2px rgba(255,255,255,.35), inset 0 -3px 6px rgba(0,0,0,.35);
      transition: transform .06s, box-shadow .06s, background .25s, filter .25s; -webkit-tap-highlight-color: transparent;
    }
    .btn::before { content: ''; position: absolute; left: 16px; top: 14px; width: 30px; height: 56px; border-radius: 8px 8px 10px 10px; background: linear-gradient(90deg, rgba(255,255,255,.25), rgba(255,255,255,.75) 35%, rgba(255,255,255,.35) 60%, rgba(0,0,0,.15)); box-shadow: 0 2px 4px rgba(0,0,0,.3); }
    .btn::after { content: ''; position: absolute; left: 22px; top: 8px; width: 18px; height: 10px; border-radius: 3px 3px 0 0; background: rgba(255,255,255,.75); }
    .btn:hover { box-shadow: 0 0 20px 4px rgba(255,150,50,.7), inset 0 0 0 2px rgba(255,255,255,.4), inset 0 -3px 6px rgba(0,0,0,.35); }
    .btn:active { transform: translateY(2px); box-shadow: 0 0 8px 1px rgba(255,140,40,.4), inset 0 0 0 2px rgba(255,255,255,.3), inset 0 3px 6px rgba(0,0,0,.35); }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .led { position: absolute; left: 50%; bottom: -1px; width: 10px; height: 5px; margin-left: -5px; border-radius: 0 0 3px 3px; background: #4a1a10; box-shadow: inset 0 1px 1px rgba(0,0,0,.6); transition: background .2s, box-shadow .2s; }
    .bezel.out .btn { background: radial-gradient(ellipse at 50% 30%, #5a4a3e, #3a2d26 60%, #1f1813 100%); box-shadow: inset 0 0 0 2px rgba(255,255,255,.1), inset 0 -3px 6px rgba(0,0,0,.5); filter: saturate(.3); }
    .bezel.out .led { background: #ff2a1a; box-shadow: 0 0 6px 2px rgba(255,60,30,.8); animation: blink 1s steps(1) infinite; }
    @keyframes blink { 50% { background: #5a1a10; box-shadow: none; } }
  `,
  html: `
    <div class="stage">
      <div class="bezel">
        <button class="btn" type="button" aria-label="select drink" aria-pressed="false"></button>
        <span class="led"></span>
      </div>
    </div>`,
  init(root) {
    const bezel = root.querySelector('.bezel'), btn = root.querySelector('.btn');
    let n = 0;
    btn.addEventListener('click', () => {
      if (bezel.classList.contains('out')) { bezel.classList.remove('out'); n = 0; btn.setAttribute('aria-pressed', 'false'); return; }
      if (++n >= 4) { bezel.classList.add('out'); btn.setAttribute('aria-pressed', 'true'); }
    });
  },
};
