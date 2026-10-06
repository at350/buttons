export default {
  id: 'dp-ribbon-unfurl',
  credit: 'Satin ribbon banner — hover unrolls three hinged rotateX segments downward in sequence ending in a forked tail; click pins it open',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      width: 160px;
      height: 196px;
      padding: 10px 30px;
      perspective: 700px;
      background: #fdf2f8;
      border-radius: 12px;
    }
    .ribbon { position: relative; }
    .tab {
      width: 100px;
      height: 40px;
      border: 0;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: #fff;
      background: linear-gradient(180deg, #e11d48, #be123c);
      font: 800 14px/1 'Syne', system-ui, sans-serif;
      letter-spacing: .14em;
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, .25), inset 0 0 0 4px #be123c, 0 8px 18px rgba(190, 18, 60, .35);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);
    }
    .tab:focus-visible { outline: 0; box-shadow: inset 0 0 0 2px #fff, inset 0 0 0 4px #be123c; }
    .seg {
      width: 100px;
      transform-style: preserve-3d;
      transform-origin: top;
      transform: rotateX(-90deg);
      visibility: hidden;
      transition: transform .5s cubic-bezier(.3, 1, .4, 1), visibility 0s linear .5s;
    }
    .seg { transition-delay: .24s, .74s; }
    .seg .seg { transition-delay: .12s, .62s; }
    .seg .seg .seg { transition-delay: 0s, .5s; }
    .ribbon:hover .seg, .ribbon.pin .seg { transform: rotateX(0deg); visibility: visible; transition: transform .5s cubic-bezier(.3, 1, .4, 1), visibility 0s; transition-delay: 0s, 0s; }
    .ribbon:hover .seg .seg, .ribbon.pin .seg .seg { transition-delay: .14s, 0s; }
    .ribbon:hover .seg .seg .seg, .ribbon.pin .seg .seg .seg { transition-delay: .28s, 0s; }
    .face {
      position: relative;
      height: 40px;
      display: grid;
      place-items: center;
      color: #fecdd3;
      background: linear-gradient(90deg, #be123c, #f43f5e 50%, #be123c);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 6px 12px rgba(0, 0, 0, .18);
    }
    /* satin shading: a segment is dark while it is still rolled under, and brightens as it hangs flat */
    .face::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(60, 0, 20, .7), rgba(60, 0, 20, .25)); opacity: 1; transition: opacity .5s; }
    .tail::after { clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%); }
    .ribbon:hover .face::after, .ribbon.pin .face::after { opacity: 0; }
    .ribbon:hover .seg .seg .face::after, .ribbon.pin .seg .seg .face::after { transition-delay: .14s; }
    .ribbon:hover .seg .seg .seg .face::after, .ribbon.pin .seg .seg .seg .face::after { transition-delay: .28s; }
    .roll {
      position: absolute; left: 0; top: 38px; width: 100px; height: 12px; border-radius: 0 0 6px 6px;
      background: linear-gradient(180deg, #7f1030, #e11d48 45%, #fb7185 60%, #9f1239);
      box-shadow: 0 4px 8px rgba(159, 18, 57, .3); transition: opacity .2s, transform .3s;
    }
    .ribbon:hover .roll, .ribbon.pin .roll { opacity: 0; transform: scaleY(.3); }
    .face svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
    .tail {
      height: 48px;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%);
      background: linear-gradient(90deg, #9f1239, #e11d48 50%, #9f1239);
      color: #fff;
      font: 800 15px/1 'Syne', system-ui, sans-serif;
      letter-spacing: .04em;
      padding-bottom: 10px;
    }
  `,
  html: `
    <div class="stage">
      <div class="ribbon">
        <button class="tab" type="button" aria-pressed="false">NEW</button><span class="roll" aria-hidden="true"></span>
        <div class="seg"><div class="face"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg></div>
          <div class="seg"><div class="face"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg></div>
            <div class="seg"><div class="face tail">−30%</div></div>
          </div>
        </div>
      </div>
    </div>`,
  init(root) {
    const r = root.querySelector('.ribbon'), t = root.querySelector('.tab');
    t.addEventListener('click', () => {
      const on = !r.classList.contains('pin');
      r.classList.toggle('pin', on); t.setAttribute('aria-pressed', String(on));
    });
  },
};
