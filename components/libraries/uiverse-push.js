export default {
  id: 'lb-uiverse-push',
  credit: 'Josh W. Comeau’s 3D pushable button (shadow / edge / front layers) as cloned all over Uiverse.io — hover lifts it, press slams it flat',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 36px 30px; border-radius: 12px; background: #fff; display: inline-block; }
    .pu { position: relative; border: 0; background: transparent; padding: 0; cursor: pointer; outline-offset: 4px; border-radius: 12px; transition: filter 250ms; -webkit-tap-highlight-color: transparent; }
    .pu:hover { filter: brightness(110%); }
    .pu:focus-visible { outline: 2px solid hsl(340deg 100% 47%); }
    .shadow { position: absolute; inset: 0; border-radius: 12px; background: hsl(0deg 0% 0% / .25); transform: translateY(2px); transition: transform 600ms cubic-bezier(.3,.7,.4,1); will-change: transform; filter: blur(4px); }
    .edge { position: absolute; inset: 0; border-radius: 12px; background: linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%); }
    .front { position: relative; display: block; padding: 12px 42px; border-radius: 12px; font: 600 18px/1.2 Inter, -apple-system, system-ui, sans-serif; color: #fff; text-shadow: 0 1px 1px rgba(0,0,0,.3); background: hsl(345deg 100% 47%); transform: translateY(-4px); transition: transform 600ms cubic-bezier(.3,.7,.4,1), background .2s; will-change: transform; white-space: nowrap; }
    .pu:hover .front { transform: translateY(-6px); transition: transform 250ms cubic-bezier(.3,.7,.4,1.5); }
    .pu:hover .shadow { transform: translateY(4px); transition: transform 250ms cubic-bezier(.3,.7,.4,1.5); }
    .pu:active .front { transform: translateY(-2px); transition: transform 34ms; }
    .pu:active .shadow { transform: translateY(1px); transition: transform 34ms; }
    .pu[aria-pressed="true"] .front { background: hsl(200deg 90% 45%); }
    .pu[aria-pressed="true"] .edge { background: linear-gradient(to left, hsl(200deg 90% 16%) 0%, hsl(200deg 90% 30%) 8%, hsl(200deg 90% 30%) 92%, hsl(200deg 90% 16%) 100%); }
    .pu[aria-pressed="true"]:focus-visible { outline-color: hsl(200deg 90% 45%); }
  `,
  html: `
    <div class="stage">
      <button class="pu" type="button" aria-pressed="false"><span class="shadow"></span><span class="edge"></span><span class="front">Push me</span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.pu'), f = b.querySelector('.front');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); f.textContent = on ? 'Pushed' : 'Push me'; });
  },
};
