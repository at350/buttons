export default {
  id: 'ks-take-a-number',
  credit: 'DMV queue ticket dispenser (Qmatic) — red LED "Now serving", pick a service and a numbered stub prints out of the slot; tear it off',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 16px 0; border-radius: 12px; overflow: hidden; background: linear-gradient(#e8eaec, #c5c9ce); font-family: Inter, system-ui, sans-serif; }
    .led { width: 220px; padding: 6px 10px; border-radius: 4px; background: #120303; box-shadow: inset 0 0 0 2px #333; display: flex; justify-content: space-between; align-items: center; font: 700 11px/1 'JetBrains Mono', ui-monospace, monospace; color: #ff3a20; text-shadow: 0 0 6px rgba(255,58,32,.7); }
    .led b { font-size: 20px; letter-spacing: .08em; }
    .btns { display: grid; gap: 6px; width: 220px; }
    .s { display: flex; align-items: center; gap: 10px; height: 38px; padding: 0 6px; border: 0; border-radius: 6px; background: #fff; cursor: pointer; font: 600 12.5px/1 Inter, sans-serif; color: #1f2a37; box-shadow: 0 2px 0 #9aa1a9, inset 0 0 0 1px #d5d9de; transition: transform .05s, box-shadow .05s; text-align: left; }
    .s i { width: 28px; height: 28px; border-radius: 4px; display: grid; place-items: center; font: 800 15px/1 Inter, sans-serif; font-style: normal; color: #fff; }
    .s:nth-child(1) i { background: #0057b8; } .s:nth-child(2) i { background: #00875a; } .s:nth-child(3) i { background: #c25100; }
    .s:hover { box-shadow: 0 2px 0 #9aa1a9, inset 0 0 0 2px #0057b8; }
    .s:active { transform: translateY(2px); box-shadow: 0 0 0 #9aa1a9, inset 0 0 0 2px #0057b8; }
    .s:focus-visible { outline: 2px solid #0057b8; outline-offset: 2px; }
    .s:disabled { cursor: default; opacity: .6; }
    .pr { position: relative; width: 236px; height: 112px; border-radius: 10px 10px 0 0; background: linear-gradient(#b4bac1, #d2d6db); box-shadow: inset 0 2px 4px rgba(0,0,0,.18); }
    .pr::after { content: 'PLEASE TAKE A TICKET'; position: absolute; left: 0; right: 0; top: 100px; text-align: center; font: 700 7px/1 Inter, sans-serif; letter-spacing: .2em; color: #6b737d; }
    .feed { position: absolute; left: 38px; right: 38px; top: 0; height: 90px; overflow: hidden; }
    .stub { position: absolute; left: 0; right: 0; top: 92px; height: 92px; border: 0; padding: 8px 8px 0; background: #fffef8; cursor: pointer; text-align: center; font: 500 8.5px/1.3 'IBM Plex Mono', monospace; color: #333;
      box-shadow: 0 0 0 1px #e1ddcf; transition: transform .9s steps(10); }
    .stub::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 4px; background: radial-gradient(circle at 3px 0, transparent 2px, #fffef8 2.5px) 0 0 / 6px 4px; }
    .stub b { display: block; font: 800 28px/1 Inter, sans-serif; color: #111; margin: 3px 0; letter-spacing: .02em; }
    .stub:focus-visible { outline: 2px solid #0057b8; outline-offset: -2px; }
    .stage.out .stub { transform: translateY(-88px); }
    .stage.torn .stub { transition: transform .35s ease-in, opacity .35s; transform: translateY(-130px) rotate(-6deg); opacity: 0; }
    .mouth { position: absolute; left: 30px; right: 30px; top: 88px; height: 8px; border-radius: 4px; background: #15171a; box-shadow: inset 0 2px 3px #000, 0 1px 0 #fff; }
  `,
  html: `
    <div class="stage">
      <div class="led" aria-live="polite"><span>NOW SERVING</span><b class="now">A042</b></div>
      <div class="btns">
        <button class="s" type="button" data-l="A" data-n="Driver License"><i>A</i>Driver License / ID</button>
        <button class="s" type="button" data-l="B" data-n="Vehicle Registration"><i>B</i>Vehicle Registration</button>
        <button class="s" type="button" data-l="C" data-n="Other Services"><i>C</i>Other Services</button>
      </div>
      <div class="pr"><div class="feed"><button class="stub" type="button" tabindex="-1" aria-label="Tear off ticket">YOUR NUMBER<b class="num">A047</b><span class="svc">Driver License</span><br><span class="ahead">5 ahead of you</span></button></div><div class="mouth"></div></div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), stub = root.querySelector('.stub'), now = root.querySelector('.now');
    const num = root.querySelector('.num'), svc = root.querySelector('.svc'), ahead = root.querySelector('.ahead'), btns = root.querySelectorAll('.s');
    const next = { A: 47, B: 18, C: 6 }; let serving = 42, t;
    btns.forEach((b) => b.addEventListener('click', () => {
      if (st.classList.contains('out')) return;
      const L = b.dataset.l, n = next[L]++;
      num.textContent = L + String(n).padStart(3, '0'); svc.textContent = b.dataset.n; ahead.textContent = (2 + (n % 5)) + ' ahead of you';
      st.classList.remove('torn'); st.classList.add('out'); stub.tabIndex = 0; btns.forEach((x) => (x.disabled = true));
    }));
    stub.addEventListener('click', () => {
      if (!st.classList.contains('out')) return;
      st.classList.add('torn'); stub.tabIndex = -1; serving++; now.textContent = 'A' + String(serving).padStart(3, '0');
      clearTimeout(t); t = setTimeout(() => { stub.style.transition = 'none'; st.classList.remove('out', 'torn'); void stub.offsetWidth; stub.style.transition = ''; btns.forEach((x) => (x.disabled = false)); }, 380);
    });
    return () => clearTimeout(t);
  },
};
