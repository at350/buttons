// fullPage.js v4 navigation bullets (#fp-nav, right side) with navigationTooltips + showActiveTooltip.
const sections = [['firstPage', 'First', '#f2f2f2'], ['secondPage', 'Second', '#4BBFC3'], ['thirdPage', 'Third', '#7BAABE'], ['fourthPage', 'Fourth', 'whitesmoke'], ['lastPage', 'Last', '#ccddff']];
export default {
  id: 'mn-scrollspy-dots',
  credit: 'fullPage.js — #fp-nav section bullets with tooltips (700ms "ease" section scroll, 4px→12px active dot)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .vp { position: relative; width: 300px; height: 190px; border-radius: 12px; overflow: hidden; background: #f2f2f2; font: 14px/1 Arial, Helvetica, sans-serif; outline: 0; }
    .vp:focus-visible { box-shadow: inset 0 0 0 2px #333; }
    .wrap { position: absolute; inset: 0; transition: transform 700ms ease; }
    .sec { height: 190px; }
    #fp-nav { position: absolute; z-index: 2; right: 17px; top: 50%; transform: translateY(-50%); opacity: 1; }
    ul { margin: 0; padding: 0; list-style: none; }
    li { display: block; width: 14px; height: 13px; margin: 7px; position: relative; }
    a { display: block; width: 100%; height: 100%; position: relative; z-index: 1; cursor: pointer; text-decoration: none; border-radius: 50%; outline: 0; }
    a:focus-visible { box-shadow: 0 0 0 2px #333; }
    a span { border-radius: 50%; position: absolute; z-index: 1; height: 4px; width: 4px; border: 0; background: #333; left: 50%; top: 50%; margin: -2px 0 0 -2px; transition: all .1s ease-in-out; }
    li:hover a span { width: 10px; height: 10px; margin: -5px 0 0 -5px; }
    a.active span, li:hover a.active span { height: 12px; width: 12px; margin: -6px 0 0 -6px; border-radius: 100%; }
    .fp-tooltip { position: absolute; top: -2px; right: 20px; color: #333; font-size: 14px; font-family: arial, helvetica, sans-serif; white-space: nowrap; max-width: 220px; overflow: hidden; display: block; opacity: 0; width: 0; cursor: pointer; transition: opacity .2s; }
    li:hover .fp-tooltip, .fp-show-active a.active + .fp-tooltip { transition: opacity .2s ease-in; width: auto; opacity: 1; }
  `,
  html: `
    <div class="vp" tabindex="0" aria-label="Sections">
      <div class="wrap">${sections.map(([, , c]) => `<div class="sec" style="background:${c}"></div>`).join('')}</div>
      <div id="fp-nav" class="fp-show-active"><ul>${sections.map(([a, t], i) => `<li><a href="#${a}" class="${i === 0 ? 'active' : ''}" aria-label="${t}"${i === 0 ? ' aria-current="true"' : ''}><span></span></a><div class="fp-tooltip">${t}</div></li>`).join('')}</ul></div>
    </div>`,
  init(root) {
    const vp = root.querySelector('.vp'), wrap = root.querySelector('.wrap');
    const links = [...root.querySelectorAll('#fp-nav a')];
    let cur = 0;
    const go = (i) => {
      cur = Math.max(0, Math.min(links.length - 1, i));
      links.forEach((a, j) => { a.classList.toggle('active', j === cur); if (j === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      wrap.style.transform = `translate3d(0, ${-cur * 190}px, 0)`;
    };
    links.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); go(i); }));
    root.querySelectorAll('.fp-tooltip').forEach((t, i) => t.addEventListener('click', () => go(i)));
    vp.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); go(cur + 1); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); go(cur - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(links.length - 1); }
    });
  },
};
