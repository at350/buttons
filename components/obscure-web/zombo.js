export default {
  id: 'ob-zombo',
  credit: 'Zombo.com (1999) — the pulsing concentric rainbow rings; hover to make them breathe, click to let them loop forever (anything is possible)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 240px; max-width: 100%; height: 170px; border-radius: 12px; background: #000; display: grid; place-items: center; overflow: hidden; }
    .z { position: relative; width: 130px; height: 130px; border-radius: 50%; border: 0; padding: 0; background: none; cursor: pointer; display: grid; place-items: center; }
    .z:focus-visible { outline: 2px dotted #fff; outline-offset: 4px; }
    .ring { position: absolute; border-radius: 50%; opacity: .9; transition: transform .4s; }
    .r1 { inset: 0; background: #ff2a2a; }
    .r2 { inset: 12px; background: #ff9f1a; }
    .r3 { inset: 24px; background: #ffe91a; }
    .r4 { inset: 36px; background: #30d64c; }
    .r5 { inset: 48px; background: #2a7bff; }
    .r6 { inset: 58px; background: #b13cff; }
    .z:hover .ring, .z.on .ring { animation: pulse 1.6s ease-in-out infinite; }
    .z:hover .r2, .z.on .r2 { animation-delay: -.25s; }
    .z:hover .r3, .z.on .r3 { animation-delay: -.5s; }
    .z:hover .r4, .z.on .r4 { animation-delay: -.75s; }
    .z:hover .r5, .z.on .r5 { animation-delay: -1s; }
    .z:hover .r6, .z.on .r6 { animation-delay: -1.25s; }
    @keyframes pulse { 0%, 100% { transform: scale(1); filter: hue-rotate(0deg); } 50% { transform: scale(.82); filter: hue-rotate(60deg); } }
    .z.on .ring { animation-duration: .9s; }
    .lbl { position: absolute; left: 0; right: 0; bottom: 10px; text-align: center; font: 700 11px/1 Arial, Helvetica, sans-serif; letter-spacing: 2px; color: #fff; text-transform: uppercase; }
    .z.on ~ .lbl { animation: shimmer 1s linear infinite; }
    @keyframes shimmer { 0% { color: #ff2a2a; } 33% { color: #ffe91a; } 66% { color: #2a7bff; } 100% { color: #ff2a2a; } }
    .core { position: relative; width: 14px; height: 14px; border-radius: 50%; background: #fff; z-index: 1; }
  `,
  html: `
    <div class="stage">
      <button class="z" type="button" aria-pressed="false" aria-label="Zombo">
        <span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span><span class="ring r4"></span><span class="ring r5"></span><span class="ring r6"></span>
        <span class="core"></span>
      </button>
      <span class="lbl" aria-hidden="true">zombo.com</span>
    </div>`,
  init(root) {
    const z = root.querySelector('.z'), lbl = root.querySelector('.lbl');
    const says = ['welcome to zombocom', 'anything is possible', 'the only limit is yourself', 'the infinite is possible', 'zombo.com'];
    let on = false, i = 0;
    z.addEventListener('click', () => { on = !on; z.classList.toggle('on', on); z.setAttribute('aria-pressed', String(on)); i = on ? (i + 1) % (says.length - 1) : says.length - 1; lbl.textContent = says[i]; });
  },
};
