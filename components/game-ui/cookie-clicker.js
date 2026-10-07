// Cookie Clicker: the game's own Big Cookie (perfectCookie.png), bgBlue.jpg pane and shine.png rays (assets/real/gm-cookie-clicker-*), rotating (only while
// hovered), the black counter band in a Merriweather-style serif, hover grows the cookie ~5%, each click
// squishes it, drops crumbs and floats a "+1" that fades out well inside the pane.
export default {
  id: 'gm-cookie-clicker',
  credit: 'Orteil Cookie Clicker — the Big Cookie with its rotating shine: hover grows it, every click squishes it, drops crumbs and floats a "+1"; the counter keeps running',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 210px; height: 236px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: url(assets/real/gm-cookie-clicker-bg.jpg) 0 0 / 256px 256px repeat #0f2240; }
    .stage::after { content: ""; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(0,0,0,.45) 100%); pointer-events: none; }
    .cnt { position: absolute; left: 0; right: 0; top: 12px; z-index: 3; padding: 4px 0 5px; text-align: center; background: rgba(0,0,0,.45); color: #fff;
      font: 700 17px/1.15 'Merriweather', 'Fraunces', Georgia, serif; text-shadow: 0 0 4px #000, 0 1px 1px #000; white-space: nowrap; }
    .cps { display: block; font: 400 10px 'Merriweather', 'Fraunces', Georgia, serif; opacity: .85; }
    .shine { position: absolute; left: 50%; top: 142px; width: 230px; height: 230px; margin: -115px 0 0 -115px; border-radius: 50%; pointer-events: none;
      background: url(assets/real/gm-cookie-clicker-shine.png) center / 100% 100% no-repeat; opacity: .5;
      animation: spin 18s linear infinite; animation-play-state: paused; }
    .shine.s2 { opacity: .25; animation-direction: reverse; animation-duration: 26s; transform: rotate(15deg); }
    .stage:hover .shine { animation-play-state: running; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .ck { position: absolute; left: 50%; top: 142px; width: 128px; height: 128px; margin: -64px 0 0 -64px; border: none; padding: 0; background: none; cursor: pointer; border-radius: 50%;
      transition: transform 120ms ease-out; filter: drop-shadow(0 6px 6px rgba(0,0,0,.55)); }
    .ck img { width: 100%; height: 100%; display: block; pointer-events: none; -webkit-user-drag: none; }
    .ck:hover { transform: scale(1.05); }
    .ck:active, .ck.sq { transform: scale(.95); transition-duration: 40ms; }
    .ck:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
    .pl { position: absolute; z-index: 4; color: #fff; font: 700 15px 'Merriweather', 'Fraunces', Georgia, serif; text-shadow: 0 0 4px #000, 0 1px 1px #000; pointer-events: none; animation: up 1s ease-out forwards; }
    @keyframes up { 0% { opacity: 0; transform: translateY(0); } 15% { opacity: 1; } 100% { opacity: 0; transform: translateY(-42px); } }
    .cr { position: absolute; z-index: 2; width: 7px; height: 6px; border-radius: 40% 60% 50% 45%; background: #c88a44; box-shadow: inset -1px -1px 0 #8a5525; pointer-events: none; animation: crumb .8s ease-in forwards; }
    @keyframes crumb { 0% { transform: translate(0, 0) rotate(0); opacity: 1; } 100% { transform: translate(var(--dx), 40px) rotate(260deg); opacity: 0; } }
  `,
  html: `
    <div class="stage">
      <div class="cnt"><span class="n">0</span> <span class="u">cookies</span><span class="cps">per second : 0</span></div>
      <div class="shine"></div><div class="shine s2"></div>
      <button class="ck" type="button" aria-label="Big cookie"><img src="assets/real/gm-cookie-clicker-cookie.png" width="128" height="128" alt=""></button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), ck = root.querySelector('.ck'), n = root.querySelector('.n'), u = root.querySelector('.u'), cps = root.querySelector('.cps');
    let count = 0, stamps = []; const timers = [];
    ck.addEventListener('click', (e) => {
      count++; n.textContent = count.toLocaleString(); u.textContent = count === 1 ? 'cookie' : 'cookies'; const now = Date.now(); stamps = stamps.filter((s) => now - s < 3000); stamps.push(now); cps.textContent = 'per second : ' + (stamps.length / 3).toFixed(1);
      ck.classList.add('sq'); timers.push(setTimeout(() => ck.classList.remove('sq'), 80));
      const r = stage.getBoundingClientRect();
      const x = Math.min(r.width - 30, Math.max(14, (e.clientX || r.left + r.width / 2) - r.left)), y = Math.min(190, Math.max(110, (e.clientY || r.top + 142) - r.top));
      const p = document.createElement('span'); p.className = 'pl'; p.textContent = '+1'; p.style.left = (x - 10) + 'px'; p.style.top = (y - 18) + 'px'; stage.appendChild(p); timers.push(setTimeout(() => p.remove(), 1000));
      for (let i = 0; i < 4; i++) { const c = document.createElement('span'); c.className = 'cr'; c.style.left = x + 'px'; c.style.top = y + 'px'; c.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px'); c.style.animationDelay = (Math.random() * .1) + 's'; stage.appendChild(c); timers.push(setTimeout(() => c.remove(), 900)); }
    });
    return () => timers.forEach(clearTimeout);
  },
};
