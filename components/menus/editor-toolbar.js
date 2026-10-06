// Google Docs toolbar (Material 3 refresh). Icons: Material Symbols Outlined (Apache 2.0), inlined.
const S = (d, w = 20) => `<svg width="${w}" height="${w}" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
const P = {
  undo: 'M259-200v-60h310q70 0 120.5-46.5T740-422q0-69-50.5-115.5T569-584H274l114 114-42 42-186-186 186-186 42 42-114 114h294q95 0 163.5 64T800-422q0 94-68.5 158T568-200H259Z',
  redo: 'M392-200q-95 0-163.5-64T160-422q0-94 68.5-158T392-644h294L572-758l42-42 186 186-186 186-42-42 114-114H391q-70 0-120.5 46.5T220-422q0 69 50.5 115.5T391-260h310v60H392Z',
  print: 'M658-648v-132H302v132h-60v-192h476v192h-60Zm-518 60h680-680Zm599 95q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm-81 313v-192H302v192h356Zm60 60H242v-176H80v-246q0-45.05 30.5-75.53Q141-648 186-648h588q45.05 0 75.53 30.47Q880-587.05 880-542v246H718v176Zm102-236v-186.21Q820-562 806.78-575q-13.23-13-32.78-13H186q-19.55 0-32.77 13.22Q140-561.55 140-542v186h102v-76h476v76h102Z',
  spell: 'M563-80 404-239l42-42 117 117 240-240 42 42L563-80ZM120-312l200-527h66l200 527h-67l-54-142H238l-54 142h-64Zm137-200h189l-92-254h-5l-92 254Z',
  paint: 'M437-80q-24 0-42-17.63-18-17.62-18-42.37v-200H220q-24 0-42-18t-18-42v-303q0-55 39.66-96 39.65-41 95.34-41h505v440q0 24-18 42t-42 18H583v200q0 24.75-18 42.37Q547-80 523-80h-86ZM220-554h520v-226h-56v171h-60v-171h-71v85h-60v-85H295q-32 0-53.5 23T220-703v149Zm0 154h520v-94H220v94Zm0 0v-94 94Z',
  drop: 'M480-360 280-559h400L480-360Z',
  remove: 'M200-450v-60h560v60H200Z',
  add: 'M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z',
  bold: 'M275-200v-560h228q66 0 114.5 42T666-612q0 38-21 70t-56 49v6q43 14 69.5 50t26.5 81q0 68-52.5 112T510-200H275Zm86-76h144q38 0 66-25t28-63q0-37-28-62t-66-25H361v175Zm0-247h136q35 0 60.5-23t25.5-58q0-35-25.5-58.5T497-686H361v163Z',
  italic: 'M224-199v-80h134l139-409H338v-80h380v80H584L445-279h159v80H224Z',
  under: 'M200-140v-60h560v60H200Zm123.5-198.5Q267-397 267-497v-343h83v343q0 63 34 101t96 38q62 0 96-38t34-101v-343h83v343q0 100-56.5 158.5T480-280q-100 0-156.5-58.5Z',
  colorA: 'M220-280 440-840h80l220 560h-75l-57-150H352l-57 150h-75Zm156-214h208L482-765h-4L376-494Z',
  link: 'M450-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h170v60H280q-58.33 0-99.17 40.76-40.83 40.77-40.83 99Q140-422 180.83-381q40.84 41 99.17 41h170v60ZM325-450v-60h310v60H325Zm185 170v-60h170q58.33 0 99.17-40.76 40.83-40.77 40.83-99Q820-538 779.17-579q-40.84-41-99.17-41H510v-60h170q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H510Z',
  comment: 'M450-400h60v-130h130v-60H510v-130h-60v130H320v60h130v130ZM80-80v-740q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H240L80-80Zm134-220h606v-520H140v600l74-80Zm-74 0v-520 520Z',
  left: 'M120-120v-60h720v60H120Zm0-165v-60h480v60H120Zm0-165v-60h720v60H120Zm0-165v-60h480v60H120Zm0-165v-60h720v60H120Z',
  center: 'M120-120v-60h720v60H120Zm160-165v-60h400v60H280ZM120-450v-60h720v60H120Zm160-165v-60h400v60H280ZM120-780v-60h720v60H120Z',
  right: 'M120-780v-60h720v60H120Zm240 165v-60h480v60H360ZM120-450v-60h720v60H120Zm240 165v-60h480v60H360ZM120-120v-60h720v60H120Z',
  justify: 'M120-120v-60h720v60H120Zm0-165v-60h720v60H120Zm0-165v-60h720v60H120Zm0-165v-60h720v60H120Zm0-165v-60h720v60H120Z',
  numbered: 'M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm189 431v-60h471v60H369Zm0-243v-60h471v60H369Zm0-243v-60h471v60H369Z',
  bulleted: 'M377-198v-60h463v60H377Zm0-252v-60h463v60H377Zm0-253v-60h463v60H377ZM189-161q-28.05 0-48.02-19Q121-199 121-227.5t19.5-48q19.5-19.5 48-19.5t47.5 19.98q19 19.97 19 48.02 0 27.23-19.39 46.61Q216.23-161 189-161Zm0-252q-28.05 0-48.02-19.5Q121-452 121-480t19.98-47.5Q160.95-547 189-547q27.23 0 46.61 19.5Q255-508 255-480t-19.39 47.5Q216.23-413 189-413Zm-48.5-272.5Q121-705 121-733t19.5-47.5Q160-800 188-800t47.5 19.5Q255-761 255-733t-19.5 47.5Q216-666 188-666t-47.5-19.5Z',
};
const B = (k, label, extra = '') => `<button class="b" type="button" aria-label="${label}" data-tip="${label}"${extra}>${S(P[k])}</button>`;
const T = (k, label) => B(k, label, ' aria-pressed="false"');
const DD = (cls, txt, label) => `<button class="dd ${cls}" type="button" aria-label="${label}"><span>${txt}</span>${S(P.drop, 18)}</button>`;
export default {
  id: 'mn-editor-toolbar',
  credit: 'Google Docs editing toolbar (Material 3 refresh) — Material Symbols, #edf2fa pill, #d3e3fd toggled state, align picker',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .tb { position: relative; container-type: inline-size; display: flex; align-items: center; gap: 1px; height: 40px; padding: 0 8px; background: #edf2fa; border-radius: 24px; font: 400 14px/20px "Google Sans", "Roboto Flex", Roboto, Arial, sans-serif; color: #444746; white-space: nowrap; overflow: visible; }
    .b, .dd, .sz button { flex: none; height: 28px; min-width: 28px; display: inline-flex; align-items: center; justify-content: center; padding: 0; border: 0; border-radius: 4px; background: transparent; color: inherit; font: inherit; cursor: pointer; transition: background-color .1s linear; }
    .b:hover, .dd:hover, .sz button:hover { background: rgba(68,71,70,.08); }
    .b:active, .dd:active, .sz button:active { background: rgba(68,71,70,.12); }
    .b[aria-pressed="true"], .b[aria-expanded="true"] { background: #d3e3fd; color: #041e49; }
    .b:focus-visible, .dd:focus-visible, .sz button:focus-visible, .sz input:focus-visible { outline: 2px solid #0b57d0; outline-offset: -2px; }
    .dd { padding: 0 2px 0 6px; gap: 0; color: #1f1f1f; }
    .dd span { text-align: left; }
    .zoom span { width: 36px; } .style span { width: 76px; } .font span { width: 50px; }
    .g-tools, .g-ins, .g-list, .g-hist { display: inline-flex; gap: 1px; flex: none; }
    .sep { flex: none; width: 1px; height: 20px; background: #c7c7c7; margin: 0 6px; }
    .sz { display: inline-flex; align-items: center; gap: 2px; }
    .sz input { width: 32px; height: 24px; border: 1px solid #747775; border-radius: 4px; background: transparent; text-align: center; font: inherit; color: #1f1f1f; padding: 0; }
    .color { position: relative; flex-direction: column; }
    .color svg { margin-top: -3px; }
    .color i { position: absolute; left: 5px; right: 5px; bottom: 4px; height: 3px; border-radius: 1px; background: var(--c, #000); }
    .pop { position: absolute; top: 40px; display: flex; gap: 2px; padding: 4px; background: #fff; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15); opacity: 0; transform: translateY(-4px); visibility: hidden; transition: opacity .15s cubic-bezier(.2,0,0,1), transform .15s cubic-bezier(.2,0,0,1), visibility 0s .15s; }
    .pop.open { opacity: 1; transform: none; visibility: visible; transition: opacity .15s cubic-bezier(.2,0,0,1), transform .15s cubic-bezier(.2,0,0,1); }
    .pop .b[aria-checked="true"] { background: #d3e3fd; color: #041e49; }
    .alg svg + svg { margin-left: -4px; }
    @container (width < 980px) { .g-tools, .g-tools + .sep, .zoom, .zoom + .sep { display: none; } }
    @container (width < 760px) { .style, .style + .sep, .font, .font + .sep { display: none; } }
    @container (width < 520px) { .g-ins, .g-ins + .sep, .g-list { display: none; } }
    @container (width < 380px) { .sz, .sz + .sep { display: none; } }
  `,
  html: `
    <div class="tb" role="toolbar" aria-label="Main toolbar">
      <span class="g-hist">${B('undo', 'Undo (⌘Z)')}${B('redo', 'Redo (⌘Y)')}</span>
      <span class="g-tools">${B('print', 'Print (⌘P)')}${B('spell', 'Spelling and grammar check (⌘⌥X)')}${T('paint', 'Paint format')}</span>
      <span class="sep"></span>
      ${DD('zoom', '100%', 'Zoom')}<span class="sep"></span>
      ${DD('style', 'Normal text', 'Styles')}<span class="sep"></span>
      ${DD('font', 'Arial', 'Font')}<span class="sep"></span>
      <span class="sz"><button type="button" class="dec" aria-label="Decrease font size (⌘⇧,)">${S(P.remove)}</button><input type="text" value="11" aria-label="Font size" inputmode="numeric"><button type="button" class="inc" aria-label="Increase font size (⌘⇧.)">${S(P.add)}</button></span>
      <span class="sep"></span>
      ${T('bold', 'Bold (⌘B)')}${T('italic', 'Italic (⌘I)')}${T('under', 'Underline (⌘U)')}
      <button class="b color" type="button" aria-label="Text color" aria-pressed="false">${S(P.colorA)}<i></i></button>
      <span class="sep"></span>
      <span class="g-ins">${B('link', 'Insert link (⌘K)')}${B('comment', 'Add comment (⌘⌥M)')}</span>
      <span class="sep"></span>
      <button class="b alg" type="button" aria-label="Align &amp; indent" aria-haspopup="true" aria-expanded="false">${S(P.left)}</button>
      <span class="g-list">${T('numbered', 'Numbered list (⌘⇧7)')}${T('bulleted', 'Bulleted list (⌘⇧8)')}</span>
      <div class="pop" role="radiogroup" aria-label="Alignment">
        <button class="b al" type="button" role="radio" aria-checked="true" aria-label="Left align (⌘⇧L)" data-k="left">${S(P.left)}</button>
        <button class="b al" type="button" role="radio" aria-checked="false" aria-label="Center align (⌘⇧E)" data-k="center">${S(P.center)}</button>
        <button class="b al" type="button" role="radio" aria-checked="false" aria-label="Right align (⌘⇧R)" data-k="right">${S(P.right)}</button>
        <button class="b al" type="button" role="radio" aria-checked="false" aria-label="Justify (⌘⇧J)" data-k="justify">${S(P.justify)}</button>
      </div>
    </div>`,
  init(root, host) {
    root.querySelectorAll('.b[aria-pressed]').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
    const colors = ['#000000', '#d93025', '#1a73e8', '#188038', '#f9ab00'];
    const color = root.querySelector('.color');
    let ci = 0;
    color.addEventListener('click', () => { ci = (ci + 1) % colors.length; color.style.setProperty('--c', colors[ci]); color.setAttribute('aria-pressed', 'false'); });
    const size = root.querySelector('.sz input');
    const step = (d) => { const v = Math.max(1, Math.min(400, (parseInt(size.value, 10) || 11) + d)); size.value = String(v); };
    root.querySelector('.dec').addEventListener('click', () => step(-1));
    root.querySelector('.inc').addEventListener('click', () => step(1));
    size.addEventListener('change', () => step(0));
    const alg = root.querySelector('.alg'), pop = root.querySelector('.pop');
    const als = [...pop.querySelectorAll('.al')];
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => {
      if (v) { const tb = alg.parentElement; pop.style.left = Math.max(0, Math.min(alg.offsetLeft - 4, tb.clientWidth - 132)) + 'px'; }
      alg.setAttribute('aria-expanded', String(v)); pop.classList.toggle('open', v); host.toggleAttribute('data-open', v);
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
    };
    alg.addEventListener('click', () => { const v = alg.getAttribute('aria-expanded') !== 'true'; set(v); if (v) als.find((a) => a.getAttribute('aria-checked') === 'true').focus({ preventScroll: true }); });
    als.forEach((a, i) => {
      a.addEventListener('click', () => { als.forEach((x) => x.setAttribute('aria-checked', String(x === a))); alg.innerHTML = a.innerHTML; set(false); alg.focus({ preventScroll: true }); });
      a.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); als[(i + (e.key === 'ArrowRight' ? 1 : -1) + als.length) % als.length].focus({ preventScroll: true }); } });
    });
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && pop.classList.contains('open')) { set(false); alg.focus({ preventScroll: true }); } });
    return () => set(false);
  },
};
