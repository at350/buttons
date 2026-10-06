export default {
  id: 'mb-spotify-jam',
  credit: 'Spotify Jam — "Start a Jam" pill with the Jam waves icon; starting one stacks listener avatars in and the pill flips to "End Jam"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 18px 22px; border-radius: 12px; background: #121212; display: flex; align-items: center; gap: 14px; font: 700 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .jam { height: 40px; padding: 0 18px 0 14px; border-radius: 999px; border: 0; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; color: #000;
      background: linear-gradient(90deg, #1ed760, #19e68c); letter-spacing: -.01em; -webkit-tap-highlight-color: transparent;
      transition: transform .15s cubic-bezier(.2,.8,.2,1), filter .15s, background .3s, color .3s; }
    .jam:hover { transform: scale(1.04); filter: brightness(1.08); }
    .jam:active { transform: scale(.98); }
    .jam:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .jam[aria-pressed="true"] { background: #2a2a2a; color: #fff; }
    .jam svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .jam svg path { transition: transform .4s cubic-bezier(.2,.8,.2,1); transform-origin: 50% 50%; }
    .jam:hover svg .w1 { transform: translateX(-1px); } .jam:hover svg .w3 { transform: translateX(1px); }
    .jam[aria-pressed="true"] svg .w1, .jam[aria-pressed="true"] svg .w3 { animation: wv .9s ease-in-out infinite alternate; }
    .jam[aria-pressed="true"] svg .w3 { animation-delay: -.45s; }
    @keyframes wv { from { opacity: .35; } to { opacity: 1; } }
    .ppl { display: flex; align-items: center; }
    .ppl b { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #121212; margin-left: -8px; display: block;
      transform: scale(0); opacity: 0; transition: transform .45s linear(0, 0.4 10%, 0.9 22%, 1.15 35%, 1.02 50%, 0.98 65%, 1), opacity .2s; }
    .ppl b:nth-child(1) { margin-left: 0; background: linear-gradient(135deg, #f037a5, #ff6f3c); transition-delay: 0s; }
    .ppl b:nth-child(2) { background: linear-gradient(135deg, #509bf5, #2ebd59); transition-delay: .08s; }
    .ppl b:nth-child(3) { background: linear-gradient(135deg, #ffd93d, #e9142b); transition-delay: .16s; }
    .ppl b:nth-child(4) { background: #333; color: #b3b3b3; font: 600 10px/24px Inter, system-ui, sans-serif; text-align: center; transition-delay: .24s; }
    .stage.on .ppl b { transform: scale(1); opacity: 1; }
  `,
  html: `
    <div class="stage">
      <button class="jam" type="button" aria-pressed="false">
        <svg viewBox="0 0 24 24"><path class="w1" d="M5 9v6"/><path class="w2" d="M9 6v12M15 6v12"/><path class="w3" d="M19 9v6"/><path d="M12 3v18" stroke-width="2.6"/></svg>
        <span class="lbl">Start a Jam</span>
      </button>
      <span class="ppl" aria-hidden="true"><b></b><b></b><b></b><b>+2</b></span>
    </div>`,
  init(root) {
    const b = root.querySelector('.jam'), stage = root.querySelector('.stage'), lbl = b.querySelector('.lbl');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on)); stage.classList.toggle('on', on);
      lbl.textContent = on ? 'End Jam' : 'Start a Jam';
    });
  },
};
