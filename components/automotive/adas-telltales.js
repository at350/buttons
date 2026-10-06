const LKA = '<path d="M3 21 7 3M21 21 17 3"/><g transform="translate(7.2 8.5) scale(.4)"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></g>';
const ACC = '<g transform="translate(1 0) scale(.55)"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></g><g transform="translate(10 9) scale(.55)"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></g>';

export default {
  id: 'au-adas-telltales',
  credit: 'Driver-assist tell-tales in the cluster — Lane Keeping Assist, Adaptive Cruise, Auto High Beam and Forward Collision icons cycle off → standby (white) → active (green); the road view reacts',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 320px; max-width: 100%; padding: 10px; border-radius: 12px; background: #030405; color: #fff; font: 600 10px/1 Inter, system-ui, sans-serif; user-select: none; }
    .road { position: relative; height: 104px; border-radius: 8px; overflow: hidden; background: radial-gradient(ellipse at 50% 120%, #1b222c, #07090c 70%); }
    .road svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .ln { stroke: #39414c; stroke-width: 3; stroke-linecap: round; transition: stroke .3s, filter .3s; }
    .lka .ln { stroke: #2bd36a; filter: drop-shadow(0 0 3px #2bd36a); }
    .lead, .own { fill: #b9c2cf; }
    .lead { opacity: 0; transition: opacity .3s; }
    .acc .lead { opacity: 1; }
    .gapb { fill: #2bd36a; opacity: 0; transition: opacity .3s; }
    .acc .gapb { opacity: .85; }
    .beam { opacity: 0; transition: opacity .4s; }
    .ahb .beam { opacity: 1; }
    .fcw .road { animation: fcw .25s steps(1) 6; }
    @keyframes fcw { 50% { box-shadow: inset 0 0 0 3px #ff3b30, inset 0 0 30px rgba(255,59,48,.5); } }
    .row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 8px; }
    .tt { height: 42px; border: 0; border-radius: 8px; background: #0e1114; color: #2b3038; cursor: pointer; display: grid; place-items: center; transition: background .15s, color .25s; }
    .tt:hover { background: #151a1f; }
    .tt:focus-visible { outline: 2px solid #4da3ff; outline-offset: 2px; }
    .tt svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: filter .25s; }
    .tt svg.f { fill: currentColor; stroke: none; }
    .tt[data-s="1"] { color: #e8ecf1; }
    .tt[data-s="2"] { color: #2bd36a; }
    .tt[data-s="2"] svg { filter: drop-shadow(0 0 4px rgba(43,211,106,.8)); }
    .tt.hb[data-s="1"] { color: #4d8dff; }
    .tt.hb[data-s="1"] svg { filter: drop-shadow(0 0 4px rgba(77,141,255,.8)); }
    .tt.fc.warn { color: #ff3b30; animation: wn .25s steps(1) 6; }
    @keyframes wn { 50% { color: #ffb000; } }
  `,
  html: `
    <div class="stage">
      <div class="road"><svg viewBox="0 0 300 104" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="au-adas-beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#9cc4ff" stop-opacity=".35"/><stop offset="1" stop-color="#9cc4ff" stop-opacity="0"/></linearGradient></defs>
        <path class="beam" fill="url(#au-adas-beam)" d="M130 84 60 0h180l-70 84z"/>
        <line class="ln" x1="96" y1="104" x2="138" y2="8"/><line class="ln" x1="204" y1="104" x2="162" y2="8"/>
        <rect class="gapb" x="141" y="44" width="18" height="3" rx="1"/><rect class="gapb" x="139" y="52" width="22" height="3" rx="1"/><rect class="gapb" x="137" y="60" width="26" height="3" rx="1"/>
        <rect class="lead" x="141" y="20" width="18" height="16" rx="4"/>
        <rect class="own" x="132" y="72" width="36" height="28" rx="8"/>
      </svg></div>
      <div class="row">
        <button class="tt lk" type="button" data-s="1" aria-label="Lane Keeping Assist"><svg viewBox="0 0 24 24">${LKA}</svg></button>
        <button class="tt ac" type="button" data-s="1" aria-label="Adaptive Cruise Control"><svg viewBox="0 0 24 24">${ACC}</svg></button>
        <button class="tt hb" type="button" data-s="0" aria-label="Auto High Beam"><svg class="f" viewBox="0 0 256 256"><path d="M160,80a8,8,0,0,1,8-8h72a8,8,0,0,1,0,16H168A8,8,0,0,1,160,80Zm80,88H168a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm0-64H168a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16Zm0,32H168a8,8,0,0,0,0,16h72a8,8,0,0,0,0-16ZM144,64V192a16,16,0,0,1-16,16H88A80,80,0,0,1,8,127.39C8.33,83.62,44.62,48,88.9,48H128A16,16,0,0,1,144,64Zm-16,0H88.9C53.38,64,24.26,92.49,24,127.51A64,64,0,0,0,88,192h40Z"/></svg></button>
        <button class="tt fc" type="button" data-s="1" aria-label="Forward Collision Warning"><svg class="f" viewBox="0 -960 960 960"><path d="M341-749q-9 9-21 9t-21-9l-64-64q-9-9-9-21t9-21q9-9 21-9t21 9l64 64q9 9 9 21t-9 21Zm269-21q0-12 9-21l64-64q9-9 21-9t21 9q9 9 9 21t-9 21l-64 64q-9 9-21 9t-21-9q-9-9-9-21Zm-151.5-18.63Q450-797.25 450-810v-120q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v120q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63ZM120-40v-304q0-4.67.5-9.33.5-4.67 2.5-9.67l78-236q6-19 21.75-30T258-640h444q19.5 0 35.25 11T759-599l78 236q2 5 2.5 9.67.5 4.66.5 9.33v304q0 16.67-11.74 28.33Q816.53 0 799.76 0 783 0 771.5-11.67 760-23.33 760-40v-44H200v44q0 16.67-11.74 28.33Q176.53 0 159.76 0 143 0 131.5-11.67 120-23.33 120-40Zm83-374h554l-55-166H258l-55 166Zm82.76 220q23.24 0 38.74-15.75Q340-225.5 340-248q0-23.33-15.75-39.67Q308.5-304 286-304q-23.33 0-39.67 16.26Q230-271.47 230-248.24q0 23.24 16.26 38.74 16.27 15.5 39.5 15.5ZM675-194q23.33 0 39.67-15.75Q731-225.5 731-248q0-23.33-16.26-39.67Q698.47-304 675.24-304q-23.24 0-38.74 16.26-15.5 16.27-15.5 39.5 0 23.24 15.75 38.74Q652.5-194 675-194Zm-495 50h600v-210H180v210Zm0 0v-210 210Z"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), $ = (s) => root.querySelector(s);
    let t = 0;
    const sync = () => {
      stage.classList.toggle('lka', $('.lk').dataset.s === '2');
      stage.classList.toggle('acc', $('.ac').dataset.s === '2');
      stage.classList.toggle('ahb', $('.hb').dataset.s === '1');
      root.querySelectorAll('.tt').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.s !== '0')));
    };
    ['.lk', '.ac'].forEach((c) => $(c).addEventListener('click', () => { const b = $(c); b.dataset.s = (+b.dataset.s + 1) % 3; sync(); }));
    $('.hb').addEventListener('click', () => { const b = $('.hb'); b.dataset.s = b.dataset.s === '1' ? '0' : '1'; sync(); });
    $('.fc').addEventListener('click', () => {
      const b = $('.fc'); stage.classList.remove('fcw'); b.classList.remove('warn'); void b.offsetWidth;
      stage.classList.add('fcw'); b.classList.add('warn'); clearTimeout(t);
      t = setTimeout(() => { stage.classList.remove('fcw'); b.classList.remove('warn'); }, 1600);
    });
    sync();
    return () => clearTimeout(t);
  },
};
