export default {
  id: 'lb-material-you-group',
  credit: 'Material 3 Expressive — connected button group with dynamic color: pick a wallpaper seed and the group re-tints its primary / primary-container roles; the selected segment morphs to a full pill and grows a Material Symbols check',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { --p: #6750a4; --onp: #fff; --pc: #eaddff; --onpc: #21005d; --sf: #fef7ff; --out: #cac4d0; display: inline-flex; flex-direction: column; gap: 16px; align-items: center; padding: 20px 24px; border-radius: 12px; background: var(--sf); transition: background .4s; font: 500 14px/20px "Roboto Flex", Roboto, Inter, system-ui, sans-serif; letter-spacing: .1px; }
    .seeds { display: flex; gap: 12px; }
    .seed { width: 28px; height: 28px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: var(--s); box-shadow: 0 0 0 2px var(--sf), 0 0 0 3px transparent; transition: transform .2s, box-shadow .2s; -webkit-tap-highlight-color: transparent; }
    .seed:hover { transform: scale(1.1); }
    .seed[aria-checked="true"] { box-shadow: 0 0 0 2px var(--sf), 0 0 0 4px var(--p); }
    .seed:focus-visible { outline: 2px solid var(--p); outline-offset: 3px; }
    .grp { display: inline-flex; gap: 2px; }
    .sg { height: 40px; padding: 0 20px; border: 0; cursor: pointer; font: inherit; letter-spacing: inherit; color: var(--onpc); background: var(--pc); border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; transition: border-radius .35s cubic-bezier(.2,0,0,1), background .3s, color .3s, transform .15s; -webkit-tap-highlight-color: transparent; }
    .sg:first-child { border-radius: 20px 8px 8px 20px; }
    .sg:last-child { border-radius: 8px 20px 20px 8px; }
    .sg { position: relative; overflow: hidden; }
    .sg::before { content: ''; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity .2s cubic-bezier(.2,0,0,1); pointer-events: none; }
    .sg:hover::before { opacity: .08; }
    .sg:active::before, .sg:focus-visible::before { opacity: .1; }
    .sg:active { transform: scale(.96); border-radius: 12px; }
    .sg:focus-visible { outline: 3px solid var(--p); outline-offset: 2px; }
    .sg[aria-checked="true"] { background: var(--p); color: var(--onp); border-radius: 20px; }
    .sg svg { position: relative; width: 18px; height: 18px; fill: currentColor; flex: none; }
    .sg .ck { display: grid; width: 0; overflow: hidden; margin-right: -8px; transition: width .35s cubic-bezier(.2,0,0,1), margin .35s cubic-bezier(.2,0,0,1); }
    .sg[aria-checked="true"] .ck { width: 18px; margin-right: 0; }
    .sg span { position: relative; }
  `,
  html: `
    <div class="stage">
      <div class="seeds" role="radiogroup" aria-label="Wallpaper color">
        <button class="seed" type="button" role="radio" aria-checked="true" style="--s:#6750a4" data-p="#6750a4" data-onp="#fff" data-pc="#eaddff" data-onpc="#21005d" data-sf="#fef7ff" aria-label="Purple"></button>
        <button class="seed" type="button" role="radio" aria-checked="false" style="--s:#0061a4" data-p="#0061a4" data-onp="#fff" data-pc="#d1e4ff" data-onpc="#001d36" data-sf="#f8f9ff" aria-label="Blue"></button>
        <button class="seed" type="button" role="radio" aria-checked="false" style="--s:#006e1c" data-p="#006e1c" data-onp="#fff" data-pc="#94f990" data-onpc="#002204" data-sf="#f6fbf2" aria-label="Green"></button>
        <button class="seed" type="button" role="radio" aria-checked="false" style="--s:#8b5000" data-p="#8b5000" data-onp="#fff" data-pc="#ffdcbe" data-onpc="#2c1600" data-sf="#fff8f5" aria-label="Orange"></button>
      </div>
      <div class="grp" role="radiogroup" aria-label="View">
        <button class="sg" type="button" role="radio" aria-checked="true"><span class="ck"><svg viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></span><span>Day</span></button>
        <button class="sg" type="button" role="radio" aria-checked="false"><span class="ck"><svg viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></span><span>Week</span></button>
        <button class="sg" type="button" role="radio" aria-checked="false"><span class="ck"><svg viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></span><span>Month</span></button>
      </div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), seeds = [...root.querySelectorAll('.seed')], segs = [...root.querySelectorAll('.sg')];
    seeds.forEach((s) => s.addEventListener('click', () => {
      seeds.forEach((x) => x.setAttribute('aria-checked', x === s));
      for (const k of ['p', 'onp', 'pc', 'onpc', 'sf']) st.style.setProperty('--' + k, s.dataset[k]);
    }));
    segs.forEach((b) => b.addEventListener('click', () => segs.forEach((x) => x.setAttribute('aria-checked', x === b))));
  },
};
