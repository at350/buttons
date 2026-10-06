export default {
  id: 'mb-dynamic-island',
  credit: 'Apple iPhone Dynamic Island — the black pill springs open into a Now Playing card and back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; max-width: 100%; height: 118px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(160deg, #b7d6ff, #e6c6ff 55%, #ffd9c2); }
    .isl { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 126px; height: 37px; border-radius: 999px; border: 0; padding: 0;
      background: #000; color: #fff; cursor: pointer; overflow: hidden; -webkit-tap-highlight-color: transparent;
      transition: width .55s linear(0, 0.28 6%, 0.6 13%, 0.86 20%, 1.04 29%, 1.09 37%, 1.04 50%, 0.99 65%, 1),
                  height .55s linear(0, 0.28 6%, 0.6 13%, 0.86 20%, 1.04 29%, 1.09 37%, 1.04 50%, 0.99 65%, 1),
                  border-radius .4s cubic-bezier(.2,.8,.2,1); }
    .isl:active { filter: brightness(1.15); }
    .isl:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .isl[aria-expanded="true"] { width: 272px; height: 88px; border-radius: 44px; }
    .mini { position: absolute; inset: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; transition: opacity .2s; }
    .isl[aria-expanded="true"] .mini { opacity: 0; pointer-events: none; }
    .art { width: 24px; height: 24px; border-radius: 6px; background: linear-gradient(135deg, #ff6b6b, #f7b733 60%, #4facfe); flex: none; }
    .bars { display: flex; gap: 2px; align-items: flex-end; height: 16px; }
    .bars i { width: 3px; border-radius: 2px; background: #ff6b6b; height: 40%; animation: eq 1s ease-in-out infinite alternate paused; }
    .isl[data-playing="true"] .bars i { animation-play-state: running; }
    .bars i:nth-child(2) { animation-delay: -.25s; } .bars i:nth-child(3) { animation-delay: -.5s; } .bars i:nth-child(4) { animation-delay: -.75s; }
    @keyframes eq { from { height: 25%; } to { height: 100%; } }
    .big { position: absolute; inset: 0; display: grid; grid-template-columns: 56px 1fr auto; gap: 14px; align-items: center; padding: 0 18px;
      opacity: 0; transform: scale(.9); transition: opacity .25s .15s, transform .45s .1s cubic-bezier(.2,.8,.2,1); }
    .isl[aria-expanded="true"] .big { opacity: 1; transform: none; }
    .big .art { width: 56px; height: 56px; border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,.4); }
    .trk { height: 4px; border-radius: 2px; background: rgba(255,255,255,.25); overflow: hidden; }
    .trk b { display: block; width: 38%; height: 100%; background: #fff; border-radius: 2px; }
    .big .bars { height: 22px; margin-bottom: 10px; }
    .pp { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,.14); display: grid; place-items: center; }
    .pp svg { width: 16px; height: 16px; fill: #fff; }
    .isl[data-playing="true"] .play, .isl:not([data-playing="true"]) .pause { display: none; }
  `,
  html: `
    <div class="stage">
      <button class="isl" type="button" aria-expanded="false" data-playing="true" aria-label="Now playing">
        <span class="mini"><span class="art"></span><span class="bars"><i></i><i></i><i></i><i></i></span></span>
        <span class="big">
          <span class="art"></span>
          <span><span class="bars"><i></i><i></i><i></i><i></i></span><span class="trk"><b></b></span></span>
          <span class="pp"><svg class="play" viewBox="0 0 16 16"><path d="M3 2l11 6-11 6z"/></svg><svg class="pause" viewBox="0 0 16 16"><path d="M3 2h4v12H3zM9 2h4v12H9z"/></svg></span>
        </span>
      </button>
    </div>`,
  init(root) {
    const isl = root.querySelector('.isl');
    const pp = root.querySelector('.pp');
    isl.addEventListener('click', (e) => {
      if (isl.getAttribute('aria-expanded') === 'true' && pp.contains(e.target)) {
        isl.dataset.playing = String(isl.dataset.playing !== 'true');
        return;
      }
      isl.setAttribute('aria-expanded', String(isl.getAttribute('aria-expanded') !== 'true'));
    });
    isl.addEventListener('keydown', (e) => { if (e.key === 'Escape') isl.setAttribute('aria-expanded', 'false'); });
  },
};
