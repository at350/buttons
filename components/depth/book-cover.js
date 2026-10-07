export default {
  id: 'dp-book-cover',
  credit: 'Hardcover book — The Great Gatsby (Scribner, 1925; Francis Cugat jacket): the cover swings open on rotateY around its spine to the title page',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 26px 99px 30px 99px;
      perspective: 1100px;
      background: #efe7d6;
      border-radius: 12px;
    }
    .book {
      position: relative;
      width: 112px;
      height: 158px;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: rotateY(-18deg);
      transition: transform .7s cubic-bezier(.3, 1, .4, 1);
    }
    .book:hover { transform: rotateY(-26deg) translateZ(6px); }
    .book[aria-expanded="true"] { transform: translateX(56px) rotateY(-10deg); }
    .pages {
      position: absolute;
      inset: 3px 2px 3px 0;
      background: linear-gradient(90deg, rgba(0, 0, 0, .1), transparent 12%), #fbf7ec;
      transform: translateZ(0);
      border-radius: 0 3px 3px 0;
      box-shadow: inset -2px 0 4px rgba(0, 0, 0, .1), 1px 0 0 #e8e1cf, 2px 0 0 #d9d0bb;
      display: flex; flex-direction: column; align-items: center; padding: 30px 8px 12px; color: #2b2620; text-align: center;
    }
    .back {
      position: absolute;
      inset: 0;
      background: #173d4b;
      border-radius: 2px 6px 6px 2px;
      transform: translateZ(-8px);
      box-shadow: 0 12px 20px -4px rgba(0, 0, 0, .3);
    }
    .spine {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 16px;
      background: linear-gradient(90deg, #12313d, #1f4e5f 50%, #12313d);
      transform-origin: left;
      transform: rotateY(-90deg) translateZ(0);
    }
    .cover {
      position: absolute;
      inset: 0;
      border-radius: 2px 6px 6px 2px;
      transform-origin: left;
      transform: translateZ(8px) rotateY(0deg);
      background: #1f4e5f url(assets/real/book-great-gatsby.jpg) 62% 42% / 109% auto no-repeat;
      transition: transform 1s cubic-bezier(.3, 1, .4, 1);
      transform-style: preserve-3d;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .2), inset 7px 0 8px -3px rgba(0, 0, 0, .45), inset 9px 0 0 -8px rgba(255, 255, 255, .25);
    }
    .cover::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(120% 90% at 100% 50%, #f6efdc, #ece2c8);
      box-shadow: inset 0 0 0 4px #1f4e5f;
      transform: rotateY(180deg) translateZ(1px);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    .book[aria-expanded="true"] .cover { transform: translateZ(8px) rotateY(-160deg); }
    .tp1 { font: 600 11px/1.15 'Fraunces', Georgia, serif; letter-spacing: .08em; }
    .tp1 i { display: block; width: 24px; height: 1px; margin: 9px auto; background: #2b2620; opacity: .6; }
    .tp2 { font: 500 6.5px/1 'Fraunces', Georgia, serif; letter-spacing: .14em; }
    .tp3 { margin-top: auto; font: 500 5px/1.5 'Fraunces', Georgia, serif; letter-spacing: .12em; opacity: .75; }
    .book:focus-visible { outline: 0; }
    .book:focus-visible .cover { box-shadow: inset 0 0 0 2px #fde68a; }
  `,
  html: `
    <div class="stage">
      <button class="book" type="button" aria-expanded="false" aria-label="Open The Great Gatsby">
        <span class="back"></span><span class="spine"></span><span class="pages" aria-hidden="true"><span class="tp1">THE GREAT<br>GATSBY<i></i></span><span class="tp2">F. SCOTT FITZGERALD</span><span class="tp3">CHARLES SCRIBNER’S SONS<br>NEW YORK · 1925</span></span>
        <span class="cover"></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.book');
    b.addEventListener('click', () => b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true')));
  },
};
