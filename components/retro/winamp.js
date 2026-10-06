export default {
  id: 'rt-winamp',
  credit: 'Winamp 2.x classic skin — transport bar (prev / play / pause / stop / next) with green spectrum visualizer',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #292929; padding: 10px; border-radius: 12px; display: inline-block;
      border: 1px solid #000; box-shadow: inset 1px 1px #5a5a6a, inset -1px -1px #101018; }
    .vis { width: 76px; height: 16px; background: #000; display: flex; align-items: flex-end; gap: 1px; padding: 1px; margin: 0 0 6px 2px; border: 1px solid #141414; overflow: hidden; }
    .vis i { flex: 1; height: 2px; background: linear-gradient(#f00 0%, #ff0 40%, #0f0 100%); background-size: 100% 16px; background-position: bottom; transform-origin: bottom; }
    .vis.play i { animation: eq .6s ease-in-out infinite alternate; }
    .vis.play i:nth-child(2n) { animation-duration: .45s; } .vis.play i:nth-child(3n) { animation-duration: .8s; } .vis.play i:nth-child(5n) { animation-duration: .35s; }
    .row { display: flex; gap: 0; }
    .tb { width: 23px; height: 18px; border: none; padding: 0; cursor: pointer; display: grid; place-items: center;
      background: linear-gradient(#3d3d4f, #26262f); box-shadow: inset 1px 1px #5f5f73, inset -1px -1px #0d0d12; }
    .tb:active, .tb.on { background: linear-gradient(#26262f, #3d3d4f); box-shadow: inset 1px 1px #0d0d12, inset -1px -1px #5f5f73; }
    .tb:focus-visible { outline: 1px dotted #bfbfd9; outline-offset: -3px; }
    .tb svg { width: 11px; height: 9px; fill: #d6d6e4; }
    .tb.on svg { fill: #00ff5a; }
    @keyframes eq { from { height: 2px; } to { height: 14px; } }
  `,
  html: `
    <div class="stage">
      <div class="vis"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div class="row">
        <button class="tb prev" type="button" aria-label="Previous"><svg viewBox="0 0 11 9"><path d="M0 0h2v9H0zM11 0L3 4.5 11 9z"/></svg></button>
        <button class="tb play" type="button" aria-label="Play" aria-pressed="false"><svg viewBox="0 0 11 9"><path d="M1 0l9 4.5L1 9z"/></svg></button>
        <button class="tb pause" type="button" aria-label="Pause" aria-pressed="false"><svg viewBox="0 0 11 9"><path d="M1 0h3v9H1zM7 0h3v9H7z"/></svg></button>
        <button class="tb stop" type="button" aria-label="Stop"><svg viewBox="0 0 11 9"><path d="M1 0h9v9H1z"/></svg></button>
        <button class="tb next" type="button" aria-label="Next"><svg viewBox="0 0 11 9"><path d="M9 0h2v9H9zM0 0l8 4.5L0 9z"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const vis = root.querySelector('.vis'); const play = root.querySelector('.play'); const pause = root.querySelector('.pause');
    const set = (state) => {
      vis.classList.toggle('play', state === 'play');
      play.classList.toggle('on', state === 'play'); play.setAttribute('aria-pressed', String(state === 'play'));
      pause.classList.toggle('on', state === 'pause'); pause.setAttribute('aria-pressed', String(state === 'pause'));
    };
    play.addEventListener('click', () => set('play'));
    pause.addEventListener('click', () => set(pause.classList.contains('on') ? 'play' : 'pause'));
    root.querySelector('.stop').addEventListener('click', () => set('stop'));
    root.querySelectorAll('.prev,.next').forEach((b) => b.addEventListener('click', () => { if (vis.classList.contains('play')) { vis.classList.remove('play'); requestAnimationFrame(() => vis.classList.add('play')); } }));
  },
};
