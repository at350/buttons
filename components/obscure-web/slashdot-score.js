// Slashdot c. 2005 (from a web.archive.org capture): #006666 story bar with white bold Arial title,
// Times body text, #006666 underlined links, the grey comment header "Re:… (Score:5, Funny)" with
// "by Anonymous Coward on … (#14352361)", and the moderation <select> + Moderate button that moves the score.
export default {
  id: 'ob-slashdot-score',
  credit: 'Slashdot (2005) — a comment at (Score:5, Funny): pick a moderation from the dropdown and hit Moderate to move the score',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sd { width: 360px; max-width: 100%; background: #fff; border-radius: 12px; overflow: hidden; font: 13px/1.3 "Times New Roman", Times, serif; color: #000; padding-bottom: 10px; }
    .story { background: #006666; color: #fff; font: 700 15px/1.25 Arial, Helvetica, sans-serif; padding: 5px 10px; }
    .story u { text-decoration: underline; }
    .c { margin: 8px 10px 0; }
    .hd { background: #e1e1e1; padding: 3px 6px; }
    .hd b { font-weight: 700; }
    .by { font-size: 12px; }
    a { color: #006666; text-decoration: underline; cursor: pointer; }
    a:focus-visible, select:focus-visible, .mod:focus-visible { outline: 1px dotted #000; outline-offset: 1px; }
    .bd { padding: 6px 6px 4px; font-size: 14px; }
    .rt { padding: 0 6px; font-size: 12px; white-space: nowrap; }
    .mods { display: flex; align-items: center; gap: 6px; margin: 8px 10px 0; font: 12px Arial, Helvetica, sans-serif; }
    select { font: 12px Arial, Helvetica, sans-serif; height: 21px; color: #000; background: #fff; border: 1px solid #767676; border-radius: 2px; }
    .mod { height: 21px; padding: 0 8px; font: 12px Arial, Helvetica, sans-serif; color: #000; background: #efefef; border: 1px solid #767676; border-radius: 3px; cursor: pointer; }
    .mod:hover { background: #e5e5e5; }
    .mod:active { background: #f5f5f5; }
    .sc { font-variant-numeric: tabular-nums; }
    .hd.flash { animation: fl .6s ease-out; }
    @keyframes fl { from { background: #ffff99; } }
  `,
  html: `
    <div class="sd">
      <div class="story"><u>Hardware</u>: An Endless Page of Buttons</div>
      <div class="c">
        <div class="hd"><b>Re:In Soviet Russia...</b> (<b>Score:<span class="sc">5</span>, <span class="m">Funny</span></b>)<div class="by">by <a href="#">Anonymous Coward</a> on Wednesday December 28, @09:12PM (<a href="#">#14352361</a>)</div></div>
        <div class="bd">...button presses YOU! Also, imagine a Beowulf cluster of these.</div>
        <div class="rt">[ <a href="#">Reply to This</a> | <a href="#">Parent</a> ]</div>
      </div>
      <div class="mods">
        <select aria-label="Moderation">
          <option>Normal</option><option>Offtopic</option><option>Flamebait</option><option>Troll</option><option>Redundant</option>
          <option>Insightful</option><option>Interesting</option><option>Informative</option><option>Funny</option><option>Overrated</option><option>Underrated</option>
        </select>
        <button class="mod" type="button">Moderate</button>
      </div>
    </div>`,
  init(root) {
    const sel = root.querySelector('select'), mod = root.querySelector('.mod'), sc = root.querySelector('.sc'), m = root.querySelector('.m'), hd = root.querySelector('.hd');
    const down = ['Offtopic', 'Flamebait', 'Troll', 'Redundant', 'Overrated'];
    let score = 5, reason = 'Funny';
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    mod.addEventListener('click', () => {
      const v = sel.value;
      if (v === 'Normal') { score = 5; reason = 'Funny'; }
      else if (down.includes(v)) { score = Math.max(-1, score - 1); if (v !== 'Overrated') reason = v; }
      else { score = Math.min(5, score + 1); if (v !== 'Underrated') reason = v; }
      sc.textContent = String(score); m.textContent = reason;
      hd.classList.remove('flash'); void hd.offsetWidth; hd.classList.add('flash');
    });
  },
};
