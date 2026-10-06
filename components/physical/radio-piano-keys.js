// 1950s German valve radio piano keys (Telefunken / Grundig style): ivory keys set in a polished
// walnut-bakelite cabinet with a chrome trim strip. Legends as on the sets: Aus · TA · L · M · K · UKW.
// One key latches down at a time; pressing "Aus" (off) releases everything.
const KEYS = [['Aus', 'Off'], ['TA', 'Phono'], ['L', 'Long wave'], ['M', 'Medium wave'], ['K', 'Short wave'], ['UKW', 'FM']];

export default {
  id: 'ph-radio-piano-keys',
  credit: '1950s Telefunken-style radio piano keys — Aus · TA · L · M · K · UKW; one latches down, Aus releases them all',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 16px 16px; border-radius: 12px;
      background:
        linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,0) 35%),
        repeating-linear-gradient(97deg, rgba(0,0,0,.08) 0 2px, transparent 2px 7px, rgba(255,200,150,.05) 7px 9px, transparent 9px 13px),
        linear-gradient(160deg, #6e3b1f, #4a2412 60%, #3a1a0c);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.2), inset 0 -2px 4px rgba(0,0,0,.4); }
    .trim { height: 5px; margin: 0 -2px 5px; border-radius: 2px; background: linear-gradient(#ffffff, #b8bcc0 45%, #eef0f2 55%, #7e8388); box-shadow: 0 1px 2px rgba(0,0,0,.6); }
    .row { display: flex; gap: 3px; padding: 3px 3px 10px; border-radius: 2px; background: #1a0c05; box-shadow: inset 0 3px 6px rgba(0,0,0,.95); }
    .k {
      position: relative; width: 30px; height: 50px; border: 0; padding: 0; border-radius: 2px 2px 3px 3px; cursor: pointer;
      background: linear-gradient(90deg, rgba(0,0,0,.06), transparent 15%, transparent 85%, rgba(0,0,0,.08)), linear-gradient(#fffaf0 0%, #f4ecd8 55%, #e6dbc0 100%);
      box-shadow: inset 0 1px 0 #fff, 0 9px 0 #cdbf9c, 0 10px 0 #9c8e6c, 0 12px 5px rgba(0,0,0,.6);
      font: 600 8.5px/1 "Roboto Flex", Inter, Arial, sans-serif; font-variation-settings: "wdth" 85; color: #5a4a2c; letter-spacing: .2px;
      display: flex; align-items: flex-end; justify-content: center; padding-bottom: 6px;
      transition: transform .16s cubic-bezier(.3,1.7,.5,1), box-shadow .16s cubic-bezier(.3,1.7,.5,1), background .1s; -webkit-tap-highlight-color: transparent;
    }
    .k::before { content: ''; position: absolute; left: 3px; right: 3px; top: 3px; height: 14px; border-radius: 2px; background: linear-gradient(rgba(255,255,255,.75), rgba(255,255,255,0)); pointer-events: none; }
    .k span { text-shadow: 0 1px 0 rgba(255,255,255,.8); }
    .k:hover { background: linear-gradient(90deg, rgba(0,0,0,.05), transparent 15%, transparent 85%, rgba(0,0,0,.07)), linear-gradient(#fffdf6 0%, #f8f1df 55%, #ebe1c8 100%); }
    .k[aria-checked="true"] { transform: translateY(7px); box-shadow: inset 0 1px 0 #fff, 0 2px 0 #cdbf9c, 0 3px 0 #9c8e6c, 0 4px 3px rgba(0,0,0,.6);
      background: linear-gradient(90deg, rgba(0,0,0,.08), transparent 15%, transparent 85%, rgba(0,0,0,.1)), linear-gradient(#f1e8d2 0%, #e6dbc0 55%, #d8cbab 100%); }
    .k:active { transform: translateY(8px); box-shadow: inset 0 1px 0 #fff, 0 1px 0 #cdbf9c, 0 2px 0 #9c8e6c, 0 3px 2px rgba(0,0,0,.6); transition-duration: .04s; }
    .k:focus-visible { outline: 2px solid #ffd27a; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="trim"></div>
      <div class="row" role="radiogroup" aria-label="Band selector">
        ${KEYS.map(([t, n], i) => `<button class="k" type="button" role="radio" aria-checked="${i === 4}" aria-label="${n}" tabindex="${i === 4 ? 0 : -1}"><span>${t}</span></button>`).join('')}
      </div>
    </div>`,
  init(root) {
    const keys = [...root.querySelectorAll('.k')];
    const pick = (k) => {
      const off = k === keys[0];
      keys.forEach((o) => { o.setAttribute('aria-checked', !off && o === k); o.tabIndex = o === k ? 0 : -1; });
    };
    keys.forEach((k, i) => {
      k.addEventListener('click', () => pick(k));
      k.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return; e.preventDefault(); const n = keys[(i + d + keys.length) % keys.length]; n.focus(); pick(n);
      });
    });
  },
};
