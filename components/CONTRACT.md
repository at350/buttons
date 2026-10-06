# Component contract

Every interactive element on the page is one JS module that default-exports a plain object.
The page mounts it inside its own **shadow root**, so CSS is fully isolated and you can use
any class names you like.

```js
export default {
  id: 'material-filled',            // unique kebab-case, lowercase. Prefix with your category style, e.g. 'retro-win95-ok'
  credit: 'Google Material 3 — filled button',  // 1 short line; shown ONLY as a hover tooltip. Name the site / designer / style it comes from.
  size: 'auto',                     // 'auto' (inline, default) | 'wide' (grows, ~420px basis) | 'full' (100% row width)
  css: `
    :host { display: inline-block; }        /* the host wrapper. Base already sets box-sizing: border-box on everything */
    .btn { ... }
  `,
  html: `<button class="btn" type="button">Submit</button>`,
  init(root, host) {                // OPTIONAL. root = ShadowRoot. Wire up interactivity here.
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.classList.toggle('on'));
    // optionally return a cleanup function
  },
};
```

## Hard rules

1. **Vanilla only.** No imports, no external scripts, no external stylesheets, no remote images.
   **Imagery comes from the local asset pack** (`assets/`, see `assets/manifest.json`; paths are relative
   to the page, e.g. `<img src="assets/portraits/women-07.jpg">` or `background-image: url(assets/square/12.webp)`):
   `assets/portraits/{men,women}-NN.jpg` (128px faces, 40 each) for avatars and profile pictures;
   `assets/square/NN.webp` (300×300 photos, 72) for album art, playlist covers, product and card images;
   `assets/wide/NN.webp` (480×270, 36) for video thumbnails and hero cards;
   `assets/tall/NN.webp` (390×780, 10) for phone wallpapers and lock screens.
   **Never fake imagery**: no initials in a circle for an avatar, no gradient square for album art, no
   grey block for a thumbnail. Pick specific files (vary them across elements) and size them with
   `object-fit: cover`. Brand logos stay inline SVG.
   **Real things get their real artwork.** If an element names a real title or product (a film at a
   cinema kiosk, an album on a Now Playing card, a game on a console tile, an app, a book, a public
   person), the picture must be that thing's actual poster / cover / key art / photo, fetched into
   `assets/real/<slug>.<ext>` with `node scripts/fetch-real.mjs` (iTunes Search for album art, app icons and
   books; Wikipedia page images for film posters, TV key art, game covers and public people; Steam CDN for Steam capsules;
   Wikimedia Commons for product photos; or a specific https image url). Check the "matched" line it
   prints. Stock photos from `square/`, `wide/`, `tall/` are only for anonymous content (a listing, a
   wallpaper, a demo card). Portraits are for anonymous users; real people use their real photo.
   Icons must be inline SVG. Fonts: system stacks (`system-ui`, `ui-monospace`, `Georgia`…) **or one of the
   web fonts the page already loads** (use the family name directly, always with a fallback):
   `Inter` (wght 100–900), `DM Sans` (opsz 9–40, wght 100–1000), `Space Grotesk` (300–700),
   `Bricolage Grotesque` (opsz 12–96, wdth 75–100, wght 200–800), `Syne` (400–800), `Unbounded` (200–900),
   `Fraunces` (opsz 9–144, wght 100–900, variable axes SOFT/WONK), `Playfair Display` (400–900 + italic),
   `Instrument Serif` (regular + italic), `JetBrains Mono` (100–800), `IBM Plex Mono` (400, 600),
   `Roboto Flex` (full variable axes incl. wdth, GRAD, slnt). Variable-font axes animate (`font-variation-settings`).
   Canvas / WebGL inside your html is allowed (see rule 7 for the run-only-while-hovered requirement).
   SVG filters are allowed: define them inline and reference with `url(#id)` from SVG attributes
   (`filter="url(#goo)"`). CSS `filter: url(#id)` on HTML elements is unreliable across browsers; avoid it.
2. **Module top level must not touch the DOM** (no `document`/`window` at import time). Only inside `init`.
   The validator imports every file in Node.
3. **Self-contained look.** The page background is light gray `#ecece8`. If your design needs its own
   background (dark neon, glassmorphism, a Win95 dialog…), wrap it in a padded `.stage` div with that
   background and `border-radius: 12px`. Never rely on the page for color.
4. **Responsive.** Nothing may overflow horizontally. `max-width: 100%` on wide things; `full`-size
   elements must still work at 360px wide (wrap or scroll inside themselves).
5. **Really interactive.** Hover, focus-visible, active and (where it makes sense) a persistent toggled /
   selected / open state. Clicking never navigates, submits, alerts, or scrolls the page.
   Use `type="button"` on buttons; `href="#"` links must `preventDefault`.
6. **Minimal text.** Labels that are part of the design are fine ("Submit", "Sign in", "OK"). No captions,
   headings, descriptions, or explanations anywhere in `html`. The credit goes in `credit` only.
7. **Performance.** Prefer CSS transitions / animations. If you must use `requestAnimationFrame`,
   `setInterval`, or a canvas / WebGL render loop, only run it while the element is hovered / active /
   open (or, for an idle shader, only while visible via an IntersectionObserver AND at most ~30fps),
   and stop it afterwards. Return a cleanup function from `init` that stops everything and releases
   WebGL contexts (`gl.getExtension('WEBGL_lose_context')?.loseContext()`). Hundreds of these live on
   one page at once. Keep canvases small (≤ 320×160 CSS px, devicePixelRatio capped at 2).
   **Render at final size immediately.** The page measures each element once right after `init` and
   locks its box to that size, so nothing may grow lazily (no "appears after a timeout" layouts).
   Anything that expands later (open menus, growing labels) overlays its neighbours instead of
   pushing them — design for that.
8. **No layout leakage.** Don't use `position: fixed`. Dropdowns / menus may use `position: absolute`
   inside a `position: relative` wrapper; keep them from being clipped (`overflow: visible`) and
   **drop upward or reserve space** if they'd be large. Nothing may use `100vw`/`100vh`.
9. **Accessible basics.** Keyboard reachable (`button`, `input`, or `tabindex="0"` + key handling),
   `aria-pressed` / `aria-expanded` / `aria-checked` where relevant, visible `:focus-visible` ring.
10. **Fidelity.** Reproduce the *recognizable* look of the source: exact-ish colors, radii, shadows,
    font weights, hover/press behaviour. Obscure / creative ones should be genuinely surprising.

## Category index

Each category folder has an `index.js`:

```js
import a from './material-filled.js';
import b from './ios-toggle.js';
export default [a, b];
```

## Validate

```
node scripts/validate.mjs            # all categories
node scripts/validate.mjs big-tech   # one category
```
