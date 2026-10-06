export default {
  id: 'ob-lights-off',
  credit: '"Turn Off the Lights" — the browser extension\'s lamp button: click it and the whole stage dims around the video, the bulb glows in the dark',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .room { position: relative; width: 300px; max-width: 100%; height: 180px; border-radius: 12px; overflow: hidden; background: #f1f1f1; transition: background .6s; }
    .room.dark { background: #0a0a0a; }
    .ui { position: absolute; left: 14px; right: 14px; top: 14px; display: grid; gap: 6px; transition: opacity .6s; }
    .room.dark .ui { opacity: .06; }
    .ui i { display: block; height: 8px; border-radius: 4px; background: #d0d0d0; }
    .ui i:nth-child(2) { width: 70%; } .ui i:nth-child(3) { width: 45%; }
    .vid { position: absolute; left: 14px; bottom: 14px; width: 150px; height: 84px; border-radius: 4px; background: linear-gradient(135deg, #ff7a18, #af002d 60%, #319197); display: grid; place-items: center; box-shadow: 0 2px 8px rgba(0,0,0,.2); transition: box-shadow .6s, transform .6s; }
    .room.dark .vid { box-shadow: 0 0 0 1px #222, 0 0 40px rgba(255,255,255,.08); transform: scale(1.04); }
    .vid::after { content: ""; width: 0; height: 0; border: 12px solid transparent; border-left: 20px solid rgba(255,255,255,.9); border-right: 0; margin-left: 6px; }
    .lamp { position: absolute; right: 18px; bottom: 18px; width: 56px; height: 56px; border-radius: 50%; border: 2px solid #bbb; background: #fff; cursor: pointer; display: grid; place-items: center; transition: background .4s, border-color .4s, box-shadow .4s; }
    .lamp:hover { border-color: #888; }
    .lamp:focus-visible { outline: 2px solid #ffb400; outline-offset: 3px; }
    .lamp svg { width: 30px; height: 30px; }
    .glass { fill: #fff; stroke: #333; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: fill .4s, stroke .4s; }
    .base { fill: #555; transition: fill .4s; }
    .fil { fill: none; stroke: #333; stroke-width: 2; stroke-linecap: round; transition: stroke .4s; }
    .room.dark .lamp { background: #111; border-color: #ffb400; box-shadow: 0 0 24px 6px rgba(255,180,0,.45), 0 0 60px 20px rgba(255,180,0,.15); }
    .room.dark .glass { fill: #ffd34d; stroke: #ffb400; }
    .room.dark .fil { stroke: #ffb400; }
    .room.dark .base { fill: #999; }
  `,
  html: `
    <div class="room">
      <div class="ui" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="vid" aria-hidden="true"></div>
      <button class="lamp" type="button" aria-pressed="false" aria-label="Turn off the lights">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path class="glass" d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path class="fil" d="M9 18h6"/><path class="fil" d="M10 22h4"/></svg>
      </button>
    </div>`,
  init(root) {
    const room = root.querySelector('.room'), lamp = root.querySelector('.lamp');
    lamp.addEventListener('click', () => { const dark = room.classList.toggle('dark'); lamp.setAttribute('aria-pressed', String(dark)); lamp.setAttribute('aria-label', dark ? 'Turn on the lights' : 'Turn off the lights'); });
  },
};
