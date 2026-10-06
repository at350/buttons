export default {
  id: 'dp-fold-menu',
  credit: 'Folding paper menu — nested rotateX panels unfold top-down like a road map (Codrops "3D folding" lineage)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 200px; height: 236px; padding: 14px 20px; perspective: 900px; }
    .trigger {
      width: 160px; height: 40px; border: 0; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; padding: 0 14px;
      background: #0f172a; color: #fff; font: 600 14px/1 'Inter', system-ui, sans-serif;
    }
    .trigger svg { width: 16px; height: 16px; transition: transform .4s; }
    .trigger[aria-expanded="true"] svg { transform: rotate(180deg); }
    .trigger:focus-visible { outline: 2px solid #0f172a; outline-offset: 2px; }
    .fold {
      width: 160px; transform-style: preserve-3d; transform-origin: top; transform: rotateX(-90deg); visibility: hidden;
      transition: transform .45s cubic-bezier(.3, 1, .4, 1), visibility 0s linear .45s;
    }
    .open .fold { transform: rotateX(0deg); visibility: visible; transition: transform .45s cubic-bezier(.3, 1, .4, 1), visibility 0s; }
    .fold .fold { transition-delay: .1s, .55s; } .fold .fold .fold { transition-delay: .2s, .65s; } .fold .fold .fold .fold { transition-delay: .3s, .75s; }
    .open .fold .fold { transition-delay: .12s, 0s; } .open .fold .fold .fold { transition-delay: .24s, 0s; } .open .fold .fold .fold .fold { transition-delay: .36s, 0s; }
    .item {
      width: 160px; height: 42px; border: 0; cursor: pointer; display: flex; align-items: center; padding: 0 14px; text-align: left;
      background: #f8fafc; color: #0f172a; font: 500 14px/1 'Inter', system-ui, sans-serif;
      box-shadow: inset 0 -1px 0 #e2e8f0, 0 6px 14px rgba(0, 0, 0, .12);
      transition: background .2s;
    }
    .item:hover { background: #c7d2fe; }
    .item[aria-current="true"] { background: #4f46e5; color: #fff; }
    .item:focus-visible { outline: 2px solid #4f46e5; outline-offset: -2px; }
    .fold .fold:last-child .item { border-radius: 0 0 10px 10px; }
  `,
  html: `
    <div class="stage">
      <div class="menu">
        <button class="trigger" type="button" aria-expanded="false"><span>Menu</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="fold"><button class="item" type="button" aria-current="true">Dashboard</button>
          <div class="fold"><button class="item" type="button" aria-current="false">Projects</button>
            <div class="fold"><button class="item" type="button" aria-current="false">Team</button>
              <div class="fold"><button class="item" type="button" aria-current="false">Settings</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  init(root) {
    const menu = root.querySelector('.menu'), t = root.querySelector('.trigger');
    const items = root.querySelectorAll('.item');
    items.forEach((it) => { it.tabIndex = -1; });
    t.addEventListener('click', () => {
      const o = !menu.classList.contains('open');
      menu.classList.toggle('open', o); t.setAttribute('aria-expanded', String(o));
      items.forEach((it) => { it.tabIndex = o ? 0 : -1; });
    });
    items.forEach((it) => it.addEventListener('click', () => {
      items.forEach((x) => x.setAttribute('aria-current', 'false'));
      it.setAttribute('aria-current', 'true');
    }));
  },
};
