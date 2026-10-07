const BOT = (c, d, dk) => `
  <rect x="-15" y="100" width="11" height="26" rx="3" fill="${dk}"/><rect x="4" y="100" width="11" height="26" rx="3" fill="${dk}"/>
  <circle cx="-9.5" cy="112" r="4" fill="${d}"/><circle cx="9.5" cy="112" r="4" fill="${d}"/>
  <rect x="-19" y="124" width="16" height="7" rx="2.5" fill="#2a2a2a"/><rect x="3" y="124" width="16" height="7" rx="2.5" fill="#2a2a2a"/>
  <path d="M-18 92h36l-3 13h-30z" fill="${d}"/><rect x="-18" y="90" width="36" height="5" rx="2" fill="#2a2a2a"/>
  <g class="guard"><path d="M-22 62c-8 4-10 12-8 18" fill="none" stroke="${d}" stroke-width="9" stroke-linecap="round"/><path d="M-30 80c2-10 8-18 14-24" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="-14" cy="52" r="8.5" fill="${c}" stroke="${dk}" stroke-width="1.6"/><path d="M-19 48a6 6 0 0 1 8-2" fill="none" stroke="#fff" stroke-width="1.6" opacity=".5" stroke-linecap="round"/></g>
  <path d="M-23 60c0-5 3-7 8-7h30c5 0 8 2 8 7l-4 31h-38z" fill="${c}"/>
  <path d="M-19 58h38" stroke="#fff" stroke-width="2" opacity=".28" stroke-linecap="round"/>
  <rect x="-12" y="65" width="24" height="17" rx="3" fill="${d}" stroke="${dk}" stroke-width="1"/>
  <circle cx="-6" cy="73.5" r="3" fill="#ffd23a"/><circle cx="0" cy="73.5" r="3" fill="#fff"/><circle cx="6" cy="73.5" r="3" fill="#ffd23a"/>
  <circle cx="-9" cy="85" r="1.1" fill="${dk}"/><circle cx="-3" cy="85" r="1.1" fill="${dk}"/><circle cx="3" cy="85" r="1.1" fill="${dk}"/><circle cx="9" cy="85" r="1.1" fill="${dk}"/>
  <circle cx="-21" cy="60" r="7" fill="${c}" stroke="${dk}" stroke-width="1.4"/>
  <g class="arm"><path d="M20 61h22" stroke="${d}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="46" cy="61" r="10" fill="${c}" stroke="${dk}" stroke-width="1.8"/><path d="M40 55a7 7 0 0 1 9-2" fill="none" stroke="#fff" stroke-width="1.8" opacity=".5" stroke-linecap="round"/><path d="M41 66q5 3 9 0" fill="none" stroke="${dk}" stroke-width="1.4"/></g>
  <circle cx="21" cy="60" r="7" fill="${c}" stroke="${dk}" stroke-width="1.4"/>
  <g class="head"><path class="spring" d="M0 56 l-5 -2.5 l10 -2.5 l-10 -2.5 l10 -2.5 l-10 -2.5 l5 -2.5" fill="none" stroke="#c9c9c9" stroke-width="2"/>
    <rect x="-4" y="48" width="8" height="7" fill="#3a3a3a"/>
    <path d="M-12 50v-11a12 12 0 0 1 24 0v11c0 2-2 3-4 3h-16c-2 0-4-1-4-3z" fill="${c}" stroke="${dk}" stroke-width="1.4"/>
    <path d="M-7 31a9 9 0 0 1 9-3" fill="none" stroke="#fff" stroke-width="1.8" opacity=".45" stroke-linecap="round"/>
    <rect x="-9" y="36" width="18" height="6" rx="3" fill="#141414"/><circle cx="-4" cy="39" r="1.6" fill="#ffd23a"/><circle cx="4" cy="39" r="1.6" fill="#ffd23a"/>
    <rect x="-7" y="44" width="14" height="6" rx="2" fill="${dk}"/><path d="M-4 44v6M-1 44v6M2 44v6M5 44v6" stroke="${c}" stroke-width=".9"/>
    <circle cx="-12.5" cy="40" r="2.6" fill="${d}" stroke="${dk}"/><circle cx="12.5" cy="40" r="2.6" fill="${d}" stroke="${dk}"/></g>`;

