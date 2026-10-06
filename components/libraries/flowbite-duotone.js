export default {
  id: 'lb-flowbite-duotone',
  credit: 'Flowbite — gradient duotone buttons (bg-gradient-to-br, hover flips to bl, focus:ring-4) and the matching gradient-outline variant (p-0.5 rim, white face fades out in 75ms ease-in on hover); click a button to swap it between the two',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; font: 500 14px/20px Inter, -apple-system, "Segoe UI", system-ui, sans-serif; }
    .fb { position: relative; display: inline-flex; align-items: center; justify-content: center; overflow: hidden; padding: 2px; border-radius: 8px; border: 0; cursor: pointer; color: #fff; font: inherit; white-space: nowrap; text-align: center; background-image: linear-gradient(to bottom right, var(--a), var(--b)); -webkit-tap-highlight-color: transparent; }
    .fb:hover { background-image: linear-gradient(to bottom left, var(--a), var(--b)); }
    .fb:focus-visible { outline: 0; box-shadow: 0 0 0 4px var(--ring); }
    .fb span { position: relative; display: block; padding: 8px 18px; border-radius: 6px; background: transparent; transition: all 75ms ease-in; }
    .fb[aria-pressed="true"] { color: #111827; }
    .fb[aria-pressed="true"]:hover { color: #fff; background-image: linear-gradient(to bottom right, var(--a), var(--b)); }
    .fb[aria-pressed="true"] span { background: #fff; }
    .fb[aria-pressed="true"]:hover span { background: transparent; }
    .pb { --a: #9333ea; --b: #3b82f6; --ring: #93c5fd; }
    .cb { --a: #06b6d4; --b: #3b82f6; --ring: #67e8f9; }
    .gb { --a: #4ade80; --b: #2563eb; --ring: #bbf7d0; }
    .po { --a: #ec4899; --b: #fb923c; --ring: #fbcfe8; }
  `,
  html: `
    <div class="row">
      <button class="fb pb" type="button" aria-pressed="false"><span>Purple to Blue</span></button>
      <button class="fb cb" type="button" aria-pressed="true"><span>Cyan to Blue</span></button>
      <button class="fb gb" type="button" aria-pressed="false"><span>Green to Blue</span></button>
      <button class="fb po" type="button" aria-pressed="false"><span>Pink to Orange</span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.fb').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
