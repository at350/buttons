# Quality bar

Every element on the page is judged against the real thing. These are the rules a fix pass must leave true,
in addition to `CONTRACT.md`.

## 1. Nothing escapes its box (this is what causes overlaps on the page)

The page measures each element once, right after `init`, and locks the host to that size. Anything that
later grows past that box overlays its neighbours. Run the audit and fix every finding:

```
node scripts/audit.mjs <category>          # hover + click + leave each element through real input
node scripts/audit.mjs <category> --all    # show clean ones too
```

- **Reserve the widest / tallest state up front.** A label that changes ("Follow" → "Following",
  "Subscribe" → "Subscribed", a count that grows, a loading spinner that appears) must not change the
  element's size. Stack the states in a `display: grid` cell (`grid-area: 1 / 1`) so the box is the max of
  all states, or set an explicit `min-width` / `width` on the control that fits the widest label.
- **Stages contain everything.** If the design needs a background `.stage`, every state of the content must
  fit inside it (including a second row of buttons, a tooltip, a badge).
- **Never wrap after a state change.** Inner flex rows must not wrap when a label grows: use `white-space:
  nowrap` and reserved widths.
- **Popovers / menus / dropdowns** are the only things allowed to escape, and only like this: the panel is
  `position: absolute` inside a `position: relative` wrapper, and `init` sets `host.toggleAttribute('data-open', open)`
  on the **second argument of `init`** (the host) while it is open — that raises the element above its
  neighbours. Also close on outside click and Escape. Anything that escapes without `data-open` is a bug.
- **Closed panels must be `display: none`**, not `visibility: hidden` / `opacity: 0`. Invisible content is still
  laid out, and when the element lands at the edge of a row it widens the whole page (horizontal scroll).
  Keep the animations with `transition: … , display .2s allow-discrete` for the exit and `@starting-style`
  for the enter. `node scripts/audit.mjs --rest` flags hidden content that extends past the element; run it
  with `WIDTH=390` too so nothing is wider than a phone.
- Transforms that intentionally leave the box (a plane flying off, confetti) must be `opacity: 0` / removed
  within ~1s and must not be interactive while outside.
- **Inner containers too.** The audit also checks content against the nearest painted container inside the
  element (a card, a panel, a button with a background): a purchase row hanging off the bottom of its card
  is an overflow even if it stays inside the element. If a protrusion is faithful to the real object (a
  joystick ball above its base, Dock icons magnifying above the bar, a crank sticking out of a toy), put
  `data-overhang` on that element (or a wrapper): it is then exempt from the inner check but must still
  stay inside the element's outer box / stage.

## 2. It looks like the real thing

Pull up the actual product or design-system page (WebFetch / WebSearch) and compare:

- **Colors**: official hex values (brand palettes, design tokens). No approximations.
- **Logos and icons**: real ones. Brand logos: fetch the SVG from Simple Icons
  (`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`, CC0) and inline the `<path d>`.
  UI icons: Lucide (`https://unpkg.com/lucide-static@latest/icons/<name>.svg`, ISC), Material Symbols,
  or the system's own icon set when it is open (Primer Octicons, Fluent UI System Icons, Radix Icons,
  Heroicons, Phosphor, Tabler). Never hand-draw an approximation of a known icon. Keep inline SVG only.
  When an icon nests an `<svg>` inside the tile's `<svg>`, size only the outer one with a child selector
  (`.ic > svg`): a descendant selector also sets the inner svg's width / height, which shifts and clips the glyph.
- **Typography**: the family the product actually uses, from the loaded set in `CONTRACT.md` rule 1 (Inter
  for Linear/Vercel/GitHub-ish, DM Sans, Space Grotesk, Roboto Flex for Google/Material, system-ui for
  Apple, JetBrains Mono / IBM Plex Mono for code), with the real weight, size, letter-spacing and casing.
  The Google Fonts subsets of those families (the monospaces too) have no box-drawing (U+2500–257F), block
  elements (U+2580–259F) or geometric shapes like ■ (U+25A0): they fall back to each platform's own font, so
  ║═╔ frames and █░▄▀ fills come apart. Draw text-mode frames, shadows and shade fills with CSS
  (`border: 3px double`, `box-shadow: 2ch 1lh 0 #000`, conic-gradient dot patterns), as rt-dos-dialog does.
- **Geometry**: real radii, heights (e.g. Material 3 buttons are 40px tall, pill radius; GitHub 32px, 6px
  radius; iOS switch 51×31), paddings, border widths, shadows (elevation tokens).
