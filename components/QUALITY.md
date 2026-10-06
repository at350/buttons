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
- Transforms that intentionally leave the box (a plane flying off, confetti) must be `opacity: 0` / removed
  within ~1s and must not be interactive while outside.

## 2. It looks like the real thing

Pull up the actual product or design-system page (WebFetch / WebSearch) and compare:

- **Colors**: official hex values (brand palettes, design tokens). No approximations.
- **Logos and icons**: real ones. Brand logos: fetch the SVG from Simple Icons
  (`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`, CC0) and inline the `<path d>`.
  UI icons: Lucide (`https://unpkg.com/lucide-static@latest/icons/<name>.svg`, ISC), Material Symbols,
  or the system's own icon set when it is open (Primer Octicons, Fluent UI System Icons, Radix Icons,
  Heroicons, Phosphor, Tabler). Never hand-draw an approximation of a known icon. Keep inline SVG only.
- **Typography**: the family the product actually uses, from the loaded set in `CONTRACT.md` rule 1 (Inter
  for Linear/Vercel/GitHub-ish, DM Sans, Space Grotesk, Roboto Flex for Google/Material, system-ui for
  Apple, JetBrains Mono / IBM Plex Mono for code), with the real weight, size, letter-spacing and casing.
- **Geometry**: real radii, heights (e.g. Material 3 buttons are 40px tall, pill radius; GitHub 32px, 6px
  radius; iOS switch 51×31), paddings, border widths, shadows (elevation tokens).
- **Labels**: the real words the product uses. No placeholder text like "Hover me", "Button", "Click".
- **Motion**: the real curves and durations. Material 3: `cubic-bezier(0.2, 0, 0, 1)` emphasized,
  200–500ms; iOS: spring-like `cubic-bezier(0.32, 0.72, 0, 1)` ~350ms; Fluent: `cubic-bezier(0, 0, 0, 1)`
  ~150–250ms; Linear/Vercel: ~150ms ease; GitHub: 80ms. Ripples, state layers (hover 8% / press 12%),
  focus rings (2px, offset) as the system specifies. Skeuomorphic / physical: real press depth and
  overshoot. Creative / motion / shader categories: polished, not generic — if a named effect is cited in
  `credit`, it must look like that effect.
- **States**: hover, pressed, focus-visible, disabled where relevant, and the persistent toggled state, each
  matching the real product.

## 3. Verify before reporting

```
node scripts/validate.mjs <category>    # 0 errors
node scripts/audit.mjs <category>       # 0 findings (data-open popovers are already excluded)
```
