export default {
  id: 'ks-jukebox',
  credit: 'TouchTunes bar jukebox — dark touchscreen search with the on-screen QWERTY keyboard; type and the top artist match comes up, credits in the corner',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 10px; border-radius: 12px; background: linear-gradient(135deg, #2a2d34, #0d0e11); box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); }
    .scr { width: 318px; padding: 10px; border-radius: 8px; background: radial-gradient(ellipse at 20% 0%, #3a1d6e, #140b2b 55%, #07060d); font-family: Inter, system-ui, sans-serif; color: #fff; }
    .top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 10px; font-weight: 700; letter-spacing: .06em; color: #c9b8ff; }
    .top b { color: #ffcf33; }
    .field { display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 10px; border-radius: 17px; background: rgba(255,255,255,.1); box-shadow: inset 0 0 0 1px rgba(255,255,255,.18); font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; }
    .field svg { width: 16px; height: 16px; flex: none; color: #c9b8ff; }
    .q.ph { color: rgba(255,255,255,.45); font-weight: 500; }
    .caret { width: 2px; height: 18px; background: #ff3dbb; animation: c 1s steps(1) infinite; }
    @keyframes c { 50% { opacity: 0; } }
    .res { display: flex; align-items: center; gap: 8px; height: 38px; margin: 8px 0; padding: 0 8px; border-radius: 6px; background: rgba(255,255,255,.06); font-size: 12px; white-space: nowrap; overflow: hidden; }
    .res img, .res i { flex: none; display: block; width: 28px; height: 28px; border-radius: 4px; object-fit: cover; background: #2a2140; }
    .res i { display: none; place-items: center; color: rgba(255,255,255,.5); }
    .res i svg { width: 14px; height: 14px; }
    .res.none img { display: none; } .res.none i { display: grid; }
    .res span { color: rgba(255,255,255,.55); }
    .res b { font-weight: 700; }
    .kb { display: grid; gap: 5px; }
    .r { display: flex; justify-content: center; gap: 4px; }
    .k { width: 26px; height: 32px; border: 0; padding: 0; border-radius: 5px; cursor: pointer; font: 600 13px/1 Inter, sans-serif; color: #fff; background: linear-gradient(#3a3f4a, #262a33); box-shadow: 0 2px 0 #0b0c10, inset 0 1px 0 rgba(255,255,255,.12); transition: transform .05s, background .1s; -webkit-tap-highlight-color: transparent; }
    .k:hover { background: linear-gradient(#4a5060, #30343f); }
    .k:active { transform: translateY(2px); box-shadow: 0 0 0 #0b0c10; background: linear-gradient(#ff3dbb, #c41f8f); }
    .k:focus-visible { outline: 2px solid #ff3dbb; outline-offset: 1px; }
    .k.w { width: 46px; font-size: 11px; } .k.sp { width: 150px; font-size: 11px; color: #c9b8ff; }
    .k svg { width: 16px; height: 16px; vertical-align: middle; }
  `,
  html: `
    <div class="stage"><div class="scr">
      <div class="top"><span>SEARCH</span><span>CREDITS <b>12</b></span></div>
      <div class="field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg><span class="q ph">Artists, songs</span><span class="caret"></span></div>
      <div class="res" aria-live="polite"><img class="ra" src="assets/square/35.webp" alt="" width="28" height="28"><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="18" r="4"/><path d="M12 18V2l7 4"/></svg></i><span class="rt">Most played tonight · </span><b class="rb">Journey</b></div>
      <div class="kb"></div>
    </div></div>`,
  init(root) {
    const kb = root.querySelector('.kb'), q = root.querySelector('.q'), rt = root.querySelector('.rt'), rb = root.querySelector('.rb'), res = root.querySelector('.res'), ra = root.querySelector('.ra');
    const ART = ['30', '47', '52', '53', '55', '61', '63', '64', '68', '35', '45', '46', '56', '43', '69', '13'];
    const artists = ['AC/DC', 'Bon Jovi', 'Chris Stapleton', 'Dolly Parton', 'Eagles', 'Fleetwood Mac', 'Guns N’ Roses', 'Hootie & the Blowfish', 'Johnny Cash', 'Journey', 'Kenny Chesney', 'Lynyrd Skynyrd', 'Morgan Wallen', 'Neil Diamond', 'Outkast', 'Prince', 'Queen', 'Red Hot Chili Peppers', 'Shania Twain', 'Taylor Swift', 'The Killers', 'Usher', 'Van Halen', 'Whitney Houston', 'Zac Brown Band'];
    let v = '';
    const render = () => {
      q.textContent = v || 'Artists, songs'; q.classList.toggle('ph', !v);
      if (!v) { rt.textContent = 'Most played tonight · '; rb.textContent = 'Journey'; res.classList.remove('none'); ra.src = 'assets/square/35.webp'; return; }
      const m = artists.find((a) => a.toUpperCase().startsWith(v)) || artists.find((a) => a.toUpperCase().includes(v));
      rt.textContent = m ? 'Top result · ' : 'No results for '; rb.textContent = m || '“' + v + '”';
      res.classList.toggle('none', !m); if (m) ra.src = 'assets/square/' + ART[artists.indexOf(m) % ART.length] + '.webp';
    };
    const back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/></svg>';
    [['QWERTYUIOP'], ['ASDFGHJKL'], ['ZXCVBNM', 'del'], ['123', 'sp', 'clr']].forEach(([keys, extra, extra2]) => {
      const r = document.createElement('div'); r.className = 'r';
      const add = (label, cls, fn, aria) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'k ' + cls; b.innerHTML = label; if (aria) b.setAttribute('aria-label', aria); b.addEventListener('click', fn); r.appendChild(b); };
      if (keys === '123') {
        add('&amp;', 'w', () => { if (v.length < 22) v += '&'; render(); });
        add('SPACE', 'sp', () => { if (v && v.length < 22 && !v.endsWith(' ')) v += ' '; render(); });
        add('CLEAR', 'w', () => { v = ''; render(); });
      } else {
        [...keys].forEach((ch) => add(ch, '', () => { if (v.length < 22) v += ch; render(); }));
        if (extra === 'del') add(back, 'w', () => { v = v.slice(0, -1); render(); }, 'Backspace');
      }
      kb.appendChild(r);
    });
  },
};
