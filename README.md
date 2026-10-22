# buttons

An endless page of buttons, menus, toggles, dials and other interactive elements from across the web.
No text, just things to click.

```
npm run dev        # http://127.0.0.1:4173 (zero-dependency static server: keep-alive + gzip)
npm run build      # regenerates components/bundle.js (one request instead of ~700; the deployed page loads it)
npm run validate   # checks every component against components/CONTRACT.md, and that the bundle is fresh
npm run smoke      # headless Chromium: mounts every element, checks packing + infinite feed (needs the dev server)
npm run smoke -- 'http://127.0.0.1:4173/?bundle=1'   # the same against the built bundle, as deployed
npm run bench      # headless Chromium: load timeline, scroll-stress frame times, idle CPU, heap (needs the dev server)
npm run audit -- menus   # hover/click/leave every element in a category and report anything that escapes its box
node scripts/sheet.mjs menus   # visual review: screenshots every element at rest + clicked into .sheets/ with contact sheets
```

On localhost the page loads the per-file component modules (edit and reload); anywhere else it loads
`components/bundle.js`, so run `npm run build` after changing components. `?bundle=1` / `?bundle=0`
force either. `npm run bench -- --net=4g --profile` throttles the network and prints CPU profiles.

CI (`.github/workflows/ci.yml`, on pull requests and pushes to `main`) runs `npm run validate`, which fails on a
stale `components/bundle.js`, then `npm run smoke` against `?bundle=1`, so the bundle the deployed page loads is the
one that gets smoke-tested.

Quality rules for elements (real icons, real colors, real motion, nothing escapes its box) are in
[components/QUALITY.md](components/QUALITY.md).

`SHOT=page.png npm run smoke` also saves a screenshot. Smoke, audit, sheet and bench find Chromium in the
Playwright cache or on the system (`scripts/chrome.mjs`), or set `CHROME=/path/to/binary`.

Zero dependencies. Every element is one ES module under `components/<category>/`, rendered in its own
shadow root. See [components/CONTRACT.md](components/CONTRACT.md) to add one; rules 7 (offscreen animations
pause, shaders share one WebGL context budget) and 12 (press-and-hold) cover what the page does to elements.

Hidden extras on the page: **press and hold any element** for a moment to copy its source module to the
clipboard (on a touch screen it copies when you let go), and the small round button in the bottom corner opens a
**category filter** (click a chip to toggle it, alt/option-click to show only that category; the choice is
remembered in the browser). The filter button is the first Tab stop.
