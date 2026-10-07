// DualSense face buttons: glossy smoked-black caps set into the white shell. Unlike the DualShock 4, the PS5 pad's
// △ ○ ✕ □ are colourless — clear, light-grey engraved shapes; press sinks 2px, toggled caps light up white.
export default {
  id: 'gm-dualsense-face',
  credit: 'Sony DualSense (PS5) — the △ ○ ✕ □ face-button cluster on the white shell; caps sink when pressed and stay lit when toggled',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; border-radius: 12px; padding: 18px; overflow: hidden;
      background: radial-gradient(circle at 30% 20%, #ffffff, #eceef2 55%, #d6d9df); box-shadow: inset 0 0 0 1px rgba(0,0,0,.06); }
    .well { position: relative; width: 128px; height: 128px; border-radius: 50%;
      background: radial-gradient(circle at 50% 45%, #f7f8fa, #e4e6eb 70%); box-shadow: inset 0 2px 5px rgba(0,0,0,.12), inset 0 -1px 0 rgba(255,255,255,.9); }
    .fb { position: absolute; width: 38px; height: 38px; border-radius: 50%; border: none; padding: 0; cursor: pointer; display: grid; place-items: center;
      background: radial-gradient(circle at 50% 28%, #4a4c55 0%, #22232a 45%, #0e0f13 100%);
      box-shadow: 0 2px 0 #0a0a0d, 0 4px 6px rgba(0,0,0,.28), inset 0 1px 1px rgba(255,255,255,.22), inset 0 -2px 3px rgba(0,0,0,.5);
      transition: transform 60ms ease-out, box-shadow 60ms ease-out; }
    .fb::before { content: ""; position: absolute; left: 7px; right: 7px; top: 3px; height: 12px; border-radius: 50%; background: linear-gradient(rgba(255,255,255,.22), transparent); pointer-events: none; }
    .fb svg { width: 22px; height: 22px; fill: none; stroke: var(--c); stroke-width: 1.7; stroke-linejoin: miter; stroke-linecap: butt; opacity: .8; transition: opacity 150ms, filter 150ms; }
    .tri { left: 45px; top: 5px; --c: #c7cad1; }
    .cir { left: 85px; top: 45px; --c: #c7cad1; }
    .cro { left: 45px; top: 85px; --c: #c7cad1; }
    .squ { left: 5px; top: 45px; --c: #c7cad1; }
    .fb:hover svg { opacity: 1; }
    .fb:active, .fb.down { transform: translateY(2px); box-shadow: 0 0 0 #0a0a0d, 0 1px 2px rgba(0,0,0,.3), inset 0 1px 1px rgba(255,255,255,.12), inset 0 -1px 2px rgba(0,0,0,.5); }
    .fb.on svg { opacity: 1; stroke: #fff; filter: drop-shadow(0 0 2px rgba(255,255,255,.9)) drop-shadow(0 0 5px rgba(160,200,255,.7)); }
    .fb.on { box-shadow: 0 2px 0 #0a0a0d, 0 4px 6px rgba(0,0,0,.28), 0 0 0 2px rgba(0,112,204,.45), inset 0 1px 1px rgba(255,255,255,.22), inset 0 -2px 3px rgba(0,0,0,.5); }
    .fb:focus-visible { outline: 2px solid #0070cc; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="well">
        <button class="fb tri" type="button" aria-label="Triangle" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M12 5.2 18.9 17.2H5.1z"/></svg></button>
        <button class="fb cir" type="button" aria-label="Circle" aria-pressed="false"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6.6"/></svg></button>
        <button class="fb cro" type="button" aria-label="Cross" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M6.4 6.4l11.2 11.2M17.6 6.4 6.4 17.6"/></svg></button>
        <button class="fb squ" type="button" aria-label="Square" aria-pressed="false"><svg viewBox="0 0 24 24"><rect x="6.3" y="6.3" width="11.4" height="11.4"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const keys = { Triangle: '.tri', Circle: '.cir', Cross: '.cro', Square: '.squ' };
    root.querySelectorAll('.fb').forEach((b) => b.addEventListener('click', () => {
      const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on));
    }));
    void keys;
  },
};
