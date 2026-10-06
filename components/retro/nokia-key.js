export default {
  id: 'rt-nokia-key',
  credit: 'Nokia 3310 — rubber keypad keys with letters, and the backlit green monochrome LCD that echoes presses',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #1f2a3a; padding: 12px 14px 14px; border-radius: 12px; display: inline-block; }
    .lcd { width: 132px; height: 40px; margin: 0 auto 10px; background: #9ab07a; border: 3px solid #0d1522; border-radius: 3px; padding: 4px 6px;
      font: bold 15px/16px ui-monospace, "Courier New", monospace; color: #1a2a1a; letter-spacing: 1px; overflow: hidden; white-space: nowrap;
      box-shadow: inset 0 0 8px rgba(0,0,0,.3); transition: background .2s; }
    .lcd.lit { background: #c5e089; }
    .lcd small { display: block; font-size: 9px; line-height: 10px; letter-spacing: 0; }
    .pad { display: grid; grid-template-columns: repeat(3, 42px); gap: 6px; justify-content: center; }
    .k { height: 26px; border: none; border-radius: 14px 14px 14px 14px / 10px 10px 10px 10px; cursor: pointer; padding: 0 6px; position: relative; display: flex; align-items: center; justify-content: space-between;
      background: linear-gradient(#5d7ba3, #3d5a85 55%, #2d4668); box-shadow: 0 2px 0 #16233a, inset 0 1px 0 #7f9bc2; color: #eef3ff; font: bold 12px "Nokia Sans", Helvetica, Arial, sans-serif; }
    .k small { font: 7px Helvetica, Arial, sans-serif; letter-spacing: .5px; color: #d6e2ff; }
    .k:active, .k.down { transform: translateY(2px); box-shadow: 0 0 0 #16233a, inset 0 1px 2px rgba(0,0,0,.4); }
    .k:focus-visible { outline: 2px solid #c5e089; outline-offset: 2px; }
    .k.c { background: linear-gradient(#c43838, #8e1f1f); }
  `,
  html: `
    <div class="stage">
      <div class="lcd"><small>Menu</small><span class="txt"></span></div>
      <div class="pad">
        <button class="k" type="button"><b>1</b><small>&nbsp;</small></button>
        <button class="k" type="button"><b>2</b><small>abc</small></button>
        <button class="k" type="button"><b>3</b><small>def</small></button>
        <button class="k" type="button"><b>4</b><small>ghi</small></button>
        <button class="k" type="button"><b>5</b><small>jkl</small></button>
        <button class="k" type="button"><b>6</b><small>mno</small></button>
        <button class="k" type="button"><b>7</b><small>pqrs</small></button>
        <button class="k" type="button"><b>8</b><small>tuv</small></button>
        <button class="k" type="button"><b>9</b><small>wxyz</small></button>
        <button class="k" type="button"><b>*</b><small>+</small></button>
        <button class="k" type="button"><b>0</b><small>&nbsp;</small></button>
        <button class="k c" type="button" aria-label="Clear"><b>C</b><small>&nbsp;</small></button>
      </div>
    </div>`,
  init(root) {
    const lcd = root.querySelector('.lcd'); const txt = root.querySelector('.txt');
    let t; const wake = () => { lcd.classList.add('lit'); clearTimeout(t); t = setTimeout(() => lcd.classList.remove('lit'), 1500); };
    root.querySelectorAll('.k').forEach((k) => k.addEventListener('click', () => {
      wake();
      if (k.classList.contains('c')) { txt.textContent = txt.textContent.slice(0, -1); return; }
      if (txt.textContent.length < 11) txt.textContent += k.querySelector('b').textContent;
    }));
  },
};