- **Labels**: the real words the product uses. No placeholder text like "Hover me", "Button", "Click".
- **Imagery**: real pictures from the local asset pack (`assets/`, see CONTRACT rule 1) wherever the real
  product shows a picture: profile avatars and friend lists, album and playlist art, Now Playing cards,
  video thumbnails, product cards, app-store screenshots, phone wallpapers behind lock screens and
  widgets. Initials-in-a-circle avatars, gradient squares and grey blocks are placeholders and fail the bar.
  Vary the files between elements so the page doesn't repeat the same face or cover.
- **Named things show their real artwork.** A kiosk selling "Twisters" shows the Twisters poster; a Now
  Playing card for "Midnight City" shows the M83 cover; a PS5 tile for a game shows that game's key art;
  MySpace Tom is the real Tom. Fetch with `node scripts/fetch-real.mjs` (see CONTRACT rule 1). A stock
  photo under a real title is a placeholder and fails the bar. If a real asset truly can't be found,
  rename the content to something anonymous rather than mislabel a stock photo.
- **Motion**: the real curves and durations. Material 3: `cubic-bezier(0.2, 0, 0, 1)` emphasized,
  200–500ms; iOS: spring-like `cubic-bezier(0.32, 0.72, 0, 1)` ~350ms; Fluent: `cubic-bezier(0, 0, 0, 1)`
  ~150–250ms; Linear/Vercel: ~150ms ease; GitHub: 80ms. Ripples, state layers (hover 8% / press 12%),
  focus rings (2px, offset) as the system specifies. Skeuomorphic / physical: real press depth and
  overshoot. Creative / motion / shader categories: polished, not generic — if a named effect is cited in
  `credit`, it must look like that effect.
- **States**: hover, pressed, focus-visible, disabled where relevant, and the persistent toggled state, each
  matching the real product.

## 3. At rest it stays off the main thread

Hundreds of elements are live at once. Offscreen CSS animations are paused by the page (`CONTRACT.md` rule 7);
an animation that runs in view while nobody touches the element must touch only `opacity` and `transform`, so
it runs on the compositor with no style recalc per frame:

- Blink with `opacity` keyframes and `steps()`, never `visibility` or a colour. With `steps(1)` the off value needs
  its own keyframe: `0%, 60% { lit }` alone stays lit for the whole cycle.
- Light lamps, pulses, glows and chases by fading an overlay that already has its colour and glow (or a
  pre-brightened copy), not by animating `box-shadow`, `background` or `filter`.
- Move shimmers, glints and gradients by translating an oversized gradient layer inside a clipping box
  (`mask-clip: text` for text), not by animating `background-position`. Put `-webkit-mask-clip: text` behind
  `@supports` with the `background-clip: text` version as the fallback: Firefox lacks the mask `text` value.
- Prefer `transform` keyframes to `offset-path` or `left` / `top` / `width` / `height`; clip with `clip-path`
  instead of animating `width` / `height`.
- A transform that animates at rest and also transitions starts from an identity value (`translateY(0)`,
  `scale(1)`), not `none`, which costs layouts at both ends of the transition (letter-lift: 27 per hover with
  `none`, 0 with the identity).
- Hidden animated parts are `display: none`, like closed panels (§1). A `transition` shorthand with
  `allow-discrete` is dropped whole by browsers older than Chrome 117 / Firefox 129 / Safari 17.4, so the fades
  are lost there; that is acceptable.
- No permanent `will-change`: set it only on the item being dragged or held.
- A pseudo-element that repeats visible text (a flashing inverted copy of a label) gets empty alt text,
  `content: 'x'; content: 'x' / '';`, so assistive tech does not read the text twice.

Check: with the element on screen and no input, CDP `Performance.getMetrics` `RecalcStyleCount` must not grow
over 2 s.

## 4. Presses land

- A press effect that moves the control (a `transform` on `:active`) must not move it out from under the pointer,
  or a mousedown near its edge never becomes a click. Apply the shift after the click, as rt-dos-dialog's `.down`
  class does, or move an inner element or pseudo-element instead of the hit-tested control.
- Press-and-hold elements set `hold: true` (or `preventDefault()` their `pointerdown`) so the page's long-press
  does not overwrite the clipboard mid-hold (`CONTRACT.md` rule 12).

## 5. Look at it

`node scripts/sheet.mjs <category>` screenshots every element at rest and after its first click and composes
contact sheets in `.sheets/<category>/`. Open them and judge each element against the real thing: a car drawn
as a box, an invented card, a placeholder bar, a crude icon, clipped text, an empty state after the click or a
flat "3D" object all fail, even when every automated check passes.

## 6. Verify before reporting

```
node scripts/validate.mjs <category>    # 0 errors (a stale-bundle ⚠ is only a warning here)
node scripts/audit.mjs <category>       # 0 findings (data-open popovers are already excluded)
npm run build                           # then commit components/bundle.js: CI fails on a stale one
```
