export default {
  id: 'ks-starbucks-size',
  credit: 'Starbucks ordering screen — Short / Tall / Grande / Venti cup selector; the chosen cup sits in a green ring and the price follows',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px; border-radius: 12px; background: #1e3932; }
    .scr { width: 292px; padding: 14px 12px 12px; border-radius: 8px; background: #fff; font-family: Inter, system-ui, sans-serif; color: rgba(0,0,0,.87); }
    .top { display: flex; justify-content: space-between; align-items: baseline; padding: 0 4px 10px; }
    .top b { font-size: 15px; font-weight: 700; }
    .top span { font-size: 14px; font-weight: 600; color: #00754a; font-variant-numeric: tabular-nums; }
    .row { display: grid; grid-template-columns: repeat(4, 1fr); align-items: end; }
    .s { display: flex; flex-direction: column; align-items: center; gap: 6px; border: 0; padding: 4px 0; background: none; cursor: pointer; font: inherit; color: inherit; border-radius: 8px; -webkit-tap-highlight-color: transparent; }
    .s:focus-visible { outline: 2px solid #00754a; outline-offset: 1px; }
    .ring { width: 58px; height: 64px; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 6px; border-radius: 50%; transition: box-shadow .2s, background .2s; }
    .s svg { fill: #fff; stroke: #888; stroke-width: 1.4; transition: stroke .2s, fill .2s, transform .2s cubic-bezier(.3,1.5,.5,1); }
    .s:hover svg { transform: translateY(-2px); }
    .s:hover .ring { background: #f2f0eb; }
    .s[aria-checked="true"]:hover .ring { background: #d4e9e2; }
    .s:hover b { color: #00754a; }
    .s:active svg { transform: scale(.94); }
    .s[aria-checked="true"] .ring { background: #d4e9e2; box-shadow: inset 0 0 0 2px #00754a; }
    .s[aria-checked="true"] svg { stroke: #00754a; fill: #fff; }
    .s b { font-size: 13px; font-weight: 600; }
    .s small { font-size: 11px; color: rgba(0,0,0,.58); }
    .s[aria-checked="true"] b { color: #00754a; }
    .add { margin-top: 12px; width: 100%; height: 40px; border: 0; border-radius: 50px; background: #00754a; color: #fff; font: 600 14px/1 Inter, sans-serif; cursor: pointer; transition: background .15s, transform .1s; }
    .add:hover { background: #006241; } .add:active { transform: scale(.98); }
    .add:focus-visible { outline: 2px solid #00754a; outline-offset: 2px; }
    .add.done { background: #1e3932; }
  `,
  html: `
    <div class="stage"><div class="scr">
      <div class="top"><b>Caffè Latte</b><span>$4.95</span></div>
      <div class="row" role="radiogroup" aria-label="Size"></div>
      <button class="add" type="button">Add to order</button>
    </div></div>`,
  init(root) {
    const row = root.querySelector('.row'), price = root.querySelector('.top span'), add = root.querySelector('.add');
    const sizes = [['Short', 8, 3.95, 22], ['Tall', 12, 4.45, 28], ['Grande', 16, 4.95, 34], ['Venti', 20, 5.45, 40]];
    const btns = sizes.map(([name, oz, p, h], i) => {
      const w = h * 0.72;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 's'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', String(i === 2));
      b.innerHTML = `<span class="ring"><svg width="${w + 4}" height="${h + 4}" viewBox="-2 -2 ${w + 4} ${h + 4}" aria-hidden="true"><path d="M${w * .12} ${h * .2} L${w * .2} ${h} H${w * .8} L${w * .88} ${h * .2} Z"/><path d="M0 ${h * .2} H${w} V${h * .1} Q${w} 0 ${w * .8} 0 H${w * .2} Q0 0 0 ${h * .1} Z"/><path d="M${w * .16} ${h * .45} H${w * .84} L${w * .79} ${h * .72} H${w * .21} Z"/></svg></span><b>${name}</b><small>${oz} fl oz</small>`;
      b.addEventListener('click', () => { btns.forEach((x) => x.setAttribute('aria-checked', String(x === b))); price.textContent = '$' + p.toFixed(2); add.classList.remove('done'); add.textContent = 'Add to order'; });
      row.appendChild(b); return b;
    });
    add.addEventListener('click', () => { const on = !add.classList.contains('done'); add.classList.toggle('done', on); add.textContent = on ? 'Added' : 'Add to order'; });
  },
};
