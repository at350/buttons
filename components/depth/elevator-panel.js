export default {
  id: 'dp-elevator-panel',
  credit: 'Elevator car panel — brushed steel plate in perspective, round bezelled floor buttons sink in and stay lit until you arrive',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 44px 30px 30px; perspective: 900px; background: #3f3f46; border-radius: 12px; }
    .panel {
      display: grid; grid-template-columns: repeat(2, 56px); gap: 14px; padding: 18px; border-radius: 8px;
      background: repeating-linear-gradient(90deg, #c8c8cc 0 1px, #dcdce0 1px 3px, #d2d2d6 3px 4px);
      box-shadow: 0 14px 22px -6px rgba(0, 0, 0, .55), inset 0 0 0 1px rgba(0, 0, 0, .2), inset 0 1px 0 rgba(255, 255, 255, .6);
      transform-style: preserve-3d; transform: rotateY(-16deg) rotateX(4deg); transition: transform .5s;
    }
    .panel:hover { transform: rotateY(-8deg) rotateX(2deg); }
    .fl {
      position: relative; width: 56px; height: 56px; border-radius: 50%; border: 0; cursor: pointer; padding: 0;
      background: radial-gradient(circle at 50% 40%, #e4e4e7, #a1a1aa 70%, #52525b 100%);
      box-shadow: inset 0 3px 5px rgba(255, 255, 255, .7), inset 0 -3px 6px rgba(0, 0, 0, .35), 0 3px 4px rgba(0, 0, 0, .35);
      transform-style: preserve-3d; transform: translateZ(8px); transition: transform .15s, box-shadow .15s;
    }
    .fl::before {
      content: attr(data-f); position: absolute; inset: 7px; border-radius: 50%; display: grid; place-items: center;
      background: radial-gradient(circle at 50% 35%, #27272a, #09090b); color: #a1a1aa;
      font: 700 18px/1 'JetBrains Mono', ui-monospace, monospace; transform: translateZ(2px);
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, .08), 0 0 0 0 rgba(251, 191, 36, 0); transition: box-shadow .3s, color .3s, background .3s;
    }
    .fl:hover { transform: translateZ(12px); }
    .fl:active { transform: translateZ(1px); box-shadow: inset 0 1px 2px rgba(255, 255, 255, .4), inset 0 -1px 2px rgba(0, 0, 0, .3), 0 1px 1px rgba(0, 0, 0, .3); }
    .fl[aria-pressed="true"]::before { color: #fff; background: radial-gradient(circle at 50% 35%, #fbbf24, #d97706); box-shadow: inset 0 0 0 2px rgba(255, 255, 255, .25), 0 0 16px 4px rgba(251, 191, 36, .55); }
    .fl:focus-visible { outline: 2px solid #fbbf24; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="panel" role="group">
        <button class="fl" type="button" aria-pressed="false" data-f="3" aria-label="Floor 3"></button>
        <button class="fl" type="button" aria-pressed="false" data-f="4" aria-label="Floor 4"></button>
        <button class="fl" type="button" aria-pressed="false" data-f="1" aria-label="Floor 1"></button>
        <button class="fl" type="button" aria-pressed="false" data-f="2" aria-label="Floor 2"></button>
      </div>
    </div>`,
  init(root) {
    const timers = new Map();
    root.querySelectorAll('.fl').forEach((b) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      clearTimeout(timers.get(b));
      if (on) timers.set(b, setTimeout(() => b.setAttribute('aria-pressed', 'false'), 6000));
    }));
    return () => timers.forEach((t) => clearTimeout(t));
  },
};
