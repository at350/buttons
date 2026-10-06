export default {
  id: 'bt-material-checkbox',
  credit: 'Google Material 3 — checkbox (18dp box, 2dp corners) with drawn-in check and 40dp state layer',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cb {
      position: relative; width: 40px; height: 40px; border: 0; border-radius: 50%;
      background: transparent; cursor: pointer; padding: 0; display: inline-flex;
      align-items: center; justify-content: center; -webkit-tap-highlight-color: transparent;
    }
    .cb::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #1d1b20; opacity: 0; transition: opacity .15s; }
    .cb:hover::before { opacity: .08; }
    .cb:active::before { opacity: .12; }
    .cb[aria-checked="true"]::before { background: #6750a4; }
    .cb { outline: none; }
    .cb:focus-visible::after { content: ''; position: absolute; inset: 9px; border-radius: 4px; box-shadow: 0 0 0 2px #fef7ff, 0 0 0 5px #625b71; }
    .cb:focus-visible::before { opacity: .1; }
    .box {
      position: relative; width: 18px; height: 18px; border-radius: 2px;
      border: 2px solid #49454f; background: transparent; transition: background-color 150ms cubic-bezier(.2,0,0,1), border-color 150ms cubic-bezier(.2,0,0,1);
    }
    .cb[aria-checked="true"] .box { background: #6750a4; border-color: #6750a4; }
    .box svg { position: absolute; inset: -2px; width: 18px; height: 18px; }
    .box path {
      fill: none; stroke: #fff; stroke-width: 2.6; stroke-linecap: square;
      stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset 150ms cubic-bezier(.05,.7,.1,1) 50ms;
    }
    .cb[aria-checked="true"] path { stroke-dashoffset: 0; }
  `,
  html: `
    <button class="cb" type="button" role="checkbox" aria-checked="false" aria-label="Remember me">
      <span class="box"><svg viewBox="0 0 18 18"><path d="M3.3 9.4l3.6 3.6 8-8"/></svg></span>
    </button>`,
  init(root) {
    const b = root.querySelector('.cb');
    b.addEventListener('click', () => b.setAttribute('aria-checked', String(b.getAttribute('aria-checked') !== 'true')));
  },
};
