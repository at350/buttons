export default {
  id: 'dp-visionos-glass-group',
  credit: 'Apple visionOS — glass ornament toolbar; gaze-style hover highlight follows the pointer, press pushes the button into the glass, selected buttons turn solid white',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; padding: 34px 38px; border-radius: 12px; overflow: hidden; isolation: isolate;
      background: #0e1f22 url(assets/real/env-visionos-aurora.jpg) 50% 40% / cover no-repeat;
    }
    .bar { position: relative; display: flex; gap: 4px; padding: 6px; border-radius: 999px; }
    /* the glass: frosted, slightly luminous, with a specular rim brighter at the top-left */
    .glass {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: -1;
      background: linear-gradient(180deg, rgba(255, 255, 255, .2), rgba(255, 255, 255, .1));
      -webkit-backdrop-filter: blur(24px) saturate(1.8) brightness(1.05); backdrop-filter: blur(24px) saturate(1.8) brightness(1.05);
      box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .18), 0 1px 2px rgba(0, 0, 0, .12), 0 16px 36px rgba(0, 0, 0, .3);
    }
    .glass::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1.2px;
      background: linear-gradient(150deg, rgba(255, 255, 255, .85), rgba(255, 255, 255, .14) 32%, rgba(255, 255, 255, .04) 60%, rgba(255, 255, 255, .42));
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
    }
    .b {
      --x: 50%; --y: 50%;
      position: relative; width: 44px; height: 44px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      color: rgba(255, 255, 255, .96); background: transparent; display: grid; place-items: center; overflow: hidden;
      transition: transform .3s cubic-bezier(.32, .72, 0, 1), background-color .25s, color .2s, box-shadow .3s;
      -webkit-tap-highlight-color: transparent;
    }
    /* gaze highlight: a soft specular spot that tracks the pointer inside the hovered button */
    .b::before {
      content: ''; position: absolute; inset: 0; border-radius: 50%; pointer-events: none; opacity: 0; transition: opacity .25s;
      background: radial-gradient(34px 34px at var(--x) var(--y), rgba(255, 255, 255, .42), rgba(255, 255, 255, .1) 70%, rgba(255, 255, 255, .06));
    }
    .b:hover::before { opacity: 1; }
    .b:hover { box-shadow: inset 0 0 0 .5px rgba(255, 255, 255, .25); }
    .b:active { transform: scale(.88); transition-duration: .12s; }
    .b:active::before { opacity: 1; background: radial-gradient(40px 40px at var(--x) var(--y), rgba(255, 255, 255, .55), rgba(255, 255, 255, .18) 70%); }
    .b[aria-pressed="true"] { background: rgba(255, 255, 255, .96); color: #111; }
    .b[aria-pressed="true"]::before { background: radial-gradient(34px 34px at var(--x) var(--y), rgba(255, 255, 255, .9), transparent 70%); mix-blend-mode: overlay; }
    .b svg { position: relative; width: 20px; height: 20px; }
    .b:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="bar" role="toolbar" aria-label="Controls">
        <span class="glass"></span>
        <button class="b" type="button" aria-pressed="false" aria-label="Microphone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/></svg></button>
        <button class="b" type="button" aria-pressed="false" aria-label="Camera"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></button>
        <button class="b" type="button" aria-pressed="false" aria-label="Share"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v13"/><path d="m16 6-4-4-4 4"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/></svg></button>
        <button class="b" type="button" aria-pressed="false" aria-label="More"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const btns = root.querySelectorAll('.b');
    btns.forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        b.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
      b.addEventListener('pointerleave', () => { b.style.setProperty('--x', '50%'); b.style.setProperty('--y', '50%'); });
      b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
    });
  },
};
