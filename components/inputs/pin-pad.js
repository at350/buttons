// iOS 17 Lock Screen passcode: "Enter Passcode", six 13pt ringed dots, 78pt frosted-glass round keys (shown at ~0.72×)
// with a light SF digit over spaced-out bold letters (ABC … WXYZ), the white flash that fades out after each tap,
// "Emergency" bottom-left and "Cancel" ↔ "Delete" bottom-right. A wrong code shakes the dots with a damped wobble
// and clears; this demo rejects the first attempt and unlocks on the second (the keypad lifts away, then returns).
const KEYS = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'], ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'], ['0', '']];
export default {
  id: 'in-pin-pad',
  credit: 'Apple iOS Lock Screen passcode — frosted round keys with ABC letters, six dots, damped shake on a wrong code, Emergency / Cancel',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pad {
      position: relative; display: inline-flex; flex-direction: column; align-items: center; padding: 22px 22px 18px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(120% 80% at 30% 0%, #4b5d8c 0%, #2b2f55 45%, #151528 100%); color: #fff;
      font-family: system-ui, -apple-system, "SF Pro Display", sans-serif; user-select: none;
    }
    .in { display: flex; flex-direction: column; align-items: center; transition: transform .5s cubic-bezier(.32,.72,0,1), opacity .4s; }
    .pad.open .in { transform: translateY(-40px); opacity: 0; }
    .ttl { font-size: 17px; line-height: 22px; font-weight: 400; letter-spacing: -.2px; }
    .dots { display: flex; gap: 17px; margin: 14px 0 26px; }
    .dot { width: 11px; height: 11px; border-radius: 50%; border: 1.2px solid #fff; background: transparent; transition: background-color .1s; }
    .dot.on { background: #fff; }
    .pad.shake .dots { animation: shake .6s cubic-bezier(.36,.07,.19,.97); }
    @keyframes shake { 10% { transform: translateX(-14px); } 25% { transform: translateX(12px); } 40% { transform: translateX(-9px); } 55% { transform: translateX(6px); } 70% { transform: translateX(-3px); } 85% { transform: translateX(1px); } 100% { transform: none; } }
    .grid { display: grid; grid-template-columns: repeat(3, 56px); gap: 13px 20px; }
    .k {
      width: 56px; height: 56px; border-radius: 50%; border: 0; padding: 0; color: #fff; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: rgba(255,255,255,.16); -webkit-backdrop-filter: blur(20px) saturate(1.6); backdrop-filter: blur(20px) saturate(1.6);
      transition: background-color .45s ease-out; -webkit-tap-highlight-color: transparent; outline: 0;
    }
    .k:hover { background: rgba(255,255,255,.22); }
    .k:active, .k.flash { background: rgba(255,255,255,.62); transition: none; }
    .k:focus-visible { box-shadow: 0 0 0 2px #fff; }
    .k b { font-size: 27px; line-height: 28px; font-weight: 300; }
    .k i { font-style: normal; font-size: 7.5px; line-height: 9px; font-weight: 700; letter-spacing: .2em; margin-right: -.2em; height: 9px; }
    .k.zero { grid-column: 2; }
    .k.nol b { margin-bottom: 0; }
    .bot { display: grid; grid-template-columns: repeat(3, 56px); gap: 0 20px; margin-top: 16px; font-size: 14px; line-height: 20px; }
    .t { border: 0; background: none; color: #fff; font: inherit; cursor: pointer; padding: 0; white-space: nowrap; -webkit-tap-highlight-color: transparent; outline: 0; }
    .t:active { opacity: .5; }
    .t:focus-visible { text-decoration: underline; }
    .t.r { grid-column: 3; display: grid; justify-items: center; }
    .t.r span { grid-area: 1 / 1; transition: opacity .15s; }
    .t.r .del { opacity: 0; }
    .t.r.has .del { opacity: 1; } .t.r.has .can { opacity: 0; }
    .lock { position: absolute; left: 0; right: 0; top: 46%; text-align: center; opacity: 0; transform: translateY(20px); transition: opacity .3s, transform .5s cubic-bezier(.32,.72,0,1); pointer-events: none; }
    .lock svg { width: 34px; height: 34px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .pad.open .lock { opacity: 1; transform: none; }
  `,
  html: `<div class="pad" role="group" aria-label="Passcode">
    <div class="in">
      <div class="ttl">Enter Passcode</div>
      <div class="dots" aria-live="polite">${'<span class="dot"></span>'.repeat(6)}</div>
      <div class="grid">${KEYS.map(([d, l]) => `<button class="k${d === '0' ? ' zero' : ''}" type="button" data-d="${d}" aria-label="${d}"><b>${d}</b><i>${l}</i></button>`).join('')}</div>
      <div class="bot"><button class="t" type="button">Emergency</button><button class="t r" type="button"><span class="can">Cancel</span><span class="del">Delete</span></button></div>
    </div>
    <div class="lock" aria-hidden="true"><svg viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg></div>
  </div>`,
  init(root) {
    const pad = root.querySelector('.pad'), dots = [...root.querySelectorAll('.dot')], r = root.querySelector('.t.r');
    let pin = '', tries = 0, busy = false, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const paint = () => { dots.forEach((d, i) => d.classList.toggle('on', i < pin.length)); r.classList.toggle('has', pin.length > 0); };
    const press = (d) => {
      if (busy || pin.length >= 6) return;
      pin += d; paint();
      if (pin.length === 6) {
        busy = true; tries++;
        if (tries % 2 === 1) {
          later(() => { pad.classList.remove('shake'); void pad.offsetWidth; pad.classList.add('shake'); }, 120);
          later(() => { pin = ''; paint(); pad.classList.remove('shake'); busy = false; }, 760);
        } else {
          later(() => pad.classList.add('open'), 150);
          later(() => { pin = ''; paint(); pad.classList.remove('open'); busy = false; }, 1700);
        }
      }
    };
    root.querySelectorAll('.k').forEach((k) => k.addEventListener('click', () => {
      k.classList.add('flash'); requestAnimationFrame(() => requestAnimationFrame(() => k.classList.remove('flash')));
      press(k.dataset.d);
    }));
    r.addEventListener('click', () => { if (busy) return; if (pin) { pin = pin.slice(0, -1); paint(); } });
    pad.addEventListener('keydown', (e) => {
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); press(e.key); }
      if (e.key === 'Backspace' && !busy && pin) { e.preventDefault(); pin = pin.slice(0, -1); paint(); }
    });
    return () => timers.forEach(clearTimeout);
  },
};
