export default {
  id: 'ob-awwwards-sotd',
  credit: 'Awwwards "Site of the Day" badge — black roundel with the W mark and a spinning text ring; click flips it to the jury score',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { width: 160px; height: 160px; display: grid; place-items: center; perspective: 600px; }
    .badge { position: relative; width: 128px; height: 128px; border: 0; padding: 0; background: none; cursor: pointer; transform-style: preserve-3d; transition: transform .6s cubic-bezier(.2,.8,.2,1); border-radius: 50%; }
    .badge:focus-visible { outline: 2px solid #000; outline-offset: 4px; }
    .badge.flip { transform: rotateY(180deg); }
    .face { position: absolute; inset: 0; border-radius: 50%; backface-visibility: hidden; display: grid; place-items: center; }
    .front { background: #000; color: #fff; }
    .back { background: #ffe600; color: #000; transform: rotateY(180deg); }
    .ring { position: absolute; inset: 0; animation: spin 14s linear infinite; animation-play-state: paused; }
    .badge:hover .ring, .badge.flip .ring { animation-play-state: running; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .ring text { font: 700 11px/1 Inter, system-ui, sans-serif; letter-spacing: 2.4px; fill: currentColor; text-transform: uppercase; }
    .w { font: 900 44px/1 Inter, system-ui, sans-serif; letter-spacing: -2px; transform: translateY(-2px); }
    .front .w::after { content: "."; color: #ffe600; }
    .score { font: 900 34px/1 Inter, system-ui, sans-serif; letter-spacing: -1px; }
    .score small { display: block; font: 700 9px/1.2 Inter, system-ui, sans-serif; letter-spacing: 2px; text-align: center; margin-top: 4px; }
    .badge:hover { transform: scale(1.04); }
    .badge.flip:hover { transform: rotateY(180deg) scale(1.04); }
  `,
  html: `
    <div class="wrap">
      <button class="badge" type="button" aria-pressed="false" aria-label="Site of the Day">
        <span class="face front">
          <svg class="ring" viewBox="0 0 128 128" aria-hidden="true"><defs><path id="ob-sotd-c" d="M64 64m-50 0a50 50 0 1 1 100 0a50 50 0 1 1-100 0"/></defs><text><textPath href="#ob-sotd-c" startOffset="0">Site of the day · Awwwards · Site of the day ·</textPath></text></svg>
          <span class="w" aria-hidden="true">W</span>
        </span>
        <span class="face back">
          <svg class="ring" viewBox="0 0 128 128" aria-hidden="true"><text><textPath href="#ob-sotd-c" startOffset="0">Jury score · Design · Usability · Creativity ·</textPath></text></svg>
          <span class="score" aria-hidden="true">7.85<small>SOTD</small></span>
        </span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.badge');
    b.addEventListener('click', () => { const on = b.classList.toggle('flip'); b.setAttribute('aria-pressed', String(on)); });
  },
};
