const CRATES = [0, 1, 2, 3, 4].map((i) => `<rect class="seg crate" data-i="${i}" x="${10 + i * 22}" y="56" width="12" height="12" rx="1"/>`).join('');

export default {
  id: 'ty2-tiger-lcd',
  credit: 'Tiger Electronics handheld LCD game (1990s) — press START, then the red button to jump the crates; ghost segments on a printed backdrop',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 12px; border-radius: 12px; overflow: hidden; background: linear-gradient(#cfd7e6, #a9b4c9); }
    .dev { position: relative; width: 168px; height: 236px; border-radius: 18px 18px 30px 30px;
      background: linear-gradient(150deg, #4a4f5c, #2a2d35 40%, #1a1c22); box-shadow: 0 6px 0 #0e0f13, 0 10px 14px rgba(0,0,0,.4), inset 0 2px 0 rgba(255,255,255,.18); }
    .bez { position: absolute; left: 14px; top: 16px; width: 140px; height: 104px; border-radius: 8px; padding: 9px; background: #11131a; box-shadow: inset 0 0 0 2px #3a3f4c; }
    .lcd { position: relative; width: 122px; height: 86px; border-radius: 3px; overflow: hidden;
      background: linear-gradient(#f0b35e 0 28%, #ef7b5c 28% 46%, #9d5aa6 46% 72%, #6b8f4e 72%); box-shadow: inset 0 2px 4px rgba(0,0,0,.4); }
    .lcd::after { content: ''; position: absolute; inset: 0; background: rgba(214,222,196,.55); }
    .lcd svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }
    .seg { fill: #15160f; opacity: .08; }
    .seg.on { opacity: .92; }
    .num { font: 700 11px/1 'JetBrains Mono', ui-monospace, monospace; fill: #15160f; }
    .row { position: absolute; left: 18px; right: 18px; top: 132px; display: flex; justify-content: space-between; }
    .pill { display: grid; justify-items: center; gap: 3px; }
    .pill button { width: 30px; height: 10px; border: 0; padding: 0; border-radius: 5px; cursor: pointer; background: linear-gradient(#7c8496, #4c5262);
      box-shadow: 0 2px 0 #14161c, inset 0 1px 0 rgba(255,255,255,.3); transition: transform .05s, box-shadow .05s; }
    .pill button:active { transform: translateY(2px); box-shadow: 0 0 0 #14161c; }
    .pill span { font: 800 6px/1 'DM Sans', system-ui, sans-serif; color: #c9cfdc; letter-spacing: .1em; }
    .jump { position: absolute; right: 26px; bottom: 26px; width: 46px; height: 46px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 38% 30%, #ff8b80, #e3262d 50%, #9b1015); box-shadow: 0 5px 0 #5c070a, 0 0 0 5px #2a2d35, 0 6px 8px rgba(0,0,0,.4);
      transition: transform .05s, box-shadow .05s; }
    .jump:active { transform: translateY(4px); box-shadow: 0 1px 0 #5c070a, 0 0 0 5px #2a2d35; }
    .spk { position: absolute; left: 24px; bottom: 30px; width: 44px; height: 30px; background: radial-gradient(circle, #0a0b0e 1.5px, transparent 2px) 0 0 / 7px 7px; }
    button:focus-visible { outline: 2px solid #ffd23a; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="dev">
      <div class="bez"><div class="lcd"><svg viewBox="0 0 122 86" aria-hidden="true">
        <text class="num" x="116" y="12" text-anchor="end">0</text>
        <g class="seg run0"><circle cx="16" cy="48" r="4"/><rect x="12" y="53" width="8" height="10"/><rect x="11" y="63" width="3" height="5"/><rect x="18" y="63" width="3" height="5"/></g>
        <g class="seg run1"><circle cx="16" cy="24" r="4"/><rect x="12" y="29" width="8" height="10"/><rect x="9" y="38" width="5" height="3"/><rect x="18" y="38" width="5" height="3"/></g>
        ${CRATES}
        <rect class="seg on" x="0" y="69" width="122" height="2" style="opacity:.5"/>
        <text class="seg over" x="61" y="40" text-anchor="middle" style="font:800 10px 'Unbounded',sans-serif">GAME OVER</text>
      </svg></div></div>
      <div class="row">
        <div class="pill"><button type="button" class="start" aria-label="START"></button><span>START</span></div>
        <div class="pill"><button type="button" class="snd" aria-pressed="true" aria-label="SOUND"></button><span>SOUND</span></div>
        <div class="pill"><button type="button" class="off" aria-label="ON/OFF"></button><span>ON/OFF</span></div>
      </div>
      <span class="spk"></span>
      <button class="jump" type="button" aria-label="jump"></button>
    </div></div>`,
  init(root) {
    const q = (s) => root.querySelector(s), crates = [...root.querySelectorAll('.crate')], num = q('.num');
    let iv = 0, tick = 0, c = -1, air = 0, score = 0;
    const draw = (over) => {
      q('.run0').classList.toggle('on', !air && !over); q('.run1').classList.toggle('on', !!air && !over);
      crates.forEach((el, i) => el.classList.toggle('on', i === c)); q('.over').classList.toggle('on', !!over); num.textContent = score;
    };
    const stop = (over) => { clearInterval(iv); iv = 0; draw(over); };
    const step = () => {
      tick++; if (air) air--;
      c = c < 0 ? (Math.random() < 0.5 ? 4 : -1) : c - 1;
      if (c === 0 && !air) return stop(true);
      if (c === 0) score++;
      if (tick > 400) return stop(true);
      draw();
    };
    q('.start').addEventListener('click', () => { clearInterval(iv); tick = 0; c = -1; air = 0; score = 0; draw(); iv = setInterval(step, 380); });
    q('.off').addEventListener('click', () => { stop(false); c = -1; score = 0; air = 0; draw(); root.querySelectorAll('.run0, .run1').forEach((s) => s.classList.remove('on')); num.textContent = ''; });
    q('.snd').addEventListener('click', (e) => e.currentTarget.setAttribute('aria-pressed', String(e.currentTarget.getAttribute('aria-pressed') !== 'true')));
    q('.jump').addEventListener('click', () => { if (iv && !air) { air = 2; draw(); } });
    draw();
    return () => clearInterval(iv);
  },
};
