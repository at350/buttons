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
    .tab:focus-visible { outline: 2px solid #be123c; outline-offset: 3px; }
    .seg {
      width: 100px;
      transform-style: preserve-3d;
      transform-origin: top;
      transform: rotateX(-90deg);
      visibility: hidden;
      transition: transform .5s cubic-bezier(.3, 1, .4, 1), visibility 0s linear .5s;
    }
    .seg .seg { transition-delay: .14s, .64s; }
    .seg .seg .seg { transition-delay: .28s, .78s; }
    .ribbon:hover .seg, .ribbon.pin .seg { transform: rotateX(0deg); visibility: visible; transition: transform .5s cubic-bezier(.3, 1, .4, 1), visibility 0s; }
    .ribbon:hover .seg .seg, .ribbon.pin .seg .seg { transition-delay: .14s, 0s; }
    .ribbon:hover .seg .seg .seg, .ribbon.pin .seg .seg .seg { transition-delay: .28s, 0s; }
    .face {
      height: 40px;
      display: grid;
      place-items: center;
      color: #fecdd3;
      background: linear-gradient(90deg, #be123c, #f43f5e 50%, #be123c);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .25), 0 6px 12px rgba(0, 0, 0, .18);
    }
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
        <button class="tab" type="button" aria-pressed="false">NEW</button>
        <div class="seg"><div class="face"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg></div>
          <div class="seg"><div class="face"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg></div>
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
