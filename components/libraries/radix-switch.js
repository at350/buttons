export default {
  id: 'lb-radix-switch',
  credit: 'Radix Themes — Switch size 2 (35×20, 18px thumb) in the surface, classic and soft variants: the indigo fill is a 40%/60% gradient that slides under the thumb (background-position 120–160ms) exactly like rt-SwitchRoot',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 20px; }
    .sw { --w: 35px; --h: 20px; position: relative; display: inline-flex; align-items: center; flex: none; height: var(--h); padding: 0; border: 0; background: none; cursor: default; border-radius: 9999px; -webkit-tap-highlight-color: transparent; }
    .sw::before { content: ''; display: block; width: var(--w); height: var(--h); border-radius: 9999px; background-repeat: no-repeat; background-size: calc(var(--w) * 2 + var(--h)) 100%;
      transition: background-position, background-color, box-shadow, filter; transition-timing-function: linear, ease-in-out, ease-in-out, ease-in-out; }
    .sw[aria-checked="false"]::before { transition-duration: 120ms, 140ms, 140ms, 140ms; background-position-x: 100%; }
    .sw[aria-checked="true"]::before { transition-duration: 160ms, 140ms, 140ms, 140ms; background-position: 0%; }
    .sw:active::before { transition-duration: 30ms; }
    .sw:focus-visible { outline: 0; }
    .sw:focus-visible::before { outline: 2px solid #8da4ef; outline-offset: 2px; }
    .th { position: absolute; left: 1px; width: 18px; height: 18px; border-radius: 9999px; background: #fff; transition: transform 140ms cubic-bezier(.45,.05,.55,.95), box-shadow 140ms ease-in-out; pointer-events: none; }
    .sw[aria-checked="true"] .th { transform: translateX(15px); }
    .surface::before { background-color: #0000330f; background-image: linear-gradient(to right, #3e63dd 40%, transparent 60%); box-shadow: inset 0 0 0 1px #0009321f; }
    .surface:active::before { background-color: #00002d17; }
    .surface[aria-checked="true"]:active::before { filter: brightness(.92) saturate(1.1); }
    .surface .th { box-shadow: 0 0 1px 1px rgba(0,0,0,.1), 0 1px 1px rgba(0,0,0,.05), 0 2px 4px -1px rgba(0,0,0,.05); }
    .surface[aria-checked="true"] .th, .classic[aria-checked="true"] .th { box-shadow: 0 1px 3px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.05), 0 0 0 1px rgba(0,0,0,.05), 0 0 0 1px #0044ff1e, -1px 0 1px rgba(0,0,0,.1); }
    .classic::before { background-color: #00002d17; background-image: linear-gradient(to right, #3e63dd 40%, transparent 60%); box-shadow: inset 0 0 0 1px #0009321f, inset 0 1.5px 2px 0 #00005506, inset 0 1.5px 2px 0 rgba(0,0,0,.1); }
    .classic[aria-checked="false"]:active::before { background-color: #0009321f; }
    .classic[aria-checked="true"]::before { box-shadow: inset 0 0 0 1px #0000330f, inset 0 0 0 1px #0044ff1e, inset 0 0 0 1px rgba(0,0,0,.05), inset 0 1.5px 2px 0 rgba(0,0,0,.1); }
    .classic[aria-checked="true"]:active::before { filter: brightness(.92) saturate(1.1); }
    .classic .th { box-shadow: 0 1px 3px rgba(0,0,0,.15), 0 2px 4px -1px rgba(0,0,0,.05), 0 0 0 1px rgba(0,0,0,.1); }
    .soft::before { background-image: linear-gradient(to right, #0044ff1e 40%, transparent 60%), linear-gradient(to right, #0044ff1e 40%, transparent 60%), linear-gradient(to right, #0044ff1e 40%, rgba(255,255,255,.05) 60%), linear-gradient(to right, #00005506 40%, #0000330f 60%); }
    .soft[aria-checked="false"]::before { background-color: #0000330f; }
    .soft:active::before { background-color: #00002d17; }
    .soft .th { filter: saturate(.45); box-shadow: 0 0 0 1px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.05), 0 2px 4px -1px rgba(0,0,0,.05); }
    .soft[aria-checked="true"] .th { box-shadow: 0 0 0 1px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.1), 0 1px 3px #0047f112, 0 2px 4px -1px #0047f112; }
  `,
  html: `
    <div class="row">
      <button class="sw surface" type="button" role="switch" aria-checked="true" aria-label="Surface"><span class="th"></span></button>
      <button class="sw classic" type="button" role="switch" aria-checked="false" aria-label="Classic"><span class="th"></span></button>
      <button class="sw soft" type="button" role="switch" aria-checked="true" aria-label="Soft"><span class="th"></span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.sw').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true')));
  },
};
