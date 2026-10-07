// Bluebird Polly Pocket (1989) compact: a pink clam-shell case with an embossed heart lid and a purple
// press-latch at the front. Press the latch and the lid swings up on its back hinge (the closed dome
// folds away, the inside face unfolds upright), revealing the printed room on the lid — wallpaper,
// arched window, staircase — and the moulded floor in the base with Polly on her peg, a bed and a table.
export default {
  id: 'ty2-polly-pocket',
  credit: 'Bluebird Polly Pocket (1989) — the pink shell compact: press the purple latch and the lid springs up on a tiny house with Polly inside',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 220px; height: 190px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 20% 20%, #fff 0 2px, transparent 3px) 0 0 / 34px 30px, linear-gradient(#fde7f3, #f7c6e3); }
    svg { position: absolute; inset: 0; width: 220px; height: 190px; }
    .shut, .face { transform-box: fill-box; }
    .shut { transform-origin: 50% 0; transition: transform .26s cubic-bezier(.5,0,.8,.5) .2s; }
    .face { transform-origin: 50% 100%; transform: scaleY(0); transition: transform .2s cubic-bezier(.5,0,.8,.5); }
    .open .shut { transform: scaleY(0); transition: transform .2s cubic-bezier(.4,0,1,1); }
    .open .face { transform: scaleY(1); transition: transform .45s cubic-bezier(.3,1.5,.5,1) .18s; }
    .inside { opacity: 0; transition: opacity .1s .4s; } .open .inside { opacity: 1; transition-delay: 0s; }
    .latch { position: absolute; left: 50%; top: 152px; width: 30px; height: 15px; margin-left: -15px; border: 0; padding: 0; cursor: pointer;
      border-radius: 4px 4px 9px 9px; background: linear-gradient(#e9d5ff, #a855f7 55%, #6b21a8); box-shadow: 0 3px 0 #4c1d95, 0 4px 4px rgba(80,0,60,.3), inset 0 1px 0 rgba(255,255,255,.7);
      transition: transform .12s; }
    .latch:hover { transform: translateY(1px); }
    .latch:active { transform: translateY(3px); box-shadow: 0 0 0 #4c1d95, inset 0 1px 0 rgba(255,255,255,.5); }
    .latch[aria-expanded="true"] { transform: translateY(2px); }
    .latch:focus-visible { outline: 3px solid #9333ea; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <svg viewBox="0 0 220 190" aria-hidden="true">
        <defs>
          <linearGradient id="pside" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ec4899"/><stop offset="1" stop-color="#9d174d"/></linearGradient>
          <radialGradient id="pdome" cx=".42" cy=".3" r=".8"><stop offset="0" stop-color="#ffe4f2"/><stop offset=".35" stop-color="#f9a8d4"/><stop offset=".85" stop-color="#ec4899"/><stop offset="1" stop-color="#db2777"/></radialGradient>
          <radialGradient id="pheart" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#e9d5ff"/><stop offset="1" stop-color="#a855f7"/></radialGradient>
          <linearGradient id="pfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3d3a6"/><stop offset="1" stop-color="#e2b07a"/></linearGradient>
          <linearGradient id="pwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdeafe"/><stop offset="1" stop-color="#a5d8fb"/></linearGradient>
          <pattern id="pdots" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="url(#pwall)"/><circle cx="2" cy="2" r="1.1" fill="#f9a8d4"/><circle cx="6.5" cy="6.5" r="1.1" fill="#fde68a"/></pattern>
          <clipPath id="pfc"><ellipse cx="110" cy="62" rx="66" ry="46"/></clipPath>
          <clipPath id="pbc"><ellipse cx="110" cy="122" rx="68" ry="27"/></clipPath>
        </defs>
        <ellipse cx="110" cy="160" rx="84" ry="12" fill="#be185d" opacity=".18"/>
        <!-- base: side band, rim and (when open) the moulded floor -->
        <path d="M26 122v16c0 19 38 34 84 34s84-15 84-34v-16z" fill="url(#pside)"/>
        <ellipse cx="110" cy="122" rx="84" ry="34" fill="#f472b6"/>
        <g class="inside">
          <ellipse cx="110" cy="122" rx="70" ry="28" fill="#be185d"/>
          <g clip-path="url(#pbc)">
            <ellipse cx="110" cy="125" rx="68" ry="27" fill="url(#pfloor)"/>
            <path d="M54 118h112M48 128h124M56 138h108" stroke="#c99862" stroke-width=".8"/>
            <!-- bed -->
            <rect x="126" y="114" width="36" height="15" rx="3" fill="#f472b6"/><rect x="126" y="114" width="36" height="5" rx="2" fill="#fff"/><rect x="157" y="106" width="6" height="23" rx="2" fill="#a855f7"/><rect x="128" y="111" width="10" height="5" rx="2.5" fill="#fff"/>
            <!-- table -->
            <ellipse cx="70" cy="120" rx="12" ry="4.5" fill="#a855f7"/><rect x="68.5" y="120" width="3" height="11" fill="#7e22ce"/><ellipse cx="70" cy="131" rx="5" ry="1.6" fill="#7e22ce"/><rect x="80" y="122" width="7" height="8" rx="1.5" fill="#fde047"/>
          </g>
          <!-- Polly on her peg -->
          <g transform="translate(96 112)">
            <ellipse cx="6" cy="27" rx="5" ry="2" fill="#9d174d" opacity=".5"/>
            <path d="M2 12h8l3 14H-1z" fill="#ec4899"/><path d="M3 12h6l1 5H2z" fill="#fbcfe8"/>
            <circle cx="6" cy="7" r="5" fill="#ffe0c2"/><path d="M1 7c0-5 3-7 5-7s5 2 5 7c-1-2-3-3-5-3S2 5 1 7z" fill="#f6c344"/><path d="M1 7c-1 3 0 6 1 7M11 7c1 3 0 6-1 7" stroke="#f6c344" stroke-width="2" stroke-linecap="round"/>
            <circle cx="4.3" cy="7.6" r=".7" fill="#3b2a20"/><circle cx="7.7" cy="7.6" r=".7" fill="#3b2a20"/>
          </g>
        </g>
        <!-- lid, open: the inside face stands up on the back hinge -->
        <g class="face"><g transform="translate(22 -3) scale(.8)">
          <ellipse cx="110" cy="62" rx="80" ry="58" fill="url(#pside)"/>
          <ellipse cx="110" cy="62" rx="74" ry="52" fill="#f472b6"/>
          <g clip-path="url(#pfc)">
            <rect x="40" y="10" width="140" height="110" fill="url(#pdots)"/>
            <rect x="40" y="92" width="140" height="20" fill="#f9a8d4"/><path d="M40 92h140" stroke="#fff" stroke-width="2"/>
            <!-- arched window with sky and a flower box -->
            <path d="M90 82V48a20 20 0 0 1 40 0v34z" fill="#fff"/><path d="M94 80V48a16 16 0 0 1 32 0v32z" fill="#7dd3fc"/>
            <path d="M110 32v48M94 58h32" stroke="#fff" stroke-width="2.4"/>
            <ellipse cx="104" cy="44" rx="6" ry="2.4" fill="#fff" opacity=".8"/>
            <rect x="88" y="80" width="44" height="7" rx="2" fill="#a855f7"/>
            <circle cx="95" cy="79" r="3" fill="#ef4444"/><circle cx="103" cy="78" r="3" fill="#fde047"/><circle cx="111" cy="79" r="3" fill="#ef4444"/><circle cx="119" cy="78" r="3" fill="#fde047"/><circle cx="127" cy="79" r="3" fill="#ef4444"/>
            <!-- staircase to the loft -->
            <path d="M140 112v-8h8v-8h8v-8h8v-8h8v32z" fill="#c084fc"/><path d="M140 104h8v-8h8v-8h8v-8h8" fill="none" stroke="#7e22ce" stroke-width="1.2"/>
            <!-- picture -->
            <rect x="56" y="54" width="18" height="14" rx="1" fill="#fde68a" stroke="#a855f7" stroke-width="2"/><path d="M58 66l5-6 4 4 3-3 2 5z" fill="#4ade80"/>
          </g>
          <ellipse cx="110" cy="62" rx="66" ry="46" fill="none" stroke="#be185d" stroke-width="2" opacity=".5"/>
        </g></g>
        <!-- lid, shut: the domed shell with the embossed heart and scallops -->
        <g class="shut">
          <path d="M28 118c0-20 37-38 82-38s82 18 82 38v4c0 18-37 32-82 32s-82-14-82-32z" fill="#db2777"/>
          <ellipse cx="110" cy="116" rx="82" ry="36" fill="url(#pdome)"/>
          <path d="M44 128c10-30 40-44 66-44s56 14 66 44" fill="none" stroke="#fff" stroke-width="1.4" opacity=".35"/>
          <g fill="none" stroke="#db2777" stroke-width="1.4" opacity=".55"><path d="M40 108c6-6 12-6 18 0c6-6 12-6 18 0"/><path d="M144 108c6-6 12-6 18 0c6-6 12-6 18 0"/></g>
          <path d="M110 136c-14-9-24-16-24-25a11 11 0 0 1 24-5 11 11 0 0 1 24 5c0 9-10 16-24 25z" fill="url(#pheart)" stroke="#c026d3" stroke-width="1.2"/>
          <ellipse cx="100" cy="106" rx="5" ry="2.6" fill="#fff" opacity=".8"/>
        </g>
      </svg>
      <button class="latch" type="button" aria-expanded="false" aria-label="open compact"></button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), latch = root.querySelector('.latch');
    latch.addEventListener('click', () => {
      const open = latch.getAttribute('aria-expanded') !== 'true';
      latch.setAttribute('aria-expanded', String(open)); latch.setAttribute('aria-label', open ? 'close compact' : 'open compact');
      st.classList.toggle('open', open);
    });
    latch.addEventListener('keydown', (e) => { if (e.key === 'Escape' && st.classList.contains('open')) latch.click(); });
  },
};
