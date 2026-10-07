// Classic chrome hand tally counter (4-digit mechanical clicker): round polished body, plunger on top, finger ring
// underneath, knurled reset knob on the right, and four white number wheels behind a black window that roll on each click.
const WHEEL = `<span class="w"><b>${[...'0123456789'].map((d) => `<i>${d}</i>`).join('')}</b></span>`;

export default {
  id: 'in-tally-counter',
  credit: 'Hand tally counter (clicker) — round chrome body, top plunger, finger ring, four rolling number wheels; the knurled side knob resets to 0000',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .tc { position: relative; width: 156px; height: 184px; -webkit-tap-highlight-color: transparent; user-select: none; }
    /* finger ring (behind the body) */
    .ring { position: absolute; left: 56px; top: 140px; width: 44px; height: 44px; border-radius: 50%; border: 7px solid #b9bcc2;
      background: transparent; box-shadow: inset 0 1px 1px rgba(255,255,255,.9), inset 0 -2px 3px rgba(0,0,0,.35), 0 2px 4px rgba(0,0,0,.25);
      border-color: #d9dbe0 #9a9ea6 #7c8088 #c4c7cd; }
    /* body */
    .body { position: absolute; left: 14px; top: 34px; width: 124px; height: 124px; border-radius: 50%;
      background: radial-gradient(circle at 34% 28%, #ffffff 0, #eef0f3 18%, #c9ccd2 48%, #9a9ea6 78%, #c7cad0 100%);
      box-shadow: 0 0 0 2px #8d9199, 0 0 0 3.5px #e6e8eb, 0 0 0 5px #7a7e86, 0 8px 14px rgba(0,0,0,.32), inset 0 -6px 12px rgba(0,0,0,.18), inset 0 4px 8px rgba(255,255,255,.8); }
    .body::after { content: ""; position: absolute; inset: 10px; border-radius: 50%; border: 1px solid rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(0,0,0,.06); pointer-events: none; }
    /* window with number wheels */
    .win { position: absolute; left: 50%; top: 55%; transform: translate(-50%, -50%); display: flex; gap: 2px; padding: 4px; border-radius: 4px; background: #15161a;
      box-shadow: 0 0 0 1.5px #6b6f77, 0 0 0 3px #eceef1, inset 0 2px 4px #000; }
    .w { position: relative; width: 17px; height: 26px; overflow: hidden; border-radius: 1px;
      background: linear-gradient(#8f9196 0, #e9eaec 22%, #fbfbfb 50%, #e9eaec 78%, #8f9196 100%); }
    .w b { position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; transition: transform .22s cubic-bezier(.3, 1.4, .5, 1); }
    .w b i { display: block; height: 26px; font: 700 19px/26px "JetBrains Mono", ui-monospace, Menlo, monospace; font-style: normal; color: #111; text-align: center; }
    .w::after { content: ""; position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,.35), transparent 30%, transparent 70%, rgba(0,0,0,.35)); pointer-events: none; }
    /* plunger */
    .press { position: absolute; left: 56px; top: 4px; width: 44px; height: 40px; padding: 0; border: 0; background: none; cursor: pointer; outline: none; }
    .press .stem { position: absolute; left: 14px; top: 12px; width: 16px; height: 22px; border-radius: 2px;
      background: linear-gradient(90deg, #8d9199, #f2f3f5 40%, #c3c6cc 70%, #7f838b); }
    .press .cap { position: absolute; left: 0; top: 0; width: 44px; height: 16px; border-radius: 8px 8px 5px 5px;
      background: linear-gradient(90deg, #8a8e96, #fbfbfc 35%, #d3d6db 65%, #868a92); box-shadow: 0 2px 2px rgba(0,0,0,.3), inset 0 1px 0 #fff; }
    .press .stem, .press .cap { transition: transform .06s ease-out; }
    .press:hover .cap { filter: brightness(1.04); }
    .press:active .cap, .press:active .stem, .press.down .cap, .press.down .stem { transform: translateY(7px); }
    .press:focus-visible .cap { outline: 2px solid #0a84ff; outline-offset: 2px; }
    /* knurled reset knob */
    .reset { position: absolute; left: 136px; top: 78px; width: 16px; height: 30px; padding: 0; border: 0; border-radius: 3px; cursor: pointer; outline: none;
      background: repeating-linear-gradient(180deg, #73777f 0 1.5px, #e6e8eb 1.5px 3px), #c9ccd1;
      box-shadow: inset 4px 0 4px -2px rgba(255,255,255,.7), inset -4px 0 4px -2px rgba(0,0,0,.45), 0 1px 2px rgba(0,0,0,.35); transition: transform .3s; }
    .reset::before { content: ""; position: absolute; left: -5px; top: 9px; width: 6px; height: 12px; background: linear-gradient(#9a9ea6, #e8eaed, #8d9199); border-radius: 1px; }
    .reset:hover { filter: brightness(1.06); } .reset:active { transform: rotate(-12deg); }
    .reset:focus-visible { outline: 2px solid #0a84ff; outline-offset: 2px; }
  `,
  html: `<div class="tc">
    <span class="ring" aria-hidden="true"></span>
    <button class="press" type="button" aria-label="Count"><span class="stem"></span><span class="cap"></span></button>
    <div class="body"><output class="win" aria-live="polite" aria-label="0">${WHEEL.repeat(4)}</output></div>
    <button class="reset" type="button" aria-label="Reset"></button>
  </div>`,
  init(root) {
    const win = root.querySelector('.win'), wheels = [...root.querySelectorAll('.w b')], press = root.querySelector('.press');
    let v = 0, t = 0;
    const show = () => { const s = String(v).padStart(4, '0'); wheels.forEach((b, i) => (b.style.transform = `translateY(${-26 * +s[i]}px)`)); win.setAttribute('aria-label', String(v)); };
    press.addEventListener('click', () => { v = (v + 1) % 10000; show(); press.classList.add('down'); clearTimeout(t); t = setTimeout(() => press.classList.remove('down'), 90); });
    root.querySelector('.reset').addEventListener('click', () => { v = 0; show(); });
    return () => clearTimeout(t);
  },
};
