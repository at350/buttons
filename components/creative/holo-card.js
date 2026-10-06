export default {
  id: 'cr-holo-card',
  credit: 'Holographic foil card — Simey’s Pokémon card CSS effect, cursor-tracked tilt + shine',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #14121f; padding: 28px 36px; border-radius: 12px; perspective: 700px; }
    .card {
      --mx: 50%; --my: 50%; --rx: 0deg; --ry: 0deg;
      position: relative; width: 220px; height: 130px; max-width: 100%; overflow: hidden; cursor: pointer;
      border: 0; border-radius: 16px; padding: 0;
      background: linear-gradient(135deg, #1b1b2f, #2a2a4a);
      color: #fff; font: 800 18px/1 system-ui, sans-serif; letter-spacing: .25em; text-transform: uppercase;
      transform: rotateX(var(--rx)) rotateY(var(--ry));
      transition: transform .12s ease-out, box-shadow .3s;
      box-shadow: 0 18px 40px rgba(0, 0, 0, .45);
    }
    .card::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(115deg, transparent 0%, #ff00e0 25%, #00f0ff 45%, #ffe500 60%, #00ff85 75%, transparent 100%);
      background-size: 250% 250%; background-position: var(--mx) var(--my);
      mix-blend-mode: color-dodge; opacity: 0; transition: opacity .35s;
    }
    .card::after {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(circle at var(--mx) var(--my), rgba(255, 255, 255, .5), transparent 45%);
      opacity: 0; transition: opacity .35s;
    }
    .card:hover::before { opacity: .7; }
    .card:hover::after { opacity: 1; }
    .card[aria-pressed="true"] { box-shadow: 0 18px 40px rgba(0, 0, 0, .45), 0 0 0 2px #ffe500; }
    .lbl { position: relative; z-index: 1; text-shadow: 0 2px 8px rgba(0, 0, 0, .6); }
    .card:focus-visible { outline: 2px solid #00f0ff; outline-offset: 3px; }
  `,
  html: `<div class="stage"><button class="card" type="button" aria-pressed="false"><span class="lbl">Holo</span></button></div>`,
  init(root) {
    const c = root.querySelector('.card');
    let t = 0;
    c.addEventListener('mousemove', (e) => {
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      c.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      c.style.setProperty('--ry', ((px - .5) * 24).toFixed(1) + 'deg');
      c.style.setProperty('--rx', ((.5 - py) * 24).toFixed(1) + 'deg');
    });
    c.addEventListener('mouseleave', () => {
      c.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1), box-shadow .3s';
      c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg');
      c.style.setProperty('--mx', '50%'); c.style.setProperty('--my', '50%');
      clearTimeout(t); t = setTimeout(() => { c.style.transition = ''; }, 600);
    });
    c.addEventListener('click', () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
