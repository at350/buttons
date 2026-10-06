export default {
  id: 'gm-xbox-guide',
  credit: 'Microsoft Xbox controller — the silver Nexus / Guide button; press to pulse the green ring and open the guide (stays lit while open)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(circle at 50% 30%, #2a2a2f, #121215 70%);
      padding: 22px 36px;
      border-radius: 12px; }
    .nexus { position: relative; width: 64px; height: 64px; border-radius: 50%; border: none; cursor: pointer; padding: 0;
      background: radial-gradient(circle at 50% 30%, #f2f2f4, #b9b9bf 55%, #7e7e86); box-shadow: 0 0 0 3px #0c0c0e, 0 0 0 5px #3a3a40, 0 6px 10px rgba(0,0,0,.6), inset 0 -3px 5px rgba(0,0,0,.25);
      display: grid; place-items: center; transition: transform .08s; }
    .nexus:active { transform: scale(.96); }
    .nexus svg { width: 40px; height: 40px; fill: #2a2a2f; transition: fill .2s, filter .2s; }
    .nexus.on svg { fill: #107c10; filter: drop-shadow(0 0 5px #52e052); }
    .ring { position: absolute;
      inset: -5px;
      border-radius: 50%;
      border: 3px solid #52e052;
      opacity: 0;
      pointer-events: none; }
    .nexus.on .ring { opacity: .9; box-shadow: 0 0 14px #52e052, inset 0 0 10px rgba(82,224,82,.5); }
    .nexus.pulse .ring { animation: pulse .7s ease-out 1; }
    @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.7); opacity: 0; } }
    .nexus:focus-visible { outline: 2px solid #fff; outline-offset: 7px; }
  `,
  html: `
    <div class="stage">
      <button class="nexus" type="button" aria-label="Xbox guide" aria-pressed="false">
        <span class="ring"></span>
        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-6.4 2.3c1.9-.6 4.3.9 6.4 2.6 2.1-1.7 4.5-3.2 6.4-2.6A10 10 0 0 0 12 2zM4.3 5.9A10 10 0 0 0 5.2 19c-.6-2.9 2.4-7.6 4.9-10.5C8.1 6.6 5.9 5.4 4.3 5.9zm15.4 0c-1.6-.5-3.8.7-5.8 2.6 2.5 2.9 5.5 7.6 4.9 10.5a10 10 0 0 0 .9-13.1zM12 10.4c-3.5 3.3-6.9 7.9-5.6 9.8A10 10 0 0 0 12 22a10 10 0 0 0 5.6-1.8c1.3-1.9-2.1-6.5-5.6-9.8z"/></svg>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.nexus');
    let t;
    b.addEventListener('click', () => {
      const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on));
      b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
      clearTimeout(t); t = setTimeout(() => b.classList.remove('pulse'), 750);
    });
    return () => clearTimeout(t);
  },
};
