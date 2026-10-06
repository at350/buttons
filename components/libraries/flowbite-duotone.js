export default {
  id: 'lb-flowbite-duotone',
  credit: 'Flowbite — gradient duotone buttons (purple→blue, cyan→blue, green→blue, pink→orange); hover flips the gradient direction, press for the gradient-outline look',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; font: 500 14px/1 Inter, -apple-system, "Segoe UI", system-ui, sans-serif; }
    .fb { position: relative; height: 41px; padding: 0 20px; border-radius: 8px; border: 0; cursor: pointer; color: #fff; font: inherit; white-space: nowrap; background-image: linear-gradient(to bottom right, var(--a), var(--b)); transition: box-shadow .15s; -webkit-tap-highlight-color: transparent; }
    .fb:hover { background-image: linear-gradient(to bottom left, var(--a), var(--b)); }
    .fb:active { transform: translateY(.5px); }
    .fb:focus-visible { outline: 0; box-shadow: 0 0 0 4px var(--ring); }
    .fb span { position: relative; z-index: 1; transition: color .15s; }
    .fb::after { content: ''; position: absolute; inset: 2px; border-radius: 6px; background: #fff; opacity: 0; transition: opacity .15s; }
    .fb[aria-pressed="true"]::after { opacity: 1; }
    .fb[aria-pressed="true"] span { color: #111827; }
    .fb[aria-pressed="true"]:hover::after { opacity: 0; }
    .fb[aria-pressed="true"]:hover span { color: #fff; }
    .pb { --a: #9333ea; --b: #3b82f6; --ring: #93c5fd; }
    .cb { --a: #06b6d4; --b: #3b82f6; --ring: #67e8f9; }
    .gb { --a: #4ade80; --b: #2563eb; --ring: #86efac; }
    .po { --a: #ec4899; --b: #fb923c; --ring: #f9a8d4; }
  `,
  html: `
    <div class="row">
      <button class="fb pb" type="button" aria-pressed="false"><span>Purple to Blue</span></button>
      <button class="fb cb" type="button" aria-pressed="false"><span>Cyan to Blue</span></button>
      <button class="fb gb" type="button" aria-pressed="false"><span>Green to Blue</span></button>
      <button class="fb po" type="button" aria-pressed="false"><span>Pink to Orange</span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.fb').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
