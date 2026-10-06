export default {
  id: 'gm-amongus-emergency',
  credit: 'Innersloth Among Us — the cafeteria Emergency Meeting button: big red dome with a glass plate; press slams it and flashes the alarm banner',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative;
      background: radial-gradient(circle at 50% 60%, #6e7a86, #3a434d 70%);
      padding: 22px 30px 18px;
      border-radius: 12px;
      overflow: hidden;
      width: 200px; }
    .base { width: 120px;
      height: 120px;
      margin: 0 auto;
      border-radius: 50%;
      background: radial-gradient(circle at 50% 40%, #c9d1d8, #7f8a95 70%, #515a63);
      box-shadow: 0 6px 12px rgba(0,0,0,.45), inset 0 -4px 6px rgba(0,0,0,.25);
      display: grid;
      place-items: center;
      position: relative; }
    .base::before { content: ""; position: absolute; inset: 10px; border-radius: 50%; border: 3px dashed #4b545d; opacity: .5; }
    .dome { width: 72px; height: 72px; border-radius: 50%; border: none; cursor: pointer; padding: 0; position: relative;
      background: radial-gradient(circle at 40% 30%, #ff8585, #e02020 55%, #8d0d0d); box-shadow: 0 10px 0 #7a0a0a, 0 14px 10px rgba(0,0,0,.45), inset 0 2px 4px rgba(255,255,255,.4); transition: transform .06s, box-shadow .06s; }
    .dome::after { content: "";
      position: absolute;
      left: 14px;
      top: 10px;
      width: 22px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255,255,255,.55);
      transform: rotate(-25deg); }
    .dome:active, .dome.down { transform: translateY(8px);
      box-shadow: 0 2px 0 #7a0a0a, 0 4px 6px rgba(0,0,0,.45), inset 0 2px 4px rgba(255,255,255,.4); }
    .dome:focus-visible { outline: 3px solid #fff; outline-offset: 6px; }
    .ban { position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%) scaleY(0);
      background: #d41111;
      color: #fff;
      text-align: center;
      padding: 8px 0;
      font: 800 15px 'Unbounded', 'Syne', system-ui, sans-serif;
      letter-spacing: 1px;
      pointer-events: none;
      opacity: 0; }
    .ban.show { animation: slam 1.6s ease-out 1; }
    @keyframes slam { 0% { transform: translateY(-50%) scaleY(0); opacity: 0; } 12% { transform: translateY(-50%) scaleY(1); opacity: 1; } 75% { opacity: 1; } 100% { opacity: 0; transform: translateY(-50%) scaleY(1); } }
    .stage.alarm { animation: flash .4s steps(2) 4; }
    @keyframes flash { to { box-shadow: inset 0 0 0 999px rgba(220,20,20,.25); } }
    .count { margin-top: 10px;
      text-align: center;
      color: #d6dde3;
      font: 600 11px 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: .5px; }
  `,
  html: `
    <div class="stage">
      <div class="base"><button class="dome" type="button" aria-label="Emergency meeting"></button></div>
      <div class="count">MEETINGS LEFT: <span class="n">3</span></div>
      <div class="ban">EMERGENCY MEETING</div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), dome = root.querySelector('.dome'), ban = root.querySelector('.ban'), n = root.querySelector('.n');
    let left = 3, t;
    dome.addEventListener('click', () => {
      left = left > 0 ? left - 1 : 3; n.textContent = left;
      ban.classList.remove('show'); stage.classList.remove('alarm'); void ban.offsetWidth; ban.classList.add('show'); stage.classList.add('alarm');
      dome.classList.add('down'); clearTimeout(t); t = setTimeout(() => dome.classList.remove('down'), 350);
    });
    return () => clearTimeout(t);
  },
};
