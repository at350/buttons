# buttons

An endless page of buttons, menus, toggles, dials and other interactive elements from across the web.
No text, just things to click.

```
npm run dev        # http://127.0.0.1:4173
npm run build      # regenerates components/bundle.js (every element in one module; the page loads it instead of ~700 files)
npm run validate   # checks every component against components/CONTRACT.md, and that the bundle is current
npm run smoke      # headless Chromium: mounts every element, checks packing + infinite feed (needs the dev server)
npm run audit -- menus   # hover/click/leave every element in a category and report anything that escapes its box
npm run perf             # headless Chromium: load, idle and scroll cost as JSON (medians of 3 runs); needs the dev server
```

Quality rules for elements (real icons, real colors, real motion, nothing escapes its box) are in
[components/QUALITY.md](components/QUALITY.md).

`SHOT=page.png npm run smoke` also saves a screenshot. The smoke test finds Chromium in the Playwright cache, or set `CHROME=/path/to/binary`.

Zero dependencies. Every element is one ES module under `components/<category>/`, rendered in its own
shadow root. See [components/CONTRACT.md](components/CONTRACT.md) to add one. After editing elements run
`npm run build`: the deployed page loads the generated `components/bundle.js` (one request instead of ~700),
while the dev server keeps loading the per-file modules so edits show without a rebuild (`?bundle` and
`?nobundle` on the URL override either way; `npm run perf` measures the bundled page).

Hidden extras on the page: **press and hold any element** for a moment to copy its source module to the
clipboard, and the small round button in the bottom corner opens a **category filter** (click a chip to
toggle it, alt/option-click to show only that category; the choice is remembered in the browser).
