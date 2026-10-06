const ANSWERS = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it', 'As I see it, yes',
  'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now',
  'Cannot predict now', 'Concentrate and ask again', "Don't count on it", 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];

export default {
  id: 'ty2-magic-8-ball',
  credit: 'Mattel Magic 8 Ball (1950) — hold to shake it, let go and the blue icosahedron floats up with an answer',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 16px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 50% 40%, #3a2c6b, #120d24 75%); }
    .ball { position: relative; display: block; width: 156px; height: 156px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 34% 26%, #9a9aa6 0, #3a3a44 9%, #111116 32%, #000 70%);
      box-shadow: 0 10px 18px rgba(0,0,0,.6), inset -8px -12px 22px rgba(0,0,0,.8), inset 6px 6px 14px rgba(255,255,255,.08);
      -webkit-tap-highlight-color: transparent; touch-action: none; }
    .ball::after { content: ''; position: absolute; left: 30px; top: 18px; width: 46px; height: 24px; border-radius: 50%;
      background: radial-gradient(ellipse, rgba(255,255,255,.55), transparent 70%); transform: rotate(-24deg); pointer-events: none; }
    .ball.shake { animation: shake .14s linear infinite; }
    @keyframes shake { 0% { transform: translate(0,0) rotate(0); } 25% { transform: translate(-4px,2px) rotate(-5deg); } 50% { transform: translate(3px,-3px) rotate(4deg); } 75% { transform: translate(-2px,-2px) rotate(-3deg); } }
    .ball:focus-visible { outline: 3px solid #8fa8ff; outline-offset: 4px; }
    .eight, .win { position: absolute; left: 50%; top: 50%; border-radius: 50%; transition: opacity .35s, transform .45s cubic-bezier(.3,1.4,.5,1); }
    .eight { width: 66px; height: 66px; margin: -33px; background: radial-gradient(circle at 40% 35%, #fff, #e6e6e6 70%);
      font: 800 44px/66px 'Unbounded', system-ui, sans-serif; color: #000; text-align: center; box-shadow: inset 0 -3px 5px rgba(0,0,0,.2); }
    .win { width: 82px; height: 82px; margin: -41px; opacity: 0; transform: scale(.7);
      background: radial-gradient(circle at 50% 45%, #10164a, #04061a 72%); box-shadow: inset 0 0 0 5px #1a1a20, inset 0 4px 10px #000; }
    .ball.open .eight { opacity: 0; transform: scale(.6) translateY(-20px); }
    .ball.open .win { opacity: 1; transform: none; }
    .tri { position: absolute; left: 7px; top: 11px; width: 68px; height: 58px; clip-path: polygon(50% 0, 100% 100%, 0 100%);
      background: linear-gradient(#2f4fd6, #1b2fa0); opacity: 0; transform: scale(.5) rotate(30deg); filter: blur(3px);
      transition: opacity .9s ease .1s, transform 1.1s cubic-bezier(.2,.8,.2,1) .1s, filter .9s ease .1s;
      display: flex; align-items: flex-end; justify-content: center; padding: 0 8px 6px; }
    .ball.open.show .tri { opacity: 1; transform: none; filter: none; }
    .ans { font: 700 5.4px/1.15 'DM Sans', system-ui, sans-serif; color: #e8ecff; text-transform: uppercase; text-align: center; letter-spacing: .01em; height: 30px; display: flex; align-items: flex-end; }
  `,
  html: `
    <div class="stage">
      <button class="ball" type="button" aria-label="magic 8 ball">
        <span class="eight">8</span>
        <span class="win"><span class="tri"><span class="ans" aria-live="polite"></span></span></span>
      </button>
    </div>`,
  init(root) {
    const ball = root.querySelector('.ball'), ans = root.querySelector('.ans');
    let held = false, t = 0;
    const press = () => { held = true; clearTimeout(t); ball.classList.remove('show', 'open'); ball.classList.add('shake'); };
    const reveal = () => {
      if (!held) return; held = false;
      ball.classList.remove('shake');
      ans.textContent = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
      ball.classList.add('open'); t = setTimeout(() => ball.classList.add('show'), 260);
    };
    ball.addEventListener('pointerdown', (e) => { ball.setPointerCapture(e.pointerId); press(); });
    ball.addEventListener('pointerup', reveal); ball.addEventListener('pointercancel', reveal); ball.addEventListener('lostpointercapture', reveal);
    ball.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(); } });
    ball.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') reveal(); });
    ball.addEventListener('blur', reveal);
    return () => clearTimeout(t);
  },
};
