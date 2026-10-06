export default {
  id: 'ks-elevator-dispatch',
  credit: 'Destination-dispatch elevator terminal (Schindler PORT / Otis Compass) — key in your floor and it assigns a car letter with an arrow pointing to it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 18px; border-radius: 12px; background: repeating-linear-gradient(90deg, rgba(255,255,255,.07) 0 1px, transparent 1px 3px), linear-gradient(#c8cbcf, #9da1a7); }
    .term { width: 168px; padding: 12px; border-radius: 10px; background: linear-gradient(#1b1c1f, #0b0b0c); box-shadow: 0 6px 12px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.12); }
    .disp { position: relative; height: 62px; margin-bottom: 12px; border-radius: 6px; background: #000; display: grid; place-items: center; overflow: hidden; font-family: Inter, system-ui, sans-serif; color: #fff; box-shadow: inset 0 0 0 1px #2a2b2e; }
    .disp > div { grid-area: 1 / 1; transition: opacity .2s, transform .25s; }
    .entry { font: 600 30px/1 Inter, sans-serif; letter-spacing: .04em; font-variant-numeric: tabular-nums; }
    .entry.idle { font-size: 11px; color: #9ea3ab; letter-spacing: .02em; }
    .asg { display: flex; align-items: center; gap: 8px; opacity: 0; transform: scale(.85); }
    .asg .fl { font-size: 12px; color: #9ea3ab; text-align: right; line-height: 1.1; } .asg .fl b { display: block; font-size: 16px; color: #fff; }
    .asg .car { width: 44px; height: 44px; border-radius: 6px; display: grid; place-items: center; background: #fff; color: #000; font: 800 30px/1 Inter, sans-serif; }
    .asg svg { width: 26px; height: 26px; color: #5ad1ff; }
    .stage.done .entry { opacity: 0; } .stage.done .asg { opacity: 1; transform: none; }
    .pad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; justify-items: center; }
    .k { width: 40px; height: 40px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; font: 500 16px/1 Inter, sans-serif; color: #e9eaec;
      background: radial-gradient(circle at 50% 40%, #3a3c40, #222327 70%); box-shadow: 0 0 0 2px #4a4c51, 0 2px 3px rgba(0,0,0,.6); transition: box-shadow .12s, color .12s, transform .05s; -webkit-tap-highlight-color: transparent; }
    .k svg { width: 20px; height: 20px; vertical-align: middle; }
    .k:hover { box-shadow: 0 0 0 2px #7a7d83, 0 2px 3px rgba(0,0,0,.6); }
    .k:active { transform: scale(.94); box-shadow: 0 0 0 2px #5ad1ff, 0 0 10px rgba(90,209,255,.7); color: #5ad1ff; }
    .k:focus-visible { outline: 2px solid #5ad1ff; outline-offset: 3px; }
    .k[aria-pressed="true"] { box-shadow: 0 0 0 2px #5ad1ff, 0 0 10px rgba(90,209,255,.6); color: #5ad1ff; }
  `,
  html: `
    <div class="stage"><div class="term">
      <div class="disp" aria-live="polite">
        <div class="entry idle">Enter floor</div>
        <div class="asg"><div class="fl">Floor<b class="fn">17</b></div><div class="car">C</div><svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
      </div>
      <div class="pad"></div>
    </div></div>`,
  init(root) {
    const st = root.querySelector('.stage'), pad = root.querySelector('.pad'), entry = root.querySelector('.entry');
    const fn = root.querySelector('.fn'), car = root.querySelector('.car'), arr = root.querySelector('.arr');
    let v = '', t, acc = false;
    const R = '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', L = '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>';
    const assign = () => {
      const f = Math.max(1, Math.min(42, +v || 1)); const i = (f * 7 + (acc ? 3 : 0)) % 6;
      fn.textContent = f; car.textContent = 'ABCDEF'[i]; arr.innerHTML = i < 3 ? L : R;
      st.classList.add('done'); v = '';
    };
    const key = (k) => {
      clearTimeout(t);
      if (st.classList.contains('done')) { st.classList.remove('done'); }
      if (k === 'acc') { acc = !acc; accB.setAttribute('aria-pressed', String(acc)); return; }
      if (k === 'del') v = v.slice(0, -1); else if (v.length < 2) v += k;
      entry.classList.toggle('idle', !v); entry.textContent = v || 'Enter floor';
      if (v) t = setTimeout(assign, v.length === 2 ? 500 : 1300);
    };
    const accIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/></svg>';
    const delIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg>';
    let accB;
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'acc', '0', 'del'].forEach((k) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'k';
      if (k === 'acc') { b.innerHTML = accIcon; b.setAttribute('aria-label', 'Accessible car'); b.setAttribute('aria-pressed', 'false'); accB = b; }
      else if (k === 'del') { b.innerHTML = delIcon; b.setAttribute('aria-label', 'Delete'); }
      else b.textContent = k;
      b.addEventListener('click', () => key(k)); pad.appendChild(b);
    });
    return () => clearTimeout(t);
  },
};
