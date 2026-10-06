export default {
  id: 'mo-send-plane',
  credit: 'Send button — the paper plane takes off along an arc, the label slides out, "Sent" lands, then everything resets (Dribbble micro-interaction)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { padding: 28px 40px 10px 10px; }
    .btn {
      position: relative; display: inline-flex; align-items: center; gap: 10px; height: 44px; padding: 0 20px 0 16px; border: 0; border-radius: 999px;
      background: #2563eb; color: #fff; font: 600 14px Inter, system-ui, sans-serif; cursor: pointer; overflow: visible;
      transition: background .3s, transform .2s cubic-bezier(.34, 1.56, .64, 1), box-shadow .3s; box-shadow: 0 6px 18px -6px rgba(37, 99, 235, .6);
    }
    .btn:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 10px 22px -6px rgba(37, 99, 235, .6); }
    .btn:active { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #1d4ed8; outline-offset: 3px; }
    .btn.sent { background: #16a34a; box-shadow: 0 6px 18px -6px rgba(22, 163, 74, .6); }
    .plane { width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transform-origin: center; }
    .btn.fly .plane { animation: fly 1.1s cubic-bezier(.3, .6, .4, 1) forwards; }
    .btn.sent .plane { opacity: 0; }
    .btn.reset .plane { animation: land .5s cubic-bezier(.34, 1.56, .64, 1) forwards; }
    @keyframes fly {
      0% { transform: translate(0, 0) rotate(0) scale(1); }
      20% { transform: translate(-6px, 4px) rotate(-12deg) scale(1.05); }
      100% { transform: translate(140px, -60px) rotate(20deg) scale(.4); opacity: 0; }
    }
    @keyframes land { from { transform: translate(-30px, 20px) scale(.5); opacity: 0; } to { transform: none; opacity: 1; } }
    .lbl { display: inline-grid; height: 18px; width: 38px; overflow: hidden; text-align: left; }
    .lbl span { grid-area: 1 / 1; line-height: 18px; transition: transform .45s cubic-bezier(.34, 1.3, .64, 1), opacity .3s; }
    .lbl .b { transform: translateY(120%); opacity: 0; }
    .btn.sent .lbl .a { transform: translateY(-120%); opacity: 0; }
    .btn.sent .lbl .b { transform: none; opacity: 1; }
    .trail { position: absolute; left: 22px; top: 50%; width: 6px; height: 6px; border-radius: 50%; background: #fff; opacity: 0; pointer-events: none; }
    .btn.fly .trail { animation: trail 1s ease-out forwards; }
    .btn.fly .trail:nth-child(2) { animation-delay: .08s; } .btn.fly .trail:nth-child(3) { animation-delay: .16s; }
    @keyframes trail { 0% { opacity: 0; transform: translate(0, -50%) scale(1); } 20% { opacity: .8; } 100% { opacity: 0; transform: translate(90px, -50px) scale(0); } }
  `,
  html: `
    <div class="wrap">
      <button class="btn" type="button">
        <i class="trail"></i><i class="trail"></i><i class="trail"></i>
        <svg class="plane" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        <span class="lbl"><span class="a">Send</span><span class="b">Sent</span></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    let timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    b.addEventListener('click', () => {
      if (b.classList.contains('fly') || b.classList.contains('sent')) return;
      b.classList.add('fly');
      later(() => { b.classList.remove('fly'); b.classList.add('sent'); }, 1000);
      later(() => { b.classList.remove('sent'); b.classList.add('reset'); }, 2600);
      later(() => b.classList.remove('reset'), 3200);
    });
    return () => timers.forEach(clearTimeout);
  },
};
