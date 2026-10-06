export default {
  id: 'cr-neumorphic-button',
  credit: 'Neumorphism / Soft UI — Alexander Plyuto; shadows generated with neumorphism.io (#e0e0e0, flat → convex → pressed)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #e0e0e0; padding: 30px 40px; border-radius: 12px; }
    .btn {
      display: grid; place-items: center; width: 76px; height: 76px; border: 0; border-radius: 50%; cursor: pointer; padding: 0;
      background: #e0e0e0; color: #9a9a9a;
      box-shadow: 8px 8px 16px #bebebe, -8px -8px 16px #ffffff;
      transition: box-shadow .25s ease, background .25s ease, color .25s ease;
    }
    .btn svg { width: 28px; height: 28px; transition: filter .25s ease, transform .2s ease; }
    .btn:hover { background: linear-gradient(145deg, #f0f0f0, #cacaca); }
    .btn:active { box-shadow: inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff; background: #e0e0e0; }
    .btn:active svg { transform: scale(.94); }
    .btn[aria-pressed="true"] { box-shadow: inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff; background: #e0e0e0; color: #22c55e; }
    .btn[aria-pressed="true"] svg { filter: drop-shadow(0 0 6px rgba(34, 197, 94, .55)); }
    .btn:focus-visible { outline: 2px solid #22c55e; outline-offset: 6px; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false" aria-label="Power"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg></button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
