export default {
  id: 'lb-uiverse-push',
  credit: 'Josh W. Comeau’s 3D "pushable" button (shadow / edge / front layers) as cloned all over Uiverse.io — hover lifts 6px on a springy cubic-bezier(.3,.7,.4,1.5), press slams to 2px in 34ms, release eases back over 600ms',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 36px 30px; border-radius: 12px; background: #fff; display: inline-block; }
    .pushable { position: relative; border: none; background: transparent; padding: 0; cursor: pointer; outline-offset: 4px; transition: filter 250ms; -webkit-tap-highlight-color: transparent; }
    .pushable:hover { filter: brightness(110%); }
    .pushable:focus:not(:focus-visible) { outline: none; }
    .pushable:focus-visible { outline: 2px solid hsl(345deg 100% 47%); }
    .shadow { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px; background: hsl(0deg 0% 0% / .25); will-change: transform; transform: translateY(2px); transition: transform 600ms cubic-bezier(.3,.7,.4,1); }
    .edge { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px; background: linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%); }
    .front { display: block; position: relative; padding: 12px 42px; border-radius: 12px; font: 400 1.25rem/1.2 system-ui, -apple-system, "Segoe UI", sans-serif; color: white; background: hsl(345deg 100% 47%); will-change: transform; transform: translateY(-4px); transition: transform 600ms cubic-bezier(.3,.7,.4,1); white-space: nowrap; }
    .pushable:hover .front { transform: translateY(-6px); transition: transform 250ms cubic-bezier(.3,.7,.4,1.5); }
    .pushable:active .front { transform: translateY(-2px); transition: transform 34ms; }
    .pushable:hover .shadow { transform: translateY(4px); transition: transform 250ms cubic-bezier(.3,.7,.4,1.5); }
    .pushable:active .shadow { transform: translateY(1px); transition: transform 34ms; }
  `,
  html: `
    <div class="stage">
      <button class="pushable" type="button"><span class="shadow"></span><span class="edge"></span><span class="front">Push me</span></button>
    </div>`,
};
