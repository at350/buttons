export default {
  id: 'ob-press-f',
  credit: '"Press F to Pay Respects" — Call of Duty: Advanced Warfare (2014) key prompt: hold F (or the mouse) to fill the ring; respects are counted',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .hud { position: relative; width: 260px; max-width: 100%; height: 150px; border-radius: 12px; background: radial-gradient(ellipse at 50% 60%, #3a3a3a, #0d0d0d 70%); display: grid; place-items: center; overflow: hidden; }
    .hud::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.18) 2px 3px); pointer-events: none; }
    .prompt { position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .key { position: relative; width: 62px; height: 62px; border: 0; background: none; cursor: pointer; display: grid; place-items: center; padding: 0; touch-action: none; user-select: none; -webkit-user-select: none; }
    .key:focus-visible { outline: 2px solid #fff; outline-offset: 6px; }
    .ring { position: absolute; inset: 0; transform: rotate(-90deg); }
    .ring circle { fill: none; stroke-width: 3; }
    .ring .bg { stroke: rgba(255,255,255,.2); }
    .ring .fg { stroke: #fff; stroke-dasharray: 182; stroke-dashoffset: 182; transition: stroke-dashoffset .15s linear; }
    .key.hold .fg { stroke-dashoffset: 0; transition: stroke-dashoffset 1.1s linear; }
    .cap { width: 40px; height: 40px; border: 2px solid #fff; display: grid; place-items: center; font: 700 22px/1 "Roboto Flex", Inter, system-ui, sans-serif; color: #fff; background: rgba(0,0,0,.4); transition: background .1s, color .1s; }
    .key.hold .cap, .key:active .cap { background: #fff; color: #000; }
    .lbl { font: 700 11px/1 Inter, system-ui, sans-serif; letter-spacing: 3px; color: #fff; text-transform: uppercase; text-shadow: 0 1px 2px #000; }
    .cnt { position: absolute; right: 12px; top: 10px; font: 600 11px/1 Inter, system-ui, sans-serif; letter-spacing: 1px; color: rgba(255,255,255,.75); font-variant-numeric: tabular-nums; }
    .flash { position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none; }
    .hud.paid .flash { animation: flash .5s ease-out; }
    @keyframes flash { 0% { opacity: .7; } 100% { opacity: 0; } }
  `,
  html: `
    <div class="hud">
      <span class="flash" aria-hidden="true"></span>
      <span class="cnt"><span class="n">0</span> RESPECTS</span>
      <div class="prompt">
        <button class="key" type="button" aria-label="Hold F to pay respects">
          <svg class="ring" viewBox="0 0 62 62" aria-hidden="true"><circle class="bg" cx="31" cy="31" r="29"/><circle class="fg" cx="31" cy="31" r="29"/></svg>
          <span class="cap" aria-hidden="true">F</span>
        </button>
        <span class="lbl">Pay respects</span>
      </div>
    </div>`,
  init(root) {
    const hud = root.querySelector('.hud'), key = root.querySelector('.key'), n = root.querySelector('.n'), lbl = root.querySelector('.lbl');
    let t = 0, c = 0;
    const start = () => { if (t) return; key.classList.add('hold'); t = setTimeout(() => { t = 0; c++; n.textContent = String(c); key.classList.remove('hold'); hud.classList.remove('paid'); void hud.offsetWidth; hud.classList.add('paid'); lbl.textContent = 'Respects paid'; }, 1100); };
    const stop = () => { clearTimeout(t); t = 0; key.classList.remove('hold'); };
    key.addEventListener('pointerdown', (e) => { e.preventDefault(); key.focus(); start(); });
    key.addEventListener('pointerup', stop); key.addEventListener('pointerleave', stop); key.addEventListener('pointercancel', stop);
    key.addEventListener('keydown', (e) => { if ((e.key === 'f' || e.key === 'F' || e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start(); } });
    key.addEventListener('keyup', (e) => { if (e.key === 'f' || e.key === 'F' || e.key === ' ' || e.key === 'Enter') stop(); });
    key.addEventListener('blur', stop);
    key.addEventListener('click', (e) => e.preventDefault());
    return () => clearTimeout(t);
  },
};