export default {
  id: 'ty2-rock-em-sock-em',
  credit: "Marx Rock 'Em Sock 'Em Robots (1964) — Red Rocker vs Blue Bomber: thumb the plungers to punch, three clean hits knock his block off",
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 292px; height: 196px; border-radius: 12px; overflow: hidden; background: linear-gradient(#2b2440, #15111f); }
    .ring { position: absolute; left: 14px; right: 14px; top: 150px; height: 24px; background: linear-gradient(#ffe25a, #f7c600 60%, #c79600); border-radius: 4px;
      box-shadow: 0 6px 0 #8a6a00; }
    .rope { position: absolute; left: 14px; right: 14px; height: 3px; background: #e3262d; border-radius: 2px; }
    .rope.a { top: 92px; } .rope.b { top: 116px; }
    .post { position: absolute; top: 84px; width: 8px; height: 70px; background: linear-gradient(90deg, #a2a2a2, #f0f0f0, #8a8a8a); border-radius: 3px; }
    .post.l { left: 12px; } .post.r { right: 12px; }
    svg { position: absolute; left: 0; top: 0; width: 292px; height: 196px; }
    .arm { transition: transform .12s cubic-bezier(.2,1.6,.4,1); }
    .bot.punch .arm { transform: translateX(26px); transition-duration: .06s; }
    .bot { transform-box: fill-box; transform-origin: 50% 100%; }
    .bot.hit { animation: hit .25s; }
    @keyframes hit { 30% { transform: translateX(var(--k)) rotate(var(--r)); } }
    .head { transition: transform .35s cubic-bezier(.3,1.8,.5,1); }
    .spring { opacity: 0; transition: opacity .1s; }
    .bot.ko .head { transform: translateY(-16px); }
    .bot.ko .spring { opacity: 1; }
    .btn { position: absolute; bottom: 4px; width: 46px; height: 18px; border: 0; padding: 0; cursor: pointer; border-radius: 9px 9px 4px 4px;
      background: linear-gradient(var(--c1), var(--c2)); box-shadow: 0 4px 0 var(--c3), 0 5px 5px rgba(0,0,0,.5); transform: translateY(-3px); transition: transform .05s, box-shadow .05s; }
    .btn:active { transform: translateY(1px); box-shadow: 0 0 0 var(--c3); }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .br { left: 30px; --c1: #ff6b63; --c2: #d4141c; --c3: #7a0a0e; }
    .bb { right: 30px; --c1: #6fb2ff; --c2: #1a5fb4; --c3: #0b2e5c; }
  `,
  html: `
    <div class="stage">
      <span class="post l"></span><span class="post r"></span>
      <div class="ring"></div>
      <svg viewBox="0 0 292 196" aria-hidden="true">
        <g transform="translate(108 22)"><g class="bot red" style="--k:-6px;--r:-6deg">${BOT('#e3262d', '#b3121a', '#6f0a0e')}</g></g>
        <g transform="translate(184 22) scale(-1 1)"><g class="bot blue" style="--k:-6px;--r:-6deg">${BOT('#2b7de0', '#1a5fb4', '#0b2e5c')}</g></g>
      </svg>
      <span class="rope a"></span><span class="rope b"></span>
      <button class="btn br" type="button" aria-label="Red Rocker punch"></button>
      <button class="btn bb" type="button" aria-label="Blue Bomber punch"></button>
    </div>`,
  init(root) {
    const red = root.querySelector('.red'), blue = root.querySelector('.blue');
    const hits = new Map([[red, 0], [blue, 0]]);
    const timers = new Set();
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
    const punch = (me, foe) => {
      if (me.classList.contains('ko')) return;
      if (foe.classList.contains('ko')) { foe.classList.remove('ko'); hits.set(foe, 0); return; }
      me.classList.remove('punch'); void me.getBoundingClientRect(); me.classList.add('punch');
      later(() => me.classList.remove('punch'), 140);
      if (Math.random() < 0.7) {
        later(() => { foe.classList.remove('hit'); void foe.getBoundingClientRect(); foe.classList.add('hit'); }, 50);
        hits.set(foe, hits.get(foe) + 1);
        if (hits.get(foe) >= 3) later(() => foe.classList.add('ko'), 120);
      }
    };
    root.querySelector('.br').addEventListener('click', () => punch(red, blue));
    root.querySelector('.bb').addEventListener('click', () => punch(blue, red));
    return () => timers.forEach(clearTimeout);
  },
};
