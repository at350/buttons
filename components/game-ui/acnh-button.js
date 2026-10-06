export default {
  id: 'gm-acnh-button',
  credit: 'Nintendo Animal Crossing: New Horizons — NookPhone-style leaf-green and cream pill buttons that wobble on hover and squish when pressed; the leaf toggles',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #f6efd9;
      background-image: radial-gradient(#ece1c2 1.5px, transparent 1.5px);
      background-size: 14px 14px;
      padding: 20px 24px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center; }
    .b { border: none;
      cursor: pointer;
      height: 46px;
      padding: 0 26px;
      border-radius: 23px;
      font: 800 15px 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
      letter-spacing: .3px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: transform .12s;
      position: relative; }
    .g { background: #7fd16b;
      color: #fff;
      box-shadow: 0 5px 0 #4f9f3e, 0 7px 10px rgba(80,120,50,.25), inset 0 2px 0 rgba(255,255,255,.4);
      text-shadow: 0 1px 0 #4f9f3e; }
    .c { background: #fffaea; color: #7a6a3e; box-shadow: 0 5px 0 #d8c89a, 0 7px 10px rgba(120,100,50,.18), inset 0 2px 0 #fff; }
    .b:hover { animation: wob .5s ease-in-out infinite; }
    @keyframes wob { 0%, 100% { transform: rotate(-2deg) scale(1.04); } 50% { transform: rotate(2deg) scale(1.04); } }
    .b:active { animation: none; transform: translateY(4px) scale(1.05, .92); }
    .g:active { box-shadow: 0 1px 0 #4f9f3e, inset 0 2px 0 rgba(255,255,255,.4); }
    .c:active { box-shadow: 0 1px 0 #d8c89a, inset 0 2px 0 #fff; }
    .b:focus-visible { outline: 3px solid #4f9f3e; outline-offset: 3px; }
    .leaf { width: 20px; height: 20px; transition: transform .3s cubic-bezier(.3,1.6,.5,1); }
    .leaf path { fill: #fff; }
    .c .leaf path { fill: #7fd16b; }
    .b.on .leaf { transform: rotate(-30deg) scale(1.2); }
    .g.on { background: #ffcc4d;
      box-shadow: 0 5px 0 #d19a1e, 0 7px 10px rgba(120,100,50,.25), inset 0 2px 0 rgba(255,255,255,.5);
      text-shadow: 0 1px 0 #d19a1e; }
    .bells { font: 700 12px 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
      color: #7a6a3e;
      background: #fff;
      border-radius: 12px;
      padding: 3px 10px;
      display: inline-flex;
      gap: 5px;
      align-items: center;
      box-shadow: 0 2px 0 #d8c89a; }
    .bells::before { content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #ffe28a, #e0a526); }
  `,
  html: `
    <div class="stage">
      <button class="b g" type="button" aria-pressed="false"><svg class="leaf" viewBox="0 0 24 24"><path d="M20 4c-9 0-15 5-16 14 4-6 9-9 14-11-4 3-7 7-9 13 7-1 12-7 11-16z"/></svg>Let's go!</button>
      <button class="b c" type="button"><svg class="leaf" viewBox="0 0 24 24"><path d="M20 4c-9 0-15 5-16 14 4-6 9-9 14-11-4 3-7 7-9 13 7-1 12-7 11-16z"/></svg>Nook Shopping</button>
      <span class="bells"><span class="n">99,000</span> Bells</span>
    </div>`,
  init(root) {
    const g = root.querySelector('.g'), n = root.querySelector('.n'), c = root.querySelector('.c'); let bells = 99000;
    g.addEventListener('click', () => { const on = g.classList.toggle('on'); g.setAttribute('aria-pressed', String(on)); g.lastChild.textContent = on ? 'Yes please!' : "Let's go!"; });
    c.addEventListener('click', () => { c.classList.toggle('on'); bells = Math.max(0, bells - 1200); n.textContent = bells.toLocaleString(); });
  },
};
