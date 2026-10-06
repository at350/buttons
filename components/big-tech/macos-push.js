// macOS (Big Sur → Sequoia) alert push buttons, light appearance: white "Cancel" and the accent-blue default "OK".
// Clicking the dialog background toggles the window's key state: in an inactive window the default button loses its
// accent and renders like a plain button, exactly as AppKit does.
export default {
  id: 'bt-macos-push',
  credit: 'Apple macOS — NSButton push buttons (accent default + plain), with key / inactive window states',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 8px; padding: 20px; background: #ececec; border-radius: 12px; box-shadow: inset 0 0 0 .5px rgba(0,0,0,.18); cursor: default; }
    .pb {
      min-width: 72px; height: 21px; padding: 0 12px 1px; border-radius: 5.5px; border: 0;
      font: 400 13px/20px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; letter-spacing: -.08px; cursor: default; outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    .plain { background: #fff; color: rgba(0,0,0,.85); box-shadow: 0 0 0 .5px rgba(0,0,0,.12), 0 .5px 1.5px rgba(0,0,0,.2); }
    .plain:active { background: #e3e3e3; }
    .default {
      color: #fff; background: linear-gradient(#3b95ff, #0a72f5);
      box-shadow: 0 0 0 .5px rgba(0,79,197,.6), 0 .5px 1.5px rgba(0,0,0,.25), inset 0 .5px 0 rgba(255,255,255,.25);
    }
    .default:active { background: linear-gradient(#1f7ff0, #0560d8); }
    .stage.inactive .default { color: rgba(0,0,0,.85); background: #fff; box-shadow: 0 0 0 .5px rgba(0,0,0,.12), 0 .5px 1.5px rgba(0,0,0,.2); }
    .stage.inactive .pb { color: rgba(0,0,0,.5); }
    .pb:focus-visible { box-shadow: 0 0 0 .5px rgba(0,0,0,.12), 0 0 0 3.5px rgba(0,122,255,.5); }
  `,
  html: `
    <div class="stage">
      <button class="pb plain" type="button">Cancel</button>
      <button class="pb default" type="button">OK</button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage');
    stage.addEventListener('click', (e) => { if (e.target === stage) stage.classList.toggle('inactive'); else stage.classList.remove('inactive'); });
  },
};
