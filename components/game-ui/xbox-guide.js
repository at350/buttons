// Xbox Series X|S controller Xbox (Guide) button: glossy black cap in the carbon-black shell, the Xbox sphere
// backlit white; pressing pulses the backlight, and it stays fully lit while the guide is open.
const XBOX = 'M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912C23.002 17.48 24 14.861 24 12.004c0-3.34-1.365-6.362-3.57-8.536 0 0-.027-.022-.082-.042-.063-.022-.152-.045-.281-.045-.592 0-1.985.434-4.805 3.246zM3.654 3.426c-.057.02-.082.041-.086.042C1.365 5.642 0 8.664 0 12.004c0 2.854.998 5.473 2.661 7.533-1.401-2.605 3.579-9.951 6.08-12.91-2.82-2.813-4.216-3.245-4.806-3.245-.131 0-.223.021-.281.046v-.002zM12 3.551S9.055 1.828 6.755 1.746c-.903-.033-1.454.295-1.521.339C7.379.646 9.659 0 11.984 0H12c2.334 0 4.605.646 6.766 2.085-.068-.046-.615-.372-1.52-.339C14.946 1.828 12 3.545 12 3.545v.006z';
export default {
  id: 'gm-xbox-guide',
  credit: 'Microsoft Xbox Wireless Controller — the Xbox button: glossy black cap with the backlit sphere; press pulses the light, stays lit while the guide is open',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 30px 40px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 50% 35%, #2b2c30, #17181b 60%, #0d0d0f); }
    .stage::before { content: ""; position: absolute; inset: 0; background: repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.015) 0 1px, transparent 1px 3px); pointer-events: none; }
    .nexus { position: relative; width: 58px; height: 58px; border-radius: 50%; border: none; cursor: pointer; padding: 0; display: grid; place-items: center;
      background: radial-gradient(circle at 50% 30%, #3a3b40, #141417 62%, #050506);
      box-shadow: 0 0 0 2px #0a0a0b, 0 0 0 3px #2c2d31, 0 4px 8px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.18), inset 0 -2px 4px rgba(0,0,0,.6);
      transition: transform 80ms ease-out; }
    .nexus::after { content: ""; position: absolute; left: 12px; right: 12px; top: 5px; height: 16px; border-radius: 50%; background: linear-gradient(rgba(255,255,255,.16), transparent); pointer-events: none; }
    .nexus:active { transform: scale(.95); }
    .nexus svg { width: 30px; height: 30px; fill: #bfc1c6; opacity: .55; transition: opacity 200ms, filter 200ms, fill 200ms; }
    .nexus:hover svg { opacity: .75; }
    .nexus.on svg { fill: #fff; opacity: 1; filter: drop-shadow(0 0 3px rgba(255,255,255,.9)) drop-shadow(0 0 8px rgba(255,255,255,.5)); }
    .halo { position: absolute; inset: 0; border-radius: 50%; pointer-events: none; opacity: 0; box-shadow: 0 0 0 2px rgba(255,255,255,.7), 0 0 12px rgba(255,255,255,.45); }
    .nexus.pulse .halo { animation: pulse 700ms ease-out 1; }
    @keyframes pulse { 0% { transform: scale(1); opacity: .9; } 100% { transform: scale(1.32); opacity: 0; } }
    .nexus.on.blink svg { animation: blink 900ms ease-in-out 1; }
    @keyframes blink { 0%, 100% { opacity: 1; } 30%, 70% { opacity: .35; } 50% { opacity: 1; } }
    .nexus:focus-visible { outline: 2px solid #fff; outline-offset: 6px; }
  `,
  html: `
    <div class="stage">
      <button class="nexus" type="button" aria-label="Xbox button — open guide" aria-pressed="false">
        <span class="halo"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${XBOX}"/></svg>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.nexus');
    let t;
    b.addEventListener('click', () => {
      const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on));
      b.classList.remove('pulse', 'blink'); void b.offsetWidth; b.classList.add('pulse'); if (on) b.classList.add('blink');
      clearTimeout(t); t = setTimeout(() => b.classList.remove('pulse', 'blink'), 950);
    });
    return () => clearTimeout(t);
  },
};
