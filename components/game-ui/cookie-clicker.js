export default {
  id: 'gm-cookie-clicker',
  credit: 'Orteil Cookie Clicker — the Big Cookie: every click squishes it, sprays crumbs and floats a "+1" up; the counter keeps running',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 200px; height: 220px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 50% 60%, #2a2a4a, #0e0e1e 70%); user-select: none; -webkit-user-select: none; }
    .cnt { position: absolute; left: 0; right: 0; top: 14px; text-align: center; color: #fff; font: 700 15px 'Syne', 'Inter', system-ui, sans-serif; text-shadow: 0 2px 0 #000; }
    .cps { display: block; font: 500 10px 'Inter', system-ui, sans-serif; opacity: .7; margin-top: 2px; }
    .ck { position: absolute; left: 50%; top: 125px; width: 120px; height: 120px; margin: -60px 0 0 -60px; border-radius: 50%; border: none; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 45% 40%, #e9b876, #c98a3f 60%, #9a5f24); box-shadow: 0 8px 14px rgba(0,0,0,.6), inset 0 -6px 10px rgba(0,0,0,.25), inset 0 4px 6px rgba(255,255,255,.25); transition: transform .08s; }
    .ck:hover { transform: scale(1.06); }
    .ck:active, .ck.sq { transform: scale(.94); }
    .ck:focus-visible { outline: 3px solid #fff; outline-offset: 4px; }
    .ck i { position: absolute; width: 14px; height: 12px; border-radius: 50% 50% 45% 55%; background: #4a2a12; box-shadow: inset 1px 1px 2px rgba(255,255,255,.15), 0 1px 0 rgba(0,0,0,.4); }
    .pl { position: absolute; color: #fff; font: 700 14px 'Syne', 'Inter', system-ui, sans-serif; text-shadow: 0 1px 2px #000; pointer-events: none; animation: up .9s ease-out forwards; }
    @keyframes up { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-50px); } }
    .cr { position: absolute; width: 5px; height: 5px; background: #b07a3a; border-radius: 1px; pointer-events: none; animation: crumb .7s ease-in forwards; --dx: 0px; }
    @keyframes crumb { 0% { transform: translate(0, 0) rotate(0); opacity: 1; } 100% { transform: translate(var(--dx), 70px) rotate(300deg); opacity: 0; } }
  `,
  html: `
    <div class="stage">
      <div class="cnt"><span class="n">0</span> cookies<span class="cps">per second: 0.0</span></div>
      <button class="ck" type="button" aria-label="Cookie">
        <i style="left:30px;top:26px"></i><i style="left:66px;top:34px;width:11px;height:10px"></i><i style="left:44px;top:58px"></i><i style="left:78px;top:66px;width:12px"></i><i style="left:26px;top:76px;width:10px;height:9px"></i><i style="left:58px;top:88px"></i>
      </button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), ck = root.querySelector('.ck'), n = root.querySelector('.n'), cps = root.querySelector('.cps');
    let count = 0, stamps = []; const timers = [];
    ck.addEventListener('click', (e) => {
      count++; n.textContent = count.toLocaleString(); const now = Date.now(); stamps = stamps.filter((s) => now - s < 3000); stamps.push(now); cps.textContent = 'per second: ' + (stamps.length / 3).toFixed(1);
      ck.classList.add('sq'); timers.push(setTimeout(() => ck.classList.remove('sq'), 90));
      const r = stage.getBoundingClientRect(); const x = (e.clientX || r.left + r.width / 2) - r.left, y = (e.clientY || r.top + 120) - r.top;
      const p = document.createElement('span'); p.className = 'pl'; p.textContent = '+1'; p.style.left = (x - 8) + 'px'; p.style.top = (y - 10) + 'px'; stage.appendChild(p); timers.push(setTimeout(() => p.remove(), 900));
      for (let i = 0; i < 5; i++) { const c = document.createElement('span'); c.className = 'cr'; c.style.left = x + 'px'; c.style.top = y + 'px'; c.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px'); c.style.animationDelay = (Math.random() * .1) + 's'; stage.appendChild(c); timers.push(setTimeout(() => c.remove(), 800)); }
    });
    return () => timers.forEach(clearTimeout);
  },
};
