// Send button micro-interaction: the paper plane (Lucide "send") crouches back, then launches along an arc and
// leaves through the button's top-right edge (clipped by the button, so it never overlaps the page), "Send" slides
// away, "Sent" + a drawn check land on a spring; after a beat the plane glides back in from the left.
const SPRING = 'linear(0, 0.04, 0.126, 0.249, 0.374, 0.509, 0.625, 0.737, 0.824, 0.9, 0.954, 0.998, 1.027, 1.044, 1.053, 1.056, 1.054, 1.05, 1.043, 1.036, 1.028, 1.021, 1.015, 1.01, 1.006, 1.003, 1, 0.999, 0.998, 0.997, 0.997, 0.997, 0.997, 0.998, 0.998, 0.998, 0.999, 0.999, 0.999, 1, 1)';

export default {
  id: 'mo-send-plane',
  credit: 'Send button micro-interaction (Dribbble classic) — the paper plane crouches, launches along an arc out of the button, "Sent" lands with a drawn check, then the plane glides back in',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { padding: 4px; }
    .btn {
      position: relative; display: block; width: 116px; height: 44px; padding: 0; border: 0; border-radius: 999px; overflow: hidden; isolation: isolate;
      background: #2563eb; color: #fff; font: 600 14.5px Inter, system-ui, sans-serif; cursor: pointer;
      box-shadow: 0 1px 2px rgba(37, 99, 235, .3), 0 6px 16px -6px rgba(37, 99, 235, .55); transition: background .3s, transform .25s ${SPRING}, box-shadow .3s;
    }
    .btn:hover { background: #1d4ed8; } .btn:active { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; }
    .btn.sent { background: #16a34a; box-shadow: 0 1px 2px rgba(22, 163, 74, .3), 0 6px 16px -6px rgba(22, 163, 74, .55); }
    .row { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 9px; }
    .plane { width: 18px; height: 18px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .btn:hover .plane { transform: translate(1px, -1px) rotate(-6deg); transition: transform .3s ${SPRING}; }
    .btn.fly .plane { animation: fly .9s cubic-bezier(.5, 0, .75, .3) forwards; }
    .btn.back .plane { animation: back .6s ${SPRING} both; }
    @keyframes fly {
      0% { transform: none; }
      25% { transform: translate(-5px, 3px) rotate(-10deg) scale(.92); animation-timing-function: cubic-bezier(.3, 0, .6, 1); }
      100% { transform: translate(110px, -48px) rotate(18deg) scale(.7); }
    }
    @keyframes back { from { transform: translate(-70px, 14px) rotate(-8deg); opacity: 0; } 30% { opacity: 1; } to { transform: none; opacity: 1; } }
    .a, .b { display: inline-block; transition: transform .45s ${SPRING}, opacity .25s, filter .25s; }
    .a { min-width: 34px; }
    .btn.fly .a, .btn.sent .a { transform: translateX(26px); opacity: 0; filter: blur(3px); }
    .b { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 7px; opacity: 0; transform: translateX(-18px); filter: blur(3px); }
    .btn.sent .b { opacity: 1; transform: none; filter: none; }
    .b svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .b path { stroke-dasharray: 22; stroke-dashoffset: 22; transition: stroke-dashoffset .3s .12s ease-out; }
    .btn.sent .b path { stroke-dashoffset: 0; }
    .btn.sent .plane { opacity: 0; }
  `,
  html: `
    <div class="wrap">
      <button class="btn" type="button" aria-live="polite">
        <span class="row"><svg class="plane" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg><span class="a">Send</span></span>
        <span class="b"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>Sent</span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    let timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    b.addEventListener('click', () => {
      if (b.classList.contains('fly') || b.classList.contains('sent') || b.classList.contains('back')) return;
      b.classList.add('fly');
      later(() => { b.classList.remove('fly'); b.classList.add('sent'); }, 760);
      later(() => { b.classList.remove('sent'); b.classList.add('back'); }, 2400);
      later(() => b.classList.remove('back'), 3050);
    });
    return () => timers.forEach(clearTimeout);
  },
};
