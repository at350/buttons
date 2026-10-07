export default {
  id: 'mb-dynamic-island',
  credit: 'Apple iPhone Dynamic Island — compact Now Playing (art + tinted waveform) springs open into the expanded media controls with scrubber and transport',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; max-width: 100%; height: 194px; border-radius: 12px; overflow: hidden;
      background: #c9d3dc url(assets/tall/05.webp) 50% 22% / cover no-repeat;
      font: 600 15px/1 -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; color: #000; -webkit-font-smoothing: antialiased; }
    .sb { position: absolute; top: 19px; left: 30px; right: 22px; display: flex; justify-content: space-between; align-items: center; transition: opacity .25s cubic-bezier(.32,.72,0,1); }
    .sb .ico { display: flex; gap: 4px; align-items: center; }
    .sb svg { width: 15px; height: 15px; fill: none; stroke: #000; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .stage.open .sb { opacity: 0; }
    .isl { position: absolute; top: 11px; left: 50%; width: 126px; height: 37px; margin-left: -63px; border-radius: 19px; border: 0; padding: 0; background: #000; color: #fff; cursor: pointer; overflow: hidden;
      text-align: left; font: inherit; -webkit-tap-highlight-color: transparent;
      transition: width .62s linear(0, 0.2 5%, 0.56 12%, 0.86 20%, 1.02 28%, 1.07 35%, 1.05 44%, 1.01 56%, 0.995 70%, 1), margin-left .62s linear(0, 0.2 5%, 0.56 12%, 0.86 20%, 1.02 28%, 1.07 35%, 1.05 44%, 1.01 56%, 0.995 70%, 1),
                  height .62s linear(0, 0.2 5%, 0.56 12%, 0.86 20%, 1.02 28%, 1.07 35%, 1.05 44%, 1.01 56%, 0.995 70%, 1), border-radius .5s cubic-bezier(.32,.72,0,1); }
    .isl:active { transform: scale(.985); }
    .isl:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .stage.open .isl { width: 284px; margin-left: -142px; height: 166px; border-radius: 44px; }
    .mini { position: absolute; left: 7px; right: 10px; top: 0; height: 37px; display: flex; align-items: center; justify-content: space-between; transition: opacity .18s, filter .25s; }
    .stage.open .mini { opacity: 0; filter: blur(4px); }
    .art { display: block; border-radius: 6px; background: #b8231c url(assets/square/57.webp) center / cover no-repeat; flex: none; }
    .mini .art { width: 23px; height: 23px; }
    .wave { display: flex; gap: 2px; align-items: center; height: 14px; }
    /* full-height bars clipped by a centred, rounded inset(): same pill at every height, and Chromium animates clip-path on the compositor (height re-ran layout every frame) */
    .wave i { width: 2.5px; height: 100%; border-radius: 2px; background: #ff6b5e; clip-path: inset(35% 0 round 2px); animation: eq .9s ease-in-out infinite alternate; animation-play-state: paused; }
    .wave i:nth-child(2) { animation-delay: -.3s; } .wave i:nth-child(3) { animation-delay: -.6s; } .wave i:nth-child(4) { animation-delay: -.15s; } .wave i:nth-child(5) { animation-delay: -.45s; }
    .stage.play .wave i { animation-play-state: running; }
    @keyframes eq { from { clip-path: inset(39% 0 round 2px); } to { clip-path: inset(0 round 2px); } }
    .big { position: absolute; left: 0; right: 0; top: 0; padding: 20px 22px 0; opacity: 0; transform: scale(.92); transform-origin: 50% 0; filter: blur(6px); pointer-events: none;
      transition: opacity .2s, transform .5s cubic-bezier(.32,.72,0,1), filter .3s; }
    .stage.open .big { opacity: 1; transform: none; filter: none; pointer-events: auto; transition: opacity .3s .12s, transform .55s .06s cubic-bezier(.32,.72,0,1), filter .35s .08s; }
    .r1 { display: grid; grid-template-columns: 46px 1fr auto; gap: 12px; align-items: center; }
    .big .art { width: 46px; height: 46px; border-radius: 10px; }
    .meta { display: grid; gap: 4px; min-width: 0; font-size: 14px; }
    .meta small { color: rgba(255,255,255,.55); font-weight: 500; font-size: 13px; }
    .meta span, .meta small { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .big .wave { height: 18px; }
    .big .wave i { width: 3px; }
    .r2 { display: grid; grid-template-columns: 30px 1fr 34px; gap: 8px; align-items: center; margin-top: 16px; font-size: 11px; font-weight: 500; color: rgba(255,255,255,.55); font-variant-numeric: tabular-nums; }
    .r2 span:last-child { text-align: right; }
    .trk { height: 6px; border-radius: 3px; background: rgba(255,255,255,.22); overflow: hidden; }
    .trk b { display: block; height: 100%; width: 48%; background: rgba(255,255,255,.9); border-radius: 3px; }
    .r3 { display: flex; justify-content: center; align-items: center; gap: 30px; margin-top: 8px; }
    .ctl { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; transition: background .15s, transform .3s cubic-bezier(.32,.72,0,1); }
    .ctl:hover { background: rgba(255,255,255,.1); }
    .ctl:active { transform: scale(.86); }
    .ctl svg { width: 22px; height: 22px; fill: #fff; stroke: #fff; stroke-width: 1; stroke-linejoin: round; }
    .ctl.pp svg { width: 28px; height: 28px; stroke: none; }
    .stage.play .ico-play, .stage:not(.play) .ico-pause { display: none; }
  `,
  html: `
    <div class="stage play">
      <div class="sb" aria-hidden="true"><span>9:41</span><span class="ico"><svg viewBox="0 0 24 24"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg><svg viewBox="0 0 24 24"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg><svg viewBox="0 0 24 24" style="width:21px"><path d="M10 10v4"/><path d="M14 10v4"/><path d="M22 14v-4"/><path d="M6 10v4"/><rect x="2" y="6" width="16" height="12" rx="2"/></svg></span></div>
      <button class="isl" type="button" aria-expanded="false" aria-label="Now Playing">
        <span class="mini"><span class="art"></span><span class="wave"><i></i><i></i><i></i><i></i><i></i></span></span>
        <span class="big">
          <span class="r1"><span class="art"></span><span class="meta"><span>Espresso</span><small>Sabrina Carpenter</small></span><span class="wave"><i></i><i></i><i></i><i></i><i></i></span></span>
          <span class="r2"><span>1:24</span><span class="trk"><b></b></span><span>-1:31</span></span>
          <span class="r3">
            <span class="ctl" data-act="back" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/><path d="M3 20V4"/></svg></span>
            <span class="ctl pp" data-act="pp" aria-label="Play/Pause"><svg class="ico-pause" viewBox="0 0 24 24"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg><svg class="ico-play" viewBox="0 0 24 24"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg></span>
            <span class="ctl" data-act="fwd" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/></svg></span>
          </span>
        </span>
      </button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), isl = root.querySelector('.isl');
    const set = (on) => { stage.classList.toggle('open', on); isl.setAttribute('aria-expanded', String(on)); };
    isl.addEventListener('click', (e) => {
      const act = stage.classList.contains('open') && e.target.closest('[data-act]');
      if (act) { if (act.dataset.act === 'pp') stage.classList.toggle('play'); return; }
      set(!stage.classList.contains('open'));
    });
    isl.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); if (e.key.toLowerCase() === 'k' && stage.classList.contains('open')) stage.classList.toggle('play'); });
    stage.addEventListener('pointerdown', (e) => { if (!isl.contains(e.target)) set(false); });
  },
};
