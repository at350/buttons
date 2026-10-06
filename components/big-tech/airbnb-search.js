// Airbnb search bar: the rausch search button grows into "Search" while the bar is active.
// The bar has a fixed width; the "Where" field gives up exactly the room the button takes, so the box never changes.
export default {
  id: 'bt-airbnb-search',
  credit: 'Airbnb — search bar with the rausch "Search" button that expands to show its label',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .bar {
      display: flex; align-items: center; width: 300px; max-width: 100%; height: 66px; padding: 0 8px 0 0; border-radius: 33px;
      background: #fff; border: 1px solid #dddddd; box-shadow: 0 3px 12px rgba(0,0,0,.1);
      font-family: "Airbnb Cereal VF", Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
      transition: background .2s;
    }
    .bar.active { background: #ebebeb; }
    .where {
      flex: 1 1 auto; min-width: 0; height: 64px; padding: 14px 0 0 32px; border-radius: 32px; cursor: pointer; outline: none;
      display: flex; flex-direction: column; gap: 2px; white-space: nowrap; overflow: hidden; transition: background .2s, box-shadow .2s;
    }
    .bar:not(.active) .where:hover { background: #ebebeb; }
    .where:focus-visible { box-shadow: inset 0 0 0 2px #222; }
    .bar.active .where { background: #fff; box-shadow: 0 6px 20px rgba(0,0,0,.2); }
    .t { font-size: 12px; line-height: 16px; font-weight: 600; color: #222; }
    .v { font-size: 14px; line-height: 18px; color: #6a6a6a; overflow: hidden; text-overflow: ellipsis; }
    .sb {
      flex: none; height: 48px; min-width: 48px; padding: 0 16px; margin-left: 8px; border: 0; border-radius: 24px;
      color: #fff; cursor: pointer; background: #ff385c;
      font-family: inherit; font-size: 16px; font-weight: 600; line-height: 20px;
      display: inline-flex; align-items: center; justify-content: center; overflow: hidden;
      transition: padding .2s cubic-bezier(.2,0,0,1), background .2s, transform .1s; -webkit-tap-highlight-color: transparent;
    }
    .sb:hover { background: #e00b41; }
    .sb:active { transform: scale(.96); }
    .sb:focus-visible { outline: 2px solid #222; outline-offset: 2px; }
    .sb svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 4; overflow: visible; flex: none; }
    .lbl { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; opacity: 0; transition: max-width .2s cubic-bezier(.2,0,0,1), opacity .15s, margin .2s; }
    .bar.active .sb { padding: 0 20px 0 16px; }
    .bar.active .lbl { max-width: 70px; margin-left: 8px; opacity: 1; }
  `,
  html: `
    <div class="bar">
      <div class="where" role="button" tabindex="0" aria-pressed="false">
        <span class="t">Where</span>
        <span class="v">Search destinations</span>
      </div>
      <button class="sb" type="button" aria-label="Search">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"/></svg>
        <span class="lbl">Search</span>
      </button>
    </div>`,
  init(root) {
    const bar = root.querySelector('.bar');
    const where = root.querySelector('.where');
    const v = root.querySelector('.v');
    const sb = root.querySelector('.sb');
    const set = (on) => { bar.classList.toggle('active', on); where.setAttribute('aria-pressed', on); };
    where.addEventListener('click', () => set(!bar.classList.contains('active')));
    where.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); where.click(); } });
    sb.addEventListener('click', () => {
      if (!bar.classList.contains('active')) { set(true); return; }
      v.textContent = v.textContent === 'Search destinations' ? 'Lisbon, Portugal' : 'Search destinations';
      set(false);
    });
  },
};
