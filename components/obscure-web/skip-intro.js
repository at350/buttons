export default {
  id: 'ob-skip-intro',
  credit: 'Y2K Flash site splash — "LOADING…" bar that crawls while hovered, a tiny "SKIP INTRO >>" link, and the glowing ENTER SITE button it reveals',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .splash { position: relative; width: 300px; max-width: 100%; height: 170px; border-radius: 12px; overflow: hidden; background: #000 radial-gradient(ellipse at 50% 40%, #1a1a2e, #000 75%); font: 10px Verdana, Arial, sans-serif; color: #9ad; }
    .ld { position: absolute; left: 40px; right: 40px; top: 66px; display: grid; gap: 6px; transition: opacity .4s; }
    .ld .t { display: flex; justify-content: space-between; letter-spacing: 2px; text-transform: uppercase; }
    .bar { height: 6px; border: 1px solid #357; background: #001; position: relative; }
    .bar i { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: linear-gradient(90deg, #06c, #6cf); transition: width .3s; }
    .skip { position: absolute; right: 12px; bottom: 10px; background: none; border: 0; cursor: pointer; color: #789; font: 700 10px Verdana, Arial, sans-serif; letter-spacing: 1px; padding: 4px; }
    .skip:hover { color: #fff; text-decoration: underline; }
    .skip:focus-visible, .enter:focus-visible { outline: 1px dotted #fff; outline-offset: 2px; }
    .enter { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) scale(.7); opacity: 0; pointer-events: none; padding: 12px 28px; border: 1px solid #6cf; border-radius: 2px; background: rgba(0,40,80,.6); color: #fff; cursor: pointer; font: 700 14px Verdana, Arial, sans-serif; letter-spacing: 4px; white-space: nowrap; text-shadow: 0 0 8px #6cf, 0 0 16px #06c; box-shadow: 0 0 12px #06c, inset 0 0 12px rgba(102,204,255,.3); transition: transform .5s cubic-bezier(.2,.8,.2,1), opacity .5s, box-shadow .3s; }
    .enter:hover { box-shadow: 0 0 24px #6cf, inset 0 0 18px rgba(102,204,255,.5); }
    .splash.skipped .enter { transform: translate(-50%, -50%) scale(1); opacity: 1; pointer-events: auto; animation: glow 1.6s ease-in-out infinite alternate; }
    @keyframes glow { to { box-shadow: 0 0 28px #6cf, inset 0 0 20px rgba(102,204,255,.5); } }
    .splash.skipped .ld, .splash.skipped .skip { opacity: 0; pointer-events: none; }
    .splash.in { background: #0b1b2b; }
    .splash.in .enter { border-color: #fc6; color: #fc6; text-shadow: 0 0 8px #fc6; box-shadow: 0 0 14px #c90; animation: none; }
    .flash { position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none; }
    .flash span { font: 900 42px/1 Impact, "Arial Black", sans-serif; letter-spacing: 6px; color: transparent; -webkit-text-stroke: 1px #345; opacity: .5; }
  `,
  html: `
    <div class="splash">
      <div class="flash" aria-hidden="true"><span>INTRO</span></div>
      <div class="ld" aria-hidden="true"><div class="t"><span>Loading</span><span class="p">0%</span></div><div class="bar"><i></i></div></div>
      <button class="skip" type="button">SKIP INTRO &gt;&gt;</button>
      <button class="enter" type="button" tabindex="-1">ENTER SITE</button>
    </div>`,
  init(root) {
    const sp = root.querySelector('.splash'), p = root.querySelector('.p'), bar = root.querySelector('.bar i'), skip = root.querySelector('.skip'), enter = root.querySelector('.enter');
    let pct = 0, iv = 0, skipped = false;
    const stop = () => { clearInterval(iv); iv = 0; };
    sp.addEventListener('mouseenter', () => { if (skipped) return; stop(); iv = setInterval(() => { pct = Math.min(97, pct + (Math.random() < .3 ? 1 : 0)); p.textContent = pct + '%'; bar.style.width = pct + '%'; }, 200); });
    sp.addEventListener('mouseleave', stop);
    skip.addEventListener('click', () => { skipped = true; stop(); sp.classList.add('skipped'); enter.tabIndex = 0; enter.focus(); });
    enter.addEventListener('click', () => {
      if (sp.classList.contains('in')) { sp.classList.remove('in', 'skipped'); skipped = false; pct = 0; p.textContent = '0%'; bar.style.width = '0'; enter.tabIndex = -1; enter.textContent = 'ENTER SITE'; skip.focus(); }
      else { sp.classList.add('in'); enter.textContent = 'EXIT SITE'; }
    });
    return stop;
  },
};
