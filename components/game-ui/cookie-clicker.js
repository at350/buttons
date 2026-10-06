// Cookie Clicker: the Big Cookie on the blue left pane, slow rotating "shine" rays behind it (only while
// hovered), the black counter band in a Merriweather-style serif, hover grows the cookie ~5%, each click
// squishes it, drops crumbs and floats a "+1" that fades out well inside the pane.
const CHIPS = [
  'M38 30l7-3 6 4-2 7-8 1-4-4z', 'M66 24l8-1 4 6-4 6-7-1-2-5z', 'M84 44l7 1 3 7-5 5-7-2-1-6z', 'M24 52l6-2 6 5-2 7-7 1-4-5z',
  'M52 52l8-2 5 6-3 7-8 0-3-6z', 'M76 70l7-1 4 6-4 6-7-1-2-5z', 'M36 78l7-2 5 5-2 7-7 1-4-5z', 'M58 88l6-1 4 5-3 6-6 0-3-5z',
  'M90 66l4 2 1 5-4 2-3-3z', 'M48 18l4 1 1 4-4 1-2-3z',
];
export default {
  id: 'gm-cookie-clicker',
  credit: 'Orteil Cookie Clicker — the Big Cookie with its rotating shine: hover grows it, every click squishes it, drops crumbs and floats a "+1"; the counter keeps running',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 210px; height: 236px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: radial-gradient(circle at 50% 62%, #2a4a78 0%, #14284a 45%, #0a1630 80%); }
    .stage::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(255,255,255,.025) 0 2px, transparent 2px 4px); pointer-events: none; }
    .cnt { position: absolute; left: 0; right: 0; top: 12px; z-index: 3; padding: 4px 0 5px; text-align: center; background: rgba(0,0,0,.45); color: #fff;
      font: 700 17px/1.15 'Merriweather', 'Fraunces', Georgia, serif; text-shadow: 0 0 4px #000, 0 1px 1px #000; white-space: nowrap; }
    .cps { display: block; font: 400 10px 'Merriweather', 'Fraunces', Georgia, serif; opacity: .85; }
    .shine { position: absolute; left: 50%; top: 142px; width: 230px; height: 230px; margin: -115px 0 0 -115px; border-radius: 50%; pointer-events: none;
      background: repeating-conic-gradient(rgba(255,255,255,.16) 0 7deg, transparent 7deg 22.5deg); -webkit-mask: radial-gradient(circle, #000 20%, transparent 68%); mask: radial-gradient(circle, #000 20%, transparent 68%);
      animation: spin 18s linear infinite; animation-play-state: paused; }
    .shine.s2 { background: repeating-conic-gradient(rgba(255,240,200,.12) 0 5deg, transparent 5deg 30deg); animation-direction: reverse; animation-duration: 26s; }
    .stage:hover .shine { animation-play-state: running; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .ck { position: absolute; left: 50%; top: 142px; width: 128px; height: 128px; margin: -64px 0 0 -64px; border: none; padding: 0; background: none; cursor: pointer; border-radius: 50%;
      transition: transform 120ms ease-out; filter: drop-shadow(0 6px 6px rgba(0,0,0,.55)); }
    .ck svg { width: 100%; height: 100%; display: block; }
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
      <div class="cnt"><span class="n">0</span> cookies<span class="cps">per second : 0</span></div>
      <div class="shine"></div><div class="shine s2"></div>
      <button class="ck" type="button" aria-label="Big cookie">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <radialGradient id="cd" cx="45%" cy="40%" r="62%"><stop offset="0" stop-color="#e3a95d"/><stop offset=".62" stop-color="#cf8d43"/><stop offset=".9" stop-color="#b8742f"/><stop offset="1" stop-color="#9a5c22"/></radialGradient>
            <radialGradient id="ch" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#6b3d1c"/><stop offset="1" stop-color="#3a1d0a"/></radialGradient>
          </defs>
          <path d="M60 4c8 0 12 3 19 4s13 5 17 10 9 9 12 16 3 13 4 20-2 13-3 20-6 12-10 17-10 9-17 12-12 4-20 4-13-2-20-4-12-6-17-11-9-10-11-17-4-12-4-20 1-13 4-19 7-12 12-16 11-7 18-10 9-6 16-6z" fill="url(#cd)"/>
          <path d="M60 10c7 0 11 3 17 4s12 4 16 9 8 9 10 15 3 12 3 18-1 12-3 18-5 11-9 15-9 8-15 10-11 3-18 3-12-1-18-3-11-5-15-10-8-9-10-15-3-12-3-18 1-12 3-17 6-11 11-15 10-7 16-9 9-5 15-5z" fill="none" stroke="#f0c27f" stroke-opacity=".35" stroke-width="2"/>
          ${CHIPS.map((d) => `<path d="${d}" fill="url(#ch)"/><path d="${d}" fill="none" stroke="#2a1306" stroke-opacity=".4" stroke-width="1"/>`).join('')}
          <circle cx="30" cy="38" r="2" fill="#a96a2d"/><circle cx="70" cy="44" r="1.6" fill="#a96a2d"/><circle cx="44" cy="68" r="1.8" fill="#a96a2d"/><circle cx="88" cy="88" r="1.6" fill="#a96a2d"/><circle cx="64" cy="102" r="1.8" fill="#a96a2d"/>
          <ellipse cx="42" cy="26" rx="18" ry="7" fill="#fff" opacity=".12" transform="rotate(-25 42 26)"/>
        </svg>
      </button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), ck = root.querySelector('.ck'), n = root.querySelector('.n'), cps = root.querySelector('.cps');
    let count = 0, stamps = []; const timers = [];
    ck.addEventListener('click', (e) => {
      count++; n.textContent = count.toLocaleString(); const now = Date.now(); stamps = stamps.filter((s) => now - s < 3000); stamps.push(now); cps.textContent = 'per second : ' + (stamps.length / 3).toFixed(1);
      ck.classList.add('sq'); timers.push(setTimeout(() => ck.classList.remove('sq'), 80));
      const r = stage.getBoundingClientRect();
      const x = Math.min(r.width - 30, Math.max(14, (e.clientX || r.left + r.width / 2) - r.left)), y = Math.min(190, Math.max(110, (e.clientY || r.top + 142) - r.top));
      const p = document.createElement('span'); p.className = 'pl'; p.textContent = '+1'; p.style.left = (x - 10) + 'px'; p.style.top = (y - 18) + 'px'; stage.appendChild(p); timers.push(setTimeout(() => p.remove(), 1000));
      for (let i = 0; i < 4; i++) { const c = document.createElement('span'); c.className = 'cr'; c.style.left = x + 'px'; c.style.top = y + 'px'; c.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px'); c.style.animationDelay = (Math.random() * .1) + 's'; stage.appendChild(c); timers.push(setTimeout(() => c.remove(), 900)); }
    });
    return () => timers.forEach(clearTimeout);
  },
};
