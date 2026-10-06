export default {
  id: 'dp-book-cover',
  credit: 'Hardcover book — the cover swings open on rotateY around its spine, pages and a thick board revealed beneath',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 26px 40px 30px 150px;
      perspective: 1100px;
      background: #efe7d6;
      border-radius: 12px;
    }
    .book {
      position: relative;
      width: 110px;
      height: 150px;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: rotateY(-18deg);
      transition: transform .7s cubic-bezier(.3, 1, .4, 1);
    }
    .book:hover { transform: rotateY(-26deg) translateZ(6px); }
    .book[aria-expanded="true"] { transform: rotateY(-10deg); }
    .pages {
      position: absolute;
      inset: 3px 2px 3px 0;
      background: repeating-linear-gradient(180deg, #fffdf5 0 2px, #e8e1cf 2px 3px);
      transform: translateZ(0);
      border-radius: 0 3px 3px 0;
      box-shadow: inset -2px 0 4px rgba(0, 0, 0, .1);
    }
    .back {
      position: absolute;
      inset: 0;
      background: #7c2d12;
      border-radius: 2px 6px 6px 2px;
      transform: translateZ(-8px);
      box-shadow: 0 14px 30px rgba(0, 0, 0, .3);
    }
    .spine {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 16px;
      background: #5c1f0a;
      transform-origin: left;
      transform: rotateY(-90deg) translateZ(0);
    }
    .cover {
      position: absolute;
      inset: 0;
      border-radius: 2px 6px 6px 2px;
      transform-origin: left;
      transform: translateZ(8px) rotateY(0deg);
      background: linear-gradient(100deg, #9a3412, #c2410c 40%, #9a3412);
      color: #fde68a;
      transition: transform 1s cubic-bezier(.3, 1, .4, 1);
      transform-style: preserve-3d;
      display: grid;
      place-content: center;
      gap: 8px;
      text-align: center;
      font: 700 15px/1.1 'Fraunces', Georgia, serif;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 6px 0 10px rgba(0, 0, 0, .25);
    }
    .cover::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: #fff7e6;
      transform: rotateY(180deg) translateZ(1px);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
    .book[aria-expanded="true"] .cover { transform: translateZ(8px) rotateY(-160deg); }
    .cover i {
      display: block;
      width: 36px;
      height: 2px;
      background: #fde68a;
      margin: 0 auto;
    }
    .book:focus-visible { outline: 0; }
    .book:focus-visible .cover { box-shadow: inset 0 0 0 2px #fde68a; }
  `,
  html: `
    <div class="stage">
      <button class="book" type="button" aria-expanded="false" aria-label="Open book">
        <span class="back"></span><span class="spine"></span><span class="pages"></span>
        <span class="cover"><i></i><span>Depth</span><i></i></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.book');
    b.addEventListener('click', () => b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true')));
  },
};
