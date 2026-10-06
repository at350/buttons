export default {
  id: 'ty2-polly-pocket',
  credit: 'Bluebird Polly Pocket (1989) — the pink shell compact: press the purple latch and the lid springs up on a tiny house with Polly inside',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 220px; height: 180px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 20% 20%, #fff 0 2px, transparent 3px) 0 0 / 34px 30px, linear-gradient(#fde7f3, #f7c6e3); perspective: 520px; perspective-origin: 50% 0; }
    .compact { position: absolute; left: 35px; top: 44px; width: 150px; height: 128px; transform-style: preserve-3d; transform: rotateX(48deg); transform-origin: 50% 100%; }
    .shell { position: absolute; inset: 0; border-radius: 48% 48% 44% 44% / 56% 56% 44% 44%; }
    .base { background: linear-gradient(#f9a8d4, #ec4899 60%, #be185d); box-shadow: 0 0 0 4px #db2777; }
    .room { position: absolute; left: 14px; top: 14px; right: 14px; bottom: 16px; border-radius: 44% 44% 40% 40% / 54% 54% 40% 40%; overflow: hidden;
      background: linear-gradient(#bfe3ff 0 46%, #fde68a 46% 50%, #f5d0a9 50%); box-shadow: inset 0 4px 8px rgba(0,0,0,.25); }
    .win { position: absolute; top: 12px; width: 22px; height: 26px; border-radius: 11px 11px 2px 2px; background: #7dd3fc; box-shadow: inset 0 0 0 3px #fff; }
    .w1 { left: 22px; } .w2 { right: 22px; }
    .bed { position: absolute; left: 66px; bottom: 26px; width: 28px; height: 14px; border-radius: 4px; background: #c084fc; box-shadow: 0 -6px 0 -2px #fff; }
    .polly { position: absolute; left: 36px; bottom: 22px; width: 12px; height: 30px; transform: rotateX(-48deg); transform-origin: 50% 100%; }
    .polly::before { content: ''; position: absolute; left: 1px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: radial-gradient(circle at 50% 70%, #ffe0c2 0 45%, #f6c344 50%); }
    .polly::after { content: ''; position: absolute; left: 0; top: 10px; width: 12px; height: 20px; border-radius: 6px 6px 2px 2px; background: linear-gradient(#a855f7, #7e22ce); clip-path: polygon(30% 0, 70% 0, 100% 100%, 0 100%); }
    .lid { transform-origin: 50% 0; transform: translateZ(10px); transition: transform .6s cubic-bezier(.3,1.5,.5,1);
      background: radial-gradient(ellipse at 40% 25%, #fde2f1, #f9a8d4 35%, #ec4899 80%); box-shadow: inset 0 -6px 0 #db2777, 0 0 0 4px #db2777; }
    .lid::before { content: ''; position: absolute; left: 50%; top: 50%; width: 46px; height: 46px; margin: -26px 0 0 -23px;
      background: radial-gradient(circle at 40% 35%, #fff, #e9d5ff 40%, #c084fc); clip-path: path('M23 42 C10 32 2 24 2 14 A10 10 0 0 1 23 10 A10 10 0 0 1 44 14 C44 24 36 32 23 42 Z'); }
    .open .lid { transform: translateZ(10px) rotateX(-112deg); }
    .lid::after { content: ''; position: absolute; inset: 14px 18px 18px; border-radius: inherit; opacity: 0; transition: opacity .2s .15s;
      background: linear-gradient(135deg, #e0f2fe, #bae6fd 40%, #fff 50%, #bae6fd 60%); box-shadow: inset 0 0 0 3px #f9a8d4; }
    .open .lid::after { opacity: 1; }
    .compact:not(.open) .lid:hover { transform: translateZ(10px) rotateX(-4deg); }
    .latch { position: absolute; left: 50%; top: 156px; width: 30px; height: 16px; margin-left: -15px; border: 0; padding: 0; cursor: pointer;
      border-radius: 4px 4px 9px 9px; background: linear-gradient(#d8b4fe, #9333ea 60%, #6b21a8); box-shadow: 0 3px 0 #4c1d95, inset 0 1px 0 rgba(255,255,255,.6);
      transition: transform .12s; }
    .latch:hover { transform: translateY(1px); }
    .latch:active { transform: translateY(4px); }
    .latch[aria-expanded="true"] { transform: translateY(3px); filter: saturate(.8); }
    .latch:focus-visible { outline: 3px solid #9333ea; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="compact">
        <div class="shell base"><div class="room"><span class="win w1"></span><span class="win w2"></span><span class="bed"></span><span class="polly"></span></div></div>
        <div class="shell lid"></div>
      </div>
      <button class="latch" type="button" aria-expanded="false" aria-label="open compact"></button>
    </div>`,
  init(root) {
    const c = root.querySelector('.compact'), latch = root.querySelector('.latch');
    latch.addEventListener('click', () => {
      const open = latch.getAttribute('aria-expanded') !== 'true';
      latch.setAttribute('aria-expanded', String(open)); latch.setAttribute('aria-label', open ? 'close compact' : 'open compact');
      c.classList.toggle('open', open);
    });
    latch.addEventListener('keydown', (e) => { if (e.key === 'Escape' && c.classList.contains('open')) latch.click(); });
  },
};
