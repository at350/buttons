export default {
  id: 'ty2-tickle-elmo',
  credit: 'Tyco Tickle Me Elmo (1996) — squeeze his tummy and he giggles and shakes; three squeezes in a row and he falls over laughing',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 10px 16px 12px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 50% 30%, #fff6d6, #ffe08a 75%); }
    .elmo { position: relative; display: block; width: 168px; height: 188px; border: 0; padding: 0; background: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .elmo svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .elmo:focus-visible { outline: 3px solid #e2231a; outline-offset: 2px; border-radius: 30%; }
    .body { transform-box: view-box; transform-origin: 84px 180px; }
    .giggle .body { animation: giggle .09s linear 10; }
    @keyframes giggle { 25% { transform: rotate(-3deg) translateY(-2px); } 75% { transform: rotate(3deg) translateY(-1px); } }
    .fall .body { animation: fall 2.4s cubic-bezier(.3,1.2,.5,1); transform-origin: 44px 184px; }
    @keyframes fall { 0% { transform: none; } 14% { transform: translate(-14px, -62px) rotate(72deg) scale(.7); }
      20%, 30%, 40%, 50%, 60%, 70% { transform: translate(-14px, -66px) rotate(70deg) scale(.7); } 25%, 35%, 45%, 55%, 65% { transform: translate(-14px, -60px) rotate(75deg) scale(.7); }
      85% { transform: translate(-14px, -62px) rotate(72deg) scale(.7); } 100% { transform: none; } }
    .mouth { transform-box: fill-box; transform-origin: 50% 0; transition: transform .1s; }
    .giggle .mouth, .fall .mouth { animation: laugh .14s ease-in-out infinite alternate; }
    @keyframes laugh { to { transform: scaleY(1.45); } }
    .pupil { transition: transform .2s; transform-box: fill-box; transform-origin: center; }
    .elmo:hover .pupil { transform: translateY(2px); }
    .giggle .lid, .fall .lid { opacity: 1; }
    .lid { opacity: 0; transition: opacity .1s; }
    .elmo:active .tummy { opacity: .35; }
    .tummy { opacity: 0; transition: opacity .1s; }
  `,
  html: `
    <div class="stage">
      <button class="elmo" type="button" aria-label="tickle Elmo">
        <svg viewBox="0 0 168 188" aria-hidden="true">
          <defs>
            <filter id="ef" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="6"/></filter>
            <radialGradient id="er" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#ff5a4a"/><stop offset=".55" stop-color="#e2231a"/><stop offset="1" stop-color="#a3120c"/></radialGradient>
            <radialGradient id="en" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffc06a"/><stop offset=".6" stop-color="#f58220"/><stop offset="1" stop-color="#c25a00"/></radialGradient>
          </defs>
          <g class="body">
            <ellipse cx="84" cy="146" rx="50" ry="40" fill="url(#er)" filter="url(#ef)"/>
            <ellipse cx="36" cy="140" rx="14" ry="26" fill="url(#er)" filter="url(#ef)" transform="rotate(24 36 140)"/>
            <ellipse cx="132" cy="140" rx="14" ry="26" fill="url(#er)" filter="url(#ef)" transform="rotate(-24 132 140)"/>
            <ellipse class="tummy" cx="84" cy="150" rx="22" ry="16" fill="#7a0a06"/>
            <ellipse cx="84" cy="68" rx="58" ry="56" fill="url(#er)" filter="url(#ef)"/>
            <ellipse cx="66" cy="44" rx="13" ry="16" fill="#fff" stroke="#222" stroke-width="1"/><ellipse cx="102" cy="44" rx="13" ry="16" fill="#fff" stroke="#222" stroke-width="1"/>
            <circle class="pupil" cx="70" cy="48" r="6" fill="#111"/><circle class="pupil" cx="98" cy="48" r="6" fill="#111"/>
            <path class="lid" d="M54 46 Q66 56 78 46 M90 46 Q102 56 114 46" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>
            <path class="lid" d="M53 30 h26 v16 h-26 Z M89 30 h26 v16 h-26 Z" fill="#e2231a"/>
            <path class="mouth" d="M48 84 Q84 80 120 84 Q116 120 84 122 Q52 120 48 84 Z" fill="#1a0a0a"/>
            <path d="M66 110 Q84 124 102 110 Q92 118 84 118 Q76 118 66 110 Z" fill="#e8486a"/>
            <ellipse cx="84" cy="76" rx="15" ry="18" fill="url(#en)"/><ellipse cx="80" cy="70" rx="4" ry="5" fill="#fff" opacity=".45"/>
          </g>
        </svg>
      </button>
    </div>`,
  init(root) {
    const elmo = root.querySelector('.elmo');
    let n = 0, last = 0, t = 0;
    elmo.addEventListener('click', () => {
      if (elmo.classList.contains('fall')) return;
      const now = Date.now(); n = now - last < 1600 ? n + 1 : 1; last = now;
      elmo.classList.remove('giggle'); void elmo.offsetWidth;
      clearTimeout(t);
      if (n >= 3) { n = 0; elmo.classList.add('fall'); t = setTimeout(() => elmo.classList.remove('fall'), 2450); }
      else { elmo.classList.add('giggle'); t = setTimeout(() => elmo.classList.remove('giggle'), 950); }
    });
    return () => clearTimeout(t);
  },
};
