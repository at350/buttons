export default {
  id: 'ph-piano-octave',
  credit: 'One piano octave — seven ivory keys, five ebony sharps, each one presses on its hinge',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .stage { display: inline-block; padding: 12px 14px 16px; border-radius: 12px; background: linear-gradient(#2b2522, #16120f); }
    .fall { height: 10px; margin-bottom: 2px; border-radius: 3px 3px 0 0; background: linear-gradient(#5a1f16, #3a130d); box-shadow: inset 0 1px 0 rgba(255,255,255,.15); }
    .keys { position: relative; width: 231px; height: 124px; perspective: 500px; }
    .w {
      position: absolute; top: 0; width: 32px; height: 124px; border: 0; padding: 0; border-radius: 0 0 4px 4px; cursor: pointer;
      background: linear-gradient(#fbfaf5 0%, #f1efe6 85%, #d8d5c9 100%);
      box-shadow: inset -1px 0 0 rgba(0,0,0,.18), inset 1px 0 0 rgba(255,255,255,.6), 0 3px 0 #b8b4a6, 0 4px 3px rgba(0,0,0,.5);
      transform-origin: 50% 0; transition: transform .06s, background .06s, box-shadow .06s; -webkit-tap-highlight-color: transparent;
    }
    .w.on, .w:active { transform: rotateX(-5deg) translateY(2px); background: linear-gradient(#e7e5db, #dad7cb 85%, #c4c1b4 100%); box-shadow: inset -1px 0 0 rgba(0,0,0,.18), 0 1px 0 #b8b4a6, 0 1px 1px rgba(0,0,0,.5); }
    .b {
      position: absolute; top: 0; width: 20px; height: 76px; border: 0; padding: 0; border-radius: 0 0 3px 3px; cursor: pointer; z-index: 2;
      background: linear-gradient(90deg, #111 0%, #3a3a3a 25%, #222 60%, #000 100%);
      box-shadow: 0 4px 0 #000, 0 6px 4px rgba(0,0,0,.7), inset 0 -8px 0 rgba(255,255,255,.06);
      transform-origin: 50% 0; transition: transform .06s, box-shadow .06s; -webkit-tap-highlight-color: transparent;
    }
    .b.on, .b:active { transform: rotateX(-6deg) translateY(3px); box-shadow: 0 1px 0 #000, 0 2px 2px rgba(0,0,0,.7); background: linear-gradient(90deg, #0a0a0a 0%, #2a2a2a 25%, #181818 60%, #000 100%); }
    .w:focus-visible, .b:focus-visible { outline: 2px solid #4da3ff; outline-offset: -3px; }
  `,
  html: `
    <div class="stage">
      <div class="fall"></div>
      <div class="keys">
        <button class="w" type="button" style="left:0" aria-label="C"></button>
        <button class="w" type="button" style="left:33px" aria-label="D"></button>
        <button class="w" type="button" style="left:66px" aria-label="E"></button>
        <button class="w" type="button" style="left:99px" aria-label="F"></button>
        <button class="w" type="button" style="left:132px" aria-label="G"></button>
        <button class="w" type="button" style="left:165px" aria-label="A"></button>
        <button class="w" type="button" style="left:198px" aria-label="B"></button>
        <button class="b" type="button" style="left:22px" aria-label="C sharp"></button>
        <button class="b" type="button" style="left:56px" aria-label="D sharp"></button>
        <button class="b" type="button" style="left:122px" aria-label="F sharp"></button>
        <button class="b" type="button" style="left:155px" aria-label="G sharp"></button>
        <button class="b" type="button" style="left:188px" aria-label="A sharp"></button>
      </div>
    </div>`,
  init(root) {
    root.querySelectorAll('button').forEach((k) => {
      k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('on'); });
      k.addEventListener('keyup', () => k.classList.remove('on'));
      k.addEventListener('blur', () => k.classList.remove('on'));
    });
  },
};
