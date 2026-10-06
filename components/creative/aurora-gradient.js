export default {
  id: 'cr-aurora-gradient',
  credit: 'Animated aurora gradient button — background-position shift, CodePen classic',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; display: inline-block; padding: 10px; }
    .btn, .wrap::before {
      background: linear-gradient(120deg, #ff6ec4, #7873f5, #4ade80, #f9c846, #ff6ec4);
      background-size: 400% 400%;
      animation: flow 5s ease infinite; animation-play-state: paused;
    }
    .wrap::before {
      content: ''; position: absolute; inset: 14px 10px 6px; border-radius: 999px;
      filter: blur(16px); opacity: .55; transition: opacity .3s;
    }
    .wrap:hover::before, .wrap:focus-within::before { opacity: .95; }
    .wrap:hover .btn, .wrap:hover::before, .wrap:focus-within .btn, .wrap:focus-within::before { animation-play-state: running; }
    .btn {
      position: relative; cursor: pointer;
      font: 700 15px/1 system-ui, sans-serif; color: #fff; letter-spacing: .04em;
      padding: 18px 40px; border: 0; border-radius: 999px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, .25);
      transition: transform .2s;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: -5px; }
    @keyframes flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  `,
  html: `<span class="wrap"><button class="btn" type="button">Aurora</button></span>`,
};
