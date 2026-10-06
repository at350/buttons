export default {
  id: 'dp-finder-folder',
  credit: 'macOS Finder folder in 3D — the system folder palette (#92DDFF back with tab, #67CBF8→#7AD4FB front); the front flap hinges open toward you and a document slides up out of it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 40px 40px 26px; perspective: 700px; background: #f5f5f7; border-radius: 12px; }
    .folder {
      position: relative; display: block; width: 116px; height: 88px; border: 0; padding: 0; background: transparent; cursor: pointer;
      transform-style: preserve-3d; transform: rotateX(6deg); transition: transform .4s cubic-bezier(.32, .72, 0, 1);
      -webkit-tap-highlight-color: transparent;
    }
    .folder:hover { transform: rotateX(12deg) translateZ(6px); }
    .folder:active { transform: rotateX(8deg) scale(.97); }
    .back {
      position: absolute; left: 0; right: 0; top: 9px; bottom: 0; border-radius: 3px 7px 6px 6px;
      background: linear-gradient(180deg, #9ae0ff, #8bd9fd 40%, #7fd2fa); transform: translateZ(-6px);
    }
    /* the tab: rounded top-left, a soft slope down into the back panel */
    .back::before {
      content: ''; position: absolute; left: 0; top: -9px; width: 46px; height: 12px; border-radius: 5px 6px 0 0;
      background: #9ae0ff; clip-path: polygon(0 0, 78% 0, 100% 100%, 0 100%);
    }
    .doc {
      position: absolute; left: 12px; right: 12px; top: 14px; height: 64px; border-radius: 2px; background: #fff;
      box-shadow: 0 0 0 .5px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .08);
      transform: translateZ(-3px) translateY(0); transition: transform .55s cubic-bezier(.3, 1.3, .4, 1) .04s;
    }
    .doc::before { content: ''; position: absolute; left: 12px; right: 12px; top: 10px; height: 34px;
      background: repeating-linear-gradient(180deg, #d4d4d8 0 2px, transparent 2px 7px); }
    .doc::after { content: ''; position: absolute; left: 12px; width: 34%; top: 10px; height: 2px; background: #9ca3af; }
    .folder[aria-expanded="true"] .doc { transform: translateZ(-3px) translateY(-30px); }
    .front {
      position: absolute; left: 0; right: 0; bottom: 0; height: 70px; border-radius: 5px 5px 6px 6px; transform-origin: 50% 100%;
      background:
        linear-gradient(180deg, transparent 88%, rgba(255, 255, 255, .28) 88%, transparent 90%, rgba(255, 255, 255, .22) 93%, transparent 95%),
        linear-gradient(180deg, #8bdafd 0, #67cbf8 6%, #6dcdf9 30%, #79d3fb 60%, #7ad4fb 78%, #74cdf5 88%, #6dc5ed 100%);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .55), 0 -1px 3px rgba(0, 80, 140, .12);
      transform: rotateX(0deg); transition: transform .55s cubic-bezier(.3, 1.2, .4, 1);
    }
    .folder[aria-expanded="true"] .front { transform: rotateX(-30deg); }
    .sh { position: absolute; left: 6px; right: 6px; bottom: -8px; height: 10px; border-radius: 50%; background: radial-gradient(closest-side, rgba(0, 0, 0, .22), transparent); transform: translateZ(-10px); }
    .folder:focus-visible { outline: 0; }
    .folder:focus-visible .front { outline: 2px solid #007aff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <button class="folder" type="button" aria-expanded="false" aria-label="Open folder">
        <span class="sh"></span><span class="back"></span><span class="doc"></span><span class="front"></span>
      </button>
    </div>`,
  init(root) {
    const f = root.querySelector('.folder');
    f.addEventListener('click', () => {
      const o = f.getAttribute('aria-expanded') !== 'true';
      f.setAttribute('aria-expanded', String(o)); f.setAttribute('aria-label', o ? 'Close folder' : 'Open folder');
    });
  },
};
