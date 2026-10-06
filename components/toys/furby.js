export default {
  id: 'ty2-furby',
  credit: 'Tiger Electronics Furby (1998) — pet him and he nods off, eyelids rolling shut and ears drooping; pet again and he wakes with the orange beak chattering',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 12px 18px 14px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 50% 30%, #f6eefc, #d9c8ea); }
    .furby { position: relative; display: block; width: 168px; height: 176px; border: 0; padding: 0; background: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .furby svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    .furby:focus-visible { outline: 3px solid #9b4dff; outline-offset: 2px; border-radius: 40%; }
    .lid { transition: transform .32s cubic-bezier(.4,0,.2,1); transform-box: fill-box; transform-origin: 50% 0; }
    .asleep .lid { transform: scaleY(1); }
    .lash { opacity: 0; transition: opacity .2s; }
    .asleep .lash { opacity: 1; transition-delay: .2s; }
    .awake .lid { transform: scaleY(.05); }
    .awake.blink .lid { animation: blink .26s ease-in-out; }
    @keyframes blink { 50% { transform: scaleY(1); } }
    .iris { transition: transform .3s; transform-box: fill-box; transform-origin: center; }
    .furby:hover .iris { transform: translateY(-2px); }
    .jaw { transform-box: fill-box; transform-origin: 50% 0; transition: transform .1s; }
    .talk .jaw { animation: talk .18s ease-in-out 6 alternate; }
    @keyframes talk { to { transform: translateY(5px) scaleY(1.35); } }
    .ear { transform-box: fill-box; transition: transform .4s cubic-bezier(.3,1.6,.5,1); }
    .earl { transform-origin: 100% 100%; } .earr { transform-origin: 0 100%; }
    .asleep .earl { transform: rotate(-28deg); } .asleep .earr { transform: rotate(28deg); }
    .bob { transition: transform .4s cubic-bezier(.3,1.5,.5,1); transform-box: view-box; transform-origin: 84px 170px; }
    .asleep .bob { transform: rotate(-3deg) translateY(3px); }
  `,
  html: `
    <div class="stage">
      <button class="furby awake" type="button" aria-pressed="true" aria-label="Furby">
        <svg viewBox="0 0 168 176" aria-hidden="true">
          <defs>
            <filter id="fur" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter>
            <radialGradient id="body" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#b98a5e"/><stop offset=".6" stop-color="#8b5a3c"/><stop offset="1" stop-color="#5a3622"/></radialGradient>
            <radialGradient id="iris" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#7fd3ff"/><stop offset=".7" stop-color="#1f7fb8"/><stop offset="1" stop-color="#0b3d63"/></radialGradient>
            <clipPath id="ceL"><ellipse cx="60" cy="84" rx="18" ry="20"/></clipPath><clipPath id="ceR"><ellipse cx="108" cy="84" rx="18" ry="20"/></clipPath>
            <linearGradient id="beak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf5a"/><stop offset="1" stop-color="#f08a1c"/></linearGradient>
          </defs>
          <g class="bob">
            <path class="ear earl" d="M40 58 C20 30 14 8 28 4 C40 14 52 34 58 52 Z" fill="#5a3622" filter="url(#fur)"/>
            <path class="ear earr" d="M128 58 C148 30 154 8 140 4 C128 14 116 34 110 52 Z" fill="#5a3622" filter="url(#fur)"/>
            <ellipse cx="84" cy="104" rx="70" ry="66" fill="url(#body)" filter="url(#fur)"/>
            <ellipse cx="84" cy="112" rx="44" ry="50" fill="#f3eadf" filter="url(#fur)"/>
            <g>
              <ellipse cx="60" cy="84" rx="19" ry="21" fill="#fff" stroke="#2a1a10" stroke-width="2"/>
              <ellipse cx="108" cy="84" rx="19" ry="21" fill="#fff" stroke="#2a1a10" stroke-width="2"/>
              <circle class="iris" cx="62" cy="86" r="12" fill="url(#iris)"/><circle cx="62" cy="86" r="5" fill="#000"/><circle cx="58" cy="81" r="3" fill="#fff"/>
              <circle class="iris" cx="106" cy="86" r="12" fill="url(#iris)"/><circle cx="106" cy="86" r="5" fill="#000"/><circle cx="102" cy="81" r="3" fill="#fff"/>
              <g clip-path="url(#ceL)"><path class="lid" d="M40 62 H80 V98 Q60 112 40 98 Z" fill="#a8774f"/></g>
              <g clip-path="url(#ceR)"><path class="lid" d="M88 62 H128 V98 Q108 112 88 98 Z" fill="#a8774f"/></g>
              <path class="lash" d="M42 95 Q60 109 78 95 M90 95 Q108 109 126 95" fill="none" stroke="#2a1a10" stroke-width="2.5" stroke-linecap="round"/>
            </g>
            <path class="jaw" d="M72 118 Q84 138 96 118 Z" fill="#e0731a"/>
            <path d="M68 108 Q84 100 100 108 Q92 124 84 124 Q76 124 68 108 Z" fill="url(#beak)" stroke="#b85d10" stroke-width="1"/>
            <ellipse cx="84" cy="148" rx="10" ry="4" fill="#e5d8c8"/>
          </g>
        </svg>
      </button>
    </div>`,
  init(root) {
    const f = root.querySelector('.furby');
    let t = 0, t2 = 0;
    f.addEventListener('click', () => {
      const awake = f.classList.contains('asleep');
      f.classList.toggle('asleep', !awake); f.classList.toggle('awake', awake);
      f.setAttribute('aria-pressed', String(awake));
      f.classList.remove('talk', 'blink'); void f.getBoundingClientRect();
      if (awake) {
        f.classList.add('talk'); clearTimeout(t); t = setTimeout(() => f.classList.remove('talk'), 1100);
        clearTimeout(t2); t2 = setTimeout(() => f.classList.add('blink'), 1300);
      }
    });
    return () => { clearTimeout(t); clearTimeout(t2); };
  },
};
