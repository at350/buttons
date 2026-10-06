export default {
  id: 'ph-breaker',
  credit: 'Panel circuit breaker (Square D QO style) — big handle, hard snap, red window when ON',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px 26px; border-radius: 12px; background: linear-gradient(#9aa0a6, #71777d); }
    .body {
      position: relative; width: 60px; height: 128px; border-radius: 4px;
      background: linear-gradient(90deg, #2c2f33, #3d4045 20%, #3d4045 80%, #26292d); 
      box-shadow: 0 2px 4px rgba(0,0,0,.6), 0 8px 16px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.1);
    }
    .lbl { position: absolute; left: 0; right: 0; text-align: center; font: 800 9px/1 system-ui, sans-serif; letter-spacing: 1px; color: rgba(255,255,255,.55); }
    .lbl.on { top: 10px; } .lbl.off { bottom: 10px; }
    .well {
      position: absolute; left: 50%; top: 50%; width: 30px; height: 84px; margin: -42px 0 0 -15px; border: 0; padding: 0; border-radius: 3px; cursor: pointer;
      background: #0b0c0d; box-shadow: inset 0 2px 5px rgba(0,0,0,1), inset 0 -1px 0 rgba(255,255,255,.08); -webkit-tap-highlight-color: transparent;
    }
    .well:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
    .win { position: absolute; left: 7px; right: 7px; height: 6px; border-radius: 1px; background: #1e8a3a; box-shadow: inset 0 1px 1px rgba(0,0,0,.6); transition: background .05s; }
    .win.t { top: 5px; } .win.b { bottom: 5px; background: #1e8a3a; }
    .handle {
      position: absolute; left: 2px; width: 26px; height: 46px; top: 36px; border-radius: 3px;
      background: linear-gradient(90deg, #15161a, #3f4249 35%, #2a2d33 70%, #101114);
      box-shadow: 0 3px 4px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.2), inset 0 -2px 0 rgba(0,0,0,.6);
      transition: top .07s cubic-bezier(.9,0,.1,1);
    }
    .handle::after { content: ''; position: absolute; left: 6px; right: 6px; top: 50%; height: 3px; margin-top: -1.5px; border-radius: 1px; background: rgba(255,255,255,.15); box-shadow: 0 -6px 0 rgba(255,255,255,.15), 0 6px 0 rgba(255,255,255,.15); }
    .well[aria-pressed="true"] .handle { top: 2px; }
    .well[aria-pressed="true"] .win.t { background: #e8141c; box-shadow: 0 0 5px rgba(232,20,28,.6); }
    .well[aria-pressed="true"] .win.b { background: #e8141c; }
  `,
  html: `
    <div class="stage">
      <div class="body">
        <span class="lbl on">ON</span>
        <button class="well" type="button" aria-pressed="false" aria-label="main breaker"><span class="win t"></span><span class="handle"></span><span class="win b"></span></button>
        <span class="lbl off">OFF</span>
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('.well');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
